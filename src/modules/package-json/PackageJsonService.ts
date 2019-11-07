import { Injectable, Inject } from '@nestjs/common';
import { Inquirer } from 'inquirer';
import { validatePackageName, validateVersionNumber } from '../../utils/Validators';

@Injectable()
export class PackageJsonService {

	private inquirer: Inquirer;

	constructor(@Inject('inquirer') inquirer: Inquirer) {
		this.inquirer = inquirer;
	}

	public async askForDetails() : Promise<any> {

		const answers = await this.inquirer.prompt([{
			type: 'input',
			name: 'packageName',
			message: 'Please enter the package name (don\'t forget to add the scope name if required)',
			validate: validatePackageName
		}, {
			type: 'input',
			name: 'version',
			message: 'Please enter the version number (must be a valid semver version)',
			default: '0.0.1',
			validate: validateVersionNumber
		}, {
			type: 'input',
			name: 'description',
			message: 'Please enter the description for this package',
		}, {
			type: 'input',
			name: 'author',
			message: 'Please enter the author\'s name',
		}, {
			type: 'input',
			name: 'cmd',
			message: 'Please enter the name of the command that will be used to invoke this cli in the terminal',
			default(answers: any) {
				let packageName = answers.packageName.trim();
				return PackageJsonService.getCommandFromPackageName(packageName);
			}
		}]);

		return Promise.resolve({
			name: answers.packageName.trim(),
			version: answers.version.trim(),
			author: answers.author.trim(),
			description: answers.description.trim(),
			license: "ISC",
			main: "./dist/index.js",
			bin: {
				[answers.cmd]: "./bin/run"
			},
			scripts: {
				test: "jest"
			},
			dependencies: {
				"@nestjs/common": "^6.9.0",
				"@nestjs/core": "^6.9.0",
				"@types/node": "^12.12.6",
				"commander": "^4.0.0",
				"inquirer": "^7.0.0",
				"reflect-metadata": "^0.1.13",
				"rxjs": "^6.5.3",
				"tslib": "^1.10.0"
			},
			devDependencies: {
				"@nestjs/testing": "^6.8.3",
				"@types/inquirer": "^6.5.0",
				"@types/jest": "^24.0.19",
				"jest": "^24.9.0",
				"ts-jest": "^24.1.0",
				"ts-node": "^8.4.1",
				"tslint": "^5.20.0",
				"typescript": "^3.6.4"
			},
			jest: {
				preset: "ts-jest",
				testEnvironment: "node",
				roots: [
					"src"
				]
			}
		});
	}

	public static getCommandFromPackageName(packageName: string) : string {

		if(packageName.startsWith('@')) {
			packageName = packageName.split('/')[1];
		}

		return packageName.replace(/[_\.]+/g, '-');
	}
}