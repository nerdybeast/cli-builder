import { Injectable, Inject } from '@nestjs/common';
import { Inquirer } from 'inquirer';
import { FileModel } from '../orchestration/FileModel';

@Injectable()
export class IDEService {

	private inquirer: Inquirer;

	constructor(@Inject('inquirer') inquirer: Inquirer) {
		this.inquirer = inquirer;
	}

	public async vscodeSetup() : Promise<FileModel|null> {

		const answer = await this.inquirer.prompt({
			type: 'confirm',
			name: 'vscode',
			message: 'Do you want to add basic vscode debugging setup'
		});

		if(!answer.vscode) {
			return null;
		}

		const launchJsonContents = this.getLaunchJsonContents();
		const vscodeFileModel = new FileModel('./.vscode/launch.json', launchJsonContents);

		return vscodeFileModel;
	}

	private getLaunchJsonContents() : string {
		return `{
	// Use IntelliSense to learn about possible attributes.
	// Hover to view descriptions of existing attributes.
	// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "run ping command",
			"program": "\${workspaceFolder}/src/local-development.ts",
			"args": ["ping"],
			"console": "integratedTerminal",
			"outFiles": ["\${workspaceFolder}/dist/**/*.js"],
			"sourceMaps": true,
			"smartStep": true,
			//https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_skipping-uninteresting-code-node-chrome
			"skipFiles": [
				"<node_internals>/**/*.js",
				"\${workspaceFolder}/node_modules/**/*.js"
			],
			"preLaunchTask": "tsc: build - tsconfig.json"
		}
	]
}`;
	}
}