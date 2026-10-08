// Данные: спринты, релизы, команда
const sprints = [
  { id: "s1", title: "Спринт 1", goal: "Настроить репозиторий", status: "Завершён", priority: "high", startDate: "2024-01-08", endDate: "2024-01-19", storyPoints: 21, progress: 100, tasks: ["Git init", "CI setup"] },
  { id: "s2", title: "Спринт 2", goal: "Авторизация", status: "Завершён", priority: "high", startDate: "2024-01-22", endDate: "2024-02-02", storyPoints: 34, progress: 100, tasks: ["Login API", "JWT"] },
  { id: "s3", title: "Спринт 3", goal: "Личный кабинет", status: "Завершён", priority: "medium", startDate: "2024-02-05", endDate: "2024-02-16", storyPoints: 28, progress: 100, tasks: ["Profile UI"] },
  { id: "s4", title: "Спринт 4", goal: "Каталог товаров", status: "Завершён", priority: "medium", startDate: "2024-02-19", endDate: "2024-03-01", storyPoints: 40, progress: 100, tasks: ["Catalog API"] },
  { id: "s5", title: "Спринт 5", goal: "Корзина", status: "Завершён", priority: "high", startDate: "2024-03-04", endDate: "2024-03-15", storyPoints: 45, progress: 100, tasks: ["Cart"] },
  { id: "s6", title: "Спринт 6", goal: "Платёжный шлюз", status: "Активен", priority: "high", startDate: "2024-03-18", endDate: "2024-03-29", storyPoints: 38, progress: 60, tasks: ["Stripe"] },
  { id: "s7", title: "Спринт 7", goal: "Админ-панель", status: "Активен", priority: "medium", startDate: "2024-04-01", endDate: "2024-04-12", storyPoints: 30, progress: 40, tasks: ["Admin UI"] },
  { id: "s8", title: "Спринт 8", goal: "Уведомления", status: "Планируется", priority: "low", startDate: "2024-04-15", endDate: "2024-04-26", storyPoints: 26, progress: 0, tasks: [] },
  { id: "s9", title: "Спринт 9", goal: "Аналитика", status: "Планируется", priority: "medium", startDate: "2024-04-29", endDate: "2024-05-10", storyPoints: 42, progress: 0, tasks: [] },
  { id: "s10", title: "Спринт 10", goal: "Оптимизация", status: "Планируется", priority: "high", startDate: "2024-05-13", endDate: "2024-05-24", storyPoints: 33, progress: 0, tasks: [] },
  { id: "s11", title: "Спринт 11", goal: "Мобильная адаптация", status: "Черновик", priority: "low", startDate: "2024-05-27", endDate: "2024-06-07", storyPoints: 29, progress: 0, tasks: [] },
  { id: "s12", title: "Спринт 12", goal: "Интеграция 1С", status: "Черновик", priority: "medium", startDate: "2024-06-10", endDate: "2024-06-21", storyPoints: 50, progress: 0, tasks: [] },
  { id: "s13", title: "Спринт 13", goal: "Мультиязычность", status: "Черновик", priority: "low", startDate: "2024-06-24", endDate: "2024-07-05", storyPoints: 24, progress: 0, tasks: [] },
  { id: "s14", title: "Спринт 14", goal: "Мониторинг", status: "Планируется", priority: "medium", startDate: "2024-07-08", endDate: "2024-07-19", storyPoints: 31, progress: 0, tasks: [] },
  { id: "s15", title: "Спринт 15", goal: "Релиз 2.0", status: "Планируется", priority: "high", startDate: "2024-07-22", endDate: "2024-08-02", storyPoints: 36, progress: 0, tasks: [] }
];

