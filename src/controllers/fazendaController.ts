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
     *         schema:
     *           type: object
     *           properties:
     *             fazendaCount:
     *               type: number
     *             totalArea:
     *               type: number
     */
    getFazendaGraphicData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const graphicData = await this.fazendaService.getFazendaGraphicData();
            res.json(graphicData);
        } catch (error: any) {
            next(error);
        }
    }

    private initializeRoutes() {
        this.router.get('/getFazendaGraphicData', this.getFazendaGraphicData);
    }
}

export default FazendaController;