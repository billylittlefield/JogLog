window.LeaderboardFilter = React.createClass({
  getInitialState: function() {
    return { gender: this.parseGender(window.CURRENT_USER_GENDER),
             activity: "Running",
             group: "All Users" };
  },
  activities: ["Running", "Biking", "Swimming", "Walking", "Hiking",
               "Treadmill", "Exercise Bike", "Elliptical",
               "Nordic Skiing", "Rowing", "Rollerblading"],
  genders: ["Male", "Female", "All"],
  groups: ["Teammates", "Users I'm Following", "All Users"],
  updateActivityState: function(activity) {
    this.setState({ activity: activity }, function() {
      ApiUtil.getLeaderboards(this.state);
    });
  },
  updateGenderState: function(gender) {
    this.setState({ gender: gender }, function() {
      ApiUtil.getLeaderboards(this.state);
    });
  },
  updateGroupState: function(group) {
    this.setState({ group: group }, function() {
      ApiUtil.getLeaderboards(this.state);
    });
  },
  parseGender: function(gender) {
    if (gender == "m") {
      return "Male";
    } else if (gender == "f") {
      return "Female";
    } else {
      return "All";
    }
  },
  render: function() {
    return (
      <div className="filter-container group">
        <div className="activity-filter filter">
          <div className="filter-label">Activity</div>
          <CustomSelect id="leaderboard-activity"
                        choices={this.activities}
                        default="Running"
                        bubbleState={this.updateActivityState} />
        </div>
        <div className="gender-filter filter">
          <div className="filter-label">Gender</div>
          <CustomSelect id="leaderboard-gender"
                        choices={this.genders}
                        default={this.parseGender(window.CURRENT_USER_GENDER)}
                        bubbleState={this.updateGenderState} />
        </div>
        <div className="group-filter filter">
          <div className="filter-label">User Group</div>
          <CustomSelect id="leaderboard-group"
                        choices={this.groups}
                        default="All Users"
                        bubbleState={this.updateGroupState} />
        </div>
      </div>
    );
  },
});
