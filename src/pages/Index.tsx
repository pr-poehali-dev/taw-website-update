import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Видео", "Дизайн", "SMM"];

const PROJECTS = [
  {
    id: 1,
    title: "Брендинг пекарни «Мука»",
    category: "Дизайн",
    year: "2024",
    description: "Полная айдентика: логотип, упаковка, меню, соцсети. Простой визуальный язык, который узнают с первого взгляда.",
    tags: ["Логотип", "Упаковка", "Фирм. стиль"],
    color: "#4A90E2",
    tag: "#TAW_Design",
  },
  {
    id: 2,
    title: "Reels-серия для фитнес-клуба",
    category: "Видео",
    year: "2024",
    description: "12 коротких роликов для Instagram. Монтаж, субтитры, графика — за 2 дня с нуля. Охват вырос в 3 раза.",
    tags: ["Reels", "Монтаж", "Instagram"],
    color: "#2d6bbf",
    tag: "#TAW_Design",
  },
  {
    id: 3,
    title: "SMM для кофейни",
    category: "SMM",
    year: "2024",
    description: "Контент-план, шаблоны, ведение аккаунта. 3 месяца — +1200 подписчиков без платной рекламы.",
    tags: ["Контент-план", "Stories", "VK"],
    color: "#1d5ca8",
    tag: "#TAW_Design",
  },
  {
    id: 4,
    title: "Промо-видео для стартапа",
    category: "Видео",
    year: "2024",
    description: "90-секундный презентационный ролик для питча инвесторам. Сценарий, анимация, озвучка за 3 дня.",
    tags: ["Анимация", "Сценарий", "Питч"],
    color: "#3a7fd4",
    tag: "#TAW_Design",
  },
  {
    id: 5,
    title: "Визуал для онлайн-школы",
    category: "Дизайн",
    year: "2023",
    description: "Дизайн-система для EdTech: обложки уроков, шаблоны сертификатов, баннеры для рекламы.",
    tags: ["EdTech", "Шаблоны", "Реклама"],
    color: "#5a9ee8",
    tag: "#TAW_Design",
  },
  {
    id: 6,
    title: "Контент для Telegram-канала",
    category: "SMM",
    year: "2023",
    description: "Оформление канала, рубрикатор, 30 постов в месяц. Подписчики растут органически за счёт экспертного контента.",
    tags: ["Telegram", "Текст", "Дизайн"],
    color: "#6aabe0",
    tag: "#TAW_Design",
  },
];

const SERVICES = [
  {
    icon: "Video",
    title: "Видео",
    price: "от 3 000 ₽",
    desc: "Reels, промо-ролики, монтаж. С субтитрами и графикой — готово за 1–2 дня.",
    features: ["Монтаж и графика", "Субтитры и озвучка", "Форматы для всех площадок"],
  },
  {
    icon: "Layers",
    title: "Дизайн",
    price: "от 5 000 ₽",
    desc: "Логотипы, баннеры, упаковка. Получаете исходники — они навсегда ваши.",
    features: ["Исходники в подарок", "До 2 правок бесплатно", "Файлы для печати и веба"],
  },
  {
    icon: "Share2",
    title: "SMM",
    price: "от 8 000 ₽/мес",
    desc: "Контент-план, посты, Stories. Ведение без лишних созвонов и отчётов.",
    features: ["VK, Instagram, Telegram", "Контент-план на месяц", "Аналитика раз в 2 недели"],
  },
];

const WHY = [
  { emoji: "⚡", title: "ИИ ускоряет всё", desc: "От брифа до готового видео — максимум 2 дня" },
  { emoji: "💰", title: "Честные цены", desc: "Без скрытых правок и доплат" },
  { emoji: "📱", title: "Вы со мной на связи", desc: "Личное общение в Telegram, а не с менеджером" },
  { emoji: "✅", title: "Просто и понятно", desc: "Более 50 проектов с прозрачным ТЗ" },
];

