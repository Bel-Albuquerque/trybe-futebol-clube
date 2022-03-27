// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import { allUsers, user as userMock, LoginBody, validLogin, userResponse } from './mocks/userMock';
// import { app } from '../app';
// import User from '../database/models/user';
// import { Response } from 'superagent';
// import { number } from 'joi';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Rota /login', () => {
//   let response: Response;

//   interface IUser {
//     id: number,
//     username: string,
//     role: string,
//     email: string,
//     password: string
//   }

//   before(async () => {
//     sinon
//       .stub(User, "findAll")
//       .resolves(allUsers as any[]);
//     sinon
//       .stub(User, 'findOne')
//       .resolves(userMock as any);
//   });

//   after(() => {
//     (User.findAll as sinon.SinonStub).restore();
//     (User.findOne as sinon.SinonStub).restore();
//   })

//   describe('Testes da rota POST /login', () => {

//     before(async () => {
//       response = await chai
//         .request(app)
//         .post('/login')
//         .send(validLogin);

//         const { body: { user, token } }: LoginBody = response;

//       it('Testa se é possível fazer o login com dados corretos e que após o acesso será redirecionado para a tela de jogos', () => {
//         expect(response).to.be.an('object');
//         expect(response).to.have.status(200);
//         expect(user?.username).to.be.an(userResponse.user.username);
//         expect(user?.role).to.be.an(userResponse.user.role);
//         expect(user?.email).to.be.an(userResponse.user.email);
//         expect(token).to.be.an('object');
//       })
//     });
//   });
// });
