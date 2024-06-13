import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { ToggleTheme } from './toggle-theme'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const Header = () => {
  return (
    <header className="p-5 flex justify-between items-center border-b">
      <section className="flex justify-center gap-2 items-center">
        <Avatar>
          <AvatarImage
            src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
            alt="Avatar"
          />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <h1 className="text-slate-800 dark:text-gray-200 text-2xl font-bold">
          AI Assistant App
        </h1>
      </section>

      <section className="flex justify-center gap-2 items-center">
        <a
          href="https://github.com/iangelmanuel/ai-assistant"
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-lg p-[5.8px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <GitHubLogoIcon className="mx-auto w-6 h-6 text-slate-800 dark:text-gray-200" />
        </a>
        <ToggleTheme />
      </section>
    </header>
  )
}
