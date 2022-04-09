import './App.css';
import React, { useRef, useEffect, useMemo, useReducer } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

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

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, Dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;

      Dispatch({ type: 'INIT', data: diaryList });
    }
  }, []);

  let dataId = useRef(0);

  // CREATE
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

  // EDIT
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

  // REMOVE
  const onRemove = (targetId) => {
    Dispatch({ type: 'REMOVE', targetId });
  };

  const memoDispatchs = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoDispatchs}>
        <HashRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </HashRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
