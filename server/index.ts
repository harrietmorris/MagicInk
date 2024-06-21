import koa from 'koa';
import router from './router';
import bodyParser from 'koa-bodyparser';

const app = new koa();

//TODO: add CORS policy + URL from env
app.use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



