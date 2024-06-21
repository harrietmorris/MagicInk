import koa from 'koa';
import router from './router';
import { Middleware } from '@koa/router';

const app = new koa();


app
    .use(router.routes())
    .use(router.allowedMethods());


const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



