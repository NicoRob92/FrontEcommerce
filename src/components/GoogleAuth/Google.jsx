import React from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from './cred';

function Google() {
    const onSuccess = response=>{
        if (!localStorage.getItem('token')) {
            console.log("Encoded JWT ID token: " + response.tokenId);
        fetch("http://localhost:4000/api/decoderGoogle?token="+ response.tokenId,{
          method:"POST"
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            localStorage.setItem("logged",true)
            localStorage.setItem('token', data.token);
            localStorage.setItem('rol', data.rol);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.id)
            localStorage.setItem('email', data.username);
            window.location.href="http://localhost:3000/"
          });
        }
    }
    const onFailure = response=>{
        console.log("login failed"+ "res:" +response);
    }
    return (
        <div id="google">
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                data-login_uri='http://localhost:4000/api/auth/callback'
                data-auto_prompt='false'
                callback='onSignInCallback'
            />
        </div>
    );
}

export default Google;
