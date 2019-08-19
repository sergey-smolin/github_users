import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';
import Modal from './Modal';
import Loader from './Loader';
import { GET_ISSUES, OPEN_ISSUE } from '../queries/queries';
import IssueList from './IssueList';

const Issues = () => {
  const pathArray = window.location.pathname.split('/');
  const login = decodeURIComponent(pathArray[2]);
  const repository = decodeURIComponent(pathArray[pathArray.length - 2]);

  const { loading, error, data } = useQuery(GET_ISSUES, {
    variables: { repository, login }
  });

  const [openIssue, { loading: mutationLoading, error: mutationError }] = useMutation(OPEN_ISSUE);

  const [modalOpen, openModal] = useState(false);

  if (loading || mutationLoading) return <Loader />;
  if (error || mutationError) return `Error! ${error || mutationError}`;

  function openAnIssue (title, body) {
    openModal(false);
    openIssue({
      variables: {
        repositoryId: data.user.repository.id,
        title,
        body
      },
      refetchQueries: [{
        query: GET_ISSUES,
        variables: {
          repository,
          login
        }
      }]
    });
  }

  return (
    <>
      <Modal
        open={modalOpen}
        openModal={openModal}
        openIssue={openAnIssue}
      />
      {mutationError && <div>{mutationError}</div>}
      {mutationLoading && <div>Loading...</div>}
      {
        data && get(data, 'user.repository') &&
        <div id="repository-header-row">
          <div id="repository-title">{repository}</div>
          <div className="repository-metadata">
            <div>{`${data.user.repository.stargazers.totalCount} Stars`}</div>
            <div className="dot"></div>
            <div>{`${data.user.repository.watchers.totalCount} Watching`}</div>
          </div>
        </div>
      }
      <div id="issues-header-row">
        <div>Open Issues</div>
        <button id="create-issue-button" onClick={() => openModal(true)} >Create issue</button>
      </div>
      <IssueList data={data} />
    </>
  )
}

export default Issues;