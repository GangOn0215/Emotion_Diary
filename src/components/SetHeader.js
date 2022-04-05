import MyHeader from './MyHeader';
import MyButton from './MyButton';

// increase, decrease
const indecreasePeriodicity = (periodicity, curDate, onChangeDate) => {
  const switchPeriodicity = periodicity;
  let increase = null;
  let decrease = null;

  switch (switchPeriodicity) {
    case 'daily':
      increase = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1));
      decrease = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1));
      break;
    case 'weekly':
      increase = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 7));
      decrease = () =>
        onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 7));
      break;
    case 'monthly':
      increase = () => onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
      decrease = () => onChangeDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
      break;
    default:
      break;
  }

  return { increase, decrease };
};

const SetHeader = ({ periodicity, headTextOBJ, curDate, onChangeDate }) => {
  let headText = null;

  const { increase, decrease } = indecreasePeriodicity(periodicity, curDate, onChangeDate);

  switch (periodicity) {
    case 'diary':
      headText = headTextOBJ.dailyText;
      break;
    case 'weekly':
      headText = headTextOBJ.weeklyText;
      break;
    case 'monthly':
      headText = headTextOBJ.monthlyText;
      break;
    default:
      headText = headTextOBJ.dailyText;
      break;
  }

  return (
    <MyHeader
      headText={headText}
      leftChild={<MyButton text={'<'} onClick={decrease} />}
      rightChild={<MyButton text={'>'} onClick={increase} />}
      periodicity={periodicity}
      curDate={curDate}
      onChangeDate={onChangeDate}
    />
  );
};

export default SetHeader;
