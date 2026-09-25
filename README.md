// Glimpse app logic
// This file manages the weekly VS battle data, localStorage vote locking,
// comment feed behavior, countdown timer, and optional Supabase integration.

const battleData = [
  {
    id: 'politics-week-01',
    category: 'politics',
    title: 'Who should lead the next real change?',
    contender1_name: 'Peter Obi',
    contender1_img_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    contender2_name: 'Tinubu',
    contender2_img_url:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    votes1: 58,
    votes2: 42,
    status: 'hot'
  },
  {
    id: 'afrobeats-week-01',
    category: 'afrobeats',
    title: 'Who owns the streets right now?',
    contender1_name: 'Asake',
    contender1_img_url:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    contender2_name: 'Burna Boy',
    contender2_img_url:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    votes1: 64,
    votes2: 36,
    status: 'viral'
  },
  {
    id: 'cinema-week-01',
    category: 'cinema',
    title: 'Who is the biggest box-office pull?',
    contender1_name: 'Funke Akindele',
    contender1_img_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    contender2_name: 'RMD',
    contender2_img_url:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    votes1: 51,
    votes2: 49,
    status: 'tight'
  }
];

const commentSeed = [
  {
    id: 1,
    author: 'Tale99',
    text: 'This one is actually too close. The comments section is the real battle tonight 😂',
    time: '2m ago',
    score: 142
  },
  {
    id: 2,
    author: 'NaijaVibes',
    text: 'I came here to argue and now I can’t leave. The polling vibe is so addictive.',
    time: '8m ago',
    score: 321
  },
  {
    id: 3,
    author: 'LagosHeat',
    text: 'No one is talking about the real winner in the room. This platform has a ton of energy.',
    time: '14m ago',
    score: 198
  }
];

const STORAGE_KEY = 'glimpse-votes';
const COMMENT_STORAGE_KEY = 'glimpse-comments';

const battleArena = document.getElementById('battleArena');
const commentFeed = document.getElementById('commentFeed');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentHandle = document.getElementById('commentHandle');
const countdownTimer = document.getElementById('countdownTimer');
const tabs = document.querySelectorAll('.tab');

let selectedCategory = 'politics';
let activeVoteLock = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
let comments = JSON.parse(localStorage.getItem(COMMENT_STORAGE_KEY) || 'null') || commentSeed;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getTotalVotes(item) {
  return Number(item.votes1 || 0) + Number(item.votes2 || 0);
}

function calculatePercentage(votes, total) {
  if (!total) return 0;
  return Math.round((votes / total) * 100);
}

function formatCompactNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function getBattleByCategory(category) {
  return battleData.filter((item) => item.category === category);
}

function getLockedBattleIds() {
  return Object.keys(activeVoteLock || {});
}

function isBattleLocked(id) {
  return Boolean(activeVoteLock[id]);
}

function saveVoteLock() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activeVoteLock));
}

function renderBattleCard(item) {
  const totalVotes = getTotalVotes(item);
  const p1 = calculatePercentage(item.votes1, totalVotes);
  const p2 = calculatePercentage(item.votes2, totalVotes);
  const isLocked = isBattleLocked(item.id);

  const card = document.createElement('article');
  card.className = `battle-card ${isLocked ? 'voted' : ''}`;
  card.dataset.battleId = item.id;

  card.innerHTML = `
    <div class="battle-media">
      <img src="${item.contender1_img_url}" alt="${item.contender1_name}" />
      <div class="battle-overlay">
        <span class="battle-name">${item.contender1_name}</span>
      </div>
    </div>
    <div class="battle-body">
      <div class="vote-meta">
        <span>${p1}%</span>
        <span class="vote-divider"></span>
        <span>${formatCompactNumber(item.votes1)} votes</span>
      </div>
      <div class="vote-progress" aria-label="Vote percentage for ${item.contender1_name}">
        <div class="vote-progress-bar" style="width: ${p1}%"></div>
      </div>

      <button
        class="vote-button ${isLocked ? 'voted' : ''}"
        data-battle-id="${item.id}"
        data-contender="1"
        type="button"
        ${isLocked ? 'disabled' : ''}
      >
        ${isLocked ? 'VOTE LOCKED' : 'VOTE'}
      </button>
    </div>
  `;

  return card;
}

function renderBattleArena() {
  const items = getBattleByCategory(selectedCategory);
  battleArena.innerHTML = '';

  if (!items.length) {
    battleArena.innerHTML = '<p class="empty-state">No active battles in this category yet.</p>';
    return;
  }

  items.forEach((item) => {
    const card = renderBattleCard(item);
    battleArena.appendChild(card);

    const voteBtn = card.querySelector('.vote-button');
    voteBtn.addEventListener('click', async () => handleVoteClick(item, 1, voteBtn));
  });
}

async function handleVoteClick(item, contenderIndex, btn) {
  if (isBattleLocked(item.id)) return;

  btn.classList.add('is-animating');
  btn.disabled = true;

  // Example: local bot protection before DB write.
  const voteLock = { ...activeVoteLock, [item.id]: true };
  activeVoteLock = voteLock;
  saveVoteLock();

  if (contenderIndex === 1) {
    item.votes1 += 1;
  } else {
    item.votes2 += 1;
  }

  btn.textContent = 'VOTE LOCKED';
  btn.classList.add('voted');

  // Optional DB persistence placeholder.
  // Replace the following with your Supabase or Firebase API.
  await persistVoteToDatabase(item, contenderIndex);

  renderBattleArena();

  setTimeout(() => btn.classList.remove('is-animating'), 250);
}

