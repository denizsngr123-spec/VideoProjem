// Öğretmen dosyasını üretir: node ogretmen-dosyasi-2026-2027/kaynak/olustur.js
const fs = require("fs");
const path = require("path");
const { Document, Packer } = require("docx");
const V = require("./veri");
const {
  P, H1, H2, H3, MADDE, NUMARA, T, BILGI, FORM, IMZA, ONAY, NOT_KUTUSU, BOLUM, BOS, SAYFA_SONU, GEN, RENK, NUMBERING, STYLES, AlignmentType,
} = require("./yardimci");

const A = V.AYAR;
const C = AlignmentType.CENTER;
const OUT = path.resolve(__dirname, "..");
const UST = `${A.okul} · ${A.yil} Eğitim-Öğretim Yılı · Bilişim Teknolojileri ve Yazılım`;
const WP = GEN.P;
const WL = GEN.L;
const SUBELER = ["5/A", "5/B", "5/C", "5/D", "6/A", "6/B", "6/C", "6/D"];

const kod = (k) => `BTY.${k}.`;
const ciktiMetni = (k) => `${kod(k)} ${V.CIKTI[k].m}${V.CIKTI[k].y ? " *" : ""}`;

function resmiBaslik(satirlar) {
  return [
    P("T.C.", { align: C, bold: true, after: 0 }),
    P(`${A.ilce.toUpperCase()} KAYMAKAMLIĞI`, { align: C, bold: true, after: 0 }),
    P(`${A.okul.toUpperCase()} MÜDÜRLÜĞÜ`, { align: C, bold: true, after: 60 }),
    ...satirlar.map((s, i) => P(s, { align: C, bold: true, after: i === satirlar.length - 1 ? 160 : 0 })),
  ];
}

// ───────────────────────── 00 KAPAK, GENEL BİLGİLER, MEVZUAT ─────────────────────────
function kapak() {
  const kapakSayfa = [
    ...BOS(4),
    P("T.C.", { align: C, size: 28, bold: true, after: 40 }),
    P("MİLLÎ EĞİTİM BAKANLIĞI", { align: C, size: 28, bold: true, after: 40 }),
    P(`${A.il} / ${A.ilce}`, { align: C, size: 26, after: 40 }),
    P(A.okul.toUpperCase(), { align: C, size: 28, bold: true, after: 600 }),
    P(`${A.yil}`, { align: C, size: 40, bold: true, color: RENK.baslik, after: 80 }),
    P("EĞİTİM-ÖĞRETİM YILI", { align: C, size: 30, bold: true, color: RENK.baslik, after: 500 }),
    P("BİLİŞİM TEKNOLOJİLERİ VE YAZILIM", { align: C, size: 40, bold: true, after: 80 }),
    P("ÖĞRETMEN DOSYASI", { align: C, size: 48, bold: true, color: RENK.baslik, after: 120 }),
    P("5. ve 6. Sınıflar · Türkiye Yüzyılı Maarif Modeli", { align: C, size: 26, italics: true, after: 900 }),
    BILGI([["Ders Öğretmeni", A.ogretmen], ["Okul Müdürü", A.mudur]], 6000, { sol: 2200, size: 24, minH: 500, align: C }),
  ];

  const ogretmenBilgi = [
    H1("ÖĞRETMEN BİLGİLERİ", { yeniSayfa: true }),
    BILGI([
      ["Adı Soyadı", A.ogretmen],
      ["Branşı", "Bilişim Teknolojileri"],
      ["Kadro / Görev Durumu", "☐ Kadrolu   ☐ Sözleşmeli   ☐ Görevlendirme   ☐ Ücretli"],
      ["Okulda Göreve Başlama Tarihi", ""],
      ["Telefon / Kurumsal E-posta", ""],
      ["Okuttuğu Sınıflar / Şubeler", ""],
      ["Haftalık Ders Saati (toplam)", ""],
      ["Zümre Başkanlığı", "☐ Evet   ☐ Hayır"],
      ["Sınıf Rehber Öğretmenliği", "☐ Yok   ☐ Var (Sınıf/Şube: ……)"],
      ["Kulüp / Sosyal Etkinlik Danışmanlığı", ""],
      ["BT Rehber Öğretmenliği / Okul Bilişim Sorumluluğu", "☐ Evet   ☐ Hayır"],
      ["Nöbet Günü ve Yeri", ""],
      ["Diğer Görevler (komisyonlar vb.)", ""],
    ], WP, { minH: 420 }),
    H2("Ders Dağılımı"),
    T([
      ["Sınıf / Şube", "Ders", "Haftalık Saat", "Öğrenci Sayısı", "Kaynaştırma (BEP) Öğrenci Sayısı", "Sınıf Rehber Öğretmeni"],
      ...SUBELER.map((s) => [s, "Bilişim Teknolojileri ve Yazılım", "2", "", "", ""]),
      ["", "", "", "", "", ""],
      [{ c: "TOPLAM", bold: true, span: 2 }, "", "", "", ""],
    ], [1100, 3000, 1100, 1300, 1600, 1538], { header: 1, size: 20, minH: 380 }),
    H2("Haftalık Ders Programı", { yeniSayfa: true }),
    T([
      ["Ders", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
      ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => [{ c: `${n}. ders\n`.trim(), bold: true, fill: RENK.gri, align: C }, "", "", "", "", ""]),
    ], [1238, 1680, 1680, 1680, 1680, 1680], { header: 1, size: 20, minH: 800 }),
    P("Ders saatleri: 1. ……–……  2. ……–……  3. ……–……  4. ……–……  5. ……–……  6. ……–……  7. ……–……  8. ……–……", { size: 20, before: 120 }),
    H2("Nöbet ve Ek Görev Bilgileri"),
    FORM(["Görev", "Gün / Dönem", "Yer / Birim", "Açıklama"], [2600, 2000, 2400, 2638], 5, { sira: false }),
  ];

  const icindekiler = [
    H1("İÇİNDEKİLER", { yeniSayfa: true }),
    T([
      ["No", "Bölüm", "Dosya", "İçerik"],
      ["0", "Genel Bilgiler ve Mevzuat", "00_Kapak_Genel_Bilgiler_ve_Mevzuat", "Kapak, öğretmen bilgileri, ders dağılımı, haftalık program, çalışma takvimi, mevzuat özeti, kontrol listesi, belirli gün ve haftalar"],
      ["1", "5. Sınıf Yıllık Planı", "01_Yillik_Plan_5_Sinif", "Haftalara göre tema, öğrenme çıktıları ve süreç bileşenleri, içerik, ölçme-değerlendirme, belirli gün ve haftalar"],
      ["2", "6. Sınıf Yıllık Planı", "02_Yillik_Plan_6_Sinif", "Aynı yapıda 6. sınıf planı"],
      ["3", "Zümre Toplantı Tutanakları", "03_Zumre_Toplanti_Tutanaklari", "Sene başı (doldurulmuş), 2. dönem başı ve sene sonu tutanakları; şube öğretmenler kurulu görüş formu"],
      ["4", "Ölçme ve Değerlendirme", "04_Olcme_ve_Degerlendirme", "Esaslar, sınav takvimi, konu-soru dağılım tabloları, katılım ölçeği, performans görevi, dereceli puanlama anahtarları, kontrol listesi, öz/akran değerlendirme, gözlem formu"],
      ["5", "Ders Planları", "05_Ders_Plani_Sablon_ve_Ornekler", "TYMM yapısına uygun ders planı şablonu ve iki örnek plan"],
      ["6", "BT Sınıfı Evrakları", "06_BT_Sinifi_Evraklari", "Kullanım kuralları, oturma planı, demirbaş listesi, arıza takibi, iş güvenliği, kullanım çizelgesi, veli onayı"],
      ["7", "BEP Formları", "07_BEP_Ozel_Egitim_Formlari", "Kaba değerlendirme, BEP ders planı, uyarlamalar, dönem sonu değerlendirme"],
      ["8", "Kulüp ve Sosyal Etkinlik", "08_Kulup_ve_Sosyal_Etkinlik", "Yıllık çalışma planı, toplantı tutanağı, toplum hizmeti, yıl sonu raporu (görev verildiyse)"],
      ["9", "Veli ve Öğrenci İletişimi", "09_Veli_ve_Ogrenci_Iletisim", "Veli bilgilendirme mektubu, veli ve öğrenci görüşme formları, görüşme takip çizelgesi"],
    ], [500, 2200, 2700, 4238], { header: 1, size: 19 }),
    P("Tüm bölümler ayrıca tek dosyada birleştirilmiştir: **Ogretmen_Dosyasi_TAMAMI.docx**", { before: 160, size: 21 }),
  ];

  const takvim = [
    H1(`${A.yil} ÇALIŞMA TAKVİMİ`, { yeniSayfa: true }),
    T([["Etkinlik", "Tarih"], ...V.TAKVIM], [5600, 4038], { header: 1, size: 21, minH: 360 }),
    P("Ders yılı 37 ders haftasından oluşur. 5. ve 6. sınıflarda Bilişim Teknolojileri ve Yazılım dersi haftada 2 ders saatidir; öğretim programı 72 ders saati (68 saat tema + 4 saat okul temelli planlama) üzerinden düzenlenmiştir.", { before: 160, size: 21 }),
    NOT_KUTUSU([
      "Takvim, MEB'in 2026-2027 çalışma takvimine ilişkin duyurulardan derlenmiştir. Toplantı tarihleri il/ilçe millî eğitim müdürlüğünce ve okul idaresince farklı belirlenebilir; okulunuzun duyurularını esas alınız.",
      "Dinî bayram tarihleri Diyanet İşleri Başkanlığı takvimine göredir.",
    ], WP),
  ];

  const mevzuat = [
    H1("MEVZUAT ÖZETİ", { yeniSayfa: true }),
    P("Öğretmen dosyası tek bir mevzuat maddesiyle tanımlanmış bir belge değildir; aşağıdaki düzenlemelerin öğretmenden beklediği plan, tutanak ve kayıtların bir arada tutulduğu çalışma dosyasıdır. Birçok kayıt artık elektronik ortamda (e-Okul, MEBBİS) tutulmaktadır.", { size: 21 }),
    H2("1. Planlama"),
    ...MADDE([
      "**Eğitim ve Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge:** İlkokul ve ortaokullarda yıllık plan ve ders planı yapılması zorunludur. Planlar okul yönetimi, zümre öğretmenleri ve ders öğretmenlerinin ortak katkısıyla hazırlanır ve ders yılı sonunda bir toplantıda değerlendirilir.",
      "Planların basılı (kâğıt) olarak tutulması zorunlu değildir; elektronik ortamda saklanabilir.",
      "Türkiye Yüzyılı Maarif Modeli kapsamında MEB, 2026-2027 için ders bazında **taslak çerçeve yıllık planlar** yayımlamıştır (tymm.meb.gov.tr). Bu dosyadaki yıllık planlar o yapı esas alınarak hazırlanmıştır; zümrede MEB taslağıyla karşılaştırınız.",
      "Kılavuz kitabı bulunmayan derslerde ders planını öğretmen/zümre hazırlar. 5. ve 6. sınıf BTY öğretmen kılavuz kitapları tymm.meb.gov.tr'de yayımlanmıştır; kılavuzdaki etkinliklerden yararlanabilirsiniz.",
      "Özel eğitim ihtiyacı olan öğrenciler için ilgili mevzuat doğrultusunda BEP hazırlanır; bu öğrenciler için ayrıca yıllık plan hazırlanmaz.",
    ], { size: 21 }),
    H2("2. Kurullar ve Zümreler"),
    ...MADDE([
      "**Eğitim Kurulları ve Zümreleri Yönergesi:** Öğretmenler kurulu ve okul zümre öğretmenler kurulu ders yılı başlamadan önce, ikinci dönem başında ve ders yılı sonunda toplanır; gerektiğinde ek toplantı yapılabilir.",
      "Toplantıların tarihi, yeri ve gündemi en az 5 gün önceden duyurulur; gündem ve tutanaklar MEBBİS **e-Kurul ve Zümre Modülü** üzerinden işlenir. Bu dosyadaki tutanaklar hazırlık ve arşiv amaçlıdır.",
      "2026-2027 ders yılı başında öğretmenler kurulu 2 Eylül, okul zümreleri 3 Eylül, ilçe zümreleri 4 Eylül, il zümreleri 7 Eylül 2026 tarihlerinde planlanmıştır.",
    ], { size: 21 }),
    H2("3. Ölçme ve Değerlendirme"),
    ...MADDE([
      "**Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği:** Ortaokulda öğrenci başarısı sınavlar, ders etkinliklerine katılım ve varsa proje çalışmalarından alınan puanlarla değerlendirilir.",
      "Her dersten bir dönemde **iki sınav** yapılır. Haftalık ders saati 2 ve daha az olan derslerde her dönem **iki ders etkinliklerine katılım puanı** verilir (BTY: 2 saat).",
      "**Ortak Yazılı Sınav Sistemi (OYSS):** 2026-2027 1. dönem 1. sınavlardan itibaren 5, 6 ve 7. sınıflarda Türkçe, matematik, fen bilimleri, sosyal bilgiler, din kültürü ve ahlak bilgisi ile İngilizce derslerinde uygulanır. **BTY bu kapsamda değildir;** sınavlar okulda zümre kararıyla hazırlanır (uygulamalı sınav yapılabilir).",
      "**Gelişim Raporu:** 2025-2026'dan itibaren 5. sınıflardan başlayarak kademeli şekilde, her dönem sonunda karne ile birlikte öğretmen görüşünü içeren gelişim raporu hazırlanır (devam durumu, gelişim düzeyi, sosyal-duygusal gelişim). 6. sınıflardaki uygulama takvimini okul idarenizden teyit ediniz.",
    ], { size: 21 }),
    H2("4. 28 Temmuz 2026 Yönetmelik Değişikliği (RG 33323)"),
    ...MADDE([
      "Veliler görüşme taleplerini okulun internet sayfasındaki **Okul Randevu Sistemi** üzerinden oluşturabilir.",
      "Öğretmenlerin mesleki çalışmaları çevrim içi olarak da yapılabilir.",
      "Ortaokulda gelişim raporuna ilişkin hükümler ve özürsüz devamsızlık nedeniyle başarı belgesi verilmemesine ilişkin düzenlemeler yapılmıştır.",
    ], { size: 21 }),
    H2("5. Diğer"),
    ...MADDE([
      "**Özel Eğitim Hizmetleri Yönetmeliği:** BEP, okulun BEP geliştirme birimince hazırlanır; ders öğretmeni dersine ilişkin amaçları belirler ve uygular.",
      "**6698 sayılı Kişisel Verilerin Korunması Kanunu:** Öğrenci fotoğraf, ses, video ve ürünlerinin paylaşımında okulun aydınlatma metni ve velinin açık rızası esas alınır.",
      "**6331 sayılı İş Sağlığı ve Güvenliği Kanunu:** BT sınıfındaki elektrik, ergonomi ve acil durum riskleri okulun İSG çalışmalarına göre takip edilir.",
      "Sosyal etkinlik/kulüp danışmanlığı verilmişse ilgili yönetmelik ve okul sosyal etkinlik kurulu kararları esas alınır.",
    ], { size: 21 }),
  ];

  const kontrol = [
    H1("ÖĞRETMEN DOSYASI KONTROL LİSTESİ", { yeniSayfa: true }),
    T([
      ["Belge / Kayıt", "Dayanak", "Zaman", "Kayıt Yeri", "Durum"],
      ["Yıllık plan (5. ve 6. sınıf)", "Planlı Yürütme Yönergesi", "Ders yılı başı", "Okul idaresi / dosya", "☐"],
      ["Ders planları", "Planlı Yürütme Yönergesi", "Ders/tema öncesi", "Dosya / dijital", "☐"],
      ["Sene başı zümre tutanağı", "Kurullar ve Zümreler Yönergesi", "Eylül", "e-Kurul ve Zümre Modülü", "☐"],
      ["2. dönem başı zümre tutanağı", "Kurullar ve Zümreler Yönergesi", "Şubat", "e-Kurul ve Zümre Modülü", "☐"],
      ["Sene sonu zümre tutanağı", "Kurullar ve Zümreler Yönergesi", "Haziran", "e-Kurul ve Zümre Modülü", "☐"],
      ["Şube öğretmenler kurulu görüşleri", "İlköğretim Kurumları Yönetmeliği", "Kurul tarihlerinde", "Okul idaresi", "☐"],
      ["Sınav takvimi ve konu-soru dağılım tabloları", "İlköğretim Kurumları Yönetmeliği / zümre kararı", "Her sınav öncesi", "Dosya / öğrenciye duyuru", "☐"],
      ["Sınav soruları, cevap anahtarı, sınav kâğıtları", "İlköğretim Kurumları Yönetmeliği", "Her sınav", "Okul idaresi", "☐"],
      ["Ders etkinliklerine katılım ölçütleri ve puanları", "İlköğretim Kurumları Yönetmeliği", "Dönemde 2 kez", "e-Okul", "☐"],
      ["Performans görevi / proje yönergeleri ve puanlama anahtarları", "Zümre kararı", "Görev verilirken", "Dosya", "☐"],
      ["Gelişim raporu öğretmen görüşleri", "İlköğretim Kurumları Yönetmeliği", "Dönem sonu", "e-Okul", "☐"],
      ["BEP (dersle ilgili bölüm)", "Özel Eğitim Hizmetleri Yönetmeliği", "Ders yılı başı / dönem sonu", "BEP birimi / dosya", "☐"],
      ["BT sınıfı kuralları, oturma planı, demirbaş, arıza ve İSG kayıtları", "Okul iç düzenlemesi / 6331 s. Kanun", "Sürekli", "Dosya", "☐"],
      ["Veli görüşme kayıtları", "İlköğretim Kurumları Yönetmeliği (Okul Randevu Sistemi)", "Görüşme oldukça", "Dosya / sistem", "☐"],
      ["Kulüp/sosyal etkinlik evrakı (görev verildiyse)", "Sosyal etkinliklere ilişkin yönetmelik", "Yıl boyunca", "e-Okul / dosya", "☐"],
      ["Mesleki çalışma katılımı", "İlköğretim Kurumları Yönetmeliği", "Eylül / Haziran", "Okul idaresi", "☐"],
    ], [2900, 2300, 1500, 2138, 800], { header: 1, size: 19 }),
  ];

  const bgh = [
    H1("BELİRLİ GÜN VE HAFTALAR", { yeniSayfa: true }),
    T([["Ay", "Belirli Gün ve Haftalar"], ...V.BGH_LISTE], [1200, 8438], { header: 1, size: 20 }),
    P("✱ İşaretli günler MEB belirli gün ve haftalar listesinde yer almamakla birlikte Bilişim Teknolojileri ve Yazılım dersiyle doğrudan ilişkilendirilebilecek uluslararası/ulusal günlerdir.", { size: 19, italics: true, before: 120 }),
  ];

  return [BOLUM("P", [...kapakSayfa, ...ogretmenBilgi, ...icindekiler, ...takvim, ...mevzuat, ...kontrol, ...bgh], UST)];
}

