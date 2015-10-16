window.Home = React.createClass({
  render: function() {
    return (
      <div className="home-container">
        <div className="workout-feed">
          <p>WORKOUT FEED HERE</p>
        </div>
        <div className="workout-form-container">
          <WorkoutForm mode="new" workout={WorkoutConstants.BLANK_WORKOUT}/>
        </div>
        <div className="leaderboards">
          <p>LEADERBOARDS HERE</p>
        </div>
      </div>
    );
  }
});
