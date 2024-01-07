import {ProdutorRuralPost} from "../models/produtorRuralModel";
import {ProdutorRuralPostSchema} from "./schemas/produtorRural";

export const validateProdutorRuralPost = (data: any): ProdutorRuralPost => {
    const result = ProdutorRuralPostSchema.safeParse(data);

    if (!result.success) {
        throw new Error('Validation failed');
    }

    return result.data;
};
