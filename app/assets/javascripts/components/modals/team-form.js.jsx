var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
window.TeamForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      name: "",
    };
  },
  createTeam: function(e) {
    e.preventDefault();
    ApiUtil.createTeam(this.state);
    this.props.onHide();
  },
  render: function() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
        Create New Team
        </Modal.Header>
        <div className="team-form">
          <h1 className="team-form-name">Team Name: </h1>
          <input type="text" valueLink={this.linkState("name")}/>
        </div>
        <Modal.Footer>
          <div className="team-form-footer">
            <div tabIndex="0"
                 className="cancel-button"
                 onClick={this.props.onHide}>Cancel</div>
            <div tabIndex="0"
                 className="create-button"
                 onClick={this.createTeam}>Create Team</div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
});
