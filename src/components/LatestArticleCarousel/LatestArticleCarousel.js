import React from 'react';

const LatestArticleCarousel = props => {
  const { collection } = props;

  if (collection) {
    const {
      properties: { items },
    } = collection;
    return (
      <div>
        {items &&
          items.length &&
          items.map(mappedProps => {
            const { menutitle, summary } = mappedProps.properties;
            return (
              <div>
                <h2>{menutitle}</h2>
                <p>{summary}</p>
              </div>
            );
          })}
      </div>
    );
  }
  return <div>no collection</div>;
};

export default LatestArticleCarousel;
