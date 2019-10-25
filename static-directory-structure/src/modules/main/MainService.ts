import { CommanderStatic } from 'commander';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class MainService {

	private commander: CommanderStatic;

	constructor(@Inject('commander') commander: CommanderStatic) {
		this.commander = commander;
	}

	public async init(version: string, isDevelopment: boolean) : Promise<void> {

		let actionToExecute: Promise<any> = Promise.resolve();

		this.commander.version(version, '-v, --version');

		this.commander
			.command('ping')
			.description('Simply replies to ensure this cli tool is working')
			.action(() => actionToExecute = Promise.resolve(console.log('pong')));

		this.commander.parse(process.argv);

		if(!this.commander.args.length) {
			this.commander.help();
			return;
		}

		await actionToExecute;
	}

}