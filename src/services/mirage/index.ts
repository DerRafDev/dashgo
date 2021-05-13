import { createServer, Factory, Model } from 'miragejs';
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

            this.get('/users');
            this.post('/users');

            this.namespace = ''; // reset routes namespace
            this.passthrough();
        }
    })

    return server;
}