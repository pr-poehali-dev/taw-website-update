import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROJECTS = [
  {
    id: 1,
    title: "Брендинг пекарни «Мука»",
    category: "Дизайн",
    year: "2024",
    description: "Полная айдентика: логотип, упаковка, меню, соцсети. Простой визуальный язык, который узнают с первого взгляда.",
    tags: ["Логотип", "Упаковка", "Фирм. стиль"],
  },
  {
    id: 2,
    title: "Reels-серия для фитнес-клуба",
    category: "Видео",
    year: "2024",
    description: "12 коротких роликов для Instagram. Монтаж, субтитры, графика — за 2 дня с нуля. Охват вырос в 3 раза.",
    tags: ["Reels", "Монтаж", "Instagram"],
  },
  {
    id: 3,
    title: "SMM для кофейни",
    category: "SMM",
    year: "2024",
    description: "Контент-план, шаблоны, ведение аккаунта. 3 месяца — +1200 подписчиков без платной рекламы.",
    tags: ["Контент-план", "Stories", "VK"],
  },
  {
    id: 4,
    title: "Промо-видео для стартапа",
    category: "Видео",
    year: "2024",
    description: "90-секундный презентационный ролик для питча инвесторам. Сценарий, анимация, озвучка за 3 дня.",
    tags: ["Анимация", "Сценарий", "Питч"],
  },
  {
    id: 5,
    title: "Визуал для онлайн-школы",
    category: "Дизайн",
    year: "2023",
    description: "Дизайн-система для EdTech: обложки уроков, шаблоны сертификатов, баннеры для рекламы.",
    tags: ["EdTech", "Шаблоны", "Реклама"],
  },
  {
    id: 6,
    title: "Контент для Telegram-канала",
    category: "SMM",
    year: "2023",
    description: "Оформление канала, рубрикатор, 30 постов в месяц. Подписчики растут органически за счёт экспертного контента.",
    tags: ["Telegram", "Текст", "Дизайн"],
  },
];

const SERVICES = [
  { icon: "Video", title: "Видео", price: "от 3 000 ₽", desc: "Reels, промо-ролики, монтаж с субтитрами и графикой" },
  { icon: "Layers", title: "Дизайн", price: "от 5 000 ₽", desc: "Логотипы, баннеры, упаковка. Исходники — навсегда ваши" },
  { icon: "Share2", title: "SMM", price: "от 8 000 ₽/мес", desc: "Контент-план, посты, Stories. Ведение без лишних созвонов" },
];

const WHY = [
  { title: "ИИ ускоряет всё", desc: "От брифа до готового видео — максимум 2 дня" },
  { title: "Честные цены", desc: "Без скрытых правок и доплат" },
  { title: "Личное общение", desc: "Напрямую в Telegram, без менеджеров" },
  { title: "Более 50 проектов", desc: "Прозрачное ТЗ и фиксированные сроки" },
];

const STEPS = [
  { num: "01", title: "Пишете в мессенджер", desc: "Просто опишите задачу — без брифов и звонков" },
  { num: "02", title: "Расчёт за 30 минут", desc: "Фиксируем стоимость и срок сразу" },
  { num: "03", title: "Готово за 1–2 дня", desc: "Получаете материал на согласование" },
  { num: "04", title: "До 2 правок бесплатно", desc: "Вносим без споров и доплат" },
  { num: "05", title: "Исходники ваши навсегда", desc: "Файлы для печати, веба и соцсетей" },
];

