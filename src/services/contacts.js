import { ContactsCollection} from '../db/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = ContactsCollection.findById(contactId);
  return contact;
};
