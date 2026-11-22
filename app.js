const storageKey = "software-engineering-roadmap-v1";
const byId = (id) => document.getElementById(id);
const resources = new Map(
  plan.resources.map((resource) => [resource.id, resource]),
);
const pages = ["roadmap", "project", "resources"];
let state = emptyState();
let statusTimer;
let activeSection = "";
let focusGallery = false;

function emptyState() {
  return {
    version: 1,
    curriculum: "engineering-40",
    selected: 1,
    done: {},
    notes: {},
    checklist: {},
    blocks: {},
  };
}

function validatedState(data) {
  if (
    data?.version !== 1 ||
    data.curriculum !== "engineering-40" ||
    !Number.isInteger(data.selected) ||
    data.selected < 1 ||
    data.selected > plan.days.length
  ) {
    throw new Error("Invalid backup");
  }
  const result = emptyState();
  result.selected = data.selected;
  for (const [field, max, valueType] of [
    ["done", plan.days.length, "boolean"],
    ["notes", plan.days.length, "string"],
    ["checklist", plan.checklist.length, "boolean"],
    ["blocks", plan.days.length * plan.blocks.length, "boolean"],
  ]) {
    const values = data[field];
    if (!values || typeof values !== "object" || Array.isArray(values))
      throw new Error("Invalid backup");
    for (const [key, value] of Object.entries(values)) {
      if (
        !/^[1-9]\d*$/.test(key) ||
        Number(key) > max ||
        typeof value !== valueType
      ) {
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
  statusTimer = setTimeout(() => {
    status.hidden = true;
  }, 4800);
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
    message(
      "This browser could not save progress. Export a backup to keep your changes.",
    );
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
  byId("percent").textContent =
    `${Math.round((completed / plan.days.length) * 100)}%`;
  byId("progress").value = completed;
  const minutes = plan.days.reduce(
    (total, { day }) => total + completedMinutes(day),
    0,
  );
  byId("hours-label").textContent =
    `${formatTime(minutes)} logged · 200h planned`;
  byId("progress-label").textContent =
    `${completed} of ${plan.days.length} days complete`;
  byId("resume-label").textContent = next
    ? `UP NEXT · DAY ${next.day}`
    : "ROADMAP COMPLETE";
  byId("resume-title").textContent = next?.title ?? "All 40 days complete";
  byId("resume-task").textContent =
    next?.task ?? "Revisit your lesson notes or review your final project.";
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
  const days = activeSection
    ? plan.days.filter(({ section }) => section === activeSection)
    : plan.days;
  const completed = days.filter(({ day }) => state.done[day]).length;
  byId("lesson-count").textContent = `${completed} of ${days.length} complete`;
  gallery.replaceChildren();
  for (const { day, section, title, task } of days) {
    const isProject = day >= 36;
    const card = document.createElement("a");
    card.href = lessonRoute(day);
    card.className = isProject ? "card milestone" : "card";
    if (isProject) {
      const preview = document.createElement("div");
      preview.className = "card-preview";
      preview.append(cardText("span", "eyebrow", "CAPSTONE"));
      preview.append(cardText("p", "", task));
      card.append(preview);
    }
    const body = document.createElement("div");
    body.className = "card-body";
    body.append(cardText("p", "card-meta", `Day ${day} · 5 hours`));
    body.append(cardText("h3", "", title));
    if (!isProject) body.append(cardText("p", "card-task", task));
    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.append(cardText("span", "", plan.sections[section]));
    if (state.done[day]) footer.append(cardText("span", "done", "✓ Complete"));
    body.append(footer);
    card.append(body);
    gallery.append(card);
  }
}

for (const [section, title] of [
  ["", "All lessons"],
  ...Object.entries(plan.sections),
]) {
  const filter = cardText("button", "filter", title);
  filter.type = "button";
  filter.setAttribute("aria-pressed", !section);
  filter.addEventListener("click", () => {
    activeSection = section;
    byId("filters")
      .querySelector('[aria-pressed="true"]')
      .setAttribute("aria-pressed", "false");
    filter.setAttribute("aria-pressed", "true");
    renderGallery();
  });
  byId("filters").append(filter);
}

function blockId(day, index) {
  return (day - 1) * plan.blocks.length + index + 1;
}

function completedMinutes(day) {
  return plan.blocks.reduce(
    (sum, [, minutes], index) =>
      sum + (state.blocks[blockId(day, index)] ? minutes : 0),
    0,
  );
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  return minutes % 60 ? `${hours}h ${minutes % 60}m` : `${hours}h`;
}

function resourceLink(resource) {
  const link = cardText("a", "resource", resource.title);
  externalLink(link, resource);
  link.prepend(cardText("span", "", resource.kind));
  return link;
}

function renderDay() {
  const { day, section, title, topics, task, check, resourceIds } =
    plan.days[state.selected - 1];
  byId("lesson").innerHTML = `
    <p class="eyebrow accent" id="day-date"></p>
    <h1 id="lesson-title" tabindex="-1"></h1>
    <h2>What to learn</h2>
    <ul id="topics" class="topic-list"></ul>
    <div id="decision-prompts"></div>
    <h2>Learning resources</h2>
    <div id="day-resources" class="lesson-resources"></div>
    <div class="exercise"><strong>Practical exercise</strong><p id="exercise-text"></p></div>
    <div class="exercise"><strong>Teach it back</strong><p id="teach-back"></p></div>
    <h2>Five-hour routine</h2>
    <p id="block-progress" role="status"></p>
    <div id="daily-blocks"></div>
    <label class="note-label" for="notes">Evidence and session notes</label>
    <textarea id="notes" placeholder="Record an artifact or test result, what you can explain, and what you want to revisit."></textarea>
    <div class="lesson-actions">
      <button class="primary" id="complete" aria-pressed="false"></button>
      <div class="step-buttons"><button id="previous" class="outline">Previous day</button><button id="next" class="outline">Next day</button></div>
    </div>`;
  byId("day-date").textContent =
    `DAY ${day} / ${plan.days.length} · ${plan.sections[section]}`;
  byId("lesson-title").textContent = title;
  byId("topics").append(...topics.map((topic) => cardText("li", "", topic)));
  if (section === "decisions") {
    const list = cardText("ol", "topic-list", "");
    list.append(
      ...plan.decisionQuestions.map((question) => cardText("li", "", question)),
    );
    byId("decision-prompts").append(
      cardText("h2", "", "Questions to ask before coding"),
      list,
    );
  }
  byId("exercise-text").textContent = task;
  byId("teach-back").textContent = check;
  byId("day-resources").append(
    ...resourceIds.map((id) => resourceLink(resources.get(id))),
  );
  function showBlockProgress() {
    byId("block-progress").textContent =
      `${formatTime(completedMinutes(day))} of 5h logged`;
  }
  showBlockProgress();
  plan.blocks.forEach(([name, minutes, instruction], index) => {
    const id = blockId(day, index);
    const label = document.createElement("label");
    label.className = "criterion study-block";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(state.blocks[id]);
    checkbox.addEventListener("change", () => {
      state.blocks[id] = checkbox.checked;
      save();
      showBlockProgress();
      updateProgress();
    });
    const description = document.createElement("div");
    description.append(
      cardText("strong", "", `${name} · ${minutes} min`),
      cardText("p", "", instruction),
    );
    label.append(checkbox, description);
    byId("daily-blocks").append(label);
  });
  byId("notes").value = state.notes[day] ?? "";
  byId("notes").addEventListener("input", (event) => {
    state.notes[day] = event.target.value;
    save();
  });
  const complete = byId("complete");
  function updateCompletion() {
    complete.textContent = state.done[day]
      ? "✓ Completed · Undo"
      : "Mark complete";
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
  byId("previous").addEventListener(
    "click",
    () => (location.hash = lessonRoute(day - 1)),
  );
  byId("next").addEventListener(
    "click",
    () => (location.hash = lessonRoute(day + 1)),
  );
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

for (const [section, title] of Object.entries(plan.sections)) {
  const group = document.createElement("section");
  group.className = "resource-group";
  const ids = new Set(
    plan.days
      .filter((day) => day.section === section)
      .flatMap((day) => day.resourceIds),
  );
  const links = document.createElement("div");
  links.className = "resource-links";
  links.append(...Array.from(ids, (id) => resourceLink(resources.get(id))));
  group.append(cardText("h3", "", title), links);
  byId("resource-list").append(group);
}

function render() {
  renderGallery();
  if (routedDay()) renderDay();
  renderChecklist();
  updateProgress();
}

window.addEventListener("hashchange", showPage);
byId("back-to-gallery").addEventListener("click", () => {
  focusGallery = true;
});
byId("resume").addEventListener("click", () => {
  const next = plan.days.find(({ day }) => !state.done[day]);
  if (next) location.hash = lessonRoute(next.day);
});
byId("export").addEventListener("click", () => {
  const href = URL.createObjectURL(
    new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = href;
  link.download = "software-engineering-roadmap-progress.json";
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
    if (
      !confirm(
        "Replace this browser’s progress, notes, and checklist with this backup?",
      )
    )
      return;
    state = imported;
    if (routedDay())
      history.replaceState(null, "", lessonRoute(state.selected));
    if (save()) message("Progress imported.");
    render();
  } catch {
    message("Choose a valid Software Engineering Roadmap backup.");
  }
});
byId("reset").addEventListener("click", () => {
  if (
    !confirm(
      "Clear all completed days, time logs, session notes, and project checklist items?",
    )
  )
    return;
  state = emptyState();
  if (routedDay()) history.replaceState(null, "", lessonRoute(state.selected));
  if (save()) message("Progress reset.");
  render();
});

showPage();
render();
