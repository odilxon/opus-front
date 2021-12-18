import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  ADDEventUrl,
  AdminChekUrl,
  GetUserDateClickUrl,
  globalURL,
  TaskEditUrl,
} from '../../service';
import { AiOutlineCheck, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { Button, Modal, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  HandleClickDateUser,
  HandleHistory,
} from '../../redux/actions/UserAction';
import { defaultStyles, FileIcon } from 'react-file-icon';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import LoaderPage from '../LoaderPage';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ReactPaginate from 'react-paginate';
const AllTasksToday = () => {
  const [clickHist, setClickHist] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [clickDesc, setClickDesc] = useState(false);
  const [descName, setDescName] = useState('');
  const [checkDesc, setCheckDesc] = useState(false);
  const [addFile, setaddFile] = useState(null);
  const [clickEdit, setClickEdit] = useState(false);
  const [selectValue, setSelectValue] = useState([]);
  const [editedName, setEditedName] = useState('');
  const [statuss, setStatuss] = useState(false);
  const [end, setEndTime] = useState('');
  const [loader, setLoader] = useState(false);
  // const [dataMyTable, setDataMyTable] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state);
  const { userAction } = userInfo;
  const { t } = useTranslation();

  const handleClickHist = (array) => {
    dispatch(HandleHistory(array));
    setClickHist(true);
  };

  const handleClickPlus = (id) => {
    setTaskId(id);
    setClickDesc(true);
  };

  const addDesc = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (descName.length < 1) {
      return toast.warning(t('modal.errName'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    var bodyFormData = new FormData();
    bodyFormData.append('task_id', taskId);
    bodyFormData.append('desc', descName);
    bodyFormData.append('status', checkDesc);
    if (addFile) {
      if (addFile.length < 10) {
        for (let i = 0; i < addFile.length; i++) {
          bodyFormData.append(`file${[]}`, addFile[i]);
        }
      } else {
        setLoader(false);
        return toast.warning('Fayllar keragidan ortib ketdi', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (
      localStorage.getItem('role') === 'adminClicked' ||
      localStorage.getItem('role') === 'admin'
    ) {
      await axios({
        method: 'post',
        url: ADDEventUrl,
        params: {
          date: localStorage.getItem('ckickedDate'),
          userId: localStorage.getItem('clickedUserId'),
        },
        data: bodyFormData,
        headers: {
          'x-access-token': localStorage.getItem('userToken'),
        },
      })
        .then((response) => {
          console.log(response.data);
          // dispatch(HandleClickDateUser(response.data));
          FetchDateInfos();
          setDescName('');
          setClickDesc(false);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.log('Err:', err);
          return toast.error(t('tasks.alerterr'), {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      await axios({
        method: 'post',
        url: ADDEventUrl,
        params: {
          date: localStorage.getItem('ckickedDate'),
        },
        data: bodyFormData,
        headers: {
          'x-access-token': localStorage.getItem('userToken'),
        },
      })
        .then((response) => {
          console.log(response.data);
          // dispatch(HandleClickDateUser(response.data));
          FetchDateInfos();
          setDescName('');
          setClickDesc(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log('Err:', err);
          setLoader(false);
          return toast.error(t('tasks.alerterr'), {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
    setaddFile([]);
    setLoader(false);
  };

  const converTime = (a) => {
    const date = new Date(a * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = '0' + date.getDay();

    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const formattedTime =
      day +
      '-' +
      month +
      '-' +
      year +
      ' | ' +
      hours +
      ':' +
      minutes.substr(-2) +
      ':' +
      seconds.substr(-2);
    return formattedTime;
  };

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const compareDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const todayDate = today.getDate();
    const lYear = parseFloat(localStorage.getItem('ckickedDate').slice(0, 4));
    const lMonth = parseFloat(localStorage.getItem('ckickedDate').slice(5, 8));
    const lDate = parseFloat(localStorage.getItem('ckickedDate').slice(8, 10));

    if (lYear > year) {
      return true;
    } else if (year === lYear) {
      if (lMonth > month) {
        return true;
      } else if (lMonth === month) {
        if (lDate >= todayDate) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  // const backCard = () => {
  //   localStorage.removeItem('clickedUserId');
  //   localStorage.setItem('role', 'admin');
  //   navigate('/admin');
  // };
  const FetchDateInfos = async () => {
    setLoader(true);
    await axios({
      method: 'get',
      url: GetUserDateClickUrl,
      params: {
        // userId: localStorage.getItem('myId'),
        // clicked: localStorage.getItem('clickedUserId'),
        allTasks: true,
      },

      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        const { data } = response;
        // console.log(data);
        dispatch(HandleClickDateUser(data));
        setLoader(false);
      })
      .catch((err) => {
        console.log('Err:', err);
      });

    setLoader(false);
  };

  const handleChack = async (id) => {
    setLoader(true);
    await axios({
      method: 'get',
      url: AdminChekUrl,
      params: {
        taskId: id,
      },

      headers: {
        'x-access-token': localStorage.getItem('userToken'),
      },
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        FetchDateInfos();
      })
      .catch((err) => {
        console.log('Err:', err);
      });

    setLoader(false);
  };

  const handleClickEdit = (id) => {
    setTaskId(id);
    setClickEdit(true);
    let thisTask = userAction.clickDate.filter((element) => element.id === id);
    setEditedName(thisTask[0].desc);
    setClickEdit(true);
    setEndTime(thisTask[0].end_date);
  };

  const editEvent = async (e) => {
    e.preventDefault();
    setLoader(true);
    var bodyFormData = new FormData();
    bodyFormData.append('desc', editedName);
    bodyFormData.append('end_date', end);
    bodyFormData.append('status', statuss);

    // if (addFile) {
    //   if (addFile.length < 10) {
    //     for (let i = 0; i < addFile.length; i++) {
    //       bodyFormData.append(`file${[]}`, addFile[i]);
    //     }
    //   } else {
    //     return toast.warning('Fayllar keragidan ortib ketdi', {
    //       position: 'bottom-right',
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    // }
    if (
      localStorage.getItem('role') === 'adminClicked' ||
      localStorage.getItem('role') === 'admin'
    ) {
      let users = [];
      // eslint-disable-next-line array-callback-return
      selectValue.map((e) => {
        users.push(e.value);
      });

      users.push(localStorage.getItem('clickedUserId'));
      users.forEach((e) => bodyFormData.append(`users${[]}`, e));
      await axios({
        method: 'post',
        params: {
          taskId: taskId,
        },
        url: TaskEditUrl,
        data: bodyFormData,
        headers: { 'x-access-token': localStorage.getItem('userToken') },
      })
        .then((response) => {
          console.log(response.data);
          setEditedName('');
          setEndTime('');
          setSelectValue([]);
          setClickEdit(false);
          FetchDateInfos();
          navigate('/taskUsers');
        })
        .catch((err) => {
          console.log('Err:', err);
          return toast.error(t('tasks.alertwarn'), {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      await axios({
        method: 'post',
        params: {
          taskId: taskId,
        },
        url: TaskEditUrl,
        data: bodyFormData,
        headers: { 'x-access-token': localStorage.getItem('userToken') },
      })
        .then((response) => {
          // dispatch(HandleClickDateUser(response.data));
          setEditedName('');
          setEndTime('');
          setSelectValue([]);
          setClickEdit(false);
          FetchDateInfos();
          navigate('/taskUsers');
        })
        .catch((err) => {
          console.log('Err:', err);
          return toast.error(t('tasks.alertwarn'), {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }

    setLoader(false);
  };

  const options = [];
  if (userAction.allUsers.length > 0) {
    userAction.allUsers
      .filter((e) => e.id !== localStorage.getItem('clickedUserId'))
      .map((e) => {
        const obj = {
          value: e.id,
          label: e.name,
        };
        options.push(obj);
      });
  }

  const MySelect = () => (
    <>
      <MultiSelect
        options={options}
        value={selectValue}
        onChange={setSelectValue}
        labelledBy="Foydalanuvchi tanlash"
        autoBlur={false}
      />
    </>
  );

  const handleChangePage = (data) => {
    console.log(data);
  };

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: '№',
  //       accessor: 'number',
  //     },
  //     {
  //       Header: 'Ijrochilar',
  //       accessor: 'ijrochi',
  //     },
  //     {
  //       Header: 'fayllar',
  //       accessor: 'fayl',
  //     },
  //     {
  //       Header: 'boshlanish sanasi',
  //       accessor: 'start',
  //     },
  //     {
  //       Header: 'tugash sanasi',
  //       accessor: 'end',
  //     },
  //     {
  //       Header: 'xolati',
  //       accessor: 'status',
  //     },
  //     {
  //       Header: 'Tarix',
  //       accessor: 'hist',
  //     },
  //     {
  //       Header: 'Holat qoshish',
  //       accessor: 'add',
  //     },
  //   ],
  //   []
  // );
  // let data = [];

  // console.log(userInfo);

  // console.log(userAction.clickDate);
  // console.log(dataMyTable);
  // const data = useMemo(() => myDataInf(), []);

  // console.log(dataMyTable);
  // const tableInstance = useTable({ columns, data: dataMyTable });
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   tableInstance;

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    FetchDateInfos();
    localStorage.setItem('compare', compareDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (userAction.clickDate) {
  //     if (userAction.clickDate.length > 0) {
  //       setDataMyTable([]);
  //       userAction.clickDate.map((e, i) => {
  //         let obj = {
  //           number: e.id,
  //           ijrochi: [
  //             e.users
  //               ? e.users.map((user, i) => (
  //                   <span key={i} className="badge bg-secondary">
  //                     {user}
  //                   </span>
  //                 ))
  //               : null,
  //           ],

  //           fayl: [
  //             e.attachments.length > 0 ? (
  //               e.attachments.map((e, i) => (
  //                 <a
  //                   key={i}
  //                   href={globalURL + e.path}
  //                   target="_blank"
  //                   download
  //                   rel="noreferrer"
  //                 >
  //                   <span title={e.key}>
  //                     <FileIcon extension={e.ext} {...defaultStyles[e.ext]} />
  //                   </span>
  //                 </a>
  //               ))
  //             ) : (
  //               <p>{t('tasks.fileNo')}</p>
  //             ),
  //           ],
  //           start: e.start_date,
  //           end: e.end_date,
  //           status: (
  //             <div
  //               className={
  //                 e.status === 2
  //                   ? 'badge bg-warning'
  //                   : e.status === 1
  //                   ? 'badge bg-danger text-white'
  //                   : e.status === 3
  //                   ? 'badge bg-info text-white'
  //                   : e.status === 4
  //                   ? 'badge bg-success text-white'
  //                   : 'badge bg-dark text-white'
  //               }
  //             >
  //               {e.status === 2
  //                 ? t('calendar.bjdti')
  //                 : e.status === 1
  //                 ? t('calendar.bjdm')
  //                 : e.status === 3
  //                 ? t('calendar.bjd')
  //                 : e.status === 4
  //                 ? t('calendar.tasdiq')
  //                 : e.status === 5
  //                 ? t('calendar.dead')
  //                 : t('calendar.no')}
  //             </div>
  //           ),
  //           hist: (
  //             <div className="history text-center ">
  //               {e.history.length > 0 ? (
  //                 <>
  //                   <button
  //                     onClick={() => handleClickHist(e.history)}
  //                     className="btn btn-link btn-hist"
  //                   >
  //                     {e.history[e.history.length - 1].desc}
  //                   </button>
  //                 </>
  //               ) : (
  //                 <p>{t('tasks.infoNo')}</p>
  //               )}
  //             </div>
  //           ),

  //           add: (
  //             <div className="text-center">
  //               <div className="row flex-md-wrap">
  //                 <div className="col-12 m-1">
  //                   <button
  //                     onClick={() => handleClickPlus(e.id)}
  //                     className="btn btn-outline-opus d-flex justify-content-between align-items-center mx-auto"
  //                   >
  //                     <AiOutlinePlus />
  //                   </button>
  //                 </div>
  //                 {localStorage.getItem('role') === 'admin' ||
  //                 localStorage.getItem('role') === 'adminClicked' ? (
  //                   <>
  //                     {e.status === 3 ? (
  //                       <div className="col-12 m-1">
  //                         <button
  //                           onClick={() => handleChack(e.id)}
  //                           className="btn btn-outline-opus d-flex justify-content-between align-items-center mx-auto"
  //                         >
  //                           <AiOutlineCheck />
  //                         </button>
  //                       </div>
  //                     ) : null}
  //                   </>
  //                 ) : null}
  //                 {localStorage.getItem('role') === 'admin' ||
  //                 localStorage.getItem('role') === 'adminClicked' ||
  //                 !e.isAdmin ? (
  //                   <>
  //                     <div className="col-12 m-1">
  //                       <button
  //                         onClick={() => handleClickEdit(e.id)}
  //                         className="btn btn-outline-opus d-flex justify-content-between align-items-center mx-auto"
  //                       >
  //                         <AiOutlineEdit />
  //                       </button>
  //                     </div>
  //                   </>
  //                 ) : null}
  //               </div>
  //             </div>
  //           ),
  //         };
  //         setDataMyTable((dataMyTable) => [...dataMyTable, { obj }]);
  //         // dispatch(AllInfosTaskCalendar(obj));
  //       });
  //       console.log(dataMyTable);
  //     }
  //   }
  // }, [userAction.clickDate]);
  return (
    <>
      <div className="container">
        <div className="bg-white shadow-sm mt-2 my-md-2 p-4 rounded">
          <div className="row align-items-center">
            <div className="col-md-6 text-start">
              <h1 className="pt-2 pb-4">{t('tasks.alltaskslist')}</h1>
            </div>

            <div className="col-md-6 text-end">{userAction.clickedDate}</div>
          </div>

          {userAction.clickDate.length > 0 ? (
            <>
              <Table className="borderT">
                <Thead>
                  <Tr>
                    <Th>№</Th>
                    <Th> {t('tasks.desc')}</Th>
                    <Th>{t('tasks.linked')}</Th>
                    <Th>{t('tasks.files')}</Th>
                    <Th>{t('tasks.start')}</Th>
                    <Th>{t('tasks.end')}</Th>
                    <Th>{t('tasks.status')}</Th>
                    <Th>{t('tasks.hist')}</Th>
                    <Th>{t('tasks.plus')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userAction.clickDate.map((e, i) => (
                    <Tr key={i}>
                      <Td className={e.isAdmin ? 'rib' : null}>{e.id}</Td>
                      <Td>{e.desc}</Td>
                      <Td>
                        {e.users
                          ? e.users.map((user, i) => (
                              <span
                                key={i}
                                className="badge badge-pill bg-secondary"
                              >
                                {user}
                              </span>
                            ))
                          : null}
                      </Td>
                      <Td>
                        <div className="iconDiv">
                          {e.attachments.length > 0 ? (
                            e.attachments.map((e, i) => (
                              <a
                                key={i}
                                href={globalURL + e.path}
                                target="_blank"
                                download
                                rel="noreferrer"
                              >
                                <span title={e.key}>
                                  <FileIcon
                                    extension={e.ext}
                                    {...defaultStyles[e.ext]}
                                  />
                                </span>
                              </a>
                            ))
                          ) : (
                            <p>{t('tasks.fileNo')}</p>
                          )}
                        </div>
                      </Td>

                      <Td>{e.start_date}</Td>
                      <Td>{e.end_date}</Td>
                      <Td className="sts">
                        {' '}
                        <div
                          className={
                            e.status === 2
                              ? 'badge bg-warning'
                              : e.status === 1
                              ? 'badge bg-danger text-white'
                              : e.status === 3
                              ? 'badge bg-info text-white'
                              : e.status === 4
                              ? 'badge bg-success text-white'
                              : 'badge bg-dark text-white'
                          }
                        >
                          {e.status === 2
                            ? t('calendar.bjdti')
                            : e.status === 1
                            ? t('calendar.bjdm')
                            : e.status === 3
                            ? t('calendar.bjd')
                            : e.status === 4
                            ? t('calendar.tasdiq')
                            : e.status === 5
                            ? t('calendar.dead')
                            : t('calendar.no')}
                        </div>
                      </Td>
                      <Td className="history text-center ">
                        {' '}
                        {e.history.length > 0 ? (
                          <>
                            <button
                              onClick={() => handleClickHist(e.history)}
                              className="btn btn-link btn-hist"
                            >
                              {e.history[e.history.length - 1].desc}
                            </button>
                          </>
                        ) : (
                          <p>{t('tasks.infoNo')}</p>
                        )}
                      </Td>
                      <Td className="text-center">
                        <div className="row flex-md-wrap">
                          <div className="col-12 m-1">
                            <button
                              onClick={() => handleClickPlus(e.id)}
                              className="btn btn-outline-opus d-flex justify-content-between align-items-center mx-auto"
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                          {localStorage.getItem('role') === 'admin' ||
                          localStorage.getItem('role') === 'adminClicked' ? (
                            <>
                              {e.status === 3 ? (
                                <div className="col-12 m-1">
                                  <button
                                    onClick={() => handleChack(e.id)}
                                    className="btn btn-outline-opus d-flex justify-content-between align-items-center mx-auto"
                                  >
                                    <AiOutlineCheck />
                                  </button>
                                </div>
                              ) : null}
                            </>
                          ) : null}
                          {localStorage.getItem('role') === 'admin' ||
                          localStorage.getItem('role') === 'adminClicked' ||
                          !e.isAdmin ? (
                            <>
                              <div className="col-12 m-1">
                                <button
                                  onClick={() => handleClickEdit(e.id)}
                                  className="btn btn-outline-opus d-flex justify-content-between align-items-center mx-auto"
                                >
                                  <AiOutlineEdit />
                                </button>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <br />
              <Pagination>{items}</Pagination>
              <br />
            </>
          ) : (
            <h2 className="text-center py-2 h4">{t('tasks.noGetInfo')}</h2>
          )}
        </div>
      </div>

      {/* Historyni  bosganda */}
      {userAction.clickedHistoryRedux.length > 0 ? (
        <Modal show={clickHist} onHide={() => setClickHist(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.hist')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table className="borderT">
              <Thead>
                <Tr>
                  <Th>№</Th>
                  <Th> {t('tasks.desc')}</Th>
                  <Th>{t('tasks.files')}</Th>
                  <Th>{t('modal.name')}</Th>
                  <Th>{t('modal.depart')}</Th>
                  <Th>{t('modal.time')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userAction.clickedHistoryRedux.map((e, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{e.desc}</Td>
                    <Td>
                      <div className="iconDiv">
                        {e.attachment.length > 0 ? (
                          e.attachment.map((e, i) => (
                            <a
                              key={i}
                              href={globalURL + e.path}
                              target="_blank"
                              download
                              rel="noreferrer"
                            >
                              <span title={e.key}>
                                <FileIcon
                                  extension={e.ext}
                                  {...defaultStyles[e.ext]}
                                />
                              </span>
                            </a>
                          ))
                        ) : (
                          <p>{t('tasks.fileNo')}</p>
                        )}
                      </div>
                    </Td>

                    <Td>{e.user_name}</Td>
                    <Td>{e.user_depart}</Td>
                    <Td>{converTime(e.timestamp)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Modal.Body>
        </Modal>
      ) : null}

      {/* plusni bosganda */}
      <Modal show={clickDesc} onHide={() => setClickDesc(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Plus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addDesc} className="p-3">
            <div className=" py-2 ">
              <label className="form-label  text-dark">
                {t('modal.addDesc')}
              </label>

              <input
                className="form-control form-control-lg form-control-solid "
                type="text"
                name="description"
                placeholder={t('modal.descName')}
                value={descName}
                onChange={(e) => setDescName(e.target.value)}
                required
              />
            </div>

            <div className=" py-2 ">
              <label className="form-label  text-dark">
                <input
                  type="checkbox"
                  checked={checkDesc}
                  onChange={() => setCheckDesc(!checkDesc)}
                />
                {'   '} {t('modal.checkBox')}
              </label>

              <div className="py-2">
                <label
                  className="addFile"
                  title={t('modal.fileAdd')}
                  htmlFor="pic"
                  onChange={(e) => setaddFile(e.target.files)}
                >
                  <input multiple id="file" type="file" name="file" />
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="sec"
            onClick={() => setClickDesc(false)}
          >
            {t('myacc.back')}
          </Button>
          <Button onClick={addDesc} variant="opus">
            {t('myacc.save')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit bosganda */}
      <Modal show={clickEdit} onHide={() => setClickEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.editEvent')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editEvent} className="p-3">
            <div className=" py-2 ">
              <label className="form-label  text-dark">{t('editTask')}</label>

              <input
                className="form-control form-control-lg form-control-solid "
                type="text"
                name="name"
                placeholder="edit task name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
              />
            </div>

            {localStorage.getItem('role') === 'adminClicked' ? (
              <div className=" py-2 ">
                <div>
                  <label className="form-label  text-dark">
                    {t('adduserTask')}
                  </label>
                </div>
                <MySelect />
              </div>
            ) : null}

            <div className=" d-flex align-items-center py-2 ">
              <label className="form-label  text-dark">
                <input
                  type="checkbox"
                  checked={statuss}
                  name="status"
                  onChange={(e) => setStatuss(!statuss)}
                />
                {'   '} {t('modal.checkBox')}
              </label>
            </div>

            <div className=" py-2 ">
              <label className="form-label  text-dark">{t('tasks.end')}</label>

              <input
                className="form-control form-control-lg form-control-solid "
                type="datetime-local"
                name="end_time"
                placeholder={t('modal.endplc')}
                value={end}
                onChange={(e) => setEndTime(e.target.value)}
                min={localStorage.getItem('ckickedDate')}
                required
              />
            </div>

            <div className="py-2">
              <label
                className="addFile"
                title={t('modal.fileAdd')}
                htmlFor="file"
                onChange={(e) => setaddFile(e.target.files)}
              >
                <input multiple id="file" type="file" name="file" />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="sec"
            onClick={() => setClickEdit(false)}
          >
            {t('myacc.back')}
          </Button>
          <Button onClick={editEvent} variant="opus">
            {t('myacc.save')}
          </Button>
        </Modal.Footer>
      </Modal>

      {loader ? <LoaderPage /> : null}
    </>
  );
};

export default AllTasksToday;
