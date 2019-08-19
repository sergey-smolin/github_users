import React from 'react'
import { get } from 'lodash';
import { calculateDateDifference } from '../utils/utils';

export default function IssueList({ data }) {
  return (
    <ul id="issues-list">
      {
        data && get(data, 'user.repository.issues.edges') &&
          data.user.repository.issues.edges.length ?
          data.user.repository.issues.edges.map(({ node }) => {
            var period = calculateDateDifference(node.createdAt);
            return <li className="issues-list-item" key={node.id}>
              <div className="issue-title">
                {node.title}
              </div>
              <div className="issue-metadata">
                <span>{`#${node.number} opened ${period} ago by ${node.author.login}`}</span>
              </div>
            </li>
          }) :
          <div className="mt-5">There are currently no issues for this repository.</div>
      }
    </ul>
  )
}
