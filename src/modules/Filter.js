import React from 'react'
import '../styles/filter.css'

function Filter({changeFilter, filter}){
  function clickButton(e){
    if (e.target.tagName !== 'BUTTON') return;
    changeFilter(e.target.value);
  }
  return <div onClick={clickButton} className='filter'>
    <button className={filter === 'all' ? 'filterActive' : null} value='all'>All</button>
    <button className={filter === 'active' ? 'filterActive' : null} value='active'>Active</button>
    <button className={filter === 'completed' ? 'filterActive' : null} value='completed'>Completed</button>
  </div>
}

export default Filter;