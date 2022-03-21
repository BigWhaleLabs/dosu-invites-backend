# Dosu Invites backend code

This repository is used as the backend for dosu-invites.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/dosu-invites-backend`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. [Install `ipfs` for your system](https://docs.ipfs.io/install/command-line/#official-distributions)
5. Create a `video/timelapse.mp4` file with the video you want to use for the invites
6. Setup the [infura ETH project](https://infura.io/dashboard) and use project id and secret keys in `.env`
7. Run `ipfs init --profile server` and `ipfs daemon &` (`&` is used to run it in parralel in one window), keep it alive. Also, use the official [IPFS app](https://docs.ipfs.io/install/ipfs-desktop/). Copy the address port that goes after `API` (advanced settings on main page at app)
8. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name                    | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `PORT`                  | Port to run server on (defaults to 1336)                      |
| `MONGO`                 | URL of the mongo database                                     |
| `ETH_NETWORK`           | Ethereum network                                              |
| `INFURA_PROJECT_ID`     | Infura project id                                             |
| `INFURA_PROJECT_SECRET` | Infura project secret                                         |
| `CONTRACT_ADDRESS`      | Dosu invites contract address                                 |
| `IPFS_PATH`             | After running `yarn start-ipfs`, copy the address after `API` |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch get deployed to [backend.invites.dosu.io](https://backend.invites.dosu.io) automatically with [ci-ninja](https://github.com/backmeupplz/ci-ninja).
