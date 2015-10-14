$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var hook = document.getElementById('content-hook');

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="calendar" component={PersonalCalendar}/>
    </Route>
  );

  if (window.location.pathname !== "/session/new" &&
      window.location.pathname !== "/users/new") {
    React.render(<Router>{routes}</Router>, hook);
  }
});
