window.Home = React.createClass({
  render: function() {
    return (
      <div>
        <div className="workout-feed">
        </div>
        <div className="workout-form">
          <WorkoutForm />
        </div>
        <div className="leaderboards">
        </div>
      </div>
    );
  }
});
