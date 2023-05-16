import { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';

import './carousel.scss';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const Carousel = ({ data, loading, endpoint }) => {
  const carouselContainerRef = useRef(null);
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (direction) => {
    const carouselContainer = carouselContainerRef.current;

    const scrollAmount =
      direction === 'left'
        ? carouselContainer.scrollLeft - carouselContainer.offsetWidth - 20
        : carouselContainer.scrollLeft + carouselContainer.offsetWidth + 20;

    carouselContainer.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const skItem = () => {
    return (
      <div className="skletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div ref={carouselContainerRef} className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation('right')}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainerRef}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? `${url.poster}${item.poster_path}`
                : PosterFallback;

              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => {
                    navigate(`/${item.media_type || endpoint}/${item.id}`);
                  }}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} alt={item.title} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>

                  <div className="textBlock">
                    <p className="title">
                      {item.title || item.name || item.original_name}
                    </p>

                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        'DD MMM YYYY'
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};
export default Carousel;
