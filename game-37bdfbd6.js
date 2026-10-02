(()=>{
const cv=document.getElementById('cv'), ctx=cv.getContext('2d');
const $=id=>document.getElementById(id);
// ---------- icons (inline SVG, 32x32 grid) ----------
const OL='#46290f';
const svgWrap=(inner,sz)=>`<svg viewBox="0 0 32 32" width="${sz}" height="${sz}" aria-hidden="true" focusable="false" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;
const T={
  fish:(b,belly,fin,extra='')=>`<path d="M6 16 L1.5 10 L2.5 16 L1.5 22 Z" fill="${fin}"/><ellipse cx="17" cy="16" rx="12" ry="6.5" fill="${b}"/><path d="M8 18.5 Q17 23 27.5 17.5" fill="none" stroke="${belly}" stroke-width="2"/><path d="M15 10 q3 -4 7 -1" fill="${fin}"/>${extra}<circle cx="24.5" cy="14.5" r="1.3" fill="${OL}" stroke="none"/>`,
  egg:c=>`<ellipse cx="16" cy="17" rx="8.5" ry="10.5" fill="${c}"/><ellipse cx="13" cy="12" rx="2" ry="3" fill="#fff" stroke="none" opacity=".7"/>`,
  bottle:(liq,cap)=>`<rect x="12" y="3.5" width="8" height="4" rx="1" fill="${cap}"/><path d="M11 9 h10 l1.5 3 v14 a2 2 0 0 1 -2 2 h-9 a2 2 0 0 1 -2 -2 v-14z" fill="${liq}"/><rect x="9.5" y="16" width="13" height="6" fill="${cap}"/>`,
  jar:(lid,fill)=>`<rect x="9" y="4.5" width="14" height="4" rx="1.2" fill="${lid}"/><path d="M8 10 h16 v15 a3 3 0 0 1 -3 3 h-10 a3 3 0 0 1 -3 -3z" fill="#eef4f5"/><path d="M9.2 15 h13.6 v10 a2 2 0 0 1 -2 2 h-9.6 a2 2 0 0 1 -2 -2z" fill="${fill}" stroke="none"/>`,
  plate:(food,top='')=>`<ellipse cx="16" cy="21" rx="13.5" ry="6.5" fill="#f7f4ee"/><ellipse cx="16" cy="18.5" rx="8.5" ry="5" fill="${food}"/>${top}`,
  bowl:(soup,top='')=>`<path d="M3.5 14 h25 a12.5 12 0 0 1 -25 0z" fill="#e8e0d0"/><ellipse cx="16" cy="14" rx="12.5" ry="3.8" fill="${soup}"/>${top}`,
  glass:(liq,top='')=>`<path d="M8.5 6 h15 l-2.2 22 h-10.6z" fill="#eef6fa"/><path d="M9.6 12 h12.8 l-1.6 15 h-9.6z" fill="${liq}" stroke="none"/><path d="M8.5 6 h15 l-2.2 22 h-10.6z" fill="none"/><path d="M19 3 l-2 9" fill="none" stroke="#6fa8dc" stroke-width="2"/>${top}`,
  rock:(sp)=>`<path d="M4 23 L8 11 L17 5.5 L27 11 L28 23 L17 28z" fill="#a39d94"/><path d="M8 11 L17 14 L27 11 M17 14 V28" fill="none" stroke-width="1"/>${sp?`<circle cx="12" cy="17" r="2.2" fill="${sp}"/><circle cx="21" cy="19" r="2.6" fill="${sp}"/><circle cx="18" cy="10" r="1.8" fill="${sp}"/>`:''}`,
  gem:c=>`<path d="M6 12 L11 5 h10 l5 7 l-10 16z" fill="${c}"/><path d="M6 12 h20 M11 5 l5 7 l5 -7 M16 12 v16" fill="none" stroke-width="1.1"/><path d="M11 9 l2 -2" stroke="#fff" stroke-width="1.5"/>`,
  leaves:(c,d)=>`<path d="M16 29 V13" stroke="${d}" stroke-width="2"/><path d="M16 14 Q7 13 6 5 Q14 5 16 14z" fill="${c}"/><path d="M16 18 Q25 17 27 9 Q18 8 16 18z" fill="${c}"/><path d="M16 23 Q8 23 5 16 Q13 15 16 23z" fill="${c}"/>`
};
const ICONS={
  kb:()=>T.leaves('#5cb33f','#3f8a34')+`<path d="M16 29 v-2" stroke="#d9709a" stroke-width="3"/>`,
  ch:()=>`<path d="M19 4 q3 3 0 6" fill="none" stroke="#3f8a34" stroke-width="2.4"/><path d="M18 9.5 Q27 18 11 28.5 Q8.5 26.5 11 24.5 Q18 18 15 11z" fill="#e0402f"/><path d="M17 13 q2 3 -1 7" fill="none" stroke="#ff8f7a" stroke-width="1.2"/>`,
  wm:()=>`<circle cx="16" cy="17" r="11.5" fill="#2f7d32"/><path d="M10.5 7.5 q-3.5 9.5 0 19 M16 5.5 v23 M21.5 7.5 q3.5 9.5 0 19" fill="none" stroke="#8ccf6a" stroke-width="1.6"/>`,
  corn:()=>`<path d="M9 29 Q5 16 13 7 L16 27z" fill="#6fb44c"/><ellipse cx="17" cy="15" rx="5.5" ry="10.5" fill="#f2c230"/><path d="M14.5 8 v14 M17 5.5 v19 M19.5 8 v14" stroke="#c9901c" fill="none" stroke-width="1"/><path d="M25 29 Q28 16 20 8 L17 27z" fill="#5cb33f"/>`,
  rice:()=>`<path d="M14 29 Q14 15 21 5" fill="none" stroke="#9a8a3a" stroke-width="2"/>`+[[18,9,30],[21,11,60],[16,13,20],[19,15,55],[15,17,15],[18,19,50]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="1.9" ry="3.2" fill="#e2c25a" transform="rotate(${r} ${x} ${y})"/>`).join(''),
  cab:()=>`<circle cx="16" cy="17" r="11.5" fill="#8fcb65"/><circle cx="16" cy="17" r="7.5" fill="#d2efb4"/><path d="M16 9.5 q-4.5 7.5 0 15 M16 9.5 q4.5 7.5 0 15" fill="none" stroke="#8fbf6a" stroke-width="1.2"/>`,
  straw:()=>`<path d="M8.5 12 Q16 6 23.5 12 Q22.5 26 16 29 Q9.5 26 8.5 12z" fill="#e0363f"/><path d="M10.5 10 l5.5 -5 l5.5 5 l-5.5 2.5z" fill="#4f9a36"/>`+[[13,16],[19,16],[16,20],[12.5,21],[19.5,21],[16,25]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9" fill="#fce3a0" stroke="none"/>`).join(''),
  egg:()=>T.egg('#f6e7c8'), duckegg:()=>T.egg('#dcebe2'),
  milk:()=>T.bottle('#ffffff','#6fa8dc'), goatmilk:()=>T.bottle('#fffaf0','#b88a5a'),
  nil:()=>T.fish('#8a9aa0','#c9d4d6','#6f7f85',`<path d="M13 12 v8 M17 11 v10 M21 12 v8" stroke="#6f7f85" stroke-width="1"/>`),
  chon:()=>T.fish('#4d4d3a','#8a8a6a','#3a3a2a',`<path d="M12 13 l2 2 M16 12 l2 2 M20 13 l2 2" stroke="#2b2b20" stroke-width="1.2"/>`),
  buek:()=>`<path d="M5 16 L0.8 9 L2 16 L0.8 23 Z" fill="#5f6c73"/><ellipse cx="17" cy="16" rx="14" ry="8" fill="#7f8c93"/><path d="M6 19 Q17 25.5 30 18" fill="none" stroke="#c9d4d6" stroke-width="2.4"/><circle cx="26" cy="14" r="1.4" fill="${OL}" stroke="none"/>`,
  duk:()=>T.fish('#3b3530','#6a5f55','#2b2520',`<path d="M28 17 q3 2 3.5 5 M28.5 15.5 q3 0 3.5 -3" fill="none" stroke-width="1.1"/>`),
  taphien:()=>T.fish('#dfe3e6','#ffffff','#e0a03a'),
  krai:()=>T.fish('#b9c2c8','#e8eef0','#8f9aa0',`<circle cx="14" cy="19" r="1.5" fill="${OL}" stroke="none"/><circle cx="19" cy="20" r="1.5" fill="${OL}" stroke="none"/>`),
  cavefish:()=>T.fish('#f3d9df','#ffffff','#e8b8c4').replace(`<circle cx="24.5" cy="14.5" r="1.3" fill="${OL}" stroke="none"/>`,`<circle cx="24.5" cy="14.5" r="1.3" fill="#fff"/>`),
  kung:()=>`<path d="M24 9 Q29 17 22 24 Q15 28 9 24" fill="none" stroke="#e0663a" stroke-width="6"/><path d="M24 9 Q29 17 22 24 Q15 28 9 24" fill="none" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M9 24 l-5 -3 l1 5z" fill="#e0663a"/><path d="M24 9 L19 4 M24 9 L13 7" fill="none" stroke="#3d6fb0" stroke-width="2"/><circle cx="25" cy="11" r="1.2" fill="${OL}" stroke="none"/>`,
  bamboo:()=>`<path d="M10 28 L16 3 L22 28z" fill="#d9c27a"/><path d="M11.5 22 h9 M13 16 h6 M14.5 10 h3" fill="none" stroke-width="1.2"/><path d="M10 28 L16 3 L22 28z" fill="none"/>`,
  mush:()=>`<path d="M13 16 h6 l1 12 h-8z" fill="#f4ead6"/><path d="M4 17 Q16 0 28 17z" fill="#8a5a3a"/><circle cx="11" cy="12" r="1.5" fill="#c9a07a" stroke="none"/><circle cx="19" cy="9" r="1.8" fill="#c9a07a" stroke="none"/>`,
  phakwan:()=>T.leaves('#6fc24a','#4f8a35'),
  makham:()=>`<path d="M5 22 Q8 8 25 7 Q28 9 26 11 Q13 13 9 24 Q7 26 5 22z" fill="#8a5a2b"/><path d="M11 17 q1 -2 3 -3 M16 13 q2 -1 4 -1.5" fill="none" stroke="#c9a07a" stroke-width="1.2"/>`,
  cu:()=>T.rock('#c9723a'), ag:()=>T.rock('#eef1f3'), au:()=>T.rock('#f2c230'),
  ruby:()=>T.gem('#e0363f'), emerald:()=>T.gem('#2fbf6a'),
  guano:()=>`<path d="M4 27 Q9 16 13 20 Q15 10 20 16 Q25 13 28 27z" fill="#6b5a3a"/><path d="M12 24 q2 -2 4 0" fill="none" stroke="#9b8a6a" stroke-width="1"/>`,
  namprik:()=>T.jar('#d4453a','#9a2a1f'), pkcab:()=>T.jar('#4f8a45','#bfe39a'), pkbam:()=>T.jar('#b8a35a','#e6d49a'),
  butter:()=>`<path d="M4 17 l11 -6 l13 5 l-11 7z" fill="#fff3a8"/><path d="M4 17 v6 l13 6 v-6z" fill="#f2d95a"/><path d="M17 23 v6 l11 -6.5 v-6.5z" fill="#e6c23a"/>`,
  pladry:()=>T.fish('#c79a62','#e0c08a','#9b6a3a',`<path d="M12 13 l3 6 M17 12 l3 7 M22 13 l2 5" stroke="#8a5a2b" stroke-width="1"/>`),
  chondry:()=>T.fish('#8a5a3a','#b88a5a','#6b4423',`<path d="M12 13 l3 6 M17 12 l3 7" stroke="#5b3a22" stroke-width="1.2"/>`),
  d_kb:()=>T.plate('#4f9a36',`<circle cx="12" cy="17" r="1.6" fill="#e0402f"/><circle cx="19" cy="19" r="1.6" fill="#e0402f"/><path d="M11 20 q5 -4 10 -2" fill="none" stroke="#2f6a2a"/>`),
  d_omel:()=>T.plate('#f2c230',`<path d="M10 17 q3 -2 5 0 q3 2 6 -1" fill="none" stroke="#c9901c"/>`),
  d_tomyum:()=>T.bowl('#e0663a',`<path d="M9 13 q3 -3 6 0" fill="none" stroke="#fff"/><circle cx="20" cy="13.5" r="1.5" fill="#4f9a36"/><path d="M22 12 l3 -6" stroke="#6fb44c" stroke-width="2"/>`),
  d_rice:()=>T.plate('#f7e8b0',`<circle cx="13" cy="17" r="1.3" fill="#5cb33f"/><circle cx="18" cy="19" r="1.3" fill="#e0663a"/><circle cx="20" cy="16.5" r="1.3" fill="#f2c230"/>`),
  d_corn:()=>T.plate('#f2d95a',[[12,17],[15,19],[18,17],[20,19.5],[14,15.5]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.3" fill="#fff3a8"/>`).join('')),
  d_gaeng:()=>T.bowl('#e6b43c',`<rect x="10" y="11.5" width="4" height="3" fill="#f4ead6"/><rect x="17" y="12" width="4" height="3" fill="#f4ead6"/><circle cx="23" cy="13" r="1.3" fill="#4f9a36"/>`),
  d_sangkaya:()=>T.bowl('#e6c46a',`<path d="M9 13 q7 -4 14 0" fill="#4f9a36"/>`),
  d_strawmilk:()=>T.glass('#f3a3c0',`<path d="M12 4 Q16 1 20 4 Q19 9 16 10 Q13 9 12 4z" fill="#e0363f"/>`),
  d_grandpa:()=>T.bowl('#c9702a',`<circle cx="11" cy="13" r="1.6" fill="#e0402f"/><rect x="15" y="11.5" width="4" height="3" fill="#f4ead6"/><path d="M20 13 q2 -2 4 0" fill="none" stroke="#4f9a36" stroke-width="1.6"/><path d="M16 4 l1.5 3 l3 .3 l-2.3 2 l.8 3 l-3 -1.6 l-3 1.6 l.8 -3 l-2.3 -2 l3 -.3z" fill="#f2c230"/>`),
  d_wmshake:()=>T.glass('#e0404f',`<path d="M20 5 a6 6 0 0 1 -9 0z" fill="#e0404f"/><path d="M20 5 a6 6 0 0 1 -9 0" fill="none" stroke="#2f7d32" stroke-width="2"/>`),
  wood:()=>`<rect x="4" y="15" width="22" height="8" rx="4" fill="#a7784a"/><rect x="7" y="8" width="22" height="8" rx="4" fill="#b8834d"/><circle cx="25" cy="12" r="3" fill="#e0b47a"/><circle cx="22" cy="19" r="3" fill="#e0b47a"/>`,
  stone:()=>T.rock(),
  hay:()=>`<path d="M6 27 L10 7 h12 l4 20z" fill="#e6c75c"/><path d="M11 12 l-1 13 M16 8 v18 M21 12 l1 13" fill="none" stroke="#b8963a" stroke-width="1.1"/><path d="M8 17 h16" stroke="#8a5a2b" stroke-width="2.2"/>`,
  jas:()=>`<circle cx="16" cy="15" r="9" fill="none" stroke="#e8e6e0" stroke-width="5"/><circle cx="16" cy="15" r="9" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M13 24 l3 6 l3 -6z" fill="#d4453a"/>`,
  ring:()=>`<circle cx="16" cy="19" r="8" fill="none" stroke="#f2c230" stroke-width="3.5"/><circle cx="16" cy="19" r="8" fill="none" stroke-width="1"/><path d="M12 9 l4 -5 l4 5 l-4 3z" fill="#9fd0e8"/>`,
  kt:()=>`<ellipse cx="16" cy="22" rx="12" ry="5" fill="#3f8a34"/><path d="M6 21 l4 -8 l3 6 l3 -9 l3 9 l3 -6 l4 8z" fill="#57a844"/><circle cx="16" cy="15" r="3" fill="#f2a33d"/><path d="M16 12 v-7" stroke="#fff" stroke-width="2"/><ellipse cx="16" cy="4" rx="1.3" ry="2" fill="#f2c230" stroke="none"/>`,
  seed:()=>`<path d="M9 27 Q6 14 16 5 Q26 14 23 27z" fill="#c9a877"/><path d="M16 9 v15" fill="none" stroke-width="1.1"/>`
};
// action / UI glyphs
const GLYPH={
  storm:`<path d="M8 16 a6 6 0 0 1 3 -11 a8 8 0 0 1 14 3 a5 5 0 0 1 0 8z" fill="#8a96a8"/><path d="M17 15 l-4 7 h4 l-3 7 l8 -10 h-4 l3 -4z" fill="#f2c230" stroke="#46290f" stroke-width="1"/>`,
  note:`<path d="M12 24 V8 l14 -3 v16" fill="none" stroke-width="2.6"/><ellipse cx="9" cy="24" rx="4" ry="3.2" fill="#46290f"/><ellipse cx="23" cy="21" rx="4" ry="3.2" fill="#46290f"/>`,
  noteoff:`<path d="M12 24 V8 l14 -3 v16" fill="none" stroke-width="2.6" opacity=".45"/><ellipse cx="9" cy="24" rx="4" ry="3.2" fill="#46290f" opacity=".45"/><ellipse cx="23" cy="21" rx="4" ry="3.2" fill="#46290f" opacity=".45"/><path d="M5 5 L28 28" stroke="#d4453a" stroke-width="3.2"/>`,
  hoe:`<path d="M9 28 L22 6" stroke-width="3" stroke="#8a5a2b"/><path d="M18 5 h10 v5 h-7z" fill="#9aa3a8"/>`,
  can:`<path d="M6 14 h14 v12 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2z" fill="#6fa8dc"/><path d="M20 17 l8 -6" stroke-width="3" stroke="#6fa8dc"/><path d="M8 14 q5 -8 10 0" fill="none" stroke-width="2"/><path d="M28 9 l2 3 M29 6 l2 1" stroke="#9fd0e8"/>`,
  sickle:`<path d="M8 28 l6 -8" stroke="#8a5a2b" stroke-width="3.2"/><path d="M14 20 Q26 18 24 5 Q30 14 20 22z" fill="#c9ccd1"/>`,
  axe:`<path d="M10 29 L20 5" stroke="#8a5a2b" stroke-width="3"/><path d="M17 6 Q26 5 27 14 L19 12z" fill="#c9ccd1"/>`,
  hammer:`<path d="M12 29 L18 12" stroke="#8a5a2b" stroke-width="3"/><rect x="11" y="4" width="16" height="8" rx="1.5" fill="#8f9296" transform="rotate(20 19 8)"/>`,
  rod:`<path d="M5 29 Q15 14 27 4" fill="none" stroke="#8a5a2b" stroke-width="2.4"/><path d="M27 4 v14" fill="none" stroke="#fff" stroke-width="1"/><circle cx="27" cy="20" r="2.5" fill="#d4453a"/>`,
  hand:`<path d="M10 28 v-10 l-3 -5 a2 2 0 0 1 3.5 -2 l2.5 4 v-10 a2 2 0 0 1 4 0 v8 v-9 a2 2 0 0 1 4 0 v9 v-7 a2 2 0 0 1 4 0 v12 q0 8 -6 10z" fill="#f1c9a0"/>`,
  talk:`<path d="M4 7 h24 v14 h-12 l-6 6 v-6 h-6z" fill="#fff7e4"/><circle cx="11" cy="14" r="1.5" fill="${OL}" stroke="none"/><circle cx="16" cy="14" r="1.5" fill="${OL}" stroke="none"/><circle cx="21" cy="14" r="1.5" fill="${OL}" stroke="none"/>`,
  house:`<path d="M4 15 L16 5 L28 15" fill="#b5412f"/><path d="M7 14 h18 v14 h-18z" fill="#ead6ab"/><rect x="14" y="19" width="5" height="9" fill="#6b4423"/>`,
  shop:`<path d="M4 12 h24 v4 h-24z" fill="#d4453a"/><path d="M4 12 l3 -6 h18 l3 6" fill="#f7ecd2"/><path d="M6 16 h20 v12 h-20z" fill="#b8834d"/>`,
  box:`<path d="M5 12 h22 v15 h-22z" fill="#9b6a3a"/><path d="M3 8 h26 v5 h-26z" fill="#7a4e25"/><circle cx="12" cy="8" r="2.5" fill="#4fae3b"/><circle cx="19" cy="8" r="2.5" fill="#e0402f"/>`,
  sleep:`<path d="M20 5 a11 11 0 1 0 7 17 a9 9 0 0 1 -7 -17z" fill="#f2c230"/>`,
  sun:`<circle cx="16" cy="16" r="7" fill="#f2c230"/><path d="M16 2 v5 M16 25 v5 M2 16 h5 M25 16 h5 M6 6 l3.5 3.5 M22.5 22.5 l3.5 3.5 M26 6 l-3.5 3.5 M9.5 22.5 l-3.5 3.5" stroke="#e0a03a" stroke-width="2"/>`,
  rain:`<path d="M8 17 a6 6 0 0 1 3 -11 a8 8 0 0 1 14 3 a5 5 0 0 1 0 8z" fill="#c9d4e0"/><path d="M11 21 l-2 6 M17 21 l-2 6 M23 21 l-2 6" stroke="#6fa8dc" stroke-width="2"/>`,
  moon:`<path d="M20 4 a12 12 0 1 0 8 19 a10 10 0 0 1 -8 -19z" fill="#f7ecd2"/><circle cx="8" cy="7" r="1" fill="#f7ecd2" stroke="none"/>`,
  flag:`<path d="M7 29 V4" stroke-width="2.4"/><path d="M8 5 h17 l-4 5 l4 5 h-17z" fill="#d4453a"/>`,
  bag:`<path d="M6 12 h20 l-2 16 h-16z" fill="#b8834d"/><path d="M11 12 q0 -8 5 -8 q5 0 5 8" fill="none" stroke-width="2.2"/><path d="M6 17 h20" stroke-width="1.2"/>`,
  map:`<path d="M3 7 l8 -3 l10 3 l8 -3 v21 l-8 3 l-10 -3 l-8 3z" fill="#f7ecd2"/><path d="M11 4 v21 M21 7 v21" fill="none" stroke-width="1.2"/><circle cx="16" cy="14" r="2.5" fill="#d4453a"/>`,
  book:`<path d="M5 6 h9 a2 2 0 0 1 2 2 v20 a2 2 0 0 0 -2 -2 h-9z" fill="#4f8a45"/><path d="M27 6 h-9 a2 2 0 0 0 -2 2 v20 a2 2 0 0 1 2 -2 h9z" fill="#5f9e3a"/>`,
  menu:`<path d="M6 9 h20 M6 16 h20 M6 23 h20" stroke-width="3"/>`,
  horse:`<path d="M6 26 v-8 q0 -6 7 -7 l6 -6 l2 3 q4 1 5 6 l-3 2 l-3 -2 v12" fill="#8a5a34"/><path d="M19 5 q-5 3 -6 9" fill="none" stroke="#3b2416" stroke-width="2.5"/>`,
  close:`<path d="M9 9 L23 23 M23 9 L9 23" stroke-width="3.2"/>`,
  star:`<path d="M16 3 l4 8.5 l9 1 l-7 6 l2 9 l-8 -4.5 l-8 4.5 l2 -9 l-7 -6 l9 -1z" fill="#f2c230"/>`,
  enter:`<path d="M6 28 V10 q10 -10 20 0 V28z" fill="#1a120c"/><path d="M16 14 v10 M12 20 l4 4 l4 -4" stroke="#f2c230" stroke-width="2.2" fill="none"/>`,
  ladder:`<path d="M10 3 v26 M22 3 v26 M10 9 h12 M10 15 h12 M10 21 h12 M10 27 h12" stroke="#8a5a2b" stroke-width="2.4"/>`
};
function icon(k,sz=28){const f=ICONS[k];if(f)return svgWrap(f(),sz);
  const sk=sprOk('i_'+k)?'i_'+k:CROPS[k]&&sprOk(k+'2')?k+'2':FTREES[k]&&sprOk('ft_'+k+'_3')?'ft_'+k+'_3':null;
  if(sk)return`<span style="display:inline-block;width:${sz}px;height:${sz}px;vertical-align:middle;${sprBg(sk,sz,sz)}"></span>`;
  const col=(CROPS[k]&&CROPS[k].col)||({ffeed:'#b8945a',r_watch:'#c9a24a',r_photo:'#a07850',r_khlui:'#c8a060',r_diary:'#7a4a2a',r_medal:'#b87333',berry:'#7a2fb0',honey:'#e8a820',cheese:'#f2d060',gcheese:'#efe6c0',fsauce:'#8a4a20',med:'#e8f0f4',brush:'#a7784a'}[k])||(k==='mango'?'#f2b33d':k==='banana'?'#f2d23d':k==='coco'?'#8a6a3a':k.startsWith('d_')?'#e0a060':null);
  if(col)return svgWrap(`<circle cx="16" cy="18" r="9" fill="${col}" stroke="#46290f" stroke-width="1.5"/><path d="M16 9 q3 -5 7 -4" stroke="#4f9a3a" stroke-width="2.5" fill="none"/>`,sz);
  return svgWrap(ICONS.seed(),sz);}
function glyph(k,sz=28){return svgWrap(GLYPH[k]||GLYPH.hand,sz);}
const ic=(k,sz=22)=>`<span class="ic">${icon(k,sz)}</span>`;
const ACT_GLYPH={'ไถดิน':'hoe','รดน้ำ':'can','เก็บ':'sickle','ปลูก':'seed','ตกปลา':'rod','ดึง!':'rod','คุย':'talk','ทุบ':'hammer','ทุบหิน':'hammer','ตี':'hammer','ผ่าไม้':'axe','ถอนหญ้า':'hand','ถอน':'hand',
  'บ้าน':'house','นอน':'sleep','ร้าน':'shop','ส่งขาย':'box','แผงขาย':'shop','ช่างไม้':'hammer','กระดาน':'book','ซื้อที่ดิน':'flag','เข้าเหมือง':'enter','ลงบันได':'ladder','ขึ้นไป':'ladder',
  'เติมหญ้า':'hay','รีดนม':'milk','เก็บไข่':'egg','ใส่ของ':'box','เปิดหีบ':'star','จุด!':'star','จุดบั้งไฟ':'star','ลอยกระทง':'kt','ซื้อกระทง':'kt','ดำหัว':'can','สาดน้ำ':'can'};
function actGlyph(l){const k=ACT_GLYPH[l];if(!k)return glyph('hand',30);return GLYPH[k]?glyph(k,30):icon(k,30);}
const W=44,H=26;
const SEASON_LEN=14;
const ITEMS={
  kb:{n:'ผักบุ้ง',v:30}, ch:{n:'พริก',v:70}, wm:{n:'แตงโม',v:190},
  corn:{n:'ข้าวโพด',v:110}, rice:{n:'ข้าวหอมมะลิ',v:160}, cab:{n:'กะหล่ำปลี',v:120}, straw:{n:'สตรอว์เบอร์รี',v:230},
  egg:{n:'ไข่ไก่',v:45}, milk:{n:'นมวัว',v:120},
  nil:{n:'ปลานิล',v:40}, chon:{n:'ปลาช่อน',v:90}, buek:{n:'ปลาบึก',v:320},
  bamboo:{n:'หน่อไม้',v:60}, mush:{n:'เห็ดโคน',v:130},
  namprik:{n:'น้ำพริกเผา',v:260}, pkcab:{n:'ผักกาดดอง',v:320}, pkbam:{n:'หน่อไม้ดอง',v:200},
  butter:{n:'เนย',v:280}, pladry:{n:'ปลาแห้ง',v:140}, chondry:{n:'ปลาช่อนแดดเดียว',v:210},
  d_kb:{n:'ผัดผักบุ้งไฟแดง',v:120,e:35}, d_omel:{n:'ไข่เจียว',v:110,e:25}, d_tomyum:{n:'ต้มยำปลาช่อน',v:260,e:60},
  d_rice:{n:'ข้าวผัด',v:230,e:40}, d_corn:{n:'ข้าวโพดคั่วเนย',v:420,e:45}, d_gaeng:{n:'แกงหน่อไม้',v:280,e:55},
  duk:{n:'ปลาดุก',v:70}, taphien:{n:'ปลาตะเพียน',v:55}, kung:{n:'กุ้งก้ามกราม',v:180}, krai:{n:'ปลากราย',v:220}, cavefish:{n:'ปลาถ้ำตาบอด',v:400},
  duckegg:{n:'ไข่เป็ด',v:60}, goatmilk:{n:'นมแพะ',v:150}, phakwan:{n:'ผักหวานป่า',v:90}, makham:{n:'มะขามป่า',v:80},
  cu:{n:'แร่ทองแดง',v:30}, ag:{n:'แร่เงิน',v:60}, au:{n:'แร่ทองคำ',v:120}, ruby:{n:'ทับทิม',v:350}, emerald:{n:'มรกต',v:300}, guano:{n:'มูลค้างคาว',v:25},
  cuc:{n:'แตงกวา',v:55}, ebp:{n:'มะเขือม่วง',v:100}, bean:{n:'ถั่วฝักยาว',v:75}, pump:{n:'ฟักทอง',v:260}, lgr:{n:'ตะไคร้',v:45}, tom:{n:'มะเขือเทศ',v:105}, car:{n:'แครอท',v:85}, bas:{n:'กะเพรา',v:28},
  mango:{n:'มะม่วง',v:150}, banana:{n:'กล้วย',v:110}, coco:{n:'มะพร้าว',v:130},
  d_kapao:{n:'ข้าวผัดกะเพรา',v:260,e:50}, d_buad:{n:'ฟักทองแกงบวด',v:460,e:40}, d_mango:{n:'ข้าวเหนียวมะม่วง',v:420,e:45},
  honey:{n:'น้ำผึ้ง',v:220}, cheese:{n:'ชีสนมวัว',v:380}, gcheese:{n:'ชีสนมแพะ',v:460}, fsauce:{n:'น้ำปลา',v:300},
  plathu:{n:'ปลาทู',v:60}, crab:{n:'ปูม้า',v:150}, squid:{n:'ปลาหมึก',v:120}, lobster:{n:'กุ้งมังกร',v:500}, mahseer:{n:'ปลาพลวงหิน',v:350},
  shell:{n:'เปลือกหอยสวย',v:40}, seaweed:{n:'สาหร่ายทะเล',v:35}, oyster:{n:'หอยนางรม',v:90}, pearl:{n:'ไข่มุก',v:800},
  orchid:{n:'กล้วยไม้ป่า',v:200}, lingzhi:{n:'เห็ดหลินจือ',v:280}, honeycomb:{n:'รวงผึ้งป่า',v:180},
  d_coco:{n:'น้ำมะพร้าวปั่น',v:50,e:30}, d_squidg:{n:'หมึกย่าง',v:80,e:50}, kapong:{n:'ปลากะพงขาว',v:260}, insee:{n:'ปลาอินทรี',v:420},
  d_crabcurry:{n:'ปูผัดผงกะหรี่',v:520,e:60}, d_tomyumtalay:{n:'ต้มยำทะเล',v:480,e:65}, d_lingzhi:{n:'ยาบำรุงหลินจือ',v:600,e:200},
  d_sangkaya:{n:'สังขยา',v:240,e:30}, d_strawmilk:{n:'สตรอว์เบอร์รีนมสด',v:380,e:40}, d_wmshake:{n:'แตงโมปั่น',v:230,e:30}, d_grandpa:{n:'แกงไร่สุขใจสูตรคุณตา',v:900,e:100}
};
const MACHINES={
  mortar:{x:13,recipes:[{out:'namprik',in:{ch:3},days:1}]},
  jar:{x:14,recipes:[{out:'pkcab',in:{cab:2},days:2},{out:'pkbam',in:{bamboo:2},days:2}]},
  churn:{x:15,recipes:[{out:'butter',in:{milk:1},days:1}]},
  dryer:{x:16,recipes:[{out:'pladry',in:{nil:2},days:1},{out:'chondry',in:{chon:1},days:1}]},
  bee:{x:12,recipes:[{out:'honey',in:{},days:3}]},
  cheese:{x:18,recipes:[{out:'cheese',in:{milk:2},days:2},{out:'gcheese',in:{goatmilk:2},days:2}]},
  sauce:{x:19,recipes:[{out:'fsauce',in:{nil:3},days:4},{out:'fsauce',in:{taphien:3},days:4},{out:'fsauce',in:{plathu:3},days:4}]}
};
const MACH_Y=10;
const DISHES={
  d_crabcurry:{in:{crab:1,egg:1,ch:1},daed:300}, d_tomyumtalay:{in:{squid:1,plathu:1,lgr:1},daed:300}, d_lingzhi:{in:{lingzhi:1,honey:1},daed:500},
  d_kb:{in:{kb:2,ch:1}}, d_omel:{in:{egg:2}}, d_rice:{in:{rice:1,egg:1}}, d_wmshake:{in:{wm:1}},
  d_corn:{in:{corn:1,butter:1}}, d_strawmilk:{in:{straw:1,milk:1}},
  d_tomyum:{in:{chon:1,ch:1},teach:'mee'}, d_kapao:{in:{bas:1,egg:1,rice:1},teach:'ja'}, d_buad:{in:{pump:1,milk:1},teach:'sai'}, d_mango:{in:{mango:1,rice:1,coco:1},teach:'fon'}, d_sangkaya:{in:{egg:2,milk:1},teach:'fon'}, d_gaeng:{in:{bamboo:1,nil:1,ch:1},teach:'ek'}, d_grandpa:{in:{chon:1,rice:1,bamboo:1,butter:1,ch:1},story:true}
};
const WEEKDAYS=['จ.','อ.','พ.','พฤ.','ศ.','ส.','อา.'];
const MARKET={from:480,to:900};
const STALL_MUL=1.2;
const stallPrice=k=>Math.round(unitPrice(k)*STALL_MUL*(S.hot.includes(k)?1.3:1));
const MATS={wood:{n:'ไม้',p:15},stone:{n:'หิน',p:20}};
const LAND_PRICE=1500;
const bcost=B=>Math.round(B.money*(S.perks&&S.perks.carp?.8:1));
const BUILDS={
  gh:{n:'โรงเรือนกระจก',d:'ปลูกผักได้ทุกฤดู 20 แปลง ผักในโรงเรือนไม่เหี่ยว',money:2500,wood:30,stone:20,days:2},
  coop:{n:'ขยายเล้าไก่',d:'แถมไก่ 2 ตัว และเลี้ยงไก่ได้ถึง 8 ตัว',money:800,wood:15,stone:0,days:1},
  barn:{n:'ขยายคอกวัว',d:'แถมวัว 1 ตัว และเลี้ยงวัว แพะ ควาย รวมได้ถึง 8 ตัว',money:1500,wood:20,stone:5,days:2},
  house:{n:'ต่อเติมบ้าน',d:'ห้องนอนใหม่ แรงสูงสุด +30',money:2000,wood:40,stone:10,days:2},
  duckhouse:{n:'เล้าเป็ดริมบ่อ',d:'เลี้ยงเป็ดในบ่อน้ำได้ ซื้อเป็ดที่ร้านป้าแดง',money:900,wood:20,stone:0,days:1},
  fishpond:{n:'บ่อเลี้ยงปลา',d:'ขุดบ่อใต้โรงเรือน เลี้ยงปลานิลหรือกุ้ง ให้อาหารทุกวันแล้วจับขายได้',money:2000,wood:10,stone:15,days:2},
  kitchen:{n:'ครัวไทย',d:'ทำอาหารในบ้าน อาหารฟื้นแรงและขายได้ราคาดี',money:1200,wood:20,stone:10,days:1},
  mortar:{n:'ครกหิน',d:'ตำน้ำพริกเผาจากพริก',money:300,wood:0,stone:10,days:1,mach:true},
  jar:{n:'โอ่งดอง',d:'ดองผักกาดและหน่อไม้ (2 วัน)',money:400,wood:5,stone:5,days:1,mach:true},
  churn:{n:'ถังปั่นเนย',d:'ปั่นนมวัวเป็นเนย',money:800,wood:15,stone:0,days:1,mach:true},
  bee:{n:'รังผึ้ง',d:'ผึ้งทำน้ำผึ้งเองทุก 3 วัน ไม่ต้องใส่อะไร (หน้าร้อนได้ 2 ขวด)',money:600,wood:10,stone:0,days:1,mach:true},
  cheese:{n:'ถังทำชีส',d:'หมักนมวัวหรือนมแพะเป็นชีส (2 วัน)',money:1500,wood:15,stone:5,days:2,mach:true},
  sauce:{n:'โอ่งหมักน้ำปลา',d:'หมักปลาเป็นน้ำปลา (4 วัน)',money:800,wood:5,stone:10,days:1,mach:true},
  dryer:{n:'แคร่ตากปลา',d:'ตากปลาแห้ง วันฝนตกปลาไม่แห้ง',money:300,wood:10,stone:0,days:1,mach:true}
};
const PROJECTS={
  bridge:{n:'ซ่อมสะพานข้ามลำธาร',need:{wood:20,stone:10,money:500},reward:'มีคนใหม่ย้ายมาอยู่ริมลำธาร · ข้ามไปทุ่งริมลำธาร มีของป่า ไม้ และหินเกิดใหม่ทุกวัน'},
  market:{n:'ฟื้นตลาดหมู่บ้าน',need:{kb:5,ch:3,egg:5,milk:2},reward:'พ่อค้ามารับซื้อ ราคาขายของทุกอย่าง +15% · มีร้านอาหารใหม่มาเปิด'},
  temple:{n:'บูรณะวัดเก่า',need:{stone:30,wood:20,rice:3,money:2000},reward:'แรงสูงสุด +20 และหมู่บ้านกลับมาคึกคัก'}
};
const COL_CATS=[
  {id:'veg',n:'ผักและพืชไร่',keys:['kb','ch','wm','corn','rice','cab','straw'],reward:1000},
  {id:'veg2',n:'ผักสวนครัวและผลไม้',keys:['cuc','ebp','bean','pump','lgr','tom','car','bas','mango','banana','coco'],reward:1500},
  {id:'animal',n:'ของจากสัตว์',keys:['egg','milk','duckegg','goatmilk'],reward:600},
  {id:'fish',n:'ปลาและกุ้ง',keys:['nil','chon','buek','duk','taphien','kung','krai','cavefish'],reward:1500},
  {id:'wild',n:'ของป่า',keys:['bamboo','mush','phakwan','makham'],reward:700},
  {id:'trip',n:'ของจากทะเลและน้ำตก',keys:['plathu','crab','squid','lobster','kapong','insee','mahseer','shell','seaweed','oyster','pearl','orchid','lingzhi','honeycomb'],reward:2500},
  {id:'mine',n:'แร่และอัญมณี',keys:['cu','ag','au','ruby','emerald'],reward:1500},
  {id:'proc',n:'ของแปรรูป',keys:['namprik','pkcab','pkbam','butter','pladry','chondry','honey','cheese','gcheese','fsauce'],reward:1200},
  {id:'food',n:'อาหารไทย',keys:['d_kb','d_omel','d_rice','d_wmshake','d_corn','d_strawmilk','d_tomyum','d_sangkaya','d_gaeng','d_kapao','d_buad','d_mango'],reward:2000}
];
// s = seasons it grows in (0 ร้อน, 1 ฝน, 2 หนาว)
const CROPS={
  kb:{n:'ผักบุ้ง',d:2,buy:10,s:[0,1],col:'#4fae3b'},
  ch:{n:'พริก',d:4,buy:20,s:[0,1],col:'#e0402f'},
  wm:{n:'แตงโม',d:6,buy:45,s:[0],col:'#2f7d32'},
  corn:{n:'ข้าวโพด',d:5,buy:30,s:[0,2],col:'#f2c230'},
  rice:{n:'ข้าวหอมมะลิ',d:7,buy:25,s:[1],col:'#e2c25a'},
  cab:{n:'กะหล่ำปลี',d:5,buy:30,s:[2],col:'#bfe39a'},
  straw:{n:'สตรอว์เบอร์รี',d:6,buy:50,s:[2],col:'#e0363f'},
  cuc:{n:'แตงกวา',d:3,buy:15,s:[0,1],col:'#5aa845'},
  ebp:{n:'มะเขือม่วง',d:5,buy:25,s:[0],col:'#7b3f8f'},
  bean:{n:'ถั่วฝักยาว',d:4,buy:18,s:[1],col:'#6fb33f'},
  pump:{n:'ฟักทอง',d:8,buy:40,s:[1,2],col:'#e98a2a'},
  lgr:{n:'ตะไคร้',d:3,buy:12,s:[0,1],col:'#a9c95a'},
  tom:{n:'มะเขือเทศ',d:5,buy:25,s:[2],col:'#e2402f'},
  car:{n:'แครอท',d:4,buy:20,s:[2],col:'#f08a24'},
  bas:{n:'กะเพรา',d:2,buy:8,s:[0,1,2],col:'#4c8f3a'}
};
const FTREES={mango:{n:'มะม่วง',grow:14,every:3,s:[0],price:900},banana:{n:'กล้วย',grow:10,every:5,s:[0,1,2],price:600},coco:{n:'มะพร้าว',grow:16,every:4,s:[0,1,2],price:1200}};
const inFarm=(x,y)=>(x>=2&&x<=16&&y>=6&&y<=16)||(S.land&&inExp(x,y));
const HAY_PRICE=8, KT_PRICE=20;
const TOOLS={
  hoe:{n:['จอบเหล็ก','จอบทองแดง','จอบทอง'],cost:[0,600,1800],stam:[3,5,8]},
  can:{n:['บัวรดน้ำ','บัวทองแดง','บัวทอง'],cost:[0,600,1800],stam:[1,2,3]},
  axe:{n:['ขวานเหล็ก','ขวานทองแดง','ขวานทอง'],cost:[0,400,1200],stam:[5,3,2]},
  hammer:{n:['ค้อนเหล็ก','ค้อนทองแดง','ค้อนทอง'],cost:[0,400,1200],stam:[4,3,2]},
  sickle:{n:['เคียวเหล็ก','เคียวทองแดง','เคียวทอง'],cost:[0,400,1200],stam:[1,1,2]}
};
const toolDesc=(t,lv)=>(t==='hoe'||t==='can'||t==='sickle')?AREA_TXT[lv]:`ใช้แรง ${TOOLS[t].stam[lv]}`;
const AREA_TXT=['1 ช่อง','3 ช่องตรงหน้า','9 ช่อง (3×3)'];
const FISH=[
  {k:'nil',w:40,loc:['pond'],zone:.32,sp:1.1},
  {k:'chon',w:22,loc:['pond'],rain:2.2,zone:.22,sp:1.6},
  {k:'buek',w:5,loc:['pond'],luck:4,zone:.13,sp:2.2},
  {k:'duk',w:30,loc:['pond','stream'],night:true,zone:.25,sp:1.4},
  {k:'taphien',w:40,loc:['stream'],day:true,zone:.3,sp:1.2},
  {k:'kung',w:28,loc:['stream'],season:1,zone:.2,sp:1.8},
  {k:'krai',w:22,loc:['stream'],season:2,zone:.18,sp:1.9},
  {k:'cavefish',w:30,loc:['cave'],zone:.15,sp:2.1},
  {k:'nil',w:10,loc:['cave'],zone:.3,sp:1.2},
  {k:'plathu',w:45,loc:['sea'],zone:.3,sp:1.3},
  {k:'crab',w:22,loc:['sea'],zone:.2,sp:1.7},
  {k:'squid',w:35,loc:['sea'],night:true,zone:.22,sp:1.8},
  {k:'lobster',w:4,loc:['sea'],luck:4,zone:.12,sp:2.3},
  {k:'taphien',w:30,loc:['falls'],zone:.3,sp:1.2},
  {k:'kung',w:20,loc:['falls'],zone:.2,sp:1.8},
  {k:'krai',w:15,loc:['falls'],zone:.18,sp:1.9},
  {k:'mahseer',w:10,loc:['falls'],zone:.14,sp:2.2},
  {k:'kapong',w:32,loc:['deep'],zone:.2,sp:1.7},
  {k:'insee',w:14,loc:['deep'],zone:.15,sp:2.1},
  {k:'lobster',w:8,loc:['deep'],luck:3,zone:.12,sp:2.3},
  {k:'squid',w:22,loc:['deep'],night:true,zone:.22,sp:1.8},
  {k:'plathu',w:22,loc:['deep'],zone:.3,sp:1.3}
];
const BAITS={
  bait_worm:{n:'ไส้เดือน',p:10,d:'ใช้ในน้ำจืด (บ่อ ลำธาร น้ำตก เหมือง) ปลากินเร็วขึ้น ปลาช่อน ปลาดุก กุ้ง ปลากราย ปลาพลวงหินชอบ',loc:['pond','stream','falls','cave'],fast:.6,boost:f=>['chon','duk','kung','krai','mahseer','buek'].includes(f.k)?2.2:1},
  bait_shrimp:{n:'กุ้งฝอย',p:20,d:'ใช้ในทะเลและท่าเรือ ปู ปลาหมึก ปลากะพงชอบ',loc:['sea','deep'],fast:.75,boost:f=>['crab','squid','kapong'].includes(f.k)?2.5:1},
  bait_lure:{n:'เหยื่อปลอม',p:60,d:'ใช้ได้ทุกที่ ปลาหายากตัวใหญ่ชอบมาก (โอกาส ×3)',loc:['pond','stream','falls','cave','sea','deep'],fast:1,boost:f=>f.w<=15?3:1}};
function baitFor(loc){const b=S.bait&&S.inv[S.bait]>0&&BAITS[S.bait];return b&&b.loc.includes(loc)?b:null;}
function baitTxt(){return S.bait&&S.inv[S.bait]>0?` · เหยื่อ${BAITS[S.bait].n} ×${S.inv[S.bait]}`:'';}
function pickFish(loc){
  const night=S.t>=1080||S.t<360,bb=baitFor(loc);if(bb){S.inv[S.bait]--;if(fish)fish.bait=bb.n;}
  const pool=FISH.filter(f=>f.loc.includes(loc)&&(!f.night||night)&&(!f.day||!night)&&(f.season===undefined||f.season===seasonIdx()))
    .map(f=>({...f,wt:f.w*(S.rain&&f.rain?f.rain:1)*(S.luck>0&&f.luck?f.luck:1)*(S.storm&&f.luck?2.5:1)*(lvl('fish')>=10&&f.w<30?2:1)*(bb?bb.boost(f):1)}));
  let r=Math.random()*pool.reduce((a,f)=>a+f.wt,0);for(const f of pool){if((r-=f.wt)<=0)return f;}return pool[0];
}
const waterLoc=(x,y)=>scene==='mine'?'cave':scene==='area'?(S.area==='beach'&&S.py>=12?'deep':AREAS[S.area].fish):x>=26&&x<=27?'stream':'pond';
const henCap=()=>4+(S.built.coop?4:0),pastureCap=()=>5+(S.built.barn?3:0);
const ANIMALS={
  hen:{n:'ไก่',d:'ออกไข่ทุกเช้า อยู่ในเล้าใต้ร้านเมล็ด',p:400,need:()=>S.hens.length<henCap(),needTxt:()=>`เล้าเต็มแล้ว (${henCap()} ตัว)${S.built.coop?'':' · ขยายเล้ากับช่างเอกได้'}`,cnt:()=>`มี ${S.hens.length}/${henCap()}`},
  cow:{n:'วัว',d:'รีดนมได้ทุกวันถ้าเติมหญ้าในราง',p:1500,need:()=>pastureCount()<pastureCap(),needTxt:()=>`คอกเต็มแล้ว (${pastureCap()} ตัว)${S.built.barn?'':' · ขยายคอกกับช่างเอกได้'}`,cnt:()=>`คอก ${pastureCount()}/${pastureCap()}`},
  duck:{n:'เป็ด 2 ตัว',d:'ว่ายน้ำในบ่อ ออกไข่เป็ดทุกเช้า',p:600,need:()=>S.built.duckhouse,needTxt:'ต้องสร้างเล้าเป็ดก่อน'},
  goat:{n:'แพะ',d:'อยู่คอกวัว กินหญ้า ให้นมแพะ',p:1200,need:()=>pastureCount()<pastureCap(),needTxt:()=>`คอกเต็มแล้ว (${pastureCap()} ตัว)`,cnt:()=>`คอก ${pastureCount()}/${pastureCap()}`},
  buffalo:{n:'ควาย',d:'ทุกเช้าช่วยไถดินและถางหญ้าให้',p:2500,need:()=>!S.cows.some(c=>c.kind==='buffalo')&&pastureCount()<pastureCap(),needTxt:'มีควายแล้ว'},
  horse:{n:'ม้า',d:'ขี่เดินทางเร็วขึ้นเกือบเท่าตัว',p:4000,need:()=>!S.horse,needTxt:'มีม้าแล้ว'}
};
const pastureCount=()=>S.cows.length;
const FORAGE_SEASON=[['phakwan','bamboo'],['bamboo','mush','bamboo'],['makham','mush']];
const ORES_FOR=[null,{k:'cu',n:5},{k:'au',n:5}];
const MINE_W=16,MINE_H=11,MINE_MAX=20;
let scene='farm',mine=null,riding=false;

const SEASONS=[{n:'ฤดูร้อน',rain:.08},{n:'ฤดูฝน',rain:.55},{n:'ฤดูหนาว',rain:.05}];
const FESTS=[
  {id:'songkran',n:'สงกรานต์',season:0,day:8,from:540,to:1020,where:'ลานหมู่บ้าน 09:00–17:00',desc:'สาดน้ำกับชาวบ้าน และรดน้ำดำหัวลุงมีเพื่อขอพร'},
  {id:'bangfai',n:'บุญบั้งไฟ',season:1,day:6,from:540,to:1020,where:'ลานหมู่บ้าน 09:00–17:00',desc:'จุดบั้งไฟขอฝนที่ศาลา ยิ่งพุ่งสูงยิ่งได้รางวัลใหญ่'},
  {id:'contest',n:'ประกวดผัก',season:0,day:12,from:540,to:1020,where:'ศาลาหมู่บ้าน 09:00–17:00',desc:'ส่งผักที่ดีที่สุดเข้าประกวด ผักดาวทองได้คะแนนสูง'},
  {id:'contest',n:'ประกวดผัก',season:1,day:12,from:540,to:1020,where:'ศาลาหมู่บ้าน 09:00–17:00',desc:'ส่งผักที่ดีที่สุดเข้าประกวด ผักดาวทองได้คะแนนสูง'},
  {id:'contest',n:'ประกวดผัก',season:2,day:12,from:540,to:1020,where:'ศาลาหมู่บ้าน 09:00–17:00',desc:'ส่งผักที่ดีที่สุดเข้าประกวด ผักดาวทองได้คะแนนสูง'},
  {id:'sand',n:'ประกวดก่อกองทราย',season:0,day:4,from:480,to:960,where:'ชายหาด 08:00–16:00 (นั่งรถสองแถวไป)',desc:'ก่อปราสาททรายแข่งกับชาวบ้าน 3 รอบ ยิ่งแม่นยิ่งได้รางวัลใหญ่',area:'beach',folks:['fon','nun','mint','ja','phum','ton'],at:[[13.2,8.4],[17.9,8.6],[12.4,10.3],[18.7,10.4],[20.6,7.4],[10.6,7.3]]},
  {id:'fishc',n:'แข่งตกปลาน้ำตก',season:1,day:9,from:480,to:900,where:'น้ำตกบนเขา 08:00–15:00 (นั่งรถสองแถวไป)',desc:'ตกปลาที่แอ่งน้ำตก แล้วเอาไปให้ลุงมีตัดสิน ปลาพลวงหินได้ที่ 1',area:'falls',folks:['mee','ek','ton','mint'],at:[[8.5,11.5],[15.5,10.5],[19.6,10.6],[22.5,11.5]]},
  {id:'newyear',n:'ส่งท้ายปีเก่า',season:2,day:14,from:1080,to:1440,where:'ลานหมู่บ้าน 18:00–24:00',desc:'ดูพลุกับชาวบ้าน แล้วไปอธิษฐานขอพรปีใหม่ที่ศาลา'},
  {id:'loy',n:'ลอยกระทง',season:2,day:10,from:1080,to:1320,where:'บ่อน้ำ 18:00–22:00',desc:'ซื้อกระทงที่ศาลา แล้วลอยที่บ่อน้ำตอนค่ำ ขอพรให้โชคดี'}
];
const NPCS={
  mee:{bday:[0,3],home:'home_mee',sched:{all:[[420,'pond'],[720,'plaza'],[840,'pond'],[1110,'home_mee']],rain:[[480,'plaza'],[780,'home_mee']]},
    n:'ลุงมี',role:'ชาวประมงริมบ่อ',shirt:'#3c7a8c',hair:'#d9d6cf',skin:'#d9a878',
    likes:['cuc','nil','chon','buek','egg','rice','d_tomyum','chondry'],pool:['ch','kb','egg','milk','corn','rice'],
    wp:[[7.5,5.6],[12.5,5.6],[2.5,5.6],[9.5,5.6]],spot:{plaza:[21.3,3.8],pond:[3.5,5.6]},
    lines:[["ปลาในบ่อนี้ตัวใหญ่นะ ถ้าใจเย็นพอ","คนเมืองมาทำไร่เหรอ ดีๆ ลุงชอบ"],
           ["ตกปลาเก่งขึ้นแล้วนี่ ดึงให้ตรงจังหวะนะ","หน้าฝนปลาช่อนชอบออกมาหากิน"],
           ["ลุงเคยได้ปลาบึกตัวเท่าเรือ! ...เกือบๆ น่ะ","เอ็งเหมือนลูกหลานลุงแล้ว"]]},
  fon:{bday:[2,13],cand:true,home:'home_fon',sched:{all:[[480,'village'],[900,'plaza'],[1140,'home_fon']],we:[[480,'village'],[600,'farmroad'],[900,'plaza'],[1140,'home_fon']]},
    n:'ฝน',role:'ช่างทำขนมไทย',shirt:'#d9709a',hair:'#2b1d12',skin:'#f1c9a0',
    likes:['pump','mango','wm','milk','egg','straw','d_sangkaya','d_strawmilk'],pool:['wm','egg','milk','kb','nil','straw','corn'],
    wp:[[28.5,5.6],[32.5,5.6],[17.5,5.6],[17.5,8.6],[26.5,8.6]],spot:{plaza:[24.7,3.8],pond:[5.6,5.6]},
    lines:[["สวัสดีค่ะ ฉันทำขนมขายในหมู่บ้าน","แตงโมหวานๆ เอามาทำขนมได้นะ"],
           ["ขนมวันนี้ใช้ไข่จากไร่คุณด้วยนะ","นมวัวสดๆ ทำสังขยาอร่อยมาก"],
           ["คุณเป็นเพื่อนคนสำคัญของฉันเลย","ว่างๆ มาชิมขนมสูตรใหม่ที่บ้านนะ"]]},
  daeng:{bday:[1,7],
    n:'ป้าแดง',role:'เจ้าของร้านเมล็ดพันธุ์',shirt:'#d4453a',hair:'#4a3a2a',skin:'#e8b88a',
    likes:['kb','ch','cab','namprik','pkcab'],pool:['ch','kb','milk','chon','cab','corn'],fixed:[22.5,6.95],spot:{plaza:[23,4.2],pond:[7.6,5.6]},
    lines:[["เมล็ดของป้าคัดมาอย่างดี","ปลูกแล้วอย่าลืมรดน้ำทุกวันนะ"],
           ["ผักบุ้งไร่เธองามดีนี่","หน้าฝนผักโตไว ฝนรดน้ำให้เอง"],
           ["มีอะไรให้ป้าช่วยบอกได้เลย","เธอทำให้หมู่บ้านคึกคักขึ้นเยอะ"]]},
  ek:{bday:[2,2],
    n:'ช่างเอก',role:'ช่างไม้ประจำหมู่บ้าน',shirt:'#8a6a3a',hair:'#3a2a1a',skin:'#c9956a',
    likes:['fsauce','coco','corn','chon','milk','mush','d_rice','d_omel','d_gaeng'],pool:['corn','chon','milk','bamboo','kb'],fixed:[23.6,9.75],spot:{plaza:[23.3,3.2],pond:[8.8,5.6]},
    lines:[["อยากสร้างอะไรบอกช่างได้เลย ขอแค่มีไม้กับหิน","ตอไม้ในที่รกร้างนั่น ผ่าแล้วได้ไม้ดีนะ"],
           ["โรงเรือนกระจกปลูกผักได้ทั้งปีเลยนะ","ข้ามสะพานไปมีหินกับไม้เยอะ"],
           ["ฝีมือทำไร่เอ็ง ช่างยกนิ้วให้","ถ้าวัดสร้างเสร็จ หมู่บ้านเราจะสวยที่สุด"]]},
  nun:{bday:[2,5],cand:true,home:'home_nun',sched:{wk:[[450,'school'],[900,'plaza'],[1080,'village'],[1200,'home_nun']],we:[[480,'meadow'],[720,'pond'],[1020,'plaza'],[1200,'home_nun']]},
    n:'ครูนุ่น',role:'ครูโรงเรียนประจำหมู่บ้าน',shirt:'#6fa8dc',hair:'#3a2a1a',skin:'#f1c9a0',
    likes:['honey','tom','car','d_sangkaya','wm','corn','straw'],pool:['wm','corn','egg','kb','straw'],spot:{plaza:[21.8,3.2],pond:[10.2,5.6]},
    lines:[["เด็กๆ ชอบถามเรื่องไร่ของคุณบ่อยเลย","วันนี้สอนเรื่องวัฏจักรน้ำ ฝนตกแล้วผักโต"],
           ["ขอบคุณที่แวะมาคุยนะ ครูเหงาหลังเลิกเรียน","คุณเป็นตัวอย่างที่ดีให้เด็กๆ เลย"],
           ["วันไหนไม่ได้เจอคุณ รู้สึกขาดอะไรไป","ครูเก็บดอกไม้ที่คุณให้ทับไว้ในหนังสือ"]]},
  ton:{bday:[1,3],cand:true,home:'home_ton',sched:{all:[[480,'clinic'],[1020,'farmroad'],[1140,'home_ton']],we:[[540,'east'],[720,'garden'],[960,'plaza'],[1140,'home_ton']]},
    n:'หมอต้น',role:'หมอประจำอนามัยตำบล',shirt:'#eef3f4',hair:'#2b1d12',skin:'#e8b88a',
    likes:['cheese','straw','d_tomyum','milk','mush'],pool:['milk','egg','straw','chon','cab'],spot:{plaza:[24.4,3.1],pond:[11.4,5.6]},
    lines:[["อย่าลืมดื่มน้ำเยอะๆ ทำไร่กลางแดด","นอนให้พอนะ แรงจะได้เต็ม"],
           ["ตอนเย็นผมวิ่งรอบหมู่บ้าน มาวิ่งด้วยกันไหม","ผักจากไร่คุณทำให้คนไข้ผมอาการดีขึ้น"],
           ["เห็นหน้าคุณแล้วหายเหนื่อยเลย","คุณดูแลตัวเองดีๆ นะ ผมเป็นห่วง"]]},
  phum:{bday:[0,12],cand:true,home:'home_phum',sched:{all:[[600,'east'],[780,'plaza'],[1080,'pond'],[1260,'home_phum']],rain:[[660,'plaza'],[1020,'home_phum']]},
    n:'ภูมิ',role:'นักดนตรีเล่นพิณ',shirt:'#e0a03a',hair:'#1b1510',skin:'#c9956a',
    likes:['bamboo','d_gaeng','namprik','chondry'],pool:['bamboo','namprik','ch','corn'],spot:{plaza:[25.3,3.9],pond:[4.6,5.6]},
    lines:[["เสียงไก่ในไร่คุณเป็นจังหวะดีนะ","พิณตัวนี้ตกทอดมาจากปู่"],
           ["เพลงใหม่ได้แรงบันดาลใจจากทุ่งนา","ตอนค่ำไปฟังเพลงที่ริมบ่อสิ"],
           ["ทุกเพลงช่วงนี้มีคุณอยู่ในนั้น","อยากเล่นพิณให้คุณฟังทุกเย็นเลย"]]},
  sai:{bday:[1,11],home:'home_sai',sched:{all:[[390,'temple'],[600,'garden'],[960,'plaza'],[1080,'home_sai']],rain:[[540,'plaza'],[840,'home_sai']]},
    n:'ยายสาย',role:'ผู้เฒ่าใจดีของหมู่บ้าน',shirt:'#8fbf6a',hair:'#e8e6e0',skin:'#d9a878',
    likes:['honey','pump','d_buad','d_sangkaya','bamboo','rice','pkcab'],pool:['rice','kb','bamboo','pkcab'],spot:{plaza:[22.1,4.3],pond:[6.6,5.6]},
    lines:[["หลานมาทำไร่ ยายดีใจนะ","ดอกไม้ในสวนยายบานสวยทุกหน้าหนาว"],
           ["สมัยยายสาวๆ หมู่บ้านนี้ครึกครื้นมาก","กินข้าวให้อิ่ม ทำงานจะได้มีแรง"],
           ["หลานเหมือนลูกหลานยายแท้ๆ","ยายขอให้หลานมีความสุขมากๆ"]]}
};
// ---- newcomers (move in as the village grows)
Object.assign(NPCS,{
  mint:{bday:[0,6],cand:true,arrive:'bridge',home:'home_mint',way:'walk',
    sched:{all:[[420,'meadow'],[660,'garden'],[900,'pond'],[1050,'plaza'],[1170,'home_mint']],rain:[[480,'home_mint'],[720,'plaza'],[900,'home_mint']]},
    n:'มิ้นท์',role:'ไกด์เดินป่า รักธรรมชาติ',shirt:'#6d8f3a',hair:'#3a2616',skin:'#e8b88a',
    likes:['lgr','banana','mush','phakwan','bamboo','makham','krai','kung','d_gaeng'],hates:['ruby','emerald','au','ag','butter','d_strawmilk'],
    pool:['mush','phakwan','bamboo','makham','taphien'],spot:{plaza:[25.9,4.4],pond:[12.6,5.6]},
    lines:[["หวัดดี! ฉันมิ้นท์ มาเป็นไกด์ป่าแถวนี้","สะพานซ่อมเสร็จ ทุ่งริมลำธารเลยเดินได้แล้ว"],
           ["เห็ดโคนขึ้นหลังฝนตกนะ ไปหาด้วยกันไหม","ของแพงๆ ไม่ต้องหรอก ชวนไปเดินป่าก็พอ"],
           ["เดินป่ากับเธอสนุกกว่าเดินคนเดียวเยอะ","วันไหนไม่ได้เจอ ป่าก็ดูเงียบไปเลย"]]},
  ja:{bday:[1,9],cand:true,arrive:'market',home:'home_ja',way:'shop',
    sched:{all:[[420,'resto'],[1110,'plaza'],[1230,'home_ja']],we:[[480,'resto'],[900,'village'],[1080,'plaza'],[1230,'home_ja']]},
    n:'จ๋า',role:'เจ้าของร้านข้าวแกง',shirt:'#e8873a',hair:'#15100c',skin:'#f1c9a0',
    likes:['fsauce','bas','lgr','d_kapao','d_gaeng','d_tomyum','namprik','rice','ch','chondry'],hates:['guano','cavefish'],
    pool:['ch','rice','kb','egg','chon','cab','corn'],spot:{plaza:[20.6,4.4],pond:[13.6,5.6]},
    lines:[["มาใหม่นะ ฉันจ๋า เปิดร้านข้าวแกงข้างลาน","ตลาดคึกคักแล้ว ถึงเวลาเปิดร้านสักที"],
           ["ผักจากไร่เธอทำแกงอร่อยขึ้นเยอะ","ลูกค้าถามหาเมนูใหม่ทุกวันเลย ช่วยคิดหน่อยสิ"],
           ["ร้านโตได้ขนาดนี้เพราะเธอเลยนะ","ถ้าวันหนึ่งเปิดสาขาสอง อยากให้เธอเป็นหุ้นส่วน"]]}
});
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pn=()=>esc(S.pname||'เจ้าของไร่');
const GREET={mee:n=>`อ้าว ${n} มาแล้วเหรอ วันนี้ปลากินเบ็ดดีนะ`,fon:n=>`${n}! วันนี้ฉันทำขนมเผื่อด้วยนะ`,daeng:n=>`${n} จ๊ะ ต้องการเมล็ดอะไรบอกป้าได้`,ek:n=>`ว่าไง ${n} มีอะไรให้ช่างสร้างไหม`,nun:n=>`สวัสดีค่ะคุณ${n} เด็กๆ ถามถึงอยู่เลย`,ton:n=>`คุณ${n} วันนี้พักผ่อนพอไหมครับ`,phum:n=>`${n} มาฟังเพลงใหม่ผมหน่อยสิ`,sai:n=>`หลาน${n} กินข้าวหรือยังลูก`,mint:n=>`${n}! เจอรอยนากที่ลำธารอีกแล้วนะ`,ja:n=>`${n} มาพอดี แกงหม้อใหม่เพิ่งเสร็จ`};
const here=id=>{const a=NPCS[id].arrive;return!a||!!(S.town&&S.town[id]);};
const FRIEND2={ton:["ผักจากไร่คุณช่วยคนไข้ได้เยอะจริงๆ","ทำงานหนักอย่าลืมพักนะ ผมเป็นห่วง"],phum:["เพลงใหม่ผมตั้งชื่อว่าไร่สุขใจ","ถ้าไม่มีคุณ หมู่บ้านคงไม่คึกคักขนาดนี้"]};
const LINES0={ton:NPCS.ton.lines[2],phum:NPCS.phum.lines[2]};
function applyCands(){for(const id of ['ton','phum']){const leg=S.rel.date===id||S.rel.spouse===id;NPCS[id].cand=leg;NPCS[id].lines[2]=leg?LINES0[id]:FRIEND2[id];}}
const PLACES={
  pond:{n:'ริมบ่อน้ำ',wp:[[7.5,5.6],[12.5,5.6],[2.5,5.6],[9.5,5.6]]},
  plaza:{n:'ลานหมู่บ้าน',wp:[[21.5,3.8],[24.5,3.8],[22.8,4.3]]},
  village:{n:'ในหมู่บ้าน',wp:[[28.5,5.6],[32.5,5.6],[26.5,8.6],[30,5.6]]},
  farmroad:{n:'ถนนหน้าไร่',wp:[[17.5,5.6],[17.5,8.6],[14.5,5.6]]},
  east:{n:'ท้ายหมู่บ้าน',wp:[[37.5,5.6],[41.5,5.6],[39.5,8.6],[41.5,13.5]]},
  garden:{n:'สวนดอกไม้ยาย',wp:[[37.5,20],[40.5,21],[41.5,19],[38.5,22.5]]},
  temple:{n:'วัด',wp:[[11.5,4.6],[12.5,4.6]]},
  meadow:{n:'ทุ่งริมลำธาร',wp:[[29.5,19.5],[32.5,21.5],[30.5,23]],needBridge:true},
  school:{n:'โรงเรียน',at:[39.5,4.6]},
  clinic:{n:'อนามัย',at:[38.5,13.5]},
  farm:{n:'ไร่ของเรา',wp:[[16.5,5.6],[18.5,6.6],[14.2,6.6],[13.5,5.6]]},
  home_mee:{n:'บ้าน',home:[28.5,4.6]},home_fon:{n:'บ้าน',home:[32.5,4.6]},home_nun:{n:'บ้านพักครู',home:[39.5,4.6]},
  home_ton:{n:'บ้านพักหมอ',home:[38.5,13.5]},home_phum:{n:'บ้าน',home:[41.5,13.5]},home_sai:{n:'บ้าน',home:[38.5,17.5]},
  home_farm:{n:'บ้านเรา',home:[17.5,5.4]},
  resto:{n:'ร้านข้าวแกงจ๋า',wp:[[29.5,8.6],[28.3,8.6],[30.7,8.6]]},
  home_mint:{n:'กระท่อมริมลำธาร',home:[33.5,21.5]},home_ja:{n:'ร้านข้าวแกง',home:[29.5,8.5]}
};
const EVENTS_NEW={
  mint:{3:{t:'รอยเท้าในทุ่ง',l:['มิ้นท์ก้มดูรอยเท้าเล็กๆ ริมลำธาร','“รอยนากนะ! ถ้าเงียบๆ อาจได้เห็นตัว”'],c:[['นั่งรอดูด้วยกัน','นากโผล่มาจริงๆ! มิ้นท์ตาเป็นประกาย “เธอใจเย็นเก่งนะ”',1],['ไว้คราวหน้าดีกว่า','“โอเค ไว้คราวหน้านะ” มิ้นท์โบกมือ',0]]},
        6:{t:'ติดฝนในป่า',l:['ฝนตกหนัก มิ้นท์หลบอยู่ใต้ต้นไม้ใหญ่','“แผนที่เปียกหมดเลย... ดีใจที่เธอมา”'],c:[['ถอดเสื้อคลุมให้ใส่','มิ้นท์ยิ้มกว้าง “อบอุ่นดีจัง” ทั้งสองเดินกลับด้วยกัน',1],['วิ่งฝ่าฝนกลับกันเถอะ','ทั้งคู่วิ่งฝ่าฝนหัวเราะไปตลอดทาง',1]]},
        9:{t:'ทะเลหมอกตอนเช้า',love:true,l:['มิ้นท์ชวนขึ้นเนินตั้งแต่ตีห้าไปดูทะเลหมอก','“ที่นี่คือที่ที่ฉันชอบที่สุด... เลยอยากพาคนที่ชอบที่สุดมาด้วย”'],c:[['ฉันก็ชอบเธอเหมือนกัน','มิ้นท์หน้าแดง แล้วจับมือคุณไว้แน่น',1],['วิวสวยจริงๆ','“ใช่... สวยจริงๆ” มิ้นท์ยิ้มเขินๆ',0]]}},
  ja:{3:{t:'แกงหม้อแรก',l:['จ๋ายื่นช้อนแกงหน่อไม้มาให้','“ชิมหน่อย บอกตรงๆ นะ”'],c:[['เข้มข้นดี เติมพริกอีกนิด','“โห ลิ้นดีนี่!” จ๋ารีบจดสูตรใหม่',1],['อร่อยสุดๆ','“ปากหวานนะเรา” จ๋าหัวเราะ',0]]},
      6:{t:'วันที่ร้านเงียบ',l:['วันนี้ร้านจ๋าไม่มีลูกค้าเลย','“หรือฉันไม่เหมาะกับการทำร้านจริงๆ”'],c:[['เดี๋ยวช่วยแจกใบปลิวเอง','บ่ายนั้นลูกค้าเต็มร้าน จ๋ากอดคุณแน่น “ขอบใจนะ!”',2],['พักสักวันไหม','“พักไม่ได้หรอก แต่ขอบใจที่ห่วงนะ”',0]]},
      9:{t:'ป้ายร้านใหม่',love:true,l:['จ๋าชี้ป้ายร้านที่เพิ่งทาสีใหม่','“ฉันอยากให้ร้านนี้มีเธออยู่ด้วยตลอดไป... เป็นหุ้นส่วนชีวิตกันไหม”'],c:[['ตกลง ฉันอยู่ข้างเธอเสมอ','จ๋ายิ้มทั้งน้ำตา “พูดแล้วห้ามคืนคำนะ”',1],['ขอคิดก่อนนะ','“ไม่เป็นไร รอได้” จ๋ายักคิ้ว',0]]}}
};
const EVENTS={
  fon:{3:{t:'ขนมชั้นสูตรใหม่',l:['ฝนยื่นขนมชั้นสีสวยมาให้','“ลองชิมหน่อยสิ สูตรใหม่ของฉันเอง”'],c:[['อร่อยมาก หวานกำลังดี','จริงเหรอ! ดีใจจัง จะทำให้กินอีกนะ',1],['หวานไปนิดนะ','ขอบคุณที่บอกตรงๆ คราวหน้าจะลดน้ำตาล',0]]},
       6:{t:'ร้านขนมในฝัน',l:['ฝนนั่งมองตลาดนัดอยู่นาน','“ฉันอยากมีร้านขนมเป็นของตัวเองสักวัน”'],c:[['ต้องได้เปิดแน่ ฉันจะส่งไข่กับนมให้','ถ้ามีคุณช่วย ฉันกล้าฝันใหญ่ขึ้นเลย',1],['เปิดร้านเหนื่อยนะ','ก็จริง... แต่ฉันจะลองดู',0]]},
       9:{t:'ใต้แสงโคม',l:['เย็นนี้ฝนชวนนั่งดูพระอาทิตย์ตกที่ลาน','“อยู่กับคุณแล้วฉันสบายใจที่สุด”'],c:[['ฉันก็รู้สึกแบบเดียวกัน','ฝนยิ้มเขินๆ แล้วเอนหัวพิงไหล่คุณ',1],['ลมเย็นดีนะ','“อืม... ลมเย็นดี” ฝนหัวเราะเบาๆ',0]]}},
  ton:{3:{t:'หมอก็เหนื่อยเป็น',l:['หมอต้นนั่งพักหน้าอนามัย หน้าตาอ่อนเพลีย','“วันนี้คนไข้เยอะมากเลย”'],c:[['หมอพักบ้างนะ เดี๋ยวเอาน้ำมาให้','ขอบคุณนะ ไม่ค่อยมีใครห่วงหมอแบบนี้',1],['งานหมอก็แบบนี้แหละ','ฮ่าๆ ก็จริง ต้องอดทน',0]]},
       6:{t:'วิ่งรอบหมู่บ้าน',l:['หมอต้นใส่รองเท้าวิ่งมาหาที่ไร่','“ทำไร่แข็งแรงแบบนี้ วิ่งด้วยกันไหวไหม”'],c:[['ไหวสิ ไปด้วยกัน!','สองคนวิ่งจนพระอาทิตย์ตก หมอต้นหัวเราะไม่หยุด',1],['ขอเดินดีกว่า','ได้ๆ เดินก็ดีต่อหัวใจเหมือนกัน',0]]},
       9:{t:'คำสารภาพ',l:['หมอต้นยื่นดอกมะลิให้หนึ่งดอก','“ผมชอบวันที่คุณแวะมาที่อนามัยที่สุด”'],c:[['ฉันแวะไปเพราะอยากเจอหมอนั่นแหละ','หมอต้นหน้าแดงไปจนถึงหู',1],['หมอต้องการคนช่วยงานเหรอ','“เปล่า... ช่างเถอะ” หมอต้นยิ้มเขิน',0]]}},
  nun:{3:{t:'ห้องเรียนกลางไร่',l:['ครูนุ่นมาพร้อมสมุดจดงาน','“ให้เด็กๆ มาเรียนรู้การปลูกผักที่ไร่ได้ไหม”'],c:[['ยินดีเลย มาได้ทุกเมื่อ','เด็กๆ ต้องดีใจมากแน่ๆ ขอบคุณนะ',1],['ไร่ยังรกอยู่เลย','ไม่เป็นไร ไว้ไร่สวยแล้วค่อยมา',0]]},
       6:{t:'หนังสือเล่มโปรด',l:['ครูนุ่นกอดหนังสือเก่าเล่มหนึ่งไว้แน่น','“คุณชอบอ่านเรื่องแบบไหน”'],c:[['ชอบเรื่องผจญภัย','เหมือนกันเลย! ครูจะให้ยืมเล่มนี้นะ',1],['ไม่ค่อยได้อ่านเลย','งั้นครูจะเลือกเล่มสนุกๆ ให้',0]]},
       9:{t:'ดาวตก',l:['คืนฟ้าใส ครูนุ่นชี้ขึ้นฟ้า','“ดาวตก! คุณอธิษฐานอะไรไว้”'],c:[['ขอให้ได้อยู่ใกล้ครูแบบนี้ไปนานๆ','ครูนุ่นเงียบไปนาน ก่อนกระซิบว่า “ครูก็ขอแบบนั้น”',1],['ขอให้ผักงาม','ครูนุ่นหัวเราะจนน้ำตาไหล',0]]}},
  phum:{3:{t:'เพลงริมบ่อ',l:['ภูมิดีดพิณอยู่ริมบ่อ','“เพลงนี้แต่งเอง เป็นไงบ้าง”'],c:[['เพราะมาก ฟังแล้วคิดถึงบ้าน','นั่นแหละที่อยากให้รู้สึก ขอบคุณนะ',1],['จังหวะเร็วไปหน่อย','งั้นลองช้าลงดู',0]]},
        6:{t:'เสียงของไร่',l:['ภูมิเดินมาถึงไร่ตอนเช้า','“ขออยู่ฟังเสียงไร่สักวัน จะเอาไปแต่งเพลง”'],c:[['มาเลย อยู่ได้ทั้งวัน','ภูมิจดโน้ตเพลงไปเต็มสมุด',1],['ไร่เสียงดังนะ มีแต่ไก่','นั่นแหละที่ต้องการ!',0]]},
        9:{t:'เพลงให้คุณ',l:['ภูมิขอให้คุณนั่งฟังเพลงใหม่','“เพลงนี้แต่งให้คุณคนเดียว”'],c:[['เป็นเพลงที่เพราะที่สุดที่เคยฟัง','ภูมิยิ้มกว้างที่สุดเท่าที่เคยเห็น',1],['ชื่อเพลงอะไร','“ยังไม่ตั้ง... รอให้คุณตั้งให้”',0]]}},
  mee:{5:{t:'เบ็ดของลุง',l:['ลุงมียื่นคันเบ็ดไม้ไผ่เก่าๆ ให้','“คันนี้ลุงใช้มาสามสิบปี เอ็งเอาไปใช้เถอะ”'],c:[['ขอบคุณลุง จะดูแลอย่างดี','(ได้เบ็ดไม้ไผ่ของลุงมี: ช่องเขียวตอนตกปลากว้างขึ้น)',1]],perk:'rod'}},
  daeng:{5:{t:'เมล็ดพันธุ์ลับ',l:['ป้าแดงแอบยื่นห่อกระดาษเล็กๆ ให้','“เมล็ดคัดพิเศษ ป้าเก็บไว้ให้คนที่ป้าไว้ใจ”'],c:[['ขอบคุณมากป้า','(ได้เมล็ดประจำฤดูเพิ่ม 10 เมล็ด)',1]],perk:'seeds'}},
  ek:{5:{t:'ลูกค้าประจำ',l:['ช่างเอกตบบ่าเบาๆ','“ต่อไปงานสร้างอะไร ช่างลดให้ 20% เพื่อนกันนี่หว่า”'],c:[['ขอบคุณช่าง!','(ค่าก่อสร้างทุกอย่างถูกลง 20%)',1]],perk:'carp'}},
  sai:{5:{t:'ผ้าขาวม้าของยาย',l:['ยายสายคลี่ผ้าขาวม้าลายตาหมากรุก','“ยายทอเอง เอาไว้เช็ดเหงื่อตอนทำไร่นะหลาน”'],c:[['ขอบคุณจ้ะยาย','(แรงสูงสุด +10)',1]],perk:'cloth'}}
};
const EVENTS_MORE={
 fon:{2:{t:'ขนมหล่น',l:['ฝนเดินชนคุณจนถาดขนมหล่นกระจาย','“ขอโทษๆ! ขนมเลอะหมดเลย”'],c:[['ช่วยเก็บ แล้วชิมชิ้นที่ยังดี','ฝนหัวเราะ “ชิ้นนั้นหล่นพื้นแล้วนะ!” แต่ก็ยิ้มกว้าง',1],['ไม่เป็นไร ระวังด้วยนะ','“อื้อ ขอบใจนะ” ฝนรีบเก็บของ',0]]},
      4:{t:'เตาดับ',l:['เตาถ่านของฝนดับกลางคัน ทั้งที่มีออเดอร์ขนมเยอะ','“ทำไงดี ลูกค้ารออยู่”'],c:[['วิ่งไปยืมเตาช่างเอกมาให้','ขนมเสร็จทันเวลา ฝนยกนิ้วให้ “คุณคือฮีโร่ของฉัน”',2],['ลองพัดไฟดูไหม','ไฟติดขึ้นมาได้ “ขอบคุณนะ”',1]]},
      8:{t:'ขนมรูปหัวใจ',l:['ฝนยื่นขนมชั้นรูปหัวใจให้แบบเขินๆ','“อันนี้ทำให้คุณคนเดียว... ไม่ได้ขายนะ”'],c:[['ขอบคุณ จะกินให้หมดเลย','ฝนหน้าแดงจนถึงหู “กินช้าๆ ก็ได้”',1],['สวยจนไม่กล้ากิน','“งั้นเก็บไว้ดูก่อนก็ได้” ฝนหัวเราะคิกคัก',1]]},
      10:{t:'ร้านขนมของเรา',love:true,l:['ฝนพาคุณไปดูห้องแถวว่างข้างตลาด','“ถ้าวันหนึ่งฉันเปิดร้าน... อยากให้มีคุณอยู่ในทุกเช้าของฉัน”'],c:[['ไม่ว่าร้านไหน ฉันจะอยู่ด้วย','ฝนจับมือคุณแน่น น้ำตาคลอ “สัญญานะ”',1],['ฉันจะเป็นลูกค้าประจำ','“ลูกค้าประจำตลอดชีวิตเลยนะ” ฝนยิ้ม',0]]}},
 nun:{2:{t:'หนังสือหาย',l:['ครูนุ่นก้มหาอะไรบางอย่างใต้ต้นไม้','“หนังสือเรียนของเด็กๆ หายไปเล่มหนึ่ง”'],c:[['ช่วยหาจนเจอ','เจอในพุ่มไม้! ครูนุ่นยิ้มโล่งอก “ขอบคุณมากค่ะ”',1],['เดี๋ยวคงมีคนเก็บได้','“ค่ะ... หวังว่าอย่างนั้น”',0]]},
      4:{t:'สอนแทนหนึ่งคาบ',l:['ครูนุ่นเป็นหวัด เสียงแหบ','“ช่วยเล่าเรื่องการปลูกผักให้เด็กๆ ฟังแทนครูได้ไหม”'],c:[['ได้เลย เดี๋ยวเล่าเรื่องไร่ให้ฟัง','เด็กๆ ตั้งใจฟังมาก ครูนุ่นกระซิบ “คุณเป็นครูที่ดีนะ”',2],['ครูพักก่อนดีกว่า','“ขอบคุณที่เป็นห่วงนะคะ”',1]]},
      8:{t:'โน้ตในหนังสือ',l:['คุณเจอกระดาษโน้ตเหน็บในหนังสือที่ครูนุ่นให้ยืม','ลายมือเขียนว่า “ขอบคุณที่ทำให้ทุกวันมีความหมาย”'],c:[['เขียนตอบแล้วเหน็บคืน','วันต่อมาครูนุ่นเดินผ่านแล้วยิ้มเขิน ไม่พูดอะไรเลย',1],['ถามครูนุ่นตรงๆ','“อ๊ะ! ลืมเอาออก...” ครูนุ่นหน้าแดงก่ำ',1]]},
      10:{t:'ดาวของเรา',love:true,l:['ครูนุ่นปูเสื่อกลางทุ่ง ชี้ดาวทีละดวง','“ดาวดวงนั้น ขอตั้งชื่อว่าดาวของเราได้ไหม”'],c:[['ได้สิ ดาวของเราสองคน','ครูนุ่นเอนศีรษะพิงไหล่คุณเงียบๆ',1],['ตั้งชื่อตามครูดีกว่า','“ดาวนุ่น... ก็เพราะดีนะ” เธอหัวเราะ',0]]}},
 mint:{2:{t:'แผนที่ขาด',l:['มิ้นท์นั่งต่อแผนที่ที่ขาดเป็นชิ้นๆ','“ลมพัดหลุดมือตอนข้ามลำธาร”'],c:[['ช่วยต่อด้วยกัน','ต่อเสร็จ! มิ้นท์วาดรูปเราสองคนไว้ที่มุมแผนที่',1],['วาดใหม่ง่ายกว่านะ','“จริงด้วย ไว้วาดใหม่ก็ได้”',0]]},
      4:{t:'นกปีกเจ็บ',l:['มิ้นท์ประคองนกกระจิบปีกเจ็บไว้ในมือ','“ต้องหาที่ให้มันพักสักคืน”'],c:[['ทำรังในไร่ให้','เช้าต่อมานกบินได้ มิ้นท์กอดคุณแน่น “ใจดีที่สุดเลย”',2],['พาไปหาหมอต้น','หมอต้นช่วยพันปีกให้ มิ้นท์โล่งใจมาก',1]]},
      8:{t:'สร้อยเมล็ดไม้',l:['มิ้นท์ร้อยเมล็ดมะกล่ำตาหนูเป็นสร้อยข้อมือ','“ทำสองเส้น... อีกเส้นให้เธอ”'],c:[['ใส่ตอนนี้เลย','มิ้นท์ผูกให้เบาๆ “ห้ามถอดนะ”',1],['เก็บไว้อย่างดี','“ใส่บ้างนะ!” มิ้นท์ทำหน้าบึ้งแต่ยิ้ม',1]]},
      10:{t:'ภูเขาลูกถัดไป',love:true,l:['มิ้นท์กางแผนที่ ชี้ภูเขาไกลๆ','“ทุกที่ที่ฉันอยากไปต่อจากนี้ อยากไปกับเธอ”'],c:[['ไปด้วยกันทุกที่','มิ้นท์กระโดดกอด “งั้นเริ่มจากที่นี่ ไร่ของเรา”',1],['ขอกลับมาดูไร่ด้วยนะ','“แน่นอน ไร่คือบ้านของเรา”',0]]}},
 ja:{2:{t:'พริกหมดร้าน',l:['จ๋าวิ่งหน้าตั้งมาที่ไร่','“พริกหมดร้าน! มีขายบ้างไหม”'],c:[['เก็บจากแปลงให้เลย','“ช่วยชีวิตร้านไว้เลยนะเนี่ย!”',1],['ลองไปร้านป้าแดงดู','“โอเค งั้นไปก่อนนะ!”',0]]},
     4:{t:'ลูกค้าจุกจิก',l:['ลูกค้าขาประจำบ่นว่าแกงเผ็ดเกินไป','จ๋าหันมามองคุณแบบขอความช่วยเหลือ'],c:[['เสนอทำแกงเผ็ดน้อยอีกหม้อ','ลูกค้าติดใจ จ๋าแอบชูนิ้วให้ “หัวการค้ามากนะเรา”',2],['ปล่อยให้จ๋าจัดการ','จ๋าพูดเก่ง ลูกค้ายิ้มกลับไป',1]]},
     8:{t:'เมนูชื่อเรา',l:['จ๋าชี้กระดานเมนูที่มีชื่อเมนูใหม่','“แกงไร่พิเศษ... ตั้งชื่อตามไร่เธอนะ”'],c:[['ขอชิมเป็นคนแรก','“ก็ทำไว้ให้เธอชิมคนแรกอยู่แล้ว” จ๋ายักคิ้ว',1],['เขินนะเนี่ย','“เขินเป็นด้วยเหรอ” จ๋าหัวเราะเสียงดัง',1]]},
     10:{t:'หุ้นส่วนชีวิต',love:true,l:['หลังร้านปิด จ๋านั่งนับเงินแล้วหยุดมือ','“ร้านนี้โตได้เพราะเธอ... ถ้าให้เลือกหุ้นส่วนชีวิต ฉันเลือกเธอ”'],c:[['ฉันก็เลือกเธอ','จ๋ายิ้มกว้างที่สุดเท่าที่เคยเห็น “ดีล!”',1],['เซ็นสัญญาเลยไหม','“เซ็นด้วยหัวใจก็พอ” จ๋าหน้าแดง',1]]}}
};
for(const id in EVENTS_MORE){EVENTS_NEW[id]=EVENTS_NEW[id]||{};}
Object.assign(EVENTS,EVENTS_NEW);
for(const id in EVENTS_MORE){EVENTS[id]=Object.assign({},EVENTS_MORE[id],EVENTS[id]||{});}for(const id of ['ton','phum'])if(EVENTS[id]&&EVENTS[id][9])EVENTS[id][9].love=true;
const GOALS=[
  {t:'เดินไปแปลงผักซ้ายมือ เก็บพริกที่สุก',ok:()=>S.col.ch>0,r:50},
  {t:'เอาผักไปส่งขายที่ถังไม้ข้างแปลง',ok:()=>S.stats.shipped>0,r:50},
  {t:'รดน้ำผักที่ยังไม่ได้น้ำ',ok:()=>S.stats.watered>0,r:30},
  {t:'ปลูกเมล็ดผักบุ้งในแปลงว่าง',ok:()=>S.stats.planted>0,r:30},
  {t:'ไถดินแปลงใหม่ แล้วปลูกผักให้ครบ 5 แปลง',ok:()=>(S.stats.planted||0)>=5,r:60},
  {t:'เก็บไข่ไก่ในเล้า (ใต้ร้านเมล็ด)',ok:()=>S.col.egg>0,r:50},
  {t:'คุยกับชาวบ้านสักคน',ok:()=>Object.values(S.npc).some(n=>n.h>(n===S.npc.daeng?1:0)),r:50},
  {t:'ตกปลาที่บ่อน้ำ (มุมซ้ายบนของไร่) ให้ได้ 1 ตัว',ok:()=>['nil','chon','buek','duk','taphien','kung','krai'].some(k=>S.col[k]>0),r:80},
  {t:'กลับบ้านแล้วนอนเพื่อจบวัน',ok:()=>S.day>=2,r:100},
  {t:'ซื้อเมล็ดหรือหญ้าแห้งที่ร้านป้าแดง',ok:()=>S.stats.bought>0,r:50},
  {t:'เติมหญ้าในรางวัว (ในคอกขวามือ)',ok:()=>S.stats.fed>0,r:50},
  {t:'ทำงานรับจ้างจากกระดานมุมลานหมู่บ้าน',ok:()=>S.stats.job>0,r:100},
  {t:'ช่วยตามคำขอชาวบ้านที่มีป้าย !',ok:()=>Object.values(S.npc).some(n=>n.req&&n.req.done)||S.ledger['คำขอชาวบ้าน'],r:100},
  {t:'เก็บเงินซื้อที่ดินหลังไร่ (ประตูทางใต้)',ok:()=>S.land,r:300},
  {t:'สั่งสร้างอะไรสักอย่างกับช่างเอก',ok:()=>!!S.build||Object.keys(S.built).length>0,r:200},
  {t:'ลงเหมืองที่ถ้ำท้ายป่าตะวันออก',ok:()=>S.mineDeep>0,r:200}
];
const SQ=[
 [{t:'เก็บแตงโม',k:'col:wm',n:5,r:400},{t:'รายได้รวมในฤดูนี้',k:'earned',n:4000,r:500,money:1},{t:'ตกปลาให้ได้',k:'stat:fish',n:10,r:350},{t:'ให้ของขวัญชาวบ้าน',k:'stat:gift',n:6,r:300},{t:'เก็บไข่ไก่',k:'col:egg',n:15,r:300}],
 [{t:'เก็บข้าวหอมมะลิ',k:'col:rice',n:5,r:450},{t:'เก็บฟักทอง',k:'col:pump',n:3,r:450},{t:'ช่วยคำขอชาวบ้าน',k:'stat:req',n:5,r:500},{t:'ลงเหมืองให้ถึงชั้น',k:'mine',n:5,r:500,abs:1},{t:'ทำอาหาร',k:'stat:cook',n:4,r:400}],
 [{t:'เก็บสตรอว์เบอร์รี',k:'col:straw',n:5,r:450},{t:'เก็บมะเขือเทศ',k:'col:tom',n:5,r:400},{t:'ทำของแปรรูป',k:'stat:proc',n:3,r:400},{t:'ส่งผักเข้าประกวด',k:'stat:contest',n:1,r:300},{t:'ทำงานรับจ้างจากกระดาน',k:'stat:job',n:3,r:350}]
];
const SQ_BONUS=[{t:'ต้นกล้ามะม่วง 1 ต้น และเงิน ฿1,500',f:()=>{S.decoInv.tr_mango=(S.decoInv.tr_mango||0)+1;S.money+=1500;earn('ภารกิจประจำฤดู',1500);}},
  {t:'สปริงเกอร์เงิน 2 อัน และเงิน ฿2,000',f:()=>{S.decoInv.spr2=(S.decoInv.spr2||0)+2;S.money+=2000;earn('ภารกิจประจำฤดู',2000);}},
  {t:'แรงสูงสุด +10 และเงิน ฿2,500',f:()=>{S.maxStam+=10;S.money+=2500;earn('ภารกิจประจำฤดู',2500);}}];
function sqRaw(k){if(k==='earned')return S.stats.earned||0;if(k==='mine')return S.mineDeep||0;const [a,b]=k.split(':');return a==='col'?(S.col[b]||0):(S.stats[b]||0);}
function sqSnap(){const b={};for(const L of SQ)for(const q of L)b[q.k]=sqRaw(q.k);return b;}
function sqStart(){const yr=Math.floor((S.day-1)/YEAR);S.sq={si:seasonIdx(),yr,base:sqSnap(),done:[],bonus:false};}
const sqMul=()=>1+Math.min(2,(S.sq?S.sq.yr:0))*.5;
function sqNeed(q){return q.abs?q.n+Math.min(15,(S.sq.yr||0)*5):Math.round(q.n*sqMul()/(q.money?50:1))*(q.money?50:1);}
function sqProg(q){return q.abs?sqRaw(q.k):sqRaw(q.k)-(S.sq.base[q.k]||0);}
function checkQuests(){
  if(!S.sq||S.sq.si!==seasonIdx()||S.sq.yr!==Math.floor((S.day-1)/YEAR))sqStart();
  const L=SQ[S.sq.si];
  L.forEach((q,i)=>{if(S.sq.done.includes(i))return;if(sqProg(q)>=sqNeed(q)){S.sq.done.push(i);const r=Math.round(q.r*sqMul());S.money+=r;earn('ภารกิจประจำฤดู',r);sfx('upgrade');toast(`ภารกิจ${season().n}สำเร็จ: ${q.t} +฿${r}`);}});
  if(!S.sq.bonus&&S.sq.done.length>=L.length){S.sq.bonus=true;SQ_BONUS[S.sq.si].f();sfx('upgrade');setTimeout(()=>{if(modal.hidden)openQuests(true);},400);}
}
function sqLine(){const L=SQ[S.sq.si],i=L.findIndex((q,j)=>!S.sq.done.includes(j));if(i<0)return null;const q=L[i];
  return`ภารกิจ${season().n} ${S.sq.done.length}/${L.length} · ${q.t} ${Math.min(sqProg(q),sqNeed(q)).toLocaleString('en-US')}/${sqNeed(q).toLocaleString('en-US')}`;}
function openQuests(done){checkQuests();const L=SQ[S.sq.si],left=SEASON_LEN-dayOfSeason()+1;
  const rows=L.map((q,i)=>{const ok=S.sq.done.includes(i),p=Math.min(sqProg(q),sqNeed(q)),n=sqNeed(q);
    return`<div class="need" style="${ok?'opacity:.55':''}"><span>${ok?glyph('star',18):''} <b>${q.t}</b> ${q.money?'฿':''}${p.toLocaleString('en-US')}/${q.money?'฿':''}${n.toLocaleString('en-US')}<div class="meter" style="margin-top:3px"><i style="width:${Math.round(p/n*100)}%"></i></div></span><span style="flex:none;white-space:nowrap">${ok?'สำเร็จ':`+฿${Math.round(q.r*sqMul())}`}</span></div>`;}).join('');
  showModal(`<div class="npcHead"><h2>ภารกิจ${season().n}</h2><small>${S.sq.yr?`ปีที่ ${S.sq.yr+1} · `:''}เหลือ ${left} วัน</small></div>
    ${done?`<div class="req"><b>ทำภารกิจ${season().n}ครบแล้ว!</b> ได้รางวัลพิเศษ: ${SQ_BONUS[S.sq.si].t}</div>`:''}
    ${rows}
    <div class="lv">ครบ 5 ข้อได้รางวัลพิเศษ: ${SQ_BONUS[S.sq.si].t}${S.sq.bonus?' (ได้แล้ว)':''} · ภารกิจเปลี่ยนทุกฤดู ปีต่อไปยากขึ้นและรางวัลมากขึ้น</div>
    <div class="row"><button class="btn ghost" data-goals>ดูเป้าหมายและเรื่องคุณตา</button><button class="btn ghost" data-close>ปิด</button></div>`);}
let sqT=0;
function checkGoal(){
  while(S.goal<GOALS.length&&GOALS[S.goal].ok()){const g=GOALS[S.goal];S.money+=g.r;earn('เป้าหมาย',g.r);S.goal++;sfx('upgrade');
    toast(`สำเร็จ: ${g.t} +฿${g.r}`);}
  const el=$('goal');if(S.evalDue){el.hidden=false;const t='ยายสายถือจดหมายของคุณตามา ไปคุยกับยายสายนะ',gt=$('goalTxt');if(gt.textContent!==t)gt.textContent=t;return;}
  if(S.goal>=GOALS.length){const ql=S.sq&&sqLine();if(ql){el.hidden=false;const gt=$('goalTxt');if(gt.textContent!==ql)gt.textContent=ql;return;}
    if(S.story.i>=STORY.length){el.hidden=false;const t=`ครบ ${Math.floor((S.day-1)/YEAR)+1} ปี คุณตาจะประเมินไร่ · อีก ${nextEvalIn()} วัน`,gt=$('goalTxt');if(gt.textContent!==t)gt.textContent=t;return;}
    el.hidden=false;const st=STORY[S.story.i],txt=`เรื่องคุณตา: ${st.t}${st.prog?` (${st.prog()})`:''}`,gt=$('goalTxt');if(gt.textContent!==txt)gt.textContent=txt;return;}
  el.hidden=false;const txt=`${S.goal+1}/${GOALS.length} ${GOALS[S.goal].t}`,gt=$('goalTxt');if(gt.textContent!==txt)gt.textContent=txt;
}
// ---------- main story: grandpa's recipe
const STORY=[
  {t:'รอเช้าวันใหม่',ok:()=>S.day>=2,sc:['จดหมายของคุณตา',['ในลิ้นชักโต๊ะไม้มีจดหมายเก่าพับไว้','“หลานรัก ตาเขียนสูตรแกงประจำไร่สุขใจแยกเป็น 4 หน้า ฝากไว้กับเพื่อนๆ ในหมู่บ้าน ถ้าหลานรักไร่นี้เหมือนที่ตารัก หลานจะหามันเจอ”','ท้ายจดหมายเขียนว่า “เริ่มจากลุงมี เพื่อนตกปลาของตา”']],r:100},
  {t:'ไปคุยกับลุงมีเรื่องคุณตา',ok:()=>stGain('talk_mee')>0,sc:['ลุงมีกับคุณตา',['ลุงมียิ้มกว้าง “ตาเอ็งกับลุงตกปลาด้วยกันทุกเย็น”','“หน้าแรกของสูตรอยู่กับลุง แต่ต้องพิสูจน์ก่อน ตกปลาให้ได้ 5 ตัว แล้วลุงจะให้”']],r:0,base:['fish']},
  {t:'ตกปลาให้ได้ 5 ตัว',ok:()=>stGain('fish')>=5,prog:()=>`${Math.min(5,stGain('fish'))}/5`,sc:['หน้าที่ 1: ปลาช่อน',['ลุงมีหยิบกระดาษเหลืองๆ ออกจากตะกร้าปลา','“หัวใจของแกงคือปลาช่อนสด” ... และลายมือคุณตาเขียนว่า “หน้าต่อไปอยู่กับยายสาย”']],r:200,page:1},
  {t:'ทำความรู้จักยายสายให้สนิท 3 หัวใจ',ok:()=>S.npc.sai.h>=3,prog:()=>`${S.npc.sai.h}/3 หัวใจ`,sc:['ความทรงจำของยายสาย',['ยายสายมองไปที่ไร่ “ตาของหลานเคยหุงข้าวหอมมะลิให้ยายกินทุกหน้าฝน”','“เอาข้าวหอมมะลิ 3 รวงมาให้ยาย แล้วยายจะให้หน้าที่ 2”']],r:0},
  {t:'เอาข้าวหอมมะลิ 3 ไปให้ยายสาย (ปลูกได้หน้าฝน)',ok:()=>!!S.flags.rice,sc:['หน้าที่ 2: ข้าวกับพริก',['ยายสายหยิบกระดาษจากหีบไม้ “ข้าวหอมมะลิหนึ่งถ้วย พริกตำพอหอม”','“หน้าที่ 3 ตาซ่อนไว้ในวัดเก่า... แต่วัดพังไปนานแล้ว”']],r:300,page:2},
  {t:'บูรณะวัดเก่าให้สำเร็จ (กระดานหมู่บ้าน)',ok:()=>S.proj.temple.done,sc:['หน้าที่ 3: ใต้ฐานพระ',['เมื่อวัดสร้างเสร็จ ช่างเอกพบห่อผ้าเก่าใต้ฐานพระ','“หน่อไม้จากป่า และเนยจากวัวของเรา” ... “หน้าสุดท้ายตาซ่อนไว้ลึกในเหมือง ชั้น 10”']],r:500,page:3},
  {t:'ลงเหมืองให้ถึงชั้น 10',ok:()=>S.mineDeep>=10,prog:()=>`ชั้นลึกสุด ${S.mineDeep}/10`,sc:['หน้าที่ 4: สูตรสมบูรณ์',['ในซอกหินมีกล่องสังกะสีเก่า ข้างในคือหน้าสุดท้าย','“ปลาช่อน ข้าวหอมมะลิ หน่อไม้ เนย พริก — แกงไร่สุขใจ” สูตรครบแล้ว! ลองทำในครัวดู']],r:500,page:4,on:()=>{if(!S.known.includes('d_grandpa'))S.known.push('d_grandpa');}},
  {t:'ทำแกงไร่สุขใจสูตรคุณตาในครัว',ok:()=>(S.col.d_grandpa||0)>0,sc:['งานเลี้ยงของหมู่บ้าน',['ชาวบ้านทุกคนมารวมตัวที่ลานเพื่อชิมแกงสูตรคุณตา','ลุงมีน้ำตาซึม “รสชาติเหมือนฝีมือตาเอ็งไม่มีผิด”','ไร่สุขใจกลับมามีชีวิตอีกครั้ง — คุณได้รับฉายา “ทายาทไร่สุขใจ”','รางวัล: ฿5,000 และแรงสูงสุด +30']],r:5000,on:()=>{S.maxStam+=30;S.flags.title=1;}}
];
const stGain=k=>(S.stats[k]||0)-((S.story.b||{})[k]||0);
function storyStart(){S.story.at=S.day;S.story.b={...S.stats};}
function storyNow(){if(S.story.i>=STORY.length)return'';const st=STORY[S.story.i];if(!st.ok())return'';
  S.story.i++;if(st.r){S.money+=st.r;earn('เนื้อเรื่อง',st.r);}if(st.page)S.story.pages=Math.max(S.story.pages||0,st.page);if(st.on)st.on();storyStart();
  const nx=STORY[S.story.i];return`<div class="storyBox"><b>${st.sc[0]}</b>${st.sc[1].map(l=>`<p>${l}</p>`).join('')}${st.page?`<div class="lv"><b>ได้สูตรคุณตา หน้าที่ ${st.page}/4</b></div>`:''}${st.r?`<div class="lv">รางวัล ฿${st.r.toLocaleString('en-US')}</div>`:''}${nx?`<div class="lv"><b>ต่อไป:</b> ${nx.t}</div>`:''}</div>`;}
function checkStory(){
  if(S.story.i>=STORY.length||!modal.hidden||transitioning)return;
  const st=STORY[S.story.i];if(!st.ok())return;
  S.story.i++;if(st.r){S.money+=st.r;earn('เนื้อเรื่อง',st.r);}if(st.page)S.story.pages=Math.max(S.story.pages||0,st.page);if(st.on)st.on();storyStart();save();sfx('upgrade');
  const nx=STORY[S.story.i];
  showModal(`<h2>${st.sc[0]}</h2>${st.sc[1].map(l=>`<p>${l}</p>`).join('')}${st.page?`<div class="detail"><div><b>ได้สูตรคุณตา หน้าที่ ${st.page}/4</b></div></div>`:''}
    ${st.r?`<p class="lv">รางวัล ฿${st.r.toLocaleString('en-US')}</p>`:''}${nx?`<p class="req"><b>ต่อไป:</b> ${nx.t}</p>`:'<p class="req"><b>จบเนื้อเรื่องหลัก</b> ขอบคุณที่ดูแลไร่สุขใจ</p>'}
    <div class="row"><button class="btn" data-close>เก็บไว้ในสมุดบันทึก</button></div>`);
}
// ---------- crop quality (0 ปกติ, 1 เงิน, 2 ทอง)
const QN=['','เงิน','ทอง'],QM=[1,1.25,1.5];
function qOf(k){S.qs[k]=S.qs[k]||{1:0,2:0};const q=S.qs[k],p=S.prod[k]||0;if(q[1]+q[2]>p){q[1]=Math.max(0,Math.min(q[1],p-q[2]));q[2]=Math.min(q[2],p);if(q[1]+q[2]>p)q[1]=p-q[2];}return q;}
function harvestQ(p){const fert=!!p.fert,good=!p.miss;let q=fert&&good?2:(fert||good)&&Math.random()<.7?1:0;if(q<2&&Math.random()<(lvl('farm')>=8?.3:.1))q++;return q;}
function gainQ(k,q){gain(k);if(q){qOf(k)[q]++;}if(q===2&&CROPS[k]&&act&&!act.then)act.then='holdup';return q;}
const qStar=q=>q===2?'★ทอง':q===1?'☆เงิน':'';
// ---------- skills
const SKILLS={farm:{n:'ทำไร่',perks:{3:'รดน้ำใช้แรงน้อยลง 1',5:'เก็บผักมีโอกาสได้เพิ่ม 1 ผล (20%)',6:'ไถดินใช้แรงน้อยลง 1',8:'ผักมีโอกาสได้เกรดสูงขึ้น',10:'ผักขายได้แพงขึ้น 10%'}},
  fish:{n:'ตกปลา',perks:{2:'ช่องเขียวกว้างขึ้นทุกเลเวล',5:'ปลากินเบ็ดเร็วขึ้น 30%',7:'ปลาหลุดช้าลง',10:'ปลาหายากชุมขึ้น 2 เท่า'}},
  mine:{n:'ขุดเหมือง',perks:{3:'ทุบหินใช้แรงน้อยลง 1',5:'แร่มีโอกาสได้ 2 ก้อน (25%)',8:'โดนมอนสเตอร์เจ็บน้อยลง 30%',10:'เจอแร่บ่อยขึ้น'}}};
const XPN=L=>30*L*(L+1)/2;
const lvl=k=>{const x=(S.skills&&S.skills[k])||0;let L=1;while(L<10&&x>=XPN(L))L++;return L;};
function xp(k,n){if(!S.skills)S.skills={};if(S.furn&&S.furn.shelf)n*=1.15;const before=lvl(k);S.skills[k]=(S.skills[k]||0)+n;const after=lvl(k);
  if(after>before){sfx('upgrade');const pk=SKILLS[k].perks[after];toast(`${SKILLS[k].n} เลเวล ${after}!${pk?' '+pk:''}`);shake(1.5,.15);}}
function openSkills(){
  const rows=Object.keys(SKILLS).map(k=>{const L=lvl(k),x=(S.skills[k]||0),lo=L>1?XPN(L-1):0,hi=XPN(L),pc=L>=10?100:Math.round((x-lo)/(hi-lo)*100);
    return `<div class="proj"><h3>${SKILLS[k].n} · เลเวล ${L}${L>=10?' (สูงสุด)':''}</h3><div class="meter"><i style="width:${pc}%"></i></div>
      ${Object.keys(SKILLS[k].perks).map(p=>`<div class="need" style="${+p<=L?'':'opacity:.45'}"><span>Lv${p} · ${SKILLS[k].perks[p]}</span><span style="flex:none">${+p<=L?'ได้แล้ว':''}</span></div>`).join('')}</div>`;}).join('');
  showModal(`<h2>ทักษะ</h2><p class="lv">ทำงานแต่ละอย่างบ่อยๆ เพื่อเพิ่มเลเวล</p>${rows}<div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
// ---------- sprinklers (crafted from ore, placed on soil, water nearby plots every morning)
const SPRK={spr1:{n:'สปริงเกอร์ทองแดง',need:{cu:3,stone:5},r:'4 ช่องรอบตัว',cells:[[0,-1],[0,1],[-1,0],[1,0]],col:'#c9723a'},
  spr2:{n:'สปริงเกอร์เงิน',need:{ag:3,cu:3},r:'8 ช่องรอบตัว',cells:[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],col:'#dfe3e6'},
  spr3:{n:'สปริงเกอร์ทอง',need:{au:3,ag:3},r:'24 ช่อง (5×5)',cells:(()=>{const c=[];for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++)if(x||y)c.push([x,y]);return c;})(),col:'#f2c230'}};
const haveMat=k=>k==='stone'?S.mat.stone:S.prod[k]||0;
function useMat(k,n){if(k==='stone')S.mat.stone-=n;else S.prod[k]-=n;}
function runSprinklers(){let n=0;for(const dk in S.decos){const k=S.decos[dk];if(!SPRK[k])continue;const [x,y]=dk.split(',').map(Number);
  for(const [dx,dy] of SPRK[k].cells){const p=S.plots[(x+dx)+','+(y+dy)];if(p&&!p.w){p.w=true;n++;}}}return n;}
// ---------- animal affection -> product quality
const QK=k=>!!CROPS[k]||['egg','milk','duckegg','goatmilk'].includes(k);
function animalQ(a){const L=a.love||0,r=Math.random();return L>=7?(r<.6?2:1):L>=3?(r<.6?1:0):0;}
function patAnimal(a,snd){if(a.patted)return false;a.patted=true;a.love=Math.min(10,(a.love||0)+1);sfx(snd);pop(a.x,a.y-.7,'♥','#ff8fa3');return true;}
function sickCtx(a,nm){if(!a.sick)return null;if(S.inv.med>0)return{l:'ให้ยา',h:`${nm}ป่วยอยู่ · ให้ยาแล้วพรุ่งนี้หาย`,fn:()=>{S.inv.med--;a.sick=false;a.love=Math.min(10,(a.love||0)+1);sfx('upgrade');pop(a.x,a.y-.7,'+ หายแล้ว','#9fe39a');stat('cure');}};
  return{l:'—',h:`${nm}ป่วยอยู่ ไม่มีผลผลิต · ซื้อยาสัตว์ที่ร้านป้าแดง`,dis:true};}
const loveTxt=a=>`${'♥'.repeat(Math.round(a.love||0))}${'♡'.repeat(10-Math.round(a.love||0))}`;
// ---------- decorations
const DECOS={spr1:{n:'สปริงเกอร์ทองแดง',craft:1,soil:true},spr2:{n:'สปริงเกอร์เงิน',craft:1,soil:true},spr3:{n:'สปริงเกอร์ทอง',craft:1,soil:true},path:{n:'ทางเดินหิน',p:20,walk:true},bush:{n:'พุ่มไม้',p:80,spr:'bush',w:.95,h:.9},flower:{n:'พุ่มดอกไม้ชมพู',p:120,spr:'bush_pink',w:.95,h:.9},
  scare:{n:'หุ่นไล่กา',p:250,spr:'x_scare',w:.95,h:1.35,d:'กันกาลงกินผักในรัศมี 4 ช่อง'},
  fence:{n:'รั้วไม้',p:40,spr:'x_fence',w:1.08,h:.8},post:{n:'เสาไม้',p:25,spr:'x_post',w:.3,h:.85},gate:{n:'ประตูรั้ว',p:150,spr:'x_gate',walk:true,w:1.05,h:.8},lamp:{n:'โคมไฟ',p:250}};
for(const k in FTREES)DECOS['tr_'+k]={n:'ต้นกล้า'+FTREES[k].n,tree:k,spr:'ft_'+k+'_0',w:.7,h:.9};
let placing=null;
const JAS_PRICE=300,RING_PRICE=3000,MED_PRICE=120,BRUSH_PRICE=350;
const capH=id=>NPCS[id].cand&&S.rel.date!==id&&S.rel.spouse!==id?8:10;
function addH(id,n){const c=S.npc[id];if(c)c.h=Math.max(0,Math.min(capH(id),c.h+n));}
const isBday=(id,d=S.day)=>{const b=NPCS[id].bday;return!!b&&seasonIdx(d)===b[0]&&dayOfSeason(d)===b[1];};
const bdayOn=d=>Object.keys(NPCS).find(id=>here(id)&&isBday(id,d));
const FEST_LINES={
  songkran:{ek:'สงกรานต์ทั้งที พักงานไม้มาสาดน้ำกัน',mee:'มาๆ รดน้ำดำหัวลุงหน่อย ลุงจะให้พร',fon:'สุขสันต์วันสงกรานต์! ระวังโดนสาดนะ',daeng:'ปีใหม่ไทยแล้ว ขอให้ผักงามทั้งปีนะ'},
  bangfai:{ek:'บั้งไฟปีนี้ช่างเหลาไม้ไผ่ให้เอง',mee:'บั้งไฟปีนี้ลุงพนันว่าเอ็งจุดขึ้นสูงแน่',fon:'ฉันทำขนมมาเลี้ยงงานบุญด้วยนะ',daeng:'จุดบั้งไฟขอฝน ปีนี้นาจะได้น้ำดี'},
  contest:{mee:'ปีนี้ลุงเอาพริกมาประกวด ระวังแพ้ลุงนะ',fon:'ผักสวยๆ เอาไปทำขนมก็อร่อย',daeng:'ป้าเป็นกรรมการ ใจเป็นธรรมนะจ๊ะ',ek:'ช่างทำโต๊ะวางผักให้งานนี้เอง',nun:'พาเด็กๆ มาดูผักยักษ์กัน',ton:'ผักสดคือยาที่ดีที่สุด',phum:'เดี๋ยวเล่นพิณเปิดงานให้',sai:'สมัยก่อนตาของหลานชนะทุกปีเลยนะ'},
  loy:{mee:'ลอยกระทงแล้วขอให้ปลาชุมนะ ฮ่าๆ',fon:'กระทงใบตองของฉันสวยไหม',daeng:'คืนนี้พระจันทร์เต็มดวงสวยจัง',ek:'กระทงของช่างทำจากไม้ไผ่ ลอยได้นานสุด'}
};
const SAVE='raisukjai-v1';

// ---------- map ----------
const map=[];
for(let y=0;y<H;y++){map.push([]);for(let x=0;x<W;x++)map[y].push('g');}
const set=(x,y,c)=>{if(map[y]&&map[y][x]!==undefined)map[y][x]=c;};
for(let x=0;x<W;x++){set(x,0,'t');set(x,H-1,'t');set(x,17,'t');}
for(let y=0;y<H;y++){set(0,y,'t');set(W-1,y,'t');}
[[9,2],[13,15],[14,13],[8,16],[34,11],[34,15]].forEach(([x,y])=>set(x,y,'t'));
for(let y=2;y<=4;y++)for(let x=3;x<=6;x++)set(x,y,'w');
for(let y=6;y<=14;y++)for(let x=2;x<=11;x++)set(x,y,'s');
for(let x=2;x<=42;x++)set(x,5,'p');
for(let y=5;y<=24;y++)set(17,y,'p');
for(let x=17;x<=42;x++)set(x,8,'p');
for(let y=1;y<=4;y++)for(let x=15;x<=19;x++)set(x,y,'h');
for(let y=1;y<=4;y++)for(let x=20;x<=25;x++)set(x,y,'z');
for(let y=1;y<=2;y++)for(let x=22;x<=24;x++)set(x,y,'e');
set(25,1,'N');set(20,4,'S');
for(let y=1;y<=3;y++)for(let x=10;x<=13;x++)set(x,y,'T');
set(12,6,'b');
for(let y=6;y<=7;y++)for(let x=21;x<=23;x++)set(x,y,'k');
for(let y=9;y<=10;y++)for(let x=20;x<=22;x++)set(x,y,'c');
for(let x=19;x<=24;x++){set(x,11,'f');set(x,16,'f');}
for(let y=11;y<=16;y++){set(19,y,'f');set(24,y,'f');}
set(19,13,'g');
for(let x=26;x<=33;x++){set(x,11,'f');set(x,16,'f');}
for(let y=11;y<=16;y++){set(26,y,'f');set(33,y,'f');}
set(26,13,'g');
for(let y=9;y<=10;y++)for(let x=29;x<=32;x++)set(x,y,'r');
set(27,12,'q');
for(let y=1;y<=3;y++){for(let x=27;x<=29;x++)set(x,y,'v');for(let x=31;x<=33;x++)set(x,y,'v');}
// south: expansion land, greenhouse site, stream, meadow
for(let y=18;y<=24;y++){for(let x=2;x<=14;x++)set(x,y,'s');set(15,y,'f');}
for(let y=18;y<=21;y++)for(let x=19;x<=23;x++)set(x,y,'y');
for(let x=18;x<=25;x++)set(x,22,'p');
for(let y=18;y<=24;y++){set(26,y,'w');set(27,y,'w');for(let x=28;x<=34;x++)set(x,y,'m');set(35,y,'t');}
// east village: school, clinic, cottages, grandma's flower garden
for(let x=36;x<=42;x++)set(x,17,'g');
for(let y=1;y<=3;y++)for(let x=37;x<=41;x++)set(x,y,'o');
for(let y=10;y<=12;y++){for(let x=37;x<=39;x++)set(x,y,'d');for(let x=40;x<=42;x++)set(x,y,'v');}
for(let y=14;y<=16;y++)for(let x=37;x<=39;x++)set(x,y,'v');
for(let y=18;y<=19;y++)for(let x=36;x<=42;x++)set(x,y,(x+y)%3===0?'m':'g');
for(let y=20;y<=24;y++)for(let x=36;x<=40;x++)set(x,y,'F');
[[37,21],[39,23],[36,23],[40,20]].forEach(([x,y])=>set(x,y,'t'));
for(let y=19;y<=24;y++)for(let x=41;x<=42;x++)set(x,y,'K');
set(41,22,'C');set(8,1,'u');
const inExp=(x,y)=>x>=2&&x<=14&&y>=18&&y<=24;
const inGHzone=(x,y)=>x>=19&&x<=23&&y>=18&&y<=21;
const inMeadow=(x,y)=>x>=28&&x<=34&&y>=18&&y<=24;

// ---------- progressive unlocks (new systems arrive over the first days) ----------
const UNLOCKS=[
  {id:'furn',ok:()=>S.day>=3,t:'ช่างเอกรับทำเฟอร์นิเจอร์ในบ้านแล้ว แต่ละชิ้นมีประโยชน์ สั่งได้ที่โรงไม้'},
  {id:'bus',ok:()=>S.day>=5,t:'รถสองแถวเริ่มวิ่งแล้ว! ป้ายรถอยู่ริมถนนฝั่งตะวันออก ไปเที่ยวชายหาดหรือน้ำตกได้ ฿50'},
  {id:'museum',ok:()=>S.day>=8,t:'พิพิธภัณฑ์หมู่บ้านเปิดแล้ว! อาคารทรงไทยท้ายหมู่บ้าน บริจาคของหายากได้รางวัล'},
  {id:'merchant',ok:()=>S.day>=8,t:'พ่อค้าเสือชายจากในเมืองเริ่มสั่งของทุกสัปดาห์ ดูออเดอร์ได้ที่ถังส่งขาย'},
  {id:'fishpond',ok:()=>!!(S.proj.bridge&&S.proj.bridge.done),t:'สะพานซ่อมเสร็จ ช่างเอกรับขุดบ่อเลี้ยงปลาแล้ว สั่งได้ที่โรงไม้'}];
const unl=id=>!!(S.unl&&S.unl[id]);
function checkUnlocks(silent){S.unl=S.unl||{};const out=[];for(const U of UNLOCKS)if(!S.unl[U.id]&&U.ok()){S.unl[U.id]=S.day;out.push(U.t);}if(out.length)applyUnlocks();
  return silent||!out.length?'':`<div class="req"><b>ของใหม่ในหมู่บ้าน</b>${out.map(t=>`<br>· ${t}`).join('')}</div>`;}
function applyUnlocks(){
  const T=S.town||{};for(let y=18;y<=20;y++)for(let x=32;x<=34;x++)set(x,y,T.mint?'v':'m');
  for(let y=6;y<=7;y++)for(let x=28;x<=30;x++)set(x,y,T.ja?'R':'g');
  set(15,21,S.land?'p':'L');
  for(let y=18;y<=21;y++)for(let x=19;x<=23;x++)set(x,y,S.built.gh?'s':'y');
  const br=S.proj.bridge&&S.proj.bridge.done;set(26,22,br?'j':'B');set(27,22,br?'j':'B');
  for(const id in MACHINES)set(MACHINES[id].x,MACH_Y,S.built[id]?'P':'g');
  for(let y=23;y<=24;y++)for(let x=19;x<=22;x++)set(x,y,S.built.fishpond?'Q':'g');
  set(41,6,unl('bus')?'Y':'g');for(let y=14;y<=15;y++)for(let x=40;x<=42;x++)set(x,y,unl('museum')?'M':'g');
}
const SOLID='twfhbkrqveLcNTBSPodKCuRYMQ';
const inForest=(x,y)=>x>=36&&x<=40&&y>=20&&y<=24;

// ---------- state ----------
function freshState(){
  const plots={};
  plots['4,7']={c:'ch',age:4,w:false};
  plots['5,7']={c:'ch',age:4,w:false};
  plots['4,8']={c:'kb',age:1,w:false};
  plots['5,8']={c:'kb',age:1,w:true};
  plots['6,8']={c:null,age:0,w:false};
  plots['6,7']={c:'wm',age:2,w:false};
  return {day:1,t:360,money:500,stam:100,seeds:{kb:10,ch:4,cuc:4},prod:{guano:6},plots,bin:0,rain:false,
    sel:'kb',px:17.5,py:5.6,face:'down',hay:4,trough:true,tools:{hoe:0,can:0},festDone:{},kt:0,luck:0,
    hens:[{x:21,y:13.2,egg:true,love:0},{x:22.6,y:14.6,egg:true,love:0},{x:20.8,y:15,egg:false,love:0}],
    cows:[{x:30,y:13.5,milk:true,love:0},{x:31.8,y:14.8,milk:true,love:0}],
    npc:{mee:{h:0,talked:false,gifted:false,req:{k:'ch',q:2,r:210,done:false}},
         fon:{h:0,talked:false,gifted:false,req:{k:'egg',q:1,r:70,done:false}},
         daeng:{h:1,talked:false,gifted:false,req:null},
         ek:{h:0,talked:false,gifted:false,req:null},nun:{h:0,talked:false,gifted:false,req:null},
         ton:{h:0,talked:false,gifted:false,req:null},phum:{h:0,talked:false,gifted:false,req:null},mint:{h:0,talked:false,gifted:false,req:null},ja:{h:0,talked:false,gifted:false,req:null},sai:{h:0,talked:false,gifted:false,req:null}},
    land:false,stats:{},ledger:{},goal:0,goalV:2,job:null,opt:{speed:'normal'},mat:{wood:0,stone:0},debris:genDebris(),built:{},build:null,proj:{},col:{ch:0},colClaim:{},forage:[],maxStam:100,ducks:[],horse:false,skills:{farm:0,fish:0,mine:0},qs:{},ribbons:0,pet:null,petOffer:false,decoInv:{},decos:{},story:{i:0,at:1,b:{},pages:0},flags:{},mineMax:0,mineDeep:0,rel:{date:null,spouse:null,wedDay:null,married:null,kidAsk:null,babyDue:null,kid:null},ev:{},perks:{},inv:{jas:0,ring:0},kidPlayed:false,mach:{},known:['d_kb','d_omel','d_rice','d_wmshake','d_corn','d_strawmilk'],stall:null,hot:[],town:{},mkt:{},news:[],sold:{},ja:{order:null,menu:['d_kb','d_omel','d_rice'],biz:0},hike:0,trees:{},pname:'',farm:'ไร่สุขใจ',wxNext:null,storm:false,lastBackup:1,backupShown:0,sq:null,area:null,aF:{},trips:{},museum:{},museumDone:{},bait:null,berries:{},furn:{},inHouse:false,crows:[],fp:null,wo:null,woStreak:0,relics:{},unl:{},firstShip:false};
}
function genDebris(){
  const d={};
  for(let y=18;y<=24;y++)for(let x=2;x<=14;x++){const h=hash(x*7+3,y*11+5);
    if(h<.12)d[x+','+y]='rock';else if(h<.22)d[x+','+y]='stump';else if(h<.58)d[x+','+y]='weed';}
  [[29,19,'rock'],[32,20,'stump'],[30,23,'rock'],[33,18,'stump'],[31,21,'weed']].forEach(([x,y,t])=>d[x+','+y]=t);
  return d;
}
let S, hadSave=false;
try{const raw=localStorage.getItem(SAVE); if(raw){S=JSON.parse(raw);hadSave=true;}}catch(e){}
if(!S||!S.plots)S=freshState();
function migrate(){
  if(S.goalV===undefined){const m=[0,1,2,3,5,6,8,9,10,7,11,12,13,14,15,16];S.goal=m[Math.min(S.goal||0,15)];S.goalV=2;}
  const f=freshState();
  for(const k of ['hay','trough','cows','npc','hens','seeds','tools','festDone','kt','luck','land','mat','debris','built','build','proj','col','colClaim','forage','maxStam','bin','mach','known','stall','hot','rel','ev','perks','inv','kidPlayed','skills','qs','ribbons','pet','petOffer','decoInv','decos','story','flags','ducks','horse','mineMax','mineDeep','stats','ledger','goal','job','opt','town','mkt','news','sold','ja','hike','trees','farm','wxNext','storm','lastBackup','backupShown','sq','area','aF','trips','museum','museumDone','bait','berries','furn','inHouse','crows','fp','wo','woStreak','relics','unl','firstShip'])if(S[k]===undefined)S[k]=f[k];
  if(S.tips===undefined)S.tips=hadSave?Object.fromEntries(['move','c_เก็บ','c_ไถดิน','c_ปลูก','c_รดน้ำ','c_ตกปลา','c_คุย','c_เก็บไข่','c_รีดนม','c_ร้าน','c_เข้าเหมือง','c_ช่างไม้','stam','night','rain','market','fest'].map(k=>[k,1])):{};
  if(S.stats.earned===undefined)S.stats.earned=Math.max(0,S.money-200);if(S.evalBest===undefined)S.evalBest=0;
  if(S.rel.mood===undefined)S.rel.mood=70;if(S.rel.fight===undefined)S.rel.fight=false;
  for(const t in TOOLS)if(S.tools[t]===undefined)S.tools[t]=0;
  for(const id in PROJECTS)if(!S.proj[id])S.proj[id]={got:{},done:false};
  S.prod=S.prod||{};for(const k in ITEMS)if(!S.prod[k])S.prod[k]=0;
  for(const k in CROPS)if(!S.seeds[k])S.seeds[k]=0;
  for(const id in NPCS)if(!S.npc[id])S.npc[id]=f.npc[id];
  S.cows.forEach(c=>{if(!c.kind)c.kind='cow';});
  [...S.hens,...S.cows,...S.ducks].forEach(a=>{a.vx=0;a.vy=0;a.tm=Math.random()*2;a.bob=Math.random()*6;});
}
migrate();
applyCands();
applyUnlocks();
try{if(S.farm)document.title=S.farm;}catch(e){}
function save(){S.savedAt=Date.now();try{localStorage.setItem(SAVE,JSON.stringify(S));}catch(e){}CLD.dirty=true;}
// ---- cloud save: the player's private slot in this artifact's store (works inside Claude; silently off elsewhere)
const CLD={db:null,id:null,busy:false,dirty:false,last:0,ok:false,err:''};
function cloudPush(force){if(!CLD.db||!CLD.id||CLD.busy)return;if(!CLD.dirty&&!force)return;if(!force&&Date.now()-CLD.last<20000)return;
  CLD.busy=true;CLD.dirty=false;let data;try{data=JSON.stringify(S);}catch(e){CLD.busy=false;return;}
  CLD.db.doc(`data/users/${CLD.id}/save`).set({v:1,at:S.savedAt||Date.now(),day:S.day,data}).then(()=>{CLD.last=Date.now();CLD.ok=true;CLD.err='';})
    .catch(e=>{CLD.dirty=true;CLD.err=(e&&e.code)||'error';if(e&&(e.code==='revoked'||e.code==='not_granted'))CLD.db=null;}).finally(()=>{CLD.busy=false;});}
function applyLoaded(o){S=o;scene='farm';mine=null;riding=false;migrate();checkUnlocks(true);if(S.area&&AREAS[S.area])scene='area';else S.area=null;if(S.inHouse&&scene==='farm')scene='house';applyCands();applyUnlocks();try{document.title=S.farm||'ไร่สุขใจ';}catch(e){}resetFolks();renderSeeds();$('rideBtn').hidden=!S.horse;
  try{localStorage.setItem(SAVE,JSON.stringify(S));}catch(e){}}
async function cloudInit(){try{if(!window.claude||typeof window.claude.use!=='function')return;
  const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);if(!db||!user)return;const id=await user.id();if(!id)return;
  let snap=null;try{snap=await db.doc(`data/users/${id}/save`).get();}catch(e){await new Promise(r=>setTimeout(r,800+Math.random()*800));snap=await db.doc(`data/users/${id}/save`).get();}
  CLD.db=db;CLD.id=id;
  if(snap&&snap.exists){const d=snap.data()||{};const localAt=hadSave?(S.savedAt||0):0;
    if(d.data&&(d.at||0)>localAt+1000){const o=JSON.parse(d.data);if(o&&o.plots&&o.day){const naming=!modal.hidden&&panel.querySelector('#pnIn');applyLoaded(o);if(naming)closeModal();CLD.ok=true;toast(`โหลดเซฟจากบัญชี Claude · ${season().n} วันที่ ${dayOfSeason()}`);return;}}}
  CLD.dirty=true;cloudPush(true);}catch(e){}}
setInterval(()=>cloudPush(false),4000);
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){save();cloudPush(true);}});
addEventListener('pagehide',()=>{save();cloudPush(true);});
const cloudTxt=()=>CLD.db?(CLD.ok?'เซฟอัตโนมัติไว้ในบัญชี Claude ของคุณแล้ว เปิดจากเครื่องไหนก็เล่นต่อได้':'กำลังเชื่อมเซฟกับบัญชี Claude...'):'เซฟอัตโนมัติไว้ในเครื่องนี้ (เปิดในแอป Claude เพื่อเซฟไว้ในบัญชี)';

// ---------- calendar helpers ----------
const seasonIdx=(d=S.day)=>Math.floor((d-1)/SEASON_LEN)%3;
const season=()=>SEASONS[seasonIdx()];
const dayOfSeason=(d=S.day)=>((d-1)%SEASON_LEN)+1;
const inSeason=k=>CROPS[k].s.includes(seasonIdx());
function festOn(d=S.day){return FESTS.find(f=>f.season===seasonIdx(d)&&f.day===dayOfSeason(d))||null;}
function festActive(){const f=festOn();return f&&S.t>=f.from&&S.t<f.to?f:null;}
function nextFest(){for(let i=0;i<SEASON_LEN*3;i++){const f=festOn(S.day+i);if(f)return{f,in:i};}return null;}
const weekday=(d=S.day)=>(d-1)%7;
const marketOpen=()=>weekday()===5&&S.t>=MARKET.from&&S.t<MARKET.to;
const inName=o=>Object.keys(o).map(k=>`${ITEMS[k].n} ×${o[k]}`).join(' + ');
const hasAll=o=>Object.keys(o).every(k=>S.prod[k]>=o[k]);
const folksOut=()=>{const f=festOn();return S.t>=420&&S.t<(f&&f.id==='loy'?1320:f&&f.id==='newyear'?1435:1200);};

// ---------- villagers (runtime) ----------
const folks={};
function homeOf(id){return S.rel.spouse===id?'home_farm':NPCS[id].home;}
function resetFolks(){for(const k in folks)delete folks[k];for(const id in NPCS){if(!here(id))continue;const d=NPCS[id];const p=d.fixed||PLACES[homeOf(id)].home;folks[id]={x:p[0],y:p[1],legs:[],pause:Math.random()*2,face:'down',walk:0,moving:false,hidden:!d.fixed,place:homeOf(id)};}}
function schedPlace(id){
  const d=NPCS[id];if(d.fixed)return null;
  const sc=S.rel.spouse===id?{all:[[420,'farm'],[1200,'home_farm']]}:d.sched;
  const we=weekday()>=5;
  const list=(S.rain&&sc.rain)||(we&&sc.we)||(!we&&sc.wk)||sc.all||sc.wk;
  let p=homeOf(id);for(const [t,pl] of list)if(S.t>=t)p=pl;
  if(PLACES[p].needBridge&&!(S.proj.bridge&&S.proj.bridge.done))p='pond';
  return p;
}
function canSee(id){if(festActive())return folksOut();if(NPCS[id].fixed)return false;return!folks[id].hidden;}
if(!S.job)S.job=newJob();
resetFolks();
const inWorld=id=>!NPCS[id].fixed||!!festActive();

// ---------- canvas sizing ----------
let TS=40,vw=0,vh=0,dpr=1;
function resize(){
  dpr=Math.min(window.devicePixelRatio||1,2);
  vw=innerWidth;vh=innerHeight;
  cv.width=Math.round(vw*dpr);cv.height=Math.round(vh*dpr);
  TS=Math.max(30,Math.floor(Math.min(vh/9,vw/14)));
}
addEventListener('resize',resize);resize();

// ---------- audio ----------
const AU={ctx:null,music:true,sfx:true,next:0,step:0,rainSrc:null};
try{const p=JSON.parse(localStorage.getItem('raisukjai-audio')||'{}');if(p.music===false)AU.music=false;if(p.sfx===false)AU.sfx=false;}catch(e){}
function saveAudio(){try{localStorage.setItem('raisukjai-audio',JSON.stringify({music:AU.music,sfx:AU.sfx}));}catch(e){}}
function audioInit(){
  if(AU.ctx){if(AU.ctx.state==='suspended')AU.ctx.resume().catch(()=>{});return;}
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  try{AU.ctx=new AC();}catch(e){return;}
  buildAudio(AU.ctx);
  AU.next=AU.ctx.currentTime+.1;
  setInterval(schedule,60);
}
function buildAudio(c){
  AU.master=c.createGain();AU.master.gain.value=.9;AU.master.connect(c.destination);
  AU.mus=c.createGain();AU.mus.gain.value=AU.music?MUS_VOL:0;AU.mus.connect(AU.master);
  AU.musDry=c.createGain();AU.musDry.gain.value=.8;AU.musDry.connect(AU.mus);
  try{const L=Math.floor(c.sampleRate*2.6),ir=c.createBuffer(2,L,c.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,3.2);}
    AU.rev=c.createConvolver();AU.rev.buffer=ir;const rg=c.createGain();rg.gain.value=.45;AU.rev.connect(rg);rg.connect(AU.mus);}catch(e){AU.rev=AU.musDry;}
  AU.fx=c.createGain();AU.fx.gain.value=AU.sfx?.28:0;AU.fx.connect(AU.master);
  const len=c.sampleRate*2,buf=c.createBuffer(1,len,c.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<len;i++)d[i]=Math.random()*2-1;AU.noise=buf;
  AU.rainG=c.createGain();AU.rainG.gain.value=0;const rf=c.createBiquadFilter();rf.type='lowpass';rf.frequency.value=1200;
  const rs=c.createBufferSource();rs.buffer=buf;rs.loop=true;rs.connect(rf);rf.connect(AU.rainG);AU.rainG.connect(AU.fx);rs.start();
}
addEventListener('pointerdown',audioInit,true);addEventListener('keydown',audioInit,true);
function tone(f,dur,{type='triangle',vol=.5,slide=0,at=0,dest}={}){
  if(!AU.ctx)return;const c=AU.ctx,t=c.currentTime+at,o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+slide),t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0008,t+dur);
  o.connect(g);g.connect(dest||AU.fx);o.start(t);o.stop(t+dur+.02);
}
function noise(dur,{vol=.4,freq=1500,type='bandpass',at=0,sweep=0}={}){
  if(!AU.ctx)return;const c=AU.ctx,t=c.currentTime+at,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
  s.buffer=AU.noise;f.type=type;f.frequency.setValueAtTime(freq,t);if(sweep)f.frequency.exponentialRampToValueAtTime(freq+sweep,t+dur);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  s.connect(f);f.connect(g);g.connect(AU.fx);s.start(t,Math.random());s.stop(t+dur+.02);
}
const SFX={
  till(){noise(.14,{vol:.5,freq:500,type:'lowpass'});tone(95,.12,{type:'sine',vol:.5,slide:-40});},
  water(){noise(.35,{vol:.3,freq:2400,sweep:-1200});},
  plant(){tone(660,.08,{vol:.3});tone(880,.1,{vol:.25,at:.07});},
  harvest(){tone(523,.1,{vol:.35});tone(784,.18,{vol:.35,at:.08});},
  coin(){tone(1175,.12,{type:'triangle',vol:.22});tone(1568,.32,{type:'sine',vol:.2,at:.07});},
  talk(){for(let i=0;i<3;i++)tone(440+Math.random()*180,.07,{type:'triangle',vol:.14,at:i*.08});},
  bite(){tone(1100,.08,{type:'triangle',vol:.25});tone(1100,.08,{type:'triangle',vol:.25,at:.12});},
  catch(){[523,659,784,1047].forEach((f,i)=>tone(f,.16,{vol:.3,at:i*.07}));},
  fail(){tone(420,.35,{vol:.25,slide:-220});},
  moo(){tone(150,.7,{type:'triangle',vol:.18,slide:-40});},
  cluck(){tone(900,.05,{type:'triangle',vol:.12});tone(720,.07,{type:'triangle',vol:.12,at:.07});},
  splash(){noise(.45,{vol:.45,freq:3000,sweep:-2200});},
  rocket(){noise(1.6,{vol:.35,freq:400,sweep:3000});},
  boom(){noise(.9,{vol:.6,freq:300,type:'lowpass'});tone(70,.6,{type:'sine',vol:.5,slide:-30});},
  thunder(){noise(2.4,{vol:.55,freq:220,type:'lowpass',sweep:-120});noise(.5,{vol:.35,freq:900,type:'lowpass'});},
  ui(){tone(880,.05,{type:'sine',vol:.14});},
  sleep(){[659,523,440,330].forEach((f,i)=>tone(f,.4,{vol:.2,at:i*.18}));},
  upgrade(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,.2,{vol:.25,at:i*.08}));}
};
function footstep(){
  if(!AU.ctx||!AU.sfx)return;const t=scene==='house'?'j':scene==='mine'?'x':scene==='area'?(S.area==='beach'?'s':'g'):(map[Math.floor(S.py)]||[])[Math.floor(S.px)];
  if(riding){noise(.07,{vol:.35,freq:260,type:'lowpass'});tone(120,.06,{type:'sine',vol:.25});return;}
  const P={p:[900,.16,'bandpass'],s:[500,.2,'lowpass'],z:[2200,.1,'highpass'],S:[2200,.1,'highpass'],e:[2200,.1,'highpass'],j:[380,.22,'lowpass'],x:[1600,.14,'bandpass'],w:[3000,.18,'bandpass']}[t]||[2600,.07,'highpass'];
  noise(.06,{vol:P[1],freq:P[0]*(0.9+Math.random()*.2),type:P[2]});
  if(t==='s'||t==='p'||t==='y')dust(S.px,S.py+.3,1,'rgba(180,145,100,');
}
function sfx(n){if(n==='boom')shake(4,.2);else if(n==='till')shake(1.5,.1);else if(n==='catch')shake(1,.08);if(AU.ctx&&AU.sfx&&SFX[n])SFX[n]();}
// pentatonic melody (like a pin/ranat tune)
// ---- music: soft generative Thai-pentatonic "khim" plucks over warm pads (day / night / rain / festival variants)
const MUS_VOL=.11;
const MKEY=293.66,PENTA=[0,2,4,7,9];
const CHORDS=[[0,4,7],[9,12,16],[5,9,12],[7,11,14],[0,4,7],[5,9,12],[9,12,16],[7,11,14]];
const noteF=(semi,oct=0)=>MKEY*Math.pow(2,(semi+12*oct)/12);
const penta=i=>{const o=Math.floor(i/5),r=((i%5)+5)%5;return PENTA[r]+12*o;};
const PHR={};
function getPhrase(n,chordAt){if(PHR[n])return PHR[n];let r=(n*7919+13)%233280;const rnd=()=>((r=(r*9301+49297)%233280)/233280);
  const out=[];let idx=5+Math.floor(rnd()*3);
  for(let st=0;st<32;st++){const beat=st%8,ch=chordAt(Math.floor(st/8));
    const play=beat===0?rnd()<.85:beat===4?rnd()<.6:beat%2===0?rnd()<.4:rnd()<.14;
    if(!play){out.push(null);continue;}
    idx=Math.max(3,Math.min(11,idx+[-2,-1,-1,0,1,1,2][Math.floor(rnd()*7)]));
    if(beat===0||beat===4){let best=idx,bd=99;for(let k=idx-2;k<=idx+2;k++){if(k<3||k>11)continue;if(ch.some(t=>((t-penta(k))%12+12)%12===0)&&Math.abs(k-idx)<bd){bd=Math.abs(k-idx);best=k;}}idx=best;}
    out.push({i:idx,len:beat===0?2:1});}
  if(n%2===1){out[24]={i:5,len:4};for(let k=25;k<32;k++)out[k]=null;}
  return PHR[n]=out;}
function mOsc(f,type,t,end,dest,vol,det){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;if(det)o.detune.value=det;g.gain.value=vol;o.connect(g);g.connect(dest);o.start(t);o.stop(end);}
function mOut(t){const c=AU.ctx,g=c.createGain();g.connect(AU.musDry);g.connect(AU.rev);return g;}
function pluck(f,t,hold,vol){const c=AU.ctx,g=mOut(t),lp=c.createBiquadFilter();lp.type='lowpass';lp.Q.value=.6;
  lp.frequency.setValueAtTime(3400,t);lp.frequency.exponentialRampToValueAtTime(700,t+.9);lp.connect(g);
  const end=t+1.5+hold;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.005);g.gain.exponentialRampToValueAtTime(vol*.35,t+.18);g.gain.exponentialRampToValueAtTime(.0005,end);
  mOsc(f,'triangle',t,end+.05,lp,1,-4);mOsc(f,'sine',t,end+.05,lp,.7,5);mOsc(f*3,'sine',t,t+.25,lp,.08);}
function pad(ch,t,dur,oct,vol){const c=AU.ctx,g=mOut(t),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=720;lp.connect(g);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+dur*.35);g.gain.setValueAtTime(vol,t+dur*.7);g.gain.linearRampToValueAtTime(0,t+dur+.4);
  ch.forEach(n=>{mOsc(noteF(n,oct),'triangle',t,t+dur+.5,lp,.5,-6);mOsc(noteF(n,oct),'sine',t,t+dur+.5,lp,.5,6);});}
function bassN(f,t,vol){const c=AU.ctx,g=c.createGain();g.connect(AU.musDry);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.0005,t+1.1);mOsc(f,'sine',t,t+1.15,g,1);}
function ching(t,open){const c=AU.ctx,g=mOut(t),bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=6200;bp.Q.value=6;bp.connect(g);
  const d=open?.9:.12;g.gain.setValueAtTime(open?.16:.12,t);g.gain.exponentialRampToValueAtTime(.0005,t+d);
  const s=c.createBufferSource();s.buffer=AU.noise;s.connect(bp);s.start(t,Math.random());s.stop(t+d+.02);mOsc(3520,'sine',t,t+d,g,open?.25:.1);}
function klong(t){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(70,t+.25);
  g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.35);o.connect(g);g.connect(AU.musDry);o.start(t);o.stop(t+.4);}
function schedule(horizon){
  const c=AU.ctx;if(!c)return;
  const night=S.t>=1140||S.t<390,fest=!!festActive(),rain=!!S.rain,stepDur=night?.56:.44;
  while(AU.next<c.currentTime+(horizon||.35)){
    const t=AU.next,st=AU.step,bar=Math.floor(st/8),beat=st%8,chordAt=b=>CHORDS[Math.floor(b/2)%CHORDS.length],ch=chordAt(bar);
    if(AU.music){
      if(beat===0&&bar%2===0)pad(ch,t,stepDur*16,night?-1:0,night?.09:.06);
      if(beat===0||(beat===4&&!night))bassN(noteF(ch[0],-2),t,night?.22:.28);
      const pn=Math.floor(st/32),phr=getPhrase(Math.floor(pn/4)*2+(pn%2)+(night?500:0),b=>chordAt(Math.floor(st/32)*4+b)),n=phr[st%32];
      if(n&&!(night&&beat%2)&&!(rain&&beat%4&&Math.random()<.5))pluck(noteF(penta(n.i),night?-1:0),t,n.len*stepDur*.5,night?.2:.26);
      if(fest){if(beat%4===0)klong(t);if(beat===2||beat===6)ching(t,true);if(beat%2===1)ching(t,false);}
    }
    AU.next+=stepDur;AU.step++;
  }
  AU.rainG.gain.setTargetAtTime(S.rain&&AU.sfx?.06:0,c.currentTime,.5);
}
function setMusic(on){AU.music=on;if(AU.mus)AU.mus.gain.setTargetAtTime(on?MUS_VOL:0,AU.ctx.currentTime,.15);saveAudio();const i=$('musIco');if(i)i.innerHTML=glyph(on?'note':'noteoff',26);const b=$('musBtn');if(b){b.setAttribute('aria-pressed',on);b.title=on?'ปิดเพลง':'เปิดเพลง';}}
function setSfx(on){AU.sfx=on;if(AU.fx)AU.fx.gain.value=on?.28:0;saveAudio();}

// ---------- input ----------
const joy={id:null,x:0,y:0,cx:0,cy:0};
const zone=$('joyZone'),base=$('joyBase'),knob=$('knob');
const R=52;
zone.addEventListener('pointerdown',e=>{
  e.preventDefault(); if(joy.id!==null)return;
  tapStart={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId};
  joy.id=e.pointerId; try{zone.setPointerCapture(e.pointerId);}catch(_){}
  const half=base.offsetWidth/2;
  const cx=Math.max(half+8,Math.min(vw*0.45-half,e.clientX));
  const cy=Math.max(half+80,Math.min(vh-half-8,e.clientY));
  joy.cx=cx;joy.cy=cy;
  joy.half=half;
  joy.shown=false;
  moveJoy(e);
});
function moveJoy(e){
  let dx=e.clientX-joy.cx,dy=e.clientY-joy.cy;const l=Math.hypot(dx,dy);
  if(!joy.shown){if(l<10){joy.x=joy.y=0;return;}joy.shown=true;base.style.left=(joy.cx-joy.half)+'px';base.style.top=(joy.cy-joy.half)+'px';base.style.bottom='auto';base.classList.add('active');}
  if(l>R){dx=dx/l*R;dy=dy/l*R;}
  joy.x=dx/R;joy.y=dy/R;
  knob.style.transform=`translate(${dx}px,${dy}px)`;
}
zone.addEventListener('pointermove',e=>{if(e.pointerId===joy.id)moveJoy(e);});
function endJoy(e){if(e.pointerId!==joy.id)return;if(tapStart&&tapStart.id===e.pointerId&&performance.now()-tapStart.t<320&&Math.hypot(e.clientX-tapStart.x,e.clientY-tapStart.y)<12)tapMove(e.clientX,e.clientY);tapStart=null;joy.id=null;joy.x=joy.y=0;knob.style.transform='';base.style.left='';base.style.top='';base.style.bottom='';base.classList.remove('active');}
zone.addEventListener('pointerup',endJoy);zone.addEventListener('pointercancel',endJoy);

const keys={};
let tapStart=null,auto=null;
function tapPath(tx,ty){const W=gridW(),H=gridH(),ok=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&!solidAt(x+.5,y+.5)&&!(S.plots[x+','+y]&&S.plots[x+','+y].c&&false);
  const sx=Math.floor(S.px),sy=Math.floor(S.py),s0=sy*W+sx,prev=new Int16Array(W*H).fill(-1),q=[s0];prev[s0]=s0;let goal=-1;
  const goals=new Set();if(ok(tx,ty))goals.add(ty*W+tx);else for(const [dx,dy] of [[0,1],[0,-1],[-1,0],[1,0]])if(ok(tx+dx,ty+dy))goals.add((ty+dy)*W+tx+dx);
  if(!goals.size)return null;
  for(let i=0;i<q.length&&i<W*H;i++){const c=q[i];if(goals.has(c)){goal=c;break;}const x=c%W,y=(c/W)|0;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,n=ny*W+nx;if(ok(nx,ny)&&prev[n]<0){prev[n]=c;q.push(n);}}}
  if(goal<0)return null;const pts=[];for(let c=goal;c!==prev[c];c=prev[c])pts.push([c%W+.5,((c/W)|0)+.55]);pts.reverse();return{pts,end:[goal%W,(goal/W)|0]};}
function tapMove(cx,cy){if(!modal.hidden||transitioning||busFx||(scene!=='farm'&&scene!=='area'&&scene!=='house')||fish||rocket)return;
  const s=TS,tx=Math.floor((cx+camX)/s),ty=Math.floor((cy+camY)/s);if(tx<0||ty<0||tx>=gridW()||ty>=gridH())return;
  const {tx:fx,ty:fy}=target();
  if(fx===tx&&fy===ty&&!auto){doAction();return;}
  const ptx=Math.floor(S.px),pty=Math.floor(S.py);
  if(Math.abs(ptx-tx)+Math.abs(pty-ty)===1&&solidAt(tx+.5,ty+.5)||(scene==='farm'&&Math.abs(ptx-tx)+Math.abs(pty-ty)===1&&(S.plots[tx+','+ty]||S.trees[tx+','+ty]))){S.face=tx>ptx?'right':tx<ptx?'left':ty>pty?'down':'up';auto=null;return;}
  const p=tapPath(tx,ty);if(!p){toast('ไปตรงนั้นไม่ได้');return;}
  let face=null;const [ex,ey]=p.end;if(ex!==tx||ey!==ty)face=tx>ex?'right':tx<ex?'left':ty>ey?'down':'up';
  auto={pts:p.pts,face,mark:[tx,ty],t:0};}
// ---- keyboard (uses physical key codes, so it works with a Thai keyboard layout too)
const KMOVE={KeyW:'up',ArrowUp:'up',KeyS:'down',ArrowDown:'down',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right'};
try{if(window.self!==window.top&&matchMedia('(pointer:coarse)').matches)document.body.classList.add('embedT');}catch(e){document.body.classList.add('embedT');}
function setKbMode(on){document.body.classList.toggle('kb',on);}
addEventListener('keydown',e=>{
  const t=e.target,typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA');if(typing)return;
  setKbMode(true);
  const mv=KMOVE[e.code];if(mv){keys[mv]=true;e.preventDefault();return;}
  if(e.code==='Escape'){e.preventDefault();if(!modal.hidden)closeModal();else if(placing){placing=null;toast('เลิกวางของตกแต่ง');}else $('menuBtn').click();return;}
  if(!modal.hidden)return;
  {const ae=document.activeElement;if(ae&&ae!==document.body&&ae.blur&&!panel.contains(ae))ae.blur();}
  if(e.repeat)return;
  if(e.code==='Space'||e.code==='KeyE'||e.code==='Enter'){e.preventDefault();holdAct=true;if(!e.repeat||!fish)doAction();return;}
  const hot={KeyB:'bagBtn',KeyI:'bagBtn',KeyC:'calBtn',KeyJ:'bookBtn',KeyQ:'seedChip',KeyR:'rideBtn'}[e.code];
  if(hot){const el=$(hot);if(el&&!el.hidden){e.preventDefault();el.click();}return;}
  if(e.code==='KeyF'){e.preventDefault();openEat();}
  if(e.code==='KeyM'){e.preventDefault();openMap();}
  if(e.code==='KeyN'){e.preventDefault();audioInit();setMusic(!AU.music);toast(AU.music?'เปิดเพลงแล้ว':'ปิดเพลงแล้ว');}
});
addEventListener('keyup',e=>{const mv=KMOVE[e.code];if(mv)keys[mv]=false;if(e.code==='Space'||e.code==='KeyE'||e.code==='Enter')holdAct=false;});
addEventListener('blur',()=>{holdAct=false;});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
addEventListener('pointerdown',e=>{if(e.pointerType==='touch')setKbMode(false);},true);
{const cvEl=$('cv');let t0=null;cvEl.addEventListener('pointerdown',e=>{t0={x:e.clientX,y:e.clientY,t:performance.now()};});cvEl.addEventListener('pointerup',e=>{if(t0&&performance.now()-t0.t<350&&Math.hypot(e.clientX-t0.x,e.clientY-t0.y)<12)tapMove(e.clientX,e.clientY);t0=null;});}
try{if(matchMedia('(hover:hover) and (pointer:fine)').matches)setKbMode(true);}catch(e){}

const actBtn=$('actBtn');
actBtn.addEventListener('pointerdown',e=>{e.preventDefault();actBtn.classList.add('press');holdAct=true;doAction();});
['pointerup','pointercancel','pointerleave'].forEach(t=>actBtn.addEventListener(t,()=>{actBtn.classList.remove('press');holdAct=false;}));
actBtn.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doAction();}});

// ---------- helpers ----------
const key=(x,y)=>x+','+y;
function hash(x,y){let h=(x*374761393+y*668265263)|0;h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967296;}
function solidAt(x,y){if(scene==='house')return houseSolid(Math.floor(x),Math.floor(y));if(scene==='mine')return mineSolid(Math.floor(x),Math.floor(y));if(scene==='area')return areaSolid(Math.floor(x),Math.floor(y));const tx=Math.floor(x),ty=Math.floor(y);{const dd=S.decos&&S.decos[tx+','+ty];if(dd&&!DECOS[dd].walk)return true;}if(tx<0||ty<0||tx>=W||ty>=H)return true;if(SOLID.includes(map[ty][tx]))return true;const tr=S.trees&&S.trees[tx+','+ty];if(tr&&tr.age>=3)return true;const d=S.debris[tx+','+ty];return d==='rock'||d==='stump';}
function gain(k,n=1){S.prod[k]+=n;S.col[k]=(S.col[k]||0)+n;flyToBag(k,n);}
// ---- game feel helpers
let shakeT=0,shakeA=0,flyQ=0;
function shake(a,t=.18){if(reduceMotion())return;shakeA=Math.max(shakeA,a);shakeT=Math.max(shakeT,t);}
function playerScreen(){return{x:(S.px*TS-camX),y:(S.py*TS-camY)-TS*.5};}
function flyToBag(k,n){
  try{if(typeof document==='undefined'||!document.body||!document.body.appendChild)return;
    const tgt=document.getElementById('bagBtn');if(!tgt||!tgt.getBoundingClientRect)return;const tr=tgt.getBoundingClientRect();
    const st=playerScreen(),delay=(flyQ++%4)*70;setTimeout(()=>flyQ=Math.max(0,flyQ-1),400);
    const el=document.createElement('div');el.className='fly';el.innerHTML=icon(k,34)+(n>1?`<b>×${n}</b>`:'');
    el.style.left=st.x+'px';el.style.top=st.y+'px';document.body.appendChild(el);
    const dx=tr.left+tr.width/2-st.x,dy=tr.top+tr.height/2-st.y;
    if(!el.animate||reduceMotion()){setTimeout(()=>el.remove(),300);bumpBag();return;}
    el.animate([{transform:'translate(-50%,-50%) scale(.6)',opacity:0},{transform:`translate(calc(-50% + ${dx*.08}px),calc(-50% - 46px)) scale(1.15)`,opacity:1,offset:.28},
      {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.55)`,opacity:.9}],{duration:720,delay,easing:'cubic-bezier(.45,.05,.55,1)',fill:'both'})
      .onfinish=()=>{el.remove();bumpBag();};
  }catch(e){}
}
function bumpBag(){const b=document.getElementById('bagBtn');if(!b||!b.animate||reduceMotion())return;
  b.animate([{transform:'scale(1)'},{transform:'scale(1.22)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'});try{tone(1180,.05,{type:'sine',vol:.12});}catch(e){}}
function dust(x,y,n=6,col='rgba(170,130,85,'){for(let i=0;i<n;i++)parts.push({x:x+(Math.random()-.5)*.7,y:y+(Math.random()-.5)*.3,vx:(Math.random()-.5)*1.2,vy:-.3-Math.random()*.6,dust:col,t:0,r:.06+Math.random()*.06});}
const stat=k=>{S.stats[k]=(S.stats[k]||0)+1;};
const REWARD_LBL=['ภารกิจประจำฤดู','รางวัลจากคุณตา','เป้าหมาย','เนื้อเรื่อง','รางวัลสมุดสะสม'];
const earn=(label,v)=>{if(v>0){S.ledger[label]=(S.ledger[label]||0)+v;if(!REWARD_LBL.includes(label))S.stats.earned=(S.stats.earned||0)+v;}};
const catOf=k=>{const c=COL_CATS.find(c=>c.keys.includes(k));return c?c.n:'อื่นๆ';};
const inGH=(x,y)=>!!S.built.gh&&inGHzone(x,y);
const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
function target(){const[dx,dy]=DIRS[S.face];return{tx:Math.floor(S.px+dx*0.75),ty:Math.floor(S.py+dy*0.75)};}
function areaTiles(lvl){
  const {tx,ty}=target(),[dx,dy]=DIRS[S.face],px=-dy,py=dx,out=[];
  const ahead=lvl===0?1:3, side=lvl===2?1:0;
  for(let i=0;i<ahead;i++)for(let j=-side;j<=side;j++){const x=tx+dx*i+px*j,y=ty+dy*i+py*j;if(map[y]&&map[y][x]==='s'&&!S.debris[x+','+y]&&!(S.decos&&S.decos[x+','+y]))out.push([x,y]);}
  return out;
}
let toastT=0;
let tipQ=[],tipCur=null,tipT=0,tipCd=1.5,tipChk=0;
function tip(id,txt){S.tips=S.tips||{};if(S.tips[id]||(tipCur&&tipCur.id===id)||tipQ.some(t=>t.id===id))return;tipQ.push({id,txt});}
setTimeout(()=>{const b=$('tipBox');if(b)b.addEventListener('pointerdown',e=>{e.stopPropagation();hideTip();});},0);
const TIP_GAP=45,TIP_PRI=['stam','night','storm','storm2','sick','crow0'];
function hideTip(){const b=$('tipBox');if(b){b.classList.remove('show');setTimeout(()=>{if(!tipCur)b.hidden=true;},250);}tipCur=null;tipCd=TIP_GAP;}
const kbm=()=>document.body.classList.contains('kb');
const TIP_CTX={'เข้าชม':'พิพิธภัณฑ์หมู่บ้าน! บริจาคของหายากที่เจอ เช่น ไข่มุก ปลาพลวงหิน อัญมณี ครบห้องได้รางวัลถาวร','ขึ้นรถ':'ป้ายรถสองแถว! นั่งไปเที่ยวชายหาดหรือน้ำตกบนเขา ค่ารถ ฿50 มีของหายาก ปลาชนิดใหม่ และของป่าเกิดใหม่ทุกวัน','เก็บ':'ผักสุกแล้ว! เก็บแล้วเอาไปใส่ถังส่งขายข้างแปลง เงินเข้าเช้าวันถัดไป',
  'ไถดิน':'ไถดิน → ปลูก → รดน้ำทุกวัน ผักโตวันละขั้น ถ้าลืมรดน้ำ ผักจะไม่โต',
  'ปลูก':()=>`เปลี่ยนเมล็ดได้ที่ปุ่มผักมุมขวาบน${kbm()?' (ปุ่ม Q)':''} ผักแต่ละชนิดปลูกได้เฉพาะบางฤดู`,
  'รดน้ำ':'รดน้ำวันละครั้งพอ วันฝนตกไม่ต้องรด',
  'ตกปลา':()=>`${kbm()?'กด Space ':'แตะปุ่มขวา'}เหวี่ยงเบ็ด รอจนปลากินเบ็ดแล้วกดดึง จากนั้นกดค้าง-ปล่อยให้ช่องเขียวตามตัวปลาจนแถบเต็ม`,
  'คุย':'คุยกับชาวบ้านวันละครั้งได้หัวใจ +1 ให้ของที่ชอบได้หัวใจเยอะ ป้าย ! แปลว่ามีเรื่องขอให้ช่วย',
  'เก็บไข่':'ลูบหัวสัตว์ทุกวัน ยิ่งสนิท ไข่และนมยิ่งมีคุณภาพ อย่าลืมเติมหญ้าในรางวัว','รีดนม':'ลูบหัวสัตว์ทุกวัน ยิ่งสนิท ไข่และนมยิ่งมีคุณภาพ อย่าลืมเติมหญ้าในรางวัว',
  'ส่งขาย':'ราคาของเปลี่ยนทุกวัน เลือกเก็บของที่ราคาตกไว้ขายวันอื่นได้ ดูข่าวตลาดในรายงานตอนเช้า',
  'ร้าน':'ร้านนี้ซื้อเมล็ด ต้นกล้าไม้ผล หญ้าแห้ง สัตว์ (ไก่ วัว แพะ ควาย ม้า) และอัปเกรดเครื่องมือ',
  'กระดาน':'บริจาคของที่กระดานเพื่อซ่อมสะพาน ฟื้นตลาด บูรณะวัด หมู่บ้านจะโตและมีคนใหม่ย้ายมา',
  'เข้าเหมือง':'ในเหมืองทุบหินหาแร่ ยิ่งลึกยิ่งมีของดี ถ้าแรงหมดจะหมดสติ',
  'ช่างไม้':'ช่างเอกสร้างโรงเรือน ขยายเล้า ต่อเติมบ้าน ใช้ไม้กับหินจากการผ่าตอและทุบหิน'};
function checkTips(dt){
  const b=$('tipBox');if(!b)return;if(fish&&fish.phase!=='wait'||rocket||sandG)return;
  if(tipCur){if(modal.hidden)tipT-=dt;if(tipT<=0)hideTip();return;}
  tipChk-=dt;if(tipChk<=0&&modal.hidden&&scene){tipChk=.5;
    if(!S.tips||!S.tips.move)tip('move',kbm()?'เดินด้วย W A S D แล้วกด Space ทำงานกับสิ่งที่หันหน้าไป กด Esc เปิดเมนู':'ลากวงล้อซ้ายเพื่อเดิน แล้วแตะปุ่มขวาล่างเพื่อทำงานกับสิ่งที่หันหน้าไป');
    const c=ctxCache&&ctxCache.l,T=c&&TIP_CTX[c];if(T&&!ctxCache.dis)tip('c_'+c,typeof T==='function'?T():T);
    if(S.stam<S.maxStam*.3)tip('stam',`แรงใกล้หมด กินอาหารได้จากกระเป๋า${kbm()?' (ปุ่ม F)':''} หรือกลับไปนอนที่บ้าน`);
    if(S.t>=1080&&S.day<=6)tip('night','เย็นแล้ว กลับไปนอนที่บ้านก่อนเที่ยงคืน ไม่งั้นจะเผลอหลับ แรงเหลือครึ่งเดียว');
    if(S.rain&&!S.storm)tip('rain','ฝนตก! ผักได้น้ำทุกแปลงแล้ว วันนี้ปลาช่อนชุม');
    if(S.storm)tip('storm','วันนี้พายุเข้าตอนเย็น! เก็บผักที่สุกก่อนนอน ไม่งั้นอาจเสียหาย ผักในโรงเรือนปลอดภัย');
    if(S.wxNext==='storm')tip('storm2','พยากรณ์บอกพรุ่งนี้พายุเข้า เตรียมเก็บผักที่ใกล้สุก');
    if(marketOpen())tip('market','วันเสาร์มีตลาดนัดที่ลานหมู่บ้าน ตั้งแผงขายของได้ ของขายดีได้ราคาพิเศษ');
    if([...S.hens,...S.cows,...S.ducks].some(a=>a.sick))tip('sick','มีสัตว์ป่วย! ซื้อยารักษาสัตว์ที่ร้านป้าแดง แล้วหันไปหาสัตว์ตัวนั้นเพื่อให้ยา ลูบหัวทุกวันช่วยกันป่วยได้');
    if(S.goal>=GOALS.length)tip('sq','ภารกิจประจำฤดูมาแล้ว! แตะแถบเป้าหมายด้านล่างเพื่อดูทั้ง 5 ข้อ ทำครบได้รางวัลพิเศษ');
    if(festOn())tip('fest','วันนี้มีงานเทศกาล! ชาวบ้านไปรวมกันที่ลาน ดูรายละเอียดในปฏิทิน');
    if(S.day>=YEAR-6&&!S.evalBest)tip('eval',`อีก ${nextEvalIn()} วันครบ 1 ปี ยายสายจะนำจดหมายของคุณตามาประเมินไร่ ลองดูว่าคุณตาให้คะแนนจากอะไรในคู่มือ`);}
  tipCd-=dt;if(!tipQ.length||!modal.hidden)return;
  tipQ=tipQ.filter(t=>!t.id.startsWith('c_')||(ctxCache&&ctxCache.l===t.id.slice(2)&&!ctxCache.dis));if(!tipQ.length)return;
  const pi=tipQ.findIndex(t=>TIP_PRI.includes(t.id));if(tipCd>0&&!(pi>=0&&tipCd<TIP_GAP-8))return;
  tipCur=tipQ.splice(pi>=0?pi:0,1)[0];S.tips=S.tips||{};S.tips[tipCur.id]=1;tipT=Math.min(11,4+tipCur.txt.length/14);
  $('tipTxt').textContent=tipCur.txt;b.hidden=false;void b.offsetWidth;b.classList.add('show');
}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');toastT=2.6;}
const parts=[];
function pop(x,y,txt,col){parts.push({x,y,txt,col,t:0});}
function splash(x,y,n=10){for(let i=0;i<n;i++)parts.push({x:x+(Math.random()-.5)*.9,y:y+(Math.random()-.5)*.6,drop:true,t:Math.random()*.2});}

// ---------- timing meter (fishing + rocket) ----------
const meterBox=$('fishBar'),ftrack=$('ftrack');
function meterShow(lbl){$('fishLbl').textContent=lbl;meterBox.hidden=false;}
function meterZone(z0,zw){const z=$('fzone');z.style.left=z0*100+'%';z.style.width=zw*100+'%';ftrack.hidden=false;}
function meterNeedle(p){$('fneedle').style.left=p*100+'%';}
function meterHide(){meterBox.hidden=true;ftrack.hidden=true;}

// fishing
let fish=null;
function startFish(tx,ty){const bb=baitFor(waterLoc(tx,ty));fish={phase:'wait',t:0,wait:(1.2+Math.random()*2.6)*(lvl('fish')>=5?.7:1)*(bb?bb.fast:1),tx,ty};meterShow('รอปลากินเบ็ด...');ftrack.hidden=true;}
function endFish(){fish=null;holdAct=false;$('fneedle').classList.remove('fishy');$('fzone').classList.remove('off');$('fprogW').hidden=true;if(!rocket)meterHide();}
let holdAct=false;
function updateFish(dt){
  if(!fish)return;
  fish.t+=dt;
  if(fish.phase==='wait'&&fish.t>=fish.wait){
    let f=pickFish(waterLoc(fish.tx,fish.ty));
    f={...f,zone:Math.min(.45,f.zone*(S.perks.rod?1.3:1)*(S.perks.mfish?1.1:1)*(1+(lvl('fish')-1)*.04))};Object.assign(fish,{phase:'bite',t:0,f});
    meterShow('ปลากินเบ็ด! กด ดึง เลย');ftrack.hidden=true;sfx('bite');
  }
  if(fish.phase==='bite'&&fish.t>(lvl('fish')>=7?2.4:1.7)){toast('ช้าไป ปลาหนีไปแล้ว');sfx('fail');endFish();return;}
  if(fish.phase==='fight'){const F=fish,f=F.f;
    F.zv+=(holdAct?2.5:-2.1)*dt;F.zv=Math.max(-1.15,Math.min(1.15,F.zv));F.z+=F.zv*dt;
    if(F.z<0){F.z=0;F.zv=Math.max(0,F.zv)*.3;}if(F.z>1-F.zw){F.z=1-F.zw;F.zv=Math.min(0,F.zv)*.3;}
    F.tt-=dt;if(F.tt<=0){const wild=f.w<=15?1:f.w<30?.7:.45;let tg=F.fp+(Math.random()-.5)*wild*1.6;if(tg<.36)tg=.36+Math.random()*.35;F.tgt=Math.max(.36,Math.min(.97,tg));F.tt=(.5+Math.random()*.9)/(f.sp*.8);}
    F.fp+=(F.tgt-F.fp)*Math.min(1,dt*f.sp*1.7);
    const inZ=F.fp>=F.z&&F.fp<=F.z+F.zw;F.prog+=inZ?dt*.3:-dt*(lvl('fish')>=7?.17:.24);
    meterZone(F.z,F.zw);meterNeedle(F.fp);$('fzone').classList.toggle('off',!inZ);$('fprog').style.width=Math.round(Math.max(0,Math.min(1,F.prog))*100)+'%';
    if(F.prog>=1){catchFish();return;}
    if(F.prog<=0){toast(f.w<=15?'ปลาใหญ่ดิ้นหลุดไปแล้ว! เกือบได้':'ปลาหลุด! ลองใหม่');sfx('fail');endFish();}
  }
}
function startFight(){const f=fish.f,zw=Math.min(.34,.14+f.zone*.6);Object.assign(fish,{phase:'fight',t:0,zw,z:.5-zw/2,zv:0,fp:.5,tgt:.5,tt:.3,prog:.35});
  meterShow(kbm()?'กด Space ค้าง = ช่องเขียวไปขวา · ปล่อย = กลับซ้าย · ให้ปลาอยู่ในช่องจนแถบเต็ม':'แตะปุ่มขวาค้าง = ช่องเขียวไปขวา · ปล่อย = กลับซ้าย · ให้ปลาอยู่ในช่องจนแถบเต็ม');if(tipCur)hideTip();ftrack.hidden=false;$('fneedle').classList.add('fishy');$('fprogW').hidden=false;sfx('bite');
}
function catchFish(){const f=fish.f;if(sprOk('act_fishreel_right_0'))startAct('fishreel',null,{hold:.6});
  if(waterLoc(fish.tx,fish.ty)==='pond'&&lvl('fish')>=4&&!(S.berries&&S.berries.pond)&&Math.random()<.06)giveBerry('pond','เบ็ดเกี่ยวกิ่งไม้เล็กๆ ขึ้นมาพร้อมปลา มีผลสีม่วงเรืองแสงติดอยู่');
  gain(f.k);stat('fish');xp('fish',f.k==='buek'||f.k==='cavefish'||f.k==='lobster'||f.k==='mahseer'||f.k==='insee'?20:f.w<30?12:8);pop(fish.tx+.5,fish.ty+.2,'+1 '+ITEMS[f.k].n,f.k==='buek'?'#ffe07a':'#fff');sfx('catch');
  toast(f.k==='buek'?'ปลาบึก! ตัวใหญ่มาก':f.k==='lobster'?'กุ้งมังกร! หายากมาก':f.k==='mahseer'?'ปลาพลวงหิน! ปลาน้ำตกตัวใหญ่':f.k==='insee'?'ปลาอินทรี! ปลาทะเลลึกตัวใหญ่':`ได้${ITEMS[f.k].n}`);
  endFish();}
function reel(){
  if(fish.phase==='wait'){if(sprOk('act_fishreel_right_0'))startAct('fishreel',null,{hold:0});toast('ดึงเร็วไป ปลาตกใจหนี');sfx('fail');endFish();return;}
  if(fish.phase==='bite'){startFight();return;}
}

// bang fai rocket
let rocket=null, rocketFx=null;
function startRocket(){const zw=.2;rocket={pos:0,dir:1,sp:1.5,z0:.15+Math.random()*(.7-zw),zw};meterShow('กด จุด! ตอนเข็มอยู่ช่องเขียว ยิ่งตรงกลางยิ่งพุ่งสูง');meterZone(rocket.z0,rocket.zw);}
function updateRocket(dt){
  if(rocket){rocket.pos+=rocket.dir*rocket.sp*dt;if(rocket.pos>1){rocket.pos=1;rocket.dir=-1;}if(rocket.pos<0){rocket.pos=0;rocket.dir=1;}meterNeedle(rocket.pos);}
  if(rocketFx){const r=rocketFx;r.t+=dt;
    if(r.ok){r.y-=dt*(3+r.t*6);if(Math.random()<.9)parts.push({x:r.x+(Math.random()-.5)*.2,y:r.y+.5,smoke:true,t:0});}
    else{if(r.t<.7)r.y-=dt*2.5;else r.y+=dt*4;if(Math.random()<.6)parts.push({x:r.x,y:r.y+.4,smoke:true,t:0});}
    if(r.t>2.4){if(!r.ok)sfx('boom');else shake(5,.35);toast(r.msg);rocketFx=null;}}
}
function fireRocket(){
  const r=rocket,c=r.z0+r.zw/2,d=Math.abs(r.pos-c);rocket=null;meterHide();
  S.festDone.rocket=true;
  let prize,msg,ok=true;
  if(d<r.zw*.18){prize=400;msg='บั้งไฟพุ่งเสียดฟ้า! ได้รางวัลที่ 1 ฿400';}
  else if(d<=r.zw/2){prize=220;msg='บั้งไฟขึ้นสวย! ได้รางวัล ฿220';}
  else{prize=30;ok=false;msg='บั้งไฟแตก... ได้รางวัลปลอบใจ ฿30';}
  S.money+=prize;earn('เทศกาล',prize);if(ok)for(const id in S.npc)addH(id,1);
  rocketFx={x:25.4,y:2.6,t:0,ok,msg};sfx('rocket');
}

// krathongs on the pond
const krathongs=[];
function addKrathong(mine){krathongs.push({x:3.3+Math.random()*.8,y:3+Math.random()*1.4,vx:.12+Math.random()*.12,ph:Math.random()*6,mine});}

// ---------- context / actions ----------
function nearAnimal(list,cx,cy){return list.find(a=>Math.hypot(a.x-cx,a.y-cy)<0.95);}
function context(){
  const base=context0();if(base.fn&&!base.dis)return base;
  if(fish||rocket||!modal.hidden)return base;
  const sf=S.face;
  for(const f of ['up','down','left','right']){if(f===sf)continue;S.face=f;const c=context0();if(c.fn&&!c.dis&&c.l!=='ตกปลา'&&c.l!=='ไถดิน'&&c.l!=='บ้าน'){S.face=sf;c.face=f;return c;}}
  S.face=sf;return base;
}
function context0(){
  if(rocket)return{l:'จุด!',h:'กดตอนเข็มอยู่กลางช่องเขียว',fn:fireRocket};
  if(sandG)return{l:'ก่อ!',h:'กดตอนเข็มอยู่กลางช่องเขียว',fn:sandHit};
  if(fish)return fish.phase==='fight'?{l:'ดึง!',h:'กดค้างให้ช่องเขียวตามตัวปลา',fn:()=>{}}:fish.phase==='bite'?{l:'ดึง!',h:'ปลากินเบ็ดแล้ว กดเลย!',fn:reel}:{l:'ดึง!',h:'รอให้ปลากินเบ็ดก่อน',fn:reel};
  if(scene==='mine')return mineContext();
  if(scene==='area')return areaContext();
  if(scene==='house')return houseContext();
  const {tx,ty}=target();
  const cx=tx+.5,cy=ty+.5, fa=festActive();
  const facingSala=map[ty]&&map[ty][tx]==='e'&&!!festOn();
  for(const id in folks){if(facingSala||!canSee(id))continue;const f=folks[id];
    if(Math.hypot(f.x-cx,f.y-cy)<0.95||Math.hypot(f.x-S.px,f.y-S.py)<0.7){
      if(fa&&fa.id==='songkran'&&!S.festDone['sk_'+id]){
        return (id==='mee'||id==='sai')?{l:'ดำหัว',h:`รดน้ำดำหัว${NPCS[id].n}เพื่อขอพร`,fn:()=>{S.festDone['sk_'+id]=true;addH(id,3);S.money+=150;splash(f.x,f.y-.5,8);sfx('splash');pop(f.x,f.y-1,'ขอให้รวยๆ ฿150','#ffe07a');}}
          :{l:'สาดน้ำ',h:`เล่นสาดน้ำกับ${NPCS[id].n}`,fn:()=>{S.festDone['sk_'+id]=true;addH(id,2);splash(f.x,f.y-.4,16);sfx('splash');pop(f.x,f.y-1,'♥♥','#ff8fa3');}};
      }
      return{l:'คุย',h:`${NPCS[id].n} · ${NPCS[id].role}`,fn:()=>{sfx('talk');openNpc(id);}};
    }}
  {const rs=relicSpot(tx,ty);if(rs)return{l:'ขุด',h:'มีอะไรแวววาวฝังอยู่ในดิน',fn:()=>{giveRelic(rs.id);dust(tx+.5,ty+.7,8);}};}
  if(map[ty]&&map[ty][tx]==='Q')return pondContext();
  if(map[ty]&&map[ty][tx]==='M')return{l:'เข้าชม',h:`พิพิธภัณฑ์หมู่บ้าน · จัดแสดงแล้ว ${Object.keys(S.museum||{}).length} ชิ้น`,fn:()=>openMuseum()};
  if(map[ty]&&map[ty][tx]==='Y')return{l:'ขึ้นรถ',h:`ป้ายรถสองแถว · ไปชายหาดหรือน้ำตก ฿${BUS_FARE}`,fn:openBus};
  if(placing&&DECOS[placing].tree){const D=DECOS[placing],t=map[ty]&&map[ty][tx],k0=key(tx,ty);
    const ok=S.decoInv[placing]>0&&inFarm(tx,ty)&&(t==='g'||t==='s')&&!S.decos[k0]&&!S.debris[k0]&&!S.plots[k0]&&!S.trees[k0]&&!(Math.floor(S.px)===tx&&Math.floor(S.py)===ty);
    if(ok)return{l:'ปลูก',h:`ปลูก${D.n}ตรงนี้ (โต ${FTREES[D.tree].grow} วัน ไม่ต้องรดน้ำ)`,fn:()=>{S.trees[k0]={k:D.tree,age:0,f:0};S.decoInv[placing]--;sfx('plant');dust(tx+.5,ty+.8,4,'rgba(200,190,170,');if(S.decoInv[placing]<=0)placing=null;save();}};
    return{l:'ยกเลิก',h:`ปลูก${D.n}ได้ที่หญ้าหรือดินว่างในไร่ · กดเพื่อเลิก`,fn:()=>{placing=null;toast('เลิกปลูกต้นไม้');}};}
  {const tk=key(tx,ty),T=S.trees&&S.trees[tk];if(T){const F=FTREES[T.k];
    if(T.age<3)return{l:'ถอน',h:`ต้นกล้า${F.n} · อีก ${F.grow-T.age} วันโต · กดเพื่อขุดคืนเข้ากระเป๋า`,fn:()=>{delete S.trees[tk];S.decoInv['tr_'+T.k]=(S.decoInv['tr_'+T.k]||0)+1;sfx('plant');toast(`ขุดต้นกล้า${F.n}คืนเข้ากระเป๋าแล้ว`);}};
    const chopArm=T.arm&&clock-T.arm<3;
    const chop={l:chopArm?'โค่น!':'โค่น',anim:chopArm?'axe':undefined,h:chopArm?`กดอีกครั้งเพื่อยืนยันโค่นต้น${F.n} (ได้ไม้ 6)`:null,cost:chopArm?TOOLS.axe.stam[S.tools.axe]:0,fn:()=>{if(!(T.arm&&clock-T.arm<3)){T.arm=clock;toast(`ต้องการโค่นต้น${F.n}? กดอีกครั้งภายใน 3 วินาที`);return;}delete S.trees[tk];S.mat.wood+=6;sfx('till');shake&&shake(3);toast(`โค่นต้น${F.n}แล้ว ได้ไม้ 6`);}};
    if(T.age<F.grow)return Object.assign(chop,{h:chop.h||`ต้น${F.n} · อีก ${F.grow-T.age} วันโตเต็มที่`});
    if(T.f>=F.every)return{l:'เก็บ',anim:'pick',h:`ต้น${F.n} มีผลสุก`,fn:()=>{const n=T.k==='banana'?1:2+(lvl('farm')>=5&&Math.random()<.3?1:0);for(let i=0;i<n;i++)gain(T.k);T.f=0;xp('farm',6);sfx('harvest');pop(tx+.5,ty-.4,`+${n} ${F.n}`,'#fff');stat('fruit');}};
    return Object.assign(chop,{h:chop.h||(F.s.includes(seasonIdx())?`ต้น${F.n} · ออกผลอีก ${F.every-T.f} วัน`:`ต้น${F.n} · ออกผลเฉพาะ${F.s.map(i=>SEASONS[i].n).join(' ')}`)});}}
  if(placing){const D=DECOS[placing],t=map[ty]&&map[ty][tx],k0=key(tx,ty);
    const ok=S.decoInv[placing]>0&&!S.decos[k0]&&!S.debris[k0]&&!S.plots[k0]&&(D.soil?(t==='s'):(t==='g'||t==='m'||(D.walk&&(t==='s'||t==='y'))))&&!(Math.floor(S.px)===tx&&Math.floor(S.py)===ty);
    if(ok)return{l:'วาง',h:`วาง${D.n} (เหลือ ${S.decoInv[placing]})`,fn:()=>{S.decos[k0]=placing;S.decoInv[placing]--;sfx('plant');dust(tx+.5,ty+.8,4,'rgba(200,190,170,');if(S.decoInv[placing]<=0){placing=null;toast('วางครบแล้ว');}}};
    return{l:'ยกเลิก',h:`วาง${D.n}ตรงนี้ไม่ได้ · หันไปที่หญ้าว่าง หรือกดเพื่อเลิกวาง`,fn:()=>{placing=null;toast('เลิกวางของตกแต่ง');}};}
  const dk=key(tx,ty),deb=S.debris[dk];
  if(S.decos[dk]){const d=S.decos[dk];return{l:'เก็บคืน',h:`${DECOS[d].n} · เก็บเข้ากระเป๋า`,fn:()=>{delete S.decos[dk];S.decoInv[d]=(S.decoInv[d]||0)+1;sfx('harvest');}};}
  if(S.pet&&scene==='farm'&&Math.hypot(S.pet.x-cx,S.pet.y-cy)<.9){const P=S.pet;return P.patted?{l:'—',h:`${P.name} ความสนิท ${'♥'.repeat(Math.min(10,P.love))}${(P.love||0)>=3?(P.kind==='dog'?' · ช่วยไล่กาและหมูป่า':' · ช่วยจับหนู'):` · สนิท 3 หัวใจจะช่วย${P.kind==='dog'?'ไล่กา':'จับหนู'}`}`,dis:true}
    :{l:'ลูบหัว',anim:'pet',h:`${P.name} · ลูบหัววันละครั้ง`,fn:()=>{P.patted=true;P.love=Math.min(10,P.love+1);P.happy=1.2;sfx(P.kind==='dog'?'cluck':'talk');pop(P.x,P.y-.7,'♥','#ff8fa3');}};}
  if(deb==='weed')return{l:'ถอนหญ้า',h:'ได้หญ้าแห้ง 1 ฟ่อน · ใช้แรง 1',cost:1,fn:()=>{delete S.debris[dk];S.hay++;sfx('till');pop(cx,cy-.3,'+1 หญ้า','#f2e28a');}};
  if(deb==='rock'){const lv=S.tools.hammer,hc=Math.max(1,TOOLS.hammer.stam[lv]-(lvl('mine')>=3?1:0));return{l:'ทุบหิน',h:`${TOOLS.hammer.n[lv]} · ใช้แรง ${hc}`,cost:hc,fn:()=>{xp('mine',2);delete S.debris[dk];S.mat.stone+=2;sfx('boom');pop(cx,cy-.3,'+2 หิน','#e6e6e6');}};}
  if(deb==='stump'){const lv=S.tools.axe;return{l:'ผ่าไม้',h:`${TOOLS.axe.n[lv]} · ใช้แรง ${TOOLS.axe.stam[lv]}`,cost:TOOLS.axe.stam[lv],fn:()=>{delete S.debris[dk];S.mat.wood+=3;sfx('till');pop(cx,cy-.3,'+3 ไม้','#e0b47a');}};}
  const fg=S.forage.findIndex(f=>f.x===tx&&f.y===ty);
  if(fg>=0){const f=S.forage[fg];return{l:'เก็บ',h:ITEMS[f.k].n,fn:()=>{S.forage.splice(fg,1);gain(f.k);sfx('harvest');pop(cx,cy-.4,'+1 '+ITEMS[f.k].n,'#fff');}};}
  const cow=nearAnimal(S.cows,cx,cy);
  if(cow){const nm={cow:'วัว',goat:'แพะ',buffalo:'ควาย'}[cow.kind],mk=cow.kind==='goat'?'goatmilk':'milk';const sc=sickCtx(cow,nm);if(sc)return sc;
    if(cow.milk)return{l:'รีดนม',h:`${nm} ${loveTxt(cow)}`,cost:2,fn:()=>{cow.milk=false;const q=gainQ(mk,animalQ(cow));sfx('harvest');pop(cow.x,cow.y-.7,'+1 '+ITEMS[mk].n+(q?' '+qStar(q):''),q===2?'#ffe07a':'#fff');}};
      if(cow.patted&&S.inv.brush&&!cow.brushed)return{l:'แปรงขน',anim:'patA',h:`${nm} ${loveTxt(cow)} · แปรงขนวันละครั้ง สนิทเร็วขึ้น`,fn:()=>{cow.brushed=true;cow.love=Math.min(10,(cow.love||0)+1);sfx('plant');pop(cow.x,cow.y-.7,'✦♥','#ffd0e0');stat('brush');}};
      return cow.patted?{l:'—',h:`${nm} ${loveTxt(cow)} · ${cow.brushed||!S.inv.brush?'ดูแลวันนี้แล้ว':'ลูบวันนี้แล้ว'}`,dis:true}:{l:'ลูบหัว',h:`${nm} ${loveTxt(cow)} · ลูบทุกวันให้นมดีขึ้น`,fn:()=>patAnimal(cow,'moo')};}
  const duck=nearAnimal(S.ducks,cx,cy);
  if(duck&&duck.sick)return sickCtx(duck,'เป็ด');
  if(duck)return duck.egg?{l:'เก็บไข่',h:`เป็ด ${loveTxt(duck)}`,fn:()=>{duck.egg=false;const q=gainQ('duckegg',animalQ(duck));sfx('harvest');pop(duck.x,duck.y-.6,'+1 ไข่เป็ด'+(q?' '+qStar(q):''),'#fff4c2');}}
    :duck.patted?{l:'—',h:`เป็ด ${loveTxt(duck)} · ลูบวันนี้แล้ว`,dis:true}:{l:'ลูบหัว',h:`เป็ด ${loveTxt(duck)}`,fn:()=>patAnimal(duck,'cluck')};
  const h=nearAnimal(S.hens,cx,cy);
  if(h&&h.sick)return sickCtx(h,'ไก่');
  if(h)return h.egg?{l:'เก็บไข่',h:`ไก่ ${loveTxt(h)}`,fn:()=>{h.egg=false;const q=gainQ('egg',animalQ(h));sfx('harvest');pop(h.x,h.y-.6,'+1 ไข่'+(q?' '+qStar(q):''),'#fff4c2');}}
                   :h.patted?{l:'—',h:`ไก่ ${loveTxt(h)} · ลูบวันนี้แล้ว`,dis:true}:{l:'ลูบหัว',h:`ไก่ ${loveTxt(h)} · ลูบทุกวันให้ไข่ดีขึ้น`,fn:()=>patAnimal(h,'cluck')};
  const c=map[ty]&&map[ty][tx];
  if(c==='h')return{l:'บ้าน',h:'เข้าบ้าน · นอน ทำอาหาร แต่งบ้าน',fn:enterHouse};
  if(c==='P'){const id=Object.keys(MACHINES).find(m=>MACHINES[m].x===tx),j=S.mach[id],B=BUILDS[id];
    if(j&&j.ready)return{l:'เก็บ',h:`${ITEMS[j.out].n} ×${j.n} เสร็จแล้ว`,fn:()=>{gain(j.out,j.n);delete S.mach[id];if(id==='bee')S.mach.bee={out:'honey',n:seasonIdx()===0?2:1,days:3,ready:false};sfx('harvest');pop(cx,cy-.4,`+${j.n} ${ITEMS[j.out].n}`,'#fff');}};
    if(j)return{l:'—',h:`${B.n}: ${ITEMS[j.out].n} อีก ${j.days} วัน${id==='dryer'&&S.rain?' (ฝนตก ไม่แห้ง)':''}`,dis:true};
    return{l:'ใส่ของ',h:B.n,fn:()=>{sfx('ui');openMachine(id);}};}
  if(c==='S'){const open=marketOpen();
    if(open)return{l:'แผงขาย',h:S.stall&&S.stall.items.length?`วางขาย ${S.stall.items.reduce((a,i)=>a+i.n,0)} ชิ้น · ขายได้ ฿${S.stall.earned}`:'ตลาดนัดเปิดแล้ว วางของขายได้',fn:()=>{sfx('ui');openStall();}};
    return{l:'—',h:`แผงของฉัน · ตลาดนัดทุกวันเสาร์ 08:00–15:00${weekday()===5&&S.t<MARKET.from?' (วันนี้)':''}`,dis:true};}
  if(c==='b'){const v=binValue();return v?{l:'ส่งขาย',h:`ของในกระเป๋า ฿${v} · เลือกได้ว่าจะขายอะไร`,fn:()=>{shipSel=null;sfx('ui');openShip();}}:{l:'ส่งขาย',h:'ตะกร้ายังว่าง',dis:true};}
  if(c==='k')return{l:'ร้าน',h:'เมล็ด หญ้าแห้ง สัตว์ อัปเกรดเครื่องมือ',fn:()=>{sfx('ui');if(!S.npc.daeng.talked&&folksOut()&&!festActive()){openNpc('daeng');}else openShop();}};
  if(c==='e'){
    const f=festOn();
    if(f&&f.id==='bangfai'){
      if(S.festDone.rocket)return{l:'—',h:'จุดบั้งไฟไปแล้วปีนี้',dis:true};
      if(fa)return{l:'จุดบั้งไฟ',h:'แข่งบั้งไฟ ลุ้นรางวัล',fn:startRocket};
      return{l:'—',h:'งานบุญบั้งไฟเริ่ม 09:00–17:00',dis:true};
    }
    if(f&&f.id==='newyear'){if(S.festDone.ny)return{l:'—',h:'อธิษฐานปีใหม่แล้ว อยู่ดูพลุต่อได้นะ',dis:true};if(fa)return{l:'อธิษฐาน',h:'ขอพรปีใหม่ที่ศาลา',fn:openWish};return{l:'—',h:'งานส่งท้ายปีเก่า 18:00–24:00',dis:true};}
    if(f&&f.id==='loy'){
      if(S.kt>0||S.festDone.loy)return{l:'—',h:S.festDone.loy?'ลอยกระทงไปแล้ว':'มีกระทงแล้ว ไปลอยที่บ่อน้ำ 18:00–22:00',dis:true};
      return{l:'ซื้อกระทง',h:`กระทงใบตอง ฿${KT_PRICE}`,fn:()=>{if(S.money<KT_PRICE){toast('เงินไม่พอ');return;}S.money-=KT_PRICE;S.kt=1;sfx('coin');toast('ได้กระทงแล้ว ไปลอยที่บ่อน้ำตอนค่ำ');}};
    }
    if(f&&f.id==='contest'){if(S.festDone.contest)return{l:'—',h:'ส่งผักประกวดไปแล้ววันนี้',dis:true};if(fa)return{l:'ส่งประกวด',h:'ประกวดผักประจำฤดู',fn:()=>{sfx('ui');openContest();}};return{l:'—',h:'ประกวดผัก 09:00–17:00',dis:true};}
    if(f&&f.id==='songkran')return{l:'—',h:fa?'สาดน้ำกับชาวบ้านบนลานได้เลย':'งานสงกรานต์ 09:00–17:00',dis:true};
    const n=nextFest();return{l:'—',h:n?`ศาลาหมู่บ้าน · ${n.f.n}อีก ${n.in} วัน`:'ศาลาหมู่บ้าน',dis:true};
  }
  if(c==='q'){
    if(S.trough)return{l:'—',h:'รางหญ้าเต็มแล้ว',dis:true};
    if(S.hay<S.cows.length)return{l:'—',h:`ต้องใช้หญ้าแห้ง ${S.cows.length} ฟ่อน (มี ${S.hay}) ซื้อที่ร้าน`,dis:true};
    return{l:'เติมหญ้า',h:`ใช้หญ้าแห้ง ${S.cows.length} ฟ่อน (มี ${S.hay})`,fn:()=>{S.hay-=S.cows.length;S.trough=true;stat('fed');sfx('plant');pop(cx,cy-.3,'เติมหญ้า','#f2e28a');}};
  }
  if(c==='w'){
    if(fa&&fa.id==='loy'&&S.kt>0)return{l:'ลอยกระทง',h:'อธิษฐานแล้วลอยกระทง',fn:()=>{S.kt=0;S.festDone.loy=true;stat('krathong');S.luck=3;addKrathong(true);sfx('upgrade');toast('ขอให้โชคดี! 3 วันนี้ปลาบึกชุมขึ้น');}};
    return{l:'ตกปลา',h:(S.luck>0?'ใช้แรง 2 · โชคดีจากกระทง':'ใช้แรง 2')+baitTxt(),cost:2,fn:()=>startFish(tx,ty)};
  }
  if(c==='r'){if(S.graze===S.day)return{l:'—',h:'วัวออกเล็มหญ้าอยู่ วันนี้ไม่ต้องเติมหญ้าในราง',dis:true};
    if(S.storm||S.rain)return{l:'—',h:'วันนี้ฝนตก ไม่ควรปล่อยวัวออกเล็มหญ้า เดี๋ยวป่วย',dis:true};
    if(S.t>=900)return{l:'—',h:'บ่ายแล้ว พรุ่งนี้เช้าค่อยปล่อยวัวออกเล็มหญ้า',dis:true};
    return{l:'ปล่อยวัว',h:'เปิดคอกให้วัวเล็มหญ้าวันแดดดี · ไม่ต้องเติมหญ้า และสนิทขึ้น',fn:()=>{S.graze=S.day;sfx('moo');toast('ปล่อยวัวออกเล็มหญ้าแล้ว วันนี้ไม่ต้องเติมหญ้า');stat('graze');}};}
  if(c==='L')return{l:'ซื้อที่ดิน',h:`ที่รกร้างหลังไร่ 91 แปลง · ฿${LAND_PRICE}`,fn:openLand};
  if(c==='c')return{l:'ช่างไม้',h:'สร้างอาคาร ซื้อไม้และหิน',fn:()=>{sfx('ui');if(!S.npc.ek.talked&&folksOut()&&!festActive()){openNpc('ek');}else openCarpenter();}};
  if(c==='N')return{l:'กระดาน',h:S.job&&!S.job.done?`งานรับจ้าง: ${ITEMS[S.job.k].n} ×${S.job.q} ได้ ฿${S.job.r}`:'กระดานพัฒนาหมู่บ้าน',fn:()=>{sfx('ui');openBoard();}};
  if(c==='T')return{l:'—',h:S.proj.temple.done?'วัดประจำหมู่บ้าน สวยงามแล้ว':'วัดเก่าทรุดโทรม · บูรณะได้ที่กระดานพัฒนาหมู่บ้าน',dis:true};
  if(c==='B')return{l:'—',h:'สะพานพัง · ซ่อมได้ที่กระดานพัฒนาหมู่บ้าน',dis:true};
  if(c==='y')return{l:'—',h:S.build&&S.build.id==='gh'?`กำลังสร้างโรงเรือน อีก ${S.build.days} วัน`:'ที่ว่างสำหรับโรงเรือน · สั่งสร้างที่ช่างเอก',dis:true};
  if(c==='v'&&ty>=18)return{l:'—',h:'กระท่อมมิ้นท์ริมลำธาร',dis:true};
  if(c==='R'){const open=S.t>=420&&S.t<1110&&!festActive();return open?{l:'ร้าน',h:'ร้านข้าวแกงจ๋า · ซื้อ-ขายอาหาร รับออเดอร์',fn:()=>{sfx('ui');openResto();}}:{l:'—',h:'ร้านข้าวแกงจ๋า เปิด 07:00–18:30',dis:true};}
  if(c==='v')return{l:'—',h:tx<=29?'บ้านลุงมี':tx<=33?'บ้านฝน':ty>=14?'บ้านยายสาย':'บ้านภูมิ',dis:true};
  if(c==='C')return{l:'เข้าเหมือง',h:`เหมืองบนเขา · ลึกสุดที่เคยไป ชั้น ${S.mineDeep}`,fn:()=>{sfx('ui');openMineEntry();}};
  if(c==='K')return{l:'—',h:'หน้าผาหิน',dis:true};
  if(c==='u')return{l:'—',h:`เล้าเป็ด · มีเป็ด ${S.ducks.length} ตัว`,dis:true};
  if(c==='o')return{l:'—',h:'โรงเรียนประจำหมู่บ้าน · ครูนุ่นสอนวันจันทร์–ศุกร์',dis:true};
  if(c==='d')return{l:'—',h:'อนามัยตำบล · หมอต้นประจำ 08:00–17:00',dis:true};
  if(c==='s'){
    const k=key(tx,ty),p=S.plots[k];
    if(!p){const lv=S.tools.hoe,tiles=areaTiles(lv).filter(([x,y])=>!S.plots[key(x,y)]);
      const hc=Math.max(1,TOOLS.hoe.stam[lv]-(lvl('farm')>=6?1:0));return{l:'ไถดิน',h:`${TOOLS.hoe.n[lv]} · ไถ ${tiles.length} ช่อง ใช้แรง ${hc}`,cost:hc,area:tiles,
        fn:()=>{xp('farm',tiles.length);tiles.forEach(([x,y])=>{S.plots[key(x,y)]={c:null,age:0,w:false};dust(x+.5,y+.7,5);});sfx('till');pop(cx,cy-.3,'ไถ','#f7ecd2');}};}
    if(p.dead)return{l:'ถอน',h:`${CROPS[p.c].n}เหี่ยวตายเพราะหมดฤดู`,cost:1,fn:()=>{p.c=null;p.dead=false;p.age=0;sfx('till');}};
    const waterCtx=()=>{const lv=S.tools.can,tiles=areaTiles(lv).filter(([x,y])=>{const q=S.plots[key(x,y)];return q&&!q.w&&!q.dead;});
      return{l:'รดน้ำ',cost:Math.max(lvl('farm')>=3?0:1,TOOLS.can.stam[lv]-(lvl('farm')>=3?1:0)),area:tiles,fn:()=>{xp('farm',Math.ceil(tiles.length/2));tiles.forEach(([x,y])=>{const q=S.plots[key(x,y)];q.w=true;q.bnc=clock;splash(x+.5,y+.5,4);});stat('watered');sfx('water');},lv,n:tiles.length};};
    if(!p.c){
      if(!inSeason(S.sel)&&!inGH(tx,ty))return{l:'—',h:`${CROPS[S.sel].n}นอกฤดู ปลูกได้เฉพาะในโรงเรือน`,dis:true};
      if(S.seeds[S.sel]>0)return{l:'ปลูก',h:`ปลูก${CROPS[S.sel].n} (${CROPS[S.sel].d} วัน)`,cost:1,fn:()=>{p.c=S.sel;p.age=0;S.seeds[S.sel]--;p.miss=false;stat('planted');xp('farm',1);if(S.prod.guano>0){S.prod.guano--;p.fert=true;toast('ใส่ปุ๋ยมูลค้างคาวแล้ว ผักจะโตไวขึ้น');}renderSeeds();sfx('plant');pop(cx,cy-.3,CROPS[p.c].n,'#d7f5c0');}};
      if(!p.w){const w=waterCtx();w.h=`ไม่มีเมล็ด${CROPS[S.sel].n} · รดน้ำ ${w.n} ช่อง`;return w;}
      return{l:'—',h:`เมล็ด${CROPS[S.sel].n}หมด ไปซื้อที่ร้าน`,dis:true};
    }
    const cr=CROPS[p.c];
    if(p.age>=cr.d){const lv=S.tools.sickle,tiles=areaTiles(lv).filter(([x,y])=>{const q=S.plots[key(x,y)];return q&&q.c&&!q.dead&&q.age>=CROPS[q.c].d;});
      return{l:'เก็บ',h:`${TOOLS.sickle.n[lv]} · ${cr.n}สุก ${tiles.length} ช่อง`,cost:TOOLS.sickle.stam[lv],area:tiles,fn:()=>{xp('farm',tiles.length*3);tiles.forEach(([x,y])=>{const q=S.plots[key(x,y)],ql=gainQ(q.c,harvestQ(q));if(lvl('farm')>=5&&Math.random()<.2)gain(q.c);pop(x+.5,y+.1,'+1 '+CROPS[q.c].n+(ql?' '+qStar(ql):''),ql===2?'#ffe07a':ql?'#e8eef0':'#fff');q.fert=false;q.miss=false;q.c=null;q.age=0;});sfx('harvest');}};}
    if(!p.w){const w=waterCtx();w.h=`${cr.n} อีก ${cr.d-p.age} วัน · ${TOOLS.can.n[w.lv]} ${w.n} ช่อง`;return w;}
    return{l:'—',h:`${cr.n}ได้น้ำแล้ว อีก ${cr.d-p.age} วัน`,dis:true};
  }
  return{l:'—',h:'หันหน้าเข้าหาแปลง สัตว์ บ่อน้ำ หรือชาวบ้าน',dis:true};
}
let lastAct=0;
// ---- player action animations (hoe, water, sickle, axe, hammer, fishing, pick, pet, eat, wave, yawn)
let act=null,yawnCd=20,idleT=0;
const ACT_MAP={'ไถดิน':'hoe','รดน้ำ':'can','ผ่าไม้':'axe','ทุบหิน':'hammer','ทุบ':'hammer','ตี':'hammer','ถอนหญ้า':'pick','ถอน':'pick','เก็บไข่':'egg','เก็บ':'pick',
  'รีดนม':'milk','ลูบหัว':'patA','ตกปลา':'fishcast','คุย':'wave','เก็บคืน':'pick','วาง':'pick','ปลูก':'sow','เติมหญ้า':'feed','ดำหัว':'can','สาดน้ำ':'can','เปิดหีบ':'pick'};
const ACT_T={hoe:[.44,.24],can:[.62,.3],sickle:[.4,.22],axe:[.46,.26],hammer:[.46,.26],pick:[.46,.26],pet:[.8,.3],fishcast:[.5,.42],wave:[.42,.36],fishreel:[.5,0],eat:[1.4,0],yawn:[1.4,0],holdup:[1,0]};
const LOOP={eat:1,yawn:0,holdup:1};
const RD_ACT=['egg','milk','patA','sow','feed'],ACT_FB={egg:'pick',milk:'pick',patA:'pick',sow:'pick',feed:'pick'};
Object.assign(ACT_T,{egg:[.56,.3],milk:[.8,.45],patA:[.7,.3],sow:[.5,.26],feed:[.56,.3]});
const hasAct=a=>sprOk(`act_${a}_right_0`)||sprOk(`act_${a}_down_0`);
function startAct(a,fn,opt={}){const T=ACT_T[a]||[.4,.2];act={a,t:0,dur:opt.dur||T[0],imp:T[1],fn,done:!fn,hold:opt.hold||0,then:opt.then};}
function updateAct(dt){if(!act)return;act.t+=dt;
  if(!act.done&&act.t>=act.imp){act.done=true;try{act.fn&&act.fn();}catch(e){}}
  if(act.t>=act.dur+act.hold){const nx=act.then;act=null;if(nx)startAct(nx,null);}}
function actFrame(){
  if(!act&&!fish)return null;
  const a=act?act.a:'fishwait',f=S.face;let dir='right',flip=false;
  const tool=['hoe','can','sickle','axe','hammer'].includes(a);
  if(tool){dir=f==='left'?'right':f;flip=f==='left';}
  else if(['fishcast','fishreel','fishwait','pet'].includes(a)){dir='right';flip=f==='left';}
  else if(RD_ACT.includes(a)){dir=(f==='left'||f==='right')&&sprOk(`act_${a}_right_0`)?'right':'down';flip=dir==='right'&&f==='left';if(!sprOk(`act_${a}_${dir}_0`))dir=dir==='right'?'down':'right';}
  else dir='down';
  let i;if(!act)i=Math.floor(clock*3)%4;else if(LOOP[a])i=Math.floor(act.t/.22)%4;else i=Math.min(3,Math.floor(act.t/act.dur*4));
  const k=tool&&dir==='up'?`act_${a}_up_${i}`:`act_${a}_${dir}_${i}`;
  return sprOk(k)?{k,flip}:null;
}
function doAction(){
  if(!modal.hidden||rocketFx||transitioning||busFx)return;
  const now=performance.now(); if(now-lastAct<160)return; lastAct=now;
  const c=context(); if(c.dis||!c.fn)return;
  if(c.face)S.face=c.face;
  if(c.cost&&S.stam<c.cost){toast('เหนื่อยแล้ว กลับบ้านไปนอนก่อน');sfx('fail');return;}
  if(c.cost)S.stam-=c.cost;
  if(act)return;
  let a=c.anim||ACT_MAP[c.l];if(a==='pick'&&c.l==='เก็บ'&&c.area)a='sickle';
  if((scene==='mine'||scene==='area')&&c.l==='เก็บ')a='pick';
  if(a&&!hasAct(a)&&ACT_FB[a])a=ACT_FB[a];
  if(a&&hasAct(a)){idleT=0;startAct(a,c.fn);}
  else c.fn();
}
const MKT_WHO=['ร้านอาหารในเมือง','โรงแรมริมทะเล','พ่อค้าจากกรุงเทพ','งานบุญวัดข้างเคียง','โรงเรียนในอำเภอ'];
function priceMul(k){let m=(S.mkt&&S.mkt[k])||1;for(const e of S.news||[])if(e.k===k)m*=e.m;if(CROPS[k]&&!inSeason(k))m*=1.2;return Math.max(.4,m);}
const unitPrice=k=>Math.round(ITEMS[k].v*priceMul(k));
function trend(k){const m=priceMul(k);return m>=1.12?`<span class="up">▲${Math.round((m-1)*100)}%</span>`:m<=.9?`<span class="dn">▼${Math.round((1-m)*100)}%</span>`:'<span class="eq">ปกติ</span>';}
function marketTick(){
  S.mkt=S.mkt||{};const sold=S.sold||{};
  for(const k in ITEMS){let m=S.mkt[k]||1;m=1+(m-1)*.65+(Math.random()-.5)*.18;if(sold[k])m-=Math.min(.35,sold[k]*.015);S.mkt[k]=Math.round(Math.max(.6,Math.min(1.5,m))*100)/100;}
  S.sold={};S.news=(S.news||[]).map(e=>Object.assign({},e,{d:e.d-1})).filter(e=>e.d>0);
  const fresh=[];
  if(Math.random()<.55&&S.news.length<3){const pool=Object.keys(ITEMS).filter(k=>k!=='guano'&&(S.col[k]>0||(CROPS[k]&&inSeason(k)))&&!S.news.some(e=>e.k===k));
    if(pool.length){const k=pool[Math.floor(Math.random()*pool.length)],boom=Math.random()<.62;
      const e=boom?{k,m:1.4+Math.round(Math.random()*4)/10,d:3,t:`${MKT_WHO[Math.floor(Math.random()*MKT_WHO.length)]}ต้องการ${ITEMS[k].n}จำนวนมาก`}:{k,m:.65,d:2,t:`${ITEMS[k].n}ล้นตลาด ราคาตก`};
      S.news.push(e);fresh.push(e);}}
  return fresh;
}
function itemVal(k){const n=S.prod[k]||0;if(!n)return 0;const q=qOf(k);return ITEMS[k].v*priceMul(k)*(n+q[1]*.25+q[2]*.5)*(CROPS[k]&&lvl('farm')>=10?1.1:1);}
function binValue(){let v=0;for(const k in ITEMS)v+=itemVal(k);return Math.round(v*(S.proj.market&&S.proj.market.done?1.15:1));}
let shipSel=null;
function shipKeys(){return Object.keys(ITEMS).filter(k=>S.prod[k]>0);}
function shipSome(keys){const bonus=S.proj.market&&S.proj.market.done?1.15:1;let v=0;S.sold=S.sold||{};
  for(const k of keys){if(!S.prod[k])continue;const x=Math.round(itemVal(k)*bonus);v+=x;earn('ส่งขาย · '+catOf(k),x);S.sold[k]=(S.sold[k]||0)+S.prod[k];S.prod[k]=0;delete S.qs[k];}
  if(!v)return 0;v+=firstShip();stat('shipped');S.bin+=v;sfx('coin');return v;}
function openShip(){
  const ks=shipKeys();if(!shipSel)shipSel=new Set(ks);for(const k of [...shipSel])if(!ks.includes(k))shipSel.delete(k);
  const bonus=S.proj.market&&S.proj.market.done?1.15:1,tot=ks.filter(k=>shipSel.has(k)).reduce((a,k)=>a+Math.round(itemVal(k)*bonus),0);
  const news=(S.news||[]).map(e=>`<div style="font-size:12px;padding:2px 0">${ic(e.k,16)} ${e.t} · ${e.m>1?`<span class="up">ราคา +${Math.round((e.m-1)*100)}%</span>`:`<span class="dn">ราคา −${Math.round((1-e.m)*100)}%</span>`} อีก ${e.d} วัน</div>`).join('');
  const rows=ks.map(k=>{const on=shipSel.has(k),q=qOf(k),qt=q[2]?` ★${q[2]}`:q[1]?` ☆${q[1]}`:'';
    return `<button type="button" class="shipRow ${on?'on':''}" data-shipk="${k}" aria-pressed="${on}"><span class="ck">${on?'✓':''}</span>${ic(k,22)}<b>${ITEMS[k].n}</b> ×${S.prod[k]}${qt}<span class="px">฿${unitPrice(k)} ${trend(k)}</span></button>`;}).join('');
  showModal(`<h2>ส่งขาย</h2><p class="lv">ราคาเปลี่ยนทุกวัน เลือกเก็บของที่ราคาตกไว้ขายวันอื่นได้ · ส่งของชนิดเดียวกันเยอะ พรุ่งนี้ราคาจะลดลง</p>
    ${news?`<div class="req"><b>ข่าวตลาด</b>${news}</div>`:''}${woHtml()}
    <div class="shipList">${rows||'<p>กระเป๋ายังว่าง</p>'}</div>
    <div class="row"><button class="btn" data-shipgo ${tot?'':'disabled'}>ส่งที่เลือก ฿${tot}</button>${ks.length?`<button class="btn ghost" data-shipall>${shipSel.size===ks.length?'ไม่เลือกเลย':'เลือกทั้งหมด'}</button>`:''}<button class="btn ghost" data-close>ปิด</button></div>`);
}
function firstShip(){if(S.stats.shipped||S.firstShip)return 0;S.firstShip=true;earn('รางวัลส่งขายครั้งแรก',300);setTimeout(()=>toast('ส่งขายครั้งแรก! คุณตาฝากเงินรางวัลไว้ให้อีก ฿300 ได้พรุ่งนี้เช้า'),900);return 300;}
function ship(){const v=binValue()+firstShip(),bonus=S.proj.market&&S.proj.market.done?1.15:1;for(const k in ITEMS)if(S.prod[k])earn('ส่งขาย · '+catOf(k),Math.round(itemVal(k)*bonus));S.qs={};stat('shipped');S.bin+=v;for(const k in S.prod)S.prod[k]=0;sfx('coin');toast(`ส่งของแล้ว ได้ ฿${v} พรุ่งนี้เช้า`);}

function newJob(){
  const pool=['kb','ch','egg','nil','taphien','bamboo','milk','corn','cab','rice','duk','cuc','bean','tom','car','bas'].filter(k=>!CROPS[k]||inSeason(k));const k=pool[Math.floor(Math.random()*pool.length)];
   const q=ITEMS[k].v>=100?1:2+Math.floor(Math.random()*3);return {k,q,r:Math.round(ITEMS[k].v*q*2/10)*10,done:false,who:['ลุงมี','ฝน','ครูนุ่น','หมอต้น','ยายสาย','ภูมิ'][Math.floor(Math.random()*6)]}
}
function newRequest(id){
  const pool=NPCS[id].pool.filter(k=>!CROPS[k]||inSeason(k)),k=pool[Math.floor(Math.random()*pool.length)];
  const q=ITEMS[k].v>=100?1:1+Math.floor(Math.random()*3);
  return{k,q,r:Math.round(ITEMS[k].v*q*1.5/5)*5,done:false};
}
function sleep(passOut){
  if(scene==='house'){scene='farm';S.inHouse=false;S.px=17.5;S.py=5.6;S.face='down';}
  if(scene==='mine'){scene='farm';mine=null;S.px=40.5;S.py=22.5;}if(scene==='area'){scene='farm';S.area=null;S.px=BUS_HOME[0];S.py=BUS_HOME[1];}riding=false;
  endFish();rocket=null;sandG=null;sandCastle=0;meterHide();
  const oldSeason=seasonIdx();
  let stormMsg='';if(S.storm){let lost=0,hit=0;for(const k in S.plots){const p=S.plots[k],[px,py]=k.split(',').map(Number);if(!p.c||p.dead||inGH(px,py))continue;
      if(p.age>=CROPS[p.c].d){if(Math.random()<.5){p.c=null;p.age=0;p.fert=false;lost++;}}else if(p.age>0&&Math.random()<.2){p.age--;hit++;}}
    let deb=0;for(let i=0;i<40&&deb<6;i++){const x=2+Math.floor(Math.random()*15),y=6+Math.floor(Math.random()*11),k=x+','+y;if(map[y][x]==='g'&&!S.plots[k]&&!S.debris[k]&&!S.decos[k]&&!S.trees[k]){S.debris[k]=Math.random()<.5?'weed':'stump';deb++;}}
    for(const k in S.trees){const T=S.trees[k];if(T.f>0&&Math.random()<.5)T.f=0;}
    stormMsg=`<div class="req"><b>เมื่อคืนพายุเข้า!</b> ${lost?`ผักสุกเสียหาย ${lost} แปลง`:'ผักสุกรอดทั้งหมด'}${hit?` · ผักโตช้าลง ${hit} แปลง`:''}${deb?` · มีกิ่งไม้และหญ้าขึ้นในไร่ ${deb} จุด`:''}</div>`;}
  const earned=S.bin;S.money+=earned;S.bin=0;
  const led=S.ledger;S.ledger={};const ledTotal=Object.values(led).reduce((a,b)=>a+b,0);
  for(const k in S.plots){const p=S.plots[k];if(p.c&&!p.dead&&!p.w&&p.age<CROPS[p.c].d)p.miss=true;if(p.c&&!p.dead&&p.w&&p.age<CROPS[p.c].d)p.age=Math.min(CROPS[p.c].d,p.age+(p.fert?2:1));p.w=false;if(!p.c)p.fert=false;}
  const grazed=S.graze===S.day,fed=S.trough||grazed;S.cows.forEach(c=>{if(grazed)c.love=Math.min(10,(c.love||0)+.5);if(fed&&c.kind!=='buffalo'&&!c.sick)c.milk=true;});S.trough=false;
  let sickN=0;if(S.day>=7){const all=[...S.hens.map(a=>[a,'hen']),...S.cows.map(a=>[a,'cow']),...S.ducks.map(a=>[a,'duck'])];
    for(const [a,t] of all){if(a.sick){a.love=Math.max(0,(a.love||0)-.5);continue;}let r=.012;if((a.love||0)<2)r+=.035;if(!a.patted)r+=.02;if(t==='cow'&&!fed)r+=.05;if(Math.random()<r){a.sick=true;a.milk=false;a.egg=false;sickN++;}}}
  S.hens.concat(S.cows,S.ducks).forEach(a=>a.brushed=false);
  S.ducks.forEach(d=>{if(!d.sick)d.egg=true;});
  S.day++;S.t=360;S.stam=passOut&&!has('bed')?Math.round(S.maxStam/2):S.maxStam;if(has('bed')&&S.rel.spouse)S.rel.mood=Math.min(100,(S.rel.mood||70)+2);
  let withered=0;const newSeason=seasonIdx()!==oldSeason;
  if(newSeason)for(const k in S.plots){const p=S.plots[k],[px,py]=k.split(',').map(Number);if(p.c&&!p.dead&&!inGH(px,py)&&!CROPS[p.c].s.includes(seasonIdx())){p.dead=true;withered++;}}
  // daily odd job on the noticeboard
  S.job=newJob();
  // machines
  for(const id in S.mach){const j=S.mach[id];if(j.ready)continue;if(id==='dryer'&&S.rain)continue;j.days--;if(j.days<=0)j.ready=true;}
  if(S.stall){for(const it of S.stall.items)S.prod[it.k]+=it.n;S.stall=null;}
  S.hot=[];if(weekday()===5){const pool=Object.keys(ITEMS);while(S.hot.length<2){const k=pool[Math.floor(Math.random()*pool.length)];if(!S.hot.includes(k))S.hot.push(k);}}
  // construction
  let builtMsg='';
  if(S.build){S.build.days--;if(S.build.days<=0){const id=S.build.id;S.built[id]=true;S.build=null;builtMsg=BUILDS[id].n;
    if(id==='coop')S.hens.push({x:21.5,y:13.8,egg:true,love:0},{x:22.8,y:12.9,egg:true,love:0});
    if(id==='barn')S.cows.push({x:30.8,y:12.8,milk:false,love:0});
    if(id==='house')S.maxStam+=30;
    if(id==='bee')S.mach.bee={out:'honey',n:seasonIdx()===0?2:1,days:3,ready:false};
    [...S.hens,...S.cows].forEach(a=>{a.vx=a.vy=a.vx||0;a.tm=a.tm||0;a.bob=a.bob||0;});
    applyUnlocks();}}
  // weeds creep back on bought land, meadow renews
  if(S.land)for(let y=18;y<=24;y++)for(let x=2;x<=14;x++){const k=x+','+y;if(!S.plots[k]&&!S.debris[k]&&Math.random()<.04)S.debris[k]='weed';}
  S.forage=[];
  {const sp=FORAGE_SEASON[seasonIdx()];for(let i=0;i<3;i++){for(let j=0;j<20;j++){const x=36+Math.floor(Math.random()*5),y=20+Math.floor(Math.random()*5);
    if(map[y][x]==='F'&&!S.forage.some(f=>f.x===x&&f.y===y)){S.forage.push({x,y,k:sp[Math.floor(Math.random()*sp.length)]});break;}}}}
  let bufMsg=nightPests();S.crows=[];bufMsg+=checkUnlocks();if(unl('merchant'))woCheck();if(unl('merchant')&&weekday()===0&&!S.wo.done&&S.unl.merchant!==S.day)bufMsg+=`<p>พ่อค้าเสือชายจากในเมืองฝากออเดอร์ใหม่ไว้ที่ถังส่งขาย ค่าตอบแทน ฿${S.wo.r.toLocaleString('en-US')}</p>`;pondDay();if(S.fp&&S.fp.ready)bufMsg+='<p>ปลาในบ่อเลี้ยงโตเต็มที่แล้ว ไปจับได้เลย</p>';
  if(S.pet){const P=S.pet;if(P.love>=4&&Math.random()<.35){const k=['bamboo','mush','phakwan','egg','cu'][Math.floor(Math.random()*5)];gain(k);bufMsg+=`<p>${P.name}คาบ${ITEMS[k].n}มาวางไว้หน้าบ้าน</p>`;}P.patted=false;P.x=S.px-.8;P.y=S.py+.3;}
  else if(S.day>=3&&!S.petOffer)bufMsg+=`<div class="req"><b>มีเสียงร้องเบาๆ หน้าบ้าน</b> ลูกหมาและลูกแมวหลงมาที่ไร่ อยากรับตัวไหนไว้เลี้ยง
    <div class="row"><input id="petName" type="text" maxlength="16" value="ข้าวตู" aria-label="ชื่อสัตว์เลี้ยง" style="font:inherit;padding:6px 8px;border:2px solid var(--wood);border-radius:8px;min-width:0;flex:1 1 120px"></div>
    <div class="row"><button class="btn" data-adopt="dog">รับลูกหมา</button><button class="btn" data-adopt="cat">รับลูกแมว</button></div></div>`;
  if(S.cows.some(c=>c.kind==='buffalo')){let n=0,w=0;const zones=[[2,11,6,14]];if(S.land)zones.push([2,14,18,24]);
    for(const [x0,x1,y0,y1] of zones)for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const k=x+','+y;if(map[y][x]!=='s')continue;
      if(S.debris[k]==='weed'&&w<4){delete S.debris[k];S.hay++;w++;continue;}
      if(!S.plots[k]&&!S.debris[k]&&n<6){S.plots[k]={c:null,age:0,w:false};n++;}}
    if(n||w)bufMsg+=`<p>ควายไถดินให้ ${n} แปลง${w?` ถางหญ้า ${w} กอ`:''}</p>`;}
  if(S.proj.bridge.done){
    const free=()=>{for(let i=0;i<30;i++){const x=28+Math.floor(Math.random()*7),y=18+Math.floor(Math.random()*7),k=x+','+y;if(map[y][x]==='m'&&!S.debris[k]&&!S.forage.some(f=>f.x===x&&f.y===y))return[x,y];}return null;};
    let rocks=0,stumps=0;for(const k in S.debris){const[x,y]=k.split(',').map(Number);if(inMeadow(x,y)){if(S.debris[k]==='rock')rocks++;if(S.debris[k]==='stump')stumps++;}}
    if(rocks<6){const p=free();if(p)S.debris[p.join(',')]='rock';}
    if(stumps<6){const p=free();if(p)S.debris[p.join(',')]='stump';}
    for(let i=0;i<3;i++){const p=free();if(p)S.forage.push({x:p[0],y:p[1],k:Math.random()<.25?'mush':FORAGE_SEASON[seasonIdx()][0]});}
  }
  const rollWx=d=>{if(festOn(d))return Math.random()<.2?'rain':'sun';const si=seasonIdx(d),st=[.04,.12,0][si];const r=Math.random();return r<st?'storm':r<st+SEASONS[si].rain?'rain':'sun';};
  const wxToday=S.wxNext||rollWx(S.day);S.wxNext=rollWx(S.day+1);
  S.rain=wxToday!=='sun';S.storm=wxToday==='storm';
  if(S.rain)for(const k in S.plots)S.plots[k].w=true;
  for(const k in S.trees){const T=S.trees[k],F=FTREES[T.k];if(T.age<F.grow)T.age++;else if(F.s.includes(seasonIdx())&&T.f<F.every)T.f++;}
  const sprN=S.rain?0:runSprinklers();
  [...S.hens,...S.cows,...S.ducks].forEach(a=>{if(!a.patted&&(a.love||0)>0)a.love=Math.max(0,a.love-.5);a.patted=false;});
  if(!fed)S.cows.forEach(c=>{c.love=Math.max(0,(c.love||0)-1);});
  S.hens.forEach(h=>{if(!h.sick)h.egg=true;});
  S.festDone={};S.kt=0;if(S.luck>0)S.luck--;if(has('radio')&&Math.random()<.2){S.luck=Math.max(S.luck,1);bufMsg+='<p>วิทยุรายการดูดวงบอกว่าวันนี้คุณดวงดีมาก ตกปลาหายากง่ายขึ้น</p>';}S.kidPlayed=false;
  // family
  let famMsg='';
  if(S.rel.wedDay&&S.day>=S.rel.wedDay&&!S.rel.spouse){const id=S.rel.date;S.rel.spouse=id;S.rel.married=S.day;S.rel.wedDay=null;S.npc[id].h=10;
    famMsg=`<p class="req"><b>วันแต่งงาน!</b> ชาวบ้านมารวมตัวที่ลาน ยายสายผูกข้อมือรับขวัญ ลุงมีรดน้ำสังข์ ภูมิเล่นพิณเพลงที่แต่งให้ทั้งคู่ ${NPCS[id].n}ย้ายมาอยู่ที่ไร่กับคุณแล้ว</p>`;}
  else if(S.rel.spouse){const sid=S.rel.spouse,sp=NPCS[sid].n,sn=S.npc[sid],R=S.rel,yd=S.day-1;
    let dm=sn.talked?4:-12;if(sn.gifted)dm+=3;if(isBday(sid,yd)&&!sn.gifted)dm-=25;if(isAnniv(yd)&&R.annivDay!==yd)dm-=20;
    R.mood=Math.max(0,Math.min(100,R.mood+dm));
    if(!R.fight&&(R.mood<30||(R.mood<60&&Math.random()<.07))){R.fight=S.day;R.mood=Math.min(R.mood,35);
      famMsg=`<p class="req"><b>${sp}งอนคุณอยู่</b> ${dm<-15?'เพราะเมื่อวานลืมวันสำคัญ':!sn.talked?'เพราะไม่ได้คุยกันเลย':'ทะเลาะกันเรื่องเล็กๆ เมื่อคืน'} ไปง้อก่อนนะ (${sp}จะไม่ช่วยงานไร่จนกว่าจะคืนดี)</p>`;}
    else if(R.fight)famMsg=`<p>${sp}ยังงอนอยู่ ลองไปขอโทษหรือให้ของที่ชอบ</p>`;
    else for(let rep=0;rep<(R.mood>=85?2:R.mood>=45?1:0);rep++){const r=Math.random();
    if(r<.34){let n=0;for(const k in S.plots){const p=S.plots[k];if(p.c&&!p.dead&&!p.w){p.w=true;n++;}}famMsg+=n?`<p>${sp}ตื่นเช้ารดน้ำผักให้ ${n} แปลง</p>`:'';}
    else if(r<.67&&!S.trough&&S.hay>=S.cows.length){S.hay-=S.cows.length;S.trough=true;famMsg+=`<p>${sp}เติมหญ้าในรางวัวให้แล้ว</p>`;}
    else{const k=S.known[Math.floor(Math.random()*S.known.length)];gain(k);famMsg+=`<p>${sp}ทำ${ITEMS[k].n}ไว้ให้ในครัว</p>`;}}
    if(isAnniv())famMsg+=`<p class="req"><b>วันนี้ครบรอบแต่งงาน ${(S.day-R.married)/YEAR} ปี!</b> ไปคุยกับ${sp} และให้ของขวัญนะ</p>`;
    if(S.rel.kid){const a=kidAge(),nm=S.rel.kid.name;
      if(a===14)famMsg+=`<p class="req"><b>${nm}เริ่มเดินเตาะแตะแล้ว!</b> เดินตาม${sp}ไปทั่วไร่เลย</p>`;
      else if(a===42)famMsg+=`<p class="req"><b>${nm}เข้าโรงเรียนครูนุ่นแล้ว!</b> นิสัย${kidTrait().n}</p>`;
      else if(a===84)famMsg+=`<p class="req"><b>${nm}โตเป็นวัยรุ่นแล้ว</b> ช่วยงานบ้านได้เก่งขึ้นทุกวัน</p>`;
      if(a>=42&&Math.random()<(a>=84?.7:.45))famMsg+=`<p>${nm} ${kidTrait().f()}</p>`;}
    if(S.rel.babyDue&&S.day>=S.rel.babyDue)famMsg+=`<div class="req"><b>ลูกของเราเกิดแล้ว!</b> ตั้งชื่อให้ลูกหน่อย
      <div class="row"><input id="kidName" type="text" maxlength="20" value="น้องข้าวหอม" style="font:inherit;padding:6px 8px;border:2px solid var(--wood);border-radius:8px;min-width:0;flex:1"><button class="btn" data-kidname>ตั้งชื่อ</button></div></div>`;
    else if(!S.rel.kid&&!S.rel.babyDue&&S.day-S.rel.married>=10&&(!S.rel.kidAsk||S.day>=S.rel.kidAsk))famMsg+=`<div class="req">${sp}จับมือคุณเบาๆ “เราอยากมีลูกด้วยกันไหม”
      <div class="row"><button class="btn" data-kid="yes">อยากสิ</button><button class="btn ghost" data-kid="no">รออีกหน่อย</button></div></div>`;
  }
  krathongs.length=0;
  let reqs=0;
  for(const id in S.npc){const n=S.npc[id];n.talked=false;n.gifted=false;if(!NPCS[id]||!here(id)){n.req=null;continue;}
    if(!n.req||n.req.done)n.req=null;if(n.req&&!n.req.done)reqs++;}
  {const cap=S.day<=7?2:S.day<=21?3:4,ids=Object.keys(S.npc).filter(id=>NPCS[id]&&here(id)&&!S.npc[id].req).sort(()=>Math.random()-.5);for(const id of ids){if(reqs>=cap)break;if(Math.random()<.7){S.npc[id].req=newRequest(id);reqs++;}}}
  S.town=S.town||{};let townMsg='';
  for(const id in NPCS){const a=NPCS[id].arrive;if(a&&!S.town[id]&&S.proj[a]&&S.proj[a].done){S.town[id]=S.day;S.npc[id]=S.npc[id]||{h:0,talked:false,gifted:false,req:null};
    townMsg+=id==='mint'?'<p class="req"><b>มีคนย้ายเข้ามาใหม่!</b> มิ้นท์ ไกด์เดินป่า สร้างกระท่อมที่ทุ่งริมลำธาร (คบหาได้ · ชอบไปเดินป่ามากกว่าของแพง)</p>'
      :'<p class="req"><b>ร้านใหม่เปิดแล้ว!</b> จ๋าเปิดร้านข้าวแกงข้างลานหมู่บ้าน ซื้อ-ขายอาหาร รับออเดอร์วัตถุดิบ (คบหาได้ · ชอบคนที่ช่วยร้าน)</p>';}}
  if(S.town.mint)for(let y=18;y<=20;y++)for(let x=32;x<=34;x++){delete S.debris[x+','+y];S.forage=S.forage.filter(f=>!(f.x===x&&f.y===y));}
  if(townMsg)applyUnlocks();
  if(S.town.ja)S.ja.order=jaOrder();
  let evalMsg='';if(S.day>1&&(S.day-1)%YEAR===0){S.evalDue=true;evalMsg=`<div class="req"><b>ครบ ${(S.day-1)/YEAR} ปีแล้ว!</b> ยายสายมาหาที่บ้าน ถือจดหมายที่คุณตาฝากไว้ให้เปิดวันนี้<div class="row" style="margin-top:6px"><button class="btn" data-evalopen>เปิดจดหมายของคุณตา</button></div></div>`;}
  const mnews=marketTick();
  const mktMsg=mnews.length?`<p>ข่าวตลาด: ${mnews.map(e=>e.t).join(' · ')}</p>`:'';
  resetFolks();
  renderSeeds();
  if(!passOut){S.px=17.5;S.py=5.6;S.face='down';}
  save();cloudPush(true);sfx('sleep');
  const f=festOn(),tmr=festOn(S.day+1),bd=bdayOn(S.day);
  const seasonCrops=Object.keys(CROPS).filter(inSeason).map(k=>CROPS[k].n).join(' ');
  const stH=storyNow();
  const chips=[],chip=(ico,t,cls)=>chips.push(`<span class="mchip ${cls||''}">${ico}<span>${t}</span></span>`);
  chip(glyph(S.storm?'storm':S.rain?'rain':'sun',18),S.storm?'พายุเข้าตอนเย็น':S.rain?'ฝนตก รดน้ำให้แล้ว':'แดดดี','');
  chip(glyph(S.wxNext==='storm'?'storm':S.wxNext==='rain'?'rain':'sun',16),`พรุ่งนี้${S.wxNext==='storm'?'พายุ!':S.wxNext==='rain'?'ฝน':'แดด'}`,S.wxNext==='storm'?'warn':'');
  chip(icon('egg',18),'ไข่พร้อมเก็บ');chip(icon('milk',18),fed?(grazed?'วัวเล็มหญ้าอิ่ม นมพร้อมรีด':'นมพร้อมรีด'):'วัวไม่มีนม',fed?'':'warn');
  if(sprN)chip(glyph('can',18),`สปริงเกอร์ ${sprN} แปลง`);
  {const sk=[...S.hens,...S.cows,...S.ducks].filter(a=>a.sick).length;if(sk)chip(icon('med',18),`สัตว์ป่วย ${sk} ตัว`,'warn');}
  if(reqs)chip(glyph('talk',18),`คำขอ ${reqs} คน`);
  if(Object.values(S.mach).some(j=>j.ready))chip(icon('butter',18),'ของแปรรูปเสร็จ');
  if(weekday()===5)chip(glyph('shop',18),'ตลาดนัดวันนี้');
  if(tmr)chip(glyph('sun',16),`พรุ่งนี้งาน${tmr.n}`);
  if(passOut)chip(glyph('sleep',18),'เผลอหลับ แรงครึ่งเดียว','warn');
  const inc=ledTotal?`<details class="mled"><summary><b>รายได้เมื่อวาน ฿${ledTotal.toLocaleString('en-US')}</b> · เงินตอนนี้ ฿${S.money.toLocaleString('en-US')}</summary>${Object.keys(led).sort((a,b)=>led[b]-led[a]).map(k=>`<div class="need" style="padding:1px 0"><span>${k}</span><span style="flex:none;white-space:nowrap">฿${led[k]}</span></div>`).join('')}</details>`:'<p class="lv">เมื่อวานยังไม่มีรายได้ ลองส่งผักขายที่ถังไม้</p>';
  const backup=!CLD.ok&&S.day-(S.lastBackup||1)>=7&&S.day-(S.backupShown||0)>=7?`<div class="req"><b>สำรองเซฟหน่อย</b> เซฟอยู่ในเครื่องนี้เท่านั้น ถ้าล้างข้อมูลเบราว์เซอร์จะหาย คัดลอกรหัสเซฟเก็บไว้ในโน้ตหรือแชท<div class="row" style="margin-top:6px"><button class="btn ghost" data-savecode>คัดลอกรหัสเซฟ</button><button class="btn ghost" data-backuplater>ไว้ทีหลัง</button></div></div>`:'';
  if(backup)S.backupShown=S.day;
  dayTransition(`${season().n} · วันที่ ${dayOfSeason()}`,`<div class="npcHead"><h2>เช้า${season().n} · วันที่ ${dayOfSeason()} ${WEEKDAYS[weekday()]}</h2><small>${esc(S.farm||'ไร่สุขใจ')}</small></div>
    ${stH}
    ${f?`<p class="req"><b>วันนี้มีงาน${f.n}!</b> ${f.desc} (${f.where})</p>`:''}
    ${newSeason?`<p class="req"><b>เข้าสู่${season().n}แล้ว</b> ผักประจำฤดู: ${seasonCrops}${withered?` · ผักนอกฤดูเหี่ยวตาย ${withered} แปลง`:''}<br>มีภารกิจ${season().n}ใหม่ 5 ข้อ แตะแถบเป้าหมายด้านล่างเพื่อดู</p>`:''}
    ${stormMsg}${S.storm?'<div class="req"><b>วันนี้พายุเข้าตอนเย็น!</b> เก็บผักที่สุกก่อนนอน ผักในโรงเรือนปลอดภัย</div>':''}
    ${bd?`<p class="req">วันนี้วันเกิด<b>${NPCS[bd].n}</b> ให้ของขวัญวันนี้ได้หัวใจเพิ่มพิเศษ</p>`:''}
    ${builtMsg?`<p class="req"><b>ช่างเอกสร้าง${builtMsg}เสร็จแล้ว!</b> ${BUILDS[Object.keys(BUILDS).find(k=>BUILDS[k].n===builtMsg)].d}</p>`:''}
    ${evalMsg}${townMsg}
    <div class="mchips">${chips.join('')}</div>
    ${weekday()===5&&S.hot.length?`<p class="lv">ตลาดนัด 08:00–15:00 · ของขายดี: ${S.hot.map(k=>ITEMS[k].n).join(', ')}</p>`:''}
    ${mktMsg?`<p class="lv">${mktMsg.replace(/<\/?p>/g,'')}</p>`:''}
    ${inc}${famMsg}${bufMsg}${backup}
    ${S.rel.babyDue&&S.day>=S.rel.babyDue?'':'<div class="row"><button class="btn" data-close>เริ่มวันใหม่</button></div>'}`);
}

// ---------- modals ----------
const modal=$('modal'),panel=$('panel');
let closeT=null,transitioning=false;
function dayTransition(title,html){
  if(window.__noTransition||reduceMotion()){showModal(html);return;}
  transitioning=true;modal.hidden=true;modal.classList.remove('closing','anim');
  const f=$('dayFade');$('dayFadeTxt').textContent=title;f.classList.add('on');
  setTimeout(()=>{showModal(html);f.classList.remove('on');transitioning=false;},1400);
}
const reduceMotion=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){return false;}};
function showModal(html){
  clearTimeout(closeT);modal.classList.remove('closing');
  const tmp=document.createElement('div');tmp.innerHTML=html;
  if(!tmp.children){panel.innerHTML=html;modal.hidden=false;return;}
  const kids=[...tmp.children];let head=kids.find(k=>k.matches('h2,.npcHead'));
  const last=kids[kids.length-1];let foot=last&&last.classList.contains('row')?last:null;
  if(foot&&foot.querySelectorAll('button').length===1&&foot.querySelector('[data-close]')&&foot.textContent.trim()==='ปิด'){foot.remove();foot=null;}
  const closable=html.includes('data-close');
  panel.innerHTML='';
  const H=document.createElement('div');H.className='mHead';if(head)H.appendChild(head);else H.appendChild(document.createElement('div'));
  if(closable){const x=document.createElement('button');x.type='button';x.className='mX';x.setAttribute('data-close','');x.setAttribute('aria-label','ปิด');x.innerHTML=glyph('close',20);H.appendChild(x);}
  const B=document.createElement('div');B.className='mBody';
  [...tmp.childNodes].forEach(n=>{if(n!==foot)B.appendChild(n);});
  panel.appendChild(H);panel.appendChild(B);
  if(foot){const F=document.createElement('div');F.className='mFoot';F.appendChild(foot);panel.appendChild(F);}
  const wasHidden=modal.hidden;modal.hidden=false;B.scrollTop=0;
  if(wasHidden&&!reduceMotion()){modal.classList.remove('anim');void modal.offsetWidth;modal.classList.add('anim');}
  const b=(foot||B).querySelector('button:not([disabled])');if(b)b.focus({preventScroll:true});
}
function closeModal(){
  if(modal.hidden)return;
  try{const ae=document.activeElement;if(ae&&ae.blur)ae.blur();}catch(e){}
  if(reduceMotion()){modal.hidden=true;return;}
  modal.classList.add('closing');clearTimeout(closeT);
  closeT=setTimeout(()=>{modal.hidden=true;modal.classList.remove('closing','anim');},140);
}
panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.hasAttribute('data-close')){sfx('ui');closeModal();}
  if(b.dataset.buy){const [k,ns]=b.dataset.buy.split(':');const n=+ns;
    const cost=(k==='hay'?HAY_PRICE:seedPrice(k))*n;
    if(S.money>=cost){S.money-=cost;stat('bought');if(k==='hay')S.hay+=n;else S.seeds[k]+=n;sfx('coin');renderSeeds();openShop();}}
  if(b.dataset.sap){const k=b.dataset.sap,F=FTREES[k];if(S.money>=F.price){S.money-=F.price;S.decoInv['tr_'+k]=(S.decoInv['tr_'+k]||0)+1;stat('bought');sfx('coin');openShop();toast(`ได้ต้นกล้า${F.n}แล้ว ปลูกจากกระเป๋า`);}return;}
  if(b.dataset.mat){const [k,ns]=b.dataset.mat.split(':');const n=+ns,cost=MATS[k].p*n;
    if(S.money>=cost){S.money-=cost;S.mat[k]+=n;sfx('coin');openCarpenter();}}
  if(b.dataset.build){const id=b.dataset.build,B=BUILDS[id];
    if(!S.build&&!S.built[id]&&S.money>=bcost(B)&&S.mat.wood>=B.wood&&S.mat.stone>=B.stone){S.money-=bcost(B);S.mat.wood-=B.wood;S.mat.stone-=B.stone;S.build={id,days:B.days};sfx('upgrade');openCarpenter();toast(`ช่างเอกเริ่มสร้าง${B.n} เสร็จใน ${B.days} วัน`);}}
  if(b.dataset.speed){S.opt.speed=b.dataset.speed;save();$('menuBtn').click();return;}
  if(b.dataset.savecode!==undefined){S.lastBackup=S.day;save();openSaveCode();return;}
  if(b.dataset.copysave!==undefined){const ta=panel.querySelector('#saveOut');const done=()=>{b.textContent='คัดลอกแล้ว';};
    try{navigator.clipboard.writeText(ta.value).then(done,()=>{ta.select();b.textContent='เลือกข้อความแล้ว กดคัดลอกเอง';});}catch(e){ta.select();}return;}
  if(b.dataset.loadsave!==undefined){const v=(panel.querySelector('#saveIn').value||'').trim();
    try{const o=JSON.parse(decodeURIComponent(escape(atob(v))));if(!o||!o.plots||!o.day)throw 0;applyLoaded(o);save();cloudPush(true);closeModal();toast(`โหลดเซฟแล้ว · วันที่ ${dayOfSeason()} ${season().n}`);}
    catch(e){const m=panel.querySelector('#saveErr');if(m)m.textContent='รหัสเซฟไม่ถูกต้อง ตรวจว่าคัดลอกมาครบทั้งหมด';}return;}
  if(b.dataset.storyrice!==undefined){if(S.prod.rice>=3){S.prod.rice-=3;S.flags.rice=1;sfx('coin');closeModal();}return;}
  if(b.dataset.adopt){const v=((panel.querySelector('#petName')||{}).value||'').trim().slice(0,16)||(b.dataset.adopt==='dog'?'ข้าวตู':'ส้มฉุน');
    S.pet={kind:b.dataset.adopt,name:v,x:S.px-.8,y:S.py+.3,love:1,patted:false,dir:1,walk:0};S.petOffer=true;sfx('upgrade');save();b.closest('.req').innerHTML=`<b>${v}</b> มาอยู่ที่ไร่แล้ว! จะเดินตามคุณไปทุกที่ ลูบหัววันละครั้งเพื่อเพิ่มความสนิท`;return;}
  if(b.dataset.deco){const [k,ns]=b.dataset.deco.split(':'),n=+ns,c=DECOS[k].p*n;if(S.money>=c){S.money-=c;S.decoInv[k]=(S.decoInv[k]||0)+n;sfx('coin');openCarpenter();}return;}
  if(b.dataset.place){placing=b.dataset.place;closeModal();toast(DECOS[placing].tree?`หันไปที่หญ้าหรือดินว่างในไร่ แล้วกด “ปลูก” · ${DECOS[placing].n}`:`หันไปที่หญ้าว่าง แล้วกด “วาง” · ${DECOS[placing].n}`);return;}
  if(b.dataset.contest){const [k,qs]=b.dataset.contest.split(':');runContest(k,+qs);return;}
  if(b.dataset.tab){bagState.tab=b.dataset.tab;bagState.sel=null;sfx('ui');openBag();return;}
  if(b.dataset.slot){bagState.sel=b.dataset.slot;sfx('ui');openBag();return;}
  if(b.dataset.bageat){const k=b.dataset.bageat;if(S.prod[k]>0&&S.stam<S.maxStam){startAct('eat',null,{dur:1.3});S.prod[k]--;S.stam=Math.min(S.maxStam,S.stam+ITEMS[k].e);sfx('harvest');toast(`อร่อย! แรง +${ITEMS[k].e}`);openBag();}return;}
  if(b.dataset.seed){S.sel=b.dataset.seed;renderSeeds();closeModal();return;}
  if(b.dataset.job!==undefined){const j=S.job;if(j&&!j.done&&S.prod[j.k]>=j.q){S.prod[j.k]-=j.q;S.money+=j.r;earn('งานรับจ้าง',j.r);j.done=true;stat('job');sfx('coin');openBoard();}return;}
  if(b.dataset.ev){const [id,thr,i]=b.dataset.ev.split(':');eventChoice(id,+thr,+i);return;}
  if(b.dataset.shipk){const k=b.dataset.shipk;if(shipSel.has(k))shipSel.delete(k);else shipSel.add(k);sfx('ui');openShip();return;}
  if(b.dataset.shipall!==undefined){const ks=shipKeys();shipSel=shipSel.size===ks.length?new Set():new Set(ks);sfx('ui');openShip();return;}
  if(b.dataset.shipgo!==undefined){const v=shipSome([...shipSel]);shipSel=null;closeModal();if(v)toast(`ส่งของแล้ว ได้ ฿${v} พรุ่งนี้เช้า`);return;}
  if(b.dataset.rbuy){const k=b.dataset.rbuy,p=Math.round(ITEMS[k].v*1.1);if(S.money>=p){S.money-=p;gain(k);S.ja.biz=(S.ja.biz||0)+.2;sfx('coin');openResto(`${ITEMS[k].n}ร้อนๆ ได้เลย!`);}return;}
  if(b.dataset.rsell){const k=b.dataset.rsell;if(S.prod[k]>0){const p=Math.round(unitPrice(k)*1.3);S.prod[k]--;if(qOf(k)[2]>S.prod[k])qOf(k)[2]=S.prod[k];if(qOf(k)[1]>S.prod[k])qOf(k)[1]=S.prod[k];S.money+=p;earn('ขายให้ร้านจ๋า',p);sfx('coin');openResto(`${ITEMS[k].n}ฝีมือดีนี่ ฉันรับหมด!`);}return;}
  if(b.dataset.rorder!==undefined){const o=S.ja.order;if(o&&!o.done&&hasAll(o.it)){for(const k in o.it)S.prod[k]-=o.it[k];o.done=true;S.money+=o.r;earn('ออเดอร์ร้านจ๋า',o.r);addH('ja',2);S.ja.biz=(S.ja.biz||0)+1;stat('jaorder');sfx('coin');openResto(`ของครบเลย! นี่ ฿${o.r} พรุ่งนี้ฝากด้วยนะ`);}return;}
  if(b.dataset.ridea){const k=b.dataset.ridea;if(S.prod[k]>0&&!S.ja.menu.includes(k)){S.prod[k]--;S.ja.menu.push(k);S.ja.biz=(S.ja.biz||0)+2;addH('ja',2);sfx('upgrade');openResto(`${ITEMS[k].n}! อร่อยมาก ขึ้นเมนูพรุ่งนี้เลย`);}return;}
  if(b.dataset.tipreset!==undefined){S.tips={};tipQ=[];closeModal();toast('จะแสดงคำแนะนำอีกครั้งระหว่างเล่น');return;}
  if(b.dataset.namego!==undefined){const a=((panel.querySelector('#pnIn')||{}).value||'').trim().slice(0,14),f=((panel.querySelector('#fmIn')||{}).value||'').trim().slice(0,18);
    S.pname=a||'ต้นกล้า';S.farm=f||'ไร่สุขใจ';try{document.title=S.farm;}catch(e){}save();sfx('upgrade');closeModal();toast(`ยินดีต้อนรับ ${S.pname} สู่${S.farm}`);return;}
  if(b.dataset.backuplater!==undefined){S.lastBackup=S.day-4;b.closest('.req').remove();return;}
  if(b.dataset.date2){sfx('ui');openDate(b.dataset.date2);return;}
  if(b.dataset.dgo){const [id,k]=b.dataset.dgo.split(':');goDate(id,k);return;}
  if(b.dataset.map!==undefined){sfx('ui');openMap();return;}
  if(b.dataset.book!==undefined){sfx('ui');openBook();return;}
  if(b.dataset.mtab){const [k,v]=b.dataset.mtab.split(':');MTAB[k]=v;sfx('ui');({shop:openShop,carp:openCarpenter,book:openBook})[k]();const mb=panel.querySelector('.mBody');if(mb)mb.scrollTop=0;return;}
  if(b.dataset.wo!==undefined){woDeliver();return;}
  if(b.dataset.fry){const k=b.dataset.fry,X=FISHF[k];if(!S.fp&&S.money>=X.p){S.money-=X.p;S.fp={k,g:0,fed:false,miss:0,ready:false};sfx('splash');openPond(`ปล่อย${X.n}ลงบ่อแล้ว อย่าลืมให้อาหารทุกวัน`);}return;}
  if(b.dataset.ffeed){const n=+b.dataset.ffeed;if(S.money>=n*FEED_PRICE){S.money-=n*FEED_PRICE;S.inv.ffeed=(S.inv.ffeed||0)+n;sfx('coin');openPond();}return;}
  if(b.dataset.furn){const k=b.dataset.furn,F=FURN[k];if(!has(k)&&S.money>=F.p&&S.mat.wood>=F.wood&&(!F.need||F.need())){S.money-=F.p;S.mat.wood-=F.wood;S.furn=S.furn||{};S.furn[k]=S.day;stat('furn');sfx('upgrade');toast(`${F.n} ส่งถึงบ้านแล้ว`);openCarpenter();}return;}
  if(b.dataset.wish){doWish(b.dataset.wish);return;}
  if(b.dataset.bus){busGo(b.dataset.bus);return;}
  if(b.dataset.hbuy){const k=b.dataset.hbuy,p=Math.round(ITEMS[k].v*1.2);if(S.money>=p){S.money-=p;S.prod[k]++;sfx('coin');openHut(`${ITEMS[k].n}ได้เลยจ้า`,1);}return;}
  if(b.dataset.hbait){const k=b.dataset.hbait,p=BAITS[k].p*5;if(S.money>=p){S.money-=p;S.inv[k]=(S.inv[k]||0)+5;if(!S.bait)S.bait=k;sfx('coin');openHut(`${BAITS[k].n} 5 ชิ้นจ้า${S.bait===k?' ป้าติดเบ็ดให้แล้ว':''}`,1);}return;}
  if(b.dataset.hrec){const k=b.dataset.hrec,p=DISHES[k].daed;if(S.money>=p&&!S.known.includes(k)){S.money-=p;S.known.push(k);sfx('upgrade');openHut(`สูตร${ITEMS[k].n}ของป้า ไปทำที่บ้านนะ อร่อยแน่นอน`,1);}return;}
  if(b.dataset.bait!==undefined){S.bait=b.dataset.bait||null;sfx('ui');toast(S.bait?`ติดเบ็ดด้วย${BAITS[S.bait].n}แล้ว`:'ถอดเหยื่อแล้ว');openBag();return;}
  if(b.dataset.mdon){const k=b.dataset.mdon;if(S.prod[k]>0&&!S.museum[k]){S.prod[k]--;S.museum[k]=1;sfx('upgrade');openMuseum(`บริจาค${ITEMS[k].n}แล้ว ขอบคุณมาก!`);}return;}
  if(b.dataset.mset){claimSet(b.dataset.mset);return;}
  if(b.dataset.museum!==undefined){sfx('ui');openMuseum();return;}
  if(b.dataset.judge!==undefined){judgeFish();return;}
  if(b.dataset.hsell){const k=b.dataset.hsell,n=b.dataset.all?S.prod[k]:1;if(S.prod[k]>=n&&n>0){const v=Math.round(unitPrice(k)*1.2)*n;S.prod[k]-=n;const qq=QK(k)?qOf(k):null;if(qq){qq[2]=Math.min(qq[2],S.prod[k]);qq[1]=Math.min(qq[1],S.prod[k]-qq[2]);}S.money+=v;earn('ขายของที่ชายหาด',v);sfx('coin');openHut(`ป้าจ่ายให้ ฿${v} จ้า`,1);}return;}
  if(b.dataset.quests!==undefined){sfx('ui');openQuests();return;}
  if(b.dataset.goals!==undefined){sfx('ui');openGoals();return;}
  if(b.dataset.evalopen!==undefined){sfx('ui');openEval();return;}
  if(b.dataset.resto!==undefined){sfx('ui');openResto();return;}
  if(b.dataset.hike!==undefined){if(S.hike!==S.day&&S.stam>=20){S.stam-=20;S.hike=S.day;S.t=Math.min(1170,S.t+120);const sp=FORAGE_SEASON[seasonIdx()],got=[];
      for(let i=0;i<2;i++){const k=sp[Math.floor(Math.random()*sp.length)];gain(k);got.push(ITEMS[k].n);}if(Math.random()<.35){gain('mush');got.push(ITEMS.mush.n);}
      addH('mint',3);xp('farm',10);sfx('catch');save();openNpc('mint',`สนุกมาก! ได้${got.join(' ')}มาด้วย ไปอีกนะ`);}return;}
  if(b.dataset.anniv){const id=S.rel.spouse,i=+b.dataset.anniv;if(id&&S.rel.annivDay!==S.day){S.rel.annivDay=S.day;S.rel.mood=Math.min(100,S.rel.mood+(i===2?10:20));addH(id,1);
      const fav=NPCS[id].likes.find(k=>k.startsWith('d_'))||NPCS[id].likes[0];gain(fav);gain(fav);S.maxStam+=5;sfx('upgrade');save();
      openNpc(id,[`ปีหน้า ปีต่อไป ก็ด้วยกันนะ · ได้รับ${ITEMS[fav].n} 2 และกำลังใจ (แรงสูงสุด +5)`,`ฟังกี่ครั้งก็ยังเขินอยู่ดี · ได้รับ${ITEMS[fav].n} 2 และกำลังใจ (แรงสูงสุด +5)`,`ไม่เป็นไรหรอก แค่วันนี้อยู่ด้วยกันก็พอ · ได้รับ${ITEMS[fav].n} 2 และแรงสูงสุด +5`][i]);}return;}
  if(b.dataset.makeup){const id=S.rel.spouse,R=S.rel;if(!id)return;const t=b.dataset.makeup;
    if(t==='sorry'&&R.sorry!==S.day){R.sorry=S.day;R.mood=Math.min(100,R.mood+15);}
    else if(t==='treat'&&R.treat!==S.day&&S.money>=250){R.treat=S.day;S.money-=250;R.mood=Math.min(100,R.mood+22);}
    else return;sfx('ui');if(!tryReconcile(id))openMakeup(id,t==='sorry'?'...รู้ตัวก็ดีแล้ว':'ขนมก็อร่อยอยู่หรอก... แต่ยังไม่หายนะ');return;}
  if(b.dataset.date){const id=b.dataset.date;if(S.inv.jas>0&&!S.rel.date){S.inv.jas--;S.rel.date=id;addH(id,1);sfx('upgrade');openNpc(id,'จริงเหรอ... ตกลง! เราคบกันนะ',2);}return;}
  if(b.dataset.propose){const id=b.dataset.propose;if(S.inv.ring>0&&S.rel.date===id){S.inv.ring--;S.rel.wedDay=S.day+3;sfx('upgrade');save();openNpc(id,'ตกลง! แต่งงานกันนะ อีก 3 วันจัดงานที่ลานหมู่บ้าน',2);}return;}
  if(b.dataset.play!==undefined){if(!S.kidPlayed){S.kidPlayed=true;sfx('catch');const sp=S.rel.spouse;addH(sp,1);openNpc(sp,`${S.rel.kid.name}หัวเราะเสียงดังเลย`);}return;}
  if(b.dataset.animal){const k=b.dataset.animal,A=ANIMALS[k];if(A.need()&&S.money>=A.p){S.money-=A.p;
      const mk=o=>Object.assign(o,{vx:0,vy:0,tm:0,bob:0,love:0});
      if(k==='hen')S.hens.push(mk({x:20.8+Math.random()*2.6,y:12.8+Math.random()*2.4,egg:false}));
      if(k==='cow')S.cows.push(mk({x:29+Math.random()*3,y:13+Math.random()*2,kind:'cow',milk:false}));
      if(k==='duck')S.ducks.push(mk({x:4,y:3,egg:false}),mk({x:5.5,y:3.6,egg:false}));
      if(k==='goat')S.cows.push(mk({x:29.5,y:14,kind:'goat',milk:false}));
      if(k==='buffalo')S.cows.push(mk({x:31,y:15,kind:'buffalo',milk:false}));
      if(k==='horse'){S.horse=true;$('rideBtn').hidden=false;}
      sfx('upgrade');openShop();toast(`ได้${A.n}แล้ว!`);}return;}
  if(b.dataset.mine){enterMine(+b.dataset.mine);return;}
  if(b.dataset.special){const k=b.dataset.special,p={jas:JAS_PRICE,ring:RING_PRICE,med:MED_PRICE,brush:BRUSH_PRICE}[k];if(S.money>=p){S.money-=p;S.inv[k]=(S.inv[k]||0)+1;stat('bought');sfx('coin');openShop();}return;}
  if(b.dataset.kid){if(b.dataset.kid==='yes'){S.rel.babyDue=S.day+(has('cradle')?4:7);closeModal();toast('ครอบครัวของเรากำลังจะมีสมาชิกใหม่ อีก 7 วัน');}else{S.rel.kidAsk=S.day+7;closeModal();}return;}
  if(b.dataset.kidname!==undefined){const v=(panel.querySelector('#kidName')||{}).value;S.rel.kid={name:(v||'น้องข้าวหอม').trim().slice(0,20)||'น้องข้าวหอม',born:S.day};S.rel.babyDue=null;sfx('upgrade');save();closeModal();toast(`ยินดีต้อนรับ${S.rel.kid.name}!`);return;}
  if(b.dataset.skills!==undefined){sfx('ui');openSkills();return;}
  if(b.dataset.craft){const k=b.dataset.craft,R=SPRK[k];if(Object.keys(R.need).every(m=>haveMat(m)>=R.need[m])){for(const m in R.need)useMat(m,R.need[m]);S.decoInv[k]=(S.decoInv[k]||0)+1;sfx('upgrade');openCarpenter();toast(`ประกอบ${R.n}แล้ว! วางบนแปลงดินจากกระเป๋า`);}return;}
  if(b.dataset.folks!==undefined){sfx('ui');openFolkList();return;}
  if(b.dataset.sleep!==undefined){closeModal();sleep(false);return;}
  if(b.dataset.cook){const id=b.dataset.cook,D=DISHES[id];if(S.built.kitchen&&hasAll(D.in)){for(const k in D.in)S.prod[k]-=D.in[k];gain(id);stat('cook');sfx('catch');const dbl=has('fridge')&&Math.random()<.25;if(dbl)gain(id);openHouse(`ทำ${ITEMS[id].n}เสร็จแล้ว!${dbl?' วัตถุดิบในตู้เย็นยังสด ได้ 2 จาน':''}`);}}
  if(b.dataset.eat){const k=b.dataset.eat;if(S.prod[k]>0){startAct('eat',null,{dur:1.3});S.prod[k]--;const e=Math.round(ITEMS[k].e*(has('table')?1.25:1));S.stam=Math.min(S.maxStam,S.stam+e);sfx('harvest');toast(`อร่อย! แรง +${e}`);openEat();}}
  if(b.dataset.proc){const [id,i]=b.dataset.proc.split(':'),r=MACHINES[id].recipes[+i];
    if(!S.mach[id]&&hasAll(r.in)){for(const k in r.in)S.prod[k]-=r.in[k];S.mach[id]={out:r.out,n:1,days:r.days,ready:false};stat('proc');sfx('plant');closeModal();toast(`เริ่มทำ${ITEMS[r.out].n} เสร็จใน ${r.days} วัน`);}}
  if(b.dataset.stall){const k=b.dataset.stall.split(':')[0];const n=S.prod[k];
    if(marketOpen()&&n>0&&S.stall.items.length<6){S.prod[k]=0;delete S.qs[k];S.stall.items.push({k,n});sfx('ui');openStall();}}
  if(b.dataset.unstall){const it=S.stall.items[+b.dataset.unstall];if(it){S.prod[it.k]+=it.n;S.stall.items.splice(+b.dataset.unstall,1);sfx('ui');openStall();}}
  if(b.dataset.donate){const [pid,k]=b.dataset.donate.split(':');donate(pid,k);}
  if(b.dataset.claim){const c=COL_CATS.find(c=>c.id===b.dataset.claim);if(c&&!S.colClaim[c.id]&&c.keys.every(k=>S.col[k]>0)){S.colClaim[c.id]=true;S.money+=c.reward;earn('รางวัลสมุดสะสม',c.reward);sfx('upgrade');openBook();toast(`สะสม${c.n}ครบ! ได้รางวัล ฿${c.reward}`);}}
  if(b.dataset.buyland!==undefined){if(!S.land&&S.money>=LAND_PRICE){S.money-=LAND_PRICE;S.land=true;applyUnlocks();sfx('upgrade');closeModal();toast('ซื้อที่ดินแล้ว! ถางหญ้า ทุบหิน ผ่าตอไม้ก่อนไถ');}}
  if(b.dataset.up){const t=b.dataset.up,lv=S.tools[t];const cost=TOOLS[t].cost[lv+1],ore=ORES_FOR[lv+1];if(S.prod[ore.k]<ore.n){toast(`ต้องมี${ITEMS[ore.k].n} ${ore.n} ก้อน หาได้ในเหมือง`);return;}S.prod[ore.k]-=ore.n;
    if(lv<2&&S.money>=cost){S.money-=cost;S.tools[t]++;sfx('upgrade');openShop();toast(`ได้${TOOLS[t].n[S.tools[t]]}แล้ว! ${toolDesc(t,S.tools[t])}`);}}
  if(b.dataset.npc){sfx('talk');openNpc(b.dataset.npc);}
  if(b.dataset.shop!==undefined){sfx('ui');openShop();}
  if(b.dataset.carp!==undefined){sfx('ui');openCarpenter();}
  if(b.dataset.deliver){const id=b.dataset.deliver,n=S.npc[id],r=n.req;
    if(r&&!r.done&&S.prod[r.k]>=r.q){S.prod[r.k]-=r.q;S.money+=r.r;earn('คำขอชาวบ้าน',r.r);r.done=true;addH(id,2);stat('req');sfx('coin');
      openNpc(id,`ขอบใจมากนะ! นี่ค่าตอบแทน ฿${r.r}`);}}
  if(b.dataset.gift){const [id,k]=b.dataset.gift.split(':'),n=S.npc[id];
    if(!n.gifted&&S.prod[k]>0){S.prod[k]--;n.gifted=true;stat('gift');const love=NPCS[id].likes.includes(k),hate=(NPCS[id].hates||[]).includes(k);
      addH(id,hate?-1:isBday(id)?(love?5:3):(love?3:1));sfx(love?'catch':'plant');
      if(S.rel.spouse===id){S.rel.mood=Math.min(100,S.rel.mood+(hate?0:love?30:8));if(tryReconcile(id))return;if(S.rel.fight){openMakeup(id,love?'...ของที่ชอบนี่นา':'ก็ขอบใจนะ');return;}}
      openNpc(id,hate?(id==='mint'?`อืม... ${ITEMS[k].n}ของแพงไป ฉันชอบของจากป่ามากกว่า`:`${ITEMS[k].n}... ไม่ค่อยชอบเท่าไหร่นะ`):love?`ว้าว ${ITEMS[k].n}! ชอบที่สุดเลย`:`ขอบคุณสำหรับ${ITEMS[k].n}นะ`,hate?0:love?(NPCS[id].cand&&n.h>=6?2:1):0);}}
  if(b.dataset.music!==undefined){audioInit();setMusic(!AU.music);b.textContent='เพลง: '+(AU.music?'เปิด':'ปิด');}
  if(b.dataset.sfx!==undefined){setSfx(!AU.sfx);b.textContent='เสียงเอฟเฟกต์: '+(AU.sfx?'เปิด':'ปิด');sfx('ui');}
  if(b.dataset.fs!==undefined){const el=document.documentElement;
    const p=el.requestFullscreen?el.requestFullscreen():null;
    if(p&&p.then)p.then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape')).catch(()=>{});
    else toast('อุปกรณ์นี้ไม่รองรับเต็มจอ ลองเพิ่มลงหน้าจอโฮม');}
  if(b.dataset.reset!==undefined){
    if(b.dataset.armed){try{localStorage.removeItem(SAVE);}catch(_){}S=freshState();scene='farm';mine=null;migrate();applyCands();applyUnlocks();resetFolks();save();cloudPush(true);endFish();rocket=null;meterHide();krathongs.length=0;renderSeeds();closeModal();toast('เริ่มไร่ใหม่แล้ว');}
    else{b.dataset.armed='1';b.textContent='แตะอีกครั้งเพื่อยืนยัน';}
  }
});
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});

function pendingEvent(id){
  const E=EVENTS[id];if(!E)return null;S.ev[id]=S.ev[id]||[];
  for(const thr of Object.keys(E).map(Number).sort((a,b)=>a-b))if(S.npc[id].h>=thr&&!S.ev[id].includes(thr)&&!(E[thr].love&&!NPCS[id].cand))return thr;return null;
}
function openEvent(id,thr){
  const e=EVENTS[id][thr];sfx('upgrade');
  showModal(`<div class="npcHead"><h2>${e.t}</h2><small>${NPCS[id].n} · ฉากพิเศษ ${thr} หัวใจ</small></div>
    <div class="talk">${face(id,e.love||thr>=9?2:1)}<div>${e.l.map(x=>`<p>${x}</p>`).join('')}</div></div>
    <div class="row" style="flex-direction:column;align-items:stretch">${e.c.map((c,i)=>`<button class="btn ${i?'ghost':''}" data-ev="${id}:${thr}:${i}">${c[0]}</button>`).join('')}</div>`);
}
function eventChoice(id,thr,i){
  const e=EVENTS[id][thr],c=e.c[i];S.ev[id]=S.ev[id]||[];S.ev[id].push(thr);if(c[2])addH(id,c[2]);
  if(e.perk==='rod')S.perks.rod=true;
  if(e.perk==='carp')S.perks.carp=true;
  if(e.perk==='cloth'){S.perks.cloth=true;S.maxStam+=10;}
  if(e.perk==='seeds'){const k=Object.keys(CROPS).find(inSeason);S.seeds[k]+=10;renderSeeds();}
  save();openNpc(id,c[1]);
}
const YEAR=SEASON_LEN*3;
const isAnniv=(d=S.day)=>!!S.rel.married&&d>S.rel.married&&(d-S.rel.married)%YEAR===0;
const moodTxt=m=>m>=85?'มีความสุขมาก':m>=60?'อารมณ์ดี':m>=40?'เหงานิดๆ':'งอนอยู่';
const kidAge=()=>S.rel.kid?S.day-S.rel.kid.born:0;
const kidStage=a=>a<14?'ทารก':a<42?'วัยเตาะแตะ':a<84?'วัยเรียน':'วัยรุ่น';
const KID_TRAIT={
  fon:{n:'ชอบทำขนมเหมือนแม่',f:()=>{gain('d_sangkaya');return'ทำสังขยามาให้ 1 ถ้วย';}},
  nun:{n:'ช่างสงสัย ชอบอ่านหนังสือ',f:()=>{xp('farm',30);return'อ่านหนังสือปลูกผักให้ฟัง (ทักษะทำไร่ +30)';}},
  mint:{n:'รักธรรมชาติเหมือนแม่',f:()=>{const k=FORAGE_SEASON[seasonIdx()][0];gain(k);gain(k);return`เก็บ${ITEMS[k].n}จากทุ่งมาให้ 2 อัน`;}},
  ja:{n:'หัวการค้าเหมือนแม่',f:()=>{const m=100+Math.floor(Math.random()*15)*10;S.money+=m;earn('ลูกช่วยขายของ',m);return`ช่วยขายของหน้าร้านได้ ฿${m}`;}},
  ton:{n:'ใจดี ชอบดูแลคนอื่น',f:()=>{S.cows.forEach(c=>c.love=Math.min(10,(c.love||0)+.5));return'ช่วยแปรงขนวัวให้ วัวสนิทขึ้น';}},
  phum:{n:'ชอบร้องเพลงเหมือนพ่อ',f:()=>{S.hens.forEach(h=>h.love=Math.min(10,(h.love||0)+.5));return'ร้องเพลงให้ไก่ฟัง ไก่อารมณ์ดีขึ้น';}}
};
const kidTrait=()=>KID_TRAIT[S.rel.spouse]||KID_TRAIT.fon;
const EVAL_REWARD=[null,{t:'เงิน ฿1,000',f:()=>{S.money+=1000;earn('รางวัลจากคุณตา',1000);}},
  {t:'สปริงเกอร์ทอง 2 อัน',f:()=>{S.decoInv.spr3=(S.decoInv.spr3||0)+2;}},
  {t:'แรงสูงสุด +20 และเงิน ฿3,000',f:()=>{S.maxStam+=20;S.money+=3000;earn('รางวัลจากคุณตา',3000);}},
  {t:'ฉายา “ไร่สุขใจระดับตำนาน” และเงิน ฿10,000',f:()=>{S.money+=10000;earn('รางวัลจากคุณตา',10000);S.flags.legend=1;}}];
function evalScore(){
  const lv=(v,ts)=>ts.filter(t=>v>=t).length,rows=[];
  const e=S.stats.earned||0;rows.push(['รายได้ทั้งหมด',`฿${Math.round(e).toLocaleString('en-US')}`,lv(e,[15000,50000,100000,200000]),4]);
  const keys=COL_CATS.flatMap(c=>c.keys),got=keys.filter(k=>S.col[k]>0).length;rows.push(['สมุดสะสม',`${got}/${keys.length} อย่าง`,lv(got/keys.length,[.3,.6,.9]),3]);
  const ids=Object.keys(NPCS).filter(here),fr=ids.filter(id=>S.npc[id].h>=6).length;rows.push(['เพื่อนสนิท (6 หัวใจขึ้นไป)',`${fr}/${ids.length} คน`,lv(fr,[3,6,ids.length]),3]);
  rows.push(['ครอบครัว',S.rel.spouse?(S.rel.kid?'แต่งงานแล้ว มีลูก':'แต่งงานแล้ว'):'ยังโสด',(S.rel.spouse?1:0)+(S.rel.kid?1:0),2]);
  const an=[...S.hens,...S.cows,...S.ducks],avg=an.length?an.reduce((a,x)=>a+(x.love||0),0)/an.length:0;rows.push(['ความสุขของสัตว์',`ความสนิทเฉลี่ย ${avg.toFixed(1)}/10`,lv(avg,[5,8]),2]);
  const pj=Object.keys(PROJECTS).filter(p=>S.proj[p].done).length;rows.push(['พัฒนาหมู่บ้าน',`${pj}/${Object.keys(PROJECTS).length} โครงการ`,pj,3]);
  rows.push(['สูตรแกงคุณตา',S.story.i>=STORY.length?'ทำสำเร็จแล้ว':'ยังไม่สำเร็จ',S.story.i>=STORY.length?1:0,1]);
  const sk=Object.keys(SKILLS).reduce((a,k)=>a+lvl(k),0);rows.push(['ทักษะรวม',`เลเวล ${sk}`,lv(sk,[12,24]),2]);
  const pts=rows.reduce((a,r)=>a+r[2],0),stars=lv(pts,[4,8,13,17]);return{rows,pts,stars};}
function openEval(){const R=evalScore(),yr=Math.floor((S.day-1)/YEAR),prev=S.evalBest||0;
  const gained=[];for(let i=prev+1;i<=R.stars;i++){EVAL_REWARD[i].f();gained.push(EVAL_REWARD[i].t);}
  S.evalBest=Math.max(prev,R.stars);S.evalDue=false;S.evalYear=yr;sfx(R.stars>=3?'upgrade':'catch');save();
  const msg=['ตายังเห็นว่าหลานเพิ่งเริ่มต้น ค่อยๆ ไปนะ','ไร่เริ่มมีชีวิตแล้ว ตาดีใจ','หลานทำให้ไร่สุขใจกลับมาสดใสเหมือนสมัยก่อน','ไร่ของหลานดีกว่าที่ตาเคยฝันไว้ ตาภูมิใจที่สุด','ไร่สุขใจระดับตำนาน! ทั้งหมู่บ้านรักหลาน ตาไม่มีอะไรต้องห่วงแล้ว'][R.stars];
  showModal(`<div class="npcHead"><h2>จดหมายของคุณตา</h2><small>ครบ ${yr} ปีที่ไร่สุขใจ</small></div>
    <div class="talk">${face('sai',1)}<div><p>ยายสายยื่นซองสีน้ำตาลให้ “หลาน${pn()} ตาของหลานฝากไว้ บอกให้เปิดเมื่อทำไร่ครบปี”</p><p class="quote">“${msg}”</p></div></div>
    <div class="evalStars" aria-label="${R.stars} จาก 4 ดาว">${'★'.repeat(R.stars)}<span>${'★'.repeat(4-R.stars)}</span></div>
    ${R.rows.map(r=>`<div class="need"><span><b>${r[0]}</b> · ${r[1]}</span><span style="flex:none;white-space:nowrap;letter-spacing:2px">${'●'.repeat(r[2])}<span style="opacity:.3">${'●'.repeat(r[3]-r[2])}</span></span></div>`).join('')}
    <div class="lv">คะแนน ${R.pts}/20 · 4 / 8 / 13 / 17 คะแนน = 1 / 2 / 3 / 4 ดาว</div>
    ${gained.length?`<div class="req"><b>ของขวัญจากคุณตา</b><br>${gained.join('<br>')}</div>`:`<div class="lv">ได้ของขวัญของ ${prev} ดาวไปแล้ว ทำดาวเพิ่มปีหน้าจะได้ของขวัญใหม่</div>`}
    <div class="row"><button class="btn" data-close>เก็บจดหมายไว้</button></div>`);}
const nextEvalIn=()=>YEAR-((S.day-1)%YEAR);
const DATE_SPOTS={
  pond:{n:'ดูพระอาทิตย์ตกริมบ่อ',txt:'นั่งห้อยขาริมบ่อ ดูแสงสีส้มสะท้อนน้ำจนฟ้ามืด'},
  garden:{n:'เดินสวนดอกไม้ยายสาย',txt:'เดินชมดอกไม้ ยายสายแอบตัดดอกมะลิให้คนละดอก'},
  temple:{n:'ไหว้พระที่วัด',txt:'จุดธูปไหว้พระ แล้วนั่งฟังเสียงระฆังเงียบๆ'},
  meadow:{n:'ปิกนิกทุ่งริมลำธาร',txt:'ปูเสื่อริมลำธาร นั่งกินขนมฟังเสียงน้ำไหล',ok:()=>S.proj.bridge.done,why:'ต้องซ่อมสะพานก่อน'},
  resto:{n:'กินข้าวร้านจ๋า (฿200)',txt:'สั่งแกงร้อนๆ มาแบ่งกัน คุยกันจนร้านเกือบปิด',ok:()=>!!(S.town&&S.town.ja)&&S.money>=200,why:'ร้านจ๋ายังไม่เปิด หรือเงินไม่พอ',cost:200},
  beach:{n:'เที่ยวทะเลด้วยกัน (฿100)',txt:'นั่งรถสองแถวไปทะเล เดินเท้าเปล่าริมหาด เก็บเปลือกหอยคนละอัน นั่งดูพระอาทิตย์ตกบนท่าเรือ',ok:()=>busOpen()&&S.t<=900&&S.money>=100,why:'ต้องไปก่อน 15:00 และมีเงิน ฿100',cost:100,hrs:4,bonus:1,bg:'beach',gift:'shell'},
  falls:{n:'เที่ยวน้ำตกด้วยกัน (฿100)',txt:'นั่งรถขึ้นเขา เดินลัดป่าไปเล่นน้ำตก ห่อข้าวไปกินบนลานหินข้างแอ่งน้ำ',ok:()=>busOpen()&&S.t<=900&&S.money>=100,why:'ต้องไปก่อน 15:00 และมีเงิน ฿100',cost:100,hrs:4,bonus:1,bg:'falls',gift:'orchid'},
  market:{n:'เดินตลาดนัด',txt:'เดินชิมของกินทีละร้าน ซื้อพวงกุญแจคู่กันมาหนึ่งอัน',ok:()=>weekday()===5,why:'ตลาดนัดมีเฉพาะวันเสาร์'}};
const DATE_TASTE={fon:{love:['garden','market','beach'],meh:['temple']},nun:{love:['temple','meadow','falls'],meh:['market']},mint:{love:['meadow','pond','falls'],meh:['resto']},ja:{love:['market','resto','beach'],meh:['garden']},
  ton:{love:['pond','temple','falls'],meh:['market']},phum:{love:['pond','market','beach'],meh:['temple']}};
const DATE_REACT={love:['“ที่นี่คือที่ที่ชอบที่สุดเลย! รู้ได้ไงเนี่ย”','“วันนี้เป็นวันที่ดีที่สุดของเดือนเลย”'],ok:['“สนุกดีนะ ไว้มาอีก”','“ขอบคุณที่ชวนนะ”'],meh:['“ก็ดีนะ... แต่ไม่ค่อยใช่แนวเท่าไหร่”','“เงียบไปหน่อยนะที่นี่”']};
const canDate=id=>NPCS[id].cand&&S.npc[id].h>=4&&(!S.dates||S.dates[id]===undefined||S.day-S.dates[id]>=3)&&S.t<1080&&!festActive()&&S.stam>=10;
function openDate(id){const d=NPCS[id];
  showModal(`<div class="npcHead"><h2>ชวน${d.n}ไปเที่ยว</h2><small>ใช้แรง 10 · 2 ชั่วโมง · ชวนได้ทุก 3 วัน</small></div>
    <div class="talk">${face(id,1)}<p class="quote">“ไปไหนดีล่ะ”</p></div>
    ${Object.keys(DATE_SPOTS).map(k=>{const P=DATE_SPOTS[k],ok=!P.ok||P.ok();return`<div class="need"><span><b>${P.n}</b>${ok?'':`<br><small>${P.why}</small>`}</span><button class="btn" data-dgo="${id}:${k}" ${ok?'':'disabled'}>ไปกัน</button></div>`;}).join('')}
    <div class="lv">แต่ละคนชอบที่เที่ยวไม่เหมือนกัน ลองสังเกตดู</div>
    <div class="row"><button class="btn ghost" data-npc="${id}">กลับ</button></div>`);}
function goDate(id,k){const P=DATE_SPOTS[k],T=DATE_TASTE[id]||{love:[],meh:[]},d=NPCS[id];if(!canDate(id)||(P.ok&&!P.ok()))return;
  const kind=T.love.includes(k)?'love':T.meh.includes(k)?'meh':'ok',gainH={love:3,ok:2,meh:1}[kind]+(P.bonus||0);
  S.stam-=10;S.t=Math.min(1170,S.t+(P.hrs||2)*60);if(P.cost){S.money-=P.cost;}if(P.gift)gain(P.gift);S.dates=S.dates||{};S.dates[id]=S.day;addH(id,gainH);stat('date');
  if(S.rel.spouse===id)S.rel.mood=Math.min(100,S.rel.mood+(kind==='love'?25:12));
  sfx(kind==='love'?'upgrade':'catch');save();
  showModal(`<div class="npcHead"><h2>${P.n.replace(/ \(.*\)/,'')}</h2><small>กับ${d.n}</small></div>${P.bg&&typeof BGSRC!=='undefined'?`<div class="dateBg" style="background-image:url('${BGSRC[P.bg]}')"></div>`:''}
    <div class="talk">${face(id,kind==='love'?2:kind==='ok'?1:0)}<div><p>${P.txt}</p><p class="quote">${DATE_REACT[kind][S.day%2]}</p></div></div>
    <div class="lv">หัวใจ +${gainH}${P.gift?` · ได้${ITEMS[P.gift].n}เป็นที่ระลึก`:''}</div><div class="row"><button class="btn" data-close>กลับบ้าน</button></div>`);}
function openAnniv(id){const d=NPCS[id],yr=(S.day-S.rel.married)/YEAR;sfx('upgrade');
  showModal(`<div class="npcHead"><h2>ครบรอบแต่งงาน ${yr} ปี</h2><small>${d.n} · ฉากพิเศษ</small></div>
    <div class="talk">${face(id,2)}<div><p>${d.n}จัดโต๊ะอาหารเล็กๆ ไว้หน้าบ้าน มีดอกมะลิลอยในขันน้ำ</p><p>“จำได้ไหม วันแรกที่เราเจอกัน... ขอบคุณที่อยู่ด้วยกันมาตลอดนะ”</p></div></div>
    <div class="row" style="flex-direction:column;align-items:stretch">
      <button class="btn" data-anniv="0">จับมือ “ปีหน้าก็จะอยู่ข้างกันแบบนี้”</button>
      <button class="btn ghost" data-anniv="1">เล่าเรื่องวันแต่งงานให้ฟังอีกรอบ</button>
      <button class="btn ghost" data-anniv="2">“ขอโทษนะที่ช่วงนี้งานเยอะ”</button></div>`);}
function openMakeup(id,msg){const d=NPCS[id],n=S.npc[id],R=S.rel;
  const likes=d.likes.filter(k=>S.prod[k]>0);
  showModal(`<div class="npcHead"><h2>${d.n}</h2><small>กำลังงอน · ${moodTxt(R.mood)}</small></div>
    <div class="talk">${face(id,0)}<p class="quote">“${msg||['ไม่ต้องมาคุยเลย...','ช่วงนี้ไม่ค่อยสนใจกันเลยนะ','ฉันรอคุยทั้งวันเลยรู้ไหม'][S.day%3]}”</p></div>
    <div class="meter"><i style="width:${Math.round(R.mood)}%"></i></div><div class="lv">คืนดีกันเมื่อความรู้สึกถึงครึ่งหลอด</div>
    <div class="row" style="flex-direction:column;align-items:stretch">
      <button class="btn" data-makeup="sorry" ${R.sorry===S.day?'disabled':''}>ขอโทษจริงๆ นะ${R.sorry===S.day?' (ขอโทษไปแล้ววันนี้)':''}</button>
      <button class="btn ghost" data-makeup="treat" ${S.money<250||R.treat===S.day?'disabled':''}>ซื้อขนมมาง้อ ฿250</button></div>
    ${!n.gifted&&likes.length?`<div class="sub">ให้ของที่${d.n}ชอบ</div><div class="giftRow">${likes.map(k=>`<button class="btn ghost" data-gift="${id}:${k}">${ic(k,18)}${ITEMS[k].n}</button>`).join('')}</div>`:''}
    <div class="row"><button class="btn ghost" data-close>ไว้ค่อยคุยกัน</button></div>`);}
function tryReconcile(id){const R=S.rel;if(R.fight&&R.mood>=50){R.fight=false;R.mood=Math.max(R.mood,80);addH(id,1);sfx('upgrade');save();
    openNpc(id,'...ก็ได้ หายงอนแล้ว แต่สัญญานะว่าจะคุยกันทุกวัน');return true;}return false;}
function face(id,e){const k=`pt_${id}_${e||0}`;
  if(sprOk(k))return`<span class="pt" aria-hidden="true" style="${sprBg(k,76,76)}"></span>`;
  const c=`c_${id}_down`;if(sprOk(c))return`<span class="pt crop" aria-hidden="true" style="${sprBg(c,76,76,{w:1.45,fy:.03})}"></span>`;return'';}
// ---------- villager dialogue: tier / season / weather / time / village news ----------
const TALK={
  mee:{t:[["ลุงนั่งตกปลาตรงนี้มาตั้งแต่ตาเอ็งยังหนุ่ม","เบ็ดดีไม่สำคัญเท่าใจเย็นหรอก","ตอนเช้าตรู่ปลานิลกินเบ็ดดีที่สุด","ถ้าเหนื่อยก็มานั่งริมบ่อกับลุง ลมเย็นดี"],
      ["{n} ตกปลาเป็นแล้วยัง ลุงสอนให้ได้นะ","ปลาช่อนชอบออกตอนฝนตก จำไว้","ตาเอ็งเคยตกปลาบึกได้ตัวเท่าแขนลุงเลย","เมื่อวานลุงได้ปลาดุกตัวโต เอาไปแกงกับยายสาย","ลำธารฝั่งโน้นมีปลาตะเพียนเยอะ ลองไปดูสิ","ทำไร่ก็เหมือนตกปลา ต้องรอเป็น"],
      ["ลุงไม่มีลูกหลาน เห็นเอ็งขยันแบบนี้ลุงก็ชื่นใจ","{farm}กลับมาเขียวเหมือนสมัยตาเอ็งแล้วนะ","วันไหนลุงไม่อยู่ ฝากดูบ่อนี้ด้วยนะ","เอ็งเป็นคนแรกที่ลุงยอมบอกจุดปลาชุมให้","อยู่ที่นี่นานๆ นะ หมู่บ้านคึกคักขึ้นเยอะเพราะเอ็ง","ลุงเก็บเบ็ดคันเก่าของตาเอ็งไว้ วันหนึ่งจะให้"]],
    s:[["แดดแรงแบบนี้ปลาลงลึก ต้องรอเย็นๆ","หน้าร้อนน้ำในบ่อลดเยอะเลย","สงกรานต์ปีนี้ลุงจะไปเล่นน้ำด้วย"],["หน้าฝนปลาชุมที่สุดในปี","ระวังลื่นริมบ่อนะ ดินเปียก","ฝนแบบนี้กุ้งในลำธารตัวโต"],["หน้าหนาวลมแรง ปลากินเบ็ดช้าหน่อย","เช้าๆ หมอกลงทั้งบ่อ สวยดีนะ","อากาศเย็นแบบนี้ต้มยำปลาช่อนเข้ากันที่สุด"]],
    rain:["ฝนตกก็ยังตกปลาได้ ลุงชินแล้ว","ฝนตกแบบนี้ไม่ต้องรดน้ำผัก สบายเอ็งเลย"],night:["ดึกแล้ว ลุงกำลังจะกลับบ้าน","กลางคืนปลาดุกออกหากิน ลองดูสิ"],morn:["ตื่นเช้าดีนะ ปลากำลังหิวเลย"]},
  fon:{t:[["ขนมชั้นที่ร้านทำสดทุกเช้าค่ะ","ไร่ของคุณตาเคยมีแตงโมหวานที่สุดในหมู่บ้านเลย","ถ้ามีไข่ไก่เหลือ ฉันเอาไปทำขนมได้นะคะ","ยินดีที่ได้รู้จักนะคะ เรียกฉันว่าฝนก็ได้"],
      ["{n} ชอบขนมแบบไหนคะ หวานน้อยหรือหวานมาก","วันนี้ทำทองหยิบไม่สวยเลย มือสั่นนิดหน่อย","สตรอว์เบอร์รีหน้าหนาวเอามาทำนมสดอร่อยมากเลยค่ะ","ฉันฝันอยากเปิดร้านขนมในเมืองสักวัน","ป้าแดงชอบมาชิมขนมฟรีทุกเช้าเลย ฮ่าๆ","ถ้าเหนื่อยแวะมากินขนมได้นะคะ"],
      ["ทุกครั้งที่ทำขนมเผื่อ ฉันนึกถึง{n}ก่อนเลย","อยู่ใกล้{n}แล้วสบายใจจัง","ฉันคิดสูตรขนมใหม่ ตั้งชื่อว่า{farm}ด้วยนะ","ขอบคุณที่ชอบขนมของฉันจริงๆ นะคะ","วันไหนว่างไปเดินตลาดด้วยกันไหมคะ","ฉันว่าหมู่บ้านนี้น่าอยู่ขึ้นตั้งแต่{n}มา"]],
    s:[["แดดแรงแบบนี้ต้องแตงโมปั่นค่ะ","มะม่วงหน้าร้อนหวานที่สุด","ทำขนมตอนหน้าร้อน ร้อนมือมากเลย"],["หน้าฝนแป้งขึ้นรายากหน่อยค่ะ","ฝนตกแบบนี้ขายขนมได้น้อยลง","ฟังเสียงฝนแล้วอยากกินขนมถ้วยอุ่นๆ"],["หน้าหนาวฉันชอบทำสังขยาฟักทอง","อากาศเย็นขนมเก็บได้นานขึ้นค่ะ","ลมหนาวมาแล้ว ใส่เสื้อหนาๆ นะคะ"]],
    rain:["ฝนตกแต่ใจฉันยังสดใสค่ะ","อย่าลืมกางร่มนะคะ"],night:["ดึกแล้ว ฉันต้องตื่นตีสี่มานึ่งขนม","ฝันดีนะคะ"],morn:["อรุณสวัสดิ์ค่ะ เพิ่งนึ่งขนมเสร็จพอดี"]},
  daeng:{t:[["มาซื้อเมล็ดเหรอจ๊ะ วันนี้ของใหม่เพิ่งมา","ผักแต่ละอย่างชอบฤดูไม่เหมือนกันนะ ดูดีๆ ก่อนซื้อ","ตาเธอเคยซื้อเมล็ดกับป้าทุกอาทิตย์เลย","ร้านป้าเปิดตั้งแต่เช้ายันเย็นนะจ๊ะ"],
      ["{n}ขยันจริงนะ ป้าเห็นไฟเปิดตั้งแต่ตีห้า","ได้ข่าวว่าช่างเอกแอบชอบใครบางคนอยู่นะ อย่าบอกใครล่ะ","ใส่ปุ๋ยแล้วผักจะออกดาว ขายได้ราคาดีขึ้น","ป้าเก็บเมล็ดคัดพิเศษไว้ให้ลูกค้าประจำนะ","ฝนกับมิ้นท์สนิทกันมากเลยนะ ป้าเห็นเดินด้วยกันบ่อย","ป้าชอบดอกมะลิ หอมทั้งร้านเลย"],
      ["ป้ารักเธอเหมือนลูกหลานคนหนึ่งเลยนะ","เห็น{farm}งามขึ้นทุกวัน ป้าก็ภูมิใจไปด้วย","ขาดเหลืออะไรมาบอกป้า ไม่ต้องเกรงใจ","ตาเธอคงยิ้มอยู่บนฟ้าแน่ๆ","วันนี้กินข้าวหรือยัง อย่าทำงานจนลืมกินนะ","มีอะไรอยากเล่าให้ป้าฟังก็มาได้ตลอดนะจ๊ะ"]],
    s:[["หน้าร้อนแตงโมขายดีที่สุดจ้ะ","แดดแรงรดน้ำเช้าๆ นะ ผักจะได้ไม่เฉา","ข้าวโพดหน้าร้อนก็ปลูกได้นะจ๊ะ"],["หน้าฝนข้าวหอมมะลิงามที่สุดจ้ะ","ฝนตกบ่อยไม่ต้องรดน้ำ ประหยัดแรงดี","ฟักทองชอบหน้าฝนนะจ๊ะ"],["หน้าหนาวลองปลูกสตรอว์เบอร์รีสิ ขายดีมาก","กะหล่ำปลีหน้าหนาวหวานกรอบ","ผักนอกฤดูจะเหี่ยวนะ ระวังด้วย"]],
    rain:["ฝนตกแบบนี้ลูกค้าน้อย ป้าเลยนั่งคัดเมล็ด","เข้ามาหลบฝนในร้านก่อนสิจ๊ะ"],night:["ป้าจะปิดร้านแล้วจ้ะ พรุ่งนี้มาใหม่นะ","ดึกแล้วรีบกลับบ้านนะจ๊ะ"],morn:["เช้านี้อากาศดีนะจ๊ะ"]},
  ek:{t:[["ไม้สักดีๆ หายากขึ้นทุกปี","บ้านตาเธอ ช่างเป็นคนซ่อมหลังคาให้เมื่อหลายปีก่อน","จะสร้างอะไรต้องมีไม้กับหินนะ ช่างเสกไม่ได้","เสียงค้อนนี่แหละเพลงโปรดของช่าง"],
      ["{n}ผ่าไม้เก่งขึ้นแล้วนี่ ดูจากกองไม้หน้าไร่","อยากให้หมู่บ้านมีสะพานดีๆ สักอัน ช่างรอจังหวะอยู่","โรงเรือนกระจกสร้างยากแต่คุ้มนะ ปลูกได้ทุกฤดู","ช่างชอบกาแฟดำ ไม่ใส่น้ำตาล","หินจากเหมืองแข็งดี เอามาทำฐานบ้านได้","บางวันช่างหยุดไปหาไม้ในป่า"],
      ["ช่างไม่ค่อยพูด แต่ดีใจนะที่มีเธอเป็นเพื่อน","ไร่ของเธอเป็นงานที่ช่างภูมิใจที่สุดแล้ว","ถ้าวันไหนบ้านเธอมีอะไรพัง เรียกช่างได้ทันที","ช่างเก็บไม้สักแผ่นสวยไว้ เผื่อเธออยากได้อะไรพิเศษ","เธอทำให้ช่างอยากสร้างของสวยๆ อีกครั้ง","ขอบใจที่เชื่อฝีมือช่างนะ"]],
    s:[["แดดแรงๆ ไม้แห้งเร็ว ทำงานได้ไว","หน้าร้อนปลวกเยอะ ระวังกองไม้ด้วย","ร้อนแบบนี้ช่างทำงานแต่เช้า"],["หน้าฝนไม้ชื้น ต้องตากให้แห้งก่อน","หลังคาบ้านเธอรั่วไหม มีอะไรบอกนะ","ฝนตกบ่อย พายุอาจพัดกิ่งไม้มาที่ไร่"],["หน้าหนาวเหมาะสร้างบ้านที่สุด ไม่ร้อนไม่เปียก","ลมหนาวแห้ง ไม้ไม่บิด","ช่างกำลังทำของขวัญปีใหม่ให้หลานยายสาย"]],
    rain:["ฝนตกแบบนี้ทำงานกลางแจ้งไม่ได้ เลยมาขัดไม้","อย่าลืมคลุมกองไม้ด้วยนะ"],night:["ช่างเก็บเครื่องมือแล้ว พรุ่งนี้ค่อยว่ากัน","ดึกแล้ว รีบกลับไปพักเถอะ"],morn:["เช้าแล้ว งานรออยู่เพียบ"]},
  nun:{t:[["สวัสดีค่ะ ฉันสอนเด็กๆ ทุกชั้นในโรงเรียนเล็กๆ นี่","เด็กๆ อยากไปทัศนศึกษาที่ไร่ของคุณสักวัน","การปลูกผักเป็นบทเรียนที่ดีที่สุดเลยค่ะ","ห้องสมุดโรงเรียนมีหนังสือเกษตรเยอะ ยืมได้นะคะ"],
      ["{n}เคยสอนหนังสือไหมคะ ดูเป็นคนอธิบายเก่ง","เด็กๆ วาดรูปไก่ในไร่ของคุณมาส่งการบ้านด้วย","ครูชอบอ่านหนังสือใต้ต้นไม้ตอนเย็นๆ","ภูมิเล่นพิณให้เด็กๆ ฟังทุกวันศุกร์ค่ะ","การบ้านของเด็กเยอะกว่าของครูอีก ฮ่าๆ","เมื่อวานนักเรียนถามว่าทำไมฟ้าสีฟ้า ฉันตอบไม่ทันเลย"],
      ["อยู่กับ{n}แล้วไม่ต้องเป็นครูก็ได้ สบายใจดี","ฉันเขียนบันทึกทุกวัน ช่วงนี้มีชื่อ{n}บ่อยเลยค่ะ","ขอบคุณที่ฟังเรื่องเด็กๆ ของฉันทุกวันนะคะ","ถ้าวันหนึ่งมีลูก อยากให้เขาโตที่หมู่บ้านนี้","{farm}เป็นห้องเรียนที่สวยที่สุดในหมู่บ้านเลย","วันหยุดไปวัดด้วยกันไหมคะ"]],
    s:[["ปิดเทอมหน้าร้อน เด็กๆ ไปช่วยพ่อแม่ทำไร่","แดดแรง ครูให้เด็กเรียนในห้องค่ะ","สงกรานต์เด็กๆ ตื่นเต้นมากเลย"],["หน้าฝนเด็กๆ ชอบวิ่งเล่นน้ำ ครูห้ามไม่ไหว","สอนเรื่องวัฏจักรน้ำ ฝนตกพอดีเลยค่ะ","ทางมาโรงเรียนเป็นโคลน ระวังลื่นนะคะ"],["หน้าหนาวเด็กๆ ใส่เสื้อกันหนาวตัวโต น่ารักมาก","ใกล้ลอยกระทงแล้ว เด็กๆ กำลังพับกระทง","อากาศเย็นแบบนี้อ่านหนังสือเพลินดี"]],
    rain:["ฝนตก เด็กๆ เลยได้ฟังนิทานแทนวิชาพละ","ระวังเป็นหวัดนะคะ"],night:["ตรวจการบ้านยังไม่เสร็จเลยค่ะ","ดึกแล้ว พักผ่อนเยอะๆ นะคะ"],morn:["อรุณสวัสดิ์ค่ะ เด็กๆ กำลังเข้าแถว"]},
  ton:{t:[["ผมประจำอนามัยตำบล ไม่สบายมาหาได้นะครับ","ทำงานกลางแดดต้องใส่หมวกนะครับ","ยายสายมาตรวจความดันทุกอาทิตย์ แข็งแรงกว่าผมอีก","ผมย้ายมาจากในเมืองเหมือนกันครับ"],
      ["{n}นอนพอไหมครับ ดูตาคล้ำๆ","อาหารที่ทำเองจากไร่ ดีต่อสุขภาพที่สุดครับ","ผมชอบวิ่งตอนเช้ารอบหมู่บ้าน ลองไปด้วยกันไหม","เห็ดในป่าบางชนิดมีพิษ เก็บแต่ที่รู้จักนะครับ","ลุงมีดื่มน้ำน้อยไป ผมเตือนทุกวันเลย","เวรดึกบ่อยๆ ก็เหนื่อยเหมือนกันครับ"],
      ["อยู่กับ{n}แล้วผมลืมเหนื่อยไปเลย","ดูแลตัวเองด้วยนะครับ ผมเป็นห่วง","ผมเลือกมาอยู่ที่นี่ไม่ผิดจริงๆ","วันหยุดไปนั่งดูพระอาทิตย์ตกที่บ่อกันไหมครับ","{n}ทำให้หมู่บ้านนี้อบอุ่นขึ้นเยอะเลย","ถ้าเจ็บตรงไหนบอกผมก่อนใครนะครับ"]],
    s:[["หน้าร้อนระวังลมแดดนะครับ ดื่มน้ำบ่อยๆ","อากาศร้อนแบบนี้คนเป็นหวัดน้อย ผมเลยว่าง","ทากันแดดด้วยนะครับ"],["หน้าฝนยุงเยอะ ระวังไข้เลือดออกครับ","ฝนตกบ่อยคนเป็นหวัดเยอะ ผมยุ่งทั้งวัน","อย่าเดินลุยน้ำนานๆ นะครับ"],["หน้าหนาวอากาศแห้ง ดื่มน้ำอุ่นนะครับ","ช่วงนี้คนไอกันเยอะ ใส่เสื้อหนาๆ","ยายสายบ่นปวดเข่าทุกหน้าหนาว"]],
    rain:["ฝนตกแบบนี้กลับไปเปลี่ยนเสื้อด้วยนะครับ","เปียกแบบนี้ระวังไม่สบายนะ"],night:["ผมเข้าเวรดึกคืนนี้ครับ","ดึกแล้วนอนได้แล้วครับ คำสั่งหมอ"],morn:["เช้านี้วิ่งมาแล้วสองรอบหมู่บ้านครับ"]},
  phum:{t:[["ผมเล่นพิณทุกเย็นที่ลาน แวะมาฟังได้","เพลงหมอลำเก่าๆ ไพเราะกว่าเพลงใหม่เยอะนะ","ลมพัดใบไม้ก็เป็นจังหวะได้ ลองฟังสิ","ผมแต่งเพลงไม่เป็นหรอก แค่เล่นตามใจ"],
      ["{n}ร้องเพลงเป็นไหม มาร้องด้วยกันสิ","ผมกำลังแต่งเพลงเกี่ยวกับทุ่งนา ยังไม่มีท่อนจบ","ปู่สอนว่าเล่นพิณต้องเล่นด้วยใจ ไม่ใช่นิ้ว","เสียงวัวร้องตอนเช้าที่ไร่คุณ ผมเอาไปใส่เพลงแล้วนะ","งานบุญบั้งไฟปีนี้ผมจะเล่นบนเวที","ครูนุ่นชวนผมไปสอนดนตรีเด็กๆ ทุกวันศุกร์"],
      ["เพลงที่ผมแต่งใหม่ ได้แรงบันดาลใจจาก{n}นะ","เล่นพิณให้{n}ฟังคนเดียว พิเศษกว่าเล่นบนเวทีอีก","ผมว่าเราสองคนเข้ากันดีเหมือนพิณกับแคน","ตั้งชื่อเพลงใหม่ว่า '{farm}' ดีไหม","วันไหนเหงาๆ มาฟังผมเล่นได้นะ","ขอบคุณที่ฟังเพลงผมทุกวัน"]],
    s:[["ร้อนแบบนี้สายพิณยืด เสียงเพี้ยนหมด","หน้าร้อนเล่นใต้ต้นไม้สบายสุด","สงกรานต์ผมจะเล่นเพลงสาดน้ำ"],["เสียงฝนตกบนหลังคาสังกะสี เพราะกว่าทุกเพลง","หน้าฝนพิณชื้น ต้องเช็ดทุกวัน","ฝนตกแบบนี้แต่งเพลงเศร้าได้ดี"],["หน้าหนาวเล่นพิณข้างกองไฟ ฟินที่สุด","ลมหนาวพัดมา เสียงพิณใสขึ้น","ลอยกระทงปีนี้ผมจะเล่นเพลงริมบ่อ"]],
    rain:["ฝนตก วันนี้เล่นในบ้านแทน","มาหลบฝนฟังเพลงด้วยกันไหม"],night:["กลางคืนเล่นพิณเบาๆ กล่อมตัวเองนอน","ดาวคืนนี้สวยนะ"],morn:["เช้านี้ยังไม่ได้ซ้อมเลย ง่วง"]},
  sai:{t:[["ยายรู้จักตาของหลานตั้งแต่ยังหนุ่มๆ","มาเยี่ยมยายบ่อยๆ นะหลาน","สวนดอกไม้ของยายมีดอกมะลิทั้งปีเลย","อย่าทำงานหนักเกินไปนะ เดี๋ยวก็ป่วย"],
      ["{n}ทำงานเหมือนตาไม่มีผิด ขยันตั้งแต่เช้ามืด","ตาเขาชอบนั่งเป่าขลุ่ยหน้าบ้านตอนเย็นๆ","ยายเคยทำแกงหน่อไม้ให้ตาเขากินทุกหน้าฝน","หมอต้นมาตรวจยายทุกอาทิตย์ ใจดีจริงๆ","ดอกไม้สวยต้องรดน้ำด้วยใจนะหลาน","สมัยก่อนหมู่บ้านนี้มีงานวัดทุกเดือนเลย"],
      ["ยายดีใจที่สุดที่หลานมาอยู่ที่นี่","ไร่ของตากลับมามีชีวิตเพราะหลานนะ","ยายแก่แล้ว แต่ยังอยากเห็นหลานมีครอบครัวที่อบอุ่น","ตาเขาคงภูมิใจในตัวหลานมากๆ","มีเรื่องไม่สบายใจมาเล่าให้ยายฟังได้นะ","ยายฝันถึงตาเมื่อคืน เขายิ้มให้ยายด้วย"]],
    s:[["หน้าร้อนดอกดาวเรืองบานเต็มสวนเลย","ร้อนแบบนี้ยายนั่งพัดอยู่ใต้ต้นมะม่วง","สงกรานต์ปีนี้มารดน้ำดำหัวยายด้วยนะ"],["หน้าฝนหน่อไม้ขึ้นเต็มป่าเลยหลาน","ฝนตกบ่อยยายปวดเข่า แต่ไม่เป็นไรหรอก","ข้าวในนาเขียวสวยทุกหน้าฝน"],["หน้าหนาวดอกไม้ในสวนยายบานสวยที่สุด","ลมหนาวมาแล้ว ใส่เสื้อหนาๆ นะหลาน","ปีใหม่นี้ยายจะทำขนมให้นะ"]],
    rain:["ฝนตก อย่าตากฝนนะหลาน","นั่งฟังเสียงฝนกับยายก่อนไหม"],night:["ยายนอนเร็ว หลานก็อย่านอนดึกนะ","ดึกแล้วกลับบ้านดีๆ นะหลาน"],morn:["ยายตื่นมาสวดมนต์ตั้งแต่ตีห้าแล้ว"]},
  mint:{t:[["ในป่ามีนกเงือกด้วยนะ ฉันเห็นเมื่อเดือนก่อน","อย่าเก็บเห็ดที่ไม่รู้จักนะ อันตราย","ฉันเดินป่ามาตั้งแต่เด็ก ไม่เคยเบื่อเลย","รองเท้าคู่นี้เดินมาแล้วสามภูเขา!"],
      ["{n}ไปเดินป่าด้วยกันไหม ฉันรู้ทางลัด","เมื่อวานเจอรอยหมูป่าแถวทุ่งริมลำธาร","น้ำตกบนเขาสวยที่สุดตอนเช้า ไม่มีคน","ฉันจดชื่อนกที่เจอในสมุด ได้สามสิบชนิดแล้ว","กล้วยไม้ป่าห้ามเด็ดเยอะนะ เดี๋ยวหมดป่า","ครูนุ่นชวนฉันไปสอนเด็กเรื่องป่า สนุกมาก"],
      ["เดินป่าคนเดียวก็สนุก แต่เดินกับ{n}สนุกกว่า","ฉันเจอที่ลับดูพระอาทิตย์ตก จะพา{n}ไปคนเดียว","{n}เป็นคนแรกที่ทนฟังฉันเล่าเรื่องนกได้นานขนาดนี้","อยากให้{farm}มีต้นไม้เยอะๆ นกจะได้มาอยู่","ขอบคุณที่เป็นเพื่อนผจญภัยนะ","ถ้าวันหนึ่งฉันไปเดินป่าไกลๆ จะคิดถึง{n}นะ"]],
    s:[["หน้าร้อนป่าแห้ง ระวังไฟป่าด้วย","ร้อนแบบนี้ไปเล่นน้ำตกกันดีกว่า","ผักหวานป่าออกหน้าร้อน อร่อยมาก"],["หน้าฝนทากเยอะ ใส่ถุงเท้ากันทากด้วย","เห็ดโคนออกหน้าฝน ไปหากันไหม","น้ำตกหน้าฝนแรงมาก ตื่นเต้นสุดๆ"],["หน้าหนาวทะเลหมอกสวยที่สุด","มะขามป่าหล่นเต็มป่าเลย","นกอพยพมาหน้าหนาว ฉันตื่นเต้นทุกปี"]],
    rain:["ฝนตกแบบนี้ป่าหอมกลิ่นดินมาก","วันนี้ไม่ได้ขึ้นเขา ฝนหนัก"],night:["กลางคืนในป่าได้ยินเสียงกบเต็มเลย","ฉันชอบนอนดูดาว"],morn:["เช้านี้ฉันขึ้นเขามาแล้วหนึ่งรอบ!"]},
  ja:{t:[["ร้านจ๋ามีแกงใหม่ทุกวัน แวะมาชิมนะ","ผักสดจากไร่คุณทำแกงอร่อยกว่าผักตลาดอีก","จ๋ามาจากในเมือง แต่ชอบที่นี่มากกว่า","ทำอาหารคือความสุขของจ๋า"],
      ["{n}กินเผ็ดได้ไหม แกงเขียวหวานวันนี้เผ็ดจัด","ลุงมีมากินข้าวร้านจ๋าทุกเที่ยงเลย","อยากได้กะเพราสดๆ อีก ไร่คุณปลูกไหม","ถ้าร้านได้ดาวครบห้า จ๋าจะขยายร้าน","ขอบคุณที่ส่งวัตถุดิบให้นะ ลูกค้าชมทุกคน","ป้าแดงชอบสั่งข้าวผัดไม่ใส่ต้นหอม"],
      ["จ๋าทำเมนูพิเศษไว้ให้{n}คนเดียวนะ","เวลาเหนื่อยๆ เห็นหน้า{n}แล้วหายเหนื่อยเลย","อยากตั้งชื่อเมนูใหม่ว่า 'ข้าวแกง{farm}'","จ๋าอยากทำอาหารให้{n}กินไปนานๆ","ร้านจ๋าอยู่ได้เพราะ{n}ช่วยเยอะเลย","คืนนี้ปิดร้านแล้วมานั่งกินด้วยกันไหม"]],
    s:[["หน้าร้อนขายน้ำแข็งใสดีกว่าแกงอีก","ร้อนแบบนี้ยืนหน้าเตาทั้งวันแทบละลาย","มะม่วงหน้าร้อนเอามาทำข้าวเหนียวมะม่วงขายดีมาก"],["หน้าฝนต้มยำขายดีที่สุด","ฝนตกลูกค้ามานั่งหลบฝนกันเต็มร้าน","หน่อไม้หน้าฝนเอามาแกงอร่อยมาก"],["หน้าหนาวแกงร้อนๆ หมดเร็วมาก","อากาศเย็นแบบนี้กินข้าวต้มอร่อยที่สุด","ฟักทองหน้าหนาวทำแกงบวดหวานๆ"]],
    rain:["ฝนตกแบบนี้ลูกค้าเยอะ จ๋ายุ่งมาก","มากินอะไรร้อนๆ ที่ร้านสิ"],night:["เก็บร้านเสร็จแล้ว เหนื่อยแต่สนุก","ร้านปิดแล้ว พรุ่งนี้มาใหม่นะ"],morn:["เช้านี้ตลาดสดมาก ได้ผักดีๆ เพียบ"]}
};
const NEWS=[
  {id:'buek',ok:()=>S.col.buek>0,l:'ได้ข่าวว่า{n}ตกปลาบึกได้ด้วย เก่งมาก!',o:{mee:'ได้ข่าวว่าเอ็งตกปลาบึกได้! ลุงตกมาสามสิบปียังไม่เคยได้เลย'}},
  {id:'land',ok:()=>!!S.land,l:'ซื้อที่ดินหลังไร่แล้วเหรอ ไร่ใหญ่ขึ้นเยอะเลย',o:{daeng:'ไร่ใหญ่ขึ้นแล้ว ต้องซื้อเมล็ดเพิ่มแล้วล่ะจ้ะ'}},
  {id:'bridge',ok:()=>!!(S.proj.bridge&&S.proj.bridge.done),l:'สะพานซ่อมเสร็จแล้ว เดินไปทุ่งริมลำธารสะดวกขึ้นเยอะเลย',o:{ek:'สะพานที่เราช่วยกันซ่อม แข็งแรงมาก ช่างภูมิใจ',mint:'ขอบคุณที่ซ่อมสะพานนะ ฉันได้ย้ายมาอยู่ริมลำธารแล้ว'}},
  {id:'market',ok:()=>!!(S.proj.market&&S.proj.market.done),l:'ตลาดคึกคักขึ้นมากตั้งแต่{n}ช่วยฟื้น',o:{daeng:'ตลาดกลับมาแล้ว ร้านป้าขายดีขึ้นเยอะเลยจ้ะ',ja:'ถ้าไม่มี{n} จ๋าคงไม่ได้มาเปิดร้านที่นี่'}},
  {id:'temple',ok:()=>!!(S.proj.temple&&S.proj.temple.done),l:'วัดเก่าสวยเหมือนเดิมแล้ว ไปไหว้พระกันนะ',o:{sai:'วัดกลับมาสวยเหมือนสมัยยายยังสาว ยายดีใจจนน้ำตาไหล'}},
  {id:'gh',ok:()=>!!S.built.gh,l:'โรงเรือนกระจกที่ไร่สวยมาก ปลูกได้ทุกฤดูเลยใช่ไหม',o:{ek:'โรงเรือนหลังนั้นช่างตั้งใจทำที่สุดในชีวิตเลยนะ'}},
  {id:'wed',ok:()=>!!S.rel.spouse,skipSp:true,l:'ยินดีด้วยนะที่แต่งงานกับ{sp}',o:{sai:'ยายเห็นหลานแต่งงานแล้ว ยายหมดห่วงแล้วล่ะ',daeng:'ยินดีด้วยนะจ๊ะ ป้าร้องไห้ตั้งแต่ในงานเลย'}},
  {id:'kid',ok:()=>!!S.rel.kid,skipSp:true,l:'{kid}น่ารักมาก โตเร็วจังเลย',o:{ton:'{kid}แข็งแรงดี ผมตรวจแล้วครับ'}},
  {id:'mine10',ok:()=>(S.mineDeep||0)>=10,l:'ได้ยินว่าลงเหมืองไปถึงชั้นสิบแล้ว ระวังตัวด้วยนะ',o:{ton:'ลงเหมืองลึกๆ ระวังบาดเจ็บนะครับ มีอะไรมาหาผม',ek:'แร่จากเหมืองชั้นลึกเอามาตีเครื่องมือได้ดีนะ'}},
  {id:'beach',ok:()=>((S.trips||{}).beach||0)>0,l:'ไปเที่ยวทะเลมาเหรอ ผิวคล้ำขึ้นนะ',o:{ja:'ไปทะเลมาเหรอ เอาปลาหมึกมาฝากจ๋าบ้างสิ'}},
  {id:'falls',ok:()=>((S.trips||{}).falls||0)>0,l:'ไปน้ำตกบนเขามาแล้วเหรอ สวยใช่ไหม',o:{mint:'ไปน้ำตกมาแล้ว! เห็นนกเงือกไหม'}},
  {id:'pet',ok:()=>!!S.pet,l:'{pet}น่ารักจัง เลี้ยงดีนะ',o:{mint:'{pet}ชอบวิ่งตามผีเสื้อในทุ่ง ฉันเห็นบ่อยเลย'}},
  {id:'horse',ok:()=>!!S.horse,l:'ขี่ม้ามาเท่มากเลยนะ'},
  {id:'rich',ok:()=>(S.stats.earned||0)>=20000,l:'ได้ยินว่า{farm}ขายผักได้ดีมาก ดังไปถึงในเมืองแล้ว'},
  {id:'museum',ok:()=>Object.keys(S.museum||{}).length>=5,l:'ไปดูพิพิธภัณฑ์มาแล้ว ของที่{n}บริจาคสวยมาก',o:{nun:'พาเด็กๆ ไปดูพิพิธภัณฑ์ ทุกคนตื่นเต้นมากค่ะ'}}
];
const SP_LINES=['วันนี้ฉันช่วยดูไร่ให้แล้วนะ','กลับบ้านเร็วๆ นะ จะทำกับข้าวรอ','มีเธออยู่ด้วย ทุกวันก็ดีหมด','เมื่อคืนเธอละเมอพูดถึงแตงโมด้วยนะ','อย่าทำงานหนักจนลืมพักนะ','วันนี้อยากกินอะไร เดี๋ยวทำให้','ขอบคุณที่ดูแลครอบครัวเรานะ','เย็นนี้ไปนั่งริมบ่อด้วยกันไหม'];
function talkFill(t){return t.replace(/\{n\}/g,pn()).replace(/\{farm\}/g,S.farm||'ไร่สุขใจ').replace(/\{sp\}/g,S.rel.spouse?NPCS[S.rel.spouse].n:'').replace(/\{kid\}/g,S.rel.kid?S.rel.kid.name:'').replace(/\{pet\}/g,S.pet?S.pet.name:'');}
function talkLine(id,tier){const n=S.npc[id],d=NPCS[id],T=TALK[id]||{t:[[],[],[]],s:[[],[],[]]};
  if(n.lineDay===S.day&&n.line)return n.line;
  let line=null;n.heard=n.heard||{};
  for(const N of NEWS){if(n.heard[N.id]||!N.ok()||(N.skipSp&&S.rel.spouse===id))continue;n.heard[N.id]=S.day;line=(N.o&&N.o[id])||N.l;break;}
  const r=k=>hash(S.day*7+k,id.length*13+id.charCodeAt(0));
  if(!line){const nf=festOn(S.day+1);if(nf&&r(1)<.4)line=`พรุ่งนี้มีงาน${nf.n}นะ อย่าลืมมาล่ะ`;}
  if(!line&&S.rain&&T.rain&&r(2)<.5)line=T.rain[Math.floor(r(3)*T.rain.length)];
  if(!line&&(S.t>=1080)&&T.night&&r(4)<.35)line=T.night[Math.floor(r(5)*T.night.length)];
  if(!line&&S.t<540&&T.morn&&r(6)<.25)line=T.morn[Math.floor(r(7)*T.morn.length)];
  if(!line){const pool=[...(T.t[tier]||[]),...(d.lines[tier]||[]),...((T.s&&T.s[seasonIdx()])||[])];if(tier>0)pool.push(...(T.t[tier-1]||[]).slice(0,2));
    if(GREET[id]&&tier===0)pool.push('@greet');
    const cand=pool.filter(x=>talkFill(x)!==n.line);line=cand[Math.floor(r(8)*cand.length)]||pool[0];
    if(line==='@greet')line=GREET[id](pn());}
  line=talkFill(line);n.line=line;n.lineDay=S.day;return line;}

function openNpc(id,reply,emo){
  if(!reply&&id==='sai'&&S.evalDue){S.npc.sai.talked=true;openEval();return;}
  if(!reply&&S.rel.spouse===id&&S.rel.fight){S.npc[id].talked=true;openMakeup(id);return;}
  if(!reply&&S.rel.spouse===id&&isAnniv()&&S.rel.annivDay!==S.day){S.npc[id].talked=true;openAnniv(id);return;}
  const d=NPCS[id],n=S.npc[id];
  if(!reply){const ev=pendingEvent(id);if(ev){if(!n.talked){n.talked=true;}openEvent(id,ev);return;}}
  if(!reply)stat('talk_'+id);
  if(!n.talked){n.talked=true;addH(id,1);}
  const tier=n.h>=7?2:n.h>=3?1:0, f=festOn();
  let teach='';const tid=Object.keys(DISHES).find(k=>DISHES[k].teach===id);
  if(!reply&&tid&&n.h>=4&&!S.known.includes(tid)){S.known.push(tid);teach=`เราสนิทกันแล้ว สอนสูตร${ITEMS[tid].n}ให้เลย ${inName(DISHES[tid].in)} ทำที่ครัวในบ้านนะ`;sfx('upgrade');}
  const spouse=S.rel.spouse===id;
  const bday=isBday(id)?(n.gifted?'ขอบคุณสำหรับของขวัญวันเกิดนะ ดีใจมาก':'วันนี้วันเกิดฉันเอง!'):'';
  const line=teach||reply||bday||(f&&FEST_LINES[f.id]&&FEST_LINES[f.id][id])||(spouse&&S.day%2?SP_LINES[(S.day>>1)%SP_LINES.length]:talkLine(id,tier));
  const cap=capH(id),hearts='♥'.repeat(n.h)+'♡'.repeat(cap-n.h)+(cap<10?' (สูงสุด 8 จนกว่าจะคบกัน)':'');
  let love='';
  if(d.cand&&!S.rel.spouse){
    if(S.rel.date===id){love=n.h>=10&&S.built.house&&S.inv.ring>0&&!S.rel.wedDay?`<div class="req">หัวใจเต็มแล้ว บ้านพร้อมแล้ว<div class="row" style="margin-top:6px"><button class="btn" data-propose="${id}">มอบแหวน · ขอแต่งงาน</button></div></div>`
      :S.rel.wedDay?`<div class="req">งานแต่งงานวันที่ ${dayOfSeason(S.rel.wedDay)} ${SEASONS[seasonIdx(S.rel.wedDay)].n}</div>`
      :`<div class="lv">กำลังคบกัน · ขอแต่งงานได้เมื่อหัวใจครบ 10 ต่อเติมบ้านแล้ว และมีแหวนทอง (ร้านป้าแดง)</div>`;}
    else if(!S.rel.date&&n.h>=8)love=S.inv.jas>0?`<div class="req">${d.n}ดูเขินๆ เวลาคุยกับคุณ<div class="row" style="margin-top:6px"><button class="btn" data-date="${id}">มอบพวงมาลัยมะลิ · ขอเป็นแฟน</button></div></div>`
      :`<div class="lv">หัวใจครบ 8 แล้ว ซื้อพวงมาลัยมะลิที่ร้านป้าแดงเพื่อขอเป็นแฟน</div>`;
  }
  const storyRice=id==='sai'&&STORY[S.story.i]&&S.story.i===4?`<div class="req">ยายสายรอข้าวหอมมะลิ 3 รวง (มี ${S.prod.rice})<div class="row" style="margin-top:6px"><button class="btn" data-storyrice ${S.prod.rice<3?'disabled':''}>ให้ข้าวหอมมะลิ 3</button></div></div>`:'';
  const kid=spouse&&S.rel.kid?`<div class="lv">${S.rel.kid.name} อายุ ${kidAge()} วัน · ${kidStage(kidAge())}${kidAge()>=42?` · นิสัย${kidTrait().n}`:''}${S.kidPlayed?' · วันนี้เล่นด้วยกันแล้ว':''}${S.kidPlayed?'':` <button class="btn ghost" data-play>เล่นกับ${S.rel.kid.name}</button>`}</div>`:'';
  const dateBtn=d.cand&&n.h>=4?`<div class="row"><button class="btn ghost" data-date2="${id}" ${canDate(id)?'':'disabled'}>ชวนไปเที่ยว${canDate(id)?'':(S.dates&&S.dates[id]!==undefined&&S.day-S.dates[id]<3?' (เพิ่งไปมา)':' (วันนี้ไม่ได้)')}</button></div>`:'';
  const hike=id==='mint'&&n.h>=2&&S.hike!==S.day&&S.t<960&&!festActive()?`<div class="req">มิ้นท์ชอบชวนคนไปเดินป่ามากกว่าได้ของแพง<div class="row" style="margin-top:6px"><button class="btn" data-hike ${S.stam<20?'disabled':''}>ชวนเดินป่า · ใช้แรง 20 · 2 ชั่วโมง</button></div></div>`:id==='ja'?`<div class="row"><button class="btn ghost" data-resto>ไปที่ร้านข้าวแกง</button></div>`:'';
  let req='';
  if(n.req){const r=n.req;
    req=r.done?`<div class="req">ช่วยเรื่อง${ITEMS[r.k].n}ไปแล้ววันนี้ ขอบคุณ!</div>`
      :`<div class="req">${ic(r.k)}<b>อยากได้ ${ITEMS[r.k].n} ×${r.q}</b> · ให้ ฿${r.r} (มี ${S.prod[r.k]})
        <div class="row" style="margin-top:6px"><button class="btn" data-deliver="${id}" ${S.prod[r.k]<r.q?'disabled':''}>ส่งของให้</button></div></div>`;}
  let gifts='';
  if(!n.gifted){const own=Object.keys(ITEMS).filter(k=>S.prod[k]>0);
    gifts=`<div class="sub">ให้ของขวัญ (วันละครั้ง)</div><div class="giftRow">${own.length?own.map(k=>`<button class="btn ghost" data-gift="${id}:${k}">${ic(k,18)}${ITEMS[k].n} ×${S.prod[k]}</button>`).join(''):'<span>ตะกร้ายังว่าง</span>'}</div>`;}
  else gifts='<div class="sub">ให้ของขวัญไปแล้ววันนี้</div>';
  const em=emo!==undefined?emo:reply?1:spouse?1:(d.cand&&n.h>=7?2:0);
  showModal(`<div class="npcHead"><h2>${d.n}</h2><small>${d.role}</small></div>
    <div class="hearts" aria-label="ความสนิท ${n.h} จาก ${cap}">${hearts}</div>
    ${spouse?`<div class="lv">คู่ชีวิตของคุณ · ${moodTxt(S.rel.mood)}${isAnniv()?' · วันนี้ครบรอบแต่งงาน':''}</div>`:S.rel.date===id?'<div class="lv">แฟนของคุณ</div>':''}
    <div class="talk">${face(id,em)}<p class="quote">“${line}”</p></div>${storyRice}${love}${kid}${hike}${dateBtn}${req}${gifts}
    <div class="row">${id==='daeng'&&!festActive()?'<button class="btn" data-shop>เปิดร้าน ดูสินค้า</button>':''}${id==='ek'&&!festActive()?'<button class="btn" data-carp>เปิดโรงไม้ ดูของ</button>':''}<button class="btn ghost" data-close>บอกลา</button></div>`);
}
const seedPrice=k=>Math.round(CROPS[k].buy*(inSeason(k)?1:1.5));

const MTAB={shop:'seed',carp:'build',book:'veg'};
function mtabs(k,list){return`<div class="tabs mtabs">${list.map(([id,n])=>`<button type="button" class="tab ${MTAB[k]===id?'on':''}" data-mtab="${k}:${id}">${n}</button>`).join('')}</div>`;}
function openShop(){
  let rows='',arows='';const ST=MTAB.shop;for(const k in CROPS){const ins=inSeason(k);if(!ins&&!S.built.gh)continue;const c=CROPS[k],pr=seedPrice(k);
    rows+=`<tr><td>${ic(k)}<b>${c.n}</b>${ins?'':'<div class="lv">นอกฤดู · ปลูกในโรงเรือน</div>'}</td><td>${c.d} วัน</td><td>฿${pr}</td><td>฿${ITEMS[k].v}</td><td>${S.seeds[k]}</td>
    <td><button class="btn" data-buy="${k}:1" ${S.money<pr?'disabled':''}>+1</button> <button class="btn" data-buy="${k}:5" ${S.money<pr*5?'disabled':''}>+5</button></td></tr>`;}
  const anyEight=Object.keys(NPCS).some(id=>NPCS[id].cand&&S.npc[id].h>=8);
  if(!S.rel.spouse&&!S.rel.date&&anyEight)rows+=`<tr><td><b>พวงมาลัยมะลิ</b><div class="lv">มอบเพื่อขอเป็นแฟน</div></td><td>—</td><td>฿${JAS_PRICE}</td><td>—</td><td>${S.inv.jas}</td><td><button class="btn" data-special="jas" ${S.money<JAS_PRICE?'disabled':''}>ซื้อ</button></td></tr>`;
  if(!S.rel.spouse&&S.rel.date&&!S.rel.wedDay)rows+=`<tr><td><b>แหวนทอง</b><div class="lv">มอบเพื่อขอแต่งงาน</div></td><td>—</td><td>฿${RING_PRICE}</td><td>—</td><td>${S.inv.ring}</td><td><button class="btn" data-special="ring" ${S.money<RING_PRICE?'disabled':''}>ซื้อ</button></td></tr>`;
  for(const k in FTREES){const F=FTREES[k],dk='tr_'+k;rows+=`<tr><td>${ic(k)}<b>ต้นกล้า${F.n}</b><div class="lv">ไม้ผล · ออกผลทุก ${F.every} วัน${F.s.length<3?` (${F.s.map(i=>SEASONS[i].n).join(' ')})`:''}</div></td><td>${F.grow} วัน</td><td>฿${F.price}</td><td>฿${ITEMS[k].v}</td><td>${S.decoInv[dk]||0}</td>
    <td><button class="btn" data-sap="${k}" ${S.money<F.price?'disabled':''}>+1</button></td></tr>`;}
  arows+=`<tr><td>${ic('med')}<b>ยารักษาสัตว์</b><div class="lv">ให้สัตว์ที่ป่วย</div></td><td>—</td><td>฿${MED_PRICE}</td><td>—</td><td>${S.inv.med||0}</td><td><button class="btn" data-special="med" ${S.money<MED_PRICE?'disabled':''}>+1</button></td></tr>`;
  if(!S.inv.brush)arows+=`<tr><td>${ic('brush')}<b>แปรงขนสัตว์</b><div class="lv">แปรงวัว แพะ ควายหลังลูบหัว สนิทเร็วขึ้น</div></td><td>—</td><td>฿${BRUSH_PRICE}</td><td>—</td><td>—</td><td><button class="btn" data-special="brush" ${S.money<BRUSH_PRICE?'disabled':''}>ซื้อ</button></td></tr>`;
  rows+=`<tr><td>${ic('hay')}<b>หญ้าแห้ง</b></td><td>อาหารวัว</td><td>฿${HAY_PRICE}</td><td>—</td><td>${S.hay}</td>
    <td><button class="btn" data-buy="hay:1" ${S.money<HAY_PRICE?'disabled':''}>+1</button> <button class="btn" data-buy="hay:5" ${S.money<HAY_PRICE*5?'disabled':''}>+5</button></td></tr>`;
  let tools='';for(const t in TOOLS){const T=TOOLS[t],lv=S.tools[t];
    tools+=`<tr><td><b>${T.n[lv]}</b><div class="lv">${toolDesc(t,lv)}</div></td><td colspan="3">${lv<2?`→ ${T.n[lv+1]} (${toolDesc(t,lv+1)})`:'ระดับสูงสุดแล้ว'}</td><td></td>
      <td>${lv<2?`<button class="btn" data-up="${t}" ${S.money<T.cost[lv+1]||S.prod[ORES_FOR[lv+1].k]<ORES_FOR[lv+1].n?'disabled':''}>฿${T.cost[lv+1]} + ${ITEMS[ORES_FOR[lv+1].k].n} ${ORES_FOR[lv+1].n}</button>`:''}</td></tr>`;}
  showModal(`<h2>ร้านเมล็ดพันธุ์ป้าแดง</h2><p>เงินที่มี <b>฿${S.money}</b> · เมล็ด${season().n}</p>
${mtabs('shop',[['seed','เมล็ดและต้นกล้า'],['ani','สัตว์และยา'],['tool','อัปเกรดเครื่องมือ']])}${ST==='seed'?`  <div style="overflow-x:auto"><table class="shop"><tr><th>สินค้า</th><th>โต</th><th>ราคา</th><th>ขายผลได้</th><th>มี</th><th></th></tr>${rows}</table></div>
`:''}${ST==='ani'?`<div class="sub">สัตว์เลี้ยง</div>${Object.keys(ANIMALS).map(k=>{const A=ANIMALS[k],ok=A.need();const nt=typeof A.needTxt==='function'?A.needTxt():A.needTxt;return `<div class="need"><span><b>${A.n}</b> ฿${A.p}${A.cnt?` · ${A.cnt()}`:''}<br><small>${ok?A.d:nt}</small></span><button class="btn" data-animal="${k}" ${!ok||S.money<A.p?'disabled':''}>ซื้อ</button></div>`;}).join('')}
${arows?`<div class="sub">ยาและอุปกรณ์</div><div style="overflow-x:auto"><table class="shop">${arows}</table></div>`:''}`:''}${ST==='tool'?`  <div class="sub">อัปเกรดเครื่องมือ (ใช้แร่จากเหมือง)</div>
  <div style="overflow-x:auto"><table class="shop">${tools}</table></div>
`:''}
  <div class="row">${festActive()?'':'<button class="btn" data-npc="daeng">คุยกับป้าแดง</button>'}<button class="btn ghost" data-close>ปิดร้าน</button></div>`);
}
function openLand(){
  showModal(`<h2>ที่ดินรกร้างหลังไร่</h2>
    <p>แปลงขนาด 13×7 ช่องทางใต้ของไร่ ตอนนี้มีหญ้ารก หิน และตอไม้เต็มไปหมด</p>
    <p>ถอนหญ้าได้หญ้าแห้ง · ทุบหินได้หิน · ผ่าตอไม้ได้ไม้ เอาไปใช้สร้างอาคารกับช่างเอก</p>
    <p>ราคา <b>฿${LAND_PRICE}</b> · เงินที่มี ฿${S.money}</p>
    <div class="row"><button class="btn" data-buyland ${S.money<LAND_PRICE?'disabled':''}>ซื้อที่ดิน</button><button class="btn ghost" data-close>ไว้ก่อน</button></div>`);
}

// ---------- house interior ----------
const HW=16,HH=9,HOUSE_DOOR=[7.95,7.35],STOVE={x:12,y:2,w:2,h:1},HOUSE_FIX=['1,2','2,2','1,3','14,2','14,3'];
const FURN={
  bed:{n:'เตียงคู่ไม้สัก',p:2500,wood:20,x:3,y:2,w:2,h:2,c:1,d:'หลับเพลียนอกบ้านไม่เสียแรงครึ่งหนึ่ง และคู่ครองอารมณ์ดีขึ้นทุกวัน'},
  shelf:{n:'ชั้นหนังสือ',p:1000,wood:10,x:6,y:2,w:1,h:1,c:1,d:'ค่าประสบการณ์ทุกทักษะ +15% · อ่านหนังสือได้วันละเล่ม'},
  radio:{n:'วิทยุ',p:1200,wood:0,x:8,y:2,w:1,h:1,d:'ฟังข่าวตลาดและพยากรณ์อากาศ รายการดูดวงทำให้บางวันโชคดี'},
  fridge:{n:'ตู้เย็น',p:3000,wood:0,x:11,y:2,w:1,h:1,d:'ทำอาหารมีโอกาส 25% ได้ 2 จาน'},
  rug:{n:'พรมหวาย',p:600,wood:0,x:6,y:4,w:4,h:3,walk:true,c:1,d:'นั่งพักบนพรมฟื้นแรงได้วันละครั้ง (ยิ่งบ้านสบายยิ่งฟื้นเยอะ)'},
  table:{n:'โต๊ะกินข้าว',p:800,wood:10,x:7,y:5,w:2,h:1,c:1,d:'กินอาหารในบ้านได้แรงเพิ่ม 25%'},
  plant:{n:'ต้นไม้ประดับ',p:400,wood:0,x:13,y:6,w:1,h:1,c:1,d:'บ้านดูมีชีวิตชีวา เพิ่มความสบาย'},
  cradle:{n:'เปลเด็ก',p:900,wood:8,x:3,y:6,w:1,h:1,d:'ตั้งครรภ์ 4 วันแทน 7 และไกวเปลเล่นกับลูกได้',need:()=>!!S.rel.spouse,why:'ต้องแต่งงานก่อน'}};
const has=k=>!!(S.furn&&S.furn[k]);
const comfort=()=>Object.keys(FURN).filter(k=>FURN[k].c&&has(k)).length;
const inR=(R,x,y)=>x>=R.x&&x<R.x+R.w&&y>=R.y&&y<R.y+R.h;
function houseSolid(x,y){if(x<=0||y<=1||x>=HW-1||y>=HH-1)return true;if(inR(STOVE,x,y)||inR(FURN.bed,x,y)||HOUSE_FIX.includes(x+','+y))return true;
  for(const k in FURN){const F=FURN[k];if(!F.walk&&has(k)&&inR(F,x,y))return true;}return false;}
function enterHouse(){scene='house';S.inHouse=true;riding=false;auto=null;$('rideBtn').classList.remove('sel');S.px=HOUSE_DOOR[0];S.py=HOUSE_DOOR[1];S.face='up';sfx('ui');
  setTimeout(()=>tip('house','บ้านของคุณ! เตียงซ้ายบนไว้นอน เตาขวาบนทำอาหาร สั่งเฟอร์นิเจอร์ได้ที่โรงไม้ช่างเอก แต่ละชิ้นมีประโยชน์ต่างกัน'),500);}
function leaveHouse(){scene='farm';S.inHouse=false;auto=null;S.px=17.5;S.py=5.6;S.face='down';if(S.pet){S.pet.x=S.px-.8;S.pet.y=S.py+.3;}}
const BOOK_TIPS=['ผักดาวทองขายได้ราคาสูงกว่าปกติมาก ใส่ปุ๋ยแล้วรดน้ำทุกวันจะได้ดาวง่ายขึ้น','ปลาช่อนชอบออกตอนฝนตก','ลูบหัวสัตว์ทุกวันช่วยให้สนิทและไม่ค่อยป่วย','ราคาตลาดตกเมื่อขายของชนิดเดียวกันเยอะๆ ลองกระจายขาย','เหยื่อปลอมช่วยให้เจอปลาหายากบ่อยขึ้น 3 เท่า','ต้นผลไม้ไม่ต้องรดน้ำ ปลูกครั้งเดียวเก็บได้ตลอด','ชาวบ้านแต่ละคนมีของชอบ ลองสังเกตจากคำพูด','ขุดเหมืองลึกๆ มีแร่ทองและอัญมณี'];
function openRadio(){const best=Object.keys(ITEMS).filter(k=>S.col[k]>0&&!k.startsWith('d_')).sort((a,b)=>priceMul(b)-priceMul(a))[0];
  const wx=S.wxNext==='storm'?'พายุเข้า':S.wxNext==='rain'?'ฝนตก':'แดดดี';
  showModal(`<h2>วิทยุชุมชน</h2><div class="req"><b>ข่าวตลาด</b> ${best?`วันนี้${ITEMS[best].n}ราคาดี ${trend(best)}`:'ยังไม่มีข่าว'}</div>
    <div class="req"><b>พยากรณ์อากาศ</b> พรุ่งนี้${wx}${S.wxNext==='storm'?' เก็บผักสุกให้หมดก่อนนอน':''}</div>
    <div class="req"><b>ดูดวงรายวัน</b> ${S.luck>0?'วันนี้ดวงดีมาก! ตกปลาหายากง่ายขึ้น':'วันนี้ดวงปานกลาง ขยันทำงานไว้ก่อน'}</div>
    <div class="row"><button class="btn ghost" data-close>ปิดวิทยุ</button></div>`);}
function houseContext(){
  const {tx,ty}=target(),px=Math.floor(S.px),py=Math.floor(S.py);
  if(ty>=HH-1&&(tx===7||tx===8))return{l:'ออกไป',h:'ออกจากบ้าน',fn:()=>{sfx('ui');leaveHouse();}};
  if(inR(STOVE,tx,ty))return{l:'ทำอาหาร',h:S.built.kitchen?'ครัวไทย · ทำอาหาร':'เตาเก่า · สร้างครัวไทยกับช่างเอกก่อน',fn:()=>{sfx('ui');openHouse();}};
  if(inR(FURN.bed,tx,ty))return{l:'นอน',h:has('bed')?'เตียงคู่ไม้สัก · นอนจบวัน':'ที่นอนเก่า · นอนจบวัน',fn:()=>{sfx('ui');openHouse();}};
  for(const k of ['shelf','radio','fridge','table','plant','cradle']){const F=FURN[k];if(!inR(F,tx,ty))continue;
    if(!has(k))return{l:'—',h:`ที่ว่างสำหรับ${F.n} · สั่งทำได้ที่โรงไม้ช่างเอก`,dis:true};
    if(k==='shelf')return S.readDay===S.day?{l:'—',h:'อ่านหนังสือไปแล้ววันนี้',dis:true}:{l:'อ่าน',h:'อ่านหนังสือ · ได้ความรู้และประสบการณ์',fn:()=>{S.readDay=S.day;xp('farm',4);xp('fish',4);sfx('ui');showModal(`<h2>อ่านหนังสือ</h2><p>${BOOK_TIPS[S.day%BOOK_TIPS.length]}</p><div class="lv">ประสบการณ์ทำไร่และตกปลา +4</div><div class="row"><button class="btn" data-close>ปิด</button></div>`);}};
    if(k==='radio')return{l:'ฟังวิทยุ',h:'ข่าวตลาด พยากรณ์อากาศ ดูดวง',fn:()=>{sfx('ui');openRadio();}};
    if(k==='fridge')return{l:'—',h:'ตู้เย็น · ทำอาหารมีโอกาสได้ 2 จาน',dis:true};
    if(k==='table')return{l:'กิน',h:'โต๊ะกินข้าว · แรงจากอาหาร +25%',fn:()=>{sfx('ui');openEat();}};
    if(k==='plant')return S.plantDay===S.day?{l:'—',h:'รดน้ำต้นไม้แล้ว',dis:true}:{l:'รดน้ำ',h:'รดน้ำต้นไม้ประดับ',fn:()=>{S.plantDay=S.day;sfx('water');pop(F.x+.5,F.y,'ใบเขียวสดชื่น','#bff0a0');}};
    if(k==='cradle')return S.rel.kid?(S.kidPlayed?{l:'—',h:'เล่นกับลูกไปแล้ววันนี้',dis:true}:{l:'ไกวเปล',h:`เล่นกับ${S.rel.kid.name}`,fn:()=>{S.kidPlayed=true;if(S.rel.spouse)addH(S.rel.spouse,1);sfx('catch');pop(F.x+.5,F.y,'หัวเราะคิกคัก ♥','#ff8fa3');}}):{l:'—',h:'เปลเด็กรอสมาชิกใหม่',dis:true};}
  if(has('rug')&&inR(FURN.rug,px,py))return S.rested===S.day?{l:'—',h:'พักบนพรมไปแล้ววันนี้',dis:true}:{l:'นั่งพัก',h:`ฟื้นแรง +${restAmt()} (ความสบาย ${comfort()}/5)`,fn:()=>{S.rested=S.day;const n=restAmt();S.stam=Math.min(S.maxStam,S.stam+n);S.t=Math.min(1430,S.t+30);sfx('sleep');pop(S.px,S.py-1,`+${n} แรง`,'#bff0a0');}};
  return{l:'—',h:`บ้านของฉัน · ความสบาย ${comfort()}/5`,dis:true};
}
const restAmt=()=>10+comfort()*6;
function drawHouse(){
  const s=TS,ww=HW*s,wh=HH*s;followCam(S.px*s,S.py*s,ww,wh);
  ctx.fillStyle='#1d140c';ctx.fillRect(0,0,vw,vh);
  const im=bgImg('house');
  if(im&&im.complete&&im.naturalWidth)ctx.drawImage(im,-camX,-camY,ww,wh);
  else{for(let y=0;y<HH;y++)for(let x=0;x<HW;x++){const X=wx(x),Y=wy(y);
      if(y<=1){ctx.fillStyle=y===0?'#6b4423':'#8a5a2b';ctx.fillRect(X,Y,s+1,s+1);ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(X+s*.48,Y,s*.04,s);continue;}
      if(x===0||x===HW-1||y===HH-1){ctx.fillStyle='#5a3a1a';ctx.fillRect(X,Y,s+1,s+1);continue;}
      ctx.fillStyle=(y%2)?'#c8925a':'#bf8a52';ctx.fillRect(X,Y,s+1,s+1);ctx.fillStyle='rgba(90,50,20,.25)';ctx.fillRect(X,Y+s*.96,s,s*.04);ctx.fillRect(X+((x*7+y*3)%4)*s*.25,Y,s*.03,s);}
    [[3,1],[10,1]].forEach(([x,y])=>{const X=wx(x),Y=wy(y);ctx.fillStyle='#bfe6ff';ctx.fillRect(X+s*.1,Y+s*.12,s*1.8,s*.7);ctx.fillStyle='#8fd07a';ctx.fillRect(X+s*.1,Y+s*.55,s*1.8,s*.27);ctx.strokeStyle='#46290f';ctx.lineWidth=3;ctx.strokeRect(X+s*.1,Y+s*.12,s*1.8,s*.7);ctx.beginPath();ctx.moveTo(X+s,Y+s*.12);ctx.lineTo(X+s,Y+s*.82);ctx.stroke();});
    ctx.fillStyle='#3a2410';ctx.fillRect(wx(7),wy(8),s*2,s);ctx.fillStyle='#d9b07a';ctx.fillRect(wx(7)+s*.1,wy(8),s*1.8,s*.12);}
  const ents=[];
  if(has('rug')){const R=FURN.rug;if(!sprAt('h_rug',wx(R.x+R.w/2),wy(R.y+R.h)-s*.2,s*3.6,false,s*2.6)){ctx.fillStyle='#c9572e';ctx.beginPath();ctx.ellipse(wx(R.x+2),wy(R.y+1.5),s*1.9,s*1.3,0,0,7);ctx.fill();ctx.strokeStyle='#f2c230';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(wx(R.x+2),wy(R.y+1.5),s*1.5,s*1,0,0,7);ctx.stroke();}}
  const stoveDraw=()=>{const X=wx(STOVE.x),Y=wy(STOVE.y);ctx.fillStyle='#8a4a2a';ctx.fillRect(X+s*.1,Y-s*.2,s*1.8,s*1.1);ctx.fillStyle='#5a2a1a';ctx.beginPath();ctx.arc(X+s*.6,Y+s*.3,s*.25,0,7);ctx.arc(X+s*1.4,Y+s*.3,s*.25,0,7);ctx.fill();if(S.built.kitchen){ctx.fillStyle='#9aa0a6';ctx.beginPath();ctx.ellipse(X+s*.6,Y+s*.1,s*.28,s*.16,0,0,7);ctx.fill();}};
  if(!(im&&im.complete&&im.naturalWidth))ents.push({y:STOVE.y+1,f:stoveDraw});
  for(const k in FURN){if(k==='rug'||(!has(k)&&k!=='bed'))continue;const F=FURN[k];
    ents.push({y:F.y+F.h-.02,f:()=>{const cx=wx(F.x+F.w/2),by=wy(F.y+F.h);
      if(k==='bed'&&!has('bed')){ctx.fillStyle='#d9cfa0';ctx.fillRect(wx(F.x)+s*.15,wy(F.y)+s*.5,s*1.7,s*1.3);ctx.fillStyle='#fff';ctx.fillRect(wx(F.x)+s*.3,wy(F.y)+s*.6,s*.6,s*.3);ctx.fillStyle='#6f8fc0';ctx.fillRect(wx(F.x)+s*.15,wy(F.y)+s*1.1,s*1.7,s*.7);return;}
      {const dw={shelf:1.35,cradle:1.3,plant:1.25,radio:1.1}[k]||F.w*1.05;if(sprAt('h_'+k,cx,by+s*.05,s*dw,false,s*(F.h+.95)))return;}
      const C={bed:'#8a5a2b',shelf:'#7a4a22',radio:'#a0703a',fridge:'#9ad8c4',table:'#8a5a2b',plant:'#3f8f3a',cradle:'#b07a44'}[k];
      ctx.fillStyle=C;ctx.strokeStyle='#46290f';ctx.lineWidth=2;
      if(k==='bed'){ctx.fillRect(wx(F.x)+s*.08,wy(F.y)+s*.2,s*1.84,s*1.7);ctx.fillStyle='#f4f0e6';ctx.fillRect(wx(F.x)+s*.2,wy(F.y)+s*.35,s*.7,s*.35);ctx.fillRect(wx(F.x)+s*1.1,wy(F.y)+s*.35,s*.7,s*.35);ctx.fillStyle='#c9572e';ctx.fillRect(wx(F.x)+s*.12,wy(F.y)+s*.9,s*1.76,s*.95);return;}
      if(k==='plant'){ctx.fillStyle='#a0522d';ctx.fillRect(cx-s*.22,by-s*.45,s*.44,s*.4);ctx.fillStyle=C;for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(cx+(i-2)*s*.14,by-s*.75-Math.abs(i-2)*-s*.05,s*.14,s*.3,(i-2)*.4,0,7);ctx.fill();}return;}
      const h=k==='fridge'?1.5:k==='shelf'?1.4:k==='radio'?.55:k==='cradle'?.8:.6;ctx.fillRect(cx-s*F.w*.45,by-s*h-s*.05,s*F.w*.9,s*h);ctx.strokeRect(cx-s*F.w*.45,by-s*h-s*.05,s*F.w*.9,s*h);
      if(k==='shelf'){for(let i=0;i<3;i++){ctx.fillStyle=['#d4453a','#3e6f9e','#f2b33d'][i];ctx.fillRect(cx-s*.8+i*s*.5,by-s*1.25,s*.35,s*.35);ctx.fillRect(cx-s*.7+i*s*.5,by-s*.75,s*.3,s*.35);}}
      if(k==='radio'){ctx.fillStyle='#46290f';ctx.beginPath();ctx.arc(cx-s*.15,by-s*.33,s*.12,0,7);ctx.fill();}}});}
  ents.push({y:S.py,f:drawPlayer});ents.sort((a,b)=>a.y-b.y).forEach(e=>e.f());
  if(modal.hidden){const sf=S.face;if(ctxCache&&ctxCache.face)S.face=ctxCache.face;const {tx,ty}=target();S.face=sf;const c=ctxCache;
    ctx.strokeStyle=c&&!c.dis?'rgba(255,248,220,.95)':'rgba(255,255,255,.35)';ctx.lineWidth=Math.max(2,s*.06);ctx.setLineDash([s*.14,s*.1]);ctx.lineDashOffset=-clock*20;ctx.strokeRect(wx(tx)+2,wy(ty)+2,s-4,s-4);ctx.setLineDash([]);}
  if(auto&&auto.mark){const [mx2,my2]=auto.mark;ctx.strokeStyle='rgba(255,248,220,.8)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(wx(mx2+.5),wy(my2+.72),s*.3,s*.15,0,0,7);ctx.stroke();}
  drawParts();
  if(S.t>=1080||S.t<360){ctx.fillStyle='rgba(30,22,40,.28)';ctx.fillRect(0,0,vw,vh);ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(wx(8),wy(4),s,wx(8),wy(4),s*7);g.addColorStop(0,'rgba(255,190,110,.25)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,vw,vh);ctx.globalCompositeOperation='source-over';}
}
function furnShop(){if(!unl('furn')&&!Object.keys(S.furn||{}).length)return'';return'<div class="sub">เฟอร์นิเจอร์ในบ้าน · ส่งถึงบ้านทันที</div>'+Object.keys(FURN).map(k=>{const F=FURN[k],own=has(k),ok=!own&&S.money>=F.p&&S.mat.wood>=F.wood&&(!F.need||F.need());
  return`<div class="need"><span>${sprOk('h_'+k)?`<span style="display:inline-block;width:26px;height:26px;vertical-align:middle;${sprBg('h_'+k,26,26)}"></span>`:''}<b>${F.n}</b> · ${own?'มีแล้ว':`฿${F.p}${F.wood?` · ไม้ ${F.wood}`:''}`}<br><small>${F.need&&!F.need()?F.why:F.d}</small></span>${own?'':`<button class="btn ghost" data-furn="${k}" ${ok?'':'disabled'}>สั่งทำ</button>`}</div>`;}).join('');}

// ---------- pests: crows by day, rats & boars by night; pets help ----------
const petHelp=kind=>S.pet&&S.pet.kind===kind&&(S.pet.love||0)>=3;
const scareCover=(x,y)=>{for(const k in S.decos)if(S.decos[k]==='scare'){const [a,b]=k.split(',').map(Number);if(Math.max(Math.abs(a-x),Math.abs(b-y))<=4)return true;}return false;};
function fieldCrops(){const out=[];for(const k in S.plots){const p=S.plots[k],[x,y]=k.split(',').map(Number);if(p.c&&!p.dead&&!inGH(x,y)&&!scareCover(x,y))out.push([x,y,k]);}return out;}
function crowTick(dt){if(!S.crows)S.crows=[];
  if(S.crowDay!==S.day&&S.t>=450&&S.t<600){S.crowDay=S.day;const L=fieldCrops();
    if(S.day>=4&&!S.rain&&L.length>=4&&Math.random()<.45){const n=1+Math.floor(Math.random()*Math.min(3,L.length/4));
      for(let i=0;i<n;i++){const [x,y,k]=L.splice(Math.floor(Math.random()*L.length),1)[0];S.crows.push({k,x:x+.5,y:y+.55,fx:x+7,fy:y-6,st:'in',t:0,peck:0});}}}
  for(let i=S.crows.length-1;i>=0;i--){const c=S.crows[i];c.t+=dt;
    if(c.st==='in'){if(c.t>2){c.st='peck';c.t=0;}continue;}
    if(c.st==='out'){c.fx+=dt*5;c.fy-=dt*4;if(c.t>2.2)S.crows.splice(i,1);continue;}
    c.peck+=dt;const p=S.plots[c.k];
    if(!p||!p.c){crowFly(c);continue;}
    if(scene==='farm'&&Math.hypot(S.px-c.x,S.py-c.y)<1.6){crowFly(c);xp('farm',1);pop(c.x,c.y-.8,'ชู่ว!','#fff');if(!S.tips||!S.tips.crow)tip('crow','ไล่กาสำเร็จ! วางหุ่นไล่กา (ซื้อที่โรงไม้ช่างเอก) กันกาได้รัศมี 4 ช่อง หรือเลี้ยงหมาให้สนิท 3 หัวใจ มันจะช่วยเห่าไล่');continue;}
    if(petHelp('dog')&&c.peck>4){crowFly(c);if(scene==='farm')pop(c.x,c.y-.8,`โฮ่ง! ${S.pet.name}ไล่กา`,'#ffe07a');continue;}
    if(S.t>=720){const [x,y]=c.k.split(',').map(Number);toast(`กากินผัก${CROPS[p.c].n}ไป 1 แปลง! ลองวางหุ่นไล่กา`);S.plots[c.k]={c:null,age:0,w:false};crowFly(c);}}
  if(S.crows.some(c=>c.st==='peck')&&scene==='farm'&&(!S.tips||!S.tips.crow0))tip('crow0','มีกามาจิกกินผักในแปลง! เดินเข้าไปใกล้ๆ เพื่อไล่ ถ้าปล่อยไว้ถึงเที่ยง ผักจะโดนกินหมด');}
function crowFly(c){c.st='out';c.t=0;c.fx=c.x;c.fy=c.y;if(scene==='farm')sfx('ui');}
function drawCrow(c){const s=TS,fly=c.st!=='peck',x=c.st==='in'?c.fx+(c.x-c.fx)*Math.min(1,c.t/2):c.st==='out'?c.fx:c.x,y=c.st==='in'?c.fy+(c.y-c.fy)*Math.min(1,c.t/2):c.st==='out'?c.fy:c.y;
  const X=wx(x),Y=wy(y),bob=fly?Math.sin(clock*18)*s*.06:Math.abs(Math.sin(clock*6+c.x))*s*.05;
  if(!fly)groundShadow(X,Y+s*.08,s*.2,s*.05);
  if(sprAt(fly?'x_crow1':'x_crow0',X,Y+s*.1-bob,s*(fly?.8:.62),c.st==='out',s*(fly?.62:.5)))return;
  ctx.fillStyle='#1d1d24';ctx.beginPath();ctx.ellipse(X,Y-s*.12-bob,s*.2,s*.13,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(X+s*.16,Y-s*.24-bob+(fly?0:s*.08),s*.09,0,7);ctx.fill();
  ctx.fillStyle='#e0b040';ctx.beginPath();ctx.moveTo(X+s*.24,Y-s*.25-bob+(fly?0:s*.08));ctx.lineTo(X+s*.36,Y-s*.2-bob+(fly?0:s*.1));ctx.lineTo(X+s*.24,Y-s*.19-bob+(fly?0:s*.08));ctx.fill();
  if(fly){ctx.fillStyle='#2a2a33';const w=Math.sin(clock*20)*s*.2;ctx.beginPath();ctx.ellipse(X-s*.05,Y-s*.2-bob-w*.5,s*.22,s*.06,-.4,0,7);ctx.fill();}}
const sprIco=(k,z=28)=>sprOk(k)?`<span style="display:inline-block;width:${z}px;height:${z}px;vertical-align:middle;margin-right:4px;${sprBg(k,z,z)}"></span>`:'';
function nightPests(){let m='';const P=S.pet;
  if(S.day>=6&&Math.random()<.18){if(petHelp('cat'))m+=`<p>${sprIco('x_rat')}เมื่อคืน${P.name}จับหนูที่แอบเข้ามาในยุ้งได้ ของในยุ้งปลอดภัย</p>`;
    else if(S.hay>=2){const n=Math.min(3,S.hay);S.hay-=n;m+=`<p>${sprIco('x_rat')}หนูแอบกินหญ้าแห้งไป ${n} ฟ่อน${P&&P.kind==='cat'?` (${P.name}ยังไม่สนิทพอจะช่วยจับ)`:' · เลี้ยงแมวให้สนิทจะช่วยจับหนูได้'}</p>`;}
    else{const k=Object.keys(S.seeds).find(k=>S.seeds[k]>=2);if(k){S.seeds[k]-=2;m+=`<p>${sprIco('x_rat')}หนูแทะเมล็ด${CROPS[k].n}ไป 2 ถุง</p>`;}}}
  if(S.land&&S.day>=8){const L=Object.keys(S.plots).filter(k=>{const [x,y]=k.split(',').map(Number),p=S.plots[k];return p.c&&!p.dead&&inExp(x,y)&&!scareCover(x,y);});
    if(L.length>=3&&Math.random()<.12){if(petHelp('dog'))m+=`<p>${sprIco('x_boar')}เมื่อคืน${P.name}เห่าไล่หมูป่าที่มาคุ้ยแปลงด้านใต้ ผักรอดหมด</p>`;
      else{let n=0;for(const k of L.slice(0,2)){S.plots[k]={c:null,age:0,w:false};n++;}m+=`<p>${sprIco('x_boar')}หมูป่ามาคุ้ยแปลงด้านใต้ ผักเสียหาย ${n} แปลง · หุ่นไล่กาหรือหมาที่สนิทช่วยได้</p>`;}}}
  return m;}

// ---------- fish farm ----------
const FISHF={nil:{n:'ลูกปลานิล',out:'nil',p:200,days:6,yield:12,extra:'chon'},kung:{n:'ลูกกุ้งก้ามกราม',out:'kung',p:600,days:8,yield:8}},FEED_PRICE=10;
function openPond(msg){const F=S.fp;
  const st=!F?'<p>บ่อว่างอยู่ ปล่อยลูกปลาหรือลูกกุ้งลงบ่อได้เลย</p>'+Object.keys(FISHF).map(k=>{const X=FISHF[k];return`<div class="need"><span>${icon('fry',28)}<b>${X.n}</b> · ฿${X.p}<br><small>ให้อาหาร ${X.days} วัน แล้วจับได้${ITEMS[X.out].n} ${X.yield} ตัว${X.extra?' (บางทีมีปลาช่อนติดมา)':''}</small></span><button class="btn" data-fry="${k}" ${S.money<X.p?'disabled':''}>ปล่อยลงบ่อ</button></div>`;}).join('')
    :F.ready?`<div class="req"><b>${ITEMS[FISHF[F.k].out].n}โตเต็มที่แล้ว!</b> จับขึ้นมาได้เลย</div>`
    :`<div class="req">เลี้ยง${ITEMS[FISHF[F.k].out].n}อยู่ · โตแล้ว ${F.g}/${FISHF[F.k].days} วัน${F.miss?` · ลืมให้อาหาร ${F.miss} วัน`:' · ให้อาหารครบทุกวัน ได้โบนัส +2 ตัว'}<br>${F.fed?'ให้อาหารแล้ววันนี้':'วันนี้ยังไม่ได้ให้อาหาร'}</div>`;
  showModal(`<h2>บ่อเลี้ยงปลา</h2>${msg?`<p class="req">${msg}</p>`:''}${st}
    <div class="sub">อาหารปลา (มี ${S.inv.ffeed||0} ถุง) · ใช้วันละถุง</div><div class="need"><span>${icon('ffeed',22)}ถุงละ ฿${FEED_PRICE}</span><button class="btn ghost" data-ffeed="5" ${S.money<FEED_PRICE*5?'disabled':''}>+5</button><button class="btn ghost" data-ffeed="10" ${S.money<FEED_PRICE*10?'disabled':''}>+10</button></div>
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);}
function pondContext(){const F=S.fp;
  if(!F)return{l:'บ่อปลา',h:'บ่อว่าง · ปล่อยลูกปลาหรือลูกกุ้ง',fn:()=>{sfx('ui');openPond();}};
  if(F.ready)return{l:'จับปลา',h:`${ITEMS[FISHF[F.k].out].n}โตเต็มที่แล้ว`,cost:3,fn:harvestPond};
  if(F.fed)return{l:'บ่อปลา',h:`ให้อาหารแล้ว · อีก ${FISHF[F.k].days-F.g} วันจับได้`,fn:()=>{sfx('ui');openPond();}};
  if(!(S.inv.ffeed>0))return{l:'บ่อปลา',h:'ไม่มีอาหารปลา · ซื้อได้ที่บ่อ',fn:()=>{sfx('ui');openPond();}};
  return{l:'ให้อาหาร',h:`โปรยอาหารปลา (มี ${S.inv.ffeed} ถุง)`,fn:()=>{S.inv.ffeed--;F.fed=true;xp('fish',2);sfx('splash');for(let i=0;i<6;i++)parts.push({x:20.2+Math.random()*2.6,y:23.4+Math.random()*1.2,drop:true,t:0});pop(21,23.2,'ปลามารุมกินอาหาร','#bfe6ff');}};}
function harvestPond(){const F=S.fp,X=FISHF[F.k],n=X.yield+(F.miss?0:2)+(lvl('fish')>=5?1:0);gain(X.out,n);let ex='';if(X.extra){const m=1+Math.floor(Math.random()*2);gain(X.extra,m);ex=` และ${ITEMS[X.extra].n} ${m} ตัว`;}
  S.fp=null;stat('fishfarm');xp('fish',12);sfx('catch');showModal(`<h2>จับปลาในบ่อ</h2><p>ได้${ITEMS[X.out].n} ${n} ตัว${ex}</p><div class="row"><button class="btn" data-close>เยี่ยม</button></div>`);}
function pondDay(){const F=S.fp;if(!F||F.ready)return;if(F.fed){F.g++;if(F.g>=FISHF[F.k].days)F.ready=true;}else F.miss++;F.fed=false;}
function drawPond(){if(!S.built.fishpond)return;const s=TS,X=wx(19),Y=wy(23),F=S.fp;
  if(!sprAt('x_fishpond',X+s*2,Y+s*2.15,s*4.3,false,s*2.6)){ctx.fillStyle='#7a5a36';ctx.beginPath();ctx.roundRect(X+s*.02,Y+s*.05,s*3.96,s*1.92,s*.5);ctx.fill();ctx.fillStyle='#3f8fb0';ctx.beginPath();ctx.roundRect(X+s*.2,Y+s*.22,s*3.6,s*1.56,s*.4);ctx.fill();
    ctx.strokeStyle='rgba(220,245,255,.5)';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(X+s*(.6+i*1.1),Y+s*(.8+(i%2)*.4)+Math.sin(clock*2+i)*s*.04);ctx.lineTo(X+s*(1+i*1.1),Y+s*(.8+(i%2)*.4));ctx.stroke();}}
  if(F){ctx.fillStyle=F.k==='kung'?'rgba(230,120,90,.75)':'rgba(70,90,110,.7)';for(let i=0;i<(F.ready?7:3+Math.min(3,F.g));i++){const a=clock*(.6+i*.13)+i*2,fx=X+s*2+Math.cos(a)*s*1.3,fy=Y+s*1+Math.sin(a*1.3)*s*.45;ctx.beginPath();ctx.moveTo(fx,fy-s*.1);ctx.lineTo(fx+s*.08,fy+s*.04);ctx.lineTo(fx-s*.08,fy+s*.04);ctx.fill();}
    if(F.ready||!F.fed)questMark(X+s*2,Y-s*.1);}}

// ---------- weekly order from the city merchant ----------
const woWeek=()=>Math.floor((S.day-1)/7);
function trimQ(k){const qq=QK(k)?qOf(k):null;if(qq){qq[2]=Math.min(qq[2],S.prod[k]);qq[1]=Math.min(qq[1],S.prod[k]-qq[2]);}}
function woCheck(){const w=woWeek();if(S.wo&&S.wo.w===w)return;if(S.wo&&!S.wo.done)S.woStreak=0;
  const ok=k=>ITEMS[k]&&!k.startsWith('d_')&&!['ruby','emerald','pearl','lobster','buek','cavefish','mahseer','insee','guano','cu','ag','au'].includes(k)&&(!CROPS[k]||inSeason(k));
  let pool=Object.keys(S.col).filter(k=>S.col[k]>0&&ok(k));for(const k in CROPS)if(inSeason(k)&&!pool.includes(k))pool.push(k);
  const it={};while(Object.keys(it).length<3&&pool.length){const k=pool.splice(Math.floor(Math.random()*pool.length),1)[0];const v=ITEMS[k].v;it[k]=v<80?4+Math.floor(Math.random()*4):v<200?2+Math.floor(Math.random()*3):1+Math.floor(Math.random()*2);}
  const base=Object.keys(it).reduce((a,k)=>a+ITEMS[k].v*it[k],0),r=Math.round(base*1.8*(1+Math.min(.5,(S.woStreak||0)*.1))/10)*10;
  S.wo={w,it,r,done:false};}
function woHtml(){if(!unl('merchant'))return'';woCheck();const W=S.wo,left=7-((S.day-1)%7);
  if(W.done)return`<div class="req"><b>ออเดอร์พ่อค้าเสือชาย</b> ส่งครบแล้วสัปดาห์นี้ ขอบคุณครับ! สัปดาห์หน้ามีออเดอร์ใหม่${S.woStreak?` · ส่งติดต่อกัน ${S.woStreak} สัปดาห์`:''}</div>`;
  const all=Object.keys(W.it).every(k=>S.prod[k]>=W.it[k]);
  return`<div class="req">${sprIco('pt_merchant_0',40)}<b>ออเดอร์พ่อค้าเสือชาย</b> · เหลือ ${left} วัน · ค่าตอบแทน ฿${W.r.toLocaleString('en-US')}${S.woStreak?` (โบนัสลูกค้าประจำ +${Math.min(50,S.woStreak*10)}%)`:''}
    ${Object.keys(W.it).map(k=>`<div class="need" style="padding:2px 0"><span>${ic(k,18)}${ITEMS[k].n} ×${W.it[k]}</span><span style="flex:none;white-space:nowrap">มี ${S.prod[k]||0}</span></div>`).join('')}
    <div class="row" style="margin-top:6px"><button class="btn" data-wo ${all?'':'disabled'}>ส่งของให้พ่อค้า</button></div></div>`;}
function woDeliver(){const W=S.wo;if(!W||W.done||!Object.keys(W.it).every(k=>S.prod[k]>=W.it[k]))return;
  for(const k in W.it){S.prod[k]-=W.it[k];trimQ(k);}W.done=true;S.woStreak=(S.woStreak||0)+1;S.money+=W.r;earn('ออเดอร์พ่อค้า',W.r);stat('wo');sfx('upgrade');
  showModal(`<div class="npcHead"><h2>พ่อค้าเสือชาย</h2><small>พ่อค้าจากในเมือง</small></div><div class="talk">${face('merchant',1)}<p class="quote">“ของดีครบเลยครับ! ลูกค้าในเมืองชอบมาก สัปดาห์หน้าฝากด้วยนะ”</p></div><p>ได้ค่าตอบแทน ฿${W.r.toLocaleString('en-US')}${S.woStreak>1?` · ส่งติดต่อกัน ${S.woStreak} สัปดาห์ สัปดาห์หน้าได้โบนัสเพิ่ม`:''}</p><div class="row"><button class="btn" data-close>ยินดีครับ</button></div>`);}

// ---------- grandpa's relics ----------
const RELICS=[
  {id:'watch',n:'นาฬิกาพกคุณตา',hint:'ฝังอยู่ในที่ดินรกหลังไร่ ซื้อที่ดินแล้วลองหาดู',spot:{x:8,y:21,ok:()=>S.land},txt:'ขุดเจอกล่องสังกะสีเก่า ในนั้นมีนาฬิกาพกทองเหลือง หลังฝาสลักว่า “ทุกนาทีในไร่นี้มีค่า”'},
  {id:'photo',n:'รูปถ่ายเก่า',hint:'ลุงมีเก็บอะไรบางอย่างของคุณตาไว้ ลองสนิทกับลุงดู',txt:'ลุงมียื่นรูปถ่ายซีดๆ ให้ “รูปคุณตากับคุณยายตอนเพิ่งบุกเบิกไร่นี้ ลุงเก็บไว้ให้เอ็งนานแล้ว”'},
  {id:'khlui',n:'ขลุ่ยไม้ไผ่',hint:'ที่วัดเก่ามีของที่คุณตาเคยถวายไว้ บูรณะวัดก่อนนะ',spot:{x:11,y:4,ok:()=>S.proj.temple&&S.proj.temple.done},txt:'ใต้ต้นไม้หน้าวัดมีห่อผ้าแดง ข้างในเป็นขลุ่ยไม้ไผ่ที่คุณตาชอบเป่าตอนเย็นๆ'},
  {id:'diary',n:'สมุดบันทึกคุณตา',hint:'ลึกลงไปในเหมือง คุณตาเคยลงไปถึงชั้นห้า',txt:'ในซอกหินชั้น 5 มีสมุดหนังเก่าห่อพลาสติกไว้ เป็นบันทึกการปลูกผักของคุณตาทุกฤดู'},
  {id:'medal',n:'เหรียญชาวนาดีเด่น',hint:'คุณตาชอบไปนั่งพักที่น้ำตก ไปเที่ยวบ่อยๆ อาจเจอ',area:{id:'falls',x:24,y:15,ok:()=>((S.trips&&S.trips.falls)||0)>=2},txt:'ริมลานหินข้างน้ำตกมีเหรียญทองแดงจมดินอยู่ “รางวัลชาวนาดีเด่น” ชื่อคุณตาสลักอยู่ด้านหลัง'}];
function relicSpot(tx,ty){const R=S.relics||{};return RELICS.find(r=>r.spot&&!R[r.id]&&r.spot.x===tx&&r.spot.y===ty&&r.spot.ok());}
function areaRelic(tx,ty){const R=S.relics||{};return RELICS.find(r=>r.area&&!R[r.id]&&r.area.id===S.area&&r.area.x===tx&&r.area.y===ty&&r.area.ok());}
function giveRelic(id){S.relics=S.relics||{};if(S.relics[id])return;const r=RELICS.find(x=>x.id===id);S.relics[id]=S.day;stat('relic');sfx('upgrade');
  berryQ.push({relic:r,at:performance.now()});if(RELICS.every(x=>S.relics[x.id])&&!S.perks.grandpa)berryQ.push({end:true,at:performance.now()});}
function relicModal(b){if(b.end){S.perks.grandpa=true;S.money+=5000;earn('ของขวัญคุณตา',5000);S.maxStam+=20;
    return`<h2>จดหมายจากคุณตา</h2><p>ในสมุดบันทึกมีซองจดหมายสอดอยู่ เขียนถึงหลานคนเดียว</p><p class="quote">“ถ้าหลานเก็บของของตาได้ครบ แปลว่าหลานรู้จักไร่นี้ หมู่บ้านนี้ และทุกคนที่นี่ดีพอๆ กับตาแล้ว ไร่สุขใจเป็นของหลานเต็มตัว ดูแลมันด้วยหัวใจนะ”</p><p>ใต้ซองมีเงินเก็บ ฿5,000 · ความอบอุ่นใจทำให้แรงสูงสุด +20 ถาวร</p><div class="row"><button class="btn" data-close>ขอบคุณครับคุณตา</button></div>`;}
  const r=b.relic,n=Object.keys(S.relics).length;
  return`<h2>เจอของเก่าคุณตา!</h2><div class="talk"><span class="pt" style="display:flex;align-items:center;justify-content:center">${icon('r_'+r.id,64)}</span><div><p><b>${r.n}</b></p><p>${r.txt}</p></div></div><div class="lv">ของเก่าคุณตา ${n}/${RELICS.length}${n<RELICS.length?' · ดูคำใบ้ในสมุดสะสม':''}</div><div class="row"><button class="btn" data-close>เก็บไว้อย่างดี</button></div>`;}
function relicBook(){const R=S.relics||{},n=Object.keys(R).length;
  return`<div class="sub">ของเก่าคุณตา ${n}/${RELICS.length} · ครบแล้วมีเรื่องพิเศษ</div><div class="book">`+RELICS.map(r=>R[r.id]?`<div class="got">${icon('r_'+r.id,30)}<b>${r.n}</b>เจอแล้ว</div>`:`<div><b>???</b><small>${r.hint}</small></div>`).join('')+'</div>';}
function drawGlint(X,Y,s){const a=.5+Math.sin(clock*5)*.5;ctx.fillStyle=`rgba(255,240,170,${.25+a*.35})`;ctx.beginPath();ctx.arc(X,Y,s*.22,0,7);ctx.fill();ctx.strokeStyle=`rgba(255,255,255,${.5+a*.5})`;ctx.lineWidth=2;const r=s*(.18+a*.12);ctx.beginPath();ctx.moveTo(X-r,Y);ctx.lineTo(X+r,Y);ctx.moveTo(X,Y-r);ctx.lineTo(X,Y+r);ctx.stroke();}
function openCarpenter(){
  let rows='';
  for(const id in BUILDS){const B=BUILDS[id],done=S.built[id],busy=S.build&&S.build.id===id;if(id==='fishpond'&&!done&&!unl('fishpond'))continue;
    const ok=!S.build&&S.money>=bcost(B)&&S.mat.wood>=B.wood&&S.mat.stone>=B.stone;
    const cost=`฿${bcost(B)} · ไม้ ${B.wood}${B.stone?` · หิน ${B.stone}`:''} · ${B.days} วัน`;
    rows+=`<div class="proj ${done?'done':''}"><h3>${B.n}</h3><div>${B.d}</div>
      <div class="need"><span>${done?'สร้างเสร็จแล้ว':busy?`กำลังสร้าง อีก ${S.build.days} วัน`:cost}</span>
      ${done||busy?'':`<button class="btn" data-build="${id}" ${ok?'':'disabled'}>สั่งสร้าง</button>`}</div></div>`;}
  let mats='';for(const k in MATS)mats+=`<div class="need"><span>${MATS[k].n} (มี ${S.mat[k]}) · ฿${MATS[k].p}</span>
    <button class="btn ghost" data-mat="${k}:5" ${S.money<MATS[k].p*5?'disabled':''}>+5</button><button class="btn ghost" data-mat="${k}:10" ${S.money<MATS[k].p*10?'disabled':''}>+10</button></div>`;
  const FS=furnShop();if(MTAB.carp==='home'&&!FS)MTAB.carp='build';const CT=MTAB.carp;
  showModal(`<h2>โรงไม้ช่างเอก</h2><p>เงิน ฿${S.money} · ไม้ ${S.mat.wood} · หิน ${S.mat.stone}${S.build?' · สร้างได้ทีละหลัง':''}</p>
    ${mtabs('carp',[['build','สร้าง'],...(FS?[['home','เฟอร์นิเจอร์']]:[]),['mat','วัสดุ'],['sprk','สปริงเกอร์'],['deco','ตกแต่ง']])}
    ${CT==='build'?rows:''}${CT==='home'?FS:''}${CT==='mat'?`<div class="sub">ซื้อวัสดุ</div>${mats}`:''}${CT==='sprk'?`    <div class="sub">ประกอบสปริงเกอร์ · วางบนแปลงดิน รดน้ำให้ทุกเช้า</div>${Object.keys(SPRK).map(k=>{const R=SPRK[k],ok=Object.keys(R.need).every(m=>haveMat(m)>=R.need[m]);
      return `<div class="need"><span>${decoIcon(k)}<b>${R.n}</b> · ${R.r}<br><small>${Object.keys(R.need).map(m=>`${m==='stone'?'หิน':ITEMS[m].n} ${haveMat(m)}/${R.need[m]}`).join(' · ')} · มี ${S.decoInv[k]||0}</small></span><button class="btn" data-craft="${k}" ${ok?'':'disabled'}>ประกอบ</button></div>`;}).join('')}
`:''}${CT==='deco'?`    <div class="sub">ของตกแต่งไร่ · ซื้อแล้ววางได้จากกระเป๋า</div>${Object.keys(DECOS).filter(k=>!DECOS[k].craft).map(k=>`<div class="need"><span>${decoIcon(k)}<b>${DECOS[k].n}</b> ฿${DECOS[k].p} · มี ${S.decoInv[k]||0}</span><button class="btn ghost" data-deco="${k}:1" ${S.money<DECOS[k].p?'disabled':''}>+1</button><button class="btn ghost" data-deco="${k}:5" ${S.money<DECOS[k].p*5?'disabled':''}>+5</button></div>`).join('')}
`:''}
    <div class="row">${festActive()?'':'<button class="btn" data-npc="ek">คุยกับช่างเอก</button>'}<button class="btn ghost" data-close>ปิด</button></div>`);
}
const reqName=k=>k==='money'?'เงิน':MATS[k]?MATS[k].n:ITEMS[k].n;
const reqHave=k=>k==='money'?S.money:MATS[k]?S.mat[k]:S.prod[k];
function donate(pid,k){
  const P=PROJECTS[pid],st=S.proj[pid];if(st.done||!(k in P.need))return;
  const left=P.need[k]-(st.got[k]||0),amt=Math.min(left,reqHave(k));if(amt<=0)return;
  if(k==='money')S.money-=amt;else if(MATS[k])S.mat[k]-=amt;else S.prod[k]-=amt;
  st.got[k]=(st.got[k]||0)+amt;sfx('coin');
  if(Object.keys(P.need).every(q=>(st.got[q]||0)>=P.need[q])){st.done=true;
    if(pid==='temple')S.maxStam+=20;
    for(const id in S.npc)addH(id,1);
    applyUnlocks();sfx('upgrade');toast(`${P.n}สำเร็จ! ${P.reward}`);}
  save();openBoard();
}
function jaOrder(){const pool=['kb','ch','egg','corn','rice','cab','nil','chon','bamboo','milk','straw','wm','taphien','mush'].filter(k=>!CROPS[k]||inSeason(k));
  const it={};while(Object.keys(it).length<2){const k=pool[Math.floor(Math.random()*pool.length)];if(!it[k])it[k]=ITEMS[k].v>=100?1+Math.floor(Math.random()*2):2+Math.floor(Math.random()*3);}
  const r=Math.round(Object.keys(it).reduce((a,k)=>a+ITEMS[k].v*it[k],0)*1.6/10)*10;return{it,r,done:false};}
const jaStars=()=>Math.min(5,Math.floor((S.ja.biz||0)/3));
function openResto(msg){
  const J=S.ja,here_=folks.ja&&!folks.ja.hidden&&S.t<1110,menu=[0,1,2].map(i=>J.menu[(S.day+i)%J.menu.length]).filter((k,i,a)=>a.indexOf(k)===i);
  const buy=menu.map(k=>{const p=Math.round(ITEMS[k].v*1.1);return `<div class="need"><span>${ic(k,24)}<b>${ITEMS[k].n}</b> · แรง +${ITEMS[k].e} · ฿${p}</span><button class="btn" data-rbuy="${k}" ${S.money<p?'disabled':''}>ซื้อ</button></div>`;}).join('');
  const o=J.order;const order=!o?'':o.done?'<div class="req">ส่งออเดอร์วันนี้แล้ว ขอบใจนะ!</div>'
    :`<div class="req"><b>ออเดอร์วัตถุดิบวันนี้</b> · ค่าตอบแทน ฿${o.r} + ใจจ๋า${Object.keys(o.it).map(k=>`<div class="need" style="padding:2px 0"><span>${ic(k,18)}${ITEMS[k].n} ×${o.it[k]}</span><span style="flex:none;white-space:nowrap">มี ${S.prod[k]}</span></div>`).join('')}
      <div class="row" style="margin-top:6px"><button class="btn" data-rorder ${hasAll(o.it)?'':'disabled'}>ส่งวัตถุดิบ</button></div></div>`;
  const dishes=Object.keys(ITEMS).filter(k=>k.startsWith('d_')&&S.prod[k]>0);
  const sell=dishes.length?`<div class="sub">จ๋ารับซื้ออาหาร (ราคาตลาด +30%)</div>`+dishes.map(k=>`<div class="need"><span>${ic(k,22)}${ITEMS[k].n} ×${S.prod[k]} · ชิ้นละ ฿${Math.round(unitPrice(k)*1.3)}</span><button class="btn ghost" data-rsell="${k}">ขาย 1</button></div>`).join(''):'';
  const cand=S.known.filter(k=>!J.menu.includes(k));
  const idea=S.npc.ja.h>=3&&cand.length?`<div class="sub">แนะนำเมนูใหม่ให้ร้าน (ต้องมีอาหารนั้น 1 จานให้จ๋าชิม)</div><div class="giftRow">${cand.map(k=>`<button class="btn ghost" data-ridea="${k}" ${S.prod[k]>0?'':'disabled'}>${ic(k,18)}${ITEMS[k].n}</button>`).join('')}</div>`:S.npc.ja.h<3?'<div class="lv">สนิทกับจ๋า 3 หัวใจ จะแนะนำเมนูใหม่ให้ร้านได้</div>':'';
  showModal(`<div class="npcHead"><h2>ร้านข้าวแกงจ๋า</h2><small>ร้าน ${'★'.repeat(jaStars())}${'☆'.repeat(5-jaStars())} · ${J.menu.length} เมนู</small></div>
    ${msg?`<div class="talk">${face('ja',1)}<p class="quote">“${msg}”</p></div>`:''}<div class="sub">เมนูวันนี้</div>${buy}${order}${sell}${idea}
    <div class="row">${here_?'<button class="btn ghost" data-npc="ja">คุยกับจ๋า</button>':''}<button class="btn ghost" data-close>ปิด</button></div>`);
}
function openBoard(){
  let html='';
  for(const pid in PROJECTS){const P=PROJECTS[pid],st=S.proj[pid];
    const tot=Object.values(P.need).reduce((a,b)=>a+b,0),got=Object.keys(P.need).reduce((a,k)=>a+Math.min(P.need[k],st.got[k]||0),0);
    html+=`<div class="proj ${st.done?'done':''}"><h3>${P.n}${st.done?' · สำเร็จแล้ว':''}</h3><div class="lv">รางวัล: ${P.reward}</div>
      ${st.done?'':Object.keys(P.need).map(k=>{const g=st.got[k]||0,n=P.need[k],h=reqHave(k);
        return `<div class="need"><span>${k==='money'?'':ic(k)}${reqName(k)} ${g}/${n} (มี ${h})</span>${g>=n?'<span style="flex:none">ครบ</span>':`<button class="btn" data-donate="${pid}:${k}" ${h<=0?'disabled':''}>บริจาค</button>`}</div>`;}).join('')}
      <div class="meter"><i style="width:${Math.round(got/tot*100)}%"></i></div></div>`;}
  const j=S.job;const job=j?`<div class="proj ${j.done?'done':''}"><h3>งานรับจ้างวันนี้</h3>${j.done?'ส่งงานแล้ว รอพรุ่งนี้มีงานใหม่':`<div class="need"><span>${j.who}อยากได้ ${ic(j.k)}<b>${ITEMS[j.k].n} ×${j.q}</b> · ค่าจ้าง ฿${j.r} (มี ${S.prod[j.k]})</span><button class="btn" data-job ${S.prod[j.k]<j.q?'disabled':''}>ส่งงาน</button></div>`}</div>`:'';
  showModal(`<h2>กระดานหมู่บ้าน</h2>${job}<div class="sub">พัฒนาหมู่บ้าน · ทยอยบริจาคได้เรื่อยๆ</div>${html}
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
function openHouse(msg){
  let cook='';
  if(S.built.kitchen){
    cook='<div class="sub">ครัวไทย</div>'+Object.keys(DISHES).map(id=>{const D=DISHES[id],I=ITEMS[id];
      if(!S.known.includes(id)&&D.story)return `<div class="need"><span><b>สูตรลับของคุณตา ???</b> · ตามหาหน้าสูตรในเนื้อเรื่อง (${S.story.pages||0}/4)</span></div>`;
      if(!S.known.includes(id)&&D.daed)return `<div class="need"><span><b>สูตรอาหารทะเล ???</b> · ซื้อสูตรจากป้าแดดที่ชายหาด</span></div>`;
      if(!S.known.includes(id))return `<div class="need"><span><b>สูตรลับ ???</b> · เรียนจาก${NPCS[D.teach].n}เมื่อสนิท 4 หัวใจ</span></div>`;
      return `<div class="need"><span>${ic(id,26)}<b>${I.n}</b> · ${inName(D.in)}<br><small>แรง +${I.e} · ขาย ฿${I.v} · มี ${S.prod[id]}</small></span><button class="btn" data-cook="${id}" ${hasAll(D.in)?'':'disabled'}>ทำ</button></div>`;}).join('');
  }else cook='<p class="lv">สร้างครัวไทยกับช่างเอก เพื่อทำอาหารที่ฟื้นแรงและขายได้ราคาดี</p>';
  showModal(`<h2>บ้านของฉัน</h2>${msg?`<p class="req">${msg}</p>`:''}<p>แรง ${Math.round(S.stam)}/${S.maxStam} · ${String(Math.floor(S.t/60)).padStart(2,'0')}:${String(Math.floor(S.t%60/10)*10).padStart(2,'0')}</p>
    ${cook}
    <div class="row"><button class="btn" data-sleep>นอน (จบวัน)</button><button class="btn ghost" data-eatopen>กินอาหาร</button><button class="btn ghost" data-close>ออกไปข้างนอก</button></div>`);
  const eb=panel.querySelector('[data-eatopen]');if(eb)eb.addEventListener('click',openEat);
}
function openEat(){
  const own=Object.keys(ITEMS).filter(k=>ITEMS[k].e&&S.prod[k]>0);
  showModal(`<h2>กินอาหาร</h2><p>แรง ${Math.round(S.stam)}/${S.maxStam}</p>
    ${own.length?own.map(k=>`<div class="need"><span>${ic(k,26)}<b>${ITEMS[k].n}</b> ×${S.prod[k]} · แรง +${ITEMS[k].e}</span><button class="btn" data-eat="${k}" ${S.stam>=S.maxStam?'disabled':''}>กิน</button></div>`).join('')
      :'<p>ยังไม่มีอาหาร ทำได้ที่ครัวในบ้าน</p>'}
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
function openMachine(id){
  const B=BUILDS[id],M=MACHINES[id];
  showModal(`<h2>${B.n}</h2><p>${B.d}</p>`+M.recipes.map((r,i)=>`<div class="need"><span>${ic(r.out,26)}<b>${ITEMS[r.out].n}</b> · ${inName(r.in)||'ไม่ต้องใส่อะไร'} · ${r.days} วัน<br><small>ขาย ฿${ITEMS[r.out].v}</small></span><button class="btn" data-proc="${id}:${i}" ${hasAll(r.in)?'':'disabled'}>เริ่มทำ</button></div>`).join('')+
    `<div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
function openStall(){
  if(!S.stall)S.stall={items:[],earned:0,tm:0};
  const hot=S.hot.map(k=>ITEMS[k].n).join(', ');
  const placed=S.stall.items.map((it,i)=>`<div class="need"><span>${ic(it.k)}<b>${ITEMS[it.k].n}</b> ×${it.n} · ฿${stallPrice(it.k)}/ชิ้น</span><button class="btn ghost" data-unstall="${i}">เก็บคืน</button></div>`).join('')||'<p class="lv">ยังไม่ได้วางของ</p>';
  const bag=Object.keys(ITEMS).filter(k=>S.prod[k]>0);
  const opts=S.stall.items.length>=6?'<p class="lv">แผงเต็มแล้ว (6 อย่าง)</p>':bag.map(k=>`<div class="need"><span>${ic(k)}${ITEMS[k].n} ×${S.prod[k]}${S.hot.includes(k)?' · <b>ขายดี!</b>':''} · ฿${stallPrice(k)} ${trend(k)}</span><button class="btn ghost" data-stall="${k}">วางขาย</button></div>`).join('')||'<p class="lv">ตะกร้าว่าง</p>';
  showModal(`<h2>แผงตลาดนัดของฉัน</h2><p>ตลาดเปิดถึง 15:00 · ขายได้แล้ว <b>฿${S.stall.earned}</b></p>
    <p class="req">ของขายดีวันนี้: ${hot} (ราคา +30% ขายไวขึ้น)</p>
    <div class="sub">บนแผง</div>${placed}
    <div class="sub">วางของขาย · ราคาตลาดวันนี้ +20% (ของขายดี +30% อีก)</div>${opts}
    <p class="lv">ของที่ขายไม่หมดจะคืนเข้าตะกร้าตอนตลาดปิด</p>
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
$('stamBtn').addEventListener('click',()=>{sfx('ui');openEat();});
$('stamBtn').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEat();}});
function openSaveCode(){
  let code='';try{code=btoa(unescape(encodeURIComponent(JSON.stringify(S))));}catch(e){}
  showModal(`<h2>สำรองและโหลดเซฟ</h2><p>คัดลอกรหัสด้านล่างเก็บไว้ในโน้ตหรือส่งเข้าแชตตัวเอง แล้ววางในอีกเครื่องเพื่อเล่นต่อได้</p>
    <textarea id="saveOut" readonly style="width:100%;height:70px;font:12px monospace;border:2px solid var(--wood);border-radius:8px;padding:6px;box-sizing:border-box">${code}</textarea>
    <div class="row"><button class="btn" data-copysave>คัดลอกรหัสเซฟ</button></div>
    <div class="sub">โหลดเซฟจากรหัส (จะแทนที่เซฟปัจจุบัน)</div>
    <textarea id="saveIn" style="width:100%;height:60px;font:12px monospace;border:2px solid var(--wood);border-radius:8px;padding:6px;box-sizing:border-box" placeholder="วางรหัสเซฟตรงนี้"></textarea>
    <p id="saveErr" style="color:var(--berry)"></p>
    <div class="row"><button class="btn" data-loadsave>โหลดเซฟ</button><button class="btn ghost" data-close>ปิด</button></div>`);
}
function openMap(){
  const w=Math.min(innerWidth*.92,520)-48,sc=Math.max(5,Math.floor(w/W));
  showModal(`<h2>แผนที่หมู่บ้าน</h2><div style="overflow-x:auto"><canvas id="mapCv" width="${W*sc}" height="${H*sc}" style="display:block;max-width:none;border-radius:8px;border:3px solid var(--wood)"></canvas></div>
    <p class="lv">จุดสีน้ำเงินคือคุณ · จุดสีอื่นคือชาวบ้านที่ออกมาข้างนอก</p><div class="row"><button class="btn ghost" data-book>กลับไปสมุด</button><button class="btn ghost" data-close>ปิด</button></div>`);
  const c=$('mapCv').getContext('2d');
  const col={g:'#7bb058',m:'#8fbf6a',F:'#4f7a3a',s:'#8a6440',y:'#c9a877',p:'#dcc596',z:'#d9cfbb',w:'#3d8ec2',j:'#8a5a2b',B:'#3d8ec2',t:'#2f6a2a',f:'#b8834d',L:'#b8834d',K:'#7d7068',C:'#1a120c'};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){c.fillStyle=col[map[y][x]]||'#a8362a';c.fillRect(x*sc,y*sc,sc,sc);}
  c.font=`700 ${Math.max(10,sc*1.1)}px Mali, sans-serif`;c.textAlign='center';c.lineWidth=3;
  [['บ้าน',17.5,2.6],['ไร่',6.5,10.5],['บ่อ',4.5,3.4],['วัด',11.5,2.2],['ศาลา',23,2],['ร้าน',22,7],['ช่างไม้',21.5,10],['เล้าไก่',21.5,13.8],['คอกวัว',29.5,13.8],['หมู่บ้าน',30.5,2.3],['โรงเรียน',39,2.2],['อนามัย',38,11.3],['ที่ดินหลังไร่',8.5,21.5],['โรงเรือน',21,20],['ทุ่ง',31,21],...(S.town&&S.town.ja?[['ร้านจ๋า',29.5,7.2]]:[]),...(S.town&&S.town.mint?[['บ้านมิ้นท์',33.5,19.6]]:[]),['ป่า',38,22.5],['เหมือง',41.5,21.4]].forEach(([t,x,y])=>{c.strokeStyle='#46290f';c.strokeText(t,x*sc,y*sc);c.fillStyle='#f7ecd2';c.fillText(t,x*sc,y*sc);});
  const cols=['#d4453a','#d9709a','#e0a03a','#8a6a3a','#6fa8dc','#eef3f4','#c07ab8','#8fbf6a'];
  Object.keys(folks).forEach((id,i)=>{if(!canSee(id))return;const f=folks[id];c.fillStyle=cols[i%cols.length];c.strokeStyle='#46290f';c.lineWidth=1.5;c.beginPath();c.arc(f.x*sc,f.y*sc,sc*.7,0,7);c.fill();c.stroke();
    c.font=`700 ${Math.max(9,sc*.9)}px Mali, sans-serif`;c.fillStyle='#fff';c.lineWidth=2.5;c.strokeText(NPCS[id].n,f.x*sc,f.y*sc-sc);c.fillText(NPCS[id].n,f.x*sc,f.y*sc-sc);});
  const px=scene==='farm'?S.px:41.5,py=scene==='mine'?22.5:scene==='area'?6:S.py;c.fillStyle='#2f6fb0';c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(px*sc,py*sc,sc*.9,0,7);c.fill();c.stroke();
}
const BAG_TABS=[['all','ทั้งหมด'],['veg','ผัก'],['ani','สัตว์'],['fish','ปลา'],['food','อาหาร'],['mat','วัสดุ']];
const EXTRA={ffeed:'อาหารปลา',bait_worm:'ไส้เดือน',bait_shrimp:'กุ้งฝอย',bait_lure:'เหยื่อปลอม',wood:'ไม้',stone:'หิน',hay:'หญ้าแห้ง',jas:'พวงมาลัยมะลิ',ring:'แหวนทอง',kt:'กระทง',med:'ยารักษาสัตว์',brush:'แปรงขนสัตว์'};
function bagItems(){
  const out=[];for(const k in ITEMS)if(S.prod[k]>0)out.push([k,S.prod[k]]);
  if(S.mat.wood)out.push(['wood',S.mat.wood]);if(S.mat.stone)out.push(['stone',S.mat.stone]);if(S.hay)out.push(['hay',S.hay]);
  for(const d in S.decoInv)if(S.decoInv[d]>0)out.push(['deco_'+d,S.decoInv[d]]);
  if(S.inv.jas)out.push(['jas',S.inv.jas]);if(S.inv.med)out.push(['med',S.inv.med]);if(S.inv.brush)out.push(['brush',1]);if(S.inv.ring)out.push(['ring',S.inv.ring]);if(S.inv.ffeed)out.push(['ffeed',S.inv.ffeed]);for(const b in BAITS)if(S.inv[b]>0)out.push([b,S.inv[b]]);if(S.kt)out.push(['kt',S.kt]);
  return out;
}
const TRIP_TAB={kapong:'fish',insee:'fish',plathu:'fish',crab:'fish',squid:'fish',lobster:'fish',mahseer:'fish',oyster:'fish',seaweed:'veg',orchid:'veg',lingzhi:'veg',honeycomb:'veg',shell:'mat',pearl:'mat'};
function bagTab(k){if(EXTRA[k]||k==='guano'||k.startsWith('deco_'))return'mat';if(TRIP_TAB[k])return TRIP_TAB[k];const c=COL_CATS.find(c=>c.keys.includes(k));if(!c)return k.startsWith('d_')?'food':'mat';
  return{veg:'veg',veg2:'veg',wild:'veg',animal:'ani',fish:'fish',food:'food',proc:'food',mine:'mat'}[c.id]||'mat';}
let bagState={tab:'all',sel:null};
function openBag(){
  const items=bagItems().filter(([k])=>bagTab.call(null,k)&&(bagState.tab==='all'||bagTab(k)===bagState.tab));
  const slots=items.map(([k,n])=>{const dk=k.startsWith('deco_'),nm=dk?DECOS[k.slice(5)].n:ITEMS[k]?ITEMS[k].n:EXTRA[k],qq=QK(k)?qOf(k):null;
    return `<button type="button" class="slot ${bagState.sel===k?'on':''}" data-slot="${k}" aria-label="${nm} ${n}">${dk?decoIcon(k.slice(5)):icon(k,30)}<b>${n}</b>${qq&&qq[2]?'<i class="qs g">★</i>':qq&&qq[1]?'<i class="qs">★</i>':''}</button>`;});
  const pad=(6-slots.length%6)%6+(slots.length?0:6);for(let i=0;i<pad;i++)slots.push('<div class="slot empty"></div>');
  const k=bagState.sel&&items.find(([x])=>x===bagState.sel)?bagState.sel:null;
  const I=k&&ITEMS[k];
  const qq=I&&QK(k)?qOf(k):null,qtxt=qq&&(qq[1]||qq[2])?` · ★ทอง ${qq[2]} ☆เงิน ${qq[1]}`:'';
  const detail=k&&k.startsWith('deco_')?`<div class="detail">${decoIcon(k.slice(5))}<div><b>${DECOS[k.slice(5)].n}</b> ×${S.decoInv[k.slice(5)]}<br><small>${DECOS[k.slice(5)].tree?'ปลูกในไร่ได้ ไม่ต้องรดน้ำ':'ของตกแต่ง วางในไร่ได้'}</small></div><button class="btn" data-place="${k.slice(5)}">${DECOS[k.slice(5)].tree?'ปลูก':'วาง'}</button></div>`:k?`<div class="detail">${icon(k,40)}<div><b>${I?I.n:EXTRA[k]}</b> ×${items.find(([x])=>x===k)[1]}${qtxt}<br><small>${I?`ราคาวันนี้ ฿${unitPrice(k)} ${trend(k)}${I.e?` · กินแล้วแรง +${I.e}`:''}`:k==='hay'?'อาหารวัว แพะ ควาย':BAITS[k]?BAITS[k].d+(S.bait===k?' · <b>ติดเบ็ดอยู่</b>':''):k==='jas'||k==='ring'?'ของขวัญสำคัญ':'วัสดุก่อสร้าง'}</small></div>${BAITS[k]?`<button class="btn" data-bait="${S.bait===k?'':k}">${S.bait===k?'ถอดเหยื่อ':'ติดเบ็ด'}</button>`:''}${I&&I.e?`<button class="btn" data-bageat="${k}" ${S.stam>=S.maxStam?'disabled':''}>กิน</button>`:''}</div>`:'<p class="lv" style="margin:0 0 8px">แตะของในช่องเพื่อดูรายละเอียด</p>';
  showModal(`<h2>กระเป๋า</h2><div class="tabs">${BAG_TABS.map(([id,n])=>`<button type="button" class="tab ${bagState.tab===id?'on':''}" data-tab="${id}">${n}</button>`).join('')}</div>
    ${detail}<div class="grid6">${slots.join('')}</div>
    <p class="lv">เงิน ฿${S.money.toLocaleString('en-US')} · แรง ${Math.round(S.stam)}/${S.maxStam}${S.bin?` · รอรับเงินพรุ่งนี้ ฿${S.bin}`:''}</p>
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
function openGoals(){
  const rows=GOALS.map((g,i)=>i<S.goal?`<div class="need" style="opacity:.55"><span>${glyph('star',18)} ${g.t}</span><span style="flex:none">สำเร็จ</span></div>`
    :i===S.goal?`<div class="detail"><div><b>ตอนนี้:</b> ${g.t}</div><span style="flex:none;white-space:nowrap">+฿${g.r}</span></div>`
    :i<=S.goal+2?`<div class="need"><span>${g.t}</span><span style="flex:none;white-space:nowrap">+฿${g.r}</span></div>`:'').join('');
  const sr=STORY.map((st,i)=>i<S.story.i?`<div class="need" style="opacity:.55"><span>${glyph('book',18)} ${st.sc[0]}</span><span style="flex:none">อ่านแล้ว</span></div>`:i===S.story.i?`<div class="detail"><div><b>ตอนนี้:</b> ${st.t}${st.prog?` · ${st.prog()}`:''}</div></div>`:'').join('');
  checkQuests();const ql=sqLine();
  showModal(`<h2>เป้าหมาย ${S.goal}/${GOALS.length}</h2>${rows}<div class="sub">ภารกิจ${season().n}</div><div class="need"><span>${ql||`ทำภารกิจ${season().n}ครบแล้ว`}</span><button class="btn ghost" data-quests>ดูทั้งหมด</button></div><div class="sub">เรื่องสูตรลับของคุณตา · หน้าที่ได้ ${S.story.pages||0}/4${S.ribbons?` · ริบบิ้นประกวด ${S.ribbons}`:''}</div>${sr}<div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
function decoIcon(k){if(SPRK[k])return `<span class="ic">${svgWrap(`<path d="M16 28 V16" stroke="#5b4a3a" stroke-width="3"/><circle cx="16" cy="13" r="6" fill="${SPRK[k].col}"/><path d="M6 10 q4 -6 10 -6 M26 10 q-4 -6 -10 -6" fill="none" stroke="#6fa8dc" stroke-width="2"/>`,26)}</span>`;const D=DECOS[k];if(D&&D.spr&&sprOk(D.spr))return `<span style="display:inline-block;width:30px;height:30px;vertical-align:middle;margin-right:5px;${sprBg(D.spr,30,30)}"></span>`;
  return k==='path'?`<span class="ic">${svgWrap('<rect x="3" y="3" width="12" height="12" rx="3" fill="#cfc6b4"/><rect x="17" y="5" width="12" height="10" rx="3" fill="#d9d1c0"/><rect x="5" y="17" width="10" height="12" rx="3" fill="#d9d1c0"/><rect x="17" y="17" width="12" height="12" rx="3" fill="#cfc6b4"/>',26)}</span>`
    :`<span class="ic">${svgWrap('<path d="M15 29 V12" stroke="#5b4a3a" stroke-width="3"/><rect x="10" y="4" width="11" height="10" rx="2" fill="#f2c230"/><path d="M9 4 h13" stroke-width="2"/>',26)}</span>`;}
function openContest(){
  const list=Object.keys(CROPS).filter(k=>S.prod[k]>0);
  const opts=list.map(k=>{const q=qOf(k),best=q[2]?2:q[1]?1:0;return `<div class="need"><span>${ic(k,26)}<b>${CROPS[k].n}</b> ${best?qStar(best):'ปกติ'} · มี ${S.prod[k]}</span><button class="btn" data-contest="${k}:${best}">ส่งประกวด</button></div>`;}).join('');
  showModal(`<h2>ประกวดผักประจำ${season().n}</h2><p>ส่งผักได้ 1 ผล คะแนนมาจากคุณภาพ (★ทองดีที่สุด) และชนิดผัก</p>${opts||'<p>ยังไม่มีผักในตะกร้า ไปเก็บผักมาก่อนนะ</p>'}
    <p class="lv">ผักคุณภาพดีได้จากการใส่ปุ๋ยมูลค้างคาว และรดน้ำทุกวันไม่ขาด</p><div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
function runContest(k,q){
  if(S.prod[k]<=0)return;const qq=qOf(k);if(q&&qq[q]>0)qq[q]--;S.prod[k]--;S.festDone.contest=true;stat('contest');
  const me=Math.round(30+ITEMS[k].v/6+q*38+Math.random()*18);
  const rivals=[['ลุงมี',55+Math.random()*50],['ยายสาย',50+Math.random()*55],['ป้าแดง',45+Math.random()*55]].map(([n,v])=>[n,Math.round(v)]);
  const all=[['คุณ',me],...rivals].sort((a,b)=>b[1]-a[1]),rank=all.findIndex(r=>r[0]==='คุณ')+1,prize=[0,1500,700,300,50][rank];
  S.money+=prize;earn('ประกวดผัก',prize);if(rank===1){S.ribbons++;for(const id in S.npc)addH(id,1);}sfx(rank===1?'upgrade':'coin');if(rank===1)shake(3,.25);
  showModal(`<h2>ผลประกวดผัก</h2><p>คุณส่ง${CROPS[k].n} ${q?qStar(q):'ปกติ'}</p>${all.map((r,i)=>`<div class="need ${r[0]==='คุณ'?'detail':''}"><span><b>อันดับ ${i+1}</b> ${r[0]}</span><span style="flex:none;white-space:nowrap">${r[1]} คะแนน</span></div>`).join('')}
    <p class="req">${rank===1?`ชนะเลิศ! ได้ริบบิ้นทองและเงินรางวัล ฿${prize}`:`ได้อันดับ ${rank} · รางวัล ฿${prize}`}</p><div class="row"><button class="btn" data-close>เยี่ยม</button></div>`);
}
function updatePet(dt){
  const P=S.pet;if(!P||scene!=='farm')return;P.happy=Math.max(0,(P.happy||0)-dt);
  const [fx,fy]=DIRS[S.face],tx=S.px-fx*.9,ty=S.py-fy*.6+.15,dx=tx-P.x,dy=ty-P.y,l=Math.hypot(dx,dy);
  if(l>8){P.x=tx;P.y=ty;return;}
  P.moving=l>.45;if(P.moving){const sp=Math.min(l*2.2,riding?5.5:3.4)*dt;P.x+=dx/l*sp;P.y+=dy/l*sp;P.walk=(P.walk||0)+sp*5.5;if(Math.abs(dx)>.1)P.dir=dx>0?1:-1;P.face=Math.abs(dy)>Math.abs(dx)*1.2?(dy>0?'down':'up'):'side';P.idle=0;}
  else P.idle=(P.idle||0)+dt;
}
function drawPet(){
  const P=S.pet,k=P.kind;
  if(sprOk(`p_${k}_right_w0`)){const s=TS,x=wx(P.x),y=wy(P.y),night=S.t>=1260||S.t<360;let n,flip=(P.dir||1)<0,H=s*.72;
    if(P.moving){const f=Math.floor(P.walk||0)%8;n=P.face==='down'?`p_${k}_down_w${f}`:P.face==='up'?`p_${k}_up_w${f}`:`p_${k}_right_w${f}`;if(P.face!=='side')flip=false;H=P.face==='side'?s*.72:s*.82;}
    else if(P.happy>.7)n=`p_${k}_pose2`;else if(P.happy>0)n=`p_${k}_pose1`;
    else if(night&&P.idle>3)n=`p_${k}_pose3`;
    else if(P.idle>6)n=`p_${k}_pose${[0,5,6,7][Math.floor(P.idle/4)%4]}`;else n=`p_${k}_pose0`;
    if(!sprOk(n))n=`p_${k}_pose0`;
    groundShadow(x,y+s*.14,s*.22,s*.06);sprAt(n,x,y+s*.18,s*3,flip,H);
    if(Math.hypot(P.x-S.px,P.y-S.py)<2){ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#46290f';ctx.strokeText(P.name,x,y+s*.42);ctx.fillStyle='#f7ecd2';ctx.fillText(P.name,x,y+s*.42);}
    return;}
  const s=TS,x=wx(P.x),y=wy(P.y),m=P.moving,hop=m?Math.abs(Math.sin(P.walk))*s*.05:(P.happy>0?Math.abs(Math.sin(clock*14))*s*.06:0),d=P.dir||1,wag=Math.sin(clock*(P.happy>0?22:8))*.5;
  groundShadow(x,y+s*.14,s*.2,s*.05);ctx.save();ctx.translate(x,y-hop);ctx.scale(d,1);
  const dog=P.kind==='dog',body=dog?'#d9a55e':'#b8b0a6',dark=dog?'#a8733a':'#6f6861',light=dog?'#f4dcb0':'#ece6de';
  ctx.lineWidth=Math.max(1,s*.03);ctx.strokeStyle='#46290f';
  ctx.save();ctx.translate(-s*.2,-s*.08);ctx.rotate(dog?-.6+wag*.4:-1.1+wag*.25);ctx.fillStyle=body;ctx.beginPath();ctx.ellipse(0,-s*.08,s*.04,s*.11,0,0,7);ctx.fill();ctx.stroke();ctx.restore();
  const lg=m?Math.sin(P.walk)*s*.03:0;ctx.fillStyle=dark;[[-.12,lg],[-.04,-lg],[.08,-lg],[.15,lg]].forEach(([o,l])=>{ctx.fillRect(o*s-s*.025,-s*.02+l*.3,s*.05,s*.13);});
  ctx.fillStyle=body;ctx.beginPath();ctx.ellipse(0,-s*.07,s*.22,s*.12,0,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle=light;ctx.beginPath();ctx.ellipse(s*.04,-s*.03,s*.12,s*.06,0,0,7);ctx.fill();
  ctx.fillStyle=body;ctx.beginPath();ctx.arc(s*.2,-s*.2,s*.13,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle=dog?dark:body;
  if(dog){ctx.beginPath();ctx.ellipse(s*.12,-s*.24,s*.05,s*.09,.5,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=light;ctx.beginPath();ctx.ellipse(s*.28,-s*.16,s*.06,s*.045,0,0,7);ctx.fill();}
  else{[[.12,-.32],[.25,-.33]].forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(a*s-s*.05,b*s+s*.06);ctx.lineTo(a*s,b*s-s*.04);ctx.lineTo(a*s+s*.05,b*s+s*.06);ctx.closePath();ctx.fill();ctx.stroke();});
    ctx.strokeStyle=dark;ctx.lineWidth=1;[-.24,-.2].forEach(v=>{ctx.beginPath();ctx.moveTo(s*.1,v*s);ctx.lineTo(s*.16,v*s);ctx.stroke();});ctx.strokeStyle='#46290f';}
  ctx.fillStyle='#2b1d12';ctx.beginPath();ctx.arc(s*.24,-s*.22,s*.022,0,7);ctx.fill();ctx.beginPath();ctx.arc(s*.32,-s*.17,s*.02,0,7);ctx.fill();
  ctx.fillStyle='#d4453a';ctx.fillRect(s*.1,-s*.12,s*.14,s*.03);
  ctx.restore();
  if(Math.hypot(P.x-S.px,P.y-S.py)<2){ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#46290f';ctx.strokeText(P.name,x,y+s*.42);ctx.fillStyle='#f7ecd2';ctx.fillText(P.name,x,y+s*.42);}
}
function drawFTree(T,tx,ty){const F=FTREES[T.k],s=TS,cx=wx(tx+.5),by=wy(ty+1)+s*.06,r=T.age/F.grow,st=r>=1?(T.f>=F.every?3:2):r>=.4?1:0;
  const sw=Math.sin(clock*1.3+tx)*.02,k=`ft_${T.k}_${st}`,sz=[.7,1.2,1.75,1.75][st],mh=[.9,1.6,2.2,2.2][st];
  groundShadow(cx,by-s*.1,s*(.18+st*.12),s*(.06+st*.03));
  if(sprOk(k)){sprAt(k,cx,by,s*sz,(tx+ty)%2===1,s*mh,sw);}
  else{ctx.fillStyle='#7a5128';ctx.fillRect(cx-s*.05*(st+1),by-s*mh*.55,s*.1*(st+1),s*mh*.55);ctx.fillStyle=T.k==='banana'?'#6fb33f':T.k==='coco'?'#4f9a3a':'#3f8a2e';
    ctx.beginPath();ctx.arc(cx,by-s*mh*.72,s*sz*.38,0,7);ctx.fill();if(st===3){ctx.fillStyle=T.k==='mango'?'#f2b33d':T.k==='banana'?'#f2d23d':'#8a6a3a';for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(cx+Math.cos(i*1.7)*s*sz*.22,by-s*mh*.7+Math.sin(i*1.7)*s*sz*.16,s*.07,0,7);ctx.fill();}}}
  if(st===3){ctx.fillStyle='rgba(255,246,190,'+(0.45+Math.sin(clock*4)*.3)+')';ctx.beginPath();ctx.arc(cx+s*.35,by-s*mh*.9,s*.06,0,7);ctx.fill();}}
function drawDeco(k,tx,ty){
  const D=DECOS[k],s=TS,cx=wx(tx+.5),by=wy(ty+1);
  if(SPRK[k]){const R=SPRK[k];groundShadow(cx,by-s*.12,s*.2,s*.06);ctx.fillStyle='#6f7276';ctx.fillRect(cx-s*.05,by-s*.5,s*.1,s*.38);
    ctx.fillStyle=R.col;ctx.strokeStyle='#46290f';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(cx,by-s*.52,s*.2,s*.11,0,0,7);ctx.fill();ctx.stroke();
    ctx.fillStyle='#46290f';ctx.beginPath();ctx.arc(cx,by-s*.56,s*.04,0,7);ctx.fill();
    if(S.t<450&&!S.rain){const a=clock*6;ctx.strokeStyle='rgba(170,220,255,.8)';ctx.lineWidth=2;const r=(k==='spr3'?2.2:k==='spr2'?1.3:1)*s;
      for(let i=0;i<6;i++){const g=a+i*1.05,ex=cx+Math.cos(g)*r,ey=by-s*.5+Math.sin(g)*r*.5;ctx.beginPath();ctx.moveTo(cx,by-s*.56);ctx.quadraticCurveTo((cx+ex)/2,by-s*1.1,ex,ey);ctx.stroke();}}
    return;}
  if(D.spr&&sprOk(D.spr)){if(k!=='gate')groundShadow(cx,by-s*.1,s*.36,s*.09);sprAt(D.spr,cx,by-s*.04,s*D.w,false,s*D.h);return;}
  if(k==='scare'){groundShadow(cx,by-s*.08,s*.25,s*.07);ctx.fillStyle='#8a5a2b';ctx.fillRect(cx-s*.04,by-s*1.05,s*.08,s*1);ctx.fillRect(cx-s*.38,by-s*.78,s*.76,s*.07);ctx.fillStyle='#d9534f';ctx.fillRect(cx-s*.2,by-s*.82,s*.4,s*.38);ctx.fillStyle='#f1d9a8';ctx.beginPath();ctx.arc(cx,by-s*.98,s*.16,0,7);ctx.fill();ctx.fillStyle='#d9b45a';ctx.beginPath();ctx.ellipse(cx,by-s*1.1,s*.3,s*.08,0,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(cx-s*.14,by-s*1.12);ctx.lineTo(cx,by-s*1.3);ctx.lineTo(cx+s*.14,by-s*1.12);ctx.fill();return;}
  if(k==='lamp'){groundShadow(cx,by-s*.08,s*.18,s*.06);ctx.fillStyle='#5b4a3a';ctx.fillRect(cx-s*.04,by-s*.95,s*.08,s*.9);ctx.fillStyle='#46290f';ctx.fillRect(cx-s*.16,by-s*.98,s*.32,s*.06);
    const on=S.t>=1080||S.t<390;ctx.fillStyle=on?'#ffd97a':'#e6c46a';ctx.fillRect(cx-s*.11,by-s*.92,s*.22,s*.2);ctx.strokeStyle='#46290f';ctx.lineWidth=1.5;ctx.strokeRect(cx-s*.11,by-s*.92,s*.22,s*.2);
    if(on){ctx.fillStyle='rgba(255,210,110,.22)';ctx.beginPath();ctx.arc(cx,by-s*.82,s*.9,0,7);ctx.fill();}}
}
function openFolkList(){
  const rows=Object.keys(NPCS).filter(here).map(id=>{const d=NPCS[id],n=S.npc[id],f=folks[id];
    let where;if(d.fixed)where=folksOut()?(id==='daeng'?'ร้านเมล็ดพันธุ์':'โรงไม้'):'พักผ่อนที่บ้าน';
    else{const P=PLACES[f.place||homeOf(id)];where=f.hidden?(P.home?'อยู่บ้าน':'กำลังออกจากบ้าน'):(P.home?'กำลังกลับบ้าน':P.n);}
    const st=S.rel.spouse===id?' · คู่ชีวิต':S.rel.date===id?' · แฟน':d.cand?' · คบหาได้':'';
    return `<div class="need"><span><b>${d.n}</b> <small>${d.role}${st}</small><br><span style="color:var(--berry)">${'♥'.repeat(n.h)}${'♡'.repeat(10-n.h)}</span><br><small>ตอนนี้: ${where} · เกิด${SEASONS[d.bday[0]].n} วันที่ ${d.bday[1]}${isBday(id)?' (วันนี้!)':''}</small></span></div>`;}).join('');
  showModal(`<h2>ชาวบ้าน</h2>${rows}<div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
const MUSEUM=[
  {id:'sea',n:'ห้องทะเล',keys:['pearl','lobster','crab','squid','oyster','shell'],r:3000,perk:'เงิน ฿3,000',f:()=>{}},
  {id:'forest',n:'ห้องป่าและน้ำตก',keys:['mahseer','orchid','lingzhi','honeycomb','mush','phakwan'],r:2500,perk:'เงิน ฿2,500 และแรงสูงสุด +5',f:()=>{S.maxStam+=5;}},
  {id:'under',n:'ห้องใต้พิภพ',keys:['ruby','emerald','au','ag','cavefish'],r:3000,perk:'เงิน ฿3,000 และแรงสูงสุด +10',f:()=>{S.maxStam+=10;}},
  {id:'rare',n:'ห้องปลาหายาก',keys:['buek','insee','kapong','krai','chon'],r:2500,perk:'เงิน ฿2,500 และช่องเขียวตอนตกปลากว้างขึ้นถาวร',f:()=>{S.perks.mfish=true;}}
];
function claimSet(id){const M=MUSEUM.find(m=>m.id===id);S.museumDone=S.museumDone||{};if(!M||S.museumDone[id]||!M.keys.every(k=>S.museum[k]))return;
  S.museumDone[id]=true;giveBerry('museum','ภัณฑารักษ์ยื่นผลไม้สีม่วงให้ “ของหายากจากป่าลึก ขอบคุณที่ช่วยพิพิธภัณฑ์นะ”');S.money+=M.r;earn('รางวัลพิพิธภัณฑ์',M.r);M.f();sfx('upgrade');
  let extra='';if(MUSEUM.every(m=>S.museumDone[m.id])&&!S.museumDone.all){S.museumDone.all=true;S.money+=5000;earn('รางวัลพิพิธภัณฑ์',5000);extra=' · จัดแสดงครบทุกห้อง! รางวัลพิเศษ ฿5,000';}
  openMuseum(`${M.n}จัดแสดงครบแล้ว! ได้${M.perk}${extra}`);}
function openMuseum(msg){S.museumDone=S.museumDone||{};
  const html=MUSEUM.map(M=>{const got=M.keys.filter(k=>S.museum[k]).length,done=S.museumDone[M.id];
    return`<div class="sub">${M.n} (${got}/${M.keys.length})</div><div class="book">`+M.keys.map(k=>S.museum[k]?`<div class="got">${icon(k,30)}<b>${ITEMS[k].n}</b>จัดแสดงแล้ว</div>`
      :S.prod[k]>0?`<div>${icon(k,30)}<b>${ITEMS[k].n}</b><button class="btn" data-mdon="${k}" style="margin-top:4px;padding:4px 10px;min-height:0">บริจาค</button></div>`
      :`<div><b>${S.col[k]?ITEMS[k].n:'???'}</b>${S.col[k]?'ไม่มีในกระเป๋า':'ยังไม่เคยได้'}</div>`).join('')+'</div>'+
      (done?`<div class="lv">ได้รับรางวัลแล้ว: ${M.perk}</div>`:`<div class="need"><span>ครบห้องได้${M.perk}</span><button class="btn" data-mset="${M.id}" ${got===M.keys.length?'':'disabled'}>รับรางวัล</button></div>`);}).join('');
  const all=MUSEUM.reduce((a,M)=>a+M.keys.length,0),got=Object.keys(S.museum).length;
  showModal(`<div class="npcHead"><h2>พิพิธภัณฑ์หมู่บ้าน</h2><small>จัดแสดงแล้ว ${got}/${all}</small></div>${msg?`<p class="req">${msg}</p>`:'<p>พิพิธภัณฑ์ท้ายหมู่บ้าน บริจาคของหายากอย่างละ 1 ชิ้น ครบห้องได้รางวัล</p>'}${html}
    <div class="lv">ครบทั้ง 4 ห้องได้รางวัลพิเศษ ฿5,000${S.museumDone.all?' (ได้แล้ว)':''}</div><div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);}
// ---------- power berries (permanent max stamina, like Harvest Moon)
const BERRY_PLUS=10;
const BERRIES=[
  {id:'mine10',n:'ใต้ดินลึก',hint:'ลึกลงไปในเหมือง มีบางอย่างส่องแสงอยู่ชั้นหนึ่ง'},
  {id:'chest',n:'หีบสมบัติ',hint:'สมบัติที่ก้นเหมืองไม่ได้มีแค่เงินทอง'},
  {id:'pond',n:'ก้นบ่อ',hint:'นักตกปลาฝีมือดีอาจเกี่ยวของแปลกขึ้นมาจากบ่อหน้าบ้าน'},
  {id:'beach',n:'ริมหาด',hint:'ไปเที่ยวทะเลบ่อยๆ อาจเจอผลไม้ประหลาดถูกคลื่นซัดมา'},
  {id:'falls',n:'หลังน้ำตก',hint:'ป่ารอบน้ำตกมีต้นไม้แปลกๆ ไปเดินเล่นบ่อยๆ ดู'},
  {id:'farmer',n:'ชาวไร่ขยัน',hint:'เก็บผักให้ได้เยอะๆ แล้วจะมีคนมาให้รางวัล'},
  {id:'rich',n:'เศรษฐีหมู่บ้าน',hint:'หาเงินรวมให้ได้ ฿30,000'},
  {id:'friend',n:'ของฝากยาย',hint:'ยายสายมีของดีเก็บไว้ให้คนที่สนิทด้วย'},
  {id:'contest',n:'แชมป์เทศกาล',hint:'ชนะที่ 1 งานก่อกองทรายหรืองานแข่งตกปลา'},
  {id:'museum',n:'นักสะสม',hint:'จัดแสดงพิพิธภัณฑ์ให้ครบสักห้อง'}];
let berryQ=[];
function giveBerry(id,why){S.berries=S.berries||{};if(S.berries[id])return false;S.berries[id]=S.day;S.maxStam+=BERRY_PLUS;S.stam=Math.min(S.maxStam,S.stam+BERRY_PLUS);stat('berry');
  berryQ.push({id,why,at:performance.now()});sfx('upgrade');return true;}
function berryShow(){if(!berryQ.length||!modal.hidden||transitioning||busFx||performance.now()-berryQ[0].at<1200)return;const b=berryQ.shift(),n=Object.keys(S.berries).length;
  if(b.relic||b.end){showModal(relicModal(b));return;}
  showModal(`<h2>ได้ผลเบอร์รีพลัง!</h2><div class="talk"><span class="pt" style="display:flex;align-items:center;justify-content:center">${icon('berry',64)}</span><div><p>${b.why||'ผลไม้สีม่วงเรืองแสง กินแล้วรู้สึกมีแรงขึ้นมาก'}</p><p><b>แรงสูงสุด +${BERRY_PLUS} ถาวร</b> (ตอนนี้ ${S.maxStam})</p></div></div><div class="lv">เบอร์รีพลัง ${n}/${BERRIES.length} · ดูคำใบ้ที่เหลือได้ในสมุดสะสม</div><div class="row"><button class="btn" data-close>เยี่ยม</button></div>`);}
function checkBerries(){if(!S.berries)S.berries={};const B=S.berries;
  if(!B.rich&&(S.stats.earned||0)>=30000)giveBerry('rich','ป้าแดงมาแสดงความยินดีที่ไร่ทำรายได้ถึง ฿30,000 แล้วยื่นผลไม้สีม่วงให้ “ของดีจากป่าลึก กินแล้วทำงานได้ทั้งวัน”');
  if(!B.farmer&&Object.keys(CROPS).reduce((a,k)=>a+(S.col[k]||0),0)>=150)giveBerry('farmer','ลุงมีเห็นคุณเก็บผักครบ 150 ผล เลยเอาผลไม้วิเศษที่เก็บไว้นานมาให้ “ชาวไร่ขยันแบบนี้ต้องมีแรงเยอะๆ”');
  if(!(S.relics&&S.relics.photo)&&S.npc.mee&&S.npc.mee.h>=6)giveRelic('photo');
  if(!B.friend&&S.npc.sai&&S.npc.sai.h>=6)giveBerry('friend','ยายสายยื่นห่อใบตองให้ ข้างในเป็นผลไม้สีม่วงเรืองแสง “คุณตาเคยกินลูกนี้ทุกปี ยายเก็บไว้ให้หลาน”');
  berryShow();}
function drawBerry(X,Y,s){const g=.35+Math.sin(clock*4)*.15;ctx.fillStyle=`rgba(210,140,255,${g})`;ctx.beginPath();ctx.arc(X,Y-s*.15,s*.42,0,7);ctx.fill();
  if(sprAt('i_berry',X,Y+s*.18,s*.62,false,s*.62))return;
  ctx.fillStyle='#4f9a3a';ctx.beginPath();ctx.ellipse(X+s*.08,Y-s*.42,s*.14,s*.06,-.5,0,7);ctx.fill();
  [[-.12,-.12],[.12,-.12],[0,.06]].forEach(([dx,dy])=>{ctx.fillStyle='#7a2fb0';ctx.beginPath();ctx.arc(X+dx*s,Y+dy*s-s*.1,s*.13,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.arc(X+dx*s-s*.04,Y+dy*s-s*.15,s*.035,0,7);ctx.fill();});}
function berryBook(){const B=S.berries||{},n=Object.keys(B).length;
  return`<div class="sub">เบอร์รีพลัง ${n}/${BERRIES.length} · กินแล้วแรงสูงสุด +${BERRY_PLUS} ถาวร</div><div class="book">`+BERRIES.map(b=>B[b.id]?`<div class="got">${icon('berry',30)}<b>${b.n}</b>ได้แล้ว</div>`:`<div><b>???</b><small>${b.hint}</small></div>`).join('')+'</div>';}
const BOOK_SHORT={veg:'ผัก',veg2:'สวนครัว',animal:'สัตว์',fish:'ปลา',trip:'ทะเล',wild:'ของป่า',mine:'แร่',proc:'แปรรูป',food:'อาหาร'};
function openBook(){
  let total=0,got=0;const H={},tabs=[];
  for(const c of COL_CATS){const done=c.keys.every(k=>S.col[k]>0),g=c.keys.filter(k=>S.col[k]>0).length;total+=c.keys.length;got+=g;
    tabs.push([c.id,`${BOOK_SHORT[c.id]||c.n} ${g}/${c.keys.length}${done&&!S.colClaim[c.id]?' !':''}`]);
    H[c.id]=`<div class="sub">${c.n} (${g}/${c.keys.length})</div><div class="book">`+
      c.keys.map(k=>{const n=S.col[k]||0;
        return n?`<div class="got">${icon(k,30)}<b>${ITEMS[k].n}</b>ได้มา ${n}<br>ขาย ฿${ITEMS[k].v}</div>`:'<div><b>???</b>ยังไม่เคยได้</div>';}).join('')+'</div>'+
      (S.colClaim[c.id]?`<div class="lv">รับรางวัล ฿${c.reward} แล้ว</div>`:`<div class="need"><span>ครบหมวดรับ ฿${c.reward}</span><button class="btn" data-claim="${c.id}" ${done?'':'disabled'}>รับรางวัล</button></div>`);}
  tabs.push(['sp',`พิเศษ ${Object.keys(S.relics||{}).length+Object.keys(S.berries||{}).length}/${RELICS.length+BERRIES.length}`]);H.sp=relicBook()+berryBook();
  if(!H[MTAB.book])MTAB.book='veg';
  showModal(`<h2>สมุดสะสม</h2><div class="row" style="margin-top:0"><button class="btn" data-map>แผนที่หมู่บ้าน</button><button class="btn ghost" data-quests>ภารกิจฤดู</button>${unl('museum')?'<button class="btn ghost" data-museum>พิพิธภัณฑ์</button>':''}</div><p>สะสมแล้ว ${got}/${total} อย่าง</p>${mtabs('book',tabs)}${H[MTAB.book]}<div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
$('bookBtn').addEventListener('click',()=>{sfx('ui');openBook();});
{const mb=$('mapBtn');if(mb)mb.addEventListener('click',()=>{sfx('ui');openMap();});}
$('bagBtn').addEventListener('click',()=>{sfx('ui');bagState.sel=null;openBag();});
$('goal').addEventListener('click',()=>{sfx('ui');if(S.goal>=GOALS.length&&!S.evalDue)openQuests();else openGoals();});
$('bagIco').innerHTML=glyph('bag',28);$('rideIco').innerHTML=glyph('horse',28);$('bookIco').innerHTML=glyph('book',28);$('musIco').innerHTML=glyph(AU.music?'note':'noteoff',26);$('musBtn').addEventListener('click',()=>{audioInit();setMusic(!AU.music);toast(AU.music?'เปิดเพลงแล้ว':'ปิดเพลงแล้ว');});$('menuIco').innerHTML=glyph('menu',26);
document.querySelector('#goal .gIco').innerHTML=glyph('flag',20);
$('rideBtn').hidden=!S.horse;
$('rideBtn').addEventListener('click',()=>{if(!S.horse)return;if(scene==='mine'){toast('ม้าเข้าเหมืองไม่ได้');return;}if(scene==='area'){toast('ม้าอยู่ที่ไร่ ขี่ได้เฉพาะในหมู่บ้าน');return;}riding=!riding;sfx('ui');toast(riding?'ขึ้นม้าแล้ว วิ่งเร็วขึ้น':'ลงจากม้าแล้ว');$('rideBtn').classList.toggle('sel',riding);});
function openCalendar(){
  const si=seasonIdx(),start=S.day-dayOfSeason()+1;
  let cells='';
  for(let i=0;i<SEASON_LEN;i++){const d=start+i,f=festOn(d),cls=[d<S.day?'past':'',d===S.day?'today':'',f?'fest':''].join(' ');
    cells+=`<div class="${cls}"><b>${i+1} ${WEEKDAYS[weekday(d)]}</b>${d===S.day?(S.storm?'วันนี้ · พายุ':S.rain?'วันนี้ · ฝน':'วันนี้'):''}${d===S.day+1&&S.wxNext?(S.wxNext==='storm'?'<br><b>พายุ!</b>':S.wxNext==='rain'?'<br>ฝน':'<br>แดด'):''}${f?`<br>${f.n}`:''}${weekday(d)===5?'<br>ตลาดนัด':''}${bdayOn(d)?`<br>วันเกิด${NPCS[bdayOn(d)].n}`:''}${S.rel.wedDay===d?'<br>งานแต่ง':''}</div>`;}
  const crops=Object.keys(CROPS).filter(inSeason).map(k=>`<span class="tag">${CROPS[k].n} ${CROPS[k].d} วัน</span>`).join('');
  const fest=FESTS.find(f=>f.season===si);
  const nx=SEASONS[(si+1)%3].n,left=SEASON_LEN-dayOfSeason();
  showModal(`<h2>ปฏิทิน${season().n}</h2>
    <div class="cal">${cells}</div>
    <div class="sub">ผักประจำฤดู</div><div>${crops}</div>
    ${fest?`<p class="req"><b>${fest.n}</b> วันที่ ${fest.day} · ${fest.where}<br>${fest.desc}</p>`:''}
    <p>อีก ${left} วันเข้าสู่${nx} ผักที่ไม่ใช่ของฤดูใหม่จะเหี่ยวตาย</p>
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
$('calBtn').addEventListener('click',()=>{sfx('ui');openCalendar();});
$('calBtn').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCalendar();}});
$('menuBtn').addEventListener('click',()=>{sfx('ui');
  const fr=Object.keys(NPCS).filter(here).map(id=>`<b>${NPCS[id].n}</b><span>${'♥'.repeat(S.npc[id].h)}${'♡'.repeat(10-S.npc[id].h)}</span>`).join('');
  const tl=Object.keys(TOOLS).map(t=>`<b>${TOOLS[t].n[S.tools[t]]}</b><span>${toolDesc(t,S.tools[t])}</span>`).join('');
  showModal(`<h2>${esc(S.farm||'ไร่สุขใจ')}</h2>
  <div class="help">${document.body.classList.contains('kb')?'<b>เดิน</b><span>W A S D หรือปุ่มลูกศร</span><b>Space</b><span>ไถ ปลูก รดน้ำ เก็บ ตกปลา คุย ตามสิ่งที่หันหน้าไป (E หรือ Enter ก็ได้)</span><b>ปุ่มลัด</b><span>B กระเป๋า · M แผนที่ · C ปฏิทิน · J สมุด · Q เมล็ด · F กิน · R ขี่ม้า · N เปิด/ปิดเพลง · Esc ปิด/เมนู</span>':'<b>วงล้อซ้าย</b><span>แตะค้างแล้วลากเพื่อเดิน (แตะตรงไหนก็ได้ครึ่งซ้ายของจอ)</span><b>ปุ่มขวา</b><span>ทำงานกับช่องที่หันหน้าไป: ไถ ปลูก รดน้ำ เก็บ ตกปลา คุย</span>'}
  <b>ส่งขาย</b><span>ราคาเปลี่ยนทุกวัน เลือกเก็บของที่ราคาตกไว้ขายวันอื่นได้ ดูข่าวตลาดตอนเช้า</span>
  <b>หมู่บ้านโต</b><span>ซ่อมสะพานและฟื้นตลาดที่กระดาน จะมีคนใหม่ย้ายเข้ามา</span>
  <b>คู่ชีวิต</b><span>คุยทุกวัน อย่าลืมวันเกิดและวันครบรอบ ไม่งั้นจะงอน</span>
  <b>แตะที่พื้น</b><span>บนมือถือ แตะที่พื้นเพื่อเดินไปเอง แตะช่องที่หันหน้าอยู่อีกครั้งเพื่อทำงาน</span>
  <b>พายุ</b><span>ดูพยากรณ์ในรายงานตอนเช้า วันพายุให้เก็บผักที่สุกก่อนนอน</span>
  <b>ไม้ผล</b><span>ซื้อต้นกล้าที่ร้านป้าแดง ปลูกในไร่ ไม่ต้องรดน้ำ ออกผลเองตามฤดู</span>
  <b>ที่เที่ยว</b><span>ป้ายรถสองแถวข้างทางตะวันออก ไปชายหาดหรือน้ำตกได้ ฿50 (06:30–18:00) ขากลับฟรี · ปลายท่าเรือมีปลาทะเลลึก ซื้อเหยื่อที่เพิงป้าแดด แล้วติดเบ็ดได้ที่กระเป๋า</span>
  <b>บ่อเลี้ยงปลา</b><span>สร้างกับช่างเอก ปล่อยลูกปลา ให้อาหารทุกวัน ครบวันจับขาย</span>
  <b>ออเดอร์พ่อค้า</b><span>ทุกสัปดาห์พ่อค้าเสือชายสั่งของ 3 อย่าง ส่งได้ที่ถังส่งขาย ส่งติดต่อกันได้โบนัส</span>
  <b>ของเก่าคุณตา</b><span>ซ่อนอยู่ 5 ชิ้น ดูคำใบ้ในสมุดสะสม จุดที่มีแสงวิบวับคือที่ให้ขุด</span>
  <b>บ้าน</b><span>เดินเข้าบ้านได้ เตียงไว้นอน เตาไว้ทำอาหาร สั่งเฟอร์นิเจอร์ที่โรงไม้ช่างเอก แต่ละชิ้นมีประโยชน์</span>
  <b>เบอร์รีพลัง</b><span>ซ่อนอยู่ 10 ลูกทั่วโลก กินแล้วแรงสูงสุด +10 ถาวร ดูคำใบ้ในสมุดสะสม</span>
  <b>พิพิธภัณฑ์</b><span>อาคารทรงไทยท้ายหมู่บ้าน (หรือเปิดจากสมุดสะสม) บริจาคของหายากอย่างละชิ้น ครบห้องได้รางวัลถาวร</span>
  <b>ภารกิจฤดู</b><span>ทุกฤดูมีภารกิจ 5 ข้อ ทำครบได้รางวัลพิเศษ แตะแถบเป้าหมายด้านล่างเพื่อดู</span>
  <b>ครบปี</b><span>คุณตาประเมินไร่จาก รายได้ สมุดสะสม เพื่อนสนิท ครอบครัว ความสุขของสัตว์ พัฒนาหมู่บ้าน สูตรแกง และทักษะ ได้ดาวมากได้ของขวัญมาก</span>
  <b>คำแนะนำ</b><span><button class="btn ghost" data-tipreset style="font-size:12px;padding:2px 8px">แสดงคำแนะนำอีกครั้ง</button></span>
  <b>ปฏิทิน</b><span>แตะป้ายวันที่มุมซ้ายบน ดูเทศกาลและผักประจำฤดู</span>
  <b>เครื่องมือ</b><span>อัปเกรดที่ร้านป้าแดง ไถและรดน้ำได้ทีละหลายช่อง</span>
  <b>วัว</b><span>เติมหญ้าแห้งในราง พรุ่งนี้รีดนมได้</span>
  <b>ขยายไร่</b><span>ซื้อที่ดินหลังไร่ที่ประตูทางใต้ ถางหญ้า ทุบหิน ผ่าตอไม้</span>
  <b>ช่างเอก</b><span>โรงไม้ข้างเล้าไก่ สร้างโรงเรือน ขยายเล้า คอกวัว ต่อเติมบ้าน</span>
  <b>กระดาน</b><span>มุมลานหมู่บ้าน บริจาคของเพื่อซ่อมสะพาน ตลาด และวัด</span>
  <b>แปรรูป</b><span>สั่งช่างเอกสร้างครก โอ่งดอง ถังปั่นเนย แคร่ตากปลา วางเรียงหน้าบ้าน</span>
  <b>ทำอาหาร</b><span>สร้างครัวแล้วเข้าบ้าน ทำอาหารไทย · แตะแถบแรงเพื่อกิน</span>
  <b>ตลาดนัด</b><span>ทุกวันเสาร์ 08:00–15:00 วางของที่แผงบนลาน ตั้งราคาถูก ปกติ หรือแพง</span>
  <b>ชาวบ้าน</b><span>แต่ละคนมีตารางชีวิต ฉากพิเศษเมื่อสนิท และวันเกิด · ฝน หมอต้น ครูนุ่น ภูมิ คบหาและแต่งงานได้</span>
  <b>เหมือง</b><span>ถ้ำหน้าผาท้ายป่าตะวันออก 20 ชั้น แร่ใช้อัปเกรดเครื่องมือ มูลค้างคาวเป็นปุ๋ยใส่ตอนปลูก</span>
  <b>ตกปลา</b><span>บ่อ ลำธาร และบ่อใต้ดิน มีปลาต่างกันตามฤดูและกลางวันกลางคืน</span>
  <b>สัตว์ใหม่</b><span>เป็ด แพะ ควาย ม้า ซื้อที่ร้านป้าแดง · ป่าตะวันออกมีของป่าตามฤดู</span>
  <b>คีย์บอร์ด</b><span>W A S D หรือลูกศร เดิน · Space ทำงาน (คุย รดน้ำ เก็บ) · B กระเป๋า · M แผนที่ · C ปฏิทิน · J สมุด · Q เลือกเมล็ด · F กินอาหาร · R ขี่ม้า · Esc ปิดหน้าต่าง/เมนู</span></div>
  <div class="row"><button class="btn" data-folks>รายชื่อชาวบ้าน</button><button class="btn" data-skills>ทักษะ</button><button class="btn ghost" data-savecode>สำรองและโหลดเซฟ</button></div>
  <div class="sub">ความเร็วเวลาในเกม (1 วันในเกม)</div>
  <div class="row" style="margin-top:4px">${[['slow','ช้า · 7 นาที'],['normal','ปกติ · 4.5 นาที'],['fast','เร็ว · 3 นาที']].map(([k,n])=>`<button class="btn ${S.opt.speed===k?'':'ghost'}" data-speed="${k}">${n}</button>`).join('')}</div>
  <div class="sub">เครื่องมือ</div><div class="help">${tl}</div>
  <div class="sub">ความสนิท</div><div class="help">${fr}</div>
  <div class="row"><button class="btn ghost" data-music>เพลง: ${AU.music?'เปิด':'ปิด'}</button><button class="btn ghost" data-sfx>เสียงเอฟเฟกต์: ${AU.sfx?'เปิด':'ปิด'}</button></div>
  <p class="lv">${cloudTxt()}</p>
  <div class="row"><button class="btn" data-fs>เต็มจอแนวนอน</button><button class="btn ghost" data-reset>เริ่มเกมใหม่</button><button class="btn ghost" data-close>กลับไปเล่น</button></div>`);});

function seedList(){return Object.keys(CROPS).filter(k=>inSeason(k)||(S.built.gh&&S.seeds[k]>0));}
function renderSeeds(){
  const el=$('seeds');const list=seedList();
  if(!list.includes(S.sel))S.sel=list.find(inSeason)||list[0];
  el.innerHTML=`<button class="rbtn" type="button" id="seedChip" aria-label="เลือกเมล็ด ตอนนี้${CROPS[S.sel].n}"><span class="ico">${icon(S.sel,28)}</span><b class="badge">${S.seeds[S.sel]}</b><small>${CROPS[S.sel].n}</small></button>`;
  $('seedChip').addEventListener('click',()=>{sfx('ui');openSeedPicker();});
}
function openSeedPicker(){
  showModal(`<h2>เลือกเมล็ดที่จะปลูก</h2>${seedList().map(k=>`<div class="need"><span>${ic(k,26)}<b>${CROPS[k].n}</b> ×${S.seeds[k]} · โต ${CROPS[k].d} วัน · ขาย ฿${ITEMS[k].v}${inSeason(k)?'':' · <small>นอกฤดู ปลูกในโรงเรือน</small>'}</span><button class="btn ${S.sel===k?'':'ghost'}" data-seed="${k}">${S.sel===k?'กำลังใช้':'เลือก'}</button></div>`).join('')}
    <div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);
}
renderSeeds();

// ---------- update ----------
// animals: walk to a chosen spot with easing, stop to graze/peck, turn with hysteresis
const ASPD={hen:.85,duck:.6,cow:.45,goat:.65,buffalo:.4};
function wander(a,dt,x0,x1,y0,y1,kind){
  a.bob=(a.bob||0)+dt*8;a.spd=a.spd||0;if(a.dir===undefined)a.dir=1;
  const vmax=ASPD[kind||a.kind||'cow']||.5;
  if(a.tx===undefined||a.tm===undefined){a.tx=a.x;a.ty=a.y;a.tm=Math.random()*2;}
  const dx=a.tx-a.x,dy=a.ty-a.y,l=Math.hypot(dx,dy);
  if(l<.06){a.spd=Math.max(0,a.spd-dt*2.5);a.tm-=dt;a.graze=(a.graze||0)+dt;
    if(a.tm<=0){if(Math.random()<.35){a.tm=1.5+Math.random()*3;a.graze=0;}
      else{const r=.6+Math.random()*1.6,g=Math.random()*6.28;a.tx=Math.max(x0,Math.min(x1,a.x+Math.cos(g)*r));a.ty=Math.max(y0,Math.min(y1,a.y+Math.sin(g)*r*.6));a.tm=1+Math.random()*2.5;a.graze=0;}}}
  else{const want=Math.min(vmax,l*1.6);a.spd+=(want-a.spd)*Math.min(1,dt*3);const st=Math.min(l,a.spd*dt);a.x+=dx/l*st;a.y+=dy/l*st;
    if(dx>.08)a.dir=1;else if(dx<-.08)a.dir=-1;}
  a.vx=a.dir*a.spd;a.vy=0;a.x=Math.max(x0,Math.min(x1,a.x));a.y=Math.max(y0,Math.min(y1,a.y));
}
let loyStarted=false;
function npcPath(sx,sy,tx,ty){
  const ok=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&!SOLID.includes(map[y][x]);
  const s0=Math.floor(sy)*W+Math.floor(sx),ti=Math.floor(ty)*W+Math.floor(tx);if(!ok(Math.floor(tx),Math.floor(ty)))return null;
  const prev=new Int16Array(W*H).fill(-1),q=[s0];prev[s0]=s0;
  for(let i=0;i<q.length;i++){const c=q[i];if(c===ti)break;const x=c%W,y=(c/W)|0;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,n=ny*W+nx;if(ok(nx,ny)&&prev[n]<0){prev[n]=c;q.push(n);}}}
  if(prev[ti]<0)return null;
  const pts=[];for(let c=ti;c!==prev[c];c=prev[c])pts.push([c%W+.5,((c/W)|0)+.5]);pts.reverse();
  const out=[];for(let i=0;i<pts.length;i++){const a=out[out.length-1],b=pts[i],n=pts[i+1];if(a&&n&&((a[0]===b[0]&&b[0]===n[0])||(a[1]===b[1]&&b[1]===n[1])))continue;out.push(b);}
  out.push([tx,ty]);return out;
}
function routeTo(f,t){
  {const p=npcPath(f.x,f.y,t[0],t[1]);if(p){f.legs=p;return;}}
  const legs=[];
  if(Math.abs(f.y-t[1])>.6&&Math.abs(f.x-t[0])>.6){const ry=Math.abs(f.y-8.6)<Math.abs(f.y-5.6)?8.6:5.6;legs.push([f.x,ry],[t[0],ry]);}
  else legs.push([t[0],f.y]);
  legs.push([t[0],t[1]]);f.legs=legs;
}
function updateFolks(dt){
  const fa=festActive();
  for(const id in folks){const d=NPCS[id],f=folks[id];f.moving=false;
    if(fa&&fa.area){if(fa.folks.includes(id)&&folksOut()){f.hidden=true;f.moving=false;continue;}}
    else if(fa){if(!folksOut())continue;const sp=(S.rel.spouse===id&&!d.spot)?[18,6]:d.spot[fa.id==='loy'?'pond':'plaza'];f.x=sp[0];f.y=sp[1];f.hidden=false;f.face=fa.id==='loy'?'up':'down';f.legs=[];continue;}
    if(d.fixed)continue;
    const pl=schedPlace(id);
    if(pl!==f.place){f.place=pl;f.pause=0;const P=PLACES[pl];
      if(f.hidden&&!P.home){const h=PLACES[homeOf(id)].home;f.x=h[0];f.y=h[1];f.hidden=false;}
      if(!f.hidden)routeTo(f,P.home||P.at||P.wp[0]);}
    if(f.hidden)continue;
    if(f.pause>0){f.pause-=dt;continue;}
    const P=PLACES[f.place];
    if(!f.legs.length){
      if(P.home){f.hidden=true;continue;}
      if(P.at){f.face='down';f.pause=3;continue;}
      const opts=P.wp.filter(p=>Math.hypot(p[0]-f.x,p[1]-f.y)>.5);const t=opts[Math.floor(Math.random()*opts.length)];routeTo(f,t);}
    const [tx,ty]=f.legs[0],dx=tx-f.x,dy=ty-f.y,l=Math.hypot(dx,dy),sp=1.6*dt;
    if(l<=sp){f.x=tx;f.y=ty;f.legs.shift();if(!f.legs.length)f.pause=2+Math.random()*4;}
    else{f.x+=dx/l*sp;f.y+=dy/l*sp;f.moving=true;f.walk+=dt*5.4;f.face=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');}
  }
}
let wasFest=null;
function update(dt){
  if(!modal.hidden||transitioning)return;
  let mx=joy.x,my=joy.y;if(busFx){mx=0;my=0;}
  if(auto&&(Math.hypot(mx,my)>.18||keys.left||keys.right||keys.up||keys.down||fish||act&&act.a!=='yawn'))auto=null;
  if(auto){auto.t+=dt;while(auto.pts.length&&Math.hypot(auto.pts[0][0]-S.px,auto.pts[0][1]-S.py)<.12)auto.pts.shift();
    if(!auto.pts.length||auto.t>20){if(auto.face)S.face=auto.face;const th=!auto.pts.length&&auto.then;auto=null;if(th)th();}
    else{const [ax,ay]=auto.pts[0],dx=ax-S.px,dy=ay-S.py,l=Math.hypot(dx,dy);mx=dx/l;my=dy/l;
      if(Math.abs(dx)>.06&&Math.abs(dy)>.06){if(Math.abs(dx)>Math.abs(dy)){my=0;mx=Math.sign(dx);}else{mx=0;my=Math.sign(dy);}}}}
  if(keys.left)mx=-1; if(keys.right)mx=1;
  if(keys.up)my=-1; if(keys.down)my=1;
  let m=Math.hypot(mx,my);
  S.moving=m>0.18&&!rocket&&!rocketFx&&!(act&&act.a!=='yawn');if(S.moving&&act&&act.a==='yawn')act=null;
  updateAct(dt);if(S.moving)idleT=0;else idleT+=dt;yawnCd-=dt;
  if(!act&&!fish&&!S.moving&&idleT>4&&yawnCd<=0&&S.stam<S.maxStam*.18&&scene==='farm'&&sprOk('act_yawn_down_0')){startAct('yawn',null);yawnCd=30;}
  if(S.moving&&fish){if(fish.phase==='wait'){endFish();toast('เก็บเบ็ดแล้ว');}else S.moving=false;}
  if(S.moving){
    if(m>1){mx/=m;my/=m;m=1;}
    if(Math.abs(mx)>Math.abs(my))S.face=mx>0?'right':'left';else S.face=my>0?'down':'up';
    const sp=2.9*dt*(riding&&scene==='farm'?1.8:1), r=.28;
    const nx=S.px+mx*sp;
    if(!solidAt(nx-r,S.py-.1)&&!solidAt(nx+r,S.py-.1)&&!solidAt(nx-r,S.py+r)&&!solidAt(nx+r,S.py+r))S.px=nx;
    const ny=S.py+my*sp;
    if(!solidAt(S.px-r,ny-.1)&&!solidAt(S.px+r,ny-.1)&&!solidAt(S.px-r,ny+r)&&!solidAt(S.px+r,ny+r))S.py=ny;
    const pw=S.walk||0;S.walk=pw+dt*(riding?6:9.5)*m;
    const stepK=riding?1.2:(sprOk('c_me_down_w7')?2.1/4:1.4/2);if(Math.floor(S.walk*stepK)!==Math.floor(pw*stepK))footstep();
  }
  updateFish(dt);updateRocket(dt);updateBus(dt);updateFw(dt);crowTick(dt);
  S.t+=dt*({slow:2.5,normal:4,fast:6}[S.opt.speed]||4);
  if(S.t>=1440){sleep(true);return;}
  const fa=festActive();
  if(fa&&wasFest!==fa.id){toast(`งาน${fa.n}เริ่มแล้ว! ${fa.where}`);if(fa.id==='loy')for(let i=0;i<3;i++)addKrathong(false);}
  if(!fa&&wasFest){resetFolks();}
  wasFest=fa?fa.id:null;
  S.hens.forEach(h=>wander(h,dt,20.3,23.7,12.3,15.7,'hen'));
  S.cows.forEach(c=>wander(c,dt,28.4,32.5,12.5,15.6,c.kind||'cow'));
  S.ducks.forEach(d=>wander(d,dt,3.2,6.8,2.3,4.7,'duck'));
  if(scene==='mine')updateMine(dt);
  if(scene==='area')updateArea(dt);
  if(scene==='farm')updatePet(dt);
  updateFolks(dt);
  for(const k of krathongs){k.x+=k.vx*dt;k.ph+=dt;if(k.x>6.7||k.x<3.2)k.vx*=-1;}
  if(fa&&fa.id==='songkran'&&Math.random()<dt*3){const ids=Object.keys(folks);const f=folks[ids[Math.floor(Math.random()*ids.length)]];splash(f.x+(Math.random()-.5),f.y-.3,5);}
  updateMarket(dt);
  if(toastT>0){toastT-=dt;if(toastT<=0)$('toast').classList.remove('show');}
}
const shoppers=Array.from({length:4},(_,i)=>({x:20.5+i,y:3.6,tx:21,ty:3.6,walk:0,look:{shirt:['#6fa8dc','#e0a03a','#8fbf6a','#c07ab8'][i],skin:['#f1c9a0','#d9a878','#e8b88a','#c9956a'][i],hair:['#2b1d12','#4a3a2a','#2b1d12','#6b4423'][i]}}));
function updateMarket(dt){
  if(marketOpen()){
    for(const p of shoppers){const dx=p.tx-p.x,dy=p.ty-p.y,l=Math.hypot(dx,dy);
      if(l<.05){p.tx=20.4+Math.random()*5.2;p.ty=3.2+Math.random()*.9;}else{const sp=Math.min(l,1.2*dt);p.x+=dx/l*sp;p.y+=dy/l*sp;p.walk+=dt*9;p.face=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');}}
    const st=S.stall;if(!st||!st.items.length)return;
    st.tm=(st.tm||0)+dt;if(st.tm<2.4)return;st.tm=0;
    for(let i=st.items.length-1;i>=0;i--){const it=st.items[i],hot=S.hot.includes(it.k);
      if(Math.random()<.22*(hot?1.6:1)){const price=stallPrice(it.k);it.n--;S.money+=price;st.earned+=price;earn('ตลาดนัด',price);
        pop(20.5,3.6,'+฿'+price,'#ffe07a');sfx('coin');if(it.n<=0)st.items.splice(i,1);}}
  }else if(S.stall&&S.t>=MARKET.to&&weekday()===5){
    let back=0;for(const it of S.stall.items){S.prod[it.k]+=it.n;back+=it.n;}
    toast(`ตลาดนัดปิดแล้ว ขายได้ ฿${S.stall.earned}${back?` · เหลือ ${back} ชิ้นคืนตะกร้า`:''}`);S.stall=null;
  }
}

// ---------- mine ----------
function openMineEntry(){
  const cps=[1];for(let f=5;f<=S.mineMax;f+=5)cps.push(f);
  showModal(`<h2>เหมืองบนเขา</h2><p>ทุบหินหาแร่และอัญมณี หาบันไดที่ซ่อนอยู่ใต้หินเพื่อลงชั้นถัดไป ระวังค้างคาวกับก้อนโคลนดูดแรง</p>
    <p class="lv">ถึงชั้น 5, 10, 15 แล้วจะลงลิฟต์ไปชั้นนั้นได้ทันที · ชั้นลึกสุด ${MINE_MAX}</p>
    <div class="row">${cps.map(f=>`<button class="btn ${f===1?'':'ghost'}" data-mine="${f}">ชั้น ${f}</button>`).join('')}<button class="btn ghost" data-close>ไว้ก่อน</button></div>`);
}
function genFloor(n){
  const t=[];for(let y=0;y<MINE_H;y++){t.push([]);for(let x=0;x<MINE_W;x++)t[y].push(x===0||y===0||x===MINE_W-1||y===MINE_H-1?'x':'f');}
  t[5][1]='U';
  if(n%5===0)for(let y=2;y<=3;y++)for(let x=11;x<=13;x++)t[y][x]='w';
  const obj={},keys=[];
  for(let y=1;y<MINE_H-1;y++)for(let x=1;x<MINE_W-1;x++){if(t[y][x]!=='f'||(x<=3&&Math.abs(y-5)<=1))continue;
    if(Math.random()<.48){let ore=null;const r=Math.random()*(lvl('mine')>=10?.8:1);
      if(n>=8&&r<.04)ore=Math.random()<.5?'ruby':'emerald';
      else if(n>=11&&r<.14)ore='au';else if(n>=6&&r<.22)ore='ag';else if(r<.25)ore='cu';
      obj[x+','+y]={ore,hp:ore?2:1};keys.push(x+','+y);}}
  const lad=keys[Math.floor(Math.random()*keys.length)];if(lad)obj[lad].ladder=true;
  const mobs=[];const cnt=Math.min(9,1+Math.floor(n/2.5));
  if(n===MINE_MAX&&!S.perks.crown)obj['8,5']={chest:true,hp:1};
  if(n===5&&!(S.relics&&S.relics.diary)){delete obj['12,8'];obj['12,8']={relic:'diary',hp:1};}
  if(n===10&&!(S.berries&&S.berries.mine10)){delete obj['12,8'];obj['12,8']={berry:true,hp:1};}
  for(let i=0;i<cnt;i++){for(let j=0;j<30;j++){const x=4+Math.floor(Math.random()*(MINE_W-6)),y=1+Math.floor(Math.random()*(MINE_H-2));
    if(t[y][x]==='f'&&!obj[x+','+y]){const r=Math.random(),kind=n>=11&&r<.3?'golem':n>=3&&r<.65?'bat':'slime';mobs.push({x:x+.5,y:y+.5,kind,hp:kind==='golem'?4+Math.floor(n/6):kind==='bat'?1+Math.floor(n/10):2+Math.floor(n/6),ph:Math.random()*6,hit:0});break;}}}
  return{n,t,obj,mobs,hurt:0};
}
function enterMine(n){closeModal();scene='mine';riding=false;mine=genFloor(n);S.px=2.5;S.py=5.5;S.face='right';
  S.mineDeep=Math.max(S.mineDeep,n);sfx('boom');toast(`เหมืองชั้น ${n}`);}
function exitMine(msg){scene='farm';mine=null;S.px=40.5;S.py=22.5;S.face='left';toast(msg||'ออกจากเหมืองแล้ว');}
function mineSolid(x,y){if(!mine||x<0||y<0||x>=MINE_W||y>=MINE_H)return true;const c=mine.t[y][x];if(c==='x'||c==='w'||c==='U')return true;return!!mine.obj[x+','+y];}
function mineContext(){
  const {tx,ty}=target(),cx=tx+.5,cy=ty+.5;
  const mob=mine.mobs.find(m=>Math.hypot(m.x-cx,m.y-cy)<.85||Math.hypot(m.x-S.px,m.y-S.py)<.75);
  const lv=S.tools.hammer,hs=Math.max(1,TOOLS.hammer.stam[lv]-(lvl('mine')>=3?1:0));
  if(mob)return{l:'ตี',h:{bat:'ค้างคาว',slime:'ก้อนโคลน',golem:'ภูตหิน (แข็งแรง)'}[mob.kind]+` · เลือด ${mob.hp}`,cost:1,fn:()=>{mob.hp--;mob.hit=.25;shake(3,.14);sfx('till');
    const a=Math.atan2(mob.y-S.py,mob.x-S.px);mob.x+=Math.cos(a)*.4;mob.y+=Math.sin(a)*.4;
    if(mob.hp<=0){xp('mine',mob.kind==='golem'?8:3);mine.mobs.splice(mine.mobs.indexOf(mob),1);if(mob.kind==='bat'||Math.random()<.4){gain('guano');pop(mob.x,mob.y-.3,'+1 มูลค้างคาว','#e0d0b0');}}}};
  const c=mine.t[ty]&&mine.t[ty][tx],o=mine.obj[tx+','+ty];
  if(o&&o.relic)return{l:'เก็บ',h:'สมุดเก่าห่อพลาสติกซุกอยู่ในซอกหิน',fn:()=>{delete mine.obj[tx+','+ty];giveRelic(o.relic);}};
  if(o&&o.berry)return{l:'เก็บ',h:'ผลไม้เรืองแสงงอกจากรอยแตกของหิน',fn:()=>{delete mine.obj[tx+','+ty];giveBerry('mine10','ในซอกหินชั้น 10 มีพุ่มไม้เล็กๆ ออกผลสีม่วงเรืองแสง กินแล้วรู้สึกมีแรงขึ้นมาก');}};
  if(o&&o.chest)return{l:'เปิดหีบ',h:'หีบสมบัติก้นเหมือง',fn:()=>{delete mine.obj[tx+','+ty];S.perks.crown=true;giveBerry('chest','ใต้กองเหรียญในหีบมีผลไม้สีม่วงห่อผ้าไหมไว้อย่างดี');S.money+=3000;earn('สมบัติในเหมือง',3000);gain('ruby',2);gain('emerald',2);S.maxStam+=20;sfx('upgrade');
    showModal(`<h2>หีบสมบัติก้นเหมือง!</h2><p>ในหีบมีเงินโบราณ ฿3,000 ทับทิม 2 เม็ด มรกต 2 เม็ด และ<b>พระเครื่องหินนำโชค</b></p><p>พกติดตัวแล้วแรงสูงสุด +20 ถาวร</p><div class="row"><button class="btn" data-close>เยี่ยมเลย</button></div>`);}};
  if(o)return{l:'ทุบ',h:o.ore?`${ITEMS[o.ore].n} · ใช้แรง ${hs}`:`หิน · ใช้แรง ${hs}`,cost:hs,fn:()=>{o.hp-=1+lv;sfx('boom');
    if(o.hp>0){pop(cx,cy-.2,'แตกร้าว','#ddd');return;}
    delete mine.obj[tx+','+ty];xp('mine',o.ore?5:2);if(o.ore){gain(o.ore);if(lvl('mine')>=5&&Math.random()<.25)gain(o.ore);pop(cx,cy-.3,'+1 '+ITEMS[o.ore].n,'#ffe07a');}else if(Math.random()<.5){S.mat.stone++;pop(cx,cy-.3,'+1 หิน','#ddd');}
    if(o.ladder){mine.t[ty][tx]='D';toast('เจอบันไดลงชั้นถัดไป!');sfx('upgrade');}}};
  if(c==='D')return mine.n>=MINE_MAX?{l:'—',h:'ชั้นล่างสุดแล้ว',dis:true}:{l:'ลงบันได',h:`ลงไปชั้น ${mine.n+1}`,fn:()=>{const n=mine.n+1;if(n%5===0)S.mineMax=Math.max(S.mineMax,n);enterMine(n);}};
  if(c==='U')return{l:'ขึ้นไป',h:'ออกจากเหมือง',fn:()=>exitMine()};
  if(c==='w')return{l:'ตกปลา',h:'บ่อน้ำใต้ดิน · ใช้แรง 2',cost:2,fn:()=>startFish(tx,ty)};
  return{l:'—',h:`เหมืองชั้น ${mine.n} · ทุบหินหาบันได`,dis:true};
}
function updateMine(dt){
  if(!mine)return;mine.hurt=Math.max(0,mine.hurt-dt);
  for(const m of mine.mobs){m.ph+=dt;m.hit=Math.max(0,m.hit-dt);
    const dx=S.px-m.x,dy=S.py-m.y,l=Math.hypot(dx,dy),sp=(m.kind==='bat'?1.4+mine.n*.04:m.kind==='golem'?.45:.55+mine.n*.02)*dt;
    let vx=0,vy=0;if(l<6&&l>.05){vx=dx/l*sp;vy=dy/l*sp;}
    if(m.kind==='bat'){vx+=Math.cos(m.ph*3)*dt*.8;vy+=Math.sin(m.ph*2.3)*dt*.8;}
    const nx=m.x+vx,ny=m.y+vy;
    if(m.kind==='bat'||!mineSolid(Math.floor(nx),Math.floor(m.y)))m.x=Math.max(1.2,Math.min(MINE_W-1.2,nx));
    if(m.kind==='bat'||!mineSolid(Math.floor(m.x),Math.floor(ny)))m.y=Math.max(1.2,Math.min(MINE_H-1.2,ny));
    if(l<.55&&mine.hurt<=0){const dmg=Math.round((m.kind==='golem'?14:m.kind==='bat'?5+Math.floor(mine.n/4):4+Math.floor(mine.n/3))*(lvl('mine')>=8?.7:1));mine.hurt=1;S.stam=Math.max(0,S.stam-dmg);sfx('fail');pop(S.px,S.py-1,`-${dmg} แรง`,'#ff9a8a');
      const a=Math.atan2(dy,dx),kx=S.px+Math.cos(a)*.6,ky=S.py+Math.sin(a)*.6;if(!solidAt(kx,ky)){S.px=kx;S.py=ky;}
      if(S.stam<=0){S.t=Math.min(1430,S.t+120);exitMine('หมดแรงในเหมือง ชาวบ้านช่วยพาออกมา');return;}}}
}

// ---------- trips: beach & waterfall (bus from the village) ----------
const AREAS={
  beach:{n:'ชายหาด',bg:'beach',W:32,H:18,grid:["#...############################", "#...S###########################", "#...S###########################", "#...S#.#########################", "#......#....#...#....#.#.#######", "............#..........#.##HH###", "................................", "................................", "................................", "................................", "###.....................##......", "................................", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~..~~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~..~~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~..~~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~....~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~....~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"],start:[3.5,4.6],face:'down',fish:'sea',water:'ทะเล',fill:'#7cc6d8',hint:'เดินเก็บของริมหาด ตกปลาทะเล แวะเพิงขายของ'},
  falls:{n:'น้ำตกบนเขา',bg:'falls',W:32,H:18,grid:["################################", "################################", "################################", "################################", "################################", "##########~~~~~~~~~~~~##########", "#########~~~~~~~~~~~~~~#########", "#########~~~~~~~~~~~~~~#########", "....#########~~~~~~~~~##########", "....###...####.....##.###..#####", "#..........................#####", "#...........................####", "#.............................##", "SSS........................#####", "SSS.........................####", "SSS.........................####", "##..........................####", "##..........................####"],start:[3.5,14.6],face:'right',fish:'falls',water:'แอ่งน้ำตก',fill:'#3d6b3a',hint:'หาของป่าหายาก ตกปลาที่แอ่งน้ำตก'}
};
const BUS_FARE=50,BUS_HOME=[41.5,5.55];
if(S&&S.area){if(AREAS[S.area])scene='area';else S.area=null;}
if(S&&S.inHouse&&scene==='farm')scene='house';
if(S){checkUnlocks(true);applyUnlocks();}
const gridW=()=>scene==='area'?AREAS[S.area].W:scene==='house'?HW:W,gridH=()=>scene==='area'?AREAS[S.area].H:scene==='house'?HH:H;
const BGIMG={};
function bgImg(k){if(!BGIMG[k]&&typeof BGSRC!=='undefined'&&BGSRC[k]){const im=new Image();im.src=BGSRC[k];BGIMG[k]=im;}return BGIMG[k];}
function areaSolid(x,y){const A=AREAS[S.area];if(!A)return true;const r=A.grid[y];if(!r||x<0||x>=A.W)return true;return '#~SH'.includes(r[x])||boothSolid(x,y);}
const AF_POOL={beach:[['shell',40],['seaweed',30],['oyster',24],['pearl',2]],falls:[['orchid',22],['lingzhi',16],['honeycomb',18],['mush',28]]};
const AF_ROWS={beach:[6,11],falls:[10,17]};
function pickW(L){let r=Math.random()*L.reduce((a,x)=>a+x[1],0);for(const [k,w] of L)if((r-=w)<=0)return k;return L[0][0];}
function genAF(id){S.aF=S.aF||{};if(S.aF[id]&&S.aF[id].day===S.day)return;const A=AREAS[id],[y0,y1]=AF_ROWS[id],items=[],n=id==='beach'?6:4;
  for(let i=0;i<n;i++)for(let j=0;j<60;j++){const x=1+Math.floor(Math.random()*(A.W-2)),y=y0+Math.floor(Math.random()*(y1-y0+1));
    if(A.grid[y][x]!=='.'||items.some(f=>Math.abs(f.x-x)+Math.abs(f.y-y)<2)||(Math.abs(x+.5-A.start[0])<1.5&&Math.abs(y+.5-A.start[1])<1.5))continue;
    items.push({x,y,k:pickW(AF_POOL[id])});break;}
  if(!(S.berries&&S.berries[id])&&((S.trips&&S.trips[id])||0)>=3&&Math.random()<.4&&items.length){items[items.length-1].k='berry';}
  S.aF[id]={day:S.day,items};}
function areaForage(){const a=S.aF&&S.aF[S.area];return a&&a.day===S.day?a.items:[];}
function pickAF(f){const L=areaForage(),i=L.indexOf(f);if(i<0)return;L.splice(i,1);
  if(f.k==='berry'){giveBerry(S.area,S.area==='beach'?'คลื่นซัดผลไม้ประหลาดสีม่วงมาเกยหาด มันยังสดและเรืองแสงอ่อนๆ':'ต้นไม้เล็กๆ หลังโขดหินข้างน้ำตกออกผลสีม่วงเรืองแสงอยู่ลูกเดียว');return;}gain(f.k);stat('forage');xp('farm',2);
  let msg='+1 '+ITEMS[f.k].n;if(f.k==='oyster'&&Math.random()<.08){gain('pearl');msg+=' · มีไข่มุกด้วย!';sfx('upgrade');}else sfx('harvest');
  pop(f.x+.5,f.y+.2,msg,f.k==='pearl'||msg.includes('ไข่มุก')?'#ffe07a':'#fff');
  if(!L.length)toast(`เก็บของที่${AREAS[S.area].n}หมดแล้ววันนี้ พรุ่งนี้มีใหม่`);}
const DAED={x:29.6,y:6.5,face:'down',walk:0,moving:false,tx:29.6,pause:2};
const DAED_LOOK={sk:'daed'};
function updateArea(dt){
  if(S.area==='beach'&&hutOpen()){const d=DAED;d.moving=false;
    if(d.pause>0)d.pause-=dt;else{const dx=d.tx-d.x;if(Math.abs(dx)<.05){d.pause=3+Math.random()*5;d.tx=25.6+Math.random()*5;d.face='down';}
      else{const st=Math.sign(dx)*Math.min(Math.abs(dx),dt*1.1);d.x+=st;d.face=dx>0?'right':'left';d.moving=true;d.walk+=dt*7;}}}
  updateSand(dt);
}
const areaFest=()=>{const f=festActive();return f&&f.area===S.area?f:null;};
function festFolks(){const f=areaFest();if(!f)return[];return f.folks.map((id,i)=>({id,x:f.at[i][0],y:f.at[i][1]})).filter(o=>folks[o.id]&&NPCS[o.id]);}
const SAND_SPOT=[15.5,8.6];
let sandG=null,sandCastle=0;
function startSand(){sandG={r:0,score:0,pos:0,dir:1,sp:1.3,z0:0,zw:.22};sandNext();}
function sandNext(){const g=sandG;g.zw=.22-g.r*.03;g.sp=1.3+g.r*.35;g.z0=.12+Math.random()*(.76-g.zw);meterShow(`รอบ ${g.r+1}/3 · กด ก่อ! ตอนเข็มอยู่กลางช่องเขียว`);meterZone(g.z0,g.zw);}
function updateSand(dt){const g=sandG;if(!g)return;g.pos+=g.dir*g.sp*dt;if(g.pos>1){g.pos=1;g.dir=-1;}if(g.pos<0){g.pos=0;g.dir=1;}meterNeedle(g.pos);}
function sandHit(){const g=sandG,c=g.z0+g.zw/2,d=Math.abs(g.pos-c),p=d<g.zw*.18?3:d<=g.zw/2?2:0;g.score+=p;sandCastle=g.score;
  sfx(p?'harvest':'fail');pop(SAND_SPOT[0],SAND_SPOT[1]-.8,p===3?'เป๊ะ! +3':p?'ดี +2':'ทรายพัง','#fff');g.r++;
  if(g.r<3){sandNext();return;}
  sandG=null;meterHide();S.festDone.sand=true;const sc=g.score,pr=sc>=8?1500:sc>=5?600:150,rank=sc>=8?'ชนะเลิศ!':sc>=5?'รองชนะเลิศ':'รางวัลชมเชย';
  S.money+=pr;earn('เทศกาล',pr);festFolks().forEach(o=>addH(o.id,1));sfx(sc>=5?'upgrade':'coin');if(sc>=8)giveBerry('contest','กรรมการมอบผลไม้วิเศษเป็นรางวัลพิเศษให้แชมป์');
  setTimeout(()=>showModal(`<h2>ประกวดก่อกองทราย</h2><p>ปราสาทของคุณได้ ${sc}/9 คะแนน · <b>${rank}</b></p><p>ได้รางวัล ฿${pr.toLocaleString('en-US')} · ชาวบ้านที่มาเที่ยวด้วยหัวใจ +1</p><div class="row"><button class="btn" data-close>เยี่ยม</button></div>`),500);}
const JUDGE_PRIZE=[['mahseer',2000,'ที่ 1'],['krai',900,'ที่ 2'],['kung',500,'ที่ 3'],['taphien',200,'รางวัลชมเชย']];
function openJudge(){const best=JUDGE_PRIZE.find(([k])=>S.prod[k]>0);
  showModal(`<div class="npcHead"><h2>แข่งตกปลาน้ำตก</h2><small>ลุงมีเป็นกรรมการ</small></div><div class="talk">${face('mee',1)}<p class="quote">${S.festDone.fishc?'“ส่งปลาไปแล้วนะ ไว้ปีหน้ามาแข่งใหม่”':best?`“ตัวที่ดีที่สุดในข้องคือ${ITEMS[best[0]].n} จะส่งตัวนี้เลยไหม”`:'“ยังไม่มีปลาจากน้ำตกเลยนี่ ไปตกที่แอ่งน้ำก่อนนะ”'}</p></div>
    <div class="lv">ปลาพลวงหิน ฿2,000 · ปลากราย ฿900 · กุ้งก้ามกราม ฿500 · ปลาตะเพียน ฿200</div>
    <div class="row">${best&&!S.festDone.fishc?'<button class="btn" data-judge>ส่งปลาประกวด</button>':''}<button class="btn ghost" data-close>ปิด</button></div>`);}
function judgeFish(){const best=JUDGE_PRIZE.find(([k])=>S.prod[k]>0);if(!best||S.festDone.fishc)return;const [k,pr,rank]=best;
  S.prod[k]--;S.festDone.fishc=true;S.money+=pr;if(rank==='ที่ 1')giveBerry('contest','ลุงมีมอบผลไม้วิเศษเป็นรางวัลพิเศษให้แชมป์ตกปลา');earn('เทศกาล',pr);addH('mee',2);festFolks().forEach(o=>addH(o.id,1));sfx('upgrade');
  showModal(`<h2>ผลการแข่งตกปลา</h2><div class="talk">${face('mee',2)}<p class="quote">“${ITEMS[k].n}ตัวงามเลย! ได้${rank}ไปเลย”</p></div><p>ได้รางวัล ฿${pr.toLocaleString('en-US')}</p><div class="row"><button class="btn" data-close>เยี่ยม</button></div>`);}
function areaContext(){
  const {tx,ty}=target(),A=AREAS[S.area],c=(A.grid[ty]||'')[tx],px=Math.floor(S.px),py=Math.floor(S.py),cx=tx+.5,cy=ty+.5,fa=areaFest();
  for(const o of festFolks())if(Math.hypot(o.x-cx,o.y-cy)<.95||Math.hypot(o.x-S.px,o.y-S.py)<.7){
    if(fa.id==='fishc'&&o.id==='mee')return{l:'คุย',h:'ลุงมี · กรรมการแข่งตกปลา',fn:()=>{sfx('talk');openJudge();}};
    return{l:'คุย',h:`${NPCS[o.id].n} · มาเที่ยวงาน${fa.n}`,fn:()=>{sfx('talk');openNpc(o.id);}};}
  {const ar=areaRelic(tx,ty);if(ar)return{l:'ขุด',h:'มีอะไรแวววาวจมดินอยู่',fn:()=>giveRelic(ar.id)};}
  if(S.area==='beach'&&hutOpen()&&(Math.hypot(DAED.x-cx,DAED.y-cy)<.95||Math.hypot(DAED.x-S.px,DAED.y-S.py)<.7))return{l:'คุย',h:'ป้าแดด · เจ้าของเพิงริมหาด',fn:()=>{sfx('talk');openHut();}};
  if(fa&&fa.id==='sand'&&Math.hypot(SAND_SPOT[0]-cx,SAND_SPOT[1]-cy)<1.6)return S.festDone.sand?{l:'—',h:'ส่งปราสาททรายเข้าประกวดแล้ว',dis:true}:{l:'ก่อทราย',h:'ประกวดก่อกองทราย 3 รอบ · ใช้แรง 4',cost:4,fn:startSand};
  const f=areaForage().find(f=>(f.x===tx&&f.y===ty))||areaForage().find(f=>f.x===px&&f.y===py);
  if(f)return{l:'เก็บ',anim:'pick',h:f.k==='berry'?'ผลไม้ประหลาดเรืองแสง':ITEMS[f.k].n,fn:()=>pickAF(f)};
  if(c==='S')return{l:'ขึ้นรถ',h:'ป้ายรถสองแถว · กลับหมู่บ้านหรือไปที่อื่น',fn:openBus};
  if(c==='H')return{l:'ซื้อ',h:'เพิงป้าแดดริมหาด · ของกินและรับซื้อของทะเล',fn:()=>openHut()};
  if(c==='~')return{l:'ตกปลา',h:`${S.area==='beach'&&S.py>=12?'ปลายท่าเรือ · ปลาทะเลลึก':A.water} · ใช้แรง 2${baitTxt()}`,cost:2,fn:()=>startFish(tx,ty)};
  return{l:'—',h:`${A.n} · ${A.hint}`,dis:true};
}
function walkToBus(){if(scene!=='area'||!modal.hidden||transitioning||fish||sandG)return;const A=AREAS[S.area];let best=null;
  A.grid.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='S'){const d=Math.abs(x-S.px)+Math.abs(y-S.py);if(!best||d<best[2])best=[x,y,d];}}));
  if(!best)return openBus();const p=tapPath(best[0],best[1]);if(!p||p.pts.length<=1){const [ex,ey]=p?p.end:[best[0],best[1]];S.face=best[0]>ex?'right':best[0]<ex?'left':best[1]>ey?'down':'up';return openBus();}
  const [ex,ey]=p.end;auto={pts:p.pts,face:best[0]>ex?'right':best[0]<ex?'left':best[1]>ey?'down':'up',mark:[best[0],best[1]],t:0,then:openBus};toast('เดินไปป้ายรถสองแถว...');}
$('busBtn').addEventListener('click',()=>{sfx('ui');walkToBus();});
function busOpen(){return S.t>=390&&S.t<=1080;}
function openBus(){const inA=scene==='area',op=busOpen();
  const dest=Object.keys(AREAS).filter(id=>id!==S.area).map(id=>{const A=AREAS[id];
    return`<div class="need"><span><b>${A.n}</b> · ฿${BUS_FARE}<br><small>${A.hint}</small></span><button class="btn" data-bus="${id}" ${!op||S.money<BUS_FARE?'disabled':''}>ไป</button></div>`;}).join('');
  showModal(`<h2>ป้ายรถสองแถว</h2><p>รถออกทุกครึ่งชั่วโมง 06:30–18:00 · นั่งรถ 30 นาที${inA?' · ตั๋วขากลับหมู่บ้านฟรี':''}</p>
    ${op?'':'<div class="req">รถเที่ยวสุดท้ายออกไปแล้ว'+(inA?' แต่ลุงคนขับยังรอพาคนกลับหมู่บ้านอยู่':' พรุ่งนี้เช้ามาใหม่นะ')+'</div>'}
    ${dest}
    ${inA?`<div class="row"><button class="btn" data-bus="home">กลับหมู่บ้าน</button><button class="btn ghost" data-close>อยู่ต่อ</button></div>`:'<div class="row"><button class="btn ghost" data-close>ปิด</button></div>'}`);}
let busFx=null;
function busAnim(dir,done){if(window.__noTransition||reduceMotion()||!sprOk('x_bus')){if(done)done();return;}closeModal();auto=null;S.face=dir==='out'?'down':'down';busFx={x:32,t:0,ph:'come',dir,done,hide:dir==='in'};sfx('ui');}
function updateBus(dt){const B=busFx;if(!B)return;B.t+=dt;
  if(B.ph==='come'){B.x=Math.min(40.6,B.x+dt*Math.max(1.4,(40.6-B.x)*2.4));if(B.x>=40.59){B.ph='stop';B.t=0;}}
  else if(B.ph==='stop'){if(B.t>.45&&B.hide===(B.dir==='in')){B.hide=B.dir==='out';sfx('talk');}if(B.t>1.1){B.ph='go';B.t=0;}}
  else{B.x+=dt*(1.5+B.t*9);if(B.x>48){busFx=null;if(B.done)B.done();}}}
function drawBus(){const B=busFx,s=TS,bob=B.ph==='stop'?0:Math.sin(clock*22)*s*.015;groundShadow(wx(B.x),wy(5.95),s*1.4,s*.16);sprAt('x_bus',wx(B.x),wy(6.0)+bob,s*3.1,false,s*2.2);}
function travelFade(title,fn){closeModal();if(window.__noTransition||reduceMotion()){fn();return;}
  transitioning=true;const f=$('dayFade');$('dayFadeTxt').textContent=title;f.classList.add('on');sfx('ui');
  setTimeout(()=>{fn();f.classList.remove('on');transitioning=false;},900);}
function busGo(d){
  closeModal();
  if(d==='home'){travelFade('นั่งรถกลับหมู่บ้าน...',()=>{S.t=Math.min(1430,S.t+30);leaveArea();busAnim('in');});return;}
  if(!busOpen()||S.money<BUS_FARE)return;S.money-=BUS_FARE;
  const go=()=>travelFade(`นั่งรถไป${AREAS[d].n}...`,()=>{S.t=Math.min(1430,S.t+30);enterArea(d);});
  if(scene==='farm'){closeModal();busAnim('out',go);}else go();}
function enterArea(id){const A=AREAS[id];scene='area';S.area=id;riding=false;auto=null;$('rideBtn').classList.remove('sel');
  S.px=A.start[0];S.py=A.start[1];S.face=A.face;genAF(id);S.trips=S.trips||{};S.trips[id]=(S.trips[id]||0)+1;stat('trip');
  toast(`ถึง${A.n}แล้ว`);setTimeout(()=>tip('area_'+id,id==='beach'?'ชายหาด: เก็บเปลือกหอย สาหร่าย หอยนางรม (บางทีมีไข่มุก!) ริมทะเลตกได้ปลาทู ปู กลางคืนมีปลาหมึก เพิงขวามือรับซื้อของทะเล กลับบ้านที่ป้ายรถซ้ายบน':'น้ำตก: มีกล้วยไม้ป่า เห็ดหลินจือ รวงผึ้งป่า ตกปลาพลวงหินที่แอ่งน้ำตกด้านบน กลับบ้านที่ป้ายรถซ้ายล่าง'),600);}
function leaveArea(msg){scene='farm';S.area=null;auto=null;S.px=BUS_HOME[0];S.py=BUS_HOME[1];S.face='down';
  if(S.pet){S.pet.x=S.px-.8;S.pet.y=S.py+.3;}toast(msg||'กลับถึงหมู่บ้านแล้ว');}
const HUT_MENU=['d_coco','d_squidg'],HUT_BUY=['plathu','crab','squid','lobster','kapong','insee','oyster','seaweed'];
const hutOpen=()=>S.t>=360&&S.t<1200;
function openHut(msg,e){
  if(!hutOpen()){showModal(`<div class="npcHead"><h2>เพิงป้าแดด</h2><small>ปิดแล้ว · เปิด 06:00–20:00</small></div><div class="talk">${face('daed',0)}<p class="quote">“ป้าเก็บร้านแล้วจ้า พรุ่งนี้มาใหม่นะ”</p></div><div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);return;}
  const buy=HUT_MENU.map(k=>{const p=Math.round(ITEMS[k].v*1.2);return`<div class="need"><span>${icon(k,24)}<b>${ITEMS[k].n}</b> · แรง +${ITEMS[k].e} · ฿${p}</span><button class="btn" data-hbuy="${k}" ${S.money<p?'disabled':''}>ซื้อ</button></div>`;}).join('');
  const bait='<div class="sub">เหยื่อตกปลา (ห่อละ 5 ชิ้น) · ติดเบ็ดได้ที่กระเป๋า</div>'+Object.keys(BAITS).map(k=>{const B=BAITS[k],p=B.p*5;return`<div class="need"><span>${icon(k,22)}<b>${B.n}</b> · ฿${p}${S.inv[k]?` · มี ${S.inv[k]}`:''}${S.bait===k?' · <b>ติดเบ็ดอยู่</b>':''}<br><small>${B.d}</small></span><button class="btn ghost" data-hbait="${k}" ${S.money<p?'disabled':''}>ซื้อ</button></div>`;}).join('');
  const rec=Object.keys(DISHES).filter(k=>DISHES[k].daed&&!S.known.includes(k));
  const recipes=rec.length?'<div class="sub">สูตรอาหารทะเลของป้า (ทำได้ที่ครัวไทยในบ้าน)</div>'+rec.map(k=>`<div class="need"><span>${icon(k,22)}<b>${ITEMS[k].n}</b> · ${inName(DISHES[k].in)}<br><small>ขาย ฿${ITEMS[k].v} · แรง +${ITEMS[k].e}</small></span><button class="btn ghost" data-hrec="${k}" ${S.money<DISHES[k].daed?'disabled':''}>ซื้อสูตร ฿${DISHES[k].daed}</button></div>`).join(''):'';
  const own=HUT_BUY.filter(k=>S.prod[k]>0);
  const sell=own.length?'<div class="sub">ป้าแดดรับซื้อของทะเลสด (ราคาตลาด +20% จ่ายเงินสดทันที)</div>'+own.map(k=>`<div class="need"><span>${icon(k,22)}${ITEMS[k].n} ×${S.prod[k]} · ชิ้นละ ฿${Math.round(unitPrice(k)*1.2)}</span><button class="btn ghost" data-hsell="${k}">ขาย 1</button><button class="btn ghost" data-hsell="${k}" data-all="1">ขายหมด</button></div>`).join(''):'<div class="lv">ตกปลาทะเลหรือเก็บหอยมาขายให้ป้าได้นะ ป้าให้ราคาดีกว่าตลาด</div>';
  const lines=['“มาเที่ยวเหรอหลาน นั่งพักกินน้ำมะพร้าวก่อน”','“ปลายท่าเรือน่ะ ปลาตัวใหญ่ชุม ใช้กุ้งฝอยนะ”','“กลางคืนปลาหมึกขึ้นเยอะ ป้าย่างขายทุกคืนเลย”','“หอยนางรมบางตัวมีไข่มุกนะ ลองแกะดูดีๆ”'];
  showModal(`<div class="npcHead"><h2>เพิงป้าแดด</h2><small>ริมหาด · 06:00–20:00</small></div><div class="talk">${face('daed',e===undefined?(msg?1:0):e)}<p class="quote">${msg||lines[S.day%lines.length]}</p></div>${buy}${sell}${bait}${recipes}<div class="row"><button class="btn ghost" data-close>ปิด</button></div>`);}
function nameTag(n,x,y){if(Math.hypot(x-S.px,y-S.py)>=2.6)return;const s=TS;ctx.font=`700 ${Math.round(s*.22)}px Mali, sans-serif`;ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#46290f';ctx.strokeText(n,wx(x),wy(y)+s*.55);ctx.fillStyle='#f7ecd2';ctx.fillText(n,wx(x),wy(y)+s*.55);}
function drawCastle(X,Y,s){const n=sandCastle,st=n>=8?3:n>=5?2:n>=1?1:0,SW=[345,381,472,627][st];
  if(sprOk('x_sand'+st)){groundShadow(X,Y+s*.3,s*.7,s*.14);sprAt('x_sand'+st,X,Y+s*.42,s*(.95+st*.25),false,s*(.7+st*.42));if(!n&&!S.festDone.sand){ctx.fillStyle='#46290f';ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('ลานก่อทราย',X,Y-s*.45);}return;}
  const sd='#e9cf8f',dk='#c9a865';groundShadow(X,Y+s*.3,s*.8,s*.18);
  ctx.fillStyle=sd;ctx.strokeStyle=dk;ctx.lineWidth=Math.max(1,s*.03);ctx.beginPath();ctx.ellipse(X,Y+s*.22,s*.75,s*.22,0,0,7);ctx.fill();ctx.stroke();
  const tiers=Math.min(4,Math.ceil(n/2.3));for(let i=0;i<tiers;i++){const w=s*(1.05-i*.22),h=s*.28,y=Y+s*.18-(i+1)*h;ctx.fillStyle=i%2?'#efd89c':sd;ctx.fillRect(X-w/2,y,w,h);ctx.strokeRect(X-w/2,y,w,h);
    for(let j=0;j<4;j++){ctx.fillRect(X-w/2+j*w/3.5,y-h*.25,w/7,h*.25);}}
  if(n>=8){const y=Y+s*.18-tiers*s*.28-s*.25;ctx.strokeStyle='#6b4423';ctx.beginPath();ctx.moveTo(X,y);ctx.lineTo(X,y-s*.45);ctx.stroke();ctx.fillStyle='#d4453a';ctx.beginPath();ctx.moveTo(X,y-s*.45);ctx.lineTo(X+s*.28,y-s*.36);ctx.lineTo(X,y-s*.27);ctx.fill();}
  if(!n&&!S.festDone.sand){ctx.fillStyle='#46290f';ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('ลานก่อทราย',X,Y-s*.25);}}
function drawMuseum(){const s=TS,cx=wx(41.5),by=wy(16.05);groundShadow(cx,by-s*.1,s*1.6,s*.2);
  if(!sprAt('b_museum',cx,by,s*3.3,false,s*2.9)){ctx.fillStyle='#f4efe2';ctx.fillRect(cx-s*1.4,by-s*1.6,s*2.8,s*1.5);ctx.fillStyle='#d9692b';ctx.beginPath();ctx.moveTo(cx-s*1.6,by-s*1.5);ctx.lineTo(cx,by-s*2.5);ctx.lineTo(cx+s*1.6,by-s*1.5);ctx.fill();}}
const BOOTH={sand:[15.5,7.15],fishc:[6.3,11.25]};
function boothSolid(x,y){const f=areaFest();if(!f||!BOOTH[f.id])return false;const [bx,by]=BOOTH[f.id];return y===Math.floor(by-.4)&&x>=Math.floor(bx-1)&&x<=Math.floor(bx+.9);}
function drawBusStop(){const s=TS,cx=wx(41.5),by=wy(7);groundShadow(cx,by-s*.06,s*.6,s*.12);
  if(!sprAt('x_busstop',cx,by+s*.02,s*1.35,false,s*1.35)){ctx.fillStyle='#8a5a2b';ctx.fillRect(cx-s*.05,by-s*1.1,s*.1,s*1.1);ctx.fillStyle='#2f7bbf';ctx.fillRect(cx-s*.35,by-s*1.25,s*.7,s*.35);ctx.fillStyle='#fff';ctx.font=`bold ${Math.round(s*.2)}px sans-serif`;ctx.textAlign='center';ctx.fillText('รถ',cx,by-s*1.02);}}
function drawArea(){
  const A=AREAS[S.area],s=TS,ww=A.W*s,wh=A.H*s;
  followCam(S.px*s,S.py*s,ww,wh);
  if(shakeT>0){shakeT-=frameDt;if(shakeT<=0)shakeA=0;}
  ctx.fillStyle=A.fill;ctx.fillRect(0,0,vw,vh);
  const im=bgImg(A.bg);if(im&&im.complete&&im.naturalWidth)ctx.drawImage(im,-camX,-camY,ww,wh);
  else{for(let y=0;y<A.H;y++)for(let x=0;x<A.W;x++){const c=A.grid[y][x];ctx.fillStyle=c==='~'?'#4aa3c8':c==='#'?(S.area==='beach'?'#3f7a3a':'#556b4a'):S.area==='beach'?'#ecd9a6':'#79a85a';ctx.fillRect(wx(x),wy(y),s+1,s+1);}}
  if(S.area==='beach'){ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=Math.max(1.5,s*.04);ctx.beginPath();for(let x=0;x<A.W;x+=.5){const yy=wy(12)+Math.sin(clock*1.6+x*.8)*s*.08;x?ctx.lineTo(wx(x),yy):ctx.moveTo(wx(x),yy);}ctx.stroke();}
  for(const f of areaForage()){const x=wx(f.x),y=wy(f.y),bob=Math.sin(clock*3+f.x)*s*.03;
    ctx.fillStyle='rgba(255,246,190,.4)';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.72,s*.32,s*.14,0,0,7);ctx.fill();
    if(f.k==='berry'){drawBerry(x+s*.5,y+s*.7,s);continue;}
    if(!sprAt(sprOk('i_'+f.k)?'i_'+f.k:'f_'+f.k,x+s*.5,y+s*.85+bob,s*.6,false,s*.6)){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+s*.5,y+s*.55,s*.16,0,7);ctx.fill();}}
  for(const r of RELICS)if(r.area&&r.area.id===S.area&&!(S.relics&&S.relics[r.id])&&r.area.ok())drawGlint(wx(r.area.x+.5),wy(r.area.y+.6),s);
  if(modal.hidden&&!fish){const sf=S.face;if(ctxCache&&ctxCache.face)S.face=ctxCache.face;const {tx,ty}=target();S.face=sf;const c=ctxCache;
    ctx.strokeStyle=c&&!c.dis?'rgba(255,248,220,.95)':'rgba(255,255,255,.35)';ctx.lineWidth=Math.max(2,s*.06);
    ctx.setLineDash([s*.14,s*.1]);ctx.lineDashOffset=-clock*20;ctx.strokeRect(wx(tx)+2,wy(ty)+2,s-4,s-4);ctx.setLineDash([]);}
  if(auto&&auto.mark){const [mx2,my2]=auto.mark,p=(Math.sin(clock*6)+1)/2;ctx.strokeStyle=`rgba(255,248,220,${.6+p*.3})`;ctx.lineWidth=Math.max(2,s*.05);ctx.beginPath();ctx.ellipse(wx(mx2+.5),wy(my2+.72),s*(.28+p*.06),s*(.14+p*.03),0,0,7);ctx.stroke();}
  const fa=areaFest(),ents=[{y:S.py,f:drawPlayer}];
  if(fa&&fa.id==='sand'){const X=wx(SAND_SPOT[0]),Y=wy(SAND_SPOT[1]);ents.push({y:SAND_SPOT[1],f:()=>drawCastle(X,Y,s)});}
  if(fa&&BOOTH[fa.id]){const [bx,by]=BOOTH[fa.id];ents.push({y:by-.05,f:()=>{groundShadow(wx(bx),wy(by)-s*.05,s*1.1,s*.16);if(!sprAt('x_booth',wx(bx),wy(by),s*2.3,false,s*2.1))drawBunting(bx-1,bx+1,by-1.2,['#d4453a','#f2b33d','#3e6f9e','#4fae3b']);}});}
  for(const o of festFolks())ents.push({y:o.y,f:()=>{drawPerson(wx(o.x),wy(o.y),o.id==='mee'?'right':'down',NPCS[o.id],0,false,false);nameTag(NPCS[o.id].n,o.x,o.y);if(fa.id==='fishc'&&o.id==='mee'&&!S.festDone.fishc)questMark(wx(o.x),wy(o.y)-s*.95);}});
  if(S.area==='beach'&&hutOpen()){const d=DAED;ents.push({y:d.y,f:()=>{drawPerson(wx(d.x),wy(d.y),d.face,DAED_LOOK,d.walk,d.moving,false);nameTag('ป้าแดด',d.x,d.y);}});}
  ents.sort((a,b)=>a.y-b.y).forEach(e=>e.f());
  drawParts();
  let a=0;if(S.t<420)a=(420-S.t)/60*.22;else if(S.t>1020)a=Math.min(.55,(S.t-1020)/180*.55);
  if(S.rain)a=Math.max(a,.15);
  if(a>0){ctx.fillStyle=`rgba(28,42,77,${a})`;ctx.fillRect(0,0,vw,vh);}
  drawWinter();
  if(S.rain){ctx.strokeStyle='rgba(200,225,255,.55)';ctx.lineWidth=1.5;ctx.beginPath();
    for(const d of rainDrops){const x=((d.x*vw+clock*80*d.s)%vw),y=((d.y*vh+clock*520*d.s)%vh);ctx.moveTo(x,y);ctx.lineTo(x-4,y+14);}ctx.stroke();}
}
function drawMine(){
  const s=TS,ww=MINE_W*s,wh=MINE_H*s;
  followCam(S.px*s,S.py*s,ww,wh);
  if(shakeT>0){shakeT-=frameDt;const a=shakeA*Math.max(0,shakeT)/.2;camX+=Math.round((Math.random()-.5)*2*a*dpr)/dpr;camY+=Math.round((Math.random()-.5)*2*a*dpr)/dpr;if(shakeT<=0)shakeA=0;}
  ctx.fillStyle='#120d0a';ctx.fillRect(0,0,vw,vh);
  const n=mine.n,base=n>=11?'#4a3f52':n>=6?'#4f4a44':'#5a4632';
  for(let y=0;y<MINE_H;y++)for(let x=0;x<MINE_W;x++){const sx=wx(x),sy=wy(y),c=mine.t[y][x],h=hash(x+n*31,y);
    if(c==='x'){ctx.fillStyle='#2b221b';ctx.fillRect(sx,sy,s+1,s+1);ctx.fillStyle='#382c22';ctx.fillRect(sx+s*h*.6,sy+s*.2,s*.3,s*.2);continue;}
    if(c==='w'){ctx.fillStyle='#1f4f73';ctx.fillRect(sx,sy,s+1,s+1);ctx.strokeStyle='rgba(160,210,255,.4)';ctx.beginPath();ctx.moveTo(sx+s*.2,sy+s*.5+Math.sin(clock*2+x)*s*.04);ctx.lineTo(sx+s*.7,sy+s*.5);ctx.stroke();continue;}
    if(tex('cave',x,y,sx,sy,s+1,3)){if(n>=6){ctx.fillStyle=n>=11?'rgba(70,50,110,.28)':'rgba(40,40,50,.2)';ctx.fillRect(sx,sy,s+1,s+1);}}else{ctx.fillStyle=base;ctx.fillRect(sx,sy,s+1,s+1);ctx.fillStyle='rgba(0,0,0,.15)';ctx.fillRect(sx+s*h,sy+s*hash(y,x),s*.1,s*.1);}
    if((c==='U'||c==='D')&&sprOk('x_ladder')){if(c==='D'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.7,s*.4,s*.22,0,0,7);ctx.fill();}sprAt('x_ladder',sx+s*.5,sy+s*.98,s*.75,false,s*.95);}
    else if(c==='U'||c==='D'){ctx.fillStyle='#8a5a2b';ctx.fillRect(sx+s*.25,sy+s*.1,s*.08,s*.8);ctx.fillRect(sx+s*.67,sy+s*.1,s*.08,s*.8);for(let i=0;i<4;i++)ctx.fillRect(sx+s*.25,sy+s*(.2+i*.2),s*.5,s*.06);
      if(c==='D'){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(sx+s*.1,sy+s*.6,s*.8,s*.35);}}
    const o=mine.obj[x+','+y];
    if(o&&o.berry){drawBerry(sx+s*.5,sy+s*.75,s);continue;}
    if(o&&o.relic){drawGlint(sx+s*.5,sy+s*.6,s);if(!sprAt('i_r_diary',sx+s*.5,sy+s*.85,s*.5,false,s*.5)){ctx.fillStyle='#7a4a2a';ctx.fillRect(sx+s*.3,sy+s*.45,s*.4,s*.32);}continue;}
    if(o&&o.chest&&sprOk('x_chest')){ctx.fillStyle=`rgba(255,220,120,${.3+Math.sin(clock*4)*.2})`;ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.55,s*.6,0,7);ctx.fill();sprAt('x_chest',sx+s*.5,sy+s*.95,s*.85,false,s*.8);}
    else if(o&&o.chest){ctx.fillStyle='#8a5a2b';ctx.fillRect(sx+s*.15,sy+s*.35,s*.7,s*.5);ctx.fillStyle='#e6b43c';ctx.fillRect(sx+s*.15,sy+s*.45,s*.7,s*.07);ctx.fillRect(sx+s*.45,sy+s*.45,s*.1,s*.18);
      ctx.fillStyle=`rgba(255,220,120,${.3+Math.sin(clock*4)*.2})`;ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.5,s*.55,0,7);ctx.fill();}
    else if(o&&sprOk('crock')){groundShadow(sx+s*.5,sy+s*.86,s*.4,s*.1);sprAt(o.ore?{cu:'ore_cu',ag:'ore_ag',au:'ore_au',ruby:'ore_ruby',emerald:'ore_em'}[o.ore]:'crock',sx+s*.5,sy+s*.97,s*.98,hash(x,y)>.5,s*.98);}
    else if(o){ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.82,s*.38,s*.1,0,0,7);ctx.fill();
      ctx.fillStyle=o.hp>1||o.ore?'#7d7770':'#8f8a82';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.55,s*.4,s*.32,0,0,7);ctx.fill();
      ctx.fillStyle='#a39d94';ctx.beginPath();ctx.ellipse(sx+s*.4,sy+s*.44,s*.16,s*.1,-.3,0,7);ctx.fill();
      if(o.ore){ctx.fillStyle={cu:'#c9723a',ag:'#dfe3e6',au:'#f2c230',ruby:'#e0363f',emerald:'#2fbf6a'}[o.ore];
        [[.3,.6],[.6,.45],[.55,.7]].forEach(([a,b])=>{ctx.beginPath();ctx.arc(sx+s*a,sy+s*b,s*.06,0,7);ctx.fill();});}}
  }
  // player & mobs
  const ents=mine.mobs.map(m=>({y:m.y,f:()=>{const x=wx(m.x),y=wy(m.y);ctx.globalAlpha=m.hit>0?.5:1;
    const mk='m_'+m.kind;if(sprOk(mk)){const sq=Math.sin(m.ph*(m.kind==='slime'?4:3));
      if(m.kind==='bat')sprAt(mk,x,y-s*.1+sq*s*.08,s*.72,m.x>S.px,s*.6,sq*.08);
      else if(m.kind==='slime'){ctx.save();ctx.translate(x,y+s*.25);ctx.scale(1+sq*.06,1-sq*.06);sprAt(mk,0,0,s*.62,m.x>S.px,s*.6);ctx.restore();}
      else sprAt(mk,x,y+s*.3-Math.abs(sq)*s*.04,s*1.05,m.x>S.px,s*1.05);}
    else if(m.kind==='bat'){const fl=Math.sin(m.ph*14)*s*.12;ctx.fillStyle='#2b2233';ctx.beginPath();ctx.moveTo(x,y-s*.3);ctx.lineTo(x-s*.35,y-s*.3-fl);ctx.lineTo(x-s*.15,y-s*.2);ctx.lineTo(x,y-s*.15);ctx.lineTo(x+s*.15,y-s*.2);ctx.lineTo(x+s*.35,y-s*.3-fl);ctx.fill();
      ctx.beginPath();ctx.arc(x,y-s*.25,s*.1,0,7);ctx.fill();ctx.fillStyle='#ff5a5a';ctx.fillRect(x-s*.05,y-s*.28,s*.03,s*.03);ctx.fillRect(x+s*.02,y-s*.28,s*.03,s*.03);}
    else if(m.kind==='golem'){const b2=Math.abs(Math.sin(m.ph*3))*s*.04;ctx.fillStyle='#6f6a75';ctx.fillRect(x-s*.28,y-s*.55-b2,s*.56,s*.55);ctx.fillRect(x-s*.36,y-s*.45-b2,s*.12,s*.3);ctx.fillRect(x+s*.24,y-s*.45-b2,s*.12,s*.3);
      ctx.fillStyle='#9f8fd0';ctx.fillRect(x-s*.14,y-s*.42-b2,s*.08,s*.06);ctx.fillRect(x+s*.06,y-s*.42-b2,s*.08,s*.06);}
    else{const sq=Math.sin(m.ph*4)*s*.03;ctx.fillStyle='#6b5a3a';ctx.beginPath();ctx.ellipse(x,y,s*.28+sq,s*.2-sq,0,Math.PI,0);ctx.fill();ctx.fillRect(x-s*.28-sq,y-1,s*.56+sq*2,s*.06);
      ctx.fillStyle='#f7ecd2';ctx.fillRect(x-s*.1,y-s*.1,s*.05,s*.05);ctx.fillRect(x+s*.05,y-s*.1,s*.05,s*.05);}
    ctx.globalAlpha=1;}}));
  ents.push({y:S.py,f:()=>{if(!(mine.hurt>0&&Math.floor(clock*12)%2))drawPlayer();}});
  ents.sort((a,b)=>a.y-b.y).forEach(e=>e.f());
  if(modal.hidden&&!fish){const sf=S.face;if(ctxCache&&ctxCache.face)S.face=ctxCache.face;const {tx,ty}=target();S.face=sf;ctx.strokeStyle='rgba(255,248,220,.8)';ctx.lineWidth=Math.max(2,s*.06);ctx.setLineDash([s*.14,s*.1]);ctx.strokeRect(wx(tx)+2,wy(ty)+2,s-4,s-4);ctx.setLineDash([]);}
  drawParts();
  const g=ctx.createRadialGradient(wx(S.px),wy(S.py)-s*.3,s*1.2,wx(S.px),wy(S.py)-s*.3,s*4.6);g.addColorStop(0,'rgba(10,6,4,0)');g.addColorStop(1,'rgba(10,6,4,.88)');ctx.fillStyle=g;ctx.fillRect(0,0,vw,vh);
}


// ---------- painted sprites (ChatGPT art) with fallbacks to the drawn versions ----------
const eggBubble=(x,y)=>bubble(x,y,()=>{ctx.fillStyle='#fff3cf';ctx.beginPath();ctx.ellipse(x,y,TS*.06,TS*.08,0,0,7);ctx.fill();ctx.strokeStyle='#c9a86a';ctx.lineWidth=1;ctx.stroke();});
const milkBubble=(x,y,cap)=>bubble(x,y,()=>{ctx.fillStyle='#fff';ctx.fillRect(x-TS*.05,y-TS*.04,TS*.1,TS*.13);ctx.fillStyle=cap;ctx.fillRect(x-TS*.05,y-TS*.04,TS*.1,TS*.03);});
// walk frames: c_<id>_<dir>_w0..w3 when provided, otherwise a gentle bob only
// walk cycle: 8 frames (or 4) per direction; standing uses a passing frame from the same set
function walkFrame(id,face,walk,moving){const d=face||'down';if(!sprOk(`c_${id}_${d}_w1`))return null;
  const N=sprOk(`c_${id}_${d}_w7`)?8:4;
  if(!moving)return{a:`c_${id}_${d}_w${N===8?2:1}`,N,f:0,ph:0};
  const p=(walk||0)*(N===8?2.1:1.4),i=Math.floor(p)%N;return{a:`c_${id}_${d}_w${i}`,b:`c_${id}_${d}_w${(i+1)%N}`,N,f:p-Math.floor(p),ph:i};}
function drawPerson(x,y,face,look,walk,moving,hat,act){
  const k=look&&look.sk&&`c_${look.sk}_${face||'down'}`;
  if(!k||!sprOk(k))return drawPerson0(x,y,face,look,walk,moving,hat,act);
  const s=TS,fr=look.sk?walkFrame(look.sk,face,walk,moving):null;
  groundShadow(x,y+s*.3,s*.26,s*.08);
  if(fr){let bob=0;
    if(fr.N===4&&moving){const ph=(fr.ph+fr.f)%4;bob=(Math.cos(ph*Math.PI)*.5+.5)*s*.035-s*.035;}
    sprAt(fr.a,x,y+s*.33+bob,s*2,false,s*1.32);
    if(fr.N===4&&fr.b&&fr.f>.6){ctx.globalAlpha=(fr.f-.6)/.4*.55;sprAt(fr.b,x,y+s*.33+bob,s*2,false,s*1.32);ctx.globalAlpha=1;}
    return;}
  const b=moving?Math.abs(Math.sin(walk))*s*.025:0;
  sprAt(k,x,y+s*.33-b,s*2,false,s*1.32);
}
function drawKid(sp){
  const s=TS,age=S.day-S.rel.kid.born;
  if(age<14&&sprOk('k_baby0')){sprAt('k_baby'+(Math.floor(clock/2.5)%4),wx(sp.x+.3),wy(sp.y)+s*.05,s*.45,false,s*.55);return;}
  if(age>=42&&weekday()<5&&S.t>=450&&S.t<900)return;
  const f=folks[S.rel.spouse]||{},k='c_kid_'+(f.face||'down'),kh=age<42?.85:age<84?1.0:1.18;
  if(age>=14&&sprOk(k)){const x=wx(sp.x+.55),y=wy(sp.y+.1),fr=walkFrame('kid',f.face,(f.walk||0)*1.3,f.moving);groundShadow(x,y+s*.2,s*.17*kh/.85,s*.05);
    if(fr){sprAt(fr.a,x,y+s*.22,s*2,false,s*kh);return;}const b=Math.abs(Math.sin(clock*6))*s*.04;sprAt(k,x,y+s*.22-b,s*2,false,s*kh);return;}
  drawKid0(sp);
}
function animFrame(kind,a,m){
  if(m>.15&&sprOk(`a_${kind}_w0`))return`a_${kind}_w${Math.floor((a.bob||0)*(kind==='hen'||kind==='duck'?.9:.55))%4}`;
  if(m<=.15&&(a.graze||0)>.3&&sprOk(`a_${kind}_e0`)){const g=a.graze-.3;return`a_${kind}_e${g<.35?0:1+Math.floor(g*3)%2}`;}
  return sprOk(`a_${kind}_e3`)?`a_${kind}_e3`:null;}
const AFS={cow:1.22,hen:1.12,duck:1.12,goat:1.18,buffalo:1.14,horse:1.16};
function sickBubble(x,y){bubble(x,y,()=>{const s=TS;ctx.fillStyle='#d4453a';ctx.fillRect(x-s*.025,y-s*.075,s*.05,s*.15);ctx.fillRect(x-s*.075,y-s*.025,s*.15,s*.05);});}
function drawHen(h){
  if(!sprOk('a_hen'))return drawHen0(h);
  const s=TS,x=wx(h.x),y=wy(h.y),m=Math.min(1,(h.spd||0)/.5),hop=Math.abs(Math.sin(h.bob*1.6))*s*.05*m,
    peck=!m&&h.graze>0?Math.max(0,Math.sin(h.graze*5))*.35:0,rot=(Math.sin(h.bob*1.6)*.1*m+peck)*(h.dir||1);
  groundShadow(x,y+s*.16,s*.2*(1-hop/s),s*.06);{const fk=animFrame('hen',h,m),F=AFS.hen;if(fk)sprAt(fk,x,y+s*.2,s*.52*F,(h.dir||1)<0,s*.6*F);else sprAt('a_hen',x,y+s*.2-hop,s*.52,(h.dir||1)<0,s*.6,rot);}
  if(h.sick)sickBubble(x,y-s*.6);else if(h.egg)eggBubble(x,y-s*.6);
}
function drawCow(c){
  const K={cow:['a_cow',1.05,.92],goat:['a_goat',.72,.82],buffalo:['a_buffalo',1.15,.9]}[c.kind||'cow'];
  if(!sprOk(K[0]))return drawCow0(c);
  const s=TS,x=wx(c.x),y=wy(c.y),m=Math.min(1,(c.spd||0)/.35),ph=c.bob*.9,
    b=Math.abs(Math.sin(ph))*s*.025*m,rot=Math.sin(ph)*.025*m,graze=!m&&c.graze>1?Math.min(1,(c.graze-1)*2)*.06:0,br=Math.sin(clock*1.8+c.x)*.012;
  groundShadow(x,y+s*.24,s*K[1]*.42,s*.1);
  {const fk=animFrame(c.kind||'cow',c,m);ctx.save();ctx.translate(x,y+s*.3-(fk?0:b));ctx.scale(1,1+br);if(fk){const F=AFS[c.kind||'cow'];sprAt(fk,0,0,s*K[1]*F,(c.dir||1)<0,s*K[2]*F);}else sprAt(K[0],0,0,s*K[1],(c.dir||1)<0,s*K[2],(rot+graze)*(c.dir||1));ctx.restore();}
  if(c.sick)sickBubble(x,y-s*(K[2]-.05));else if(c.milk)milkBubble(x,y-s*(K[2]-.05),c.kind==='goat'?'#b88a5a':'#6fa8dc');
}
function drawDuck(d){
  if(!sprOk('a_duck'))return drawDuck0(d);
  const s=TS,x=wx(d.x),y=wy(d.y),bob=Math.sin(d.bob*.5)*s*.02,water=map[Math.floor(d.y)]&&map[Math.floor(d.y)][Math.floor(d.x)]==='w';
  if(water){ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(x,y+s*.12,s*.24,s*.06,0,0,7);ctx.stroke();}
  else groundShadow(x,y+s*.14,s*.18,s*.05);
  const m=Math.min(1,(d.spd||0)/.4),wd=Math.sin(d.bob*1.4)*.12*m*(water?.3:1);
  {const fk=water?null:animFrame('duck',d,m);if(fk)sprAt(fk,x,y+s*.16,s*.5*AFS.duck,(d.dir||1)<0,s*.5*AFS.duck);else sprAt('a_duck',x,y+s*.16+bob,s*.5,(d.dir||1)<0,s*.5,wd);}
  if(d.sick)sickBubble(x,y-s*.48);else if(d.egg)bubble(x,y-s*.48,()=>{ctx.fillStyle='#e6f0e0';ctx.beginPath();ctx.ellipse(x,y-s*.48,s*.06,s*.08,0,0,7);ctx.fill();});
}
function drawHorse(x,y,dir,moving){
  if(!sprOk('a_horse'))return drawHorse0(x,y,dir,moving);
  const s=TS,b=moving?Math.abs(Math.sin(clock*10))*s*.05:0;
  groundShadow(x,y+s*.28,s*.45,s*.1);const HF=AFS.horse;if(moving&&sprOk('a_horse_w0'))sprAt(`a_horse_w${Math.floor(clock*9)%4}`,x,y+s*.32,s*1.15*HF,dir<0,s*1.1*HF);else if(!moving&&sprOk('a_horse_e0'))sprAt(Math.sin(clock*.4)>.3?`a_horse_e${Math.sin(clock*.4)<.4?0:1+Math.floor(clock*3)%2}`:'a_horse_e3',x,y+s*.32,s*1.15*HF,dir<0,s*1.1*HF);else sprAt('a_horse',x,y+s*.32-b,s*1.15,dir<0,s*1.1);
}
function drawForage(f,sx,sy,s){
  if(!sprOk('f_'+f.k))return drawForage0(f,sx,sy,s);
  const bob=Math.sin(clock*3+f.x)*s*.02;
  ctx.fillStyle='rgba(255,246,190,.35)';ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.6,s*.34,0,7);ctx.fill();
  sprAt('f_'+f.k,sx+s*.5,sy+s*.92+bob,s*.68,false,s*.72);
}
function drawMachFB(id,x,y,s,j){ctx.strokeStyle='#46290f';ctx.lineWidth=Math.max(1,s*.03);
  if(id==='bee'){ctx.fillStyle='#8a5a2b';ctx.fillRect(x+s*.3,y+s*.62,s*.06,s*.28);ctx.fillRect(x+s*.64,y+s*.62,s*.06,s*.28);ctx.fillStyle='#e0b060';ctx.beginPath();ctx.roundRect(x+s*.22,y+s*.3,s*.56,s*.36,s*.05);ctx.fill();ctx.stroke();
    ctx.fillStyle='#b8834d';ctx.fillRect(x+s*.22,y+s*.42,s*.56,s*.05);ctx.fillRect(x+s*.22,y+s*.54,s*.56,s*.05);
    for(let i=0;i<3;i++){const a=clock*3+i*2.1,bx=x+s*.5+Math.cos(a)*s*.32,by=y+s*.25+Math.sin(a*1.3)*s*.12;ctx.fillStyle='#f2c230';ctx.beginPath();ctx.ellipse(bx,by,s*.035,s*.025,0,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.ellipse(bx,by-s*.025,s*.02,s*.015,0,0,7);ctx.fill();}}
  else if(id==='cheese'){ctx.fillStyle='#9a6b3d';ctx.beginPath();ctx.roundRect(x+s*.24,y+s*.45,s*.52,s*.42,s*.06);ctx.fill();ctx.stroke();ctx.fillStyle='#6b4423';ctx.fillRect(x+s*.24,y+s*.58,s*.52,s*.04);ctx.fillRect(x+s*.24,y+s*.74,s*.52,s*.04);
    ctx.fillStyle='#f2d060';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.42,s*.22,s*.09,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#8a5a2b';ctx.fillRect(x+s*.47,y+s*.12,s*.06,s*.26);ctx.fillRect(x+s*.36,y+s*.12,s*.28,s*.05);}
  else if(id==='sauce'){ctx.fillStyle='#8a4a20';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.6,s*.3,s*.3,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#a8622e';ctx.beginPath();ctx.ellipse(x+s*.42,y+s*.52,s*.1,s*.16,0,0,7);ctx.fill();
    ctx.fillStyle='#d9b77a';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.32,s*.24,s*.08,0,0,7);ctx.fill();ctx.stroke();}}
function drawMachines(){
  if(!sprOk('m_mortar'))return drawMachines0();
  const s=TS;
  for(const id in MACHINES){if(!S.built[id])continue;const x=wx(MACHINES[id].x),y=wy(MACH_Y),j=S.mach[id];
    groundShadow(x+s*.5,y+s*.86,s*.38,s*.1);
    const wob=j&&!j.ready?Math.sin(clock*8)*.04:0;
    if(!sprAt('m_'+id,x+s*.5,y+s*.95,s*(id==='dryer'?1.05:.85),false,s*.9,wob))drawMachFB(id,x,y,s,j);
    if(j&&j.ready)bubble(x+s*.5,y-s*.1,()=>{ctx.fillStyle='#4fae3b';ctx.beginPath();ctx.arc(x+s*.5,y-s*.1,s*.06,0,7);ctx.fill();});
    else if(j){ctx.fillStyle='rgba(255,255,255,.9)';for(let i=0;i<3;i++){ctx.globalAlpha=.35+.65*((Math.floor(clock*3)%3)===i?1:0);ctx.beginPath();ctx.arc(x+s*(.38+i*.12),y-s*.02,s*.035,0,7);ctx.fill();}ctx.globalAlpha=1;}
  }
}
function drawStall(){
  if(!sprOk('x_stall'))return drawStall0();
  const s=TS,x=wx(20.5),y=wy(5),open=marketOpen();
  sprAt('x_stall',x,y-s*.02,s*1.05,false,s*1.1);
  if(S.stall&&S.stall.items.length)S.stall.items.slice(0,4).forEach((it,i)=>{const ic2=ICONS[it.k];if(!ic2)return;ctx.fillStyle=['#4fae3b','#e0402f','#f2c230','#6fa8dc'][i];ctx.beginPath();ctx.arc(x+s*(-.3+i*.2),y-s*.5,s*.08,Math.PI,0);ctx.fill();});
  if(open){ctx.fillStyle='#f7ecd2';ctx.strokeStyle='#46290f';ctx.lineWidth=3;ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.strokeText('ตลาดนัด',x,y-s*1.12);ctx.fillText('ตลาดนัด',x,y-s*1.12);}
}
function drawBoard(){
  if(!sprOk('x_board'))return drawBoard0();
  const s=TS,x=wx(25.5),y=wy(2);
  sprAt('x_board',x,y,s*1.0,false,s*1.05);
  if(Object.keys(PROJECTS).some(p=>!S.proj[p].done)||(S.job&&!S.job.done))questMark(x,y-s*1.2);
}
function drawKrathong(k){
  if(!sprOk('x_krathong'))return drawKrathong0(k);
  const s=TS,X=wx(k.x),Y=wy(k.y)+Math.sin(k.ph*1.5)*s*.03;
  ctx.fillStyle='rgba(255,210,110,.25)';ctx.beginPath();ctx.arc(X,Y-s*.15,s*.4,0,7);ctx.fill();
  sprAt('x_krathong',X,Y+s*.12,s*.5,false,s*.5);
}
function drawRocket(X,Y){if(!sprOk('x_rocket'))return drawRocket0(X,Y);sprAt('x_rocket',X,Y+s0()*.75,s0()*.75,false,s0()*.75,-Math.PI/4);}
const s0=()=>TS;
function drawBunting(x0,x1,y,cols){
  if(!sprOk('x_bunting'))return drawBunting0(x0,x1,y,cols);
  const s=TS,w=1.6;for(let x=x0;x<x1-.3;x+=w)sprAt('x_bunting',wx(x+w/2),wy(y)+s*.62,s*w,false,s*.8,Math.sin(clock*1.5+x)*.02);
}
function drawBuildings(){
  if(!sprOk('b_house'))return drawBuildings0();
  const s=TS;
  drawB('b_house',17.5,5.02,5.6,4.5);
  if(S.built.house){const sm=(clock*.6)%1;ctx.fillStyle=`rgba(235,235,235,${.5-sm*.5})`;ctx.beginPath();ctx.arc(wx(19)+sm*s*.3,wy(1.2)-sm*s*.8,s*(.12+sm*.15),0,7);ctx.fill();}
  drawSala();drawTemple();drawWorkshop();drawBoard();drawMachines();drawStall();
  if(S.proj.market.done)drawMarket();
  [[28.5,4,false],[32.5,4,true],[41.5,13,false],[38.5,17,true]].forEach(([cx,by,fl])=>sprAt('b_cottage',wx(cx),wy(by)+s*.02,s*3.4,fl,s*3.2));
  if(S.town&&S.town.mint)sprAt('b_cottage',wx(33.5),wy(21)+s*.02,s*3.4,true,s*3.2);
  if(S.town&&S.town.ja)drawResto();
  drawSchool();drawClinic();
  if(S.rel.wedDay===S.day||(S.rel.married&&S.day-S.rel.married<3))drawBunting(14.6,20.4,.6,['#f7ecd2','#f3a3c0','#e6b43c']);
  drawB('b_barn',31,11.02,4.2,2.4);
  drawB('b_shop',22.5,8.0,3.6,2.8);
  if(folksOut()&&!festActive())drawPerson(wx(24.3),wy(7.4),'left',NPCS.daeng,0,false);
  groundShadow(wx(12.5),wy(7)-s*.08,s*.42,s*.1);sprAt(S.bin>0||Object.keys(ITEMS).some(k=>S.prod[k]>0)?'x_ship1':'x_ship0',wx(12.5),wy(7)-s*.02,s*.95,false,s*.9);
  ctx.fillStyle='#f7ecd2';ctx.strokeStyle='#46290f';ctx.lineWidth=3;ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.strokeText('ส่งขาย',wx(12.5),wy(6)+s*.02);ctx.fillText('ส่งขาย',wx(12.5),wy(6)+s*.02);
}

// ---------- draw ----------
let camX=0,camY=0,clock=0;
let flashT=3,flashA=0;
const rainDrops=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),s:.6+Math.random()*.6}));
// ---- painted ground textures (one texture spans K tiles so repetition is less visible)
const TEXSRC={grass0:'data:image/webp;base64,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',grass1:'data:image/webp;base64,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',grass2:'data:image/webp;base64,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',path:'data:image/webp;base64,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',soil:'data:image/webp;base64,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',tilled:'data:image/webp;base64,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',wet:'data:image/webp;base64,UklGRgIuAABXRUJQVlA4IPYtAADwuACdASoAAQABPmEokEWkIqGW+j30QAYEsoBZv31fI5xme/nOeP3L1+f5PsH3C3gebn9t//+bn0q/2HpB+qn++9FR52m/Db13/h8UhjmcpsXfVWHbcb1j+Afzx1C/bvmmx1+uEqHE9pvNAbyWv+Ly5ahg4q48luAya0Aa6Zwgd8UFQyxxWcbgy/mid5GVX+OY+NplsJBKW82ZQhhpfxBZoVy/MjIHRwx+h2JMCGh7s7tVR8VeN55JDsP/Kx7r5fv6XkFKV2o6s/7qgHRJglM4iCVyYoe355lw1BCCU5TN5+FFYAiK1U3Osq+9eiyC5VeXpQim6RYQPuadSMUtgyHJunRBqJdtiEix7ma2TTqa7+f0BbFPNTtBmjXCi0cAw4wfOIjlV3tK0fBqGArQofyJNdvwcimfap1fksMsS5eLCP+0lMj29wRZflRTr1RqceypmEyKgFOYSJdq4TE/xr63YQry+Bjy2I6nPUMiucrnIXGzoK+XZrDdjCNpiAAigZT0jP7ePwCgouKnqzCSkk1aDFKixV2OuNInq791CzoyepoOIc1kpfmYLtBazJOtY7I0MFETIBk/gjGAdE7gHUdDIEpVUAJJqPEpbdl2Lp2neFbVF5tL9ZQ8dTDWqFBhm+4vUxvjZahMqDBNdf3wGF9lP1GPJyfsAkhyjrK4X4T3HC6aTVa6sfxuk3IrMRvdxYWsga2kWdyybHJAdW2BO+1nGcUK5/nDFGQHPqbzdhn1MXEmnVn7OBjUt4Obo3fxbiCcaorUJMM+uSt3fOkwDWFdZnSE6oe0dOKOw3KA1Mio8ffCIhiWEruPhlYWmkEpZPG627ZxBnBEVkkfL2BSfdyIuJw9Xco7j8F4ZBZd3MhRheBnTs1QaLKs/TCHt/0nvBMTUl1MMXMapb9jhK5s3UQjm46kPQ1ndHq4TXgUVQg28ZB9E1W7FfAeeAQA0nVJWOq6GorV3U763rHSoPpzR1KkfwnOZHGYOXCniTVPPeRc1bkTvjJhRQSirjyu/P2THwiAhapongXaYstbIQULkG+hkyXeCNKBbcR4tyfi0plnsr1Esi0WYY+CBOJsVZRF8PBrpPrvl27FBfJrofI1kC6cBdJI3/tU1i/xP0XeWWaThrQzCO05UhFiNfJVrqhLHCgrX+G4rCpRJZq8uUrYSlT8/5oc0SxJOGFVOEpdGBuBw9Udn4bNyxEre1o4jH7od0wIjTrW4boliLCz6xmKMQsXRKSITBcPeFCSnhBii0q+8b8qZuNK2U8CeBCepSgV+fy/ehRheFAopcrHfNmeogZLns+2zuEiRRTwv3CRx9rIxr83NpmYMGt8Vzov+hYrKEsDgI0JWZySRnmp1Zp9INZ/llwPAnTnXVjL4NQhjHm6f2ZrOmD45wI0CX70fKE+q20eexrJOet2qGPi7vf57PgPOSR6EJdlNwt6yfUT3OABd/8F2u1Z7TWDD3q5X34JADy0m2/kY/t0Mvxz+gdTWf+5AesOqwC8i24+kXLOpi0bpKsU08G6d7tm93nLCMMylctzM/m32U5yFKlh3Llc4hu0r7d6cCkpxeTFjKAkrK2ivpXiNKbh+OihQThPT18jBWHPRqW61W02dIC1wZF37Tb0TW+gZZlqn+ZSWB11jPb5rl9vSYuWcA/pagHho2IEK5Hpxk0EgYlb5atNHZKNA44cVP7bA7tZSqBZB5wRzLEajEhBhU2q+RZ/TEsdur0XJLGZNdhG6cVlp/Vd30MPC7TiOk+4o4zKTPOPRYpiUjk24HgXTgAxwkoFBF97/ty3/16XaYzx8JgOYPa/TDYiGa2vHAu5C1DHIJliys9kk+i7Sk06tPriooTr6ofkUNHy0TVeIZq6Gkxd+WKSwuk+I6a7fHqfUvebBTz+x0sl0P5SJqw7wTCdCQ6dka1qphdl9/EnFJahuyCm0UpWJN9azAQSKQAgzUEZ9NM15OoNy5Chr7eOLHSw2oW+AJCgwVsIgAAA/vCPixpum8DI37A0k1ZQGG2HnArWLL5YJzjF75FbrGaUDfuCMPwWwrsFvb+uhm314HVf7eDmD50DtrdfOeASL+Y5+UVrDiNBE5TrxRrxXMXaJhUR1gedVvgX09oclVLaAASPZ+PYDww/uRrONf0o3IxlddYbBvsaGPfX73AnZjsCXYwDO1K3YagKBtcD/GHkB+3AL8zXF/+rISMv1F9ZySuPXRtIGZXMKQqiNEjAJ777yWOjwVg2H4TNUZddEZp+6qRbMxKxtPHpbmeameWWEaLBavk8tSPwOJOkwAolPHlEBd1wa6HLD5ugGoogqCZ10jvmv2V0S4Ba7IjbXc5KYfRyg5zeGX6FJHvKCgYbhNn/q3BGqGyFKocart27y4CDecbxHlO3btU5SA12P1xzYkL5/fpzPwK2Cvt8vg4ItgEuhWGH9D8pBCTRihGTKdFI26aSnPAlBZamagz87f63vX+Iq7cTuSgnprg5WnLAt9SmoIJ8onzvWGp/4FeKXX9Ihd1G02hE13//k5pCKvqBkEzNbue2vgwYj2n/4S/2VLY1le+OZhJ/N9VpBdo9Jax662qlwK59rTSsxYBf0Zw5PXhTG2TklrXYb1G9PaiYgbDakBfvwXTINwJBlhCRd8OePDjepQ64upXG6Cv1GdFa9r3bPP8OdsnuhDrBMmPdAqIvG6srZ/nI8uEtA8WRfG79lBZ+WnroM9tkL8CzUUl47O59UxbMTKtHvpjoNcsJytRPw1TQMzurBcECcxz7yB0PcOpgs4rtFgO+6abNr/5p0PWxvQB3QJ5OCXvnAXPGwqV8hO+HzrP/0YfVN1kg7RMAQw0orHDkC6HxuX8VLQ+Sm92kA+J5dXOn7T2FCpRcDEEDcrzqF18gfAd/ur281H+sgo5b/PCaxc0k+5trhCYbZc7+jPs1XTntjMVwXv1Af7g3/AyLzd9bgp0B7DxLn31k7/RqmvMfPsU460ellzDIdq4osSDG4G08dDn89VH8h/fGt4xY8ss7YGSuH9Lq8zYe0hDm5rGiZpciRrhGUIIDx8ChpfRE+WP1W7HzyCWlOclpGRxVR6KkY+15CUaPZh0BiztmIboY4xqyVru93YE3MYOBLO31cfBWr+NQ9lkkW3GGTN2xggnNqdsYUuZWh/dR+nUIHejtUaVRH+nEvNEtjf7IKLLxL3jpe7d/F82PA22U5yexOp361JAPPPRumiANo2FcCXT7AEq7HxdON1a95A6JvCDiTysumeHHyk97elcXyXZTXhnMIeeKxmZVulLNCJ3CD/vF6V9LaBx0Dw1i0zAdCXhoOTSbf6Rof5O4APcoMCIFmDNVnKEbH1q+D1TS0u1/l3Eq5KxNdGtsRQWfqAe6b9Bacb3rWFRdJOXBGMPUWegCHnSH+sDqeipIprSEpjKPNRRlWzgxQ9U2uOtMAr2rhLlFaZaxGxkfUZKjgYT+VSeSOGezwgoPzxA4wqb31YRUTYAH4UhElqIZunJF2pri2lgdUQl2eZWoQEJU0mXO8PtYMLE0p+ifQtNKQ6yRgVe9IT1ecjOMOZ4+iUPkSmK42Ni3DmkIxAfwz3DCyFDjCn97eUnQPPOWOekuxEs98SWlckrRQOcX92iz7+rmql8nemaTLInub+g94Ay3KulAm293wJTBqkxnN4ZMI0wmvs0b+d+g6IfzR0fm5HIZq/Vz+YLePPcmBmzRlax1dID/ewUJg1Es5IHzWu86WBnVzNxREMSP2uuFtNvLau7YFhHcuClp1NcquQum9j0EL5Nr5PabZVuV4S4k9uR/qxF+nFIIAYmBAP3cJGoAJILU/75j1gllSnQaOnkl8EG4MED+bTeIgaEv9n728Tlw+gy3P37qhn3H06GeHIuSBwKsbkYeMPKIPU5PDATIoXV22OY6ZnYc5w2yQLJuoUL8BToIQJTm1b4Vw9OePTyFJ5Q1qP/RjXQIvKTkqAQ72q/n3OcY1a1H3032FGtzmQ4lwBjbqdv+0H0c1oLyiJ30VjNFf/n1IkV/UfCt3nm2ChC/CRx8YwEeKEns6gc3t0OH4rFoG+FoUfQpGT64oCxUwrdYLo22+SWaQmJJ5jUOIO0tBRQknkZq8OdTGfVoPAmpqsetSRb8URvAqSvRUgqNm1QFOhS3MA0w8I6Dm7CLH9PwSFY0d+3CgJTkGcw/eiQkPfnhluwJstbATt8P/sIH0Hr7To6Lk+tm7X+sf2aIgJKZ7aEnVVFNKODN6Dy6Zt8C5my+/LsarJELaN+5jPFtoMzQB+LKUmtAAXut57tsVRjSWLzp0wfP8Rngsi2ubQJqsfceHQwQOOl+ucxEYQcOJXXRD8Rz0s20UGO/OxJjOdoMoSwXbRqyQL7/9SKTjmTbAcXGFnQ19s37twWssxvCdPuPZKVMGzI98r7C86x7xxO2RD923NXLigHiI4b2NakRnpKyZy3SRYHqVouKUKPqNjLM4NiRICbVqTRKwwk6DTwvZuq/yhkS3rL7lCe4eGvptoSuPKPE4Q4LcqoHKQbHRYS4lx99wIPQzlzxspLSNSlnJMmrtEhyf68hMh7nkwghzQ7eR1iq8QGV0nJkZbvUFzePbjelxSogTsQb+8J8snbbIPEsWPMaFEKZgjjvCTNSXutmt+ovd9+gqSs4lkNHVVzsOgbZAA3uG8ryCgAQYTTa+NHsRjScNASdeJm3f3hvW1IRqsoR8s6QlXy9ziyZAlZRYLgEcM0BjtWDPlNO/Wtbp/0M6ECgNPHvyhITqJMDFj1WTBDuzFm6F7FUvxqf1kcwvbgeRDqQSZNIS+bwKoszJKBdaPQ6bHGvRiwDLa9o5MSyCEwDRcODOnU8DIW93cu+Mnr34qcASAA69WhnZ3NWU+S8BKc4VXKiG0q/slmhKHELHhOOdXSoXb/WkPPbBsJrSj8AYHP9CRam8O9dhdaS4QwdlveJSoa07z1rhQ/cIHDhgWmwetJQdnJc0V7kwCaTGi5wWmdcRzlEDrS51ZNPBqMsquQW+k897wA6852KUbxCYyCXR1x4GpZYN+bPalngFl6xLYi3KZ0ierdHrwiy+EUbIehlRgWiuIUozARHr9qmMlUHtA7/v6onKd9Jb2FbE3G+KmvqJvn8If6rg3E6oc6w/SPdy4VqKiScCa455ddwaXwugVUOZYIknGSE8CmISF9rZz41BXCp9Y3f4GP5k5+qj6DEKkeWQjt2A5My+l4FZP/7ZXxLaI+6o7fWUUg7YC2jCgEWIudYQ9n1i7I1BWyGX+QJDtYdBqX2Ai5spRma77sZ9xKdIxKtAfo3d3Ad8boG6D+5ffdfPiOZR8T8Ve/cr7TuYF+gTlHSu+UfLiHS7ypAsILVYv9mCIgXS+e5d0LQysWTD1fVC8yEiI+XmRl6pWQJZUP3Ku1duviVmWjwN7qESu+mI9WriaVdUmi4q1ZOQCZXmSaTeUO+7aXQqasjnf5kIi0OBaxa5JhW7FnV/5et3bCYvY3kJGIcFFRwumVPkdP8ZM6Y5NIbI9kx2r+/a3oIlKwF57+BpEZsI2sHbIv6aQzf++wybySmnf2uDJzymS9VAvTkn2T6vHSDCrEOsbn2eA2ZxO2r+XdOcxrdC7eth11J8Yy/KSHNQflx111kyEUFoE0Udd6FWj/X+wSR2UMYgc21nt5jG+v2Lmmt3+TiBkQAG6kNuG9Zt/PTZCqiLQsvlUpgr5oGSE7j+1VoyAw6dp5C5DpDdth6nnnZQDuSpKXYLHwwHcM0p3o12D/5/J50qRIwyhk34+bhr5ceawQ3xxfBxWq/mJRYdtiiI083Zjt+ZBbvQ3INzfXW5ExET3eFHvtA3kfDT7RsR44hOQ+f+yTS0kLV25Y5yZE724RdDaH10VQ+Juks0bZ7hgyojd5ysn3pdZFoLaGDc6Ab+8ICliuu3RXr05YF+fwH2GGZYKNAvARgO/OTNh2h3oEhlq1KsJHLmwG41gjb8dF4oCbQyUYVyk1EjIvvWBxXEYioZWFQvjdbbn1aDLsrsUgZ2S1vbsrG/pIpyu5gtO3LU+xVtS4nkOl/kztg0H9/UdfdDWk15LYw+tXOe2dyh+F4NIhnTM8IBPSEU4BnqvvjL2UL6eyJEEshwMFnDK9+b2CXZCxGTJgLi9bHEs0TncXEs4KDPns9GIqHHQlTfB7twUkuI94CE3DUCKrne6GabTaHMgXmh5hNnyIKjICcr7PFYvVaLTrzkvqyToaKVTO/Zo1brcY8qao0/ChevHS7abwS4BcaonK5hucI9yIZ02cY5r7qf5R/qwPeAegGaQMPUFRojFW4UmvBaKe2vILxbmxVxqM8rdneUn3gdinN+SOcu/9AsUqCmBygLr42Lg+2kcDLorLWlEmUSXW03jXWJWrpGp4CZIijZebdbYsTDb6eWhX9LHUkc7u47eCXaMiYEAL7Xk5YI0bnQE7qJu4/dOOl4hYBIeobAZYzQuAohXJhRAqqQBfyVbMar1H2NOImxtp7iArWwilDOuRVTIQNncU/tHmWB9zUsYzLczD4qak6bHNVtD+K6KCs5V6yYVYK5i3v5VFGbkzWpDL3j9s2mps2lrBVZTKqgvWUhO3vEAejHFgVKGFDb7CfQ8BT4zda/q6IML9CL8TN4/3U5DxTTRZTD1Va21LtxWc2EEYw5yvvJ6nHE89n1xAhpVTNEAKwBfTLX9jT+FeIGcxBkHFefdYlbq288Mq4q1f9QNdjkZLes1gdXWbmKwIQRJMIIVnyafuJ3lybVgLzTMrgEWdhe6Q9CBXhyAVQRGmT84kTh+fnvK3B9g5MSoBaAdzbrR8AtjlwfQF9Dm3AtidEnDiioF5q2pIKwNYpwlYh++f8yIaMKB8IqKk2ECW+15zR4qESJrxGnHbMXhHEt0FcATrij5OfMoI6C7Dy8agok3h4lcA1GjXe+PRDOAOJEh0ijScf9HRRgBBah2c6iysSZI8T2L1R1ly0Vry4GOCMm5j0ZSghpLvY385OD0lqvXE/Wy2nlzyoWxQhNidRRroe836ty22TtaX5Q7pXRDttqEm6YClKato+SC7HNrUv36IlZg1MEPBHzXOBN2sdEQpIGnAoRHCcjOq3tW9xzsccH8VKrtlFUNABXL59akiwkKhAGKtE1DygckmmF6uCzcXw9XcJmM4NUt8wfrS/RfXPHHfqCQX1uPZL0YY3ySipDuhJgV8yN5uANnLBlfrVIA5uaFBuTkg2RHzsCH/tmZJcy9pfejUiT8V7/9irR1+xrtS1GEQCABD7eK/G8Ku9wNkzfrHyFkLUhZySDhLrLXm/+1ExLJybMlprIpz0km575SmokAbtcWvXGyp2kE52FpyfvrQwj6EEu6W9mei+K/WitUuWVLTo0Zgu7yquMh1g3aB4pWnLW+J4vGL3QtLh5IuRuW1W9LslvGJHkBMQFwruajKhjlf0GToaQEM9odWZHV1EU0c3pl24HjHUmdnBBdROiqv2ux1thIUFgpQzuKlEE7AqMGTvUq2TXuveeloKLwVRWbnkLc6XKUnZhMRbsEbZp67HLH7pJ7TJaSaehHvccFVLOjIlVGgyVpwiH+JbaVW5meRPDnRTLkZ4VipnSQdOHArQO6wB3AND2pvhmInSHwiUIlvcrKDu31evsD6m0BYXfWr1sVpMssL/KYp42DqPXcFKDH9DEPdb39G1TqM59NvVXyE19TmWXGQuh70JVIMoti57wa3qX2lkUqmDAV8OCrkVr62T2MgAMMfThlHrvFd5EBubKu8SD8t9175hd0lTBoCUwlDvYxFU+viMwzhb44aLJUUDTF8wOU2+CwP9KvGFasxb7inSV/6HOuU2ZyUWzkQIUG6nZDg2KOoOsLZWRRT3k2TNGpWM/kiq/vPcOEk/TQyN9PbNdWrh8okhMM7XkxPZDnQVJL6lpe6GhMiiAwfbMpONEd7pKOVNHAtNGcZ2wLlYFc2K44yE/ByAOPuUIcYzNwXwNSQSoCiD6QoTPJZF8HRoQXVgQqZAszX3uLwNGcpidGnniB5yA+Zj3jqNh/maPjYgMtJ65++u7vpop5J9a/tqeEyXwxAcYylMqRiO0v6WKMLxJtb3vp5oku+H+I4OFCtozIR6NkFabykHEqnlP3J1leqmT+T0LZLfqHvTNwemkN5HAi+48OkSkwxd8ucFdPdpO1FnLOtyj++VgNRv2Rv7DKH+VdoK4+P9DG07gz4JG8Hpoa6PgmzEsnySVQ2QXF9rF/2kJ4p7ENQQAjkxPzndNqI3WVuIfd2bEvxYZtc17yA4dvL2gxdvzSoCOjnYRVhfmf7RMjKA/8Fn+5PK98elbcLXh5eBMAWmcCOM5oA/CR2FuzEeRIJlQDrX0D77gb4XghWH5NR+U82zXPCtvpAPOzVZWdvqeoX7sG5OGoqCy6o2CmZIt9X0Fb6dlP5pD1NTS7Q6nuWMoZtRcUgARzQY/6J1AlwdEu1Qa34D5bdmduNgWVcNRthyVBQdgDkFZtLgOkbAKDTi7QV9iqTfd5McAxHafwC7qKeIxXpkibfpzh4CPvepqsBU0KXiGmRjICJe956xFRrRXKuvb9CKs/NJ2MFBdIoxN/rWpmS9F0TCTBNNftj82aoLpa64oYm6/2gMBFoWqLLAScTeUg5MmK5rNBv99viEdpSH403fCoCGc8B486j8NlY09NxaCMxQruaKfp6+oaZ7kBp4Pz1IxODnrHyjw4MUV13mbL332xpehsDqJVlahpvlso9fwYJYcQAYmkvPCS7wM12bUcjhRu3CVV2pkzP1KY3WVvJRXtG9zAEYdYvy8J5iEZtTLGByNMkCjqMD9aPeLJJWXaXDXsZM+IvtngcgtDHF/SqaC4+HNslGuDFKsp1+lVF/1MeqrGX2QROuMMTVIc9r0ZOaKm+pMWyTsWBmAkJU75ra0LY6yssGHEL3nDxwl4de44GVTlMXMMEzYb8yVRXom8CWs7peVxhlDMl1z5HNSQeHHH0oBj3GsQ28CSQvfadXBkRdylchzElqshU35UK7ETzhb4KC6ngSqoJ/9cl120pMCWc5BcJdG6/3UfApvdH+Xs6MGaO2UU5gRX+f7bA9F5uUNGqgLRV285f6exXWhPos4koSvMZRnAIVXFni4ziWc2uw2fa79jltQvQnW4hJgwyckCC/fhhIrGPy3ZHAebKnXihobqA0ZJgxs6HpuaN4aIeil7Q3hCZGESU3oQtgnjZLbqDVfjUxrYNHOvH0s9dE1S7ZZAe+6//KphVpYRQoQCOxvHo1Tq9PsIH1BmLYEXrSY2W9JD5VtOsa3Wf8p6kIHPsV9mhWG5RL3oun5DQ+W353sOi7yNNfboeGZqEL9/jbbVaUdzfOP27OH6EL+r3qWBZtOsSuVi48EwBnOjcuYGqkaWunlYYZosir5z7jxo+1QMPE3AHRtMDj0qkFaRfMcui4lgrOBETZP1AQ+Juq19o4BDZWBoXBbW7Um/sabNouqLUFGQxr9brMtwdwz/wtFSkPXOpSQBofQrQVq6rQ2jOW78h+iBHWuTow011t4ftyS70ZNv54Lg+R1PZRy8R9XNulzVli8cnvva/89px62mwLbuctJPMjw31p0XxqWmY9vc6U9avFaPJbAOzgBL8VrqDR/RcV477ZRG5by2PIsVsRHxEQY3JCXHlzmKa8OWqRpfhF6Ys+IVfJwXWTwG9qO1lZbvQsjM1jfXU3RyrTspo7b40on8H/2cHuFuaD0rfIZL2w42nb/+XYqdLVr2aLe2//q8C8MjXQIVAZnRS8AcfSTf1d9NXFa7mUfgfc9skgwRRzXHn9kQ6ovODxsYBPynlW2EKy0WDYGQYGZ0MJ9HYIR/xkBMtWvWLt3wpQ7UwbzfCkiee1mtaUQY+AYpWq2EkqYyOjN7kGdI8EOIAmvLgOXA/3MaSJcXUctiSWUVB3L0WnWAUlQidYEJ2RFqTyEfvbeieir+URc3jAqae11DZ5kUjr8cQnHssjV9ham9mc9P/0XFCYIw4uMLNlzm+dGY7uU2aChI+HUZj8h7AbTiH4xQwZsdWWVikW4gt50/PPX+aQhwhvy7ifQmVanUWtOjr/f74Vfn5h1+9unJ86lqLFdeXuSIaBj0eHOq4Hheu9WZ4sgRtPyERYYdHZxTbNqRSl2FN9joZvXGsN/sd1LnHP/ucYxzbx/c5YvXEpVZN961luEl1DcZ6gfAptaTYm8Ls5xS/iO6+Uo8syPDRYdowk9rktV+8pHcC7dpf98wUdHQVfn+zSBzrzmsqKTaG2b4kdSnNpF4JS68624I2gAfv0Fo/ZJ2FTpldYOadmsn6R/xUnf6hAeDDFOYYosK4kUxFimaZ9l+i9dmsLmbrOzN793ZfxTfVO0whD1TjzXlHaX449SeYe6cAXXhvL4saCUc45DVaOuFuC68KymxQhV7Qo/sLeSjgwAeIC+X4YpG9wG5J4W9bqg5u8U4zgR0SwQPZnR4GIbxE1kjn9O/N2oRbyPP5cynuxYVASG5OgKauiF1HTiKvdXYfWN/kR+Z8gB2EMAtQhTvr60gvhGU0z0BFO/JB10Qe4YWdITNwe3XM0tnbCEG+EsQ4RFnAHcTCHEI3REvsDHoPI/938arVkUdUKX7uVuOw6AuaIZGmwulw8uWPVHiXb6vSQnwPvYHDXzoe5dtanw31PnEWnelKYQFBsZ/OHVmUQZd2cki1gJdKibaKLxyhS/6gNgWzRocz4LKn77IKqOs1DbYTU3byuKNaV3wgiZXHOfMcKdQfP8KVtoLthPxQdr4Pc7Grarq/WT+ZVircdLaPPf8mHZVXoTsOr36bYnCiJuTdiF7fpyg+rQCBdiVQ1xqBEbkn2iceWe1yf02wtweg3NRevO4QvLla1UtPIVTsXhWBO9f+9NdNriEvngSlC2tcy+7BCbAAvZNB1I0+OCTfe4dg/rS/oGeBXfzLpJHVi00o71C95o4nBC4yjJ236Nq6TU6a5tZ9IbPxA84QP4+AJa9OmyaHAt5gp+jzJefIDM6l8ppjcDz5tCDc0R/j6DigAt74MlIOHNxPhxkL3TdUOT84gHGXcCLZILeGx/4Dn1t3uZf3+CO8/QA8BeRdl6gJSuWv9znN5qW6jc+FpKxALBNC817Q+Lge+sps66CyZjdw/oseWyavK2M0THUSfnfZNR7YafARWGS9gK9UwDP+MCPJTJ0mFmABFIA29mersIrSNcfDdJ0BSzu1JJYBn+/5zqE9g+6nqM7D7I6L4lKML8VMgpXOM3UFeCr2MqPgcDLlKqeS6S2Dsw4FKJY6QyH4pEd6zoACsYxQv/am7B+0T4xmuLiXuuN3HaZEOAll9ccLjFZ8Adgn0wv/9FRRUq2ZOWUYyjNEBxISzXcu4BZwJHAKd2bm7O6lAxR3OSXzTqCVcyf80+YGLsQEDOi6kZZ+4dpFpaVQZxGNvcHAhoIms+pXYYp4O8aF5/sDAJky9ElA2TtBDfOA93huM6e+1hN8zI/eyN5hJ3i8TDkZT6p41KerRULXq+IusWSkJSEFDZGhk5Ipe9tUU1WydiC0w7IveNZBpPscdp3/Dbcou5JAPKcpnaK5r36V6Ggv8nqJLRwQC9fk//lr3KrzTrViFe+xo1hOGbtcNQe5RMI8CazXVPeC9+7YW9gpV9PCRn+OJz9EeT9PDKungKstPF/gTsDZfFLSSvCE4ou0duu4VdL04WfOTTrKHJLLpUf5RKvxcTyqLnF2ZA/C4b2VmR4cOiwBYBIX89D4tXPAfK6vkdM8psZkMmV0UR018fSV5xqMVpwnks9BoXwZa8ZW3UWyVidZiApqv2hjL/HO8r7k2FUrUawrSwNzgSWYFCDgmGtvCjcR/2kVBqi7lgVLeGXWU3YklVIOIVZtJvrFA0JWETcNPea7D3x7y1cvF7tKNa8vtFYFQ23HkAMBj2yzYkwkddEmGBkSZXNC5ZlotfuKaPlGh4xWDu15NVRpwxneWjEixzmRUCAy/78sjJKVcDXMGczk8z0pzN63mYVjk/H0L5ZqoZjTywNoYoKOIottXRV/M98YX/9EII/h4KL1Bb2T/jSAwDwCRnAiQGPJESdeubrlca4NXtlo6btL64/dnFF0wAMfBIqHLP0QMDCV8vJ3dbNc591tRTLOSml90A3uZR+7skIl4ya3mk1HKvgXWv3NUdgyZCSgqqg0ReQQAzMCTU69s+xQsJvwvGnxM5fkYbPW75yeY2RJ6vc135q8/1Tjb51jrYz1JgxX+3GZIXuwIYbB9Qqc2bSMTtawrh5RS2MpLDbFZzTrvndSWf2rJReeuNG7FLksV60G2f6yttOqoTsZhrk2lfjJKsiyueyjo2rluiolqoyA3HLSXCt441VzvDICAfdqF5sBdUCbdaox+F723N87aQiuFKWwmo0Xq3lzPgajdlpWPaXExLOYS0t3BV2SrTBzZJEE/XzxXvojqxTdGjY1piyCltohYKOuwdjNw3A/bKA6fihDH6NjOdy02s7047In6FluvNgC+MxV4I6UVmT+ulx39Za8F4rbrxZ+T/SvHFUg9K2BFw0InWXvdrLNCHmVWk19DZLG+mARqmxW6327Xvlz6+JjLS01VvhlLI8qkFst5JuX4oc5oWGsQ4M+jaMtNmHSGyd41cw1zaCMvYhO+Hj8vQUHuX0SVOpHg1HK2I+B/iiVrLH8n3bluu0RF8jk+P3FkdyNMJS+8+5q924NVfdF7AhHCdrfE5TGa3mDy7B4j9lcGVdRwpUcbUmMasP2465uYOdDXeh5IvXe02BtB29MbZpKmqDGLuPDlTwjqT7/TXEQ6y77Lmk2Hr79GbHedsjkLnGstMFipK9TjCHonudJuBS9ihRLKdcKRD+PbCgsF/XndTtU8JCt8lt//VVWRoMAgmOPF5avY8PDCMlPvlZAVxyBb5c8onEqpjDyrK2yFMMA1fn+UW2qScROnPTNJecHzIDmeeWsAYNqmWX891I/arbvrd+j1Nq6WWka9FgIkvRkNNXn9w4ZkV0l2d3B4XdRutGKNM318hPUEGRrE0L7d9HcNFo1Q+1eIj8z8mj7oKiToMX5OGf1nJOZ6uWLAgxJ8cZTTi7ya/AkWdYc+fDPGE+dM2TnBfA9AOm9i3do7zAq2OjYPez0tkm+JTReja6YTcKIupQoWskC4xPt7CP+Cn5aXpiIds3zMhWy0OEhGpg2Q2zRCpkctzg85wNXMCOZiG9yQ2nFAYQ1MYJlxdTvezQ9SmzLlUQOiXOn9aBCtTfmuCwAQAyfQHAs13Oc1zfibuB9RmDE5OwQ36O8aEfVxwJ8mDgQAnOp0CTYMh6Cqx1Dn2tdE4O2QY8l5q05KhsF/4aWDVv1aUcFLHXF4O8HG/JykquxIWaQmgdShxlvcXfrvEVMLVqE4I3N3G+gAKaKmO5dvvFrvMrbDKvMjtHEDkH1s3efeYRzqsZbdEt5scnEMUN2oe7Ay7Jbakp63fNOadfZy+lQ9VxPFFb8s0bOTiIv3AyZGweU2M6X+Tdtdqr339gq2161C7LvOb1zSrxyx84LBcaGEwjdi1Li25+TE7Etin+o3ExW/LSGMtZHG337hSJT85C6Wr7/HnG2M5U0LTgvUR5sZ9VGG2yAejUV26L9JblFFY2SCWC8QZP5A36r9UJIuPYCv9qpigL2O/o15Kl9WGaj0uSrTeNXe1sht4brBcDSt0dJqZt7P9vBo/39lYIjP13fJ3MLsWe4OgcHG71362U+UDOz5o3DvKlc+h2OZOqIjQfSqhka4eLXiMxRdctD+cvNlvV1pdx12KlJ9fZZvxyBimisjx8zYjy/PxINi9J67JfBA8nvO2mUDQ7VEJRwEgyhPxWCbi4py3sVlCcp4iEOJjQprV3Dkc574a2/c3vEaIug0MF+8T/PoiW/InIfdxZqGCbtFlMyW5IQxMj3i6besBj1ioQr8syTacrLvnvBXQznKsJNUzmfVqVpPC+cxgFntHF7ya5xLiXZVOnXb1yIuwo61VbyZcDxysfIbmfUTNCJBmvmi+cPWHqaxGYFgkPEhsw40oKQRTx3/HaLkzOSFZuCRyyg5A7JsJRPpCYUWYRpxKldAUefj+lfji29qkNg1FQT9RwQjS6mQDu3QgVC7lDuYm1kbz+g6yYGKIhOa0Itwe7HYvlTSGk/rhvqMIWGDe7r9vdz7dUM6XG8ULJXozFoZvfDLBiKwRXgrO0TU3HFjdBOTLVA1Un3NFPcN+mOdPPcwCnsMdusBU/PdO/se6Cv0q43YqVkr0GmMGs7j1VCPm4oImsokyZyBm6//s4MS9yOtn32ZRqLezIfpKXBXtTTT3pn/vQ3sfnW6QCMZjZoxn5hkyXW9z1YEqgt+nfxxlaz441KKtgutei8nIZHS3E3ys5AKBkeozxdOJqTH8M0ZIvyJb9Z4p5GQoNVpnvn44zqT6tCyDosB1HgNx65IPi89plMDjFSJL47EMBthMSbywK5X7ghRPbHCL1Wv08ieMYgOIFfYfdZzd+4SYx1UAHH2Q1C99X8ZmzPQ0Ney6kXF+rX4ewHi+jcdZEXBSDw9wwBjwzuEDNcQ9dwy1GwbbSCBZ/GUHk5gmdkNIgHXYPRrXobm2Ot0dF/Avd2L3En5eqGc9KMyodRPOScVmiUBA4m87/XBiLHOpccurjzi1b4RgJgMOKE/O3dmK/4JwUH6hQq1io3e9cWs1SL5W9SB+iUtoXjaqXB6ApN4WOL+P+ZQeiMluCdVbHGPver9Pkb70Bg07ZYICeks63hWcmeP/3eMac8nINeR9m6BvuFNQXX/rkwbo3RwFRC67yLGkySCFXXUbw53TP8HnT9ZciXDAMRf5QJh48qs4Q/bW/FrnfEdLHr5ma1QEfH/FuiAu9CavAs6SnoLjKC1MGzUe+s/MFxxd7i5THRuM8GwVhautEV7Wslgq12wzyUihZ5hdTUMzQqP409gqFdpFoH7LWHAMl6FMjpCThdbD+X16OuaIfl04CTew0PjyZn5Pow4iYc4Y4bUg0hWmOwQY0bek0ApntPYMbhPCWitZpdsyg5nMGLGdA39SwQmP0Uio8V523MP/ih7fiJdT+O/2mvE98syZeM9eHLjE3Zgm62zwPoU71nOWUeh6W0PcJhpnT40yjZrvU1tMhtl3vVJAXCqAppotzXVH3a/HKueinXs9TbsR2YRaCsdqjNqMsH+MIdLKcR2jWRUHs+rKAL7+od/8FEP+D5PVYAm6oV1MqY0xizWuC8+nTzl3V93Whf2XO7YcjYF4DZSve4r7xrLmmOK6dP8PfMYH2IXyeGZkNM43TWy+jXz/bDOp1fXpTCDtiIQtVy2pwwQUkpbSmwCABxV4KPSToMeJX/T+j3P+p2G0y6E4R+Z43lWYOkV2hQI+H420kU3T1kOHlSzAjN0ZthZpEvpiov5czsLCl6dK7BR00vH4aE03IONxnpcpNf8I+oRr9LBfikAehjVh/wksTdhaLRTd7MunkcgoQRcUumkVh0/FqUhIYDu0lePJYI+ZCVfPhOaV0bacyV3LK7jUu444lG3OicDiImgsNKdrDPpAvsORuJ4MSdvllD+JhldIHiZ3L4F1atRB7zQchN2prmAqWRlrix1PeQSOqcCl+KaylKoWepUEGUW1xwqc6gmIQyeQZTI4VafDrZznhNGCe0aGJGjALqX/5bdAbJQYP0UFp9KiKZ3Abf/ZmAw3vBxaJG8Xgf7bkEspTgjWkxoy7RHOYi6Zm88vFFKykB3MXimwoZPCYKzm/RSRM9HfMylFLbGCYuJc7NJ5B3lmI3EV5+YAAA=',water:'data:image/webp;base64,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',stone:'data:image/webp;base64,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',forest:'data:image/webp;base64,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',cave:'data:image/webp;base64,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',sand:'data:image/webp;base64,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'};
const SPR={};
const BGSRC={"beach": "bgx_beach_de06a2f5.webp", "falls": "bgx_falls_8436c446.webp", "house": "bgx_house_b817f1ca.webp"};
const SPRSRC={};const ATLAS=["atlas_0_28042edd.webp", "atlas_1_2c484722.webp", "atlas_2_fa084d60.webp", "atlas_3_9e071451.webp", "atlas_4_a90cf006.webp"];const ATLAS_WH=[[2048, 1980], [2048, 2041], [2048, 1992], [2048, 1940], [2048, 1519]];const AMAP={"b_sala":[0,3,3,246,280],"b_temple1":[0,252,3,280,275],"x_busstop":[0,535,3,280,259],"b_work":[0,818,3,280,256],"b_temple0":[0,1101,3,280,251],"b_house":[0,1384,3,280,250],"b_barn":[0,1667,3,280,236],"b_gh":[0,3,286,280,225],"b_clinic":[0,286,286,280,222],"b_museum":[0,569,286,280,220],"x_sand3":[0,852,286,219,220],"b_resto":[0,1074,286,280,217],"b_shop":[0,1357,286,280,215],"b_school":[0,1640,286,280,214],"b_cottage":[0,3,514,280,212],"x_sand2":[0,286,514,220,210],"ft_banana_1":[0,509,514,192,200],"ft_coco_1":[0,704,514,174,200],"ft_mango_1":[0,881,514,176,200],"ft_mango_2":[0,1060,514,197,200],"palm":[0,1260,514,190,200],"tree0":[0,1453,514,193,200],"tree1":[0,1649,514,192,200],"tree2":[0,1844,514,196,200],"ft_banana_2":[0,3,729,200,199],"ft_coco_0":[0,206,729,199,199],"ft_coco_2":[0,408,729,200,197],"ft_banana_0":[0,611,729,193,195],"ft_coco_3":[0,807,729,200,195],"ft_mango_3":[0,1010,729,200,195],"x_sand1":[0,1213,729,220,195],"ft_banana_3":[0,1436,729,200,189],"x_booth":[0,1639,729,220,188],"ft_mango_0":[0,3,931,184,181],"act_axe_down_0":[0,190,931,170,170],"act_axe_down_1":[0,363,931,170,170],"act_axe_down_2":[0,536,931,170,170],"act_axe_down_3":[0,709,931,170,170],"act_axe_right_0":[0,882,931,170,170],"act_axe_right_1":[0,1055,931,170,170],"act_axe_right_2":[0,1228,931,170,170],"act_axe_right_3":[0,1401,931,170,170],"act_axe_up_0":[0,1574,931,170,170],"act_axe_up_1":[0,1747,931,170,170],"act_axe_up_2":[0,3,1115,170,170],"act_axe_up_3":[0,176,1115,170,170],"act_can_down_0":[0,349,1115,170,170],"act_can_down_1":[0,522,1115,170,170],"act_can_down_2":[0,695,1115,170,170],"act_can_down_3":[0,868,1115,170,170],"act_can_right_0":[0,1041,1115,170,170],"act_can_right_1":[0,1214,1115,170,170],"act_can_right_2":[0,1387,1115,170,170],"act_can_right_3":[0,1560,1115,170,170],"act_can_up_0":[0,1733,1115,170,170],"act_can_up_1":[0,3,1288,170,170],"act_can_up_2":[0,176,1288,170,170],"act_can_up_3":[0,349,1288,170,170],"act_eat_down_0":[0,522,1288,170,170],"act_eat_down_1":[0,695,1288,170,170],"act_eat_down_2":[0,868,1288,170,170],"act_eat_down_3":[0,1041,1288,170,170],"act_egg_down_0":[0,1214,1288,170,170],"act_egg_down_1":[0,1387,1288,170,170],"act_egg_down_2":[0,1560,1288,170,170],"act_egg_down_3":[0,1733,1288,170,170],"act_egg_right_0":[0,3,1461,170,170],"act_egg_right_1":[0,176,1461,170,170],"act_egg_right_2":[0,349,1461,170,170],"act_egg_right_3":[0,522,1461,170,170],"act_feed_down_0":[0,695,1461,170,170],"act_feed_down_1":[0,868,1461,170,170],"act_feed_down_2":[0,1041,1461,170,170],"act_feed_down_3":[0,1214,1461,170,170],"act_feed_right_0":[0,1387,1461,170,170],"act_feed_right_1":[0,1560,1461,170,170],"act_feed_right_2":[0,1733,1461,170,170],"act_feed_right_3":[0,3,1634,170,170],"act_fishcast_right_0":[0,176,1634,170,170],"act_fishcast_right_1":[0,349,1634,170,170],"act_fishcast_right_2":[0,522,1634,170,170],"act_fishcast_right_3":[0,695,1634,170,170],"act_fishreel_right_0":[0,868,1634,170,170],"act_fishreel_right_1":[0,1041,1634,170,170],"act_fishreel_right_2":[0,1214,1634,170,170],"act_fishreel_right_3":[0,1387,1634,170,170],"act_fishwait_right_0":[0,1560,1634,170,170],"act_fishwait_right_1":[0,1733,1634,170,170],"act_fishwait_right_2":[0,3,1807,170,170],"act_fishwait_right_3":[0,176,1807,170,170],"act_hammer_down_0":[0,349,1807,170,170],"act_hammer_down_1":[0,522,1807,170,170],"act_hammer_down_2":[0,695,1807,170,170],"act_hammer_down_3":[0,868,1807,170,170],"act_hammer_right_0":[0,1041,1807,170,170],"act_hammer_right_1":[0,1214,1807,170,170],"act_hammer_right_2":[0,1387,1807,170,170],"act_hammer_right_3":[0,1560,1807,170,170],"act_hammer_up_0":[0,1733,1807,170,170],"act_hammer_up_1":[1,3,3,170,170],"act_hammer_up_2":[1,176,3,170,170],"act_hammer_up_3":[1,349,3,170,170],"act_hoe_down_0":[1,522,3,170,170],"act_hoe_down_1":[1,695,3,170,170],"act_hoe_down_2":[1,868,3,170,170],"act_hoe_down_3":[1,1041,3,170,170],"act_hoe_right_0":[1,1214,3,170,170],"act_hoe_right_1":[1,1387,3,170,170],"act_hoe_right_2":[1,1560,3,170,170],"act_hoe_right_3":[1,1733,3,170,170],"act_hoe_up_0":[1,3,176,170,170],"act_hoe_up_1":[1,176,176,170,170],"act_hoe_up_2":[1,349,176,170,170],"act_hoe_up_3":[1,522,176,170,170],"act_holdup_down_0":[1,695,176,170,170],"act_holdup_down_1":[1,868,176,170,170],"act_holdup_down_2":[1,1041,176,170,170],"act_holdup_down_3":[1,1214,176,170,170],"act_milk_down_0":[1,1387,176,170,170],"act_milk_down_1":[1,1560,176,170,170],"act_milk_down_2":[1,1733,176,170,170],"act_milk_down_3":[1,3,349,170,170],"act_milk_right_0":[1,176,349,170,170],"act_milk_right_1":[1,349,349,170,170],"act_milk_right_2":[1,522,349,170,170],"act_milk_right_3":[1,695,349,170,170],"act_patA_down_0":[1,868,349,170,170],"act_patA_down_1":[1,1041,349,170,170],"act_patA_down_2":[1,1214,349,170,170],"act_patA_down_3":[1,1387,349,170,170],"act_patA_right_0":[1,1560,349,170,170],"act_patA_right_1":[1,1733,349,170,170],"act_patA_right_2":[1,3,522,170,170],"act_patA_right_3":[1,176,522,170,170],"act_pet_right_0":[1,349,522,170,170],"act_pet_right_1":[1,522,522,170,170],"act_pet_right_2":[1,695,522,170,170],"act_pet_right_3":[1,868,522,170,170],"act_pick_down_0":[1,1041,522,170,170],"act_pick_down_1":[1,1214,522,170,170],"act_pick_down_2":[1,1387,522,170,170],"act_pick_down_3":[1,1560,522,170,170],"act_sickle_down_0":[1,1733,522,170,170],"act_sickle_down_1":[1,3,695,170,170],"act_sickle_down_2":[1,176,695,170,170],"act_sickle_down_3":[1,349,695,170,170],"act_sickle_right_0":[1,522,695,170,170],"act_sickle_right_1":[1,695,695,170,170],"act_sickle_right_2":[1,868,695,170,170],"act_sickle_right_3":[1,1041,695,170,170],"act_sickle_up_0":[1,1214,695,170,170],"act_sickle_up_1":[1,1387,695,170,170],"act_sickle_up_2":[1,1560,695,170,170],"act_sickle_up_3":[1,1733,695,170,170],"act_sow_down_0":[1,3,868,170,170],"act_sow_down_1":[1,176,868,170,170],"act_sow_down_2":[1,349,868,170,170],"act_sow_down_3":[1,522,868,170,170],"act_sow_right_0":[1,695,868,170,170],"act_sow_right_1":[1,868,868,170,170],"act_sow_right_2":[1,1041,868,170,170],"act_sow_right_3":[1,1214,868,170,170],"act_wave_down_0":[1,1387,868,170,170],"act_wave_down_1":[1,1560,868,170,170],"act_wave_down_2":[1,1733,868,170,170],"act_wave_down_3":[1,3,1041,170,170],"act_yawn_down_0":[1,176,1041,170,170],"act_yawn_down_1":[1,349,1041,170,170],"act_yawn_down_2":[1,522,1041,170,170],"act_yawn_down_3":[1,695,1041,170,170],"h_bed":[1,868,1041,135,170],"h_cradle":[1,1006,1041,142,170],"h_fridge":[1,1151,1041,89,170],"h_plant":[1,1243,1041,150,170],"h_radio":[1,1396,1041,123,170],"h_shelf":[1,1522,1041,114,170],"h_table":[1,1639,1041,163,170],"pt_daed_0":[1,1805,1041,168,170],"pt_daed_1":[1,3,1214,168,170],"pt_daed_2":[1,174,1214,168,170],"pt_daeng_0":[1,345,1214,165,170],"pt_daeng_1":[1,513,1214,165,170],"pt_daeng_2":[1,681,1214,160,170],"pt_ek_0":[1,844,1214,154,170],"pt_ek_1":[1,1001,1214,158,170],"pt_ek_2":[1,1162,1214,164,170],"pt_fon_0":[1,1329,1214,150,170],"pt_fon_1":[1,1482,1214,156,170],"pt_fon_2":[1,1641,1214,156,170],"pt_ja_0":[1,1800,1214,136,170],"pt_ja_1":[1,3,1387,137,170],"pt_ja_2":[1,143,1387,135,170],"pt_merchant_0":[1,281,1387,120,170],"pt_merchant_1":[1,404,1387,130,170],"pt_merchant_2":[1,537,1387,136,170],"pt_mint_0":[1,676,1387,168,170],"pt_mint_1":[1,847,1387,169,170],"pt_mint_2":[1,1019,1387,165,170],"pt_nun_0":[1,1187,1387,169,170],"pt_nun_2":[1,1359,1387,169,170],"pt_phum_2":[1,1531,1387,151,170],"pt_sai_0":[1,1685,1387,156,170],"pt_sai_1":[1,1844,1387,156,170],"pt_sai_2":[1,3,1560,152,170],"pt_ton_0":[1,158,1560,142,170],"pt_ton_1":[1,303,1560,142,170],"pt_ton_2":[1,448,1560,138,170],"pt_mee_0":[1,589,1560,170,169],"pt_phum_1":[1,762,1560,170,169],"pt_mee_1":[1,935,1560,170,168],"pt_mee_2":[1,1108,1560,170,168],"x_bus":[1,1281,1560,280,167],"pt_phum_0":[1,1564,1560,170,165],"pt_nun_1":[1,1737,1560,170,162],"h_rug":[1,3,1733,170,152],"a_goat":[1,176,1733,127,150],"a_hen":[1,306,1733,133,150],"a_horse":[1,442,1733,131,150],"c_daed_down":[1,576,1733,117,150],"c_daed_down_w0":[1,696,1733,117,150],"c_daed_down_w1":[1,816,1733,117,150],"c_daed_down_w2":[1,936,1733,117,150],"c_daed_down_w3":[1,1056,1733,117,150],"c_daed_left":[1,1176,1733,120,150],"c_daed_left_w0":[1,1299,1733,120,150],"c_daed_left_w1":[1,1422,1733,120,150],"c_daed_left_w2":[1,1545,1733,120,150],"c_daed_left_w3":[1,1668,1733,120,150],"c_daed_right":[1,1791,1733,123,150],"c_daed_right_w0":[1,1917,1733,123,150],"c_daed_right_w1":[1,3,1888,123,150],"c_daed_right_w2":[1,129,1888,123,150],"c_daed_right_w3":[1,255,1888,123,150],"c_daed_up":[1,381,1888,106,150],"c_daed_up_w0":[1,490,1888,106,150],"c_daed_up_w1":[1,599,1888,106,150],"c_daed_up_w2":[1,708,1888,106,150],"c_daed_up_w3":[1,817,1888,106,150],"c_daeng_down":[1,926,1888,91,150],"c_daeng_down_w0":[1,1020,1888,92,150],"c_daeng_down_w1":[1,1115,1888,92,150],"c_daeng_down_w2":[1,1210,1888,92,150],"c_daeng_down_w3":[1,1305,1888,92,150],"c_daeng_down_w4":[1,1400,1888,92,150],"c_daeng_down_w5":[1,1495,1888,92,150],"c_daeng_down_w6":[1,1590,1888,92,150],"c_daeng_down_w7":[1,1685,1888,92,150],"c_daeng_left":[1,1780,1888,95,150],"c_daeng_left_w0":[1,1878,1888,100,150],"c_daeng_left_w1":[2,3,3,100,150],"c_daeng_left_w2":[2,106,3,100,150],"c_daeng_left_w3":[2,209,3,100,150],"c_daeng_left_w4":[2,312,3,100,150],"c_daeng_left_w5":[2,415,3,100,150],"c_daeng_left_w6":[2,518,3,100,150],"c_daeng_left_w7":[2,621,3,100,150],"c_daeng_right":[2,724,3,96,150],"c_daeng_right_w0":[2,823,3,98,150],"c_daeng_right_w1":[2,924,3,98,150],"c_daeng_right_w2":[2,1025,3,98,150],"c_daeng_right_w3":[2,1126,3,98,150],"c_daeng_right_w4":[2,1227,3,98,150],"c_daeng_right_w5":[2,1328,3,98,150],"c_daeng_right_w6":[2,1429,3,98,150],"c_daeng_right_w7":[2,1530,3,98,150],"c_daeng_up":[2,1631,3,86,150],"c_daeng_up_w0":[2,1720,3,91,150],"c_daeng_up_w1":[2,1814,3,91,150],"c_daeng_up_w2":[2,1908,3,91,150],"c_daeng_up_w3":[2,3,156,91,150],"c_daeng_up_w4":[2,97,156,91,150],"c_daeng_up_w5":[2,191,156,91,150],"c_daeng_up_w6":[2,285,156,91,150],"c_daeng_up_w7":[2,379,156,91,150],"c_ek_down":[2,473,156,88,150],"c_ek_down_w0":[2,564,156,96,150],"c_ek_down_w1":[2,663,156,96,150],"c_ek_down_w2":[2,762,156,96,150],"c_ek_down_w3":[2,861,156,96,150],"c_ek_down_w4":[2,960,156,96,150],"c_ek_down_w5":[2,1059,156,96,150],"c_ek_down_w6":[2,1158,156,96,150],"c_ek_down_w7":[2,1257,156,96,150],"c_ek_left":[2,1356,156,87,150],"c_ek_left_w0":[2,1446,156,104,150],"c_ek_left_w1":[2,1553,156,104,150],"c_ek_left_w2":[2,1660,156,104,150],"c_ek_left_w3":[2,1767,156,104,150],"c_ek_left_w4":[2,1874,156,104,150],"c_ek_left_w5":[2,3,309,104,150],"c_ek_left_w6":[2,110,309,104,150],"c_ek_left_w7":[2,217,309,104,150],"c_ek_right":[2,324,309,87,150],"c_ek_right_w0":[2,414,309,99,150],"c_ek_right_w1":[2,516,309,99,150],"c_ek_right_w2":[2,618,309,99,150],"c_ek_right_w3":[2,720,309,99,150],"c_ek_right_w4":[2,822,309,99,150],"c_ek_right_w5":[2,924,309,99,150],"c_ek_right_w6":[2,1026,309,99,150],"c_ek_right_w7":[2,1128,309,99,150],"c_ek_up":[2,1230,309,85,150],"c_ek_up_w0":[2,1318,309,97,150],"c_ek_up_w1":[2,1418,309,97,150],"c_ek_up_w2":[2,1518,309,97,150],"c_ek_up_w3":[2,1618,309,97,150],"c_ek_up_w4":[2,1718,309,97,150],"c_ek_up_w5":[2,1818,309,97,150],"c_ek_up_w6":[2,1918,309,97,150],"c_ek_up_w7":[2,3,462,97,150],"c_fon_down":[2,103,462,74,150],"c_fon_down_w0":[2,180,462,90,150],"c_fon_down_w1":[2,273,462,90,150],"c_fon_down_w2":[2,366,462,90,150],"c_fon_down_w3":[2,459,462,90,150],"c_fon_down_w4":[2,552,462,90,150],"c_fon_down_w5":[2,645,462,90,150],"c_fon_down_w6":[2,738,462,90,150],"c_fon_down_w7":[2,831,462,90,150],"c_fon_left":[2,924,462,80,150],"c_fon_left_w0":[2,1007,462,115,150],"c_fon_left_w1":[2,1125,462,115,150],"c_fon_left_w2":[2,1243,462,115,150],"c_fon_left_w3":[2,1361,462,115,150],"c_fon_left_w4":[2,1479,462,115,150],"c_fon_left_w5":[2,1597,462,115,150],"c_fon_left_w6":[2,1715,462,115,150],"c_fon_left_w7":[2,1833,462,115,150],"c_fon_right":[2,1951,462,80,150],"c_fon_right_w0":[2,3,615,112,150],"c_fon_right_w1":[2,118,615,112,150],"c_fon_right_w2":[2,233,615,112,150],"c_fon_right_w3":[2,348,615,112,150],"c_fon_right_w4":[2,463,615,112,150],"c_fon_right_w5":[2,578,615,112,150],"c_fon_right_w6":[2,693,615,112,150],"c_fon_right_w7":[2,808,615,112,150],"c_fon_up":[2,923,615,71,150],"c_fon_up_w0":[2,997,615,89,150],"c_fon_up_w1":[2,1089,615,89,150],"c_fon_up_w2":[2,1181,615,89,150],"c_fon_up_w3":[2,1273,615,89,150],"c_fon_up_w4":[2,1365,615,89,150],"c_fon_up_w5":[2,1457,615,89,150],"c_fon_up_w6":[2,1549,615,89,150],"c_fon_up_w7":[2,1641,615,89,150],"c_ja_down":[2,1733,615,97,150],"c_ja_down_w0":[2,1833,615,97,150],"c_ja_down_w1":[2,1933,615,97,150],"c_ja_down_w2":[2,3,768,97,150],"c_ja_down_w3":[2,103,768,97,150],"c_ja_down_w4":[2,203,768,97,150],"c_ja_down_w5":[2,303,768,97,150],"c_ja_down_w6":[2,403,768,97,150],"c_ja_down_w7":[2,503,768,97,150],"c_ja_left":[2,603,768,109,150],"c_ja_left_w0":[2,715,768,109,150],"c_ja_left_w1":[2,827,768,109,150],"c_ja_left_w2":[2,939,768,109,150],"c_ja_left_w3":[2,1051,768,109,150],"c_ja_left_w4":[2,1163,768,109,150],"c_ja_left_w5":[2,1275,768,109,150],"c_ja_left_w6":[2,1387,768,109,150],"c_ja_left_w7":[2,1499,768,109,150],"c_ja_right":[2,1611,768,107,150],"c_ja_right_w0":[2,1721,768,107,150],"c_ja_right_w1":[2,1831,768,107,150],"c_ja_right_w2":[2,3,921,107,150],"c_ja_right_w3":[2,113,921,107,150],"c_ja_right_w4":[2,223,921,107,150],"c_ja_right_w5":[2,333,921,107,150],"c_ja_right_w6":[2,443,921,107,150],"c_ja_right_w7":[2,553,921,107,150],"c_ja_up":[2,663,921,92,150],"c_ja_up_w0":[2,758,921,92,150],"c_ja_up_w1":[2,853,921,92,150],"c_ja_up_w2":[2,948,921,92,150],"c_ja_up_w3":[2,1043,921,92,150],"c_ja_up_w4":[2,1138,921,92,150],"c_ja_up_w5":[2,1233,921,92,150],"c_ja_up_w6":[2,1328,921,92,150],"c_ja_up_w7":[2,1423,921,92,150],"c_kid_down":[2,1518,921,95,150],"c_kid_down_w0":[2,1616,921,97,150],"c_kid_down_w1":[2,1716,921,97,150],"c_kid_down_w2":[2,1816,921,97,150],"c_kid_down_w3":[2,1916,921,97,150],"c_kid_down_w4":[2,3,1074,97,150],"c_kid_down_w5":[2,103,1074,97,150],"c_kid_down_w6":[2,203,1074,97,150],"c_kid_down_w7":[2,303,1074,97,150],"c_kid_left":[2,403,1074,86,150],"c_kid_left_w0":[2,492,1074,102,150],"c_kid_left_w1":[2,597,1074,102,150],"c_kid_left_w2":[2,702,1074,102,150],"c_kid_left_w3":[2,807,1074,102,150],"c_kid_left_w4":[2,912,1074,102,150],"c_kid_left_w5":[2,1017,1074,102,150],"c_kid_left_w6":[2,1122,1074,102,150],"c_kid_left_w7":[2,1227,1074,102,150],"c_kid_right":[2,1332,1074,94,150],"c_kid_right_w0":[2,1429,1074,101,150],"c_kid_right_w1":[2,1533,1074,101,150],"c_kid_right_w2":[2,1637,1074,101,150],"c_kid_right_w3":[2,1741,1074,101,150],"c_kid_right_w4":[2,1845,1074,101,150],"c_kid_right_w5":[2,3,1227,101,150],"c_kid_right_w6":[2,107,1227,101,150],"c_kid_right_w7":[2,211,1227,101,150],"c_kid_up":[2,315,1227,90,150],"c_kid_up_w0":[2,408,1227,93,150],"c_kid_up_w1":[2,504,1227,93,150],"c_kid_up_w2":[2,600,1227,93,150],"c_kid_up_w3":[2,696,1227,93,150],"c_kid_up_w4":[2,792,1227,93,150],"c_kid_up_w5":[2,888,1227,93,150],"c_kid_up_w6":[2,984,1227,93,150],"c_kid_up_w7":[2,1080,1227,93,150],"c_me_down":[2,1176,1227,112,150],"c_me_down_w0":[2,1291,1227,121,150],"c_me_down_w1":[2,1415,1227,121,150],"c_me_down_w2":[2,1539,1227,121,150],"c_me_down_w3":[2,1663,1227,121,150],"c_me_down_w4":[2,1787,1227,121,150],"c_me_down_w5":[2,1911,1227,121,150],"c_me_down_w6":[2,3,1380,121,150],"c_me_down_w7":[2,127,1380,121,150],"c_me_left":[2,251,1380,107,150],"c_me_left_w0":[2,361,1380,124,150],"c_me_left_w1":[2,488,1380,124,150],"c_me_left_w2":[2,615,1380,124,150],"c_me_left_w3":[2,742,1380,124,150],"c_me_left_w4":[2,869,1380,124,150],"c_me_left_w5":[2,996,1380,124,150],"c_me_left_w6":[2,1123,1380,124,150],"c_me_left_w7":[2,1250,1380,124,150],"c_me_right":[2,1377,1380,106,150],"c_me_right_w0":[2,1486,1380,118,150],"c_me_right_w1":[2,1607,1380,118,150],"c_me_right_w2":[2,1728,1380,118,150],"c_me_right_w3":[2,1849,1380,118,150],"c_me_right_w4":[2,3,1533,118,150],"c_me_right_w5":[2,124,1533,118,150],"c_me_right_w6":[2,245,1533,118,150],"c_me_right_w7":[2,366,1533,118,150],"c_me_up":[2,487,1533,105,150],"c_me_up_w0":[2,595,1533,115,150],"c_me_up_w1":[2,713,1533,115,150],"c_me_up_w2":[2,831,1533,115,150],"c_me_up_w3":[2,949,1533,115,150],"c_me_up_w4":[2,1067,1533,115,150],"c_me_up_w5":[2,1185,1533,115,150],"c_me_up_w6":[2,1303,1533,115,150],"c_me_up_w7":[2,1421,1533,115,150],"c_mee_down":[2,1539,1533,101,150],"c_mee_down_w0":[2,1643,1533,107,150],"c_mee_down_w1":[2,1753,1533,107,150],"c_mee_down_w2":[2,1863,1533,107,150],"c_mee_down_w3":[2,3,1686,107,150],"c_mee_down_w4":[2,113,1686,107,150],"c_mee_down_w5":[2,223,1686,107,150],"c_mee_down_w6":[2,333,1686,107,150],"c_mee_down_w7":[2,443,1686,107,150],"c_mee_left":[2,553,1686,109,150],"c_mee_left_w0":[2,665,1686,127,150],"c_mee_left_w1":[2,795,1686,127,150],"c_mee_left_w2":[2,925,1686,127,150],"c_mee_left_w3":[2,1055,1686,127,150],"c_mee_left_w4":[2,1185,1686,127,150],"c_mee_left_w5":[2,1315,1686,127,150],"c_mee_left_w6":[2,1445,1686,127,150],"c_mee_left_w7":[2,1575,1686,127,150],"c_mee_right":[2,1705,1686,96,150],"c_mee_right_w0":[2,1804,1686,130,150],"c_mee_right_w1":[2,3,1839,130,150],"c_mee_right_w2":[2,136,1839,130,150],"c_mee_right_w3":[2,269,1839,130,150],"c_mee_right_w4":[2,402,1839,130,150],"c_mee_right_w5":[2,535,1839,130,150],"c_mee_right_w6":[2,668,1839,130,150],"c_mee_right_w7":[2,801,1839,130,150],"c_mee_up":[2,934,1839,93,150],"c_mee_up_w0":[2,1030,1839,107,150],"c_mee_up_w1":[2,1140,1839,107,150],"c_mee_up_w2":[2,1250,1839,107,150],"c_mee_up_w3":[2,1360,1839,107,150],"c_mee_up_w4":[2,1470,1839,107,150],"c_mee_up_w5":[2,1580,1839,107,150],"c_mee_up_w6":[2,1690,1839,107,150],"c_mee_up_w7":[2,1800,1839,107,150],"c_mint_down":[2,1910,1839,101,150],"c_mint_down_w0":[3,3,3,101,150],"c_mint_down_w1":[3,107,3,101,150],"c_mint_down_w2":[3,211,3,101,150],"c_mint_down_w3":[3,315,3,101,150],"c_mint_down_w4":[3,419,3,101,150],"c_mint_down_w5":[3,523,3,101,150],"c_mint_down_w6":[3,627,3,101,150],"c_mint_down_w7":[3,731,3,101,150],"c_mint_left":[3,835,3,110,150],"c_mint_left_w0":[3,948,3,110,150],"c_mint_left_w1":[3,1061,3,110,150],"c_mint_left_w2":[3,1174,3,110,150],"c_mint_left_w3":[3,1287,3,110,150],"c_mint_left_w4":[3,1400,3,110,150],"c_mint_left_w5":[3,1513,3,110,150],"c_mint_left_w6":[3,1626,3,110,150],"c_mint_left_w7":[3,1739,3,110,150],"c_mint_right":[3,1852,3,111,150],"c_mint_right_w0":[3,3,156,111,150],"c_mint_right_w1":[3,117,156,111,150],"c_mint_right_w2":[3,231,156,111,150],"c_mint_right_w3":[3,345,156,111,150],"c_mint_right_w4":[3,459,156,111,150],"c_mint_right_w5":[3,573,156,111,150],"c_mint_right_w6":[3,687,156,111,150],"c_mint_right_w7":[3,801,156,111,150],"c_mint_up":[3,915,156,96,150],"c_mint_up_w0":[3,1014,156,96,150],"c_mint_up_w1":[3,1113,156,96,150],"c_mint_up_w2":[3,1212,156,96,150],"c_mint_up_w3":[3,1311,156,96,150],"c_mint_up_w4":[3,1410,156,96,150],"c_mint_up_w5":[3,1509,156,96,150],"c_mint_up_w6":[3,1608,156,96,150],"c_mint_up_w7":[3,1707,156,96,150],"c_nun_down":[3,1806,156,95,150],"c_nun_down_w0":[3,1904,156,105,150],"c_nun_down_w1":[3,3,309,105,150],"c_nun_down_w2":[3,111,309,105,150],"c_nun_down_w3":[3,219,309,105,150],"c_nun_down_w4":[3,327,309,105,150],"c_nun_down_w5":[3,435,309,105,150],"c_nun_down_w6":[3,543,309,105,150],"c_nun_down_w7":[3,651,309,105,150],"c_nun_left":[3,759,309,88,150],"c_nun_left_w0":[3,850,309,115,150],"c_nun_left_w1":[3,968,309,115,150],"c_nun_left_w2":[3,1086,309,115,150],"c_nun_left_w3":[3,1204,309,115,150],"c_nun_left_w4":[3,1322,309,115,150],"c_nun_left_w5":[3,1440,309,115,150],"c_nun_left_w6":[3,1558,309,115,150],"c_nun_left_w7":[3,1676,309,115,150],"c_nun_right":[3,1794,309,89,150],"c_nun_right_w0":[3,1886,309,114,150],"c_nun_right_w1":[3,3,462,114,150],"c_nun_right_w2":[3,120,462,114,150],"c_nun_right_w3":[3,237,462,114,150],"c_nun_right_w4":[3,354,462,114,150],"c_nun_right_w5":[3,471,462,114,150],"c_nun_right_w6":[3,588,462,114,150],"c_nun_right_w7":[3,705,462,114,150],"c_nun_up":[3,822,462,86,150],"c_nun_up_w0":[3,911,462,105,150],"c_nun_up_w1":[3,1019,462,105,150],"c_nun_up_w2":[3,1127,462,105,150],"c_nun_up_w3":[3,1235,462,105,150],"c_nun_up_w4":[3,1343,462,105,150],"c_nun_up_w5":[3,1451,462,105,150],"c_nun_up_w6":[3,1559,462,105,150],"c_nun_up_w7":[3,1667,462,105,150],"c_phum_down":[3,1775,462,95,150],"c_phum_down_w0":[3,1873,462,120,150],"c_phum_down_w1":[3,3,615,120,150],"c_phum_down_w2":[3,126,615,120,150],"c_phum_down_w3":[3,249,615,120,150],"c_phum_down_w4":[3,372,615,120,150],"c_phum_down_w5":[3,495,615,120,150],"c_phum_down_w6":[3,618,615,120,150],"c_phum_down_w7":[3,741,615,120,150],"c_phum_left":[3,864,615,88,150],"c_phum_left_w0":[3,955,615,110,150],"c_phum_left_w1":[3,1068,615,110,150],"c_phum_left_w2":[3,1181,615,110,150],"c_phum_left_w3":[3,1294,615,110,150],"c_phum_left_w4":[3,1407,615,110,150],"c_phum_left_w5":[3,1520,615,110,150],"c_phum_left_w6":[3,1633,615,110,150],"c_phum_left_w7":[3,1746,615,110,150],"c_phum_right":[3,1859,615,87,150],"c_phum_right_w0":[3,3,768,107,150],"c_phum_right_w1":[3,113,768,107,150],"c_phum_right_w2":[3,223,768,107,150],"c_phum_right_w3":[3,333,768,107,150],"c_phum_right_w4":[3,443,768,107,150],"c_phum_right_w5":[3,553,768,107,150],"c_phum_right_w6":[3,663,768,107,150],"c_phum_right_w7":[3,773,768,107,150],"c_phum_up":[3,883,768,96,150],"c_phum_up_w0":[3,982,768,117,150],"c_phum_up_w1":[3,1102,768,117,150],"c_phum_up_w2":[3,1222,768,117,150],"c_phum_up_w3":[3,1342,768,117,150],"c_phum_up_w4":[3,1462,768,117,150],"c_phum_up_w5":[3,1582,768,117,150],"c_phum_up_w6":[3,1702,768,117,150],"c_phum_up_w7":[3,1822,768,117,150],"c_sai_down":[3,1942,768,85,150],"c_sai_down_w0":[3,3,921,95,150],"c_sai_down_w1":[3,101,921,95,150],"c_sai_down_w2":[3,199,921,95,150],"c_sai_down_w3":[3,297,921,95,150],"c_sai_down_w4":[3,395,921,95,150],"c_sai_down_w5":[3,493,921,95,150],"c_sai_down_w6":[3,591,921,95,150],"c_sai_down_w7":[3,689,921,95,150],"c_sai_left":[3,787,921,90,150],"c_sai_left_w0":[3,880,921,106,150],"c_sai_left_w1":[3,989,921,106,150],"c_sai_left_w2":[3,1098,921,106,150],"c_sai_left_w3":[3,1207,921,106,150],"c_sai_left_w4":[3,1316,921,106,150],"c_sai_left_w5":[3,1425,921,106,150],"c_sai_left_w6":[3,1534,921,106,150],"c_sai_left_w7":[3,1643,921,106,150],"c_sai_right":[3,1752,921,87,150],"c_sai_right_w0":[3,1842,921,104,150],"c_sai_right_w1":[3,3,1074,104,150],"c_sai_right_w2":[3,110,1074,104,150],"c_sai_right_w3":[3,217,1074,104,150],"c_sai_right_w4":[3,324,1074,104,150],"c_sai_right_w5":[3,431,1074,104,150],"c_sai_right_w6":[3,538,1074,104,150],"c_sai_right_w7":[3,645,1074,104,150],"c_sai_up":[3,752,1074,82,150],"c_sai_up_w0":[3,837,1074,91,150],"c_sai_up_w1":[3,931,1074,91,150],"c_sai_up_w2":[3,1025,1074,91,150],"c_sai_up_w3":[3,1119,1074,91,150],"c_sai_up_w4":[3,1213,1074,91,150],"c_sai_up_w5":[3,1307,1074,91,150],"c_sai_up_w6":[3,1401,1074,91,150],"c_sai_up_w7":[3,1495,1074,91,150],"c_ton_down":[3,1589,1074,79,150],"c_ton_down_w0":[3,1671,1074,92,150],"c_ton_down_w1":[3,1766,1074,92,150],"c_ton_down_w2":[3,1861,1074,92,150],"c_ton_down_w3":[3,3,1227,92,150],"c_ton_down_w4":[3,98,1227,92,150],"c_ton_down_w5":[3,193,1227,92,150],"c_ton_down_w6":[3,288,1227,92,150],"c_ton_down_w7":[3,383,1227,92,150],"c_ton_left":[3,478,1227,82,150],"c_ton_left_w0":[3,563,1227,97,150],"c_ton_left_w1":[3,663,1227,97,150],"c_ton_left_w2":[3,763,1227,97,150],"c_ton_left_w3":[3,863,1227,97,150],"c_ton_left_w4":[3,963,1227,97,150],"c_ton_left_w5":[3,1063,1227,97,150],"c_ton_left_w6":[3,1163,1227,97,150],"c_ton_left_w7":[3,1263,1227,97,150],"c_ton_right":[3,1363,1227,80,150],"c_ton_right_w0":[3,1446,1227,99,150],"c_ton_right_w1":[3,1548,1227,99,150],"c_ton_right_w2":[3,1650,1227,99,150],"c_ton_right_w3":[3,1752,1227,99,150],"c_ton_right_w4":[3,1854,1227,99,150],"c_ton_right_w5":[3,3,1380,99,150],"c_ton_right_w6":[3,105,1380,99,150],"c_ton_right_w7":[3,207,1380,99,150],"c_ton_up":[3,309,1380,76,150],"c_ton_up_w0":[3,388,1380,88,150],"c_ton_up_w1":[3,479,1380,88,150],"c_ton_up_w2":[3,570,1380,88,150],"c_ton_up_w3":[3,661,1380,88,150],"c_ton_up_w4":[3,752,1380,88,150],"c_ton_up_w5":[3,843,1380,88,150],"c_ton_up_w6":[3,934,1380,88,150],"c_ton_up_w7":[3,1025,1380,88,150],"x_sand0":[3,1116,1380,220,144],"a_hen_e0":[3,1339,1380,150,142],"a_hen_e1":[3,1492,1380,150,142],"a_hen_e2":[3,1645,1380,150,142],"a_hen_e3":[3,1798,1380,150,142],"a_hen_w0":[3,3,1533,150,142],"a_hen_w1":[3,156,1533,150,142],"a_hen_w2":[3,309,1533,150,142],"a_hen_w3":[3,462,1533,150,142],"a_goat_e0":[3,615,1533,150,134],"a_goat_e1":[3,768,1533,150,134],"a_goat_e2":[3,921,1533,150,134],"a_goat_e3":[3,1074,1533,150,134],"a_goat_w0":[3,1227,1533,150,134],"a_goat_w1":[3,1380,1533,150,134],"a_goat_w2":[3,1533,1533,150,134],"a_goat_w3":[3,1686,1533,150,134],"_crops2":[3,1839,1533,85,128],"_ptA":[3,1927,1533,85,128],"_ptB":[3,3,1678,85,128],"bean1":[3,91,1678,105,128],"cab2":[3,199,1678,125,128],"ch1":[3,327,1678,85,128],"ch2":[3,415,1678,122,128],"corn0":[3,540,1678,98,128],"corn1":[3,641,1678,72,128],"corn2":[3,716,1678,109,128],"cuc1":[3,828,1678,111,128],"f_bamboo":[3,942,1678,94,128],"i_bas":[3,1039,1678,120,128],"i_car":[3,1162,1678,104,128],"i_coco":[3,1269,1678,104,128],"i_cuc":[3,1376,1678,90,128],"i_d_coco":[3,1469,1678,113,128],"i_ebp":[3,1585,1678,106,128],"i_ffeed":[3,1694,1678,115,128],"i_fry":[3,1812,1678,107,128],"i_fsauce":[3,1922,1678,50,128],"i_honey":[3,3,1809,110,128],"i_lgr":[3,116,1809,104,128],"i_med":[3,223,1809,73,128],"i_pearl":[3,299,1809,128,128],"i_r_diary":[3,430,1809,119,128],"i_r_khlui":[3,552,1809,91,128],"i_r_medal":[3,646,1809,73,128],"i_r_photo":[3,722,1809,124,128],"i_r_watch":[3,849,1809,92,128],"k_baby0":[3,944,1809,102,128],"k_baby1":[3,1049,1809,96,128],"k_baby2":[3,1148,1809,98,128],"k_baby3":[3,1249,1809,94,128],"kb1":[3,1346,1809,82,128],"kb2":[3,1431,1809,114,128],"m_bee":[3,1548,1809,119,128],"m_cheese":[3,1670,1809,111,128],"m_jar":[3,1784,1809,116,128],"m_mortar":[3,1903,1809,102,128],"m_sauce":[4,3,3,125,128],"rice0":[4,131,3,123,128],"rice1":[4,257,3,77,128],"rice2":[4,337,3,115,128],"straw1":[4,455,3,125,128],"straw2":[4,583,3,110,128],"tom1":[4,696,3,124,128],"wm2":[4,823,3,121,128],"x_blossom0":[4,947,3,119,128],"x_blossom1":[4,1069,3,112,128],"x_board":[4,1184,3,126,128],"x_crow1":[4,1313,3,123,128],"x_duckhouse":[4,1439,3,122,128],"x_fencev":[4,1564,3,55,128],"x_post":[4,1622,3,43,128],"x_rocket":[4,1668,3,127,128],"x_stall":[4,1798,3,126,128],"a_horse_e0":[4,3,134,150,127],"a_horse_e1":[4,156,134,150,127],"a_horse_e2":[4,309,134,150,127],"a_horse_e3":[4,462,134,150,127],"a_horse_w0":[4,615,134,150,127],"a_horse_w1":[4,768,134,150,127],"a_horse_w2":[4,921,134,150,127],"a_horse_w3":[4,1074,134,150,127],"m_churn":[4,1227,134,128,127],"bean2":[4,1358,134,128,126],"i_bean":[4,1489,134,128,126],"i_mango":[4,1620,134,128,126],"straw0":[4,1751,134,128,126],"x_ship1":[4,1882,134,128,126],"a_cow":[4,3,264,150,125],"i_d_lingzhi":[4,156,264,128,125],"car1":[4,287,264,128,124],"i_berry":[4,418,264,128,124],"m_slime":[4,549,264,128,124],"x_corner":[4,680,264,128,124],"a_duck":[4,811,264,150,122],"f_mush":[4,964,264,128,122],"i_pump":[4,1095,264,128,122],"i_squid":[4,1226,264,128,122],"i_tom":[4,1357,264,128,122],"i_bait_worm":[4,1488,264,128,121],"i_honeycomb":[4,1619,264,128,121],"lgr0":[4,1750,264,128,120],"x_chest":[4,1881,264,128,120],"f_phakwan":[4,3,392,128,119],"f_makham":[4,134,392,128,118],"wm1":[4,265,392,128,118],"x_krathong":[4,396,392,128,118],"i_banana":[4,527,392,128,117],"i_d_squidg":[4,658,392,128,117],"m_golem":[4,789,392,128,117],"ch0":[4,920,392,128,115],"ebp1":[4,1051,392,128,115],"lgr1":[4,1182,392,128,115],"x_bowl":[4,1313,392,128,115],"i_seaweed":[4,1444,392,128,114],"x_ladder":[4,1575,392,128,114],"a_buffalo":[4,1706,392,150,113],"a_duck_e0":[4,1859,392,150,113],"a_duck_e1":[4,3,514,150,113],"a_duck_e2":[4,156,514,150,113],"a_duck_e3":[4,309,514,150,113],"a_duck_w0":[4,462,514,150,113],"a_duck_w1":[4,615,514,150,113],"a_duck_w2":[4,768,514,150,113],"a_duck_w3":[4,921,514,150,113],"bas1":[4,1074,514,128,113],"i_shell":[4,1205,514,128,113],"bush":[4,1336,514,128,111],"ebp0":[4,1467,514,128,111],"ore_em":[4,1598,514,128,111],"cab0":[4,1729,514,128,110],"cuc2":[4,1860,514,128,110],"i_brush":[4,3,630,128,110],"p_cat_down_w0":[4,134,630,67,110],"p_cat_down_w1":[4,204,630,67,110],"p_cat_down_w2":[4,274,630,67,110],"p_cat_down_w3":[4,344,630,67,110],"p_cat_down_w4":[4,414,630,67,110],"p_cat_down_w5":[4,484,630,67,110],"p_cat_down_w6":[4,554,630,67,110],"p_cat_down_w7":[4,624,630,67,110],"p_cat_pose0":[4,694,630,105,110],"p_cat_pose1":[4,802,630,109,110],"p_cat_pose5":[4,914,630,95,110],"p_cat_pose7":[4,1012,630,105,110],"p_cat_up_w0":[4,1120,630,74,110],"p_cat_up_w1":[4,1197,630,74,110],"p_cat_up_w2":[4,1274,630,74,110],"p_cat_up_w3":[4,1351,630,74,110],"p_cat_up_w4":[4,1428,630,74,110],"p_cat_up_w5":[4,1505,630,74,110],"p_cat_up_w6":[4,1582,630,74,110],"p_cat_up_w7":[4,1659,630,74,110],"p_dog_down_w0":[4,1736,630,88,110],"p_dog_down_w1":[4,1827,630,88,110],"p_dog_down_w2":[4,1918,630,88,110],"p_dog_down_w3":[4,3,743,88,110],"p_dog_down_w4":[4,94,743,88,110],"p_dog_down_w5":[4,185,743,88,110],"p_dog_down_w6":[4,276,743,88,110],"p_dog_down_w7":[4,367,743,88,110],"p_dog_pose0":[4,458,743,101,110],"p_dog_pose1":[4,562,743,109,110],"p_dog_pose2":[4,674,743,108,110],"p_dog_pose4":[4,785,743,108,110],"p_dog_pose6":[4,896,743,104,110],"p_dog_pose7":[4,1003,743,87,110],"p_dog_up_w0":[4,1093,743,87,110],"p_dog_up_w1":[4,1183,743,87,110],"p_dog_up_w2":[4,1273,743,87,110],"p_dog_up_w3":[4,1363,743,87,110],"p_dog_up_w4":[4,1453,743,87,110],"p_dog_up_w5":[4,1543,743,87,110],"p_dog_up_w6":[4,1633,743,87,110],"p_dog_up_w7":[4,1723,743,87,110],"bush_pink":[4,1813,743,128,109],"ore_au":[4,3,856,128,109],"tom2":[4,134,856,128,109],"bas0":[4,265,856,128,108],"ebp2":[4,396,856,128,108],"p_dog_pose5":[4,527,856,110,108],"x_ship0":[4,640,856,128,108],"_icons2":[4,771,856,128,107],"_resto":[4,902,856,128,107],"cab1":[4,1033,856,128,107],"i_oyster":[4,1164,856,128,107],"kb0":[4,1295,856,128,107],"lgr2":[4,1426,856,128,107],"i_bait_shrimp":[4,1557,856,128,106],"ore_ruby":[4,1688,856,128,106],"ore_ag":[4,1819,856,128,105],"ore_cu":[4,3,968,128,105],"tom0":[4,134,968,128,105],"i_d_tomyumtalay":[4,265,968,128,104],"crock":[4,396,968,128,103],"p_cat_pose4":[4,527,968,110,103],"car0":[4,640,968,128,102],"a_buffalo_e0":[4,771,968,150,101],"a_buffalo_e1":[4,924,968,150,101],"a_buffalo_e2":[4,1077,968,150,101],"a_buffalo_e3":[4,1230,968,150,101],"a_buffalo_w0":[4,1383,968,150,101],"a_buffalo_w1":[4,1536,968,150,101],"a_buffalo_w2":[4,1689,968,150,101],"a_buffalo_w3":[4,1842,968,150,101],"i_cheese":[4,3,1076,128,101],"i_gcheese":[4,134,1076,128,101],"x_cave":[4,265,1076,128,101],"a_cow_e0":[4,396,1076,150,100],"a_cow_e1":[4,549,1076,150,100],"a_cow_e2":[4,702,1076,150,100],"a_cow_e3":[4,855,1076,150,100],"a_cow_w0":[4,1008,1076,150,100],"a_cow_w1":[4,1161,1076,150,100],"a_cow_w2":[4,1314,1076,150,100],"a_cow_w3":[4,1467,1076,150,100],"bean0":[4,1620,1076,128,99],"m_dryer":[4,1751,1076,128,99],"bas2":[4,1882,1076,128,97],"cuc0":[4,3,1180,128,97],"i_d_crabcurry":[4,134,1180,128,97],"_icons":[4,265,1180,128,96],"_trees":[4,396,1180,128,96],"i_crab":[4,527,1180,128,96],"i_orchid":[4,658,1180,128,95],"m_bat":[4,789,1180,128,94],"x_rat":[4,920,1180,128,94],"x_fence":[4,1051,1180,128,93],"x_gate":[4,1182,1180,128,93],"lotus":[4,1313,1180,128,92],"i_lingzhi":[4,1444,1180,128,91],"wm0":[4,1575,1180,128,91],"pump0":[4,1706,1180,128,90],"f_guano":[4,1837,1180,128,89],"boulder":[4,3,1280,128,88],"lily":[4,134,1280,128,88],"x_boar":[4,265,1280,128,88],"car2":[4,396,1280,128,87],"i_lobster":[4,527,1280,128,87],"x_trough":[4,658,1280,128,87],"i_bait_lure":[4,789,1280,128,86],"_animals":[4,920,1280,128,85],"_ja":[4,1051,1280,128,85],"p_cat_pose6":[4,1182,1280,110,81],"stump":[4,1295,1280,128,81],"_act2":[4,1426,1280,128,80],"pump1":[4,1557,1280,128,79],"i_kapong":[4,1688,1280,128,78],"p_cat_pose2":[4,1819,1280,110,78],"weed":[4,3,1371,128,77],"x_fishpond":[4,134,1371,128,77],"p_cat_pose3":[4,265,1371,110,75],"pump2":[4,378,1371,128,74],"x_crow0":[4,509,1371,128,73],"_bg_beach":[4,640,1371,128,72],"_bg_falls":[4,771,1371,128,72],"_bg_house":[4,902,1371,128,72],"i_mahseer":[4,1033,1371,128,66],"i_plathu":[4,1164,1371,128,65],"p_dog_right_w0":[4,1295,1371,110,65],"p_dog_right_w1":[4,1408,1371,110,65],"p_dog_right_w2":[4,1521,1371,110,65],"p_dog_right_w3":[4,1634,1371,110,65],"p_dog_right_w4":[4,1747,1371,110,65],"p_dog_right_w5":[4,1860,1371,110,65],"p_dog_right_w6":[4,3,1451,110,65],"p_dog_right_w7":[4,116,1451,110,65],"_mint":[4,229,1451,128,64],"i_insee":[4,360,1451,128,63],"p_cat_right_w0":[4,491,1451,110,63],"p_cat_right_w1":[4,604,1451,110,63],"p_cat_right_w2":[4,717,1451,110,63],"p_cat_right_w3":[4,830,1451,110,63],"p_cat_right_w4":[4,943,1451,110,63],"p_cat_right_w5":[4,1056,1451,110,63],"p_cat_right_w6":[4,1169,1451,110,63],"p_cat_right_w7":[4,1282,1451,110,63],"p_dog_pose3":[4,1395,1451,110,61],"x_bunting":[4,1508,1451,128,59],"_props2":[4,1639,1451,128,43]};
if(typeof ATLAS!=='undefined'&&ATLAS&&ATLAS.length){const imgs=ATLAS.map(u=>{const im=new Image();try{im.decoding='async';}catch(e){}im.src=u;return im;});
  for(const k in AMAP){const [a,x,y,w,h]=AMAP[k];SPR[k]={a:imgs[a],ai:a,sx:x,sy:y,naturalWidth:w,naturalHeight:h,get complete(){return this.a.complete&&this.a.naturalWidth>0;}};}}
else for(const k in SPRSRC){try{const im=new Image();im.src=SPRSRC[k];SPR[k]=im;}catch(e){}}
const sprOk=k=>{const i=SPR[k];return!!(i&&i.complete&&i.naturalWidth);};
// CSS background for a sprite inside a bw x bh box. fit: 'contain' | {w:scale-to-width factor, fy:top offset fraction}
function sprBg(k,bw,bh,fit){const i=SPR[k];if(!i)return'';const w=i.naturalWidth||1,h=i.naturalHeight||1;
  let sc,ox,oy;if(fit&&fit.w){sc=bw/w*fit.w;ox=(bw-w*sc)/2;oy=-h*sc*(fit.fy||0);}else{sc=Math.min(bw/w,bh/h);ox=(bw-w*sc)/2;oy=bh-h*sc;}
  if(i.a){const [AW,AH]=ATLAS_WH[i.ai];return`background-image:url(${ATLAS[i.ai]});background-size:${(AW*sc).toFixed(1)}px ${(AH*sc).toFixed(1)}px;background-position:${(ox-i.sx*sc).toFixed(1)}px ${(oy-i.sy*sc).toFixed(1)}px;background-repeat:no-repeat`;}
  return`background-image:url(${i.src});background-size:${(w*sc).toFixed(1)}px ${(h*sc).toFixed(1)}px;background-position:${ox.toFixed(1)}px ${oy.toFixed(1)}px;background-repeat:no-repeat`;}
function sprAt(k,cx,by,w,flip,maxH,rot){if(!sprOk(k))return 0;const im=SPR[k];let W=w,H=w*im.naturalHeight/im.naturalWidth;
  if(maxH&&H>maxH){H=maxH;W=H*im.naturalWidth/im.naturalHeight;}
  ctx.save();ctx.translate(Math.round(cx*dpr)/dpr,Math.round(by*dpr)/dpr);if(rot)ctx.rotate(rot);if(flip)ctx.scale(-1,1);if(im.a)ctx.drawImage(im.a,im.sx,im.sy,im.naturalWidth,im.naturalHeight,-W/2,-H,W,H);else ctx.drawImage(im,-W/2,-H,W,H);ctx.restore();return H;}
function groundShadow(x,y,rx,ry){ctx.fillStyle='rgba(30,20,10,.22)';ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,7);ctx.fill();}
const drawB=(k,cx,bot,wT,hT)=>sprAt(k,wx(cx),wy(bot),wT*TS,false,hT*TS);
let treeQ=[],stakeQ=[];
const TEX={};for(const k in TEXSRC){try{const im=new Image();im.src=TEXSRC[k];TEX[k]=im;}catch(e){}}
function tex(name,x,y,sx,sy,s,K){const im=TEX[name];if(!im||!im.complete||!im.naturalWidth)return false;const u=256/K,ox=((x%K)+K)%K,oy=((y%K)+K)%K;
  ctx.drawImage(im,ox*u,oy*u,u,u,sx,sy,s,s);return true;}
const GRASSY='gmhbkrvcNTPodtfLuqRYM';
const forestTree=(x,y)=>map[y]&&map[y][x]==='t'&&(inForest(x,y)||[[0,-1],[0,1],[-1,0],[1,0]].filter(([a,b])=>map[y+b]&&map[y+b][x+a]==='F').length>=2);
function groundKind(x,y){const r=map[y];if(!r||r[x]===undefined)return null;const c=r[x];if(c==='F'||forestTree(x,y))return'F';if(c==='K'||c==='C')return'K';return GRASSY.includes(c)?'g':c;}
function fringe(x,y,sx,sy,s,dx,dy,si,paint){ctx.save();ctx.beginPath();const seg=7,dep=i=>s*(.08+.11*hash(x*13+i+si*7,y*17+si));
  if(dy===-1){ctx.moveTo(sx,sy);for(let i=0;i<=seg;i++)ctx.lineTo(sx+s*i/seg,sy+dep(i));ctx.lineTo(sx+s,sy);}
  else if(dy===1){ctx.moveTo(sx,sy+s);for(let i=0;i<=seg;i++)ctx.lineTo(sx+s*i/seg,sy+s-dep(i));ctx.lineTo(sx+s,sy+s);}
  else if(dx===-1){ctx.moveTo(sx,sy);for(let i=0;i<=seg;i++)ctx.lineTo(sx+dep(i),sy+s*i/seg);ctx.lineTo(sx,sy+s);}
  else{ctx.moveTo(sx+s,sy);for(let i=0;i<=seg;i++)ctx.lineTo(sx+s-dep(i),sy+s*i/seg);ctx.lineTo(sx+s,sy+s);}
  ctx.closePath();ctx.clip();paint();ctx.restore();}
function softEdges(c,x,y,sx,sy,s){
  const nb=(dx,dy)=>{const r=map[y+dy];return r?r[x+dx]:undefined;};
  {const me=groundKind(x,y);if(me==='F'||me==='K'){const gt='grass'+seasonIdx();
    [[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy],si)=>{const n=groundKind(x+dx,y+dy);
      if(n==='g')fringe(x,y,sx,sy,s,dx,dy,si,()=>{if(!tex(gt,x,y,sx,sy,s,3)){ctx.fillStyle='#7bb058';ctx.fillRect(sx,sy,s,s);}});
      else if(me==='K'&&n==='F')fringe(x,y,sx,sy,s,dx,dy,si,()=>{if(!tex('forest',x,y,sx,sy,s,3)){ctx.fillStyle='#4f7a3a';ctx.fillRect(sx,sy,s,s);}});});
    if(me==='K'){[[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy])=>{const n=groundKind(x+dx,y+dy);if(n==='K'||!n||n==='t')return;
      const g=dy===-1?ctx.createLinearGradient(0,sy,0,sy+s*.35):dy===1?ctx.createLinearGradient(0,sy+s,0,sy+s*.65):dx===-1?ctx.createLinearGradient(sx,0,sx+s*.35,0):ctx.createLinearGradient(sx+s,0,sx+s*.65,0);
      g.addColorStop(0,'rgba(40,30,20,.28)');g.addColorStop(1,'rgba(40,30,20,0)');ctx.fillStyle=g;ctx.fillRect(sx,sy,s,s);});}
    return;}}
  if('pSsyze'.includes(c)){const gt='grass'+seasonIdx();
    [[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy],si)=>{const n=nb(dx,dy);if(!n||!GRASSY.includes(n))return;
      ctx.save();ctx.beginPath();const seg=7,dep=i=>s*(.07+.09*hash(x*13+i+si*7,y*17+si));
      if(dy===-1){ctx.moveTo(sx,sy);for(let i=0;i<=seg;i++)ctx.lineTo(sx+s*i/seg,sy+dep(i));ctx.lineTo(sx+s,sy);}
      else if(dy===1){ctx.moveTo(sx,sy+s);for(let i=0;i<=seg;i++)ctx.lineTo(sx+s*i/seg,sy+s-dep(i));ctx.lineTo(sx+s,sy+s);}
      else if(dx===-1){ctx.moveTo(sx,sy);for(let i=0;i<=seg;i++)ctx.lineTo(sx+dep(i),sy+s*i/seg);ctx.lineTo(sx,sy+s);}
      else{ctx.moveTo(sx+s,sy);for(let i=0;i<=seg;i++)ctx.lineTo(sx+s-dep(i),sy+s*i/seg);ctx.lineTo(sx+s,sy+s);}
      ctx.closePath();ctx.clip();if(!tex(gt,x,y,sx,sy,s,3)){ctx.fillStyle='#7bb058';ctx.fill();}ctx.restore();});}
  if(c==='w'||c==='B'){[[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy])=>{const n=nb(dx,dy);if(!n||'wBj'.includes(n))return;
      const g=dy===-1?ctx.createLinearGradient(0,sy,0,sy+s*.28):dy===1?ctx.createLinearGradient(0,sy+s,0,sy+s*.72):dx===-1?ctx.createLinearGradient(sx,0,sx+s*.28,0):ctx.createLinearGradient(sx+s,0,sx+s*.72,0);
      g.addColorStop(0,'rgba(120,90,50,.55)');g.addColorStop(.35,'rgba(230,250,255,.55)');g.addColorStop(1,'rgba(230,250,255,0)');ctx.fillStyle=g;
      if(dy===-1)ctx.fillRect(sx,sy,s,s*.28);else if(dy===1)ctx.fillRect(sx,sy+s*.72,s,s*.28);else if(dx===-1)ctx.fillRect(sx,sy,s*.28,s);else ctx.fillRect(sx+s*.72,sy,s*.28,s);});}
}
function drawBridge(ok,x,sx,sy,s){
  const L=map[0]&&x>0&&!'Bj'.includes(map[22]?map[22][x-1]:''),Rt=!'Bj'.includes(map[22]?map[22][x+1]:''),top=sy+s*.1,bot=sy+s*.9,n=5,w=s/n;
  const slat=(i,dy=0,rot=0)=>{const x0=sx+i*w;ctx.save();ctx.translate(x0+w/2,(top+bot)/2+dy);ctx.rotate(rot);
    const g=ctx.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'#c99a62');g.addColorStop(.6,'#a8763f');g.addColorStop(1,'#7a5128');ctx.fillStyle=g;
    const hh=(bot-top)*(rot?0.8:1);ctx.beginPath();ctx.roundRect(-w/2+s*.008,-hh/2,w-s*.016,hh,s*.03);ctx.fill();
    ctx.strokeStyle='rgba(70,40,15,.55)';ctx.lineWidth=Math.max(1,s*.015);ctx.stroke();
    ctx.fillStyle='rgba(60,40,25,.7)';ctx.beginPath();ctx.arc(0,-hh/2+s*.08,s*.014,0,7);ctx.arc(0,hh/2-s*.08,s*.014,0,7);ctx.fill();ctx.restore();};
  ctx.fillStyle='rgba(10,40,60,.28)';
  if(ok){ctx.fillRect(sx,bot,s,s*.08);for(let i=0;i<n;i++)slat(i);}
  else{const keep=L?[0,1,2]:Rt?[3,4]:[];if(keep.length)ctx.fillRect(sx+keep[0]*w,bot,keep.length*w,s*.06);keep.forEach(i=>slat(i));
    if(Rt){slat(1,s*.12,.5);}}
  const beam=(yy)=>{const g=ctx.createLinearGradient(0,yy-s*.04,0,yy+s*.04);g.addColorStop(0,'#8a5a2b');g.addColorStop(1,'#5a3a1c');ctx.fillStyle=g;ctx.fillRect(sx,yy-s*.035,s,s*.07);};
  if(ok){beam(top);beam(bot);}
  else{ctx.save();ctx.beginPath();if(L){ctx.moveTo(sx,sy);ctx.lineTo(sx+s*.55,sy);ctx.lineTo(sx+s*.48,sy+s*.5);ctx.lineTo(sx+s*.6,sy+s);ctx.lineTo(sx,sy+s);}
    else{ctx.moveTo(sx+s,sy);ctx.lineTo(sx+s*.62,sy);ctx.lineTo(sx+s*.7,sy+s*.5);ctx.lineTo(sx+s*.58,sy+s);ctx.lineTo(sx+s,sy+s);}ctx.closePath();ctx.clip();beam(top);beam(bot);ctx.restore();ctx.strokeStyle='#caa46a';ctx.lineWidth=Math.max(1,s*.025);ctx.beginPath();for(const yy of [top,bot]){ctx.moveTo(sx,yy);ctx.quadraticCurveTo(sx+s*.5,yy+s*.22,sx+s,yy+(L?s*.1:0));}ctx.stroke();}
  const post=(px,yy)=>{ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(px,yy+s*.05,s*.07,s*.03,0,0,7);ctx.fill();
    const g=ctx.createLinearGradient(px-s*.05,0,px+s*.05,0);g.addColorStop(0,'#9a6b3d');g.addColorStop(1,'#5a3a1c');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(px-s*.05,yy-s*.18,s*.1,s*.24,s*.03);ctx.fill();
    ctx.fillStyle='#b8834d';ctx.beginPath();ctx.ellipse(px,yy-s*.18,s*.05,s*.022,0,0,7);ctx.fill();};
  if(L){post(sx+s*.06,top);post(sx+s*.06,bot);}if(Rt){post(sx+s*.94,top);post(sx+s*.94,bot);}
}
function drawTile(x,y,sx,sy,s){drawTile0(x,y,sx,sy,s);softEdges(map[y][x],x,y,sx,sy,s);}
function drawTile0(x,y,sx,sy,s){
  const c=map[y][x],h=hash(x,y);
  const grass=()=>{if(tex('grass'+seasonIdx(),x,y,sx,sy,s,3))return;const win=seasonIdx()===2,sum=seasonIdx()===0;
    ctx.fillStyle=(x+y)%2?(win?'#8db564':sum?'#86b458':'#72ad55'):(win?'#88b060':sum?'#82b055':'#6ea951');ctx.fillRect(sx,sy,s,s);
    ctx.fillStyle=win?'#79a052':'#619546';for(let i=0;i<3;i++){const a=hash(x+i*7,y+i*13);ctx.fillRect(sx+a*s*.8,sy+hash(y+i,x-i)*s*.8,s*.08,s*.16);}
    if(h>.86){ctx.fillStyle=h>.93?'#f6e27a':(win?'#f3a3c0':'#f4f0e6');ctx.beginPath();ctx.arc(sx+s*.7,sy+s*.3,s*.06,0,7);ctx.fill();}};
  switch(c){
    case 'g':case 'h':case 'b':case 'k':case 'r':case 'v':case 'c':case 'N':case 'T':case 'P':case 'o':case 'd':case 'R':case 'Y':case 'M':case 'Q':grass();break;
    case 'F':if(tex('forest',x,y,sx,sy,s,3))break;ctx.fillStyle=(x+y)%2?'#4f7a3a':'#4b7536';ctx.fillRect(sx,sy,s,s);ctx.fillStyle='#6b5a3a';for(let i=0;i<3;i++)ctx.fillRect(sx+hash(x+i,y*5)*s*.8,sy+hash(y+i,x*3)*s*.8,s*.1,s*.05);
      ctx.fillStyle='#5f8f45';ctx.beginPath();ctx.arc(sx+s*.2,sy+s*.8,s*.12,0,7);ctx.fill();break;
    case 'K':case 'C':if(tex('cave',x,y,sx,sy,s,2)){ctx.fillStyle='rgba(120,110,100,.35)';ctx.fillRect(sx,sy,s,s);if(c==='C'&&sprOk('x_cave'))treeQ.push([x,y,'cave']);break;}ctx.fillStyle='#7d7068';ctx.fillRect(sx,sy,s,s);ctx.fillStyle='#8f837a';ctx.fillRect(sx+s*.1,sy+s*.15,s*.5,s*.25);ctx.fillStyle='#6a5e56';ctx.fillRect(sx+s*.4,sy+s*.6,s*.5,s*.25);
      if(c==='C'){ctx.fillStyle='#1a120c';ctx.beginPath();ctx.moveTo(sx+s*.1,sy+s);ctx.lineTo(sx+s*.1,sy+s*.45);ctx.quadraticCurveTo(sx+s*.5,sy+s*.05,sx+s*.9,sy+s*.45);ctx.lineTo(sx+s*.9,sy+s);ctx.fill();
        ctx.fillStyle='#8a5a2b';ctx.fillRect(sx+s*.05,sy+s*.4,s*.1,s*.6);ctx.fillRect(sx+s*.85,sy+s*.4,s*.1,s*.6);ctx.fillRect(sx+s*.05,sy+s*.35,s*.9,s*.1);
        ctx.fillStyle=`rgba(255,190,90,${.5+Math.sin(clock*6)*.2})`;ctx.beginPath();ctx.arc(sx+s*.1,sy+s*.3,s*.07,0,7);ctx.fill();}break;
    case 'u':grass();if(sprAt('x_duckhouse',sx+s*.5,sy+s*.98,s*1.0,false,s*1.1))break;ctx.fillStyle='#a7784a';ctx.fillRect(sx+s*.1,sy+s*.4,s*.8,s*.5);ctx.fillStyle='#5b4a3a';ctx.beginPath();ctx.moveTo(sx,sy+s*.45);ctx.lineTo(sx+s*.5,sy+s*.05);ctx.lineTo(sx+s,sy+s*.45);ctx.fill();
      ctx.fillStyle='#2b1d12';ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.9,s*.16,Math.PI,0);ctx.fill();break;
    case 'S':if(!tex('stone',x,y,sx,sy,s,2)){ctx.fillStyle='#d9cfbb';ctx.fillRect(sx,sy,s,s);}break;
    case 'm':grass();if(h>.6){ctx.fillStyle=h>.8?'#f3a3c0':'#fff3b0';ctx.beginPath();ctx.arc(sx+s*.3,sy+s*.6,s*.05,0,7);ctx.arc(sx+s*.75,sy+s*.25,s*.04,0,7);ctx.fill();}break;
    case 'y':if(!tex('soil',x,y,sx,sy,s,3)){ctx.fillStyle='#c9a877';ctx.fillRect(sx,sy,s,s);}
      if(!S.built.gh&&!(S.build&&S.build.id==='gh')){const k=.16,L=sx+s*k,R=sx+s*(1-k),Tp=sy+s*k,Bt=sy+s*(1-k),x0=x===19?L:sx,x1=x===23?R:sx+s,y0=y===18?Tp:sy,y1=y===21?Bt:sy+s;
        ctx.strokeStyle='#e9dcc0';ctx.lineWidth=Math.max(1,s*.03);ctx.beginPath();
        if(y===18){ctx.moveTo(x0,Tp);ctx.quadraticCurveTo((x0+x1)/2,Tp+s*.05,x1,Tp);}
        if(y===21){ctx.moveTo(x0,Bt);ctx.quadraticCurveTo((x0+x1)/2,Bt+s*.05,x1,Bt);}
        if(x===19){ctx.moveTo(L,y0);ctx.lineTo(L,y1);}
        if(x===23){ctx.moveTo(R,y0);ctx.lineTo(R,y1);}ctx.stroke();
        if((x===19||x===23)&&(y===18||y===21))stakeQ.push([x===19?L:R,y===18?Tp:Bt,s]);}
      if(S.build&&S.build.id==='gh'){ctx.strokeStyle='#a8763d';ctx.lineWidth=Math.max(2,s*.06);ctx.beginPath();ctx.moveTo(sx,sy+s*.5);ctx.lineTo(sx+s,sy+s*.5);ctx.moveTo(sx+s*.5,sy);ctx.lineTo(sx+s*.5,sy+s);ctx.stroke();}break;
    case 'L':grass();if(sprOk('x_fencev')){sprAt('x_fencev',sx+s*.5,sy+s*1.02,s*.5,false,s*1.18);
        const w=s*.66,hh=s*.34,x0=sx+s*.5-w/2,y0=sy+s*.36,r=s*.07;
        ctx.strokeStyle='#5a3a1c';ctx.lineWidth=Math.max(1,s*.025);ctx.beginPath();ctx.moveTo(sx+s*.5-w*.3,y0);ctx.lineTo(sx+s*.5,sy+s*.22);ctx.lineTo(sx+s*.5+w*.3,y0);ctx.stroke();
        ctx.fillStyle='rgba(0,0,0,.18)';ctx.beginPath();ctx.roundRect(x0+s*.02,y0+s*.03,w,hh,r);ctx.fill();
        const g=ctx.createLinearGradient(0,y0,0,y0+hh);g.addColorStop(0,'#e0b173');g.addColorStop(1,'#b9824a');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(x0,y0,w,hh,r);ctx.fill();
        ctx.strokeStyle='#7a4f27';ctx.lineWidth=Math.max(1,s*.03);ctx.stroke();
        ctx.fillStyle='#5a3a1c';ctx.font=`700 ${Math.round(s*.17)}px system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('ขาย',sx+s*.5,y0+hh*.54);ctx.textAlign='start';ctx.textBaseline='alphabetic';break;}
      ctx.fillStyle='#9a6b3d';ctx.fillRect(sx+s*.1,sy+s*.1,s*.14,s*.8);ctx.fillRect(sx+s*.76,sy+s*.1,s*.14,s*.8);
      ctx.fillStyle='#b8834d';for(let i=0;i<3;i++)ctx.fillRect(sx+s*.1,sy+s*(.2+i*.25),s*.8,s*.1);
      ctx.fillStyle='#c9ccd1';ctx.fillRect(sx+s*.4,sy+s*.42,s*.2,s*.16);ctx.strokeStyle='#c9ccd1';ctx.lineWidth=2;ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.42,s*.07,Math.PI,0);ctx.stroke();break;
    case 'B':case 'j':if(!tex('water',x,y,sx,sy,s,2)){ctx.fillStyle='#3d8ec2';ctx.fillRect(sx,sy,s,s);}drawBridge(c==='j',x,sx,sy,s);break;
    case 'z':case 'e':if(tex('stone',x,y,sx,sy,s,2))break;ctx.fillStyle='#d9cfbb';ctx.fillRect(sx,sy,s,s);ctx.strokeStyle='#c4b89f';ctx.lineWidth=1;
      ctx.strokeRect(sx+.5,sy+.5,s/2,s/2);ctx.strokeRect(sx+s/2+.5,sy+s/2+.5,s/2-1,s/2-1);break;
    case 'q':grass();if(sprOk('x_trough')){ctx.globalAlpha=S.trough?1:.6;groundShadow(sx+s*.5,sy+s*.85,s*.45,s*.08);sprAt('x_trough',sx+s*.5,sy+s*.95,s*1.0,false,s*.8);ctx.globalAlpha=1;break;}
      ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(sx+s*.08,sy+s*.8,s*.86,s*.1);
      ctx.fillStyle='#8a5a2b';ctx.fillRect(sx+s*.06,sy+s*.4,s*.88,s*.42);ctx.fillStyle='#6b4423';ctx.fillRect(sx+s*.12,sy+s*.46,s*.76,s*.14);
      if(S.trough){ctx.fillStyle='#e6c75c';for(let i=0;i<6;i++)ctx.fillRect(sx+s*(.14+i*.12),sy+s*(.3+(i%2)*.06),s*.1,s*.2);}
      break;
    case 's':{
      const p=S.plots[key(x,y)];
      if(p){if(!tex(p.w?'wet':'tilled',0,0,sx,sy,s,1)){ctx.fillStyle=p.w?'#5a3a20':'#7d5330';ctx.fillRect(sx,sy,s,s);
        ctx.fillStyle=p.w?'#4a2e17':'#6a4426';for(let i=1;i<4;i++)ctx.fillRect(sx+s*.08,sy+s*i/4-s*.03,s*.84,s*.06);}
        ctx.strokeStyle='rgba(60,35,15,.25)';ctx.lineWidth=1;ctx.strokeRect(sx+.5,sy+.5,s-1,s-1);
        if(p.c)drawCrop(p,sx,sy,s);}
      else if(!tex('soil',x,y,sx,sy,s,3)){ctx.fillStyle=inExp(x,y)?'#a88657':'#b38d5c';ctx.fillRect(sx,sy,s,s);ctx.fillStyle='#a07b4c';
        for(let i=0;i<4;i++)ctx.fillRect(sx+hash(x*3+i,y)*s*.9,sy+hash(y*5+i,x)*s*.9,s*.07,s*.07);}
      break;}
    case 'p':if(tex('path',x,y,sx,sy,s,3))break;ctx.fillStyle='#dcc596';ctx.fillRect(sx,sy,s,s);ctx.fillStyle='#c9ae7c';
      for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(sx+hash(x+i,y*2)*s,sy+hash(y+i*3,x)*s,s*.05,0,7);ctx.fill();}break;
    case 'w':if(!tex('water',x,y,sx,sy,s,2)){ctx.fillStyle='#3d8ec2';ctx.fillRect(sx,sy,s,s);}
      if(h>.78&&sprOk('lily')){sprAt(h>.9?'lotus':'lily',sx+s*.5+Math.sin(clock+x)*s*.03,sy+s*.8,s*(h>.9?.72:.5),h>.84);break;}ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=Math.max(1,s*.04);
      for(let i=0;i<2;i++){const yy=sy+s*(.3+i*.4)+Math.sin(clock*2+x+i)*s*.05;ctx.beginPath();ctx.moveTo(sx+s*.15+i*s*.2,yy);ctx.quadraticCurveTo(sx+s*.35+i*s*.2,yy-s*.08,sx+s*.55+i*s*.2,yy);ctx.stroke();}
      if(h>.7&&!(TEX.water&&TEX.water.naturalWidth)){ctx.fillStyle='#4f9a3a';ctx.beginPath();ctx.ellipse(sx+s*.7,sy+s*.7,s*.13,s*.08,0,0,7);ctx.fill();
        if(seasonIdx()===2){ctx.fillStyle='#f3a3c0';ctx.beginPath();ctx.arc(sx+s*.72,sy+s*.66,s*.05,0,7);ctx.fill();}}break;
    case 't':if(forestTree(x,y)){if(!tex('forest',x,y,sx,sy,s,3)){ctx.fillStyle='#4f7a3a';ctx.fillRect(sx,sy,s,s);}}else grass();if(sprOk('tree0')){treeQ.push([x,y]);break;}ctx.fillStyle='rgba(0,0,0,.18)';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.85,s*.4,s*.12,0,0,7);ctx.fill();
      ctx.fillStyle='#5a3a1c';ctx.fillRect(sx+s*.42,sy+s*.5,s*.16,s*.38);
      {const si=seasonIdx(),c1=si===2?'#6f8a34':si===0?'#3f7a2a':'#2f7a2e',c2=si===2?'#c98a3a':si===0?'#5a9a38':'#43973c';
      ctx.fillStyle=c1;ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.36,s*.42,0,7);ctx.fill();
      ctx.fillStyle=c2;ctx.beginPath();ctx.arc(sx+s*.4,sy+s*.28,s*.24,0,7);ctx.fill();
      if(si===0&&h>.5){ctx.fillStyle='#f2c230';for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(sx+s*(.25+hash(x+i,y)*.5),sy+s*(.15+hash(y+i,x)*.35),s*.05,0,7);ctx.fill();}}}break;
    case 'f':grass();if(sprOk('x_fencev')){const F=(dx,dy)=>{const r=map[y+dy];return r&&r[x+dx]==='f';},hz=F(-1,0)||F(1,0),vt=F(0,-1)||F(0,1);
        if(hz&&vt)sprAt('x_post',sx+s*.5,sy+s*.9,s*.3,false,s*.85);
        else if(vt)sprAt('x_fencev',sx+s*.5,sy+s*1.02,s*.5,false,s*1.18);
        else sprAt('x_fence',sx+s*.5,sy+s*.85,s*1.08,false,s*.8);break;}
      ctx.fillStyle='#b8834d';ctx.fillRect(sx,sy+s*.35,s,s*.1);ctx.fillRect(sx,sy+s*.6,s,s*.1);break;
  }
}
function drawDebris(t,sx,sy,s,x,y){
  const DK={rock:['boulder',.92],stump:['stump',.86],weed:['weed',.95]}[t];
  if(DK&&sprOk(DK[0])){if(t!=='weed')groundShadow(sx+s*.5,sy+s*.88,s*.36,s*.1);sprAt(DK[0],sx+s*.5,sy+s*.95,s*DK[1],hash(x,y)>.5,s*1.05);return;}
  if(t==='weed'){ctx.fillStyle='#4e8a33';for(let i=0;i<5;i++){const a=hash(x+i,y*3);ctx.beginPath();ctx.moveTo(sx+s*(.15+i*.17),sy+s*.85);ctx.lineTo(sx+s*(.1+i*.17+a*.1),sy+s*(.3+a*.2));ctx.lineTo(sx+s*(.25+i*.17),sy+s*.85);ctx.fill();}}
  else if(t==='rock'){ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.8,s*.38,s*.1,0,0,7);ctx.fill();
    ctx.fillStyle='#8f9296';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.55,s*.36,s*.28,0,0,7);ctx.fill();ctx.fillStyle='#a9acb0';ctx.beginPath();ctx.ellipse(sx+s*.42,sy+s*.46,s*.18,s*.12,-.3,0,7);ctx.fill();}
  else if(t==='stump'){ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.82,s*.34,s*.1,0,0,7);ctx.fill();
    ctx.fillStyle='#6b4423';ctx.fillRect(sx+s*.2,sy+s*.4,s*.6,s*.42);ctx.fillStyle='#c79a62';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.4,s*.3,s*.13,0,0,7);ctx.fill();
    ctx.strokeStyle='#9b6a3a';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.4,s*.16,s*.07,0,0,7);ctx.stroke();}
}
function drawForage0(f,sx,sy,s){
  const bob=Math.sin(clock*3+f.x)*s*.02;
  ctx.fillStyle='rgba(255,246,190,.35)';ctx.beginPath();ctx.arc(sx+s*.5,sy+s*.55,s*.3,0,7);ctx.fill();
  if(f.k==='phakwan'){ctx.fillStyle='#5cb33f';for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(sx+s*(.3+i*.13),sy+s*(.55+(i%2)*.1)+bob,s*.07,s*.14,i*.5,0,7);ctx.fill();}return;}
  if(f.k==='makham'){ctx.fillStyle='#8a5a2b';for(let i=0;i<3;i++){ctx.save();ctx.translate(sx+s*(.35+i*.15),sy+s*.6+bob);ctx.rotate(-.4+i*.3);ctx.beginPath();ctx.ellipse(0,0,s*.05,s*.18,0,0,7);ctx.fill();ctx.restore();}return;}
  if(f.k==='bamboo'){ctx.fillStyle='#c9b458';ctx.beginPath();ctx.moveTo(sx+s*.35,sy+s*.8);ctx.lineTo(sx+s*.5,sy+s*.25+bob);ctx.lineTo(sx+s*.65,sy+s*.8);ctx.fill();ctx.strokeStyle='#8a7a2a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(sx+s*.4,sy+s*.6);ctx.lineTo(sx+s*.6,sy+s*.6);ctx.stroke();}
  else{ctx.fillStyle='#f4ead6';ctx.fillRect(sx+s*.45,sy+s*.5,s*.1,s*.3);ctx.fillStyle='#8a5a3a';ctx.beginPath();ctx.ellipse(sx+s*.5,sy+s*.5+bob,s*.22,s*.12,0,Math.PI,0);ctx.fill();}
}
function drawCrop(p,sx,sy,s){
  const cr=CROPS[p.c],r=Math.min(1,p.age/cr.d),ripe=p.age>=cr.d,cx=sx+s/2,cy=sy+s*.62;
  if(!p.dead&&sprOk(p.c+'0')){const st=ripe?2:r>=.5?1:0,sc=[r===0?.45:.6,.82,1][st],sw=Math.sin(clock*1.6+sx*.05)*.03;
    const bt=p.bnc!==undefined?clock-p.bnc:9,bq=bt<.6?Math.sin(bt*22)*Math.exp(-bt*6)*.18:0;
    // sit small plants in the middle of the plot; tall ones grow up from the lower part of the tile
    const im=SPR[p.c+st],mh=s*(st===2?1.35:1.15)*sc,ph=Math.min(s*sc*im.naturalHeight/im.naturalWidth,mh),by=Math.min(sy+s*.9,sy+s*.56+ph*.5);
    if(bq){ctx.save();ctx.translate(cx,by);ctx.scale(1-bq*.6,1+bq);sprAt(p.c+st,0,0,s*sc,false,mh,sw);ctx.restore();}
    else sprAt(p.c+st,cx,by,s*sc,false,mh,sw);
    if(ripe){ctx.fillStyle='rgba(255,246,190,'+(0.45+Math.sin(clock*4)*.3)+')';ctx.beginPath();ctx.arc(sx+s*.85,sy+s*.15,s*.06,0,7);ctx.fill();}
    return;}
  if(p.dead){ctx.strokeStyle='#6e5536';ctx.lineWidth=Math.max(1.5,s*.05);ctx.beginPath();for(let i=-1;i<=1;i++){ctx.moveTo(cx+i*s*.12,cy+s*.05);ctx.lineTo(cx+i*s*.2,cy-s*.2);}ctx.stroke();return;}
  const sway=Math.sin(clock*2+sx)*s*.02;
  if(r===0){ctx.fillStyle='#e6d49a';for(let i=0;i<3;i++)ctx.fillRect(cx-s*.15+i*s*.12,cy,s*.06,s*.06);return;}
  ctx.fillStyle=ripe?'#3f9a2c':'#5cb33f';
  const sz=s*(.14+.22*r);
  switch(p.c){
  case 'kb':for(let i=-1;i<=1;i++){ctx.beginPath();ctx.ellipse(cx+i*sz*.7+sway,cy-sz*.6,sz*.28,sz*.8,i*.4,0,7);ctx.fill();}break;
  case 'ch':ctx.beginPath();ctx.arc(cx+sway,cy-sz*.6,sz*.9,0,7);ctx.fill();ctx.fillStyle='#347f24';ctx.fillRect(cx-s*.03,cy-sz*.2,s*.06,sz*.5);
    if(ripe){ctx.fillStyle=cr.col;[[-.5,-.8],[.4,-1],[.1,-.3],[-.2,-1.3],[.6,-.4]].forEach(([a,b])=>{ctx.beginPath();ctx.ellipse(cx+a*sz,cy+b*sz,s*.04,s*.09,.3,0,7);ctx.fill();});}break;
  case 'wm':ctx.beginPath();ctx.ellipse(cx-sz*.5+sway,cy-sz*.3,sz*.55,sz*.35,-.4,0,7);ctx.ellipse(cx+sz*.5+sway,cy-sz*.4,sz*.55,sz*.35,.4,0,7);ctx.fill();
    if(ripe){ctx.fillStyle='#2e6e2a';ctx.beginPath();ctx.ellipse(cx,cy-s*.05,s*.3,s*.2,0,0,7);ctx.fill();ctx.strokeStyle='#8ccf6a';ctx.lineWidth=s*.035;
      for(let i=-1;i<=1;i++){ctx.beginPath();ctx.ellipse(cx+i*s*.1,cy-s*.05,s*.04,s*.18,0,0,7);ctx.stroke();}}break;
  case 'corn':{const hgt=s*(.25+.55*r);ctx.fillStyle='#4f9a36';ctx.fillRect(cx-s*.03+sway,cy-hgt,s*.06,hgt);
    for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(cx+(i%2?1:-1)*s*.12+sway,cy-hgt*(.3+i*.22),s*.14,s*.04,(i%2?-.5:.5),0,7);ctx.fill();}
    if(ripe){ctx.fillStyle=cr.col;ctx.beginPath();ctx.ellipse(cx+s*.1,cy-hgt*.55,s*.06,s*.13,.3,0,7);ctx.fill();ctx.fillStyle='#8a6a2a';ctx.fillRect(cx-s*.02,cy-hgt-s*.06,s*.04,s*.08);}break;}
  case 'rice':ctx.strokeStyle=ripe?'#c9a73a':'#5cb33f';ctx.lineWidth=Math.max(1.5,s*.035);ctx.beginPath();
    for(let i=-3;i<=3;i++){const tip=cy-sz*(1.4-Math.abs(i)*.12);ctx.moveTo(cx+i*s*.03,cy);ctx.quadraticCurveTo(cx+i*s*.05,tip+sz*.3,cx+i*s*.09+sway+(ripe?s*.06:0),tip);}ctx.stroke();
    if(ripe){ctx.fillStyle=cr.col;for(let i=-2;i<=2;i+=2){ctx.beginPath();ctx.ellipse(cx+i*s*.09+s*.07+sway,cy-sz*1.15,s*.035,s*.08,.6,0,7);ctx.fill();}}break;
  case 'cab':ctx.fillStyle='#6fb44c';ctx.beginPath();ctx.arc(cx,cy-sz*.3,sz*.9,0,7);ctx.fill();
    ctx.fillStyle=ripe?cr.col:'#8fcb65';ctx.beginPath();ctx.arc(cx,cy-sz*.35,sz*(ripe?.65:.45),0,7);ctx.fill();
    if(ripe){ctx.strokeStyle='#8fbf6a';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy-sz*.35,sz*.4,.5,2.6);ctx.stroke();}break;
  case 'straw':for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(cx+(i-1)*sz*.55+sway,cy-sz*(.5+(i%2)*.3),sz*.38,0,7);ctx.fill();}
    if(ripe){for(const [a,b] of [[-.5,-.1],[.35,-.05],[0,.1]]){ctx.fillStyle=cr.col;ctx.beginPath();ctx.moveTo(cx+a*s-s*.07,cy+b*s-s*.04);ctx.lineTo(cx+a*s+s*.07,cy+b*s-s*.04);ctx.lineTo(cx+a*s,cy+b*s+s*.1);ctx.fill();
      ctx.fillStyle='#fce3a0';ctx.fillRect(cx+a*s-s*.02,cy+b*s,s*.015,s*.015);}}
    else if(r>.5){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,cy-sz*.2,s*.04,0,7);ctx.fill();}break;
  default:ctx.beginPath();ctx.arc(cx+sway,cy-sz*.6,sz*.85,0,7);ctx.fill();if(ripe){ctx.fillStyle=cr.col;ctx.strokeStyle='#46290f';ctx.lineWidth=1;[[-.4,-.7],[.35,-.9],[0,-.3]].forEach(([a,b])=>{ctx.beginPath();ctx.arc(cx+a*sz,cy+b*sz,s*.08,0,7);ctx.fill();ctx.stroke();});}break;
  }
  if(ripe){ctx.fillStyle='rgba(255,246,190,'+(0.35+Math.sin(clock*4)*.25)+')';ctx.beginPath();ctx.arc(sx+s*.85,sy+s*.18,s*.06,0,7);ctx.fill();}
}
let camSX=null,camSY=null,frameDt=1/60,camScene='';
// camera eases toward the player and is snapped to whole device pixels, so the ground never shimmers between frames
function followCam(tx,ty,ww,wh){
  const cx=ww<=vw?(ww-vw)/2:Math.max(0,Math.min(ww-vw,tx-vw/2)),cy=wh<=vh?(wh-vh)/2:Math.max(0,Math.min(wh-vh,ty-vh/2));
  if(camSX===null||camScene!==scene||Math.abs(cx-camSX)>TS*4||Math.abs(cy-camSY)>TS*4){camSX=cx;camSY=cy;camScene=scene;}
  else{const k=1-Math.exp(-frameDt*14);camSX+=(cx-camSX)*k;camSY+=(cy-camSY)*k;}
  camX=Math.round(camSX*dpr)/dpr;camY=Math.round(camSY*dpr)/dpr;
}
function wx(x){return x*TS-camX;} function wy(y){return y*TS-camY;}
function window2(x,y,s,lit){ctx.fillStyle='#6b4423';ctx.fillRect(x,y,.7*s,.6*s);ctx.fillStyle=lit?'#ffd97a':'#9fd0e8';ctx.fillRect(x+.07*s,y+.07*s,.56*s,.46*s);ctx.fillStyle='#6b4423';ctx.fillRect(x+.32*s,y+.07*s,.06*s,.46*s);}
function drawCottage(tx,ty,wall,roof,roofDk){
  const s=TS,x=wx(tx),y=wy(ty);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.2*s,y+2.85*s,2.7*s,.2*s);
  ctx.fillStyle=wall;ctx.fillRect(x+.15*s,y+1.1*s,2.7*s,1.9*s);
  ctx.fillStyle=roof;ctx.beginPath();ctx.moveTo(x-.1*s,y+1.3*s);ctx.lineTo(x+1.5*s,y-.25*s);ctx.lineTo(x+3.1*s,y+1.3*s);ctx.closePath();ctx.fill();
  ctx.fillStyle=roofDk;ctx.fillRect(x-.1*s,y+1.2*s,3.2*s,.12*s);
  ctx.fillStyle='#6b4423';ctx.fillRect(x+1.18*s,y+1.9*s,.64*s,1.1*s);
  window2(x+.35*s,y+1.55*s,s,S.t>1080);
}
function drawBunting0(x0,x1,y,cols){
  const s=TS;ctx.strokeStyle='#6b4423';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(wx(x0),wy(y));ctx.quadraticCurveTo(wx((x0+x1)/2),wy(y)+s*.6,wx(x1),wy(y));ctx.stroke();
  const n=Math.round((x1-x0)*2.2);
  for(let i=1;i<n;i++){const t=i/n,X=wx(x0+(x1-x0)*t),Y=wy(y)+Math.sin(Math.PI*t)*s*.3;
    ctx.fillStyle=cols[i%cols.length];ctx.beginPath();ctx.moveTo(X-s*.1,Y);ctx.lineTo(X+s*.1,Y);ctx.lineTo(X,Y+s*.22+Math.sin(clock*3+i)*s*.02);ctx.fill();}
}
function drawGreenhouse(){
  const s=TS,x=wx(19),y=wy(18),w=5*s,h=4*s;
  ctx.fillStyle='rgba(200,235,255,.14)';ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1;ctx.beginPath();for(let i=1;i<5;i++){ctx.moveTo(x+i*s,y);ctx.lineTo(x+i*s,y+h);}for(let i=1;i<4;i++){ctx.moveTo(x,y+i*s);ctx.lineTo(x+w,y+i*s);}ctx.stroke();
  ctx.strokeStyle='#dfe7ea';ctx.lineWidth=Math.max(3,s*.09);ctx.strokeRect(x+2,y+2,w-4,h-4);
  ctx.fillStyle='#dfe7ea';[[0,0],[w,0],[0,h],[w,h]].forEach(([a,b])=>{ctx.fillRect(x+a-s*.08,y+b-s*.08,s*.16,s*.16);});
  ctx.fillStyle='#46290f';ctx.font=`700 ${Math.round(s*.22)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillStyle='#f7ecd2';ctx.strokeStyle='#46290f';ctx.lineWidth=3;ctx.strokeText('โรงเรือน',x+w/2,y-s*.08);ctx.fillText('โรงเรือน',x+w/2,y-s*.08);
}
function drawTemple(){
  if(drawB(S.proj.temple.done?'b_temple1':'b_temple0',12,4.05,4.8,3.9))return;
  const s=TS,x=wx(10),y=wy(1),done=S.proj.temple.done;
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+2.85*s,3.8*s,.2*s);
  if(done){
    ctx.fillStyle='#f4efe6';ctx.fillRect(x+.2*s,y+2.3*s,3.6*s,.65*s);ctx.fillStyle='#e8e0d0';ctx.fillRect(x+.4*s,y+1.1*s,3.2*s,1.3*s);
    ctx.fillStyle='#c9a24a';for(let i=0;i<5;i++)ctx.fillRect(x+(.5+i*.72)*s,y+1.2*s,.12*s,1.1*s);
    ctx.fillStyle='#b5412f';ctx.beginPath();ctx.moveTo(x-.1*s,y+1.25*s);ctx.lineTo(x+.6*s,y+.45*s);ctx.lineTo(x+3.4*s,y+.45*s);ctx.lineTo(x+4.1*s,y+1.25*s);ctx.closePath();ctx.fill();
    ctx.fillStyle='#2f6a3d';ctx.beginPath();ctx.moveTo(x+.5*s,y+.55*s);ctx.lineTo(x+1.1*s,y-.25*s);ctx.lineTo(x+2.9*s,y-.25*s);ctx.lineTo(x+3.5*s,y+.55*s);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#e6b43c';ctx.lineWidth=Math.max(2,s*.06);ctx.beginPath();ctx.moveTo(x-.1*s,y+1.25*s);ctx.lineTo(x+4.1*s,y+1.25*s);ctx.moveTo(x+.5*s,y+.55*s);ctx.lineTo(x+3.5*s,y+.55*s);
    ctx.moveTo(x+1.1*s,y-.25*s);ctx.quadraticCurveTo(x+.95*s,y-.6*s,x+.75*s,y-.5*s);ctx.moveTo(x+2.9*s,y-.25*s);ctx.quadraticCurveTo(x+3.05*s,y-.6*s,x+3.25*s,y-.5*s);ctx.stroke();
    ctx.fillStyle='#6b4423';ctx.fillRect(x+1.7*s,y+1.6*s,.6*s,.75*s);
  }else{
    ctx.fillStyle='#b9b2a4';ctx.fillRect(x+.2*s,y+2.3*s,3.6*s,.6*s);
    ctx.fillStyle='#a39c8e';ctx.fillRect(x+.4*s,y+1.2*s,.5*s,1.15*s);ctx.fillRect(x+2.9*s,y+1.6*s,.6*s,.75*s);ctx.fillRect(x+1.5*s,y+1.9*s,.9*s,.45*s);
    ctx.save();ctx.translate(x+2*s,y+2.2*s);ctx.rotate(-.25);ctx.fillStyle='#c9c2b4';ctx.fillRect(-.7*s,-.1*s,1.4*s,.2*s);ctx.restore();
    ctx.fillStyle='#5f9e3a';[[.6,1.1],[3.2,1.5],[1.8,1.8]].forEach(([a,b])=>{ctx.beginPath();ctx.arc(x+a*s,y+b*s,s*.13,0,7);ctx.fill();});
  }
  ctx.fillStyle='#f7ecd2';ctx.strokeStyle='#46290f';ctx.lineWidth=3;ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';
  const t=done?'วัดหมู่บ้าน':'วัดเก่า';ctx.strokeText(t,x+2*s,y+2.8*s);ctx.fillText(t,x+2*s,y+2.8*s);
}
function drawWorkshop(){
  if(drawB('b_work',21.5,11.05,3.3,2.35))return;
  const s=TS,x=wx(20),y=wy(9);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+1.9*s,2.9*s,.18*s);
  ctx.fillStyle='#a7784a';ctx.fillRect(x+.1*s,y+.7*s,2.8*s,1.3*s);ctx.fillStyle='#936840';for(let i=1;i<7;i++)ctx.fillRect(x+(.1+i*.4)*s,y+.7*s,Math.max(1,s*.03),1.3*s);
  ctx.fillStyle='#5b4a3a';ctx.beginPath();ctx.moveTo(x-.1*s,y+.8*s);ctx.lineTo(x+.3*s,y-.1*s);ctx.lineTo(x+2.7*s,y-.1*s);ctx.lineTo(x+3.1*s,y+.8*s);ctx.closePath();ctx.fill();
  ctx.fillStyle='#3b2a1c';ctx.fillRect(x+1.1*s,y+1.1*s,.8*s,.9*s);
  ctx.fillStyle='#c79a62';[[-.05,1.55],[.25,1.55],[.1,1.3]].forEach(([a,b])=>{ctx.beginPath();ctx.arc(x+(2.6+a)*s,y+b*s,s*.13,0,7);ctx.fill();});
  ctx.fillStyle='#f7ecd2';ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('ช่างไม้',x+1.5*s,y+.55*s);
}
function drawBoard0(){
  const s=TS,x=wx(25),y=wy(1);
  ctx.fillStyle='#6b4423';ctx.fillRect(x+.15*s,y+.3*s,.1*s,.65*s);ctx.fillRect(x+.75*s,y+.3*s,.1*s,.65*s);
  ctx.fillStyle='#9b6a3a';ctx.fillRect(x+.05*s,y+.1*s,.9*s,.55*s);
  ctx.fillStyle='#f7ecd2';ctx.fillRect(x+.13*s,y+.17*s,.3*s,.22*s);ctx.fillRect(x+.52*s,y+.2*s,.34*s,.3*s);
  const open=Object.keys(PROJECTS).some(p=>!S.proj[p].done);if(open)questMark(x+.5*s,y-.15*s);
}
function drawMarket(){
  const s=TS;[[20.1,'#3e6f9e'],[21.1,'#d4453a']].forEach(([mx,col],i)=>{const x=wx(mx),y=wy(1.2);
    ctx.fillStyle='#8a5a2b';ctx.fillRect(x+.05*s,y+.2*s,.08*s,.9*s);ctx.fillRect(x+.75*s,y+.2*s,.08*s,.9*s);
    ctx.fillStyle='#9b6a3a';ctx.fillRect(x,y+.75*s,.88*s,.35*s);
    for(let j=0;j<4;j++){ctx.fillStyle=j%2?'#f7ecd2':col;ctx.fillRect(x+j*.22*s,y,.23*s,.3*s);}
    ['#4fae3b','#e0402f','#f2c230'].forEach((c,k)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x+(.2+k*.25)*s,y+.72*s,s*.08,Math.PI,0);ctx.fill();});});
}
function drawMachines0(){
  const s=TS;
  for(const id in MACHINES){if(!S.built[id])continue;const x=wx(MACHINES[id].x),y=wy(MACH_Y),j=S.mach[id];
    ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.85,s*.38,s*.1,0,0,7);ctx.fill();
    if(id==='mortar'){ctx.fillStyle='#8f9296';ctx.beginPath();ctx.moveTo(x+s*.15,y+s*.45);ctx.lineTo(x+s*.85,y+s*.45);ctx.lineTo(x+s*.7,y+s*.85);ctx.lineTo(x+s*.3,y+s*.85);ctx.fill();
      ctx.fillStyle='#6f7276';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.45,s*.35,s*.1,0,0,7);ctx.fill();ctx.save();ctx.translate(x+s*.6,y+s*.35);ctx.rotate(.5+(j&&!j.ready?Math.sin(clock*8)*.2:0));ctx.fillStyle='#a9acb0';ctx.fillRect(-s*.05,-s*.35,s*.1,s*.4);ctx.restore();}
    if(id==='jar'){ctx.fillStyle='#7a4a2a';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.55,s*.3,s*.32,0,0,7);ctx.fill();ctx.fillStyle='#8f5a34';ctx.beginPath();ctx.ellipse(x+s*.42,y+s*.48,s*.12,s*.2,0,0,7);ctx.fill();
      ctx.fillStyle='#5b3a22';ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.25,s*.2,s*.07,0,0,7);ctx.fill();ctx.strokeStyle='#e6b43c';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(x+s*.5,y+s*.55,s*.3,s*.08,0,0,Math.PI);ctx.stroke();}
    if(id==='churn'){ctx.fillStyle='#a7784a';ctx.fillRect(x+s*.28,y+s*.25,s*.44,s*.6);ctx.fillStyle='#6b4423';ctx.fillRect(x+s*.28,y+s*.4,s*.44,s*.05);ctx.fillRect(x+s*.28,y+s*.68,s*.44,s*.05);
      ctx.strokeStyle='#5b4a3a';ctx.lineWidth=Math.max(2,s*.05);ctx.beginPath();ctx.moveTo(x+s*.72,y+s*.45);const a=j&&!j.ready?clock*6:0;ctx.lineTo(x+s*.72+Math.cos(a)*s*.18,y+s*.45+Math.sin(a)*s*.18);ctx.stroke();}
    if(id==='dryer'){ctx.fillStyle='#b8a35a';ctx.fillRect(x+s*.1,y+s*.3,s*.06,s*.55);ctx.fillRect(x+s*.84,y+s*.3,s*.06,s*.55);ctx.fillStyle='#d9c27a';ctx.fillRect(x+s*.08,y+s*.42,s*.84,s*.16);
      if(j){ctx.fillStyle='#c9ccd1';for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(x+s*(.25+i*.25),y+s*.48,s*.1,s*.05,0,0,7);ctx.fill();}}}
    if(j&&j.ready)bubble(x+s*.5,y-s*.05,()=>{ctx.fillStyle='#4fae3b';ctx.beginPath();ctx.arc(x+s*.5,y-s*.05,s*.06,0,7);ctx.fill();});
    else if(j){ctx.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<3;i++){ctx.globalAlpha=.4+.6*((Math.floor(clock*3)%3)===i?1:0);ctx.beginPath();ctx.arc(x+s*(.38+i*.12),y+s*.05,s*.035,0,7);ctx.fill();}ctx.globalAlpha=1;}
  }
}
function drawStall0(){
  const s=TS,x=wx(20),y=wy(4),open=marketOpen();
  ctx.fillStyle='#8a5a2b';ctx.fillRect(x+s*.1,y+s*.5,s*.08,s*.4);ctx.fillRect(x+s*.82,y+s*.5,s*.08,s*.4);
  ctx.fillStyle=open?'#d4453a':'#b8834d';ctx.fillRect(x+s*.02,y+s*.3,s*.96,s*.28);
  ctx.fillStyle='#f7ecd2';for(let i=0;i<4;i++)ctx.fillRect(x+s*(.08+i*.24),y+s*.52,s*.12,s*.06);
  if(S.stall&&S.stall.items.length){S.stall.items.slice(0,6).forEach((it,i)=>{ctx.fillStyle=['#4fae3b','#e0402f','#f2c230','#fff','#8a5a3a','#6fa8dc'][i];ctx.beginPath();ctx.arc(x+s*(.15+i*.14),y+s*.3,s*.07,Math.PI,0);ctx.fill();});}
  if(open){ctx.fillStyle='#f7ecd2';ctx.strokeStyle='#46290f';ctx.lineWidth=3;ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.strokeText('ตลาดนัด',x+s*.5,y+s*.18);ctx.fillText('ตลาดนัด',x+s*.5,y+s*.18);}
}
function drawSchool(){
  if(drawB('b_school',39.5,4.05,5.4,3.7))return;
  const s=TS,x=wx(37),y=wy(1);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+2.85*s,4.8*s,.2*s);
  ctx.fillStyle='#f1e4c4';ctx.fillRect(x+.1*s,y+1*s,4.8*s,2*s);
  ctx.fillStyle='#c0543a';ctx.beginPath();ctx.moveTo(x-.15*s,y+1.2*s);ctx.lineTo(x+.5*s,y+.15*s);ctx.lineTo(x+4.5*s,y+.15*s);ctx.lineTo(x+5.15*s,y+1.2*s);ctx.closePath();ctx.fill();
  for(let i=0;i<3;i++)window2(x+(.4+i*1.6)*s,y+1.5*s,s,false);
  ctx.fillStyle='#6b4423';ctx.fillRect(x+2.15*s,y+2.1*s,.7*s,.9*s);
  ctx.fillStyle='#f7ecd2';ctx.font=`700 ${Math.round(s*.22)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('โรงเรียนบ้านสุขใจ',x+2.5*s,y+.85*s);
  const px=x+5.3*s;ctx.fillStyle='#d9d6cf';ctx.fillRect(px,y-.2*s,s*.05,3.1*s);
  const wv=Math.sin(clock*3)*s*.03,fh=s*.42,st=[['#d4453a',1],['#f7ecd2',1],['#2f4f8f',2],['#f7ecd2',1],['#d4453a',1]];let fy=y-.2*s;
  for(const [c,u] of st){ctx.fillStyle=c;ctx.fillRect(px+s*.05,fy,s*.6+wv,fh*u/6+.5);fy+=fh*u/6;}
}
function drawClinic(){
  if(drawB('b_clinic',38.5,13.05,3.6,3.4))return;
  const s=TS,x=wx(37),y=wy(10);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+2.85*s,2.8*s,.2*s);
  ctx.fillStyle='#f4f6f6';ctx.fillRect(x+.15*s,y+.9*s,2.7*s,2.1*s);
  ctx.fillStyle='#5e8f8a';ctx.fillRect(x-.05*s,y+.55*s,3.1*s,.45*s);
  ctx.fillStyle='#3f9a5a';ctx.fillRect(x+1.38*s,y+1.15*s,.24*s,.62*s);ctx.fillRect(x+1.19*s,y+1.34*s,.62*s,.24*s);
  window2(x+.3*s,y+1.3*s,s,S.t>1080);window2(x+2*s,y+1.3*s,s,S.t>1080);
  ctx.fillStyle='#9fd0e8';ctx.fillRect(x+1.15*s,y+2.05*s,.7*s,.95*s);ctx.strokeStyle='#5e8f8a';ctx.lineWidth=2;ctx.strokeRect(x+1.15*s,y+2.05*s,.7*s,.95*s);
  ctx.fillStyle='#46290f';ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('อนามัย',x+1.5*s,y+.87*s);
}
function drawKid0(sp){
  const s=TS,age=S.day-S.rel.kid.born,x=wx(sp.x+.45),y=wy(sp.y+.1);
  if(age<14){ctx.fillStyle='#f7ecd2';ctx.beginPath();ctx.ellipse(wx(sp.x)+s*.18,wy(sp.y)-s*.12,s*.13,s*.09,.3,0,7);ctx.fill();ctx.fillStyle='#f1c9a0';ctx.beginPath();ctx.arc(wx(sp.x)+s*.28,wy(sp.y)-s*.16,s*.06,0,7);ctx.fill();return;}
  const b=Math.abs(Math.sin(clock*6))*s*.03;
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(x,y+s*.16,s*.14,s*.05,0,0,7);ctx.fill();
  ctx.fillStyle='#f2c230';ctx.beginPath();ctx.roundRect(x-s*.11,y-s*.12-b,s*.22,s*.22,s*.05);ctx.fill();
  ctx.fillStyle='#f1c9a0';ctx.beginPath();ctx.arc(x,y-s*.24-b,s*.12,0,7);ctx.fill();
  ctx.fillStyle='#2b1d12';ctx.fillRect(x-s*.05,y-s*.25-b,s*.03,s*.04);ctx.fillRect(x+s*.02,y-s*.25-b,s*.03,s*.04);
  ctx.beginPath();ctx.arc(x,y-s*.3-b,s*.12,Math.PI*1.1,Math.PI*1.9);ctx.fill();
}
function drawSala(){
  if(drawB('b_sala',23.5,3.05,3.6,2.9))return;
  const s=TS,x=wx(22),y=wy(1);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+1.9*s,2.9*s,.18*s);
  ctx.fillStyle='#9b6a3a';ctx.fillRect(x+.05*s,y+1.4*s,2.9*s,.5*s);ctx.fillStyle='#7a4e25';ctx.fillRect(x+.05*s,y+1.4*s,2.9*s,.08*s);
  ctx.fillStyle='#a8362a';[.25,1.05,1.85,2.65].forEach(o=>ctx.fillRect(x+o*s,y+.5*s,.12*s,.95*s));
  ctx.fillStyle='#b5412f';ctx.beginPath();ctx.moveTo(x-.2*s,y+.62*s);ctx.lineTo(x+.35*s,y+.1*s);ctx.lineTo(x+2.65*s,y+.1*s);ctx.lineTo(x+3.2*s,y+.62*s);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2f6a3d';ctx.beginPath();ctx.moveTo(x+.25*s,y+.2*s);ctx.lineTo(x+.8*s,y-.45*s);ctx.lineTo(x+2.2*s,y-.45*s);ctx.lineTo(x+2.75*s,y+.2*s);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#e6b43c';ctx.lineWidth=Math.max(2,s*.05);ctx.beginPath();ctx.moveTo(x-.2*s,y+.62*s);ctx.lineTo(x+3.2*s,y+.62*s);ctx.moveTo(x+.25*s,y+.2*s);ctx.lineTo(x+2.75*s,y+.2*s);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x+.8*s,y-.45*s);ctx.quadraticCurveTo(x+.7*s,y-.7*s,x+.55*s,y-.62*s);ctx.moveTo(x+2.2*s,y-.45*s);ctx.quadraticCurveTo(x+2.3*s,y-.7*s,x+2.45*s,y-.62*s);ctx.stroke();
  ctx.fillStyle='#f7ecd2';ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('ศาลาหมู่บ้าน',x+1.5*s,y+1.78*s);
}
const WISHES={luck:{n:'ขอให้โชคดีมีลาภ',d:'โชคดี 7 วัน ตกปลาหายากง่ายขึ้น'},love:{n:'ขอให้ทุกคนรักกัน',d:'ชาวบ้านทุกคนหัวใจ +1'},health:{n:'ขอให้แข็งแรง',d:'แรงสูงสุด +5 ถาวร'}};
function openWish(){showModal(`<h2>อธิษฐานปีใหม่</h2><p>จุดธูปที่ศาลา หลับตาแล้วขอพรหนึ่งข้อ...</p>${Object.keys(WISHES).map(k=>`<div class="need"><span><b>${WISHES[k].n}</b><br><small>${WISHES[k].d}</small></span><button class="btn" data-wish="${k}">ขอพรนี้</button></div>`).join('')}<div class="row"><button class="btn ghost" data-close>ไว้ก่อน</button></div>`);}
function doWish(k){if(S.festDone.ny)return;S.festDone.ny=true;stat('wish');
  if(k==='luck')S.luck=Math.max(S.luck||0,7);else if(k==='love'){for(const id in S.npc)if(here(id))addH(id,1);}else S.maxStam+=5;
  for(let i=0;i<6;i++)setTimeout(()=>fwBurst(18+Math.random()*10,.2+Math.random()*1.6,true),i*260);sfx('upgrade');
  showModal(`<h2>สวัสดีปีใหม่!</h2><p>พลุดอกใหญ่พุ่งขึ้นฟ้าพร้อมเสียงเฮของชาวบ้าน</p><p class="req">${WISHES[k].n} · ${WISHES[k].d}</p><div class="row"><button class="btn" data-close>ดูพลุต่อ</button></div>`);}
const fw=[];let fwT=0;
function fwBurst(x,y,big){const cols=['#ffd36b','#ff6b6b','#7fe0ff','#c78bff','#8dff9a','#fff'],c=cols[Math.floor(Math.random()*cols.length)],n=big?36:22;
  for(let i=0;i<n;i++){const a=i/n*6.283,v=(big?3.2:2.2)*(.8+Math.random()*.4);fw.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,c});}if(modal.hidden&&Math.random()<.6)sfx('boom');}
function updateFw(dt){const f=festActive();if(f&&f.id==='newyear'&&S.t>=1140&&scene==='farm'){fwT-=dt;if(fwT<=0){fwT=.5+Math.random()*1.1;fwBurst(18+Math.random()*10,-.4+Math.random()*1.8,Math.random()<.25);}}
  for(let i=fw.length-1;i>=0;i--){const p=fw[i];p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=dt*1.6;p.vx*=.985;if(p.t>1.6)fw.splice(i,1);}}
function drawFw(){if(!fw.length)return;const s=TS;ctx.globalCompositeOperation='lighter';
  for(const p of fw){const a=Math.max(0,1-p.t/1.6);ctx.fillStyle=p.c;ctx.globalAlpha=a;ctx.beginPath();ctx.arc(wx(p.x),wy(p.y),s*.07*(1+a*.5),0,7);ctx.fill();}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
// winter mood: morning mist, drifting leaves & pink petals
const drift=Array.from({length:26},()=>({x:Math.random(),y:Math.random(),s:.5+Math.random(),ph:Math.random()*6,pink:Math.random()<.5}));
function drawWinter(){if(seasonIdx()!==2||S.rain)return;const s=TS;
  if(S.t<600){const a=Math.min(.42,(600-S.t)/240*.42);const g=ctx.createLinearGradient(0,0,0,vh);g.addColorStop(0,`rgba(236,240,246,${a*.6})`);g.addColorStop(1,`rgba(236,240,246,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,vw,vh);
    for(let i=0;i<4;i++){const x=((clock*12+i*vw*.31)%(vw+300))-150,y=vh*(.2+i*.2);ctx.fillStyle=`rgba(245,248,252,${a*.5})`;ctx.beginPath();ctx.ellipse(x,y,vw*.25,vh*.08,0,0,7);ctx.fill();}}
  for(const d of drift){const x=((d.x*vw+clock*18*d.s+Math.sin(clock+d.ph)*20)%(vw+20))-10,y=((d.y*vh+clock*28*d.s)%(vh+20))-10;
    ctx.fillStyle=d.pink?'rgba(247,160,190,.85)':'rgba(214,130,60,.8)';ctx.save();ctx.translate(x,y);ctx.rotate(clock*2*d.s+d.ph);ctx.beginPath();ctx.ellipse(0,0,s*.07,s*.04,0,0,7);ctx.fill();ctx.restore();}}
function drawBlossom(cx,by,s,h){const k='x_blossom'+(h>.7?1:0);if(sprAt(k,cx,by,s*1.75,h>.62,s*2.1))return;
  sprAt('tree2',cx,by,s*1.75,h>.62,s*2.1);for(let i=0;i<14;i++){const a=hash(i,h*99)*6.28,r=hash(h*50,i)*s*.6;ctx.fillStyle=i%3?'rgba(246,150,185,.9)':'rgba(255,205,222,.95)';ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,by-s*1.25+Math.sin(a)*r*.7,s*.11,0,7);ctx.fill();}}
function drawFestDecor(){
  const f=festOn();if(!f)return;const s=TS;
  if(f.id==='newyear'&&S.t>=1020)drawBunting(20.1,25.9,2.55,['#d4453a','#f2c230','#fff4d0','#d4453a','#f2c230']);
  if(f.id==='songkran'||f.id==='bangfai'||f.id==='contest')drawBunting(20.1,25.9,2.55,['#d4453a','#f2b33d','#3e6f9e','#4fae3b','#d9709a']);
  if(f.id==='songkran'){[[20.6,3.4],[25.3,3.3]].forEach(([bx,by])=>{const X=wx(bx),Y=wy(by);if(sprAt('x_bowl',X,Y+s*.18,s*.55,false,s*.5))return;ctx.fillStyle='#c9ccd1';ctx.beginPath();ctx.ellipse(X,Y,s*.22,s*.1,0,0,7);ctx.fill();ctx.fillStyle='#7fc2e8';ctx.beginPath();ctx.ellipse(X,Y-s*.02,s*.17,s*.06,0,0,7);ctx.fill();ctx.fillStyle='#f2c230';ctx.beginPath();ctx.arc(X+s*.06,Y-s*.04,s*.04,0,7);ctx.fill();});}
  if(f.id==='bangfai'){const X=wx(25.4),Y=wy(3.9);ctx.strokeStyle='#b8a35a';ctx.lineWidth=Math.max(2,s*.06);ctx.beginPath();ctx.moveTo(X-s*.2,Y);ctx.lineTo(X,Y-s*1.4);ctx.lineTo(X+s*.2,Y);ctx.moveTo(X-s*.13,Y-s*.5);ctx.lineTo(X+s*.13,Y-s*.5);ctx.stroke();
    if(!S.festDone.rocket&&!rocketFx)drawRocket(X,Y-s*1.3);}
  if(f.id==='loy'&&S.t>=1020){for(let i=0;i<7;i++){const X=wx(2.6+i*.8),Y=wy(1.35)+Math.sin(i)*s*.05;ctx.fillStyle=`rgba(255,200,90,${.25+Math.sin(clock*3+i)*.1})`;ctx.beginPath();ctx.arc(X,Y,s*.22,0,7);ctx.fill();ctx.fillStyle='#e6843c';ctx.beginPath();ctx.ellipse(X,Y,s*.08,s*.11,0,0,7);ctx.fill();}
    const mx=wx(8.8),my=wy(1.1);ctx.fillStyle='rgba(255,248,210,.25)';ctx.beginPath();ctx.arc(mx,my,s*.55,0,7);ctx.fill();ctx.fillStyle='#fff6d6';ctx.beginPath();ctx.arc(mx,my,s*.32,0,7);ctx.fill();}
}
function drawRocket0(X,Y){const s=TS;ctx.fillStyle='#d4453a';ctx.fillRect(X-s*.07,Y,s*.14,s*.55);ctx.fillStyle='#f2b33d';ctx.beginPath();ctx.moveTo(X-s*.07,Y);ctx.lineTo(X,Y-s*.2);ctx.lineTo(X+s*.07,Y);ctx.fill();ctx.fillStyle='#3e6f9e';ctx.fillRect(X-s*.07,Y+s*.2,s*.14,s*.06);ctx.strokeStyle='#b8a35a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(X,Y+s*.55);ctx.lineTo(X,Y+s*1.1);ctx.stroke();}
function drawKrathong0(k){
  const s=TS,X=wx(k.x),Y=wy(k.y)+Math.sin(k.ph*1.5)*s*.03;
  ctx.fillStyle='rgba(255,210,110,.22)';ctx.beginPath();ctx.arc(X,Y-s*.1,s*.35,0,7);ctx.fill();
  ctx.fillStyle='#3f8a34';ctx.beginPath();ctx.ellipse(X,Y,s*.2,s*.09,0,0,7);ctx.fill();
  ctx.fillStyle='#57a844';for(let i=0;i<6;i++){const a=i/6*Math.PI*2;ctx.beginPath();ctx.moveTo(X+Math.cos(a)*s*.18,Y+Math.sin(a)*s*.08);ctx.lineTo(X+Math.cos(a)*s*.1,Y-s*.1);ctx.lineTo(X+Math.cos(a+.5)*s*.18,Y+Math.sin(a+.5)*s*.08);ctx.fill();}
  ctx.fillStyle=k.mine?'#f2a33d':'#f3a3c0';ctx.beginPath();ctx.arc(X,Y-s*.1,s*.07,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.fillRect(X-s*.015,Y-s*.3,s*.03,s*.12);ctx.fillStyle=`rgba(255,220,120,${.8+Math.sin(clock*12+k.ph)*.2})`;ctx.beginPath();ctx.ellipse(X,Y-s*.34,s*.025,s*.05,0,0,7);ctx.fill();
}
function drawResto(){const s=TS;
  if(drawB('b_resto',29.5,8.02,3.5,2.9))return;
  sprAt('b_cottage',wx(29.5),wy(8)+s*.02,s*3.2,false,s*2.7);
  const x=wx(29.5),y=wy(6.05),w=s*1.9,h=s*.42;ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.roundRect(x-w/2+s*.03,y+s*.04,w,h,s*.08);ctx.fill();
  const g=ctx.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#f09a4a');g.addColorStop(1,'#c9652a');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(x-w/2,y,w,h,s*.08);ctx.fill();ctx.strokeStyle='#7a3a14';ctx.lineWidth=Math.max(1,s*.03);ctx.stroke();
  ctx.fillStyle='#fff6e6';ctx.font=`700 ${Math.round(s*.22)}px Mali, sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('ข้าวแกงจ๋า',x,y+h*.54);ctx.textAlign='start';ctx.textBaseline='alphabetic';
  for(const tx of [28.1,30.9]){const cx=wx(tx),cy=wy(7.75);groundShadow(cx,cy+s*.1,s*.24,s*.06);ctx.fillStyle='#8a5a2b';ctx.fillRect(cx-s*.2,cy-s*.12,s*.4,s*.08);ctx.fillRect(cx-s*.03,cy-s*.06,s*.06,s*.16);ctx.fillStyle='#e8e2d4';ctx.beginPath();ctx.ellipse(cx,cy-s*.15,s*.08,s*.035,0,0,7);ctx.fill();}
  const px=wx(29.5),py=wy(7.7);ctx.fillStyle='#3c3c3c';ctx.beginPath();ctx.ellipse(px,py,s*.17,s*.07,0,0,7);ctx.fill();ctx.fillStyle='#565656';ctx.fillRect(px-s*.17,py-s*.14,s*.34,s*.14);ctx.fillStyle='#c98a2a';ctx.beginPath();ctx.ellipse(px,py-s*.14,s*.16,s*.05,0,0,7);ctx.fill();
  for(let i=0;i<3;i++){const t=(clock*.5+i/3)%1;ctx.fillStyle=`rgba(255,255,255,${.4*(1-t)})`;ctx.beginPath();ctx.arc(px+Math.sin(t*6+i)*s*.06,py-s*.22-t*s*.4,s*(.04+t*.05),0,7);ctx.fill();}
}
function drawBuildings0(){
  const s=TS;
  let x=wx(15),y=wy(1);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.3*s,y+3.85*s,4.6*s,.25*s);
  ctx.fillStyle='#ead6ab';ctx.fillRect(x+.2*s,y+1.4*s,4.6*s,2.6*s);
  ctx.fillStyle='#d9c08e';for(let i=1;i<6;i++)ctx.fillRect(x+.2*s,y+1.4*s+i*.44*s,4.6*s,Math.max(1,s*.03));
  ctx.fillStyle='#b5412f';ctx.beginPath();ctx.moveTo(x-.15*s,y+1.65*s);ctx.lineTo(x+.7*s,y-.15*s);ctx.lineTo(x+4.3*s,y-.15*s);ctx.lineTo(x+5.15*s,y+1.65*s);ctx.closePath();ctx.fill();
  ctx.fillStyle='#983423';for(let i=0;i<4;i++)ctx.fillRect(x+.3*s+i*.05*s,y+(.2+i*.38)*s,4.4*s-i*.1*s,s*.06);
  ctx.fillStyle='#6b4423';ctx.fillRect(x+2.15*s,y+2.5*s,.7*s,1.5*s);ctx.fillStyle='#f2b33d';ctx.beginPath();ctx.arc(x+2.72*s,y+3.3*s,s*.05,0,7);ctx.fill();
  window2(x+.75*s,y+2.2*s,s,S.t>1080);window2(x+3.6*s,y+2.2*s,s,S.t>1080);
  drawSala();
  drawTemple();drawWorkshop();drawBoard();drawMachines();drawStall();
  if(S.proj.market.done)drawMarket();
  if(S.built.house){const hx=wx(15),hy=wy(1);ctx.fillStyle='#8f9296';ctx.fillRect(hx+3.9*s,hy-.5*s,.4*s,.8*s);ctx.fillStyle='#6f7276';ctx.fillRect(hx+3.85*s,hy-.55*s,.5*s,.12*s);
    const sm=(clock*.6)%1;ctx.fillStyle=`rgba(235,235,235,${.5-sm*.5})`;ctx.beginPath();ctx.arc(hx+4.1*s+sm*s*.3,hy-.7*s-sm*s*.8,s*(.12+sm*.15),0,7);ctx.fill();
    [.75,3.6].forEach(o=>{ctx.fillStyle='#8a5a2b';ctx.fillRect(hx+o*s-.05*s,hy+2.8*s,.8*s,.14*s);['#e0402f','#f2b33d','#d9709a'].forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(hx+(o+.1+i*.25)*s,hy+2.78*s,s*.07,0,7);ctx.fill();});});}
  drawCottage(27,1,'#f0e2c4','#3e6f9e','#2f5579');
  drawCottage(31,1,'#f4dcd0','#4f8a45','#3b6b33');
  drawCottage(40,10,'#efe6cf','#8a4fa0','#6a3a7c');
  drawCottage(37,14,'#f3ead8','#b8763a','#8f5a2a');
  drawSchool();drawClinic();
  if(S.rel.wedDay===S.day||(S.rel.married&&S.day-S.rel.married<3))drawBunting(14.6,20.4,.6,['#f7ecd2','#f3a3c0','#e6b43c']);
  x=wx(29);y=wy(9);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+1.9*s,3.9*s,.2*s);
  ctx.fillStyle='#a8362a';ctx.fillRect(x+.1*s,y+.7*s,3.8*s,1.3*s);
  ctx.fillStyle='#5b2a22';ctx.beginPath();ctx.moveTo(x-.1*s,y+.85*s);ctx.lineTo(x+.9*s,y-.35*s);ctx.lineTo(x+3.1*s,y-.35*s);ctx.lineTo(x+4.1*s,y+.85*s);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f7ecd2';ctx.fillRect(x+1.4*s,y+.95*s,1.2*s,1.05*s);ctx.fillStyle='#a8362a';ctx.fillRect(x+1.5*s,y+1.05*s,1*s,.95*s);
  ctx.strokeStyle='#f7ecd2';ctx.lineWidth=Math.max(2,s*.07);ctx.beginPath();ctx.moveTo(x+1.5*s,y+1.05*s);ctx.lineTo(x+2.5*s,y+2*s);ctx.moveTo(x+2.5*s,y+1.05*s);ctx.lineTo(x+1.5*s,y+2*s);ctx.stroke();
  ctx.fillStyle='#e6c75c';ctx.fillRect(x+1.75*s,y+.1*s,.5*s,.4*s);
  x=wx(21);y=wy(6);
  ctx.fillStyle='#8a5a2b';ctx.fillRect(x+.15*s,y+.3*s,.12*s,1.5*s);ctx.fillRect(x+2.73*s,y+.3*s,.12*s,1.5*s);
  if(folksOut()&&!festActive())drawPerson(wx(22.5),wy(6.95),'down',NPCS.daeng,0,false);
  ctx.fillStyle='#9b6a3a';ctx.fillRect(x+.1*s,y+1.05*s,2.8*s,.85*s);ctx.fillStyle='#7a4e25';ctx.fillRect(x+.1*s,y+1.05*s,2.8*s,.12*s);
  for(let i=0;i<7;i++){ctx.fillStyle=i%2?'#f7ecd2':'#d4453a';ctx.fillRect(x+i*3/7*s,y-.05*s,3/7*s+1,.55*s);}
  ctx.fillStyle='rgba(0,0,0,.15)';ctx.fillRect(x,y+.5*s,3*s,.08*s);
  [['#4fae3b',.5],['#e0402f',1.1],['#2f7d32',1.7],['#e6c75c',2.3]].forEach(([c,o])=>{ctx.fillStyle='#c79a62';ctx.fillRect(x+o*s-.2*s,y+1.02*s,.4*s,.14*s);ctx.fillStyle=c;ctx.beginPath();ctx.arc(x+o*s,y+1.02*s,.13*s,Math.PI,0);ctx.fill();});
  ctx.fillStyle='#f7ecd2';ctx.font=`700 ${Math.round(s*.26)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('เมล็ดพันธุ์',x+1.5*s,y+1.65*s);
  x=wx(12);y=wy(6);
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+.1*s,y+.85*s,.85*s,.12*s);
  ctx.fillStyle='#9b6a3a';ctx.fillRect(x+.1*s,y+.3*s,.8*s,.6*s);ctx.fillStyle='#7a4e25';ctx.fillRect(x+.05*s,y+.2*s,.9*s,.18*s);
  ctx.fillRect(x+.1*s,y+.55*s,.8*s,.05*s);
  if(binValue()){ctx.fillStyle='#4fae3b';ctx.beginPath();ctx.arc(x+.35*s,y+.2*s,.1*s,Math.PI,0);ctx.fill();ctx.fillStyle='#e0402f';ctx.beginPath();ctx.arc(x+.6*s,y+.2*s,.08*s,Math.PI,0);ctx.fill();}
  ctx.fillStyle='#f7ecd2';ctx.font=`700 ${Math.round(s*.2)}px Mali, sans-serif`;ctx.fillText('ส่งขาย',x+.5*s,y+.82*s);
}
function drawPerson0(x,y,face,look,walk,moving,hat){
  const s=TS,b=moving?Math.abs(Math.sin(walk))*s*.06:0;
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(x,y+s*.28,s*.26,s*.09,0,0,7);ctx.fill();
  const lg=moving?Math.sin(walk)*s*.06:0;
  ctx.fillStyle='#3b3024';ctx.fillRect(x-s*.13,y+s*.08-lg*.3,s*.1,s*.2+lg);ctx.fillRect(x+s*.03,y+s*.08+lg*.3,s*.1,s*.2-lg);
  ctx.fillStyle=look.shirt;ctx.beginPath();ctx.roundRect(x-s*.2,y-s*.22-b,s*.4,s*.36,s*.08);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(x-s*.2,y+s*.02-b,s*.4,s*.06);
  const hy=y-s*.4-b;
  ctx.fillStyle=look.skin;ctx.beginPath();ctx.arc(x,hy,s*.19,0,7);ctx.fill();
  if(!hat){ctx.fillStyle=look.hair;ctx.beginPath();ctx.arc(x,hy-s*.04,s*.195,Math.PI*1.05,Math.PI*1.95);ctx.fill();
    if(face==='up'){ctx.beginPath();ctx.arc(x,hy,s*.19,0,7);ctx.fill();}}
  ctx.fillStyle='#2b1d12';
  if(face==='down'){ctx.fillRect(x-s*.09,hy+s*.01,s*.045,s*.06);ctx.fillRect(x+s*.05,hy+s*.01,s*.045,s*.06);}
  else if(face==='left'){ctx.fillRect(x-s*.12,hy+s*.01,s*.045,s*.06);}
  else if(face==='right'){ctx.fillRect(x+s*.08,hy+s*.01,s*.045,s*.06);}
  if(hat){ctx.fillStyle='#e8c35a';ctx.beginPath();ctx.ellipse(x,hy-s*.1,s*.3,s*.09,0,0,7);ctx.fill();
    ctx.fillStyle='#d6ac3e';ctx.beginPath();ctx.arc(x,hy-s*.12,s*.15,Math.PI,0);ctx.fill();
    ctx.fillStyle='#d4453a';ctx.fillRect(x-s*.15,hy-s*.15,s*.3,s*.04);}
}
const PLAYER_LOOK={shirt:'#2f6fb0',skin:'#f1c9a0',hair:'#2b1d12',sk:'me'};
for(const id in NPCS)NPCS[id].sk=id;
function drawPlayer(){
  if(busFx&&busFx.hide&&scene==='farm')return;
  const s=TS,x=wx(S.px),y=wy(S.py);
  if(riding&&scene==='farm'){drawHorse(x,y+s*.1,S.face==='left'?-1:1,S.moving);drawPerson(x,y-s*.3,S.face,PLAYER_LOOK,0,false,true);}
  else{const af=scene!=='mine'||true?actFrame():null;
    if(af){groundShadow(x,y+s*.3,s*.26,s*.08);sprAt(af.k,x,y+s*.41,s*3,af.flip,s*1.32*260/208);}
    else drawPerson(x,y,S.face,PLAYER_LOOK,S.walk||0,S.moving,true);}
  if(fish&&!actFrame()){const[dx]=DIRS[S.face];const hx=x+dx*s*.25,hy=y-s*.3;
    const bx=wx(fish.tx+.5),by=wy(fish.ty+.5)+(fish.phase==='bite'?Math.sin(clock*25)*s*.08+s*.06:Math.sin(clock*3)*s*.03);
    ctx.strokeStyle='#6b4423';ctx.lineWidth=Math.max(2,s*.05);ctx.beginPath();ctx.moveTo(x+dx*s*.1,y-s*.1);ctx.lineTo(hx+dx*s*.4,hy-s*.3);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(hx+dx*s*.4,hy-s*.3);ctx.quadraticCurveTo((hx+bx)/2,Math.min(hy,by)-s*.2,bx,by);ctx.stroke();
    ctx.fillStyle='#d4453a';ctx.beginPath();ctx.arc(bx,by,s*.07,Math.PI,0);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(bx,by,s*.07,0,Math.PI);ctx.fill();
    if(fish.phase==='bite'){ctx.strokeStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.ellipse(bx,by+s*.05,s*(.15+(clock*2%1)*.2),s*(.06+(clock*2%1)*.08),0,0,7);ctx.stroke();}
  }
}
function questMark(x,y){const s=TS;ctx.fillStyle='#f2b33d';ctx.strokeStyle='#6b4423';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,s*.14,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#3a2614';ctx.font=`700 ${Math.round(s*.22)}px Mali, sans-serif`;ctx.textAlign='center';ctx.fillText('!',x,y+s*.07);}
function drawFolk(id){
  const d=NPCS[id],f=folks[id],n=S.npc[id],s=TS,x=wx(f.x),y=wy(f.y);
  drawPerson(x,y,f.face,d,f.walk,f.moving,false);
  const fa=festActive();
  if(isBday(id)){ctx.strokeStyle='#6b4423';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+s*.2,y-s*.3);ctx.lineTo(x+s*.3,y-s*.95);ctx.stroke();ctx.fillStyle='#f3a3c0';ctx.beginPath();ctx.ellipse(x+s*.3,y-s*1.05,s*.1,s*.13,0,0,7);ctx.fill();}
  if(id==='phum'&&!f.moving&&(f.place==='plaza'||f.place==='pond')){ctx.fillStyle='#46290f';ctx.font=`700 ${Math.round(s*.28)}px sans-serif`;ctx.textAlign='center';
    for(let i=0;i<2;i++){const t=(clock*.8+i*.5)%1;ctx.globalAlpha=1-t;ctx.fillText(i?'♫':'♪',x+s*(.3+i*.2),y-s*(.6+t*.7));}ctx.globalAlpha=1;
    ctx.fillStyle='#a7784a';ctx.beginPath();ctx.ellipse(x+s*.15,y-s*.05,s*.12,s*.08,.5,0,7);ctx.fill();ctx.fillRect(x+s*.2,y-s*.35,s*.04,s*.3);}
  if(S.npc[id]&&pendingEvent(id)&&!(fa&&fa.id==='songkran')){ctx.fillStyle='#ff8fa3';ctx.font=`700 ${Math.round(s*.3)}px sans-serif`;ctx.textAlign='center';ctx.fillText('♥',x-s*.3,y-s*.8+Math.sin(clock*4)*s*.04);}
  if(fa&&fa.id==='songkran'&&!S.festDone['sk_'+id])questMark(x,y-s*.95);
  else if(n.req&&!n.req.done)questMark(x,y-s*.95);
  if(Math.hypot(f.x-S.px,f.y-S.py)<2.6){ctx.font=`700 ${Math.round(s*.22)}px Mali, sans-serif`;ctx.textAlign='center';
    ctx.lineWidth=3;ctx.strokeStyle='#46290f';ctx.strokeText(d.n,x,y+s*.55);ctx.fillStyle='#f7ecd2';ctx.fillText(d.n,x,y+s*.55);}
}
function drawHen0(h){
  const s=TS,x=wx(h.x),y=wy(h.y),b=(h.vx||h.vy)?Math.abs(Math.sin(h.bob))*s*.04:0,dir=h.vx<0?-1:1;
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(x,y+s*.14,s*.18,s*.06,0,0,7);ctx.fill();
  ctx.fillStyle='#fbf7ee';ctx.beginPath();ctx.ellipse(x,y-b,s*.2,s*.15,0,0,7);ctx.fill();
  ctx.beginPath();ctx.arc(x+dir*s*.14,y-s*.14-b,s*.1,0,7);ctx.fill();
  ctx.fillStyle='#d4453a';ctx.beginPath();ctx.arc(x+dir*s*.14,y-s*.25-b,s*.045,0,7);ctx.fill();
  ctx.fillStyle='#f2a33d';ctx.beginPath();ctx.moveTo(x+dir*s*.23,y-s*.15-b);ctx.lineTo(x+dir*s*.31,y-s*.12-b);ctx.lineTo(x+dir*s*.23,y-s*.09-b);ctx.fill();
  ctx.fillStyle='#2b1d12';ctx.fillRect(x+dir*s*.16-s*.015,y-s*.17-b,s*.03,s*.03);
  if(h.egg)bubble(x,y-s*.5,()=>{ctx.fillStyle='#fff3cf';ctx.beginPath();ctx.ellipse(x,y-s*.5,s*.06,s*.08,0,0,7);ctx.fill();ctx.strokeStyle='#c9a86a';ctx.lineWidth=1;ctx.stroke();});
}
function bubble(x,y,inner){const s=TS;ctx.fillStyle='#f7ecd2';ctx.strokeStyle='#6b4423';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x-s*.13,y-s*.12,s*.26,s*.24,s*.06);ctx.fill();ctx.stroke();inner();}
function drawGoat(c){
  const s=TS,x=wx(c.x),y=wy(c.y),dir=c.vx<0?-1:1,b=(c.vx||c.vy)?Math.abs(Math.sin(c.bob))*s*.03:0;
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(x,y+s*.16,s*.26,s*.07,0,0,7);ctx.fill();
  ctx.fillStyle='#3b3024';[-.16,-.06,.08,.17].forEach(o=>ctx.fillRect(x+o*s-s*.03,y,s*.06,s*.16));
  ctx.fillStyle='#e8dcc6';ctx.beginPath();ctx.ellipse(x,y-s*.08-b,s*.26,s*.16,0,0,7);ctx.fill();ctx.fillStyle='#b88a5a';ctx.beginPath();ctx.ellipse(x-dir*s*.06,y-s*.12-b,s*.12,s*.08,0,0,7);ctx.fill();
  const hx=x+dir*s*.28,hy=y-s*.22-b;ctx.fillStyle='#e8dcc6';ctx.beginPath();ctx.ellipse(hx,hy,s*.1,s*.09,0,0,7);ctx.fill();
  ctx.strokeStyle='#8f837a';ctx.lineWidth=Math.max(1.5,s*.03);ctx.beginPath();ctx.moveTo(hx-dir*s*.02,hy-s*.07);ctx.quadraticCurveTo(hx-dir*s*.12,hy-s*.22,hx-dir*s*.18,hy-s*.12);ctx.stroke();
  ctx.fillStyle='#f4ead6';ctx.fillRect(hx+dir*s*.02,hy+s*.06,s*.03,s*.08);ctx.fillStyle='#2b1d12';ctx.fillRect(hx+dir*s*.03,hy-s*.03,s*.025,s*.025);
  if(c.milk)bubble(x,y-s*.5,()=>{ctx.fillStyle='#fff';ctx.fillRect(x-s*.05,y-s*.54,s*.1,s*.13);ctx.fillStyle='#b88a5a';ctx.fillRect(x-s*.05,y-s*.54,s*.1,s*.03);});
}
function drawBuffalo(c){
  const s=TS,x=wx(c.x),y=wy(c.y),dir=c.vx<0?-1:1,b=(c.vx||c.vy)?Math.abs(Math.sin(c.bob*.5))*s*.03:0;
  ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(x,y+s*.24,s*.45,s*.11,0,0,7);ctx.fill();
  ctx.fillStyle='#2b2826';[-.3,-.14,.14,.3].forEach(o=>ctx.fillRect(x+o*s-s*.05,y+s*.02,s*.1,s*.22));
  ctx.fillStyle='#4a4644';ctx.beginPath();ctx.ellipse(x,y-s*.08-b,s*.45,s*.27,0,0,7);ctx.fill();
  const hx=x+dir*s*.46,hy=y-s*.18-b;ctx.fillStyle='#4a4644';ctx.beginPath();ctx.ellipse(hx,hy,s*.16,s*.14,0,0,7);ctx.fill();
  ctx.strokeStyle='#d9cdb8';ctx.lineWidth=Math.max(2,s*.06);ctx.beginPath();ctx.arc(hx,hy-s*.02,s*.24,Math.PI*1.1,Math.PI*1.9);ctx.stroke();
  ctx.fillStyle='#2b1d12';ctx.fillRect(hx+dir*s*.04,hy-s*.03,s*.03,s*.03);
}
function drawHorse0(x,y,dir,moving){
  const s=TS,b=moving?Math.abs(Math.sin(clock*10))*s*.05:0,lg=moving?Math.sin(clock*12)*s*.06:0;
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(x,y+s*.28,s*.42,s*.1,0,0,7);ctx.fill();
  ctx.fillStyle='#5b3a22';[-.28,-.14,.14,.28].forEach((o,i)=>ctx.fillRect(x+o*s-s*.04,y+s*.02+(i%2?lg:-lg)*.4,s*.08,s*.26));
  ctx.fillStyle='#8a5a34';ctx.beginPath();ctx.ellipse(x,y-s*.06-b,s*.42,s*.2,0,0,7);ctx.fill();
  const hx=x+dir*s*.44,hy=y-s*.3-b;ctx.beginPath();ctx.ellipse(hx,hy,s*.1,s*.2,dir*.6,0,7);ctx.fill();
  ctx.fillStyle='#3b2416';ctx.fillRect(hx-dir*s*.1,hy-s*.2,s*.08,s*.3);ctx.fillRect(x-dir*s*.46,y-s*.12-b,s*.06,s*.3);
}
function drawDuck0(d){
  const s=TS,x=wx(d.x),y=wy(d.y),dir=d.vx<0?-1:1,bob=Math.sin(d.bob*.5)*s*.02,water=map[Math.floor(d.y)]&&map[Math.floor(d.y)][Math.floor(d.x)]==='w';
  if(water){ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y+s*.06,s*.2,s*.05,0,0,7);ctx.stroke();}
  ctx.fillStyle='#fbf7ee';ctx.beginPath();ctx.ellipse(x,y+bob,s*.16,s*.1,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(x+dir*s*.12,y-s*.1+bob,s*.07,0,7);ctx.fill();
  ctx.fillStyle='#f2a33d';ctx.fillRect(x+dir*s*.17-(dir<0?s*.08:0),y-s*.1+bob,s*.08,s*.035);
  ctx.fillStyle='#2b1d12';ctx.fillRect(x+dir*s*.13,y-s*.12+bob,s*.025,s*.025);
  if(d.egg)bubble(x,y-s*.42,()=>{ctx.fillStyle='#e6f0e0';ctx.beginPath();ctx.ellipse(x,y-s*.42,s*.06,s*.08,0,0,7);ctx.fill();});
}
function drawCow0(c){
  if(c.kind==='goat')return drawGoat(c);if(c.kind==='buffalo')return drawBuffalo(c);
  const s=TS,x=wx(c.x),y=wy(c.y),b=(c.vx||c.vy)?Math.abs(Math.sin(c.bob*.6))*s*.03:0,dir=c.vx<0?-1:1;
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(x,y+s*.22,s*.4,s*.1,0,0,7);ctx.fill();
  ctx.fillStyle='#3b3024';[-.26,-.12,.12,.26].forEach(o=>ctx.fillRect(x+o*s-s*.04,y+s*.02,s*.08,s*.2));
  ctx.fillStyle='#fbf7ee';ctx.beginPath();ctx.ellipse(x,y-s*.08-b,s*.4,s*.24,0,0,7);ctx.fill();
  ctx.fillStyle='#2b2520';ctx.beginPath();ctx.ellipse(x-dir*s*.12,y-s*.14-b,s*.12,s*.09,.4,0,7);ctx.fill();
  ctx.beginPath();ctx.ellipse(x+dir*s*.14,y-s*.02-b,s*.08,s*.06,0,0,7);ctx.fill();
  const hx=x+dir*s*.42,hy=y-s*.2-b;
  ctx.fillStyle='#fbf7ee';ctx.beginPath();ctx.ellipse(hx,hy,s*.15,s*.14,0,0,7);ctx.fill();
  ctx.fillStyle='#f0b4a8';ctx.beginPath();ctx.ellipse(hx+dir*s*.07,hy+s*.06,s*.1,s*.07,0,0,7);ctx.fill();
  ctx.fillStyle='#e8d9b0';ctx.fillRect(hx-s*.12,hy-s*.19,s*.05,s*.08);ctx.fillRect(hx+s*.07,hy-s*.19,s*.05,s*.08);
  ctx.fillStyle='#2b1d12';ctx.fillRect(hx+dir*s*.02-s*.015,hy-s*.04,s*.03,s*.03);
  if(c.milk)bubble(x,y-s*.62,()=>{ctx.fillStyle='#fff';ctx.fillRect(x-s*.05,y-s*.66,s*.1,s*.13);ctx.fillStyle='#6fa8dc';ctx.fillRect(x-s*.05,y-s*.66,s*.1,s*.03);});
}
function drawParts(){
  const s=TS;
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];
    if(p.drop){ctx.fillStyle=`rgba(140,200,255,${Math.max(0,1-p.t*2)})`;ctx.beginPath();ctx.arc(wx(p.x),wy(p.y)-p.t*s*.6,s*.05,0,7);ctx.fill();if(p.t>.5)parts.splice(i,1);continue;}
    if(p.dust){p.x+=p.vx*frameDt;p.y+=p.vy*frameDt;p.vy+=frameDt*.9;ctx.fillStyle=p.dust+Math.max(0,.55-p.t*1.1)+')';ctx.beginPath();ctx.arc(wx(p.x),wy(p.y),s*(p.r+p.t*.12),0,7);ctx.fill();if(p.t>.5)parts.splice(i,1);continue;}
    if(p.smoke){ctx.fillStyle=`rgba(235,230,220,${Math.max(0,.6-p.t*.5)})`;ctx.beginPath();ctx.arc(wx(p.x),wy(p.y),s*(.08+p.t*.25),0,7);ctx.fill();if(p.t>1.2)parts.splice(i,1);continue;}
    ctx.globalAlpha=Math.max(0,1-p.t/1.2);ctx.font=`700 ${Math.round(s*.34)}px Mali, sans-serif`;ctx.textAlign='center';
    ctx.lineWidth=4;ctx.strokeStyle='#46290f';ctx.strokeText(p.txt,wx(p.x),wy(p.y)-p.t*s*.8);ctx.fillStyle=p.col;ctx.fillText(p.txt,wx(p.x),wy(p.y)-p.t*s*.8);ctx.globalAlpha=1;
    if(p.t>1.2)parts.splice(i,1);}
}
function draw(){
  const s=TS;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  if(scene==='mine'&&mine){drawMine();return;}
  if(scene==='area'&&AREAS[S.area]){drawArea();return;}
  if(scene==='house'){drawHouse();return;}
  const ww=W*s,wh=H*s;
  const fy=rocketFx&&rocketFx.ok?Math.min(S.py,rocketFx.y+3):S.py;
  followCam(S.px*s,fy*s,ww,wh);
  if(shakeT>0){shakeT-=frameDt;const a=shakeA*Math.max(0,shakeT)/.2;camX+=Math.round((Math.random()-.5)*2*a*dpr)/dpr;camY+=Math.round((Math.random()-.5)*2*a*dpr)/dpr;if(shakeT<=0)shakeA=0;}
  ctx.fillStyle='#23391b';ctx.fillRect(0,0,vw,vh);
  const x0=Math.max(0,Math.floor(camX/s)),x1=Math.min(W-1,Math.ceil((camX+vw)/s)),y0=Math.max(0,Math.floor(camY/s)),y1=Math.min(H-1,Math.ceil((camY+vh)/s));
  treeQ=[];stakeQ=[];
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const sx=x*s-camX,sy=y*s-camY;drawTile(x,y,sx,sy,s+1);const d=S.debris[x+','+y];if(d)drawDebris(d,sx,sy,s,x,y);if(S.decos[x+','+y]==='path'){ctx.save();ctx.beginPath();ctx.roundRect(sx+s*.06,sy+s*.06,s*.88,s*.88,s*.18);ctx.clip();if(!tex('stone',x,y,sx,sy,s,2)){ctx.fillStyle='#d9cfbb';ctx.fillRect(sx,sy,s,s);}ctx.restore();ctx.strokeStyle='rgba(70,41,15,.25)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(sx+s*.06,sy+s*.06,s*.88,s*.88,s*.18);ctx.stroke();}}
  for(const [px,py,ss] of stakeQ){groundShadow(px,py+ss*.02,ss*.08,ss*.03);if(!sprAt('x_post',px,py+ss*.04,ss*.16,false,ss*.42)){ctx.fillStyle='#8a5a2b';ctx.fillRect(px-ss*.03,py-ss*.3,ss*.06,ss*.32);}ctx.fillStyle='#e0402f';ctx.fillRect(px-ss*.04,py-ss*.34,ss*.08,ss*.07);}
  for(const f of S.forage)drawForage(f,wx(f.x),wy(f.y),s);
  if(x1>=18&&y1>=22)drawPond();
  for(const r of RELICS)if(r.spot&&!(S.relics&&S.relics[r.id])&&r.spot.ok())drawGlint(wx(r.spot.x+.5),wy(r.spot.y+.6),s);
  if(S.built.gh)drawGreenhouse();
  krathongs.forEach(drawKrathong);
  drawBuildings();
  drawFestDecor();
  if(modal.hidden&&!fish&&!rocket){const sf=S.face;if(ctxCache&&ctxCache.face)S.face=ctxCache.face;const {tx,ty}=target();S.face=sf;const c=ctxCache;
    const tiles=c&&c.area&&c.area.length?c.area:[[tx,ty]];
    ctx.strokeStyle=c&&!c.dis?'rgba(255,248,220,.95)':'rgba(255,255,255,.35)';ctx.lineWidth=Math.max(2,s*.06);
    ctx.setLineDash([s*.14,s*.1]);ctx.lineDashOffset=-clock*20;tiles.forEach(([x,y])=>ctx.strokeRect(wx(x)+2,wy(y)+2,s-4,s-4));ctx.setLineDash([]);}
  const ents=S.hens.map(h=>({y:h.y,f:()=>drawHen(h)}));
  for(const [tx,ty,kind] of treeQ){const h=hash(tx,ty);if(kind==='cave'){ents.push({y:ty+.99,f:()=>sprAt('x_cave',wx(tx+.5),wy(ty+1)+TS*.05,TS*1.7,false,TS*1.5)});continue;}ents.push({y:ty+.95,f:()=>{const s=TS,cx=wx(tx+.5),by=wy(ty+1)+s*.08;
    groundShadow(cx,by-s*.08,s*.55,s*.16);if(h>.86)sprAt('palm',cx,by,s*1.4,h>.93,s*2.2);else if(seasonIdx()===2&&h>.55)drawBlossom(cx,by,s,h);else sprAt('tree'+seasonIdx(),cx,by,s*1.75,h>.5,s*2.1);}});}
  S.cows.forEach(c=>ents.push({y:c.y,f:()=>drawCow(c)}));
  S.ducks.forEach(d=>ents.push({y:d.y,f:()=>drawDuck(d)}));
  for(const tk in S.trees){const [tx,ty]=tk.split(',').map(Number);if(tx<x0-2||tx>x1+2||ty<y0-3||ty>y1+2)continue;ents.push({y:ty+.95,f:()=>drawFTree(S.trees[tk],tx,ty)});}
  for(const dk in S.decos){const k=S.decos[dk];if(k==='path')continue;const [tx,ty]=dk.split(',').map(Number);if(tx<x0-2||tx>x1+2||ty<y0-2||ty>y1+2)continue;ents.push({y:ty+.9,f:()=>drawDeco(k,tx,ty)});}
  if(S.pet&&scene==='farm')ents.push({y:S.pet.y,f:drawPet});
  if(x1>=39&&y0<=8&&unl('bus'))ents.push({y:6.97,f:drawBusStop});
  for(const c of S.crows||[])ents.push({y:c.st==='peck'?c.y:99,f:()=>drawCrow(c)});
  if(x1>=38&&y0<=16&&y1>=12&&unl('museum'))ents.push({y:15.97,f:drawMuseum});
  if(S.horse&&!riding)ents.push({y:14.2,f:()=>drawHorse(wx(31.5),wy(14.2),-1,false)});
  for(const id in folks)if(canSee(id)||(id==='ek'&&folksOut()&&!festActive()))ents.push({y:folks[id].y,f:()=>drawFolk(id)});
  if(S.rel.kid&&S.rel.spouse&&canSee(S.rel.spouse)){const sp=folks[S.rel.spouse];ents.push({y:sp.y+.01,f:()=>drawKid(sp)});}
  if(marketOpen())shoppers.forEach(p=>ents.push({y:p.y,f:()=>drawPerson(wx(p.x),wy(p.y),p.face||'down',p.look,p.walk,true,false)}));
  ents.push({y:S.py,f:drawPlayer});
  ents.sort((a,b)=>a.y-b.y).forEach(e=>e.f());
  if(busFx)drawBus();
  if(folksOut()&&!festActive()&&S.npc.daeng.req&&!S.npc.daeng.req.done)questMark(wx(22.5),wy(6.95)-s*.95);
  if(rocketFx){const r=rocketFx;drawRocket(wx(r.x),wy(r.y));if(r.ok&&r.t>1.8){for(let i=0;i<14;i++){const a=i/14*6.28,rr=(r.t-1.8)*s*3;ctx.fillStyle=['#f2b33d','#d4453a','#fff'][i%3];ctx.beginPath();ctx.arc(wx(r.x)+Math.cos(a)*rr,wy(r.y)+Math.sin(a)*rr,s*.06,0,7);ctx.fill();}}}
  if(auto&&auto.mark){const [mx2,my2]=auto.mark,p=(Math.sin(clock*6)+1)/2;ctx.strokeStyle=`rgba(255,248,220,${.6+p*.3})`;ctx.lineWidth=Math.max(2,s*.05);ctx.beginPath();ctx.ellipse(wx(mx2+.5),wy(my2+.72),s*(.28+p*.06),s*(.14+p*.03),0,0,7);ctx.stroke();}
  drawParts();
  let a=0;if(S.t<420)a=(420-S.t)/60*.22;else if(S.t>1020)a=Math.min(.5,(S.t-1020)/180*.5);
  if(S.rain)a=Math.max(a,.15);
  const stormy=S.storm&&S.t>=900&&scene==='farm';if(stormy)a=Math.max(a,.3);
  if(a>0){ctx.fillStyle=`rgba(28,42,77,${a})`;ctx.fillRect(0,0,vw,vh);
    if(a>.25){ctx.globalCompositeOperation='lighter';for(const k of krathongs){ctx.fillStyle='rgba(255,190,90,.18)';ctx.beginPath();ctx.arc(wx(k.x),wy(k.y)-s*.2,s*.5,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over';}}
  drawFw();if(scene==='farm')drawWinter();
  if(S.rain){ctx.strokeStyle=stormy?'rgba(210,230,255,.7)':'rgba(200,225,255,.55)';ctx.lineWidth=stormy?2:1.5;ctx.beginPath();
    for(const d of rainDrops){const sx2=stormy?260:80,x=((d.x*vw+clock*sx2*d.s)%vw),y=((d.y*vh+clock*(stormy?760:520)*d.s)%vh);ctx.moveTo(x,y);ctx.lineTo(x-(stormy?14:4),y+(stormy?18:14));}ctx.stroke();}
  if(stormy){flashT-=frameDt;if(flashT<=0){flashT=5+Math.random()*9;flashA=.55;if(modal.hidden)setTimeout(()=>sfx('thunder'),200+Math.random()*700);}
    if(flashA>0){ctx.fillStyle=`rgba(235,240,255,${flashA})`;ctx.fillRect(0,0,vw,vh);flashA=Math.max(0,flashA-frameDt*2.2);}}
}

// ---------- HUD ----------
let ctxCache=null,hudKey='';
let lastActLbl='',moneyShown=null,moneyTarget=0;
function renderMoney(){const el=$('moneyTxt');el.textContent='฿'+Math.round(moneyShown).toLocaleString('en-US')+(S.bin?` (+${S.bin})`:'');}
function tickMoney(dt){if(moneyShown===null)return;if(moneyShown===S.money){const el=$('moneyTxt');if(el.classList&&(el.classList.contains&&(el.classList.contains('up')||el.classList.contains('down')))){el.classList.remove('up');el.classList.remove('down');}return;}const d=S.money-moneyShown;
  moneyShown=Math.abs(d)<1?S.money:moneyShown+d*Math.min(1,dt*7)+Math.sign(d)*Math.min(Math.abs(d),dt*40);
  if((d>0&&moneyShown>S.money)||(d<0&&moneyShown<S.money))moneyShown=S.money;renderMoney();
  const el=$('moneyTxt');if(el.classList){el.classList.toggle('up',d>0);el.classList.toggle('down',d<0);}}
function hud(){
  ctxCache=context();sqT-=1/60;if(sqT<=0){sqT=.5;checkQuests();checkBerries();}checkGoal();checkStory();
  const lbl=$('actLbl');if(lbl.textContent!==ctxCache.l){lbl.textContent=ctxCache.l;}
  if(lastActLbl!==ctxCache.l){lastActLbl=ctxCache.l;$('actIco').innerHTML=ctxCache.l==='—'?'':actGlyph(ctxCache.l);}
  actBtn.classList.toggle('dis',!!ctxCache.dis);
  const kb=document.body.classList.contains('kb'),ht=kb&&!ctxCache.dis&&ctxCache.l&&ctxCache.l!=='—'?`[Space] ${ctxCache.l} · ${ctxCache.h||''}`:(ctxCache.h||''),hint=$('actHint');if(hint.textContent!==ht)hint.textContent=ht;
  document.body.classList.toggle('fishing',!!fish||!!rocket||!!sandG);
  const hh=Math.floor(S.t/60)%24,mm=Math.floor((S.t%60)/10)*10;
  const cnt=bagItems().reduce((a,[,n])=>a+n,0);
  const f=festOn(),night=S.t>=1140||S.t<360,wx=S.storm?'storm':S.rain?'rain':night?'moon':'sun';
  const k2=[scene,S.area,mine&&mine.n,S.day,hh,mm,Math.round(S.stam),S.maxStam,wx,cnt,S.bin,f&&f.id].join('|');
  if(k2===hudKey)return;hudKey=k2;
  {const bb=$('busBtn'),ar=scene==='area';if(bb.hidden===ar){bb.hidden=!ar;if(ar)$('busIco').innerHTML=sprOk('x_bus')?`<span style="display:inline-block;width:30px;height:30px;${sprBg('x_bus',30,30)}"></span>`:glyph('flag',26);}$('rideBtn').hidden=!S.horse||ar||scene==='house';}
  $('dayTxt').textContent=scene==='house'?`บ้านของฉัน · ${season().n} วันที่ ${dayOfSeason()}`:scene==='mine'&&mine?`เหมืองชั้น ${mine.n}`:scene==='area'?`${AREAS[S.area].n} · ${season().n} วันที่ ${dayOfSeason()}`:`${season().n} · วันที่ ${dayOfSeason()} ${WEEKDAYS[weekday()]}${f?` · งาน${f.n}`:''}`;
  $('timeTxt').textContent=`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  $('wxIco').innerHTML=glyph(wx,22);$('calBtn').title=S.rain?'ฝนตก':night?'กลางคืน':'แดดดี';
  moneyTarget=S.money;if(moneyShown===null)moneyShown=S.money;renderMoney();
  const r=S.stam/S.maxStam,sb=$('stamBar');sb.style.width=Math.round(r*100)+'%';sb.classList.toggle('low',r<.25);sb.classList.toggle('mid',r>=.25&&r<.5);
  $('stamBtn').title=`แรง ${Math.round(S.stam)}/${S.maxStam}`;
  const bc=$('bagCount');bc.textContent=cnt>99?'99+':cnt;bc.hidden=!cnt;
}

// ---------- loop ----------
let last=performance.now();
function loop(now){
  const raw=Math.min(.05,(now-last)/1000);last=now;frameDt=frameDt*.8+raw*.2;const dt=frameDt;clock+=dt;
  update(dt);
  for(const p of parts)p.t+=dt;
  hud();tickMoney(dt);checkTips(dt);draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
try{if(typeof PWA!=='undefined'&&'serviceWorker' in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});}catch(e){}
setInterval(save,10000);

function openNaming(first){showModal(`<h2>${first?'ยินดีต้อนรับสู่ไร่สุขใจ':'ตั้งชื่อของคุณ'}</h2>
  ${first?'<p>คุณได้รับไร่เก่าของคุณตาต่อ มีพริกสุกรอเก็บ ไก่ วัว และบ่อปลา ชาวบ้านใจดีรออยู่</p>':'<p>ชาวบ้านอยากรู้จักชื่อคุณ</p>'}
  <div class="nameRow"><label>ชื่อของคุณ<input id="pnIn" type="text" maxlength="14" value="${esc(S.pname||'ต้นกล้า')}"></label>
  <label>ชื่อไร่<input id="fmIn" type="text" maxlength="18" value="${esc(S.farm||'ไร่สุขใจ')}"></label></div>
  ${first?'<p class="lv">ทำตามเป้าหมายที่แถบด้านล่าง ระหว่างเล่นจะมีคำแนะนำเด้งขึ้นมาเอง</p>':''}
  <div class="row"><button class="btn" data-namego>${first?'เริ่มทำไร่':'ตกลง'}</button></div>`);}
setTimeout(cloudInit,0);
if(!hadSave)openNaming(true);else if(!S.pname)setTimeout(()=>{if(modal.hidden)openNaming(false);},600);
if(location.protocol==='file:')window.__g={get fish(){return fish},talkLine,openNpc,get holdAct(){return holdAct},set holdAct(v){holdAct=v},get tipQ(){return tipQ},get TS(){return TS},checkUnlocks,openPond,harvestPond,woCheck,woDeliver,giveRelic,RELICS,crowTick,nightPests,enterHouse,leaveHouse,openCarpenter,FURN,openWish,fwBurst,giveBerry,checkBerries,enterMine,openBook,get mine(){return mine},walkToBus,openMuseum,openJudge,startSand,DAED,get busFx(){return busFx},get sandG(){return sandG},enterArea,leaveArea,openBus,busGo,openHut,areaForage,AREAS,get scene(){return scene},openQuests,checkQuests,tapMove,get auto(){return auto},get camX(){return camX},get camY(){return camY},AU,buildAudio,schedule,openEval,evalScore,get S(){return S},set S(v){S=v},openNpc,sleep,openResto,openShip,folks,map,SOLID,applyUnlocks,resetFolks};
})();
