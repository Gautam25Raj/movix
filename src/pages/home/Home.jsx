import HeroBanner from './heroBanner/HeroBanner';
import Trending from './pending/Trending';

import './home.scss';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
    </div>
  );
};
export default Home;
