import { githubLink, ngsekeLink } from '@/lib/link'
import { IconBrandGithubFilled } from '@tabler/icons-react'

export function Footer() {
  return (
    <footer className="flex flex-wrap bg-zinc-900 ">
      <div className="mx-auto w-full max-w-[50rem] px-4 py-8 font-mono text-sm opacity-70">
        Made by
        {' '}
        <a href={ngsekeLink} className="font-medium hover:underline" target="_blank">
          @ngseke
        </a>
        <span className="mx-2 opacity-70 after:content-['/']" />
        <a href={githubLink} className="inline-block align-middle" target="_blank">
          <IconBrandGithubFilled size={18} />
        </a>
      </div>
    </footer>
  )
}
