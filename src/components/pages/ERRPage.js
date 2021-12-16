import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ERRPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h1 className="mt-3 text-center">{t('noPage')}</h1>
    </Container>
  );
};

export default ERRPage;
