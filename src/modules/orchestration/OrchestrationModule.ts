import { Module } from '@nestjs/common';
import { PackageJsonModule } from '../package-json/PackageJsonModule';
import { OrchestrationService } from './OrchestrationService';

@Module({
	imports: [
		PackageJsonModule
	],
	providers: [
		OrchestrationService
	],
	exports: [
		OrchestrationService
	]
})
export class OrchestrationModule { }