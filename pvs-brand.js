(function(){
  const navItems=[
    ['HOME','index.html'],
    ['ABOUT','screen-5-executive-summary.html'],
    ['DOCUMENTS','screen-6-filters-export.html'],
    ['INSIGHTS','screen-12-cohort-analytics.html'],
    ['TOOLS','screen-1-timeline.html'],
    ['PVS ASSISTANT','screen-8-generate-roadmap.html'],
    ['NOTIFICATIONS','screen-10-notifications.html']
  ];

  function logoMarkup(){
    return `
      <div class="pvs-wordmark">
        <div class="pvs-mark" aria-hidden="true"><span class="pvs-logo-lines"></span></div>
        <div class="pvs-wordmark-text">World Organisation<br>for Animal Health</div>
      </div>
      <div class="pvs-brand-divider" aria-hidden="true"></div>
      <div class="pvs-system-name">PVSIS</div>
    `;
  }

  function userMarkup(){
    return `
      <div class="pvs-user-zone" aria-label="Current user">
        <div>
          <div class="pvs-user-role">Business Admin</div>
          <div class="pvs-user-name">(Business Admin)</div>
          <div class="pvs-user-icons" aria-hidden="true">◎ ✉ ♢</div>
          <div class="pvs-user-langs">| <u>EN</u> | FR | ES</div>
        </div>
        <div class="pvs-avatar" aria-hidden="true">●</div>
      </div>
    `;
  }

  function ensureHeader(){
    const header=document.querySelector('header');
    if(!header) return;
    let brand=header.querySelector('.header-brand');
    if(!brand){
      brand=document.createElement('div');
      brand.className='header-brand flex items-center gap-2.5 flex-shrink-0 px-4';
      header.prepend(brand);
    }
    brand.innerHTML=logoMarkup();

    header.querySelectorAll('.pvs-user-zone').forEach(node=>node.remove());
    header.insertAdjacentHTML('beforeend',userMarkup());
  }

  function ensureNav(){
    const header=document.querySelector('header');
    if(!header) return;
    document.querySelectorAll('.nav-list,.nav-screen-list').forEach(node=>node.remove());

    const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    const nav=document.createElement('nav');
    nav.className='nav-list';
    nav.setAttribute('aria-label','PVSIS primary navigation');
    navItems.forEach(([label,href])=>{
      const item=document.createElement(href.toLowerCase()===current?'span':'a');
      item.className='nav-screen px-2.5 py-1 rounded-md';
      item.textContent=label;
      if(href.toLowerCase()===current){
        item.classList.add('current');
        item.setAttribute('aria-current','page');
      }else{
        item.href=href;
      }
      nav.appendChild(item);
    });
    header.appendChild(nav);
  }

  function footerMarkup(){
    return `
      <footer class="pvs-footer">
        <div class="pvs-footer-brand">
          <div class="pvs-mark" aria-hidden="true"><span class="pvs-logo-lines"></span></div>
          <div class="pvs-footer-title">World Organisation<br>for Animal Health</div>
        </div>
        <div class="pvs-footer-rule"></div>
        <div class="pvs-footer-grid">
          <div class="pvs-footer-col">
            <div class="pvs-footer-heading">REGIONS</div>
            <a class="pvs-footer-link" href="#">Africa</a>
            <a class="pvs-footer-link" href="#">Americas</a>
            <a class="pvs-footer-link" href="#">Asia and the pacific</a>
            <a class="pvs-footer-link" href="#">Europe</a>
            <a class="pvs-footer-link" href="#">Middle East</a>
          </div>
          <div class="pvs-footer-col">
            <div class="pvs-footer-heading">WOAH</div>
            <a class="pvs-footer-link" href="#">Contact Us</a>
            <a class="pvs-footer-link" href="#">Career</a>
            <a class="pvs-footer-link" href="#">Procurement</a>
          </div>
          <div class="pvs-footer-col">
            <div class="pvs-footer-heading">FOLLOW US</div>
            <div class="pvs-footer-social" aria-hidden="true"><span>f</span><span>t</span><span>in</span><span>◎</span><span>▶</span><span>••</span></div>
          </div>
          <div class="pvs-footer-col"></div>
        </div>
        <div class="pvs-footer-rule"></div>
        <div class="pvs-footer-bottom">
          <a class="pvs-footer-link" href="#">Terms &amp; Conditions</a>
          <a class="pvs-footer-link" href="#">Privacy Policy</a>
          <span>Copyright © World Organisation for Animal Health 2026</span>
          <span class="pvs-footer-version">v1.2.0&nbsp;&nbsp;&nbsp;&nbsp;XX</span>
        </div>
      </footer>
    `;
  }

  function ensureFooter(){
    if(document.querySelector('.pvs-footer')) return;
    document.body.insertAdjacentHTML('beforeend',footerMarkup());
  }

  function decorateModuleCards(){
    document.querySelectorAll('.hub-card').forEach((card,index)=>{
      card.classList.add('pvs-module-card');
      if(index===0) card.classList.add('pvs-module-card-red');
      else if(index%3===1) card.classList.add('pvs-module-card-green');
      else card.classList.add('pvs-module-card-blue');
    });
  }

  function setupScrollHeader(){
    let lastScrollY=window.scrollY;
    let queued=false;

    function update(){
      const currentScrollY=window.scrollY;
      const movement=currentScrollY-lastScrollY;
      if(currentScrollY<=12 || movement<-2){
        document.body.classList.remove('pvs-header-hidden');
      }else if(movement>2){
        document.body.classList.add('pvs-header-hidden');
      }
      lastScrollY=currentScrollY;
      queued=false;
    }

    window.addEventListener('scroll',()=>{
      if(!queued){
        queued=true;
        window.requestAnimationFrame(update);
      }
    },{passive:true});
  }

  function boot(){
    const currentPage=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(currentPage==='screen-11-mobile.html'){
      document.body.classList.add('pvs-mobile-screen');
      return;
    }
    document.body.classList.add('pvs-shell-ready');
    ensureHeader();
    ensureNav();
    decorateModuleCards();
    ensureFooter();
    setupScrollHeader();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
