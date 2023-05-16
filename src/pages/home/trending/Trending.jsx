import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {
  const [endPoint, setEndPoint] = useState('day');
  const { data, loading } = useFetch(`/trending/all/${endPoint}?`);

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Day' ? 'day' : 'week');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <h2 className="carouselTitle">Trending</h2>
        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};
export default Trending;
