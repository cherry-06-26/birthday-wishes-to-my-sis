/* ==========================================================
   CONFIG — edit everything here
   ========================================================== */
const CONFIG = {
  sisterName: "Pooja",
  originalName: "Lakshmi",
  birthday: "2006-08-24", // YYYY-MM-DD

  photos: [], // filled in below from wishBackgroundPhotos — see bottom of CONFIG
  photoCaptions: [
    "Little you, big smile 💗",
    "Twirling through every good day 🌸",
    "That candid, carefree laugh 😄",
    "Always so pretty, inside and out 🥹",
    "Standing tall, looking gorgeous ✨",
    "Silly and sweet in equal measure 🎂"
  ],

  // Background photos for the birthday-message screen — add as many as you like,
  // they'll scroll in three columns automatically (middle column moves the
  // opposite direction from the outer two).
  wishBackgroundPhotos: [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg",
    "photos/photo5.jpg",
    "photos/photo6.jpg",
    "photos/photo7.jpg",
    "photos/photo8.jpg",
    "photos/photo9.jpg",
    "photos/photo10.jpg",
    "photos/photo11.jpg",
    "photos/photo12.jpg",
    "photos/photo13.jpg",
    "photos/photo14.jpg",
    "photos/photo15.jpg",
    "photos/photo16.jpg",
    "photos/photo17.jpg",
    "photos/photo18.jpg",
    "photos/photo19.jpg",
    "photos/photo20.jpg",
    "photos/photo21.jpg",
    "photos/photo22.jpg",
    "photos/photo23.jpg",
    "photos/photo24.jpg",
    "photos/photo25.jpg",
    "photos/photo26.jpg",
    "photos/photo27.jpg",
    "photos/photo28.jpg",
    "photos/photo29.jpg",
    "photos/photo30.jpg",
    "photos/photo31.jpg",
    "photos/photo32.jpg",
    "photos/photo33.jpg",
    "photos/photo34.jpg",
    "photos/photo35.jpg",
    "photos/photo36.jpg",
    "photos/photo37.jpg",
    "photos/photo38.jpg",
    "photos/photo39.jpg",
    "photos/photo40.jpg"
  ],

  music: "birthday-song.mp3",

  // Music that plays for specific sections, crossfading in/out smoothly as the
  // person moves between screens. Drop your own mp3 files at these paths —
  // rename them however you like, just keep the paths matching here.
  sectionMusic: {
    "screen-games": "music/lazy-dotori.mp3",       // Lazy — dotori sounds
    "screen-message": "music/hangova-anirudh.mp3", // Hangova — Anirudh Ravichander
    "screen-photos": "music/new-beginnings-sean.mp3" // New Beginnings — Sean Roldan
  },

  loveLockCode: "2408", // day+month of birthday, edit if needed

  spinnerOptions: [
    "👗 Naku dress kavali",
    "📿 Naku chain kavali",
    "💍 Naku pattilu kavali",
    "🚫 Naku edi vaddu"
  ],
  winningSpinnerOption: 3, // index into spinnerOptions — NOT random

  quizQuestions: [
    {
      question: "If akka became a superhero for one day, what would her power be?",
      options: ["Turning biryani into unlimited biryani 🍛", "Teleporting straight into the fridge 🧊", "Mind-reading just to catch you gossiping 👀", "Flying away from all the chores 🦸‍♀️"],
      answer: 2
    },
    {
      question: "QUESTION PLACEHOLDER 2",
      options: ["OPTION 1", "OPTION 2", "OPTION 3", "OPTION 4"],
      answer: 1
    },
    {
      question: "QUESTION PLACEHOLDER 3",
      options: ["OPTION 1", "OPTION 2", "OPTION 3", "OPTION 4"],
      answer: 2
    }
  ],

  memories: [
    { image: "photos/memory1.jpg", date: "Date placeholder", text: "Text placeholder" },
    { image: "photos/memory2.jpg", date: "Date placeholder", text: "Text placeholder" },
    { image: "photos/memory3.jpg", date: "Date placeholder", text: "Text placeholder" },
    { image: "photos/memory4.jpg", date: "Date placeholder", text: "Text placeholder" }
  ]
};
// the photo-reveal task cycles through every photo you've supplied,
// not just a fixed handful — reuse the full background list
CONFIG.photos = CONFIG.wishBackgroundPhotos.slice();

/* ==========================================================
   SCREEN TRANSITIONS
   ========================================================== */
function showScreen(id){
  const current = document.querySelector(".screen.active");
  const next = document.getElementById(id);
  if(!next || current === next) return;

  if(current){
    current.classList.add("leaving");
    current.classList.remove("active");
    setTimeout(() => current.classList.remove("leaving"), 700);
  }
  requestAnimationFrame(() => {
    next.classList.add("active");
  });
  if(typeof crossfadeForScreen === "function") crossfadeForScreen(id);
}
function transitionTo(id, delay = 0){
  setTimeout(() => showScreen(id), delay);
}

