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
      newState = state.map((item) => (item.id === action.data.id ? { ...action.data } : item));
      break;
    case 'REMOVE':
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    default:
      return state;
  }

  // localStorage.setItem('diary', JSON.stringify(newState));
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
  useEffect(() => {
    // localStorage.setItem('item1', 10);
    // localStorage.setItem('item2', '20');
    // localStorage.setItem('item3', JSON.stringify({ value: 30 }));
    const item1 = localStorage.getItem('item1');
    const item2 = localStorage.getItem('item2');
    const item3 = JSON.parse(localStorage.getItem('item3'));

    console.log(item1, item2, item3);
  }, []);
  const [data, Dispatch] = useReducer(reducer, []);
  let dataId = useRef(6);

  const getData = () => {
    // const data = localStorage.getItem();
    Dispatch({ type: 'INIT', data: dummyData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (date, content, emotion) => {
    Dispatch({
      type: 'CREATE',
      data: {
        id: ++dataId.current,
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
        date: new Date(date).getTime(),
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
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
