import { Test } from '@nestjs/testing';
import { InquirerModule } from '../third-party/InquirerModule';
import { PackageJsonService } from './PackageJsonService';
import { Inquirer } from 'inquirer';
import { PackageJsonModule } from './PackageJsonModule';

describe('PackageJsonService', () => {

	let packageJsonService: PackageJsonService;
	let inquirer: Inquirer;

	beforeEach(async () => {

		const mockPackageJsonModule = await Test.createTestingModule({
			imports: [PackageJsonModule]
		}).compile();

		packageJsonService = mockPackageJsonModule.get<PackageJsonService>(PackageJsonService);
		inquirer = mockPackageJsonModule.get<Inquirer>('inquirer');
	});

	test('askForDetails - happy path', async () => {

		const answers = {
			packageName: 'test',
			version: '0.0.1',
			author: 'bruce.banner@avenge.com',
			description: 'Little rage cli',
			cmd: 'my-test-cli'
		};

		jest.spyOn(inquirer, 'prompt').mockResolvedValue(answers);

		const packageJson = await packageJsonService.askForDetails();
		expect(packageJson.name).toBe(answers.packageName);
		expect(packageJson.version).toBe(answers.version);
		expect(packageJson.author).toBe(answers.author);
		expect(packageJson.description).toBe(answers.description);
		expect(packageJson.bin).toHaveProperty(answers.cmd);
	});

	test('getCommandFromPackageName', () => {
		expect(PackageJsonService.getCommandFromPackageName('@cool/cli')).toBe('cli');
		expect(PackageJsonService.getCommandFromPackageName('@cool/cli.tool')).toBe('cli-tool');
		expect(PackageJsonService.getCommandFromPackageName('@cool/cli_tool')).toBe('cli-tool');
		expect(PackageJsonService.getCommandFromPackageName('@cool/my.cli.tool')).toBe('my-cli-tool');
		expect(PackageJsonService.getCommandFromPackageName('my.cli.tool')).toBe('my-cli-tool');
		expect(PackageJsonService.getCommandFromPackageName('my_cli_tool')).toBe('my-cli-tool');
	});
});