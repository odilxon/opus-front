import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { LogInUser } from '../../redux/actions/UserAction';
import { toast } from 'react-toastify';
import { NewPassUrl } from '../../service';
import { useTranslation } from 'react-i18next';
// import { LoginUrl } from '../../service';
import Logo from '../../assets/images/logo.svg';
import LoaderPage from '../LoaderPage';
const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showpass, setShowpass] = useState(false);
  const [loader, setLoader] = useState(false);

  const { t } = useTranslation();

  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state);

  const { userAction } = userInfo;
  console.log(userInfo);

  const editPassword = async (e) => {
    setLoader(true);
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('current_password', currentPassword);
    bodyFormData.append('new_password', password);

    if (!currentPassword || !password) {
      return toast.warning(t('chpass.empty'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (currentPassword === password) {
      return toast.warning(t('chpass.compore'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    await axios({
      method: 'post',
      url: NewPassUrl,
      data: bodyFormData,
      headers: { 'x-access-token': localStorage.getItem('userToken') },
    })
      .then((response) => {
        console.log(response);
        setCurrentPassword('');
        setPassword('');

        navigate('/myAccount');
        return toast.success(t('chpass.success'), {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log('Err:', err);

        return toast.error(t('chpass.error'), {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setLoader(false);
  };

  // useEffect(() => {
  //   if (!localStorage.getItem('userToken')) {
  //     navigate('/');
  //   }
  // }, [navigate]);
  return (
    <div className="LogIn">
      <div className="container">
        <h1 className="text-center py-3">
          <div className="logo">
            <img src={Logo} alt="random" className="img-fluid" width="800" />
          </div>{' '}
        </h1>
        <div className="bg-white rounded shadow-sm p-5 mx-auto mb-2">
          <form onSubmit={editPassword}>
            <h2 className="text-center h3">{t('chpass.changePass')}</h2>

            <div className=" py-2 ">
              <label className="form-label  text-dark">
                {t('chpass.email')}
              </label>

              <input
                className="form-control form-control-lg form-control-solid "
                type="email"
                name="email"
                value={userAction.userInfos.email}
                aria-label="Disabled input"
                disabled={true}
                readOnly
              />

              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>

            <div className=" py-2 ">
              <label htmlFor="lastpass" className="form-label  text-dark">
                {t('chpass.cpass')}
              </label>

              <input
                className="form-control form-control-lg form-control-solid disabled"
                type={showpass ? 'text' : 'password'}
                name="password"
                placeholder={t('chpass.cpassplc')}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                id="lastpass"
              />
              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>
            <div className=" py-2 ">
              <label htmlFor="newpass" className="form-label  text-dark">
                {t('chpass.npass')}
              </label>

              <input
                className="form-control form-control-lg form-control-solid disabled"
                type={showpass ? 'text' : 'password'}
                name="password"
                placeholder={t('chpass.npassplc')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="newpass"
              />
              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>

            <div className=" py-2 ">
              <label className="form-label  text-dark">
                <input
                  type="checkbox"
                  checked={showpass}
                  onChange={() => setShowpass(!showpass)}
                />
                {'   '} {t('chpass.checkpass')}
              </label>
              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>

            <div className="py-2 pt-3 d-grid gap-2">
              <Link to="/myAccount" className="btn btn-sec fw-bold">
                {t('myacc.back')}
              </Link>
              <button className="btn  btn-opus fw-bold">
                {t('myacc.save')}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loader ? <LoaderPage /> : null}
    </div>
  );
};

export default ChangePassword;
