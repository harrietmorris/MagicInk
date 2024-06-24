# MagicInk
Senior thesis project - interactive storyteller app

## Mobile App Set Up

### Android

* Set up your Android device or Android Emulator using [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical)
* Once your Android device/emulator is up and running - start the development server, run the command `npx expo start`



### Server setup
To run the backend:
  npm run dev

create a `server/.env` file with the following content:
```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/magicink?schema=SCHEMA"
```
Run the following commands to create the database and generate the prisma client:
```

npx prisma generate
npx prisma migrate dev --name magicink
