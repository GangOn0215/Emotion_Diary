const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick }) => {
  return (
    <div onClick={() => onClick(emotion_id)} className='EmotionItem'>
      <img src={emotion_img} alt={emotion_descript} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
