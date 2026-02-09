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

export function getEngagement(slug: string, locale: string): EngagementRecord {
  const store = readStore()
  const key = keyFor(slug, locale)
  return store[key] ?? emptyRecord()
}

export function addVote(
  slug: string,
  locale: string,
  kind: 'like' | 'dislike',
): EngagementRecord {
  return updateRecord(slug, locale, (current) => ({
    ...current,
    likes: current.likes + (kind === 'like' ? 1 : 0),
    dislikes: current.dislikes + (kind === 'dislike' ? 1 : 0),
  }))
}

export function addComment(
  slug: string,
  locale: string,
  input: { name?: string; email?: string; message: string },
): EngagementRecord {
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

  return updateRecord(slug, locale, (current) => ({
    ...current,
    comments: [comment, ...current.comments].slice(0, 200),
  }))
}

export function editComment(
  slug: string,
  locale: string,
  input: { id: string; name?: string; message: string },
): EngagementRecord {
  const message = input.message.trim()
  if (!message) {
    return getEngagement(slug, locale)
  }

  const maybeName = input.name?.trim()
  const nextName = maybeName && maybeName.length > 0 ? maybeName : undefined
  const updatedAt = new Date().toISOString()

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

export function deleteComment(
  slug: string,
  locale: string,
  id: string,
): EngagementRecord {
  return updateRecord(slug, locale, (current) => ({
    ...current,
    comments: current.comments.filter((comment) => comment.id !== id),
  }))
}
