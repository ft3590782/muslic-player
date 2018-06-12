import React from 'react';
import ReactLoading from 'react-loading';
import Modal from './Modal';
const loading = ({ type, color, isShow }) => (
  <Modal portalId="body" isShow={isShow}>
    <ReactLoading type="type" color={color} />
  </Modal>
);

export default loading;
