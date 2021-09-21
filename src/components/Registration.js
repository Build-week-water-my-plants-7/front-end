import React, {useState} from "react";
import axios from 'axios';

export default function Registration (){
    const [user, setUser] = useState({
        username:"",
        password: "",
        phone:""
    });

    handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    login = e => {
        e.preventDefault();

        axios.post("", user)
            .then(res => {
                console.log("SUCCESSFUL REGSITRATION RESPONSE", res.data);
                localStorage.setItem("token")
                //need to redirect to the protected page
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
              value={user.username}
              onChange={handleChange}
            />
            <input
              type="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
        </div>
      );
    
}