// ───────────────────────── 01-02 YILLIK PLANLAR ─────────────────────────
function yillikPlan(sinif, plan) {
  const items = [];
  V.HAFTALAR.forEach((w) => {
    const ti = plan.findIndex((t) => t.hafta[w.no]);
    items.push({ tip: "h", w, ti });
    const tatil = V.TATILLER.find((x) => x.sonra === w.no);
    if (tatil) items.push({ tip: "t", metin: tatil.metin });
  });
  // Ardışık (tatil satırıyla bölünmemiş) grupların uzunluğu
  const grup = (i, anahtar) => {
    const prev = items[i - 1];
    if (prev && prev.tip === "h" && anahtar(prev) === anahtar(items[i])) return 0;
    let n = 0;
    for (let j = i; j < items.length && items[j].tip === "h" && anahtar(items[j]) === anahtar(items[i]); j++) n++;
    return n;
  };
  const S = 17;
  const rows = [["AY", "HAFTA", "SAAT", "TEMA", "ÖĞRENME ÇIKTILARI VE SÜREÇ BİLEŞENLERİ", "İÇERİK ÇERÇEVESİ", "ÖLÇME VE DEĞERLENDİRME", "BELİRLİ GÜN VE HAFTALAR / AÇIKLAMALAR"]];
  items.forEach((it, i) => {
    if (it.tip === "t") {
      rows.push([{ c: it.metin, span: 8, fill: RENK.tatil, bold: true, align: C, size: S }]);
      return;
    }
    const { w } = it;
    const tema = plan[it.ti];
    const hd = tema.hafta[w.no];
    const r = [];
    const ayN = grup(i, (x) => x.w.ay);
    if (ayN) r.push({ c: w.ay, rowSpan: ayN, bold: true, align: C, size: 16, fill: RENK.gri });
    r.push({ c: [P(`**${w.no}. Hafta**`, { size: S, after: 0 }), P(w.tarih, { size: 16, after: 0 })] });
    r.push({ c: "2", align: C, size: S });
    const temaN = grup(i, (x) => x.ti);
    if (temaN) r.push({ c: tema.tema, rowSpan: temaN, bold: true, size: 16, fill: RENK.tema });
    const oc = [];
    hd.c.forEach((k) => {
      oc.push(P(`**${kod(k)}** ${V.CIKTI[k].m}${V.CIKTI[k].y ? " *" : ""}`, { size: S, after: 20, line: 240 }));
      const surec = V.CIKTI[k].s || [];
      const secili = hd.s ? hd.s.map((x) => surec[x]).filter(Boolean) : surec;
      secili.forEach((s) => oc.push(P(s, { size: 16, after: 0, line: 240 })));
    });
    if (!hd.c.length) oc.push(P(tema.tema.startsWith("OKUL") ? "Okul temelli planlama" : "Genel değerlendirme", { size: S, italics: true }));
    r.push({ c: oc });
    r.push({ c: hd.icerik, size: S });
    if (temaN) r.push({ c: tema.olcme, rowSpan: temaN, size: 16 });
    const ac = [...(w.not || []).map((s) => P(`**${s}**`, { size: 16, after: 20, line: 240 })), ...w.bgh.map((s) => P(s, { size: 16, after: 20, line: 240 }))];
    if (V.SINAV_HAFTALARI[w.no]) ac.push(P(V.SINAV_HAFTALARI[w.no], { size: 16, italics: true, after: 0 }));
    r.push({ c: ac.length ? ac : "" });
    rows.push(r);
  });

  const widths = [900, 1250, 620, 1850, 4100, 3000, 1750, 1928];
  const ogrenciSay = sinif === 5 ? "5" : "6";
  return [BOLUM("L", [
    ...resmiBaslik([`${A.yil} EĞİTİM-ÖĞRETİM YILI`, `BİLİŞİM TEKNOLOJİLERİ VE YAZILIM DERSİ ${ogrenciSay}. SINIF ÜNİTELENDİRİLMİŞ YILLIK PLANI`]),
    P(`**Öğretim programı:** Türkiye Yüzyılı Maarif Modeli Bilişim Teknolojileri ve Yazılım Dersi Öğretim Programı (5 ve 6. Sınıflar)   **Haftalık ders saati:** 2   **Yıllık:** 72 ders saati (68 saat tema + 4 saat okul temelli planlama) · 37 ders haftası`, { size: 18, align: C, after: 120 }),
    T(rows, widths, { header: 1, size: S }),
    P("* İşaretli öğrenme çıktılarının ifadeleri ikincil kaynaklardan derlenmiştir; MEB'in tymm.meb.gov.tr adresindeki tema sayfaları ve 2026-2027 taslak çerçeve planı ile karşılaştırılarak gerekirse düzeltilmelidir. ✱ İşaretli günler dersle ilişkilendirilebilecek günlerdir.", { size: 16, italics: true, before: 100, after: 40 }),
    P("Resmî tatillere (29 Ekim, 1 Ocak, 23 Nisan, Kurban Bayramı 16-19 Mayıs) denk gelen dersler şubenin ders gününe göre değişir; eksik kalan saatler 37. haftada ve okul temelli planlama saatlerinde telafi edilir. Sınav haftaları öneridir; kesin tarihler okul sınav takviminde belirlenir.", { size: 16, italics: true, after: 40 }),
    P("Bu yıllık plan; Türkiye Yüzyılı Maarif Modeli öğretim programı, 2026-2027 çalışma takvimi ve okul zümre öğretmenler kurulu kararları doğrultusunda hazırlanmıştır.", { size: 18, after: 120 }),
    IMZA([{ ad: A.ogretmen, rol: "Bilişim Teknolojileri Öğretmeni" }, { ad: "……………………………", rol: "Bilişim Teknolojileri Öğretmeni" }, { ust: "UYGUNDUR", ad: A.mudur, rol: "Okul Müdürü", }], WL, { bosluk: 2 }),
    P("…… / 09 / 2026", { align: AlignmentType.RIGHT, size: 18, before: 0 }),
  ], UST)];
}

