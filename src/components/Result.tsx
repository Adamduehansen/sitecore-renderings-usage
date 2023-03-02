import { useSelector } from 'react-redux';
import { SelectedRendering, selectRenderings } from '../lib/renderingSlice';

function renderListItem({
  id,
  renderingName,
  count,
  urls,
}: SelectedRendering): JSX.Element {
  return (
    <details key={id}>
      <summary>
        {renderingName} - {count}
      </summary>
      <ul>
        {urls.map((url, index) => {
          return <li key={`url-${id}-${index}`}>{url}</li>;
        })}
      </ul>
    </details>
  );
}

function Result(): JSX.Element {
  const renderings = useSelector(selectRenderings);

  const renderingList = renderings.map(renderListItem);

  return (
    <div>
      <h2>Found renderings:</h2>
      {renderingList}
    </div>
  );
}

export default Result;
