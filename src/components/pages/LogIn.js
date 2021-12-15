import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogInUser } from '../../redux/actions/UserAction';
import { toast } from 'react-toastify';
import { LoginUrl } from '../../service';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/images/logo.svg';
const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const userInfo = useSelector((state) => state);
  // const { user } = userInfo;

  const fetchUser = async (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);

    if (!email || !password) {
      return toast.warning(t('warning'), {
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
      url: LoginUrl,
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        const tokeen = response.data.token;
        dispatch(LogInUser(tokeen));
        localStorage.setItem('userToken', tokeen);
        setEmail('');
        setPassword('');
      })
      .catch((err) => {
        console.log('Err:', err);
      });

    if (localStorage.getItem('userToken')) {
      navigate('/myAccount');

      return toast.success(t('login.success'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error(t('login.error'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/myAccount');
      return toast.success(t('login.success'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className="LogIn">
      <div className="container">
        <h1 className="text-center py-5">
          {' '}
          <div className="logo">
            <img src={Logo} alt="random" className="img-fluid" width="800" />
          </div>{' '}
        </h1>
        <div className="bg-white rounded shadow-sm p-5 mx-auto">
          <form onSubmit={fetchUser}>
            <h2 className="text-center h3">{t('login.kirish')}</h2>

            <div className=" py-2 ">
              <label className="form-label  text-dark">Email</label>

              <input
                className="form-control form-control-lg form-control-solid "
                type="email"
                name="email"
                placeholder={t('login.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>

            <div className=" py-2 ">
              <label className="form-label  text-dark">{t('myacc.pass')}</label>

              <input
                className="form-control form-control-lg form-control-solid "
                type="password"
                name="password"
                placeholder={t('login.pass')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>

            <div className="py-2 pt-3 d-grid gap-2">
              <button className="btn btn-opus fw-bold">
                {t('login.cont')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="links pb-5">
        <Link className="text-muted" to="/">
          About
        </Link>
        <Link className="text-muted" to="/">
          Contact
        </Link>
        <Link className="text-muted" to="/">
          Contact Us
        </Link>
      </div> */}
    </div>
  );
};

export default LogIn;
