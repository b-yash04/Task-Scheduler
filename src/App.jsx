import {useState} from "react"
import TaskComp from "./TaskComp";
import { nanoid } from 'nanoid';
export default function App(){
    console.log("renderd")
    const [taskArr, setTask] = useState([]);
    const [rem,setRem] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const newTask = {
            id : nanoid(),
            name :formData.get('taskName'),
            done : false
        }
        setRem(newTask.name == "" ? "Please Enter a Task" : "")
        setTask(prev => [...prev, newTask])
       e.target.elements.taskName.value = ""
    }

    function handleDelete(id){
        setTask(prev => prev.map((item) => item.id === id ? {...item, name : ""} : item))
    }
    
    function handleDone(id){
        setTask(prev => prev.map((item)=> item.id === id ? {...item, done : !item.done}:item))
    }

    const displayTaskArr = taskArr.map((item) => {
        if (item.name === "") return null;

        const classDone = item.done ? "done" : "";

        return (
            <TaskComp   
                key={item.id}
                id={item.id}
                classDone={classDone}
                name={item.name}
                onDone={() => handleDone(item.id)}
                onDelete={()=>handleDelete(item.id)}
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
                <div className="task-container">
                    {displayTaskArr}
                </div>
            </div>
        </main>
      </>
    )
}