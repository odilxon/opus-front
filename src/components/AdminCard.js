import React from 'react';
import { Card } from 'react-bootstrap';
const AdminCard = (props) => {
  return (
    <Card className="p-3 tex-center card-admin my-2">
      <img
        className="img-fluid admin-pic rounded-circle img-thumbnail mt-3"
        src={props.pic}
        alt="pic"
      />

      <h3 className="h5 text-center mt-3">{props.title}</h3>
      <p className="text-muted text-center">{props.rank}</p>
    </Card>
  );
};

export default AdminCard;
