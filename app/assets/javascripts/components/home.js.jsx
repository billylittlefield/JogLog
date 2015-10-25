window.Home = React.createClass({
  render: function() {
    return (
      <div className="home-container">
        <div className="left-container">
          <div className="workout-feed-container">
            <WorkoutFeed />
          </div>
        </div>
        <div className="right-container">
          <div className="workout-form-container">
            <WorkoutForm type="POST" workout={WorkoutConstants.BLANK_WORKOUT}/>
          </div>
          <div className="leaderboards-container">
            <Leaderboard />
          </div>
        </div>
        <div className="footer">
          <div>Icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
        </div>
      </div>
    );
  }
});
