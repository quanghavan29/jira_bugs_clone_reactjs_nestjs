import React from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Login(props) {
    return (
        <form className="container" style={{marginTop: 130}} >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 className="text-center" style={{ fontWeight: 'bold', fontSize: 35 }}>Jira Bugs Login</h3>
                <div className="d-flex mt-3" >
                    <Input style={{ width: '100%', minWidth: 300 }} size="large" placeholder="Email address" prefix={<UserOutlined />} />
                </div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%', minWidth: 300 }} type="password" size="large" placeholder="Password" prefix={<LockOutlined />} />
                </div>
                <a href="forgot-password" className="mt-3">Forgot your password?</a>
                <Button size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff', fontWeight: 'bold' }} className="mt-3">LOGIN</Button>
                <span className="mt-3">Not registered? <NavLink to="register" className="mt-3">Create an account</NavLink></span>
            </div>
        </form>
    )
}