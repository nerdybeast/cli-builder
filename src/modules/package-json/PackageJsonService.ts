import { Injectable, Inject } from '@nestjs/common';
import { PackageJsonModel } from './PackageJsonModel';
import { Inquirer } from 'inquirer';

@Injectable()
export class PackageJsonService {

	private inquirer: Inquirer;

	constructor(@Inject('inquirer') inquirer: Inquirer) {
		this.inquirer = inquirer;
	}

	public async askForDetails() : Promise<PackageJsonModel> {

		const answers = await this.inquirer.prompt([{
			type: 'input',
			name: 'packageName',
			message: 'Please enter the package name (don\'t forget to add the scope name if required)',
		}, {
			type: 'input',
			name: 'version',
			message: 'Please enter the version number (must be a valid semver version)',
			default: '0.0.1'
		}, {
			type: 'input',
			name: 'description',
			message: 'Please enter the description for this package',
		}, {
			type: 'input',
			name: 'author',
			message: 'Please enter the author\'s name',
		}]);

		const model = new PackageJsonModel(answers.packageName, answers.version);
		model.description = answers.description;
		model.author = answers.author;

		model.dependencies = {
			"@nestjs/common": "^6.8.3",
			"@nestjs/core": "^6.8.3",
			"@types/node": "^12.11.6",
			"commander": "^3.0.2",
			"inquirer": "^7.0.0",
			"reflect-metadata": "^0.1.13",
			"rxjs": "^6.5.3",
			"tslib": "^1.10.0"
		};

		model.devDependencies = {
			"@nestjs/testing": "^6.8.3",
			"@types/inquirer": "^6.5.0",
			"jest": "^24.9.0",
			"ts-jest": "^24.1.0",
			"ts-node": "^8.4.1",
			"tslint": "^5.20.0",
			"typescript": "^3.6.4"
		}

		return Promise.resolve(model);
	}

}