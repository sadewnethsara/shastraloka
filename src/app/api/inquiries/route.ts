import { NextRequest, NextResponse } from 'next/server';
import {
  enforceRateLimit,
  parseSafeRequestBody,
  verifyCsrfAndOrigin,
  isPostgresConfigured,
} from '../../../lib/serverSecurity';
import {
  isValidEmail,
  sanitizeEmail,
  sanitizeSingleLine,
  sanitizeText,
  SECURITY_LIMITS,
} from '../../../utils/security';

export async function POST(req: NextRequest) {
  const csrfError = verifyCsrfAndOrigin(req);
  if (csrfError) return csrfError;

  const rateLimitError = enforceRateLimit(req, 'inquiries-submission', 10, 60_000);
  if (rateLimitError) return rateLimitError;

  const parsed = await parseSafeRequestBody<{
    type?: 'contact' | 'manuscript' | 'review';
    name?: string;
    email?: string;
    topic?: string;
    title?: string;
    message?: string;
  }>(req, 12_288);

  if (!parsed.ok) return parsed.response;

  const { type = 'contact', name, email, topic, title, message } = parsed.data;
  const cleanName = sanitizeSingleLine(name, SECURITY_LIMITS.MAX_NAME_LENGTH);
  const cleanMessage = sanitizeText(message, SECURITY_LIMITS.MAX_INQUIRY_MESSAGE_LENGTH);

  if (!cleanName || cleanName.length < 2) {
    return NextResponse.json(
      { error: 'Please provide a valid name (at least 2 characters).' },
      { status: 400 }
    );
  }

  if (type === 'contact') {
    const cleanEmail = sanitizeEmail(email);
    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }
    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json(
        { error: 'Please enter a message of at least 5 characters.' },
        { status: 400 }
      );
    }
  }

  if (type === 'manuscript') {
    const cleanTitle = sanitizeSingleLine(title, SECURITY_LIMITS.MAX_MANUSCRIPT_TITLE_LENGTH);
    if (!cleanTitle || cleanTitle.length < 3) {
      return NextResponse.json(
        { error: 'Please provide a valid manuscript title.' },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    dbConnected: isPostgresConfigured(),
    sanitized: {
      name: cleanName,
      topic: sanitizeSingleLine(topic, 120),
      title: sanitizeSingleLine(title, SECURITY_LIMITS.MAX_MANUSCRIPT_TITLE_LENGTH),
      message: cleanMessage,
    },
  });
}
