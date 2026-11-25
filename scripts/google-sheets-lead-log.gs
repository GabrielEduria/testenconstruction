/**
 * EN Construction: website quote requests -> Google Sheet (free lead log).
 *
 * SETUP (about 5 minutes)
 * 1. Create a Google Sheet, e.g. "Website Leads".
 * 2. Extensions > Apps Script. Delete the sample code and paste this whole file. Save.
 * 3. Change SECRET below to any long random text. Put the SAME text in Vercel as SHEETS_WEBHOOK_SECRET.
 * 4. Deploy > New deployment > type "Web app".
 *      Execute as: Me          Who has access: Anyone
 *    Click Deploy, allow the permissions, and copy the Web app URL (ends in /exec).
 * 5. In Vercel: Project > Settings > Environment Variables, add SHEETS_WEBHOOK_URL = that URL.
 *    Redeploy the site.
 *
 * If you edit this script later: Deploy > Manage deployments > edit (pencil) > Version: New version.
 * (A brand-new deployment gets a new URL, which you would then have to update in Vercel.)
 */
const SECRET = "change-me-to-a-long-random-string";
const SHEET_NAME = "Leads";
const HEADERS = ["Received", "Name", "Phone", "Email", "Service", "Location", "Property type", "Monthly bill (₱)", "Message", "Status"];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(), d.name, d.phone, d.email, d.service, d.location, d.property, d.bill, d.message, "New",
    ].map(safe));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Stop values like "+63 917..." or "=HYPERLINK(...)" from being read as formulas. */
function safe(v) {
  if (v instanceof Date) return v;
  const s = v == null ? "" : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
