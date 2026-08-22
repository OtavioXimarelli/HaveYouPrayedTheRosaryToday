import {cpSync, existsSync} from 'node:fs';
import {join} from 'node:path';

const projectRoot = process.cwd();
const standaloneRoot = join(projectRoot, '.next', 'standalone');

if (!existsSync(join(standaloneRoot, 'server.js'))) {
  throw new Error('The standalone Next.js server was not generated.');
}

cpSync(join(projectRoot, 'public'), join(standaloneRoot, 'public'), {recursive: true});
cpSync(join(projectRoot, '.next', 'static'), join(standaloneRoot, '.next', 'static'), {recursive: true});
