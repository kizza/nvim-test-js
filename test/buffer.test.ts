import assert from "assert";
import {getBuffer, setBuffer} from "../src/buffer";
import {withVim} from "../src/vim";

describe("Buffer", () => {
  describe("setBuffer", () => {
    it("sets the entire buffer", () =>
      withVim(async nvim => {
        await nvim.buffer.append("foo")
        await nvim.buffer.append("bar")
        await setBuffer(nvim, "baz")

        assert.deepEqual(await nvim.buffer.getLines(), ["baz"])
      }));
  });

  describe("getBuffer", () => {
    it("returns the entire buffer", () =>
      withVim(async nvim => {
        await nvim.command("normal ifoo")
        await nvim.buffer.append("bar")

        assert.deepEqual(await getBuffer(nvim), "foo\nbar")
      }));
  });

  describe("setBuffer", () => {
    it("sets a file type", () =>
      withVim(async nvim => {
        await setBuffer(nvim, "foo", "typescript")

        assert.equal(await nvim.commandOutput("echo &filetype"), "typescript")
      }));

    it("works with a cursor provided", () =>
      withVim(async nvim => {
        await setBuffer(nvim, "f|oo")

        assert.deepEqual(await getBuffer(nvim), "foo")
        assert.deepEqual(await nvim.call("getpos", "."), [0, 1, 2, 0])
      }));

    context("with an array", () => {
      it("works without a cursor", () =>
        withVim(async nvim => {
          await setBuffer(nvim, ["foo", "bar"])

          assert.deepEqual(await getBuffer(nvim), "foo\nbar")
        }));

      it("works with a cursor provided", () =>
        withVim(async nvim => {
          await setBuffer(nvim, ["foo", "b|ar"])

          assert.deepEqual(await nvim.call("getpos", "."), [0, 2, 2, 0])
          assert.deepEqual(await getBuffer(nvim), "foo\nbar")
        }));
    })
  });
});
