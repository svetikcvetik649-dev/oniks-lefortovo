(function () {
  var $ = function (id) { return document.getElementById(id); };
  var rub = function (n) { return n.toLocaleString('ru-RU').replace(/ | /g, ' ') + ' ₽'; };

  /* ворота-ролет открываются один раз */
  var sh = $('shutter');
  if (sh && document.documentElement.classList.contains('js')) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { sh.classList.add('is-gone'); }
    else {
      setTimeout(function () { sh.classList.add('is-open'); }, 450);
      setTimeout(function () { sh.classList.add('is-gone'); }, 2200);
    }
  }

  /* часы по Москве: мастерская работает круглосуточно */
  var clock = $('clock');
  if (clock) {
    var tick = function () {
      try {
        var s = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit' });
        clock.textContent = 'Круглосуточно, сейчас ' + s + ' по Москве';
      } catch (e) {}
    };
    tick(); setInterval(tick, 30000);
  }

  /* цена по радиусу: выбор строки обновляет панель и текст для WhatsApp */
  var form = $('rad');
  if (!form) return;
  var WA = 'https://wa.me/79255779046';
  function update() {
    var c = form.querySelector('input:checked');
    if (!c) return;
    var r = 'R' + c.value, p = +c.dataset.p, s = +c.dataset.s;
    $('pick-r').textContent = r;
    $('pick-p').textContent = rub(p);
    $('pick-s').textContent = rub(s);
    var msg = 'Здравствуйте! Хочу переобуться на ' + r + ' (по прайсу ' + rub(p) + '). Когда можно подъехать?';
    $('pick-wa').href = WA + '?text=' + encodeURIComponent(msg);
  }
  form.addEventListener('change', update);
  update();
})();
