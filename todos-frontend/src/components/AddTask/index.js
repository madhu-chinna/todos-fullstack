import React, { useState, useEffect } from 'react';
import Header from '../Header';
// import { useNavigate } from 'react-router-dom';

import './index.css'


const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
//   const [status, setStatus] = useState(''); // Track the status for the new task
//   const navigate = useNavigate();

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3008/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('=')[1]}` // Get token from cookies
        },
      });

      if (response.ok) {
        const tasks = await response.json();
        setTasks(tasks);
      } else {
        setError('Failed to load tasks');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle task creation
  const createTask = async (e) => {
    e.preventDefault();
    
    if (!title || !description) {
      setError('Title and description are required');
      return;
    }

    const taskData = { title, description, status: 'pending' }; // Default status as 'pending'

    try {
      const response = await fetch('http://localhost:3008/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('=')[1]}` // Get token from cookies
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setError('');
        setTitle('');
        setDescription('');
        fetchTasks(); // Refresh tasks after adding a new one
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create task');
      }
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Error creating task');
    }
  };


  // Handle status change
const changeStatus = async (taskId, newStatus) => {
    try {
      // Find the task to get its current title and description
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      
      if (!taskToUpdate) {
        setError('Task not found');
        return;
      }
  
      const taskData = {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: newStatus,
      };
  
      const response = await fetch(`http://localhost:3008/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('=')[1]}`, // Get token from cookies
        },
        body: JSON.stringify(taskData),
      });
  
      if (response.ok) {
        fetchTasks(); // Refresh tasks after updating status
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update task status');
      }
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Error updating task status');
    }
  };
  

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3008/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('=')[1]}` // Get token from cookies
        },
      });

      if (response.ok) {
        fetchTasks(); // Refresh tasks after deletion
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Error deleting task');
    }
  };

  return (
    <>
    <Header/>
    <div className="add-task-container">
      <h2>Create Task</h2>
      <form onSubmit={createTask}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      {error && <p className="error">{error}</p>}

      <h2>My Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => changeStatus(task.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div></>
  );
};

export default AddTask;







