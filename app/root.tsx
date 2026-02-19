import { type ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction, LoaderFunctionArgs, useLoaderData } from "react-router";
import {PreventFlashOnWrongTheme, ThemeProvider, useTheme} from "remix-themes"
import { GeneralErrorBoundary } from './components/error-boundary'
import tailwindCss from "./styles/index.css?url";
import { themeSessionResolver } from '@/lib/session-server'
import { clsx } from 'clsx'



export const links: LinksFunction = () => [{ rel: "stylesheet", href: tailwindCss }]


export async function loader({ request }: LoaderFunctionArgs) {

  // Return the theme from the session storage using the loader
  const { getTheme } = await themeSessionResolver(request)
  return { theme: getTheme() }
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <Outlet />
    </ThemeProvider>
  )
}

export const Layout = ({ children }: { children: ReactNode }) => {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme();

  return (
    <html className={clsx(theme)} >
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      <Meta />
      <Links />
    </head>
    <body className="h-full w-full overflow-y-auto overflow-x-hidden">
    {children}
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  )
}

export const ErrorBoundary = GeneralErrorBoundary
