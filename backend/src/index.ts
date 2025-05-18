import express from 'express'
import routes from './shared/infra/routes/routes';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

