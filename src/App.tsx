import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect } from "react";
import createRenderingMap, { RenderingMap } from "./lib/createRenderingMap";

const { VITE_SC_HOST, VITE_GQL_KEY } = import.meta.env;
const serviceUrl = `${VITE_SC_HOST}sitecore/api/graph/edge?sc_apikey=${VITE_GQL_KEY}`;

const client = new ApolloClient({
  uri: serviceUrl,
  cache: new InMemoryCache(),
});

const GET_RENDERINGS = gql`
  query getRenderedForPath {
    layout(routePath: "/", site: "site", language: "da") {
      item {
        name
        id
        rendered
      }
    }
  }
`;

async function getRenderingMap(): Promise<RenderingMap> {
  const { data } = await client.query({
    query: GET_RENDERINGS,
  });
  const { placeholders } = data.layout.item.rendered.sitecore.route;
  return createRenderingMap(placeholders);
}

function App(): JSX.Element {
  useEffect(() => {
    getRenderingMap().then((renderingMap) => {
      console.log(renderingMap);
    });
  }, []);

  return <div></div>;
}

export default App;