/* ==========================================================
   HEART / PARTICLE HELPERS (DOM burst effects)
   ========================================================== */
function createHeart(x, y, opts = {}){
  const el = document.createElement("div");
  el.className = "floating-heart";
  el.textContent = opts.glyph || ["❤️","💕","💗","💖","🌸","✨"][Math.floor(Math.random()*6)];
  const angle = Math.random() * Math.PI * 2;
  const dist = 60 + Math.random() * 120;
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.setProperty("--dx", Math.cos(angle)*dist + "px");
  el.style.setProperty("--dy", Math.sin(angle)*dist - 40 + "px");
  el.style.setProperty("--rot", (Math.random()*140-70) + "deg");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
function createParticles(x, y, count = 14){
  for(let i=0;i<count;i++){
    setTimeout(() => createHeart(x,y), i*20);
  }
}
function burstFromElement(el){
  const r = el.getBoundingClientRect();
  createParticles(r.left + r.width/2, r.top + r.height/2, 16);
}

/* Ripple + burst on every .btn click */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if(!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size/2) + "px";
  ripple.style.top = (e.clientY - rect.top - size/2) + "px";
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
  if(btn.classList.contains("btn-primary")){
    createParticles(e.clientX, e.clientY, 10);
  }
});

/* ==========================================================
   BACKGROUND PARTICLES (canvas)
   ========================================================== */
(function backgroundParticles(){
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];
  const GLYPHS = ["❤","💕","🌸","✨","🎀"];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function makeParticle(randomY){
    return {
      x: Math.random()*w,
      y: randomY ? Math.random()*h : h + 40,
      size: 10 + Math.random()*16,
      speed: 0.2 + Math.random()*0.6,
      drift: (Math.random()-0.5) * 0.4,
      opacity: 0.15 + Math.random()*0.35,
      rot: Math.random()*360,
      rotSpeed: (Math.random()-0.5) * 0.4,
      glyph: GLYPHS[Math.floor(Math.random()*GLYPHS.length)],
      fadeDir: Math.random() > 0.5 ? 1 : -1
    };
  }
  const COUNT = window.innerWidth < 500 ? 22 : 36;
  for(let i=0;i<COUNT;i++) particles.push(makeParticle(true));

  function tick(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      p.rot += p.rotSpeed;
      if(p.y < -40){
        Object.assign(p, makeParticle(false));
        p.y = h + 40;
      }
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI/180);
      ctx.font = p.size + "px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ==========================================================
   AUTHENTICATION (landing screen)
   ========================================================== */
(function auth(){
  const form = document.getElementById("auth-form");
  const nameInput = document.getElementById("input-name");
  const bdayInput = document.getElementById("input-birthday");
  const errorMsg = document.getElementById("error-msg");
  const nameField = nameInput.closest(".field");
  const bdayField = bdayInput.closest(".field");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const enteredName = nameInput.value.trim().toLowerCase();
    const nameOk = enteredName === CONFIG.originalName.toLowerCase()
      || enteredName === CONFIG.sisterName.toLowerCase();
    const bdayOk = bdayInput.value === CONFIG.birthday;

    if(nameOk && bdayOk){
      errorMsg.classList.remove("show");
      document.getElementById("unlock-name").textContent = CONFIG.sisterName;
      transitionTo("screen-unlock", 100);
      setTimeout(playUnlockCinematic, 800);
    } else {
      errorMsg.classList.add("show");
      [nameField, bdayField].forEach(f => {
        f.classList.remove("shake");
        void f.offsetWidth;
        f.classList.add("shake");
      });
      const rect = form.getBoundingClientRect();
      createParticles(rect.left + rect.width/2, rect.top + 30, 8);
    }
  });
})();

function playUnlockCinematic(){
  const msg1 = document.getElementById("unlock-msg-1");
  const msg2 = document.getElementById("unlock-msg-2");
  const lock = document.getElementById("heart-lock");
  const ring = document.querySelector(".heart-burst-ring");

  msg1.classList.add("show");
  setTimeout(() => msg2.classList.add("show"), 700);
  setTimeout(() => {
    lock.classList.add("opened");
    const r = lock.getBoundingClientRect();
    ring.style.left = (r.left + r.width/2 - 5) + "px";
    ring.style.top = (r.top + r.height/2 - 5) + "px";
    ring.classList.add("play");
    createParticles(r.left + r.width/2, r.top + r.height/2, 30);
  }, 1500);
  setTimeout(() => {
    transitionTo("screen-tasks");
    initTasks();
  }, 2900);
}

