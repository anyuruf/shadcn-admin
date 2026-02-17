import { createThemeSessionResolver } from "remix-themes"
import { createCookieSessionStorage, redirect, } from "react-router";



// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme-session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    // Todo enable env variable
    secrets: [String(process.env.VITE_THEME_SESSION_SECRET)],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "https://outlet.com", secure: true }
      : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(themeSessionStorage)

const sidebarSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sidebar-session",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 192, // 6 months
    secrets: [String(process.env.VITE_THEME_SESSION_SECRET)],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "https://outlet.com", secure: true }
      : {}),
  },
})

const SIDEBAR_SESSION_STATE = "sidebar-state";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sidebarSessionStorage.getSession(cookie)
}

export async function getSidebarState(
  request: Request
): Promise<boolean | undefined> {
  const session = await getSession(request)
  const sidebarState = session.get(SIDEBAR_SESSION_STATE)
  return sidebarState
}

export async function createSidebarSession({
  request,
  sidebarState,
  remember,
  redirectTo,
}: {
  request: Request
  sidebarState: boolean
  remember: boolean
  redirectTo: string
}) {
  const session = await getSession(request)
  session.set(SIDEBAR_SESSION_STATE, sidebarState)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  })
}
