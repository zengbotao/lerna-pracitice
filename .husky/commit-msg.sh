#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npm run lint
console.log('..')
npx commitlint --edit $1