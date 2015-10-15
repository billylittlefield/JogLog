window.Navbar = React.createClass({
  displayName: "Navbar",

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
    return React.createElement(
      "nav",
      { className: "navbar navbar-custom" },
      React.createElement(
        "ul",
        { className: "nav navbar-nav navbar-left left-list" },
        React.createElement(
          "li",
          { className: "logo" },
          "JoggerLogger"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#/" },
            "Home"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#/calendar" },
            "Calendar"
          )
        ),
        React.createElement(
          "li",
          { className: "doprdown" },
          React.createElement(
            "a",
            { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown",
              role: "button", "aria-haspopup": "true", "aria-expanded": "false" },
            "Teams"
          ),
          React.createElement(
            "ul",
            { className: "dropdown-menu" },
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "#" },
                "Sample Team 1"
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "#" },
                "Sample Team 2"
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "#" },
                "Sample Team 3"
              )
            ),
            React.createElement("li", { role: "separator", className: "divider" }),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "#" },
                "Create New Team"
              )
            )
          )
        )
      ),
      React.createElement(
        "ul",
        { className: "nav navbar-nav navbar-right right-list" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#" },
            window.CURRENT_USERNAME
          )
        ),
        React.createElement(
          "li",
          { onClick: this.handleLogout },
          React.createElement(
            "a",
            { href: "#" },
            "Logout"
          )
        )
      )
    );
  }
});