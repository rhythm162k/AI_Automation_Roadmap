const storageKey = "ai-automation-roadmap-v1";
const byId = (id) => document.getElementById(id);
const weeks = [
  "Workflow foundations", "APIs and integrations", "AI API integration",
  "Code-first automation", "Agents and tools", "Portfolio project",
];
const dateFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" });
const resources = new Map(plan.resources.map((resource) => [resource.id, resource]));
const pages = ["roadmap", "project", "resources"];
let state = emptyState();
let statusTimer;

function emptyState() {
  return { version: 1, selected: 1, done: {}, notes: {}, checklist: {} };
}

function validatedState(data) {
  if (data?.version !== 1 || !Number.isInteger(data.selected) ||
      data.selected < 1 || data.selected > plan.days.length) {
    throw new Error("Invalid backup");
  }
  const result = emptyState();
  result.selected = data.selected;
  for (const [field, max, valueType] of [
    ["done", plan.days.length, "boolean"],
    ["notes", plan.days.length, "string"],
    ["checklist", plan.checklist.length, "boolean"],
  ]) {
    const values = data[field];
    if (!values || typeof values !== "object" || Array.isArray(values)) throw new Error("Invalid backup");
    for (const [key, value] of Object.entries(values)) {
      if (!/^[1-9]\d*$/.test(key) || Number(key) > max || typeof value !== valueType) {
        throw new Error("Invalid backup");
      }
      result[field][key] = value;
    }
  }
  return result;
}

function message(text) {
  const status = byId("status");
  status.hidden = false;
  status.textContent = text;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { status.hidden = true; }, 4800);
}

try {
  const stored = localStorage.getItem(storageKey);
  if (stored) state = validatedState(JSON.parse(stored));
} catch {
  message("Saved progress could not be loaded.");
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch {
    message("This browser could not save progress. Export a backup to keep your changes.");
    return false;
  }
}

function externalLink(node, resource) {
  node.href = resource.url;
  node.target = "_blank";
  node.rel = "noopener noreferrer";
}

