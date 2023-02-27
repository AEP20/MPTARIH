import React, { useState } from 'react';
import { UseAuthContext } from '../hooks/UseAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Register = (data) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = UseAuthContext();


    const signUp = async (data) => {

        setLoading(true);
        setError(null);

        const response = await fetch('https://us-central1-mptarih-3d6e1.cloudfunctions.net/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        
        if (!response.ok){
            setLoading(false);
            setError(json.error);
        }
        if (response.ok){
            await AsyncStorage.setItem('user', JSON.stringify(json));
            setError(null);
            dispatch({ type: 'LOGIN', payload: json });
            setLoading(false);

        };
    }
    return { signUp, error, loading };
    
}


export default Register;

