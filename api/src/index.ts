import { watch } from 'chokidar';
import { join } from 'path';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { whiteBright, greenBright, red, redBright } from 'chalk';

const log = console.log;

const watcher = watch(join(`${__dirname}`, 'graph'), {
  persistent: true,
});

interface DGraphResponse {
  data: {
    code: string;
    message: string;
  };
}

watcher.on('change', async () => {
  try {
    log(whiteBright('Reading new graph...'));
    const bufferedGraph = await fs.readFile(
      join(`${__dirname}`, 'graph', 'schema.graphql')
    );

    log(whiteBright('Attempting to update graph...'));
    const dgraphResponse = await fetch('http://localhost:8080/admin/schema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bufferedGraph.toString('binary'),
    });

    const parsedDgraphResponse = (await dgraphResponse.json()) as DGraphResponse;
    const { data } = parsedDgraphResponse;

    if (data.code === 'Success') {
      log(greenBright('✔ Graph updated'));
    }
  } catch (error) {
    log(redBright(`Couldn't update DGraph graph`));
    log(red(error));
  }
});
