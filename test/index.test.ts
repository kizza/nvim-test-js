import assert from "assert";
import {withVim, vimRunner} from "../src/vim";
import * as path from "path";

describe("nvim-test-js", () => {
  it("loads the test vimrc", () =>
    withVim(async nvim => {
      const loaded = (await nvim.getVar("nvim_test_js_vimrc_loaded")) as boolean;

      assert.equal(loaded, true);
    }));

  describe("vimRunner", () => {
    it("allows a custom vimrc", () => {
      const withOtherVim = vimRunner({
        vimrc: path.resolve(__dirname, "helpers", "test_vimrc.vim"),
      });

      return withOtherVim(async nvim => {
        const loaded = (await nvim.getVar("nvim_other_test_vimrc_loaded")) as boolean;

        assert.equal(loaded, true);
      });
    })
  });
});
