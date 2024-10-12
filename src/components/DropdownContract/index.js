import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importar o JS necessário
import doc from "../../assets/icons/doc.svg";
import { Link, useLocation } from "react-router-dom";
import config from '../../config';

function DropdownCotract({enrollment, idResponsible}) {
  return (
    <div className="dropdown">
      <a
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={doc} />
      </a>
      <ul className="dropdown-menu">
        <li>
          <Link to="../integralContract" className="dropdown-item" state={{ id: enrollment ,  responsible: idResponsible }} >Contrato Integral</Link>
          <a className="dropdown-item" href={config.integralContract} target="_blank">
            Action
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropdownCotract;
