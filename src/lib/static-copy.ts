import type { Locale } from '@/lib/locale'

type Topic = {
  title: string
  copy: string
}

type SiteCopy = {
  home: {
    heroTitle: string
    heroBody: string
    heroCta: string
    latestTitle: string
    viewAll: string
  }
  meet: {
    heroTitle: string
    intro: string
    topicsTitle: string
    topics: Topic[]
    beyondTitle: string
    beyondNote: string
    instagramCta: string
    linkedInNote: string
    linkedInCta: string
    noteTitle: string
    noteBodyPrefix: string
    noteBodySuffix: string
    sourceCta: string
    noteSmall: string
  }
  thoughts: {
    title: string
    lead: string
  }
  recommendations: {
    lead: string
  }
  heroes: {
    lead: string
  }
  contact: {
    title: string
    firstNameLabel: string
    firstNamePlaceholder: string
    lastNameLabel: string
    lastNamePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messagePlaceholder: string
    send: string
  }
  disclaimer: {
    eyebrow: string
    title: string
    bylineName: string
    publishedOnPrefix: string
    publishedOnSuffix: string
    bylineDate: string
    intro: string
    headingNotProfessional: string
    notProfessionalLead: string
    notProfessionalItems: string[]
    responsibility: string
    headingAccuracy: string
    accuracy: string
    headingIP: string
    intellectualProperty: string
    headingContact: string
    contactLead: string
  }
  privacy: {
    eyebrow: string
    title: string
    bylineName: string
    publishedOnPrefix: string
    publishedOnSuffix: string
    bylineDate: string
    lastUpdated: string
    headingPrivacy: string
    privacyIntro: string[]
    headingCollected: string
    collected: {
      title: string
      body: string[]
    }[]
    headingNotCollected: string
    notCollected: string[]
    closing: string
  }
  article: {
    byLabel: string
    publishedOnPrefix: string
    publishedOnSuffix: string
  }
}

