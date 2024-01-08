export interface IProdutorRural {
    id?: number;
    cpf_cnpj: string;
    nome: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export interface IProdutorRuralPost {
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

export interface IGetProdutorRural {
    id: number;
    cpf_cnpj: string;
    nome: string;
    created_at: Date | undefined;
    updated_at: Date | undefined;
    nomeFazenda: string;
    cidade: string;
    estado: string;
    idFazenda: number;
    areaTotalHectares: number;
    areaAgricultavelHectares: number;
    areaVegetacaoHectares: number;
    culturas: number[];
}

export interface ICultura {
    id: number;
    nome: string;
}

export interface IFazenda {
    id?: number;
    nome: string;
    cidade: string;
    estado: string;
    areaTotalHectares: number;
    areaAgricultavelHectares: number;
    areaVegetacaoHectares: number;
    produtorId: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export interface IProdutorRuralPut {
    produtorId: number;
    cpf_cnpj: string;
    nome: string;
    nomeFazenda: string;
    fazendaId: number;
    cidade: string;
    estado: string;
    areaTotalHectares: number;
    areaAgricultavelHectares: number;
    areaVegetacaoHectares: number;
    culturas: number[];
}