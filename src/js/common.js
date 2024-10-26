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
scrollUp.addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
});

// activate menu link by scrolling sections
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
	const scrollY = this.scrollY;

	sections.forEach(section => {
		const sectionHeight = section.offsetHeight;
		const sectionTop = section.offsetTop - 50;
		const sectionId = section.getAttribute('id');

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector('.nav_list a[href*=' + sectionId + ']')
				.classList.add('active');
		} else {
			document
				.querySelector('.nav_list a[href*=' + sectionId + ']')
				.classList.remove('active');
		}
	});

	// scroll up
	this.scrollY >= 200
		? scrollUp.classList.add('active')
		: scrollUp.classList.remove('active');
});
