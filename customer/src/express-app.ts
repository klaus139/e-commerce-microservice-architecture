import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { customer, appEvents } from './api';
 import HandleErrors from './utils/error-handler';


export const  expressApp = async (app:express.Application) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     console.log(req)
    //     next()
    // })

    //listen to events
    appEvents(app);

    //api
    customer(app);

    // error handling
    app.use(HandleErrors);
    
}