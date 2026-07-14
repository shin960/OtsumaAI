const levels = {
  1: [
    { q: '2, 4, 6, 8, ?', choices: ['9', '10', '12', '14'], ans: 2, exp: '2ずつ増えているので次は10です。' },
    { q: '▲ ■ ▲ ■ ▲ ?', choices: ['▲', '■', '●', '◆'], ans: 2, exp: '▲と■が交互に並んでいるので次は■です。' }
  ],
  2: [
    { q: '3, 6, 12, 24, ?', choices: ['36', '48', '50', '60'], ans: 2, exp: '毎回2倍になっています。24×2=48。' },
    { q: 'A, C, E, G, ?', choices: ['H', 'I', 'J', 'K'], ans: 2, exp: 'アルファベットを1文字飛ばしで並べています。' }
  ],
  3: [
    { q: '5人で5分で5個作る。100人なら100個作るのに何分？', choices: ['5分', '20分', '100分', '1分'], ans: 1, exp: '1人が5分で1個作るので、100人なら100個を5分で作れます。' },
    { q: '□→△→○→□→△→？', choices: ['□', '△', '○', '☆'], ans: 3, exp: '□→△→○の繰り返しなので次は○です。' }
  ],
  4: [
    { q: '1=1, 2=4, 3=9, 4=16, 5=?', choices: ['20', '21', '25', '30'], ans: 3, exp: '数字を2乗しています。5²=25。' },
    { q: '3, 6, 11, 18, 27, ?', choices: ['34', '36', '38', '40'], ans: 3, exp: '増える数が3→5→7→9なので次は11。27+11=38。' }
  ],
  5: [
    { q: 'ある家族には父・母・娘がいる。娘には兄弟が2人いる。兄弟には兄弟が1人しかいない。子どもは全部で何人？', choices: ['3', '4', '5', '6'], ans: 1, exp: '子どもは娘1人と兄2人で合計3人です。' },
    { q: '1, 2, 6, 24, 120, ?', choices: ['240', '360', '600', '720'], ans: 4, exp: '階乗の数列です。5!=120なので次は6!=720です。' }
  ]
};

const quizList = Object.entries(levels).flatMap(([level, quizzes]) => quizzes.map((quiz) => ({ ...quiz, level: Number(level) })));
let iq = 100;
let currentIndex = 0;
let gameOver = false;

const screens = document.querySelectorAll('.screen');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const nextButton = document.querySelector('#next-button');
const levelLabel = document.querySelector('#level-label');
const scoreLabel = document.querySelector('#score-label');
const questionCount = document.querySelector('#question-count');
const questionText = document.querySelector('#question-text');
const choices = document.querySelector('#choices');
const feedback = document.querySelector('#feedback');
const progressBar = document.querySelector('#progress-bar');

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle('active', screen.id === id));
}

function startGame() {
  iq = 100;
  currentIndex = 0;
  gameOver = false;
  showScreen('quiz-screen');
  renderQuestion();
}

function renderQuestion() {
  const quiz = quizList[currentIndex];
  levelLabel.textContent = `レベル ${quiz.level}`;
  scoreLabel.textContent = `推定IQ ${iq}`;
  questionCount.textContent = `${currentIndex + 1} / ${quizList.length}`;
  questionText.textContent = quiz.q;
  progressBar.style.width = `${(currentIndex / quizList.length) * 100}%`;
  feedback.hidden = true;
  feedback.className = 'feedback';
  nextButton.hidden = true;
  choices.innerHTML = '';

  quiz.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.type = 'button';
    button.textContent = `${index + 1}. ${choice}`;
    button.addEventListener('click', () => checkAnswer(index + 1, button));
    choices.appendChild(button);
  });
}

function checkAnswer(selected, selectedButton) {
  const quiz = quizList[currentIndex];
  const isCorrect = selected === quiz.ans;
  document.querySelectorAll('.choice').forEach((button, index) => {
    button.disabled = true;
    if (index + 1 === quiz.ans) button.classList.add('correct');
  });

  if (isCorrect) {
    iq += 8;
    feedback.innerHTML = `<strong>⭕ 正解！</strong><br>${quiz.exp}`;
    feedback.classList.add('ok');
  } else {
    iq -= 5;
    gameOver = true;
    selectedButton.classList.add('wrong');
    feedback.innerHTML = `<strong>❌ 不正解</strong><br>正解：${quiz.choices[quiz.ans - 1]}<br>${quiz.exp}`;
    feedback.classList.add('ng');
  }

  scoreLabel.textContent = `推定IQ ${iq}`;
  feedback.hidden = false;
  nextButton.textContent = gameOver || currentIndex === quizList.length - 1 ? '結果を見る' : '次の問題へ';
  nextButton.hidden = false;
}

function showResult() {
  progressBar.style.width = '100%';
  const rank = iq < 90 ? '平均より少し低め' : iq < 110 ? '平均' : iq < 120 ? '平均以上' : iq < 130 ? '優秀' : iq < 140 ? '非常に優秀' : '天才クラス';
  document.querySelector('#result-icon').textContent = gameOver ? '💡' : '🎉';
  document.querySelector('#result-title').textContent = gameOver ? 'ゲームオーバー' : '全レベルクリア！';
  document.querySelector('#result-score').textContent = `あなたの推定IQは ${iq}`;
  document.querySelector('#result-rank').textContent = `判定：${rank}`;
  showScreen('result-screen');
}

nextButton.addEventListener('click', () => {
  if (gameOver || currentIndex === quizList.length - 1) {
    showResult();
    return;
  }
  currentIndex += 1;
  renderQuestion();
});
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
