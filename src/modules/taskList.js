import React from 'react'
import ListItem from './listItem_class'

function TaskList(props){
  const mesEmptyStyle = {
    display: 'block',
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#1c3c8e',
    fontWeight: '500',
    paddingTop: '2rem',
    userSelect: 'none',
  };
  const tasks = props.tasks;
  const mesIfEmpty = <h2 style={mesEmptyStyle}>У вас нет заданий</h2>;
  return(
    <ul style={{listStyle: 'none', width: '100%', margin: '0 auto'}}>
      {tasks[0] ? tasks.map((task, id) => {
        return <ListItem shouldReordering={props.shouldReordering}reorder={props.reorder}toComplete={props.toComplete} removeTask={props.removeTask} key={task.id} task={task} id={id}/>
      }) : mesIfEmpty}
    </ul>
  );
}

export default TaskList;