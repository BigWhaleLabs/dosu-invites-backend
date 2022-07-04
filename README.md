# Dosu Invites backend code

IPFS frames uploader for Dosu Invites NFT.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/dosu-invites-backend`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Put the token pictures into `tokens`, each file should be named like `0000000.png`, `0000001.png` etc
5. [Install `ipfs` on your system](https://docs.ipfs.io/install/command-line/#official-distributions)
6. Run `ipfs init --profile server`
7. Run the daemon `ipfs daemon`
8. Install [GoLang](https://go.dev/dl/) and [ipfs-sync](https://github.com/TheDiscordian/ipfs-sync)
9. Install `ipfs-sync`: `go install github.com/TheDiscordian/ipfs-sync`
10. You might need to add installed go binaries to your `$HOME`
11. Create `~/.ipfs-sync-example.yaml` similar to `.ipfs-sync-example.yaml`
12. Make sure that `PUBLIC_TOKENS_FOLDER` and `Dir` inside `~/.ipfs-sync.yaml` are the same
13. Run `ipfs-sync`
14. Run `yarn start`

## Environment variables

| Name                            | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `PORT`                          | Port to run the server on (defaults to `1337`)                |
| `ETH_NETWORK`                   | Ethereum network (defaults to @bwl/constants)                 |
| `ETH_RPC`                       | Ethereum node RPC URI (defaults to @bwl/constants)            |
| `DOSU_INVITES_CONTRACT_ADDRESS` | Dosu Invites contract address                                 |
| `IPFS_PATH`                     | After running `yarn start-ipfs`, copy the address after `API` |
| `PUBLIC_TOKENS_FOLDER`          | The folder, which `ipfs-sync` watches                         |
| `TOKENS_BASE_URI`               | The base URI for the token pictures                           |
| `WEBSITE_URL`                   | The website url                                               |

Also, please, consider looking at `.env.sample`.
