import React, { useEffect, useState } from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import AccountImg from '../../assets/images/account.png';
import { FaTasks, FaCalendarCheck, FaUserClock } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import { GiAchievement } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GetUserInfoUrl, globalURL } from '../../service';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfosLogIn } from '../../redux/actions/UserAction';
import { useTranslation } from 'react-i18next';
import Today from './Today';
// import CheckedList from './CheckedList';
import LoaderPage from '../LoaderPage';

const MyProfil = () => {
  const [name, setName] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [picteruUser, setPictureUser] = useState('');
  const [tel, setTel] = useState('');
  const [editProfil, setEditProfil] = useState(false);
  const [rankAcc, setRankAcc] = useState('');
  const [loader, setLoader] = useState(false);

  // const [telNum, setTelNum] = useState('');
  // const [telNum2, setTelNum2] = useState('');

  const [inputList, setInputList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state);
  const { userAction } = userInfo;
  const { t } = useTranslation();

  // console.log(userAction);
  // if (userInfos.phone) {
  //   userInfos.phone.map((e) => {
  //     const obj = {
  //       tel: e,
  //     };
  //     console.log(obj);
  //   });
  // }

  const ChangeImage = async (e) => {
    setLoader(true);
    const file = e.target.files[0];
    var bodyFormData = new FormData();
    bodyFormData.append('image', file);
    await axios({
      method: 'post',
      url: GetUserInfoUrl,
      data: bodyFormData,
      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        console.log(response.data);
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
        // localStorage.setItem('userInfos', JSON.stringify(dataLocal));
        setLoader(false);
      })
      .catch((err) => {
        console.log('Err:', err);
        setLoader(false);
      });
    setLoader(false);
  };

  const submitEdit = async (e) => {
    setLoader(true);
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('department', tel);
    bodyFormData.append('rank', rankAcc);

    inputList.forEach((phone) =>
      bodyFormData.append(`phone${[]}`, `+998${phone.tel}`)
    );

    // bodyFormData.append(`phone${[]}`, [`+998${telNum}`, `+998${telNum2}`]);
    // console.log(telNum);
    if (!name || !tel) {
      setLoader(false);
      return toast.warning("Iltimos to'liq ma'lumot kiriting!", {
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
      url: GetUserInfoUrl,
      data: bodyFormData,
      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        console.log(response.data);
        setName('');
        setTel('');
        setRankAcc('');
        const { data } = response;
        // const dataLocal = {
        //   department: data.department,
        //   email: data.email,
        //   id: data.id,
        //   image: `${data.image ? globalURL + data.image : 'no'}`,
        //   name: data.name,
        //   rank: data.rank,
        //   role: data.role,
        //   completed: data.tasks.completed,
        //   pending: data.tasks.pending,
        // };
        // dispatch(UserInfosLogIn(dataLocal));
        setEditProfil(false);
        navigate('/myAccount');
        getUserInfo();
        setLoader(false);
        return toast.success('Amal bajarildi', {
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
        setLoader(false);
        return toast.error("Noto'g'ri", {
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

  const getUserInfo = async () => {
    setLoader(true);
    await axios({
      method: 'get',
      url: GetUserInfoUrl,
      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
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
          phone: data.phones,
        };
        // localStorage.setItem('userInfos', JSON.stringify(dataLocal));
        dispatch(UserInfosLogIn(dataLocal));
        localStorage.setItem('role', data.role);
        localStorage.setItem('myId', data.id);

        setName(data.name);
        setTel(data.department);
        setRankAcc(data.rank);
        console.log(data.phones);

        // function fb(lis, item) {
        //   return lis.push({ tel: item });
        // }
        setInputList([]);
        data.phones.map((e) =>
          setInputList((inputList) => [...inputList, { tel: e.slice(4, 15) }])
        );
        //setInputList([...inputList, { tel: '+998993286330' }]);
        //setInputList(data.phones);
        console.log(inputList);
        setLoader(false);
      })
      .catch((err) => {
        console.log('Err:', err);
        setLoader(false);
      });
    setLoader(false);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    console.log(value);
    console.log(index);
    list[index]['tel'] = value;
    console.log(list);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    if (inputList.length < 6) {
      setInputList([...inputList, { tel: '' }]);
    } else {
      console.log(inputList);
      return (
        toast.error("5 tadan ko'p raqam kiritb bo'lmaydi"),
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const backHandle = () => {
    setName('');
    setTel('');
    setEditProfil(false);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="userProfil bg-white rounded shadow-sm p-3 my-3">
        <div className="row">
          <div className="userInfo col-md-3">
            <img
              src={
                userAction.userInfos.image !== 'no'
                  ? userAction.userInfos.image
                  : AccountImg
              }
              alt="random"
              className="img-fluid rounded"
            />
          </div>
          <div className="infos col-md-9">
            <h1 className="h2">
              {userAction.userInfos.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z"
                  fill="#00A3FF"
                ></path>
                <path
                  className="permanent"
                  d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z"
                  fill="white"
                ></path>
              </svg>
            </h1>
            <p className="text-muted">
              {userAction.userInfos.department ? (
                <span>
                  <BiBuildings /> {userAction.userInfos.department}
                </span>
              ) : null}

              {userAction.userInfos.rank ? (
                <span>
                  <GiAchievement /> {userAction.userInfos.rank}
                </span>
              ) : null}

              {userAction.userInfos.email ? (
                <span>
                  <AiOutlineMail /> {userAction.userInfos.email}
                </span>
              ) : null}
            </p>
            <div className="row">
              <div className="col-md-4 col-lg-3">
                <div className="progres border  border-dashed rounded py-3 px-4  mb-3">
                  <div className="d-flex align-items-center ">
                    <FaTasks color="#0d6efd" />
                    <div className="fs-2 fw-bolder counted">
                      {userAction.userInfos.completed
                        ? userAction.userInfos.completed * 1 +
                          userAction.userInfos.pending * 1
                        : 0}
                    </div>
                  </div>
                  <p className="text-muted h5">{t('myacc.vazifa')}</p>
                </div>
              </div>

              <div className="col-md-4 col-lg-3">
                <div className="progres border  border-dashed rounded py-3 px-4  mb-3">
                  <div className="d-flex align-items-center ">
                    <FaCalendarCheck color="#50cd89" />
                    <div className="fs-2 fw-bolder counted">
                      {userAction.userInfos.completed}
                    </div>
                  </div>
                  <p className="text-muted h5">{t('myacc.bajaril')}</p>
                </div>
              </div>

              <div className="col-md-4 col-lg-3">
                <div className="progres border  border-dashed rounded py-3 px-4  mb-3">
                  <div className="d-flex align-items-center ">
                    <FaUserClock color="orange" />
                    <div className="fs-2 fw-bolder counted">
                      {userAction.userInfos.pending}
                    </div>
                  </div>
                  <p className="text-muted h5">{t('myacc.jarayonda')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {localStorage.getItem('role') !== 'admin' ? <Today /> : <CheckedList />} */}
      {localStorage.getItem('role') !== 'admin' ? <Today /> : null}

      <div className="profilDetails bg-white rounded shadow-sm py-3 my-3">
        <div className="card_header px-5 pt-2 pb-1">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 col-lg-4 text-center text-md-start">
              <h2 className="h3">{t('myacc.prdt')}</h2>
            </div>
            <div className="col-md-6 col-lg-4 text-center text-md-end">
              <button
                onClick={() => setEditProfil(!editProfil)}
                className="btn btn-opus"
              >
                {t('myacc.edt')}
              </button>
            </div>
          </div>
        </div>

        {editProfil ? (
          <>
            <hr />
            <div className="detail px-4">
              <form onSubmit={submitEdit}>
                <div className="row my-3 mt-lg-4">
                  <div className="col-lg-4  form-label">
                    <label htmlFor="pic"> {t('myacc.avt')}</label>
                  </div>
                  <div className="col-lg-8 image-input">
                    <div
                      className="image-wrapper"
                      style={{
                        backgroundImage: `url(${
                          userAction.userInfos.image !== 'no'
                            ? userAction.userInfos.image
                            : AccountImg
                        })`,
                      }}
                    >
                      <img
                        src={
                          userAction.userInfos.image !== 'no'
                            ? userAction.userInfos.image
                            : AccountImg
                        }
                        alt="Account"
                      />
                      <label
                        className="edit-icon icon-pic shadow"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="edit Image"
                        htmlFor="pic"
                        onChange={ChangeImage}
                      >
                        <MdOutlineModeEdit />
                        <input
                          id="pic"
                          type="file"
                          name="avatar"
                          accept=".png, .jpg, .jpeg"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4 form-label mt-lg-3">
                    <label htmlFor="name"> {t('myacc.fullName')}</label>
                  </div>
                  <div className="col-lg-8 image-input">
                    <div className="row mt-lg-3">
                      <div className=" my-2">
                        <input
                          className="form-control form-control-lg form-control-solid "
                          type="text"
                          name="name"
                          placeholder={t('myacc.nameplc')}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          id="name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 form-label mt-lg-3">
                    <label htmlFor="tel">{t('myacc.depart')}</label>
                  </div>
                  <div className="col-lg-8 image-input">
                    <div className="row mt-lg-3">
                      <div className=" my-2">
                        <input
                          className="form-control form-control-lg form-control-solid "
                          type="text"
                          name="department"
                          placeholder={t('myacc.departplc')}
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                          id="depart"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 form-label mt-lg-3">
                    <label htmlFor="tel">{t('myacc.rank')}</label>
                  </div>
                  <div className="col-lg-8 image-input">
                    <div className="row mt-lg-3">
                      <div className=" my-2">
                        <input
                          className="form-control form-control-lg form-control-solid "
                          type="text"
                          name="Rank"
                          placeholder={t('myacc.rankplc')}
                          value={rankAcc}
                          onChange={(e) => setRankAcc(e.target.value)}
                          id="ranc"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 form-label mt-lg-3">
                    <label className="form-label  text-dark">
                      {t('admin.tel')}
                    </label>
                  </div>

                  <div className="col-lg-8 image-input ">
                    <div className="elements px-2">
                      {inputList.length > 0
                        ? inputList.map((e, i) => (
                            <div key={i} className="row mt-lg-3">
                              <div className=" py-2 ">
                                <div className="row">
                                  <div className="col-4 col-md-3 px-1">
                                    <input
                                      className="form-control form-control-lg form-control-solid "
                                      type="text"
                                      name="tel"
                                      value={'+998'}
                                      aria-label="Disabled input"
                                      disabled={true}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-5 col-md-7 px-1">
                                    <input
                                      className="form-control form-control-lg form-control-solid "
                                      type="number"
                                      name="tel"
                                      placeholder={t('admin.telplc')}
                                      value={e.tel}
                                      data-ids={i}
                                      onChange={(e) => handleChange(e, i)}
                                      required
                                    />
                                  </div>
                                  <div className="col-2 col-md-2 text-center">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveClick(i)}
                                      className="btn outline btn-outline-opus "
                                    >
                                      <AiOutlineDelete />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>

                    <div className="col-12 text-end">
                      <button
                        type="button"
                        onClick={handleAddClick}
                        className="btn btn-opus my-2"
                      >
                        {t('admin.newNumber')}
                      </button>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="row my-3 mt-lg-4 align-items-center justify-content-end">
                  <div className="col-md-4 text-end">
                    <button
                      onClick={backHandle}
                      type="reset"
                      className="btn btn-account me-2"
                    >
                      {t('myacc.back')}
                    </button>
                    <button className="btn btn-opus"> {t('myacc.save')}</button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>

      <div className="profilDetails bg-white rounded shadow-sm py-3 my-3">
        <div className="detail px-4">
          <div className="row my-3 mt-lg-4 align-items-center justify-content-between">
            <div className="col-6 col-lg-5">
              <h3 className="h4">{t('myacc.pass')}</h3>
              <p className="text-muted"> {userAction.userInfos.email}</p>
            </div>
            <div className="col-md-6 col-lg-4 text-end">
              <Link to="/changePassword" className="btn btn-account">
                {t('myacc.passedit')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {loader ? <LoaderPage /> : null}
    </div>
  );
};

export default MyProfil;
