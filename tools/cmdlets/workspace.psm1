function Invoke-Workspace {
	minikube start --force --container-runtime=cri-o
}

Export-ModuleMember `
	-Function '*' `
	-Alias '*'