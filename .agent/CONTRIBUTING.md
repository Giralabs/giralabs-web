# Contributing Guide — Agent Brief

Operative rules for any AI agent or automated contributor working in this
repository. The canonical, full-length document is [`CONTRIBUTING.md`](../CONTRIBUTING.md)
at the repository root; it is the source of truth and wins on any point not
covered here or in case of disagreement. This file exists so an agent loads the
binding rules before it writes a single line, without restating the whole guide
and letting the two copies drift apart.

## Non-negotiables

1. **Never work directly on `main`.** Every change enters through a branch and a
   Pull Request. `main` is protected and must stay deployable at all times.
2. **Everything in English.** Code, comments, commit messages, branch names, PR
   titles and PR descriptions. This holds even when the conversation with the
   user is in another language.
3. **No secrets.** Never commit `.env` files, API keys, tokens or credentials.
   Before staging, check that nothing that belongs in `.gitignore` is included.
4. **Small, atomic commits.** One coherent, complete change per commit. If the
   message needs the word "and", it is probably two commits.
5. **Never mix unrelated changes** in one commit or one PR. When a working tree
   holds two independent workstreams, stage them separately — hunk by hunk if
   they share files — rather than bundling them.
6. **Sync before starting.** Pull the base branch at the start of every session.

## Branches

Format: `type/short-description-in-kebab-case` — all lowercase, hyphen
separated, no special characters.

| Prefix      | Use                                                   |
| ----------- | ----------------------------------------------------- |
| `feature/`  | New functionality                                     |
| `fix/`      | Bug fix during development                            |
| `hotfix/`   | Urgent fix going straight from `main` to production   |
| `refactor/` | Restructuring that does not change behaviour          |
| `docs/`     | Documentation-only changes                            |
| `chore/`    | Maintenance: dependencies, configuration, tooling     |

Branches are created from the base branch, live only as long as the work, and
are deleted after merging.

## Commits

Conventional Commits: `<type>(<optional scope>): <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `chore`, `revert`.

- Description in lowercase, imperative mood, no trailing period — "add", never
  "added" or "adds.".
- Keep the first line at 50 characters where possible; detail belongs in the body.
- The body explains **what** and **why**, never **how** — the how is the code.
- Breaking changes: mark the type with `!` and explain under a `BREAKING CHANGE:`
  footer.

Prefer `git add <file>` or `git add -p` over `git add .`, so nothing unintended
is ever staged.

## Code comments

Comments are part of the codebase: kept up to date, written in English, and
carrying information the code cannot express by itself. Explain intent,
constraints and edge cases — never mechanics.

Section comments divide a file into named logical blocks, in ALL CAPS:

```
// ----- SECTION NAME --------------------
```

Block comments sit directly above the code they describe, with no blank line
between, and start with an uppercase letter. Public APIs use the language's doc
comment syntax so the text surfaces in editors.

Inline comments start with a lowercase letter, stay short, and follow the code
after two spaces:

```
const timeout = 10_000;  // provider default is 15s, cut for perceived speed
```

`TODO` and `FIXME` are allowed but must carry context explaining what is pending
or what is broken. Never use comments to disable code permanently — delete it,
Git remembers.

## Pull Requests

Before opening one: the branch is rebased on its base, the project builds, the
linter passes, and there are no `console.log`/`print` leftovers, commented-out
code, temporary files or secrets.

The title follows the commit convention. The description answers what the change
does, why, and how to verify it. Keep PRs small enough to review properly.

Every PR into `main` needs at least one approval. Resolve every review comment
before merging; disagreement is discussed in the thread, never ignored. Default
merge strategy is **squash and merge**. Delete the branch afterwards.

## Rebasing and conflicts

```
git fetch origin
git rebase origin/main
```

Resolve conflicts by hand keeping what is correct from both sides, then
`git add <file>` and `git rebase --continue`. `git rebase --abort` backs out.
After rebasing an already-pushed branch, push with `--force-with-lease` — never
plain `--force` on a shared branch.

## Versioning

See `VERSIONING.md` for when to bump MAJOR/MINOR/PATCH, how releases are tagged,
how changelogs are written, and how hotfixes are handled.
