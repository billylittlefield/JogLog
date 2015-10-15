$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var hook = document.getElementById('content-hook');

  var routes = React.createElement(
    Route,
    { path: "/", component: App },
    React.createElement(IndexRoute, { component: Home }),
    React.createElement(Route, { path: "calendar", component: PersonalCalendar })
  );

  if (window.location.pathname !== "/session/new" && window.location.pathname !== "/users/new") {
    React.render(React.createElement(
      Router,
      null,
      routes
    ), hook);
  }
});