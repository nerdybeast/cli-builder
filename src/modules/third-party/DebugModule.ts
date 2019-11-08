import { Module, Provider } from '@nestjs/common';
import debug from 'debug';

export const debugProvider: Provider = {
	provide: 'debug',
	useValue: debug
};

@Module({
	providers: [debugProvider],
	exports: [debugProvider]
})
export class DebugModule { }