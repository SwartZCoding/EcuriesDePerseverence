import axios from 'axios';
import {useState} from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
	  e.preventDefault();
	
	  await axios.post(`${process.env.STRAPI_CLIENT_URL}/api/auth/local/register`, userData)
		  .then((response) => {
			  console.log('Well done!');
			  console.log('User profile', response.data.user);
			  console.log('User token', response.data.jwt);
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
        Username:
        <input type="text" name="username" onChange={e => handleChange(e)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" onChange={e => handleChange(e)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" onChange={e => handleChange(e)} />
      </label>
      <br />
      <button>Register</button>
    </form>
  )
}

export default Signup;