echo "Install dnf packages"

dnf update -y
dnf install -y epel-release epel-next-release
dnf reinstall -y shadow-utils
dnf --enablerepo=epel install -y --allowerasing \
	at-spi2-atk \
	atk \
	buildah \
	cups-libs \
	curl \
	dotnet-sdk-7.0 \
	fuse-overlayfs --exclude container-selinux \
	git \
	gtk3 \
	hostname \
	iputils \
	novnc \
	nss \
	podman \
	powershell \
	procps-ng \
	slirp4netns \
	sudo \
	supervisor \
	tigervnc-server \
	unzip \
	vim-common \
	wget \
	which \
	xdpyinfo \
	xorg-x11-fonts-Type1 \
	xterm

echo "Install binaries"

curl -sSL https://dl.k8s.io/release/v1.26.0/bin/linux/amd64/kubectl -o /usr/bin/kubectl &
curl -sSL https://github.com/neovim/neovim/releases/download/v0.8.3/nvim-linux64.tar.gz | tar xzf - --directory=/usr/bin/ &
curl -sSL https://github.com/derailed/k9s/releases/download/v0.27.3/k9s_Linux_amd64.tar.gz | tar xzf - --directory=/usr/bin/ &
curl -sSL https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 -o /usr/bin/minikube &
wait

chmod +x /usr/bin/k9s &
chmod +x /usr/bin/kubectl &
chmod +x /usr/bin/minikube &
chmod +x /usr/bin/nvim-linux64/bin/nvim &
ln -sf /usr/bin/nvim-linux64/bin/nvim /usr/bin/nvim &
wait

echo "Clean up"

rm -rf /var/cache /var/log/dnf* /var/log/yum.*
