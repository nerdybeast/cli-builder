import { validatePackageName, INVALID_PACKAGE_NAME_ERROR } from "./Validators";

describe('Validators', () => {

	test('validatePackageName', () => {

		const validPackageNames = [
			'cli-builder',
			'cli_builder',
			'cli.builder',
			'cool-cli.builder',
			'@cool/cli-builder',
			'@cool/cli_builder',
			'@cool/cli.builder',
			'@cool/cli-builder_new.tool'
		];

		expect(validatePackageName('valid-package-name')).toBe(true);
		expect(validatePackageName('valid_package_name')).toBe(true);
		expect(validatePackageName('valid.package.name')).toBe(true);
		expect(validatePackageName('valid_package_name')).toBe(true);
		expect(validatePackageName('invalid*package*name')).toBe(INVALID_PACKAGE_NAME_ERROR);
	});

});