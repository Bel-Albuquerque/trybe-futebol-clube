import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
const mock = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
]
interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

  before(async () => {
    sinon
      .stub(User, "findAll")
      .resolves(mock as any[]);
  });

  after(() => {
    (User.findAll as sinon.SinonStub).restore();
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai.request(app)

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(false);
  });
});
