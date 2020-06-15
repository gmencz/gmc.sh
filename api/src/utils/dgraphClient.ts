import { DgraphClient, DgraphClientStub } from 'dgraph-js-http';

const dgraphClientStub = new DgraphClientStub('https://graphql.gmc.sh');
export const dgraphClient = new DgraphClient(dgraphClientStub);
