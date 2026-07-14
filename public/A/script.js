// ==============================
// キャラクター何歳クイズ
// Part1
// 問題データ・初期設定
// ==============================

// 問題データ
const quiz = [

{
question:"ドラえもんは何歳？",
choices:["5歳","10歳","-90歳","120歳"],
answer:2,
correct:"-90歳"
},

{
question:"ピカチュウは何歳？",
choices:["1歳","5歳","公式設定なし","20歳"],
answer:2,
correct:"公式設定なし"
},

{
question:"江戸川コナンは何歳？",
choices:["7歳","10歳","17歳","15歳"],
answer:2,
correct:"17歳"
},

{
question:"クレヨンしんちゃんは何歳？",
choices:["3歳","5歳","7歳","10歳"],
answer:1,
correct:"5歳"
},

{
question:"サザエさんは何歳？",
choices:["24歳","30歳","35歳","40歳"],
answer:0,
correct:"24歳"
},

{
question:"ミッキーマウスは何歳？",
choices:["18歳","公式設定なし","30歳","90歳"],
answer:1,
correct:"公式設定なし"
},

{
question:"スポンジ・ボブは何歳？",
choices:["20歳","13歳","公式設定なし","50歳"],
answer:2,
correct:"公式設定なし"
},

{
question:"アリエルは何歳？",
choices:["16歳","18歳","20歳","22歳"],
answer:0,
correct:"16歳"
},

{
question:"エルサは何歳？",
choices:["18歳","21歳","24歳","30歳"],
answer:1,
correct:"21歳"
},

{
question:"ハローキティは何歳？",
choices:["5歳","公式設定なし","永遠の5歳ではない","設定なし"],
answer:1,
correct:"公式設定なし"
},
{
question:"ベルは何歳？",
choices:["16歳","17歳","18歳","19歳"],
answer:1,
correct:"17歳"
},
{
question:"アナは何歳？",
choices:["18歳","19歳","20歳","21歳"],
answer:0,
correct:"18歳"
},
{
question:"ラプンツェルは何歳？",
choices:["17歳","18歳","19歳","20歳"],
answer:1,
correct:"18歳"
},
{
question:"白雪姫は何歳？",
choices:["14歳","16歳","18歳","20歳"],
answer:0,
correct:"14歳"
},
{
question:"シンデレラは何歳？",
choices:["17歳","18歳","19歳","20歳"],
answer:2,
correct:"19歳"
}

];

// ==============================
// 問題をランダムに並び替え
// ==============================

quiz.sort(() => Math.random() - 0.5);

// ==============================
// ゲーム用変数
// ==============================

let hp = 3;

let score = 0;

let current = 0;

let gameStarted = false;

let background = "pink";
// ==============================
// Part2
// ゲーム開始
// ==============================

function startGame(){

    gameStarted = true;

    // タイトル画面を消す
    document.getElementById("startScreen").style.display = "none";

    // ゲーム画面を表示
    document.getElementById("gameScreen").style.display = "block";

    // 初期表示
    updateHP();
    updateScore();

    showQuiz();

}

// ==============================
// 背景変更
// ==============================

function changeBackground(color){

    background = color;

    document.body.className = color;

}
// タイマー

let timer;

let timeLeft = 10;

// ==============================
// HP表示
// ==============================

function updateHP(){

    let heart = "";

    for(let i=0;i<hp;i++){

        heart += "❤️";

    }

    for(let i=0;i<3-hp;i++){

        heart += "🖤";

    }

    document.getElementById("hp").innerHTML = heart;

}

// ==============================
// スコア表示
// ==============================

function updateScore(){

    document.getElementById("score").innerHTML =
    `正解数：${score}`;

}
// ==============================
// Part3
// 問題表示
// ==============================

