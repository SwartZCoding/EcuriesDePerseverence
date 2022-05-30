import axios from "axios";
import { nookies , parseCookies } from 'nookies';

export default class StrapiClient {
	constructor() {
	}

	async fetchData(path) {
		const jwt = parseCookies(null)["jwt_ecuries"]
		console.log(`cookies : ${jwt}`)
		const { data } = await axios.get(`${process.env.STRAPI_CLIENT_URL}${path}`, {
			headers: {
				Authorization:
					`Bearer ${jwt}`,
			},
		});
		return data;
	}
	
	
}