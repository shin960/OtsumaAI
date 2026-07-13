const API_URL = "https://ghibliapi.vercel.app/films";

let films = [];
let currentFilm = null;

// -------------------------
// 日本語タイトル辞書
// -------------------------
const jpTitles = {
    "My Neighbor Totoro": "となりのトトロ",
    "Spirited Away": "千と千尋の神隠し",
    "Castle in the Sky": "天空の城ラピュタ",
    "Kiki's Delivery Service": "魔女の宅急便",
    "Princess Mononoke": "もののけ姫",
    "Howl's Moving Castle": "ハウルの動く城",
    "Ponyo": "崖の上のポニョ",
    "The Wind Rises": "風立ちぬ",
    "When Marnie Was There": "思い出のマーニー",
    "The Secret World of Arrietty": "借りぐらしのアリエッティ",
    "Porco Rosso": "紅の豚",
    "Pom Poko": "平成狸合戦ぽんぽこ",
    "Whisper of the Heart": "耳をすませば",
    "The Cat Returns": "猫の恩返し",
     "Nausicaa of the Valley of the Wind": "風の谷のナウシカ",
    "Castle in the Sky": "天空の城ラピュタ",
    "Grave of the Fireflies": "火垂るの墓",
    "My Neighbor Totoro": "となりのトトロ",
    "Kiki's Delivery Service": "魔女の宅急便",
    "Only Yesterday": "おもひでぽろぽろ",
    "Porco Rosso": "紅の豚",
    "Ocean Waves": "海がきこえる",
    "Pom Poko": "平成狸合戦ぽんぽこ",
    "Whisper of the Heart": "耳をすませば",
    "Princess Mononoke": "もののけ姫",
    "My Neighbors the Yamadas": "ホーホケキョ となりの山田くん",
    "Spirited Away": "千と千尋の神隠し",
    "The Cat Returns": "猫の恩返し",
    "Howl's Moving Castle": "ハウルの動く城",
    "Tales from Earthsea": "ゲド戦記",
    "Ponyo": "崖の上のポニョ",
    "Arrietty": "借りぐらしのアリエッティ",
    "From Up on Poppy Hill": "コクリコ坂から",
    "The Wind Rises": "風立ちぬ",
    "The Tale of the Princess Kaguya": "かぐや姫の物語",
    "When Marnie Was There": "思い出のマーニー"
};

// -------------------------
// 日本語あらすじ辞書（短め）
// -------------------------
const jpDescriptions = {
     "Nausicaa of the Valley of the Wind": "腐海に覆われた世界で、ナウシカが自然と人間の共存を探し続ける冒険物語。",
    "Castle in the Sky": "空に浮かぶ伝説の城ラピュタを巡り、シータとパズーが危険に立ち向かう冒険ファンタジー。",
    "Grave of the Fireflies": "戦時下で生きる兄妹が、過酷な運命の中で必死に生き抜こうとする感動の物語。",
    "My Neighbor Totoro": "田舎に引っ越した姉妹が、不思議な生き物トトロと出会い心温まる冒険を体験する物語。",
    "Kiki's Delivery Service": "魔女のキキが新しい街で宅配屋を始め、成長していく姿を描く物語。",
    "Only Yesterday": "都会で働く女性が田舎での生活を通して自分の生き方を見つめ直す物語。",
    "Porco Rosso": "豚の姿になった飛行艇乗りポルコが、空賊との戦いと過去に向き合う大人向けの冒険活劇。",
    "Ocean Waves": "高校生たちの恋と友情を繊細に描いた青春ドラマ。",
    "Pom Poko": "人間に森を奪われたタヌキたちが、変化術で故郷を守ろうと奮闘する物語。",
    "Whisper of the Heart": "読書好きの少女・雫が恋と夢に向き合い、自分の道を探す青春ストーリー。",
    "Princess Mononoke": "自然と人間の争いの中で、アシタカが共存の道を探し続ける壮大な叙事詩。",
    "My Neighbors the Yamadas": "山田家の日常をユーモラスに描いた家族コメディ。",
    "Spirited Away": "神々の世界に迷い込んだ少女・千尋が、働きながら元の世界へ戻る方法を探す成長物語。",
    "The Cat Returns": "猫の国に連れ去られた女子高生ハルが、自分らしさを取り戻す冒険物語。",
    "Howl's Moving Castle": "呪いで老婆になったソフィーが、魔法使いハウルと共に自分の運命を切り開く物語。",
    "Tales from Earthsea": "不安定な世界で、少年アレンが大賢人ゲドと共に真実を探すファンタジー。",
    "Ponyo": "人間になりたい魚の少女ポニョと宗介の出会いが世界に変化をもたらす物語。",
    "Arrietty": "小人の少女アリエッティと人間の少年翔が、種族を越えて心を通わせる物語。",
    "From Up on Poppy Hill": "横浜の高校生たちが、古い部室棟を守ろうと奮闘する青春ドラマ。",
    "The Wind Rises": "飛行機設計士・堀越二郎が夢と現実の狭間で生きた人生を描く物語。",
    "The Tale of the Princess Kaguya": "竹から生まれた少女かぐや姫の成長と運命を描く美しい物語。",
    "When Marnie Was There": "心を閉ざした杏奈が、湖畔で出会った少女マーニーとの交流を通して自分を取り戻す物語。"
};

