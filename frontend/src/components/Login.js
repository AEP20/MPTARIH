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

        const response = await fetch('https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/user/login', {
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
            await AsyncStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setLoading(false);            
        };
    }
    return { signIn, error, loading };

}

export default Login;
