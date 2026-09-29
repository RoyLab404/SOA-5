import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('Lab 2 - Router, Middleware & JWT (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET / without token should return 401 Unauthorized', () => {
    return request(app.getHttpServer()).get('/').expect(401);
  });

  it('GET /auth without token should return 401 Unauthorized', () => {
    return request(app.getHttpServer()).get('/auth').expect(401);
  });

  it('POST /login with valid MD5 credentials should return JWT token, and allow access to /auth and /', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/login')
      .send({
        userName: 'admin',
        password: '21232f297a57a5a743894a0e4a801fc3',
      })
      .expect(200);

    const token = loginRes.body.token;
    expect(token).toBeDefined();

    // Test GET /auth with Bearer token
    const authRes = await request(app.getHttpServer())
      .get('/auth')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(authRes.body.user.userName).toBe('admin');

    // Test GET / (Hello World) with Bearer token
    await request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});

