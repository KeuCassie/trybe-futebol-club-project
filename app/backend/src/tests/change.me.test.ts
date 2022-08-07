import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);
const { expect } = chai;

describe('Login realizado com sucesso', () => {

  before(async () => {
    
    const mock = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }  as User

    
    sinon.stub(User, "findOne").resolves(mock);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Rota post "/login" realizado com sucesso', async () => {
  const { status, body } =  await chai.request(app).post('/login').send({
    email: 'admin@admin.com',
    password: 'secret_admin'
  });
  expect(status).to.be.eq(200);
  expect(Object.keys(body)).to.deep.eq(['token']);
  });

  it('verificando token da rota POST login', async () => {
    const { body: { token } } =  await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    expect(token).to.be.a('string');
    const { username, role, email, password } = jwt
      .decode(token) as { username: string, role: string, email: string, password: string };
    expect(username).to.be.eq('Admin');
    expect(role).to.be.eq('admin');
    expect(email).to.be.eq('admin@admin.com');
    expect(password).to.be.eq(undefined);
  });
});


describe('Login com falha', () => {

  it('Rota POST "/login" com email inexistente', async () => {
    const mock = null
    sinon.stub(User, "findOne").resolves(mock);
      const { status, body: { message } } =  await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
    expect(status).to.be.eq(401);
    expect(message).to.be.eq('Incorrect email or password');
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Rota POST "/login" com senha incorreta', async () => {
    const mock = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }  as User
    sinon.stub(User, "findOne").resolves(mock);
      const { status, body: { message } } =  await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_user'
      });
    expect(status).to.be.eq(401);
    expect(message).to.be.eq('Incorrect email or password');
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Rota POST "/login" sem o campo password', async () => {
    const { status, body: { message } } =  await chai.request(app).post('/login').send({
        email: 'admin@admin.com'
      });
    expect(status).to.be.eq(400);
    expect(message).to.be.eq('All fields must be filled');
  });

  it('Rota POST "/login" sem o campo email', async () => {
      const { status, body: { message } } =  await chai.request(app).post('/login').send({
        password: 'secret_admin'
      });
    expect(status).to.be.eq(400);
    expect(message).to.be.eq('All fields must be filled');
  });
});

describe('testando login validate', () => {
  before(async () => {
    const mock = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }  as User
    sinon.stub(User, "findOne").resolves(mock);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('login validate com sucesso', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    const { status, body } = await chai.request(app).get('/login/validate').set({ Authorization: token });
    expect(status).to.be.eq(200);
    expect(body).to.deep.eq({ role: 'admin' })
  })

  it('login validate com falha', async () => {
    const token = '123456789';
    const { status, body } = await chai.request(app).get('/login/validate').set({ Authorization: token });
    expect(status).to.be.eq(401);
    expect(body).to.deep.eq({ message: 'Token must be a valid token' });
  });
});