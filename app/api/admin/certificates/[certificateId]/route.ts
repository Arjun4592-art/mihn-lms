import { NextRequest, NextResponse } from 'next/server'
import {
  requireAdmin,
  getCertificateAdmin,
  updateCertificate,
  deleteCertificate,
} from '@/lib/certificates'

export const dynamic = 'force-dynamic'

function errorResponse(err: unknown) {
  const status = (err as { status?: number })?.status ?? 400
  const message = err instanceof Error ? err.message : 'Something went wrong.'
  return NextResponse.json({ error: message }, { status })
}

type Params = { certificateId: string }

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  try {
    await requireAdmin(request)
    const { certificateId } = await context.params
    const certificate = await getCertificateAdmin(certificateId)
    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found.' },
        { status: 404 },
      )
    }
    return NextResponse.json({ certificate })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  try {
    await requireAdmin(request)
    const { certificateId } = await context.params
    const body = await request.json()
    const certificate = await updateCertificate(certificateId, body)
    return NextResponse.json({ certificate })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  try {
    await requireAdmin(request)
    const { certificateId } = await context.params
    await deleteCertificate(certificateId)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return errorResponse(err)
  }
}
