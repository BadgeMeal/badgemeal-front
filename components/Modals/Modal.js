import React from 'react';
import './Modal.css';
import UploadImage from '../UploadImage/Upload';

const Modal = (props) => {
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <UploadImage></UploadImage>
          {/* <main>{props.children}</main> */}
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
