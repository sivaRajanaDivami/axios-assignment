import { useState } from "react";
import "./index.css";

const StudentDetails = ({ name, id, onDeleteHandler, onEditHandler }) => {

  const [currentName, setCurrentName] = useState(name);
  const [showEditOption, setShowEditOption] = useState(false);

  const onSubmitName = (id, currentName)=>{
    setShowEditOption(prev => !prev)
    onEditHandler(id, currentName)
  }

  return (
    <div className="each-student-container">
      <p className={showEditOption ? "name-para-hide" : "name-para-display"}>{name}</p>
      <input value={currentName}
        className={showEditOption ? "name-input-display" : "name-input-hide"} 
        onChange={(e) => setCurrentName(e.target.value)}
        onBlur={()=>onSubmitName(id,currentName)} />
      <div className="edit-delete-details">
        <button onClick={()=> setShowEditOption(prev => !prev)}>
          {showEditOption ?  "Submit" : "Edit"}
        </button>
        <button onClick={() => onDeleteHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default StudentDetails;