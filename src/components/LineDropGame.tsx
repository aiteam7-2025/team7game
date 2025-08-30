import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GameState {
  isGameActive: boolean;
  linePosition: number;
  currentScore: number;
  totalScore: number;
  showResult: boolean;
  resultMessage: string;
  resultScore: number;
}

const LineDropGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isGameActive: false,
    linePosition: 0,
    currentScore: 0,
    totalScore: 0,
    showResult: false,
    resultMessage: '',
    resultScore: 0
  });

  const animationRef = useRef<number | null>(null);
  const targetPosition = 300; // Fixed target position for consistency

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isGameActive: true,
      linePosition: 0,
      showResult: false
    }));
  }, []);

  const stopLine = useCallback(() => {
    if (!gameState.isGameActive) return;

    const distance = Math.abs(gameState.linePosition - targetPosition);
    let score = 0;
    let message = '';

    if (distance <= 5) {
      score = 100;
      message = 'Perfect!';
    } else if (distance <= 15) {
      score = 75;
      message = 'Great!';
    } else if (distance <= 30) {
      score = 50;
      message = 'Good!';
    } else if (distance <= 50) {
      score = 25;
      message = 'Close!';
    } else {
      score = 0;
      message = 'Miss!';
    }

    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      currentScore: score,
      totalScore: prev.totalScore + score,
      showResult: true,
      resultMessage: message,
      resultScore: score
    }));

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [gameState.isGameActive, gameState.linePosition]);

  const animateLine = useCallback(() => {
    if (!gameState.isGameActive) return;

    setGameState(prev => {
      const newPosition = prev.linePosition + 2;
      
      if (newPosition >= targetPosition + 100) {
        // Line passed the target
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return {
          ...prev,
          isGameActive: false,
          showResult: true,
          resultMessage: 'Miss!',
          resultScore: 0
        };
      }

      return {
        ...prev,
        linePosition: newPosition
      };
    });

    animationRef.current = requestAnimationFrame(animateLine);
  }, [gameState.isGameActive]);

  useEffect(() => {
    if (gameState.isGameActive) {
      animationRef.current = requestAnimationFrame(animateLine);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.isGameActive, animateLine]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' && gameState.isGameActive) {
      e.preventDefault();
      stopLine();
    }
  }, [gameState.isGameActive, stopLine]);

  const handleClick = useCallback(() => {
    if (gameState.isGameActive) {
      stopLine();
    }
  }, [gameState.isGameActive, stopLine]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [handleKeyPress, handleClick]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Game Container */}
      <div className="relative w-full h-screen">
        {/* Target Line */}
        <div 
          className="absolute left-0 w-full h-0.5 border-t-2 border-dotted border-red-400"
          style={{ top: `${targetPosition}px` }}
        />
        
        {/* Falling Line */}
        {gameState.isGameActive && (
          <div
            className="absolute left-1/2 w-1 h-15 bg-gradient-to-b from-green-400 to-green-600 rounded shadow-lg shadow-green-400/50 transform -translate-x-1/2 transition-all duration-100 ease-out"
            style={{ top: `${gameState.linePosition}px` }}
          />
        )}

        {/* Start Button */}
        {!gameState.isGameActive && !gameState.showResult && (
          <button
            onClick={startGame}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-gray-900 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 z-10"
          >
            Start Game
          </button>
        )}

        {/* Play Again Button */}
        {gameState.showResult && (
          <button
            onClick={startGame}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-gray-900 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 z-10"
          >
            Play Again
          </button>
        )}

        {/* Score Display */}
        <div className="absolute top-5 right-5 bg-black/70 p-4 rounded-lg border border-green-400">
          <div className="text-2xl text-green-400 mb-1">
            Score: {gameState.currentScore}
          </div>
          <div className="text-lg text-white">
            Total: {gameState.totalScore}
          </div>
        </div>

        {/* Round Result */}
        {gameState.showResult && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 p-8 rounded-xl border-2 border-green-400 text-center z-5">
            <div className="text-lg text-white mb-5">
              {gameState.resultMessage}
            </div>
            <div className="text-3xl text-green-400 mb-5">
              Score: {gameState.resultScore}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black/70 p-4 rounded-lg border border-gray-600">
          <div className="text-sm text-gray-300">
            Press SPACEBAR or CLICK to stop the falling line on the target
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineDropGame;
