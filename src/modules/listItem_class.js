import React from 'react'
import '../styles/listItem.css'
import ellipsis from '../img/ellipsis.svg'
import horizontalDragging from './animations/horizontalDragging'

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.todo = React.createRef();
    this.removeBtnRef = React.createRef();
    this.classes = []; // for stylization completed tasks

    this.showCloseBtn = this.showCloseBtn.bind(this);
    this.hideCloseBtn = this.hideCloseBtn.bind(this);
    this.animationRemove = this.animationRemove.bind(this);
  }
  componentDidMount(){
    horizontalDragging(this.todo.current, () => this.props.removeTask(this.props.task.id));
  }
  componentWillMount(){
    this.classes = [];
    if(this.props.task.completed){
      //Line throuth text
      this.classes.push('doneText');
      //Degrease opacity for element
      this.classes.push('doneLi');
    }
  }
  componentWillUpdate(){
    this.classes = [];
    if(this.props.task.completed){
      //Line throuth text
      this.classes.push('doneText');
      //Degrease opacity for element
      this.classes.push('doneLi');
    }
  }
  showCloseBtn(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return;
    }
    this.removeBtnRef.current.style.right = '-32px';
    this.removeBtnRef.current.style.zIndex = '0';
    this.removeBtnRef.current.style.display = 'block';
  }
  hideCloseBtn(event){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
    return (
      <li className = {this.classes[1]} ref={this.todo} onDragStart={e=>e.preventDefault()}onMouseEnter={this.showCloseBtn} onMouseLeave={this.hideCloseBtn}>
        <p className="id">{id+1}</p>
        <div className="listItem">
          <input type="checkbox" checked={task.completed} onChange={(event)=>this.props.toComplete(task.id, event.target.checked)}/>
          <p className={['title', this.classes[0]].join(' ')}>{task.title}</p>
          <div className="ellipsis">
            <img alt="ellipsis" src={ellipsis}></img>
          </div>
        </div>
        <button className="remove" ref={this.removeBtnRef} onClick={this.animationRemove}>x</button>
      </li>
    );
  }
}

export default ListItem;