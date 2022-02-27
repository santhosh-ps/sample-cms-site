import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/client';

const SUBSCRIBE_WEBCONF = gql`
  subscription MyQuery {
    websites {
        styles
    }
  }
`;

function Container() {
  const { loading, error, data } = useSubscription(SUBSCRIBE_WEBCONF);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error || !data.websites.length) return <p>Error!(</p>;
  return (
    <div style={{ ...(data.websites[0]?.styles || {})}}>
      <h1> The Sample Container</h1>
    </div>
  );
}

export default Container;
