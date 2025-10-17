export const metadata = { 
  robots: { index: false, follow: false } 
};

export default function Page() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Impressum</h1>
      <p>Buraya yasal işletme/iletişim bilgileriniz (ad, adres, e-posta) gelecek. Almanya için zorunludur.</p>
    </main>
  );
}