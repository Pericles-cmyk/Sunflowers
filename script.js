/* ════════════════════════════════════════
   YOUTUBE PLAYER — API IFrame
   ID extraído de https://youtu.be/xr1Uywt_05g
════════════════════════════════════════ */
const YT_VIDEO_ID = 'me6EmHYQX1g';

let player        = null;   // instância YT.Player
let controlsTimer = null;   // timer para esconder controles
let isMuted       = false;
let isDragging    = false;
let progressInterval = null;

/* ── Cria o player quando a API do YT estiver pronta ── */
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    videoId: YT_VIDEO_ID,
    playerVars: {
      controls:       0,   // esconde controles nativos
      disablekb:      1,   // desativa teclado nativo do YT
      modestbranding: 1,
      rel:            0,
      playsinline:    1,   // essencial no iOS
      fs:             0,   // fullscreen nativo desativado (usamos o nosso)
    },
    events: {
      onStateChange: onPlayerStateChange,
    }
  });
}

/* ── Atualiza ícone play/pause conforme estado ── */
function onPlayerStateChange(e) {
  const playing = e.data === YT.PlayerState.PLAYING;
  document.getElementById('icon-play').style.display  = playing ? 'none'  : 'block';
  document.getElementById('icon-pause').style.display = playing ? 'block' : 'none';

  if (playing) {
    startProgressLoop();
    scheduleHideControls(); // começa a contagem para esconder
  } else {
    stopProgressLoop();
    showControls();         // mostra controles quando pausado
  }
}

/* ════════════════════════════════════════
   ABRIR / FECHAR MODAL
════════════════════════════════════════ */
function openModal() {
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  showControls();
  // pequeno delay para garantir que o player está pronto
  setTimeout(() => {
    if (player && player.playVideo) {
      player.seekTo(0);
      player.playVideo();
    }
  }, 600);
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  if (player && player.pauseVideo) player.pauseVideo();
  stopProgressLoop();
  clearTimeout(controlsTimer);
}

/* ════════════════════════════════════════
   CONTROLES — aparecer / sumir
════════════════════════════════════════ */
function showControls() {
  const ctrl = document.getElementById('yt-controls');
  ctrl.classList.remove('hidden');
  clearTimeout(controlsTimer);
}

function scheduleHideControls() {
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => {
    // só esconde se estiver tocando
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
      document.getElementById('yt-controls').classList.add('hidden');
    }
  }, 3000); // 3 segundos
}

/* Toque/clique na área do player: mostra controles e reinicia timer */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('yt-container');

  container.addEventListener('click', () => {
    const ctrl = document.getElementById('yt-controls');
    if (ctrl.classList.contains('hidden')) {
      showControls();
      scheduleHideControls();
    } else {
      togglePlay();
    }
  });

  // Movimento do mouse (desktop) também mostra os controles
  container.addEventListener('mousemove', () => {
    showControls();
    scheduleHideControls();
  });

  initSeek();
  initSwipeGallery();
  initModalCloseOnBackdrop();
  initKeyboard();
});

/* ════════════════════════════════════════
   PLAY / PAUSE / MUTE / FULLSCREEN
════════════════════════════════════════ */
function togglePlay() {
  if (!player) return;
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
    scheduleHideControls();
  }
}

function toggleMute() {
  if (!player) return;
  isMuted = !isMuted;
  isMuted ? player.mute() : player.unMute();
  document.getElementById('icon-sound').style.display = isMuted ? 'none'  : 'block';
  document.getElementById('icon-mute').style.display  = isMuted ? 'block' : 'none';
  showControls();
  scheduleHideControls();
}

function toggleFullscreen() {
  const el = document.getElementById('yt-container');
  if (!document.fullscreenElement) {
    (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen).call(el);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen).call(document);
  }
}

/* ════════════════════════════════════════
   BARRA DE PROGRESSO
════════════════════════════════════════ */
function startProgressLoop() {
  stopProgressLoop();
  progressInterval = setInterval(updateProgress, 500);
}

function stopProgressLoop() {
  clearInterval(progressInterval);
  progressInterval = null;
}

