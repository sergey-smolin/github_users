import React from 'react';
import { Button, Modal } from 'reactstrap';
class SimpleModal extends React.Component {
  state = {
      issueTitle: '',
      issueDesctiption: '',
  }
  updateIssueTitle = ({ target }) => {
      this.setState({ issueTitle: target.value });
  }
  updateIssueDescription = ({ target }) => {
      this.setState({ issueDesctiption: target.value });
  }
  handleClose = () => {
      this.props.openModal(false);
  };
  openIssue = () => {
    this.props.openIssue(this.state.issueTitle, this.state.issueDesctiption)
  }

  render() {
    return (
      <Modal id="add-issue-modal" isOpen={this.props.open} toggle={this.handleClose} className={this.props.className}>
        <div>
          <h2>Create New Issue</h2>
          <input type="text" name="title" value={this.state.issueTitle} onChange={this.updateIssueTitle} placeholder="Title" />
          <br />
          <textarea name="description" rows="10" value={this.state.issueDesctiption} onChange={this.updateIssueDescription} placeholder="Description" />
          <div class="modal-button-container">
            <Button className="modal-button modal-cancel" onClick={this.handleClose}>Cancel</Button>{' '}
            <Button className="modal-button modal-action" onClick={this.openIssue}>Create</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SimpleModal;
