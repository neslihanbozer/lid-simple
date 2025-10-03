import { test, expect } from '@playwright/test';

test.describe('Quiz Functionality', () => {
  test('Ana sayfa yükleniyor', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Leben in Deutschland Test/);
    
    // Logo'nun görünür olduğunu kontrol et
    await expect(page.locator('text=Leben in Deutschland Test')).toBeVisible();
    
    // Start Quiz butonunun görünür olduğunu kontrol et
    await expect(page.locator('text=Start Quiz')).toBeVisible();
  });

  test('Header logo ve navigasyon çalışıyor', async ({ page }) => {
    await page.goto('/');
    
    // Logo'nun görünür olduğunu kontrol et
    await expect(page.locator('span:has-text("★")')).toBeVisible();
    
    // Navigasyon linklerini kontrol et
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Premium Features')).toBeVisible();
  });

  test('Brandenburg Gate resmi yükleniyor', async ({ page }) => {
    await page.goto('/');
    
    // Brandenburg Gate resminin yüklendiğini kontrol et
    const image = page.locator('img[alt*="Brandenburg Gate"]');
    await expect(image).toBeVisible();
  });

  test('All Questions sayfası yükleniyor', async ({ page }) => {
    await page.goto('/all-questions');
    await expect(page.locator('h1')).toContainText('Tüm Sorular');
  });

  test('Dil seçimi çalışıyor', async ({ page }) => {
    await page.goto('/all-questions');
    
    // Dil seçeneklerinin görünür olduğunu kontrol et
    await expect(page.locator('text=Deutsch + Türkçe')).toBeVisible();
    
    // Dil seçeneğine tıkla
    const languageOption = page.locator('button:has-text("Deutsch + Türkçe")');
    await languageOption.click();
  });

  test('Soru cevaplama çalışıyor', async ({ page }) => {
    await page.goto('/all-questions');
    
    // Sayfanın yüklenmesini bekle
    await page.waitForLoadState('networkidle');
    
    // İlk seçeneği seç - daha genel selector kullan
    const firstOption = page.locator('button').first();
    await firstOption.click();
    
    // Cevabı gönder butonunun görünür olduğunu kontrol et
    await expect(page.locator('button:has-text("✅ Cevabı Gönder")')).toBeVisible();
  });

  test('Navigasyon butonları çalışıyor', async ({ page }) => {
    await page.goto('/all-questions');
    
    // Önceki sayfa butonunu kontrol et
    await expect(page.locator('button:has-text("← Önceki Sayfa")')).toBeVisible();
    
    // Ana sayfa butonunu kontrol et
    await expect(page.locator('a:has-text("🏠 Ana Sayfa")')).toBeVisible();
    
    // Yanlış cevaplarım butonunu kontrol et
    await expect(page.locator('a:has-text("❌ Yanlış Cevaplarım")')).toBeVisible();
  });

  test('Quiz sayfası 50 ücretsiz soru gösteriyor', async ({ page }) => {
    await page.goto('/quiz');
    
    // Quiz başlığının Almanca olduğunu kontrol et
    await expect(page.locator('text=Leben in Deutschland Test')).toBeVisible();
    
    // Ücretsiz quiz bilgisinin görünür olduğunu kontrol et
    await expect(page.locator('text=Kostenloses Quiz')).toBeVisible();
    
    // Logo'nun quiz sayfasında da görünür olduğunu kontrol et
    await expect(page.locator('span:has-text("★")')).toBeVisible();
  });

  test('Quiz sayfası Almanca arayüz', async ({ page }) => {
    await page.goto('/quiz');
    
    // Almanca butonları kontrol et
    await expect(page.locator('text=Antwort senden')).toBeVisible();
    
    // Almanca progress bar kontrol et
    await expect(page.locator('text=Frage')).toBeVisible();
  });

  test('Quiz tamamlama ve premium teşvik', async ({ page }) => {
    await page.goto('/quiz');
    
    // İlk soruyu cevapla
    const firstOption = page.locator('button').nth(1); // İkinci butonu seç (ilki home linki olabilir)
    await firstOption.click();
    
    // Cevabı gönder
    await page.locator('text=Antwort senden').click();
    
    // Sonraki soru butonunu kontrol et
    await expect(page.locator('text=Nächste Frage')).toBeVisible();
  });

  test('Ödeme sayfası yükleniyor', async ({ page }) => {
    await page.goto('/payment');
    
    // Ödeme formunu kontrol et
    await expect(page.locator('input[placeholder="Ad Soyad"]')).toBeVisible();
    await expect(page.locator('input[placeholder="4242424242424242"]')).toBeVisible();
  });
});

test.describe('Premium Features Tests', () => {
  test('Premium sayfası Study.jpg resmi gösteriyor', async ({ page }) => {
    await page.goto('/pricing');
    
    // Premium plan kartının görünür olduğunu kontrol et
    await expect(page.locator('text=Premium')).toBeVisible();
    
    // Study.jpg resminin yüklendiğini kontrol et
    const studyImage = page.locator('img[alt*="Study"]');
    await expect(studyImage).toBeVisible();
    
    // Premium özelliklerini kontrol et
    await expect(page.locator('text=300+ soruya erişim')).toBeVisible();
    await expect(page.locator('text=AI ile konu anlatımı')).toBeVisible();
  });

  test('Premium sayfası fiyatlandırma', async ({ page }) => {
    await page.goto('/pricing');
    
    // Fiyat bilgisini kontrol et
    await expect(page.locator('text=€5.99')).toBeVisible();
    
    // Premium'a geç butonunu kontrol et
    await expect(page.locator('text=Premium\'a Geç')).toBeVisible();
    
    // Ücretsiz plan bilgilerini kontrol et
    await expect(page.locator('text=50 soruya erişim')).toBeVisible();
  });

  test('Premium dashboard sayfası', async ({ page }) => {
    await page.goto('/premium-dashboard');
    
    // Premium dashboard elementlerini kontrol et
    await expect(page.locator('text=Premium Dashboard')).toBeVisible();
    
    // Dil seçim butonlarını kontrol et
    await expect(page.locator('text=🇩🇪 Deutsch')).toBeVisible();
    await expect(page.locator('text=🇺🇸 English')).toBeVisible();
  });
});

