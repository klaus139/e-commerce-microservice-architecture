import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
    return res.status(200).json({'msg':'hello from products'})

})

app.listen(3002, ()=> {
    console.log('products service is running on port 3002')
});