async function persistVoteToDatabase(item, contenderIndex) {
  // =========================================
  // Supabase example (client-side placeholder):
  // const { createClient } = await import('https://esm.sh/@supabase/supabase-js');
  // const supabaseUrl = 'https://YOUR_PROJECT_REF.supabase.co';
  // const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
  // const supabase = createClient(supabaseUrl, supabaseKey);
  // const { error } = await supabase.from('glimpse_votes').insert({
  //   battle_id: item.id,
  //   category: item.category,
  //   chosen_contender: contenderIndex,
  //   contender_1_name: item.contender1_name,
  //   contender_2_name: item.contender2_name,
  //   created_at: new Date().toISOString()
  // });
  // if (error) console.error('Supabase vote insert error:', error);
  // =========================================

  // Firebase example (client-side placeholder):
  // const db = firebase.database();
  // db.ref('glimpse_votes/' + item.id).push({
  //   contender: contenderIndex,
  //   timestamp: Date.now()
  // });

  // For static GitHub Pages deployments, this is intentionally a stub.
  console.log('Vote recorded locally and ready for backend sync:', {
    battleId: item.id,
    contenderIndex,
    timestamp: new Date().toISOString()
  });
}

function renderCommentItem(comment) {
  const wrapper = document.createElement('article');
  wrapper.className = 'comment-item';

  const initial = (comment.author || 'A').charAt(0).toUpperCase();

  wrapper.innerHTML = `
    <div class="comment-avatar">${initial}</div>
    <div class="comment-main">
      <div class="comment-header">
        <span class="comment-author">${comment.author || 'Anonymous'}</span>
        <span class="comment-time">${comment.time || 'now'}</span>
      </div>
      <p class="comment-text">${comment.text}</p>
      <div class="comment-actions">
        <span class="comment-score">
          <button type="button" aria-label="Upvote comment">▲</button>
          <strong>${comment.score || 0}</strong>
          <button type="button" aria-label="Downvote comment">▼</button>
        </span>
        <button type="button" class="comment-reply">Reply</button>
      </div>
    </div>
  `;

  return wrapper;
}

function renderComments() {
  commentFeed.innerHTML = '';

  comments.forEach((comment) => {
    const node = renderCommentItem(comment);
    commentFeed.appendChild(node);
  });
}

function saveComments() {
  localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
}

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = commentInput.value.trim();
  const author = commentHandle.value.trim() || 'Anonymous';

  if (!text) {
    commentInput.focus();
    return;
  }

  const newComment = {
    id: Date.now(),
    author,
    text,
    time: 'now',
    score: 0
  };

  comments = [newComment, ...comments];
  saveComments();
  renderComments();

  commentForm.reset();
  commentInput.focus();
});

function updateCountdown() {
  const now = new Date();
  const nextSunday = new Date(now);
  const day = now.getDay();

  const daysUntilSunday = (7 - day) % 7 || 7;
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(18, 0, 0, 0);

  let diff = nextSunday.getTime() - now.getTime();

  if (diff <= 0) {
    diff = 0;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownTimer.textContent = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

function setupTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
      selectedCategory = tab.dataset.category;
      renderBattleArena();
    });
  });
}

function init() {
  renderBattleArena();
  renderComments();
  setupTabs();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

init();

// Optional: In production, replace this stub with a real Supabase/Firebase config.
// Example Supabase config:
// import { createClient } from 'https://esm.sh/@supabase/supabase-js';
// const supabase = createClient('https://YOUR_PROJECT_REF.supabase.co', 'YOUR_ANON_KEY');
// use `supabase.from('glimpse_votes')...` to insert and fetch data.

// Example Firebase config:
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
// import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
// const firebaseConfig = { apiKey: 'YOUR_API_KEY', authDomain: 'YOUR_PROJECT.firebaseapp.com', databaseURL: 'https://YOUR_PROJECT-default-rtdb.firebaseio.com', projectId: 'YOUR_PROJECT' };
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// Google Analytics is already wired in index.html via GA4 snippet.
// Replace G-XXXXXXXXXX with your real measurement ID before deployment.

// The static architecture is intentionally lightweight for GitHub Pages and AdSense compatibility.
// Keep images remote-hosted to avoid bloating the repo and ensure fast mobile load speeds.

// localStorage usage note:
// This prevents repeated voting from the same browser on the same battle.
// It is a lightweight guard and not a production-grade anti-bot system.

// If you want truly permanent storage, add a backend table and sync votes there from this client.
// This project is intentionally simple and 100% static for GitHub Pages hosting.

// The vote lock is keyed per battle id: glimspe-votes => { [battleId]: true }
// You can extend it with user-agent hashing or a signed server-side check later.

// To add more battles, update the `battleData` array near the top of this file.
// Each object includes: id, category, contender1_name, contender1_img_url, contender2_name, contender2_img_url.

// Example:
// {
//   id: 'politics-week-02',
//   category: 'politics',
//   contender1_name: 'Name 1',
//   contender1_img_url: 'https://example.com/image1.jpg',
//   contender2_name: 'Name 2',
//   contender2_img_url: 'https://example.com/image2.jpg',
//   votes1: 50,
//   votes2: 50
// }

// This static setup is fast, lightweight, and easy to deploy on GitHub Pages.
// For production-level traffic you can later layer in Supabase or Firebase analytics + serverless functions.

// End of file
