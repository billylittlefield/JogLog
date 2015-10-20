window.Home = React.createClass({
  render: function() {
    return (
      <div className="home-container">
        <div className="workout-feed-container">
          <WorkoutFeed />
        </div>
        <div className="workout-form-container">
          <WorkoutForm type="POST" workout={WorkoutConstants.BLANK_WORKOUT}/>
        </div>
        <div className="leaderboards">
          <p>Leaderboards here</p>
        </div>
      </div>
    );
  }
});
