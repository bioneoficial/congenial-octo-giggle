import {NextFunction, Request, Response} from 'express';
import {ProdutorRuralService} from '../services/produtorRuralService';
import {validateProdutorRuralPost} from "../validators/produtorRural";

const produtorRuralService = new ProdutorRuralService();
export const getAllProdutores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const produtores = await produtorRuralService.findAllProdutores();
        res.json(produtores);
    } catch (error: any) {
        next(error);
    }
};

export const getProdutorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const produtor = await produtorRuralService.findProdutorById(Number(req.params.id));
        if (!produtor) {
            res.status(404).json({message: 'Produtor não encontrado'});
            return;
        }
        res.json(produtor);
    } catch (error: any) {
        next(error);
    }
};

export const createProdutorRural = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = validateProdutorRuralPost(req.body);
        const produtorRural = await produtorRuralService.createProdutor(validatedData);
        res.status(201).json(produtorRural);
    } catch (error: any) {
        next(error);
    }
};
