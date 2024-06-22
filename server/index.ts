import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import router from './router';
import * as dotenv from 'dotenv';
import cors from '@koa/cors';

dotenv.config();

const app = new Koa();

//TODO: add CORS policy + URL from env
app.use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;


if (require.main === module) {
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
  })
}

module.exports = { app };


