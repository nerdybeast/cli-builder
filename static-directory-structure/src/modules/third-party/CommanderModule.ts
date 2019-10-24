import { Module, Provider } from '@nestjs/common';
import commander from 'commander';

export const commanderProvider: Provider = {
	provide: 'commander',
	useValue: commander
};

@Module({
	providers: [commanderProvider],
	exports: [commanderProvider]
})
export class CommanderModule { }