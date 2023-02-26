@{
	'Rules' = @{
		'PSAvoidUsingCmdletAliases' = @{
			'allowlist' = @(
				'cd',
				'dir',
				'echo',
				'%',
				"?"
			)
		}
	}
}