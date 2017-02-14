import React, {Component} from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../store/actions/ToggleModal'

function mapStateToProps(state) {
   return {
    modal: state.modal.display
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

class Modal extends Component {

  render() {

    return (
      <div>
        <h2>Modal Here</h2>
         <button onClick={this.props.closeModal}>Close Modal</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);