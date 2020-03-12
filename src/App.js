import React, {useState} from 'react'
import NewTask from './modules/newTask'
import TaskList from './modules/taskList'
import logo from './img/logo.png'
import './styles/App.css'

function App() {
  const [tasks, setTask] = useState([{id: 0, title: 'Помыть жопу', completed: false}]);
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
      tasks.concat({id: tasks.length, title: value, completed: false})
    );
  }
  return (
    <div className='main'>
      <div className='logo'>
        <img src={logo} alt='logo'/>
      </div>
      <div className='app'>
        <NewTask createTask={createTask}/>
        <TaskList tasks={tasks} toComplete={markAsComplete} removeTask={removeTask}/>
      </div>
    </div>
  );
}

export default App;
