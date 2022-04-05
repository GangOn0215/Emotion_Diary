import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
  // React Router Link 대신 사용할 수 있는 navigate 함수 > 강제로 이동시킬때 주로 사용됩니다.
  // [ example ] Login 하지 않은 유저가 my profile url로 접근을 할때
  const navigate = useNavigate();
  // url에서 'https://localhost:5000/edit?[id=10&mode=kr] Query Sting 을 받아올수 있는 함수
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  console.log('id: ', id);

  const mode = searchParams.get('mode');
  console.log('mode: ', mode);

  return (
    <div className='Diary'>
      <h1>Edit</h1>
      <p>this Edit page</p>
      <button onClick={() => setSearchParams({ who: 'winterload' })}>Change QS</button>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate(-1)}>back</button>
    </div>
  );
};

export default Edit;
