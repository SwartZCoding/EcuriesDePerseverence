import axios from 'axios';
import {useState} from "react";
import {nookies, parseCookies, setCookie} from 'nookies'
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import logo from "assets/img/logo.webp";

const Login = (ctx) => {

	const useStyles = makeStyles(styles);
	const classes = useStyles();

	const [userData, setUserData] = useState({
		identifier: '',
		password: '',
	})
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		await axios.post(`${process.env.STRAPI_CLIENT_URL}/auth/local`, userData)
			.then((response) => {
				console.log('Well done!');
				console.log('User profile', response.data.user);
				console.log('User token', response.data.jwt);
				setCookie(null, 'jwt_ecuries', response.data.jwt, {
					// httpOnly: true,
					maxAge: 7 * 24 * 60 * 60,
					path: '/',
				})
			})
			.catch((error) => {
				console.log('An error occurred:', error.response);
			});
	}
	
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({...userData, [name]: value });
	}

	return (
		<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<img
					className="mx-auto w-auto"
					src={logo}
					alt="logo"
				/>

					<h2 className="mt-6 text-center text-3xl text-gray-900">Connectez-vous à votre espace administrateur !</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="identifier"
								type="email"
								onChange={e => handleChange(e)}
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Adresse Email"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Mot de passe
							</label>
							<input
								id="password"
								name="password"
								type="password"
								onChange={e => handleChange(e)}
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Mot de passe"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Se connecter
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login;