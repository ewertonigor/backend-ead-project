import express from 'express';
import { sequelize } from './database';

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  sequelize.authenticate().then(() => {
    console.log('DB Connection Sucess')
  })
  console.log('Servidor INICIADO');
})
