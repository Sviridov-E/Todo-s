import React from 'react'
import '../styles/listItem.css'
import ellipsis from '../img/ellipsis.svg'
import horizontalDragging from './animations/horizontalDragging'
import verticalDragging from './animations/verticalDragging'
import trash from '../img/trash.svg'

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.todo = React.createRef();
    this.removeBtnRef = React.createRef();


    this.showCloseBtn = this.showCloseBtn.bind(this);
    this.hideCloseBtn = this.hideCloseBtn.bind(this);
    this.animationRemove = this.animationRemove.bind(this);
  }
  componentDidMount(){
    horizontalDragging(this.todo.current, () => this.props.removeTask(this.props.task.id));
    this.isMobile = document.documentElement.clientWidth <= 800 ? true : false;
    verticalDragging(this.todo.current, '#ellipsis', this.props.reorder, this.isMobile);
  }
  showCloseBtn(){
    if (this.isMobile) {
      return;
    }
    this.removeBtnRef.current.style.right = '-32px';
    this.removeBtnRef.current.style.zIndex = '0';
    this.removeBtnRef.current.style.display = 'block';
  }
  hideCloseBtn(event){
    if (this.isMobile) {
      return;
    }
    if(event.relatedTarget === this.removeBtnRef.current) return;
    this.removeBtnRef.current.style.right = '0';
    this.removeBtnRef.current.style.zIndex = '-95';
    this.removeBtnRef.current.style.display = 'none';
  }
  animationRemove(){
    this.todo.current.style.transform = 'translateX(-600px)';
    this.todo.current.style.opacity = '0';
    setTimeout(()=>this.props.removeTask(this.props.task.id), 200);
  }
  render(){
    const task = this.props.task;
    const id = this.props.id;
    const completed = this.props.task.completed;
    return (
      <li className = {completed ? 'doneLi' : ''} id={this.props.id} ref={this.todo} onDragStart={e=>e.preventDefault()} onMouseEnter={this.showCloseBtn} onMouseLeave={this.hideCloseBtn}>
        <p className="id">{id+1}</p>
        <div className="listItem">
          <input type="checkbox" checked={completed} onChange={(event)=>this.props.toComplete(task.id, event.target.checked)}/>
          <p className={completed ? 'title doneText' : 'title'}>{task.title}</p>
          {
            this.props.shouldReordering ? 
            (<div className="ellipsis" id="ellipsis">
            <img alt="ellipsis" src={ellipsis}></img>
            </div>) : null
          }
        </div>
        <button className="remove" ref={this.removeBtnRef} onClick={this.animationRemove}><img alt='del' src={trash}/></button>
      </li>
    );
  }
}

export default ListItem;