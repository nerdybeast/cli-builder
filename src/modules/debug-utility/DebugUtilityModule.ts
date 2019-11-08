import { Module } from '@nestjs/common';
import { DebugUtilityFactory } from './DebugUtilityFactory';
import { DebugModule } from '../third-party/DebugModule';

@Module({
	imports: [
		DebugModule
	],
	providers: [
		DebugUtilityFactory
	],
	exports: [
		DebugUtilityFactory
	]
})
export class DebugUtilityModule {

}