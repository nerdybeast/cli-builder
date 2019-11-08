import { Test } from "@nestjs/testing";
import { OrchestrationModule } from './OrchestrationModule';
import { PackageJsonService } from '../package-json/PackageJsonService';
import { OrchestrationService } from './OrchestrationService';
import { IDEService } from '../ide/IDEService';
import { FileModel } from './FileModel';
import FsExtra from 'fs-extra';
import path from 'path';

describe('OrchestrationService', () => {

	let orchestrationService: OrchestrationService;
	let packageJsonService: PackageJsonService;
	let ideService: IDEService;
	let fs: typeof FsExtra;

	beforeEach(async () => {

		const mockOrchestrionModule = await Test.createTestingModule({
			imports: [OrchestrationModule]
		}).compile();

		orchestrationService = mockOrchestrionModule.get<OrchestrationService>(OrchestrationService);
		packageJsonService = mockOrchestrionModule.get<PackageJsonService>(PackageJsonService);
		ideService = mockOrchestrionModule.get<IDEService>(IDEService);
		fs = mockOrchestrionModule.get<typeof FsExtra>('fs-extra');
	});

	test('buildDirectoryStructure - no additional file models', async () => {

		jest.spyOn(ideService, 'vscodeSetup').mockResolvedValue(null);

		const result = await orchestrationService.buildDirectoryStructure();
		expect(result).toHaveLength(1);
	});

	test('buildDirectoryStructure - includes vscode debugging', async () => {

		jest.spyOn(ideService, 'vscodeSetup').mockResolvedValue(new FileModel('./', ''));

		const result = await orchestrationService.buildDirectoryStructure();
		expect(result).toHaveLength(2);
	});

	test('createNewProject', async () => {

		jest.spyOn(packageJsonService, 'askForDetails').mockResolvedValue({
			bin: {
				test: ''
			}
		});
		
		//Simulates no vscode debugging being added
		jest.spyOn(ideService, 'vscodeSetup').mockResolvedValue(null);

		jest.spyOn(fs, 'emptyDir').mockImplementation(() => Promise.resolve());
		jest.spyOn(fs, 'copy').mockImplementation(() => Promise.resolve());
		jest.spyOn(fs, 'ensureFile').mockImplementation(() => Promise.resolve());
		jest.spyOn(fs, 'writeFile').mockImplementation(() => Promise.resolve());

		await orchestrationService.createNewProject(path.join(__dirname, '../../../temp'));
		
	});
});