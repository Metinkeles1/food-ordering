import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
            maxlength: 100
        },
        address:{
            type: String,
            required: true,
            maxlength: 200
        },
        total:{
            type:Number,
            required: true
        },
        status:{
            type: Number,
            default: 0
        },
        method:{
            type: Number,
        },
        products: {
            type:[
                {                    
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    },
                    productPrice:{
                        type: Number,
                    },
                    productSize:{
                        type: String,
                    },
                    extraOptions:{
                        type:[
                            {
                                text:{type: String},
                                price: {type: Number}
                            }
                        ],
                    }
                }
            ]
        }
    } ,
    { timestamps: true }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);