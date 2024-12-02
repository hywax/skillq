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
