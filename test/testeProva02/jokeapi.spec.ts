import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../../simple-reporter';

describe('Joke API tests', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://jokeapi.dev/';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  // 1. Teste para garantir que a API retorne uma piada de programação do tipo 'single'
  it('Deve retornar uma piada de programação tipo single', async () => {
    await p
      .spec()
      .get(`${baseUrl}joke/Programming?type=single`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        type: 'object',
        properties: {
          joke: { type: 'string' }, // A resposta deve conter uma piada como string
        },
        required: ['joke'],
      });
  });

  // 2. Teste para garantir que a API retorne uma piada de programação do tipo 'twopart'
  it('Deve retornar uma piada de programação tipo twopart', async () => {
    await p
      .spec()
      .get(`${baseUrl}joke/Programming?type=twopart`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        type: 'object',
        properties: {
          setup: { type: 'string' }, // A primeira parte da piada
          delivery: { type: 'string' }, // A segunda parte da piada
        },
        required: ['setup', 'delivery'],
      });
  });

  // 3. Teste para garantir que a API retorne um erro 404 quando um endpoint inválido é acessado
  it('Deve retornar erro 404 para endpoint inválido', async () => {
    await p
      .spec()
      .get(`${baseUrl}joke/InvalidEndpoint`)
      .expectStatus(StatusCodes.NOT_FOUND)
      .expectBodyContains('Not Found');
  });
});
