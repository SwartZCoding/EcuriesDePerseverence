import axios from 'axios';
import {useState} from "react";
import { parseCookies, setCookie }  from 'nookies'

const Login = () => {
	const [userData, setUserData] = useState({
		identifier: '',
		password: '',
	})
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		await axios.post(`${process.env.STRAPI_CLIENT_URL}/api/auth/local`, userData)
			.then((response) => {
				console.log('Well done!');
				console.log('User profile', response.data.user);
				console.log('User token', response.data.jwt);
				setCookie(null, 'jwt', response.data.jwt, {
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
		<form onSubmit={handleSubmit}>
			<label>
				Utilisateur :
				<input type="text" name="identifier" onChange={e => handleChange(e)} />
			</label>
			<br />
			<label>
				Mot de Passe :
				<input type="password" name="password" onChange={e => handleChange(e)} />
			</label>
			<br />
			<button>Se connecter</button>
		</form>
	)
}

export default Login;

// import {useRouter} from 'next/router';
// import {useForm} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
//
// export default Login;
//
// function Login() {
// 	const router = useRouter();
//
// 	// form validation rules
// 	const validationSchema = Yup.object().shape({
// 		username: Yup.string().required('Username is required'),
// 		password: Yup.string().required('Password is required')
// 	});
// 	const formOptions = {resolver: yupResolver(validationSchema)};
//
// 	// get functions to build form with useForm() hook
// 	const {register, handleSubmit, formState} = useForm(formOptions);
// 	const {errors} = formState;
//
// 	async function onSubmit({username, password}) {
// 		const loginInfo = {
// 			identifier: username,
// 			password: password
// 		}
//
//
// 		let StrapiUrl = process.env.STRAPI_CLIENT_URL;
// 		const login = await fetch(`${StrapiUrl}/auth/local`, {
// 			method: "POST",
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(loginInfo)
// 		})
//
// 		const loginResponse = await login.json();
//
// 		console.log(loginInfo);
//
// 	}
//
// 	return (
// 		<div className="h-screen w-screen flex flex-col items-center justify-around">
// 			<div className="card">
// 				<h4 className="">Login</h4>
// 				<div className="">
// 					<form onSubmit={handleSubmit(onSubmit)}>
// 						<div className="">
// 							<label>Username</label>
// 							<input name="username" type="text" {...register('username')}/>
// 						</div>
// 						<div className="form-group">
// 							<label>Password</label>
// 							<input name="password" type="password" {...register('password')}/>
// 						</div>
// 						<button disabled={formState.isSubmitting} className="btn btn-primary">
// 							{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
// 							Login
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
