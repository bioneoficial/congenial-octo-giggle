import {z, ZodObject} from "zod";
import {IProdutorRuralPost} from "../../models/produtorRuralModel";

export const ProdutorRuralPostSchema = z.object({
    cpf_cnpj: z.string({
        invalid_type_error: "cpf_cnpj must be a string",
    }).min(11, {
        message: "cpf_cnpj must have at least 11 characters",
    }).max(14, {
        message: "cpf_cnpj must have at most 14 characters",
    }),
    nome: z.string({
        invalid_type_error: "Nome must be a string",
    }).min(1, {
        message: "Nome must not be empty",
    }),
    nomeFazenda: z.string({
        invalid_type_error: "nomeFazenda must be a string",
    }).min(1, {
        message: "nomeFazenda must not be empty",
    }),
    cidade: z.string({
        invalid_type_error: "cidade must be a string",
    }).min(1, {
        message: "cidade must not be empty",
    }),
    estado: z.string({
        invalid_type_error: "estado must be a string",
    }).min(1, {
        message: "estado must not be empty",
    }),
    areaTotalHectares: z.number({
        invalid_type_error: "areaTotalHectares must be a number",
    }).min(0, {
        message: "areaTotalHectares must be 0 or greater",
    }),
    areaAgricultavelHectares: z.number({
        invalid_type_error: "areaAgricultavelHectares must be a number",
    }).min(0, {
        message: "areaAgricultavelHectares must be 0 or greater",
    }),
    areaVegetacaoHectares: z.number({
        invalid_type_error: "areaVegetacaoHectares must be a number",
    }).min(0, {
        message: "areaVegetacaoHectares must be 0 or greater",
    }),
    culturas: z.array(z.number({
        invalid_type_error: "Each cultura must be a number",
    }).min(1, {
        message: "Each cultura must be 1 or greater",
    })),
});

export const ProdutorIdParamSchema =z.object({
    id: z.string().transform(Number).refine(value => !isNaN(value) && value >= 1, {
        message: "id must be a number and 1 or greater",
    }),
});

export const ProdutorRuralPutSchema = z.object({
    produtorId: z.number({
        invalid_type_error: "produtorId must be a number",
    }).min(1, {
        message: "produtorId must be 1 or greater",
    }),
    fazendaId: z.number({
        invalid_type_error: "fazendaId must be a number",
    }).min(1, {
        message: "fazendaId must be 1 or greater",
    }),
    cpf_cnpj: z.string({
        invalid_type_error: "cpf_cnpj must be a string",
    }).min(11, {
        message: "cpf_cnpj must have at least 11 characters",
    }).max(14, {
        message: "cpf_cnpj must have at most 14 characters",
    }),
    nome: z.string({
        invalid_type_error: "nome must be a string",
    }).min(1, {
        message: "nome must not be empty",
    }),
    nomeFazenda: z.string({
        invalid_type_error: "nomeFazenda must be a string",
    }).min(1, {
        message: "nomeFazenda must not be empty",
    }),
    cidade: z.string({
        invalid_type_error: "cidade must be a string",
    }).min(1, {
        message: "cidade must not be empty",
    }),
    estado: z.string({
        invalid_type_error: "estado must be a string",
    }).min(1, {
        message: "estado must not be empty",
    }),
    areaTotalHectares: z.number({
        invalid_type_error: "areaTotalHectares must be a number",
    }).min(0, {
        message: "areaTotalHectares must be 0 or greater",
    }),
    areaAgricultavelHectares: z.number({
        invalid_type_error: "areaAgricultavelHectares must be a number",
    }).min(0, {
        message: "areaAgricultavelHectares must be 0 or greater",
    }),
    areaVegetacaoHectares: z.number({
        invalid_type_error: "areaVegetacaoHectares must be a number",
    }).min(0, {
        message: "areaVegetacaoHectares must be 0 or greater",
    }),
    culturas: z.array(z.number({
        invalid_type_error: "Each cultura must be a number",
    }).min(1, {
        message: "Each cultura must be 1 or greater",
    })),
});