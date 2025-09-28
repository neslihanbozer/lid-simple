import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isPremium) {
      return NextResponse.json(
        { message: 'Bu özellik sadece premium üyeler için' },
        { status: 403 }
      )
    }

    const { question, topic, language = 'tr' } = await request.json()

    // AI konu anlatımı simülasyonu (gerçek AI entegrasyonu için OpenAI API kullanılabilir)
    const explanations = {
      'tr': {
        'Geschichte': `Alman tarihi hakkında detaylı bilgi: ${question}. Bu konu Almanya'nın geçmişini, önemli olayları ve kültürel gelişimini kapsar.`,
        'Politik': `Alman politik sistemi hakkında: ${question}. Bu konu federal yapı, seçim sistemi ve demokratik kurumları içerir.`,
        'Gesellschaft': `Alman toplumu hakkında: ${question}. Bu konu sosyal yapı, değerler ve yaşam tarzını kapsar.`,
        'Integration': `Entegrasyon süreci hakkında: ${question}. Bu konu göç, vatandaşlık ve toplumsal uyumu içerir.`
      },
      'de': {
        'Geschichte': `Detaillierte Informationen zur deutschen Geschichte: ${question}. Dieses Thema umfasst die Vergangenheit Deutschlands, wichtige Ereignisse und kulturelle Entwicklung.`,
        'Politik': `Über das deutsche politische System: ${question}. Dieses Thema umfasst die föderale Struktur, das Wahlsystem und demokratische Institutionen.`,
        'Gesellschaft': `Über die deutsche Gesellschaft: ${question}. Dieses Thema umfasst soziale Struktur, Werte und Lebensstil.`,
        'Integration': `Über den Integrationsprozess: ${question}. Dieses Thema umfasst Migration, Staatsbürgerschaft und gesellschaftliche Integration.`
      },
      'en': {
        'Geschichte': `Detailed information about German history: ${question}. This topic covers Germany's past, important events and cultural development.`,
        'Politik': `About the German political system: ${question}. This topic covers federal structure, electoral system and democratic institutions.`,
        'Gesellschaft': `About German society: ${question}. This topic covers social structure, values and lifestyle.`,
        'Integration': `About the integration process: ${question}. This topic covers migration, citizenship and social integration.`
      }
    }

    const explanation = explanations[language as keyof typeof explanations]?.[topic as keyof typeof explanations['tr']] || 
                      `Konu hakkında detaylı açıklama: ${question}`

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
