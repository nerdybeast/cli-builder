import { Module, Provider } from '@nestjs/common';
import path from 'path';

export const pathProvider: Provider = {
	provide: 'path',
	useValue: path
};

@Module({
	providers: [pathProvider],
	exports: [pathProvider]
})
export class PathModule { }