import { useSelector } from 'react-redux';

import './genres.scss';

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((genre) => {
        if (!genres[genre]?.name) return null;

        return (
          <span key={genre} className="genre">
            {genres[genre]?.name}
          </span>
        );
      })}
    </div>
  );
};
export default Genres;
