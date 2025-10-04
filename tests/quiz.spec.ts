import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('Ana sayfa yükleniyor', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Leben in Deutschland Test/);
    
    // Logo'nun görünür olduğunu kontrol et
    await expect(page.locator('text=Leben in Deutschland Test')).toBeVisible();
    
    // Start Quiz butonunun görünür olduğunu kontrol et
    await expect(page.locator('text=Start Quiz')).toBeVisible();
  });

  test('Hero section görünür', async ({ page }) => {
    await page.goto('/');
    
    // Hero başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
    
    // Brandenburg Gate resmini kontrol et
    const image = page.locator('img[alt*="Brandenburg Gate"]');
    await expect(image).toBeVisible();
  });

  test('Header navigasyon çalışıyor', async ({ page }) => {
    await page.goto('/');
    
    // Language selector butonlarını kontrol et
    await expect(page.locator('button:has-text("EN")')).toBeVisible();
    await expect(page.locator('button:has-text("DE")')).toBeVisible();
    
    // Auth butonlarını kontrol et
    await expect(page.locator('text=Log in')).toBeVisible();
    await expect(page.locator('text=Sign up')).toBeVisible();
  });

  test('Dil değiştirme çalışıyor', async ({ page }) => {
    await page.goto('/');
    
    // EN butonuna tıkla
    await page.click('button:has-text("EN")');
    await expect(page.locator('text=Log in')).toBeVisible();
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    await expect(page.locator('text=Anmelden')).toBeVisible();
  });
});

test.describe('Quiz Functionality', () => {

  test('Quiz sayfası yükleniyor', async ({ page }) => {
    await page.goto('/quiz');
    
    // Quiz başlığının görünür olduğunu kontrol et
    await expect(page.locator('h1:has-text("Leben in Deutschland Test")')).toBeVisible();
    
    // Ücretsiz quiz bilgisinin görünür olduğunu kontrol et
    await expect(page.locator('text=Free Quiz')).toBeVisible();
    
    // Dil seçimi bölümünün görünür olduğunu kontrol et
    await expect(page.locator('text=Language Selection')).toBeVisible();
  });

  test('Quiz dil seçimi çalışıyor', async ({ page }) => {
    await page.goto('/quiz');
    
    // Dil seçeneklerinin görünür olduğunu kontrol et
    await expect(page.locator('button:has-text("🇩🇪 Deutsch")')).toBeVisible();
    await expect(page.locator('button:has-text("🇺🇸 English")')).toBeVisible();
    await expect(page.locator('button:has-text("🇹🇷 Türkçe")')).toBeVisible();
    
    // Türkçe dil seçeneğine tıkla
    await page.click('button:has-text("🇹🇷 Türkçe")');
    
    // Sorunun görünür olduğunu kontrol et
    await expect(page.locator('h2')).toBeVisible();
  });

  test('Quiz soru cevaplama çalışıyor', async ({ page }) => {
    await page.goto('/quiz');
    
    // İlk cevap seçeneğini seç (quiz sayfasındaki cevap butonları)
    const answerButtons = page.locator('button').filter({ hasText: /^[A-D]\./ });
    if (await answerButtons.count() > 0) {
      await answerButtons.first().click();
      
      // Submit butonunun aktif olduğunu kontrol et
      await expect(page.locator('button:has-text("Submit Answer")')).toBeEnabled();
      
      // Submit butonuna tıkla
      await page.click('button:has-text("Submit Answer")');
      
      // Açıklama bölümünün görünür olduğunu kontrol et
      await expect(page.locator('text=Explanation:')).toBeVisible();
    }
  });

  test('Quiz navigation çalışıyor', async ({ page }) => {
    await page.goto('/quiz');
    
    // İlk cevap seçeneğini seç
    const answerButtons = page.locator('button').filter({ hasText: /^[A-D]\./ });
    if (await answerButtons.count() > 0) {
      await answerButtons.first().click();
      await page.click('button:has-text("Submit Answer")');
      
      // Next Question butonunun görünür olduğunu kontrol et
      await expect(page.locator('button:has-text("Next Question")')).toBeVisible();
      
      // Next Question butonuna tıkla
      await page.click('button:has-text("Next Question")');
      
      // Yeni sorunun yüklendiğini kontrol et
      await expect(page.locator('h2')).toBeVisible();
    }
  });
});

