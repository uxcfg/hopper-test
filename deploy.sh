#!/usr/bin/env sh

set -e


npm run build

cd dist


git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/uxcfg/hopper-test.git
git push -f git@github.com:uxcfg/hopper-test.git main:gh-pages

cd -