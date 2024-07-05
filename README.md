# MagicInk
Senior thesis project - interactive storyteller app

## Mobile App Set Up

### Android

* Set up your Android device or Android Emulator using [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical)


### Client Setup
To run the client:
* Once your Android device/emulator is running, start the development server:
  `npx expo start`

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


### Server Setup
To run the backend:
  `npm run dev`

create a `server/.env` file with the following content:
```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/magicink?schema=public"
```
Run the following commands to create the database and generate the prisma client:
```

npx prisma generate
npx prisma migrate dev --name magicink