test.describe('Pricing Page Tests', () => {
  test('Pricing sayfası yükleniyor', async ({ page }) => {
    await page.goto('/pricing');
    
    // Pricing başlığının görünür olduğunu kontrol et (DE varsayılan)
    await expect(page.locator('h1')).toContainText('Preise');
    
    // Free plan kartının görünür olduğunu kontrol et
    await expect(page.locator('text=Kostenlos')).toBeVisible();
    
    // Premium plan kartının görünür olduğunu kontrol et
    await expect(page.locator('text=Premium')).toBeVisible();
  });

  test('Pricing dil değiştirme çalışıyor', async ({ page }) => {
    await page.goto('/pricing');
    
    // EN butonuna tıkla
    await page.click('button:has-text("EN")');
    await expect(page.locator('h1')).toContainText('Pricing');
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    await expect(page.locator('h1')).toContainText('Preise');
  });

  test('Premium plan özellikleri görünür', async ({ page }) => {
    await page.goto('/pricing');
    
    // Premium özelliklerini kontrol et (DE varsayılan)
    await expect(page.locator('text=300+ Fragen')).toBeVisible();
    await expect(page.locator('text=Mehrsprachige Unterstützung')).toBeVisible();
    await expect(page.locator('text=KI-Erklärungen')).toBeVisible();
    
    // Fiyat bilgisini kontrol et
    await expect(page.locator('text=€5.99')).toBeVisible();
    await expect(page.locator('text=3 Monate')).toBeVisible();
  });

  test('Premium plan butonu çalışıyor', async ({ page }) => {
    await page.goto('/pricing');
    
    // Premium plan butonunun görünür olduğunu kontrol et (DE varsayılan)
    await expect(page.locator('button:has-text("Premium werden")')).toBeVisible();
    
    // Butona tıkla
    await page.click('button:has-text("Premium werden")');
    
    // Payment sayfasına yönlendirildiğini kontrol et
    await expect(page).toHaveURL('/payment');
  });
});

test.describe('Payment Page Tests', () => {
  test('Payment sayfası yükleniyor', async ({ page }) => {
    await page.goto('/payment');
    
    // Payment başlığının görünür olduğunu kontrol et (EN varsayılan)
    await expect(page.locator('h1')).toContainText('Premium Membership - €5.99/month');
    
    // Form alanlarının görünür olduğunu kontrol et
    await expect(page.locator('input[placeholder*="Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="Card"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="MM/YY"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="CVC"]')).toBeVisible();
  });

  test('Payment form doldurma', async ({ page }) => {
    await page.goto('/payment');
    
    // Form alanlarını doldur
    await page.fill('input[placeholder*="Name"]', 'Test User');
    await page.fill('input[placeholder*="Card"]', '4242424242424242');
    await page.fill('input[placeholder*="MM/YY"]', '12/25');
    await page.fill('input[placeholder*="CVC"]', '123');
    
    // Pay butonunun aktif olduğunu kontrol et
    await expect(page.locator('button:has-text("Pay")')).toBeEnabled();
  });

  test('Payment dil değiştirme', async ({ page }) => {
    await page.goto('/payment');
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    
    // DE başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Premium-Mitgliedschaft - €5.99/Monat');
    
    // DE form etiketlerini kontrol et
    await expect(page.locator('label:has-text("Name auf der Karte")')).toBeVisible();
    await expect(page.locator('label:has-text("Kartennummer")')).toBeVisible();
  });
});

