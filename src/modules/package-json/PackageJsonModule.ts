import { Module } from '@nestjs/common';
import { PackageJsonService } from './PackageJsonService';
import { InquirerModule } from '../third-party/InquirerModule';

@Module({
	imports: [
		InquirerModule
	],
	providers: [
		PackageJsonService
	],
	exports: [
		PackageJsonService
	]
})
export class PackageJsonModule { }