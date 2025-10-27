
import { useState } from "react";
import StateDistrictSelector from "./components/StateDistrictSelector";
import texts from "./translations";
import "./index.css";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = texts[lang];
  const [selection, setSelection] = useState({ state: "", district: "" });
  const [report, setReport] = useState(null);

  const handleSelectionChange = (s) => {
    setSelection(s);
    if (s.action === "show" && s.state && s.district) {
      setReport({
        state: s.state,
        district: s.district,
        totalWorkers: Math.floor(Math.random() * 2000 + 200),
        personDays: Math.floor(Math.random() * 8000 + 500),
        expenditure: (Math.random() * 200000 + 10000).toFixed(0)
      });
    }
  };

  return (
    <div className="app-wrap">
      <header className="app-header">
        <h1 className="title">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>

        <div style={{ textAlign: "right", marginBottom: 10 }}>
         <div className="lang-switch">
      <button
        className={lang === "en" ? "lang-btn active" : "lang-btn"}
        onClick={() => setLang("en")}
       >
        English
      </button>

          <button
            className={lang === "hi" ? "lang-btn active" : "lang-btn"}
            onClick={() => setLang("hi")}
          >
            हिंदी
          </button>
        </div>
                </div>
      </header>

      <main style={{ padding: 12 }}>
        <StateDistrictSelector lang={lang} t={t} onChange={handleSelectionChange} />

        <div className="report-card" style={{ marginTop: 18 }}>
          {!report ? (
            <div className="hint-box">{t.hint}</div>
          ) : (
            <>
              <h2 className="report-title">
                {report.district}, {report.state}
              </h2>

              <div className="stat-row">
                <div className="stat-card">
                  <div className="stat-label">{t.totalWorkers}</div>
                  <div className="stat-value">{report.totalWorkers}</div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">{t.personDays}</div>
                  <div className="stat-value">{report.personDays}</div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">{t.expenditure}</div>
                  <div className="stat-value">₹{report.expenditure}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="small-footer">
        {t.footer}
      </footer>
    </div>
  );
}