/* ==========================================================
   TASK SYSTEM (shared)
   ========================================================== */
const TOTAL_TASKS = 5;
let currentTask = 1;

function buildProgressTrack(){
  const track = document.getElementById("progress-track");
  track.innerHTML = "";
  for(let i=1;i<=TOTAL_TASKS;i++){
    const h = document.createElement("span");
    h.className = "progress-heart";
    h.dataset.i = i;
    h.textContent = "♡";
    track.appendChild(h);
    if(i < TOTAL_TASKS){
      const line = document.createElement("span");
      line.className = "progress-line";
      track.appendChild(line);
    }
  }
}
function updateProgress(){
  document.querySelectorAll(".progress-heart").forEach(h => {
    h.classList.toggle("filled", Number(h.dataset.i) <= currentTask - 1 || h.dataset.i == currentTask && h.dataset.done);
  });
}
function completeTask(n){
  const heart = document.querySelector(`.progress-heart[data-i="${n}"]`);
  if(heart){ heart.textContent = "♥"; heart.classList.add("filled"); }
}
function goToTask(n){
  currentTask = n;
  document.querySelectorAll(".task-panel").forEach(p => {
    p.classList.toggle("active", Number(p.dataset.task) === n);
  });
}
function nextTask(){
  completeTask(currentTask);
  if(currentTask >= TOTAL_TASKS){
    setTimeout(() => transitionTo("screen-gift"), 500);
    return;
  }
  setTimeout(() => goToTask(currentTask + 1), 700);
}

function initTasks(){
  buildProgressTrack();
  goToTask(1);
  updateProgress();
  initTask1Garden();
  initTask2Memory();
  initTask3Catch();
  initTask4Surprise();
  initTask5Lock();
}

/* ---------- TASK 1: hidden heart garden ---------- */
function initTask1Garden(){
  const garden = document.getElementById("heart-garden");
  garden.innerHTML = "";
  const total = 16;
  const targetIndex = Math.floor(Math.random()*total);
  for(let i=0;i<total;i++){
    const h = document.createElement("div");
    h.className = "garden-heart" + (i === targetIndex ? " target" : "");
    h.textContent = i === targetIndex ? "💖" : ["🩷","💗","💕","❤️"][Math.floor(Math.random()*4)];
    h.style.left = (5 + Math.random()*88) + "%";
    h.style.top = (5 + Math.random()*82) + "%";
    h.style.animationDelay = (Math.random()*2) + "s";
    h.style.fontSize = (1.2 + Math.random()*0.6) + "rem";
    h.addEventListener("click", (e) => {
      if(i === targetIndex){
        burstFromElement(h);
        garden.querySelectorAll(".garden-heart").forEach(el => el.style.pointerEvents = "none");
        h.style.transform = "scale(0)";
        const done = document.createElement("p");
        done.className = "task-sub";
        done.textContent = "You found it! ❤️";
        garden.appendChild(done);
        nextTask();
      } else {
        h.style.transform = "scale(0.7)";
        setTimeout(() => h.style.transform = "", 200);
      }
    });
    garden.appendChild(h);
  }
}

/* ---------- TASK 2: memory match ---------- */
function initTask2Memory(){
  const grid = document.getElementById("memory-grid");
  grid.innerHTML = "";
  const symbols = ["🌸","🎂","🎁","💌","🎀","✨","🧸","🍰"].slice(0,8);
  let deck = [...symbols, ...symbols]
    .map(s => ({ s, sortKey: Math.random() }))
    .sort((a,b) => a.sortKey - b.sortKey);

  let flipped = [];
  let lock = false;
  let matches = 0;

  deck.forEach((card, idx) => {
    const el = document.createElement("div");
    el.className = "mem-card";
    el.dataset.symbol = card.s;
    el.innerHTML = `
      <div class="mem-face mem-front">💗</div>
      <div class="mem-face mem-back">${card.s}</div>
    `;
    el.addEventListener("click", () => {
      if(lock || el.classList.contains("flipped") || el.classList.contains("matched")) return;
      el.classList.add("flipped");
      flipped.push(el);
      if(flipped.length === 2){
        lock = true;
        const [a,b] = flipped;
        if(a.dataset.symbol === b.dataset.symbol){
          a.classList.add("matched"); b.classList.add("matched");
          burstFromElement(b);
          matches++;
          flipped = []; lock = false;
          if(matches === symbols.length){
            const done = document.createElement("p");
            done.className = "task-sub";
            done.style.gridColumn = "1 / -1";
            done.textContent = "Your memory is pretty good... 😌💕";
            grid.appendChild(done);
            nextTask();
          }
        } else {
          setTimeout(() => {
            a.classList.remove("flipped"); b.classList.remove("flipped");
            flipped = []; lock = false;
          }, 800);
        }
      }
    });
    grid.appendChild(el);
  });
}

