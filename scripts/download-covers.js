const fs = require('fs');
const path = require('path');

const downloads = [
  // E-Books
  { id: 'pub-ebk-va06', url: 'https://www.vmission.org.in/wp-content/uploads/2025/11/Screenshot-2025-11-17-072223_167x238.jpg', file: 'ebook-va06.jpg' },
  { id: 'pub-ebk-va04', url: 'https://www.vmission.org.in/wp-content/uploads/2024/01/v-arti4_169x239.png', file: 'ebook-va04.png' },
  { id: 'pub-ebk-va03', url: 'https://www.vmission.org.in/wp-content/uploads/2024/01/v-arti3_169x239.png', file: 'ebook-va03.png' },
  { id: 'pub-ebk-va02', url: 'https://www.vmission.org.in/wp-content/uploads/2021/12/cp_170x240.jpg', file: 'ebook-va02.jpg' },
  { id: 'pub-ebk-va01', url: 'https://www.vmission.org.in/wp-content/uploads/2021/06/v-arti_170x240.jpg', file: 'ebook-va01.jpg' },
  { id: 'pub-ebk-gita', url: 'https://www.vmission.org.in/wp-content/uploads/2021/06/arti-gita_169x240.jpg', file: 'ebook-gita.jpg' },
  { id: 'pub-ebk-email', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/Email_170x240.jpg', file: 'ebook-email.jpg' },

  // Study Texts
  { id: 'pub-txt-shiv-mahimna', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/shiv_170x240.jpg', file: 'study-text-shiv-mahimna.jpg' },
  { id: 'pub-txt-katha-manjari', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/katha_169x240.jpg', file: 'study-text-katha-manjari.jpg' },
  { id: 'pub-txt-shiv-upasana', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/shiv-upa_169x240.jpg', file: 'study-text-shiv-upasana.jpg' },
  { id: 'pub-txt-vishnu-sahasranama', url: 'https://www.vmission.org.in/wp-content/uploads/2021/06/vsn-722x1024.jpg', file: 'study-text-vishnu-sahasranama.jpg' },
  { id: 'pub-txt-vairagya-sandipani', url: 'https://www.vmission.org.in/wp-content/uploads/2021/06/vai-sand.jpg', file: 'study-text-vairagya-sandipani.jpg' },
  { id: 'pub-txt-sadhana-panchakam-mula', url: 'https://www.vmission.org.in/wp-content/uploads/2021/05/sp-txt.png', file: 'study-text-sp-mula.png' },
  { id: 'pub-txt-tattvabodha-mula', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/TBtxt_170x233.jpg', file: 'study-text-tb-mula.jpg' },
  { id: 'pub-txt-atmabodha-mula', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/AB_169x240.jpg', file: 'study-text-ab-mula.jpg' },
  { id: 'pub-txt-drig-drushya-mula', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/DDV_168x240.jpg', file: 'study-text-ddv-mula.jpg' },
  { id: 'pub-txt-laghu-vakyavritti-mula', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/lvv_170x240.jpg', file: 'study-text-lvv-mula.jpg' },
  { id: 'pub-txt-sadhana-panchakam-vyakhya', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/sp_169x240.jpg', file: 'study-text-sp-vyakhya.jpg' },
  { id: 'pub-txt-tattvabodha-vyakhya', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/TB_169x240.jpg', file: 'study-text-tb-vyakhya.jpg' },
  { id: 'pub-txt-atmabodha-vyakhya', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/AB_169x240.jpg', file: 'study-text-ab-vyakhya.jpg' },
  { id: 'pub-txt-upadesha-saram', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/usaar_170x222.jpg', file: 'study-text-upadesha-saram.jpg' },
  { id: 'pub-txt-vibhishana-gita', url: 'https://www.vmission.org.in/wp-content/uploads/2019/10/vibhi_164x240.jpg', file: 'study-text-vibhishana-gita.jpg' }
];

async function run() {
  for (const item of downloads) {
    const dest = path.join(__dirname, '..', 'public', 'images', 'vmission', 'publications', item.file);
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log('[OK] ' + item.id + ' -> ' + item.file + ' (' + buf.length + ' bytes)');
      } else {
        console.error('[FAIL ' + res.status + '] ' + item.id);
      }
    } catch (e) {
      console.error('[ERR] ' + item.id + ': ' + e.message);
    }
  }
}
run();
