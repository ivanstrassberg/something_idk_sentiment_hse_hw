function doPost(e) {
    var p = e && e.parameter ? e.parameter : {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('logs') || ss.insertSheet('logs');

    if (sh.getLastRow() === 0) {
        sh.appendRow(['timestamp', 'review', 'sentiment', 'confidence', 'action_taken', 'userId']);
    }

    var meta = {};
    try { meta = JSON.parse(p.meta || "{}"); } catch (err) { }

    sh.appendRow([
        new Date(Number(p.ts)).toISOString(),
        meta.review || '',
        p.variant || '',
        meta.confidence || '',
        meta.action_taken || '',
        p.userId || ''
    ]);

    return ContentService.createTextOutput('OK');
}
