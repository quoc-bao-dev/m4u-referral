import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  // A list of all locales that are supported
  locales: routing.locales,

  // Used when no locale matches
  defaultLocale: routing.defaultLocale,

  // Chỉ hiển thị prefix cho các locale không phải default (vi)
  // Tiếng Việt sẽ không có /vi/ trong URL
  localePrefix: 'as-needed',

  // Tắt tự động nhận dạng ngôn ngữ
  localeDetection: false,
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

