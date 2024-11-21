import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '37017'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(pinoHttp({ logger }));

   app.use((req, res, next) => {
     res.success = (data, message = 'Success', statusCode = 200) => {
       res.status(statusCode).json({
         status: 'success',
         message,
         data,
       });
     };

     res.fail = (message, statusCode = 400) => {
       res.status(statusCode).json({
         status: 'error',
         message,
       });
     };

     next();
   });

  app.get('/', (req, res) => {
    res.success({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.success(contacts, 'Contacts retrieved successfully');
    } catch  {
      res.fail('Failed to retrieve contacts', 500);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.fail('Contact not found', 404);
      }

      res.success(contact, 'Contact retrieved successfully');
    } catch {
      res.fail('Failed to retrieve contact', 500);
    }
  });
  app.use('*', (req, res, next) => {
    res.fail('Not found', 404);
});

  app.use((err, req, res, next) => {
     res.fail('Something went wrong', 500);
     console.error(err);
    });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

