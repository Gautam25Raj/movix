import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';

import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

import './heroBanner.scss';

const HomeBanner = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch('/movie/upcoming');

  useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
      setBackgroundImage(url.backdrop + randomMovie.backdrop_path);
      setTitle(randomMovie.title);
    }
  }, [data, setTitle, setBackgroundImage, url.backdrop]);

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) navigate(`/search/${query}`);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={backgroundImage} alt={title + 'Poster'} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>

          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie, tv show, person..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
export default HomeBanner;
