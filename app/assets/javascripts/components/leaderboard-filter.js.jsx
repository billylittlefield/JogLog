window.LeaderboardFilter = React.createClass({
  getInitialState: function() {
    return { gender: this.parseGender(window.CURRENT_USER_GENDER),
             activitiy: "Running",
             group: "All Users" };
  },
  activities: ["Running", "Biking", "Swiming", "Walking", "Hiking",
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
      <div className="filter-container">
        <div className="activity-filter">
          <CustomSelect choices={this.activities}
                        default="Running"
                        bubbleState={this.updateActivityState} />
        </div>
        <div className="gender-filter">
          <CustomSelect choices={this.genders}
                        default={this.parseGender(window.CURRENT_USER_GENDER)}
                        bubbleState={this.updateGenderState} />
        </div>
        <div className="group-filter">
          <CustomSelect choices={this.groups}
                        default="All Users"
                        bubbleState={this.updateGroupState} />
        </div>
      </div>
    );
  },
});
