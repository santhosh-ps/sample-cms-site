import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "@apollo/client";
import { Cat } from "./Cat";

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
  if (loading) return <p>Loading...</p>;
  if (error || !data.websites.length) return <p>Error!(</p>;
  return (
    <div style={{ ...(data.websites[0]?.styles || {}) }}>
      <h1>
        <a
          href="https://letsprogramit.com/posts/actions-on-google/#demo-after-the-build"
          target="_blank"
          rel="noreferrer"
        >
          Update Me With Actions On Google &#128512;
        </a>
      </h1>
      <Cat catId={data.websites[0]?.content?.catId} />
    </div>
  );
}

export default Container;
