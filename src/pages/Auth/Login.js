import React from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/actions/AuthAction/LoginAction';


function Login(props) {

    const {
        errors,
        handleChange,
        handleSubmit,
        // values,
        // touched,
        // handleBlur,
    } = props;

    return (
        <form className="text-center p-5" style={{ maxWidth: 400, margin: 'auto', marginTop: 130 }} onSubmit={handleSubmit}>
            <div>
                <h3 style={{ fontWeight: 'bold', fontSize: 35 }}>Jira Bugs Login</h3>
                <div className="d-flex mt-4" >
                    <Input style={{ width: '100%' }} name="username" size="large" placeholder="Username" prefix={<UserOutlined />}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex text-danger">{errors.username}</div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%' }} name="password" type="password" size="large" placeholder="Password" prefix={<LockOutlined />}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex text-danger">{errors.password}</div>
                <div className="mt-3">
                    <a href="forgot-password">Forgot your password?</a>
                </div>
                <Button htmlType="submit" size="large" style={{ width: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff', fontWeight: 'bold' }} className="mt-3">
                    LOGIN
                </Button>
                <div className="mt-3">Not registered? <NavLink to="register" className="mt-3">Create an account</NavLink></div>
            </div>
        </form>
    )
}

const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: '',
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required!'),
        password: Yup.string().min(4, 'Your password must be at least 4 characters!'),
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        let { username, password } = values;
        setSubmitting(true);
        props.dispatch(loginAction(username, password));
    },

    displayName: 'Jira Bugs Login',
})(Login);

export default connect()(LoginWithFormik);