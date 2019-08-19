import React from 'react'
import { get } from 'lodash';

export default function User({ user, getRepositories }) {
  const totalRepos = get(user, 'node.repositories.totalCount');
  const totalStars = get(user, 'node.repositories.totalCount');
  return (
    <li className="user-box" key={user.node.id} onClick={() => getRepositories(user.node.login)} >
      <div className="user-overlay"></div>
      <div className="user-name">
        {user.node.name ? user.node.name : 'No name provided'}
      </div>
      <div className="repo-info">
        <div className="user-repo-count">
          {totalRepos && `${user.node.repositories.totalCount} Repositories`}
        </div>
        {(totalRepos || totalStars) && <div className="dot"></div>}
        <div className="user-star-count">
          {totalStars && `${user.node.starredRepositories.totalCount} Stars`}
        </div>
      </div>
    </li>
  )
}
