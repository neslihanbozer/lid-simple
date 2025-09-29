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

test.describe('Responsive Design', () => {
  test('Mobil görünüm', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/all-questions');
    
    // Mobil görünümde sayfa yükleniyor
    await expect(page.locator('h1')).toContainText('Tüm Sorular');
  });
});
