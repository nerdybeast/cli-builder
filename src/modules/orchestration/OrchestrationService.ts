import { Injectable, Inject } from "@nestjs/common";
import { PackageJsonService } from "../package-json/PackageJsonService";
import { FileModel } from "./FileModel";
import FsExtra from 'fs-extra';
import Path from 'path';
import { IDEService } from '../ide/IDEService';
import { createGitignore } from '../../utils/createGitignore';
import { DebugUtilityService } from '../debug-utility/DebugUtilityService';
import { DebugUtilityFactory } from '../debug-utility/DebugUtilityFactory';

@Injectable()
export class OrchestrationService {

	private packageJsonService: PackageJsonService;
	private fs: typeof FsExtra;
	private path: typeof Path;
	private ideService: IDEService;
	private debugService: DebugUtilityService;

	constructor(packageJsonService: PackageJsonService, @Inject('fs-extra') fs: typeof FsExtra, @Inject('path') path: typeof Path, ideService: IDEService, debugFactory: DebugUtilityFactory) {
		this.packageJsonService = packageJsonService;
		this.fs = fs;
		this.path = path;
		this.ideService = ideService;
		this.debugService = debugFactory.create('OrchestrationService');
	}

	public async createNewProject(currentWorkingDirectory: string) : Promise<void> {

		const packageJsonDetails = await this.packageJsonService.askForDetails();
		const packageJsonContents = JSON.stringify(packageJsonDetails, undefined, '\t');
		const packageJsonFileModel = new FileModel('./package.json', packageJsonContents);
		
		//Use the name of the command as the folder name where we'll drop this cli
		const destinationDirectory = this.path.join(currentWorkingDirectory, Object.keys(packageJsonDetails.bin)[0]);

		const directoryStructure = await this.buildDirectoryStructure();
		directoryStructure.push(packageJsonFileModel);

		const source = this.path.join(__dirname, '../../static-directory-structure');
		this.debugService.debug('static-directory-structure location', source);

		await this.fs.copy(source, destinationDirectory);

		for(const fileModel of directoryStructure) {
			const filePath = this.path.join(destinationDirectory, fileModel.path);
			await this.fs.ensureFile(filePath);
			await this.fs.writeFile(filePath, fileModel.contents, 'utf8');
		}

		console.log(`Cli created at: ${destinationDirectory}`);
	}

	public async buildDirectoryStructure() : Promise<FileModel[]> {

		const directoryStructure: FileModel[] = [];
		const vscodeFileModel = await this.ideService.vscodeSetup();

		if(vscodeFileModel !== null) {
			directoryStructure.push(vscodeFileModel);
		}

		const gitignoreContents = createGitignore();
		const gitignoreFileModel = new FileModel('./.gitignore', gitignoreContents);
		directoryStructure.push(gitignoreFileModel);

		return directoryStructure;
	}
}