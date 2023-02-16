import React from 'react';
import {FaGooglePlusSquare} from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../../Context/AuthContext';


const Login = () => {

    const {logIn, saveToken} = useAuth()
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    
    const handleSignIn = async () => {
        
        try{
            await logIn()
            saveToken()
            .then(idToken => {
                localStorage.setItem('token', idToken)
                history.replace(from);
            })
        }
        catch(e){
            alert(e.message)
        }
    }
    return (
        <div className="login">
            <div className="container">
                <div className="row mt-4 justify-content-center">
                    <div className="col-md-5 border p-4 text-center rounded shadow-lg">
                        <h3>Login</h3>
                        <button onClick={handleSignIn} className="mt-4 btn btn-danger shadow"><FaGooglePlusSquare /> Sign In Using Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;