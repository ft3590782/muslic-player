import React from 'react';
import ReactDOM from 'react-dom';

let modalRoot = null;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    let el = document.createElement('div');
    el.className = 'modal-wrap';
    this.el = el;
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    modalRoot = document.querySelector(this.props.portalId);

    if (modalRoot) {
      // is inserted in the DOM tree.
      modalRoot.appendChild(this.el);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(`modal componentWillReceiveProps ${nextProps.isShow}`);

    if (nextProps.isShow) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

Modal.defaultProps = {
  isShow: false
};

export default Modal;
