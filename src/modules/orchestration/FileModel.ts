export class FileModel {
	public path: string;
	public contents: string;

	/**
	 * 
	 * @param relativePath Fully qualified relative path for the file, example: "./src/index.ts"
	 */
	constructor(relativePath: string, contents: string) {
		this.path = relativePath;
		this.contents = contents;
	}
}