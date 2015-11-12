window.CustomSelect = React.createClass({
  getInitialState: function() {
    return { choice: this.props.default,
             showList: false };
  },
  componentWillMount: function() {
    UserStore.addDropdownCloseListener(this.close);
  },
  componentWillUnmount: function() {
    UserStore.removeDropdownCloseListener(this.close);
  },
  close: function() {
    this.setState({ showList: false });
  },
  toggleList: function() {
    if (this.state.showList) {
      $("#" + this.props.id + " div:first-child").removeClass("dropdown-expanded");
    } else {
      $(".dropdown-expanded").removeClass("dropdown-expanded");
      UserStore.closeDropdowns();
      $("#" + this.props.id + " div:first-child").addClass("dropdown-expanded");
    }
    this.setState({ showList: !this.state.showList });
  },
  changeSelected: function(e) {
    var newChoice = e.target.textContent;
    this.setState({ choice: newChoice });
    this.props.bubbleState(newChoice);
  },
  renderList: function() {
    if (this.state.showList) {
      var currentChoice = this.state.choice;
      return (
        <ul className="choice-list">
          {_.map(this.props.choices, function(choice) {
            if (choice === currentChoice) {
              return (<li key={"choice-select_"+choice}
                          onClick={this.changeSelected}
                          className="choice-item">
                        <span className="glyphicon glyphicon-ok"></span>
                        {choice}
                      </li>);
            } else {
              return (<li key={"choice-select_"+choice}
                          onClick={this.changeSelected}
                          className="choice-item">{choice}</li>);
            }
          }.bind(this))}
        </ul>
      );
    } else {
      return;
    }
  },
  render: function() {
    return (
      <div id={this.props.id}
           onClick={this.toggleList}
           className="choice-select-container">
        <div className="choice-select workout-input no-selection">
          {this.state.choice}
          <span className="glyphicon glyphicon-chevron-down"></span>
        </div>
        {this.renderList()}
      </div>
    );
  }
});
$(document).ready(function() {
  $(document).click(function(e){
    if ($(e.target).parents(".choice-select-container").length === 0) {
      UserStore.closeDropdowns();
      $(".dropdown-expanded").removeClass("dropdown-expanded");
    }
  });
});
