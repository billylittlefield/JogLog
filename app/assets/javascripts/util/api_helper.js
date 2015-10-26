window.ApiHelper = {
  parseGender: function(filters) {
    var parsedFilters = { activity: filters.activity, group: filters.group };
    if (filters.gender == "Male" || filters.gender == "m") {
      parsedFilters.gender = "m";
    } else if (filters.gender == "Female" || this.gender == "f") {
      parsedFilters.gender = "f";
    } else {
      parsedFilters.gender = "mf";
    }
    if (filters.group == "Users I'm Following") {
      parsedFilters.group = "Following";
    } else if (filters.group == "All Users") {
      parsedFilters.group = "All";
    }
    debugger;
    return parsedFilters;
  }
};
