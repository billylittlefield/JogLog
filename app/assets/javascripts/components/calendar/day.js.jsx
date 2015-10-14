window.Day = React.createClass({
  monthClass: function() {
    var klass = "day";
    if (this.props.displayMonth === this.props.date.month()) {
      klass += " current-month";
    } else {
      klass += " neighbor-month";
    }
    return klass;
  },
  render: function() {
    return (
      <div className={this.monthClass()}>
        {this.props.date.format("MM-DD-YYYY")}
      </div>
    );
  }
});
