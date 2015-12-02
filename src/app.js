import React from 'react';
import Router from 'react-router';
import App from './components/App';
import Page from './components/Page';

const {Route} = Router; //gets the Route property from Router
/*<Route name='page' path='/page/:id' handler={Page} />*/
var routes = <Route handler={App}>
	<Route name='page' path='/page/:id' handler={Page} />
</Route>;

Router.run(routes, Router.HistoryLocation, Root =>
	React.render(<Root />, document.querySelector('#app') )
);
