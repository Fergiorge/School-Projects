import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Volume2, VolumeX, Trophy, Star } from 'lucide-react';

const AnimalFlashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
  const [selectedTheme, setSelectedTheme] = useState('animals');
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);
      }
    };
    
    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, [audioContext]);

  const themes = {
    animals: [
      {
        front: "🐢",
        title: "Turtle",
        back: "I live in water! I have flippers to swim. I love to splash around in ponds and oceans.",
        color: "from-blue-400 to-cyan-500",
        fact: "Lives in water with flippers"
      },
      {
        front: "🐢",
        title: "Tortoise", 
        back: "I live on land! I have strong legs for walking. I love eating plants and moving slowly.",
        color: "from-green-400 to-emerald-500",
        fact: "Lives on land with strong legs"
      },
      {
        front: "🦋",
        title: "Butterfly",
        back: "I fly during the day! I love flowers. I have beautiful colorful wings that help me float in the air.",
        color: "from-pink-400 to-purple-500",
        fact: "Flies during the day"
      },
      {
        front: "🦋",
        title: "Moth",
        back: "I fly at night! I like lights. My wings are usually brown or gray to help me hide.",
        color: "from-amber-700 to-orange-900",
        fact: "Flies at night"
      },
      {
        front: "🐇",
        title: "Rabbit",
        back: "I have long ears! I hop really fast. I love carrots and living in burrows underground.",
        color: "from-orange-400 to-amber-500",
        fact: "Lives in burrows underground"
      },
      {
        front: "🐇",
        title: "Hare",
        back: "I have really long legs and long ears! I run super fast. I live above ground and I'm bigger than my cousin rabbit.",
        color: "from-yellow-400 to-orange-500",
        fact: "Lives above ground, bigger size"
      },
      {
        front: "🐸",
        title: "Frog",
        back: "I have smooth, wet skin! I jump really high. I start as a tadpole in water, then live on land too.",
        color: "from-lime-400 to-green-500",
        fact: "Has smooth, wet skin"
      },
      {
        front: "🦎",
        title: "Lizard",
        back: "I have bumpy, dry skin! I have a long tail and four legs. I like to bask in the sun and hide under rocks.",
        color: "from-emerald-600 to-teal-600",
        fact: "Has bumpy, dry skin and long tail"
      }
    ],
    shapes: [
      {
        front: "🔵",
        title: "Circle",
        back: "I am round like a ball! I have no corners. I can roll and roll!",
        color: "from-blue-400 to-indigo-500",
        fact: "Round with no corners"
      },
      {
        front: "🟥",
        title: "Square",
        back: "I have 4 equal sides! All my corners are the same. I'm like a box!",
        color: "from-red-400 to-rose-500",
        fact: "Has 4 equal sides"
      },
      {
        front: "🔺",
        title: "Triangle",
        back: "I have 3 sides and 3 corners! I'm pointy like a mountain top!",
        color: "from-purple-400 to-pink-500",
        fact: "Has 3 sides and corners"
      },
      {
        front: "⭐",
        title: "Star",
        back: "I have 5 points! I shine bright in the sky at night!",
        color: "from-yellow-400 to-orange-500",
        fact: "Has 5 points"
      },
      {
        front: "❤️",
        title: "Heart",
        back: "I show love! I have two bumps on top and a point at the bottom!",
        color: "from-pink-500 to-red-500",
        fact: "Shows love and care"
      },
      {
        front: "💎",
        title: "Diamond",
        back: "I'm like a square standing on one corner! I sparkle and shine!",
        color: "from-cyan-400 to-blue-500",
        fact: "Square standing on corner"
      }
    ],
    colors: [
      {
        front: "🔴",
        title: "Red",
        back: "I'm the color of apples, fire trucks, and strawberries! I'm bright and bold!",
        color: "from-red-400 to-red-600",
        fact: "Color of apples and fire trucks"
      },
      {
        front: "🔵",
        title: "Blue",
        back: "I'm the color of the sky and ocean! I'm calm and cool!",
        color: "from-blue-400 to-blue-600",
        fact: "Color of sky and ocean"
      },
      {
        front: "🟡",
        title: "Yellow",
        back: "I'm the color of the sun and bananas! I'm bright and happy!",
        color: "from-yellow-400 to-yellow-600",
        fact: "Color of sun and bananas"
      },
      {
        front: "🟢",
        title: "Green",
        back: "I'm the color of grass and leaves! I'm the color of nature!",
        color: "from-green-400 to-green-600",
        fact: "Color of grass and trees"
      },
      {
        front: "🟣",
        title: "Purple",
        back: "I'm the color of grapes and violets! I'm royal and magical!",
        color: "from-purple-400 to-purple-600",
        fact: "Color of grapes"
      },
      {
        front: "🟠",
        title: "Orange",
        back: "I'm the color of oranges and pumpkins! I'm warm and fun!",
        color: "from-orange-400 to-orange-600",
        fact: "Color of oranges and pumpkins"
      }
    ],
    inventions: [
      {
        front: "💡",
        title: "Light Bulb",
        back: "I help you see in the dark! Thomas Edison made me popular. I light up rooms!",
        color: "from-yellow-400 to-amber-500",
        fact: "Helps us see in the dark"
      },
      {
        front: "📞",
        title: "Telephone",
        back: "I help people talk from far away! Alexander Graham Bell invented me!",
        color: "from-green-400 to-emerald-500",
        fact: "Lets us talk to faraway friends"
      },
      {
        front: "✈️",
        title: "Airplane",
        back: "I help people fly in the sky! The Wright Brothers made me fly!",
        color: "from-blue-400 to-cyan-500",
        fact: "Helps us fly in the sky"
      },
      {
        front: "🚗",
        title: "Car",
        back: "I have wheels and help people travel on roads! I'm faster than walking!",
        color: "from-red-400 to-rose-500",
        fact: "Has wheels for road travel"
      },
      {
        front: "📺",
        title: "Television",
        back: "I show pictures and stories! You can watch your favorite shows on me!",
        color: "from-purple-400 to-indigo-500",
        fact: "Shows pictures and stories"
      },
      {
        front: "💻",
        title: "Computer",
        back: "I help you learn, play games, and create! I can do many smart things!",
        color: "from-cyan-400 to-blue-500",
        fact: "Helps us learn and play"
      }
    ]
  };

  const flashcards = themes[selectedTheme];
  const card = flashcards[currentCard];

  // Sound effects using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled || !audioContext) return;
    
    // Resume audio context if it's suspended (browser requirement)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    if (type === 'flip') {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.3;
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } else if (type === 'correct') {
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.3;
      oscillator.start(now);
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      oscillator.stop(now + 0.2);
    } else if (type === 'wrong') {
      oscillator.frequency.value = 300;
      gainNode.gain.value = 0.2;
      oscillator.start(now);
      oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.3);
      oscillator.stop(now + 0.3);
    } else if (type === 'celebration') {
      [600, 800, 1000].forEach((freq, i) => {
        setTimeout(() => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          gain.gain.value = 0.2;
          const time = audioContext.currentTime;
          osc.start(time);
          osc.stop(time + 0.15);
        }, i * 100);
      });
    }
  };

  const handleFlip = () => {
    if (mode === 'quiz') return;
    setIsFlipped(!isFlipped);
    playSound('flip');
    if (!isFlipped) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    }
  };

  const handleNext = () => {
    if (currentCard === flashcards.length - 1 && mode === 'quiz') {
      playSound('celebration');
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setMode('learn');
        setCurrentCard(0);
        setQuizScore(0);
      }, 3000);
    } else {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
      setIsFlipped(false);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleReset = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setQuizScore(0);
    setQuizAnswered(false);
    setSelectedAnswer(null);
  };

  const handleQuizAnswer = (answerIndex) => {
    if (quizAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setQuizAnswered(true);
    
    if (answerIndex === currentCard) {
      playSound('correct');
      setQuizScore(quizScore + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    } else {
      playSound('wrong');
    }
  };

  const getQuizOptions = () => {
    const options = [currentCard];
    while (options.length < 3) {
      const randomIndex = Math.floor(Math.random() * flashcards.length);
      if (!options.includes(randomIndex)) {
        options.push(randomIndex);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const quizOptions = mode === 'quiz' ? getQuizOptions() : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-purple-800 flex items-center gap-2">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
            Discovery Cards
          </h1>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="bg-white p-3 md:p-4 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            {soundEnabled ? 
              <Volume2 className="w-6 h-6 md:w-8 md:h-8 text-purple-600" /> : 
              <VolumeX className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            }
          </button>
        </div>

        {/* Theme Selector */}
        <div className="mb-6 flex flex-wrap gap-3 justify-center">
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => {
                setSelectedTheme(theme);
                setCurrentCard(0);
                setIsFlipped(false);
                setMode('learn');
                setQuizScore(0);
              }}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-lg md:text-xl font-bold shadow-lg transition-all ${
                selectedTheme === theme
                  ? 'bg-purple-600 text-white scale-105'
                  : 'bg-white text-purple-600 hover:scale-105'
              }`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>

        {/* Mode Selector */}
        <div className="mb-6 flex gap-3 justify-center">
          <button
            onClick={() => {
              setMode('learn');
              setCurrentCard(0);
              setIsFlipped(false);
              setQuizScore(0);
            }}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-xl text-xl md:text-2xl font-bold shadow-lg transition-all ${
              mode === 'learn'
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-blue-600 hover:scale-105'
            }`}
          >
            📚 Learn Mode
          </button>
          <button
            onClick={() => {
              setMode('quiz');
              setCurrentCard(0);
              setIsFlipped(false);
              setQuizScore(0);
              setQuizAnswered(false);
            }}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-xl text-xl md:text-2xl font-bold shadow-lg transition-all ${
              mode === 'quiz'
                ? 'bg-green-600 text-white scale-105'
                : 'bg-white text-green-600 hover:scale-105'
            }`}
          >
            🎯 Quiz Mode
          </button>
        </div>

        {mode === 'quiz' && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl md:text-3xl font-bold text-purple-800">
                Score: {quizScore} / {flashcards.length}
              </span>
            </div>
          </div>
        )}

        <div className="mb-6 flex justify-center gap-2">
          {flashcards.map((_, index) => (
            <div
              key={index}
              className={`h-2 md:h-3 w-2 md:w-3 rounded-full transition-all ${
                index === currentCard 
                  ? 'bg-purple-600 w-6 md:w-8' 
                  : 'bg-purple-300'
              }`}
            />
          ))}
        </div>

        {mode === 'learn' ? (
          <div className="perspective-1000 mb-8">
            <div
              onClick={handleFlip}
              className={`relative w-full h-80 md:h-96 cursor-pointer transition-transform duration-700 ${
                isFlipped ? 'scale-105' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`absolute w-full h-full rounded-3xl shadow-2xl bg-gradient-to-br ${card.color} flex flex-col items-center justify-center border-4 md:border-8 border-white transition-opacity duration-700 ${
                  isFlipped ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="text-7xl md:text-9xl mb-4 animate-bounce">{card.front}</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                  {card.title}
                </h2>
                <p className="text-xl md:text-2xl text-white mt-4 font-medium">Tap to learn!</p>
              </div>

              <div
                className={`absolute w-full h-full rounded-3xl shadow-2xl bg-gradient-to-br ${card.color} flex items-center justify-center p-6 md:p-8 border-4 md:border-8 border-white transition-opacity duration-700 ${
                  isFlipped ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-2xl md:text-3xl text-white text-center leading-relaxed font-medium drop-shadow-md">
                  {card.back}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className={`w-full h-80 md:h-96 rounded-3xl shadow-2xl bg-gradient-to-br ${card.color} flex flex-col items-center justify-center border-4 md:border-8 border-white mb-6`}>
              <p className="text-2xl md:text-3xl text-white text-center px-6 mb-8 font-bold drop-shadow-lg">
                {card.fact}
              </p>
              <p className="text-xl md:text-2xl text-white font-medium">Which one am I?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quizOptions.map((optionIndex) => {
                const option = flashcards[optionIndex];
                const isCorrect = optionIndex === currentCard;
                const isSelected = selectedAnswer === optionIndex;
                
                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleQuizAnswer(optionIndex)}
                    disabled={quizAnswered}
                    className={`p-6 md:p-8 rounded-2xl shadow-xl transition-all font-bold text-xl md:text-2xl ${
                      quizAnswered
                        ? isCorrect
                          ? 'bg-green-500 text-white scale-105'
                          : isSelected
                          ? 'bg-red-400 text-white'
                          : 'bg-gray-300 text-gray-600'
                        : 'bg-white hover:scale-105 hover:shadow-2xl'
                    }`}
                  >
                    <div className="text-5xl md:text-6xl mb-3">{option.front}</div>
                    <div>{option.title}</div>
                    {quizAnswered && isCorrect && (
                      <div className="text-3xl md:text-4xl mt-2">✓</div>
                    )}
                    {quizAnswered && isSelected && !isCorrect && (
                      <div className="text-3xl md:text-4xl mt-2">✗</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {showCelebration && (
          <div className="text-center mb-4 animate-bounce">
            <span className="text-5xl md:text-6xl">🎉 ⭐ 🎊 ✨</span>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {(!quizAnswered || mode === 'learn') && (
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl text-xl md:text-2xl font-bold shadow-lg flex items-center gap-3 transition-all hover:scale-105"
            >
              Next
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}
          
          {quizAnswered && mode === 'quiz' && (
            <button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl text-xl md:text-2xl font-bold shadow-lg flex items-center gap-3 transition-all hover:scale-105"
            >
              {currentCard === flashcards.length - 1 ? 'Finish!' : 'Next Question'}
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl text-xl md:text-2xl font-bold shadow-lg flex items-center gap-3 transition-all hover:scale-105"
          >
            <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
            Start Over
          </button>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <p className="text-lg md:text-xl text-purple-700 font-medium">
            Card {currentCard + 1} of {flashcards.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalFlashcards;