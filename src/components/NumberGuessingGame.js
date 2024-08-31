import React, { useState, useEffect } from 'react';
import './NumberGuessingGame.css';

const NumberGuessingGame = () => {
  const [randomNum, setRandomNum] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [chances, setChances] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (chances <= 0 && !gameOver) {
      setFeedback(`💥 Game Over! The correct number was ${randomNum}`);
      setGameOver(true);
    }
  }, [chances, gameOver, randomNum]);

  const handleGuess = () => {
    if (gameOver) return;

    const inputValue = parseInt(guess, 10);
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 100) {
      setFeedback('Your number is invalid');
    } else if (inputValue === randomNum) {
      setFeedback('🎉 Congratulations! You guessed the number!');
      setWin(true);
      setGameOver(true);
    } else if (inputValue > randomNum) {
      setFeedback('Your guess is high');
    } else {
      setFeedback('Your guess is low');
    }
    
    if (!gameOver) {
      setChances(chances - 1);
    }
  };

  const handleRestart = () => {
    setRandomNum(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setChances(10);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="game-container">
      <header>Guess a number from 1 to 100</header>
      <p className={`feedback ${win ? 'win' : ''} ${gameOver ? 'lose' : ''}`}>{feedback}</p>
      <div className="input-field">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver}
        />
        <button onClick={handleGuess} disabled={gameOver}>Check</button>
      </div>
      <p>You have <span className="chances">{chances}</span> chances</p>
      {gameOver && <button onClick={handleRestart}>Replay</button>}
      <div className={`emoji ${win ? 'win' : ''} ${gameOver && !win ? 'lose' : ''}`}>{win ? '🎉' : gameOver ? '💥' : ''}</div>
    </div>
  );
};

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

export default NumberGuessingGame;
