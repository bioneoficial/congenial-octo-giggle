import {NextFunction, Request, Response} from 'express';
import {ProdutorRuralService} from '../services/produtorRuralService';
import {validateParamsGetById, validateProdutorRuralPost} from "../validators/produtorRural";
import {ValidationError} from "../errors/validationError";
import {CustomError} from "../errors/customError";
import {ProdutorIdParamSchema} from "../validators/schemas/produtorRural";

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
        const params = validateParamsGetById(req.params);
        const produtor = await produtorRuralService.findProdutorById(Number(req.params.id));
        if (!produtor) {
            throw new CustomError(`Produtor with id "${params.id}" not found`, 404);
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
        error instanceof ValidationError ? next(new ValidationError('Invalid data provided for Produtor Rural creation')) :
            next(new CustomError('An error occurred during Produtor Rural creation'));
    }
};
