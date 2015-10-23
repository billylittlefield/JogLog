window.SearchForm = React.createClass({
  displayName: "SearchForm",

  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { userSearchResults: [], teamSearchResults: [] };
  },
  componentWillMount: function () {
    UserStore.addSearchResultsChangeListener(this.updateSearchResults);
  },
  componentWillUnmount: function () {
    UserStore.removeSearchResultsChangeListener(this.updateSearchResults);
  },
  updateSearchResults: function () {
    this.setState({ userSearchResults: UserStore.userSearchResults(),
      teamSearchResults: UserStore.teamSearchResults() });
  },
  sendQuery: function (e) {
    e.preventDefault();
    if ($(".search-input").val() === "") {
      $(".search-results-list").removeClass("active");
    } else {
      $(".search-results-list").addClass("active");
      var queryText = $(".search-input").val();
      ApiUtil.getSearchData(queryText);
    }
  },
  userSearchHeader: function () {
    if (this.state.userSearchResults.length > 0) {
      return React.createElement(
        "li",
        { key: "user-header", className: "list-title" },
        "Users: "
      );
    }
  },
  userSearchResults: function () {
    if (this.state.userSearchResults.length > 0) {
      return _.map(this.state.userSearchResults, function (user) {
        return React.createElement(
          "li",
          { className: "search-result-item", key: "user" + user.id },
          React.createElement(
            "a",
            { href: "#/users/" + user.id },
            user.username
          )
        );
      });
    }
  },
  teamSearchHeader: function () {
    if (this.state.teamSearchResults.length > 0) {
      return React.createElement(
        "li",
        { key: "team-header", className: "list-title" },
        "Teams: "
      );
    }
  },
  teamSearchResults: function () {
    if (this.state.teamSearchResults.length > 0) {
      return _.map(this.state.teamSearchResults, function (team) {
        return React.createElement(
          "li",
          { className: "search-result-item", key: "team" + team.id },
          React.createElement(
            "a",
            { href: "#/teams/" + team.id },
            team.name
          )
        );
      });
    }
  },
  noResults: function () {
    if (this.state.teamSearchResults.length === 0 && this.state.userSearchResults.length === 0) {
      return React.createElement(
        "li",
        { key: "no-result", className: "no-result" },
        "No results found"
      );
    }
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "navbar-search" },
      React.createElement(
        "form",
        { role: "search" },
        React.createElement("input", { onInput: this.sendQuery,
          type: "text",
          className: "form-control search-input",
          placeholder: "Search..." })
      ),
      React.createElement(
        "ul",
        { className: "search-results-list" },
        this.userSearchHeader(),
        this.userSearchResults(),
        this.teamSearchHeader(),
        this.teamSearchResults(),
        this.noResults()
      )
    );
  }
});
$(document).ready(function () {
  $(document).click(function (e) {
    $(".search-results-list").removeClass("active");
    $(".search-input").val("");
  });
});