/* =====================================================================
   PRANIC YOGA – Google Apps Script (saves website forms to Google Sheets)
   Paste this whole file into: Google Sheet > Extensions > Apps Script
   ===================================================================== */
const NOTIFY_EMAIL = "you@example.com";   // <- your email for new-entry alerts

const SHEETS = {
  class:      { tab: "Class Registrations", head: ["Timestamp","Name","Gender","Occupation","Where from","WhatsApp","Email","Class","Serious medical condition / injury?","Taking medication?","Medical details"],
                keys: ["name","gender","occupation","place","whatsapp","email","class","medical","medication","medicalDetails"] },
  classpaid:  { tab: "Paid Class Registrations", head: ["Timestamp","Name","Gender","Occupation","Where from","WhatsApp","Email","Class","Fee","UTR / Transaction ID","Serious medical condition / injury?","Taking medication?","Medical details"],
                keys: ["name","gender","occupation","place","whatsapp","email","class","fee","utr","medical","medication","medicalDetails"] },
  membership: { tab: "Memberships", head: ["Timestamp","Name","Gender","Occupation","Where from","WhatsApp","Email","Membership","UTR / Transaction ID","Serious medical condition / injury?","Taking medication?","Medical details"],
                keys: ["name","gender","occupation","place","whatsapp","email","membership","utr","medical","medication","medicalDetails"] },
  contact:    { tab: "Contact Messages", head: ["Timestamp","Name","Email","Message"],
                keys: ["name","email","message"] }
};

function doPost(e) {
  const p = e.parameter || {};
  const cfg = SHEETS[p.formType];
  if (!cfg || p.website) return out_("ignored");          // unknown form or spam trap
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(cfg.tab);
    if (!sh) {
      sh = ss.insertSheet(cfg.tab);
      sh.appendRow(cfg.head);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, cfg.head.length).setFontWeight("bold").setBackground("#e8efe6");
    } else if (sh.getLastColumn() < cfg.head.length) {          // older sheet: add the new health columns
      sh.getRange(1, 1, 1, cfg.head.length).setValues([cfg.head]).setFontWeight("bold").setBackground("#e8efe6");
    }
    const vals = cfg.keys.map(k => clean_(p[k]));
    sh.appendRow([new Date()].concat(vals));
    try {
      const body = cfg.head.slice(1).map((h, i) => h + ": " + vals[i]).join("\n");
      MailApp.sendEmail(NOTIFY_EMAIL, "Pranic Yoga: new " + cfg.tab, body);
    } catch (err) {}                                       // email failure must not lose the entry
    return out_("ok");
  } finally {
    lock.releaseLock();
  }
}

function clean_(v) {
  const s = String(v || "").trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;                 // keeps phone numbers as text, blocks formula injection
}
function out_(t) { return ContentService.createTextOutput(t); }
