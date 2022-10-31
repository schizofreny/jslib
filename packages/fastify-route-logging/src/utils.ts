import minimatch from "minimatch"

export function matchesGlob(url: string | undefined, globs: string[]) {
  if (!url) {
    return false
  }

  for (const glob of globs) {
    const matches = minimatch(url, glob)
    if (matches) {
      return true
    }
  }

  return false
}
