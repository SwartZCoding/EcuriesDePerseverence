import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default Login;

function Login() {
	const router = useRouter();

	// form validation rules
	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Username is required'),
		password: Yup.string().required('Password is required')
	});
	const formOptions = {resolver: yupResolver(validationSchema)};

	// get functions to build form with useForm() hook
	const {register, handleSubmit, formState} = useForm(formOptions);
	const {errors} = formState;

	async function onSubmit({username, password}) {
		const loginInfo = {
			identifier: username,
			password: password
		}


		let StrapiUrl = process.env.STRAPI_CLIENT_URL;
		const login = await fetch(`${StrapiUrl}/auth/local`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginInfo)
		})

		const loginResponse = await login.json();

		console.log(loginInfo);

		// return userService.login(username, password)
		// 	.then(() => {
		// 		// get return url from query parameters or default to '/'
		// 		const returnUrl = router.query.returnUrl || '/';
		// 		router.push(returnUrl);
		// 	})
		// 	.catch(alertService.error);
	}

	return (
		<div className="card">
			<h4 className="">Login</h4>
			<div className="">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="">
						<label>Username</label>
						<input name="username" type="text" {...register('username')}/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input name="password" type="password" {...register('password')}/>
					</div>
					<button disabled={formState.isSubmitting} className="btn btn-primary">
						{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
