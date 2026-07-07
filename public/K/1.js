function decideFood(){


const budget =
document.getElementById("budget").value;


const mood =
document.getElementById("mood").value;



const foods={


low:{


light:[
"🥗 サラダ",
"🍙 おにぎり",
"🥣 ヨーグルト",
"🍲 スープ"
],


heavy:[
"🍜 カップラーメン",
"🥩 牛丼",
"🍱 コンビニ弁当"
]


},



high:{


light:[
"🍝 パスタ",
"☕ カフェごはん",
"🥞 パンケーキ"
],


heavy:[
"🍣 寿司",
"🥩 焼肉",
"🍜 ラーメン"
]


}


};




const comments={

"🥗 サラダ":"健康的で最高！",

"🍙 おにぎり":"シンプルイズベスト！",

"🥣 ヨーグルト":"お腹に優しい！",

"🍲 スープ":"ほっとするね！",

"🍜 カップラーメン":"今日は楽してOK！",

"🥩 牛丼":"安定のおいしさ！",

"🍱 コンビニ弁当":"たまにはいい！",

"🍝 パスタ":"おしゃれ気分！",

"☕ カフェごはん":"優雅な時間！",

"🥞 パンケーキ":"甘いもの最高！",

"🍣 寿司":"ご褒美すぎる！",

"🥩 焼肉":"スタミナ満点！",

"🍜 ラーメン":"ガッツリ最高！"

};




let list=[];



if(budget==="all"){


list=[

...foods.low.light,
...foods.low.heavy,
...foods.high.light,
...foods.high.heavy

];


}else{


list=foods[budget][mood];


}




const wheel=
document.getElementById("wheel");



// 5回転 + ランダム角度

const angle =
360 * 5 +
Math.floor(Math.random()*360);



wheel.style.transform=
`rotate(${angle}deg)`;



document.getElementById("result").innerText=
"🎲 考え中...";


document.getElementById("comment").innerText="";





setTimeout(()=>{


const final =
list[Math.floor(Math.random()*list.length)];


document.getElementById("result").innerText=
final;


document.getElementById("comment").innerText=
comments[final];


},5000);



}