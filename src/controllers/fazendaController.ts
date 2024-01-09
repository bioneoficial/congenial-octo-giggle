import {NextFunction, Request, Response, Router} from 'express';
import {FazendaService} from "../services/fazendaService";

class FazendaController {
    public router: Router;
    private fazendaService: FazendaService;

    constructor() {
        this.router = Router();
        this.fazendaService = new FazendaService();
        this.initializeRoutes();
    }

    /**
     * @swagger
     *
     * /fazenda/getFazendaGraphicData:
     *   get:
     *     tags:
     *       - Graphics
     *     description: Get count of fazendas and the total area
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successfully fetched the fazenda data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 fazendaCount:
     *                   type: number
     *                 totalArea:
     *                   type: number
     *             example:
     *               fazendaCount: 1
     *               totalArea: 1
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

    private initializeRoutes() {
        this.router.get('/getFazendaGraphicData', this.getFazendaGraphicData);
        this.router.get('/getFazendaCountByEstado', this.getFazendaCountByEstado);
    }
}

export default FazendaController;