import { Server } from 'miragejs';
import factories from './factories';
import routes from './routes';
import models from './models';
import seeds from './seeds';

const config = (environment) => {
  const config = {
    environment,
    factories,
    models,
    routes,
    seeds,
  };

  return config;
};

export function makeServer({ environment = 'development' } = {}) {
  return new Server(config(environment));
}

export function makeDevServer() {
  if (process.env.NODE_ENV === 'development') {
    makeServer();
  }
}