function showQuiz(){

    // 全問終了
    if(current >= quiz.length){

        showResult();

        return;

    }

    // 問題番号
    document.getElementById("progress").innerHTML =
    `第 ${current + 1} 問 / ${quiz.length} 問`;

    // 問題文
    document.getElementById("question").innerHTML =
    quiz[current].question;

    // メッセージを消す
    document.getElementById("message").innerHTML = "";

    // 選択肢
    let html = "";

    quiz[current].choices.forEach((choice,index)=>{

        html += `
        <button onclick="check(${index})">
            ${choice}
        </button>
        `;

    });

    document.getElementById("choices").innerHTML = html;

    updateHP();

    updateScore();

}
// ==============================
// Part4
// 正解・不正解
// ==============================

function check(index){

    // ボタンを押したら連打できないようにする
    const buttons = document.querySelectorAll("#choices button");

    buttons.forEach(button => {

        button.disabled = true;

    });

    // 正解だった場合
    if(index === quiz[current].answer){

        score++;

        updateScore();

        document.getElementById("message").innerHTML =
        `<span class="correct">⭕ 正解！</span>`;

        current++;

        setTimeout(()=>{

            showQuiz();

        },1200);

    }

    // 不正解だった場合
    else{

        hp--;

        updateHP();

        document.getElementById("message").innerHTML =
        `<span class="wrong">
        ❌ 不正解！<br>
        正解は「${quiz[current].correct}」です！
        </span>`;

        current++;

        // HPが0ならゲームオーバー
        if(hp <= 0){

            setTimeout(()=>{

                gameOver();

            },1800);

            return;

        }

        // 次の問題へ
        setTimeout(()=>{

            showQuiz();

        },1800);

    }

}
// ==============================
// Part5
// ゲームオーバー
// ==============================

function gameOver(){

    document.getElementById("gameScreen").style.display="none";

    document.getElementById("gameOverScreen").style.display="block";

    document.getElementById("gameOverScore").innerHTML=

    `
    <h2>${score} / ${quiz.length} 問正解！</h2>
    <p>またチャレンジしてね😊</p>
    `;

}

// ==============================
// リザルト
// ==============================

function showResult(){

    document.getElementById("gameScreen").style.display="none";

    document.getElementById("resultScreen").style.display="block";

    let rank="";
    let rankClass="";

    const percent=Math.round(score/quiz.length*100);

    if(percent==100){

        rank="🏆 SS";
        rankClass="ss";

    }

    else if(percent>=90){

        rank="🥇 S";
        rankClass="s";

    }

    else if(percent>=80){

        rank="🥈 A";
        rankClass="a";

    }

    else if(percent>=60){

        rank="🥉 B";
        rankClass="b";

    }

    else if(percent>=40){

        rank="😊 C";
        rankClass="c";

    }

    else{

        rank="💪 D";
        rankClass="d";

    }

    document.getElementById("resultText").innerHTML=

    `
    ${quiz.length}問中

    <br><br>

    ${score}問正解！

    <br><br>

    正答率 ${percent}%
    `;

    const rankElement=document.getElementById("rank");

    rankElement.className=rankClass;

    rankElement.innerHTML=rank;

}
// ==============================
// Part6
// リスタート
// ==============================

function restart(){

    // 初期化
    hp = 3;

    score = 0;

    current = 0;

    gameStarted = false;

    // 問題をシャッフル
    quiz.sort(() => Math.random() - 0.5);

    // 画面切り替え
    document.getElementById("resultScreen").style.display = "none";

    document.getElementById("gameOverScreen").style.display = "none";

    document.getElementById("gameScreen").style.display = "none";

    document.getElementById("startScreen").style.display = "block";

    // 表示を初期化
    document.getElementById("message").innerHTML = "";

    document.getElementById("choices").innerHTML = "";

    document.getElementById("question").innerHTML = "";

    document.getElementById("progress").innerHTML = "";

    updateHP();

    updateScore();

}

// ==============================
// ページを開いたとき
// ==============================

window.onload = function(){

    updateHP();

    updateScore();

};