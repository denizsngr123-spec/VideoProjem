# 2026-2027 Bilişim Teknolojileri ve Yazılım Öğretmen Dosyası (5. ve 6. Sınıflar)

Türkiye Yüzyılı Maarif Modeli (TYMM) öğretim programına ve 2026-2027 çalışma takvimine göre hazırlanmış, Word (.docx) biçiminde düzenlenebilir öğretmen dosyası.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `Ogretmen_Dosyasi_TAMAMI.docx` | Aşağıdaki tüm bölümler tek dosyada (yazdırmak için) |
| `00_Kapak_Genel_Bilgiler_ve_Mevzuat.docx` | Kapak, öğretmen bilgileri, ders dağılımı, haftalık ders programı, çalışma takvimi, mevzuat özeti, kontrol listesi, belirli gün ve haftalar |
| `01_Yillik_Plan_5_Sinif.docx` | 5. sınıf ünitelendirilmiş yıllık plan (yatay sayfa) |
| `02_Yillik_Plan_6_Sinif.docx` | 6. sınıf ünitelendirilmiş yıllık plan (yatay sayfa) |
| `03_Zumre_Toplanti_Tutanaklari.docx` | Sene başı (doldurulmuş), 2. dönem başı, sene sonu zümre tutanakları; şube öğretmenler kurulu görüş formu |
| `04_Olcme_ve_Degerlendirme.docx` | Esaslar, sınav takvimi, konu-soru dağılım tabloları, katılım ölçeği, performans görevleri, dereceli puanlama anahtarları, kontrol listesi, öz/akran değerlendirme, gözlem formu |
| `05_Ders_Plani_Sablon_ve_Ornekler.docx` | TYMM yapısında ders planı şablonu ve iki örnek plan |
| `06_BT_Sinifi_Evraklari.docx` | Kullanım kuralları, oturma planı, demirbaş, arıza takibi, iş güvenliği, kullanım çizelgesi, veli onayı, BT rehber faaliyet kaydı |
| `07_BEP_Ozel_Egitim_Formlari.docx` | Kaba değerlendirme (5 ve 6), BEP ders planı, uyarlamalar, dönem sonu değerlendirme |
| `08_Kulup_ve_Sosyal_Etkinlik.docx` | Kulüp yıllık planı, toplantı tutanağı, toplum hizmeti, yıl sonu raporu |
| `09_Veli_ve_Ogrenci_Iletisim.docx` | Veli mektubu, veli ve öğrenci görüşme formları, takip çizelgesi |

## Planın dayandığı bilgiler

- **Ders saati:** Haftada 2 saat; yıllık 72 saat = 68 saat tema + 4 saat okul temelli planlama. 37 ders haftası.
- **5. sınıf tema süreleri:** 1. tema 14, 2. tema 12, 3. tema 6, 4. tema 4, 5. tema 8, 6. tema 24 saat.
- **6. sınıf tema süreleri:** 1. tema 4, 2. tema 12, 3. tema 4, 4. tema 4, 5. tema 10, 6. tema 34 saat.
- **Takvim:** Ders başı 14 Eylül 2026; ara tatiller 16-20 Kasım 2026 ve 8-12 Mart 2027; yarıyıl tatili 25 Ocak-5 Şubat 2027; ders yılı sonu 25 Haziran 2027.
- **Ölçme:** Dönemde 2 sınav ve 2 ders etkinliklerine katılım puanı. Ortak Yazılı Sınav Sistemi (OYSS) BTY dersini kapsamaz.

## Kullanmadan önce kontrol edin

1. Yıllık planlardaki `*` işaretli öğrenme çıktısı ifadeleri ikincil kaynaklardan derlenmiştir. Bunları [tymm.meb.gov.tr](https://tymm.meb.gov.tr/ogretim-programlari/ders/bilisim-teknolojileri-ve-yazilim-dersi) tema sayfaları ve MEB'in 2026-2027 [taslak çerçeve planları](https://tymm.meb.gov.tr/taslak-cerceve-planlari) ile karşılaştırın.
2. 5. sınıf 1. ve 2. tema süreleri (14 + 12 saat), toplam 68 saatten diğer temaların resmî süreleri çıkarılarak hesaplanmıştır. 6. sınıf 5. tema süresi (10 saat) yayıncı planlarından alınmıştır.
3. Zümre ve kurul tarihleri, sınav haftaları ve okul adına ilişkin noktalı yerler okulunuza göre doldurulmalıdır.
4. Gelişim raporunun 6. sınıflarda bu yıl uygulanıp uygulanmadığını okul idarenizden teyit edin.

## Okul bilgilerini otomatik doldurma

`kaynak/veri.js` dosyasının başındaki `AYAR` alanına okul adı, il/ilçe, öğretmen ve müdür adlarını yazıp şu komutu çalıştırırsanız bütün belgeler bu bilgilerle yeniden üretilir:

```bash
node ogretmen-dosyasi-2026-2027/kaynak/olustur.js
```

## Kaynaklar

- [TYMM Bilişim Teknolojileri ve Yazılım dersi sayfası](https://tymm.meb.gov.tr/ogretim-programlari/ders/bilisim-teknolojileri-ve-yazilim-dersi) ve [öğretim programı (5 ve 6. sınıflar)](https://mufredat.meb.gov.tr/Dosyalar/202591115327350-bili%C5%9Fim%20d%C3%B6p.pdf)
- [Eğitim Kurulları ve Zümreleri Yönergesi](https://mevzuat.meb.gov.tr/dosyalar/1865.pdf)
- [Eğitim ve Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge](https://mevzuat.meb.gov.tr/dosyalar/2143.pdf)
- [Ortak Yazılı Sınav Sistemi (OYSS) Uygulama Kılavuzu](https://www.meb.gov.tr/meb_iys_dosyalar/2026_10/6ad703eb1bb29010473792_Ortak_Yazili_Sinav_Sistemi_OYSS_Uygulama_Kilavuzu.pdf)
- [Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği değişikliği (RG 28.07.2026)](https://www.resmigazete.gov.tr/eskiler/2026/07/20260728-2.htm)
- [2026-2027 çalışma takvimi haberi (Habertürk)](https://www.haberturk.com/bilgi/foto/meb-2026-2027-egitim-ogretim-takvimi-okullar-ne-zaman-acilacak-ara-tatiller-yariyil-tatili-ve-yaz-tatili-ne-zaman-3895691)
- [2026-2027 kurul ve zümre toplantı takvimi haberi](https://www.ajanskamu.net/meb/2026-2027-egitim-ogretim-yili-ogretmen-kurul-ve-zumre-toplanti-takvimi-h225267.html)

Bu dosya resmî bir MEB belgesi değildir. MEB'in yayımladığı metinler ve okulunuzun zümre kararları esastır.
