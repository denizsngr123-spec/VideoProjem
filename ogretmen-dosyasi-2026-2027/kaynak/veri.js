// 2026-2027 çalışma takvimi, belirli gün ve haftalar ile 5. ve 6. sınıf
// Bilişim Teknolojileri ve Yazılım (TYMM) yıllık plan verileri.

// Okul bilgileri: doldurulduğunda bütün belgelerde kullanılır.
const AYAR = {
  yil: "2026-2027",
  il: "………………",
  ilce: "………………",
  okul: "……………………………… Ortaokulu",
  ogretmen: "……………………………",
  mudur: "……………………………",
  mudurYardimcisi: "……………………………",
};

// Ders haftaları. Tatil satırları "sonra" alanındaki haftadan sonra gelir.
const HAFTALAR = [
  { no: 1, ay: "EYLÜL", tarih: "14-18 Eylül 2026", not: ["14 Eylül: Ders yılının başlaması"], bgh: ["İlköğretim Haftası", "15 Temmuz Demokrasi ve Millî Birlik Günü anma etkinlikleri"] },
  { no: 2, ay: "EYLÜL", tarih: "21-25 Eylül 2026", bgh: [] },
  { no: 3, ay: "EYLÜL-EKİM", tarih: "28 Eylül-2 Ekim 2026", bgh: [] },
  { no: 4, ay: "EKİM", tarih: "5-9 Ekim 2026", bgh: ["Hayvanları Koruma Günü (4 Ekim)"] },
  { no: 5, ay: "EKİM", tarih: "12-16 Ekim 2026", bgh: ["Dünya Kız Çocukları Günü (11 Ekim)", "Avrupa Kod Haftası (Ekim) ✱"] },
  { no: 6, ay: "EKİM", tarih: "19-23 Ekim 2026", bgh: ["Avrupa Kod Haftası (Ekim) ✱"] },
  { no: 7, ay: "EKİM", tarih: "26-30 Ekim 2026", not: ["28 Ekim yarım gün, 29 Ekim resmî tatil"], bgh: ["Cumhuriyet Bayramı (29 Ekim)", "Kızılay Haftası (29 Ekim-4 Kasım)"] },
  { no: 8, ay: "KASIM", tarih: "2-6 Kasım 2026", bgh: ["Lösemili Çocuklar Haftası (2-8 Kasım)", "Organ Bağışı ve Nakli Haftası (3-9 Kasım)"] },
  { no: 9, ay: "KASIM", tarih: "9-13 Kasım 2026", bgh: ["Atatürk Haftası (10-16 Kasım)", "10 Kasım Atatürk'ü Anma Günü"] },
  { no: 10, ay: "KASIM", tarih: "23-27 Kasım 2026", bgh: ["Öğretmenler Günü (24 Kasım)", "Ağız ve Diş Sağlığı Haftası (21-27 Kasım)"] },
  { no: 11, ay: "KASIM-ARALIK", tarih: "30 Kasım-4 Aralık 2026", bgh: ["Dünya Engelliler Günü (3 Aralık)"] },
  { no: 12, ay: "ARALIK", tarih: "7-11 Aralık 2026", bgh: ["İnsan Hakları ve Demokrasi Haftası (10 Aralık'ı içine alan hafta)"] },
  { no: 13, ay: "ARALIK", tarih: "14-18 Aralık 2026", bgh: ["Tutum, Yatırım ve Türk Malları Haftası (12-18 Aralık)"] },
  { no: 14, ay: "ARALIK", tarih: "21-25 Aralık 2026", bgh: [] },
  { no: 15, ay: "ARALIK-OCAK", tarih: "28 Aralık 2026-1 Ocak 2027", not: ["1 Ocak resmî tatil"], bgh: ["Mehmet Akif Ersoy'u Anma Günü (27 Aralık)"] },
  { no: 16, ay: "OCAK", tarih: "4-8 Ocak 2027", bgh: [] },
  { no: 17, ay: "OCAK", tarih: "11-15 Ocak 2027", bgh: ["Enerji Tasarrufu Haftası (Ocak ayının 2. haftası)"] },
  { no: 18, ay: "OCAK", tarih: "18-22 Ocak 2027", not: ["22 Ocak: 1. dönemin sona ermesi"], bgh: [] },
  { no: 19, ay: "ŞUBAT", tarih: "8-12 Şubat 2027", not: ["8 Şubat: 2. dönemin başlaması"], bgh: ["Güvenli İnternet Günü (9 Şubat) ✱"] },
  { no: 20, ay: "ŞUBAT", tarih: "15-19 Şubat 2027", bgh: [] },
  { no: 21, ay: "ŞUBAT", tarih: "22-26 Şubat 2027", bgh: ["Sivil Savunma Günü (28 Şubat)"] },
  { no: 22, ay: "MART", tarih: "1-5 Mart 2027", bgh: ["Yeşilay Haftası (1 Mart'ı içine alan hafta)", "Deprem Haftası (1-7 Mart)"] },
  { no: 23, ay: "MART", tarih: "15-19 Mart 2027", bgh: ["Bilim ve Teknoloji Haftası (8-14 Mart) ile İstiklâl Marşı'nın Kabulü (12 Mart) etkinlikleri ara tatil sonrasında", "Tüketiciyi Koruma Haftası (15-21 Mart)", "Şehitler Günü (18 Mart)"] },
  { no: 24, ay: "MART", tarih: "22-26 Mart 2027", bgh: ["Orman Haftası (21-26 Mart)", "Dünya Su Günü (22 Mart)"] },
  { no: 25, ay: "MART-NİSAN", tarih: "29 Mart-2 Nisan 2027", bgh: ["Kütüphaneler Haftası (Mart ayının son pazartesi gününü içine alan hafta)", "Dünya Otizm Farkındalık Günü (2 Nisan)"] },
  { no: 26, ay: "NİSAN", tarih: "5-9 Nisan 2027", bgh: ["Dünya Sağlık Günü (7 Nisan)"] },
  { no: 27, ay: "NİSAN", tarih: "12-16 Nisan 2027", bgh: ["Turizm Haftası (15-22 Nisan)"] },
  { no: 28, ay: "NİSAN", tarih: "19-23 Nisan 2027", not: ["23 Nisan resmî tatil"], bgh: ["Ulusal Egemenlik ve Çocuk Bayramı (23 Nisan)"] },
  { no: 29, ay: "NİSAN", tarih: "26-30 Nisan 2027", bgh: ["Kûtü'l-Amâre Zaferi (29 Nisan)"] },
  { no: 30, ay: "MAYIS", tarih: "3-7 Mayıs 2027", bgh: ["Trafik ve İlk Yardım Haftası (Mayıs ayının ilk haftası)"] },
  { no: 31, ay: "MAYIS", tarih: "10-14 Mayıs 2027", bgh: ["Engelliler Haftası (10-16 Mayıs)", "Anneler Günü (9 Mayıs)"] },
  { no: 32, ay: "MAYIS", tarih: "17-21 Mayıs 2027", not: ["Kurban Bayramı: 16-19 Mayıs (arefe 15 Mayıs)"], bgh: ["Atatürk'ü Anma, Gençlik ve Spor Bayramı (19 Mayıs)", "Müzeler Haftası (18-24 Mayıs)", "Dünya Telekomünikasyon ve Bilgi Toplumu Günü (17 Mayıs) ✱"] },
  { no: 33, ay: "MAYIS", tarih: "24-28 Mayıs 2027", bgh: ["İstanbul'un Fethi (29 Mayıs)"] },
  { no: 34, ay: "MAYIS-HAZİRAN", tarih: "31 Mayıs-4 Haziran 2027", bgh: ["Dünya Çevre Günü (5 Haziran)"] },
  { no: 35, ay: "HAZİRAN", tarih: "7-11 Haziran 2027", bgh: [] },
  { no: 36, ay: "HAZİRAN", tarih: "14-18 Haziran 2027", bgh: ["Babalar Günü (20 Haziran)"] },
  { no: 37, ay: "HAZİRAN", tarih: "21-25 Haziran 2027", not: ["25 Haziran: Ders yılının sona ermesi"], bgh: [] },
];

