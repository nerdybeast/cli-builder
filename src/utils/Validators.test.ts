import { validatePackageName, INVALID_PACKAGE_NAME_ERROR, MISSING_PACKAGE_NAME_ERROR, validateVersionNumber, INVALID_VERSION_NUMBER_ERROR, leadingZeroVersionNumberError, MISSING_VERSION_NUMBER_ERROR } from "./Validators";

describe('Validators', () => {

	test('validatePackageName - valid package names', () => {

		const validPackageNames = [
			'cli-builder',
			'cli_builder',
			'cli.builder',
			'cool-cli.builder',
			'@cool/cli-builder',
			'@cool/cli_builder',
			'@cool/cli.builder',
			'@cool/cli-builder_new.tool',
			'@cool.cli/tool',
			'@cool_cli/new.tool'
		];

		for(const packageName of validPackageNames) {
			expect(validatePackageName(packageName)).toBe(true);
		}
	});
	
	test('validatePackageName - invalid package name - returns error message', () => {
		expect(validatePackageName('invalid*package*name')).toBe(INVALID_PACKAGE_NAME_ERROR);
	});

	test('validatePackageName - missing package name - returns error message', () => {
		
		const missingPackageNames = [
			'',
			' '
		];

		for(const packageName of missingPackageNames) {
			expect(validatePackageName(packageName)).toBe(MISSING_PACKAGE_NAME_ERROR);
		}
	});

	test('validateVersionNumber - valid versions - validation passes', () => {

		const validVersionNumbers = [
			'0.0.0',
			'10.0.0',
			'0.99.1',
			'100.100.100',
			'0.87.0'
		];

		for(const versionNumber of validVersionNumbers) {
			expect(validateVersionNumber(versionNumber)).toBe(true);
		}
	});

	test('validateVersionNumber - invalid versions - returns error message', () => {

		const invalidVersionNumbers = [
			'x.y.z',
			'123',
			'12..8',
			'12.34.5f'
		];

		for(const versionNumber of invalidVersionNumbers) {
			expect(validateVersionNumber(versionNumber)).toBe(INVALID_VERSION_NUMBER_ERROR);
		}
	});

	test('validateVersionNumber - leading zero - returns leading zero error', () => {
		expect(validateVersionNumber('1.033.1')).toBe(leadingZeroVersionNumberError('033'));
	});

	test('validateVersionNumber - no version number supplied - returns mising version number error', () => {
		expect(validateVersionNumber('')).toBe(MISSING_VERSION_NUMBER_ERROR);
	});
});