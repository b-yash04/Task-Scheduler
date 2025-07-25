import {useState} from "react"
import TaskComp from "./TaskComp";
import { nanoid } from 'nanoid';
export default function App(){
    console.log("renderd")
    const [taskArr, setTask] = useState([]);
    const [rem,setRem] = useState("")
    const [toggleEdit, setEdit] = useState({doEdit : false, taskid : "", index : 0})
    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const newTask = {
            id : nanoid(),
            name :formData.get('taskName'),
            done : false
        }
        if (newTask.name === "") {
            setRem("Please Enter a Task");
            return;  
        }

        setTask(prev => [...prev, newTask])
        e.target.elements.taskName.value = ""
    }

    function handleDelete(id){
        setTask(prev => prev.filter(item => item.id != id))
    }
    
    function handleDone(id){
        setTask(prev => prev.map((item)=> item.id === id ? {...item, done : !item.done}:item))
    }
    function handleEdit(id,index){
        console.log(id)
        setEdit(prev=> ({doEdit : !prev.doEdit,taskid : id, index : index}))

    }
    function editSubmit(e){
        e.preventDefault()
        const editedData = new FormData(e.target)
        const editedTask = {
            id : toggleEdit.taskid,
            name : editedData.get("editName"),
            done : false
        }
         if (editedTask.name === "") {
            setRem("Please Enter a Task");
            return;  
        }
       
        setTask(prev => [
            ...prev.slice(0, toggleEdit.index),
 editedTask,
  ...prev.slice(toggleEdit.index + 1)
]);
        setEdit({doEdit : false, taskid : "", index : 0})

        
    }
    const displayTaskArr = taskArr.map((item,index) => {
        if (item.name === "") return;

        const classDone = item.done ? "done" : "";

        return (
            <TaskComp   
                key={item.id}
                id={item.id}
                classDone={classDone}
                name={item.name}
                onDone={() => handleDone(item.id)}
                onDelete={()=>handleDelete(item.id)}
                onEdit = {()=>handleEdit(item.id, index)}
            />
        );
    });
    
    return(
        <>
        <h1 className="title"> Focus On <span>Today</span></h1>
        <main>
            <div className="container">
                <h2>Today <img src="../Sun.png" alt="Sun" /></h2>
                <p className="remark">Raise the bar by completing your goals!</p>
                <div className="alert">{rem}</div>
                <form onSubmit = {handleSubmit}className="add-task">
                    <input type="text" name="taskName"placeholder="Enter your Task..." id="task-input" />
                    <button className="add-btn" type="submit">+ Add Task</button>
                </form>
                {toggleEdit.doEdit && <form onSubmit = {editSubmit} className="do-edit">
                    <input type="text" name="editName"placeholder="update your task..." id="task-edit" />
                    <button className="add-btn" type="submit">Save</button>
                </form>}
                
                <div className="task-container">
                    {displayTaskArr}
                </div>
            </div>
        </main>
      </>
    )
}