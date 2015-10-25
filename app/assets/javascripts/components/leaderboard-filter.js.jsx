window.LeaderboardFilter = React.createClass({
  getInitialStat: function() {
    return { gender: this.props.gender,
             activitiy: "Running",
             group: "All Users" };
  },
  activities: ["Running", "Biking", "Swiming", "Walking", "Hiking",
               "Treadmill", "Exercise Bike", "Elliptical",
               "Nordic Skiing", "Rowing", "Rollerblading"],
  genders: ["Male", "Female", "All Users"],
  groups: ["Teammates", "Following", "All Users"],
  updateActivityState: function(activity) {
    this.setState({ activity: activity });
  },
  updateGenderState: function(gender) {
    this.setState({ gender: gender });
  },
  updateGroupState: function(group) {
    this.setState({ group: group });
  },
  parseGender: function(gender) {
    if (gender == "m") {
      return "Male";
    } else if (gender == "f") {
      return "Female";
    } else {
      return "All Users";
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
