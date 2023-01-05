import { ColorRing } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#fc5c7d', '#fc5c7d', '#fc5c7d', '#fc5c7d', '#fc5c7d']}
      />
    </div>
  );
};
