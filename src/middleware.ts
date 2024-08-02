import NextAuth from "next-auth"
import authConfig from "../auth.config"
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT
} from '@/lib/middleware/routes'

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(nextUrl.pathname);
  

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const ispublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if(!isLoggedIn && !ispublicRoutes) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}