// ───────────────────────── 03 ZÜMRE TUTANAKLARI ─────────────────────────
function zumreImza(tarih) {
  return [
    P("ZÜMRE ÖĞRETMENLERİ", { bold: true, align: C, before: 200, after: 80, keepNext: true }),
    T([["Adı Soyadı", "Branşı", "Okuttuğu Sınıflar", "İmza"], [A.ogretmen, "Bilişim Teknolojileri", "", ""], ["", "Bilişim Teknolojileri", "", ""], ["", "", "", ""]], [3200, 2400, 2200, 1838], { header: 1, size: 20, minH: 520, cantSplit: true }),
    ...ONAY(A.mudur, tarih),
  ];
}

function zumre() {
  const not = NOT_KUTUSU([
    "Tutanaklar MEBBİS e-Kurul ve Zümre Modülüne işlenir; bu metinler hazırlık ve arşiv amaçlıdır. Gündem okulunuzca duyurulan gündemle uyumlu hâle getirilmelidir.",
    "Okulunuzda dersin tek öğretmeniyseniz toplantıyı okul idaresinin belirlediği usulle yapıp ilçe zümre kararlarını dikkate alınız.",
    "Noktalı yerleri okulunuza göre doldurunuz; okulunuzda uygulanmayan kararları çıkarınız.",
  ], WP, "Kullanım notu");

  const gundem1 = [
    "Açılış, yoklama ve zümre başkanının belirlenmesi.",
    "2025-2026 eğitim-öğretim yılı sene sonu zümre kararlarının ve ilçe zümre kararlarının gözden geçirilmesi.",
    "İlgili mevzuatın okunması ve görüşülmesi.",
    "Türkiye Yüzyılı Maarif Modeli Bilişim Teknolojileri ve Yazılım Dersi Öğretim Programı'nın (5 ve 6. sınıflar) incelenmesi.",
    "Yıllık planların hazırlanması ve okul temelli planlama saatlerinin belirlenmesi.",
    "Öğretim yöntem ve teknikleri, farklılaştırma uygulamaları, ders araç-gereçleri.",
    "BT sınıfının durumu, donanım-yazılım ihtiyaçları ve iş sağlığı ve güvenliği.",
    "Ölçme ve değerlendirme: sınavlar, ders etkinliklerine katılım, performans görevi ve proje, gelişim raporu.",
    "Özel eğitim ihtiyacı olan (BEP) öğrenciler ile özel yetenekli öğrencilere yönelik çalışmalar.",
    "Belirli gün ve haftalar, sosyal etkinlikler, yarışmalar ve diğer derslerle iş birliği.",
    "Dijital güvenlik, kişisel verilerin korunması ve öğrenci ürünlerinin paylaşılması.",
    "Dilek ve temenniler, kapanış.",
  ];
  const gorusme1 = [
    "**1.** Toplantı ……… saatinde zümre öğretmenlerinin katılımıyla başladı; yoklama yapıldı. Zümre başkanlığına ……………………… seçildi.",
    "**2.** 2025-2026 eğitim-öğretim yılı sene sonu zümre kararları ile ilçe zümre kararları okundu. Geçen yıl uygulanan öğretim programına ilişkin deneyimler paylaşıldı; uygulama ağırlıklı etkinliklerin ve eşli çalışmanın ders süresinin verimli kullanılmasına katkı sağladığı belirtildi.",
    "**3.** Millî Eğitim Bakanlığı Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği (28.07.2026 tarihli ve 33323 sayılı Resmî Gazete'de yayımlanan değişiklikler dâhil), Eğitim Kurulları ve Zümreleri Yönergesi, Eğitim ve Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge, Özel Eğitim Hizmetleri Yönetmeliği ve 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ilgili hükümleri okundu. Veli görüşmelerinin Okul Randevu Sistemi üzerinden planlanabileceği ve ortaokulda gelişim raporu uygulamasının kademeli olarak sürdüğü hatırlatıldı.",
    "**4.** Öğretim programı incelendi. Dersin her iki sınıf düzeyinde haftada 2 ders saati olduğu; programın Bilişim Teknolojilerinin Hayatımızdaki Yeri, Dijital Ürün Tasarımı ve Geliştirme, Bilgisayar Ağları ve İletişim, Bilişim Etiği ve Siber Güvenlik, Yapay Zekâ, Yazılım Tasarımı ve Programlama temalarından oluştuğu ve yıllık 4 ders saatinin okul temelli planlamaya ayrıldığı görüldü. Programın alan becerileri, kavramsal beceriler, eğilimler, sosyal-duygusal öğrenme becerileri, değerler ve okuryazarlık becerilerini bütünleştirdiği; öğrenme çıktılarının süreç bileşenleriyle birlikte ele alınması gerektiği vurgulandı.",
    "**5.** Yıllık planların, MEB'in yayımladığı taslak çerçeve planlar ve 2026-2027 çalışma takvimi esas alınarak hazırlanması görüşüldü. Resmî tatillere denk gelen dersler için telafi planlaması yapılması gerektiği belirtildi.",
    "**6.** Proje tabanlı öğrenme, probleme dayalı öğrenme, iş birlikli öğrenme, bilgisayarsız (unplugged) etkinlikler, eşli programlama ve tasarım odaklı düşünme yaklaşımlarının kullanılması; öğrencilerin hazır bulunuşluğuna göre zenginleştirme ve destekleme etkinlikleriyle farklılaştırma yapılması görüşüldü. Öğretmen kılavuz kitapları ve EBA içeriklerinden yararlanılacağı belirtildi.",
    "**7.** BT sınıfında …… bilgisayar bulunduğu, bunlardan …… adedinin çalışır durumda olduğu; internet bağlantısı ve etkileşimli tahtanın durumu değerlendirildi. İhtiyaçlar: ……………………………………………………",
    "**8.** Ortak Yazılı Sınav Sistemi'nin (OYSS) ortaokulda Türkçe, matematik, fen bilimleri, sosyal bilgiler, din kültürü ve ahlak bilgisi ile İngilizce derslerini kapsadığı; Bilişim Teknolojileri ve Yazılım dersi sınavlarının okulda zümre tarafından hazırlanacağı belirtildi. Yönetmelik gereği öğrenci başarısının sınavlar, ders etkinliklerine katılım ve varsa proje çalışmalarından alınan puanlarla değerlendirileceği; her dönem iki sınav yapılacağı ve haftalık ders saati 2 olan bu derste her dönem iki ders etkinliklerine katılım puanı verileceği hatırlatıldı.",
    "**9.** Özel eğitim ihtiyacı olan öğrenciler için BEP geliştirme birimince hazırlanan programlar doğrultusunda dersle ilgili amaçların belirlenmesi; özel yetenekli öğrenciler için ileri düzey kodlama görevleri ve yarışmalara hazırlık gibi zenginleştirme etkinlikleri planlanması görüşüldü.",
    "**10.** Avrupa Kod Haftası, Güvenli İnternet Günü ve Bilim ve Teknoloji Haftası gibi dersle ilişkili gün ve haftalarda etkinlik yapılması; ilgili öğrencilerin TÜBİTAK, TEKNOFEST vb. yarışmalara yönlendirilmesi; matematik (algoritma, veri), Türkçe (dijital metin), görsel sanatlar (tasarım) ve fen bilimleri (veri toplama) dersleriyle disiplinler arası çalışmalar yapılması görüşüldü.",
    "**11.** Öğrencilerin hesap ve şifrelerini paylaşmamaları ve kişisel verilerin korunması konusunda bilinçlendirilmesi; öğrenci fotoğraf ve ürünlerinin okul dışı platformlarda paylaşılmasında velinin açık rızasının alınması gerektiği hatırlatıldı. Yapay zekâ araçlarının yaş sınırları ve kullanım koşulları gözetilerek öğretmen gözetiminde ve kişisel veri girilmeden kullanılması görüşüldü.",
    "**12.** Dilek ve temennilerin ardından toplantı ……… saatinde sona erdi.",
  ];
  const karar1 = [
    "5. ve 6. sınıf yıllık planları MEB taslak çerçeve planları ve 2026-2027 çalışma takvimi esas alınarak hazırlanmış olup ekte sunulmuştur.",
    "Okul temelli planlama için ayrılan 4 ders saati haziran ayında yıl sonu proje sergisi/kodlama şenliği ve ürünlerin e-portfolyoda düzenlenmesi için kullanılacaktır.",
    "Her dönem iki sınav yapılacaktır. Sınavlar uygulamalı veya yazılı ve uygulamalı olarak hazırlanacak; konu-soru dağılım tabloları sınavdan en az bir hafta önce öğrencilere duyurulacaktır. Sınav tarihleri okul sınav takvimine işlenecektir.",
    "Her dönem iki ders etkinliklerine katılım puanı verilecek; puanlama dosyadaki ölçütlerle yapılacak ve ölçütler ilk derste öğrencilere açıklanacaktır.",
    "Proje görevi almak isteyen öğrencilere proje yönergesi ve dereceli puanlama anahtarı önceden verilecektir.",
    "Sınav ve etkinlik puanları mevzuatta belirtilen süreler içinde e-Okul'a işlenecek; sınav kâğıtları öğrencilere gösterildikten sonra okul idaresince belirlenen usule göre saklanacaktır.",
    "Gelişim raporu için öğretmen görüşleri dönem boyunca tutulan gözlem kayıtlarına dayanılarak hazırlanacaktır.",
    "Öğrenci ürünleri sınıf/şube klasörlerinde dijital olarak (e-portfolyo) saklanacaktır.",
    "BT sınıfı kullanım kuralları ilk derste öğrencilerle birlikte okunacak ve sınıfa asılacak; her şube için bilgisayar oturma planı yapılacaktır.",
    "Donanım arızaları arıza-bakım takip formuyla okul idaresine bildirilecek; iş sağlığı ve güvenliği kontrol listesi her dönem başında doldurulacaktır.",
    "BEP'li öğrenciler için kaba değerlendirme yapılarak dersle ilgili amaçlar BEP geliştirme birimine iletilecektir.",
    "Yapay zekâ araçları öğretmen gözetiminde, yaş sınırları ve kullanım koşulları dikkate alınarak ve kişisel veri girilmeden kullanılacaktır.",
    "Öğrenci görselleri ve ürünleri velinin açık rızası alınmadan okul dışı platformlarda paylaşılmayacaktır.",
    "Avrupa Kod Haftası, Güvenli İnternet Günü ve Bilim ve Teknoloji Haftası'nda dersle ilişkili etkinlikler düzenlenecektir.",
  ];

  const tutanakBaslik = (ad, no, tarih) => [
    ...resmiBaslik([`${A.yil} EĞİTİM-ÖĞRETİM YILI`, "BİLİŞİM TEKNOLOJİLERİ VE YAZILIM DERSİ", ad]),
    BILGI([["Toplantı No", no], ["Toplantı Tarihi / Saati", tarih], ["Toplantı Yeri", "………………………………"], ["Toplantı Başkanı", "………………………………"], ["Katılanlar", "İmza bölümünde belirtilmiştir."]], WP, { size: 20 }),
  ];

  const seneBasi = [
    ...tutanakBaslik("SENE BAŞI ZÜMRE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI", "1", "03.09.2026 / ………"),
    P("", { after: 60 }),
    not,
    H3("GÜNDEM"),
    ...NUMARA(gundem1, { size: 21 }),
    H3("GÜNDEM MADDELERİNİN GÖRÜŞÜLMESİ"),
    ...gorusme1.map((s) => P(s, { size: 21, align: AlignmentType.JUSTIFIED })),
    H3("ALINAN KARARLAR"),
    ...NUMARA(karar1, { size: 21 }),
    ...zumreImza("…… / 09 / 2026"),
  ];

  const basariTablosu = (baslik) => [
    P(`**${baslik}**`, { size: 20, before: 120, after: 60 }),
    T([
      ["Sınıf/Şube", "Öğrenci Sayısı", "1. Sınav Ort.", "2. Sınav Ort.", "Katılım Ort.", "Dönem Puanı Ort.", "50 Altı Öğrenci Sayısı"],
      ...SUBELER.map((s) => [s, "", "", "", "", "", ""]),
    ], [1300, 1300, 1300, 1300, 1300, 1500, 1638], { header: 1, size: 19, minH: 340 }),
  ];

  const ikinciDonem = [
    ...tutanakBaslik("2. DÖNEM BAŞI ZÜMRE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI", "2", "…… / 02 / 2027 / ………"),
    H3("GÜNDEM"),
    ...NUMARA([
      "Açılış ve yoklama.",
      "Sene başı zümre kararlarının uygulanma durumunun gözden geçirilmesi.",
      "1. dönemde öğretim programının uygulanma durumu; ulaşılamayan öğrenme çıktıları.",
      "1. dönem sınav ve ders etkinliklerine katılım sonuçlarının değerlendirilmesi.",
      "Gelişim raporu sürecinin değerlendirilmesi.",
      "2. dönem planlaması: yıllık planın gözden geçirilmesi, sınav tarihleri, performans görevi ve proje.",
      "BEP'li öğrencilerin ilerleme durumu.",
      "BT sınıfının durumu ve ihtiyaçlar.",
      "Dilek ve temenniler, kapanış.",
    ], { size: 21 }),
    H3("GÜNDEM MADDELERİNİN GÖRÜŞÜLMESİ"),
    ...[
      "**1.** Toplantı ……… saatinde başladı; yoklama yapıldı.",
      "**2.** Sene başı zümre kararları okundu; kararların ……………………………………… dışında uygulandığı görüldü.",
      "**3.** 1. dönemde yıllık plana uygun olarak 5. sınıflarda 1-4. temalar, 6. sınıflarda 1-5. temalar ve 6. temanın başlangıcı işlendi. Tatil ve etkinlikler nedeniyle eksik kalan konular: ……………………………………… Bu konular 2. dönemin ilk haftalarında tamamlanacaktır.",
      "**4.** 1. dönem sonuçları aşağıdaki tabloda değerlendirildi. En çok zorlanılan öğrenme çıktıları: ……………………………………… Bu çıktılar için destekleme etkinlikleri planlanacaktır.",
      "**5.** Gelişim raporu için öğretmen görüşlerinin gözlem kayıtlarına dayalı olarak hazırlandığı; sürecin ……………………………………… yönlerden iyileştirilebileceği görüşüldü.",
      "**6.** 2. dönemde 5. sınıflarda Yapay Zekâ ile Yazılım Tasarımı ve Programlama temaları, 6. sınıflarda Yazılım Tasarımı ve Programlama teması işlenecektir. Sınavların ……… ve ……… haftalarında uygulamalı olarak yapılması, blok tabanlı proje görevinin ……… tarihinde verilmesi görüşüldü.",
      "**7.** BEP'li öğrencilerin kısa dönemli amaçlara ulaşma durumu değerlendirildi: ………………………………………",
      "**8.** BT sınıfı ihtiyaçları: ………………………………………",
      "**9.** Dilek ve temennilerin ardından toplantı ……… saatinde sona erdi.",
    ].map((s) => P(s, { size: 21, align: AlignmentType.JUSTIFIED })),
    ...basariTablosu("1. Dönem Başarı Durumu"),
    H3("ALINAN KARARLAR"),
    ...NUMARA([
      "1. dönemde eksik kalan konular 2. dönemin ilk iki haftasında tamamlanacaktır.",
      "Başarı düzeyi düşük öğrenme çıktıları için destekleme etkinlikleri ve eşli çalışma uygulanacaktır.",
      "2. dönem sınavları okul sınav takvimine uygun olarak, uygulamalı şekilde yapılacak; konu-soru dağılım tabloları önceden duyurulacaktır.",
      "Blok tabanlı proje/performans görevleri dereceli puanlama anahtarıyla değerlendirilecektir.",
      "Okul temelli planlama etkinliği olarak haziran ayında proje sergisi/kodlama şenliği düzenlenecektir.",
    ], { size: 21 }),
    ...zumreImza("…… / 02 / 2027"),
  ];

  const seneSonu = [
    ...tutanakBaslik("SENE SONU ZÜMRE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI", "3", "…… / 06 / 2027 / ………"),
    H3("GÜNDEM"),
    ...NUMARA([
      "Açılış ve yoklama.",
      "Yıl içinde alınan zümre kararlarının uygulanma durumu.",
      "Yıllık planların uygulanmasının değerlendirilmesi.",
      "Öğrenci başarı durumunun değerlendirilmesi.",
      "Okul temelli planlama etkinliklerinin değerlendirilmesi.",
      "BT sınıfı envanteri ve gelecek yıl ihtiyaçları.",
      "2027-2028 eğitim-öğretim yılı için öneriler.",
      "Dilek ve temenniler, kapanış.",
    ], { size: 21 }),
    H3("GÜNDEM MADDELERİNİN GÖRÜŞÜLMESİ"),
    ...[
      "**1.** Toplantı ……… saatinde başladı; yoklama yapıldı.",
      "**2.** Yıl içinde alınan zümre kararlarının ……………………………………… dışında uygulandığı görüldü.",
      "**3.** Eğitim ve Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge gereği yıllık planlar değerlendirildi. Planlanan temaların ……………………………………… dışında tamamlandığı; plana ilişkin önerilerin ……………………………………… olduğu belirtildi.",
      "**4.** Yıl sonu başarı durumu aşağıdaki tabloda değerlendirildi.",
      "**5.** Okul temelli planlama kapsamında ……………………………………… etkinliği yapıldı; öğrenci ürünleri sergilendi.",
      "**6.** BT sınıfı envanteri gözden geçirildi; gelecek yıl ihtiyaçları: ………………………………………",
      "**7.** 2027-2028 için öneriler: ………………………………………",
      "**8.** Dilek ve temennilerin ardından toplantı ……… saatinde sona erdi.",
    ].map((s) => P(s, { size: 21, align: AlignmentType.JUSTIFIED })),
    ...basariTablosu("Yıl Sonu Başarı Durumu"),
    H3("ALINAN KARARLAR"),
    ...NUMARA([
      "Yıllık plan uygulamasına ilişkin öneriler 2027-2028 sene başı zümre toplantısında değerlendirilecektir.",
      "BT sınıfı ihtiyaç listesi okul idaresine sunulacaktır.",
      "Öğrenci ürünlerinden örnekler bir sonraki yıl için örnek ürün arşivinde saklanacaktır.",
    ], { size: 21 }),
    ...zumreImza("…… / 06 / 2027"),
  ];

  const sok = [
    ...resmiBaslik([`${A.yil} EĞİTİM-ÖĞRETİM YILI`, "ŞUBE ÖĞRETMENLER KURULU", "DERS ÖĞRETMENİ GÖRÜŞ FORMU"]),
    BILGI([["Ders", "Bilişim Teknolojileri ve Yazılım"], ["Sınıf / Şube", ""], ["Kurul Tarihi", ""], ["Ders Öğretmeni", A.ogretmen]], WP, { size: 20 }),
    P("", { after: 60 }),
    BILGI([
      ["Şubenin genel başarı durumu", ""],
      ["Derse katılım ve tutum", ""],
      ["Başarısı düşük / desteğe ihtiyaç duyan öğrenciler", ""],
      ["Üstün başarı gösteren / zenginleştirmeye ihtiyaç duyan öğrenciler", ""],
      ["Devamsızlık veya davranış nedeniyle dikkat çeken öğrenciler", ""],
      ["BEP'li öğrencilerin durumu", ""],
      ["Rehberlik servisine yönlendirilmesi önerilen öğrenciler", ""],
      ["Öneriler", ""],
    ], WP, { size: 20, minH: 900 }),
    IMZA([{ ad: A.ogretmen, rol: "Ders Öğretmeni" }], WP),
  ];

  return [
    BOLUM("P", seneBasi, UST),
    BOLUM("P", ikinciDonem, UST),
    BOLUM("P", seneSonu, UST),
    BOLUM("P", sok, UST),
  ];
}

