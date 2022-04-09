import React, { useState, useEffect, useContext } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import DiaryEditor from '../components/Diary/DiaryEditor';

const Edit = () => {
  const diaryList = useContext(DiaryStateContext);
  const [originalData, setOriginalData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    const targetDiary = diaryList.find((item) => parseInt(item.id) === parseInt(id));

    if (diaryList.length >= 1) {
      // targetDiary 에 데이터가 없다면 즉 edit을 할 수 없는 상태라면
      if (!targetDiary) {
        navigate('/', { replace: true });
      }

      setOriginalData(targetDiary);
    }
  }, [diaryList, id]);

  return (
    <div className='Diary'>
      {originalData && <DiaryEditor isEdit={true} originalData={originalData} />}
    </div>
  );
};

export default Edit;
