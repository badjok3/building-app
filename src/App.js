import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Buildings from './components/buildings/Buildings';
import Footer from './components/common/Footer';
import NotFound from './components/common/NotFound';

function App() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/buildings' component={Buildings} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    );
}

export default withRouter(App);