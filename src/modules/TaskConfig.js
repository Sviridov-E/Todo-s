import React from 'react'

function TaskConfig(props){
  const styles = {
    config: {
      height: '20px',
      border: '1px solid #ccc',
    },
  };
  return (
    <div className="config" style={styles.config}>Configs</div>
  );
}

export default TaskConfig