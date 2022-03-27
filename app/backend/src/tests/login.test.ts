import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {
  user,
  validLogin,
  userResponse,
  nullEmail,
  nullFildMessage,
  nullPassword,
  invalidEmail,
  ivalidFildMessage,
  invalidPassword,
} from './mocks/userMock';
import { app } from '../app';
import User from '../database/models/user';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;

describe('Rota /login', () => {
  let godRespnse: Response;
  let nullEmailResponse: Response;
  let nullpasswordResponse: Response;
  let invalidEmailResponse: Response;
  let invalidPasswordResponse: Response;
  let validateHeades: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(user as User);
    godRespnse = await chaiRequestLib(app)
      .post('/login')
      .send(validLogin);
    nullEmailResponse = await chaiRequestLib(app)
      .post('/login')
      .send(nullEmail);
    nullpasswordResponse = await chaiRequestLib(app)
      .post('/login')
      .send(nullPassword);
    invalidEmailResponse = await chaiRequestLib(app)
      .post('/login')
      .send(invalidEmail);
    invalidPasswordResponse = await chaiRequestLib(app)
      .post('/login')
      .send(invalidPassword);
    validateHeades = await chaiRequestLib(app)
      .get('/login/validate', {
        headers: {
          authorization: userResponse.token
        }
      });

  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })



  it('Testa se é possível fazer o login com dados corretos e que após o acesso será redirecionado para a tela de jogos', () => {
    const { body: { user, token } } = godRespnse;

    expect(godRespnse).to.be.an('object');
    expect(godRespnse).to.have.status(200);
    expect(user.username).to.be.equal(userResponse.user.username);
    expect(user.role).to.be.equal(userResponse.user.role);
    expect(user.email).to.be.equal(userResponse.user.email);
    expect(token).to.be.an('string');

  });

  it('Testa se se fazer o login sem o campo email, retornará mensagem de erro correta', () => {
    const { body: { message } } = nullEmailResponse;

    expect(nullEmailResponse).to.be.an('object');
    expect(nullEmailResponse).to.have.status(401);
    expect(message).to.be.equal(nullFildMessage);
  });

  it('Testa se se fazer o login sem o campo password, retornará mensagem de erro correta', () => {
    const { body: { message } } = nullpasswordResponse;

    expect(nullpasswordResponse).to.be.an('object');
    expect(nullpasswordResponse).to.have.status(401);
    expect(message).to.be.equal(nullFildMessage);
  });

  it('Testa se se fazer o login sem o campo email inválido, retornará mensagem de erro correta', () => {
    const { body: { message } } = invalidEmailResponse;

    expect(invalidEmailResponse).to.be.an('object');
    expect(invalidEmailResponse).to.have.status(401);
    expect(message).to.be.equal(ivalidFildMessage);
  });

  it('Testa se se fazer o login sem o campo password inválido, retornará mensagem de erro correta', () => {
    const { body: { message } } = invalidPasswordResponse;

    expect(invalidPasswordResponse).to.be.an('object');
    expect(invalidPasswordResponse).to.have.status(401);
    expect(message).to.be.equal(ivalidFildMessage);
  });

  // it('Testa se é possivel validar o tipo de usuário passando o token no header da requisição ', () => {
  //   const { status } = validateHeades;

  //   expect(validateHeades).to.be.an('object');
  //   expect(validateHeades).to.have.status(200);
  //   // expect(data).to.be.equal(userResponse.user.role);
  // });
});

// expect(result).toHaveProperty("status");
// expect(result).toHaveProperty("data");
// expect(result.status).toBe(200);
// expect(result.data).toBe("admin");