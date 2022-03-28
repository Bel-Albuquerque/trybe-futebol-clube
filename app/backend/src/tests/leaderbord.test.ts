import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Clubs from '../database/models/club';
import Match from '../database/models/match';
import { allLeaderborder, allMatchs, allUsers } from './mocks/leaderbordMock';

chai.use(chaiHttp);

const { expect } = chai;
''
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;

describe('Rota /leaderbord', () => {
  let allLeaderborderResponse: Response;
  let homeLeaderborderResponse: Response;
  let awayLeaderborderResponse: Response;
  
  before(async () => {
    sinon
      .stub(Clubs, 'findAll')
      .resolves(allUsers as any);
    sinon
      .stub(Match, 'findAll')
      .resolves(allMatchs as any);

    allLeaderborderResponse = await chaiRequestLib(app)
      .get('/leaderboard');

    homeLeaderborderResponse = await chaiRequestLib(app)
      .get('/leaderboard/home');
  
    awayLeaderborderResponse = await chaiRequestLib(app)
      .get('/leaderboard/away');
  });

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
    (Match.findAll as sinon.SinonStub).restore();
  })



  it('Testa se ao tentar fazer uma requisição GET na rota "/leaderboard", os dados corretos são retornados.', () => {
    const { body } = allLeaderborderResponse;
    
    expect(allLeaderborderResponse).to.be.an('object');
    expect(allLeaderborderResponse).to.have.status(200);
    expect(body.length).to.be.equal(16);
    expect(body[3].name).to.be.equal(allLeaderborder[3].name)
  });

  it('Testa se ao tentar fazer uma requisição GET na rota "/leaderboard/home", os dados corretos são retornados.', () => {
    const { body } = homeLeaderborderResponse;
    
    expect(homeLeaderborderResponse).to.be.an('object');
    expect(homeLeaderborderResponse).to.have.status(200);
    expect(body.length).to.be.equal(16);
    expect(body[3].name).to.be.equal('Grêmio')
  });

  it('Testa se ao tentar fazer uma requisição GET na rota "/leaderboard/away", os dados corretos são retornados.', () => {
    const { body } = awayLeaderborderResponse;
    
    expect(awayLeaderborderResponse).to.be.an('object');
    expect(awayLeaderborderResponse).to.have.status(200);
    expect(body.length).to.be.equal(16);
    expect(body[3].name).to.be.equal('São José-SP')
  });
});
