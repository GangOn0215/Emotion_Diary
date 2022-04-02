import React from "react";

const MyButton = ({text, onClick, type}) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button className={["MyButton", `MyButton-${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  )
}

MyButton.defaultProps = {
  type: "default",
}

export default MyButton;