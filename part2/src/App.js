import { useState } from "react";

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td> {value}</td>
  </tr>
);

const Statistics = (props) => {
  let total = 0;
  let average = 0;
  let positivePercent = 0;

  total = props.good + props.neutral + props.bad;
  average = ((props.good - props.bad) / total).toFixed(1);
  positivePercent = ((props.good / total) * 100).toFixed(1) + " %";

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positivePercent} />
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  const handleRand = () => setSelected(Math.floor(Math.random() * max));
  const handleVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };
  //
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  let max = anecdotes.length - 1;

  let highest = 0;
  let highestA = 0;

  const [votes, setVotes] = useState(Array(max).fill(0));

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > highest) {
      highest = votes[i];
      highestA = i;
    }
  }

  // snippet: clo
  // console.log('first', first)

  return (
    <div>
      <h1>give a feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br />
      <div>
        {anecdotes[selected]} <br /> has {votes[selected]} votes
      </div>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleRand} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[highestA]} <br /> has {highest} votes
      </div>
    </div>
  );
};

export default App;
