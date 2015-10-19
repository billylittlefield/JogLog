window.SearchForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return { searchResults: [] };
  },
  componentWillMount: function() {
    UserStore.addSearchResultsChangeListener(this.updateSearchResults);
  },
  componentWillUnmount: function() {
    UserStore.removeSearchResultsChangeListener(this.updateSearchResults);
  },
  updateSearchResults: function() {
    this.setState({ searchResults: UserStore.searchResults() });
  },
  sendQuery: function(e) {
    e.preventDefault();
    var queryText = $(".search-input").val();
    var searchGroup = $(".group-select").val();
    ApiUtil.getSearchData(queryText, searchGroup);
  },
  searchResults: function(e) {
    return _.map(this.state.searchResults, function(result) {
      var resultName = result.name || result.username;
      return (
        <li key={"result" + result.id}>
          <a href={"#/" + $(".group-select").val() + "/" + result.id}>
            {resultName}
          </a>
        </li>
      );
    }.bind(this));
  },
  show: function() {
    return this.state.searchResults.length === 0 ? " hide" : "";
  },
  render: function() {
    return (
      <div>
        <form className="navbar-form navbar-left navbar-search" role="search">
            <input onInput={this.sendQuery}
                   type="text"
                   className="form-control search-input"
                   placeholder="Search..."/>
              <ul className={"results-list" + this.show()}>
                {this.searchResults()}
              </ul>
            <select onChange={this.sendQuery}
                    className="form-control group-select">
              <option value="users">User</option>
              <option value="teams">Team</option>
            </select>
        </form>
      </div>
    );
  }
});
