(function(){
  document.documentElement.classList.remove('no-js');

  // Mobile nav
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.getElementById('MobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function(){ mobileNav.classList.add('is-open'); });
    mobileNav.querySelectorAll('[data-close-menu]').forEach(function(el){
      el.addEventListener('click', function(){ mobileNav.classList.remove('is-open'); });
    });
  }

  // Cart drawer
  var drawer = document.getElementById('CartDrawer');
  function openDrawer(){ if(drawer){ drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; } }
  function closeDrawer(){ if(drawer){ drawer.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } }
  document.querySelectorAll('[data-open-cart]').forEach(function(el){ el.addEventListener('click', function(e){ e.preventDefault(); refreshCart().then(openDrawer); }); });
  if(drawer){ drawer.querySelectorAll('[data-close]').forEach(function(el){ el.addEventListener('click', closeDrawer); }); }

  function refreshCart(){
    return fetch('/cart?view=drawer', { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function(r){ return r.text(); })
      .then(function(html){
        var body = document.getElementById('CartDrawerBody');
        if(body){ body.innerHTML = html; }
        updateCartCount();
      });
  }

  function updateCartCount(){
    fetch('/cart.js').then(function(r){return r.json();}).then(function(c){
      document.querySelectorAll('[data-cart-count]').forEach(function(el){ el.textContent = c.item_count; el.classList.toggle('hidden', c.item_count===0); });
    });
  }
  updateCartCount();

  // AJAX add-to-cart
  document.addEventListener('submit', function(e){
    var form = e.target.closest('form[action*="/cart/add"]');
    if(!form) return;
    e.preventDefault();
    var data = new FormData(form);
    fetch('/cart/add.js', { method:'POST', body:data, headers:{'X-Requested-With':'XMLHttpRequest'} })
      .then(function(r){ return r.json(); })
      .then(function(){ refreshCart().then(openDrawer); });
  });

  // Quantity buttons
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-qty]');
    if(!btn) return;
    var input = btn.parentNode.querySelector('input[name="quantity"]');
    if(!input) return;
    var v = parseInt(input.value,10) || 1;
    v += parseInt(btn.dataset.qty, 10);
    if(v < 1) v = 1;
    input.value = v;
  });

  // Pricing tabs
  document.querySelectorAll('[data-pricing-tabs]').forEach(function(group){
    var tabs = group.querySelectorAll('[data-tab]');
    var panels = group.querySelectorAll('[data-panel]');
    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        var key = t.dataset.tab;
        tabs.forEach(function(x){ x.classList.toggle('is-active', x===t); });
        panels.forEach(function(p){ p.classList.toggle('is-active', p.dataset.panel===key); });
      });
    });
  });

  // PDP thumbnails
  document.querySelectorAll('[data-gallery]').forEach(function(g){
    var main = g.querySelector('[data-main-img]');
    g.querySelectorAll('[data-thumb]').forEach(function(t){
      t.addEventListener('click', function(){
        if(main){ main.src = t.dataset.thumb; }
        g.querySelectorAll('[data-thumb]').forEach(function(x){ x.classList.toggle('is-active', x===t); });
      });
    });
  });

  // PDP variant select (Shopify product JSON)
  document.querySelectorAll('[data-product-form]').forEach(function(form){
    var data = window.ProductJSON && window.ProductJSON[form.dataset.productForm];
    if(!data) return;
    var selects = form.querySelectorAll('select[data-option]');
    var variantInput = form.querySelector('input[name="id"]');
    var priceEl = document.querySelector('[data-current-price]');
    function findVariant(){
      var chosen = Array.from(selects).map(function(s){ return s.value; });
      return data.variants.find(function(v){
        return v.options.every(function(o, i){ return o === chosen[i]; });
      });
    }
    function update(){
      var v = findVariant();
      if(!v) return;
      variantInput.value = v.id;
      if(priceEl){ priceEl.innerHTML = (v.price/100).toLocaleString('en-US', { style:'currency', currency: window.ShopCurrency || 'USD' }); }
    }
    selects.forEach(function(s){ s.addEventListener('change', update); });
  });

  // Sticky book link — set to active location URL if cookie set
  var sticky = document.getElementById('StickyBook');
  if(sticky){
    var pref = localStorage.getItem('hht_loc_url');
    if(pref) sticky.href = pref;
    else sticky.href = sticky.dataset.defaultUrl || '#';
  }
  document.querySelectorAll('[data-set-loc]').forEach(function(el){
    el.addEventListener('click', function(){ localStorage.setItem('hht_loc_url', el.href); });
  });
})();
