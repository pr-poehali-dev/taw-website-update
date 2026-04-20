import { useState } from "react";
import Icon from "@/components/ui/icon";

const M = {
  yellow: "#FFE033",
  pink: "#FF3CAC",
  blue: "#2B5EFF",
  green: "#00D68F",
  orange: "#FF6B35",
  black: "#0D0D0D",
  white: "#FFFFFF",
  cream: "#FFF9E6",
};

const PROJECTS = [
  { id: 1, title: "Брендинг пекарни «Мука»", category: "Дизайн", year: "2024", description: "Полная айдентика: логотип, упаковка, меню, соцсети. Простой визуальный язык, который узнают с первого взгляда.", tags: ["Логотип", "Упаковка", "Фирм. стиль"], bg: M.yellow, accent: M.black },
  { id: 2, title: "Reels-серия для фитнес-клуба", category: "Видео", year: "2024", description: "12 коротких роликов для Instagram. Монтаж, субтитры, графика — за 2 дня с нуля. Охват вырос в 3 раза.", tags: ["Reels", "Монтаж", "Instagram"], bg: M.pink, accent: M.white },
  { id: 3, title: "SMM для кофейни", category: "SMM", year: "2024", description: "Контент-план, шаблоны, ведение аккаунта. 3 месяца — +1200 подписчиков без платной рекламы.", tags: ["Контент-план", "Stories", "VK"], bg: M.blue, accent: M.yellow },
  { id: 4, title: "Промо-видео для стартапа", category: "Видео", year: "2024", description: "90-секундный презентационный ролик для питча инвесторам. Сценарий, анимация, озвучка за 3 дня.", tags: ["Анимация", "Сценарий", "Питч"], bg: M.orange, accent: M.white },
  { id: 5, title: "Визуал для онлайн-школы", category: "Дизайн", year: "2023", description: "Дизайн-система для EdTech: обложки уроков, шаблоны сертификатов, баннеры для рекламы.", tags: ["EdTech", "Шаблоны", "Реклама"], bg: M.green, accent: M.black },
  { id: 6, title: "Контент для Telegram-канала", category: "SMM", year: "2023", description: "Оформление канала, рубрикатор, 30 постов в месяц. Подписчики растут органически за счёт экспертного контента.", tags: ["Telegram", "Текст", "Дизайн"], bg: M.pink, accent: M.yellow },
];

const SERVICES = [
  { icon: "Video", title: "Видео", price: "от 3 000 ₽", desc: "Reels, промо-ролики, монтаж с субтитрами и графикой", bg: M.blue, color: M.white, shape: "▲" },
  { icon: "Layers", title: "Дизайн", price: "от 5 000 ₽", desc: "Логотипы, баннеры, упаковка. Исходники — навсегда ваши", bg: M.yellow, color: M.black, shape: "●" },
  { icon: "Share2", title: "SMM", price: "от 8 000 ₽/мес", desc: "Контент-план, посты, Stories без лишних созвонов", bg: M.pink, color: M.white, shape: "■" },
];

const WHY = [
  { title: "ИИ ускоряет всё", desc: "До готового видео — максимум 2 дня", bg: M.green, color: M.black },
  { title: "Честные цены", desc: "Без скрытых правок и доплат", bg: M.orange, color: M.white },
  { title: "Личное общение", desc: "Напрямую в Telegram, без менеджеров", bg: M.blue, color: M.white },
  { title: "50+ проектов", desc: "Прозрачное ТЗ и фиксированные сроки", bg: M.yellow, color: M.black },
];

const STEPS = [
  { num: "01", title: "Пишете в мессенджер", desc: "Просто опишите задачу", bg: M.yellow, color: M.black },
  { num: "02", title: "Расчёт за 30 минут", desc: "Фиксируем стоимость и срок", bg: M.pink, color: M.white },
  { num: "03", title: "Готово за 1–2 дня", desc: "Получаете материал на согласование", bg: M.blue, color: M.white },
  { num: "04", title: "2 правки бесплатно", desc: "Вносим без споров и доплат", bg: M.green, color: M.black },
  { num: "05", title: "Исходники ваши", desc: "Файлы для печати и веба навсегда", bg: M.orange, color: M.white },
];

