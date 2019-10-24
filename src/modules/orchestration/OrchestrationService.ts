import { Injectable } from "@nestjs/common";
import { PackageJsonService } from "../package-json/PackageJsonService";
import { FileModel } from "./FileModel";
import { getGitignoreContents } from "../../getGitignoreContents";
import { getRunFileContents, getRunFileContentsWindows } from "../../getRunFileContents";

@Injectable()
export class OrchestrationService {

	private packageJsonService: PackageJsonService;

	constructor(packageJsonService: PackageJsonService) {
		this.packageJsonService = packageJsonService;
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