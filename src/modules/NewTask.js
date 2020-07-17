import React, {useState} from 'react'
import PropTypes from 'prop-types'
import '../styles/newTask.css'

function NewTask(props){
  const createTask = props.createTask;

  const [value, setValue] = useState('');
  function changeInput(e){
    setValue(e.target.value);
  }
  function submitInput(e){
    e.preventDefault();
    if(!value.trim()) return;
    createTask(value.trim());
    setValue('');
  }
  return (
    <form className='newTask' onSubmit={submitInput}>
      <input placeholder="Type new Note!" value={value} onChange={changeInput}/>
      <button type='submit'>+</button>
    </form>
    )
}
NewTask.propTypes = {
  createTask: PropTypes.func.isRequired,
}
export default NewTask;