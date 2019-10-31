export const INVALID_PACKAGE_NAME_ERROR = 'NPM package names can only contain lower-case letters, dashes, underscores, and periods (examples: "@penrod/sweet_util", "new-http-lib", "@restjs/http.module")';

export function validatePackageName(packageName: string) : boolean|string {

	packageName = (packageName || '').trim();

	if(!packageName) {
		return false;
	}

	const pattern = /^@?[a-z\-_\.]+\/?[a-z\-_\.]*$/;

	if(pattern.test(packageName)) {
		return true;
	}

	return INVALID_PACKAGE_NAME_ERROR;
}