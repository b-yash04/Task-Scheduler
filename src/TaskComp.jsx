export default function TaskComp(props){
    return(
        <div className="added-tasks">
            <div className={`show-task  ${props.classDone}`}>{props.name}</div>
            <button onClick = {props.onDone} className={`tsk-btn`}>Done</button>
            <button onClick = {props.onDelete} className="tsk-btn">Delete</button>
        </div>
    )
}