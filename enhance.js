(()=>{
const main=document.getElementById('main'),side=document.getElementById('halc-sidebar');
const logo='<img class="brand-logo" src="assets/halc-logo.png" alt="함안지방공사 마크">';
document.querySelector('header .brand-mark').outerHTML=logo;
side.querySelector('.side-brand').innerHTML=logo+'<span>함안지방공사<small>통합안전관리</small></span>';
side.querySelector('.side-bottom').insertAdjacentHTML('afterbegin','<a href="#usage"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20V12h3v8M11 20V5h3v15M18 20V9h3v11"/></svg>이용 현황</a>');
const nav=side.querySelector('nav');
const participation=nav.querySelector('a[href="#participate"]');
const helper=participation.cloneNode(true);helper.href='#near-miss';helper.querySelector('span').textContent='아차사고 작성 도우미';nav.append(helper);
participation.querySelector('span').textContent='아차사고·안전제안 안내';
const groups=[['작업 안전 도구',['tasks','tbm','near-miss','heat']],['안전정보 자료',['search','cases']],['직원 참여',['participate']]];
for(const [title,ids] of groups){const label=document.createElement('div');label.className='nav-category';label.textContent=title;nav.append(label);for(const id of ids)nav.append(nav.querySelector(`a[href="#${id}"]`));}
const adminLabel=document.createElement('div');adminLabel.className='nav-category';adminLabel.textContent='관리자';side.querySelector('.side-bottom').prepend(adminLabel);
side.querySelector('.side-bottom a[href="#policy"]').insertAdjacentHTML('beforebegin','<div class="nav-category">이용 안내</div>');
function enhance(){

 main.querySelectorAll('.service-tile:not([data-icon])').forEach(a=>{a.dataset.icon='1';let hash=a.hash;const svg=side.querySelector(`a[href="${hash}"] svg`);if(svg){let el=document.createElement('span');el.className='menu-symbol';el.innerHTML=svg.outerHTML;a.prepend(el)}});
 if(main.dataset.view==='home'&&!main.querySelector('.participation-banner')){let el=document.createElement('a');el.href='#participate';el.className='participation-banner';el.innerHTML='<div><span class="capsule">상시 안전소통</span><h3>작은 발견이 더 안전한 일터를 만듭니다.</h3><p>아차사고 경험과 안전을 위한 개선 아이디어를 알려주세요.</p></div><b>참여 방법·양식 보기 →</b>';main.querySelector('.home-layout')?.after(el)}
 if(main.dataset.view==='home'&&!main.querySelector('.home-categories')){
 const layout=main.querySelector('.home-layout');if(layout){
 const area=document.createElement('div');area.className='home-categories';
 const quick=layout.querySelector('.quick-task');if(quick){quick.querySelector('h2').textContent='오늘의 작업은 무엇인가요?';quick.querySelector('.quick-head p').textContent='작업에 맞는 위험요인과 예방대책을 찾아보세요.';area.append(quick);}
 const makeSection=(title,ids,cls)=>{const section=document.createElement('section');section.className='home-category '+cls;const h=document.createElement('h2');h.textContent=title;section.append(h);const grid=document.createElement('div');grid.className='service-grid';for(const id of ids){const card=layout.querySelector(`.service-tile[href="#${id}"]`);if(card){if(id==='near-miss')card.querySelector('h2').textContent='아차사고 작성 도우미';grid.append(card)}}section.append(grid);area.append(section);return section};
 const tools=makeSection('작업 안전 도구',['tasks','tbm','near-miss','heat'],'tools-section');const shortcut=layout.querySelector('.shortcut-row');if(shortcut)tools.append(shortcut);
 makeSection('안전정보 자료',['search','cases'],'resources-section');
 const banner=main.querySelector('.participation-banner');if(banner){const section=document.createElement('section');section.className='home-category participation-section';section.innerHTML='<h2>직원 참여</h2>';section.append(banner);area.append(section)}
 const bottom=main.querySelector('.home-bottom');if(bottom){const section=document.createElement('section');section.className='home-category';section.innerHTML='<h2>이용 안내</h2>';section.append(bottom);area.append(section)}
 layout.replaceWith(area);
 }
 }
 if(main.dataset.view==='near-miss'&&!main.querySelector('.participation-link')){const link=document.createElement('a');link.className='button participation-link';link.href='#participate';link.textContent='신고 방법·양식 보기 →';main.querySelector('.intro')?.after(link);}
 const emblem=main.querySelector('.policy-emblem');if(emblem&&!emblem.querySelector('img'))emblem.innerHTML=logo;
 side.querySelectorAll('a').forEach(a=>{let active=a.hash==='#'+(main.dataset.view==='tbm-edit'?'tbm':main.dataset.view);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
}
new MutationObserver(enhance).observe(main,{childList:true,subtree:true});enhance();
})();