const TATILLER = [
  { sonra: 9, metin: "1. DÖNEM ARA TATİLİ: 16-20 Kasım 2026 (Dünya Çocuk Hakları Günü - 20 Kasım)" },
  { sonra: 18, metin: "YARIYIL TATİLİ: 25 Ocak-5 Şubat 2027" },
  { sonra: 22, metin: "2. DÖNEM ARA TATİLİ: 8-12 Mart 2027 (Ramazan Bayramı 9-11 Mart 2027 bu döneme denk gelir)" },
];

// Ortak sınav haftası önerileri (kesin tarihler okul sınav takvimiyle belirlenir).
const SINAV_HAFTALARI = {
  9: "1. dönem 1. sınav (önerilen hafta)",
  17: "1. dönem 2. sınav (önerilen hafta)",
  27: "2. dönem 1. sınav (önerilen hafta)",
  34: "2. dönem 2. sınav (önerilen hafta)",
};

const TAKVIM = [
  ["Öğretmenlerin mesleki çalışmaları", "1 Eylül 2026 Salı"],
  ["Öğretmenler kurulu toplantısı", "2 Eylül 2026"],
  ["Okul sınıf/alan zümre toplantıları", "3 Eylül 2026"],
  ["İlçe zümre toplantıları", "4 Eylül 2026"],
  ["İl zümre toplantıları", "7 Eylül 2026"],
  ["Ders yılının başlaması", "14 Eylül 2026 Pazartesi"],
  ["Cumhuriyet Bayramı", "28 Ekim (yarım gün) - 29 Ekim 2026"],
  ["1. dönem ara tatili", "16-20 Kasım 2026"],
  ["Yılbaşı tatili", "1 Ocak 2027 Cuma"],
  ["1. dönemin sona ermesi", "22 Ocak 2027 Cuma"],
  ["Yarıyıl tatili", "25 Ocak-5 Şubat 2027"],
  ["2. dönemin başlaması", "8 Şubat 2027 Pazartesi"],
  ["2. dönem ara tatili (Ramazan Bayramı 9-11 Mart)", "8-12 Mart 2027"],
  ["Ulusal Egemenlik ve Çocuk Bayramı", "23 Nisan 2027 Cuma"],
  ["Kurban Bayramı (arefe 15 Mayıs)", "16-19 Mayıs 2027"],
  ["Atatürk'ü Anma, Gençlik ve Spor Bayramı", "19 Mayıs 2027 Çarşamba"],
  ["Ders yılının sona ermesi", "25 Haziran 2027 Cuma"],
];

