import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/client';
import { Cat } from './Cat';

const SUBSCRIBE_WEBCONF = gql`
  subscription MyQuery {
    websites {
        styles
        content
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
      <Cat catId={data.websites[0]?.content?.catId}/>
    </div>
  );
}

export default Container;
