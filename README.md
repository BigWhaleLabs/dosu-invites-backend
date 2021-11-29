# Dosu Invites backend code

This repository is used as the backend for dosu-invites.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/dosu-invites-backend`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Create a `video/timelapse.mp4` file with the video you want to use for the invites
5. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name   | Description                              |
| ------ | ---------------------------------------- |
| `PORT` | Port to run server on (defaults to 1337) |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch get deployed to [backend.invites.dosu.io](https://backend.invites.dosu.io) automatically with [ci-ninja](https://github.com/backmeupplz/ci-ninja).
