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

const Index = () => {
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
  const targetPosition = 300;

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* Game Container */}
      <div className="relative w-full h-screen">
        {/* Target Line */}
        <div 
          className="absolute left-0 w-full h-1 border-t-2 border-dotted border-red-500"
          style={{ top: `${targetPosition}px` }}
        />
        
        {/* Falling Line */}
        {gameState.isGameActive && (
          <div
            className="absolute left-1/2 w-2 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-lg shadow-green-400/50 transform -translate-x-1/2 transition-all duration-100 ease-out"
            style={{ top: `${gameState.linePosition}px` }}
          />
        )}

        {/* Start Button */}
        {!gameState.isGameActive && !gameState.showResult && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg">
              LINE DROP
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-md">
              Stop the falling line exactly on the target to score points!
            </p>
            <button
              onClick={startGame}
              className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 border-2 border-green-400"
            >
              PLAY NOW
            </button>
          </div>
        )}

        {/* Play Again Button */}
        {gameState.showResult && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <div className="bg-black/90 p-10 rounded-2xl border-2 border-green-400 mb-8">
              <div className="text-2xl text-white mb-4">
                {gameState.resultMessage}
              </div>
              <div className="text-5xl text-green-400 font-bold">
                {gameState.resultScore}
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 border-2 border-green-400"
            >
              PLAY AGAIN
            </button>
          </div>
        )}

        {/* Score Display */}
        <div className="absolute top-8 right-8 bg-black/80 p-6 rounded-xl border-2 border-green-400 backdrop-blur-sm">
          <div className="text-3xl text-green-400 font-bold mb-2">
            Score: {gameState.currentScore}
          </div>
          <div className="text-xl text-white">
            Total: {gameState.totalScore}
          </div>
        </div>

        {/* Instructions */}
        {gameState.isGameActive && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 p-4 rounded-xl border border-gray-600 backdrop-blur-sm">
            <div className="text-lg text-gray-300 font-medium">
              Press SPACEBAR or CLICK to stop the line!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
