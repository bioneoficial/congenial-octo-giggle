import express, {Application} from 'express';
import bodyParser from 'body-parser';
import produtorRuralRoutes from './routes/produtorRuralRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerDefinition} from './config/swagger';
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorHandler";
import cors from 'cors';
import FazendaController from "./controllers/fazendaController";


dotenv.config();

const app: Application = express();
const fazendaController = new FazendaController();

const options = {
    swaggerDefinition, apis: [`${__dirname}/routes/*.js`,
        `${__dirname}/controllers/*.js`],
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use('/produtores-rurais', produtorRuralRoutes);
app.use('/fazenda', fazendaController.router)

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0' , () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});