import { Module } from '@nestjs/common';
import { MainService } from './MainService';
import { CommanderModule } from '../third-party/CommanderModule';

@Module({
	imports: [
		CommanderModule
	],
	providers: [
		MainService
	],
	exports: [
		MainService
	]
})
export class MainModule { }