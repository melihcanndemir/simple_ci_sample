# 🚀 GitHub Actions ve CI/CD Projesi

Bu proje, GitHub Actions kullanarak bir Node.js uygulamasında CI/CD süreçlerinin nasıl uygulanacağını göstermek için hazırlanmıştır. Hem başlangıç seviyesi hem de ileri düzey kullanıcılar için kapsamlı bir kaynak sunmaktadır.

## 📑 İçindekiler

1. [Proje Hakkında](#-proje-hakkında)
2. [GitHub Actions Temelleri](#-github-actions-temelleri)
3. [Proje Yapısı](#-proje-yapısı)
4. [Kurulum ve Kullanım](#-kurulum-ve-kullanım)
5. [CI/CD Pipeline Detayları](#-cicd-pipeline-detayları)
6. [Test ve Geliştirme](#-test-ve-geliştirme)
7. [Best Practices](#-best-practices)
8. [Troubleshooting](#-troubleshooting)

## 🎯 Proje Hakkında

Bu proje şunları içerir:
- ✨ Basit bir Node.js web uygulaması
- 🧪 Jest ile yazılmış test senaryoları
- 🔄 GitHub Actions ile CI/CD pipeline
- 🐳 Docker entegrasyonu

## 🛠 GitHub Actions Temelleri

### Temel Kavramlar

#### Workflow Yapısı
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

#### Events (Olaylar)
```yaml
on:
  push:             # Push olayında tetiklen
  pull_request:     # PR olayında tetiklen
  schedule:         # Zamanlanmış çalışma
    - cron: '0 0 * * *'  # Her gece yarısı
```

#### Jobs ve Steps
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
```

## 📂 Proje Yapısı

```plaintext
project-root/
├── .github/
│   └── workflows/
│       └── main.yml      # 👈 CI/CD konfigürasyonu
├── src/
│   └── index.js          # 👈 Ana uygulama
├── test/
│   └── index.test.js     # 👈 Test dosyaları
├── package.json          # 👈 Proje bağımlılıkları
└── README.md            # 👈 Dokümantasyon
```

## 🚀 Kurulum ve Kullanım

### Ön Gereksinimler
- Node.js (v16+) 📦
- npm veya yarn 🧶
- Git 🔧

### Adım Adım Kurulum

1. **Projeyi Klonlayın:**
```bash
git clone <repo-url>
cd <proje-dizini>
```

2. **Bağımlılıkları Yükleyin:**
```bash
npm install
# veya
yarn install
```

3. **Testleri Çalıştırın:**
```bash
npm test
# veya
yarn test
```

4. **Uygulamayı Başlatın:**
```bash
npm start
# veya
yarn start
```

## 🔄 CI/CD Pipeline Detayları

### 1. Build ve Test Aşaması
```yaml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

### 2. Docker Build Aşaması
```yaml
  docker-build:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker image
        run: docker build -t simple-ci-cd-project:latest .

      - name: Test container
        run: |
          docker run -d -p 8080:3000 simple-ci-cd-project:latest
          curl -f http://localhost:8080
```

## 🧪 Test ve Geliştirme

### Jest Test Örneği
```javascript
// test/index.test.js
describe('Uygulama Testleri', () => {
  test('Temel matematik işlemi', () => {
    expect(2 + 2).toBe(4);
  });
});
```

### Test Komutları
```bash
# Tüm testleri çalıştır
npm test

# Watch modunda testleri çalıştır
npm test -- --watch

# Test coverage raporu
npm test -- --coverage
```

## 💡 Best Practices

### 1. Workflow Optimizasyonu
- ✅ Cache kullanımı
- ✅ Paralel job çalıştırma
- ✅ Conditional steps

```yaml
jobs:
  build:
    steps:
      - uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. Güvenlik Pratikleri
- 🔒 Secrets kullanımı
- 🔒 Environment variables
- 🔒 Branch protection

### 3. Docker Best Practices
- 📝 Multi-stage builds
- 📝 Layer optimizasyonu
- 📝 Security scanning

## 🔧 Troubleshooting

### Sık Karşılaşılan Hatalar

1. **Build Hataları**
```bash
# Node modüllerini temizleyin
rm -rf node_modules
npm install

# Cache'i temizleyin
npm cache clean --force
```

2. **Docker Hataları**
```bash
# Docker loglarını kontrol edin
docker logs <container-id>

# Docker sistemi temizleyin
docker system prune -a
```

### Debug İpuçları
- 🔍 GitHub Actions debug logging aktifleştirme
- 🔍 Workflow'da debug steps ekleme
- 🔍 Local Docker testing

## 📚 Yararlanılan Kaynaklar

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Docker Documentation](https://docs.docker.com)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

Made with ❤️ by Melih Can Demir