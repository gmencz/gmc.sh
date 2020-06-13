import { DgraphClient, DgraphClientStub } from 'dgraph-js-http';

const dgraphClientStub = new DgraphClientStub('http://localhost:8080');
export const dgraphClient = new DgraphClient(dgraphClientStub);
