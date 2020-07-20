import React from 'react';
import Podcasts from '@components/Podcasts'

const PodcastCollectionLayout = props => <Podcasts {...props} />;

export const getQueryProps = () => {
    const data = {};

    data.fields = "epidsodeNumber,episodeTitle,episodeDescription,episodeDate";

    return data;
};

export default PodcastCollectionLayout;