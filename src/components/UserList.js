import React from 'react';
import { get } from 'lodash';
import User from './User';

export default function UserList({ data, getRepositories }) {
  return (
    <ul id="user-list">
      {
        data && get(data, 'search.edges') &&
        data.search.edges
          .reduce((memo, user) => {
            if (user.node.__typename !== "Organization") {
              memo.push(<User key={user.node.id} user={user} getRepositories={getRepositories} />);
            }
            return memo;
          }, [])
      }
    </ul>
  )
}
