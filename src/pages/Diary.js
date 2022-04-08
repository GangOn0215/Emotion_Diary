import React, { useState, useEffect, useContext } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

import MyHeader from '../components/common/MyHeader';
import MyButton from '../components/common/MyButton';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const Diary = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(diaryList.find((item) => parseInt(item.id) === parseInt(id)));

  useEffect(() => {
    const targetDiary = diaryList.find((item) => parseInt(item.id) === parseInt(id));

    if (diaryList.length >= 1) {
      // targetDiary 에 데이터가 없다면 즉 edit을 할 수 없는 상태라면
      if (!targetDiary) {
        navigate('/', { replace: true });
      }

      setData(targetDiary);
    }
  }, [diaryList, id]);

  if (!data) {
    return <div className='DiaryPage'>Loading...</div>;
  }

  const currentEmotionData = emotionList.find(
    (item) => parseInt(item.emotion_id) === parseInt(data.emotion),
  );

  console.log(currentEmotionData);
  return (
    <div className='DiaryPage'>
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 의 기록`}
        leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)} />}
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              'diary-img-wrapper',
              `diary-img-wrapper-${currentEmotionData.emotion_id}`,
            ].join(' ')}>
            <img src={currentEmotionData.emotion_img} alt={currentEmotionData.emotion_id} />
            <div className='emotion-descript'>{currentEmotionData.emotion_descript}</div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='diary-content-wrapper'>
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Diary;
