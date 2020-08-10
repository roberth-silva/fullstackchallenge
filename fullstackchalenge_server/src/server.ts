import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//comando para servir arquivos estaticos
app.use('/assets', express.static(path.resolve(__dirname, '..', 'assets')));

app.listen(process.env.PORT || 3000, ()=> {
    console.log('> Server run at http://localhost:3000');
});