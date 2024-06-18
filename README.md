# Voting System

This project has the objective to emulate a Brazilian automated electoral system. It uses [Notion](https://www.notion.so/) databases
as a way for the user to create new elections and also to store election results.

## Requirements

To run this project locally you will need:

- [Yarn](https://yarnpkg.com/).
- [Docker](https://docs.docker.com/engine/install/).

### Environment setup

Copy the `.env.local.example` in the same folder using the name `.env.local`. Setup it with your personal
Notion API key.

### Running the app locally

To run the app locally, you will need to run the following commands:

```bash
docker compose up -d

yarn dev
```

Docker will setup a simple postgres database, the following yarn command will startup the app locally.

## References

- [Architecture and Workflows](docs/architecture-and-workflows.md).