/* ---------- TASK 3: catch falling hearts ---------- */
let catchInterval = null, catchTimeout = null, catchScore = 0;
function initTask3Catch(){
  const startBtn = document.getElementById("catch-start-btn");
  const field = document.getElementById("catch-field");
  const scoreEl = document.getElementById("catch-score");
  catchScore = 0;
  scoreEl.textContent = "0";
  field.innerHTML = "";
  startBtn.style.display = "inline-flex";
  startBtn.textContent = "Start catching";

  startBtn.onclick = () => {
    startBtn.disabled = true;
    startBtn.style.opacity = ".5";
    startBtn.style.display = "none";
    catchScore = 0;
    scoreEl.textContent = "0";
    let catchWon = false;
    const glyphs = [
      { g:"❤️", v:1 }, { g:"🩷","v":-1 }, { g:"💗", v:-1 }, { g:"💎", v:-1 }, { g:"🌸", v:-1 }
    ];
    const fieldRect = field.getBoundingClientRect();

    catchInterval = setInterval(() => {
      if(catchWon) return;
      const item = glyphs[Math.floor(Math.random()*glyphs.length)];
      const el = document.createElement("div");
      el.className = "falling-heart";
      el.textContent = item.g;
      el.style.left = (Math.random() * (fieldRect.width - 30)) + "px";
      el.style.animation = `fall ${2 + Math.random()*1.5}s linear forwards`;
      el.addEventListener("click", () => {
        if(catchWon) return;
        catchScore += item.v;
        scoreEl.textContent = catchScore;
        const pop = document.createElement("span");
        pop.className = "score-pop";
        pop.textContent = (item.v > 0 ? "+" : "") + item.v + " " + item.g;
        pop.style.left = el.style.left;
        pop.style.top = el.style.top;
        field.appendChild(pop);
        setTimeout(() => pop.remove(), 800);
        el.remove();

        if(catchScore >= 10 && !catchWon){
          catchWon = true;
          clearInterval(catchInterval);
          field.querySelectorAll(".falling-heart").forEach(f => f.remove());
          setTimeout(() => {
            const done = document.createElement("p");
            done.className = "big-pink-msg";
            done.textContent = "Score: " + catchScore + " 💕 You catch my heart akka";
            field.appendChild(done);
            setTimeout(() => nextTask(), 2600);
          }, 1200);
        }
      });
      field.appendChild(el);
      setTimeout(() => el.remove(), 3600);
    }, 450);
  };
}
/* inject @keyframes fall dynamically since target position is unknown ahead of time */
(function injectFallKeyframes(){
  const style = document.createElement("style");
  style.textContent = `@keyframes fall { from { top:-40px; } to { top:100%; } }`;
  document.head.appendChild(style);
})();
function stopCatchGame(){
  clearInterval(catchInterval);
  clearTimeout(catchTimeout);
}

/* ---------- TASK 4: surprise buttons ---------- */
function initTask4Surprise(){
  const wrap = document.getElementById("surprise-buttons");
  wrap.innerHTML = "";
  const labels = ["Maybe...", "Definitely...", "Nope 😂", "This one ❤️"];
  const correctIndex = 3;
  labels.forEach((label, i) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.textContent = label;
    btn.addEventListener("click", (e) => {
      if(i === correctIndex){
        btn.style.transform = "scale(1.15)";
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-primary");
        burstFromElement(btn);
        setTimeout(() => nextTask(), 500);
        wrap.querySelectorAll("button").forEach(b => b.disabled = true);
      } else {
        const dx = (Math.random()-0.5) * 60;
        const dy = (Math.random()-0.5) * 30;
        btn.style.position = "relative";
        btn.style.left = dx + "px";
        btn.style.top = dy + "px";
      }
    });
    wrap.appendChild(btn);
  });
}

/* ---------- TASK 5: love lock ---------- */
function initTask5Lock(){
  const digits = document.querySelectorAll(".lock-digit");
  const lockHeart = document.getElementById("lock-heart");
  digits.forEach(d => d.value = "");
  lockHeart.textContent = "🔒";
  lockHeart.classList.remove("opened");

  digits.forEach((d, idx) => {
    d.oninput = () => {
      d.value = d.value.replace(/[^0-9]/g, "").slice(0,1);
      if(d.value && digits[idx+1]) digits[idx+1].focus();
      const code = Array.from(digits).map(x => x.value).join("");
      if(code.length === 4){
        if(code === CONFIG.loveLockCode){
          lockHeart.textContent = "💖";
          lockHeart.classList.add("opened");
          burstFromElement(lockHeart);
          setTimeout(() => nextTask(), 700);
        } else {
          digits.forEach(x => {
            x.closest(".love-lock").classList.add("shake-lock");
          });
          const loveLock = document.querySelector(".love-lock");
          loveLock.style.animation = "none";
          void loveLock.offsetWidth;
          loveLock.style.animation = "shake .5s";
          setTimeout(() => {
            digits.forEach(x => x.value = "");
            loveLock.classList.remove("shake-lock");
            digits[0].focus();
          }, 500);
        }
      }
    };
  });
}

