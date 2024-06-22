# MagicInk
Senior thesis project - interactive storyteller app

## Mobile App Set Up

### Android

* Set up your Android device or Android Emulator using [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical)
* Once your Android device/emulator is up and running - start the development server, run the command `npx expo start`



### Server setup
create a `server/.env` file with the following content:
```
GEMINI_API_KEY=your_gemini_api_key
```

PostgreSQL set up:
 server/.env:
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
    example - DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    
