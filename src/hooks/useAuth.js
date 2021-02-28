import axios from 'axios';
import React, { useState } from 'react'
import { AUTH_ENDPOINT, CREDENTIALS_NAME } from '../constants';

const useAuth = () => {
    const [ credential, setCredentials ] = useState({ username: null, displayName: null, token: null });
    const [ error , setError ] = useState(null);

    const login = (username, password, onLogin) => {
        const loginInfo = { username : username, password : password };
        axios
        .post(`${AUTH_ENDPOINT}/login`, loginInfo)
        .then(response => {
            const token = response.headers['authorization'].replace("Bearer ", "");
            sessionStorage.setItem(token);
        }).catch(error => {
            console.error(error);
            setError("O Login não pode ser realizado");
        });
        

    }

    const storeCredentials = (token) => {
        const tokenData = atob(token.split(".")[1]);
        const credentials = { username: tokenData.sub, displayName: tokenData.displayName, token: token };
        sessionStorage.setItem(CREDENTIALS_NAME, JSON.stringify(credentials));
        setCredentials(credentials);

    }
    
}