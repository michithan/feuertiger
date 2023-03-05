echo "Setup vim"

$AutoloadDir = "$($HOME)/.local/share/nvim/site/autoload"

mkdir -p $AutoloadDir

curl -sSL 'https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim' -o "$($AutoloadDir)/plug.vim"