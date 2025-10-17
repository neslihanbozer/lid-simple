import Seo from "@/components/Seo";

export default function BerlinFragenPage() {
  return (
    <>
      <Seo
        title="Berlin Fragen - Leben in Deutschland Test"
        description="Berlin eyaleti için özel sorular ve cevaplar"
        canonical="https://lebenindeutschland-prep.com/bundeslaender/berlin-fragen"
        breadcrumbs={[
          { name: "Start", item: "https://lebenindeutschland-prep.com/" },
          { name: "Berlin Fragen", item: "https://lebenindeutschland-prep.com/bundeslaender/berlin-fragen" }
        ]}
      />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Berlin Fragen</h1>
        <p className="mb-6">
          Berlin eyaleti için özel sorular ve cevaplar burada bulunmaktadır.
        </p>
        <p className="mb-4">
          <a href="/quiz">Quiz</a> · <a href="/">Start</a>
        </p>
      </main>
    </>
  );
}