function showPage() {
  const requested = location.hash.slice(1);
  const active = pages.includes(requested) ? requested : "roadmap";
  for (const page of pages) {
    byId(page).hidden = page !== active;
    const link = document.querySelector(`[data-page="${page}"]`);
    if (page === active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function updateProgress() {
  const completed = plan.days.filter(({ day }) => state.done[day]).length;
  byId("percent").textContent = `${Math.round(completed / plan.days.length * 100)}%`;
  byId("progress").value = completed;
  byId("progress-label").textContent = `${completed} of ${plan.days.length} days complete`;
  byId("resume").disabled = completed === plan.days.length;
  byId("resume").textContent = completed === plan.days.length ? "All days complete" : "Go to next unfinished day";
}

function openDay(day, moveFocus = false) {
  state.selected = day;
  save();
  renderWeeks();
  renderDay();
  if (moveFocus) byId("lesson-title").focus();
}

function renderWeeks() {
  const list = byId("weeks");
  const opened = new Set([...list.querySelectorAll("details[open]")].map(({ dataset }) => Number(dataset.week)));
  list.replaceChildren();
  weeks.forEach((title, index) => {
    const days = plan.days.slice(index * 7, (index + 1) * 7);
    const week = document.createElement("details");
    week.className = "week";
    week.dataset.week = index;
    week.open = opened.has(index) || days.some(({ day }) => day === state.selected);
    const summary = document.createElement("summary");
    summary.textContent = title;
    const count = document.createElement("span");
    count.textContent = `${days.filter(({ day }) => state.done[day]).length}/${days.length}`;
    summary.append(count);
    week.append(summary);
    for (const { day, title: topic } of days) {
      const button = document.createElement("button");
      button.className = "day";
      if (day === state.selected) button.setAttribute("aria-current", "step");
      button.setAttribute("aria-label", `Day ${day}: ${topic}${state.done[day] ? ", complete" : ""}`);
      const mark = document.createElement("span");
      mark.className = state.done[day] ? "day-mark done" : "day-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = state.done[day] ? "✓" : String(day).padStart(2, "0");
      button.append(mark, topic);
      button.addEventListener("click", () => openDay(day, true));
      week.append(button);
    }
    list.append(week);
  });
}

function renderDay() {
  const { day, date, title, task, resource: resourceId } = plan.days[state.selected - 1];
  const resource = resources.get(resourceId);
  byId("lesson").innerHTML = `
    <p class="eyebrow accent" id="day-date"></p>
    <h3 id="lesson-title" tabindex="-1"></h3>
    <div class="exercise"><strong>Practical exercise</strong><p id="exercise-text"></p></div>
    <a class="resource-link" id="day-resource"></a>
    <label class="note-label" for="notes">Session notes</label>
    <textarea id="notes" placeholder="Record what you built, learned, or want to revisit."></textarea>
    <div class="lesson-actions">
      <button class="primary" id="complete" aria-pressed="false"></button>
      <div class="step-buttons"><button id="previous" class="outline">Previous day</button><button id="next" class="outline">Next day</button></div>
    </div>`;
  byId("day-date").textContent = `DAY ${String(day).padStart(2, "0")} / ${plan.days.length} · ${dateFormat.format(new Date(date)).toUpperCase()}`;
  byId("lesson-title").textContent = title;
  byId("exercise-text").textContent = task;
  byId("day-resource").textContent = `${resource.id} · ${resource.title}`;
  externalLink(byId("day-resource"), resource);
  byId("notes").value = state.notes[day] ?? "";
  byId("notes").addEventListener("input", (event) => {
    state.notes[day] = event.target.value;
    save();
  });
  const complete = byId("complete");
  function updateCompletion() {
    complete.textContent = state.done[day] ? "✓ Completed · Undo" : "Mark complete";
    complete.setAttribute("aria-pressed", Boolean(state.done[day]));
  }
  updateCompletion();
  complete.addEventListener("click", () => {
    state.done[day] = !state.done[day];
    save();
    updateCompletion();
    updateProgress();
    renderWeeks();
  });
  byId("previous").disabled = day === 1;
  byId("next").disabled = day === plan.days.length;
  byId("previous").addEventListener("click", () => openDay(day - 1, true));
  byId("next").addEventListener("click", () => openDay(day + 1, true));
}

function renderChecklist() {
  const list = byId("checklist");
  list.replaceChildren();
  plan.checklist.forEach((text, index) => {
    const id = index + 1;
    const label = document.createElement("label");
    label.className = "criterion";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(state.checklist[id]);
    checkbox.addEventListener("change", () => {
      state.checklist[id] = checkbox.checked;
      save();
    });
    label.append(checkbox, text);
    list.append(label);
  });
}

for (const resource of plan.resources) {
  const link = document.createElement("a");
  link.className = "resource";
  externalLink(link, resource);
  const code = document.createElement("span");
  code.textContent = resource.id;
  link.append(code, resource.title);
  byId("resource-list").append(link);
}

function render() {
  renderWeeks();
  renderDay();
  renderChecklist();
  updateProgress();
}

window.addEventListener("hashchange", showPage);
byId("resume").addEventListener("click", () => {
  const next = plan.days.find(({ day }) => !state.done[day]);
  if (next) openDay(next.day, true);
});
byId("export").addEventListener("click", () => {
  const href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = href;
  link.download = "ai-automation-roadmap-progress.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
});
byId("import").addEventListener("click", () => byId("file").click());
byId("file").addEventListener("change", async (event) => {
  const input = event.target;
  const file = input.files[0];
  input.value = "";
  if (!file) return;
  try {
    const imported = validatedState(JSON.parse(await file.text()));
    if (!confirm("Replace this browser’s progress, notes, and checklist with this backup?")) return;
    state = imported;
    if (save()) message("Progress imported.");
    render();
  } catch {
    message("Choose a valid AI Automation Roadmap backup.");
  }
});
byId("reset").addEventListener("click", () => {
  if (!confirm("Clear all completed days, session notes, and project checklist items?")) return;
  state = emptyState();
  if (save()) message("Progress reset.");
  render();
});

showPage();
render();
