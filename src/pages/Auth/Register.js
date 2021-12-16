import React from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Register(props) {
    return (
        <form className="text-center p-5" style={{ maxWidth: 400, margin: 'auto', marginTop: 130 }}>
            <div>
                <h3 style={{ fontWeight: 'bold', fontSize: 35 }}>Jira Bugs Register</h3>
                <div className="d-flex mt-4" >
                    <Input style={{ width: '100%' }} name="email" type="email" size="large" placeholder="Email address" prefix={<UserOutlined />}
                    // onChange={handleChange}
                    />
                </div>
                {/* <div className="d-flex text-danger">{errors.email}</div> */}
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%' }} name="password" type="password" size="large" placeholder="Password" prefix={<LockOutlined />}
                    // onChange={handleChange}
                    />
                </div>
                {/* <div className="d-flex text-danger">{errors.password}</div> */}
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%' }} type="password" size="large" placeholder="Re-Password" prefix={<LockOutlined />} />
                </div>
                {/* <div className="d-flex text-danger">{errors.password}</div> */}
                <Button htmlType="submit" size="large" style={{ width: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff', fontWeight: 'bold' }} className="mt-3">
                    REGISTER
                </Button>
                <div className="mt-3">Already have an account? <NavLink to="/login" className="mt-3">Login here</NavLink></div>
            </div>
        </form>
    )
}
