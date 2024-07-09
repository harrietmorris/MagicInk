<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/harrietmorris/MagicInk">
    <img src="client\assets\images\magicInkLogo.png" alt="Logo" height="110">
  </a>
</div>

# About

An interactive children's story teller Android application that harnesses the power of AI to generate custom stories.

### Watch Here

[![Watch the video](https://img.youtube.com/vi/0U4ymymIpPU/0.jpg)](https://www.youtube.com/watch?v=0U4ymymIpPU)

### Built With

[![React_Native][React_Native]][React_Native_URL]
[![Expo_Router][Expo_Router]][Expo_Router_URL]
[![NativeWind][NativeWind]][NativeWind_URL]
[![TypeScript][TypeScript]][TypeScript_URL]
[![Koajs][Koajs]][Koajs_URL]
[![PostgreSQL][PostgreSQL]][PostgreSQL_URL]
[![Prisma][Prisma]][Prisma_URL]
[![Android][Android]][Android_URL]
[![Figma][Figma]][Figma_URL]
[![Prettier][Prettier]](https://prettier.io/)

## Mobile App Set Up

### Android

- Set up your Android device or Android Emulator using [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical)

### Client Setup

Dependencies for _client_:

```
from the root directory:

cd client
npm i
```

Firebase Storage:
To create a new firebase cloud storage follow [Get Started](https://firebase.google.com/docs/storage/web/start)

Corcel Image Generative AI Setup:
To create a Corcel API key, follow [Getting Started](https://docs.corcel.io/reference/the-corcel-api)

Create a `client/.env` file with the following content:

```
FIREBASE_API=<firebase-api-key>
FIREBASE_PROFILE_IMAGE_BUCKET=<project-id.firebaseapp.com>
FIREBASE_AUTHDOMAIN=<https://project-id.firebaseio.com>
FIREBASE_PROJECTID=<project-id>
FIREBASE_MSGSENDERID=<sender-id>
FIREBASE_APPID=<app-id>
FIREBASE_MEASUREMENTID=<G-measurement-id>
FIREBASE_STORY_IMAGE_BUCKET=<'gs://projectId-myCustomBucket'>
CORTEXT_API=<corcel-api-key>
```

To run the client:

- Once your Android device/emulator is running, start the development server:
  `npx expo start`

### Server Setup

Dependencies for _server_:

```
from the root directory:

cd server
npm i
```

To generate prisma database:
`npx prisma generate`
`npx prisma migrate dev --name magicink`

To visualise the database:
`npx prisma studio -p 5553`
(the android emulator and prisma studio both use port 5555 by default)

To seed a default user while authentication is currently mocked, and we default to this (getUser(1) in loginScreen):
`npm run seed`

Gemini Story Generative AI Setup:
To create a Gemini API key, follow [Getting Started](https://ai.google.dev/gemini-api)

create a `server/.env` file with the following content:

```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/magicink?schema=public"
```

To run the server:
`npm run dev`

### Contributors:

[Regina Czech](https://github.com/reginaczech), [Harriet Morris](https://github.com/harrietmorris), [Badreddine El Rhoul](https://github.com/Badrhoul), [Sebastian Delgado von Euw](https://github.com/sebastiandve)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-gif]: client\assets\images\magicInkLogo.png
[React_Native]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React_Native_URL]: https://reactnative.dev/
[Expo_Router]: https://img.shields.io/badge/Expo_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[Expo_Router_URL]: https://docs.expo.dev/router/introduction/
[NativeWind]: https://img.shields.io/badge/NativeWind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[NativeWind_URL]: https://www.nativewind.dev/v4/getting-started/react-native
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript_URL]: https://www.typescriptlang.org/
[Koajs]: https://img.shields.io/badge/Koa.js-404D59?style=for-the-badge
[Koajs_URL]: https://koajs.com/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma_URL]: https://www.prisma.io/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL_URL]: https://www.postgresql.org/
[Android]: https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white
[Android_URL]: https://developer.android.com/studio
[Figma]: https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white
[Figma_URL]: https://www.figma.com/
[Prettier]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
