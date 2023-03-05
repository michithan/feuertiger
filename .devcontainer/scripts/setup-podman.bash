echo "Setup Podman"

curl -sSL https://raw.githubusercontent.com/containers/libpod/master/contrib/podmanimage/stable/containers.conf >/etc/containers/containers.conf &
curl -sSL https://raw.githubusercontent.com/containers/libpod/master/contrib/podmanimage/stable/podman-containers.conf >/home/tiger/.config/containers/containers.conf &
wait

useradd -u 1000 -g 0 tiger
echo 'tiger:10000:5000' >/etc/subuid &
echo 'tiger:10000:5000' >/etc/subgid &
wait

mkdir -p \
	/run/user/1000 \
	/var/lib/shared/overlay-images \
	/var/lib/shared/overlay-layers \
	/var/lib/shared/vfs-images \
	/var/lib/shared/vfs-layers

touch /var/lib/shared/overlay-images/images.lock &
touch /var/lib/shared/overlay-layers/layers.lock &
touch /var/lib/shared/vfs-images/images.lock &
touch /var/lib/shared/vfs-layers/layers.lock &
wait

chmod 644 /etc/containers/containers.conf &
chown tiger:tiger -R /home/tiger &
chown tiger:tiger /run/user/1000 &
wait
