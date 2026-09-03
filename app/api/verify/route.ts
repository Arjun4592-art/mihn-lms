import { NextRequest, NextResponse } from 'next/server'
import { getPublicCertificate } from '@/lib/certificates'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')?.trim()

  if (!id) {
    return NextResponse.json(
      { found: false, error: 'Provide a Certificate ID.' },
      { status: 400 },
    )
  }

  try {
    // Exact match on the Admin-entered Certificate ID — no reformatting.
    const certificate = await getPublicCertificate(id)
    if (!certificate) {
      return NextResponse.json({ found: false }, { status: 404 })
    }
    return NextResponse.json({ found: true, certificate })
  } catch (err) {
    console.error('verify lookup failed', err)
    return NextResponse.json(
      {
        found: false,
        error: 'Verification service is temporarily unavailable.',
      },
      { status: 500 },
    )
  }
}
