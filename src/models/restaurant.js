import { Schema, model } from 'mongoose';

const RestaurantSchema = new Schema(
  {
    countryId: { type: String, required: false },
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    menuUrl: { type: String, required: true },
    mapsUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ['temple', 'tour', 'restaurant', 'accommodation'],
      required: false,
    },
    rating: { type: Number, required: true },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    location: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    type: {
      type: String,
      enum: ['meat', 'dairy', 'asado', 'burguer', 'sushi'],
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
    },
    specifications: [
      {
        kosher: { type: Boolean, required: true, default: true },
      },
      {
        booking: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true },
);

const Restaurant = model('Restaurant', RestaurantSchema);

export default Restaurant;
