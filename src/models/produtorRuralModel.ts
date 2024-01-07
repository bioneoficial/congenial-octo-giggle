export interface ProdutorRural {
    id: number;
    cpf_cnpj: string;
    nome: string;
    nomeFazenda: string;
    cidade: string;
    estado: string;
    areaTotalHectares: number;
    areaAgricultavelHectares: number;
    areaVegetacaoHectares: number;
    culturasPlantadas: Cultura[];
}

export interface Cultura {
    id: number;
    nome: string;
}