/* ==========================================================
   GIFT BOX
   ========================================================== */
(function giftBox(){
  const box = document.getElementById("gift-box");
  const hint = document.querySelector(".tap-hint");
  box.addEventListener("click", () => {
    if(box.classList.contains("opened")) return;
    box.classList.add("opened");
    burstFromElement(box);
    if(hint) hint.style.opacity = "0";
    setTimeout(() => {
      transitionTo("screen-photos");
      initPhotoReveal();
    }, 1500);
  });
})();

/* ==========================================================
   PHOTO REVEAL
   ========================================================== */
const PHOTO_REVEAL_SLOT_COUNT = 9; // how many photos can be on stage at once

let photoRevealTimer = null;
let photoRevealSlots = [];      // element currently sitting in each grid slot (or null)
let photoRevealSourceIndex = 0; // pointer into CONFIG.photos, keeps advancing/looping
let photoRevealSlotIndex = 0;   // which slot gets filled/replaced next, round-robin

function initPhotoReveal(){
  const stage = document.getElementById("photo-stage");
  stage.innerHTML = "";
  clearInterval(photoRevealTimer);

  const photos = (CONFIG.photos && CONFIG.photos.length) ? CONFIG.photos : [];
  if(!photos.length) return;

  photoRevealSlots = new Array(PHOTO_REVEAL_SLOT_COUNT).fill(null);
  photoRevealSourceIndex = 0;
  photoRevealSlotIndex = 0;

  function spawnNext(){
    const src = photos[photoRevealSourceIndex % photos.length];
    const caption = (CONFIG.photoCaptions && CONFIG.photoCaptions.length)
      ? CONFIG.photoCaptions[photoRevealSourceIndex % CONFIG.photoCaptions.length]
      : "";
    photoRevealSourceIndex++;

    const slot = photoRevealSlotIndex;
    photoRevealSlotIndex = (photoRevealSlotIndex + 1) % PHOTO_REVEAL_SLOT_COUNT;

    // random spot on the stage (kept away from the very edges) and a random size,
    // so every photo lands somewhere new at a different scale instead of a fixed grid
    const posX = (6 + Math.random()*80) + "%";
    const posY = (4 + Math.random()*80) + "%";
    const w = Math.round(90 + Math.random()*90);   // 90–180px
    const h = Math.round(w * (1.05 + Math.random()*0.3)); // varied aspect ratio

    // gently shrink-and-fade out whatever already lives in this slot
    const old = photoRevealSlots[slot];
    if(old){
      old.style.transform = "translate(-50%,-50%) scale(.15)";
      old.style.opacity = "0";
      setTimeout(() => old.remove(), 550);
    }

    // spawn the new photo small, centered on the stage
    const el = document.createElement("div");
    el.className = "reveal-photo";
    el.style.left = "50%";
    el.style.top = "50%";
    el.style.width = w + "px";
    el.style.height = h + "px";
    el.style.transform = "translate(-50%,-50%) scale(.15)";
    el.style.opacity = "0";
    const rot = (Math.random()*10 - 5).toFixed(1);
    el.innerHTML = `<div class="reveal-photo-inner"><img src="${src}" alt="" onerror="this.closest('.reveal-photo').remove();"></div>`;
    el.addEventListener("click", () => openLightbox(src, caption));
    el.addEventListener("transitionend", (e) => {
      if(e.propertyName === "transform") el.classList.add("settled");
    });
    stage.appendChild(el);
    photoRevealSlots[slot] = el;

    // next frame: move it out to its random spot/size and zoom to full size
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.left = posX;
        el.style.top = posY;
        el.style.transform = `translate(-50%,-50%) scale(1) rotate(${rot}deg)`;
        el.style.opacity = "1";
      });
    });
  }

  spawnNext();
  photoRevealTimer = setInterval(spawnNext, 900);
}
function stopPhotoReveal(){
  clearInterval(photoRevealTimer);
  photoRevealTimer = null;
}
function openLightbox(src, caption){
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-caption").textContent = caption;
  lb.classList.add("open");
}
document.getElementById("lightbox").addEventListener("click", (e) => {
  e.currentTarget.classList.remove("open");
});
document.getElementById("photos-continue-btn").addEventListener("click", () => {
  stopPhotoReveal();
  transitionTo("screen-message");
  initMessageBackgroundPhotos();
  animateMessageReveal();
});

