import { Injectable, Inject } from "@nestjs/common";
import { PackageJsonService } from "../package-json/PackageJsonService";
import { FileModel } from "./FileModel";
import FsExtra from 'fs-extra';
import Path from 'path';
import { IDEService } from '../ide/IDEService';

@Injectable()
export class OrchestrationService {

	private packageJsonService: PackageJsonService;
	private fs: typeof FsExtra;
	private path: typeof Path;
	private ideService: IDEService;

	constructor(packageJsonService: PackageJsonService, @Inject('fs-extra') fs: typeof FsExtra, @Inject('path') path: typeof Path, ideService: IDEService) {
		this.packageJsonService = packageJsonService;
		this.fs = fs;
		this.path = path;
		this.ideService = ideService;
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
		await this.fs.copy(source, destinationDirectory);

		for(const fileModel of directoryStructure) {
			const filePath = this.path.join(destinationDirectory, fileModel.path);
			await this.fs.ensureFile(filePath);
			await this.fs.writeFile(filePath, fileModel.contents, 'utf8');
		}
	}

	public async buildDirectoryStructure() : Promise<FileModel[]> {

		const directoryStructure: FileModel[] = [];
		const vscodeFileModel = await this.ideService.vscodeSetup();

		if(vscodeFileModel !== null) {
			directoryStructure.push(vscodeFileModel);
		}

		return directoryStructure;
	}
}