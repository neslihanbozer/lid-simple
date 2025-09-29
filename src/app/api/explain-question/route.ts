import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Session kontrolü kaldırıldı - test için
    const { topic, language = 'tr' } = await request.json()

    // AI konu anlatımı simülasyonu
    const explanations: { [key: string]: { [key: string]: string } } = {
      'Almanya Tarihi': {
        de: 'Die deutsche Geschichte reicht von der Römerzeit bis heute. 1871 wurde das Deutsche Reich gegründet, 1918 die Weimarer Republik, 1933-1945 die NS-Zeit, 1949 die Bundesrepublik Deutschland. 1990 vereinigten sich Ost- und Westdeutschland.',
        'de-tr': 'Almanya tarihi, Roma İmparatorluğu döneminden günümüze kadar uzanan zengin bir geçmişe sahiptir. 1871\'de Alman İmparatorluğu kurulmuş, 1918\'de Weimar Cumhuriyeti, 1933-1945 arası Nazi dönemi, 1949\'da Federal Almanya Cumhuriyeti kurulmuştur. 1990\'da Doğu ve Batı Almanya birleşmiştir.',
        'de-en': 'German history spans from Roman times to today. The German Empire was founded in 1871, the Weimar Republic in 1918, the Nazi period from 1933-1945, and the Federal Republic of Germany in 1949. East and West Germany reunited in 1990.',
        'de-fr': 'L\'histoire allemande s\'étend de l\'époque romaine à nos jours. L\'Empire allemand fut fondé en 1871, la République de Weimar en 1918, la période nazie de 1933-1945, et la République fédérale d\'Allemagne en 1949. L\'Allemagne de l\'Est et de l\'Ouest se sont réunies en 1990.',
        'de-es': 'La historia alemana se extiende desde la época romana hasta hoy. El Imperio alemán fue fundado en 1871, la República de Weimar en 1918, el período nazi de 1933-1945, y la República Federal de Alemania en 1949. Alemania Oriental y Occidental se reunificaron en 1990.',
        'de-ar': 'تاريخ ألمانيا يمتد من العصر الروماني إلى اليوم. تأسست الإمبراطورية الألمانية في 1871، وجمهورية فايمار في 1918، والفترة النازية من 1933-1945، وجمهورية ألمانيا الاتحادية في 1990. توحدت ألمانيا الشرقية والغربية في 1990.'
      },
      'Alman Siyaseti': {
        de: 'Deutschland ist eine Bundesrepublik mit 16 Ländern. Es gibt ein Zweikammersystem mit Bundestag und Bundesrat. Der Bundeskanzler ist Regierungschef. Es gibt ein Mehrparteiensystem.',
        'de-tr': 'Almanya federal bir cumhuriyettir. 16 eyaletten oluşur. Federal Meclis (Bundestag) ve Federal Konsey (Bundesrat) olmak üzere iki meclisli bir sistem vardır. Başbakan (Bundeskanzler) hükümetin başıdır. Çok partili demokratik sistem vardır.',
        'de-en': 'Germany is a federal republic with 16 states. It has a bicameral system with Bundestag and Bundesrat. The Chancellor is head of government. There is a multi-party system.',
        'de-fr': 'L\'Allemagne est une république fédérale avec 16 Länder. Il y a un système bicaméral avec le Bundestag et le Bundesrat. Le Chancelier est le chef du gouvernement. Il y a un système multipartite.',
        'de-es': 'Alemania es una república federal con 16 estados. Tiene un sistema bicameral con Bundestag y Bundesrat. El Canciller es el jefe del gobierno. Hay un sistema multipartidista.',
        'de-ar': 'ألمانيا جمهورية اتحادية تضم 16 ولاية. لديها نظام برلماني ثنائي مع البوندستاغ والبوندسرات. المستشار هو رئيس الحكومة. يوجد نظام متعدد الأحزاب.'
      },
      'Toplumsal Değerler': {
        tr: 'Alman toplumunda önemli değerler: demokrasi, insan hakları, eşitlik, hoşgörü, dayanışma, çevre koruma, eğitim ve kültür. Aile değerleri, iş ahlakı ve toplumsal sorumluluk önemlidir. Çeşitliliğe saygı ve entegrasyon değerlidir.',
        de: 'Wichtige Werte in der deutschen Gesellschaft: Demokratie, Menschenrechte, Gleichheit, Toleranz, Solidarität, Umweltschutz, Bildung und Kultur. Familienwerte, Arbeitsethik und gesellschaftliche Verantwortung sind wichtig. Respekt vor Vielfalt und Integration sind wertvoll.',
        en: 'Important values in German society: democracy, human rights, equality, tolerance, solidarity, environmental protection, education and culture. Family values, work ethic and social responsibility are important. Respect for diversity and integration are valuable.',
        ar: 'القيم المهمة في المجتمع الألماني: الديمقراطية، حقوق الإنسان، المساواة، التسامح، التضامن، حماية البيئة، التعليم والثقافة. قيم الأسرة، أخلاقيات العمل والمسؤولية الاجتماعية مهمة. احترام التنوع والاندماج ثمين.'
      },
      'Entegrasyon Süreci': {
        tr: 'Entegrasyon süreci, yeni gelenlerin Alman toplumuna uyum sağlaması için gerekli adımları içerir: dil öğrenme, kültürel değerleri anlama, iş bulma, eğitim alma, sosyal ilişkiler kurma. BAMF, Volkshochschule ve diğer kurumlar bu süreçte yardımcı olur.',
        de: 'Der Integrationsprozess umfasst notwendige Schritte für die Anpassung neuer Zuwanderer an die deutsche Gesellschaft: Sprachenlernen, kulturelle Werte verstehen, Arbeit finden, Bildung erhalten, soziale Beziehungen aufbauen. BAMF, Volkshochschule und andere Institutionen helfen dabei.',
        en: 'The integration process includes necessary steps for newcomers to adapt to German society: learning the language, understanding cultural values, finding work, getting education, building social relationships. BAMF, Volkshochschule and other institutions help in this process.',
        ar: 'عملية الاندماج تشمل الخطوات اللازمة للمهاجرين الجدد للتكيف مع المجتمع الألماني: تعلم اللغة، فهم القيم الثقافية، إيجاد العمل، الحصول على التعليم، بناء العلاقات الاجتماعية. BAMF وVolkshochschule ومؤسسات أخرى تساعد في هذه العملية.'
      }
    }

    const explanation = explanations[topic]?.[language] || explanations[topic]?.['tr'] || `Bu konu hakkında detaylı açıklama: ${topic}`

    return NextResponse.json({ 
      explanation,
      language,
      topic 
    })
  } catch (error) {
    console.error('AI explanation error:', error)
    return NextResponse.json(
      { message: 'Açıklama oluşturulamadı' },
      { status: 500 }
    )
  }
}
