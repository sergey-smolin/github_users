import React from 'react'
import { get } from 'lodash';
import Repository from './Repository';

export default function RepositoryList ({ repoData, activeUser, history }) {
  return (
    <ul id="repositories-list">
      {
        repoData && get(repoData, 'user.repositories.edges') && repoData.user.repositories.edges.map(({ node }) =>
          <Repository key={node.id} activeUser={activeUser} history={history} node={node} />
      )}
    </ul>
  )
}
