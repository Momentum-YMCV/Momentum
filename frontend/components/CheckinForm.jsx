import { useState } from 'react';

//import AiForm from '../components/Aiform.jsx'

function CheckinForm() {
  const [mood, setMood] = useState('');
  const [goal, setGoal] = useState('');
  const [challenge, setChallenge] = useState('');
  const [AiPlan , setAiPlan] = useState ('');

const handleMoodChange = (e) => {
  e.preventDefault();
  setMood(e.target.value)
}

const handleGoalChange = (e) => {
  e.preventDefault();
  setGoal(e.target.value)
}

const handleChallengeChange = (e) => {
  e.preventDefault();
  setChallenge(e.target.value)
}

//const handleAiPlanChange = (e) => {
  //e.preventDefault();
  //setAiPlan(e.target.value)
//}  

const handleSubmit = async (e) => {
 e.preventDefault();
 try {

     const response = await fetch ('/api/home', {

      method :'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({mood,goal,challenge})
     })   
     if(!response.ok){
      throw new Error('response fail')
     }
     const data = await response.json();
     console.log('Received data:', data);
     setAiPlan(data[0])
 } catch (error) {
  console.log(error)
 }
}

  return (
    <div className='checkin-form'>
      <form id= "checkin-card" onSubmit={handleSubmit}>
      <h2 className='checkinTitle'>Todays Check-in </h2>
      <div className='form-inputs'>
        <input
          type='text'
          id= "mood-input"
          placeholder='What is your Mood?'
          value={mood}
          onChange={(e) => {
            handleMoodChange(e);
          }}
          className='form-input'
        ></input>
        <input
          type='text'
          id='goal-input'
          placeholder='Primary Goal ...'
          value={goal}
          onChange={(e) => {
            handleGoalChange(e);
          }}
          
        ></input>
        <input
          type='text'
          id='challenge-input'
          placeholder='Current Challenge ...'
          value={challenge}
          onChange={(e) => {
            handleChallengeChange(e);
          }}
        ></input>
        <button>Generate plan</button>
      </div>
        </form>
        <div id= "ai-plan-response">
          <p>{AiPlan}</p>
        </div>
    </div>
  );
}

export default CheckinForm;
