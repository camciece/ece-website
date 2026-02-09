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
    intro: string[]
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
  }
  thoughts: {
    title: string
    lead: string
  }
  projects: {
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
    successMessage: string
    errorMessage: string
    successTitle: string
    successSubcopy: string
    backHome: string
    newMessage: string
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
    headingAI: string
    aiNote: string
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
  /*
  en: {
    home: {
      heroTitle: 'Merhaba',
      heroBody:
        'This is a new tech blog where I document observations and experiments from working with AI. The focus is on what I’m learning along the way. Hope you enjoy!',
      heroCta: 'Read the first post',
      latestTitle: 'Latest writing',
      viewAll: 'View all',
    },
    meet: {
      heroTitle: 'Meet Ece',
      intro: [
        'I work in tech and I’m currently carving my own path within it. I love experimenting with AI tools, and somewhere along the way, that curiosity turned into building this website through a bit of vibe coding.',
        'Writing helps me think, learn, and actually digest what I’m building, so I share what I learn as I go.',
      ],
      topicsTitle: 'What I write about',
      topics: [
        {
          title: 'AI Series',
          copy: 'The useful edges of understanding and building with AI.',
        },
        {
          title: 'Projects',
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
    },
    thoughts: {
      title: 'Writings',
      lead: 'This will be the articles page. Add your posts here when ready.',
    },
    projects: {
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
      successMessage: 'Thanks! Your message has been sent.',
      errorMessage: 'Something went wrong. Please try again.',
      successTitle: 'Message received!',
      successSubcopy: 'I will get back to you as soon as possible.',
      backHome: 'Back to home',
      newMessage: 'Send another message',
    },
    disclaimer: {
      eyebrow: "Ece's Notes Website",
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
      headingAI: 'AI and technical content',
      aiNote:
        'The AI examples, technical explanations, code snippets, and usage scenarios shared on this site are for experimentation and learning. Please evaluate them within your own context before applying them. They should not be used as the sole reference for production environments or critical decisions.',
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
  */
  tr: {
    home: {
      heroTitle: 'Hoşgeldiniz!',
      heroBody:
        'Burası yapay zekâ ve teknolojiyle çalışırken aldığım notları paylaştığım kişisel bir alan. Biraz teknik detaylar, biraz bu modern teknolojilerin neden önemli olduğu, nereye gittiğini ve etkilerini gelin birlikte düşünelim.',
      latestTitle: 'Son yazılar',
      viewAll: 'Tümünü gör',
      heroCta: 'İlk yazıyı oku',
    },
    meet: {
      heroTitle: 'Ece ile Tanışın',
      intro: [
        'Türkiye ve Hollanda’da endüstri ve sistem mühendisliği üzerine eğitim aldım. Çalıştığım zamanlarda teknoloji sektöründeyim; aralarda bilerek yavaşlayıp kendimle kalmayı, beni besleyen başka şeylere alan açmayı seviyorum. Altyapım gereği teknolojiye bakarken beni asıl ilgilendiren şey hep tekil çözümlerden çok sistemler, süreçler ve bunların gerçek hayatta nasıl karşılık bulduğu.',

        'Çalıştığım dönemlerde merakım gereği kamuda ve özel sektörde bulundum. Batı merkezli teknoloji şirketlerinde de çalıştım, Doğu kültürünün baskın olduğu yapılarda da. Bu geçişler teknolojiye farklı kültürler içinde nasıl üretildiği ve benimsendiğini görmemi bakmamı sağladı. Hiçbir zaman klasik anlamda kariyer kovalayan, kurumsal hayata kendini kaptırmış biri olmadım. Yaptığım şeyleri gerçekten ilgimi çektiği ve içime sindiği için yaptım. Yirmili yaşlarımın ortasında hayatımın 2 senesini solo traveler olarak dünyayı gezerek geçirdim. O yüzden sistemin tamamen dışında da değilim, tam içinde de. Bir yandan parçasıyım, bir yandan da gözlemcisiyim.',

        'Son birkaç senedir özellikle yapay zekâ tarafında çalışıyorum. Dürüst olmak gerekirse pandemiden sonra değişen dünyada bu alanda çalışmayı çok sevdim. Hem değişen çalışma şartları nedeniyle hem de bullshit’e daha az alan kalmasından dolayı.',

        'Arkadaşlarım çalışmadığım dönemlerde gezi, lifestyle ya da yeme içme gibi konularda bir blog açmam gerektiğini söylerdi. Ben de en sonunda gidip, uğruna yazılacak gerçekten bir şey var diyerek bir blog açtım. Bu blog, genel bir teknoloji blogu değil. Buradaki içerikler, teknolojiyle birebir temas ettiğim alanlardan besleniyor. Son dönemde ağırlıklı olarak yapay zekâ, daha önce üzerinde çalıştığım ve bugün çalışmakta olduğum projeler bu alanın önemli parçaları. Zaten bu site de yapay zekâ araçlarıyla denemeler yaparken, bir noktada vibe coding modunda ortaya çıktı. Sonra farketmeden benim için bir düşünme alanına dönüştü. Şu ara VS Code ve Codex’ten pek ayrılamıyorum. Gemini’yla görsel üretmeden duramaz hâle geldim. GenAI’yı en verimli kullandığım dönemlerden birindeyim.',

        'Yazmak, neyle uğraştığımı görmeme ve öğrendiklerimi sindirmeme yardımcı oluyor. Burada karşıma çıkanları, kafamda netleşenleri ve hâlâ netleşmeyenleri paylaşıyorum. Tamamlanmış cevaplardan çok, devam eden bir öğrenme sürecinin notları gibi düşünebilirsiniz.',

        'Herkese iyi okumalar. Geri bildirimlerinizi ve merak ettiklerinizi paylaşmaktan çekinmeyin.',
      ],
      topicsTitle: 'Neler hakkında yazıyorum',
      topics: [
        {
          title: 'AI Serisi',
          copy: 'Yapay zekânın nasıl çalıştığını ve uygulamalarını adım adım ele aldığım yazılar.',
        },
        {
          title: 'Projeler',
          copy: 'Farklı dönemlerde üzerinde çalıştığım ve hâlâ evrilen projeler.',
        },
        {
          title: 'İlham Aldıklarım',
          copy: 'Bana başka türlü düşünmeyi hatırlatan insanlar.',
        },
      ],
      beyondTitle: 'Beni başka nerelerde bulabilirsiniz',
      beyondNote:
        'Bu site düşünme ve yazma alanım. Günlük hayat, küçük notlar ve arada kalanlar için:',
      instagramCta: "Instagram'da beni bulun",
      linkedInNote: 'İş tarafı, güncellemeler ve profesyonel konular için:',
      linkedInCta: "Linkedin'den bağlanalım",
      noteTitle: 'Dipnot',
      noteBodyPrefix:
        'Bu sitenin kaynak kodu açık. Merak ediyorsan inceleyebilir, fork’layabilir ya da kendi projelerinde ilham olarak kullanabilirsin. Basit bir kurulumla inşa edildi ve Vercel üzerinde barındırılıyor.',
      noteBodySuffix:
        ' üzerinde barındırılıyor. Kendi küçük köşelerini internette inşa edenlere faydalı (ya da en azından cesaret verici) olabileceğini düşünerek açık kaynak yapmaya karar verdim.',
      sourceCta: 'GitHub’da kodu görebilirsiniz',
    },
    thoughts: {
      title: 'Yazılar',
      lead: 'Burası yazılar sayfası olacak. Hazır olunca yazıları buraya ekle.',
    },
    projects: {
      lead: 'Bu sayfa yapım aşamasında. Merak edersniz daha sonra tekrar bakın. :)',
    },
    heroes: {
      lead: 'Bu konu üzerinde hâlâ düşünüyorum. Kahramanlar hemen seçilmiyor.',
    },
    contact: {
      title: 'Bana ulaşabilirsiniz',
      firstNameLabel: 'Adınız',
      firstNamePlaceholder: 'Adınız',
      lastNameLabel: 'Soyadınız',
      lastNamePlaceholder: 'Soyadınız',
      emailLabel: 'E-posta adresiniz',
      emailPlaceholder: 'E-posta adresiniz',
      messagePlaceholder: 'Lütfen sorularınızı ve geri bildiriminizi yazın',
      send: 'Gönder',
      successMessage: 'Teşekkürler! Mesajınız gönderildi.',
      errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      successTitle: 'Mesajını aldım!',
      successSubcopy:
        'En kısa sürede (genellikle 24 saat içinde) sana dönüş yapacağım.',
      backHome: 'Ana Sayfaya Dön',
      newMessage: 'Yeni Mesaj Gönder',
    },
    disclaimer: {
      eyebrow: 'Eces Notes Web Sitesi',
      title: 'Sorumluluk Notu',
      bylineName: 'Ece Camci tarafından',
      publishedOnPrefix: '',
      publishedOnSuffix: ' tarihinde yayınlandı',
      bylineDate: '27 Ocak 2026',
      intro:
        'Bu sitedeki içerikler kişisel görüşlerimi ve deneyimlerimi yansıtır. Buradaki tüm yazılar yalnızca bilgilendirme ve öğrenme amaçlıdır.',
      headingNotProfessional: 'Profesyonel tavsiye değildir',
      notProfessionalLead: 'Bu sitedeki hiçbir içerik;',
      notProfessionalItems: [
        'hukuki tavsiye',
        'finansal tavsiye',
        'tıbbi tavsiye',
        'veya herhangi bir profesyonel danışmanlık yerine geçmez',
      ],
      responsibility:
        'Buradaki içeriklere dayanarak aldığınız kararların sorumluluğu size aittir.',
      headingAccuracy: 'Doğruluk ve güncellemeler',
      accuracy:
        'İçerikleri doğru ve güncel tutmaya özen gösteririm. Ancak teknoloji hızla değiştiği için bazı bilgiler zamanla geçerliliğini yitirebilir. Bazı yazılar belirli bir dönemdeki düşüncelerimi yansıtır. İçerikleri güncelleme, değiştirme veya kaldırma hakkımı saklı tutarım.',
      headingAI: 'Yapay zekâ ve teknik içerikler hakkında',
      aiNote:
        'Bu sitede paylaşılan yapay zekâ örnekleri, teknik anlatımlar, kod parçaları ve kullanım senaryoları deneme ve öğrenme amaçlıdır. Doğrudan uygulanmadan önce kendi koşullarınıza göre değerlendirilmelidir. Üretim ortamlarında ya da kritik kararlar öncesinde tek başına referans olarak kullanılmamalıdır.',
      headingIP: 'Fikri mülkiyet',
      intellectualProperty:
        'Aksi belirtilmedikçe bu sitedeki tüm içerikler bana aittir. Kısa alıntıları uygun atıfla kullanabilirsiniz. Lütfen tam yazıları izinsiz çoğaltmayın.',
      headingContact: 'İletişim',
      contactLead:
        'İçerik veya kullanım hakkında sorularınız olursa bana buradan yazabilirsiniz:',
    },
    privacy: {
      eyebrow: 'Eces Notes Web Sitesi',
      title: 'Gizlilik',
      bylineName: 'Ece Camci tarafından',
      publishedOnPrefix: '',
      publishedOnSuffix: ' tarihinde yayınlandı',
      bylineDate: '27 Ocak 2026',
      lastUpdated: 'Son güncelleme: Ocak 2026',
      headingPrivacy: 'Gizlilik',
      privacyIntro: [
        'Burası kişisel bir web sitesi ve yazı alanı.',
        'Kendi gizliliğimi önemsediğim gibi sizinkini de önemsiyorum. Bu sayfa, siteyi ziyaret ettiğinizde hangi verilerin (varsa) toplandığını açık ve sade bir şekilde anlatır.',
      ],
      headingCollected: 'Toplanan bilgiler',
      collected: [
        {
          title: 'Anonim kullanım verileri',
          body: [
            'Çoğu web sitesinde olduğu gibi, temel ve toplulaştırılmış trafik verileri toplanabilir. Örneğin sayfa görüntüleme sayıları ya da ülke bazlı genel konum gibi bilgiler.',
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
      closing: 'Analitik kullanılıyorsa, hafif ve gizlilik odaklıdır.',
    },
    article: {
      byLabel: 'Ece Çamcı tarafından',
      publishedOnPrefix: '',
      publishedOnSuffix: ' tarihinde yayınlandı',
    },
  },
}

export const getCopy = (locale: Locale) => copy[locale]