// Öğrenme çıktıları. y: true olanların ifadesi resmî metinle karşılaştırılmalıdır.
const CIKTI = {
  "5.1.1": { m: "Günlük yaşamda kullanılan bilişim teknolojilerini sınıflandırabilme", s: ["a) Bilişim teknolojilerine ilişkin temel kavramları belirler.", "b) Geçmişten günümüze bilişim teknolojilerindeki benzerlikleri ve farklılıkları ilişkilendirir.", "c) Bilişim teknolojilerini kullanım alanlarına göre gruplandırır."] },
  "5.1.2": { m: "Bilişim teknolojilerinin birey ve toplum üzerindeki etkilerini özetleyebilme", s: ["a) Bilişim teknolojilerinin olumlu ve olumsuz yönlerini çözümler.", "b) Bilişim teknolojilerinin kullanımına yönelik fiziksel güvenlik önlemlerini sınıflandırır."], y: true },
  "5.1.3": { m: "Dijital vatandaşlık uygulamalarını sınıflandırabilme", s: ["a) Dijital kimlik kavramını belirler.", "b) Dijital ayak izinin etkilerini bilişim teknolojilerinin kullanım alanları ile ilişkilendirir."] },
  "5.1.4": { m: "Yapay zekâ ile ilgili temel kavramları ve özellikleri sorgulayabilme" },
  "5.1.5": { m: "Bilgisayar sistemlerini çözümleyebilme" },
  "5.2.1": { m: "Görsel düzenleme programlarından yararlanabilme" },
  "5.2.2": { m: "Görsel tasarıma yönelik kurgu oluşturabilme", s: ["a) Görsel tasarlanacak gerçek hayat problemini belirler.", "b) Görsel hazırlama sürecinde kullanılacak hikâye/senaryo unsurlarını belirler."], y: true },
  "5.2.3": { m: "Görsel dosyası geliştirebilme" },
  "5.2.4": { m: "Kelime işlemci programlarından yararlanabilme" },
  "5.2.5": { m: "Kelime işlemci dosyası geliştirebilme" },
  "5.2.6": { m: "Sunum programlarından yararlanabilme" },
  "5.2.7": { m: "Sunum dosyası geliştirebilme", y: true },
  "5.3.1": { m: "Bilgisayar ağları ve bileşenlerini sorgulayabilme", s: ["a) Bilgisayar ağları ve bileşenleri ile ilgili merak ettiği konuları tanımlar.", "b) Bilgisayar ağları ve bileşenleri hakkında sorular sorar.", "c) Bilgisayar ağları ve bileşenleri hakkında bilgi toplar.", "ç) Bilgisayar ağları ve bileşenleri hakkında topladığı bilgilerin doğruluğunu değerlendirir.", "d) Bilgisayar ağları ve bileşenleri hakkında topladığı bilgiler hakkında çıkarım yapar."] },
  "5.3.2": { m: "Bilgisayar ağları ve bağlanma yöntemlerini sınıflandırabilme", s: ["a) Bilgisayar ağlarında kullanılan bağlanma yöntemlerini belirler.", "b) Bağlanma yöntemleri ile teknolojileri ilişkilendirir.", "c) Ağ bileşenlerini işlevlerine göre gruplandırır."], y: true },
  "5.3.3": { m: "İnternet ile amacına uygun olarak çalışabilme", s: ["a) İnternette bilgiye ulaşmak için uygun kaynakları belirler."] },
  "5.4.1": { m: "Bilişim etiği kural ve ilkelerini yorumlayabilme" },
  "5.4.2": { m: "Dijital ortamlarda gizlilik ve güvenlik önlemlerini yönetebilme" },
  "5.5.1": { m: "Yapay zekâ uygulamalarını sınıflandırabilme", s: ["a) Yapay zekâ uygulamalarını belirler.", "b) Yapay zekâ uygulamalarının çalışma sistemi bileşenlerini ilişkilendirir.", "c) Yapay zekâ uygulamalarını alt boyutlarına göre gruplandırır."] },
  "5.5.2": { m: "Yapay zekâya ilişkin etik ve güvenlik/gizlilik önlemlerini yönetebilme" },
  "5.6.1": { m: "Problem çözümü için algoritmik düşünebilme" },
  "5.6.2": { m: "Algoritmayı test edebilme ve hatalarını ayıklayabilme", s: ["– Geliştirdiği algoritmayı test eder.", "– Hataları ayıklayarak algoritmayı kullanıma hazır hâle getirir."], y: true },
  "5.6.3": { m: "Yazılım geliştirme sürecinde kullanılan bileşenlerden yararlanabilme" },
  "5.6.4": { m: "Blok tabanlı ortamda yazılım geliştirme sürecini yönetebilme" },

  "6.1.1": { m: "Yenilikçi bilişim teknolojilerini sınıflandırabilme" },
  "6.1.2": { m: "Bilişim teknolojilerinin gelecekteki durumlarına yönelik çıkarım yapabilme" },
  "6.2.1": { m: "Tablolama programlarından yararlanabilme" },
  "6.2.2": { m: "Tablolama programlarının kullanımına yönelik problemleri belirleyebilme" },
  "6.2.3": { m: "Tablolama dosyasında kullanılacak verileri toplayabilme ve düzenleyebilme", s: ["a) Tablolama dosyasında kullanılacak verileri toplama süreci için plan yapar.", "b) Tablolama dosyasında kullanılacak verileri elde eder.", "c) Tablolama dosyasında kullanılacak verileri kullanıma hazır hâle getirir."] },
  "6.2.4": { m: "Tablolama programlarıyla verileri işleyebilme, analiz edebilme ve görselleştirebilme", y: true },
  "6.2.5": { m: "Ses düzenleme programlarından yararlanabilme", y: true },
  "6.2.6": { m: "Video düzenleme programlarından yararlanabilme", y: true },
  "6.3.1": { m: "İnternet ile amacına uygun olarak çalışabilme" },
  "6.3.2": { m: "İletişim teknolojilerini sınıflandırabilme", s: ["a) Farklı ve eş zamanlı iletişim sürecinde kullanılan bileşenleri belirler."] },
  "6.4.1": { m: "Bilişim etiği kapsamında güvenlik önlemlerini yönetebilme", y: true },
  "6.5.1": { m: "Yapay zekâ girdileri hakkında bilgi toplayabilme", y: true },
  "6.5.2": { m: "Yapay zekâ araç ve teknolojileri ile çalışabilme" },
  "6.6.1": { m: "Blok tabanlı ortamda yazılım geliştirme sürecinde kullanılan bileşenlerden yararlanabilme" },
  "6.6.2": { m: "Blok tabanlı ortamda yazılım geliştirme sürecini yönetebilme" },
  "6.6.3": { m: "Blok tabanlı ortamda yapay zekâ destekli ürün ortaya koyabilme" },
};

