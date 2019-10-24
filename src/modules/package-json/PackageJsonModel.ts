import { DependenciesModel } from "./DependenciesModel";

export class PackageJsonModel {
	public name: string;
	public version: string;
	public description: string = '';
	public main: string = '';
	public author: string = '';
	public license: string = 'ISC';
	public dependencies: DependenciesModel = {};
	public devDependencies: DependenciesModel = {};

	constructor(name: string, version: string) {
		this.name = name;
		this.version = version;
	}
}
