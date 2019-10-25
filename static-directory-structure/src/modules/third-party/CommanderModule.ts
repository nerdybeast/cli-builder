import { Module, Provider } from '@nestjs/common';
import commander from 'commander';

export const commanderProviderName = 'commander';

const commanderProvider: Provider = {
	provide: commanderProviderName,
	useValue: commander
};

@Module({
	providers: [commanderProvider],
	exports: [commanderProvider]
})
export class CommanderModule { }