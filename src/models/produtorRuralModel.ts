export interface ProdutorRural {
    id?: number;
    cpf_cnpj: string;
    nome: string;
    // nomeFazenda: string;
    // cidade: string;
    // estado: string;
    // areaTotalHectares: number;
    // areaAgricultavelHectares: number;
    // areaVegetacaoHectares: number;
    // culturasPlantadas: Cultura[];
}

export interface ProdutorRuralPost {
    cpf_cnpj: string;
    nome: string;
    nomeFazenda: string;
    cidade: string;
    estado: string;
    areaTotalHectares: number;
    areaAgricultavelHectares: number;
    areaVegetacaoHectares: number;
    culturas: number[];
}

export interface Cultura {
    id: number;
    nome: string;
}

export interface Fazenda {
    id?: number;
    nome: string;
    cidade: string;
    estado: string;
    areaTotalHectares: number;
    areaAgricultavelHectares: number;
    areaVegetacaoHectares: number;
    produtorId: number;
}