// ───────────────────────── 04 ÖLÇME VE DEĞERLENDİRME ─────────────────────────
function konuSoru(sinif, plan, donem) {
  const [bas, son] = donem === 1 ? [1, 18] : [19, 37];
  const satirlar = [];
  plan.forEach((t) => {
    const kodlar = [];
    Object.entries(t.hafta).forEach(([no, h]) => { if (+no >= bas && +no <= son) h.c.forEach((k) => { if (!kodlar.includes(k)) kodlar.push(k); }); });
    if (!kodlar.length) return;
    kodlar.forEach((k, i) => satirlar.push([i === 0 ? { c: t.tema.replace(/ \(.*\)$/, ""), rowSpan: kodlar.length, bold: true, size: 18 } : null, ciktiMetni(k), "", ""].filter((x) => x !== null)));
  });
  return [
    P(`**${sinif}. Sınıf – ${donem}. Dönem Konu-Soru Dağılım Tablosu**`, { size: 21, before: 160, after: 60, keepNext: true }),
    T([["Tema", "Öğrenme Çıktısı", "1. Sınav Soru/Görev Sayısı", "2. Sınav Soru/Görev Sayısı"], ...satirlar, [{ c: "TOPLAM", span: 2, bold: true, align: AlignmentType.RIGHT }, "", ""]], [2200, 4838, 1300, 1300], { header: 1, size: 18 }),
  ];
}

function rubrik(baslik, olcutler, genislik) {
  const w0 = 2100;
  const w = Math.floor((genislik - w0 - 700) / 4);
  const widths = [w0, w, w, w, genislik - w0 - 700 - 3 * w, 700];
  return [
    P(`**${baslik}**`, { size: 21, before: 160, after: 60, keepNext: true }),
    T([["Ölçüt", "4 – Çok İyi", "3 – İyi", "2 – Geliştirilmeli", "1 – Başlangıç", "Puan"], ...olcutler.map((o) => [{ c: o[0], bold: true }, o[1], o[2], o[3], o[4], ""]), [{ c: "TOPLAM (en fazla " + olcutler.length * 4 + " puan) → 100'lük puan = Toplam × " + (100 / (olcutler.length * 4)).toString().replace(".", ","), span: 5, bold: true, align: AlignmentType.RIGHT }, ""]], widths, { header: 1, size: 17 }),
  ];
}

