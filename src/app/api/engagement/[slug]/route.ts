import { NextRequest, NextResponse } from 'next/server'
import type { EngagementRecord } from '@/lib/engagement'
import {
  addComment,
  addCommentReaction,
  addVote,
  deleteComment,
  editComment,
  getEngagementStoreKind,
  getEngagement,
} from '@/lib/engagement'

type Action =
  | 'like'
  | 'dislike'
  | 'comment'
  | 'edit'
  | 'delete'
  | 'comment_like'
  | 'comment_dislike'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function sanitizeRecord(record: EngagementRecord) {
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
  return NextResponse.json(sanitizeRecord(record), {
    headers: { 'x-engagement-store': getEngagementStoreKind() },
  })
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
    parentId?: string
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
    return NextResponse.json(sanitizeRecord(record), {
      headers: { 'x-engagement-store': getEngagementStoreKind() },
    })
  }

  if (action === 'comment_like' || action === 'comment_dislike') {
    if (!body.id) {
      return badRequest('Comment id is required')
    }
    const record = await addCommentReaction(
      slug,
      locale,
      body.id,
      action === 'comment_like' ? 'like' : 'dislike',
    )
    return NextResponse.json(sanitizeRecord(record), {
      headers: { 'x-engagement-store': getEngagementStoreKind() },
    })
  }

  if (action === 'delete') {
    if (!body.id) {
      return badRequest('Comment id is required')
    }
    const record = await deleteComment(slug, locale, body.id)
    return NextResponse.json(sanitizeRecord(record), {
      headers: { 'x-engagement-store': getEngagementStoreKind() },
    })
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
    return NextResponse.json(sanitizeRecord(record), {
      headers: { 'x-engagement-store': getEngagementStoreKind() },
    })
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
    parentId: body.parentId,
  })
  return NextResponse.json(sanitizeRecord(record), {
    headers: { 'x-engagement-store': getEngagementStoreKind() },
  })
}
