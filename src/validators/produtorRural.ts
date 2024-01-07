import {IProdutorRuralPost} from "../models/produtorRuralModel";
import {ProdutorIdParamSchema, ProdutorRuralPostSchema} from "./schemas/produtorRural";
import {CustomError} from "../errors/customError";

export const validateProdutorRuralPost = (data: any): IProdutorRuralPost => {
    const result = ProdutorRuralPostSchema.safeParse(data);

    if (!result.success) {
        throw new Error(`${result.error.message}`);
    }

    return result.data;
};

export const validateParamsGetById = (data: any) => {
    const result = ProdutorIdParamSchema.safeParse(data);

    if (!result.success) {
        const firstError = result.error.issues[0]
        const errorPath = firstError.path.join('.')
        throw new CustomError(`Validation failed at "${errorPath}": ${firstError.message}`, 400);
    }

    return result.data;
};