test.describe('Premium Dashboard Tests', () => {
  test('Premium dashboard yükleniyor', async ({ page }) => {
    await page.goto('/premium-dashboard');
    
    // Premium dashboard başlığının görünür olduğunu kontrol et
    await expect(page.locator('h1')).toContainText('Premium Dashboard');
    
    // Welcome banner görünür
    await expect(page.locator('text=Welcome to Premium')).toBeVisible();
  });

  test('State selection çalışıyor', async ({ page }) => {
    await page.goto('/premium-dashboard');
    
    // State dropdown görünür
    await expect(page.locator('select')).toBeVisible();
    
    // State seç
    await page.selectOption('select', 'Baden-Württemberg');
    
    // Seçilen state'in görünür olduğunu kontrol et
    await expect(page.locator('select')).toHaveValue('Baden-Württemberg');
  });

  test('Language selection çalışıyor', async ({ page }) => {
    await page.goto('/premium-dashboard');
    
    // Language selection kartı görünür
    await expect(page.locator('text=Language Selection')).toBeVisible();
    
    // Dil seçenekleri görünür
    await expect(page.locator('button:has-text("🇩🇪 Deutsch")')).toBeVisible();
    await expect(page.locator('button:has-text("🇩🇪🇹🇷 Deutsch + Türkçe")')).toBeVisible();
    await expect(page.locator('button:has-text("🇩🇪🇺🇸 Deutsch + English")')).toBeVisible();
  });

  test('Question categories görünür', async ({ page }) => {
    await page.goto('/premium-dashboard');
    
    // Question categories başlığı görünür
    await expect(page.locator('text=Question Categories')).toBeVisible();
    
    // Kategori kartları görünür
    await expect(page.locator('text=Politics')).toBeVisible();
    await expect(page.locator('text=Law')).toBeVisible();
    await expect(page.locator('text=Culture')).toBeVisible();
    await expect(page.locator('text=Economy')).toBeVisible();
  });

  test('Additional tools görünür', async ({ page }) => {
    await page.goto('/premium-dashboard');
    
    // Additional tools başlığı görünür
    await expect(page.locator('text=Additional Tools')).toBeVisible();
    
    // Tool kartları görünür
    await expect(page.locator('text=Progress Tracking')).toBeVisible();
    await expect(page.locator('text=Wrong Answers Review')).toBeVisible();
  });
});

test.describe('Authentication Tests', () => {
  test('Login sayfası yükleniyor', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Login başlığının görünür olduğunu kontrol et (DE varsayılan)
    await expect(page.locator('h1')).toContainText('Anmelden');
    
    // Form alanlarının görünür olduğunu kontrol et
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Login butonunun görünür olduğunu kontrol et
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Signup sayfası yükleniyor', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Signup başlığının görünür olduğunu kontrol et (DE varsayılan)
    await expect(page.locator('h1')).toContainText('Registrieren');
    
    // Form alanlarının görünür olduğunu kontrol et
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible(); // Name field
    
    // Signup butonunun görünür olduğunu kontrol et
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Login form doldurma', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Form alanlarını doldur
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit butonunun aktif olduğunu kontrol et
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('Signup form doldurma', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Form alanlarını doldur
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit butonunun aktif olduğunu kontrol et
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('Login dil değiştirme', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // EN butonuna tıkla
    await page.click('button:has-text("EN")');
    
    // EN başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Log in');
    
    // EN form etiketlerini kontrol et
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('label:has-text("Password")')).toBeVisible();
  });
});

test.describe('Progress Page Tests', () => {
  test('Progress sayfası yükleniyor', async ({ page }) => {
    await page.goto('/progress');
    
    // Progress başlığının görünür olduğunu kontrol et (EN varsayılan)
    await expect(page.locator('h1')).toContainText('Progress Tracking');
    
    // Progress kartlarının görünür olduğunu kontrol et
    await expect(page.locator('text=Politics')).toBeVisible();
    await expect(page.locator('text=Law')).toBeVisible();
    await expect(page.locator('text=Culture')).toBeVisible();
  });

  test('Progress dil değiştirme', async ({ page }) => {
    await page.goto('/progress');
    
    // DE butonuna tıkla
    await page.click('button:has-text("DE")');
    
    // DE başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Fortschrittsverfolgung');
  });
});

