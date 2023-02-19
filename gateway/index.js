import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/customer', proxy('http://localhost:3003'))
app.use('/shopping', proxy('http://localhost:3001'))
app.use('/', proxy('http://localhost:3002')) // products

app.listen(8000, ()=> {
    console.log('gateway is running on port 8000')
});4