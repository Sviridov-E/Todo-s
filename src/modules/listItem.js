import React from 'react'
import PropTypes from 'prop-types'
import '../styles/listItem.css'

function ListItem({task, id, toComplete, removeTask}){
  const classes = [];
  //Ref, for button-remover

  const removeBtnRef = React.createRef();

  function showCloseBtn(event){
    removeBtnRef.current.style.right = '-32px';
    removeBtnRef.current.style.zIndex = '0';
    removeBtnRef.current.style.display = 'block';
  }

  function hideCloseBtn(event){
    if(event.relatedTarget === removeBtnRef.current) return;
    removeBtnRef.current.style.right = '0';
    removeBtnRef.current.style.zIndex = '-95';
    removeBtnRef.current.style.display = 'none';
  }
  //////////////////////////
  //Ref, for remove todo
  const todo = React.createRef();
  function animationRemove(event){
    todo.current.style.left = '-2000px';
    setTimeout(()=>removeTask(task.id), 200);
  }
  //////////////////////////
  if(task.completed){
    //Line throuth text
    classes.push('doneText');
    //Degrease opacity for element
    classes.push('doneLi');
  }
  return (<li className={classes[1]} ref={todo} onMouseEnter={showCloseBtn} onMouseLeave={hideCloseBtn}>
    <p className="id">{id+1}</p>
    <div className="listItem">
      <input type="checkbox" onChange={(event)=>toComplete(task.id, event.target.checked)}/>
      &nbsp;
      <p className={['title', classes[0]].join(' ')}>{task.title}</p>
    </div>
    <button className='remove' ref={removeBtnRef} onClick={animationRemove}>x</button>
  </li>);
}
ListItem.propTypes = {
  task: PropTypes.object,
  id: PropTypes.number,
  toComplete: PropTypes.func,
  removeTask: PropTypes.func,

}
export default ListItem