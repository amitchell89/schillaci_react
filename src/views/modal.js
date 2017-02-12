import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { closeModal } from '../store/actions/ToggleModal'

function mapDispatchToProps(dispatch) {
  return {
    closeModal: (gallery, e) => {
      dispatch(closeModal())
      browserHistory.push('/gallery/' + gallery)
    }
  }
}

class Modal extends Component {

  render() {

    return (
      <div className="modal">
        <h2>Modal</h2>
      </div>
    )
  }
}

export default connect(mapDispatchToProps)(Modal);