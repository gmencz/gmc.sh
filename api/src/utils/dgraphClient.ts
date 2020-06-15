import { DgraphClient, DgraphClientStub } from 'dgraph-js-http';

const dgraphClientStub = new DgraphClientStub('https://graphql.gmc.sh/graphql');
export const dgraphClient = new DgraphClient(dgraphClientStub);