const OTP_OLCME = "Ürün dosyası (e-portfolyo), öz değerlendirme, yansıtma formu";
const YIL_SONU = { tema: "YIL SONU DEĞERLENDİRME", hafta: { 37: { c: [], icerik: "Yıl boyunca üretilen ürünlerin değerlendirilmesi ve yansıtma; resmî tatillere denk gelen derslerin telafisi/tamamlanması." } }, olcme: "Yansıtma, öz değerlendirme" };

// Her tema: başlık, ölçme-değerlendirme ve hafta -> { c: çıktı kodları, s: gösterilecek süreç bileşeni sıraları (yoksa tümü), icerik }
const PLAN5 = [
  {
    tema: "1. TEMA: BİLİŞİM TEKNOLOJİLERİNİN HAYATIMIZDAKİ YERİ (14 ders saati)",
    olcme: "Gözlem formu, Frayer modeli, kısa yanıtlı sorular, dereceli puanlama anahtarı, performans görevi (ör. “Dijital Ayak İzim” afişi), öz değerlendirme",
    hafta: {
      1: { c: ["5.1.1"], s: [0], icerik: "Dersin ve BT sınıfı kurallarının tanıtımı, iş sağlığı ve güvenliği; ön değerlendirme. Veri, bilgi, bilişim, teknoloji kavramları." },
      2: { c: ["5.1.1"], s: [1, 2], icerik: "Geçmişten günümüze bilişim teknolojileri; bilişim teknolojilerinin kullanım alanlarına (eğitim, sağlık, iletişim, ulaşım vb.) göre sınıflandırılması." },
      3: { c: ["5.1.2"], icerik: "Bilişim teknolojilerinin birey ve toplum üzerindeki olumlu/olumsuz etkileri; sağlıklı ve ergonomik kullanım; fiziksel güvenlik önlemleri." },
      4: { c: ["5.1.3"], icerik: "Dijital vatandaşlık; dijital kimlik; dijital ayak izi; e-Devlet, EBA gibi dijital hizmetlerin bilinçli kullanımı." },
      5: { c: ["5.1.4"], icerik: "Doğal zekâ ve yapay zekâ; yapay zekânın kısa tarihi; yapay zekâya ilişkin temel kavram ve özellikler." },
      6: { c: ["5.1.5"], icerik: "Bilgisayar sistemleri: donanım ve yazılım; girdi, işlem, çıktı ve depolama birimleri." },
      7: { c: ["5.1.5"], icerik: "İşletim sistemi ve temel işlevleri; dosya ve klasör yönetimi; dosya uzantıları." },
    },
  },
  {
    tema: "2. TEMA: DİJİTAL ÜRÜN TASARIMI VE GELİŞTİRME (12 ders saati)",
    olcme: "Dereceli puanlama anahtarı (içerik, teknik doğruluk, görsel uyum), kontrol listesi, performans görevi (afiş/broşür/sunum), öz ve akran değerlendirme, e-portfolyo",
    hafta: {
      8: { c: ["5.2.1"], icerik: "Görsel düzenleme programlarının temel özellikleri ve arayüzü; görsel dosya biçimleri." },
      9: { c: ["5.2.2"], icerik: "Gerçek hayat problemine yönelik görsel tasarım kurgusu; hikâye/senaryo unsurları; renk, oran ve denge gibi temel tasarım ilkeleri." },
      10: { c: ["5.2.3"], icerik: "Görsel dosyası geliştirme: katman, metin ve şekil ekleme, dışa aktarma; telif hakkı ve lisanslı görsel kullanımı." },
      11: { c: ["5.2.4"], icerik: "Kelime işlemci programlarının temel özellikleri ve arayüzü; amaca uygun programı seçme; çevrim içi kelime işlemciler." },
      12: { c: ["5.2.5"], icerik: "Kelime işlemci dosyası geliştirme: biçimlendirme, tablo ve resim ekleme, sayfa düzeni, kaydetme ve PDF olarak dışa aktarma." },
      13: { c: ["5.2.6", "5.2.7"], icerik: "Sunum programlarının temel özellikleri; sunum dosyası oluşturma: slayt tasarımı, geçiş ve animasyon; etkili sunum yapma." },
    },
  },
  {
    tema: "3. TEMA: BİLGİSAYAR AĞLARI VE İLETİŞİM (6 ders saati)",
    olcme: "Performans görevi: ağ oluşturmak için gerekli donanımları gösteren afiş/poster (bilimsel doğruluk, özgünlük, tamamlanma süresi ölçütleri), kavram haritası, çıkış kartı",
    hafta: {
      14: { c: ["5.3.1"], icerik: "Bilgisayar ağı kavramı; ağ bileşenleri (modem, yönlendirici, anahtar, kablo, kablosuz erişim noktası, sunucu)." },
      15: { c: ["5.3.2"], icerik: "Bilgisayar ağ türleri; kablolu ve kablosuz bağlanma yöntemleri ve teknolojileri (Wi-Fi, Bluetooth, mobil veri vb.)." },
      16: { c: ["5.3.3"], icerik: "İnternette bilgi kaynakları; arama motorları ve etkili arama yöntemleri; bilginin doğruluğunu ve kaynağın güvenilirliğini sorgulama." },
    },
  },
  {
    tema: "4. TEMA: BİLİŞİM ETİĞİ VE SİBER GÜVENLİK (4 ders saati)",
    olcme: "Vaka/senaryo analizi, gözlem formu, kontrol listesi, öz değerlendirme",
    hafta: {
      17: { c: ["5.4.1"], icerik: "Bilişim etiği; etik kural ve ilkeler; telif hakkı ve intihal; dijital ortamda görgü kuralları (netiket)." },
      18: { c: ["5.4.2"], icerik: "Gizlilik ve kişisel veri; güçlü parola; kötü amaçlı yazılımlar; güvenlik önlemleri; siber zorbalık ve yardım alma yolları." },
    },
  },
  {
    tema: "5. TEMA: YAPAY ZEKÂ (8 ders saati)",
    olcme: "Sınıflandırma etkinliği, tartışma gözlem formu, vaka analizi, dereceli puanlama anahtarı, öz değerlendirme",
    hafta: {
      19: { c: ["5.5.1"], s: [0], icerik: "Günlük hayattaki yapay zekâ uygulamaları (sesli asistanlar, öneri sistemleri, görüntü tanıma, çeviri vb.)." },
      20: { c: ["5.5.1"], s: [1, 2], icerik: "Yapay zekâ uygulamalarının çalışma sistemi (veri, öğrenme, çıktı); uygulamaların alt boyutlarına göre gruplandırılması." },
      21: { c: ["5.5.2"], icerik: "Yapay zekâda etik ilkeler: önyargı, doğruluk, sorumluluk; yapay zekâ ile üretilen içeriğin belirtilmesi." },
      22: { c: ["5.5.2"], icerik: "Yapay zekâ araçlarını kullanırken gizlilik ve güvenlik önlemleri; kişisel verilerin paylaşılmaması; yaş sınırları ve güvenli kullanım." },
    },
  },
  {
    tema: "6. TEMA: YAZILIM TASARIMI VE PROGRAMLAMA (24 ders saati)",
    olcme: "Uygulamalı sınav, kontrol listesi (blok tabanlı proje), dereceli puanlama anahtarı, performans görevi (blok tabanlı proje), akran değerlendirme, e-portfolyo",
    hafta: {
      23: { c: ["5.6.1"], icerik: "Problem kavramı; problemi anlama ve parçalara ayırma; günlük hayattan örneklerle algoritma kavramı." },
      24: { c: ["5.6.1"], icerik: "Algoritma ve akış şeması; sıralı adımlar; örüntü tanıma ve soyutlama." },
      25: { c: ["5.6.1"], icerik: "Karar ve tekrar yapıları içeren algoritmalar (bilgisayarsız ve blok tabanlı etkinlikler)." },
      26: { c: ["5.6.2"], s: [0], icerik: "Algoritmayı test etme; hata türleri; hata ayıklama stratejileri." },
      27: { c: ["5.6.2"], s: [1], icerik: "Hataları ayıklayarak algoritmayı kullanıma hazır hâle getirme; akran incelemesi." },
      28: { c: ["5.6.3"], icerik: "Blok tabanlı programlama ortamının tanıtımı (ör. Scratch): sahne, karakter, kod blokları." },
      29: { c: ["5.6.3"], icerik: "Olay, hareket, görünüm ve ses blokları; sıralı yapılarla basit uygulamalar." },
      30: { c: ["5.6.3"], icerik: "Döngüler, koşullar ve değişkenler (temel düzeyde)." },
      31: { c: ["5.6.4"], icerik: "Yazılım geliştirme süreci: problemi belirleme, planlama ve senaryo/taslak oluşturma." },
      32: { c: ["5.6.4"], icerik: "Projeyi blok tabanlı ortamda kodlama." },
      33: { c: ["5.6.4"], icerik: "Projeyi test etme, hata ayıklama ve iyileştirme." },
      34: { c: ["5.6.4"], icerik: "Projeyi sunma ve paylaşma; geri bildirimle geliştirme." },
    },
  },
  {
    tema: "OKUL TEMELLİ PLANLAMA (4 ders saati)",
    olcme: OTP_OLCME,
    hafta: {
      35: { c: [], icerik: "Zümre kararıyla belirlenen etkinlik (ör. proje sergisi, kodlama şenliği, dijital ürün fuarı)." },
      36: { c: [], icerik: "Zümre kararıyla belirlenen etkinlik (ör. dijital vatandaşlık atölyesi; ürünlerin e-portfolyoda düzenlenmesi)." },
    },
  },
  YIL_SONU,
];

