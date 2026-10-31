import { NextRequest, NextResponse } from 'next/server';
import {
  enforceRateLimit,
  parseSafeRequestBody,
  verifyCsrfAndOrigin,
  isPostgresConfigured,
} from '../../../../lib/serverSecurity';
import {
  isValidEmail,
  sanitizeEmail,
  sanitizeSingleLine,
  SECURITY_LIMITS,
} from '../../../../utils/security';

export async function POST(req: NextRequest) {
  const csrfError = verifyCsrfAndOrigin(req);
  if (csrfError) return csrfError;

  const rateLimitError = enforceRateLimit(req, 'auth-session', 10, 60_000);
  if (rateLimitError) return rateLimitError;

  const parsed = await parseSafeRequestBody<{
    action?: string;
    email?: string;
    firstName?: string;
    passwordLength?: number;
  }>(req, 4096);

  if (!parsed.ok) return parsed.response;

  const { action, email: rawEmail, firstName: rawFirstName, passwordLength } = parsed.data;
  const email = sanitizeEmail(rawEmail);

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  if (action === 'register') {
    const firstName = sanitizeSingleLine(rawFirstName, SECURITY_LIMITS.MAX_NAME_LENGTH);
    if (!firstName || firstName.length < 2) {
      return NextResponse.json(
        { error: 'First name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (
      typeof passwordLength === 'number' &&
      (passwordLength < SECURITY_LIMITS.MIN_PASSWORD_LENGTH ||
        passwordLength > SECURITY_LIMITS.MAX_PASSWORD_LENGTH)
    ) {
      return NextResponse.json(
        { error: 'Password must be between 6 and 128 characters.' },
        { status: 400 }
      );
    }
  }

  const displayName =
    sanitizeSingleLine(rawFirstName, SECURITY_LIMITS.MAX_NAME_LENGTH) ||
    email.split('@')[0] ||
    'Scholar';

  return NextResponse.json({
    ok: true,
    dbConnected: isPostgresConfigured(),
    user: {
      email,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      role: 'Scholar Reader',
    },
  });
}
