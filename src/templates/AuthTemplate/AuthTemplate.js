import React from 'react';
import { Route } from 'react-router-dom';

export const AuthTemplate = (props) => {
    let { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <div style={{backgroundImage: 'url(./images/auth_background.png)', height: window.innerHeight}}>
                <Component {...propsRoute} />
            </div>
        </>
    }} />
}