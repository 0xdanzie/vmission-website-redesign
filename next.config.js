/** @type {import('next').NextConfig} */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
// The website is hosted at the root of a domain on Vercel.
// Never set a subpath basePath on Vercel or when rawBasePath is root '/' or empty.
const isVercel = process.env.VERCEL === '1';
const normalizedBasePath =
  !isVercel && rawBasePath && rawBasePath !== '/'
    ? rawBasePath.replace(/\/+$/, '')
    : undefined;

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: normalizedBasePath,
  async redirects() {
    return [
      // Ashram subpage anchor redirects (reconciled in Stage 6E.15)
      {
        source: '/ashram/facilities/',
        destination: '/ashram/#facilities',
        permanent: false,
      },
      {
        source: '/ashram/directions/',
        destination: '/ashram/#reach',
        permanent: false,
      },
      {
        source: '/ashram/activities/',
        destination: '/ashram/#activities',
        permanent: false,
      },
      {
        source: '/ashram/parivar/',
        destination: '/ashram/#parivar',
        permanent: false,
      },
      {
        source: '/ashram/info/',
        destination: '/ashram/',
        permanent: false,
      },

      // Core publication category legacy routes
      {
        source: '/vedanta-sandesh/',
        destination: '/publications/?type=Vedanta+Sandesh',
        permanent: true,
      },
      {
        source: '/vedanta-sandesh-ezine/',
        destination: '/publications/?type=Vedanta+Sandesh',
        permanent: true,
      },
      {
        source: '/vedanta-piyush/',
        destination: '/publications/?type=Vedanta+Piyush',
        permanent: true,
      },
      {
        source: '/vedanta-piyush-ezine/',
        destination: '/publications/?type=Vedanta+Piyush',
        permanent: true,
      },
      {
        source: '/e-books/',
        destination: '/publications/?type=E-Books',
        permanent: true,
      },
      {
        source: '/ebooks/',
        destination: '/publications/?type=E-Books',
        permanent: true,
      },
      {
        source: '/pravachan-text/',
        destination: '/publications/?type=Study+%26+Chant+Texts',
        permanent: true,
      },
      {
        source: '/pravachan-texts/',
        destination: '/publications/?type=Study+%26+Chant+Texts',
        permanent: true,
      },
      // Publication sub-route aliases
      {
        source: '/publications/vedanta-sandesh/',
        destination: '/publications/?type=Vedanta+Sandesh',
        permanent: true,
      },
      {
        source: '/publications/vedanta-piyush/',
        destination: '/publications/?type=Vedanta+Piyush',
        permanent: true,
      },
      {
        source: '/publications/e-books/',
        destination: '/publications/?type=E-Books',
        permanent: true,
      },
      {
        source: '/publications/study-texts/',
        destination: '/publications/?type=Study+%26+Chant+Texts',
        permanent: true,
      },
      // Legacy education and event routes (Stage 3B Redirect Matrix)
      {
        source: '/online-courses/',
        destination: '/learn/',
        permanent: true,
      },
      {
        source: '/gita_course/',
        destination: '/learn/',
        permanent: true,
      },
      {
        source: '/ashram-parivar-yojna/',
        destination: '/teachings/ashram-parivar-yojna/',
        permanent: true,
      },
      {
        source: '/vedanta-camp-indore/',
        destination: '/events/vedanta-camp-indore/',
        permanent: true,
      },
      {
        source: '/gita-camp-va/',
        destination: '/events/gita-camp-va/',
        permanent: true,
      },
      {
        source: '/gita-classes-va/',
        destination: '/events/gita-classes-va/',
        permanent: true,
      },
      {
        source: '/gita-janmashtami-camp-2026/',
        destination: '/events/gita-janmashtami-camp-2026/',
        permanent: true,
      },
      {
        source: '/maha-shivratri-vedanta-camp-feb-2020/',
        destination: '/events/maha-shivratri-vedanta-camp-feb-2020/',
        permanent: true,
      },
      {
        source: '/bal-samskar-shivir/',
        destination: '/events/bal-samskar-shivir/',
        permanent: true,
      },
      {
        source: '/hanumaan-chalisa/',
        destination: '/teachings/hanumaan-chalisa/',
        permanent: true,
      },
      {
        source: '/shiva-mahimna-stotram/',
        destination: '/teachings/shiva-mahimna-stotram/',
        permanent: true,
      },
      {
        source: '/kathopanishad-gyana-yagna/',
        destination: '/teachings/kathopanishad-gyana-yagna/',
        permanent: true,
      },
      {
        source: '/sampoorna-gita-gyana-mahayagna/',
        destination: '/teachings/sampoorna-gita-gyana-mahayagna/',
        permanent: true,
      },
      {
        source: '/vedanta-sandesh-may-2023/',
        destination: '/teachings/vedanta-sandesh-may-2023/',
        permanent: true,
      },
      {
        source: '/vs-apr-2023/',
        destination: '/teachings/vs-apr-2023/',
        permanent: true,
      },
      // Historical Teachings, Discourses & Media Hubs (Batch 3)
      {
        source: '/prakarana-granth/',
        destination: '/teachings/?category=prakarana-granth&type=audio',
        permanent: true,
      },
      {
        source: '/prakarana-granth-2/',
        destination: '/teachings/?category=prakarana-granth&type=video',
        permanent: true,
      },
      {
        source: '/prakaran-texts/',
        destination: '/publications/?type=Study+%26+Chant+Texts',
        permanent: true,
      },
      {
        source: '/love-nature/',
        destination: '/teachings/love-nature/',
        permanent: true,
      },
      {
        source: '/antifragility-sanyas/',
        destination: '/teachings/antifragility-sanyas/',
        permanent: true,
      },
      {
        source: '/bg/',
        destination: '/teachings/bg/',
        permanent: true,
      },
      {
        source: '/10410-2/',
        destination: '/teachings/vedanta-shravana-satra/',
        permanent: true,
      },
      {
        source: '/gita-pravachans/',
        destination: '/teachings/?category=bhagavad-gita&type=audio',
        permanent: true,
      },
      {
        source: '/gita-pravachans-2/',
        destination: '/teachings/?category=bhagavad-gita&type=audio',
        permanent: true,
      },
      {
        source: '/upanishad-talks/',
        destination: '/teachings/?category=upanishads&type=audio',
        permanent: true,
      },
      {
        source: '/videos/',
        destination: '/teachings/?category=upanishads&type=video',
        permanent: true,
      },
      {
        source: '/vm-audios/',
        destination: '/teachings/?type=audio',
        permanent: true,
      },
      {
        source: '/vm-videos/',
        destination: '/teachings/?type=video',
        permanent: true,
      },
      {
        source: '/vm-videos-2/',
        destination: '/teachings/?type=video',
        permanent: true,
      },
      {
        source: '/inspiring-stories/',
        destination: '/teachings/?category=inspiring-stories',
        permanent: true,
      },
      {
        source: '/stories-sw-poornanandaji/',
        destination: '/teachings/?category=inspiring-stories',
        permanent: true,
      },
      {
        source: '/stories-sw-samatanandaji/',
        destination: '/teachings/?category=inspiring-stories',
        permanent: true,
      },
      {
        source: '/stories_swamini-amitananda/',
        destination: '/teachings/?category=inspiring-stories',
        permanent: true,
      },
      {
        source: '/meditation/',
        destination: '/teachings/?category=meditation',
        permanent: true,
      },
      {
        source: '/vishnu-sahasra-naam/',
        destination: '/teachings/?category=chanting',
        permanent: true,
      },
      {
        source: '/vishnu-sahasranaam/',
        destination: '/teachings/?category=chanting',
        permanent: true,
      },
      {
        source: '/atma-bodha-video/',
        destination: '/teachings/atma-bodha-lessons/',
        permanent: true,
      },
      {
        source: '/atmabodha-talks/',
        destination: '/teachings/?category=prakarana-granth&type=audio',
        permanent: true,
      },
      {
        source: '/bhaja-govindam/',
        destination: '/teachings/bhaja-govindam-discourses/',
        permanent: true,
      },
      {
        source: '/video-shivamahimna-stotram/',
        destination: '/teachings/shiva-mahimna-stotram-talks/',
        permanent: true,
      },
      {
        source: '/videos-complete-bhagwad-gita/',
        destination: '/teachings/?category=bhagavad-gita&type=video',
        permanent: true,
      },
      {
        source: '/videos-kathopanishad/',
        destination: '/teachings/?category=upanishads&type=video',
        permanent: true,
      },
      {
        source: '/chanting/',
        destination: '/teachings/?category=chanting',
        permanent: true,
      },
      {
        source: '/chanting-others/',
        destination: '/teachings/?category=chanting',
        permanent: true,
      },
      // Events, Camps, Retreats & Courses (Batch 4)
      {
        source: '/gita-course/',
        destination: '/learn/residential-gita/',
        permanent: true,
      },
      {
        source: '/other-courses/',
        destination: '/learn/',
        permanent: true,
      },
      {
        source: '/msr-vedanta-camp-feb-2020/',
        destination: '/events/maha-shivratri-vedanta-camp-feb-2020/',
        permanent: true,
      },
      {
        source: '/camp-conclusion/',
        destination: '/events/camp-conclusion/',
        permanent: true,
      },
      {
        source: '/janmastami-vedanta-camp-2020/',
        destination: '/events/janmastami-vedanta-camp-2020/',
        permanent: true,
      },
      {
        source: '/hanumaan-chalisa-satsang/',
        destination: '/events/hanumaan-chalisa-satsang/',
        permanent: true,
      },
      {
        source: '/hanuman-chalisa-gyan-yagna-samapan/',
        destination: '/events/hanuman-chalisa-gyan-yagna-samapan/',
        permanent: true,
      },
      {
        source: '/satsang-bhavanagar/',
        destination: '/events/satsang-bhavanagar/',
        permanent: true,
      },
      {
        source: '/sundarkand-monthly-satsang/',
        destination: '/events/sundarkand-monthly-satsang/',
        permanent: true,
      },
      {
        source: '/sundarkand-path-indore/',
        destination: '/events/sundarkand-path-indore/',
        permanent: true,
      },
      {
        source: '/gita-gyan-yagna-lucknow/',
        destination: '/events/gita-gyan-yagna-lucknow/',
        permanent: true,
      },
      {
        source: '/gita-gyana-yagna-lucknow/',
        destination: '/events/gita-gyana-yagna-lucknow/',
        permanent: true,
      },
      {
        source: '/gita-gyana-yagna-lucknow-2/',
        destination: '/events/gita-gyana-yagna-lucknow-2/',
        permanent: true,
      },
      {
        source: '/gita-gyana-yagna-ahmedabad/',
        destination: '/events/gita-gyana-yagna-ahmedabad/',
        permanent: true,
      },
      {
        source: '/gita-gyana-yagna-ahmedabad-2/',
        destination: '/events/gita-gyana-yagna-ahmedabad-2/',
        permanent: true,
      },
      {
        source: '/gita-gyana-yagna-mumbai-2/',
        destination: '/events/gita-gyana-yagna-mumbai-2/',
        permanent: true,
      },
      {
        source: '/gita-gyana-yagna-vadodara/',
        destination: '/events/gita-gyana-yagna-vadodara/',
        permanent: true,
      },
      {
        source: '/visit-to-statue-of-unity/',
        destination: '/events/visit-to-statue-of-unity/',
        permanent: true,
      },
      {
        source: '/birding-gujrat/',
        destination: '/events/birding-gujrat/',
        permanent: true,
      },
      {
        source: '/visit-to-victoria-nature-park-bhavnagar/',
        destination: '/events/visit-to-victoria-nature-park-bhavnagar/',
        permanent: true,
      },
      {
        source: '/gita-jayanti-futi-kothi/',
        destination: '/events/gita-jayanti-futi-kothi/',
        permanent: true,
      },
      {
        source: '/gita-jayanti-gita-bhawan/',
        destination: '/events/gita-jayanti-gita-bhawan/',
        permanent: true,
      },
      {
        source: '/anandlahari/',
        destination: '/events/anandlahari/',
        permanent: true,
      },
      {
        source: '/anand-lahari/',
        destination: '/events/anand-lahari/',
        permanent: true,
      },
      {
        source: '/8508-2/',
        destination: '/events/8508-2/',
        permanent: true,
      },
      // Newly reconciled legacy aliases (Stage 6E.3)
      {
        source: '/mission/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/our-trusts/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/vedanta-mission/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/facilities/',
        destination: '/ashram/',
        permanent: true,
      },
      {
        source: '/rooms/',
        destination: '/ashram/',
        permanent: true,
      },
      {
        source: '/activities/',
        destination: '/ashram/',
        permanent: true,
      },
      {
        source: '/kinds-of-activities/',
        destination: '/ashram/',
        permanent: true,
      },
      {
        source: '/introduction/',
        destination: '/ashram/',
        permanent: true,
      },
      {
        source: '/contact-us/',
        destination: '/contact/',
        permanent: true,
      },
      {
        source: '/guruji/',
        destination: '/acharyas/swami-atmananda-saraswati/',
        permanent: true,
      },
      {
        source: '/p-swamini-amitananda-saraswati/',
        destination: '/acharyas/swamini-amitananda-saraswati/',
        permanent: true,
      },
      {
        source: '/p-swamini-samatananda-saraswati/',
        destination: '/acharyas/swamini-samatananda-saraswati/',
        permanent: true,
      },
      {
        source: '/p-swamini-poornananda-saraswati/',
        destination: '/acharyas/swamini-poornananda-saraswati/',
        permanent: true,
      },
      {
        source: '/acharyas-2/',
        destination: '/acharyas/',
        permanent: true,
      },
      {
        source: '/sangyan/',
        destination: '/teachings/?category=prakarana-granth',
        permanent: true,
      },
      {
        source: '/sangyan-1/',
        destination: '/teachings/?category=prakarana-granth',
        permanent: true,
      },
      {
        source: '/sangyan-2/',
        destination: '/teachings/?category=prakarana-granth',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
