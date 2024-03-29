import express, {Router} from 'express';
import {
    createProdutorRural,
    deleteProdutorById,
    getAllProdutores,
    getProdutorById, updateProdutorRural
} from '../controllers/produtorRuralController';

const router: Router = express.Router();

/**
 * @swagger
 * /produtores-rurais:
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
 *                   $ref:
 *                      '#/components/schemas/GetProdutorRural'
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
 * /produtores-rurais/{id}:
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
 *               $ref:
 *                  '#/components/schemas/GetProdutorRural'
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
 * /produtores-rurais/produtorRural:
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
 *                created_at:
 *                  type: string
 *                  format: date-time
 *                  description: Timestamp of when the record was created.
 *                updated_at:
 *                  type: string
 *                  format: date-time
 *                  description: Timestamp of the last update to the record.
 *                deleted_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
 *                  description: Timestamp of when the record was deleted. Null if the record has not been deleted.
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

/**
 * @swagger
 * /produtores-rurais/{id}:
 *   delete:
 *     tags:
 *       - Producers
 *     summary: Delete a producer by ID
 *     description: Soft deletes a single producer's details by their ID (sets deleted_at to current timestamp).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The producer's ID.
 *     responses:
 *       200:
 *         description: Successfully deleted a producer.
 *       404:
 *         description: Producer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: the error message
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: the error message
 */
router.delete('/:id', deleteProdutorById);

/**
 * @swagger
 * /produtores-rurais:
 *   put:
 *     tags:
 *       - Producers
 *     summary: Update a producer details
 *     description: Update a producer's details and related entities - Fazendas and Culturas.
 *     requestBody:
 *       description: New details for the producer
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IProdutorRuralPut'
 *     responses:
 *       200:
 *         description: Successfully updated the producer's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProdutorRural'
 *       400:
 *         description: Bad request.
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
 *       404:
 *         description: Not found. The requested resource could not be found.
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
 router.put('/', updateProdutorRural);
export default router;
