import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DiaryDispatchContext } from '../App';

// components
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: 'very good',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion2.png',
    emotion_descript: 'good',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion3.png',
    emotion_descript: 'nomal',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion4.png',
    emotion_descript: 'bad',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion5.png',
    emotion_descript: 'very bad',
  },
];

const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const DiaryEditor = ({ isEdit, originalData }) => {
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      setContent(originalData.content);
      setEmotion(originalData.emotion);
      setDate(getStringDate(new Date(parseInt(originalData.date))));
    }
  }, [isEdit, originalData]);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (isEdit) onEdit(originalData.id, date, content, emotion);
    else onCreate(date, content, emotion);

    navigate('/', { replace: true });
  };

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={isEdit ? 'Edit Diary' : 'New Diary'}
        leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input-box'>
            <input
              className='input-date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type='date'
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input-box emotion-list-wrapper'>
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotion_id}
                {...item}
                onClick={handleClickEmote}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input-box text-wrpper'>
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='오늘은 어땟나요?'
            />
          </div>
        </section>
        <section>
          <div className='control-box'>
            <MyButton text={'Cancle'} onClick={() => navigate(-1)} />
            <MyButton text={'작성 완료'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
