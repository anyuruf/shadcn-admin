import { Toaster as Sonner, ToasterProps } from 'sonner'
import { useTheme } from 'remix-themes'
import { CSSProperties } from 'react'


export function Toaster({ ...props }: ToasterProps) {
  const [theme] = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group [&_div[data-content]]:w-full'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as CSSProperties
      }
      {...props}
    />
  )
}
