import { Injectable, Inject } from "@nestjs/common";
import { PackageJsonService } from "../package-json/PackageJsonService";
import { FileModel } from "./FileModel";
import FsExtra from 'fs-extra';
import Path from 'path';

@Injectable()
export class OrchestrationService {

	private packageJsonService: PackageJsonService;
	private fs: typeof FsExtra;
	private path: typeof Path;

	constructor(packageJsonService: PackageJsonService, @Inject('fs-extra') fs: typeof FsExtra, @Inject('path') path: typeof Path) {
		this.packageJsonService = packageJsonService;
		this.fs = fs;
		this.path = path;
	}

	public async createNewProject(isDevelopment: boolean) {

		const directoryStructure = await this.buildDirectoryStructure();
		const destinationDirectory = isDevelopment ? this.path.join(__dirname, '../../../temp') : this.path.normalize(process.cwd());

		if(isDevelopment) {
			await this.fs.emptyDir(destinationDirectory);
		}

		const source = this.path.join(__dirname, '../../../static-directory-structure');
		await this.fs.copy(source, destinationDirectory);

		for(const fileModel of directoryStructure) {
			const filePath = this.path.join(destinationDirectory, fileModel.path);
			await this.fs.ensureFile(filePath);
			await this.fs.writeFile(filePath, fileModel.contents, 'utf8');
		}
	}

	public async buildDirectoryStructure() : Promise<FileModel[]> {

		const packageJsonDetails = await this.packageJsonService.askForDetails();
		const packageJsonContents = JSON.stringify(packageJsonDetails, undefined, '\t');
		const packageJsonFileModel = new FileModel('./package.json', packageJsonContents);

		const directoryStructure: FileModel[] = [
			packageJsonFileModel
		];

		console.log(directoryStructure);

		return directoryStructure;
	}
}