import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matchs from '../database/models/match'
import { allMatchs, inProgressTrueMatchs, inProgressFalseMatchs, createMatchs, addMatch, updateMatchs, updatedGoalsMatchs, updateGoals } from './mocks/matchsMock';
chai.use(chaiHttp);
import matchService from '../database/service/matchs-service'
import { userResponse } from './mocks/userMock';

const { expect } = chai;
''
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;

describe('Rota /matchs', () => {
  let allMatchsResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(allMatchs as any);
    allMatchsResponse = await chaiRequestLib(app)
      .get('/matchs');
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
});

describe('Rota /matchs?inProgress=true', () => {
  let matchsInProgressResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(inProgressTrueMatchs as any);
    matchsInProgressResponse = await chaiRequestLib(app)
      .get('/matchs?inProgress=true');
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
  })

  it('Testa que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', () => {
    const { body } = matchsInProgressResponse;

    expect(matchsInProgressResponse).to.be.an('object');
    expect(matchsInProgressResponse).to.have.status(200);
    expect(body.length).to.be.equal(2);
    expect(body[0].id).to.be.equal(41);
    expect(body[1].id).to.be.equal(42);
  });
});

describe('Rota /matchs?inProgress=true', () => {
  let matchsNotInProgressResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(inProgressFalseMatchs as any);
    matchsNotInProgressResponse = await chaiRequestLib(app)
      .get('/matchs?inProgress=false');
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
  })
  
  it('Testa que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', () => {
    const { body } = matchsNotInProgressResponse;

    expect(matchsNotInProgressResponse).to.be.an('object');
    expect(matchsNotInProgressResponse).to.have.status(200);
    expect(body.length).to.be.equal(2);
    expect(body[0].id).to.be.equal(1);
    expect(body[1].id).to.be.equal(2);
  });
});

describe('Rota POST /matchs', () => {
  let createMatchResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matchs, 'create')
      .resolves(createMatchs as any);
    sinon
      .stub(matchService, 'checkClubsIds')
      .resolves(true);  
    createMatchResponse = await chaiRequestLib(app)
      .post('/matchs')
      .set({ Authorization: userResponse.token })
      .send( addMatch );
  });

  after(() => {
    (matchService.checkClubsIds as sinon.SinonStub).restore();
    (Matchs.create as sinon.SinonStub).restore();
  })

  it('Testa que é possível criar uma nova partida', () => {
    const { body } = createMatchResponse;
    
    expect(createMatchResponse).to.be.an('object');
    expect(createMatchResponse).to.have.status(201);
    expect(body.id).to.be.equal(5);
  });

});

describe('Rota PATCH /matchs/5/finish', () => {
  let updateMatchResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matchs, 'update')
      .resolves(updateMatchs as any);
    updateMatchResponse = await chaiRequestLib(app)
      .patch('/matchs/5/finish');
  });

  after(() => {
    (Matchs.update as sinon.SinonStub).restore();
  })

  it('Testa que é possível editar o "inProgress" pra false de uma partida', () => {
    const { body } = updateMatchResponse;
    
    expect(updateMatchResponse).to.be.an('object');
    expect(updateMatchResponse).to.have.status(200);
    expect(body.id).to.be.equal(5);
  });

});

describe('Rota PATCH /matchs/:id', () => {
  let updateGoalsMatchResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matchs, 'update')
      .resolves(updatedGoalsMatchs as any);
    updateGoalsMatchResponse = await chaiRequestLib(app)
      .patch('/matchs/5')
      .send(updateGoals);
  });

  after(() => {
    (Matchs.update as sinon.SinonStub).restore();
  })

  it('Testa que é possível editar o "inProgress" pra false de uma partida', () => {
    const { body } = updateGoalsMatchResponse;
    
    expect(updateGoalsMatchResponse).to.be.an('object');
    expect(updateGoalsMatchResponse).to.have.status(200);
    expect(body.id).to.be.equal(5);
  });

});