function olcme() {
  const esaslar = [
    H1("ÖLÇME VE DEĞERLENDİRME"),
    H2("1. Esaslar"),
    ...MADDE([
      "Ortaokulda başarı; sınavlar, ders etkinliklerine katılım ve varsa proje çalışmalarından alınan puanlarla değerlendirilir.",
      "Her dönem iki sınav yapılır. BTY dersi OYSS kapsamında olmadığından sınavlar okulda zümre tarafından hazırlanır; dersin uygulamalı niteliği nedeniyle uygulamalı sınav ya da yazılı ve uygulamalı sınav birlikte yapılabilir (zümre kararı).",
      "Haftalık ders saati 2 olduğundan her dönem 2 ders etkinliklerine katılım puanı verilir. Ölçütler ders yılı başında öğrencilere duyurulur.",
      "Öğretim programı süreç odaklı değerlendirmeyi esas alır: gözlem formu, kontrol listesi, dereceli puanlama anahtarı, öz ve akran değerlendirme, performans görevi ve ürün dosyası (e-portfolyo) birlikte kullanılır.",
      "Bir sınıfta aynı gün yapılacak sınav sayısı için okul sınav takvimi dikkate alınır; sınav sonuçları öğrencilere bildirilir ve mevzuattaki süre içinde e-Okul'a işlenir.",
      "Gelişim raporu için öğrencinin derse devamı, gelişim düzeyi ve sosyal-duygusal becerilerine ilişkin gözlemler dönem boyunca kaydedilir.",
    ], { size: 21 }),
    H2("2. Sınav Takvimi"),
    T([["Sınıf/Şube", "1. Dönem 1. Sınav", "1. Dönem 2. Sınav", "2. Dönem 1. Sınav", "2. Dönem 2. Sınav", "Sınav Türü"], ...SUBELER.map((s) => [s, "", "", "", "", "☐ Uygulamalı  ☐ Yazılı+Uyg."])], [1100, 1550, 1550, 1550, 1550, 2338], { header: 1, size: 19, minH: 380 }),
    H2("3. Konu-Soru Dağılım Tabloları", { yeniSayfa: true }),
    P("Tablolar yıllık plandaki dönem kapsamına göre oluşturulmuştur. Soru/görev sayılarını zümre kararıyla doldurunuz; sınav kapsamı o tarihe kadar işlenen öğrenme çıktılarıdır.", { size: 20 }),
    ...konuSoru(5, V.PLAN5, 1), ...konuSoru(5, V.PLAN5, 2), ...konuSoru(6, V.PLAN6, 1), ...konuSoru(6, V.PLAN6, 2),
  ];

  const kat = [
    H2("4. Ders Etkinliklerine Katılım Ölçeği", { yeniSayfa: true }),
    T([
      ["No", "Ölçüt", "Puan"],
      ["K1", "Derse hazırlıklı gelme, araç-gereci ve dijital hesabını hazır bulundurma", "10"],
      ["K2", "Derse etkin katılım: soru sorma, fikir paylaşma, tartışmalara katkı", "20"],
      ["K3", "Uygulama ve etkinlikleri yönergeye uygun olarak tamamlama", "25"],
      ["K4", "İş birliği: eşli/grup çalışmalarında sorumluluk alma ve akranlarına saygı", "15"],
      ["K5", "BT sınıfı kurallarına, bilişim etiği ve güvenlik ilkelerine uyma", "15"],
      ["K6", "Ürün dosyasını (e-portfolyo) düzenli tutma ve ürünlerini zamanında teslim etme", "15"],
      [{ c: "TOPLAM", span: 2, bold: true, align: AlignmentType.RIGHT }, { c: "100", bold: true }],
    ], [700, 7738, 1200], { header: 1, size: 20 }),
    P("**Sınıf/Şube:** ………   **Dönem:** ………   **Katılım puanı no:** ☐ 1   ☐ 2   **Tarih:** ……………", { size: 20, after: 60, pageBreakBefore: true }),
    T([["Sıra", "Okul No", "Adı Soyadı", "K1 (10)", "K2 (20)", "K3 (25)", "K4 (15)", "K5 (15)", "K6 (15)", "Toplam"], ...Array.from({ length: 30 }, (_, i) => [String(i + 1), "", "", "", "", "", "", "", "", ""])], [500, 800, 2700, 700, 700, 700, 700, 700, 700, 938], { header: 1, size: 17, minH: 300 }),
  ];

  const pg = [
    H2("5. Performans Görevi Yönergeleri", { yeniSayfa: true }),
    H3("Örnek 1 – 5. Sınıf: “Ağımızı Kuralım” Afişi"),
    BILGI([
      ["İlgili öğrenme çıktıları", ciktiMetni("5.3.1") + "; " + ciktiMetni("5.3.2")],
      ["Görevin amacı", "Bir okul/ev ağının kurulması için gerekli donanımları ve bağlantı yöntemlerini gösteren bilgilendirici bir afiş hazırlamak."],
      ["Süreç", "1) Ağ bileşenlerini araştır ve güvenilir kaynakları not et. 2) Afiş taslağını kâğıt üzerinde çiz. 3) Görsel düzenleme veya sunum programıyla afişi hazırla. 4) Kaynakları afişin altında belirt. 5) Afişi sınıfta sun."],
      ["Ürün ve teslim", "Dijital afiş (PNG/PDF) · Teslim tarihi: ……………"],
      ["Değerlendirme", "Dijital ürün dereceli puanlama anahtarı (bilimsel doğruluk, özgünlük, görsel uyum, kaynak gösterme, zamanında teslim)."],
    ], WP, { size: 20 }),
    H3("Örnek 2 – 6. Sınıf: “Sınıfımızın Verileri” Tablolama Raporu"),
    BILGI([
      ["İlgili öğrenme çıktıları", ciktiMetni("6.2.3") + "; " + ciktiMetni("6.2.4")],
      ["Görevin amacı", "Sınıf içinde yapılan bir anketin (ör. ekran süresi, kitap okuma alışkanlığı) verilerini toplamak, tablolama programında düzenlemek, analiz etmek ve grafikle sunmak."],
      ["Süreç", "1) Araştırma sorusunu belirle. 2) Anket sorularını hazırla (kişisel veri istemeden). 3) Verileri topla ve tabloya gir. 4) Toplam, ortalama, en büyük ve en küçük değerleri formüllerle hesapla. 5) Uygun grafiği oluştur ve yorumla."],
      ["Ürün ve teslim", "Tablolama dosyası ve bir sayfalık yorum · Teslim tarihi: ……………"],
      ["Değerlendirme", "Dijital ürün dereceli puanlama anahtarı ve kontrol listesi."],
    ], WP, { size: 20 }),
    H3("Örnek 3 – 6. Sınıf: Yapay Zekâ Destekli Blok Tabanlı Proje"),
    BILGI([
      ["İlgili öğrenme çıktıları", ciktiMetni("6.6.2") + "; " + ciktiMetni("6.6.3")],
      ["Görevin amacı", "Günlük hayattan bir probleme çözüm üreten, görüntü/ses/metin tanıma gibi bir yapay zekâ özelliği kullanan blok tabanlı bir uygulama geliştirmek."],
      ["Süreç", "1) Problemi ve kullanıcıyı tanımla. 2) Hikâye tahtası ve algoritma hazırla. 3) Örnek verileri hazırla (kişisel veri kullanmadan). 4) Uygulamayı kodla. 5) Test et, hataları ayıkla. 6) Ürünü sun ve geri bildirimle geliştir."],
      ["Ürün ve teslim", "Proje dosyası/bağlantısı ve kısa tanıtım · Teslim tarihi: ……………"],
      ["Değerlendirme", "Blok tabanlı proje kontrol listesi ve proje değerlendirme ölçeği."],
    ], WP, { size: 20 }),
  ];

  const anahtarlar = [
    H2("6. Dereceli Puanlama Anahtarları", { yeniSayfa: true }),
    ...rubrik("Dijital Ürün (afiş, belge, sunum, tablolama raporu, video) Dereceli Puanlama Anahtarı", [
      ["İçerik doğruluğu", "Bilgiler doğru, eksiksiz ve konuyla tam ilişkili.", "Bilgiler doğru, küçük eksikler var.", "Bazı bilgiler hatalı veya eksik.", "Bilgilerin çoğu hatalı veya konu dışı."],
      ["Teknik beceri", "Programın araçlarını amacına uygun ve etkili kullanmış.", "Araçları çoğunlukla doğru kullanmış.", "Temel araçları sınırlı kullanmış.", "Araçları kullanmada desteğe ihtiyaç duymuş."],
      ["Görsel tasarım / uyum", "Renk, yazı ve yerleşim dengeli, okunaklı.", "Tasarım genel olarak uyumlu.", "Tasarımda okunabilirliği bozan sorunlar var.", "Tasarım dağınık ve okunaksız."],
      ["Özgünlük ve etik", "Özgün; tüm kaynaklar ve lisanslar belirtilmiş.", "Büyük ölçüde özgün; kaynakların çoğu belirtilmiş.", "Kısmen kopya; kaynaklar eksik.", "Özgün değil; kaynak belirtilmemiş."],
      ["Sunum ve zamanında teslim", "Zamanında teslim, akıcı ve anlaşılır sunum.", "Zamanında teslim, sunum anlaşılır.", "Gecikmeli teslim veya sunum yetersiz.", "Teslim edilmedi / sunum yapılmadı."],
    ], WP),
    ...rubrik("Proje Değerlendirme Ölçeği (Proje görevi alan öğrenciler için)", [
      ["Planlama", "Problem, amaç ve takvim açık ve gerçekçi.", "Plan büyük ölçüde açık.", "Plan eksik.", "Plan yapılmamış."],
      ["Araştırma ve veri", "Çok sayıda güvenilir kaynak/veri kullanılmış.", "Yeterli kaynak kullanılmış.", "Kaynaklar sınırlı.", "Kaynak yok."],
      ["Ürün", "Ürün çalışıyor, amaca tam uygun ve özgün.", "Ürün çalışıyor, küçük eksikler var.", "Ürün kısmen çalışıyor.", "Ürün tamamlanmamış."],
      ["Test ve iyileştirme", "Sistemli test edilmiş, hatalar giderilmiş.", "Test edilmiş, hataların çoğu giderilmiş.", "Sınırlı test yapılmış.", "Test yapılmamış."],
      ["Sunum ve yansıtma", "Süreci ve öğrendiklerini açıkça anlatmış.", "Süreci anlatmış.", "Sunum yüzeysel.", "Sunum yapılmamış."],
    ], WP),
  ];

  const kontrol = [
    H2("7. Blok Tabanlı Proje Kontrol Listesi", { yeniSayfa: true }),
    P("**Öğrenci:** ……………………………   **Sınıf/Şube:** ………   **Proje adı:** ……………………………", { size: 20, after: 80 }),
    T([["No", "Ölçüt", "Evet", "Hayır"], ...[
      "Problemi ve projenin amacını açıkça tanımladı.",
      "Algoritmayı/akış şemasını kodlamadan önce hazırladı.",
      "Olay bloklarını doğru kullandı (ör. bayrağa tıklanınca).",
      "Sıralı yapıları doğru kurdu.",
      "Döngü yapısını amacına uygun kullandı.",
      "Karar (eğer) yapısını amacına uygun kullandı.",
      "Değişken oluşturdu ve değerini değiştirdi.",
      "Kullanıcıyla etkileşim (soru sorma, tuş, tıklama) sağladı.",
      "Programı test etti ve hataları ayıkladı.",
      "Karakter, sahne ve değişken adlarını anlamlı verdi.",
      "Kullandığı ses/görsel kaynaklarını belirtti, telif kurallarına uydu.",
      "Projesini sundu ve geri bildirimlere göre geliştirdi.",
    ].map((s, i) => [String(i + 1), s, "☐", "☐"])], [600, 7238, 900, 900], { header: 1, size: 20, minH: 360 }),
  ];

  const oz = [
    H2("8. Öz Değerlendirme Formu"),
    P("**Adı Soyadı:** ……………………………   **Sınıf/Şube:** ………   **Tema/Etkinlik:** ……………………………", { size: 20, after: 80 }),
    T([["İfade", "Her zaman", "Bazen", "Henüz değil"], ...[
      "Etkinliğin amacını anladım.",
      "Kullandığım programın araçlarını rahatça kullanabildim.",
      "Karşılaştığım hatayı kendi başıma çözmeyi denedim.",
      "Arkadaşlarımla iş birliği yaptım.",
      "Kaynak gösterdim ve telif kurallarına uydum.",
      "Kişisel bilgilerimi ve şifremi korudum.",
      "Ürünümü zamanında tamamladım.",
    ].map((s) => [s, "☐", "☐", "☐"])], [5638, 1300, 1300, 1400], { header: 1, size: 20, minH: 340 }),
    P("En çok zorlandığım nokta: ………………………………………………………………………………………", { size: 20, before: 100 }),
    P("Bir dahaki sefere farklı yapacağım şey: ………………………………………………………………………", { size: 20 }),
    H2("9. Akran Değerlendirme Formu"),
    P("**Değerlendiren:** ……………………   **Değerlendirilen:** ……………………   **Ürün:** ……………………", { size: 20, after: 80 }),
    T([["Ölçüt", "😊 Çok iyi", "🙂 İyi", "😐 Geliştirilmeli"], ...[
      "Ürün konuya uygun ve anlaşılır.",
      "Tasarımı dikkat çekici ve düzenli.",
      "Ürün özgün; kaynaklar belirtilmiş.",
      "Sunumu açık ve anlaşılırdı.",
      "Grup çalışmasında görevini yerine getirdi.",
    ].map((s) => [s, "☐", "☐", "☐"])], [5638, 1300, 1300, 1400], { header: 1, size: 20, minH: 340 }),
    P("Beğendiğim yön: ………………………………………   Önerim: ………………………………………", { size: 20, before: 100 }),
  ];

  const gozlem = [
    H2("10. Gözlem Formu (Gelişim Raporuna Destek)", { yeniSayfa: true }),
    P("Her öğrenci için dönem içinde en az iki gözlem notu alınması önerilir. Kodlar: 3 = gözlendi (belirgin), 2 = kısmen, 1 = henüz gözlenmedi.", { size: 19, after: 60 }),
    P("**Sınıf/Şube:** ………   **Dönem:** ………", { size: 20, after: 60 }),
    T([["Sıra", "Adı Soyadı", "Merak ve araştırma", "Sorumluluk", "İş birliği", "Öz düzenleme", "Dijital etik ve güvenlik", "Not / Tarih"], ...Array.from({ length: 30 }, (_, i) => [String(i + 1), "", "", "", "", "", "", ""])], [500, 2000, 1050, 1050, 1050, 1050, 1050, 1888], { header: 1, size: 17, minH: 300 }),
  ];

  return [BOLUM("P", [...esaslar, ...kat, ...pg, ...anahtarlar, ...kontrol, ...oz, ...gozlem], UST)];
}

