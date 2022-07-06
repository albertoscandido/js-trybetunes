import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
    };
    this.loggingIn = this.loggingIn.bind(this);
  }

  loggingIn() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <BrowserRouter>
        <Routes isLoggedIn={ isLoggedIn } loggingIn={ this.loggingIn } />
      </BrowserRouter>
    );
  }
}

export default App;
