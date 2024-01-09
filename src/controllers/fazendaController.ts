import {NextFunction, Request, Response, Router} from 'express';
import {FazendaService} from "../services/fazendaService";
import {CulturaService} from "../services/culturaService";

class FazendaController {
    public router: Router;
    private fazendaService: FazendaService;
    private culturaService: CulturaService;


    constructor() {
        this.router = Router();
        this.fazendaService = new FazendaService();
        this.culturaService = new CulturaService();
        this.initializeRoutes();
    }

    /**
     * @swagger
     *
     * /fazenda/getFazendaGraphicData:
     *   get:
     *     tags:
     *       - Graphics
     *     description: Get count of fazendas, total area, total agricultable and total vegetation area
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successfully fetched the fazenda graphic data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 fazendaCount:
     *                   type: number
     *                 totalArea:
     *                   type: number
     *                 totalAgricutavel:
     *                   type: number
     *                 totalVegetavel:
     *                   type: number
     *             example:
     *               fazendaCount: 4
     *               totalArea: 3000
     *               totalAgricutavel: 1700
     *               totalVegetavel: 1300
     */
    getFazendaGraphicData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const graphicData = await this.fazendaService.getFazendaGraphicData();
            res.json(graphicData);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @swagger
     * /fazenda/getFazendaCountByEstado:
     *   get:
     *     tags:
     *       - Graphics
     *     description: Get count of fazendas by estado
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Count of fazendas per estado
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FazendaEstadoCount'
     * components:
     *   schemas:
     *     FazendaEstadoCount:
     *       type: object
     *       properties:
     *         estado:
     *           type: string
     *         count:
     *           type: number
     */
    getFazendaCountByEstado = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const estadoData = await this.fazendaService.getFazendaCountByEstado();
            res.json(estadoData);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @swagger
     * /getFazendaCountByCultura:
     *   get:
     *     tags:
     *       - Graphics
     *     description: Get count of fazendas by cultura
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successfully fetched the fazenda count by cultura
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   cultura:
     *                     type: string
     *                   count:
     *                     type: number
     *             example:
     *               - cultura: "cultura name"
     *                 count: 4
     */
    getFazendaCountByCultura = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const culturaData = await this.culturaService.getFazendaCountByCultura();
            res.json(culturaData);
        } catch (error: any) {
            next(error);
        }
    }

    private initializeRoutes() {
        this.router.get('/getFazendaGraphicData', this.getFazendaGraphicData);
        this.router.get('/getFazendaCountByEstado', this.getFazendaCountByEstado);
        this.router.get('/getFazendaCountByCultura', this.getFazendaCountByCultura);
    }
}

export default FazendaController;