import { model, Schema } from 'mongoose';

const ContactsSchema = new Schema(
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

  // console.log(ContactsSchema.path('isFavourite'));


  export const ContactsCollection = model('contacts', ContactsSchema);
