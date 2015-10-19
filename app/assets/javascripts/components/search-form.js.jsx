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
  render: function() {
    return (
      <div className="navbar-search">
        <form className="navbar-form navbar-left" role="search">
            <input onInput={this.sendQuery}
                   type="text"
                   className="form-control search-input"
                   placeholder="Search..."/>
            <div className="results-list">
              <ul>
                {this.searchResults()}
              </ul>
            </div>
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
