import { useEffect } from 'react';
import Router from 'next/router';

const IndexPage = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If the user is logged in, redirect to the home page
            Router.push('/home');
        } else {
            // If not logged in, redirect to the auth page
            Router.push('/auth');
        }
    }, []);

    return null; // No need to render anything on this page
};

export default IndexPage;
