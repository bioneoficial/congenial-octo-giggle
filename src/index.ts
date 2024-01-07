import express, {Application} from 'express';
import bodyParser from 'body-parser';
import produtorRuralRoutes from './routes/produtorRuralRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerDefinition} from './config/swagger';
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();

const options = {
    swaggerDefinition, apis: [`${__dirname}/routes/*.ts`],
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

app.use('/produtores-rurais', produtorRuralRoutes);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0' , () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});