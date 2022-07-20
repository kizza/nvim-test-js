import {NeovimClient} from "neovim";

export const setBuffer = async (
  nvim: NeovimClient,
  input: string | string[],
  fileType = "text",
) => {
  await nvim.command(`set filetype=${fileType}`);

  const lines = (Array.isArray(input) ? input : [input]) as string[]
  await nvim.command("normal ggdG")
  await nvim.buffer.setLines(
    lines.map(line => line.replace("|", "")),
    {start: 0, end: -1}
  )

  const cursorIndex = lines.findIndex(line => line.indexOf("|") !== -1)
  if (cursorIndex >= 0) {
    const cursorX = lines[cursorIndex].indexOf("|")
    await nvim.command(
      `call setpos(".", [0, ${cursorIndex + 1}, ${cursorX + 1}, 0])`,
    );
  }
}

export const getBuffer = async (nvim: NeovimClient) =>
  (await nvim.buffer.getLines()).join("\n")
