import React, {useState} from "react";
import axios from 'axios';

export default function Login (){
    const [credentials, setCredentials] = useState({
        username:"",
        password: ""
    });

    handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    login = e => {
        e.preventDefault();

        axios.post("", credentials)
            .then(res => {
                console.log("SUCCESSFUL LOGIN RESPONSE", res.data);
                localStorage.setItem("token")
                // need to redirect to the protected page
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
          <form onSubmit={login}>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button>Log in</button>
          </form>
        </div>
      );
    
}