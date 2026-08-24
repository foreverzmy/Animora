const animations = [
  ["09", "9", 650, 450, 200, 12, 1, 0], ["10", "10", 502, 400, 116, 12, 0, 0],
  ["27", "27", 550, 400, 690, 12, 1, 0], ["37", "37", 800, 500, 705, 12, 0, 0],
  ["40", "40", 780, 750, 975, 12, 1, 0], ["42", "42", 550, 400, 501, 12, 1, 0],
  ["46", "46", 550, 400, 581, 12, 1, 0], ["47", "47", 700, 400, 180, 12, 0, 0],
  ["52", "52", 1028, 686, 2000, 12, 1, 1], ["55", "55", 1028, 686, 1420, 12, 0, 1],
  ["90", "90", 500, 400, 697, 12, 0, 0], ["92", "92", 681, 475, 1801, 12, 0, 0],
  ["94", "94", 562, 393, 1, 12, 0, 0], ["96", "96", 670, 407, 600, 12, 0, 0],
  ["110", "110", 750, 450, 950, 12, 1, 0], ["111", "111", 750, 450, 1000, 12, 0, 0],
  ["113", "113", 550, 400, 631, 20, 0, 0], ["610", "610", 550, 400, 1, 12, 0, 0],
  ["629", "629", 550, 400, 150, 12, 0, 0], ["685", "685", 550, 400, 720, 12, 0, 0],
  ["689", "689", 550, 400, 300, 12, 0, 0], ["693", "693", 550, 400, 90, 12, 0, 0],
  ["694", "694", 550, 400, 205, 12, 0, 0], ["695", "695", 600, 400, 200, 12, 0, 0],
  ["696", "696", 550, 400, 700, 12, 0, 0], ["698", "698", 550, 400, 120, 12, 0, 0],
  ["蝴蝶气泡", "蝴蝶气泡", 700, 500, 76, 12, 0, 0], ["落叶", "落叶", 550, 400, 500, 12, 0, 0],
  ["木篱", "木篱", 500, 350, 76, 12, 0, 0], ["清纯百合", "清纯百合", 500, 400, 510, 12, 0, 0],
  ["清纯百合-M", "清纯百合-M", 500, 400, 510, 12, 1, 0], ["蜻蜓飞舞", "蜻蜓飞舞", 450, 300, 101, 20, 0, 0],
  ["蜻蜓向日葵", "蜻蜓向日葵", 550, 400, 236, 12, 0, 0], ["认识不如意", "认识不如意", 550, 400, 965, 12, 0, 0],
  ["三朵金花", "三朵金花", 750, 600, 120, 12, 0, 0], ["圣洁百合", "圣洁百合", 550, 450, 739, 12, 1, 0],
  ["跳鲤", "跳鲤", 700, 500, 700, 12, 0, 0], ["小船漂流", "小船漂流", 750, 500, 240, 12, 0, 0]
].map(([route, title, width, height, frames, fps, audio, vector], index) => ({
  route, title, width, height, frames, fps, audio: Boolean(audio), vector: Boolean(vector), index
}));

const grid = document.querySelector("#animation-grid");
const search = document.querySelector("#search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

const durationLabel = ({ frames, fps }) => {
  if (frames <= 1) return "静态画面";
  const seconds = Math.round(frames / fps);
  if (seconds < 60) return `${seconds} 秒`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest ? `${minutes} 分 ${rest} 秒` : `${minutes} 分钟`;
};

const card = (item) => {
  const article = document.createElement("article");
  article.className = "animation-card";
  article.style.setProperty("--card-hue", String((item.index * 31 + 72) % 360));

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `./${encodeURIComponent(item.route)}/`;
  link.setAttribute("aria-label", `播放动画 ${item.title}`);

  link.innerHTML = `
    <div class="card-top">
      <span>ANIMORA / ${String(item.index + 1).padStart(2, "0")}</span>
      <span class="card-arrow" aria-hidden="true">↗</span>
    </div>
    <h3 class="card-title"></h3>
    <div class="card-meta">
      <span>${item.width} × ${item.height}</span>
      <span>${item.fps} FPS</span>
      <span>${durationLabel(item)}</span>
      <span>${item.vector ? "VECTOR" : item.audio ? "AUDIO" : "CANVAS"}</span>
    </div>`;
  link.querySelector(".card-title").textContent = item.title;
  article.append(link);
  return article;
};

const render = (query = "") => {
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  const visible = animations.filter((item) => item.title.toLocaleLowerCase("zh-CN").includes(normalized));
  grid.replaceChildren(...visible.map(card));
  resultCount.textContent = String(visible.length);
  emptyState.hidden = visible.length !== 0;
};

search.addEventListener("input", () => render(search.value));
render();
