/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/',
];


/**
 * An array of routes that are used for authentication
 * These routes will ridirect users to the current route
 * @type {string[]}
 */

export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/signout'
];

/**
 * The Prefix for api authentication routes
 * Routes start with this prefix are used for
 API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = 'api/auth';