# Ocho Fitness API

Any triggers and hooks we need for Ocho Fitness application can be setup in here.


## Requirements

- [Serverless](https://www.serverless.com/framework/docs/getting-started)
- [Serverless Dotenv Plugin](https://www.serverless.com/plugins/serverless-dotenv-plugin)
- [Serverless SES Templates](https://www.serverless.com/plugins/serverless-ses-template)

## Environment

You can download and update the environmental variables from the parameter store.

[development]

```shell
aws ssm get-parameter \
--region us-east-1 \
--name /ocho-fitness/api/.env.development \
--profile ochofitness \
--query Parameter.Value \
--with-decryption \
--output text > .env.development
```

```shell
aws ssm put-parameter \
--region us-east-1 \
--name /ocho-fitness/api/.env.development \
--profile ochofitness \
--value file://.env.development \
--type "SecureString" \
--overwrite
```

[production]

```shell
aws ssm get-parameter \
--region us-east-1 \
--name /ocho-fitness/api/.env.production \
--profile ochofitness \
--query Parameter.Value \
--with-decryption \
--output text > .env.production
```

```shell
aws ssm put-parameter \
--region us-east-1 \
--name /ocho-fitness/api/.env.production \
--profile ochofitness \
--value file://.env.production \
--type "SecureString" \
--overwrite
```

## Serverless

Be sure to update the custom->profiles value within the `serverless.yml` if you do not have a profile
named `albawebstudio` setup in your AWS credentials. Best practice would be to create a new profile named
`albawebstudio` with the credentials you have for the **albawebstudio** account.

## Update SES Templates

If you make any changes to the email templates in the email folder, you will want to make sure you
complete a build within that directory (use command in `package.json`).

Once that build has completed you can deploy the SES Template using the following command. Replace the
environment in the command with the appropriate value ['development', 'production'].

[deploy]

```shell
sls ses-template deploy --stage <enviornment>
```

You can list all SES Templates using the following command.

[list]

```shell
sls ses-template list
```

## API Deployment

You can use the scripts provided in the `package.json` to deploy the Ocho Fitness API to the AWS environment.

[deploy options]

```shell
yarn run deploy:staging
```

or

```shell
sls deploy --stage staging
```

## Testing Functions

You can use the following commands along with the JSON data found in the `/test/*` directory locally.

Note that the `event-admin-confirmation.json` file uses a signature, so you will need to use the values generated in the
confirmation email.

```shell
sls invoke local --function contactForm -p ./test/contact-form.json
```

or

```shell
sls invoke local --function scheduleSession -p ./test/schedule-session.json
```
