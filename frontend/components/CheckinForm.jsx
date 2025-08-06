import { useState } from 'react';

function CheckinForm() {
  const [mood, setMood] = useState('');
  const [goal, setGoal] = useState('');
  const [challenge, setChallenge] = useState('');
  const [AiPlan , setAiPlan] = useState ('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

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

const handleNewCheckin = () => {
  setShowForm(true);
  setAiPlan('');
};

const handleSubmit = async (e) => {
 e.preventDefault();
 setIsLoading(true); // Start loading
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
     
     // Clear the input fields after successful submission
     setMood('');
     setGoal('');
     setChallenge('');
     
     // Hide form and show only response
     setShowForm(false);
 } catch (error) {
  console.log(error)
 } finally {
   setIsLoading(false); // Stop loading
 }
}

  return (
    <div id="checkin-form-page">
      <div id="checkin-form-container" >
        {showForm ? (
          <form id="checkin-form" onSubmit={handleSubmit}>
            <h2 id="checkin-title" className='checkinTitle'>Today's Check-in</h2>
            <div id="form-inputs-container" className='form-inputs'>
            <input
              type='text'
              id="mood-input"
              placeholder='What is your Mood?'
              value={mood}
              onChange={(e) => {
                handleMoodChange(e);
              }}
              className='form-input'
            />
            <input
              type='text'
              id='goal-input'
              placeholder='Primary Goal ...'
              value={goal}
              onChange={(e) => {
                handleGoalChange(e);
              }}
              className='form-input'
            />
            <input
              type='text'
              id='challenge-input'
              placeholder='Current Challenge ...'
              value={challenge}
              onChange={(e) => {
                handleChallengeChange(e);
              }}
              className='form-input'
            />
            <button id="generate-plan-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate plan'}
            </button>
          </div>
        </form>
      ) : (
        <div id="ai-plan-response">
          <h2 id="response-title">
            Your Personalized Plan
          </h2>
          <p id="ai-plan-text">{AiPlan}</p>
          <button 
            id="new-checkin-button" 
            onClick={handleNewCheckin}
          >
            New Check-in
          </button>
        </div>
      )}
      
      {isLoading && (
        <div id="loading-spinner">
          <div id="spinner-circle"></div>
          <p id="loading-text">
            Creating your personalized plan...
          </p>
        </div>
      )}
    </div>
  </div>
  );
}

export default CheckinForm;
