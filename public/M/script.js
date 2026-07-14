const photoSets = {
  カジュアル: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1000&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=80'
  ],
  きれいめ: [
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1000&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1000&q=80',
    'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=1000&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&q=80'
  ],
  フェミニン: [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=80',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1000&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1000&q=80',
    'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=1000&q=80'
  ],
  ストリート: [
    'https://images.unsplash.com/photo-1506629905607-d9cf40e0a418?w=1000&q=80',
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1000&q=80',
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1000&q=80&fit=crop&crop=entropy',
    'https://images.unsplash.com/photo-1506629905607-d9cf40e0a418?w=1000&q=80&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1000&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80'
  ],
  モード: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80&sat=-60',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1000&q=80&sat=-50',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1000&q=80&sat=-50',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1000&q=80&sat=-50',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80&sat=-50',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=80&sat=-40'
  ]
};

const itemPlans = {
  カジュアル: {
    tops: ['ロゴTシャツ', 'ボーダーカットソー', 'スウェット', 'リネンシャツ'],
    bottoms: ['ストレートデニム', 'チノパン', 'カーゴパンツ', 'ワイドパンツ'],
    shoes: ['白スニーカー', 'ローテクスニーカー', 'スポーツサンダル'],
    bag: ['キャンバストート', 'ミニショルダー', 'バックパック'],
    accessory: ['キャップ', '腕時計', '細めのネックレス']
  },
  きれいめ: {
    tops: ['とろみブラウス', 'ニットポロ', '無地シャツ', 'ハイゲージニット'],
    bottoms: ['センタープレスパンツ', 'タイトスカート', 'スラックス', '落ち感ワイドパンツ'],
    shoes: ['ローファー', 'パンプス', 'レザースニーカー'],
    bag: ['レザートート', 'スクエアバッグ', '小さめハンドバッグ'],
    accessory: ['パールピアス', '細ベルト', 'シンプルな腕時計']
  },
  フェミニン: {
    tops: ['袖コンシャスブラウス', 'リブニット', 'シアートップス', 'カーディガン'],
    bottoms: ['フレアスカート', 'マーメイドスカート', '淡色ワイドパンツ'],
    shoes: ['バレエシューズ', 'ストラップサンダル', 'ショートブーツ'],
    bag: ['ミニバッグ', '丸みのあるショルダー', 'かごバッグ'],
    accessory: ['リボンアクセ', '華奢なリング', 'スカーフ']
  },
  ストリート: {
    tops: ['オーバーサイズT', 'フーディー', 'プリントシャツ', 'トラックジャケット'],
    bottoms: ['カーゴパンツ', 'バギーデニム', 'ハーフパンツ', 'ジョガーパンツ'],
    shoes: ['ボリュームスニーカー', 'ハイカットスニーカー', '厚底シューズ'],
    bag: ['クロスボディバッグ', 'ウエストバッグ', 'ナップサック'],
    accessory: ['ビーニー', 'チェーンネックレス', 'サングラス']
  },
  モード: {
    tops: ['黒シャツ', 'アシンメトリートップス', 'ハイネックカットソー', '構築的ジャケット'],
    bottoms: ['ブラックワイドパンツ', 'Iラインスカート', 'レザーパンツ', 'タックパンツ'],
    shoes: ['スクエアトゥブーツ', '厚底ローファー', 'ミニマルスニーカー'],
    bag: ['ブラッククラッチ', 'メタリックバッグ', '縦長ショルダー'],
    accessory: ['シルバーアクセ', '太めバングル', '黒縁メガネ']
  }
};

const outerBySeason = {
  春: ['ライトトレンチ', 'デニムジャケット', '薄手カーディガン'],
  夏: ['不要。冷房対策に薄手シャツ', 'シアーカーディガン', 'UVカットパーカー'],
  秋: ['テーラードジャケット', 'ブルゾン', 'ニットカーディガン'],
  冬: ['ウールコート', 'ダウンジャケット', '中綿ブルゾン']
};

let variant = 0;
const form = document.querySelector('#coordinateForm');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');

function pick(list, offset = 0) {
  return list[(variant + offset) % list.length];
}

function syncLabels() {
  document.querySelector('#temperatureLabel').textContent = `${temperature.value}℃`;
  document.querySelector('#humidityLabel').textContent = `${humidity.value}%`;
}

function perceivedTemperature(temp, humidityValue, thermalType) {
  let perceived = Number(temp);
  if (thermalType === '暑がり') perceived += 2;
  if (thermalType === '寒がり') perceived -= 2;
  if (Number(humidityValue) >= 70) perceived += 1;
  return perceived;
}

