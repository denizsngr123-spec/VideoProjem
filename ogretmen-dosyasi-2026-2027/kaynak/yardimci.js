// docx kütüphanesi için kısa yardımcılar: paragraf, başlık, liste, tablo, imza bloğu, bölüm.
const {
  Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel,
  PageOrientation, BorderStyle, ShadingType, VerticalAlign, PageBreak, Header, Footer,
  PageNumber, LevelFormat, TableLayoutType, LineRuleType,
} = require("docx");

const FONT = "Times New Roman";
const A4 = { width: 11906, height: 16838 };
const KENAR = { P: 1134, L: 720 };
// Kullanılabilir yazı genişliği (DXA)
const GEN = { P: A4.width - 2 * KENAR.P, L: A4.height - 2 * KENAR.L };

const RENK = { baslik: "1F3864", baslikZemin: "D9E2F3", tatil: "FBE4D5", tema: "E2EFDA", gri: "F2F2F2", yazi: "000000", acik: "595959" };

// "**kalın**" işaretli metni TextRun dizisine çevirir.
function runs(s, o = {}) {
  return String(s).split("**").map((x, i) => (x ? new TextRun({ text: x, bold: i % 2 === 1 || o.bold, italics: o.italics, size: o.size, color: o.color, font: FONT }) : null)).filter(Boolean);
}

function P(s, o = {}) {
  return new Paragraph({
    children: runs(s, o),
    alignment: o.align,
    spacing: { before: o.before ?? 0, after: o.after ?? 80, line: o.line ?? 264, lineRule: LineRuleType.AUTO },
    indent: o.indent,
    keepNext: o.keepNext,
    keepLines: o.keepLines,
    pageBreakBefore: o.pageBreakBefore,
  });
}

const H1 = (s, o = {}) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: runs(s), pageBreakBefore: o.yeniSayfa, spacing: { before: 120, after: 160 }, alignment: o.align ?? AlignmentType.CENTER, keepNext: true });
const H2 = (s, o = {}) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs(s), pageBreakBefore: o.yeniSayfa, spacing: { before: 200, after: 100 }, keepNext: true });
const H3 = (s) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs(s), spacing: { before: 140, after: 60 }, keepNext: true });

const SAYFA_SONU = () => new Paragraph({ children: [new PageBreak()] });
const BOS = (n = 1) => Array.from({ length: n }, () => P("", { after: 0 }));

let listeNo = 0;
// Madde işaretli liste
const MADDE = (dizi, o = {}) => dizi.map((s) => new Paragraph({ children: runs(s, o), numbering: { reference: "madde", level: o.seviye ?? 0 }, spacing: { after: o.after ?? 40, line: 264, lineRule: LineRuleType.AUTO } }));
// Numaralı liste; her çağrı 1'den başlar.
const NUMARA = (dizi, o = {}) => {
  const inst = ++listeNo;
  return dizi.map((s) => new Paragraph({ children: runs(s, o), numbering: { reference: "numara", level: 0, instance: inst }, spacing: { after: o.after ?? 50, line: 264, lineRule: LineRuleType.AUTO } }));
};

const NUMBERING = {
  config: [
    { reference: "madde", levels: [
      { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 260 } } } },
      { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1000, hanging: 260 } } } },
    ] },
    { reference: "numara", levels: [
      { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 360 } } } },
    ] },
  ],
};

const STYLES = {
  default: { document: { run: { font: FONT, size: 22 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, color: RENK.baslik, font: FONT }, paragraph: { spacing: { before: 120, after: 160 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, color: RENK.baslik, font: FONT }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 22, bold: true, color: "2F5496", font: FONT }, paragraph: { spacing: { before: 140, after: 60 }, outlineLevel: 2 } },
  ],
};

const CIZGI = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const YOK = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const KENARLIK = { top: CIZGI, bottom: CIZGI, left: CIZGI, right: CIZGI, insideHorizontal: CIZGI, insideVertical: CIZGI };
const KENARSIZ = { top: YOK, bottom: YOK, left: YOK, right: YOK, insideHorizontal: YOK, insideVertical: YOK };

// Hücre içeriği: metin (satırlar "\n" ile değil, dizi ile verilir) veya Paragraph dizisi.
function hucreIcerik(c, o) {
  if (Array.isArray(c)) return c.flatMap((x) => (x instanceof Paragraph || x instanceof Table ? [x] : [P(x, { size: o.size, bold: o.bold, align: o.align, after: 20, line: 240 })]));
  if (c instanceof Paragraph) return [c];
  return [P(c ?? "", { size: o.size, bold: o.bold, align: o.align, after: 20, line: 240 })];
}

/**
 * Tablo. rows: satır dizisi; hücre ya metin ya da { c, span, rowSpan, fill, bold, align }.
 * o: { size, header (başlık satırı sayısı), headerFill, borders, minH, cantSplit }
 */