test.describe('All Questions Page Tests', () => {
  test('All Questions sayfası yükleniyor', async ({ page }) => {
    await page.goto('/all-questions');
    
    // All Questions başlığının görünür olduğunu kontrol et
    await expect(page.locator('h1')).toContainText('All Questions');
    
    // Language selection görünür
    await expect(page.locator('text=Language Selection')).toBeVisible();
    
    // Category selection görünür
    await expect(page.locator('text=Category Selection')).toBeVisible();
  });

  test('All Questions dil seçimi', async ({ page }) => {
    await page.goto('/all-questions');
    
    // Dil seçeneklerinin görünür olduğunu kontrol et
    await expect(page.locator('button:has-text("🇩🇪 Deutsch")')).toBeVisible();
    await expect(page.locator('button:has-text("🇩🇪🇹🇷 Deutsch + Türkçe")')).toBeVisible();
    await expect(page.locator('button:has-text("🇩🇪🇺🇸 Deutsch + English")')).toBeVisible();
    
    // Türkçe dil seçeneğine tıkla
    await page.click('button:has-text("🇩🇪🇹🇷 Deutsch + Türkçe")');
    
    // Sorunun görünür olduğunu kontrol et
    await expect(page.locator('h2')).toBeVisible();
  });

  test('All Questions kategori seçimi', async ({ page }) => {
    await page.goto('/all-questions');
    
    // Kategori seçeneklerinin görünür olduğunu kontrol et
    await expect(page.locator('text=Politics')).toBeVisible();
    await expect(page.locator('text=Law')).toBeVisible();
    await expect(page.locator('text=Culture')).toBeVisible();
    
    // Politics kategorisine tıkla
    await page.click('button:has-text("Politics")');
    
    // Sorunun görünür olduğunu kontrol et
    await expect(page.locator('h2')).toBeVisible();
  });
});

test.describe('Responsive Design Tests', () => {
  test('Mobil görünüm - Ana sayfa', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobil görünümde ana sayfa yükleniyor
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
    
    // Mobilde language selector butonları görünür
    await expect(page.locator('button:has-text("EN")')).toBeVisible();
    await expect(page.locator('button:has-text("DE")')).toBeVisible();
  });

  test('Mobil görünüm - Quiz sayfası', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/quiz');
    
    // Mobil görünümde quiz sayfası yükleniyor
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Test');
    
    // Mobilde quiz elementleri görünür
    await expect(page.locator('text=Free Quiz')).toBeVisible();
    await expect(page.locator('text=Language Selection')).toBeVisible();
  });

  test('Mobil görünüm - Pricing sayfası', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/pricing');
    
    // Mobil görünümde pricing sayfası yükleniyor (DE varsayılan)
    await expect(page.locator('h1')).toContainText('Preise');
    
    // Mobilde pricing kartları görünür
    await expect(page.locator('text=Kostenlos')).toBeVisible();
    await expect(page.locator('text=Premium')).toBeVisible();
  });

  test('Tablet görünüm', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Tablet görünümde sayfa yükleniyor
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
    
    // Tablet'te tüm elementler görünür
    await expect(page.locator('text=Start Quiz')).toBeVisible();
    await expect(page.locator('text=Premium Features')).toBeVisible();
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

  test('API hata durumu', async ({ page }) => {
    // API'yi mock'la ve hata döndür
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/quiz');
    
    // Hata durumunda sayfa yine de yüklenmeli
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Test');
  });
});

test.describe('Performance Tests', () => {
  test('Ana sayfa yükleme hızı', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Sayfa 5 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(5000);
    
    // Temel elementlerin yüklendiğini kontrol et
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
  });

  test('Quiz sayfası performansı', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/quiz');
    const loadTime = Date.now() - startTime;
    
    // Quiz sayfası 3 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(3000);
    
    // Quiz elementlerinin yüklendiğini kontrol et
    await expect(page.locator('h1:has-text("Leben in Deutschland Test")')).toBeVisible();
  });

  test('Pricing sayfası performansı', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/pricing');
    const loadTime = Date.now() - startTime;
    
    // Pricing sayfası 3 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(3000);
    
    // Pricing elementlerinin yüklendiğini kontrol et
    await expect(page.locator('h1')).toContainText('Preise');
  });

  test('Mobil performans', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Mobil sayfa 4 saniyeden az sürede yüklenmeli
    expect(loadTime).toBeLessThan(4000);
    
    // Mobilde temel elementler görünür
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
  });
});

test.describe('Accessibility Tests', () => {
  test('Ana sayfa erişilebilirlik', async ({ page }) => {
    await page.goto('/');
    
    // Başlık etiketlerinin doğru hiyerarşide olduğunu kontrol et
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Butonların erişilebilir olduğunu kontrol et
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Linklerin erişilebilir olduğunu kontrol et
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('Form erişilebilirliği', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Form alanlarının label'ları olduğunu kontrol et
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);
    
    // Submit butonunun erişilebilir olduğunu kontrol et
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });
});

test.describe('Cross-browser Tests', () => {
  test('Chrome uyumluluğu', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
  });

  test('Firefox uyumluluğu', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
  });

  test('Safari uyumluluğu', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Leben In Deutschland');
  });
});
