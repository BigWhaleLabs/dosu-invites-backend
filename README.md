# Dosu-invites backend code

This repository is used as the backend for dosu-invites.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/Borodutch/backend-starter`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name    | Description                              |
| ------- | ---------------------------------------- |
| `MONGO` | URL of the mongo database                |
| `JWT`   | secret for JWT                           |
| `PORT`  | Port to run server on (defaults to 1337) |

Also, please, consider looking at `.env.sample`.