/* ==========================================================
   BIRTHDAY MESSAGE (typewriter / word reveal)
   ========================================================== */
function initMessageBackgroundPhotos(){
  const wrap = document.getElementById("message-bg-photos");
  wrap.innerHTML = "";
  const photos = CONFIG.wishBackgroundPhotos && CONFIG.wishBackgroundPhotos.length
    ? CONFIG.wishBackgroundPhotos
    : CONFIG.photos;
  if(!photos || !photos.length) return;

  // split photos into three side-by-side columns
  const columns = [[], [], []];
  photos.forEach((src, i) => columns[i % 3].push(src));
  columns.forEach(list => { if(!list.length) list.push(...photos); });

  // col 1 & 3 drift downward, the middle column drifts upward —
  // that's what creates the interleaved up/down/up motion
  const directions = ["down", "up", "down"];

  columns.forEach((list, colIndex) => {
    const col = document.createElement("div");
    col.className = "photo-col " + (directions[colIndex] === "up" ? "col-up" : "col-down");
    // duplicate the list so the vertical scroll loop is seamless
    const doubled = [...list, ...list];
    doubled.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = () => { img.classList.add("img-broken"); };
      col.appendChild(img);
    });
    // vary duration slightly per column for a natural, non-robotic feel
    const duration = Math.max(20, list.length * 5) + colIndex * 3;
    col.style.animationDuration = duration + "s";
    wrap.appendChild(col);
  });
}

function animateMessageReveal(){
  const lines = document.querySelectorAll("#message-lines p");
  lines.forEach((p, i) => {
    p.classList.remove("show");
    setTimeout(() => p.classList.add("show"), 500 + i*700);
  });
}
document.getElementById("message-continue-btn").addEventListener("click", () => {
  transitionTo("screen-memories");
  initMemories();
});

/* ==========================================================
   MEMORIES SECTION
   ========================================================== */
function initMemories(){
  const grid = document.getElementById("memories-grid");
  grid.innerHTML = "";
  CONFIG.memories.forEach(m => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.innerHTML = `
      <div class="polaroid-img"><img src="${m.image}" alt="" onerror="this.style.display='none';"></div>
      <div class="memory-date">${m.date}</div>
      <div class="memory-text">${m.text}</div>
    `;
    card.addEventListener("click", () => card.classList.toggle("open"));
    grid.appendChild(card);
  });
}
document.getElementById("memories-continue-btn").addEventListener("click", () => {
  transitionTo("screen-games");
  initGames();
});

/* ==========================================================
   GAMES HUB — one game at a time, sequential
   ========================================================== */
const TOTAL_GAMES = 4;
let currentGame = 1;

function buildGameProgressTrack(){
  const track = document.getElementById("game-progress-track");
  track.innerHTML = "";
  for(let i=1;i<=TOTAL_GAMES;i++){
    const h = document.createElement("span");
    h.className = "progress-heart";
    h.dataset.i = i;
    h.textContent = "♡";
    track.appendChild(h);
    if(i < TOTAL_GAMES){
      const line = document.createElement("span");
      line.className = "progress-line";
      track.appendChild(line);
    }
  }
}
function completeGameHeart(n){
  const heart = document.querySelector(`#game-progress-track .progress-heart[data-i="${n}"]`);
  if(heart){ heart.textContent = "♥"; heart.classList.add("filled"); }
}
function goToGame(n){
  currentGame = n;
  document.querySelectorAll(".game-panel").forEach(p => {
    p.classList.toggle("active", Number(p.dataset.game) === n);
  });
}
function nextGame(){
  completeGameHeart(currentGame);
  if(currentGame >= TOTAL_GAMES){
    setTimeout(() => {
      transitionTo("screen-spinner");
      initSpinner();
    }, 900);
    return;
  }
  setTimeout(() => goToGame(currentGame + 1), 900);
}

function initGames(){
  buildGameProgressTrack();
  goToGame(1);
  initQuiz();
  initDontTouch();
  initAnnoying();
  initCrazyButton();
}

