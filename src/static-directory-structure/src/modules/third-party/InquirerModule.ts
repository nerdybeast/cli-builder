import { Module, Provider } from '@nestjs/common';
import inquirer from 'inquirer';

export const inquirerProvider: Provider = {
	provide: 'inquirer',
	useValue: inquirer
};

@Module({
	providers: [inquirerProvider],
	exports: [inquirerProvider]
})
export class InquirerModule { }