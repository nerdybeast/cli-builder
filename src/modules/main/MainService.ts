import { CommanderStatic } from 'commander';
import { Injectable, Inject } from '@nestjs/common';
import { OrchestrationService } from '../orchestration/OrchestrationService';
import path from 'path';

@Injectable()
export class MainService {

	private commander: CommanderStatic;
	private orchestrationService: OrchestrationService;

	constructor(@Inject('commander') commander: CommanderStatic, orchestrationService: OrchestrationService) {
		this.commander = commander;
		this.orchestrationService = orchestrationService;
	}

	public async init(version: string, isDevelopment: boolean) : Promise<void> {

		let actionToExecute: Promise<any> = Promise.resolve();

		this.commander.version(version, '-v, --version');

		this.commander
			.command('create')
			.description('Creates the scaffolding for a new cli project.')
			.action(() => {
				const destinationDirectory = isDevelopment ? path.join(__dirname, '../../../temp') : path.normalize(process.cwd());
				actionToExecute = this.orchestrationService.createNewProject(destinationDirectory);
			});

		this.commander.parse(process.argv);

		if(this.commander.rawArgs.length < 3) {
			this.commander.help();
			return;
		}

		await actionToExecute;
	}

}