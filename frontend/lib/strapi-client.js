import axios from "axios";
import { nookies , parseCookies } from 'nookies';

export default class StrapiClient {
	constructor() {
	}

	async fetchData(path) {
		const cookies = parseCookies()
		const { data } = await axios.get(`${process.env.STRAPI_CLIENT_URL}${path}`, {
			headers: {
				Authorization:
					`Bearer ${parseCookies(null, cookies.jwt)}`,
			},
		});
		return data;
	}
	
	
}