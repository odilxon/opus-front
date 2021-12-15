/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import AccountImg from '../assets/images/account.png';
import Logo from '../assets/images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GetUserInfoUrl, globalURL } from '../service';
import { UserInfosLogIn } from '../redux/actions/UserAction';
import { useTranslation } from 'react-i18next';
import LabguageSite from './LabguageSite';

const Header = () => {
  const [click, setClick] = useState(false);
  const [clickHero, setClickHero] = useState(false);

  let location = useLocation();
  let path = location.pathname;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state);
  const { userAction } = userInfo;
  const signOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const getUserInfo = async () => {
    await axios({
      method: 'get',
      url: GetUserInfoUrl,
      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        const { data } = response;
        const dataLocal = {
          department: data.department,
          email: data.email,
          id: data.id,
          image: `${data.image ? globalURL + data.image : 'no'}`,
          name: data.name,
          rank: data.rank,
          role: data.role,
          completed: data.tasks.completed,
          pending: data.tasks.pending,
        };
        dispatch(UserInfosLogIn(dataLocal));
      })
      .catch((err) => {
        console.log('Err:', err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/');
    }
    setClickHero(false);
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {path !== '/' &&
      localStorage.getItem('userToken') &&
      path !== '/changePassword' ? (
        <nav className="navbar my-0 py-0">
          <div className="container-fluid py-2 d-flex  flex-lg-row justify-content-lg-between align-items-center justify-content-center bg-white">
            <div className="logo">
              <img src={Logo} alt="random" className="img-fluid" width="400" />
            </div>

            <ul
              onClick={() => setClick(false)}
              className={`menu d-flex list-unstyled ${click ? 'show' : null} `}
            >
              <li>
                <Link
                  className={
                    path === '/myAccount' ? `menu-link active` : 'menu-link'
                  }
                  to="/myAccount"
                >
                  {t('header.myProfil')}
                </Link>
              </li>
              <li>
                <Link
                  className={
                    path === '/calendar' ||
                    path === '/tasks' ||
                    path === '/taskUsers'
                      ? `menu-link active`
                      : 'menu-link'
                  }
                  to={
                    localStorage.getItem('role') === 'admin'
                      ? '/admin'
                      : '/calendar'
                  }
                >
                  {localStorage.getItem('role') === 'admin' ||
                  localStorage.getItem('role') === 'adminClicked'
                    ? t('header.project')
                    : t('calendar.title')}
                </Link>
              </li>

              <li>
                <Link
                  className={
                    path === '/alltasks' ? `menu-link active` : 'menu-link'
                  }
                  to="/alltasks"
                >
                  {t('header.alltask')}
                </Link>
              </li>
            </ul>

            <div className="languages ms-auto">
              <LabguageSite className="languageSite" />
              <div className="titleIcon">
                <span
                  className={`flag-icon flag-icon-${
                    t('lang') === 'Уз' ? 'uz' : 'ru'
                  } mx-2`}
                ></span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center ms-1 me-2">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setClickHero(false);
                }}
              >
                <div
                  onClick={() => setClickHero(true)}
                  className="person d-flex align-items-center mx-1 mx-lg-3"
                >
                  <img
                    src={
                      userAction.userInfos.image !== 'no'
                        ? userAction.userInfos.image
                        : AccountImg
                    }
                    alt="person"
                    className="header-account-pic"
                  />

                  <ul
                    className={`${
                      clickHero ? 'open' : null
                    } list-unstyled option shadow-sm rounded `}
                  >
                    <li>
                      <div className="item">
                        <div className="row p-3 pb-2">
                          <div className="col-3 d-flex align-items-center justify-content-evenly ">
                            <img
                              src={
                                userAction.userInfos.image !== 'no'
                                  ? userAction.userInfos.image
                                  : AccountImg
                              }
                              alt="person"
                              className="header-account-pic"
                            />
                          </div>
                          <div className="col-9">
                            <p className="h5 mb-0">
                              {userAction.userInfos.name}
                            </p>
                            <p className="text-muted mb-0">
                              {userAction.userInfos.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </li>
                    <li className="p-2 px-4">
                      <Link to="/myAccount">{t('header.myProfil')}</Link>
                    </li>
                    <li className="p-2 px-4">
                      <Link
                        to={
                          localStorage.getItem('role') === 'admin' ||
                          localStorage.getItem('role') === 'adminClicked'
                            ? '/admin'
                            : '/calendar'
                        }
                      >
                        {localStorage.getItem('role') === 'admin' ||
                        localStorage.getItem('role') === 'adminClicked'
                          ? t('header.project')
                          : t('calendar.title')}
                      </Link>
                    </li>
                    <li className="p-2 px-4 pb-3">
                      <a onClick={signOut}>{t('header.exit')}</a>
                    </li>
                  </ul>
                </div>
              </OutsideClickHandler>
            </div>

            <button onClick={() => setClick(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z"
                  fill="black"
                ></path>
                <path
                  opacity="0.3"
                  d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z"
                  fill="black"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Header;
