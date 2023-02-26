$theme = 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/atomicBit.omp.json'
$file = '~/.config/powershell/atomicBit.json'

if (-not (Test-Path $file)) {
	curl -sS $theme > $file
}

oh-my-posh init pwsh --config $file | Invoke-Expression

$cmdlets = Resolve-Path -Path "$($PSScriptRoot)/../../tools/cmdlets/feuertiger.psd1"
Import-Module -Name $cmdlets