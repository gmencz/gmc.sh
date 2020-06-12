import { watch } from 'chokidar';
import { join } from 'path';

const watcher = watch(join(`${__dirname}`, 'graph'), {
  persistent: true,
});

watcher.on('change', (path) => {
  console.log(`File ${path} has changed`);
});
