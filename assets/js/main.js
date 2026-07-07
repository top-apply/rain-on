
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
const more = document.querySelector('.more');
if (more){
  const btn = more.querySelector('.more-btn');
  const menu = more.querySelector('.dropdown');
  const show = (v)=>{ menu.style.display = v ? 'block' : 'none'; btn.setAttribute('aria-expanded', v? 'true':'false'); };
  btn?.addEventListener('click', e => { e.stopPropagation(); show(menu.style.display!=='block'); });
  document.addEventListener('click', () => show(false));
}

window.fakeSubmit = (e) => {
  if (e) e.preventDefault();
  alert('Thanks! This demo does not store data.');
};

document.querySelectorAll('.newsletter').forEach(form => {
  if (!form.hasAttribute('onsubmit')) {
    form.addEventListener('submit', window.fakeSubmit);
  }
});

const toTop = document.querySelector('.to-top');
if (toTop && !toTop.hasAttribute('onclick')) {
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-toc]').forEach(container => {
    const hs = Array.from(document.querySelectorAll('h2, h3')).filter(h => h.id && !h.closest('.toc'));
    const list = document.createElement('div');
    hs.forEach(h => { const a = document.createElement('a'); a.href = `#${h.id}`; a.textContent = h.textContent; a.style.marginLeft = h.tagName==='H3' ? '12px' : '0'; list.appendChild(a); });
    container.appendChild(list);
  });

  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'block';
    document.getElementById('accept-cookies')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  const vModal = document.getElementById('verification-modal');
  if (vModal) {
    if (!vModal.open) vModal.showModal();
    // Action to take after verification (currently closes modal)
    const complete = () => window.location.href = 'https://rankhive.online/';
    document.getElementById('verify-btn')?.addEventListener('click', complete);
    document.getElementById('enter-btn')?.addEventListener('click', complete);
    
    setTimeout(() => {
      const spinner = vModal.querySelector('.spinner');
      const text = vModal.querySelector('div:nth-of-type(2)');
      if (spinner) {
        spinner.className = 'checkmark-icon';
        spinner.innerHTML = '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
      }
      if (text) { text.textContent = 'Successfully Verified'; text.style.color = '#10b981'; text.style.fontWeight = '600'; }
      setTimeout(complete, 1500);
    }, 5000);
  }
});
