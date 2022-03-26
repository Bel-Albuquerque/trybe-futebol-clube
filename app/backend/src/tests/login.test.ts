import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { allUsers, user as userMock, LoginBody, validLogin, userResponse, user } from './mocks/userMock';
import { app } from '../app';
import User from '../database/models/user';
import { Response } from 'superagent';

chai.use(chaiHttp);

interface IUser {
      id: number,
      username: string,
      role: string,
      email: string,
      password: string
    }

const { expect } = chai;
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;

describe('Rota /login', () => {
  let response: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(user as User);
    response = await chaiRequestLib(app)
      .post('/login')
      .send(validLogin);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })



  it('Testa se é possível fazer o login com dados corretos e que após o acesso será redirecionado para a tela de jogos', () => {
    const { body: { user, token } }: LoginBody = response;

    expect(response).to.be.an('object');

    console.log(user);
    console.log(userResponse.user);
    
    expect(response).to.have.status(200);
    // expect(user?.username).to.be.an(userResponse.user.username);
    // expect(user?.role).to.be.an(userResponse.user.role);
    // expect(user?.email).to.be.an(userResponse.user.email);
    expect(token).to.be.an('string');

  });
});
