window.WorkoutDetail = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },
  close: function() {
    this.setState({ showModal: false });
  },
  open: function() {
    this.setState({ showModal: true });
  },
  render: function() {
    return (<div className="workout-detail">THIS IS MY MODAL</div>);
  }
});
