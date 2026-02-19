/*
* Cookie utility functions using manual document.cookie approach
* Replaces js-cookie dependency for better consistency
*/


const DEFAULT_MAX_AGE = 24*604_800; // 6 months

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | undefined {
  "use client"

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    return cookieValue
  }
  return undefined
}

/**
 * Set a cookie with name, value, and optional max age
 */
export function setCookie(
  name: string,
  value: string,
  maxAge: number = DEFAULT_MAX_AGE
): void {
  "use client"

  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`
}

/**
 * Remove a cookie by setting its max age to 0
 */
export function removeCookie(name: string): void {
  "use client"

  document.cookie = `${name}=; path=/; max-age=0`
}