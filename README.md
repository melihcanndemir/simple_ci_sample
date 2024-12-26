# GitHub Actions ve CI/CD Yapısı Eğitim Materyali

## 1. Giriş
GitHub Actions, GitHub projelerinde sürekli entegrasyon (CI) ve sürekli teslimat (CD) işlemlerini otomatikleştirmek için kullanılan güçlü bir araçtır. Bu materyal, temel kavramları açıklayarak ve örneklerle destekleyerek size GitHub Actions ve CI/CD sürecini öğretmeyi amaçlamaktadır.

---

## 2. GitHub Actions Nedir?
GitHub Actions, kod depolarında otomasyon iş akışları oluşturmayı sağlayan bir GitHub özelliğidir. Bu iş akışları, **YAML** dosyaları ile tanımlanır ve bir dizi görevden oluşur.

### Temel Bileşenler
- **Workflow (İş Akışı):** Belirli bir olaya yanıt veren otomasyon süreci.
- **Event (Olay):** İş akışını tetikleyen olay (örneğin, `push`, `pull_request`).
- **Job (İş):** Bir iş akışı içinde çalıştırılan görevler grubu.
- **Step (Adım):** Bir iş içinde çalıştırılan bağımsız görev.
- **Runner:** İşlerin çalıştığı sanal ortam.

---

## 3. CI/CD Nedir?

### Sürekli Entegrasyon (CI)
Sürekli entegrasyon, geliştiricilerin kodlarını sık sık birleştirerek otomatik testlerden geçirmesini sağlayan bir uygulamadır. Bu, hataların erken tespit edilmesine yardımcı olur.

### Sürekli Teslimat (CD)
Sürekli teslimat, kod değişikliklerinin otomatik olarak dağıtılmasını sağlar. Hedef, manuel müdahaleyi en aza indirerek hızlı ve güvenilir teslimatlar yapmaktır.

---

## 4. GitHub Actions ile CI/CD Süreci Oluşturma

### Adım 1: Depo Hazırlığı
1. GitHub’da bir depo oluşturun veya mevcut bir depoyu kullanın.
2. `main` veya `master` gibi bir ana dal belirleyin.

### Adım 2: İş Akışı Dosyası Oluşturma
1. Depo kök dizininde `.github/workflows` klasörünü oluşturun.
2. İçinde bir YAML dosyası oluşturun, örneğin: `ci-cd.yml`.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Kod Çek
        uses: actions/checkout@v3

      - name: Node.js Kur
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Bağımlılıkları Yükle
        run: npm install

      - name: Test Çalıştır
        run: npm test

      - name: Üretim için Derle
        run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Dağıtımı Gerçekleştir
        run: echo "Dağıtım yapıldı!"
```

### Açıklama
- **`on`:** İş akışını tetikleyen olayları tanımlar.
- **`jobs`:** İş gruplarını belirtir.
  - **`build`:** Kodun derlenmesi ve test edilmesi.
  - **`deploy`:** Kodun dağıtılması.
- **`steps`:** Her iş içinde yapılan görevler.

---

## 5. Örnek: Node.js Uygulaması İçin CI/CD

### Aşamalar
1. **Kod Testi:** `npm test` ile test senaryolarını çalıştırma.
2. **Kod Derleme:** `npm run build` ile üretime hazır kod oluşturma.
3. **Dağıtım:** Üretim sunucusuna dağıtım.

```yaml
name: Node.js CI/CD

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Kod Çek
        uses: actions/checkout@v3

      - name: Node.js Kur
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Bağımlılıkları Yükle
        run: npm install

      - name: Test Çalıştır
        run: npm test

  deploy:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Dağıtımı Gerçekleştir
        run: echo "Uygulama başarıyla dağıtıldı!"
```

---

## 6. İpuçları ve En İyi Uygulamalar

1. **Küçük ve Tek Amaçlı İş Akışları Yazın:** Her iş akışı belirli bir görevi yerine getirmeli.
2. **Sık Testler Yapın:** Her değişikliği test ederek hataları erkenden bulun.
3. **Hata Yönetimi:** Hataları açık bir şekilde raporlayan bir sistem kurun.
4. **Gizli Bilgiler için `Secrets` Kullanın:** API anahtarları veya erişim bilgilerini GitHub `Secrets` içinde saklayın.
5. **Paralel Çalışma:** İşleri paralel çalıştırarak işlem süresini kısaltın.

---

## 7. Kaynaklar
- [GitHub Actions Resmi Dokümantasyonu](https://docs.github.com/actions)
- [CI/CD Prensipleri](https://martinfowler.com/articles/continuousIntegration.html)
- [YAML Söz Dizimi](https://yaml.org/)

---

## 8. Sonuç
Bu materyal, GitHub Actions ve CI/CD sürecini temel düzeyde anlamanıza yardımcı olacak şekilde hazırlanmıştır. Daha karmaşık senaryolar için kendi projelerinize uyarlamalar yapabilirsiniz. Kodlarınızı düzenli test edin, güvenli bir şekilde dağıtın ve otomasyonun gücünü keşfedin!

<hr />

# Simple CI/CD Project with Docker and GitHub Actions

Bu proje, GitHub Actions kullanarak bir Node.js uygulamasını CI/CD süreçleriyle test etme, build etme ve Docker ile çalıştırmayı içerir. Amaç, CI/CD sürecini öğrenmek ve uygulamayı Docker kapsayıcısında çalıştırarak test etmektir.

---

## Proje Yapısı

### Dosya ve Dizinler
- **index.js**: Basit bir Node.js uygulaması.
- **test/index.test.js**: Jest kullanılarak yazılmış bir test dosyası.
- **Dockerfile**: Uygulamanın Docker imajını oluşturmak için gerekli yapılandırma dosyası.
- **.github/workflows/main.yml**: CI/CD sürecini yöneten GitHub Actions workflow dosyası.

---

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js yüklü olmalı.
- Docker yüklü olmalı.

### Projeyi Klonlama ve Çalıştırma
```bash
git clone <REPO_URL>
cd simple-ci-cd-project
npm install
node index.js
