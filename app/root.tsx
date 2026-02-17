import { type ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction } from "react-router";
import { GeneralErrorBoundary } from './components/error-boundary'
import tailwindCss from "./styles/index.css?url";



export const links: LinksFunction = () => [{ rel: "stylesheet", href: tailwindCss }]

export default function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html  >
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
