import { Module, Provider } from '@nestjs/common';
import fsextra from 'fs-extra';

export const fsextraProvider: Provider = {
	provide: 'fs-extra',
	useValue: fsextra
};

@Module({
	providers: [fsextraProvider],
	exports: [fsextraProvider]
})
export class FsExtraModule { }