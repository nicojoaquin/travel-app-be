import { Schema, model } from 'mongoose';

const AccomodationSchema = new Schema(
  {
    countryId: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    contact: { type: Number, required: true },
    imageUrl: { type: String, required: true },
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
      enum: ['apartment', 'hotel', 'hostel'],
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
    },
    facilities: [
      {
        wifi: { type: Boolean, default: true },
      },
      {
        parking: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true },
);

const Accomodation = model('Accomodation', AccomodationSchema);

export default Accomodation;
