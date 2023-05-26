# @putout/plugin-github [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-github.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-github"npm"

> Automate, customize, and execute your software development workflows right in your repository with **GitHub Actions**.
>
> (c) [github.com](https://docs.github.com/en/actions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with [**Github Actions**](https://github.com/features/actions).

## Install

```
npm i @putout/plugin-github -D
```

## Rules

```json
{
    "rules": {
        "github/set-node-versions": "on",
        "github/set-coveralls": "on",
        "github/set-checkout-version": "on",
        "github/set-setup-node-version": "on",
        "github/set-add-and-commit": "on"
    }
}
```

## set-node-versions

```diff
jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
-       node-version: [16.x, 18.x, 19.x]
+       node-version: [16.x, 18.x, 20.x]
```

You can override versions with:

```json
{
    "rules": {
        "github/set-node-versions": ["on", {
            "versions": [
                "18.x",
                "20.x"
            ]
        }]
    }
}
```

## set-covveralls-versions

```diff
    - name: Coveralls
-       uses: coverallsapp/github-action@master
+       uses: coverallsapp/github-action@v2
```

## set-checkout-version

```diff
  steps:
-      - uses: actions/checkout@v2
+      - uses: actions/checkout@v3
```

## set-setup-node-version

```diff
  steps:
-      - uses: actions/setup-node@v2
+      - uses: actions/setup-node@v3
```

## set-add-and-commit

```diff
  steps:
-      uses: EndBug/add-and-commit@v7
+      uses: EndBug/add-and-commit@v9
```

## License

MIT