const CATEGORIES = ["Все", "Видео", "Дизайн", "SMM"];

// Memphis geometric decorations
function Dot({ size = 12, color = M.pink, style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0, ...style }} />;
}
function Zigzag({ color = M.yellow }: { color?: string }) {
  return (
    <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
      <polyline points="0,18 12,2 24,18 36,2 48,18 60,2 72,18 84,2 96,18 108,2 120,18" stroke={color} strokeWidth="3" fill="none" />
    </svg>
  );
}
function Cross({ color = M.blue, size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="3" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="3" />
    </svg>
  );
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = activeCategory === "Все" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: M.cream, color: M.black, fontFamily: "'IBM Plex Sans', sans-serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ background: M.black, borderBottom: `4px solid ${M.yellow}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: M.yellow, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 16, color: M.black, lineHeight: 1 }}>T</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 20, color: M.white, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
                TAW <span style={{ color: M.yellow }}>Design</span>
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>дизайн это просто</div>
            </div>
          </a>

          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {[
              { label: "Услуги", href: "#services" },
              { label: "Работы", href: "#portfolio" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                style={{ fontSize: 12, fontWeight: 600, color: M.white, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 14px" }}
                onMouseEnter={e => (e.currentTarget.style.color = M.yellow)}
                onMouseLeave={e => (e.currentTarget.style.color = M.white)}
              >
                {item.label}
              </a>
            ))}
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, background: M.yellow, color: M.black, padding: "10px 18px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em", marginLeft: 8 }}
            >
              <Icon name="Send" size={13} />
              Telegram
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ background: M.cream, borderBottom: `4px solid ${M.black}`, position: "relative", overflow: "hidden" }}>
        {/* BG decorations */}
        <div style={{ position: "absolute", top: 32, right: 80, opacity: 0.6 }}><Zigzag color={M.pink} /></div>
        <div style={{ position: "absolute", bottom: 48, left: 40 }}><Cross color={M.blue} size={40} /></div>
        <div style={{ position: "absolute", top: "30%", right: "8%" }}>
          <div style={{ width: 180, height: 180, border: `4px solid ${M.orange}`, borderRadius: "50%", opacity: 0.35 }} />
        </div>
        <div style={{ position: "absolute", bottom: 60, right: "20%" }}>
          <div style={{ width: 60, height: 60, background: M.green, transform: "rotate(15deg)", opacity: 0.7 }} />
        </div>
        <Dot size={18} color={M.pink} style={{ position: "absolute", top: 60, left: "30%" }} />
        <Dot size={12} color={M.blue} style={{ position: "absolute", bottom: 90, right: "35%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 80px", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: M.pink, color: M.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", marginBottom: 28 }}>
              <Dot size={8} color={M.white} />
              Видео · Дизайн · SMM
            </div>
            <h1 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: M.black, margin: "0 0 28px" }}>
              TAW<br />
              <span style={{ color: M.blue }}>Design</span><br />
              <span style={{ fontSize: "0.55em", fontWeight: 400, fontStyle: "italic", color: M.black, letterSpacing: "-0.01em" }}>контент, который</span><br />
              <span style={{ fontSize: "0.55em", fontWeight: 400, fontStyle: "italic" }}>приносит клиентов</span>
            </h1>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, marginBottom: 36, maxWidth: 440 }}>
              Работаю с ИИ-инструментами — быстрее и дешевле студий.<br />
              Расчёт за 30 минут. Исходники навсегда ваши.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, background: M.black, color: M.yellow, padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em", border: `3px solid ${M.black}` }}
                onMouseEnter={e => { e.currentTarget.style.background = M.yellow; e.currentTarget.style.color = M.black; }}
                onMouseLeave={e => { e.currentTarget.style.background = M.black; e.currentTarget.style.color = M.yellow; }}
              >
                <Icon name="Send" size={15} />
                Обсудить проект
              </a>
              <a href="#portfolio"
                style={{ fontSize: 14, fontWeight: 700, background: "transparent", color: M.black, padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em", border: `3px solid ${M.black}` }}
                onMouseEnter={e => { e.currentTarget.style.background = M.black; e.currentTarget.style.color = M.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = M.black; }}
              >
                Смотреть работы →
              </a>
            </div>
          </div>

          {/* Hero shape block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <div style={{ width: 200, height: 200, background: M.blue, display: "flex", alignItems: "center", justifyContent: "center", border: `4px solid ${M.black}`, transform: "rotate(-3deg)" }}>
              <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 72, color: M.yellow, lineHeight: 1 }}>★</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 96, height: 96, background: M.pink, border: `4px solid ${M.black}`, transform: "rotate(4deg)" }} />
              <div style={{ width: 96, height: 96, background: M.green, borderRadius: "50%", border: `4px solid ${M.black}` }} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: M.black, borderBottom: `4px solid ${M.yellow}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div style={{ width: 16, height: 16, background: M.yellow, transform: "rotate(45deg)" }} />
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", color: M.white, margin: 0, letterSpacing: "-0.02em" }}>
              Что я делаю
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 4 }}>
            {SERVICES.map((s) => (
              <div key={s.title} style={{ background: s.bg, padding: "36px 28px", border: `4px solid ${M.black}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 16, right: 16, fontSize: 40, opacity: 0.15, fontWeight: 900 }}>{s.shape}</div>
                <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.9 }}>
                  <Icon name={s.icon} size={28} style={{ color: s.color }} />
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 32, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: s.color, marginBottom: 12, opacity: 0.85 }}>{s.price}</div>
                <div style={{ fontSize: 14, color: s.color, lineHeight: 1.6, opacity: 0.85 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ background: M.cream, borderBottom: `4px solid ${M.black}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <Dot size={20} color={M.orange} />
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", color: M.black, margin: 0, letterSpacing: "-0.02em" }}>
              Без бюрократии
            </h2>
            <div style={{ flex: 1, height: 4, background: M.black, marginLeft: 8 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 4 }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ background: w.bg, padding: "28px 24px", border: `4px solid ${M.black}` }}>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 56, color: w.color, opacity: 0.15, lineHeight: 1, marginBottom: -16 }}>0{i + 1}</div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 22, color: w.color, marginBottom: 8 }}>{w.title}</div>
                <div style={{ fontSize: 13, color: w.color, lineHeight: 1.6, opacity: 0.85 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ background: M.blue, borderBottom: `4px solid ${M.black}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", color: M.yellow, margin: 0, letterSpacing: "-0.02em" }}>
              Избранные работы
            </h2>
            <div style={{ display: "flex", gap: 4 }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  style={{ fontSize: 11, fontWeight: 700, padding: "8px 16px", border: `3px solid ${activeCategory === cat ? M.yellow : "rgba(255,255,255,0.3)"}`, background: activeCategory === cat ? M.yellow : "transparent", color: activeCategory === cat ? M.black : M.white, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 4 }}>
            {filtered.map((p) => (
              <div key={p.id} onClick={() => setSelectedProject(p)}
                style={{ background: p.bg, padding: "28px 24px", border: `4px solid ${M.black}`, cursor: "pointer", position: "relative" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translate(-3px,-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "none")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent, opacity: 0.7 }}>{p.category} · {p.year}</span>
                  <Icon name="ArrowUpRight" size={16} style={{ color: p.accent }} />
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 22, color: p.accent, lineHeight: 1.15, marginBottom: 12 }}>{p.title}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 700, color: p.accent, background: `${M.black}22`, padding: "3px 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: M.black, borderBottom: `4px solid ${M.yellow}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <Cross color={M.yellow} size={28} />
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", color: M.white, margin: 0, letterSpacing: "-0.02em" }}>
              Как работаем
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 4 }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ background: s.bg, padding: "28px 20px", border: `4px solid ${M.black}` }}>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 64, color: s.color, opacity: 0.2, lineHeight: 1, marginBottom: -8 }}>{s.num}</div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 18, color: s.color, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: s.color, opacity: 0.8, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ background: M.yellow, borderBottom: `4px solid ${M.black}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <Dot size={16} color={M.pink} />
              <Dot size={16} color={M.blue} />
              <Dot size={16} color={M.orange} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", color: M.black, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 0.95 }}>
              Начнём<br />работать?
            </h2>
            <p style={{ fontSize: 14, color: "#333", lineHeight: 1.65, marginBottom: 28 }}>
              Отвечаю в течение 2 часов (9:00–21:00 МСК)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { icon: "Send", label: "Telegram", bg: M.black, color: M.yellow },
                { icon: "MessageCircle", label: "WhatsApp", bg: "#25D366", color: M.white },
                { icon: "Users", label: "VK", bg: "#0077FF", color: M.white },
              ].map((m) => (
                <a key={m.label} href="#"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 700, background: m.bg, color: m.color, padding: "12px 20px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em", border: `3px solid ${M.black}`, width: "fit-content" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translate(-2px,-2px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                >
                  <Icon name={m.icon} size={14} />
                  {m.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}
            style={{ background: M.white, border: `4px solid ${M.black}`, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 26, color: M.black, marginBottom: 4 }}>Оставить заявку</div>
            {[
              { label: "Имя", placeholder: "Как вас зовут?", type: "text" },
              { label: "Telegram / WhatsApp", placeholder: "@username или +7...", type: "text" },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  style={{ width: "100%", border: `2px solid ${M.black}`, outline: "none", fontSize: 14, color: M.black, padding: "10px 12px", background: M.cream, fontFamily: "inherit", boxSizing: "border-box" }}
                  onFocus={e => (e.currentTarget.style.borderColor = M.blue)}
                  onBlur={e => (e.currentTarget.style.borderColor = M.black)}
                />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Что нужно сделать?</label>
              <textarea placeholder="Коротко о задаче..." rows={3}
                style={{ width: "100%", border: `2px solid ${M.black}`, outline: "none", resize: "none", fontSize: 14, color: M.black, padding: "10px 12px", background: M.cream, fontFamily: "inherit", boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = M.blue)}
                onBlur={e => (e.currentTarget.style.borderColor = M.black)}
              />
            </div>
            <button type="submit"
              style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, background: M.black, color: M.yellow, padding: "14px 24px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}
              onMouseEnter={e => { e.currentTarget.style.background = M.blue; e.currentTarget.style.color = M.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = M.black; e.currentTarget.style.color = M.yellow; }}
            >
              Отправить заявку <Icon name="ArrowRight" size={13} />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: M.black, padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 18, color: M.white }}>
          TAW <span style={{ color: M.yellow }}>Design</span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2024 TAW Design</span>
        <div style={{ display: "flex", gap: 16 }}>
          {["Telegram", "Instagram", "VK"].map((s) => (
            <a key={s} href="#" style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}
              onMouseEnter={e => (e.currentTarget.style.color = M.yellow)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>

      {/* MODAL */}
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: selectedProject.bg, border: `4px solid ${M.black}`, padding: "36px 32px", maxWidth: 520, width: "100%", position: "relative", boxShadow: `8px 8px 0 ${M.black}` }}
          >
            <button onClick={() => setSelectedProject(null)}
              style={{ position: "absolute", top: 12, right: 12, background: M.black, border: "none", cursor: "pointer", color: M.white, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon name="X" size={16} />
            </button>
            <span style={{ fontSize: 10, fontWeight: 700, color: selectedProject.accent, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>{selectedProject.category} · {selectedProject.year}</span>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontWeight: 900, fontSize: 32, color: selectedProject.accent, margin: "8px 0 12px", lineHeight: 1.1 }}>
              {selectedProject.title}
            </h3>
            <p style={{ fontSize: 14, color: selectedProject.accent, lineHeight: 1.65, marginBottom: 20, opacity: 0.85 }}>
              {selectedProject.description}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
              {selectedProject.tags.map((t) => (
                <span key={t} style={{ fontSize: 10, fontWeight: 700, color: selectedProject.accent, background: `${M.black}22`, padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</span>
              ))}
            </div>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, background: M.black, color: M.yellow, padding: "12px 20px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}
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
