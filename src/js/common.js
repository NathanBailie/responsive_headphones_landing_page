'use strict';

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
