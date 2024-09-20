/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/',
    '/api/uploadthing',
    '/api/download-pdf',
    '/pricing'
];


/**
 * An array of routes that are used for authentication
 * These routes will ridirect users to the current route
 * @type {string[]}
 */

export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error'
];

/**
 * The Prefix for api authentication routes
 * Routes start with this prefix are used for
 API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"