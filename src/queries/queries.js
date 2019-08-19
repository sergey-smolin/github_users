import gql from 'graphql-tag';

export const GET_ISSUES = gql`
  query ($login:String!, $repository:String!) {
    user(login: $login) {
      repository(name: $repository) {
        id
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
        issues(first: 50, states: OPEN) {
          edges {
            node {
              id
              number
              title
              createdAt
              author {
                login
              }
            }
          }
        }
      }
    }
  }`;

export const OPEN_ISSUE = gql`
    mutation CreateIssue($repositoryId:ID!, $title:String!, $body:String) {
      createIssue (input: {repositoryId: $repositoryId, title: $title, body: $body}) {
        clientMutationId
      }
    }
  `;

export const GET_USERS = gql`
  query($search: String!) {
    search(type: USER, query: $search, first: 50) {
      edges {
        node {
          ... on User {
            login
            name
            id
            repositories {
              totalCount
            }
            starredRepositories {
              totalCount
            }
          }
        }
      }
    }
  }`

export const GET_REPOSITORIES = gql`
  query ($login:String!) {
    user(login: $login) {
      repositories(first: 50) {
        edges {
          node {
            name
            id
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
          }
        }
      }
    }
  }`