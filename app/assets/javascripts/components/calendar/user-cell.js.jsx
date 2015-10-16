window.UserCell = React.createClass({
  render: function() {
    return (
      <td className="day user-cell">
        <div>
          <a href={"#/users/" + this.props.user.id}>{this.props.user.username}</a>
        </div>
      </td>
    );
  }
});
