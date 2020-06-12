import { join } from 'path';
import { log } from 'console';
import { promises as fs } from 'fs';
import { whiteBright, greenBright, red, redBright, green } from 'chalk';
import fetch from 'node-fetch';
import { watch } from 'chokidar';

interface DGraphResponse {
  data: {
    code: string;
    message: string;
  };
}

export default class GraphWatcher {
  watch(graphPath: string) {
    const watcher = watch(graphPath, {
      persistent: true,
    });

    watcher.on('ready', () => {
      log(`${green('[WATCHING]')} Watching graph in directory ${graphPath}`);
    });

    watcher.on('change', (path) => {
      this.onGraphChange(path);
    });
  }

  private async onGraphChange(graphPath: string) {
    log(whiteBright('🤖 Loading new graph...'));
    try {
      const bufferedGraph = await fs.readFile(graphPath);

      log(whiteBright('🤖 Upadting DGraph...'));

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
        log(greenBright('✨ DGraph updated'));
      } else {
        log(`❌ ${redBright('Failed DGraph update')}`);
        log(red(`Failure info: ${JSON.stringify(data, null, 1)}`));
      }
    } catch (error) {
      log(`❌ ${redBright('Failed DGraph update')}`);
      log(red(`Failure info: ${JSON.stringify(error, null, 1)}`));
    }
  }
}
