window.App = React.createClass({
  render: function() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        {this.props.children}
      </div>
    );
  }
});
