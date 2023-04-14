# Test your vim with js
[![Tests](https://github.com/kizza/nvim-test-js/actions/workflows/tests.yml/badge.svg)](https://github.com/kizza/nvim-test-js/actions/workflows/tests.yml)

A harness for testing vim via javascript. Provides an ergonimic interface to a [NeovimClient](https://neovim.io/node-client/) for easy testing of vim (plugins or the like).

## How to install it

Install `nvim-test-js` along with your chosen test runner (I'm using [yarn](https://yarnpkg.com/), and am choosing [mocha](https://mochajs.org/) to run my tests with)
```sh
yarn init
yarn add nvim-test-js mocha
```
Then add the `test` script name to your `package.json` and run with `yarn test`
```json
"scripts": {
  "test": "mocha --exit test/**/*.test.js",
}
```

### Typescript?

I find it easier to explore unknown apis (like Neovim's) with typescript.  If you have the same preference you can do the above but with typescript:

```sh
yarn init
yarn add nvim-test-js mocha @types/mocha @types/node ts-node typescript
```
Then your `test` script in your `package.json` would become:
```json
"scripts": {
  "test": "mocha --require ts-node/register --exit test/**/*.test.ts",
}
```

## How to use it

Use the entrypoint `withVim` to encapsulate your test with a live headless vim instance.  You can then exercise vim to your liking via the [NeovimClient](https://neovim.io/node-client/) api.  Depending on whether you're running typescript or vanilla js - you can execute the files below with `yarn test`

```js
// test/index.test.js

const assert = require("assert");
const { withVim } = require("nvim-test-js");

it("gives me the vim", () =>
  withVim(async nvim => {
    const result = await nvim.commandOutput('echo "It works!"');
    assert.equal(result, "It works!");
  }));
```

```typescript
// test/index.test.ts

import assert from "assert";
import withVim from "nvim-test-js";

it("gives me the vim", () =>
  withVim(async nvim => {
    const result = await nvim.commandOutput('echo "It works!"');
    assert.equal(result, "It works!");
  }));
```


## A few helpers

Commonly when testing plugins I find I need to setup the buffer with the cursor in a particular location.
A helper method for this is available as `setBuffer` where the cursor is represented by `|`.

```js
import assert from "assert";
import withVim, {getBuffer, setBuffer} from "nvim-test-js";

it("poulates a buffer with a cursor position", () =>
  withVim(async nvim => {
    await setBuffer(nvim, "f|oo")

    assert.deepEqual(await getBuffer(nvim), "foo")
    assert.deepEqual(await nvim.call("getpos", "."), [0, 1, 2, 0])
  }));

it("can do the same with an array of lines", () =>
  withVim(async nvim => {
    await setBuffer(nvim, ["foo", "b|ar"])

    assert.equal(await getBuffer(nvim), "foo\nbar")
    assert.deepEqual(await nvim.call("getpos", "."), [0, 2, 2, 0])
  }));
```

## Why?

I do enjoy playing with vim projects - but after all that work I find myself fatigued when testing it with vim related frameworks annd concepts.  Give me some good ol' mocha, or jest or whatever and I'm happier.  I find the javascript testing universe much more joyful - maybe you will too.