const copy: Record<Locale, SiteCopy> = {
  en: {
    home: {
      heroTitle: 'Hello World!',
      heroBody:
        'This is a new tech blog where I document observations and experiments from working with AI. The focus is on what I’m learning along the way.',
      heroCta: 'Read the first post',
      latestTitle: 'Latest writing',
      viewAll: 'View all',
    },
    meet: {
      heroTitle: 'Meet Ece',
      intro:
        'I work in tech and I’m currently carving my own path within it. I love experimenting with AI tools, and somewhere along the way, that curiosity turned into building this website through a bit of vibe coding. Writing helps me think, learn, and actually digest what I’m building, so I share what I learn as I go.',
      topicsTitle: 'What I write about',
      topics: [
        {
          title: 'AI Series',
          copy: 'The useful edges of understanding and building with AI.',
        },
        {
          title: 'Recommendations',
          copy: 'Books, tools, and things I keep around.',
        },
        {
          title: 'Heroes',
          copy: 'People who push me to think wider.',
        },
      ],
      beyondTitle: 'Beyond writing / Outside this page',
      beyondNote:
        'This site is mostly about how I think and what I build. If you’re curious about the more human, unfiltered side - everyday moments, side thoughts, and life in between - I share those over on Instagram.',
      instagramCta: 'Follow me on Instagram',
      linkedInNote:
        'For more professional conversations, work updates, and collaborations, I’m also on LinkedIn.',
      linkedInCta: 'Connect me on Linkedin',
      noteTitle: 'A small note',
      noteBodyPrefix:
        'This website started as a side project: built while experimenting with AI tools, learning by doing, and occasionally breaking things along the way. It’s built with a simple setup and hosted on',
      noteBodySuffix:
        '. I decided to open-source it in case it’s useful (or at least reassuring) for others building their own small corners on the internet.',
      sourceCta: 'View the source code on GitHub',
      noteSmall: 'Feel free to explore, fork, or borrow ideas.',
    },
    thoughts: {
      title: 'Writings',
      lead: 'This will be the articles page. Add your posts here when ready.',
    },
    recommendations: {
      lead: 'This page is work in progress. If you’re curious, check back later. :)',
    },
    heroes: {
      lead: 'Still thinking about this one. Some people take time to show up properly.',
    },
    contact: {
      title: 'Contact Me',
      firstNameLabel: 'First name',
      firstNamePlaceholder: 'First name',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Last name',
      emailLabel: 'Your email',
      emailPlaceholder: 'Email Address',
      messagePlaceholder: 'Send me your questions and feedback',
      send: 'Send',
    },
    disclaimer: {
      eyebrow: 'Eces Notes Website',
      title: 'Disclaimer',
      bylineName: 'By Ece Camci',
      publishedOnPrefix: 'published on ',
      publishedOnSuffix: '',
      bylineDate: 'Tuesday, Nov 24, 2015',
      intro:
        'The content on this website reflects my personal views and experiences. All writing here is for informational and educational purposes only.',
      headingNotProfessional: 'Not professional advice',
      notProfessionalLead: 'Nothing on this site should be considered:',
      notProfessionalItems: [
        'legal advice',
        'financial advice',
        'medical advice',
        'or a substitute for professional consultation',
      ],
      responsibility:
        'Any decisions you make based on the content are your own responsibility.',
      headingAccuracy: 'Accuracy and updates',
      accuracy:
        'I aim to be thoughtful and accurate, but information may change over time. Some posts reflect opinions at a specific moment. I reserve the right to update or revise content as my thinking evolves.',
      headingIP: 'Intellectual property',
      intellectualProperty:
        'Unless stated otherwise, all content on this site is my original work. You are welcome to quote short excerpts with proper attribution. Please do not reproduce full articles without permission.',
      headingContact: 'Contact',
      contactLead:
        'If you have questions about the content or its use, feel free to reach out:',
    },
    privacy: {
      eyebrow: 'Eces Notes Website',
      title: 'Privacy Policy',
      bylineName: 'By Ece Camci',
      publishedOnPrefix: 'published on ',
      publishedOnSuffix: '',
      bylineDate: 'Tuesday, Nov 24, 2015',
      lastUpdated: 'Last updated: January 2026',
      headingPrivacy: 'Privacy',
      privacyIntro: [
        'This is a personal website and writing space.',
        'I value privacy, including my own and yours. This page explains, in plain terms, what data (if any) is collected when you visit this site.',
      ],
      headingCollected: 'What information is collected',
      collected: [
        {
          title: 'Anonymous usage data',
          body: [
            'Like most websites, basic, aggregated traffic data may be collected (for example, page views or general location such as country).',
            'This data is used only to understand how the site is used and to improve it.',
          ],
        },
        {
          title: 'Email communication',
          body: [
            'If you choose to contact me via email, I will receive your email address and the information you share voluntarily.',
          ],
        },
      ],
      headingNotCollected: 'What is not collected',
      notCollected: [
        'No personal profiles',
        'No tracking across other websites',
        'No sale or sharing of personal data',
        'No targeted advertising',
      ],
      closing:
        'If analytics are used, they are lightweight and privacy-respecting.',
    },
    article: {
      byLabel: 'By Ece Çamcı',
      publishedOnPrefix: 'Published on ',
      publishedOnSuffix: '',
    },
  },
  tr: {
    home: {
      heroTitle: 'Merhaba Dünya!',
      heroBody:
        'Bu, yapay zekâ ile çalışırken yaptığım gözlemleri ve denemeleri paylaştığım yeni bir teknoloji blogu. Odak noktam, yolda öğrendiklerim.',
      heroCta: 'İlk yazıyı oku',
      latestTitle: 'Son yazılar',
      viewAll: 'Tümünü gör',
    },
    meet: {
      heroTitle: 'Ece ile Tanış',
      intro:
        'Teknoloji alanında çalışıyorum ve şu sıralar kendi yolumu çiziyorum. Yapay zekâ araçlarıyla denemeler yapmayı seviyorum ve bu merak bir noktada bu siteyi “vibe coding” ile kurmaya dönüştü. Yazmak, ne inşa ettiğimi düşünmemi, öğrenmemi ve sindirmemi sağlıyor; ben de öğrendiklerimi süreç boyunca paylaşıyorum.',
      topicsTitle: 'Neler hakkında yazıyorum',
      topics: [
        {
          title: 'AI Serisi',
          copy: 'Yapay zekâyı anlama ve inşa etmenin işe yarayan sınırları.',
        },
        {
          title: 'Öneriler',
          copy: 'Kitaplar, araçlar ve elimden düşürmediklerim.',
        },
        {
          title: 'İlham Aldıklarım',
          copy: 'Daha geniş düşünmemi sağlayan insanlar.',
        },
      ],
      beyondTitle: 'Yazıların ötesi / Bu sayfanın dışında',
      beyondNote:
        'Bu site çoğunlukla nasıl düşündüğüm ve neler inşa ettiğimle ilgili. Daha insani, filtrelenmemiş tarafı — günlük anlar, kısa düşünceler ve hayatın arası — merak ediyorsan Instagram’da paylaşıyorum.',
      instagramCta: 'Instagram’da takip et',
      linkedInNote:
        'Daha profesyonel sohbetler, iş güncellemeleri ve iş birlikleri için LinkedIn’de de varım.',
      linkedInCta: 'LinkedIn’de bağlantı kur',
      noteTitle: 'Küçük bir not',
      noteBodyPrefix:
        'Bu site bir yan proje olarak başladı: AI araçlarıyla deneyler yaparken, yaparak öğrenirken ve bazen de bir şeyleri bozarken inşa edildi. Basit bir kurulumla yapıldı ve',
      noteBodySuffix:
        ' üzerinde barındırılıyor. Kendi küçük köşelerini internette inşa edenlere faydalı (ya da en azından cesaret verici) olabileceğini düşünerek açık kaynak yapmaya karar verdim.',
      sourceCta: 'GitHub’da kaynak koda bak',
      noteSmall: 'İnceleyebilir, fork’layabilir ya da fikir alabilirsin.',
    },
    thoughts: {
      title: 'Yazılar',
      lead: 'Burası yazılar sayfası olacak. Hazır olunca yazıları buraya ekle.',
    },
    recommendations: {
      lead: 'Bu sayfa yapım aşamasında. Merak ediyorsan daha sonra tekrar bak. :)',
    },
    heroes: {
      lead: 'Bu konu üzerinde hâlâ düşünüyorum. Bazı insanlar zamanla kendini gösteriyor.',
    },
    contact: {
      title: 'Bana Ulaş',
      firstNameLabel: 'Ad',
      firstNamePlaceholder: 'Ad',
      lastNameLabel: 'Soyad',
      lastNamePlaceholder: 'Soyad',
      emailLabel: 'E-posta adresin',
      emailPlaceholder: 'E-posta adresi',
      messagePlaceholder: 'Sorularını ve geri bildirimini yaz',
      send: 'Gönder',
    },
    disclaimer: {
      eyebrow: 'Eces Notes Web Sitesi',
      title: 'Sorumluluk Reddi',
      bylineName: 'Ece Camci tarafından',
      publishedOnPrefix: '',
      publishedOnSuffix: ' tarihinde yayınlandı',
      bylineDate: '24 Kasım 2015, Salı',
      intro:
        'Bu sitedeki içerikler kişisel görüşlerimi ve deneyimlerimi yansıtır. Buradaki tüm yazılar yalnızca bilgilendirme ve eğitim amaçlıdır.',
      headingNotProfessional: 'Profesyonel tavsiye değildir',
      notProfessionalLead: 'Bu sitedeki hiçbir şey şu anlamlara gelmez:',
      notProfessionalItems: [
        'hukuki tavsiye',
        'finansal tavsiye',
        'tıbbi tavsiye',
        'veya profesyonel danışmanlık yerine geçer',
      ],
      responsibility:
        'İçeriğe dayanarak aldığınız kararların sorumluluğu size aittir.',
      headingAccuracy: 'Doğruluk ve güncellemeler',
      accuracy:
        'Doğru ve dikkatli olmaya çalışırım, ancak bilgiler zamanla değişebilir. Bazı yazılar belirli bir anın düşüncelerini yansıtır. İçerikleri güncelleme veya revize etme hakkımı saklı tutarım.',
      headingIP: 'Fikri mülkiyet',
      intellectualProperty:
        'Aksi belirtilmedikçe bu sitedeki tüm içerikler bana aittir. Kısa alıntıları uygun atıfla kullanabilirsiniz. Lütfen tam yazıları izinsiz çoğaltmayın.',
      headingContact: 'İletişim',
      contactLead:
        'İçerik veya kullanım hakkında soruların varsa bana yazabilirsin:',
    },
    privacy: {
      eyebrow: 'Eces Notes Web Sitesi',
      title: 'Gizlilik Politikası',
      bylineName: 'Ece Camci tarafından',
      publishedOnPrefix: '',
      publishedOnSuffix: ' tarihinde yayınlandı',
      bylineDate: '24 Kasım 2015, Salı',
      lastUpdated: 'Son güncelleme: Ocak 2026',
      headingPrivacy: 'Gizlilik',
      privacyIntro: [
        'Bu kişisel bir web sitesi ve yazı alanıdır.',
        'Kendi gizliliğimi ve seninkini önemsiyorum. Bu sayfa, siteyi ziyaret ettiğinde hangi verilerin (varsa) toplandığını sade bir şekilde açıklar.',
      ],
      headingCollected: 'Toplanan bilgiler',
      collected: [
        {
          title: 'Anonim kullanım verileri',
          body: [
            'Çoğu web sitesinde olduğu gibi, temel ve toplulaştırılmış trafik verileri toplanabilir (örneğin sayfa görüntüleme veya ülke gibi genel konum).',
            'Bu veriler yalnızca sitenin nasıl kullanıldığını anlamak ve iyileştirmek için kullanılır.',
          ],
        },
        {
          title: 'E-posta iletişimi',
          body: [
            'E-posta ile iletişime geçmeyi seçersen, e-posta adresini ve gönüllü olarak paylaştığın bilgileri alırım.',
          ],
        },
      ],
      headingNotCollected: 'Toplanmayanlar',
      notCollected: [
        'Kişisel profilleme yok',
        'Diğer sitelerde takip yok',
        'Kişisel verilerin satılması veya paylaşılması yok',
        'Hedefli reklam yok',
      ],
      closing:
        'Analitik kullanılıyorsa, hafif ve gizlilik odaklıdır.',
    },
    article: {
      byLabel: 'Ece Çamcı tarafından',
      publishedOnPrefix: '',
      publishedOnSuffix: ' tarihinde yayınlandı',
    },
  },
}

export const getCopy = (locale: Locale) => copy[locale]
