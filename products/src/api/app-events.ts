import express, {Request, Response, NextFunction } from 'express';
import ProductService from '../services/product-service';




export const appEvents = (app:express.Application) => {
    const service = new ProductService()

    app.use('/app-event', async(req: Request, res: Response, next: NextFunction) => {
        const { payload } = req.body;
        console.log('**========= Product service received event =======**')
        //console.log(payload)
        return res.status(200).json(payload)
    })
}