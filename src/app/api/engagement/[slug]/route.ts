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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const locale = request.nextUrl.searchParams.get('locale')

  if (!locale) {
    return badRequest('Missing locale')
  }

  const record = getEngagement(slug, locale)
  return NextResponse.json(record)
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
    const record = addVote(slug, locale, action)
    return NextResponse.json(record)
  }

  if (action === 'delete') {
    if (!body.id) {
      return badRequest('Comment id is required')
    }
    const record = deleteComment(slug, locale, body.id)
    return NextResponse.json(record)
  }

  const message = body.message?.trim() ?? ''
  if (!message) {
    return badRequest('Comment message is required')
  }

  if (action === 'edit') {
    if (!body.id) {
      return badRequest('Comment id is required')
    }
    const record = editComment(slug, locale, {
      id: body.id,
      name: body.name,
      message,
    })
    return NextResponse.json(record)
  }

  const record = addComment(slug, locale, {
    name: body.name,
    message,
  })
  return NextResponse.json(record)
}