// ───────────────────────── 05 DERS PLANLARI ─────────────────────────
function dersPlani() {
  const alanlar = [
    "Öğrenme çıktıları ve süreç bileşenleri", "Alan becerileri", "Kavramsal beceriler", "Eğilimler", "Sosyal-duygusal öğrenme becerileri", "Değerler", "Okuryazarlık becerileri",
    "Disiplinler arası ilişkiler", "Anahtar kavramlar", "Araç-gereç ve kaynaklar", "Ön değerlendirme süreci", "Köprü kurma", "Öğrenme-öğretme uygulamaları",
    "Farklılaştırma – Zenginleştirme", "Farklılaştırma – Destekleme", "Ölçme ve değerlendirme (öğrenme kanıtları)", "Öğretmen yansıtmaları",
  ];
  const sablon = [
    H1("DERS PLANI"),
    NOT_KUTUSU([
      "Eğitim ve Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge gereği ders planı hazırlanır. Planlar basılı tutulmak zorunda değildir.",
      "5. ve 6. sınıf BTY öğretmen kılavuz kitaplarındaki etkinlikleri bu şablona aktararak kullanabilirsiniz. Bölüm başlıkları Türkiye Yüzyılı Maarif Modeli öğretim programlarındaki yapıya göre düzenlenmiştir.",
    ], WP, "Not"),
    P("", { after: 80 }),
    BILGI([["Ders", "Bilişim Teknolojileri ve Yazılım"], ["Sınıf / Şube", ""], ["Tema", ""], ["Hafta / Tarih", ""], ["Süre", "2 ders saati (40 + 40 dk)"]], WP, { size: 20 }),
    P("", { after: 80 }),
    BILGI(alanlar.map((a) => [a, ""]), WP, { size: 20, minH: 460 }),
    IMZA([{ ad: A.ogretmen, rol: "Ders Öğretmeni" }, { ust: "UYGUNDUR", ad: A.mudur, rol: "Okul Müdürü" }], WP),
  ];

  const ornek1 = [
    H1("ÖRNEK DERS PLANI – 5. SINIF", { yeniSayfa: true }),
    BILGI([["Ders", "Bilişim Teknolojileri ve Yazılım"], ["Sınıf", "5"], ["Tema", "1. Tema: Bilişim Teknolojilerinin Hayatımızdaki Yeri"], ["Hafta / Tarih", "1-2. hafta (14-25 Eylül 2026)"], ["Süre", "2 + 2 ders saati"]], WP, { size: 20 }),
    P("", { after: 80 }),
    BILGI([
      ["Öğrenme çıktıları ve süreç bileşenleri", [ciktiMetni("5.1.1"), ...V.CIKTI["5.1.1"].s]],
      ["Alan becerileri", "Bilişim teknolojilerini tanıma ve kullanma; bilgi işlemsel düşünme"],
      ["Kavramsal beceriler", "Sınıflandırma, karşılaştırma, ilişkilendirme"],
      ["Eğilimler", "Merak, sorumluluk"],
      ["Sosyal-duygusal öğrenme becerileri", "İletişim, iş birliği"],
      ["Değerler", "Saygı, sorumluluk"],
      ["Okuryazarlık becerileri", "Dijital okuryazarlık, bilgi okuryazarlığı"],
      ["Disiplinler arası ilişkiler", "Sosyal bilgiler (teknolojinin tarihsel gelişimi), fen bilimleri (teknolojik araçlar)"],
      ["Anahtar kavramlar", "veri, bilgi, bilişim, teknoloji, bilişim teknolojileri"],
      ["Araç-gereç ve kaynaklar", "Etkileşimli tahta, BT sınıfı bilgisayarları, kartlar (eski–yeni teknoloji görselleri), öğretmen kılavuz kitabı, EBA"],
      ["Ön değerlendirme süreci", "“Bugün kaç farklı teknolojik araç kullandınız?” sorusuyla öğrencilerin günlük deneyimleri alınır; kavramlara ilişkin ön bilgiler hızlı bir kelime bulutu etkinliğiyle yoklanır."],
      ["Köprü kurma", "Öğrencilerin ailelerinin çocukluğunda kullandıkları teknolojiler (radyo, telefon, ansiklopedi) ile bugünkü karşılıkları (akıllı telefon, internet) karşılaştırılır."],
      ["Öğrenme-öğretme uygulamaları", [
        "1. ders: Dersin ve BT sınıfı kurallarının tanıtımı; kurallar öğrencilerle birlikte okunur. Veri–bilgi–bilişim–teknoloji kavramları günlük örneklerle tartışılır; öğrenciler Frayer modeli ile bir kavramı tanımlar.",
        "2. ders: Gruplara “geçmiş–bugün” görsel kartları verilir; gruplar kartları eşleştirip benzerlik ve farklılıkları tabloya yazar.",
        "3-4. ders: Gruplar bilişim teknolojilerini kullanım alanlarına (eğitim, sağlık, iletişim, ulaşım, eğlence) göre sınıflandırır, sınıflandırmalarını kavram haritası olarak dijital ortamda hazırlayıp sunar.",
      ]],
      ["Farklılaştırma – Zenginleştirme", "Öğrenciler gelecekte ortaya çıkabilecek bir bilişim teknolojisini tasarlayıp hangi kullanım alanına girdiğini gerekçelendirir."],
      ["Farklılaştırma – Destekleme", "Kavramlar görsel kartlarla somutlaştırılır; sınıflandırma için hazır kategori tablosu verilir; eşli çalışma yapılır."],
      ["Ölçme ve değerlendirme (öğrenme kanıtları)", "Frayer modeli çalışması, grup sınıflandırma tablosu (kontrol listesi), gözlem formu, çıkış kartı: “Bugün öğrendiğim bir kavram ve bir örnek”."],
      ["Öğretmen yansıtmaları", "…………………………………………………………………………………"],
    ], WP, { size: 19 }),
  ];

  const ornek2 = [
    H1("ÖRNEK DERS PLANI – 6. SINIF", { yeniSayfa: true }),
    BILGI([["Ders", "Bilişim Teknolojileri ve Yazılım"], ["Sınıf", "6"], ["Tema", "6. Tema: Yazılım Tasarımı ve Programlama"], ["Hafta / Tarih", "31-34. hafta (10 Mayıs-4 Haziran 2027)"], ["Süre", "4 hafta × 2 ders saati"]], WP, { size: 20 }),
    P("", { after: 80 }),
    BILGI([
      ["Öğrenme çıktıları ve süreç bileşenleri", [ciktiMetni("6.6.3")]],
      ["Alan becerileri", "Bilgi işlemsel düşünme, problem çözme, yazılım geliştirme"],
      ["Kavramsal beceriler", "Tasarlama, test etme, değerlendirme"],
      ["Eğilimler", "Merak, azim, yaratıcılık"],
      ["Sosyal-duygusal öğrenme becerileri", "İş birliği, öz düzenleme"],
      ["Değerler", "Sorumluluk, dürüstlük (özgün çalışma ve kaynak gösterme)"],
      ["Okuryazarlık becerileri", "Dijital okuryazarlık, veri okuryazarlığı"],
      ["Disiplinler arası ilişkiler", "Fen bilimleri (sınıflandırma), Türkçe (hikâye tahtası ve sunum), görsel sanatlar (karakter tasarımı)"],
      ["Anahtar kavramlar", "yapay zekâ, model, veri, eğitim verisi, etiket, sınıflandırma, uzantı"],
      ["Araç-gereç ve kaynaklar", "Blok tabanlı programlama ortamı ve yapay zekâ uzantısı (okulda erişilebilen bir araç), web kamerası/mikrofon, hikâye tahtası çalışma kâğıdı"],
      ["Ön değerlendirme süreci", "5. temada öğrenilen “veri–model–çıktı” ilişkisi kısa bir soru-cevapla hatırlatılır; öğrencilere bir görüntü tanıma uygulamasının nasıl “öğrendiği” sorulur."],
      ["Köprü kurma", "Telefonlardaki yüz tanıma ve sesli asistan örneklerinden yola çıkılarak blok tabanlı ortamda benzer bir özelliğin nasıl kullanılabileceği tartışılır."],
      ["Öğrenme-öğretme uygulamaları", [
        "31. hafta: Gruplar günlük hayattan bir problem seçer (ör. geri dönüşüm atıklarını ayıran oyun, el hareketiyle kontrol edilen sınıf zamanlayıcısı). Hikâye tahtası ve algoritma hazırlanır.",
        "32. hafta: Örnek veriler (kişisel veri içermeyen nesne görüntüleri/sesler) toplanır, etiketlenir ve model eğitilir; modelin doğruluğu farklı örneklerle denenir.",
        "33. hafta: Model blok tabanlı projeye bağlanır; olay, karar ve döngü yapılarıyla uygulama kodlanır.",
        "34. hafta: Uygulama test edilir, hatalar ayıklanır; gruplar ürünlerini sunar, akran geri bildirimiyle geliştirir.",
      ]],
      ["Farklılaştırma – Zenginleştirme", "Modelin hatalı tahmin ettiği durumları analiz edip veri setini çeşitlendirerek doğruluğu artırma; birden fazla sınıflı model kurma."],
      ["Farklılaştırma – Destekleme", "Başlangıç projesi (iskelet kod) verilir; adım adım yönerge kartları ve eşli programlama kullanılır."],
      ["Ölçme ve değerlendirme (öğrenme kanıtları)", "Blok tabanlı proje kontrol listesi, proje değerlendirme ölçeği, akran değerlendirme formu, ürün dosyası (e-portfolyo)."],
      ["Öğretmen yansıtmaları", "…………………………………………………………………………………"],
    ], WP, { size: 19 }),
    NOT_KUTUSU(["Yapay zekâ araçları seçilirken yaş sınırları, kullanım koşulları ve kişisel verilerin korunması dikkate alınmalı; öğrenci yüzü/sesi gibi kişisel veriler yerine nesne görüntüleri kullanılmalıdır."], WP, "Güvenlik notu"),
  ];

  return [BOLUM("P", [...sablon, ...ornek1, ...ornek2], UST)];
}

