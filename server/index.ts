import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router';


const app = new koa();

app.use(bodyParser);
app.use(router.routes())
app.use(router.allowedMethods());


const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