const releases = [
  { id: "r1", version: "v0.1.0", name: "Прототип", status: "Выпущен", releaseDate: "2024-01-20", environment: "dev", features: ["Каркас", "CI"] },
  { id: "r2", version: "v0.2.0", name: "Альфа", status: "Выпущен", releaseDate: "2024-02-05", environment: "dev", features: ["Login"] },
  { id: "r3", version: "v0.3.0", name: "Кабинет", status: "Выпущен", releaseDate: "2024-02-18", environment: "dev", features: ["Profile"] },
  { id: "r4", version: "v0.4.0", name: "Каталог", status: "Выпущен", releaseDate: "2024-03-02", environment: "stage", features: ["Catalog"] },
  { id: "r5", version: "v0.5.0", name: "Корзина", status: "Выпущен", releaseDate: "2024-03-16", environment: "stage", features: ["Cart"] },
  { id: "r6", version: "v1.0.0", name: "Первый мажор", status: "Выпущен", releaseDate: "2024-03-30", environment: "prod", features: ["Stripe"] },
  { id: "r7", version: "v1.1.0", name: "Админка", status: "Тестируется", releaseDate: "2024-04-14", environment: "stage", features: ["Admin UI"] },
  { id: "r8", version: "v1.2.0", name: "Уведомления", status: "В работе", releaseDate: "2024-04-28", environment: "dev", features: ["Email"] },
  { id: "r9", version: "v1.3.0", name: "Аналитика", status: "В работе", releaseDate: "2024-05-12", environment: "dev", features: ["Reports"] },
  { id: "r10", version: "v1.4.0", name: "Скорость", status: "Запланирован", releaseDate: "2024-05-26", environment: "dev", features: ["Cache"] },
  { id: "r11", version: "v1.5.0", name: "Мобильная", status: "Запланирован", releaseDate: "2024-06-09", environment: "dev", features: ["Responsive"] },
  { id: "r12", version: "v1.6.0", name: "1С", status: "Запланирован", releaseDate: "2024-06-23", environment: "dev", features: ["1C API"] },
  { id: "r13", version: "v1.7.0", name: "Языки", status: "Запланирован", releaseDate: "2024-07-07", environment: "dev", features: ["i18n"] },
  { id: "r14", version: "v1.8.0", name: "Мониторинг", status: "Запланирован", releaseDate: "2024-07-21", environment: "dev", features: ["Monitoring"] },
  { id: "r15", version: "v2.0.0", name: "Большой релиз", status: "Запланирован", releaseDate: "2024-08-04", environment: "prod", features: ["Major"] }
];

const teamLoad = [
  { id: "u1", fullName: "Иван Петров", role: "Frontend", status: "Активен", hiredAt: "2022-03-01", capacity: 40, assigned: 38, skills: ["React", "CSS"] },
  { id: "u2", fullName: "Анна Смирнова", role: "Backend", status: "Активен", hiredAt: "2021-07-15", capacity: 40, assigned: 42, skills: ["Node", "SQL"] },
  { id: "u3", fullName: "Олег Кузнецов", role: "QA", status: "Активен", hiredAt: "2022-09-10", capacity: 40, assigned: 30, skills: ["Testing"] },
  { id: "u4", fullName: "Мария Иванова", role: "DevOps", status: "Активен", hiredAt: "2020-11-05", capacity: 40, assigned: 35, skills: ["Docker"] },
  { id: "u5", fullName: "Дмитрий Волков", role: "Frontend", status: "Отпуск", hiredAt: "2023-01-20", capacity: 0, assigned: 0, skills: ["Vue"] },
  { id: "u6", fullName: "Елена Соколова", role: "Backend", status: "Активен", hiredAt: "2021-05-30", capacity: 40, assigned: 40, skills: ["Java"] },
  { id: "u7", fullName: "Сергей Морозов", role: "Designer", status: "Активен", hiredAt: "2022-02-14", capacity: 40, assigned: 25, skills: ["Figma"] },
  { id: "u8", fullName: "Ольга Новикова", role: "PM", status: "Активен", hiredAt: "2019-08-01", capacity: 40, assigned: 20, skills: ["Scrum"] },
  { id: "u9", fullName: "Павел Зайцев", role: "Frontend", status: "Активен", hiredAt: "2023-04-12", capacity: 40, assigned: 44, skills: ["Angular"] },
  { id: "u10", fullName: "Наталья Белова", role: "QA", status: "Активен", hiredAt: "2022-06-25", capacity: 40, assigned: 33, skills: ["Autotests"] },
  { id: "u11", fullName: "Артём Орлов", role: "Backend", status: "Больничный", hiredAt: "2021-12-01", capacity: 0, assigned: 0, skills: ["Python"] },
  { id: "u12", fullName: "Юлия Крылова", role: "DevOps", status: "Активен", hiredAt: "2023-03-08", capacity: 40, assigned: 28, skills: ["K8s"] },
  { id: "u13", fullName: "Роман Гусев", role: "Frontend", status: "Активен", hiredAt: "2022-10-17", capacity: 40, assigned: 39, skills: ["React"] },
  { id: "u14", fullName: "Ксения Фомина", role: "Designer", status: "Активен", hiredAt: "2023-07-22", capacity: 40, assigned: 27, skills: ["UX"] },
  { id: "u15", fullName: "Виктор Лебедев", role: "PM", status: "Активен", hiredAt: "2020-01-15", capacity: 40, assigned: 22, skills: ["Agile"] }
];