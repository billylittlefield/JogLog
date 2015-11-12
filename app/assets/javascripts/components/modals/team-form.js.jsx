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
        <button onClick={this.props.onHide} className="close" aria-label="Close">
          <span aria-hidden="true" >×</span>
        </button>
        <div className="team-form">
          <div>Create a new team and tell your friends to join.<br/>
            Track everyone's calendar in one location.</div>
          <br/>
          <h1 className="team-form-name">Team Name: </h1>
          <input type="text" valueLink={this.linkState("name")}/>
          <br/>
          <br/>
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
