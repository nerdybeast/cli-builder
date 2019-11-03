export const INVALID_PACKAGE_NAME_ERROR = 'NPM package names can only contain lower-case letters, dashes, underscores, and periods (examples: "@penrod/sweet_util", "new-http-lib", "@restjs/http.module")';
export const MISSING_PACKAGE_NAME_ERROR = 'Please provide a package name';
export const INVALID_VERSION_NUMBER_ERROR = 'Version number must be in the format x.x.x and may only contain numbers';
export const leadingZeroVersionNumberError = (section: string) => `Version numbers may not contain leading zeros if multiple digits long, error at: "${section}"`;
export const MISSING_VERSION_NUMBER_ERROR = 'Please provide a version number';

export function validatePackageName(packageName: string) : boolean|string {

	packageName = (packageName || '').trim();

	if(!packageName) {
		return MISSING_PACKAGE_NAME_ERROR;
	}

	const pattern = /^@?[a-z\-_\.]+\/?[a-z\-_\.]*$/;

	if(pattern.test(packageName)) {
		return true;
	}

	return INVALID_PACKAGE_NAME_ERROR;
}

export function validateVersionNumber(version: string) : boolean|string {

	version = (version || '').trim();

	if(!version) {
		return MISSING_VERSION_NUMBER_ERROR;
	}

	const pattern = /^\d+\.\d+\.\d+$/;

	if(pattern.test(version)) {

		for(const section of version.split('.')) {
			if(section.length > 1 && section[0] === '0') {
				return leadingZeroVersionNumberError(section);
			}
		}

		return true;
	}

	return INVALID_VERSION_NUMBER_ERROR;
}
