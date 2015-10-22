$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var hook = document.getElementById('content-hook');

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="calendar" component={PersonalCalendar}/>
      <Route path="teams/:teamid" component={TeamCalendar}/>
      <Route path="users/:userid" component={PersonalCalendar}/>
    </Route>
  );

  var path = window.location.pathname;
  if (path !== "/session" && path !== "/session/new" &&
      path !== "/users"   && path !== "/users/new") {
    React.render(<Router>{routes}</Router>, hook);
  }
});
