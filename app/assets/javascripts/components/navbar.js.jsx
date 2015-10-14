window.Navbar = React.createClass({
  handleLogout: function () {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location = "/";
      }
    });
  },
  render: function () {
    return (
      <nav className="navbar navbar-custom">
        <ul className="nav navbar-nav navbar-left left-list">
          <li className="logo">JoggerLogger</li>
          <li><a href="#/">Home</a></li>
          <li><a href="#/calendar">Calendar</a></li>
          <li className="doprdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown"
            role="button" aria-haspopup="true" aria-expanded="false">
              Teams
            </a>
            <ul className="dropdown-menu">
              <li><a href="#">Sample Team 1</a></li>
              <li><a href="#">Sample Team 2</a></li>
              <li><a href="#">Sample Team 3</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">Create New Team</a></li>
            </ul>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right right-list">
          <li><a href="#">{window.CURRENT_USERNAME}</a></li>
          <li onClick={this.handleLogout}><a href="#">Logout</a></li>
        </ul>
      </nav>
    );
  }
});
