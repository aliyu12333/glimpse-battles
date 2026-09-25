* {
  box-sizing: border-box;
}

:root {
  --bg: #090b11;
  --bg-elevated: #11141d;
  --bg-card: rgba(18, 21, 31, 0.94);
  --panel: #161b27;
  --panel-soft: #1d2432;
  --line: rgba(255, 255, 255, 0.08);
  --text: #edf1f7;
  --muted: #a8b3c7;
  --muted-strong: #dfe7f7;
  --green: #2ee59d;
  --green-strong: #00d98f;
  --green-soft: rgba(46, 229, 157, 0.12);
  --purple: #8a5cff;
  --purple-soft: rgba(138, 92, 255, 0.14);
  --pink: #ff4d9d;
  --orange: #ffb84d;
  --red: #ff5f7a;
  --shadow: 0 20px 50px rgba(0, 0, 0, 0.38);
  --radius-xl: 28px;
  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 12px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at 20% 0%, rgba(138, 92, 255, 0.15), transparent 35%),
    radial-gradient(circle at 90% 10%, rgba(46, 229, 157, 0.18), transparent 30%),
    var(--bg);
  color: var(--text);
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 26px 18px 70px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  background: rgba(13, 16, 23, 0.72);
  border: 1px solid var(--line);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 12px;
  z-index: 20;
  box-shadow: var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #08110d;
  background: linear-gradient(135deg, var(--green), #7bffb0);
  box-shadow: 0 10px 18px rgba(46, 229, 157, 0.35);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.brand-tag {
  color: var(--muted);
  font-size: 0.66rem;
}

.category-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px;
}

.tab {
  border: 0;
  background: transparent;
  color: var(--muted-strong);
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.tab.active {
  background: linear-gradient(135deg, rgba(46, 229, 157, 0.2), rgba(138, 92, 255, 0.18));
  color: var(--text);
  box-shadow: inset 0 0 0 1px rgba(46, 229, 157, 0.2);
}

.countdown-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 12px;
  min-width: 170px;
}

.countdown-label {
  font-size: 0.66rem;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

#countdownTimer {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.main-content {
  padding-top: 24px;
}

.battle-stage,
.comment-section {
  background: rgba(18, 21, 31, 0.8);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
}

.battle-stage {
  padding: 18px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
}

.section-heading.compact {
  margin-bottom: 16px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  color: var(--green);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}

.section-heading h1,
.section-heading h2 {
  margin: 0;
  letter-spacing: -0.06em;
}

.section-heading h1 {
  font-size: clamp(1.8rem, 2vw, 2.4rem);
}

.section-heading h2 {
  font-size: clamp(1.3rem, 2vw, 1.8rem);
}

.ghost-button,
.primary-button {
  border: 0;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ghost-button {
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  border: 1px solid var(--line);
  padding: 10px 14px;
  font-weight: 600;
}

.primary-button {
  background: linear-gradient(135deg, var(--green), #65ffb4);
  color: #07150d;
  font-weight: 800;
  box-shadow: 0 14px 26px rgba(46, 229, 157, 0.3);
}

.primary-button.small {
  padding: 11px 18px;
}

.ghost-button:hover,
.primary-button:hover,
.tab:hover {
  transform: translateY(-1px);
}

.battle-arena {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.battle-card {
  position: relative;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.015));
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 480px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.battle-card:hover {
  transform: translateY(-3px);
  border-color: rgba(138, 92, 255, 0.4);
}

.battle-card.voted {
  box-shadow: inset 0 0 0 1px rgba(46, 229, 157, 0.35);
}

.battle-media {
  position: relative;
  height: 310px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(138, 92, 255, 0.18), rgba(46, 229, 157, 0.12));
}

.battle-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.06) contrast(1.04);
}

.battle-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 18px 18px 12px;
  background: linear-gradient(180deg, transparent, rgba(5, 7, 12, 0.88));
}

.battle-name {
  display: block;
  max-width: 90%;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.battle-body {
  padding: 18px 18px 20px;
}

.vote-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  color: var(--muted);
}

.vote-divider {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.vote-count {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text);
}

.vote-progress {
  width: 100%;
  height: 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--line);
  margin-bottom: 18px;
}

.vote-progress-bar {
  height: 100%;
  width: 0%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--green), var(--purple));
  box-shadow: inset 0 0 14px rgba(255, 255, 255, 0.1);
  transition: width 0.45s ease;
}

.vote-button {
  width: 100%;
  border: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--purple), #b17dff);
  color: #f6f3ff;
  font-weight: 900;
  padding: 18px 16px;
  font-size: 1.08rem;
  letter-spacing: 0.04em;
  box-shadow: 0 16px 24px rgba(138, 92, 255, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.vote-button:active {
  transform: scale(0.98);
}

.vote-button.voted {
  background: linear-gradient(135deg, var(--green), #5af5ae);
  color: #07150d;
  box-shadow: 0 14px 24px rgba(46, 229, 157, 0.28);
}

.vote-button:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

.vote-button.is-animating {
  animation: votePulse 0.45s ease;
}

@keyframes votePulse {
  0% { transform: scale(1); }
  30% { transform: scale(1.04); }
  65% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

.comment-section {
  margin-top: 24px;
  padding: 18px;
}

.comment-pill {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(46, 229, 157, 0.08);
  border: 1px solid rgba(46, 229, 157, 0.2);
  color: var(--green);
  font-size: 0.78rem;
  font-weight: 700;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 0 18px;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

#commentHandle,
#commentInput {
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 14px;
  color: var(--text);
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

#commentHandle:focus,
#commentInput:focus {
  border-color: rgba(138, 92, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(138, 92, 255, 0.14);
}

#commentHandle {
  max-width: 220px;
}

#commentInput {
  resize: vertical;
  min-height: 84px;
}

.comment-feed {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}

.comment-item {
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px 14px 12px;
}

.comment-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--green), var(--purple));
  font-weight: 800;
  color: #0a140e;
  flex-shrink: 0;
}

.comment-main {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.comment-author {
  font-weight: 700;
  letter-spacing: -0.03em;
}

.comment-time {
  font-size: 0.72rem;
  color: var(--muted);
}

.comment-text {
  color: var(--muted-strong);
  line-height: 1.55;
  margin: 0;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  color: var(--muted);
  font-size: 0.78rem;
}

.comment-score {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 8px;
}

.comment-score button {
  background: none;
  border: 0;
  color: var(--muted);
  font-size: 1rem;
  padding: 0;
}

.comment-reply {
  border: 0;
  background: none;
  color: var(--green);
  padding: 0;
  font-weight: 700;
}

@media (max-width: 900px) {
  .topbar {
    flex-wrap: wrap;
  }

  .brand-wrap {
    flex: 1 1 100%;
  }

  .countdown-box {
    margin-left: auto;
  }
}

@media (max-width: 720px) {
  .app-shell {
    padding-left: 12px;
    padding-right: 12px;
  }

  .topbar {
    padding: 16px 14px;
  }

  .category-tabs {
    width: 100%;
    justify-content: space-between;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .category-tabs::-webkit-scrollbar {
    display: none;
  }

  .tab {
    flex: 1 0 auto;
    text-align: center;
  }

  .countdown-box {
    width: 100%;
    align-items: flex-start;
  }

  .battle-arena {
    grid-template-columns: 1fr;
  }

  .author-row {
    flex-direction: column;
    align-items: stretch;
  }

  #commentHandle {
    max-width: none;
  }
}
