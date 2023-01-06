import { useEffect, useState } from "react";
import StudentDetails from "../StudentDetails";
import axios from 'axios';
import AddStudent from "../AddStudent";


const StudentsData = () => {

  const [studentsData, setStudentsData] = useState([]);
  const axiosInstance = axios.create({
    baseURL: "https://63b6ca3a1907f863aa01ef8c.mockapi.io/studentData"
  })

  const getStudentsData = async () => {
    try {
      const data = await axiosInstance.get("/students");
      console.log(data, "data");
      setStudentsData(data.data);
    }
    catch (err) {
      console.log(err, "---->Error")
    }
  }

  const onDeleteHandler = async (id) => {
    try {
      const data = await axiosInstance.delete(`/students/${id}`);
      setStudentsData (current => {
        return current.filter(each => each.id !==id);
      })
    }
    catch (err) {
      console.log(err, "Error @ Delete Handler")
    }
  }

const onEditHandler = async (id, editedName) => {
  console.log(id, editedName, "edit handler")
  try {
    await axiosInstance.put(`/students/${id}`,{
      name: editedName,
      id
    });
    getStudentsData();
  }
  catch (err) {
    console.log(err, "Error @ edit Handler")
  }
}

const onAddStudentHandler = async (name) => {
  console.log(name,"add student")
  try {
    await axiosInstance.post("/students",{
      name: name,
      id: studentsData[studentsData.length - 1].id + 1
    });
    getStudentsData();
  }
  catch (err) {
    console.log(err, "Error @ add user Handler")
  }
}

useEffect(() => {
  getStudentsData();
}, [])

return (
  <>
    <AddStudent onAddStudentHandler={onAddStudentHandler}/>
    {studentsData.map((eachItem) =>
      <StudentDetails name={eachItem.name} key={eachItem.id} id={eachItem.id} onDeleteHandler={onDeleteHandler} onEditHandler={onEditHandler} />
    )
    }
  </>
)
}
export default StudentsData;