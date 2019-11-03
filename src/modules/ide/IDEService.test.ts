import { Test } from "@nestjs/testing";
import { IDEModule } from './IDEModule';
import { Inquirer } from 'inquirer';
import { IDEService } from './IDEService';

describe('IDEService', () => {

	let ideService: IDEService;
	let inquirer: Inquirer;

	beforeEach(async () => {

		const mockIDEModule = await Test.createTestingModule({
			imports: [IDEModule]
		}).compile();

		ideService = mockIDEModule.get<IDEService>(IDEService);
		inquirer = mockIDEModule.get<Inquirer>('inquirer');
	});

	test('vscodeSetup - vscode debugging not selected - returns null', async () => {

		jest.spyOn(inquirer, 'prompt').mockResolvedValue({
			vscode: false
		});

		const result = await ideService.vscodeSetup();
		expect(result).toBeNull();
	});

	test('vscodeSetup - vscode debugging is selected - returns FileModel', async () => {

		jest.spyOn(inquirer, 'prompt').mockResolvedValue({
			vscode: true
		});

		const result = await ideService.vscodeSetup();
		expect(result).not.toBeNull();
	});

});