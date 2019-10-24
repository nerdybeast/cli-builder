import { Module } from '@nestjs/common';
import { MainService } from './MainService';
import { CommanderModule } from '../third-party/CommanderModule';
import { OrchestrationModule } from '../orchestration/OrchestrationModule';

@Module({
	imports: [
		CommanderModule,
		OrchestrationModule
	],
	providers: [
		MainService
	],
	exports: [
		MainService
	]
})
export class MainModule { }