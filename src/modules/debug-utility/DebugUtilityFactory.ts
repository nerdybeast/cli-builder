import { Injectable, Inject } from '@nestjs/common';
import Debug from 'debug';
import { DebugUtilityService } from './DebugUtilityService';

@Injectable()
export class DebugUtilityFactory {

	private debug: typeof Debug;

	constructor(@Inject('debug') debug: typeof Debug) {
		this.debug = debug;
	}

	create(debuggerName: string) : DebugUtilityService {
		const debugModule = this.debug(`cli-builder:${debuggerName}`);
		return new DebugUtilityService(debugModule);
	}
}
