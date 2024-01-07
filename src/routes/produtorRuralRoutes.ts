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
 *                 $ref: '#/components/schemas/ProdutorRural'
 *       500:
 *         description: Internal server error.
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
 *               $ref: '#/components/schemas/ProdutorRural'
 *       404:
 *         description: Producer not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', getProdutorById);



router.post('/produtorRural',
    createProdutorRural);

export default router;
