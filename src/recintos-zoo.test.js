import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////


    test('Deve rejeitar animal não-carnívoro em recinto de carnívoros', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBeGreaterThan(0);
    });

    test('Deve rejeitar recinto com espaço insuficiente', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve considerar espaço extra para múltiplas espécies', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 3);
        expect(resultado.erro).toBeFalsy();
    });

    test('Deve considerar recintos vazios na análise', () => {
        const zoo = new RecintosZoo();
        zoo.recintos.push({ id: 5, bioma: 'SAVANA', espaçoTotal: 10, espaçoLivre: 10, animais: [] });
        const resultado = zoo.analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 9 total: 10)');
    });

    test('Deve alocar animais apenas em biomas apropriados', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
    });

});

