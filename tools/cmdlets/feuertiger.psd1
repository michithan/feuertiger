@{
	ModuleVersion     = '1.0.0'
	FunctionsToExport = '*'
	CmdletsToExport   = '*'
	VariablesToExport = '*'
	AliasesToExport   = '*'
	NestedModules     = @(
		'git.psm1',
		'workspace.psm1'
	)
}