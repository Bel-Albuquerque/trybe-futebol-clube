import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Clubs from '../database/models/club';
import { allClubs } from './mocks/clubsMock';

chai.use(chaiHttp);

const { expect } = chai;
''
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;

describe('Rota /clubs', () => {
  let allClubsResponse: Response;
  let clubByIdResponse: Response;
  
  before(async () => {
    sinon
      .stub(Clubs, 'findAll')
      .resolves(allClubs as any);
    sinon
      .stub(Clubs, 'findByPk')
      .resolves(allClubs[0] as any);
    allClubsResponse = await chaiRequestLib(app)
      .get('/clubs');

    clubByIdResponse = await chaiRequestLib(app)
      .get('/clubs/1');
  });

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
    (Clubs.findByPk as sinon.SinonStub).restore();
  })



  it('Testa se ao tentar fazer uma requisição GET na rota "/clubs", os dados corretos são retornados.', () => {
    const { body } = allClubsResponse;

    expect(allClubsResponse).to.be.an('object');
    expect(allClubsResponse).to.have.status(200);
    expect(body.length).to.be.equal(16);
  });

  it('Testa se ao  tentar fazer a requisição correta na sua API, os dados corretos são retornados', () => {
    const { body } = clubByIdResponse;

    expect(clubByIdResponse).to.be.an('object');
    expect(clubByIdResponse).to.have.status(200);
    expect(body.id).to.be.equal(allClubs[0].id);
    expect(body.id).to.be.equal(allClubs[0].id);
    expect(body.clubName).to.be.equal(allClubs[0].clubName);
  });
});
