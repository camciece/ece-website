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
  const [shareOpen, setShareOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [shareTitle, setShareTitle] = useState('')
  const [shareCopied, setShareCopied] = useState(false)

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
        share: 'Paylaş',
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
        ownerHint: 'Sadece kendi yorumlarını düzenleyebilir veya silebilirsin.',
        proof: 'Okurların %PCT’i bu yazıyı faydalı buldu.',
        proofEmpty: 'Henüz tepki yok. İlk tepkiyi sen ver.',
        shareSheetTitle: 'Paylaş',
        shareLinkedIn: 'LinkedIn',
        shareX: 'X',
        shareFacebook: 'Facebook',
        shareInstagram: 'Instagram',
        shareEmail: 'E-posta ile paylaş',
        shareCopy: 'Bağlantıyı kopyala',
        shareCopied: 'Bağlantı kopyalandı',
      }
    }

    return {
      title: 'Comments',
      like: 'Liked it',
      dislike: "Didn't like",
      share: 'Share',
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
      ownerHint: 'You can edit or delete your own comments on this device.',
      proof: '%PCT of readers found this helpful.',
      proofEmpty: 'No reactions yet. Be the first to react.',
      shareSheetTitle: 'Share to...',
      shareLinkedIn: 'LinkedIn',
      shareX: 'X',
      shareFacebook: 'Facebook',
      shareInstagram: 'Instagram',
      shareEmail: 'Share via email',
      shareCopy: 'Copy link',
      shareCopied: 'Link copied',
    }
  }, [locale])

  useEffect(() => {
    if (!shareOpen) return
    setShareUrl(window.location.href)
    setShareTitle(document.title)
  }, [shareOpen])

  useEffect(() => {
    if (!shareOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShareOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [shareOpen])

  useEffect(() => {
    if (!shareCopied) return
    const timer = window.setTimeout(() => setShareCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [shareCopied])

  const shareLinks = useMemo(() => {
    if (!shareUrl) return []
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    return [
      {
        id: 'linkedin',
        label: copy.shareLinkedIn,
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        id: 'x',
        label: copy.shareX,
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      },
      {
        id: 'facebook',
        label: copy.shareFacebook,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        id: 'instagram',
        label: copy.shareInstagram,
        href: 'https://www.instagram.com/',
      },
      {
        id: 'email',
        label: copy.shareEmail,
        href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      },
    ]
  }, [copy.shareEmail, copy.shareFacebook, copy.shareLinkedIn, copy.shareX, shareTitle, shareUrl])

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
          { name: name.trim(), email: email.trim(), message },
          { trackNewOwnedIds: true },
        )
        setMessage('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setSubmitting(false)
      }
    },
    [email, message, name, sendAction],
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
          <button
            type="button"
            className={`writingEngagement__reaction writingEngagement__reaction--share ${
              pulseReaction === 'share' ? 'is-pulsing' : ''
            }`}
            onClick={() => {
              setPulseReaction('share')
              window.setTimeout(() => setPulseReaction(null), 500)
              setShareOpen(true)
            }}
            aria-label={copy.share}
            title={copy.share}
          >
            <span className="writingEngagement__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path
                  d="M15 5 21 12 15 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 12H9a5 5 0 0 0-5 5v2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="writingEngagement__shareLabel">{copy.share}</span>
          </button>
        </div>
      </div>

      {shareOpen ? (
        <div className="writingEngagement__shareOverlay" role="presentation">
          <div className="writingEngagement__shareBackdrop" onClick={() => setShareOpen(false)} />
          <div
            className="writingEngagement__shareSheet"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'tr' ? 'Paylaşım seçenekleri' : 'Share options'}
          >
            <header className="writingEngagement__shareHeader">
              <button
                type="button"
                className="writingEngagement__shareClose"
                onClick={() => setShareOpen(false)}
                aria-label={locale === 'tr' ? 'Paylaş penceresini kapat' : 'Close share dialog'}
              >
                ×
              </button>
            </header>

            <div className="writingEngagement__sharePrimary" role="list">
              {shareLinks
                .filter(
                  (item) =>
                    item.id === 'linkedin' ||
                    item.id === 'x' ||
                    item.id === 'facebook' ||
                    item.id === 'instagram',
                )
                .map((item) => (
                  <a
                    key={item.id}
                    className={`writingEngagement__sharePrimaryItem writingEngagement__sharePrimaryItem--${item.id}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    role="listitem"
                  >
                    <span className="writingEngagement__shareLogo" aria-hidden="true">
                      {item.id === 'linkedin' ? (
                        <svg viewBox="0 0 24 24" role="img">
                          <path
                            d="M5.2 9.2h3.1V19H5.2V9.2Zm1.6-1.5a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm4.3 1.5h3v1.3h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5v5.1h-3.1v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.6h-3.1V9.2Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : null}
                      {item.id === 'x' ? (
                        <svg viewBox="0 0 24 24" role="img">
                          <path
                            d="M4 5h3.8l3.3 4.7L15.2 5H20l-6.7 7.3L20.5 20h-3.8l-3.9-5.3L8.1 20H3.3l7.2-8L4 5Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : null}
                      {item.id === 'facebook' ? (
                        <svg viewBox="0 0 24 24" role="img">
                          <path
                            d="M14 9h2.5V6.2c-.4-.1-1.2-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V12H8.2v3h2.4v6h3v-6h2.6l.4-3h-3v-1.9c0-.8.2-1.1 1.4-1.1Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : null}
                      {item.id === 'instagram' ? (
                        <svg viewBox="0 0 24 24" role="img">
                          <path
                            d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm4 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : null}
                    </span>
                    <span className="writingEngagement__sharePrimaryLabel">{item.label}</span>
                  </a>
                ))}
            </div>

            <div className="writingEngagement__shareSecondary" role="list">
              {shareLinks
                .filter((item) => item.id === 'email')
                .map((item) => (
                  <a
                    key={item.id}
                    className="writingEngagement__shareSecondaryItem"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    role="listitem"
                  >
                    <span className="writingEngagement__shareSecondaryIcon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="img">
                        <path
                          d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="writingEngagement__shareSecondaryLabel">{item.label}</span>
                  </a>
                ))}
            </div>

            <div className="writingEngagement__shareCopyRow">
              <label className="writingEngagement__shareCopyLabel">
                <span className="writingEngagement__shareCopyText">{copy.shareCopy}</span>
                <div className="writingEngagement__shareCopyField">
                  <input
                    className="writingEngagement__shareCopyInput"
                    value={shareUrl || window.location.href}
                    readOnly
                  />
                  <button
                    type="button"
                    className="writingEngagement__shareCopyButton"
                    onClick={() => {
                      void navigator.clipboard?.writeText(shareUrl || window.location.href)
                      setShareCopied(true)
                    }}
                  >
                    {shareCopied ? copy.shareCopied : locale === 'tr' ? 'Kopyala' : 'Copy'}
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      ) : null}

      <div className="writingEngagement__comments">
        <form className="writingEngagement__form" onSubmit={onSubmit}>
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
          {record?.comments.map((comment) => {
            const isOwned = ownedIds.has(comment.id)
            const isEditing = editingId === comment.id
            const isBusy = busyId === comment.id

            return (
              <article key={comment.id} className="writingEngagement__item" role="listitem">
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
                  </button>
                  <button
                    type="button"
                    className="writingEngagement__itemEngage"
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
                  <button
                    type="button"
                    className="writingEngagement__itemReply"
                    aria-label={locale === 'tr' ? 'Yanıtla' : 'Reply'}
                    title={locale === 'tr' ? 'Yanıtla' : 'Reply'}
                  >
                    {locale === 'tr' ? 'Yanıtla' : 'Reply'}
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
