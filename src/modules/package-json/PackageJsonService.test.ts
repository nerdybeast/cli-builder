import { Test } from '@nestjs/testing';
import { InquirerModule } from '../third-party/InquirerModule';
import { PackageJsonService } from './PackageJsonService';
import { Inquirer } from 'inquirer';

describe('PackageJsonService', () => {

	let packageJsonService: PackageJsonService;
	let inquirer: Inquirer;

	beforeEach(async () => {

		const mockPackageJsonModule = await Test.createTestingModule({
			imports: [
				InquirerModule
			],
			providers: [
				PackageJsonService
			]
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

});