function updateProgress() {
  if (!player || isDragging) return;
  try {
    const current  = player.getCurrentTime() || 0;
    const duration = player.getDuration()    || 0;
    if (!duration) return;

    const pct = (current / duration) * 100;
    document.getElementById('yt-seek-fill').style.width = pct + '%';
    document.getElementById('yt-seek-thumb').style.left  = pct + '%';
    document.getElementById('yt-current-time').textContent = formatTime(current);
    document.getElementById('yt-duration').textContent     = formatTime(duration);
  } catch (_) {}
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/* ── Seek por clique e drag na barra ── */
function initSeek() {
  const track = document.getElementById('yt-seek-track');
  if (!track) return;

  function seek(e) {
    if (!player) return;
    const rect = track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const duration = player.getDuration() || 0;
    player.seekTo(pct * duration, true);
    document.getElementById('yt-seek-fill').style.width = (pct * 100) + '%';
    document.getElementById('yt-seek-thumb').style.left  = (pct * 100) + '%';
    document.getElementById('yt-current-time').textContent = formatTime(pct * duration);
    showControls();
  }

  // Mouse
  track.addEventListener('mousedown', e => {
    isDragging = true; seek(e);
    const onMove = e => seek(e);
    const onUp   = () => { isDragging = false; scheduleHideControls(); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  });

  // Touch
  track.addEventListener('touchstart', e => { isDragging = true; seek(e); }, { passive: true });
  track.addEventListener('touchmove',  e => seek(e), { passive: true });
  track.addEventListener('touchend',   () => { isDragging = false; scheduleHideControls(); });
}

/* ════════════════════════════════════════
   GALERIA DE FOTOS — LIGHTBOX
════════════════════════════════════════ */
const PHOTOS = [
  'fotos/foto1.jpg',  'fotos/foto2.jpg',  'fotos/foto3.jpg',
  'fotos/foto4.jpg',  'fotos/foto5.jpg',  'fotos/foto6.jpg',
  'fotos/foto7.jpg',  'fotos/foto8.jpg',  'fotos/foto9.jpg',
  'fotos/foto10.jpg', 'fotos/foto11.jpg', 'fotos/foto12.jpg',
  'fotos/foto13.jpg', 'fotos/foto14.jpg', 'fotos/foto15.jpg',
  'fotos/foto16.jpg', 'fotos/foto17.jpg', 'fotos/foto18.jpg',
  'fotos/foto19.jpg', 'fotos/foto20.jpg',
  /* Adicione mais fotos aqui */
];

let currentIndex = 0;

function openPhotos() {
  const modal = document.getElementById('modal-fotos');
  const music = document.getElementById('bg-music');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  buildThumbs();
  showPhoto(0);
  music.currentTime = 0;
  music.play().catch(() => {});
}

function closePhotos() {
  const music = document.getElementById('bg-music');
  document.getElementById('modal-fotos').classList.remove('open');
  document.body.style.overflow = '';
  music.pause();
  music.currentTime = 0;
}

function buildThumbs() {
  const container = document.getElementById('lb-thumbs');
  container.innerHTML = '';
  PHOTOS.forEach((src, i) => {
    const img     = document.createElement('img');
    img.src       = src;
    img.alt       = `Foto ${i + 1}`;
    img.className = 'lb-thumb' + (i === 0 ? ' active' : '');
    img.onclick   = () => showPhoto(i);
    container.appendChild(img);
  });
  document.getElementById('lb-total').textContent = PHOTOS.length;
}

function showPhoto(index) {
  const mainImg = document.getElementById('lb-img');
  mainImg.classList.add('fading');
  setTimeout(() => {
    currentIndex  = index;
    mainImg.src   = PHOTOS[currentIndex];
    mainImg.classList.remove('fading');
    document.getElementById('lb-current').textContent = currentIndex + 1;
    document.querySelectorAll('.lb-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === currentIndex);
      if (i === currentIndex) t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  }, 220);
}

function changePhoto(dir) {
  let next = currentIndex + dir;
  if (next < 0) next = PHOTOS.length - 1;
  if (next >= PHOTOS.length) next = 0;
  showPhoto(next);
}

/* ════════════════════════════════════════
   SWIPE — galeria de fotos
════════════════════════════════════════ */
function initSwipeGallery() {
  const area = document.getElementById('modal-fotos');
  let startX = 0, startY = 0;
  area.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  area.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) changePhoto(dx < 0 ? 1 : -1);
  }, { passive: true });
}

/* ════════════════════════════════════════
   FECHAR AO CLICAR NO BACKDROP
════════════════════════════════════════ */
function initModalCloseOnBackdrop() {
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
  document.getElementById('modal-fotos').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-fotos')) closePhotos();
  });
}

/* ════════════════════════════════════════
   TECLADO
════════════════════════════════════════ */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    const fotosOpen = document.getElementById('modal-fotos').classList.contains('open');
    const videoOpen = document.getElementById('modal').classList.contains('open');
    if (fotosOpen) {
      if (e.key === 'ArrowLeft')  changePhoto(-1);
      if (e.key === 'ArrowRight') changePhoto(1);
      if (e.key === 'Escape')     closePhotos();
    }
    if (videoOpen) {
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
      if (e.key === 'Escape') closeModal();
    }
  });
}
