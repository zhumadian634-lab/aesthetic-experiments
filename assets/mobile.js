/* Mobile layer for the GitHub Pages copy: finger paging, desktop untouched. */
(function () {
  'use strict';

  var isTouch = window.matchMedia('(pointer:coarse)').matches || innerWidth < 900;
  if (!isTouch) return;

  var root = document.documentElement;
  var nav = null, hint = null, idle = null;
  var list = [], mode = 'scroll';

  function sections() {
    var sels = ['.page', '.s', 'section.stage', 'section.slide'];
    for (var i = 0; i < sels.length; i++) {
      var found = [].slice.call(document.querySelectorAll(sels[i]));
      found = found.filter(function (el) {
        return el.getBoundingClientRect().height >= innerHeight * 0.55;
      });
      if (found.length) return found;
    }
    return [];
  }

  function nearest() {
    var best = 0, bd = Infinity;
    for (var i = 0; i < list.length; i++) {
      var d = Math.abs(list[i].getBoundingClientRect().top);
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }

  function key(dir) {
    var k = dir > 0 ? 'ArrowRight' : 'ArrowLeft';
    var code = dir > 0 ? 39 : 37;
    var ev = new KeyboardEvent('keydown', {
      key: k, code: k, keyCode: code, which: code,
      bubbles: true, cancelable: true
    });
    // dispatch from body so e.target.closest(...) guards in deck code don't throw
    (document.body || document.documentElement).dispatchEvent(ev);
  }

  function step(dir) {
    if (mode === 'keys') {
      key(dir);
    } else {
      var i = nearest() + dir;
      if (i < 0 || i >= list.length) return;
      list[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    wake();
  }

  function wake() {
    if (!nav) return;
    nav.classList.add('show');
    clearTimeout(idle);
    idle = setTimeout(function () { nav.classList.remove('show'); }, 3400);
  }

  function buildNav() {
    nav = document.createElement('div');
    nav.id = 'mnav';
    nav.innerHTML =
      '<button type="button" data-mnav="-1" aria-label="上一页">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      '<button type="button" data-mnav="1" aria-label="下一页">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>';
    document.body.appendChild(nav);
    root.classList.add('mnav-on');

    // keep page-level touch handlers away from the buttons
    ['touchstart', 'pointerdown'].forEach(function (t) {
      nav.addEventListener(t, function (e) { e.stopPropagation(); }, true);
    });
    nav.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-mnav]') : null;
      if (!b) return;
      e.preventDefault();
      step(parseInt(b.getAttribute('data-mnav'), 10));
    });
    wake();
  }

  function showHint() {
    if (sessionStorage.getItem('mnav-hint')) return;
    if (innerHeight <= innerWidth) return; // already landscape: nothing to warn about
    sessionStorage.setItem('mnav-hint', '1');
    hint = document.createElement('div');
    hint.id = 'mhint';
    hint.textContent = mode === 'keys'
      ? '建议横屏 · 左右滑动或点右下箭头翻页'
      : '横屏更清楚 · 上下滑动或点右下箭头翻页';
    document.body.appendChild(hint);
    requestAnimationFrame(function () { hint.classList.add('show'); });
    setTimeout(function () {
      hint.classList.remove('show');
      setTimeout(function () { if (hint && hint.parentNode) hint.parentNode.removeChild(hint); }, 700);
    }, 4200);
  }

  function init() {
    var scrollable = root.scrollHeight > innerHeight * 1.3;
    var deck = document.querySelectorAll('section.slide').length > 1;
    list = sections();

    if (scrollable && list.length > 1) {
      mode = 'scroll';
      root.classList.add('mnav-snap');
    } else if (!scrollable && deck) {
      mode = 'keys';
    } else {
      return; // single-stage film or plain page: leave it exactly as authored
    }
    buildNav();
    showHint();
  }

  var rt = null;
  function remeasure() {
    clearTimeout(rt);
    rt = setTimeout(function () {
      list = sections();
      var scrollable = root.scrollHeight > innerHeight * 1.3;
      if (mode === 'scroll') {
        root.classList.toggle('mnav-snap', scrollable && list.length > 1);
      }
    }, 250);
  }

  addEventListener('resize', remeasure);
  addEventListener('orientationchange', remeasure);
  addEventListener('scroll', function () { if (nav) wake(); }, { passive: true });

  // sections may be sized after fonts/layout settle
  if (document.readyState === 'complete') init();
  else addEventListener('load', init);
  setTimeout(function () { if (!nav && !root.classList.contains('mnav-on')) init(); }, 1500);
})();
