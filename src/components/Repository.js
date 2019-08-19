import React from 'react'

export default function Repository({ history, activeUser, node }) {
  return (
    <li
      className="repository-list-item"
      onClick={() => history.push(`/user/${activeUser}/repositories/${node.name}/issues`)}
    >
      <div className="repository-name">
        {node.name}
      </div>
      <div className="repository-metadata">
        <div>{`${node.stargazers.totalCount} Stars`}</div>
        <div className="dot"></div>
        <div>{`${node.watchers.totalCount} Watching`}</div>
      </div>
    </li>
  )
}
