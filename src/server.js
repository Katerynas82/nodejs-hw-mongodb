import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routes/contacts.routes.js';

const app = express();
const PORT = Number(env('PORT', '37017'));

export const setupServer = () => {


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

   app.use('/contacts', contactsRouter);

  app.get('/', (req, res) => {
    res.success({
      message: 'Hello world!',
    });
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