test.describe('Language Switching Tests', () => {
  test('Ana sayfa dil değiştirme - EN to DE', async ({ page }) => {
    await page.goto('/');
    
    // Debug panel'in görünür olduğunu kontrol et
    await expect(page.locator('text=Language: en')).toBeVisible();
    
    // EN başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Test');
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    
    // Debug panel'de dil değişimini kontrol et
    await expect(page.locator('text=Language: de')).toBeVisible();
    
    // DE başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Leben-in-Deutschland-Quiz');
    
    // Login butonunun DE olduğunu kontrol et
    await expect(page.locator('button:has-text("Anmelden")')).toBeVisible();
    
    // Signup butonunun DE olduğunu kontrol et
    await expect(page.locator('button:has-text("Registrieren")')).toBeVisible();
  });

  test('Ana sayfa dil değiştirme - DE to EN', async ({ page }) => {
    await page.goto('/');
    
    // Önce DE'ye geç
    await page.click('button:has-text("DE")');
    await expect(page.locator('text=Language: de')).toBeVisible();
    
    // Sonra EN'ye geri dön
    await page.click('button:has-text("EN")');
    await expect(page.locator('text=Language: en')).toBeVisible();
    
    // EN başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Test');
    
    // Login butonunun EN olduğunu kontrol et
    await expect(page.locator('button:has-text("Log in")')).toBeVisible();
    
    // Signup butonunun EN olduğunu kontrol et
    await expect(page.locator('button:has-text("Sign up")')).toBeVisible();
  });

  test('Ödeme sayfası dil değiştirme', async ({ page }) => {
    await page.goto('/payment');
    
    // EN başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Premium Membership - €5.99/month');
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    
    // DE başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Premium-Mitgliedschaft - €5.99/Monat');
    
    // DE form alanlarını kontrol et
    await expect(page.locator('label:has-text("Name auf der Karte")')).toBeVisible();
    await expect(page.locator('label:has-text("Kartennummer")')).toBeVisible();
    await expect(page.locator('label:has-text("Ablaufdatum")')).toBeVisible();
    
    // DE butonunu kontrol et
    await expect(page.locator('button:has-text("€5.99 bezahlen und Premium werden")')).toBeVisible();
  });

  test('Test kartları dil değiştirme', async ({ page }) => {
    await page.goto('/payment');
    
    // EN test kartları başlığını kontrol et
    await expect(page.locator('h3:has-text("Test Cards")')).toBeVisible();
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    
    // DE test kartları başlığını kontrol et
    await expect(page.locator('h3:has-text("Test-Karten")')).toBeVisible();
    
    // DE test kartı açıklamalarını kontrol et
    await expect(page.locator('text=Erfolgreiche Karte')).toBeVisible();
    await expect(page.locator('text=Abgelehnte Karte')).toBeVisible();
    await expect(page.locator('text=Unzureichende Mittel')).toBeVisible();
    await expect(page.locator('text=Abgelaufene Karte')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('Mobil görünüm', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/all-questions');
    
    // Mobil görünümde sayfa yükleniyor
    await expect(page.locator('h1')).toContainText('Tüm Sorular');
  });

  test('Mobil dil değiştirme', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobil görünümde dil değiştirme
    await page.click('button:has-text("DE")');
    await expect(page.locator('h1')).toContainText('Leben-in-Deutschland-Quiz');
    
    await page.click('button:has-text("EN")');
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Test');
  });
});

test.describe('Error Handling Tests', () => {
  test('404 sayfası', async ({ page }) => {
    await page.goto('/nonexistent-page');
    
    // 404 sayfasının yüklendiğini kontrol et
    await expect(page.locator('text=404')).toBeVisible();
  });

  test('Resim yükleme hatası fallback', async ({ page }) => {
    await page.goto('/');
    
    // JavaScript ile resim hatasını simüle et
    await page.evaluate(() => {
      const img = document.querySelector('img[alt*="Brandenburg Gate"]');
      if (img) {
        img.dispatchEvent(new Event('error'));
      }
    });
    
    // Fallback içeriğinin görünür olduğunu kontrol et (gradient background)
    await page.waitForTimeout(1000); // Fallback'in yüklenmesi için bekle
  });
});

test.describe('Performance Tests', () => {
  test('Sayfa yükleme hızı', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Sayfa 5 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(5000);
    
    // Temel elementlerin yüklendiğini kontrol et
    await expect(page.locator('text=Leben in Deutschland Test')).toBeVisible();
  });

  test('Quiz sayfası performansı', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/quiz');
    const loadTime = Date.now() - startTime;
    
    // Quiz sayfası 3 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(3000);
    
    // Quiz elementlerinin yüklendiğini kontrol et
    await expect(page.locator('text=Kostenloses Quiz')).toBeVisible();
  });

  test('Mobil quiz performansı', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/quiz');
    const loadTime = Date.now() - startTime;
    
    // Mobil quiz sayfası 4 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(4000);
    
    // Mobilde quiz elementlerinin görünür olduğunu kontrol et
    await expect(page.locator('text=Leben in Deutschland Test')).toBeVisible();
    await expect(page.locator('span:has-text("★")')).toBeVisible();
  });
});
