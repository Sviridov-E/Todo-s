import React, {useState} from 'react'
import NewTask from './modules/newTask'
import TaskList from './modules/taskList'
import logo from './img/logo.png'
import './styles/App.css'

function App() {
  const [tasks, setTask] = useState([{id: 0, title: '1Сходить в магазин', completed: false},{id: 1, title: '2Погулять с собакой', completed: false},{id: 2, title: '3Приготовить завтрак', completed: false}]);
  const [numOfLastTask, setNumOfLastTask] = useState(tasks.length-1); // for correct keys in tasks
  function reorder(sourceInd, offset){

    setTask(tasks => {
      offset = offset > tasks.length ? tasks.length -1 : offset;
      offset = sourceInd + offset < 0 ? -sourceInd : offset;
      const source = tasks[sourceInd],
            destInd = sourceInd+offset;
      if(sourceInd > destInd){
        let newTasks = tasks.slice(0, destInd);
        newTasks.push(source);
        newTasks.push(...tasks.slice(destInd, sourceInd));
        newTasks.push(...tasks.slice(sourceInd+1));
        return newTasks;
      }
      else {
        let newTasks = tasks.slice(0, sourceInd);
        newTasks.push(...tasks.slice(sourceInd+1, destInd+1));
        newTasks.push(source);
        newTasks.push(...tasks.slice(destInd+1));
        return newTasks;
      }
    });
  }
  function removeTask(id){
    setTask(
      tasks.filter(task=>{
        return task.id !== id;
      })
    );
  }
  function markAsComplete(id, value){
    setTask(
      tasks.map(task => {
        if(task.id!==id) return task;
        else {
          task.completed = value;
          return task;
        }
      })
    );
  }
  function createTask(value){
    
    let firstLetter = value.slice(0,1).toUpperCase();
    value = firstLetter + value.slice(1);

    setTask(
      tasks.concat({id: numOfLastTask+1, title: value, completed: false})
    );
    setNumOfLastTask(numOfLastTask+1);
  }
  return (
    <div className='main'>
      <div className='logo'>
        <img src={logo} alt='logo'/>
      </div>
      <div className='app'>
        <NewTask createTask={createTask}/>
        <TaskList reorder={reorder} tasks={tasks} toComplete={markAsComplete} removeTask={removeTask}/>
      </div>
    </div>
  );
}

export default App;
