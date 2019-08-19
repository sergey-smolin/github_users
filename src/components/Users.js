import React, { useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom'
import Loader from './Loader';
import RepositoryList from './RepositoryList';
import UserList from './UserList';
import { GET_USERS, GET_REPOSITORIES } from '../queries/queries';

const Users = withRouter(({ history }) => {

  const pathArray = window.location.pathname.split('/');
  const search = decodeURIComponent(pathArray[pathArray.length - 1]);

  const [activeUser, setActiveUser] = useState(null);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { search }
  });

  const [getRepositories, { loading: repoLoading, error: repoError, data: repoData }] = useLazyQuery(GET_REPOSITORIES);


  const loaderEl = (loading || repoLoading) ? <Loader /> : null;
  const errorEl = (error || repoError) && <div>{error || repoError}</div>;

  const getRepositoriesCb = (login) => {
    setActiveUser(login);
    getRepositories({ variables: { login } });
  }

  return (
    <div>
      {loaderEl}
      {errorEl}
      {data && <h2>Users</h2>}
      <UserList getRepositories={getRepositoriesCb} data={data} />
      {repoData && <h2>User repositories</h2>}
      <RepositoryList activeUser={activeUser} history={history} repoData={repoData} />
    </div>
  )
})

export default Users;