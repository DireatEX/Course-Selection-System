import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Axios from 'axios'
import "./Login.css";

export default function LoginForm(){

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [successLogin, setSuccessLogin] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        // Find user
        Axios.get("http://localhost:8800/userLogin", {params: {userID: userID, password: password}})
            .then((response) => {
                console.log(response.data);
                setSuccessLogin(true);
                if (userID === "0") {
                    setAdmin(true); // unique user ID for admin
                }
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.response.data);
            });
    }

    if (successLogin){
        if (admin){
            navigate('/UserList');
            // Navigate to admin profile
        }
        else {
            navigate(`/Profile/${userID}`);
            // Navigate to user profile
        }
    }

    return (
        <div className="backlogin">
           <div className="box">     
                <div className="CUHK"> </div>
            </div>
            <div className="bar"></div>
            <br/>
            <p className="tit">Course Selection System</p>
            <form method="post" className="LoginBox" action="/login" onSubmit={handleSubmit}>
                USER LOGIN
                <p>
                    <p className='errorMsg'>{errorMessage}</p>
                    <ph className="luser"></ph>
                    <input className='LoginPageInput' type="text" placeholder="User ID" name="userID" id="userID" style={{ width: "70%", marginLeft: "20px" }} required value={userID} onChange={(e) => setUserID(e.target.value)}/>
                    <br/>
                    <br/>
                    <ph className="lpass"></ph>
                    <input className='LoginPageInput' type="password" placeholder="Password" id="password" name="password" style={{ width: "70%", marginLeft: "20px" }} required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <br/>
                    <a href="/Signup">First time come here? Sign up!</a>
                    <button className="but" type="submit" id="submit">Login</button>
                </p>
            </form>
        </div>
    );
}
