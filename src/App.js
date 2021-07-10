import { Route, Switch, Router } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import CalenderContainer from './CalenderContainer';

const App = (props) => {
  return(
    <Switch>
      <Route path="/year/:year/month/:month" component={CalenderContainer} />
      <Route path="/" exact component={HomeContainer} />
    </Switch>
  )
}

export default App;