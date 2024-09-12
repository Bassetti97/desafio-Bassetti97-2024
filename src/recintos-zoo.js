class RecintosZoo {

  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] },
    ];

    this.animais = [
      { especie: 'LEAO', tamanho: 3, bioma: 'savana' },
      { especie: 'LEOPARDO', tamanho: 2, bioma: 'savana' },
      { especie: 'CROCODILO', tamanho: 3, bioma: 'rio' },
      { especie: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta'] },
      { especie: 'GAZELA', tamanho: 2, bioma: 'savana' },
      { especie: 'HIPOPOTAMO', tamanho: 4, bioma: ['savana', 'rio'] },
    ];
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animalExiste(animal)) {
      return { erro: 'Animal inválido' };
    }

    if (!this.validaQuantidade(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const recintosViaveis = this.adicionaAnimal(animal, quantidade);
    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    } else {
      return { recintosViaveis: recintosViaveis.sort((a, b) => a.numero - b.numero) };
    }
  }

  animalExiste(animal) {
    return this.animais.some(a => a.especie === animal);
  }

  validaQuantidade(quantidade) {
    return quantidade > 0 && Number.isInteger(quantidade);
  }

  adicionaAnimal(animal, quantidade) {
    const recintosViaveis = [];
    for (const recinto of this.recintos) {
      if (this.recintoViavel(recinto, animal, quantidade)) {
        const espaçoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`);
      }
    }
    return recintosViaveis;
  }

  recintoViavel(recinto, animal, quantidade) {
    if (!this.biomaCompativel(recinto, animal)) {
      return false;
    }

    if (!this.calculaEspacoSuficiente(recinto, animal, quantidade)) {
      return false;
    }

    if (!this.verificaAnimalCarnivoro(recinto, animal)) {
      return false;
    }

    if (!this.verificaHipopotamo(recinto, animal)) {
      return false;
    }

    if (!this.verificaMacaco(recinto, animal)) {
      return false;
    }

    return true;
  }

  biomaCompativel(recinto, animal) {
    const animalBioma = this.animais.find(a => a.especie === animal).bioma;
    return animalBioma.includes(recinto.bioma) || (Array.isArray(animalBioma) && animalBioma.some(b => b === recinto.bioma));
  }

  calculaEspacoSuficiente(recinto, animal, quantidade) {
    const espaçoOcupado = recinto.animaisExistentes.reduce((ab, a) => ab + a.quantidade * this.tamanhoAnimal(a.especie), 0);
    const espaçoNecessario = quantidade * this.tamanhoAnimal(animal);
    return recinto.tamanhoTotal >= espaçoOcupado + espaçoNecessario + (recinto.animaisExistentes.length > 0 ? 1 : 0);
  }

  verificaCarnivoro(especie) {
    return especie === 'LEAO' || especie === 'LEOPARDO' || especie === 'CROCODILO';
  }

  verificaAnimalCarnivoro(recinto, animal) {
    if (this.verificaCarnivoro(animal)) {
      return recinto.animaisExistentes.length === 0;
    }
    return true;
  }

  verificaHipopotamo(recinto, animal) {
    if (animal === 'HIPOPOTAMO') {
      return recinto.bioma === 'savana e rio';
    }
    return true;
  }

  verificaMacaco(recinto, animal) {
    if (animal === 'MACACO') {
      return recinto.animaisExistentes.length > 0;
    }
    return true;
  }

  tamanhoAnimal(especie) {
    return this.animais.find(a => a.especie === especie).tamanho;
  }

  calculaEspacoLivre(recinto, animal, quantidade) {
    const espaçoOcupado = recinto.animaisExistentes.reduce((ab, a) => ab + a.quantidade * this.tamanhoAnimal(a.especie), 0);
    const espaçoNecessario = quantidade * this.tamanhoAnimal(animal);
    let espaçoLivre = recinto.tamanhoTotal - espaçoOcupado;
    if (recinto.animaisExistentes.length > 0) {
      espaçoLivre -= 1;
      return espaçoLivre - espaçoNecessario;
    }
  }
}

export { RecintosZoo as RecintosZoo };
