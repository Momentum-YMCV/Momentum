import React from 'react';
import { useState } from 'react';

//import AiForm from '../components/Aiform.jsx'

function CheckinForm() {
  const [mood, setMood] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]= useState('')
  const [success, setSuccess]= useState (false)

  const handleSubmit = async()=>{
    if(!mood.trim() || !primaryGoal.trim() || !currentChallenge.trim()){
      setError('Fill all fields');
      return 
    }
    setIsSubmitting(true);
    setError('');
    setSuccess(true);

    try{
      const checkingData = {
        mood:mood.trim(),
        goal:primaryGoal.trim(),
        challenge: currentChallenge.trim()
      }
    }catch(error){

    }

  }
  return (
    <div className='checkin-form'>
      <div>
     
      </div>
      <h2 className='checkinTitle'>Todays Check-in </h2>
      <div className='form-inputs'>
        <input
          type='text'
          placeholder='What is your Mood?'
          value={mood}
          onChange={(e) => {
            setMood(e.target.value);
          }}
          className='form-input'
        ></input>
        <input
          type='text'
          placeholder='Primary Goal ...'
          value={primaryGoal}
          onChange={(e) => {
            setPrimaryGoal(e.target.value);
          }}
          className='form-input'
        ></input>
        <input
          type='text'
          placeholder='Current Challenge ...'
          value={currentChallenge}
          onChange={(e) => {
            setCurrentChallenge(e.target.value);
          }}
        ></input>
        <button>Generate plan</button>
      </div>
    </div>
  );
}

export default CheckinForm;
