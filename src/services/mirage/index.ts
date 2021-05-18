import { createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';

type User = {
    name: string;
    email: string;
    created_at: string;
}

//this is our fake API
export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },

        //this is to get a lot of users for example
        factories: {
            user: Factory.extend({
                name() {
                    return `${faker.name.firstName()} ${faker.name.lastName()}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },
            })
        },

        //this is our fake data
        seeds(server) {
            server.createList('user', 200)
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750; //this is to make more real, with a little delay

            this.get('/users', function (schema, request) {
                //this is just  to show 10 users per page
                const { page = 1, per_page = 10 } = request.queryParams


                const total = schema.all('user').length

                //this will go to 1 until 10 or 20 until 30 ...
                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);

                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd)
                
                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            });

            this.get('/users/:id');
            this.post('/users');

            this.namespace = ''; // reset routes namespace
            this.passthrough();
        }
    })

    return server;
}