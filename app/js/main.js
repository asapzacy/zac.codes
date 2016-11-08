'use strict';

(function () {

  require('es6-promise').polyfill()
  require('isomorphic-fetch')

  // pixels + findArea function
  var findArea = function findArea() {
    var code = document.querySelector('.js_pixels');
    if (code && code.textContent !== null) {
      var area = window.innerWidth * window.innerHeight;
      area = String(area).replace(/(?=(?:\d{3})+\b)(?!\b)/g, ',');
      code.textContent = area;
    }
  };
  window.addEventListener('load', findArea, { passive: true });
  window.addEventListener('resize', findArea, { passive: true });

  // menu button + navigation
  var header = document.querySelector('header');
  var menuBtn = document.querySelector('.js_menu-btn');
  menuBtn.addEventListener('click', function () {
    header.classList.toggle('menu-open');
  });

  // state + page navigation
  var navItems = document.querySelectorAll('.menu-nav a');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function (e) {
      e.preventDefault();
      header.classList.remove('menu-open');
      if (e.currentTarget.pathname !== location.pathname) {
        history.pushState(null, null, e.currentTarget.pathname);
        updatePage();
      }
    });
  }

  window.addEventListener('popstate', updatePage);

  var main = document.querySelector('main');
  function updatePage() {
    var url = window.location.href;
    loadPage(url).then(function (responseText) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = responseText;
      var oldPage = document.querySelector('.page');
      var newPage = wrapper.querySelector('.page');
      document.title = wrapper.getElementsByTagName('title')[0].innerHTML;
      main.removeChild(oldPage);
      main.appendChild(newPage);
      fade(newPage, true);
      specificPage();
      if (location.pathname === '/' || location.pathname === '/index.html') {
        findArea();
      }
    });
  }

  // fade any element in + out
  function fade(el, dir) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;

    dir ? el.style.opacity = 0 : el.style.opacity = 1;
    dir ? fadeIn() : fadeOut();
    function fadeIn() {
      if (el.style.opacity < 1) {
        setTimeout(function () {
          el.style.opacity = +el.style.opacity + 0.05;
          fadeIn();
        }, speed);
      }
    }
    function fadeOut() {
      if (el.style.opacity > 0) {
        setTimeout(function () {
          el.style.opacity = +el.style.opacity - 0.05;
          fadeOut();
        }, speed);
      }
    }
  }

  // fetch get + load + cache new url
  var cache = {};
  function loadPage(url) {
    if (cache[url]) {
      return Promise.resolve(cache[url]);
    }
    return fetch(url).then(function (response) {
      if (response.ok) {
        cache[url] = response.text();
        return cache[url];
      } else {
        console.log('network response was not ok.');
      }
    }).catch(function (err) {
      return console.log('there has been an error requesting (' + url + '): ' + err.message);
    });
  }

  // projects page specific functions
  function runProjects() {
    (function () {

      // click on image + full screen modal
      var preview = document.querySelector('.js_preview');
      var img = preview.querySelector('img');
      var figure = preview.querySelector('figure');
      preview.addEventListener('click', function (e) {
        e.preventDefault();
        var caption = preview.querySelector('figcaption');
        var img = preview.querySelector('img');
        var x = preview.querySelector('.x');
        var expanded = false;
        console.log(e.target);
        if (!preview.classList.contains('fullscreen') && e.target === img) {
          preview.classList.add('fullscreen');
          menuBtn.style.display = 'none';
          fade(figure, true, 40);
        }
        if (preview.classList.contains('fullscreen') && e.target !== img && e.target !== caption && e.target !== figure) {
          preview.classList.remove('fullscreen');
          menuBtn.style.display = 'block';
        }
      });
    })();
  }

  // run functions specific to their page
  window.addEventListener('load', specificPage);
  function specificPage() {
    var path = location.pathname;
    if (path === '/' || path === '/index.html') {
      console.log('home');
    } else if (path.startsWith('/about')) {
      console.log('about');
    } else if (path.startsWith('/projects')) {
      runProjects();
      console.log('projects');
    } else {
      console.log('wut');
    }
  }

  // scroll to top
  var arrow = document.querySelector('.top');
  if (arrow) {
    arrow.addEventListener('click', function () {
      scrollToTop(this.parentNode);
    });
  }
  function scrollToTop(el) {
    if (el.scrollTop !== 0) {
      setTimeout(function () {
        el.scrollTop = el.scrollTop - 25;
        scrollToTop(el);
      }, 0);
    }
  }

  function x(el) {
    var ex = topArrow;
    var diff = ex.parentNode.scrollHeight - ex.parentNode.scrollTop;
    var q = ex.getBoundingClientRect().bottom;
    // console.log(diff)
    ex.classList.add('hide');
    ex.classList.remove('show');
    if (diff <= 475) {
      ex.classList.add('show');
      ex.classList.remove('hide');
    }
  }
  var page = document.querySelector('.about');
  page.addEventListener('scroll', x);
})();
