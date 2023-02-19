import ProductService from '../services/product-service';
import CustomerService from '../services/customer-service';
import UserAuth from './middlewares/auth';
import express, {Request, Response, NextFunction} from 'express'

export const products = (app:express.Application) => {
    
    const service = new ProductService();
    const customerService = new CustomerService();


    app.post('/product/create', async(req:Request | any,res:Response,next:NextFunction) => {
        
        try {
            const { name, desc, type, unit,price, available, suplier, banner } = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/category/:type', async(req:Request | any,res:Response,next:NextFunction) => {
        
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/:id', async(req:Request | any,res:Response,next:NextFunction) => {
        
        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/ids', async(req:Request | any,res:Response,next:NextFunction) => {

        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products);
            
        } catch (err) {
            next(err)
        }
       
    });
     
    app.put('/wishlist',UserAuth, async (req:Request | any,res:Response,next:NextFunction) => {

        const { _id } = req.user;
        
        try {
            const product = await service.GetProductById(req.body._id);
            const wishList = await customerService.AddToWishlist(_id, product)
            return res.status(200).json(wishList);
        } catch (err) {
            
        }
    });
    
    app.delete('/wishlist/:id',UserAuth, async (req:Request | any,res:Response,next:NextFunction) => {

        const { _id } = req.user;
        const productId = req.params.id;

        try {
            const product = await service.GetProductById(productId);
            const wishlist = await customerService.AddToWishlist(_id, product)
            return res.status(200).json(wishlist);
        } catch (err) {
            next(err)
        }
    });


    app.put('/cart',UserAuth, async (req:Request | any,res:Response,next:NextFunction) => {
        
        const { _id, qty } = req.body;
        
        try {     
            const product = await service.GetProductById(_id);
    
            const result =  await customerService.ManageCart(req.user._id, product, qty, false);
    
            return res.status(200).json(result);
            
        } catch (err) {
            next(err)
        }
    });
    
    app.delete('/cart/:id',UserAuth, async (req:Request | any,res:Response,next:NextFunction) => {

        const { _id } = req.user;

        try {
            const product = await service.GetProductById(req.params.id);
            const result = await customerService.ManageCart(_id, product, 0 , true);             
            return res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    });

    //get Top products and category
    app.get('/', async (req:Request | any,res:Response,next:NextFunction) => {
        //check validation
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });
    
}