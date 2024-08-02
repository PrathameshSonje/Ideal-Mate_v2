import NextAuth from "next-auth"
import authConfig from "../auth.config"
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/lib/middleware/routes'

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const ispublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute || ispublicRoutes) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/dashboard', nextUrl))
    }
    return null
  }

  if (isLoggedIn) {
    return null;
  } else {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}