const CATEGORIES = ["Все", "Видео", "Дизайн", "SMM"];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = activeCategory === "Все"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: "#fff", color: "#111827" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#hero" style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 20, color: "#111827", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              TAW <span style={{ color: "#4A90E2" }}>Design</span>
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.08em", marginTop: 1 }}>дизайн это просто</div>
          </a>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[
              { label: "Услуги", href: "#services" },
              { label: "Работы", href: "#portfolio" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a key={item.label} href={item.href} style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", letterSpacing: "0.02em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111827")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, background: "#4A90E2", color: "#fff", padding: "8px 16px", borderRadius: 4, textDecoration: "none" }}
            >
              <Icon name="Send" size={13} />
              Telegram
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px 80px" }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ fontSize: 13, color: "#4A90E2", marginBottom: 20, letterSpacing: "0.04em" }}>
            Видео · Дизайн · SMM
          </p>
          <h1 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#111827", margin: "0 0 20px" }}>
            TAW Design — создаю контент, который приносит клиентов
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
            Работаю с ИИ-инструментами — быстрее и дешевле студий. Без бюрократии, расчёт за 30 минут.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, background: "#4A90E2", color: "#fff", padding: "12px 24px", borderRadius: 4, textDecoration: "none" }}
            >
              <Icon name="Send" size={14} />
              Обсудить проект
            </a>
            <a href="#portfolio" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#4A90E2")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
            >
              Смотреть работы →
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid #f3f4f6" }} />

      {/* SERVICES */}
      <section id="services" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ fontSize: 11, color: "#4A90E2", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Услуги</p>
        <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "#111827", margin: "0 0 48px", letterSpacing: "-0.01em" }}>
          Что я делаю
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: "#f3f4f6" }}>
          {SERVICES.map((s) => (
            <div key={s.title} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ width: 36, height: 36, background: "#eff6ff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={s.icon} size={16} style={{ color: "#4A90E2" }} />
              </div>
              <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 22, color: "#111827", marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#4A90E2", marginBottom: 10 }}>{s.price}</div>
              <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid #f3f4f6" }} />

      {/* WHY */}
      <section style={{ background: "#f8fafd", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#4A90E2", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Почему я</p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "#111827", margin: "0 0 48px", letterSpacing: "-0.01em" }}>
            Без бюрократии
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {WHY.map((w, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: "#4A90E2", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>0{i + 1}</div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 6 }}>{w.title}</div>
                <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid #f3f4f6" }} />

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ fontSize: 11, color: "#4A90E2", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Портфолио</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "#111827", margin: 0, letterSpacing: "-0.01em" }}>
            Избранные работы
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontSize: 12,
                  padding: "6px 14px",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "#4A90E2" : "#e5e7eb",
                  background: activeCategory === cat ? "#4A90E2" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#6b7280",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, background: "#f3f4f6" }}>
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              style={{ background: "#fff", padding: "28px 24px", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafd")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.06em" }}>{p.category} · {p.year}</span>
                <Icon name="ArrowUpRight" size={14} style={{ color: "#d1d5db" }} />
              </div>
              <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 20, color: "#111827", lineHeight: 1.2, marginBottom: 10 }}>
                {p.title}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontSize: 11, color: "#9ca3af", background: "#f9fafb", padding: "3px 8px", borderRadius: 2 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid #f3f4f6" }} />

      {/* PROCESS */}
      <section style={{ background: "#f8fafd", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#4A90E2", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Как работаем</p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "#111827", margin: "0 0 48px", letterSpacing: "-0.01em" }}>
            Просто и быстро
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: 24,
                  padding: "20px 0",
                  borderBottom: i < STEPS.length - 1 ? "1px solid #e5e7eb" : "none",
                  alignItems: "start",
                }}
              >
                <div style={{ fontSize: 11, color: "#4A90E2", fontWeight: 600, letterSpacing: "0.06em", paddingTop: 3 }}>{s.num}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid #f3f4f6" }} />

      {/* CONTACTS */}
      <section id="contacts" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 11, color: "#4A90E2", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Контакты</p>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "#111827", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
              Начнём работать?
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 32 }}>
              Отвечаю в течение 2 часов (9:00–21:00 МСК)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "Send", label: "Telegram", color: "#0088cc" },
                { icon: "MessageCircle", label: "WhatsApp", color: "#25D366" },
                { icon: "Users", label: "VK", color: "#0077FF" },
              ].map((m) => (
                <a
                  key={m.label}
                  href="#"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: m.color, textDecoration: "none", padding: "10px 0" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <Icon name={m.icon} size={15} />
                  {m.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Имя", placeholder: "Как вас зовут?", type: "text" },
              { label: "Telegram / WhatsApp", placeholder: "@username или +7...", type: "text" },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ display: "block", fontSize: 11, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  style={{ width: "100%", border: "none", borderBottom: "1px solid #e5e7eb", outline: "none", fontSize: 14, color: "#111827", padding: "8px 0", background: "transparent", fontFamily: "inherit" }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#4A90E2")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "#e5e7eb")}
                />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Что нужно сделать?</label>
              <textarea
                placeholder="Коротко о задаче..."
                rows={3}
                style={{ width: "100%", border: "none", borderBottom: "1px solid #e5e7eb", outline: "none", resize: "none", fontSize: 14, color: "#111827", padding: "8px 0", background: "transparent", fontFamily: "inherit" }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = "#4A90E2")}
                onBlur={e => (e.currentTarget.style.borderBottomColor = "#e5e7eb")}
              />
            </div>
            <button
              type="submit"
              style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, background: "#4A90E2", color: "#fff", padding: "12px 24px", borderRadius: 4, border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#3a7fd4")}
              onMouseLeave={e => (e.currentTarget.style.background = "#4A90E2")}
            >
              Отправить заявку
              <Icon name="ArrowRight" size={13} />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #f3f4f6", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div>
          <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 16, color: "#d1d5db" }}>
            TAW <span style={{ color: "#4A90E2" }}>Design</span>
          </span>
        </div>
        <span style={{ fontSize: 12, color: "#d1d5db" }}>© 2024 TAW Design</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Telegram", "Instagram", "VK"].map((s) => (
            <a key={s} href="#" style={{ fontSize: 12, color: "#9ca3af", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#4A90E2")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>

      {/* MODAL */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 4, padding: "36px 32px", maxWidth: 520, width: "100%", position: "relative" }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}
            >
              <Icon name="X" size={16} />
            </button>
            <span style={{ fontSize: 11, color: "#4A90E2", letterSpacing: "0.08em" }}>{selectedProject.category} · {selectedProject.year}</span>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 28, color: "#111827", margin: "8px 0 12px", lineHeight: 1.15 }}>
              {selectedProject.title}
            </h3>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 20 }}>
              {selectedProject.description}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
              {selectedProject.tags.map((t) => (
                <span key={t} style={{ fontSize: 11, color: "#9ca3af", background: "#f9fafb", padding: "4px 10px", borderRadius: 2 }}>{t}</span>
              ))}
            </div>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, background: "#4A90E2", color: "#fff", padding: "10px 20px", borderRadius: 4, textDecoration: "none" }}
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
