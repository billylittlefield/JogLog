$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var hook = document.getElementById('content-hook');

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>
  );

  React.render(<Router>{routes}</Router>, hook);
});
