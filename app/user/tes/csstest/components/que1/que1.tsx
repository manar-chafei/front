import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Question1() {
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === 'b') {
      router.push('/questions/question2'); // Aller à la prochaine question
    } else {
      setFeedback('Incorrect Answer');
    }
  };

  return (
    <div className="container">
      <h1>1. What does CSS stand for?</h1>
      <form onSubmit={handleSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="optradio"
              value="a"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            Creative Style Sheets
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="optradio"
              value="b"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            Cascading Style Sheets
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="optradio"
              value="c"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            Computer Style Sheets
          </label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {feedback && (
        <div className="alert alert-danger" role="alert">
          {feedback}
        </div>
      )}
      <style jsx>{`
        .container {
          margin: 20px;
        }
        .radio {
          margin-bottom: 10px;
        }
        .alert {
          margin-top: 20px;
          color: red;
        }
        .btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
        }
        .btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
