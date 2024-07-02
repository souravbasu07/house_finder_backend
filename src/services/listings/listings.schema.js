import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const listingsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyFor: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
  },
  propertyArea: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minCost: {
    type: Number,
    required: true,
  },
  maxCost: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true
  },
  attachments: [{
    type: String
  }],
  amenities: [{
    type: String
  }]
}, { timestamps: true });

listingsSchema.plugin(paginate);
listingsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};

const Listing = model('Listing', listingsSchema);

export default Listing;