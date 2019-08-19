import React, { useState } from 'react';
import { withRouter, Route } from 'react-router-dom'
import Users from './components/Users';
import Issues from './components/Issues';
import Container from '@material-ui/core/Container';

const App = withRouter(({ history }) => {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <div id="search-wrapper">
        <input
          id="search-input"
          type="text"
          onChange={e => { setSearch(e.target.value) }}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              history.push(`/users/${search}`);
            }
          }}
          value={search}
          placeholder="Search users..."
        />
        <button id="search-button" onClick={() => history.push(`/users/${search}`)}>Search</button>
      </div>
      <Route path="/users/:search" component={Users} />
      <Route exact path="/user/:login/repositories/:repositoryName/issues" component={Issues} />
    </Container>
  );
});

export default App;