const baseBurnMinutes = { 1: 10, 2: 15, 3: 20, 4: 30, 5: 40, 6: 60 };
const sampleTokyo = { latitude: 35.6812, longitude: 139.7671, label: 'サンプル地点：東京駅周辺' };

const diagnoseButton = document.querySelector('#diagnoseButton');
const sampleButton = document.querySelector('#sampleButton');
const canvas = document.querySelector('#uvChart');
const ctx = canvas.getContext('2d');

function dangerLevel(uv) {
  if (uv >= 11) return '極端';
  if (uv >= 8) return '非常に高い';
  if (uv >= 6) return '高';
  if (uv >= 3) return '中';
  return '低';
}

function setMessage(id, text) {
  document.querySelector(`#${id}`).textContent = text;
}

function getSettings() {
  return {
    skin: Number(document.querySelector('#skinType').value),
    spf: Math.max(1, Number(document.querySelector('#spf').value) || 1),
    pa: Number(document.querySelector('#pa').value)
  };
}

async function fetchUvData(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'uv_index',
    hourly: 'uv_index',
    timezone: 'auto',
    forecast_days: '1'
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!response.ok) throw new Error('UV情報を取得できませんでした。');
  return response.json();
}

function collectTodayHourly(data) {
  const times = data.hourly?.time || [];
  const values = data.hourly?.uv_index || [];
  return times.map((time, index) => ({ time: new Date(time), uv: Number(values[index] || 0) }));
}

function safeTimeText(hourly) {
  const safeHours = hourly.filter((item) => item.uv < 3).map((item) => `${item.time.getHours()}時`);
  if (safeHours.length === 0) return '今日は安全時間帯なし。帽子・日傘・日焼け止めを活用しましょう。';
  return `${safeHours.join('、')} 頃はUV指数が低めです。`;
}

function alertText(hourly) {
  const strong = hourly.find((item) => item.uv >= 8);
  if (strong) return `${strong.time.getHours()}時頃 紫外線が非常に強くなります。外出時は対策を強めましょう。`;
  const high = hourly.find((item) => item.uv >= 6);
  if (high) return `${high.time.getHours()}時頃 紫外線が強くなります。こまめに塗り直しましょう。`;
  return '今日は急上昇なし。通常のUV対策を続けましょう。';
}

function drawChart(hourly) {
  const width = canvas.width;
  const height = canvas.height;
  const padding = 44;
  const maxUv = Math.max(12, ...hourly.map((item) => item.uv));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#eceff1';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding + ((height - padding * 2) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  const points = hourly.map((item, index) => {
    const x = padding + ((width - padding * 2) / Math.max(hourly.length - 1, 1)) * index;
    const y = height - padding - (item.uv / maxUv) * (height - padding * 2);
    return { x, y, ...item };
  });

  ctx.strokeStyle = '#ff9800';
  ctx.lineWidth = 4;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  points.forEach((point) => {
    ctx.fillStyle = point.uv >= 8 ? '#d32f2f' : point.uv >= 6 ? '#f57c00' : '#2e7d32';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#607d8b';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  points.forEach((point, index) => {
    if (index % 3 === 0) ctx.fillText(`${point.time.getHours()}時`, point.x, height - 14);
  });

  ctx.textAlign = 'right';
  ctx.fillText(`UV ${Math.round(maxUv)}`, padding - 8, padding + 4);
  ctx.fillText('0', padding - 8, height - padding + 4);
}

async function diagnose(location) {
  try {
    diagnoseButton.disabled = true;
    sampleButton.disabled = true;
    setMessage('place', 'UV情報を取得中...');

    const data = await fetchUvData(location.latitude, location.longitude);
    const uv = Number(data.current?.uv_index ?? 0);
    const settings = getSettings();
    const burn = (baseBurnMinutes[settings.skin] / Math.max(uv, 1)) * settings.spf * settings.pa;
    const hourly = collectTodayHourly(data);

    setMessage('place', location.label || `緯度 ${location.latitude.toFixed(3)} / 経度 ${location.longitude.toFixed(3)}`);
    setMessage('uv', `UV指数：${uv.toFixed(1)}`);
    setMessage('danger', `危険度：${dangerLevel(uv)}`);
    setMessage('time', `日焼け開始：約${Math.round(burn)}分`);
    setMessage('safeTime', safeTimeText(hourly));
    setMessage('alert', alertText(hourly));
    drawChart(hourly);
  } catch (error) {
    setMessage('place', '取得に失敗しました');
    setMessage('alert', error.message);
  } finally {
    diagnoseButton.disabled = false;
    sampleButton.disabled = false;
  }
}

function diagnoseCurrentLocation() {
  if (!navigator.geolocation) {
    alert('位置情報が利用できません。サンプル地点でお試しください。');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => diagnose({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      label: '現在地'
    }),
    () => alert('位置情報を取得できませんでした。サンプル地点でお試しください。')
  );
}

diagnoseButton.addEventListener('click', diagnoseCurrentLocation);
sampleButton.addEventListener('click', () => diagnose(sampleTokyo));
drawChart(Array.from({ length: 24 }, (_, hour) => ({ time: new Date(2026, 0, 1, hour), uv: 0 })));
