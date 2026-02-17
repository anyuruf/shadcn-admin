import { useEffect } from 'react'
import { Check, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Theme, useTheme } from 'remix-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitch() {
  const [theme, setTheme] = useTheme();

  /* Update theme-color meta tag
   * when theme is updated */
  // Optimized: Memoize the resolved theme calculation to prevent unnecessary re-computations
  const resolvedTheme = () => {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.DARK
        : Theme.LIGHT
    setTheme(systemTheme)
  }

  useEffect(() => {
    const themeColor = Theme.DARK ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          <Sun className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          Light{' '}
          <Check
            size={14}
            className={cn('ms-auto', theme !== Theme.LIGHT && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          Dark
          <Check
            size={14}
            className={cn('ms-auto', theme !== Theme.DARK && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => resolvedTheme()}>
          System
          <Check
            size={14}
            className={cn('ms-auto')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
