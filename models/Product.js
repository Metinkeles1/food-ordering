import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 60
        },
        desc: {
            type: String,
            required: true,
            maxlength: 300
        },
        prices: {
            type: [Number],
            required: true
        },
        category: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        extraOptions: {
            type: [
                {
                    text: { type: String },
                    price: { type: Number }
                }
            ]
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        }
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
