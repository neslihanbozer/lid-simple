import AdsenseSafe from '@/components/AdsenseSafe'

export default function BerlinFragenPage() {
  return (
    <>
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Berlin Fragen</h1>
        <p className="mb-6">
          Berlin eyaleti için özel sorular ve cevaplar burada bulunmaktadır.
        </p>
        <p className="mb-4">
          <a href="/quiz">Quiz</a> · <a href="/">Start</a>
        </p>
      </main>
      
      {/* AdSense Safe Component */}
      <AdsenseSafe />
    </>
  );
}
