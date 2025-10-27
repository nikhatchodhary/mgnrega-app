
import { useState, useEffect } from "react";

const sampleData = {
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"]
};

export default function StateDistrictSelector({ t, onChange }) {
  const [states] = useState(Object.keys(sampleData));
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict("");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const list = sampleData[selectedState] || [];
      setDistricts(list);
      setSelectedDistrict("");
      setLoading(false);
    }, 250);
  }, [selectedState]);

  useEffect(() => {
    if (onChange) onChange({ state: selectedState, district: selectedDistrict });
  }, [selectedState, selectedDistrict]);

  return (
    <div className="selector-card">
      <label className="big-label">{t.selectState}</label>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="big-select"
      >
        <option value="">{t.chooseState}</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label className="big-label" style={{ marginTop: 12 }}>
        {t.selectDistrict}
      </label>

      {loading ? (
        <div className="loading-box">Loading...</div>
      ) : (
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!districts.length}
          className="big-select"
        >
          <option value="">
            {districts.length ? t.chooseDistrict : t.selectStateFirst}
          </option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      )}

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <button
          className="primary-btn"
          onClick={() => {
            if (!selectedState || !selectedDistrict) {
              alert("Please select both fields");
              return;
            }
            onChange({ state: selectedState, district: selectedDistrict, action: "show" });
          }}
        >
          {t.showReport}
        </button>

        <button
          className="secondary-btn"
          onClick={() => {
            setSelectedState("");
            setSelectedDistrict("");
            setDistricts([]);
          }}
        >
          {t.clear}
        </button>
      </div>
    </div>
  );
}