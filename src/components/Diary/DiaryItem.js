import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import MyButton from '../common/MyButton';

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className='DiaryItem'>
      <div
        onClick={goDetail}
        className={['emotion-img-wrapper', `emotion-img-wrapper-${emotion}`].join(' ')}>
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt={`emotion${emotion}`}
        />
      </div>
      <div className='info-wrapper'>
        <div className='diary-date'>{strDate}</div>
        <div className='diary-content-preview'>{content.slice(0, 25)}</div>
      </div>
      <div className='btn-wrapper'>
        <MyButton text={'수정하기'} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