// -------------------------
// 日本語ポスター画像
// -------------------------
const postersJP = {
    "Nausicaa of the Valley of the Wind": "https://image.tmdb.org/t/p/w500/qz9g6QxXHzkwmo7aX6ixSeKuuNH.jpg",
    "Castle in the Sky": "https://image.tmdb.org/t/p/w500/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
    "Grave of the Fireflies": "https://image.tmdb.org/t/p/w500/4u1vptE8ZpQbZPp1r7DiIPeKxZ1.jpg",
    "My Neighbor Totoro": "https://image.tmdb.org/t/p/w500/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
    "Kiki's Delivery Service": "https://image.tmdb.org/t/p/w500/9gj7F6h3lC1uQW2LaxhUJQ6n7W.jpg",
    "Only Yesterday": "https://image.tmdb.org/t/p/w500/2x8MtwzJHqvZEBtcHTfb3e8DqgC.jpg",
    "Porco Rosso": "https://image.tmdb.org/t/p/w500/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg",
    "Ocean Waves": "https://image.tmdb.org/t/p/w500/8YwZqSEuxsjjXNMTvEihQ6UkNzx.jpg",
    "Pom Poko": "https://image.tmdb.org/t/p/w500/8pEJHqS0bkkCm1cW0wwfsKADVY6.jpg",
    "Whisper of the Heart": "https://image.tmdb.org/t/p/w500/3rVQ6nPxhF2Pz9vywgqbiZ9erjR.jpg",
    "Princess Mononoke": "https://image.tmdb.org/t/p/w500/jHWkK0p0Z3hZ7YkqYh7G4x5w2X.jpg",
    "My Neighbors the Yamadas": "https://image.tmdb.org/t/p/w500/8fZc2iZ5WQmQxGc1dQc5sKXc5te.jpg",
    "Spirited Away": "https://image.tmdb.org/t/p/w500/2TeJfUZ6X1vLq7fIGhG2v2FpdXb.jpg",
    "The Cat Returns": "https://image.tmdb.org/t/p/w500/4LwPpS7Z1xXLSMZUMtO4Okzp1Fl.jpg",
    "Howl's Moving Castle": "https://image.tmdb.org/t/p/w500/TkTPELv4kC3u1lkloush8skOjE.jpg",
    "Tales from Earthsea": "https://image.tmdb.org/t/p/w500/3Yz7n2AFDzy83H8XTur2qxGn8pY.jpg",
    "Ponyo": "https://image.tmdb.org/t/p/w500/yp8vEZflGynlEylxEesbYasc06i.jpg",
    "Arrietty": "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    "From Up on Poppy Hill": "https://image.tmdb.org/t/p/w500/8ZpLxgxYkWwaP42QikIze8ihc5A.jpg",
    "The Wind Rises": "https://image.tmdb.org/t/p/w500/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg",
    "The Tale of the Princess Kaguya": "https://image.tmdb.org/t/p/w500/8ZpLxgxYkWwaP42QikIze8ihc5A.jpg",
    "When Marnie Was There": "https://image.tmdb.org/t/p/w500/2r0d1K0uQeFkC6qJrWUE3oGN28l.jpg"
};

