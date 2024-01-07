import express, {Router} from 'express';
import {createProdutorRural, getAllProdutores, getProdutorById} from '../controllers/produtorRuralController';
import {QueueService} from "../services/queueService";

const router: Router = express.Router();
const queueService = new QueueService();

queueService.init().then(() => {
    console.log('QueueService initialized');
}).catch(err => {
    console.error('Failed to initialize QueueService:', err);
});

/**
 * @swagger
 * /producers:
 *   get:
 *     tags:
 *       - Producers
 *     summary: List all producers
 *     description: Retrieve a list of all agricultural producers.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of producers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The producer's ID.
 *                   cpf_cnpj:
 *                     type: string
 *                     description: CPF or CNPJ of the producer.
 *                   nome:
 *                     type: string
 *                     description: Name of the producer.
 *       404:
 *         description: Producers not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                     message:
 *                       type: string
 *                       description: the error message
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                     message:
 *                       type: string
 *                       description: the error message
 */
router.get('/', getAllProdutores);

/**
 * @swagger
 * /producers/{id}:
 *   get:
 *     tags:
 *       - Producers
 *     summary: Get a producer by ID
 *     description: Retrieve a single producer's details by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The producer's ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved producer details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The producer's ID.
 *                 cpf_cnpj:
 *                   type: string
 *                   description: CPF or CNPJ of the producer.
 *                 nome:
 *                   type: string
 *                   description: Name of the producer.
 *       404:
 *         description: Producer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                     message:
 *                       type: string
 *                       description: the error message
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                     message:
 *                       type: string
 *                       description: the error message
 */
router.get('/:id', getProdutorById);

/**
 * @swagger
 * /producers/produtorRural:
 *  post:
 *    tags:
 *      - Producers
 *    description: Create a new producer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - cpf_cnpj
 *            - nome
 *            - nomeFazenda
 *            - cidade
 *            - estado
 *            - areaTotalHectares
 *            - areaAgricultavelHectares
 *            - areaVegetacaoHectares
 *            - culturas
 *            properties:
 *              cpf_cnpj:
 *                description: CPF or CNPJ of the producer
 *                type: string
 *              nome:
 *                description: Name of the producer
 *                type: string
 *              nomeFazenda:
 *                description: Name of the farm
 *                type: string
 *              cidade:
 *                description: City where the farm is located
 *                type: string
 *              estado:
 *                description: State where the farm is located
 *                type: string
 *              areaTotalHectares:
 *                description: Total area in hectares
 *                type: number
 *              areaAgricultavelHectares:
 *                description: Total cultivable area in hectares
 *                type: number
 *              areaVegetacaoHectares:
 *                description: Total vegetal area in hectares
 *                type: number
 *              culturas:
 *                description: Array of crop IDs associated with the farm
 *                type: array
 *                items:
 *                  type: integer
 *    responses:
 *      201:
 *        description: Successfully created producer
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: the id of the newly created record
 *                cpf_cnpj:
 *                  type: string
 *                  description: cpf or cnpj of the producer
 *                nome:
 *                  type: string
 *                  description: name of the producer
 *      400:
 *        description: Invalid producer data provided.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: integer
 *                      description: HTTP status code
 *                    message:
 *                      type: string
 *                      description: the error message
 *      500:
 *        description: Internal server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: integer
 *                      description: HTTP status code
 *                    message:
 *                      type: string
 *                      description: the error message
 */
router.post('/produtorRural', createProdutorRural);
export default router;
