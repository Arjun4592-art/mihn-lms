import { NextRequest, NextResponse } from 'next/server'
import {
  requireAdmin,
  listCertificates,
  createCertificate,
} from '@/lib/certificates'

export const dynamic = 'force-dynamic'

function errorResponse(err: unknown) {
  const status = (err as { status?: number })?.status ?? 400
  const message = err instanceof Error ? err.message : 'Something went wrong.'
  return NextResponse.json({ error: message }, { status })
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
    const certificates = await listCertificates()
    return NextResponse.json({ certificates })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request)
    const body = await request.json()

    const required = [
      'certificateId',
      'credential',
      'learnerName',
      'issuedOn',
      'validity',
    ] as const
    for (const field of required) {
      if (!body?.[field]) {
        return NextResponse.json(
          { error: `"${field}" is required.` },
          { status: 422 },
        )
      }
    }

    const certificate = await createCertificate(body)
    return NextResponse.json({ certificate }, { status: 201 })
  } catch (err) {
    return errorResponse(err)
  }
}
