import { Test } from "@nestjs/testing";
import { MainModule } from './MainModule';

describe('MainService', () => {

	test('Ensure MainModule compiles', async () => {
		await Test.createTestingModule({
			imports: [MainModule]
		}).compile();
	});

});