import { AiFillGithub } from 'react-icons/ai';
import s from './WelcomePage.module.css';

export const WelcomePage = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.header}>Hi there! 👋</h1>
        <p className={s.text}>
          This app helps you to find images and photos from service{' '}
          <a href="https://pixabay.com">Pixabay</a>.
        </p>
        <p className={s.text}>
          To start, please, entry your first query to the field above!
        </p>
      </div>

      <footer>
        <div className={s.wrapper}>
          <p>
            Coded by Veronika Tlostiuk{' '}
            <a
              className={s.githubLink}
              href="https://github.com/Veronikanos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