// ───────────────────────── 06 BT SINIFI ─────────────────────────
function btSinifi() {
  const kurallar = [
    H1("BİLİŞİM TEKNOLOJİLERİ SINIFI KULLANIM KURALLARI"),
    P("", { after: 120 }),
    ...NUMARA([
      "BT sınıfına öğretmenle birlikte girer, bana ayrılan bilgisayarı kullanırım.",
      "Sınıfa yiyecek ve içecek getirmem.",
      "Bilgisayarı öğretmenimin izniyle açar, ders sonunda doğru şekilde kapatırım.",
      "Kablolara, prizlere ve bilgisayarın iç donanımına dokunmam; bir sorun görürsem öğretmenime haber veririm.",
      "Öğretmenimin izni olmadan program yüklemez, ayarları değiştirmem.",
      "USB bellek ve benzeri cihazları öğretmenimin izniyle kullanırım.",
      "Şifremi kimseyle paylaşmam, başkasının hesabını kullanmam.",
      "İnternette kişisel bilgilerimi (adres, telefon, fotoğraf) paylaşmam.",
      "Yalnızca derse uygun sitelere girer, gördüğüm uygunsuz içeriği öğretmenime bildiririm.",
      "Başkalarının çalışmalarını izinsiz kopyalamaz, kullandığım kaynakları belirtirim.",
      "Yapay zekâ araçlarını öğretmenimin gözetiminde, kişisel bilgi girmeden kullanırım.",
      "Çalışmalarımı kendi klasörüme kaydeder, başkalarının dosyalarını silmem.",
      "Ekrana uygun mesafede ve dik oturur, gözlerimi düzenli olarak dinlendiririm.",
      "Ders bitiminde masamı, klavyemi ve faremi düzenli bırakırım.",
    ], { size: 28, after: 140 }),
  ];

  const oturma = [
    H1("BİLGİSAYAR – ÖĞRENCİ OTURMA PLANI", { yeniSayfa: true }),
    P("**Sınıf/Şube:** ………   **Ders günü/saati:** ……………", { size: 20, after: 80 }),
    T([["Bilgisayar No", "Öğrenci Adı Soyadı (1)", "Öğrenci Adı Soyadı (2)", "Açıklama"], ...Array.from({ length: 22 }, (_, i) => [String(i + 1), "", "", ""])], [1300, 3300, 3300, 1738], { header: 1, size: 19, minH: 380 }),
  ];

  const demirbas = [
    H1("BT SINIFI DONANIM VE DEMİRBAŞ LİSTESİ", { yeniSayfa: true }),
    FORM(["Sıra", "Donanım / Demirbaş", "Marka-Model", "Demirbaş / Seri No", "Adet", "Durumu", "Açıklama"], [550, 2200, 1600, 1700, 700, 1200, 1688], 24, { size: 18, minH: 360 }),
  ];

  const ariza = [
    H1("ARIZA – BAKIM TAKİP FORMU", { yeniSayfa: true }),
    FORM(["Sıra", "Tarih", "Cihaz / Bilgisayar No", "Arızanın Tanımı", "Bildirilen Kişi", "Giderilme Tarihi", "Yapılan İşlem"], [550, 1100, 1300, 2300, 1400, 1200, 1788], 18, { size: 18, minH: 520 }),
  ];

  const isg = [
    H1("BT SINIFI İŞ SAĞLIĞI VE GÜVENLİĞİ KONTROL LİSTESİ", { yeniSayfa: true }),
    T([["No", "Kontrol Maddesi", "1. Dönem E/H", "2. Dönem E/H", "Açıklama"], ...[
      "Prizler, uzatma kabloları ve fişler sağlam; açıkta kablo yok.",
      "Kablolar geçiş yollarında takılmayı önleyecek şekilde toplanmış.",
      "Elektrik panosu kapalı ve kilitli; kaçak akım rölesi mevcut.",
      "Yangın söndürücü erişilebilir ve kontrol tarihi geçerli.",
      "Acil çıkış ve tahliye planı görünür yerde asılı.",
      "Sınıf yeterince havalandırılıyor; aşırı ısınma yok.",
      "Aydınlatma yeterli; ekranlarda yansıma/parlama yok.",
      "Masa ve sandalyeler sağlam, öğrenci boyuna uygun.",
      "Ekranlar göz hizasında ve uygun mesafede.",
      "Etkileşimli tahta/projeksiyon sabitlemesi güvenli.",
      "İlk yardım dolabı veya en yakın ilk yardım noktası belirli.",
      "Bilgisayarlarda güncel güvenlik yazılımı ve içerik filtresi etkin.",
      "Sınıf kuralları ve acil durum telefonları asılı.",
      "Sınıf ders dışında kilitli tutuluyor.",
    ].map((s, i) => [String(i + 1), s, "", "", ""])], [500, 5300, 1100, 1100, 1638], { header: 1, size: 19, minH: 380 }),
    P("Tespit edilen uygunsuzluklar okul idaresine ve okul iş sağlığı ve güvenliği ekibine yazılı olarak bildirilir.", { size: 19, italics: true, before: 100 }),
  ];

  const kullanim = [
    H1("BT SINIFI DERS DIŞI KULLANIM ÇİZELGESİ", { yeniSayfa: true }),
    FORM(["Sıra", "Tarih", "Saat", "Kullanan Öğretmen / Birim", "Kullanım Amacı", "İmza"], [550, 1200, 1100, 2600, 2788, 1400], 20, { size: 19, minH: 420 }),
  ];

  const veliOnay = [
    H1("BT DERSİ VELİ BİLGİLENDİRME VE ONAY FORMU", { yeniSayfa: true }),
    P("Sayın Velimiz,", { size: 21, after: 80 }),
    P("Bilişim Teknolojileri ve Yazılım dersinde öğrencilerimiz okulun BT sınıfında, öğretmen gözetiminde internet, çevrim içi öğrenme platformları, blok tabanlı programlama ortamları ve yaşına uygun yapay zekâ araçlarıyla çalışmaktadır. Öğrencilerimizden kişisel bilgi paylaşmamaları, şifrelerini korumaları ve BT sınıfı kurallarına uymaları beklenmektedir. Derste üretilen dijital ürünler öğrencinin ürün dosyasında (e-portfolyo) saklanır.", { size: 21, align: AlignmentType.JUSTIFIED }),
    P("BT sınıfı kullanım kurallarını öğrencimle birlikte okudum.   ☐ Evet", { size: 21, before: 120 }),
    P("Öğrencimin derste ürettiği dijital ürünlerin okul içi panolarda ve okulun resmî internet sitesinde adıyla paylaşılmasına:   ☐ İzin veriyorum   ☐ İzin vermiyorum", { size: 21 }),
    P("Öğrencimin fotoğraf/video görüntülerinin okul etkinliklerinin tanıtımında kullanılmasına:   ☐ İzin veriyorum   ☐ İzin vermiyorum", { size: 21 }),
    NOT_KUTUSU(["Bu form örnektir. Kişisel verilerin işlenmesi ve paylaşımı için okulunuzun 6698 sayılı Kanun kapsamındaki aydınlatma metni ve açık rıza formunu kullanınız."], WP),
    P("", { after: 120 }),
    BILGI([["Öğrencinin Adı Soyadı / Sınıfı", ""], ["Velinin Adı Soyadı", ""], ["Tarih", ""], ["İmza", ""]], WP, { size: 21, minH: 480 }),
  ];

  const btRehber = [
    H1("BT REHBER ÖĞRETMENLİĞİ / OKUL BİLİŞİM SORUMLULUĞU FAALİYET KAYDI", { yeniSayfa: true }),
    P("Bu görev okul idaresince verildiyse kullanınız (ör. etkileşimli tahta ve BT donanımı takibi, okul internet sitesi, öğretmenlere teknik destek, EBA ve dijital içerik desteği).", { size: 19, italics: true, after: 80 }),
    FORM(["Ay", "Yapılan Çalışma", "Destek Verilen Kişi / Birim", "Açıklama"], [1300, 4300, 2200, 1838], 12, { sira: false, size: 19, minH: 560 }),
  ];

  return [BOLUM("P", [...kurallar, ...oturma, ...demirbas, ...ariza, ...isg, ...kullanim, ...veliOnay, ...btRehber], UST)];
}

// ───────────────────────── 07 BEP ─────────────────────────
function bep() {
  const kaba = (sinif) => {
    const kodlar = Object.keys(V.CIKTI).filter((k) => k.startsWith(`${sinif}.`));
    return [
      H2(`Kaba Değerlendirme Formu – ${sinif}. Sınıf`, { yeniSayfa: true }),
      P("**Öğrenci:** ……………………………   **Sınıf/Şube:** ………   **Değerlendirme tarihi:** ……………", { size: 20, after: 80 }),
      T([["Öğrenme Çıktısı", "Bağımsız yapar", "Yardımla yapar", "Yapamaz", "Açıklama"], ...kodlar.map((k) => [ciktiMetni(k), "☐", "☐", "☐", ""])], [5000, 950, 950, 950, 1788], { header: 1, size: 18, minH: 340 }),
    ];
  };
  const icerik = [
    H1("BİREYSELLEŞTİRİLMİŞ EĞİTİM PROGRAMI (BEP) FORMLARI"),
    NOT_KUTUSU([
      "BEP, Özel Eğitim Hizmetleri Yönetmeliği uyarınca okulun BEP geliştirme birimince hazırlanır. Ders öğretmeni, kaba değerlendirme sonuçlarına göre dersine ilişkin uzun ve kısa dönemli amaçları belirler, uygular ve değerlendirir.",
      "Özel eğitim ihtiyacı olan öğrenciler için ayrıca yıllık plan hazırlanmaz; BEP uygulanır. Formlar okulunuzun BEP birimi formatına göre uyarlanabilir.",
    ], WP),
    H2("Öğrenci Bilgileri"),
    BILGI([["Adı Soyadı", ""], ["Sınıfı / Şubesi", ""], ["Tanı / Eğitsel değerlendirme bilgisi", ""], ["Destek eğitim odası / özel eğitim hizmeti", ""], ["BEP geliştirme birimi toplantı tarihi", ""], ["Ders öğretmeni", A.ogretmen]], WP, { size: 20, minH: 420 }),
    H2("Derste Yapılacak Uyarlamalar"),
    ...MADDE([
      "Ortam: Öğrencinin öğretmene yakın, dikkat dağıtıcı uyaranlardan uzak bir bilgisayarda oturtulması; eşli çalışmada destekleyici bir akranla eşleştirilmesi.",
      "Materyal: Büyük puntolu ve görselli yönerge kartları; adım adım resimli işlem listeleri; gerektiğinde ekran büyüteci, yüksek karşıtlık ve klavye/fare erişilebilirlik ayarları.",
      "Yöntem: Görevlerin küçük adımlara bölünmesi, model olma, ipucu verme ve ipuçlarının giderek azaltılması; sık geri bildirim.",
      "Süre: Uygulama ve sınavlarda ek süre verilmesi.",
      "Değerlendirme: Sınavların BEP amaçlarına göre hazırlanması; ürün ve gözleme dayalı değerlendirmeye ağırlık verilmesi.",
    ], { size: 20 }),
    ...kaba(5),
    ...kaba(6),
    H2("BEP Ders Planı (Uzun ve Kısa Dönemli Amaçlar)", { yeniSayfa: true }),
    P("**Öğrenci:** ……………………………   **Sınıf/Şube:** ………   **Dönem:** ………", { size: 20, after: 80 }),
    T([
      ["Uzun Dönemli Amaç (UDA)", "Kısa Dönemli Amaçlar (KDA)", "Başlama–Bitiş", "Yöntem-Teknik / Materyal", "Değerlendirme", "Sonuç (+ / –)"],
      ["Örnek: Bilgisayar sistemlerinin temel bileşenlerini ayırt eder. (BTY.5.1.5)", "1. Gösterilen girdi birimlerini adlandırır.\n2. Gösterilen çıktı birimlerini adlandırır.\n3. Kendisine verilen bir birimin girdi mi çıktı mı olduğunu söyler.", "…/10 – …/10", "Doğrudan öğretim, model olma; gerçek donanım ve resimli kartlar", "Gözlem, kontrol listesi", ""],
      ...Array.from({ length: 5 }, () => ["", "", "", "", "", ""]),
    ].map((r) => r.map((c) => (typeof c === "string" && c.includes("\n") ? c.split("\n") : c))), [2000, 2600, 1100, 1600, 1300, 1038], { header: 1, size: 18, minH: 900 }),
    H2("BEP Dönem Sonu Değerlendirme Formu", { yeniSayfa: true }),
    BILGI([
      ["Öğrenci / Sınıf", ""],
      ["Dönem", "☐ 1. Dönem   ☐ 2. Dönem"],
      ["Gerçekleşen kısa dönemli amaçlar", ""],
      ["Gerçekleşmeyen amaçlar ve nedenleri", ""],
      ["Etkili olan uyarlamalar", ""],
      ["Bir sonraki dönem için öneriler", ""],
      ["Veliyle yapılan paylaşım (tarih)", ""],
    ], WP, { size: 20, minH: 1100 }),
    IMZA([{ ad: A.ogretmen, rol: "Ders Öğretmeni" }, { ad: "……………………………", rol: "BEP Birimi Başkanı" }], WP),
  ];
  return [BOLUM("P", icerik, UST)];
}

