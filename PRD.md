# Polyagro - Ürün Gereksinimleri Dokümanı (PRD)

## 1. Proje Genel Bakış
Polyagro, sera yönetim sistemi için geliştirilmiş modern bir web uygulamasıdır. React + Vite + TypeScript teknolojileri kullanılarak geliştirilecektir.

## 2. Teknik Gereksinimler
- Frontend Framework: React + Vite + TypeScript
- Dil Desteği: Azerbaycan, Rus ve İngilizce
- Tema Desteği: Açık ve Koyu tema
- Responsive Tasarım: Mobil ve masaüstü uyumlu
- State Yönetimi: Redux veya Context API
- Routing: React Router
- UI Kütüphanesi: Material-UI veya Tailwind CSS

## 3. Sayfa Yapısı ve Özellikler

### 3.1 Giriş Sayfası (Login)
- Kullanıcı adı ve şifre ile giriş
- Dil seçimi
- Tema seçimi
- Hata mesajları gösterimi
- Başarılı girişte dashboard'a yönlendirme

### 3.2 Dashboard
- Sol tarafta sidebar
- Kullanıcı profil bilgileri (isim ve resim)
- Ana menü öğeleri:
  - Kontrol Merkezi
  - Cihaz Yönetimi
  - Raporlar
  - Ayarlar
- Sera cihazları listesi
- Çıkış butonu
- Responsive tasarım (mobilde alt menü)

### 3.3 Kontrol Merkezi
- Sera cihazlarının anlık durumu
- Grafik ve istatistikler
- Alarm ve uyarı sistemi

### 3.4 Cihaz Yönetimi
- Sera cihazlarının listesi
- Cihaz ekleme/düzenleme/silme
- Cihaz detayları görüntüleme

### 3.5 Raporlar
- Tarih aralığına göre raporlar
- Grafik ve tablolar
- Rapor indirme özelliği

### 3.6 Ayarlar
- Kullanıcı profil ayarları
- Sistem ayarları
- Dil ve tema seçenekleri

## 4. Çoklu Dil Desteği
- Azerbaycan (az)
- Rus (ru)
- İngilizce (en)
- JSON dosyaları ile dil yönetimi

## 5. Tema Sistemi
- Açık tema
- Koyu tema
- Tema tercihi localStorage'da saklanacak

## 6. Güvenlik
- JWT tabanlı kimlik doğrulama
- Oturum yönetimi
- Güvenli API istekleri

## 7. Performans Gereksinimleri
- Sayfa yüklenme süresi < 3 saniye
- Lazy loading implementasyonu
- Code splitting
- Image optimization

## 8. Geliştirme Süreci
1. Login sayfası
2. Dashboard ve sidebar
3. Kontrol merkezi
4. Cihaz yönetimi
5. Raporlar
6. Ayarlar
7. Çoklu dil desteği
8. Tema sistemi
9. Test ve optimizasyon

## 9. Test Gereksinimleri
- Unit testler
- Integration testler
- Responsive tasarım testleri
- Cross-browser testleri 