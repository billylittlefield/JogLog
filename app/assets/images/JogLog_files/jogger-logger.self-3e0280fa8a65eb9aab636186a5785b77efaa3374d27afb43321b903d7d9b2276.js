$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var hook = document.getElementById('content-hook');

  var routes = React.createElement(
    Route,
    { path: "/", component: App },
    React.createElement(IndexRoute, { component: Home }),
    React.createElement(Route, { path: "calendar", component: PersonalCalendar }),
    React.createElement(Route, { path: "teams/:teamid", component: TeamCalendar }),
    React.createElement(Route, { path: "users/:userid", component: PersonalCalendar })
  );

  var path = window.location.pathname;
  if (path !== "/session" && path !== "/session/new" && path !== "/users" && path !== "/users/new") {
    React.render(React.createElement(
      Router,
      null,
      routes
    ), hook);
  }
});