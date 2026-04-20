import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = ["Все", "Брендинг", "Иллюстрация", "UI/UX", "Фотография"];

const PROJECTS = [
  {
    id: 1,
    title: "Nova — айдентика",
    category: "Брендинг",
    year: "2024",
    description: "Разработка визуальной айдентики для стартапа в сфере технологий устойчивого развития. Логотип, цветовая система, типографика, носители.",
    tags: ["Логотип", "Фирменный стиль", "Типографика"],
    color: "#d95f2b",
  },
  {
    id: 2,
    title: "Архив снов",
    category: "Иллюстрация",
    year: "2024",
    description: "Серия иллюстраций, исследующих границу между сном и реальностью. Смешанная техника: акварель + цифровая постобработка.",
    tags: ["Серия", "Акварель", "Цифровое"],
    color: "#5e4c8a",
  },
  {
    id: 3,
    title: "Carta — приложение",
    category: "UI/UX",
    year: "2023",
    description: "Дизайн мобильного приложения для путешественников. Полный цикл: исследование, прототипирование, UI-кит, передача в разработку.",
    tags: ["Мобайл", "UX Research", "Figma"],
    color: "#2b6b8a",
  },
  {
    id: 4,
    title: "Meridian Brand",
    category: "Брендинг",
    year: "2023",
    description: "Ребрендинг ресторана высокой кухни. Концепция: «точка пересечения культур». Меню, упаковка, навигация в пространстве.",
    tags: ["Ресторан", "Упаковка", "Навигация"],
    color: "#8a6b2b",
  },
  {
    id: 5,
    title: "Тихая улица",
    category: "Фотография",
    year: "2024",
    description: "Документальный проект об исчезающей архитектуре советских дворов Москвы. 47 кадров, выставка в галерее «Люмьер».",
    tags: ["Документальная", "Архитектура", "Выставка"],
    color: "#4a4a4a",
  },
  {
    id: 6,
    title: "Bloom System",
    category: "UI/UX",
    year: "2023",
    description: "Дизайн-система для EdTech платформы. 200+ компонентов, детальная документация, dark/light режимы.",
    tags: ["Design System", "Компоненты", "Storybook"],
    color: "#2b8a5e",
  },
];

const STEPS = [
  { num: "01", title: "Знакомство", desc: "Узнаю о вас и вашем проекте — задачи, аудитория, контекст. Без брифов на 30 страниц." },
  { num: "02", title: "Исследование", desc: "Анализирую конкурентов, изучаю рынок, нахожу точки, где дизайн может сделать разницу." },
  { num: "03", title: "Концепция", desc: "Предлагаю 2–3 направления. Показываю логику, а не просто «красивые картинки»." },
  { num: "04", title: "Разработка", desc: "Дорабатываем выбранное направление до финального результата. Итеративно, без сюрпризов." },
  { num: "05", title: "Передача", desc: "Финальные файлы, гайдлайны, всё что нужно для работы. Остаюсь на связи после сдачи." },
];

