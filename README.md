# Voting System

This project has the objective to emulate a Brazilian automated electoral system. It uses [Notion](https://www.notion.so/) databases
as a way for the user to create new elections and also to store election results.

## Requirements

To run this project locally you will need:

- A [Notion](https://www.notion.so/) account.
- [Yarn](https://yarnpkg.com/).

### Notion setup

To fully use this project API, you need to setup 2 databases in your notion personal account and create a Notion API key.
To help you with that, we created [this tutorial](https://www.notion.so/podcodar/Docs-7e84b843b0ee496d8f4bf3e59683072a)!

Follow the steps to setup your local environment before running the project.

### Environment setup

Copy the `.env.local.example` in the same folder using the name `.env.local`. Setup it with your personal
Notion API key.

## API

The API uses Notion as a database, both to retrieve fresh election data and to post new election results for the user.

If you want to reproduce and check the endpoints locally you can import our Postman Collection
with this link `https://www.getpostman.com/collections/0b1b920ad7fcd92280c3`.

After loading it in your Postman, you only need to set the `databaseId` and `pageId` variables
for the environment. Both you can get by checking the databases you created before.
