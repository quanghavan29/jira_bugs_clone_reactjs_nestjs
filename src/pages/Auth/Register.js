import React from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Register(props) {
    return (
        <form className="container" style={{marginTop: 130}} >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 className="text-center" style={{ fontWeight: 'bold', fontSize: 35 }}>Jira Bugs Register</h3>
                <div className="d-flex mt-3" >
                    <Input style={{ width: '100%', minWidth: 300 }} size="large" placeholder="Email address" prefix={<UserOutlined />} />
                </div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%', minWidth: 300 }} type="password" size="large" placeholder="Password" prefix={<LockOutlined />} />
                </div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%', minWidth: 300 }} type="password" size="large" placeholder="Re-Password" prefix={<LockOutlined />} />
                </div>
                <Button size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff', fontWeight: 'bold' }} className="mt-3">REGISTER</Button>
                <span className="mt-3">Already have an account? <NavLink to="register" className="mt-3">Login here</NavLink></span>
            </div>
        </form>
    )
}
