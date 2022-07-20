set nocompatible
set nobackup
set nowb
set noswapfile

let g:nvim_test_js_vimrc_loaded = 1

let s:plugin = expand('<sfile>:h:h:h:h')
execute 'set runtimepath+='.s:plugin
