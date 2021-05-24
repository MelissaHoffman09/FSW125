import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Bounty from './Bounty'
import AddBountyForm from './AddBountyForm'
import './style.css'

function App() {
  const [bounty, setBounty] = useState([]);

  const getBounty = () => {
    axios.get('/bounty')
    .then(res => {
      setBounty(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  const addBounty = newBounty => {
    axios.post('/bounty', newBounty)
      .then(res => setBounty(prevBounty => [...prevBounty, res.data]))
      .catch(err => console.log(err))
  }
  
  const deleteBounty = bountyId => {
    axios.delete(`/bounty/${bountyId}`)
      .then(res => {
        setBounty(prevBounty => prevBounty.filter(bounty => bounty._id !== bountyId))
      })
      .catch(err => console.log(err))
  }

  const editBounty = (updates, bountyId) => {
    axios.put(`/bounty/${bountyId}`, updates)
      .then(res => {
        setBounty(prevBounty => prevBounty.map(bounty => bounty._id !== bountyId ? bounty : res.data))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getBounty();
  }, []);

  return (
    <div>
      <h1>The Bounty Hunters</h1>
      <img className='img1' src='https://images.unsplash.com/photo-1600297485496-4d5f07d8adb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80' alt='logo' />
      <h2>Bounty Submission Form</h2>
      <AddBountyForm
        submit={addBounty}
        buttonText={"Post Bounty"}
      />
      <h2>Bounty List</h2>
      {bounty.map(bounty =>
        <Bounty {...bounty}
        deleteBounty={deleteBounty}
        editBounty={editBounty}
        key={bounty._id}
        />)}
    </div>
  );
}

export default App;