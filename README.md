## Ludumlib

## Table of Contents

- [Ludumlib](#ludumlib)
- [Table of Contents](#table-of-contents)
- [About](#about)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)

## About

Ludumlib is a web application created for video game enthusiasts that enables them to discover games, track the games they have played, view their gaming habits through a personal anayltics dashboard and more.

View the demo at [[https://-phi.vercel.app/](https://ludumlib.vercel.app/)](https://ludumlib.vercel.app/).

The application is developed with [Next.js](https://nextjs.org/) - a React Framework. The backend API is developed with [Node.js](https://expressjs.com) and [Express.js](https://expressjs.com). The backend is also connected to a [MongoDB](https://mongodb.com) database.
Authentication was built with [Firebase](https://firebase.google.com/).

## Running the Application

First, install the node dependencies:

```bash
# from the root folder
npm install
# or
yarn install
```

The application uses various services that require private configuration in a .env.local file. If you already have the .env.local file then this will already be configured.

However, if you are cloning from a remote repository then you will need to create a .env.local file in the root folder and add the following configurations using your private keys

```
// MongoDB Configs
MONGODB_URI=
MONGODB_DB=

// Google Cloud Storage Configs
PROJECT_ID=
CLIENT_EMAIL=
PRIVATE_KEY=
BUCKET_NAME=

//Firebase Configs
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Then you can run the development app locally:

```bash
npm run dev
# or
yarn run dev
```

## Deployment

I have also deployed a demo of the full application online at [[https://-phi.vercel.app/](https://ludumlib.vercel.app/)](https://ludumlib.vercel.app/).

- The application was deployed on the [Vercel Platform](https://vercel.com/).
