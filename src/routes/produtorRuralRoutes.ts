import express, { Router } from 'express';
import { getAllProdutores, getProdutorById } from '../controllers/produtorRuralController';

const router: Router = express.Router();

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

export default router;
