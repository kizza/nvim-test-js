import * as cp from "child_process";
import {attach, NeovimClient} from "neovim";
import * as path from "path";

const defaultOptions = {
  vimrc: path.resolve(__dirname, "vimrc.vim"),
  cwd: __dirname
}

export type VimOptions = Partial<typeof defaultOptions>
export type WithVim = (nvim: NeovimClient) => Promise<void>;

const startVim = async (options: VimOptions) => {
  const {vimrc, cwd} = {...defaultOptions, ...options}
  const proc = cp.spawn("nvim", ["-u", vimrc, "-i", "NONE", "--embed"], {cwd: cwd});
  const nvim: NeovimClient = attach({proc});
  nvim.uiAttach(120, 120, {}).catch(_ => {});
  return {proc, nvim};
};

const stopVim = (nvim: NeovimClient, proc: cp.ChildProcess) => {
  nvim.quit();
  proc.kill("SIGKILL");
};

export const vimRunner = (options: VimOptions = {}) =>
  async (test: WithVim) => {
    const {nvim, proc} = await startVim(options);
    await delay(100);
    await test(nvim);
    stopVim(nvim, proc);
  };

export const withVim = vimRunner(defaultOptions)

export const delay = (milliseconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(() => resolve(), milliseconds);
  });
