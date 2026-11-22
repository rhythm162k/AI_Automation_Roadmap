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
let activeModule = -1;
let focusGallery = false;

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

function lessonRoute(day) {
  return `#day-${day}`;
}

function routedDay() {
  const match = /^#day-([1-9]\d*)$/.exec(location.hash);
  const day = Number(match?.[1]);
  return day <= plan.days.length ? day : null;
}

function showPage() {
  const requested = location.hash.slice(1);
  const day = routedDay();
  const active = pages.includes(requested) ? requested : "roadmap";
  for (const page of pages) {
    byId(page).hidden = page !== active || Boolean(day);
    const link = document.querySelector(`[data-page="${page}"]`);
    if (page === active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  byId("day-view").hidden = !day;
  if (day) {
    state.selected = day;
    save();
    renderDay();
    byId("lesson-title").focus();
  } else if (focusGallery) {
    byId("gallery-title").focus();
  }
  focusGallery = false;
}

function updateProgress() {
  const completed = plan.days.filter(({ day }) => state.done[day]).length;
  const next = plan.days.find(({ day }) => !state.done[day]);
  byId("percent").textContent = `${Math.round(completed / plan.days.length * 100)}%`;
  byId("progress").value = completed;
  byId("progress-label").textContent = `${completed} of ${plan.days.length} days complete`;
  byId("resume-label").textContent = next ? `UP NEXT · DAY ${next.day}` : "ROADMAP COMPLETE";
  byId("resume-title").textContent = next?.title ?? "All 40 days complete";
  byId("resume-task").textContent = next?.task ?? "Revisit your lesson notes or review your final project.";
  byId("resume").hidden = !next;
}

function cardText(tag, className, content) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  return element;
}

function renderGallery() {
  const gallery = byId("gallery");
  const days = activeModule < 0 ? plan.days : plan.days.slice(activeModule * 7, (activeModule + 1) * 7);
  byId("lesson-count").textContent = `${days.length} lessons`;
  gallery.replaceChildren();
  for (const { day, date, title, task } of days) {
    const module = weeks[Math.floor((day - 1) / 7)];
    const isProject = day % 7 === 0 || day === plan.days.length;
    const card = document.createElement("a");
    card.href = lessonRoute(day);
    card.className = isProject ? "card milestone" : "card";
    if (isProject) {
      const preview = document.createElement("div");
      preview.className = "card-preview";
      preview.append(cardText("span", "eyebrow", day === plan.days.length ? "CAPSTONE" : "MINI-PROJECT"));
      preview.append(cardText("p", "", task));
      card.append(preview);
    }
    const body = document.createElement("div");
    body.className = "card-body";
    body.append(cardText("p", "card-meta", `Day ${day} · ${dateFormat.format(new Date(date))}`));
    body.append(cardText("h3", "", title));
    if (!isProject) body.append(cardText("p", "card-task", task));
    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.append(cardText("span", "", module));
    if (state.done[day]) footer.append(cardText("span", "done", "✓ Complete"));
    body.append(footer);
    card.append(body);
    gallery.append(card);
  }
}

for (const [index, title] of ["All lessons", ...weeks].entries()) {
  const filter = cardText("button", "filter", title);
  filter.type = "button";
  filter.setAttribute("aria-pressed", index === 0);
  filter.addEventListener("click", () => {
    activeModule = index - 1;
    byId("filters").querySelector('[aria-pressed="true"]').setAttribute("aria-pressed", "false");
    filter.setAttribute("aria-pressed", "true");
    renderGallery();
  });
  byId("filters").append(filter);
}

function renderDay() {
  const { day, date, title, task, resource: resourceId } = plan.days[state.selected - 1];
  const resource = resources.get(resourceId);
  byId("lesson").innerHTML = `
    <p class="eyebrow accent" id="day-date"></p>
    <h1 id="lesson-title" tabindex="-1"></h1>
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
    renderGallery();
  });
  byId("previous").disabled = day === 1;
  byId("next").disabled = day === plan.days.length;
  byId("previous").addEventListener("click", () => location.hash = lessonRoute(day - 1));
  byId("next").addEventListener("click", () => location.hash = lessonRoute(day + 1));
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
  renderGallery();
  if (routedDay()) renderDay();
  renderChecklist();
  updateProgress();
}

window.addEventListener("hashchange", showPage);
byId("back-to-gallery").addEventListener("click", () => { focusGallery = true; });
byId("resume").addEventListener("click", () => {
  const next = plan.days.find(({ day }) => !state.done[day]);
  if (next) location.hash = lessonRoute(next.day);
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
    if (routedDay()) history.replaceState(null, "", lessonRoute(state.selected));
    if (save()) message("Progress imported.");
    render();
  } catch {
    message("Choose a valid AI Automation Roadmap backup.");
  }
});
byId("reset").addEventListener("click", () => {
  if (!confirm("Clear all completed days, session notes, and project checklist items?")) return;
  state = emptyState();
  if (routedDay()) history.replaceState(null, "", lessonRoute(state.selected));
  if (save()) message("Progress reset.");
  render();
});

showPage();
render();
