import {ProdutorRuralService} from "../src/services/produtorRuralService";
import {IProdutorRuralPost} from "../src/models/produtorRuralModel";

describe('ProdutorRuralService', () => {
    let service: ProdutorRuralService;

    beforeEach(() => {
        service = new ProdutorRuralService();
        service.produtorRuralRepository = {
            findByCpfCnpj: jest.fn()
        } as any;
        service.fazendaService = {
            createFazenda: jest.fn().mockResolvedValue({id: 123})
        } as any;
        service.culturaService = jest.fn() as any;
        service.queueService = {
            init: jest.fn().mockResolvedValue(undefined), sendMessage: jest.fn().mockResolvedValue(undefined)
        } as any;
    });

    it('should create a produtor', async () => {
        const mockProdutorData: IProdutorRuralPost = {
            cpf_cnpj: '12345678901',
            nome: 'Produtor Rural',
            nomeFazenda: 'Fazenda Teste',
            cidade: 'Teste Ville',
            estado: 'Teste State',
            areaTotalHectares: 500,
            areaAgricultavelHectares: 300,
            areaVegetacaoHectares: 200,
            culturas: [1, 2, 3]
        };
        const mockRural = {id: 1, cpf_cnpj: '12345678901', nome: 'Produtor Rural'};

        service.produtorRuralRepository.create = jest.fn().mockResolvedValue(mockRural);
        service.culturaService.linkFazendaToCultura = jest.fn();
        service.queueService.sendMessage = jest.fn();

        const result = await service.createProdutor(mockProdutorData);
        expect(result).toStrictEqual(mockRural);
    });
});


describe('cpfCnpj', () => {
    let service: ProdutorRuralService;

    beforeEach(() => {
        service = new ProdutorRuralService();

        service.produtorRuralRepository = {
            findByCpfCnpj: jest.fn(), create: jest.fn()
        } as any;

        service.fazendaService = {
            createFazenda: jest.fn()
        } as any;

        service.culturaService = {
            linkFazendaToCultura: jest.fn()
        } as any;

        service.queueService = {
            init: jest.fn().mockResolvedValue(undefined), sendMessage: jest.fn().mockResolvedValue(undefined)
        } as any;
    });

    it('should throw an error if cpfCnpj length is invalid', () => {
        expect(() => service['validateCpfCnpj']('123456')).toThrowError('Invalid CPF/CNPJ length');
    });

    it('should pass for correct cpfCnpj length', () => {
        expect(() => service['validateCpfCnpj']('12345678901')).not.toThrow();
        expect(() => service['validateCpfCnpj']('12345678901234')).not.toThrow();
    });
});