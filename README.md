# TravelMind 🌍

**TravelMind**, seyahat planlaması sürecinde yaşanan vakit kaybına çözüm sunmak amacıyla geliştirilmiş bir yapay zekâ destekli seyahat planlama uygulamasıdır. Proje, kullanıcıların seyahat tercihlerini temel alarak kişiselleştirilmiş öneriler sunar ve zaman kazandırır.

## Proje Amacı

TravelMind, bireylerin seyahat planlama sürecinde yaşadıkları zorluklara çözüm bulmak amacıyla geliştirilmiştir. Uygulama, kullanıcılardan alınan bilgilere göre kişiye özel seyahat planları oluşturarak zaman kazandırır. Bu sayede, çocuklu aileler, alışveriş severler veya kültür meraklıları gibi farklı kullanıcı gruplarının ihtiyaçlarına yönelik planlar sunar.

## Özellikler

- **Kullanıcı Dostu Arayüz**: Kolay ve anlaşılır arayüz sayesinde herkes tarafından rahatlıkla kullanılabilir.
- **Kişiselleştirilmiş Seyahat Planları**: Kullanıcılardan alınan bilgilere göre yapay zeka tarafından kişiselleştirilmiş seyahat planları oluşturulur.
- **Seyahat Amacına Göre Planlar**: Çocuk dostu, kültürel geziler, alışveriş turları gibi seçeneklerle kişiye uygun planlar sunar.
- **Görseller ve Harita Bilgileri**: Önerilen mekanların görsellerini ve Google Maps entegrasyonu ile konum bilgilerini sağlar.
- **Mesafe Bilgileri**: Önerilen mekanlar arasındaki araba ve yürüyüş mesafelerini süre bilgisiyle birlikte sunar.
- **E-posta ile Paylaşım**: Kullanıcılar, oluşturdukları seyahat planlarını e-posta ile paylaşabilirler.

## Teknik Altyapı

### Backend
- **Node.js**: Uygulamanın sunucu tarafı Node.js ile inşa edilmiştir.
- **Nodemailer**: Kullanıcıların seyahat önerilerini e-posta ile paylaşabilmeleri için Nodemailer entegrasyonu kullanılmıştır.
- **GPT-3.5 API**: Kişiselleştirilmiş seyahat önerilerini oluşturmak için OpenAI GPT-3.5 API kullanılmıştır.
- **Google Places ve Maps API**: GPT-3.5'in önerdiği mekanların görselleri ve harita bilgileri için Google API'leri entegre edilmiştir.
- **Weather API** *(future)*: Seyahat planlarına hava durumu tahminlerini eklemek amacıyla Weather API entegrasyonu planlanmıştır.

### Frontend
- **React.js**: Uygulamanın ön yüzü React.js kullanılarak geliştirilmiştir.
- **MUI (Material User Interface)**: Kullanıcı arayüzü tasarımında MUI bileşenleri kullanılmıştır.
- **DALL-E**: Görsel içeriklerin oluşturulması için DALL-E yapay zekâ aracı kullanılmıştır.

## Nasıl Çalışır?
1. Kullanıcı, gideceği yer, seyahat amacı ve tarih bilgilerini form aracılığıyla paylaşır.
2. GPT-3.5 bu bilgileri analiz eder ve kişiye özel seyahat önerileri sunar.
3. Önerilen mekanlar ve etkinliklerin görselleri ve harita bilgileri kullanıcıya sunulur.
4. Kullanıcı, seyahat planını e-posta ile paylaşabilir.

## Kurulum

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadi/travelmind.git
   ```
2. **Bağımlılıkları Yükleyin:**
   ```bash
   cd travelmind
   npm install
   ```
3. **API Anahtarlarınızı Tanımlayın:**
   `config.js` dosyasını doldurarak GPT-3.5, Google Places/Maps ve Nodemailer için API anahtarlarını ekleyin.
   
4. **Projeyi Çalıştırın:**
   ```bash
   npm start
   ```

## Arayüz Görselleri 
![kart](https://github.com/user-attachments/assets/bab530b0-b85f-424e-b86a-964b14fd317d)

![plan](https://github.com/user-attachments/assets/56af1474-fe3f-4a7c-9a87-4e95acfc10c7)

![anasayfa](https://github.com/user-attachments/assets/55848525-d552-484d-81b2-d12b0f8049ee)

![mapModal](https://github.com/user-attachments/assets/4a2ee627-6d0d-435e-b1ad-e75a356ae453)




