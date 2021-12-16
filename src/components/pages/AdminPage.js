import React, { useEffect, useState } from 'react';
import AdminCard from '../AdminCard';
import { useNavigate } from 'react-router-dom';
import AccountImg from '../../assets/images/account.png';
import { Container, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { HandleAllUsers } from '../../redux/actions/UserAction';
import { AllUSerUrl, globalURL, UserAddUrl } from '../../service';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import LoaderPage from '../LoaderPage';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deport, setDeport] = useState('');
  const [rank, setRank] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [telNum, setTelNum] = useState('');
  const [inputList, setInputList] = useState([{ tel: '' }]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state);
  const { userAction } = userInfo;

  const clickedCard = (id) => {
    localStorage.setItem('clickedUserId', id);
    localStorage.setItem('role', 'adminClicked');
    navigate('/calendar');
  };

  const addUser = async (e) => {
    setLoader(true);
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('role', 'user');
    bodyFormData.append('department', deport);
    bodyFormData.append('rank', rank);
    bodyFormData.append('password', password);
    inputList.forEach((phone) =>
      bodyFormData.append(`phone${[]}`, `+998${phone.tel}`)
    );
    await axios({
      method: 'post',
      url: UserAddUrl,
      data: bodyFormData,
      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        setName('');
        setPassword('');
        setRank('');
        setEmail('');
        setDeport('');
        setCheckPass('');
        setShowModal(false);
        getAllUser();
      })
      .catch((err) => {
        console.log('Err:', err);
      });
    setLoader(false);
  };

  const back = () => {
    setName('');
    setPassword('');
    setRank('');
    // setRole('');
    setEmail('');
    setDeport('');
    setCheckPass('');
    setShowModal(false);
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

  const handleRemoveClick = (index) => {
    setLoader(true);
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setLoader(false);
  };

  const handleChange = (e, index) => {
    setLoader(true);

    const { value } = e.target;
    const list = [...inputList];
    console.log(value);
    console.log(index);
    list[index]['tel'] = value;
    console.log(list);
    setInputList(list);
    setLoader(false);
  };

  const getAllUser = async () => {
    setLoader(true);

    await axios({
      method: 'get',
      url: AllUSerUrl,
      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        dispatch(HandleAllUsers(data));
      })
      .catch((err) => {
        console.log('Err:', err);
      });

    setLoader(false);
  };

  useEffect(() => {
    getAllUser();

    if (localStorage.getItem('role') !== 'admin') {
      navigate('/calendar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className="bg-white rounded shadow-sm p-3 p-md-4 my-3">
        <div className="row">
          <div className="col-md-7">
            <h2>{t('admin.title')}</h2>
          </div>
          <div className="col-md-5 py-1 text-end">
            <button
              onClick={() => {
                setShowModal(!showModal);
              }}
              className="btn btn-opus"
            >
              {t('admin.addUser')}
            </button>
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title> {t('admin.addUser')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={addUser} className="p-3">
              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  {t('admin.email')}
                </label>

                <input
                  className="form-control form-control-lg form-control-solid "
                  type="email"
                  name="email"
                  placeholder={t('admin.emailplc')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  {t('admin.name')}
                </label>

                <input
                  className="form-control form-control-lg form-control-solid "
                  type="text"
                  name="name"
                  placeholder={t('admin.nameplc')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  {t('admin.depart')}
                </label>

                <input
                  className="form-control form-control-lg form-control-solid "
                  type="text"
                  name="depart"
                  placeholder={t('admin.departplc')}
                  value={deport}
                  onChange={(e) => setDeport(e.target.value)}
                  required
                />
              </div>
              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  {t('admin.rank')}
                </label>

                <input
                  className="form-control form-control-lg form-control-solid "
                  type="text"
                  name="Rank"
                  placeholder={t('admin.rankplc')}
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  required
                />
              </div>
              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  {t('admin.tel')}
                </label>
                <div className="row">
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
                                <div className="col-4 col-md-7 px-1">
                                  <input
                                    className="form-control form-control-lg form-control-solid "
                                    type="number"
                                    name="tel"
                                    placeholder={e.tel}
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

                    {/* <div className="row mt-lg-3">
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
                            <div className="col-8 col-md-9 px-1">
                              <input
                                className="form-control form-control-lg form-control-solid "
                                type="number"
                                name="tel"
                                placeholder={t('admin.telplc')}
                                value={telNum2}
                                onChange={(e) => setTelNum2(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                  </div>

                  <div className="col-12 text-end">
                    <button
                      type="button"
                      onClick={handleAddClick}
                      className="btn btn-opus my-2"
                    >
                      yangi raqam
                    </button>
                  </div>
                  {/* <div className="col-4 col-md-3 px-1">
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
                  <div className="col-8 col-md-9 px-1">
                    <input
                      className="form-control form-control-lg form-control-solid "
                      type="number"
                      name="tel"
                      placeholder={t('admin.telplc')}
                      value={telNum}
                      onChange={(e) => setTelNum(e.target.value)}
                      required
                    />
                  </div> */}
                </div>
              </div>

              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  {t('chpass.npass')}
                </label>

                <input
                  className="form-control form-control-lg form-control-solid "
                  type={checkPass ? 'text' : 'password'}
                  name="password"
                  placeholder={t('chpass.npassplc')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className=" py-2 ">
                <label className="form-label  text-dark">
                  <input
                    type="checkbox"
                    checked={checkPass}
                    onChange={() => setCheckPass(!checkPass)}
                  />
                  {'   '} {t('chpass.checkpass')}
                </label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="sec" onClick={back}>
              {t('tasks.back')}
            </Button>
            <Button onClick={addUser} variant="opus">
              {t('admin.save')}
            </Button>
          </Modal.Footer>
        </Modal>
        <hr />
        {userAction.allUsers.length > 0 ? (
          <div className="row">
            {userAction.allUsers.map((e, i) => (
              <div
                onClick={() => clickedCard(e.id)}
                key={i}
                className="col-md-6 col-lg-4 col-xl-3"
              >
                <AdminCard
                  pic={
                    e.image && e.image !== 'no'
                      ? globalURL + e.image
                      : AccountImg
                  }
                  title={e.name}
                  rank={e.department}
                />
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center">{t('admin.user')}</h2>
        )}
      </div>
      {loader ? <LoaderPage /> : null}
    </Container>
  );
};

export default AdminPage;