const PLAN6 = [
  {
    tema: "1. TEMA: BİLİŞİM TEKNOLOJİLERİNİN HAYATIMIZDAKİ YERİ (4 ders saati)",
    olcme: "Frayer modeli, gözlem formu, kısa sunum için dereceli puanlama anahtarı",
    hafta: {
      1: { c: ["6.1.1"], icerik: "Dersin ve BT sınıfı kurallarının tanıtımı; ön değerlendirme. Yenilikçi bilişim teknolojileri: artırılmış ve sanal gerçeklik, giyilebilir teknolojiler, bulut depolama, nesnelerin interneti, yapay zekâ." },
      2: { c: ["6.1.2"], icerik: "Bilişim teknolojilerindeki eğilimler; teknolojinin gelecekte meslekler ve günlük yaşam üzerindeki olası etkileri." },
    },
  },
  {
    tema: "2. TEMA: DİJİTAL ÜRÜN TASARIMI VE GELİŞTİRME (12 ders saati)",
    olcme: "Kontrol listesi, dereceli puanlama anahtarı, performans görevi (veri analizi raporu ve grafik; kısa tanıtım videosu veya ses kaydı), öz ve akran değerlendirme",
    hafta: {
      3: { c: ["6.2.1"], icerik: "Tablolama programlarının temel kavramları: çalışma kitabı, sayfa, hücre, satır, sütun; dosya uzantıları (.xlsx, .ods, .csv)." },
      4: { c: ["6.2.2"], icerik: "Tablolama programıyla çözülebilecek gerçek yaşam problemleri (ör. harçlık/bütçe takibi, sınıf anketi)." },
      5: { c: ["6.2.3"], icerik: "Veri toplama planı; anket ve ölçümle veri elde etme; verileri düzenleme ve kullanıma hazırlama." },
      6: { c: ["6.2.4"], icerik: "Veri girişi ve biçimlendirme; temel formül ve fonksiyonlar (TOPLA, ORTALAMA, MAK, MİN); sıralama, filtreleme; grafik oluşturma ve yorumlama." },
      7: { c: ["6.2.5"], icerik: "Ses düzenleme programlarının temel özellikleri; ses kaydetme, kesme, birleştirme ve efekt ekleme; ses dosya biçimleri." },
      8: { c: ["6.2.6"], icerik: "Video düzenleme programlarının temel özellikleri; kurgu, geçiş, altyazı ve dışa aktarma; telif hakkı ve lisanslar." },
    },
  },
  {
    tema: "3. TEMA: BİLGİSAYAR AĞLARI VE İLETİŞİM (4 ders saati)",
    olcme: "Kavram haritası, sınıflandırma tablosu, gözlem formu",
    hafta: {
      9: { c: ["6.3.1"], icerik: "İnterneti amacına uygun kullanma: güvenilir bilgi kaynakları, gelişmiş arama, çevrim içi iş birliği araçları; yeni internet teknolojilerinin verimlilik açısından değerlendirilmesi." },
      10: { c: ["6.3.2"], icerik: "İletişim teknolojilerinin sınıflandırılması: eş zamanlı ve eş zamansız iletişim (e-posta, mesajlaşma, görüntülü görüşme, forum); iletişim sürecinin bileşenleri." },
    },
  },
  {
    tema: "4. TEMA: BİLİŞİM ETİĞİ VE SİBER GÜVENLİK (4 ders saati)",
    olcme: "Vaka analizi, senaryo tabanlı sorular, kontrol listesi, öz değerlendirme",
    hafta: {
      11: { c: ["6.4.1"], icerik: "Bilişim etiği kapsamında güvenlik riskleri: oltalama (kimlik avı), kötü amaçlı yazılımlar, sahte haber, siber zorbalık." },
      12: { c: ["6.4.1"], icerik: "Güvenlik önlemleri: güçlü parola ve iki adımlı doğrulama, güncelleme, yedekleme, gizlilik ayarları, kişisel verilerin korunması; yardım alma yolları." },
    },
  },
  {
    tema: "5. TEMA: YAPAY ZEKÂ (10 ders saati)",
    olcme: "Ürün değerlendirme (dereceli puanlama anahtarı), gözlem formu, öz değerlendirme",
    hafta: {
      13: { c: ["6.5.1"], icerik: "Yapay zekâ araçlarının ihtiyaç duyduğu girdiler; veri kavramı ve veri türleri (metin, görüntü, ses, sayısal)." },
      14: { c: ["6.5.1"], icerik: "Veri toplama ve etiketleme; veri kalitesi ve önyargı." },
      15: { c: ["6.5.2"], icerik: "Yapay zekâ araç ve teknolojilerini tanıma; etkili ve sorumlu komut (istem) yazma." },
      16: { c: ["6.5.2"], icerik: "Örnek verilerle basit bir yapay zekâ modeli oluşturma (ör. görüntü/ses sınıflandırma araçları)." },
      17: { c: ["6.5.2"], icerik: "Modeli test etme ve iyileştirme; yapay zekâ çıktılarının doğruluğunu sorgulama; etik ve hukuki sorumluluklar." },
    },
  },
  {
    tema: "6. TEMA: YAZILIM TASARIMI VE PROGRAMLAMA (34 ders saati)",
    olcme: "Uygulamalı sınav, kontrol listesi, dereceli puanlama anahtarı, performans görevi (yapay zekâ destekli blok tabanlı proje), akran değerlendirme, e-portfolyo",
    hafta: {
      18: { c: ["6.6.1"], icerik: "Problem çözme süreci ve algoritma tekrarı; blok tabanlı programlama ortamının tanıtımı." },
      19: { c: ["6.6.1"], icerik: "Sahne, karakter ve olay blokları; sıralı yapılar." },
      20: { c: ["6.6.1"], icerik: "Değişkenler; kullanıcıdan veri alma." },
      21: { c: ["6.6.1"], icerik: "Operatörler: aritmetik, karşılaştırma ve mantıksal operatörler." },
      22: { c: ["6.6.1"], icerik: "Karar yapıları (eğer, eğer-değilse)." },
      23: { c: ["6.6.1"], icerik: "Döngüler (tekrarla, sürekli tekrarla, -e kadar tekrarla)." },
      24: { c: ["6.6.1"], icerik: "Kendi bloklarını oluşturma (alt programlar) ve mesajlaşma (haber sal)." },
      25: { c: ["6.6.2"], icerik: "Yazılım geliştirme süreci: problemi belirleme ve ihtiyaç analizi." },
      26: { c: ["6.6.2"], icerik: "Planlama: senaryo/hikâye tahtası, algoritma ve akış şeması." },
      27: { c: ["6.6.2"], icerik: "Tasarım: arayüz ve karakter tasarımı." },
      28: { c: ["6.6.2"], icerik: "Kodlama." },
      29: { c: ["6.6.2"], icerik: "Test etme ve hata ayıklama." },
      30: { c: ["6.6.2"], icerik: "Değerlendirme, iyileştirme ve belgeleme." },
      31: { c: ["6.6.3"], icerik: "Yapay zekâ destekli ürün fikri; blok tabanlı ortamlardaki yapay zekâ uzantıları (görüntü, ses, metin tanıma)." },
      32: { c: ["6.6.3"], icerik: "Ürünü planlama ve veri hazırlama." },
      33: { c: ["6.6.3"], icerik: "Ürünü geliştirme (kodlama)." },
      34: { c: ["6.6.3"], icerik: "Ürünü test etme, sunma ve paylaşma." },
    },
  },
  {
    tema: "OKUL TEMELLİ PLANLAMA (4 ders saati)",
    olcme: OTP_OLCME,
    hafta: {
      35: { c: [], icerik: "Zümre kararıyla belirlenen etkinlik (ör. yapay zekâ destekli proje sergisi, kodlama şenliği)." },
      36: { c: [], icerik: "Zümre kararıyla belirlenen etkinlik (ör. güvenli internet atölyesi; ürünlerin e-portfolyoda düzenlenmesi)." },
    },
  },
  YIL_SONU,
];

