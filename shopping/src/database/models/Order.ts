import mongoose,{Schema} from 'mongoose';

const OrderSchema = new Schema({
    orderId: String,
    customerId: String,
    amount: Number,
    status: String,
    txnId: String,
    items: [
        {   product: {
            _id: { type: String, require: true },
            name: { type: String },
            desc: {type:String},
            banner: { type: String },
            type: {type:String},
            unit: {type: Number},
            price: { type: Number },
            suplier: {type: String}
          },
          unit: { type: Number, require: true },
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

export const OrderModel =  mongoose.model('order', OrderSchema);