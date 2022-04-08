import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DiaryDispatchContext } from '../App';

// components
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

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
