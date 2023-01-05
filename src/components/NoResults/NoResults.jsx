import s from './NoResults.module.css';
import PropTypes from 'prop-types';

export const NoResults = ({ query }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.text}>
        Sorry, we couldn't find any content for "{query}"
      </p>
      <ul className={s.list}>
        <li>Check your search for typos;</li>
        <li>Use more generic search terms;</li>
        <li>
          The image/picture your're searching for may be not yet on our site;
        </li>
        <li>
          Can't find what you need here and need help? Try to use{' '}
          <a
            href="https://www.google.com/search"
            rel="noreferrer"
            target="_blank"
          >
            Google search
          </a>
          .
        </li>
      </ul>
    </div>
  );
};

NoResults.propTypes = {
  query: PropTypes.string.isRequired,
};
