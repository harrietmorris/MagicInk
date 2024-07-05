# MagicInk
Senior thesis project - interactive storyteller app

## Mobile App Set Up

### Android

* Set up your Android device or Android Emulator using [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical)
* Once your Android device/emulator is up and running - start the development server, run the command `npx expo start`



### Server setup

Run the following commands to create the database and generate the prisma client:
```
    To generate prisma database:
      npx prisma generate
      npx prisma migrate dev --name magicink

    To visualise the database:
      npx prisma studio -p 5553
      (the android emulator and prisma studio both use port 5555 by default)

    To seed a default user while authentication is currently mocked, and we default to this (getUser(1) in loginScreen):
      npm run seed

    To run the backend:
      npm run dev


create a `server/.env` file with the following content:
```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/magicink?schema=public"
```

create a `client/.env` file with the following content:
  ANROID_URL=http://10.0.2.2:3000
  WEB_URL=http://localhost:3000
  FIREBASE_API= your_api_key
  FIREBASE_BUCKET= your_bucket
  FIREBASE_AUTHDOMAIN= your_authDomain
  FIREBASE_PROJECTID= your_project_id
  FIREBASE_MSGSENDERID= your_msg_Sender_Id
  FIREBASE_APPID= your_app_id
  FIREBASE_MEASUREMENTID= your_measurement_id
  FIREBASE_STORY_API= your_story_api
  CORTEXT_API= your_cortex_api

