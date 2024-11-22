import express from 'express';
import { getContacts, getContact } from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/contacts', getContacts);

router.get('/:contactId', getContact);

export default router;
