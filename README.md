# Path to happiness

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
It is a little hobby project about an idea that I had a few years ago.
The goal of the project is to allow people all over the world to share
their "path to happiness" with others. This is done via a bucket list
that shows the steps necessary to achieve happiness.

## Technologies used

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Daisy-UI](https://daisyui.com/)

## Development setup

After cloning this project you need to copy the `.env.example` file
to `.env` and adjust the important configuration like database URL, etc.

This project contains a `docker-compose.yml` file that can be used to
setup a PostgreSQL database.

In `package.json` you can find a script called `loadMockData` which
will load some mock data for development.
To push the schema to Prisma, you can run the script `pushDb`.

## Current progress

Currently it includes following features:
- Sign in via E-Mail, Discord and Google
- Sign out of a signed in user
- Creation of a new bucket list for a signed in user
- Viewing of bucket lists for any user with an infinite scrollable
- Liking / Unliking bucket lists for signed in users
- Change between light and dark theme

Currently missing:
- Editing of bucket lists
- Reporting of bucket lists

## Screenshots

#### Sign in page in light theme:
![image](https://user-images.githubusercontent.com/93260/215586562-681102f1-d743-4881-a656-bdb90d25f1ca.png)

#### Home page in dark theme when signed in:
![image](https://user-images.githubusercontent.com/93260/215586756-302de40a-3898-4e0e-bcd4-681ea8972c0f.png)

#### Creating a new bucket list:
![image](https://user-images.githubusercontent.com/93260/215587178-62e98611-5965-47a1-a6ab-08d6a700464a.png)

#### Viewing bucket lists:
![image](https://user-images.githubusercontent.com/93260/215587432-249bcd52-c4eb-4894-842c-6d4ac72e6059.png)


