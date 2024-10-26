'use strict';

// nav menu
const hamburger = document.querySelector('.hamburger');
const nav_list = document.querySelector('.nav_list');
const nav_links = document.querySelectorAll('.nav_link');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	nav_list.classList.toggle('active');
});

nav_links.forEach(link => {
	link.addEventListener('click', e => {
		e.stopPropagation();
		hamburger.classList.toggle('active');
		nav_list.classList.toggle('active');
	});
});

// scroll up
const scrollUp = document.querySelector('.scrollup');
window.addEventListener('scroll', () => {
	this.scrollY >= 200
		? scrollUp.classList.add('active')
		: scrollUp.classList.remove('active');
});

scrollUp.addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
});
