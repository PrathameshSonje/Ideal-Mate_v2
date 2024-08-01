import NextAuth from "next-auth"
import authConfig from "../auth.config"
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/lib/middleware/routes'

const { auth } = NextAuth(authConfig);

export default auth((req) : any => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const ispublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) return null;

    // if(isAuthRoute) {
    //   if(isLoggedIn) {
    //     return Response.redirect(new URL('/', nextUrl))
    //   }
    //   return null
    // }

    return null;

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}