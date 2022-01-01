import { Input, Upload, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react'
import { USER_LOGIN_LOCAL_STORAGE } from '../../util/config/constants';
import { UploadOutlined } from '@ant-design/icons';

export default function Account(props) {

    const propsUploadAvatar = {
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture',
        beforeUpload(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        ctx.fillStyle = 'red';
                        ctx.textBaseline = 'middle';
                        ctx.font = '33px Arial';
                        ctx.fillText('Ant Design', 20, 20);
                        canvas.toBlob(resolve);
                    };
                    setDisabledBtnSaveAvatar(false);
                };
            });
        },
        onRemove() {
            setDisabledBtnSaveAvatar(true);
        }
    };

    let userLoginLocal = {};

    if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
        userLoginLocal = { ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) };
    }

    const [userLogin, setUserLogin] = useState(userLoginLocal);
    const [disabledBtnSaveAvatar, setDisabledBtnSaveAvatar] = useState(true);

    return (
        <div className="row mt-5 ml-4">

            <div className="col-3 text-center" style={{
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                padding: 30,
            }}>
                <div>
                    {(userLogin.imageUrl === '' || userLogin.imageUrl === null) ?
                        <Avatar icon={<i className="fa fa-user-alt" style={{ fontSize: 60, marginTop: 12 }}></i>} style={{ width: 100, height: 100 }} /> : <Avatar src={userLogin.imageUrl} style={{ width: 100, height: 100 }} />
                    }
                </div>

                <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {userLogin.login}
                </div>

                <div className="mt-3">
                    {/* <Upload {...propsUploadAvatar}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload> */}
                    <input type="file"/>
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
                        <Input type="text" name="firstName" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <Input type="text" name="lastName" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <Input type="email" name="email" className="form-control" value={userLogin.email} placeholder="email@example.com" onChange={(e) => {
                            setUserLogin({ ...userLogin, email: e.target.value })
                        }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Old password</label>
                        <Input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New password</label>
                        <Input type="text" className="form-control" />
                    </div>

                </div>
            </div>
        </div >
    )
}

