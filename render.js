// Хелперы
function statusClass(status) {
  if (status === "Завершён" || status === "Выпущен") return "badge--success";
  if (status === "Активен" || status === "В работе") return "badge--info";
  if (status === "Планируется" || status === "Запланирован" || status === "Тестируется" || status === "Отпуск") return "badge--warning";
  return "badge--error";
}

function badge(status) {
  const span = document.createElement("span");
  span.className = "badge " + statusClass(status);
  span.textContent = status;
  return span;
}

function timeEl(iso) {
  const t = document.createElement("time");
  t.setAttribute("datetime", iso);
  t.textContent = iso;
  return t;
}

function priorityIcon(priority) {
  const icons = { high: "🔴", medium: "🟡", low: "🟢" };
  const titles = { high: "Высокий", medium: "Средний", low: "Низкий" };
  const span = document.createElement("span");
  span.className = "priority priority--" + priority;
  span.textContent = icons[priority] + " " + titles[priority];
  return span;
}

// Карточка спринта
function renderSprint(sprint) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = sprint.id;
  card.tabIndex = 0;
  card.setAttribute("role", "button");

  // header
  const header = document.createElement("header");
  header.className = "card__header";
  const idEl = document.createElement("span");
  idEl.className = "card__id";
  idEl.textContent = "#" + sprint.id.toUpperCase();
  const h3 = document.createElement("h3");
  h3.textContent = sprint.title;
  const top = document.createElement("div");
  top.className = "card__top";
  top.append(idEl, badge(sprint.status));
  header.append(top, h3);

  // main
  const main = document.createElement("div");
  main.className = "card__main";
  const goal = document.createElement("p");
  goal.textContent = "Цель: " + sprint.goal;
  const points = document.createElement("p");
  points.textContent = "Story points: " + sprint.storyPoints + " • Прогресс: " + sprint.progress + "%";
  main.append(goal, points);
  if (sprint.tasks.length) {
    const ul = document.createElement("ul");
    sprint.tasks.forEach(function (name) {
      const li = document.createElement("li");
      li.textContent = "• " + name;
      ul.append(li);
    });
    main.append(ul);
  }

  // meta
  const meta = document.createElement("footer");
  meta.className = "card__meta";
  const dates = document.createElement("span");
  dates.append(timeEl(sprint.startDate), " — ", timeEl(sprint.endDate));
  meta.append(priorityIcon(sprint.priority), dates);

  card.append(header, main, meta);
  return card;
}

// Строка таблицы релизов
function renderReleaseRow(release) {
  const tr = document.createElement("tr");
  const version = document.createElement("th");
  version.setAttribute("scope", "row");
  version.textContent = release.version;
  const name = document.createElement("td");
  name.textContent = release.name;
  const status = document.createElement("td");
  status.append(badge(release.status));
  const date = document.createElement("td");
  date.append(timeEl(release.releaseDate));
  const env = document.createElement("td");
  env.textContent = release.environment;
  tr.append(version, name, status, date, env);
  return tr;
}

// Карточка сотрудника
function renderTeamMember(member) {
  const card = document.createElement("article");
  card.className = "card";

  const header = document.createElement("header");
  header.className = "card__header";
  const h3 = document.createElement("h3");
  h3.textContent = member.fullName;
  header.append(badge(member.status), h3);

  const main = document.createElement("div");
  main.className = "card__main";
  const role = document.createElement("p");
  role.textContent = "Роль: " + member.role;
  const load = document.createElement("p");
  load.textContent = "Загрузка: " + member.assigned + " / " + member.capacity + " ч";
  main.append(role, load);

  const meta = document.createElement("footer");
  meta.className = "card__meta";
  meta.append("В команде с: ", timeEl(member.hiredAt));

  card.append(header, main, meta);
  return card;
}

// Содержимое модального окна
function renderModalContent(entity, data) {
  const frag = document.createDocumentFragment();

  const h2 = document.createElement("h2");
  h2.textContent = data.title || data.name || data.fullName;
  frag.append(h2);

  function row(label, value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + ": ";
    p.append(strong, value);
    return p;
  }

  if (entity === "sprint") {
    frag.append(row("ID", data.id));
    const st = document.createElement("p");
    st.append("Статус: ", badge(data.status));
    frag.append(st);
    frag.append(row("Цель", data.goal));
    frag.append(row("Story points", String(data.storyPoints)));
    frag.append(row("Прогресс", data.progress + "%"));
  } else if (entity === "release") {
    frag.append(row("Версия", data.version));
    const st = document.createElement("p");
    st.append("Статус: ", badge(data.status));
    frag.append(st);
    frag.append(row("Окружение", data.environment));
  } else {
    frag.append(row("Роль", data.role));
    const st = document.createElement("p");
    st.append("Статус: ", badge(data.status));
    frag.append(st);
    frag.append(row("Загрузка", data.assigned + " / " + data.capacity + " ч"));
  }
  return frag;
}