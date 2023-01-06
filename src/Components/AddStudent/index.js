import { useRef } from "react"
import "./index.css";

const AddStudent = ({onAddStudentHandler}) => {
  const refStudent = useRef(null)

  const onSubmitHandler = () => {
    onAddStudentHandler(refStudent.current.value)
    refStudent.current.value = "";
  }
  return (
    <>
      <div className="add-student-form" >
        <label htmlFor="input-name" className="label-student-name">Name </label>
        <input id="input-name" ref={refStudent} type="text"/>
        <button onClick={onSubmitHandler}>Add student</button>
      </div>
    </>
  )
}

export default AddStudent;