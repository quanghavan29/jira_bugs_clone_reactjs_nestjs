import React from 'react'
import { Route } from 'react-router-dom';
import Footer from '../../components/Home/Footer';
import Header from '../../components/Home/Header';

export const UserTemplate = (props) => {
    const {Component, ...restParam} = props;
    
    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <Header />
            
            <Component {...propsRoute} />

            <Footer />
        </>
    }} />
}