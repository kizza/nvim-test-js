# Test your vim with js

A harness for testing vim via javascript. Provides an ergonimic interface to a [NeovimClient](https://neovim.io/node-client/) for easy testing of vim (plugins or the like).


## How to use it

Use the entrypoint `withVim` to encapsulate your test with a live headless vim instance.  You can then exercise vim to your liking via the [NeovimClient](https://neovim.io/node-client/) api.

```js
import assert from "assert";
import {withVim} from "../src/vim";

it("gives me the vim", () =>
  withVim(async nvim => {
    const result = await nvim.commandOutput('echo "It works!"');
    assert.equal(result, "It works!");
  }));
```
