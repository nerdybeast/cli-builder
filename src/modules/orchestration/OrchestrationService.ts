import { Injectable, Inject } from "@nestjs/common";
import { PackageJsonService } from "../package-json/PackageJsonService";
import { FileModel } from "./FileModel";
import { getGitignoreContents } from "../../getGitignoreContents";
import { getRunFileContents, getRunFileContentsWindows } from "../../getRunFileContents";
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
		const basePath = isDevelopment ? this.path.join(__dirname, '../../../temp') : this.path.normalize(process.cwd());

		if(isDevelopment) {
			await this.fs.emptyDir(basePath);
		}

		for(const fileModel of directoryStructure) {
			const filePath = this.path.join(basePath, fileModel.path);
			await this.fs.ensureFile(filePath);
			await this.fs.writeFile(filePath, fileModel.contents, 'utf8');
		}
	}

	public async buildDirectoryStructure() : Promise<FileModel[]> {

		const packageJsonDetails = await this.packageJsonService.askForDetails();
		const packageJsonContents = JSON.stringify(packageJsonDetails, undefined, '\t');
		const packageJsonFileModel = new FileModel('./package.json', packageJsonContents);

		const gitignoreContents = getGitignoreContents();
		const gitignoreFileModel = new FileModel('./.gitignore', gitignoreContents);

		const runFileContents = getRunFileContents();
		const runFileModel = new FileModel('./bin/run', runFileContents);

		const runFileContentsWindows = getRunFileContentsWindows();
		const runFileWindowsModel = new FileModel('./bin/run.cmd', runFileContentsWindows);

		const directoryStructure = [
			packageJsonFileModel,
			gitignoreFileModel,
			runFileModel,
			runFileWindowsModel
		];

		console.log(directoryStructure);

		return directoryStructure;
	}
}