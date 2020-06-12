import GraphWatcher from './utils/GraphWatcher';
import { join } from 'path';

const graphWatcher = new GraphWatcher();
graphWatcher.watch(join(`${__dirname}`, 'graph'));
