import './App.css';
import React, { useRef, useEffect, useMemo, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// Components

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE':
      newState = [action.data, ...state];
      break;
    case 'EDIT':
      newState = state.map((item) => (item.id === action.targetId ? { ...action.data } : item));
      break;
    case 'REMOVE':
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    default:
      return state;
  }

  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    date: 1648657040021,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date: 1648657040022,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    date: 1648657040023,
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기 4번',
    date: 1648657040024,
  },
  {
    id: 5,
    emotion: 5,
    content: '오늘의 일기 5번',
    date: 1648657040025,
  },
  {
    id: 6,
    emotion: 5,
    content: '오늘의 일기 6번',
    date: 1649084400000,
  },
];

function App() {
  const [data, Dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = () => {
    Dispatch({ type: 'INIT', data: dummyData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (date, content, emotion) => {
    Dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current++,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const onEdit = (targetId, date, content, emotion) => {
    Dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: date,
        content,
        emotion,
      },
    });
  };

  const onRemove = (targetId) => {
    Dispatch({ type: 'REMOVE', targetId });
  };

  const memoDispatchs = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoDispatchs}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
