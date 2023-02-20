import { ProductRepository } from "../database";
import { FormateData } from "../utils";
import { APIError, STATUS_CODES } from '../utils/app-errors';

// All Business logic will be here
class ProductService {
    repository: ProductRepository;

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs:any){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }
    }
    
    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories:any = {};
    
            products.map(({ type }:any) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }
    }


    async GetProductDescription(productId:any){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }
    }

    async GetProductsByCategory(category: any){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products)
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }

    }

    async GetSelectedProducts(selectedIds: any){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }
    }

    async GetProductById(productId: any){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }
    }

    async GetProductPayload(userId: any, {productId, qty}:{productId:any, qty: number}, event: string) {
        const product = await this.repository.FindById(productId)

        if(product){
            const payload = {
                event: event,
                data: { userId, product, qty}

            }
            return FormateData(payload)
        } else {
            return FormateData({ error: 'No Product available'})

        }

    }
     
}

export default ProductService;