// middleware.js
import { NextResponse } from "next/server";
// No need to import NextRequest type definition in JS
import { updateSession } from "@/lib/session"; // Import the session update logic

/**
 * Middleware function to handle session validation and refresh.
 * @param {import('next/server').NextRequest} request
 */
export async function middleware(request) {
  const publicPaths = ["/login"]; // Add any other public paths

  // Check if the requested path is public
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    // Do not run session validation or update for public paths
    return NextResponse.next();
  }

  // For all non-public paths, attempt to update/validate the session
  // updateSession will handle redirection if needed
  const response = await updateSession(request);

  // If updateSession returns 'undefined', it means no token was found initially.
  // Since this isn't a public path, we must redirect to login.
  if (response === undefined) {
    const loginUrl = new URL("/login", request.url);
    console.log(
      `No session found for protected route ${request.nextUrl.pathname}, redirecting to login.`
    );
    return NextResponse.redirect(loginUrl);
  }

  // Return the response from updateSession (could be redirect or NextResponse.next())
  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - login (the login page itself, handled above) - added exclusion here for clarity too
   *
   * Note: We handle '/login' explicitly at the beginning of the middleware,
   * but excluding it here prevents unnecessary runs of the matcher logic for it.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
