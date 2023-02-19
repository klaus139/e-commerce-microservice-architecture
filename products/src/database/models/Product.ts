import mongoose,{Schema} from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    desc: String,
    banner: String,
    type: String,
    unit: Number,
    price: Number,
    available: Boolean,
    suplier: String
});

export const ProductModel =  mongoose.model('product', ProductSchema);