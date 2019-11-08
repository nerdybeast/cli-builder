import { Module } from '@nestjs/common';
import { PackageJsonModule } from '../package-json/PackageJsonModule';
import { OrchestrationService } from './OrchestrationService';
import { FsExtraModule } from '../third-party/FsExtraModule';
import { PathModule } from '../third-party/PathModule';
import { IDEModule } from '../ide/IDEModule';
import { DebugUtilityModule } from '../debug-utility/DebugUtilityModule';

@Module({
	imports: [
		PackageJsonModule,
		FsExtraModule,
		PathModule,
		IDEModule,
		DebugUtilityModule
	],
	providers: [
		OrchestrationService
	],
	exports: [
		OrchestrationService
	]
})
export class OrchestrationModule { }