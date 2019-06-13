import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const OPEN_SIDEBAR_MUTATION = gql`
  mutation OpenSidebarMutation($contentType: String!, $side: String) {
    openSidebar(contentType: $contentType, side: $side) @client
  }
`;

type OpenSidebarVariables = {
  contentType: string;
  side?: 'left' | 'right';
};

export class OpenSidebarMutation extends Mutation<{}, OpenSidebarVariables> {
  static defaultProps = {
    mutation: OPEN_SIDEBAR_MUTATION
  };
}
