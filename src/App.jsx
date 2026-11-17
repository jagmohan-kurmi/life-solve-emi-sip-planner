import { useMemo, useState } from 'react';

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));

export default function App() {
  const [loan, setLoan] = useState({ principal: 2500000, rate: 7.2, years: 20, extra: 10000 });
  const [sip, setSip] = useState({ monthly: 15000, years: 12, rate: 11, goal: 5000000 });

  const emi = useMemo(() => {
    const months = loan.years * 12;
    const monthlyRate = loan.rate / 12 / 100;
    if (monthlyRate === 0) return loan.principal / months;
    return (loan.principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }, [loan]);

  const sipValue = useMemo(() => {
    const months = sip.years * 12;
    const monthlyRate = sip.rate / 12 / 100;
    if (monthlyRate === 0) return sip.monthly * months;
    return sip.monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }, [sip]);

  return (
    <div className="app-shell">
      <div className="panel hero-panel">
        <div>
          <p className="eyebrow">Loan & wealth planning</p>
          <h1>EMI & SIP Planner</h1>
        </div>
      </div>

      <div className="panel">
        <h2>Loan details</h2>
        <div className="form-grid two-columns">
          <input type="number" value={loan.principal} onChange={(e) => setLoan({ ...loan, principal: Number(e.target.value) })} placeholder="Principal" />
          <input type="number" value={loan.rate} onChange={(e) => setLoan({ ...loan, rate: Number(e.target.value) })} placeholder="Rate %" />
          <input type="number" value={loan.years} onChange={(e) => setLoan({ ...loan, years: Number(e.target.value) })} placeholder="Years" />
          <input type="number" value={loan.extra} onChange={(e) => setLoan({ ...loan, extra: Number(e.target.value) })} placeholder="Extra prepayment" />
        </div>
      </div>

      <div className="panel">
        <h2>SIP goal</h2>
        <div className="form-grid two-columns">
          <input type="number" value={sip.monthly} onChange={(e) => setSip({ ...sip, monthly: Number(e.target.value) })} placeholder="Monthly SIP" />
          <input type="number" value={sip.years} onChange={(e) => setSip({ ...sip, years: Number(e.target.value) })} placeholder="Years" />
          <input type="number" value={sip.rate} onChange={(e) => setSip({ ...sip, rate: Number(e.target.value) })} placeholder="Expected return %" />
          <input type="number" value={sip.goal} onChange={(e) => setSip({ ...sip, goal: Number(e.target.value) })} placeholder="Goal amount" />
        </div>
      </div>

      <div className="panel full-span">
        <h2>Financial summary</h2>
        <div className="stat-grid">
          <div><span>EMI</span><strong>{money(emi)}</strong></div>
          <div><span>Estimated SIP value</span><strong>{money(sipValue)}</strong></div>
          <div><span>Target goal</span><strong>{money(sip.goal)}</strong></div>
          <div><span>Extra prepay</span><strong>{money(loan.extra)}</strong></div>
        </div>
      </div>
    </div>
  );
}
