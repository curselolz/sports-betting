import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './modal.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('root');

// modal wrapper
class Modal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        const { isOpen, children } = this.props;

        return isOpen ? ReactDOM.createPortal(
            <div className="modal-wrap">
                {children}
            </div>,
            this.el) : null;
    }
}

Modal.propTypes = {
    isOpen: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
};

export default Modal;