const STEPS = [
  { emoji: "💬", step: "01", title: "Пишете в мессенджер", desc: "Без звонков и долгих брифингов. Просто опишите задачу." },
  { emoji: "⏳", step: "02", title: "Расчёт за 30 минут", desc: "Фиксируем стоимость и срок — никаких сюрпризов потом." },
  { emoji: "🚀", step: "03", title: "Готово за 1–2 дня", desc: "Вы получаете готовый материал на согласование." },
  { emoji: "🔄", step: "04", title: "Правки?", desc: "До 2 итераций бесплатно — вносим, не спорим." },
  { emoji: "📂", step: "05", title: "Всё просто", desc: "Исходники остаются у вас навсегда." },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorRing, setCursorRing] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const currentMouse = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      currentMouse.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll);

    const animate = () => {
      ringPos.current.x += (currentMouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (currentMouse.current.y - ringPos.current.y) * 0.12;
      setCursorRing({ x: ringPos.current.x, y: ringPos.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const filtered = activeCategory === "Все"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--cream)", color: "var(--ink)" }}>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { transform: scale(1.08) rotate(4deg); border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="cursor-ring" style={{ left: cursorRing.x, top: cursorRing.y }} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(74,144,226,0.1)" : "none",
        }}
      >
        {/* Logo */}
        <a href="#hero" className="flex flex-col leading-none">
          <span
            className="font-cormorant font-bold tracking-tight"
            style={{ fontSize: "22px", color: "var(--ink)", letterSpacing: "-0.02em" }}
          >
            TAW <span style={{ color: "var(--accent)" }}>Design</span>
          </span>
          <span
            className="font-ibm font-light"
            style={{ fontSize: "10px", color: "var(--gray-soft)", letterSpacing: "0.05em" }}
          >
            дизайн это просто
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 font-ibm text-xs tracking-widest uppercase">
          {[
            { label: "Услуги", href: "#services" },
            { label: "Портфолио", href: "#portfolio" },
            { label: "Как работаем", href: "#process" },
            { label: "Контакты", href: "#contacts" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover-line transition-opacity"
              style={{ color: "var(--charcoal)", opacity: 0.7 }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Telegram icon */}
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-ibm text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--accent)", color: "#fff", borderRadius: "2px" }}
        >
          <Icon name="Send" size={12} />
          <span className="hidden md:inline">Telegram</span>
        </a>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 clip-diagonal"
        style={{ background: "var(--ink)", paddingTop: "80px", paddingBottom: "120px" }}
      >
        {/* BG blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: "absolute", width: "640px", height: "640px",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            background: "radial-gradient(circle, rgba(74,144,226,0.2) 0%, transparent 70%)",
            top: "5%", right: "-10%",
            animation: "breathe 9s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: "280px", height: "280px", borderRadius: "50%",
            border: "1px solid rgba(74,144,226,0.12)", bottom: "25%", left: "3%",
          }} />
          <div style={{
            position: "absolute", width: "140px", height: "140px", borderRadius: "50%",
            border: "1px solid rgba(74,144,226,0.07)", bottom: "31%", left: "6.5%",
          }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-2 font-ibm text-xs tracking-widest uppercase px-3 py-1.5 mb-8"
            style={{ border: "1px solid rgba(74,144,226,0.35)", color: "var(--accent)", borderRadius: "2px" }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
            Работаю с ИИ-инструментами — быстрее и дешевле студий
          </div>

          <h1
            className="font-cormorant font-bold leading-none mb-4"
            style={{ fontSize: "clamp(56px, 10vw, 130px)", color: "#ffffff", letterSpacing: "-0.02em" }}
          >
            TAW Design
          </h1>
          <h2
            className="font-cormorant font-light leading-tight mb-6"
            style={{ fontSize: "clamp(22px, 3.5vw, 48px)", color: "rgba(255,255,255,0.6)" }}
          >
            Создаю контент, который<br />
            <span className="italic" style={{ color: "var(--accent)" }}>приносит клиентов</span>
          </h2>
          <p
            className="font-ibm font-light mb-10"
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", letterSpacing: "0.1em" }}
          >
            Видео&nbsp;·&nbsp;Дизайн&nbsp;·&nbsp;SMM
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 font-ibm text-sm font-medium px-8 py-4 transition-all duration-300 hover:gap-5"
              style={{ background: "var(--accent)", color: "#fff", borderRadius: "2px" }}
            >
              <Icon name="Send" size={14} />
              Обсудить проект
            </a>
            <a
              href="#portfolio"
              className="font-ibm text-xs tracking-widest uppercase hover-line"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Смотреть работы
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3">
          <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, transparent, var(--accent))" }} />
          <p className="font-ibm text-xs tracking-widest uppercase" style={{ color: "var(--accent)", writingMode: "vertical-rl" }}>
            скролл
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-4" style={{ background: "var(--accent)" }}>
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="font-cormorant italic text-2xl font-light px-6" style={{ color: "rgba(255,255,255,0.9)" }}>
              БЕЗ БЮРОКРАТИИ · РАСЧЁТ ЗА 30 МИНУТ · ИСХОДНИКИ У ВАС · ГОТОВО ЗА 1–2 ДНЯ ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6 md:px-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            / 01 — Услуги и цены
          </p>
          <h2 className="font-cormorant font-bold leading-tight mb-16" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--ink)" }}>
            Что я делаю
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group relative p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "#fff", border: "1px solid rgba(74,144,226,0.12)", borderRadius: "4px" }}
              >
                {/* TAW badge */}
                <div
                  className="absolute top-4 right-4 font-ibm text-xs font-medium px-2 py-0.5"
                  style={{ background: "rgba(74,144,226,0.08)", color: "var(--accent)", borderRadius: "2px" }}
                >
                  TAW
                </div>

                <div
                  className="w-10 h-10 flex items-center justify-center mb-5"
                  style={{ background: "rgba(74,144,226,0.1)", borderRadius: "2px" }}
                >
                  <Icon name={s.icon} size={18} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-cormorant font-bold text-2xl mb-1" style={{ color: "var(--ink)" }}>{s.title}</h3>
                <p
                  className="font-ibm font-semibold text-sm mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {s.price}
                </p>
                <p className="font-ibm font-light text-sm leading-relaxed mb-5" style={{ color: "var(--charcoal)" }}>
                  {s.desc}
                </p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-ibm text-xs" style={{ color: "var(--charcoal)" }}>
                      <span style={{ color: "var(--accent)" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6 md:px-16 clip-diagonal-reverse" style={{ background: "var(--sand)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            / 02 — Почему я
          </p>
          <h2 className="font-cormorant font-bold leading-tight mb-14" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--ink)" }}>
            Без бюрократии
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <div
                key={i}
                className="p-6 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "#fff", borderRadius: "4px", border: "1px solid rgba(74,144,226,0.08)" }}
              >
                <div className="text-3xl mb-4" style={{ animation: `float ${3 + i * 0.4}s ease-in-out infinite` }}>
                  {w.emoji}
                </div>
                <h3 className="font-cormorant font-bold text-xl mb-2" style={{ color: "var(--ink)" }}>{w.title}</h3>
                <p className="font-ibm font-light text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 px-6 md:px-16" style={{ background: "var(--ink)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            / 03 — Портфолио
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <h2 className="font-cormorant font-bold leading-tight" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#fff" }}>
              Избранные<br />
              <span className="italic font-light" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
                работы
              </span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="font-ibm text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "var(--accent)" : "transparent",
                    color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${activeCategory === cat ? "var(--accent)" : "rgba(255,255,255,0.15)"}`,
                    borderRadius: "2px",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/3", background: project.color, borderRadius: "4px" }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none" style={{ fontSize: "80px" }}>
                  {project.category === "Видео" ? "▶" : project.category === "Дизайн" ? "◆" : "◎"}
                </div>
                {/* Tag */}
                <div
                  className="absolute top-4 left-4 font-ibm text-xs px-2 py-0.5 opacity-70"
                  style={{ background: "rgba(0,0,0,0.3)", color: "#fff", borderRadius: "2px" }}
                >
                  {project.tag}
                </div>
                <div
                  className="absolute inset-0 p-5 flex flex-col justify-end transition-all duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }}
                >
                  <span
                    className="font-ibm text-xs tracking-widest uppercase mb-1.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {project.category} · {project.year}
                  </span>
                  <h3
                    className="font-cormorant font-semibold text-xl transition-transform duration-300 translate-y-1.5 group-hover:translate-y-0"
                    style={{ color: "#fff" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ color: "#fff" }}>
                    <span className="font-ibm text-xs tracking-widest uppercase">Сделано просто</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 px-6 md:px-16 clip-slant" style={{ background: "var(--sand)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            / 04 — Как мы работаем
          </p>
          <h2 className="font-cormorant font-bold leading-tight mb-16" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--ink)" }}>
            Просто и быстро
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="group relative p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#fff", borderRadius: "4px", border: "1px solid rgba(74,144,226,0.1)" }}
              >
                <div
                  className="font-cormorant font-bold text-4xl mb-3 leading-none"
                  style={{ color: "rgba(74,144,226,0.15)" }}
                >
                  {s.step}
                </div>
                <div className="text-2xl mb-3">{s.emoji}</div>
                <h3 className="font-cormorant font-bold text-lg mb-2" style={{ color: "var(--ink)" }}>{s.title}</h3>
                <p className="font-ibm font-light text-xs leading-relaxed" style={{ color: "var(--charcoal)" }}>
                  {s.desc}
                </p>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-2 z-10"
                    style={{ color: "var(--accent)", transform: "translateY(-50%)" }}
                  >
                    <Icon name="ChevronRight" size={16} style={{ color: "var(--accent)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6 md:px-16 clip-diagonal" style={{ background: "var(--ink)", paddingBottom: "120px" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            / 05 — Контакты
          </p>
          <h2 className="font-cormorant font-bold leading-tight mb-4" style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#fff" }}>
            Начнём работать?
          </h2>
          <p className="font-ibm font-light mb-10 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Отвечаю в течение 2 часов (9:00–21:00 МСК)
          </p>

          {/* Messenger buttons */}
          <div className="flex flex-wrap gap-4 mb-14">
            {[
              { icon: "Send", label: "Telegram", color: "#0088cc" },
              { icon: "MessageCircle", label: "WhatsApp", color: "#25D366" },
              { icon: "Users", label: "VK", color: "#0077FF" },
            ].map((m) => (
              <a
                key={m.label}
                href="#"
                className="flex items-center gap-2 font-ibm text-sm font-medium px-6 py-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: m.color, color: "#fff", borderRadius: "2px" }}
              >
                <Icon name={m.icon} size={14} />
                {m.label}
              </a>
            ))}
          </div>

          {/* Form */}
          <div
            className="p-8 md:p-10"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,144,226,0.15)", borderRadius: "4px" }}
          >
            <h3 className="font-cormorant font-bold text-2xl mb-8" style={{ color: "#fff" }}>
              Или оставьте заявку
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-ibm text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Как вас зовут?"
                  className="w-full bg-transparent font-ibm font-light text-sm py-3 outline-none transition-all duration-300 placeholder:opacity-20"
                  style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "14px" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <div>
                <label className="block font-ibm text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Telegram / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="@username или +7..."
                  className="w-full bg-transparent font-ibm font-light text-sm py-3 outline-none transition-all duration-300 placeholder:opacity-20"
                  style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "14px" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-ibm text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Что нужно сделать?
                </label>
                <textarea
                  placeholder="Коротко о задаче..."
                  rows={3}
                  className="w-full bg-transparent font-ibm font-light text-sm py-3 outline-none resize-none transition-all duration-300 placeholder:opacity-20"
                  style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.12)", fontSize: "14px" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="group flex items-center gap-3 font-ibm text-sm font-medium px-8 py-4 transition-all duration-300 hover:gap-5 hover:opacity-90"
                  style={{ background: "var(--accent)", color: "#fff", borderRadius: "2px" }}
                >
                  Отправить заявку
                  <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "var(--ink)", borderTop: "1px solid rgba(74,144,226,0.08)" }}>
        <div className="flex flex-col items-center md:items-start leading-none">
          <span className="font-cormorant font-bold" style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)" }}>
            TAW <span style={{ color: "var(--accent)" }}>Design</span>
          </span>
          <span className="font-ibm font-light" style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
            дизайн это просто
          </span>
        </div>
        <span className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
          © 2024 TAW Design
        </span>
        <div className="flex gap-6">
          {["Telegram", "Instagram", "VK"].map((s) => (
            <a key={s} href="#" className="font-ibm text-xs tracking-widest uppercase hover-line" style={{ color: "rgba(255,255,255,0.25)" }}>
              {s}
            </a>
          ))}
        </div>
      </footer>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-xl w-full p-8 md:p-10"
            style={{ background: "#fff", maxHeight: "90vh", overflowY: "auto", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: "var(--ink)", borderRadius: "2px" }}
            >
              <Icon name="X" size={16} />
            </button>

            <div
              className="w-full mb-6 flex items-center justify-center"
              style={{ height: "200px", background: selectedProject.color, borderRadius: "2px", fontSize: "64px", opacity: 0.9 }}
            >
              {selectedProject.category === "Видео" ? "▶" : selectedProject.category === "Дизайн" ? "◆" : "◎"}
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-ibm text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                {selectedProject.category} · {selectedProject.year}
              </span>
              <span
                className="font-ibm text-xs px-2 py-0.5"
                style={{ background: "rgba(74,144,226,0.08)", color: "var(--accent)", borderRadius: "2px" }}
              >
                {selectedProject.tag}
              </span>
            </div>

            <h3 className="font-cormorant font-bold mb-4" style={{ fontSize: "30px", color: "var(--ink)" }}>
              {selectedProject.title}
            </h3>
            <p className="font-ibm font-light leading-relaxed mb-6" style={{ color: "var(--charcoal)", fontSize: "14px" }}>
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="font-ibm text-xs tracking-widest uppercase px-3 py-1" style={{ background: "var(--sand)", color: "var(--charcoal)", borderRadius: "2px" }}>
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-ibm text-sm font-medium px-6 py-3 transition-all duration-200 hover:opacity-90 w-fit"
              style={{ background: "var(--accent)", color: "#fff", borderRadius: "2px" }}
            >
              <Icon name="Send" size={13} />
              Хочу такой же
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
