# Dosu Invites backend code

IPFS frames uploader for Dosu Invites NFT.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/dosu-invites-backend`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Put the token pictures into `tokens`, each file should be named like `0000000.png`, `0000001.png` etc.
5. [Install `ipfs` on your system](https://docs.ipfs.io/install/command-line/#official-distributions)
6. Run `ipfs init --profile server`
7. Run `ipfs key gen dosu`. The generated file can be imported to gain access to uploading to the same folder with `ipfs key import dosu ./dosu`
8. Run the daemon `ipfs daemon`
9. Install [GoLang](https://go.dev/dl/) and [ipfs-sync](https://github.com/TheDiscordian/ipfs-sync)
10. Set `TOKENS_FOLDER` in your `.env` and change the `{TOKENS_FOLDER}` in `.ipfs-sync.yaml` to the same folder
11. Run `yarn ipfs-watch`
12. Run `yarn develop`

## Environment variables

| Name                | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `ETH_NETWORK`       | Ethereum network                                              |
| `INFURA_PROJECT_ID` | Infura project id                                             |
| `CONTRACT_ADDRESS`  | Dosu invites contract address                                 |
| `IPFS_PATH`         | After running `yarn start-ipfs`, copy the address after `API` |
| `TOKENS_FOLDER`     | The folder, which `ipfs-sync` watches                         |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch get deployed to the server automatically with [ci-ninja](https://github.com/backmeupplz/ci-ninja).
