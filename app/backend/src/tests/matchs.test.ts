import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matchs from '../database/models/match'
import { allMatchs } from './mocks/matchsMock';
chai.use(chaiHttp);

const { expect } = chai;
''
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;

describe('Rota /matchs', () => {
  let allMatchsResponse: Response;
  let matchsInProgressResponse: Response;
  let matchsNotInProgressResponse: Response
  
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(allMatchs as any);
    allMatchsResponse = await chaiRequestLib(app)
      .get('/matchs');
    matchsInProgressResponse = await chaiRequestLib(app)
      .get('/matchs?inProgress=true');
    matchsNotInProgressResponse = await chaiRequestLib(app)
      .get('/matchs?inProgress=false');
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
  })

  it('Testa se ao tentar fazer uma requisição GET na rota "/matchs", os dados corretos são retornados.', () => {
    const { body } = allMatchsResponse;

    expect(allMatchsResponse).to.be.an('object');
    expect(allMatchsResponse).to.have.status(200);
    expect(body.length).to.be.equal(4);
  });

  it('Testa que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', () => {
    const { body } = matchsInProgressResponse;

    expect(matchsInProgressResponse).to.be.an('object');
    expect(matchsInProgressResponse).to.have.status(200);
    expect(body.length).to.be.equal(2);
    expect(body[0].id).to.be.equal(1);
    expect(body[1].id).to.be.equal(2);
  });

  it('Testa que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', () => {
    const { body } = matchsInProgressResponse;

    expect(matchsInProgressResponse).to.be.an('object');
    expect(matchsInProgressResponse).to.have.status(200);
    expect(body.length).to.be.equal(2);
    expect(body[0].id).to.be.equal(41);
    expect(body[1].id).to.be.equal(42);
  });
});
