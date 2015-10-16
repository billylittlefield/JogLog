$.fn.editable.defaults.mode = 'inline';
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
          <a href="#" id="username" data-type="text" data-pk="1" data-url="/post" data-title="Enter username">superuser</a>
        </div>
      </div>
    );
  }
});
