import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUsr] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (token, user) => {
        // salvar o usuario e seu token no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        console.log('(login) >>user: ', user);
        setUser(user);
        setToken(token);
        console.log('~-AuthProvider\nuser: ', user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('\n\nlocalStorage\n', localStorage);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    const setUser = (usr) => {
        setUsr(usr);
        localStorage.setItem('user', JSON.stringify(usr));
    };

    // checar se há um usuario no localStorage
    const checkUser = () => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            if (storedUser && storedToken) {
                // const decodedToken = jwtDecode(storedToken); // decodificar para ter acesso ao tempo do token registrado
                // const currentTime = Date.now() / 1000; // tempo atual em segundos
                // if(decodedToken.exp < currentTime){ // caso o tempo do token seja menor que o tempo atual (segundos), desconecar o usuario
                //     logout();
                // }else{
                //     setUser(JSON.parse(storedUser));
                //     setToken(localStorage.getItem('token'));
                //     const token = localStorage.getItem('token');
                //     setIsAuthenticated(!!token);
                // }
                setUser(JSON.parse(storedUser));
                setToken(localStorage.getItem('token'));
                const token = localStorage.getItem('token');
                setIsAuthenticated(!!token);
            } else 
                setIsAuthenticated(false);            
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Ou qualquer componente de carregamento
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, user, token, login, logout, setIsAuthenticated, setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
