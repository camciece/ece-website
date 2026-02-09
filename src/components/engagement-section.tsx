'use client'

import type { FormEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

type EngagementComment = {
  id: string
  parentId?: string
  name: string
  message: string
  likeCount: number
  dislikeCount: number
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
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffSec = Math.round(diffMs / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    numeric: 'auto',
  })

  const absSec = Math.abs(diffSec)
  if (absSec < 60) return rtf.format(diffSec, 'second')

  const diffMin = Math.round(diffSec / 60)
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute')

  const diffHour = Math.round(diffMin / 60)
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour')

  const diffDay = Math.round(diffHour / 24)
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, 'day')

  const diffMonth = Math.round(diffDay / 30)
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month')

  const diffYear = Math.round(diffDay / 365)
  return rtf.format(diffYear, 'year')
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

function getInitials(value: string) {
  const tokens = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (tokens.length === 0) return 'E'
  if (tokens.length === 1) {
    return (tokens[0][0] ?? 'E').toUpperCase()
  }
  const first = tokens[0][0] ?? ''
  const last = tokens[tokens.length - 1][0] ?? ''
  return `${first}${last}`.toUpperCase()
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
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingMessage, setEditingMessage] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [pulseReaction, setPulseReaction] = useState<string | null>(null)
  const [replyToId, setReplyToId] = useState<string | null>(null)
  const [replyToName, setReplyToName] = useState<string | null>(null)

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
        like: 'Beğendim',
        dislike: 'Beğenmedim',
        nameLabel: 'İsim *',
        emailLabel: 'E-posta *',
        emailHint: 'E-posta adresin yayınlanmaz.',
        messageLabel: 'Yorumun',
        submit: 'Gönder',
        cancel: 'İptal',
        empty: 'Düşüncelerini merak ediyoruz, ilk yorumu sen bırakmak ister misin?',
        loading: 'Yükleniyor...',
        edit: 'Düzenle',
        delete: 'Sil',
        save: 'Kaydet',
        edited: 'düzenlendi',
        reply: 'Yanıtla',
        replyingTo: 'Yanıtlıyorsun',
        cancelReply: 'Yanıtı iptal et',
        ownerHint: 'Sadece kendi yorumlarını düzenleyebilir veya silebilirsin.',
        proof: 'Okurların %PCT’i bu yazıyı faydalı buldu.',
        proofEmpty: 'Henüz tepki yok. İlk tepkiyi sen ver.',
 
      }
    }

    return {
      title: 'Comments',
      like: 'Liked it',
      dislike: "Didn't like",
      nameLabel: 'Name *',
      emailLabel: 'Email *',
      emailHint: 'Your email will not be published.',
      messageLabel: 'Your comment',
      submit: 'Send',
      cancel: 'Cancel',
      empty: 'No comments yet. Be the first to comment.',
      loading: 'Loading...',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      edited: 'edited',
      reply: 'Reply',
      replyingTo: 'Replying to',
      cancelReply: 'Cancel reply',
      ownerHint: 'You can edit or delete your own comments on this device.',
      proof: '%PCT of readers found this helpful.',
      proofEmpty: 'No reactions yet. Be the first to react.',
 
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
      action:
        | 'like'
        | 'dislike'
        | 'comment'
        | 'edit'
        | 'delete'
        | 'comment_like'
        | 'comment_dislike',
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
    [addOwnedIds, locale, record, record?.comments, slug],
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

  const onReact = useCallback(
    async (kind: 'like' | 'dislike', reactionId: string) => {
      setPulseReaction(reactionId)
      window.setTimeout(() => setPulseReaction(null), 500)
      await onVote(kind)
    },
    [onVote],
  )

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message.trim()) return
      if (!name.trim() || !email.trim()) return
      setSubmitting(true)
      setError(null)
      try {
        await sendAction(
          'comment',
          { name: name.trim(), email: email.trim(), message, parentId: replyToId },
          { trackNewOwnedIds: true },
        )
        setMessage('')
        setReplyToId(null)
        setReplyToName(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setSubmitting(false)
      }
    },
    [email, message, name, replyToId, sendAction],
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

  const onReply = useCallback((comment: EngagementComment) => {
    setReplyToId(comment.id)
    setReplyToName(comment.name)
    const input = document.getElementById('engagement-message')
    if (input instanceof HTMLInputElement) {
      input.focus()
    }
  }, [])

  const onCommentReaction = useCallback(
    async (id: string, kind: 'like' | 'dislike') => {
      setBusyId(id)
      setError(null)
      try {
        await sendAction(kind === 'like' ? 'comment_like' : 'comment_dislike', { id })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setBusyId(null)
      }
    },
    [sendAction],
  )

  const commentTree = useMemo(() => {
    if (!record?.comments) return []
    const byId = new Map<string, EngagementComment & { children: EngagementComment[] }>()
    record.comments.forEach((comment) => {
      byId.set(comment.id, { ...comment, children: [] })
    })
    const roots: (EngagementComment & { children: EngagementComment[] })[] = []
    byId.forEach((comment) => {
      if (comment.parentId && byId.has(comment.parentId)) {
        byId.get(comment.parentId)!.children.push(comment)
      } else {
        roots.push(comment)
      }
    })
    const sortByCreatedAsc = (a: EngagementComment, b: EngagementComment) =>
      +new Date(a.createdAt) - +new Date(b.createdAt)
    const sortByCreatedDesc = (a: EngagementComment, b: EngagementComment) =>
      +new Date(b.createdAt) - +new Date(a.createdAt)
    roots.sort(sortByCreatedDesc)
    const flatten: Array<{ comment: EngagementComment; depth: number }> = []
    const walk = (node: EngagementComment & { children: EngagementComment[] }, depth: number) => {
      flatten.push({ comment: node, depth })
      node.children.sort(sortByCreatedAsc)
      node.children.forEach((child) => walk(child as EngagementComment & { children: EngagementComment[] }, depth + 1))
    }
    roots.forEach((root) => walk(root, 0))
    return flatten
  }, [record?.comments])

  return (
    <section className="writingEngagement" aria-labelledby="writing-engagement-title">
      <div className="writingEngagement__votes">
        <div className="writingEngagement__reactions" role="group">
          <button
            type="button"
            className={`writingEngagement__reaction ${
              pulseReaction === 'like-thumb' ? 'is-pulsing' : ''
            }`}
            onClick={() => void onReact('like', 'like-thumb')}
            aria-label={copy.like}
            title={copy.like}
          >
            <span className="writingEngagement__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path
                  d="M7.5 10.5v9H5a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h2.5Zm2-1.5 2.7-4.8a2 2 0 0 1 3.7 1.5L15 9h3.8a2 2 0 0 1 1.9 2.6l-1.7 5.5a3 3 0 0 1-2.9 2.1H9.5v-9Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="writingEngagement__countBadge">{record?.likes ?? 0}</span>
          </button>
          <button
            type="button"
            className={`writingEngagement__reaction ${
              pulseReaction === 'dislike' ? 'is-pulsing' : ''
            }`}
            onClick={() => void onReact('dislike', 'dislike')}
            aria-label={copy.dislike}
            title={copy.dislike}
          >
            <span className="writingEngagement__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path
                  d="M16.5 13.5v-9H19a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2h-2.5Zm-2 1.5-2.7 4.8a2 2 0 0 1-3.7-1.5L9 15H5.2a2 2 0 0 1-1.9-2.6l1.7-5.5A3 3 0 0 1 7.9 4h6.6v9Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="writingEngagement__comments">
        <form className="writingEngagement__form" onSubmit={onSubmit}>
          {replyToId ? (
            <div className="writingEngagement__replyBanner">
              <span>
                {copy.replyingTo}: <strong>{replyToName}</strong>
              </span>
              <button
                type="button"
                className="writingEngagement__replyCancel"
                onClick={() => {
                  setReplyToId(null)
                  setReplyToName(null)
                }}
              >
                {copy.cancelReply}
              </button>
            </div>
          ) : null}
          <div className="writingEngagement__addComment">
            <div className="writingEngagement__avatar">
              {getInitials(name)}
            </div>
            <input
              id="engagement-message"
              className="writingEngagement__commentInput"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              maxLength={2000}
              placeholder={locale === 'tr' ? 'Yorum ekle...' : 'Add a comment...'}
              required
            />
          </div>

          <div className="writingEngagement__row writingEngagement__row--double">
            <label className="writingEngagement__label">
              {copy.nameLabel}
              <input
                className="writingEngagement__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                maxLength={80}
                required
              />
            </label>
            <label className="writingEngagement__label">
              {copy.emailLabel}
              <input
                className="writingEngagement__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={120}
                required
              />
            </label>
          </div>
          <p className="writingEngagement__hint">{copy.emailHint}</p>

          <div className="writingEngagement__actions writingEngagement__actions--compact">
            <button
              type="button"
              className="writingEngagement__cancel"
              onClick={() => {
                setMessage('')
                setName('')
                setEmail('')
              }}
            >
              {copy.cancel}
            </button>
            <button type="submit" className="writingEngagement__submit" disabled={submitting}>
              {submitting ? '...' : copy.submit}
            </button>
            {loading ? <span className="writingEngagement__hint">{copy.loading}</span> : null}
            {error ? <span className="writingEngagement__error">{error}</span> : null}
          </div>
        </form>

        <div className="writingEngagement__list" role="list">
          {commentTree.map(({ comment, depth }) => {
            const isOwned = ownedIds.has(comment.id)
            const isEditing = editingId === comment.id
            const isBusy = busyId === comment.id

            return (
              <article
                key={comment.id}
                className="writingEngagement__item"
                role="listitem"
                style={{ marginLeft: `${depth * 22}px` }}
              >
                <header className="writingEngagement__itemHeader">
                  <div className="writingEngagement__avatar writingEngagement__avatar--small">
                    {getInitials(comment.name)}
                  </div>
                  <div className="writingEngagement__itemHeaderMain">
                    <div className="writingEngagement__itemTitleRow">
                      <strong className="writingEngagement__itemName">{comment.name}</strong>
                      <span className="writingEngagement__itemTimeInline">
                        {formatDate(comment.createdAt, locale)}
                      </span>
                    </div>
                    <div className="writingEngagement__itemMeta">
                      {comment.updatedAt ? (
                        <span className="writingEngagement__edited">{copy.edited}</span>
                      ) : null}
                    </div>
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

                <div className="writingEngagement__itemEngagement">
                  <button
                    type="button"
                    className="writingEngagement__itemEngage"
                    aria-label={copy.like}
                    title={copy.like}
                    onClick={() => void onCommentReaction(comment.id, 'like')}
                    disabled={isBusy}
                  >
                    <span className="writingEngagement__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="img">
                        <path
                          d="M7.5 10.5v9H5a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h2.5Zm2-1.5 2.7-4.8a2 2 0 0 1 3.7 1.5L15 9h3.8a2 2 0 0 1 1.9 2.6l-1.7 5.5a3 3 0 0 1-2.9 2.1H9.5v-9Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="writingEngagement__itemCount">{comment.likeCount ?? 0}</span>
                  </button>
                  <button
                    type="button"
                    className="writingEngagement__itemEngage"
                    aria-label={copy.dislike}
                    title={copy.dislike}
                    onClick={() => void onCommentReaction(comment.id, 'dislike')}
                    disabled={isBusy}
                  >
                    <span className="writingEngagement__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="img">
                        <path
                          d="M16.5 13.5v-9H19a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2h-2.5Zm-2 1.5-2.7 4.8a2 2 0 0 1-3.7-1.5L9 15H5.2a2 2 0 0 1-1.9-2.6l1.7-5.5A3 3 0 0 1 7.9 4h6.6v9Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="writingEngagement__itemCount">{comment.dislikeCount ?? 0}</span>
                  </button>
                  <button
                    type="button"
                    className="writingEngagement__itemReply"
                    aria-label={copy.reply}
                    title={copy.reply}
                    onClick={() => onReply(comment)}
                  >
                    {copy.reply}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