// ───────────────────────── 08 KULÜP / SOSYAL ETKİNLİK ─────────────────────────
function kulup() {
  const plan = [
    ["Eylül", "Kulübün tanıtımı, öğrenci kayıtları; genel kurul ve yönetim kurulu seçimi; yıllık çalışma planının hazırlanması", "Toplum hizmeti çalışmasının belirlenmesi"],
    ["Ekim", "Avrupa Kod Haftası kapsamında bilgisayarsız kodlama etkinlikleri; 29 Ekim için dijital pano", ""],
    ["Kasım", "Atatürk Haftası dijital sergi/sunum; Öğretmenler Günü için dijital kart tasarımı", ""],
    ["Aralık", "“Güvenli İnternet” afiş çalışması; İnsan Hakları ve Demokrasi Haftası (dijital haklar) sunumu", "Toplum hizmeti çalışmasının uygulanması"],
    ["Ocak", "1. dönem çalışmalarının değerlendirilmesi; Enerji Tasarrufu Haftası (bilgisayarlarda enerji tasarrufu) bilgilendirmesi", ""],
    ["Şubat", "Güvenli İnternet Günü (9 Şubat) okul içi sunum; 2. dönem planlaması", ""],
    ["Mart", "Bilim ve Teknoloji Haftası: mini robotik/kodlama atölyesi; yarışmalara hazırlık", "Toplum hizmeti çalışmasının uygulanması"],
    ["Nisan", "23 Nisan için çocukların tasarladığı dijital oyunlar sergisi", ""],
    ["Mayıs", "Engelliler Haftası: erişilebilir teknoloji farkındalığı; Dünya Telekomünikasyon ve Bilgi Toplumu Günü", ""],
    ["Haziran", "Yıl sonu proje sergisi; kulüp yıl sonu faaliyet raporu", "Toplum hizmeti raporu"],
  ];
  const icerik = [
    H1("ÖĞRENCİ KULÜBÜ / SOSYAL ETKİNLİK EVRAKI"),
    NOT_KUTUSU([
      "Bu bölüm, okul sosyal etkinlik kurulunca kulüp danışmanlığı verilmesi hâlinde kullanılır. Kulüp adını okulunuzda kurulan kulübe göre yazınız; kayıtlar okul idaresinin yönlendirmesiyle e-Okul'daki ilgili modüle de işlenir.",
    ], WP),
    H2("Kulüp Bilgileri"),
    BILGI([["Kulübün adı", "………………………………… Kulübü"], ["Danışman öğretmen", A.ogretmen], ["Üye öğrenci sayısı", ""], ["Toplantı günü / saati / yeri", ""], ["Kulüp başkanı / yönetim kurulu", ""]], WP, { size: 20, minH: 420 }),
    H2("Yıllık Çalışma Planı"),
    T([["Ay", "Yapılacak Çalışmalar", "Toplum Hizmeti", "Gerçekleşme / Açıklama"], ...plan.map((r) => [...r, ""])], [1000, 4900, 2000, 1738], { header: 1, size: 19 }),
    IMZA([{ ad: A.ogretmen, rol: "Danışman Öğretmen" }, { ust: "UYGUNDUR", ad: A.mudur, rol: "Okul Müdürü" }], WP),
    H2("Kulüp Toplantı Tutanağı", { yeniSayfa: true }),
    BILGI([["Toplantı no / tarih / saat", ""], ["Toplantı yeri", ""], ["Katılan öğrenci sayısı", ""], ["Gündem", ""], ["Görüşmeler", ""], ["Kararlar", ""]], WP, { size: 20, minH: 1000 }),
    IMZA([{ ad: "……………………", rol: "Kulüp Başkanı" }, { ad: "……………………", rol: "Yazman" }, { ad: A.ogretmen, rol: "Danışman Öğretmen" }], WP),
    H2("Toplum Hizmeti Uygulama Planı", { yeniSayfa: true }),
    BILGI([
      ["Çalışmanın adı", "Örnek: “Büyüklerimize Dijital Güvenlik Rehberliği”"],
      ["Amacı", "Öğrencilerin, ailelerine ve mahalledeki büyüklerine güçlü parola, dolandırıcılık mesajlarını tanıma ve e-Devlet'in güvenli kullanımı konusunda broşür ve kısa sunumlarla destek olması."],
      ["Hedef kitle / yer", ""],
      ["Uygulama tarihleri", ""],
      ["Görev alan öğrenciler", ""],
      ["İş birliği yapılan kurum/kişiler", ""],
      ["Beklenen sonuç", ""],
    ], WP, { size: 20, minH: 600 }),
    H2("Yıl Sonu Faaliyet Raporu", { yeniSayfa: true }),
    BILGI([
      ["Gerçekleştirilen etkinlikler", ""],
      ["Toplum hizmeti çalışmaları ve katılan öğrenci sayısı", ""],
      ["Katılım belgesi verilen öğrenciler", ""],
      ["Karşılaşılan güçlükler", ""],
      ["Gelecek yıl için öneriler", ""],
    ], WP, { size: 20, minH: 1500 }),
    IMZA([{ ad: A.ogretmen, rol: "Danışman Öğretmen" }, { ust: "UYGUNDUR", ad: A.mudur, rol: "Okul Müdürü" }], WP),
  ];
  return [BOLUM("P", icerik, UST)];
}

// ───────────────────────── 09 VELİ VE ÖĞRENCİ İLETİŞİMİ ─────────────────────────
function iletisim() {
  const mektup = [
    H1("VELİ BİLGİLENDİRME MEKTUBU"),
    P("Sayın Velimiz,", { size: 22, after: 100 }),
    ...[
      `${A.yil} eğitim-öğretim yılında çocuğunuzun Bilişim Teknolojileri ve Yazılım öğretmeni olarak sizinle tanışmaktan mutluluk duyuyorum. Dersimiz haftada 2 saat, okulumuzun BT sınıfında uygulamalı olarak işlenmektedir.`,
      "Bu yıl öğrencilerimiz; bilişim teknolojilerinin hayatımızdaki yeri, dijital ürün tasarımı (görsel, belge, sunum, tablolama, ses ve video), bilgisayar ağları ve internet, bilişim etiği ve siber güvenlik, yapay zekâ ile blok tabanlı programlama konularında çalışacaktır.",
      "Değerlendirme; her dönem yapılan iki sınav, iki ders etkinliklerine katılım puanı ve varsa proje çalışmasıyla yapılır. Öğrencilerimizin derse katılımı, iş birliği ve ürettikleri dijital ürünler süreç içinde izlenir.",
    ].map((s) => P(s, { size: 22, align: AlignmentType.JUSTIFIED })),
    P("**Evde destek için önerilerimiz:**", { size: 22, before: 80 }),
    ...MADDE([
      "Ekran süresini yaşa uygun şekilde birlikte planlayınız; bilgisayar ve tableti ortak alanda kullandırınız.",
      "Çocuğunuzla şifre güvenliği, kişisel bilgilerin paylaşılmaması ve tanımadığı kişilerle iletişim kurmama konularını konuşunuz.",
      "Karşılaştığı rahatsız edici içerik veya mesajları size ya da öğretmenine söyleyebileceğini hissettiriniz.",
      "Yapay zekâ araçlarının yaş sınırlarına ve kullanım koşullarına dikkat ediniz; ödevlerin özgün olması gerektiğini hatırlatınız.",
      "Çocuğunuzun ürettiği dijital ürünlerle ilgilenip onu cesaretlendiriniz.",
    ], { size: 22 }),
    P("Görüşme taleplerinizi okulumuzun internet sayfasındaki **Okul Randevu Sistemi** üzerinden veya okul idaresi aracılığıyla iletebilirsiniz.", { size: 22, before: 80 }),
    P("Saygılarımla,", { size: 22, before: 160, align: AlignmentType.RIGHT, after: 0 }),
    P(A.ogretmen, { size: 22, align: AlignmentType.RIGHT, after: 0 }),
    P("Bilişim Teknolojileri Öğretmeni", { size: 22, align: AlignmentType.RIGHT }),
  ];
  const veliForm = [
    H1("VELİ GÖRÜŞME FORMU", { yeniSayfa: true }),
    BILGI([
      ["Görüşme tarihi / saati", ""], ["Görüşme şekli", "☐ Yüz yüze   ☐ Telefon   ☐ Çevrim içi   ☐ Okul Randevu Sistemi"], ["Öğrencinin adı soyadı / sınıfı", ""], ["Görüşülen veli / yakınlığı", ""],
      ["Görüşmeyi talep eden", "☐ Öğretmen   ☐ Veli   ☐ İdare"], ["Görüşmenin konusu", ""], ["Görüşülenler", ""], ["Alınan kararlar / öneriler", ""], ["Takip tarihi", ""],
    ], WP, { size: 20, minH: 520 }),
    IMZA([{ ad: "……………………", rol: "Veli" }, { ad: A.ogretmen, rol: "Ders Öğretmeni" }], WP),
  ];
  const ogrForm = [
    H1("ÖĞRENCİ GÖRÜŞME FORMU", { yeniSayfa: true }),
    BILGI([
      ["Görüşme tarihi", ""], ["Öğrencinin adı soyadı / sınıfı", ""], ["Görüşmenin nedeni", "☐ Ders başarısı   ☐ Derse katılım   ☐ Davranış   ☐ Dijital güvenlik   ☐ Diğer: ……"],
      ["Öğrencinin görüşleri", ""], ["Öğretmenin gözlem ve önerileri", ""], ["Birlikte alınan kararlar", ""], ["Rehberlik servisine yönlendirme", "☐ Gerek yok   ☐ Yönlendirildi (tarih: ……)"],
    ], WP, { size: 20, minH: 700 }),
    IMZA([{ ad: "……………………", rol: "Öğrenci" }, { ad: A.ogretmen, rol: "Ders Öğretmeni" }], WP),
  ];
  const takip = [
    H1("VELİ VE ÖĞRENCİ GÖRÜŞMELERİ TAKİP ÇİZELGESİ", { yeniSayfa: true }),
    FORM(["Sıra", "Tarih", "Öğrenci / Sınıf", "Görüşülen", "Konu", "Sonuç / Takip"], [550, 1100, 2000, 1600, 2300, 2088], 22, { size: 19, minH: 440 }),
  ];
  return [BOLUM("P", [...mektup, ...veliForm, ...ogrForm, ...takip], UST)];
}

// ───────────────────────── ÇIKTI ─────────────────────────
const PARCALAR = [
  ["00_Kapak_Genel_Bilgiler_ve_Mevzuat", "Kapak, Genel Bilgiler ve Mevzuat", kapak],
  ["01_Yillik_Plan_5_Sinif", "5. Sınıf Yıllık Planı", () => yillikPlan(5, V.PLAN5)],
  ["02_Yillik_Plan_6_Sinif", "6. Sınıf Yıllık Planı", () => yillikPlan(6, V.PLAN6)],
  ["03_Zumre_Toplanti_Tutanaklari", "Zümre Toplantı Tutanakları", zumre],
  ["04_Olcme_ve_Degerlendirme", "Ölçme ve Değerlendirme", olcme],
  ["05_Ders_Plani_Sablon_ve_Ornekler", "Ders Planları", dersPlani],
  ["06_BT_Sinifi_Evraklari", "BT Sınıfı Evrakları", btSinifi],
  ["07_BEP_Ozel_Egitim_Formlari", "BEP Formları", bep],
  ["08_Kulup_ve_Sosyal_Etkinlik", "Kulüp ve Sosyal Etkinlik", kulup],
  ["09_Veli_ve_Ogrenci_Iletisim", "Veli ve Öğrenci İletişimi", iletisim],
];

const belge = (baslik, sections) => new Document({ creator: A.ogretmen, title: `${A.yil} BTY Öğretmen Dosyası – ${baslik}`, styles: STYLES, numbering: NUMBERING, sections });

(async () => {
  const hepsi = [];
  for (const [dosya, baslik, fn] of PARCALAR) {
    const secs = fn();
    hepsi.push(...fn());
    fs.writeFileSync(path.join(OUT, `${dosya}.docx`), await Packer.toBuffer(belge(baslik, secs)));
    console.log("yazıldı:", dosya);
  }
  fs.writeFileSync(path.join(OUT, "Ogretmen_Dosyasi_TAMAMI.docx"), await Packer.toBuffer(belge("Tamamı", hepsi)));
  console.log("yazıldı: Ogretmen_Dosyasi_TAMAMI");
})();
