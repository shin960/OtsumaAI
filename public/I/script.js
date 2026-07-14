const imageDatabase = {
  女性: {
    カジュアル: {
      冬: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=700&q=80',
      春秋: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80',
      夏: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80'
    },
    'きれいめ・オフィスカジュアル': {
      冬: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&q=80',
      春秋: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80',
      夏: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&q=80'
    }
  },
  男性: {
    カジュアル: {
      冬: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80',
      春秋: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&q=80',
      夏: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=700&q=80'
    },
    'きれいめ・オフィスカジュアル': {
      冬: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=700&q=80',
      春秋: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=700&q=80',
      夏: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=80'
    }
  }
};

const form = document.querySelector('#coordinate-form');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const temperatureValue = document.querySelector('#temperature-value');
const humidityValue = document.querySelector('#humidity-value');
const resultText = document.querySelector('#result-text');
const resultImage = document.querySelector('#result-image');

function syncRangeLabels() {
  temperatureValue.textContent = `${temperature.value}℃`;
  humidityValue.textContent = `${humidity.value}%`;
}

function coordinatePropose({ gender, style, thermalType, temperature, humidity, weather }) {
  const selectGender = gender === '男性' ? '男性' : '女性';
  const selectStyle = ['きれいめ・オフィスカジュアル', 'モード', 'フェミニン/トラッド'].includes(style) ? 'きれいめ・オフィスカジュアル' : 'カジュアル';

  let perceivedTemp = Number(temperature);
  if (thermalType === '暑がり') perceivedTemp += 2;
  if (thermalType === '寒がり') perceivedTemp -= 2;
  if (Number(humidity) > 70) perceivedTemp += 1;

  let season;
  let outer;
  let tops;
  let bottoms;
  if (perceivedTemp < 13) {
    season = '冬';
    outer = '厚手のコートやダウン';
    tops = 'タートルネックニット';
    bottoms = '厚手のロングパンツ';
  } else if (perceivedTemp < 23) {
    season = '春秋';
    outer = 'ジャケットやカーディガン';
    tops = '長袖シャツ・カットソー';
    bottoms = 'デニムやスラックス';
  } else {
    season = '夏';
    outer = '不要（日傘など）';
    tops = '半袖Tシャツやリネンシャツ';
    bottoms = '通気性の良いパンツ';
  }

  const imageUrl = imageDatabase[selectGender]?.[selectStyle]?.[season] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700&q=80';
  return { season, outer, tops, bottoms, imageUrl, perceivedTemp };
}

function renderProposal(event) {
  event.preventDefault();
  const values = {
    gender: document.querySelector('#gender').value,
    style: document.querySelector('#style-type').value,
    thermalType: document.querySelector('#thermal-type').value,
    weather: document.querySelector('#weather').value,
    temperature: Number(temperature.value),
    humidity: Number(humidity.value)
  };
  const proposal = coordinatePropose(values);
  resultText.innerHTML = `
    <h3>💡 今日のコーディネート提案</h3>
    <p><strong>${values.gender} - ${values.style}系統</strong></p>
    <ul>
      <li><strong>おすすめの季節感:</strong> ${proposal.season}の装い</li>
      <li><strong>体感温度の目安:</strong> ${proposal.perceivedTemp}℃</li>
      <li><strong>アウター:</strong> ${proposal.outer}</li>
      <li><strong>トップス:</strong> ${proposal.tops}</li>
      <li><strong>ボトムス:</strong> ${proposal.bottoms}</li>
    </ul>
    <p>天気は <strong>${values.weather}</strong>、気温は <strong>${values.temperature}℃</strong>、湿度は <strong>${values.humidity}%</strong> です。素敵な一日をお過ごしください！</p>
  `;
  resultImage.src = proposal.imageUrl;
  resultImage.alt = `${proposal.season}の${values.style}コーディネートイメージ`;
}

temperature.addEventListener('input', syncRangeLabels);
humidity.addEventListener('input', syncRangeLabels);
form.addEventListener('submit', renderProposal);
syncRangeLabels();
