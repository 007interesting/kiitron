#!/bin/bash
export PATH=$PATH:/root/.foundry/bin/:/usr/local/go/bin/
export HOMEDIR=/root
git clone https://github.com/KiiChain/kiichain.git ~/kiichain
cd ~/kiichain
curl -L https://foundry.paradigm.xyz | bash
foundryup
wget -c https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
go
make build-clean
mkdir /root/config
cp genesis/genesis.json $HOMEDIR/config/genesis.json
./build/bin/kiichaind comet unsafe-reset-all --home $HOMEDIR
./build/bin/kiichaind start --pruning=default --trace --log_level info --api.enabled-unsafe-cors --api.enable --api.swagger --minimum-gas-prices=1tkii --home $HOMEDIR
./build/bin/kiichaind comet show-validator --home $HOMEDIR
