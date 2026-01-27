'use client'

import type { FormEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

type EngagementComment = {
  id: string
  name: string
  message: string
  createdAt: string
  updatedAt?: string
}

type EngagementRecord = {
  likes: number
  dislikes: number
  comments: EngagementComment[]
}

function formatDate(value: string, locale: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function readOwnedIds(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((value) => typeof value === 'string'))
  } catch {
    return new Set()
  }
}

function writeOwnedIds(key: string, ids: Set<string>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(Array.from(ids)))
}

export default function EngagementSection({
  slug,
  locale,
}: {
  slug: string
  locale: string
}) {
  const [record, setRecord] = useState<EngagementRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingMessage, setEditingMessage] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const storageKey = useMemo(() => `engagement:owned:${locale}::${slug}`, [locale, slug])

  useEffect(() => {
    const next = readOwnedIds(storageKey)
    setOwnedIds(next)
  }, [storageKey])

  const updateOwnedIds = useCallback(
    (updater: (prev: Set<string>) => Set<string>) => {
      setOwnedIds((prev) => {
        const next = updater(prev)
        writeOwnedIds(storageKey, next)
        return next
      })
    },
    [storageKey],
  )

  const addOwnedIds = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return
      updateOwnedIds((prev) => {
        const next = new Set(prev)
        ids.forEach((id) => next.add(id))
        return next
      })
    },
    [updateOwnedIds],
  )

  const removeOwnedId = useCallback(
    (id: string) => {
      updateOwnedIds((prev) => {
        if (!prev.has(id)) return prev
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    },
    [updateOwnedIds],
  )

  const copy = useMemo(() => {
    if (locale === 'tr') {
      return {
        title: 'Yorumlar',
        subtitle: 'Bu yazı faydalı mıydı?',
        like: 'Beğen',
        dislike: 'Beğenme',
        nameLabel: 'İsim (opsiyonel)',
        messageLabel: 'Yorumun',
        submit: 'Yorumu gönder',
        empty: 'Henüz yorum yok. İlk yorumu sen yaz.',
        loading: 'Yükleniyor...',
        edit: 'Düzenle',
        delete: 'Sil',
        save: 'Kaydet',
        cancel: 'İptal',
        edited: 'düzenlendi',
        ownerHint: 'Sadece kendi yorumlarını düzenleyebilir veya silebilirsin.',
      }
    }

    return {
      title: 'Comments',
      subtitle: 'Was this article helpful?',
      like: 'Like',
      dislike: 'Dislike',
      nameLabel: 'Name (optional)',
      messageLabel: 'Your comment',
      submit: 'Post comment',
      empty: 'No comments yet. Be the first to comment.',
      loading: 'Loading...',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      edited: 'edited',
      ownerHint: 'You can edit or delete your own comments on this device.',
    }
  }, [locale])

  const fetchRecord = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/engagement/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
        { cache: 'no-store' },
      )
      if (!res.ok) {
        throw new Error('Failed to load engagement')
      }
      const data = (await res.json()) as EngagementRecord
      setRecord(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [locale, slug])

  useEffect(() => {
    void fetchRecord()
  }, [fetchRecord])

  const sendAction = useCallback(
    async (
      action: 'like' | 'dislike' | 'comment' | 'edit' | 'delete',
      payload?: Record<string, unknown>,
      options?: { trackNewOwnedIds?: boolean },
    ) => {
      const previousIds = record
        ? new Set(record.comments.map((comment) => comment.id))
        : null

      const res = await fetch(`/api/engagement/${encodeURIComponent(slug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, action, ...(payload ?? {}) }),
      })
      if (!res.ok) {
        throw new Error('Failed to update engagement')
      }
      const data = (await res.json()) as EngagementRecord
      setRecord(data)

      if (options?.trackNewOwnedIds) {
        if (previousIds) {
          const newIds = data.comments
            .map((comment) => comment.id)
            .filter((id) => !previousIds.has(id))
          addOwnedIds(newIds)
        } else if (data.comments.length > 0) {
          const newest = [...data.comments].sort(
            (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
          )[0]
          if (newest) {
            addOwnedIds([newest.id])
          }
        }
      }
    },
    [addOwnedIds, locale, record?.comments, slug],
  )

  const onVote = useCallback(
    async (kind: 'like' | 'dislike') => {
      try {
        await sendAction(kind)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    },
    [sendAction],
  )

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message.trim()) return
      setSubmitting(true)
      setError(null)
      try {
        await sendAction('comment', { name, message }, { trackNewOwnedIds: true })
        setMessage('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setSubmitting(false)
      }
    },
    [message, name, sendAction],
  )

  const startEdit = useCallback((comment: EngagementComment) => {
    setEditingId(comment.id)
    setEditingName(comment.name === 'Anonymous' ? '' : comment.name)
    setEditingMessage(comment.message)
    setError(null)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingId(null)
    setEditingName('')
    setEditingMessage('')
  }, [])

  const submitEdit = useCallback(
    async (id: string) => {
      if (!editingMessage.trim()) return
      setBusyId(id)
      setError(null)
      try {
        await sendAction('edit', { id, name: editingName, message: editingMessage })
        cancelEdit()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setBusyId(null)
      }
    },
    [cancelEdit, editingMessage, editingName, sendAction],
  )

  const onDelete = useCallback(
    async (id: string) => {
      const ok = window.confirm(locale === 'tr' ? 'Bu yorumu silmek istiyor musun?' : 'Delete this comment?')
      if (!ok) return
      setBusyId(id)
      setError(null)
      try {
        await sendAction('delete', { id })
        removeOwnedId(id)
        if (editingId === id) {
          cancelEdit()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setBusyId(null)
      }
    },
    [cancelEdit, editingId, locale, removeOwnedId, sendAction],
  )

  return (
    <section className="writingEngagement" aria-labelledby="writing-engagement-title">
      <div className="writingEngagement__votes">
        <p className="writingEngagement__subtitle">{copy.subtitle}</p>
        <div className="writingEngagement__buttons">
          <button
            type="button"
            className="writingEngagement__button"
            onClick={() => void onVote('like')}
          >
            {copy.like}
            <span className="writingEngagement__count">{record?.likes ?? 0}</span>
          </button>
          <button
            type="button"
            className="writingEngagement__button writingEngagement__button--ghost"
            onClick={() => void onVote('dislike')}
          >
            {copy.dislike}
            <span className="writingEngagement__count">{record?.dislikes ?? 0}</span>
          </button>
        </div>
      </div>

      <div className="writingEngagement__comments">
        <h2 id="writing-engagement-title" className="writingEngagement__title">
          {copy.title}
        </h2>

        <p className="writingEngagement__ownerHint">{copy.ownerHint}</p>

        <form className="writingEngagement__form" onSubmit={onSubmit}>
          <label className="writingEngagement__label">
            {copy.nameLabel}
            <input
              className="writingEngagement__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              autoComplete="name"
              maxLength={80}
            />
          </label>

          <label className="writingEngagement__label">
            {copy.messageLabel}
            <textarea
              className="writingEngagement__textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              rows={4}
              maxLength={2000}
              required
            />
          </label>

          <div className="writingEngagement__actions">
            <button type="submit" className="writingEngagement__submit" disabled={submitting}>
              {submitting ? '...' : copy.submit}
            </button>
            {loading ? <span className="writingEngagement__hint">{copy.loading}</span> : null}
            {error ? <span className="writingEngagement__error">{error}</span> : null}
          </div>
        </form>

        <div className="writingEngagement__list" role="list">
          {!loading && (record?.comments?.length ?? 0) === 0 ? (
            <p className="writingEngagement__empty">{copy.empty}</p>
          ) : null}

          {record?.comments.map((comment) => {
            const isOwned = ownedIds.has(comment.id)
            const isEditing = editingId === comment.id
            const isBusy = busyId === comment.id

            return (
              <article key={comment.id} className="writingEngagement__item" role="listitem">
                <header className="writingEngagement__itemHeader">
                  <strong className="writingEngagement__itemName">{comment.name}</strong>
                  <div className="writingEngagement__itemMeta">
                    <time className="writingEngagement__itemTime" dateTime={comment.createdAt}>
                      {formatDate(comment.createdAt, locale)}
                    </time>
                    {comment.updatedAt ? (
                      <span className="writingEngagement__edited">{copy.edited}</span>
                    ) : null}
                  </div>
                </header>

                {isEditing ? (
                  <div className="writingEngagement__itemForm">
                    <label className="writingEngagement__label">
                      {copy.nameLabel}
                      <input
                        className="writingEngagement__input"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        name="edit-name"
                        maxLength={80}
                      />
                    </label>
                    <label className="writingEngagement__label">
                      {copy.messageLabel}
                      <textarea
                        className="writingEngagement__textarea"
                        value={editingMessage}
                        onChange={(e) => setEditingMessage(e.target.value)}
                        name="edit-message"
                        rows={4}
                        maxLength={2000}
                        required
                      />
                    </label>
                    <div className="writingEngagement__itemActions">
                      <button
                        type="button"
                        className="writingEngagement__itemAction writingEngagement__itemAction--primary"
                        onClick={() => void submitEdit(comment.id)}
                        disabled={isBusy}
                      >
                        {copy.save}
                      </button>
                      <button
                        type="button"
                        className="writingEngagement__itemAction"
                        onClick={cancelEdit}
                        disabled={isBusy}
                      >
                        {copy.cancel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="writingEngagement__itemMessage">{comment.message}</p>
                )}

                {isOwned && !isEditing ? (
                  <div className="writingEngagement__itemActions">
                    <button
                      type="button"
                      className="writingEngagement__itemAction"
                      onClick={() => startEdit(comment)}
                      disabled={isBusy}
                    >
                      {copy.edit}
                    </button>
                    <button
                      type="button"
                      className="writingEngagement__itemAction writingEngagement__itemAction--danger"
                      onClick={() => void onDelete(comment.id)}
                      disabled={isBusy}
                    >
                      {copy.delete}
                    </button>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
