echo "Setup powershell"

curl -sSL 'https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/posh-linux-amd64' -o '/usr/bin/oh-my-posh'
chmod +x '/usr/bin/oh-my-posh'
oh-my-posh font install FiraCode

$userProfile = '/home/tiger/.config/powershell/Microsoft.PowerShell_profile.ps1'

if (-not (test-path $userProfile)) {
	new-item -path $userProfile -force | out-null
}

$findProfileScript = "dir -recurse -force -filter '.profile.ps1' | select -first 1 | % { . `$_.fullName }"
$findProfileScript > $userProfile