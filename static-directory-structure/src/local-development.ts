import { bootstrap } from './index';
import { readJSON } from 'fs-extra';
import { join } from 'path';

(async () => {
	const packageJson = await readJSON(join(__dirname, '../package.json'));
	await bootstrap(packageJson.version, true);
})();