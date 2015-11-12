window.SearchForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return { userSearchResults: [], teamSearchResults: [] };
  },
  componentWillMount: function() {
    UserStore.addSearchResultsChangeListener(this.updateSearchResults);
  },
  componentWillUnmount: function() {
    UserStore.removeSearchResultsChangeListener(this.updateSearchResults);
  },
  updateSearchResults: function() {
    this.setState({ userSearchResults: UserStore.userSearchResults(),
                    teamSearchResults: UserStore.teamSearchResults() });
  },
  sendQuery: function(e) {
    e.preventDefault();
    if ($(".search-input").val() === "") {
      $(".search-results-list").removeClass("active");
    } else {
      $(".search-results-list").addClass("active");
      var queryText = $(".search-input").val();
      ApiUtil.getSearchData(queryText);
    }
  },
  userSearchHeader: function() {
    if (this.state.userSearchResults.length > 0) {
      return (
        <li key="user-header" className="list-title">Users: </li>
      );
    }
  },
  userSearchResults: function() {
    if (this.state.userSearchResults.length > 0) {
      return _.map(this.state.userSearchResults, function(user) {
        return (
          <li className="search-result-item" key={"user" + user.id}>
            <a href={"#/users/" + user.id}>
              {user.username}
            </a>
          </li>
        );
      });
    }
  },
  teamSearchHeader: function() {
    if (this.state.teamSearchResults.length > 0) {
      return (
        <li key="team-header" className="list-title">Teams: </li>
      );
    }
  },
  teamSearchResults: function() {
    if (this.state.teamSearchResults.length > 0) {
      return _.map(this.state.teamSearchResults, function(team) {
        return (
          <li className="search-result-item" key={"team" + team.id}>
            <a href={"#/teams/" + team.id}>
              {team.name}
            </a>
          </li>
        );
      });
    }
  },
  noResults: function() {
    if (this.state.teamSearchResults.length === 0 &&
        this.state.userSearchResults.length === 0) {
      return (
        <li key="no-result" className="no-result">No results found</li>
      );
    }
  },
  render: function() {
    return (
      <div className="navbar-search">
        <form role="search">
          <input onInput={this.sendQuery}
                 type="text"
                 className="form-control search-input"
                 placeholder="Search for users/teams..."/>
        </form>
          <ul className="search-results-list">
            {this.userSearchHeader()}
            {this.userSearchResults()}
            {this.teamSearchHeader()}
            {this.teamSearchResults()}
            {this.noResults()}
          </ul>
      </div>
    );
  }
});
$(document).ready(function() {
  $(document).click(function(e){
    $(".search-results-list").removeClass("active");
    $(".search-input").val("");
  });
});
