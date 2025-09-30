import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../../simple-reporter';

describe('DND combat API Tests', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://dnd-combat-api-7f3660dcecb1.herokuapp.com/api';

  p.request.setDefaultTimeout(50000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('Deve retornar um exemplo de personagem válido', async () => {
    await p
      .spec()
      .get(`${baseUrl}/characters/example`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        type: 'object',
        properties: {
          name: { type: 'string' },
          strength: { type: 'number' },
          dexterity: { type: 'number' },
          hitPoints: { type: 'number' },
          armorClass: { type: 'number' }
        },
        required: ['name', 'strength', 'dexterity', 'hitPoints', 'armorClass']
      });
  });

  it('Deve retornar a primeira página de uma lista de nomes de monstros', async () => {
    await p
      .spec()
      .get(`${baseUrl}/monsters/names/1`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        type: 'array',
        items: { type: 'string' }
      });
  });

  it('Deve retornar a segunda página de uma lista de nomes de monstros', async () => {
    await p
      .spec()
      .get(`${baseUrl}/monsters/names/2`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        type: 'array',
        items: { type: 'string' }
      });
  }
  );

  it('Deve validar a estrutura de um personagem válido com sucesso', async () => {
    const character = {
      name: "Kaya",
      strength: 10,
      dexterity: 7,
      hitPoints: 11,
      armorClass: 12
    };

    await pactum
      .spec()
      .post(`${baseUrl}/characters/check`)
      .withJson(character)
      .expectStatus(StatusCodes.OK);
  }
  );

  it('Deve validar a estrutura de outro personagem válido com sucesso', async () => {
    const character = {
      name: "Angelo",
      strength: 99,
      dexterity: 7,
      hitPoints: 11,
      armorClass: 40
    };

    await pactum
      .spec()
      .post(`${baseUrl}/characters/check`)
      .withJson(character)
      .expectStatus(StatusCodes.OK);
  }
  );

  it('Deve validar a estrutura e dar erro por personagem ter valores exorbitantes', async () => {
    const character = {
      name: "Diabo verde",
      strength: 9999999999,
      dexterity: 9999999999,
      hitPoints: 9999999999,
      armorClass: 9999999999
    };

    await pactum
      .spec()
      .post(`${baseUrl}/characters/check`)
      .withJson(character)
      .expectStatus(StatusCodes.BAD_REQUEST);
  }
  );

  it('Deve retornar os detalhes do monstro Shadow', async () => {
    await pactum
      .spec()
      .get('https://dnd-combat-api-7f3660dcecb1.herokuapp.com/api/monsters/shadow')
      .expectStatus(200)
      .expectJson({
        name: "Shadow",
        strength: 6,
        dexterity: 14,
        hit_points: 16,
        armor_class: 12
      });
  });

  it('Deve retornar os detalhes do monstro Crocodile', async () => {
    await pactum
      .spec()
      .get('https://dnd-combat-api-7f3660dcecb1.herokuapp.com/api/monsters/crocodile')
      .expectStatus(200)
      .expectJson({
        name: "Crocodile",
        strength: 15,
        dexterity: 10,
        hit_points: 19,
        armor_class: 12
      });
  });

  it('Deve retornar os detalhes do monstro Anzu', async () => {
    await pactum
      .spec()
      .get('https://dnd-combat-api-7f3660dcecb1.herokuapp.com/api/monsters/anzu')
      .expectStatus(200)
      .expectJson({
        name: "Anzu",
        strength: 20,
        dexterity: 14,
        hit_points: 152,
        armor_class: 16
      });
  });

  it('Deve retornar os detalhes do monstro Ape', async () => {
    await pactum
      .spec()
      .get('https://dnd-combat-api-7f3660dcecb1.herokuapp.com/api/monsters/ape')
      .expectStatus(200)
      .expectJson({
        name: "Ape",
        strength: 16,
        dexterity: 14,
        hit_points: 19,
        armor_class: 12
      });
  });
});