function seasonFromConditions(selectedSeason, perceived) {
  if (selectedSeason !== 'auto') return selectedSeason;
  if (perceived < 13) return '冬';
  if (perceived < 21) return '春';
  if (perceived < 27) return '秋';
  return '夏';
}

function weatherAdvice(weather) {
  const map = {
    晴れ: '日差しが映える明るめカラーか、帽子・サングラスを足すと写真映えします。',
    曇り: '全体が暗く見えやすいので、白・ベージュ・淡色を1点入れるのがおすすめです。',
    雨: '濡れても扱いやすい素材と、滑りにくい靴を優先しましょう。',
    雪: '防寒と防滑を最優先に、首元・足元の暖かさを足しましょう。'
  };
  return map[weather];
}

function occasionAdvice(occasion) {
  const map = {
    大学: '動きやすさと清潔感を両立させると、授業から放課後まで使いやすいです。',
    デート: '顔まわりに明るい色やアクセント小物を置くと、やわらかい印象になります。',
    買い物: '歩きやすい靴と両手が空くバッグで、試着や移動を楽にしましょう。',
    旅行: '写真映えする主役アイテムと、温度調整できる羽織りが便利です。',
    仕事: 'きちんと見えるシルエットをベースに、色や小物で自分らしさを足しましょう。'
  };
  return map[occasion];
}

function buildProposal() {
  const values = {
    gender: document.querySelector('#gender').value,
    thermalType: document.querySelector('#thermalType').value,
    temperature: Number(temperature.value),
    humidity: Number(humidity.value),
    weather: document.querySelector('#weather').value,
    selectedSeason: document.querySelector('#season').value,
    occasion: document.querySelector('#occasion').value,
    taste: document.querySelector('#taste').value
  };
  const perceived = perceivedTemperature(values.temperature, values.humidity, values.thermalType);
  const season = seasonFromConditions(values.selectedSeason, perceived);
  const plan = itemPlans[values.taste];
  const outer = pick(outerBySeason[season], 1);
  const photos = photoSets[values.taste];

  return {
    ...values,
    perceived,
    season,
    title: `${values.occasion}向け ${values.taste}コーデ`,
    tops: pick(plan.tops),
    bottoms: pick(plan.bottoms, 1),
    shoes: pick(plan.shoes, 2),
    outer,
    bag: pick(plan.bag, 3),
    accessory: pick(plan.accessory, 4),
    photos,
    point: `${season}の体感${perceived}℃を基準に、${values.taste}らしさと${values.occasion}での使いやすさを両立しました。${weatherAdvice(values.weather)} ${occasionAdvice(values.occasion)}`
  };
}

function setText(id, value) {
  document.querySelector(`#${id}`).textContent = value;
}

function renderGallery(photos, proposal) {
  const gallery = document.querySelector('#photoGallery');
  gallery.innerHTML = '';
  photos.forEach((src, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `thumb${index === 0 ? ' active' : ''}`;
    button.innerHTML = `<img src="${src}" alt="${proposal.taste}コーデ写真候補 ${index + 1}" loading="lazy">`;
    button.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach((thumb) => thumb.classList.remove('active'));
      button.classList.add('active');
      document.querySelector('#mainPhoto').src = src;
      document.querySelector('#photoCaption').textContent = `写真候補 ${index + 1}：${proposal.taste} / ${proposal.occasion} / ${proposal.season} のイメージ`;
    });
    gallery.appendChild(button);
  });
}

function renderProposal(event) {
  event?.preventDefault();
  const proposal = buildProposal();
  setText('resultTitle', proposal.title);
  setText('comfortBadge', `体感：${proposal.perceived}℃ / ${proposal.season}`);
  setText('tops', proposal.tops);
  setText('bottoms', proposal.bottoms);
  setText('shoes', proposal.shoes);
  setText('outer', proposal.outer);
  setText('bag', proposal.bag);
  setText('accessory', proposal.accessory);
  setText('point', proposal.point);
  document.querySelector('#mainPhoto').src = proposal.photos[0];
  document.querySelector('#mainPhoto').alt = `${proposal.taste}の${proposal.occasion}向けコーデ写真`;
  document.querySelector('#photoCaption').textContent = `写真候補 1：${proposal.taste} / ${proposal.occasion} / ${proposal.season} のイメージ`;
  renderGallery(proposal.photos, proposal);
}

form.addEventListener('submit', renderProposal);
document.querySelector('#anotherButton').addEventListener('click', () => {
  variant += 1;
  renderProposal();
});
temperature.addEventListener('input', syncLabels);
humidity.addEventListener('input', syncLabels);
syncLabels();
renderProposal();
