import express, {Request, Response, NextFunction } from 'express';
import CustomerService from '../services/customer-service';




export const appEvents = (app:express.Application) => {
    const service = new CustomerService()

    app.use('/app-event', async(req: Request, res: Response, next: NextFunction) => {
        const { payload } = req.body;
        service.SubscribeEvents(payload)
        console.log('**========= shopping service received event =======**')
        console.log(payload)
        return res.status(200).json(payload)
    })
}