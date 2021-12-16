import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'flag-icon-css/css/flag-icon.min.css';

const LabguageSite = () => {
  const { t, i18n } = useTranslation();

  // const [uzLang, setUzLang] = useState('uz');

  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }

  // console.log(US);
  return (
    <NavDropdown className="drdLang" title={t('lang')}>
      <NavDropdown.Item onClick={() => handleClick(`uz`)}>
        <span className={`flag-icon flag-icon-uz mx-2`}></span> Уз
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => handleClick(`ru`)}>
        <span className={`flag-icon flag-icon-ru mx-2`}></span> Ру
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LabguageSite;
