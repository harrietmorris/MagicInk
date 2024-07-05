# MagicInk
Senior thesis project - interactive storyteller app

## Mobile App Set Up

### Android

* Set up your Android device or Android Emulator using [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical)
* Once your Android device/emulator is up and running - start the development server, run the command `npx expo start`



### Server setup
To generate prisma database:
  npx prisma generate
  npx prisma migrate dev --name magicink

To visualise the database:
  npx prisma studio -p 5553
  (the android emulator and prisma studio both use port 5555 by default)

To seed a default user (while authentication is currently mocked):
  npm run seed

To run the backend:
  npm run dev


create a `server/.env` file with the following content:
```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/magicink?schema=public"
```
Run the following commands to create the database and generate the prisma client:
```

