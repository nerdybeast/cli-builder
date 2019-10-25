import { Module } from '@nestjs/common';
import { InquirerModule } from '../third-party/InquirerModule';
import { IDEService } from './IDEService';

@Module({
	imports: [
		InquirerModule
	],
	providers: [
		IDEService
	],
	exports: [
		IDEService
	]
})
export class IDEModule { }