const SERVICES = [
  { icon: "Layers", title: "Брендинг", desc: "Айдентика, логотип, фирменный стиль. Создаю визуальный язык, который работает во всех точках контакта." },
  { icon: "Pen", title: "Иллюстрация", desc: "Цифровая и смешанная техника. Серии, персонажи, обложки, редакционные работы." },
  { icon: "Monitor", title: "UI/UX Дизайн", desc: "Интерфейсы для веба и мобайла. От концепции до готового прототипа и дизайн-системы." },
  { icon: "Camera", title: "Арт-дирекшн", desc: "Съёмки, визуальные концепции, редактура. Смотрю на проект как на целое, а не набор задач." },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorRing, setCursorRing] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const currentMouse = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      currentMouse.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    const animate = () => {
      ringPos.current.x += (currentMouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (currentMouse.current.y - ringPos.current.y) * 0.12;
      setCursorRing({ x: ringPos.current.x, y: ringPos.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const filtered = activeCategory === "Все"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const getSymbol = (cat: string) => {
    if (cat === "Брендинг") return "◆";
    if (cat === "Иллюстрация") return "◉";
    if (cat === "UI/UX") return "▣";
    return "◎";
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--cream)", color: "var(--ink)" }}>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { transform: scale(1.08) rotate(4deg); border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="cursor-ring" style={{ left: cursorRing.x, top: cursorRing.y }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{ mixBlendMode: "multiply" }}>
        <a href="#hero" className="font-cormorant text-2xl font-light tracking-widest uppercase" style={{ color: "var(--ink)" }}>
          А<span style={{ color: "var(--rust)" }}>.</span>
        </a>
        <div className="flex gap-8 font-ibm text-xs tracking-widest uppercase">
          {[
            { label: "О мне", href: "#about" },
            { label: "Услуги", href: "#services" },
            { label: "Портфолио", href: "#portfolio" },
            { label: "Процесс", href: "#process" },
            { label: "Контакты", href: "#contacts" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="hover-line opacity-70 hover:opacity-100 transition-opacity">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-24 px-8 clip-diagonal" style={{ background: "var(--ink)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            background: "radial-gradient(circle, rgba(217,95,43,0.22) 0%, transparent 70%)",
            top: "8%",
            right: "-8%",
            animation: "breathe 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "1px solid rgba(247,244,239,0.08)",
            bottom: "22%",
            left: "4%",
          }} />
          <div style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "1px solid rgba(247,244,239,0.05)",
            bottom: "28%",
            left: "7%",
          }} />
        </div>

        <div className="relative z-10 max-w-5xl">
          <p className="font-ibm text-xs tracking-widest uppercase mb-8" style={{ color: "var(--rust)" }}>
            Визуальный дизайнер · Москва
          </p>
          <h1
            className="font-cormorant font-light leading-none mb-6"
            style={{ fontSize: "clamp(72px, 12vw, 160px)", color: "var(--cream)" }}
          >
            Анна<br />
            <span className="italic" style={{ WebkitTextStroke: "1px rgba(247,244,239,0.3)", color: "transparent" }}>
              Соколова
            </span>
          </h1>
          <p className="font-ibm font-light max-w-md leading-relaxed" style={{ color: "rgba(247,244,239,0.55)", fontSize: "15px" }}>
            Создаю айдентику, иллюстрации и интерфейсы — всё, что делает бренд узнаваемым и запоминающимся.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <a
              href="#portfolio"
              className="group flex items-center gap-3 font-ibm text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300"
              style={{ background: "var(--rust)", color: "var(--cream)" }}
            >
              Смотреть работы
              <Icon name="ArrowRight" size={12} />
            </a>
            <a
              href="#contacts"
              className="font-ibm text-xs tracking-widest uppercase hover-line"
              style={{ color: "rgba(247,244,239,0.5)" }}
            >
              Написать мне
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, var(--rust))" }} />
          <p className="font-ibm text-xs tracking-widest uppercase" style={{ color: "var(--rust)", writingMode: "vertical-rl" }}>
            скролл
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-5" style={{ background: "var(--rust)" }}>
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="font-cormorant italic text-3xl font-light px-8" style={{ color: "var(--cream)" }}>
              ДИЗАЙН · БРЕНДИНГ · ИЛЛЮСТРАЦИЯ · UI/UX · ФОТОГРАФИЯ ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 clip-diagonal-reverse" style={{ background: "var(--sand)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-ibm text-xs tracking-widest uppercase mb-6" style={{ color: "var(--rust)" }}>
              / 01 — О мне
            </p>
            <h2 className="font-cormorant font-light leading-tight mb-8" style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>
              Дизайн —{" "}
              <span className="italic" style={{ color: "var(--rust)" }}>это не</span>
              <br />
              украшение.
            </h2>
            <div className="space-y-4 font-ibm font-light leading-relaxed" style={{ color: "var(--charcoal)", fontSize: "15px" }}>
              <p>
                7 лет я помогаю брендам и продуктам говорить на визуальном языке, который понимают люди.
                Работала с командами от стартапов до международных агентств.
              </p>
              <p>
                Мне интересны проекты на пересечении культуры и бизнеса — те, где дизайн решает задачу,
                а не просто делает «красиво».
              </p>
            </div>
            <div className="mt-10 flex gap-12">
              {[["47", "проектов"], ["7", "лет опыта"], ["12", "наград"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-cormorant font-light" style={{ fontSize: "52px", color: "var(--rust)", lineHeight: 1 }}>
                    {num}
                  </div>
                  <div className="font-ibm text-xs tracking-widest uppercase mt-1" style={{ color: "var(--charcoal)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              border: "1px solid var(--rust)",
              opacity: 0.25,
              top: "-20px",
              left: "-20px",
            }} />
            <div style={{
              background: "var(--charcoal)",
              width: "100%",
              maxWidth: "400px",
              height: "480px",
              borderRadius: "60% 40% 40% 60% / 60% 40% 60% 40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "96px",
            }}>
              🎨
            </div>
            <div
              className="absolute font-cormorant italic font-light pointer-events-none"
              style={{ fontSize: "110px", color: "var(--rust)", opacity: 0.12, lineHeight: 1, bottom: "-20px", right: "-10px" }}
            >
              А
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-8" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-4" style={{ color: "var(--rust)" }}>
            / 02 — Услуги
          </p>
          <h2 className="font-cormorant font-light leading-tight mb-20" style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>
            Чем я занимаюсь
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--sand)" }}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group p-10 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--cream)" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ border: "1px solid var(--rust)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--rust)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <Icon name={s.icon} size={16} style={{ color: "var(--rust)" }} />
                </div>
                <h3 className="font-cormorant font-semibold text-2xl mb-3" style={{ color: "var(--ink)" }}>{s.title}</h3>
                <p className="font-ibm font-light leading-relaxed" style={{ color: "var(--charcoal)", fontSize: "14px" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 px-8 clip-slant" style={{ background: "var(--charcoal)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-4" style={{ color: "var(--rust)" }}>
            / 03 — Портфолио
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="font-cormorant font-light leading-tight" style={{ fontSize: "clamp(40px, 5vw, 68px)", color: "var(--cream)" }}>
              Избранные<br />
              <span className="italic" style={{ WebkitTextStroke: "1px rgba(247,244,239,0.35)", color: "transparent" }}>
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
                    background: activeCategory === cat ? "var(--rust)" : "transparent",
                    color: activeCategory === cat ? "var(--cream)" : "rgba(247,244,239,0.45)",
                    border: `1px solid ${activeCategory === cat ? "var(--rust)" : "rgba(247,244,239,0.18)"}`,
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
                style={{ aspectRatio: "4/3", background: project.color }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 flex items-center justify-center text-7xl" style={{ opacity: 0.2 }}>
                  {getSymbol(project.category)}
                </div>
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%)" }}
                >
                  <span
                    className="font-ibm text-xs tracking-widest uppercase mb-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ color: "rgba(247,244,239,0.6)" }}
                  >
                    {project.category} · {project.year}
                  </span>
                  <h3
                    className="font-cormorant font-semibold text-2xl transition-transform duration-300 translate-y-2 group-hover:translate-y-0"
                    style={{ color: "var(--cream)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ color: "var(--rust)" }}>
                    <span className="font-ibm text-xs tracking-widest uppercase">Подробнее</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-32 px-8" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-4" style={{ color: "var(--rust)" }}>
            / 04 — Процесс
          </p>
          <h2 className="font-cormorant font-light leading-tight mb-20" style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>
            Как я работаю
          </h2>
          <div>
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="group flex gap-8 md:gap-12 items-start py-8 px-4 md:px-6 transition-all duration-300 hover:bg-sand"
                style={{ borderBottom: "1px solid var(--sand)" }}
              >
                <div
                  className="font-cormorant font-light text-4xl md:text-5xl leading-none shrink-0 w-16 text-right transition-colors duration-300 group-hover:text-rust"
                  style={{ color: "var(--sand)" }}
                >
                  {step.num}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-cormorant font-semibold text-2xl mb-2" style={{ color: "var(--ink)" }}>{step.title}</h3>
                  <p className="font-ibm font-light leading-relaxed" style={{ color: "var(--charcoal)", fontSize: "14px" }}>
                    {step.desc}
                  </p>
                </div>
                <Icon
                  name="ArrowUpRight"
                  size={20}
                  className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--rust)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-8 clip-diagonal" style={{ background: "var(--ink)", paddingBottom: "120px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-ibm text-xs tracking-widest uppercase mb-4" style={{ color: "var(--rust)" }}>
            / 05 — Контакты
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="font-cormorant font-light leading-tight mb-8" style={{ fontSize: "clamp(40px, 5vw, 68px)", color: "var(--cream)" }}>
                Начнём<br />
                <span className="italic" style={{ color: "var(--rust)" }}>проект?</span>
              </h2>
              <p className="font-ibm font-light leading-relaxed mb-10" style={{ color: "rgba(247,244,239,0.5)", fontSize: "15px" }}>
                Расскажите о задаче — отвечу в течение одного рабочего дня. Первый звонок бесплатный.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Mail", label: "anna@sokolova.ru" },
                  { icon: "Phone", label: "+7 (999) 123-45-67" },
                  { icon: "MapPin", label: "Москва, Россия" },
                ].map((c) => (
                  <div key={c.icon} className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ border: "1px solid rgba(217,95,43,0.4)" }}>
                      <Icon name={c.icon} size={14} style={{ color: "var(--rust)" }} />
                    </div>
                    <span className="font-ibm font-light text-sm" style={{ color: "rgba(247,244,239,0.65)" }}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Имя", placeholder: "Как вас зовут?", type: "text" },
                { label: "Email", placeholder: "your@email.com", type: "email" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block font-ibm text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(247,244,239,0.35)" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent font-ibm font-light text-sm py-3 outline-none transition-all duration-300 placeholder:opacity-25"
                    style={{ color: "var(--cream)", borderBottom: "1px solid rgba(247,244,239,0.15)", fontSize: "14px" }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--rust)")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(247,244,239,0.15)")}
                  />
                </div>
              ))}
              <div>
                <label className="block font-ibm text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(247,244,239,0.35)" }}>
                  О проекте
                </label>
                <textarea
                  placeholder="Коротко о задаче..."
                  rows={4}
                  className="w-full bg-transparent font-ibm font-light text-sm py-3 outline-none resize-none transition-all duration-300 placeholder:opacity-25"
                  style={{ color: "var(--cream)", borderBottom: "1px solid rgba(247,244,239,0.15)", fontSize: "14px" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--rust)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(247,244,239,0.15)")}
                />
              </div>
              <button
                type="submit"
                className="group flex items-center gap-4 font-ibm text-xs tracking-widest uppercase py-4 px-8 transition-all duration-300 hover:gap-6"
                style={{ background: "var(--rust)", color: "var(--cream)" }}
              >
                Отправить заявку
                <Icon name="ArrowRight" size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-8 flex items-center justify-between" style={{ background: "var(--ink)", borderTop: "1px solid rgba(247,244,239,0.07)" }}>
        <span className="font-cormorant text-xl font-light tracking-widest uppercase" style={{ color: "rgba(247,244,239,0.3)" }}>
          А<span style={{ color: "var(--rust)" }}>.</span>
        </span>
        <span className="font-ibm text-xs" style={{ color: "rgba(247,244,239,0.2)" }}>
          © 2024 Анна Соколова
        </span>
        <div className="flex gap-6">
          {["Behance", "Instagram", "Telegram"].map((s) => (
            <a key={s} href="#" className="font-ibm text-xs tracking-widest uppercase hover-line" style={{ color: "rgba(247,244,239,0.3)" }}>
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
            className="relative max-w-2xl w-full p-10"
            style={{ background: "var(--cream)", maxHeight: "90vh", overflowY: "auto", borderRadius: "2px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center hover:bg-sand transition-colors"
              style={{ color: "var(--ink)" }}
            >
              <Icon name="X" size={16} />
            </button>

            <div
              className="w-full mb-8 flex items-center justify-center"
              style={{ height: "240px", background: selectedProject.color, borderRadius: "2px", fontSize: "80px" }}
            >
              {getSymbol(selectedProject.category)}
            </div>

            <span className="font-ibm text-xs tracking-widest uppercase" style={{ color: "var(--rust)" }}>
              {selectedProject.category} · {selectedProject.year}
            </span>
            <h3 className="font-cormorant font-semibold mt-3 mb-4" style={{ fontSize: "36px", color: "var(--ink)" }}>
              {selectedProject.title}
            </h3>
            <p className="font-ibm font-light leading-relaxed mb-8" style={{ color: "var(--charcoal)", fontSize: "14px" }}>
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="font-ibm text-xs tracking-widest uppercase px-3 py-1" style={{ background: "var(--sand)", color: "var(--charcoal)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
