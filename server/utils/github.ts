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
  const owner = config.public.githubOwner
  const repo = config.public.githubRepo

  try {
    const { data: users } = await octokit.rest.activity.listStargazersForRepo({ owner, repo })
    const { data: repository } = await octokit.rest.repos.get({ owner, repo })

    return {
      stars: repository.stargazers_count,
      users: users
        .slice(0, 4)
        .filter((user) => 'login' in user)
        .map((user) => ({ name: user.login, avatar: user.avatar_url })),
    }
  } catch (e) {
    // todo: handle error
    console.error(e)
  }

  return {
    stars: 0,
    users: [],
  }
}, {
  name: 'getActivityStats',
  maxAge: 60 * 60,
})
