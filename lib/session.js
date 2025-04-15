// lib/session.js
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Ensure the secret key is defined
const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error("JWT_SECRET_KEY environment variable is not set.");
}
const key = new TextEncoder().encode(secretKey);

// Define session duration constants from environment variables or defaults
const sessionDuration = parseInt(
  process.env.SESSION_DURATION_SECONDS || "3600",
  10
); // Default 1 hour
const maxSessionAge = parseInt(
  process.env.MAX_SESSION_AGE_SECONDS || "2592000",
  10
); // Default 30 days

/**
 * @typedef {object} SessionPayload
 * @property {string} name - User's name from the DB
 * @property {string} [userId] - Optional user ID
 * @property {string} [iss] - Optional: Issuer
 * @property {string} [aud] - Optional: Audience
 * @property {number} iat - Issued At timestamp (Unix epoch seconds)
 * @property {number} exp - Expiration timestamp (Unix epoch seconds)
 */

/**
 * Encrypts (signs) a payload into a JWT session token.
 * @param {Omit<SessionPayload, 'iat' | 'exp'>} payload - The payload to encrypt.
 * @returns {Promise<{token: string, expires: Date}>} - The generated token and its expiry date.
 */
export async function encrypt(payload) {
  const iat = Math.floor(Date.now() / 1000); // Issued at time in seconds
  const exp = iat + sessionDuration; // Expiration time in seconds

  const token = await new SignJWT({ ...payload, iat, exp })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    // .setIssuer('your-app-identifier') // Optional: Add issuer
    // .setAudience('your-app-audience') // Optional: Add audience
    .sign(key);

  const expires = new Date(exp * 1000); // Convert expiration time to Date object

  return { token, expires };
}

/**
 * Decrypts (verifies) a JWT session token.
 * Returns the payload if valid and not expired, otherwise throws an error.
 * @param {string} token - The JWT token string.
 * @returns {Promise<SessionPayload>} - The decrypted payload.
 * @throws {Error} If the token is invalid or expired.
 */
export async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
      // clockTolerance: 5, // Optional: Allow for minor clock skew (in seconds)
    });
    // Cast needed because jose's JS return type might be generic JwtPayload
    return /** @type {SessionPayload} */ (payload);
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    // You can customize error handling here if needed
    throw new Error("Session token is invalid or expired.");
  }
}

/**
 * Gets the current session payload from the request cookies (used in middleware).
 * Returns the payload if valid, null otherwise.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<SessionPayload | null>} - The session payload or null.
 */
export async function getSessionFromRequest(request) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;

  try {
    const payload = await decrypt(token);
    // Optional: Add extra validation if needed (e.g., check issuer/audience)
    return payload;
  } catch (error) {
    // Token is invalid or expired
    return null;
  }
}

/**
 * Gets the current session payload from server component/action context.
 * Returns the payload if valid, null otherwise.
 * @returns {Promise<SessionPayload | null>} - The session payload or null.
 */
export async function getSession() {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  try {
    const payload = await decrypt(token);
    // Optional: Add extra validation if needed
    return payload;
  } catch (error) {
    // Token is invalid or expired
    return null;
  }
}

/**
 * Updates the session cookie with a new expiration time (sliding session).
 * Ensures the session doesn't extend beyond the maximum age.
 * Should be called from middleware.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse | undefined>} - A response (redirect or next) or undefined if no token initially.
 */
export async function updateSession(request) {
  const token = request.cookies.get("session")?.value;
  const loginUrl = new URL("/login", request.url); // Construct login URL relative to request

  if (!token) {
    // No session token exists, middleware logic will decide if redirection is needed
    return undefined;
  }

  try {
    // Decrypt the existing token to get the payload and original issue time
    const payload = await decrypt(token);

    // Check if the session has exceeded its maximum age
    const sessionAge = Math.floor(Date.now() / 1000) - payload.iat;
    if (sessionAge >= maxSessionAge) {
      console.log("Session expired due to max age.");
      // Expire the cookie and redirect to login
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set("session", "", { expires: new Date(0), path: "/" });
      return response;
    }

    // Refresh the session: Create a new token with the same payload but updated expiration
    const { token: refreshedToken, expires: newExpires } = await encrypt({
      name: payload.name,
      userId: payload.userId,
      // Keep any other relevant claims from the original payload
    });

    // Create the response to proceed and set the refreshed cookie
    const response = NextResponse.next(); // Allow the request to continue
    response.cookies.set({
      name: "session",
      value: refreshedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: newExpires, // Set cookie expiration to match JWT expiration
      path: "/",
      sameSite: "Strict", // Or 'Lax'
    });

    return response;
  } catch (error) {
    // Decryption failed (invalid token, possibly expired before middleware check)
    console.log("Session update failed, redirecting to login.", error.message);
    // Clear the potentially invalid cookie and redirect to login
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("session", "", { expires: new Date(0), path: "/" });
    return response;
  }
}
