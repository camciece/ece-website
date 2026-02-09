import { NextRequest, NextResponse } from 'next/server'
import {
  addComment,
  addVote,
  deleteComment,
  editComment,
  getEngagement,
} from '@/lib/engagement'

type Action = 'like' | 'dislike' | 'comment' | 'edit' | 'delete'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function sanitizeRecord(record: ReturnType<typeof getEngagement>) {
  return {
    ...record,
    comments: record.comments.map(({ email: _email, ...comment }) => comment),
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const locale = request.nextUrl.searchParams.get('locale')

  if (!locale) {
    return badRequest('Missing locale')
  }

  const record = await getEngagement(slug, locale)
  return NextResponse.json(sanitizeRecord(record))
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  let body: {
    locale?: string
    action?: Action
    id?: string
    name?: string
    email?: string
    message?: string
  }

  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const locale = body.locale
  const action = body.action

  if (!locale) {
    return badRequest('Missing locale')
  }

  if (!action) {
    return badRequest('Missing action')
  }

  if (action === 'like' || action === 'dislike') {
    const record = await addVote(slug, locale, action)
    return NextResponse.json(sanitizeRecord(record))
  }

  if (action === 'delete') {
    if (!body.id) {
      return badRequest('Comment id is required')
    }
    const record = await deleteComment(slug, locale, body.id)
    return NextResponse.json(sanitizeRecord(record))
  }

  const message = body.message?.trim() ?? ''
  if (!message) {
    return badRequest('Comment message is required')
  }

  if (action === 'edit') {
    if (!body.id) {
      return badRequest('Comment id is required')
    }
    const record = await editComment(slug, locale, {
      id: body.id,
      name: body.name,
      message,
    })
    return NextResponse.json(sanitizeRecord(record))
  }

  const name = body.name?.trim() ?? ''
  if (!name) {
    return badRequest('Name is required')
  }

  const email = body.email?.trim() ?? ''
  if (!email) {
    return badRequest('Email is required')
  }

  const record = await addComment(slug, locale, {
    name,
    email,
    message,
  })
  return NextResponse.json(sanitizeRecord(record))
}
