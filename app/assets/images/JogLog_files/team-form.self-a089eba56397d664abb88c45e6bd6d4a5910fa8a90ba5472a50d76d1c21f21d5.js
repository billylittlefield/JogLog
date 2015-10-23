var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
window.TeamForm = React.createClass({
  displayName: "TeamForm",

  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      name: ""
    };
  },
  createTeam: function (e) {
    e.preventDefault();
    ApiUtil.createTeam(this.state);
    this.props.onHide();
  },
  render: function () {
    return React.createElement(
      Modal,
      { show: this.props.show, onHide: this.props.onHide },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        "Create New Team"
      ),
      React.createElement(
        "form",
        { onSubmit: this.createTeam },
        React.createElement(
          "h1",
          { className: "team-form-name" },
          "Team Name: "
        ),
        React.createElement("input", { type: "text", valueLink: this.linkState("name") }),
        React.createElement("br", null),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.props.onHide },
            "Cancel"
          ),
          React.createElement(
            Button,
            { type: "submit" },
            "Create Team"
          )
        )
      )
    );
  }
});