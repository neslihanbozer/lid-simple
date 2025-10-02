import { test, expect } from '@playwright/test';

test.describe('Quiz Functionality', () => {
  test('Ana sayfa yükleniyor', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Leben in Deutschland Quiz/);
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

  test('Quiz sayfası premium kontrolü', async ({ page }) => {
    await page.goto('/quiz');
    
    // Premium gerekli mesajını kontrol et
    await expect(page.locator('text=Premium Gerekli')).toBeVisible();
  });

  test('Ödeme sayfası yükleniyor', async ({ page }) => {
    await page.goto('/payment');
    
    // Ödeme formunu kontrol et
    await expect(page.locator('input[placeholder="Ad Soyad"]')).toBeVisible();
    await expect(page.locator('input[placeholder="4242424242424242"]')).toBeVisible();
  });
});

test.describe('Language Switching Tests', () => {
  test('Ana sayfa dil değiştirme - EN to DE', async ({ page }) => {
    await page.goto('/');
    
    // Debug panel'in görünür olduğunu kontrol et
    await expect(page.locator('text=Language: en')).toBeVisible();
    
    // EN başlığını kontrol et
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Quiz');
    
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
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Quiz');
    
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
    await expect(page.locator('h1')).toContainText('Leben in Deutschland Quiz');
  });
});
