import React from 'react'
import PropTypes from 'prop-types'
import '../styles/listItem.css'

function ListItem({task, id, toComplete, removeTask}){
  let classes = [];
  if(task.completed){
    classes.push('doneText');
    classes.push('doneLi');
  }
  function showCloseBtn(event){
    event.currentTarget.children[2].style.right = '-32px';
    event.currentTarget.children[2].style.zIndex = '0';
  }
  function hideCloseBtn(event){
    if(event.relatedTarget === event.currentTarget.children[2]) return;
    event.currentTarget.children[2].style.right = '0';
    event.currentTarget.children[2].style.zIndex = '-95';
  }
  function animationRemove(event){
    event.target.parentElement.style.left = '-2000px';
    setTimeout(()=>removeTask(task.id), 200);
  }
  return (<li className={classes[1]} onMouseEnter={showCloseBtn} onMouseLeave={hideCloseBtn}>
    <p className="id">{id+1}</p>
    <div className="listItem">
      <input type="checkbox" onChange={(event)=>toComplete(task.id, event.target.checked)}/>
      &nbsp;
      <p className={['title', classes[0]].join(' ')}>{task.title}</p>
    </div>
    <button className='remove' onClick={animationRemove}>x</button>
  </li>);
}
ListItem.propTypes = {
  task: PropTypes.object,
  id: PropTypes.number,
  toComplete: PropTypes.func,
  removeTask: PropTypes.func,

}
export default ListItem