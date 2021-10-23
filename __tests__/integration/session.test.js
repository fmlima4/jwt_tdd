const request = require('supertest')
const app = require('../../src/app')
// const {User} = require('../../src/app/models');
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('authentication', () => {
    beforeEach(async() => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })
        
        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '123456'
        })

        expect(response.status).toBe(200)
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })
                
        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '1234567'
        })

        expect(response.status).toBe(401)
    });

    it('should receive jwt token', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })
                
        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '123456'
        })

        expect(response.body).toHaveProperty("token")
    });


    it('should be able to access private routes whit a valid jwt token', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })
                
        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200)
    });

    it('should not be able to access private routes whitout jwt token', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })
                
        const response = await request(app)
        .get('/dashboard')
    

        expect(response.status).toBe(401)
    });

    it('should not be able to access private routes whit a invalid jwt token', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })
                
        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer 123123`)
    

        expect(response.status).toBe(401)
    });
});





