import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
    return res.status(200).json({'msg':'hello from shopping'})

})

app.listen(3001, ()=> {
    console.log('shopping service is running on port 3001')
});