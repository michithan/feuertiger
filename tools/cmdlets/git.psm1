function Clear-GitHistory {
	git reset $(git commit-tree 'HEAD^{tree}' -m "A new start")
}

Export-ModuleMember `
	-Function '*' `
	-Alias '*'