import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },

    contactType: {
      type: String,
      required: true,
      enum: ['personal', 'home', 'other'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = mongoose.model('Contact', ContactsSchema);
