import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from './cred';

function Google() {
    return (
        <div id="google">
            <div
                id='g_id_onload'
                data-client_id='586990699149-mf4qeqt0f33bine5135ai4t4feibkp2c.apps.googleusercontent.com'
                data-login_uri='http://localhost:4000/api/auth/callback'
                data-auto_prompt='false'
                callback='onSignInCallback'
            />
            <div
                class='g_id_signin'
                data-type='standard'
                data-size='large'
                data-theme='outline'
                data-text='sign_in_with'
                data-shape='rectangular'
                data-logo_alignment='left'
            />
        </div>
    );
}

export default Google;
