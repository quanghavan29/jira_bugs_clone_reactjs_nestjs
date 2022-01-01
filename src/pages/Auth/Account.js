import { Input, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { UPDATE_USER_SAGA } from '../../redux/constants/UserConst';
import { USER_LOGIN_LOCAL_STORAGE } from '../../util/config/constants';

export default function Account(props) {

    const dispatch = useDispatch();

    let userLoginLocal = {};

    if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
        userLoginLocal = { ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) };
    }

    const [userLogin, setUserLogin] = useState({
        values: {
            id: userLoginLocal.id,
            firstName: userLoginLocal.firstName,
            lastName: userLoginLocal.lastName,
            email: userLoginLocal.email,
            newPassword: '',
        },
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            newPassword: '',
        },
    });

    const handleOnChange = (e) => {
        const { type, name, value } = e.target;

        // console.log('type: ', type);
        // console.log('name: ', name);
        // console.log('value: ', value);
        setUserLogin({ ...userLogin, values: { ...userLogin.values, [name]: value } })
    }

    const [disabledBtnSaveAvatar, setDisabledBtnSaveAvatar] = useState(true);

    return (
        <div className="row mt-5 ml-4">

            <div className="col-3 text-center" style={{
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                padding: 30,
            }}>
                <div>
                    {(userLoginLocal.imageUrl === '' || userLoginLocal.imageUrl === null) ?
                        <Avatar icon={<i className="fa fa-user-alt" style={{ fontSize: 60, marginTop: 12 }}></i>} style={{ width: 100, height: 100 }} /> : <Avatar src={userLoginLocal.imageUrl} style={{ width: 100, height: 100 }} />
                    }
                </div>

                <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {userLogin.login}
                </div>

                <div className="mt-3">
                    <input className="ml-4" type="file" />
                    <Button type="primary" className="mt-3" disabled={disabledBtnSaveAvatar}>
                        Save
                    </Button>
                </div>

            </div>

            <div className="col-6" style={{
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                padding: 30,
                marginLeft: 30,
            }}>
                <div>
                    <div className="mb-3">
                        <label className="form-label">First name</label>
                        <Input type="text" name="firstName" className="form-control" value={userLogin.values.firstName} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <Input type="text" name="lastName" className="form-control" value={userLogin.values.lastName} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <Input type="email" name="email" className="form-control" value={userLogin.values.email} placeholder="email@example.com" onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New password</label>
                        <Input type="password" name="newPassword" className="form-control" onChange={handleOnChange} />
                    </div>
                    <Button type="primary" className="mt-3" onClick={() => {
                        dispatch({
                            type: UPDATE_USER_SAGA,
                            userUpdate: {...userLogin.values},
                        })
                    }}>
                        Save
                    </Button>
                </div>
            </div>
        </div >
    )
}