// HTML要素
const questionText = document.getElementById("questionText");
const choicesDiv = document.getElementById("choices");
const resultText = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

// -------------------------
// データ取得
// -------------------------
async function loadFilms() {
    const res = await fetch(API_URL);
    films = await res.json();
    nextQuestion();
}

loadFilms();

// -------------------------
// あらすじの一部をランダムに切り取る
// -------------------------
function getRandomExcerpt(text) {
    const words = text.split(" ");
    if (words.length < 20) return text;
    const start = Math.floor(Math.random() * (words.length - 20));
    return words.slice(start, start + 20).join(" ") + " ...";
}

// -------------------------
// 新しい問題を作成
// -------------------------
function nextQuestion() {
    resultText.textContent = "";
    nextBtn.classList.add("hidden");
    choicesDiv.innerHTML = "";
    document.getElementById("infoBox").classList.add("hidden");

    currentFilm = films[Math.floor(Math.random() * films.length)];

    // 日本語あらすじ
    const excerpt = getRandomExcerpt(jpDescriptions[currentFilm.title]);
    questionText.textContent = `このあらすじの作品名は？\n\n「${excerpt}」`;

    // 日本語タイトルの選択肢
    let choices = [jpTitles[currentFilm.title]];

    while (choices.length < 3) {
        const randomFilm = films[Math.floor(Math.random() * films.length)].title;
        const jp = jpTitles[randomFilm];
        if (!choices.includes(jp)) choices.push(jp);
    }

    choices.sort(() => Math.random() - 0.5);

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice;
        btn.addEventListener("click", () => checkAnswer(choice));
        choicesDiv.appendChild(btn);
    });
}

// -------------------------
// 回答チェック
// -------------------------

function checkAnswer(selected) {
    if (selected === jpTitles[currentFilm.title]) {
        resultText.textContent = `正解！「${jpTitles[currentFilm.title]}」`;
        resultText.style.color = "green";
         // ★ 正解したら紙吹雪を飛ばす
        startConfetti();
             {
    const main = document.getElementById("mainScreen");
    const correct = document.getElementById("correctScreen");

  
     // ★ 正解でも次へボタンを表示
        nextBtn.classList.remove("hidden");
}
    } else {
        resultText.textContent = `不正解… 正解は「${jpTitles[currentFilm.title]}」`;
        resultText.style.color = "red";
    }

    nextBtn.classList.remove("hidden");

    const posterImg = document.getElementById("poster");
    posterImg.src = postersJP[currentFilm.title] || "";
    // ★ 画像が読み込めなかった場合の処理（ここに入れる）
    posterImg.onerror = () => {
    posterImg.src = postersEN[currentFilm.title] || "fallback.jpg";
    };

    const infoText = document.getElementById("infoText");
    infoText.innerHTML = `
        <strong>監督：</strong>${currentFilm.director}<br>
        <strong>公開年：</strong>${currentFilm.release_date}<br>
        <strong>上映時間：</strong>${currentFilm.running_time}分
    `;

    document.getElementById("infoBox").classList.remove("hidden");
}

// 次の問題へ
nextBtn.addEventListener("click", nextQuestion);

function startConfetti() {
    const confettiCount = 150;
    const colors = ["#ffcc00", "#ff6666", "#66ccff", "#99ff99", "#ff99cc"];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 3) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

