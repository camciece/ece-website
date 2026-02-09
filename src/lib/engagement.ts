import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

export type EngagementComment = {
  id: string
  name: string
  email?: string
  message: string
  createdAt: string
  updatedAt?: string
}

export type EngagementRecord = {
  likes: number
  dislikes: number
  comments: EngagementComment[]
}

type Store = Record<string, EngagementRecord>

const baseDir = process.env.VERCEL
  ? path.join('/tmp', 'ece-website')
  : process.cwd()
const dataDir = path.join(baseDir, 'data')
const dataFile = path.join(dataDir, 'engagement.json')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const useSupabase = Boolean(supabaseUrl && supabaseServiceKey)

export function getEngagementStoreKind() {
  return useSupabase ? 'supabase' : 'file'
}

type SupabaseCommentRow = {
  id: string
  slug: string
  locale: string
  name: string
  email?: string | null
  message: string
  created_at: string
  updated_at?: string | null
}

type SupabaseReactionRow = {
  slug: string
  locale: string
  likes: number
  dislikes: number
  updated_at?: string | null
}

async function supabaseFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase env vars are missing')
  }
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase error: ${res.status} ${text}`)
  }
  if (res.status === 204) {
    return [] as T
  }
  return (await res.json()) as T
}

function mapCommentRow(row: SupabaseCommentRow): EngagementComment {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    message: row.message,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? undefined,
  }
}

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '{}\n', 'utf8')
  }
}

function safeParseStore(raw: string): Store {
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      return parsed as Store
    }
    return {}
  } catch {
    return {}
  }
}

function readStore(): Store {
  ensureDataFile()
  const raw = fs.readFileSync(dataFile, 'utf8')
  return safeParseStore(raw)
}

function writeStore(store: Store) {
  ensureDataFile()
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2) + '\n', 'utf8')
}

function keyFor(slug: string, locale: string) {
  return `${locale}::${slug}`
}

function emptyRecord(): EngagementRecord {
  return { likes: 0, dislikes: 0, comments: [] }
}

function updateRecord(
  slug: string,
  locale: string,
  updater: (current: EngagementRecord) => EngagementRecord,
): EngagementRecord {
  const store = readStore()
  const key = keyFor(slug, locale)
  const current = store[key] ?? emptyRecord()
  const next = updater(current)
  store[key] = next
  writeStore(store)
  return next
}

export async function getEngagement(slug: string, locale: string): Promise<EngagementRecord> {
  if (!useSupabase) {
    const store = readStore()
    const key = keyFor(slug, locale)
    return store[key] ?? emptyRecord()
  }

  const [comments, reactions] = await Promise.all([
    supabaseFetch<SupabaseCommentRow[]>(
      `engagement_comments?slug=eq.${encodeURIComponent(slug)}&locale=eq.${encodeURIComponent(
        locale,
      )}&select=id,slug,locale,name,email,message,created_at,updated_at&order=created_at.desc&limit=200`,
    ),
    supabaseFetch<SupabaseReactionRow[]>(
      `engagement_reactions?slug=eq.${encodeURIComponent(slug)}&locale=eq.${encodeURIComponent(
        locale,
      )}&select=slug,locale,likes,dislikes&limit=1`,
    ),
  ])

  const reaction = reactions[0]
  return {
    likes: reaction?.likes ?? 0,
    dislikes: reaction?.dislikes ?? 0,
    comments: comments.map(mapCommentRow),
  }
}

export async function addVote(
  slug: string,
  locale: string,
  kind: 'like' | 'dislike',
): Promise<EngagementRecord> {
  if (!useSupabase) {
    return updateRecord(slug, locale, (current) => ({
      ...current,
      likes: current.likes + (kind === 'like' ? 1 : 0),
      dislikes: current.dislikes + (kind === 'dislike' ? 1 : 0),
    }))
  }

  const rows = await supabaseFetch<SupabaseReactionRow[]>(
    `engagement_reactions?slug=eq.${encodeURIComponent(slug)}&locale=eq.${encodeURIComponent(
      locale,
    )}&select=slug,locale,likes,dislikes&limit=1`,
  )
  const current = rows[0]
  if (!current) {
    await supabaseFetch<SupabaseReactionRow[]>(
      'engagement_reactions',
      {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          slug,
          locale,
          likes: kind === 'like' ? 1 : 0,
          dislikes: kind === 'dislike' ? 1 : 0,
        }),
      },
    )
    return getEngagement(slug, locale)
  }

  const nextLikes = current.likes + (kind === 'like' ? 1 : 0)
  const nextDislikes = current.dislikes + (kind === 'dislike' ? 1 : 0)
  await supabaseFetch<SupabaseReactionRow[]>(
    `engagement_reactions?slug=eq.${encodeURIComponent(slug)}&locale=eq.${encodeURIComponent(
      locale,
    )}`,
    {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ likes: nextLikes, dislikes: nextDislikes }),
    },
  )
  return getEngagement(slug, locale)
}

export async function addComment(
  slug: string,
  locale: string,
  input: { name?: string; email?: string; message: string },
): Promise<EngagementRecord> {
  const name = (input.name ?? '').trim() || 'Anonymous'
  const email = (input.email ?? '').trim() || undefined
  const message = input.message.trim()

  if (!message) {
    return getEngagement(slug, locale)
  }

  const comment: EngagementComment = {
    id: randomUUID(),
    name: name.slice(0, 80),
    email: email?.slice(0, 120),
    message: message.slice(0, 2000),
    createdAt: new Date().toISOString(),
  }

  if (!useSupabase) {
    return updateRecord(slug, locale, (current) => ({
      ...current,
      comments: [comment, ...current.comments].slice(0, 200),
    }))
  }

  await supabaseFetch<SupabaseCommentRow[]>(
    'engagement_comments',
    {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        id: comment.id,
        slug,
        locale,
        name: comment.name,
        email: comment.email ?? null,
        message: comment.message,
        created_at: comment.createdAt,
      }),
    },
  )
  return getEngagement(slug, locale)
}

export async function editComment(
  slug: string,
  locale: string,
  input: { id: string; name?: string; message: string },
): Promise<EngagementRecord> {
  const message = input.message.trim()
  if (!message) {
    return getEngagement(slug, locale)
  }

  const maybeName = input.name?.trim()
  const nextName = maybeName && maybeName.length > 0 ? maybeName : undefined
  const updatedAt = new Date().toISOString()

  if (!useSupabase) {
    return updateRecord(slug, locale, (current) => ({
      ...current,
      comments: current.comments.map((comment) => {
        if (comment.id !== input.id) return comment
        return {
          ...comment,
          name: (nextName ?? comment.name).slice(0, 80),
          message: message.slice(0, 2000),
          updatedAt,
        }
      }),
    }))
  }

  await supabaseFetch<SupabaseCommentRow[]>(
    `engagement_comments?id=eq.${encodeURIComponent(
      input.id,
    )}&slug=eq.${encodeURIComponent(slug)}&locale=eq.${encodeURIComponent(locale)}`,
    {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        name: (nextName ?? 'Anonymous').slice(0, 80),
        message: message.slice(0, 2000),
        updated_at: updatedAt,
      }),
    },
  )
  return getEngagement(slug, locale)
}

export async function deleteComment(
  slug: string,
  locale: string,
  id: string,
): Promise<EngagementRecord> {
  if (!useSupabase) {
    return updateRecord(slug, locale, (current) => ({
      ...current,
      comments: current.comments.filter((comment) => comment.id !== id),
    }))
  }

  await supabaseFetch<SupabaseCommentRow[]>(
    `engagement_comments?id=eq.${encodeURIComponent(
      id,
    )}&slug=eq.${encodeURIComponent(slug)}&locale=eq.${encodeURIComponent(locale)}`,
    { method: 'DELETE' },
  )
  return getEngagement(slug, locale)
}
