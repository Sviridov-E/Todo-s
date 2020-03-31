import React, {useState} from 'react'
import NewTask from './modules/newTask'
import TaskList from './modules/taskList'
import Filter from './modules/filter'
import logo from './img/logo.png'
import './styles/App.css'

function App() {
  const [tasks, setTask] = useState([{id: 0, title: 'Сходить в магазин', completed: false},{id: 1, title: 'Погулять с собакой', completed: false},{id: 2, title: 'Приготовить завтрак', completed: false}, {id: 3, title: 'Сходить в спортзал', completed: false},{id: 4, title: 'Поиграть с котом', completed: false},{id: 5, title: 'Приготовить ужин', completed: false}]);
  const [numOfLastTask, setNumOfLastTask] = useState(tasks.length-1); // for correct keys in tasks
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
        <TaskList reorder={reorder} tasks={filterTasks[filter](tasks)} toComplete={markAsComplete} removeTask={removeTask}/>
        <Filter changeFilter={changeFilter} filter={filter}/>
      </div>
    </div>
  );
}

export default App;
