// Ссылки на контейнеры
const sprintsList = document.querySelector('[data-list="sprints"]');
const teamList = document.querySelector('[data-list="team"]');
const releaseBody = document.querySelector('[data-table="releases"]');
const summary = document.querySelector('[data-summary="total"]');

// Рендер спринтов (с учётом фильтров)
function renderSprints(list) {
  sprintsList.replaceChildren();
  list.forEach(function (s) { sprintsList.append(renderSprint(s)); });
}

// Первичный рендер
renderSprints(sprints);
teamLoad.forEach(function (m) { teamList.append(renderTeamMember(m)); });
releases.forEach(function (r) { releaseBody.append(renderReleaseRow(r)); });

summary.textContent = "Спринтов: " + sprints.length +
                      ", релизов: " + releases.length +
                      ", сотрудников: " + teamLoad.length;

// Фильтры
const searchInput = document.getElementById("filter-search");
const statusSelect = document.getElementById("filter-status");
const priorityChecks = document.querySelectorAll('input[name="pr"]');
const resetBtn = document.getElementById("filter-reset");

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const st = statusSelect.value;
  const checkedPr = Array.from(priorityChecks).filter(c => c.checked).map(c => c.value);

  const result = sprints.filter(function (s) {
    const okQ = !q || s.title.toLowerCase().includes(q) || s.goal.toLowerCase().includes(q);
    const okS = !st || s.status === st;
    const okP = checkedPr.length === 0 || checkedPr.includes(s.priority);
    return okQ && okS && okP;
  });

  renderSprints(result);
  summary.textContent = "Спринтов: " + result.length +
                        ", релизов: " + releases.length +
                        ", сотрудников: " + teamLoad.length;
}

searchInput.addEventListener("input", applyFilters);
statusSelect.addEventListener("change", applyFilters);
priorityChecks.forEach(c => c.addEventListener("change", applyFilters));
resetBtn.addEventListener("click", function () {
  searchInput.value = "";
  statusSelect.value = "";
  priorityChecks.forEach(c => c.checked = false);
  applyFilters();
});

// Сортировка таблицы релизов
let sortKey = null;
let sortDir = "asc";

document.querySelectorAll("[data-sort]").forEach(function (th) {
  th.addEventListener("click", function () {
    const key = th.dataset.sort;
    sortDir = (sortKey === key && sortDir === "asc") ? "desc" : "asc";
    sortKey = key;

    document.querySelectorAll("[data-sort]").forEach(t => t.classList.remove("sort-asc", "sort-desc"));
    th.classList.add(sortDir === "asc" ? "sort-asc" : "sort-desc");

    const sorted = releases.slice().sort(function (a, b) {
      const va = String(a[key]).toLowerCase();
      const vb = String(b[key]).toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    releaseBody.replaceChildren();
    sorted.forEach(r => releaseBody.append(renderReleaseRow(r)));
  });
});

// Модальное окно
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const modalOk = document.getElementById("modal-ok");

function openModal(entity, data) {
  modalBody.replaceChildren(renderModalContent(entity, data));
  modal.classList.add("is-open");
  document.body.classList.add("no-scroll");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

sprintsList.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  if (!card) return;
  const sprint = sprints.find(s => s.id === card.dataset.id);
  if (sprint) openModal("sprint", sprint);
});

modalClose.addEventListener("click", closeModal);
modalOk.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});