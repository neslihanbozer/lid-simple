import Seo from "@/components/Seo";

export default function Page() {
  return (
    <>
      <Seo title="Privacy Policy" description="Privacy Policy for lebenindeutschland-prep.com" canonical="https://lebenindeutschland-prep.com/privacy" />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
        <p>Bu sayfa gizlilik politikanız için bir iskelettir. Kendi metninizi ekleyin (çerezler, ölçüm, reklam, iletişim bilgileri, veri saklama).</p>
      </main>
    </>
  );
}