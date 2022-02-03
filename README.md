# Dosu Invites backend code

This repository is used as the backend for dosu-invites.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/dosu-invites-backend`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Create a `video/timelapse.mp4` file with the video you want to use for the invites
5. Setup the [infura ETH project][infuraproject] and use project id and secret keys in `.env`
6. For Win64 and Linux run `yarn start-ipfs`, keep it alive. For MacOs run the official [IPFS app](https://docs.ipfs.io/install/ipfs-desktop/). Copy the address port that goes after `API` (advanced settings on main page at app)
7. Run `yarn develop` in another terminal window

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

[infuraproject]: https://infura.io/dashboard
