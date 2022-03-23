import { useQuery } from "react-query";
import { gql, GraphQLClient } from "graphql-request";

const API_URL = `https://api.takeshape.io/project/${process.env.PROJECT_ID}/v3/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export function useGetPosts() {
  return useQuery("get-posts", async () => {
    //   TODO: 요 부분이 어려움
    const { getPostList } = await graphQLClient.request(gql`
      query {
        getPostList {
          items {
            _id
            title
            description
            content
          }
        }
      }
    `);
    return getPostList;
  });
}

export function useGetPost(postId) {
  return useQuery(["get-posts", postId], async () => {
    //   TODO: 요 부분이 어려움
    const { getPost } = await graphQLClient.request(
      gql`
        query {
          getPostList {
            items {
              _id
              title
              description
              content
            }
          }
        }
      `,
      { postId }
    );
    return getPost;
  });
}
