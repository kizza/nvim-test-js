import assert from "assert";
import {withVim} from "../src/vim";

describe("nvim-test-js", () => {
  it("loads the test vimrc", () =>
    withVim(async nvim => {
      const loaded = (await nvim.getVar("nvim_test_js_vimrc_loaded")) as boolean;

      assert.equal(loaded, true);
    }));
});
