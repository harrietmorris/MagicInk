import Koa from 'koa';
import router from './router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

//TODO: add CORS policy + URL from env
app.use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 3000;


if (require.main === module) {
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
  })
}

module.exports = { app };


