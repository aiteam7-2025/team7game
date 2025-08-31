import React, { useState, useEffect, useRef } from 'react';

const Index = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [linePosition, setLinePosition] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  
  const animationRef = useRef(null);
  const targetY = 300;

  const startGame = () => {
    setGameState('playing');
    setLinePosition(0);
    setScore(0);
  };

  const stopLine = () => {
    if (gameState !== 'playing') return;
    
    const distance = Math.abs(linePosition - targetY);
    let newScore = 0;
    let message = '';
    
    if (distance <= 10) {
      newScore = 100;
      message = 'Perfect!';
    } else if (distance <= 25) {
      newScore = 75;
      message = 'Great!';
    } else if (distance <= 40) {
      newScore = 50;
      message = 'Good!';
    } else if (distance <= 60) {
      newScore = 25;
      message = 'Close!';
    } else {
      newScore = 0;
      message = 'Miss!';
    }
    
    setScore(newScore);
    setTotalScore(prev => prev + newScore);
    setResultMessage(message);
    setGameState('result');
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const animate = () => {
    if (gameState !== 'playing') return;
    
    setLinePosition(prev => {
      const newPos = prev + 3;
      
      if (newPos > targetY + 100) {
        setGameState('result');
        setResultMessage('Miss!');
        setScore(0);
        return prev;
      }
      
      return newPos;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && gameState === 'playing') {
        e.preventDefault();
        stopLine();
      }
    };
    
    const handleClick = () => {
      if (gameState === 'playing') {
        stopLine();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [gameState, linePosition]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Target Line */}
      <div 
        className="absolute left-0 w-full h-1 border-t-2 border-dotted border-red-500"
        style={{ top: `${targetY}px` }}
      />
      
      {/* Falling Line */}
      {gameState === 'playing' && (
        <div
          className="absolute left-1/2 w-3 h-20 bg-green-500 rounded-full shadow-lg shadow-green-400/50 transform -translate-x-1/2"
          style={{ top: `${linePosition}px` }}
        />
      )}
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-8">LINE DROP</h1>
          <p className="text-xl mb-8">Click PLAY to start!</p>
          <button
            onClick={startGame}
            className="px-12 py-6 text-2xl font-bold bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            PLAY
          </button>
        </div>
      )}
      
      {/* Result Screen */}
      {gameState === 'result' && (
        <div className="text-center text-white">
          <div className="bg-gray-800 p-8 rounded-2xl mb-8 border-2 border-green-500">
            <div className="text-2xl mb-4">{resultMessage}</div>
            <div className="text-5xl text-green-400 font-bold">{score}</div>
          </div>
          <button
            onClick={startGame}
            className="px-12 py-6 text-2xl font-bold bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
      
      {/* Score Display */}
      <div className="absolute top-8 right-8 bg-gray-800 p-4 rounded-lg border border-green-500 text-white">
        <div className="text-xl text-green-400 mb-1">Score: {score}</div>
        <div className="text-lg">Total: {totalScore}</div>
      </div>
      
      {/* Instructions */}
      {gameState === 'playing' && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg border border-gray-600 text-white">
          Press SPACEBAR or CLICK to stop the line!
        </div>
      )}
    </div>
  );
};

export default Index;