// Belirli gün ve haftalar listesi (dosyadaki ayrı tablo için).
const BGH_LISTE = [
  ["Eylül", "İlköğretim Haftası (Eylül ayının 3. haftası; ders yılının ilk haftasında kutlanır); 15 Temmuz Demokrasi ve Millî Birlik Günü anma etkinlikleri; Gaziler Günü (19 Eylül)"],
  ["Ekim", "Hayvanları Koruma Günü (4 Ekim); Dünya Kız Çocukları Günü (11 Ekim); Cumhuriyet Bayramı (29 Ekim); Kızılay Haftası (29 Ekim-4 Kasım); Avrupa Kod Haftası ✱"],
  ["Kasım", "Lösemili Çocuklar Haftası (2-8 Kasım); Organ Bağışı ve Nakli Haftası (3-9 Kasım); Atatürk Haftası (10-16 Kasım); Dünya Çocuk Hakları Günü (20 Kasım); Ağız ve Diş Sağlığı Haftası (21-27 Kasım); Öğretmenler Günü (24 Kasım)"],
  ["Aralık", "Dünya Engelliler Günü (3 Aralık); İnsan Hakları ve Demokrasi Haftası (10 Aralık'ı içine alan hafta); Tutum, Yatırım ve Türk Malları Haftası (12-18 Aralık); Mehmet Akif Ersoy'u Anma Günü (27 Aralık)"],
  ["Ocak", "Enerji Tasarrufu Haftası (Ocak ayının 2. haftası); Kişisel Verilerin Korunması Günü (28 Ocak) ✱"],
  ["Şubat", "Güvenli İnternet Günü (9 Şubat 2027) ✱; Sivil Savunma Günü (28 Şubat)"],
  ["Mart", "Yeşilay Haftası (1 Mart'ı içine alan hafta); Deprem Haftası (1-7 Mart); Bilim ve Teknoloji Haftası (8-14 Mart) ✱; İstiklâl Marşı'nın Kabulü ve Mehmet Akif Ersoy'u Anma Günü (12 Mart); Tüketiciyi Koruma Haftası (15-21 Mart); Şehitler Günü (18 Mart); Orman Haftası (21-26 Mart); Dünya Su Günü (22 Mart); Kütüphaneler Haftası (Mart ayının son pazartesi gününü içine alan hafta)"],
  ["Nisan", "Dünya Otizm Farkındalık Günü (2 Nisan); Dünya Sağlık Günü (7 Nisan); Turizm Haftası (15-22 Nisan); Ulusal Egemenlik ve Çocuk Bayramı (23 Nisan); Kûtü'l-Amâre Zaferi (29 Nisan)"],
  ["Mayıs", "Trafik ve İlk Yardım Haftası (Mayıs ayının ilk haftası); Anneler Günü (Mayıs ayının 2. pazarı); Engelliler Haftası (10-16 Mayıs); Dünya Telekomünikasyon ve Bilgi Toplumu Günü (17 Mayıs) ✱; Müzeler Haftası (18-24 Mayıs); Atatürk'ü Anma, Gençlik ve Spor Bayramı (19 Mayıs); İstanbul'un Fethi (29 Mayıs)"],
  ["Haziran", "Dünya Çevre Günü (5 Haziran); Babalar Günü (Haziran ayının 3. pazarı)"],
];

module.exports = { AYAR, HAFTALAR, TATILLER, SINAV_HAFTALARI, TAKVIM, CIKTI, PLAN5, PLAN6, BGH_LISTE };
