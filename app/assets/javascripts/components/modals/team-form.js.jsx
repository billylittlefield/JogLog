var Modal = ReactBootstrap.Modal;
window.TeamForm = React.createClass({
  render: function() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
        Create New Team
        </Modal.Header>
        <p>YOOO</p>
      </Modal>
    );
  }
});
