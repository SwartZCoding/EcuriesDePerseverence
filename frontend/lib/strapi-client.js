import axios from "axios";
import { parseCookies } from "nookies";

export default class StrapiClient {
	constructor() {
	}
	
	async fetchData(ctx, path) {
		const cookies = parseCookies(ctx)
		console.log("cookie : ", cookies.jwt_ecuries)
		let bearer = null;
		if (cookies.jwt_ecuries) {
			const bearer = `Bearer ${cookies.jwt_ecuries}`
			console.log("bearer : ", bearer)
		}
		const { data } = await axios.get(`${process.env.STRAPI_CLIENT_URL}${path}`, {
			headers: {
				Authorization:
					bearer
			}
		});
		return data;
	}
	
}