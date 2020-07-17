import React, {useState, useEffect} from 'react'
import NewTask from './modules/NewTask'
import TaskList from './modules/taskList'
import Filter from './modules/Filter'
import logo from './img/logo.png'
import './styles/App.css'

function App() {
  const [tasks, setTask] = useState([]);
  const [filter, setFilter] = useState('all');

  // Object with filtering methods for passing to the task list
  const filterTasks = {
    all(tasks){
      return tasks;
    },
    active(tasks){
      return tasks.filter(task => !task.completed);
    },
    completed(tasks){
      return tasks.filter(task => task.completed);
    }
  };

  const [firstChange, setFirstChange] = useState(true);

  useEffect(() => {
    if(firstChange){
      setFirstChange(false);
      let LStasks = localStorage.getItem('tasks');
      if(!LStasks) return;
      LStasks = JSON.parse(LStasks);
      setTask(LStasks);

    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, firstChange]);
  // Sorting function. Takes a source index and offset. Return new array of tasks.
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
  function changeFilter(value){
    setFilter(value);
  }
  function removeTask(id){
    setTask(
      tasks.filter(task=>{
        return task.id !== id;
      })
    );
  }
  function removeCompleted(){
    setTask(tasks => tasks.filter(task => !task.completed)
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
      tasks.concat({id: +new Date(), title: value, completed: false})
    );
  }
  return (
    <div className='main'>
      <div className='logo'>
        <img src={logo} alt='logo'/>
      </div>
      <div className='app'>
        <NewTask createTask={createTask}/>
        <TaskList reorder={reorder} shouldReordering={filter === 'all' ? true : false} tasks={filterTasks[filter](tasks)} toComplete={markAsComplete} removeTask={removeTask}/>
        <div className='footer'>
          <Filter changeFilter={changeFilter} filter={filter}/>
          <button onClick={removeCompleted} className='removeButton'>Удалить выполненные</button>
        </div>
      </div>
    </div>
  );
}

export default App;
