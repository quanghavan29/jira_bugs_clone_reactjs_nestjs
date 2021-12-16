import React from 'react'
import { Route } from 'react-router-dom';
import Header from '../../pages/Project/Header/Header';
import Menu from '../../pages/Project/Menu/Menu';
import SideBar from '../../pages/Project/SideBar/SideBar';

export const JiraBugsTemplate = (props) => {
    const { Component, ...restParam } = props;

    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <div className="jira">

                <SideBar />

                <Menu />

                <div className="main">

                    <Header title={restParam.title}/>

                    <h4 style={{ color: '#172B4D', fontWeight: 'bold' }} className='mt-3 mb-4'>
                        {restParam.title}
                    </h4>

                    <Component {...propsRoute} />

                </div>

            </div>
        </>
    }} />
}