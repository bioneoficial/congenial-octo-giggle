import { Request, Response } from 'express';
import { ProdutorRuralService} from '../services/produtorRuralService';

const produtorRuralService = new ProdutorRuralService();
export const getAllProdutores = async (req: Request, res: Response): Promise<void> => {
    try {
        const produtores = await produtorRuralService.findAllProdutores();
        res.json(produtores);
    } catch (error: any) {
        res.status(500).json({ message: error?.message ?? 'An unexpected error occurred.' });
    }
};

export const getProdutorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const produtor = await produtorRuralService.findProdutorById(Number(req.params.id));
        if (!produtor) {
            res.status(404).json({message: 'Produtor não encontrado'});
            return;
        }
        res.json(produtor);
    } catch (error: any) {
        res.status(500).json({message: error?.message ?? 'An unexpected error occurred.'});
    }
};