/* ---- Sister quiz (game 1) ---- */
function initQuiz(){
  const body = document.getElementById("quiz-body");
  let q = 0, correct = 0;
  function render(){
    if(q >= CONFIG.quizQuestions.length){
      body.innerHTML = `<p class="task-sub small">You know yourself pretty well 😂❤️ (${correct}/${CONFIG.quizQuestions.length})</p>`;
      nextGame();
      return;
    }
    const item = CONFIG.quizQuestions[q];
    body.innerHTML = `<p class="task-sub small">${item.question}</p>`;
    item.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "quiz-option";
      b.textContent = opt;
      b.addEventListener("click", () => {
        const allBtns = body.querySelectorAll(".quiz-option");
        allBtns.forEach(x => x.disabled = true);
        if(i === item.answer){
          b.classList.add("correct");
          correct++;
        } else {
          b.classList.add("wrong");
          allBtns[item.answer].classList.add("correct");
        }
        setTimeout(() => { q++; render(); }, 900);
      });
      body.appendChild(b);
    });
  }
  render();
}

/* ---- Don't touch the wrong heart (game 2) ---- */
function initDontTouch(){
  const field = document.getElementById("dont-touch-field");
  const msg = document.getElementById("dont-touch-msg");
  field.innerHTML = "";
  msg.textContent = "";
  const total = 8;
  const safeIndex = Math.floor(Math.random()*total);
  for(let i=0;i<total;i++){
    const h = document.createElement("div");
    h.className = "dont-touch-heart";
    h.textContent = i === safeIndex ? "💗" : "❤️";
    h.style.left = (5 + Math.random()*85) + "%";
    h.style.top = (5 + Math.random()*75) + "%";
    h.style.animationDelay = (Math.random()*2) + "s";
    h.addEventListener("click", () => {
      if(i === safeIndex){
        msg.textContent = "Phew! You picked the safe one 💗";
        burstFromElement(h);
      } else {
        msg.textContent = "Oops! That was the wrong one 😂";
      }
      field.querySelectorAll(".dont-touch-heart").forEach(el => el.style.pointerEvents = "none");
      nextGame();
    });
    field.appendChild(h);
  }
}

/* ---- Who's more annoying (game 3) ---- */
function initAnnoying(){
  const msg = document.getElementById("annoying-msg");
  msg.textContent = "";
  msg.classList.remove("big-pink-msg");
  document.querySelectorAll(".annoying-buttons button").forEach(btn => {
    btn.disabled = false;
    btn.onclick = () => {
      document.querySelectorAll(".annoying-buttons button").forEach(b => b.disabled = true);
      setTimeout(() => {
        msg.textContent = "naku telusu akka adi nuvve ani 😁";
        msg.classList.add("big-pink-msg");
        setTimeout(() => nextGame(), 2600);
      }, 1100);
    };
  });
}

/* ---- Crazy button (game 4) ---- */
function initCrazyButton(){
  const btn = document.getElementById("crazy-btn");
  const msg = document.getElementById("crazy-msg");
  msg.textContent = "";
  btn.disabled = false;
  btn.onclick = () => {
    msg.textContent = "YOU ACTUALLY CLICKED IT 😂 I knew you would.";
    burstFromElement(btn);
    btn.disabled = true;
    nextGame();
  };
}

/* ==========================================================
   SPINNER (predetermined, looks random)
   ========================================================== */
   
