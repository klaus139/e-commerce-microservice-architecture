import express from 'express';
import cors from 'cors';
import {  products, appEvents } from './api';
 import HandleErrors from './utils/error-handler';
import { Channel } from 'amqplib';


export const  expressApp = async (app:express.Application, channel:Channel) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //listen to event
    // appEvents(app);

    //api
    products(app, channel);

    // error handling
    app.use(HandleErrors);
    
}