import { Octokit } from 'octokit'

let _octokit: Octokit

export function useOctokit() {
  if (!_octokit) {
    const config = useRuntimeConfig()

    _octokit = new Octokit({
      auth: config.githubToken,
    })
  }
  return _octokit
}

export const getActivityStats = defineCachedFunction(async () => {
  const octokit = useOctokit()
  const config = useRuntimeConfig()
  const { owner, repo } = config.public.github

  try {
    const { data: contributors } = await octokit.rest.repos.listContributors({ owner, repo })
    const { data: users } = await octokit.rest.activity.listStargazersForRepo({ owner, repo })

    const stack = new Map<string, { type: string, name: string, avatar: string }>()

    users
      .filter((user) => 'login' in user)
      .forEach((user) => stack.set(user.login, { type: 'star', name: user.login, avatar: user.avatar_url }))

    contributors
      .filter((contributor) => 'login' in contributor && contributor.login)
      .forEach((contributor) => stack.set(contributor.login!, {
        type: 'contributor',
        name: contributor.login!,
        avatar: contributor.avatar_url!,
      }))

    return {
      users: [...stack.values()].reverse(),
    }
  } catch (e) {
    console.error(e)
  }

  return {
    users: [],
  }
}, {
  name: 'getActivityStats',
  maxAge: 60 * 60,
})
