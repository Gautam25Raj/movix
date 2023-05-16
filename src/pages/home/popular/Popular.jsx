import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {
  const [endPoint, setEndPoint] = useState('movie');
  const { data, loading } = useFetch(`/${endPoint}/popular`);

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <h2 className="carouselTitle">What&apos;s Popular</h2>
        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel endPoint={endPoint} data={data?.results} loading={loading} />
    </div>
  );
};
export default Popular;
