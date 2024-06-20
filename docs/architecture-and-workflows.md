# Architecture and Workflows

## Deploy

This app is currently deployed on [Vercel](https://vercel.com/). Currently we host:

- One Production build
- Multiple Preview builds

To support online builds we have 2 databases:

- One Production database hosted at Vercel
- One shared database hosted at Vercel for the Preview Apps

## Workflows

### Preview

This step will create a new preview build for the app. The preview build will be deployed to Vercel and will be available at a unique URL and connected to the shared database. Workflow steps:

1. Lint
2. Test
3. Migrate database
4. Clean previous deploys for that branch
5. Build
6. Deploy

Please note, there is a custom setup for managing preview apps, this will be covered later in this documentation.

### Production

This step will create a new production build for the app. The production build will be deployed to Vercel and will be available at the main URL and connected to the production database. Workflow steps:

1. Lint
2. Test
3. Migrate database
4. Build
5. Deploy

Please note, on this step we are not performing the cleanup step.

### Cleanup

Every time a PR is created a new Preview environment will be released for it. On every update we will remove previous deploys for the PR before deploying the new one.

Following this condition, a PR will have at least one deploy running while opened. This Workflow aims on also deleting the Preview environment for the PR when it is closed or merged. Leaving no stale environments.

#### Cleanup process

We decided to remove the automatic workflows from vercel and implement our own workflows directly with GitHub Actions. This way we have more control over the process and can implement custom logic without being bound to vercel (only to Microsoft :smiling_imp:).

Vercel auto deploy will keep multiple deploys for the same Pull Request,
these are only deleted after a 30 day stale period or when the branch is closed.

Our system cleanup will make sure that, after each new PR update, only the most recent deploy is kept. This way we avoid having multiple deploys for the same PR.

Cleaning up consists in a simple strategy. When we create a new deploy we add a metadata tag containing the PR number. When we are about to deploy a new version we check for all deploys with the same PR number and delete them.
