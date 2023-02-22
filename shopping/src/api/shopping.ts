import ShoppingService from "../services/shopping-service";
import UserAuth from './middlewares/auth';
import express, {Request, Response, NextFunction} from 'express'

export const shopping = (app:express.Application) => {
    
    const service = new ShoppingService();
   

    app.post('/order',UserAuth, async (req:Request | any,res:Response,next:NextFunction) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;


        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});
            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.get(
        "/orders",
        UserAuth,
        async (req: Request | any, res: Response, next: NextFunction) => {
          const { _id } = req.user;
    
          try {
            const { data } = await service.GetOrders(_id);
            return res.status(200).json(data);
          } catch (err) {
            next(err);
          }
        }
      );
       
    
      app.get(
        "/cart",
        UserAuth,
        async (req: Request | any, res: Response, next: NextFunction) => {
          const { _id } = req.user;
          try {
            const data = await service.GetCart(_id);
            return res.status(200).json(data);
          } catch (err) {
            next(err);
          }
        }
      );
}