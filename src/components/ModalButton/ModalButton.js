import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../store/actions/ToggleModal'

function mapStateToProps(state) {
   return {
    modal: state.modal.display
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => {
      dispatch(openModal())
    }
  }
}

class ModalButton extends Component {
  render() {

    return (
      <div>
        <button onClick={this.props.openModal}>Open Modal</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalButton);