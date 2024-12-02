export default cachedEventHandler(async () => {
  const config = useRuntimeConfig()
  const octokit = useOctokit()

  try {
    const { data: users } = await octokit.rest.activity.listStargazersForRepo({
      owner: config.public.githubOwner,
      repo: config.public.githubRepo,
    })

    const { data: repository } = await octokit.rest.repos.get({
      owner: config.public.githubOwner,
      repo: config.public.githubRepo,
    })

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
  maxAge: 60 * 60,
  swr: true,
  name: 'getActivity',
})
