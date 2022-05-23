export default class StrapiClient {
	constructor() {
	}

	async fetchData(path) {
		const requestURL = `${process.env.STRAPI_CLIENT_URL}${path}`;
		const response = await fetch(requestURL);
		return await response.json();
	}
}