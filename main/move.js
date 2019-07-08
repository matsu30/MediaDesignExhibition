function toggleNav() {
	var body = document.body;
	var hamburger = document.getElementById('js-hamburger');
	var blackBg = document.getElementById('js-black-bg');
	var menu1 = document.getElementById('js-menu--1');
	var menu2 = document.getElementById('js-menu--2');
  
	hamburger.addEventListener('click', function() {
		body.classList.toggle('nav-open');
		body.classList.remove('nav-open-1');
		body.classList.remove('nav-open-2');
	});
	blackBg.addEventListener('click', function() {
		body.classList.remove('nav-open');
		body.classList.remove('nav-open-1');
		body.classList.remove('nav-open-2');
	});

	menu1.addEventListener('click', function() {
		body.classList.remove('nav-open-2');
		body.classList.toggle('nav-open-1');
	});

	menu2.addEventListener('click', function() {
		body.classList.remove('nav-open-1');
		body.classList.toggle('nav-open-2');
	});

  }
  
  toggleNav();
  