import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const productModel = model(
  'products',
  new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  }).plugin(mongoosePaginate)
);