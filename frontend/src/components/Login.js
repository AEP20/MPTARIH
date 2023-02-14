import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuthContext } from '../hooks/UseAuthContext';


const Login = (data) => {
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = UseAuthContext();


    const signIn = async (data) => {

        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        console.log(json);
        if (!response.ok){
            setLoading(false);
            setError(json.error);
        }
        if (response.ok){
            setError(null);
            dispatch({ type: 'LOGIN', payload: json });
            setLoading(false);            
        };
    }
    return { signIn, error, loading };

}

export default Login;
