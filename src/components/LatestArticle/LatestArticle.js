import React from 'react';

const LatestArticle = props => {

  const {
    articlesourceimage,
    articleauthors,
    articleauthoradditionalInfo,
    businesssourceheadline,
    articletitle,
    articlebodycopypreview,
    downloadwhitepapercta,
    seeallinsightscta,
  } = props;
  return (
    <div>
      <p>{articlesourceimage || 'articleSourceImage'}</p>
      <p>{articleauthors || 'articleAuthors'}</p>
      <p>{articleauthoradditionalInfo || 'articleAuthorAdditionalInfo'}</p>
      <p>{businesssourceheadline || 'businessSourceHeadline'}</p>
      <p>{articletitle || 'articleTitle'}</p>
      <p>{articlebodycopypreview || 'articleBodyCopyPreview'}</p>
      <p>{downloadwhitepapercta || 'downloadWhitePaperCTA'}</p>
      <p>{seeallinsightscta || 'seeAllInsightsCTA'}</p>
    </div>
  );
};

export default LatestArticle;
