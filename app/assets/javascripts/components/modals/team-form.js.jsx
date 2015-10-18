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
        <form onSubmit={this.createTeam}>
          <h1 className="team-form-name">Team Name: </h1>
          <input type="text" valueLink={this.linkState("name")}/>
          <br/>
          <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button type="submit">Create Team</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});