function T(rows, widths, o = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const dolu = new Array(widths.length).fill(0); // üst satırlardan gelen rowSpan sayaçları
  const satirlar = rows.map((r, ri) => {
    const cells = [];
    let col = 0;
    const atla = () => { while (col < widths.length && dolu[col] > 0) col++; };
    r.forEach((raw) => {
      atla();
      const h = raw !== null && typeof raw === "object" && !Array.isArray(raw) && !(raw instanceof Paragraph) ? raw : { c: raw };
      const span = h.span || 1;
      const w = widths.slice(col, col + span).reduce((a, b) => a + b, 0);
      const baslik = o.header && ri < o.header;
      const fill = h.fill || (baslik ? o.headerFill || RENK.baslikZemin : undefined);
      const io = { size: h.size || o.size, bold: h.bold ?? baslik, align: h.align || (baslik ? AlignmentType.CENTER : undefined) };
      cells.push(new TableCell({
        children: hucreIcerik(h.c, io),
        width: { size: w, type: WidthType.DXA },
        columnSpan: span > 1 ? span : undefined,
        rowSpan: h.rowSpan > 1 ? h.rowSpan : undefined,
        shading: fill ? { type: ShadingType.CLEAR, color: "auto", fill } : undefined,
        verticalAlign: h.valign || (baslik ? VerticalAlign.CENTER : VerticalAlign.TOP),
        margins: { top: 50, bottom: 50, left: 80, right: 80 },
      }));
      if (h.rowSpan > 1) for (let k = col; k < col + span; k++) dolu[k] = h.rowSpan;
      col += span;
    });
    // bu satır tamamlandı: rowSpan sayaçlarını azalt (bu satırda başlayanlar dahil)
    for (let k = 0; k < dolu.length; k++) if (dolu[k] > 0) dolu[k]--;
    return new TableRow({ children: cells, tableHeader: o.header ? ri < o.header : undefined, cantSplit: o.cantSplit, height: o.minH ? { value: o.minH, rule: "atLeast" } : undefined });
  });
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, alignment: o.align, borders: o.borders || KENARLIK, rows: satirlar });
}

// Etiket–değer çiftlerinden iki sütunlu bilgi tablosu
function BILGI(ciftler, genislik, o = {}) {
  const sol = o.sol || Math.round(genislik * 0.34);
  return T(ciftler.map(([a, b]) => [{ c: a, bold: true, fill: RENK.gri }, b ?? ""]), [sol, genislik - sol], { size: o.size || 21, minH: o.minH, align: o.align });
}

// Boş satırlı form tablosu: başlıklar + n boş satır (ilk sütun sıra no ise otomatik doldurur)
function FORM(basliklar, widths, n, o = {}) {
  const rows = [basliklar];
  for (let i = 1; i <= n; i++) rows.push(basliklar.map((_, j) => (j === 0 && o.sira !== false ? String(i) : "")));
  return T(rows, widths, { header: 1, size: o.size || 20, minH: o.minH || 400 });
}

// İmza bloğu: [{ ad, rol }] — kenarlıksız tablo
function IMZA(kisiler, genislik, o = {}) {
  const w = Math.floor(genislik / kisiler.length);
  const widths = kisiler.map((_, i) => (i === kisiler.length - 1 ? genislik - w * (kisiler.length - 1) : w));
  const C = AlignmentType.CENTER;
  return T([kisiler.map((k) => ({ c: [P(k.ust || "", { align: C, size: 21, bold: true, after: 0 }), ...BOS(o.bosluk ?? 2), P(k.ad || "………………………", { align: C, size: 21, after: 0 }), P(k.rol, { align: C, size: 21, after: 0 })] }))], widths, { borders: KENARSIZ });
}

const ONAY = (ad, tarih) => [
  ...BOS(1),
  P("UYGUNDUR", { align: AlignmentType.CENTER, bold: true, after: 0 }),
  P(tarih, { align: AlignmentType.CENTER, after: 0 }),
  ...BOS(2),
  P(ad, { align: AlignmentType.CENTER, after: 0 }),
  P("Okul Müdürü", { align: AlignmentType.CENTER, after: 0 }),
];

function NOT_KUTUSU(satirlar, genislik, baslik = "Not") {
  return T([[{ c: [P(`**${baslik}**`, { size: 20, after: 40 }), ...satirlar.map((s) => P(s, { size: 20, after: 30 }))], fill: "FFF2CC" }]], [genislik], {});
}

// Art arda gelen iki tablo Word'de tek tabloya birleşir; araya boş paragraf koyar.
function ayir(children) {
  const out = [];
  children.forEach((ch) => {
    if (ch instanceof Table && out[out.length - 1] instanceof Table) out.push(P("", { after: 0, size: 8 }));
    out.push(ch);
  });
  return out;
}

// Bölüm üretici: yön "P" (dikey) veya "L" (yatay)
function BOLUM(yon, children, ustBilgi) {
  const header = new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: ustBilgi, size: 16, color: RENK.acik, font: FONT })] })] });
  const footer = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["Sayfa ", PageNumber.CURRENT], size: 16, color: RENK.acik, font: FONT })] })] });
  return {
    properties: {
      page: {
        size: { width: A4.width, height: A4.height, orientation: yon === "L" ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT },
        margin: { top: KENAR[yon], bottom: KENAR[yon], left: KENAR[yon], right: KENAR[yon], header: 400, footer: 400 },
      },
    },
    headers: { default: header },
    footers: { default: footer },
    children: ayir(children),
  };
}

module.exports = { P, H1, H2, H3, MADDE, NUMARA, T, BILGI, FORM, IMZA, ONAY, NOT_KUTUSU, BOLUM, BOS, SAYFA_SONU, GEN, RENK, NUMBERING, STYLES, AlignmentType, KENARSIZ };
