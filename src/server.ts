import express from 'express';
import { sequelize } from './database';
import { adminJs, adminJsRouter } from './adminjs';
import { router } from './routes';

const app = express();

app.use(express.static('public'));

// app.use(caminho, rotas)
app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  sequelize.authenticate().then(() => {
    console.log('DB Connection Sucess');
  })
  console.log('Servidor INICIADO');
})