function initSpinner(){
  const canvas = document.getElementById("spinner-canvas");
  const ctx = canvas.getContext("2d");
  const options = CONFIG.spinnerOptions;
  const n = options.length;
  const colors = ["#ffc1d9", "#ff8fb8", "#ffe4ef", "#ff5f95"];
  const radius = canvas.width/2;
  let currentRotation = 0;

  function drawWheel(rotation){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(rotation * Math.PI/180);
    const slice = (Math.PI*2) / n;
    for(let i=0;i<n;i++){
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.fillStyle = colors[i % colors.length];
      ctx.arc(0,0, radius-4, i*slice, (i+1)*slice);
      ctx.closePath();
      ctx.fill();
      ctx.save();
      ctx.rotate(i*slice + slice/2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#6b3550";
      ctx.font = "bold 13px Quicksand, sans-serif";
      const words = options[i].split(" ");
      let line = "";
      let lines = [];
      words.forEach(w => {
        if((line+w).length > 14){ lines.push(line); line = w+" "; }
        else line += w+" ";
      });
      lines.push(line);
      lines.forEach((l, li) => {
        ctx.fillText(l.trim(), radius-18, (li - (lines.length-1)/2) * 14);
      });
      ctx.restore();
    }
    ctx.restore();
  }
  drawWheel(0);

  document.getElementById("spin-btn").onclick = function(){
    this.disabled = true;
    const slice = 360/n;
    // center angle of the winning slice, adjusted so pointer (top, 0deg) lands on it
    const targetSliceCenter = (CONFIG.winningSpinnerOption * slice) + slice/2;
    const fullSpins = 6 * 360;
    const finalRotation = fullSpins + (360 - targetSliceCenter);

    const duration = 4200;
    const start = performance.now();
    const from = currentRotation % 360;
    const totalRotation = finalRotation;

    function easeOutBounce(t){
      // custom smooth deceleration with tiny bounce at the end
      if(t < 0.9){
        const p = t/0.9;
        return 1 - Math.pow(1-p, 3);
      }
      const p = (t-0.9)/0.1;
      return 1 + Math.sin(p*Math.PI) * 0.015 * (1-p);
    }
    function animate(now){
      const elapsed = now - start;
      const t = Math.min(elapsed/duration, 1);
      const eased = easeOutBounce(t);
      currentRotation = from + totalRotation * eased;
      drawWheel(currentRotation);
      if(t < 1){
        requestAnimationFrame(animate);
      } else {
        currentRotation = from + totalRotation;
        drawWheel(currentRotation);
        const resultEl = document.getElementById("spinner-result");
        resultEl.textContent = "akka niku edi vadda sare aite ni istam ❤️";
        burstFromElement(document.getElementById("spinner-canvas"));
        setTimeout(() => {
          transitionTo("screen-final");
          startFinalCelebration();
        }, 4200);
      }
    }
    requestAnimationFrame(animate);
  };
}

/* ==========================================================
   FINAL CELEBRATION
   ========================================================== */
function startFinalCelebration(){
  document.getElementById("final-message").textContent =
    "I love you so much akka \u2764\ufe0f";

  createFireworkBursts();
  runConfetti();
}
function createFireworkBursts(){
  const w = window.innerWidth, h = window.innerHeight;
  let count = 0;
  const interval = setInterval(() => {
    const x = 60 + Math.random()*(w-120);
    const y = 80 + Math.random()*(h*0.5);
    createParticles(x, y, 16);
    count++;
    if(count > 6) clearInterval(interval);
  }, 500);
}
function runConfetti(){
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  const colors = ["#ff8fb8","#ff5f95","#ffd6e7","#f4d58d","#ffffff"];
  const pieces = Array.from({length:90}, () => ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height,
    size: 5 + Math.random()*6,
    speed: 1.5 + Math.random()*2.5,
    drift: (Math.random()-0.5)*1.5,
    rot: Math.random()*360,
    rotSpeed: (Math.random()-0.5)*6,
    color: colors[Math.floor(Math.random()*colors.length)]
  }));
  let running = true;
  function tick(){
    if(!running) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rotSpeed;
      if(p.y > canvas.height + 20){ p.y = -20; p.x = Math.random()*canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.5);
      ctx.restore();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

/* ==========================================================
   AUDIO — dual-track crossfade so the music changes smoothly
   whenever the person moves into a screen with its own track
   ========================================================== */
let crossfadeForScreen = () => {}; // reassigned below once audio is set up

(function audioControl(){
  const btn = document.getElementById("music-btn");
  const audioA = document.getElementById("bg-audio");   // starts as the default track
  const audioB = document.getElementById("bg-audio-b"); // silent spare, used for crossfades
  const FADE_MS = 1800;

  let active = audioA;   // whichever <audio> is currently the "front" track
  let spare = audioB;
  let playing = false;
  let currentSrc = CONFIG.music;
  let fadeTimer = null;

  function resolveTrackForScreen(id){
    return (CONFIG.sectionMusic && CONFIG.sectionMusic[id]) || CONFIG.music;
  }

  function crossfadeTo(src){
    if(!src || src === currentSrc) return;
    currentSrc = src;
    if(!playing){
      // music hasn't been started yet — just remember the track for whenever
      // the person presses play, no fade needed
      active.src = src;
      return;
    }
    clearInterval(fadeTimer);
    spare.src = src;
    spare.currentTime = 0;
    spare.volume = 0;
    spare.play().catch(() => {});

    const steps = 36;
    let i = 0;
    fadeTimer = setInterval(() => {
      i++;
      const t = i / steps;
      spare.volume = Math.min(1, t);
      active.volume = Math.max(0, 1 - t);
      if(i >= steps){
        clearInterval(fadeTimer);
        active.pause();
        active.currentTime = 0;
        active.volume = 1;
        const oldActive = active;
        active = spare;
        spare = oldActive;
      }
    }, FADE_MS / steps);
  }

  crossfadeForScreen = (id) => crossfadeTo(resolveTrackForScreen(id));

  btn.addEventListener("click", () => {
    if(!playing){
      active.src = currentSrc;
      active.volume = 1;
      active.play().then(() => {
        playing = true;
        btn.classList.add("playing");
      }).catch(() => {
        // autoplay / play blocked — silently ignore, user can try again
      });
    } else {
      clearInterval(fadeTimer);
      audioA.pause();
      audioB.pause();
      playing = false;
      btn.classList.remove("playing");
    }
  });
})();
