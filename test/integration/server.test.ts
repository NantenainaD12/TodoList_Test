import request from 'supertest';
import { application, Shutdown } from '../../src/server';


describe('Application', () => {

    afterAll((done) => {
        Shutdown(done);
    });

    // it('Starts and has the proper test environment', async () => {
    //     expect(process.env.NODE_ENV).toBe('test');
    //     expect(application).toBeDefined();
    // }, 10000);

    // it('Returns all options allowed when called from the HTTP method options', async () => {
    //     const response = await request(application).options('/');

    //     expect(response.status).toBe(200);
    //     expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
    // }, 10000);

      it('test to get all tasks getTasks', async () => {
        const response = await request(application).get('/TaskManagement/getTasks');
        expect(response.status).toBe(201);
    }, 10000);

      it('test to create new task', async () => {
        const response = await request(application)
        .post('/TaskManagement/createTask')
        .send({})
        .set({Accept : "Application/json"})

        expect(response.status).toBe(400);
    }, 10000);


       it('test to update task status', async () => {
        const response = await request(application)
        .post('/TaskManagement/changeTaskStatus/16')

        expect(response.status).toBe(200);
    }, 10000);

        it('test to delete task ', async () => {
        const response = await request(application)
        .post('/TaskManagement/DeleteTask/16')

        expect(response.status).toBe(201);
    }, 10000);
});
