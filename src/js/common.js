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

// animations
const sr = ScrollReveal({
	distance: '60px',
	duration: 2500,
	delay: 400,
	// reset: true
});

// titles
sr.reveal(`.home_title, .home_subtitle, .title`, { delay: 600 });

// descriptions
sr.reveal(`.home_info-title, .home_description, .home_bag`, {
	delay: 800,
	origin: 'bottom',
});
sr.reveal(`.specs_info`, { delay: 700, origin: 'left', interval: 100 });
sr.reveal(`.case_info-wrapper`, { delay: 700, origin: 'right' });
sr.reveal(`.discount_text-wrapper`, { delay: 700, origin: 'left' });
sr.reveal(`.footer_links`, { delay: 700, origin: 'bottom', interval: 100 });
sr.reveal(`.footer_form`, { delay: 700, origin: 'top' });

// // images
sr.reveal(`.home_image-wrapper`, { delay: 900, origin: 'top' });
sr.reveal(`.case_image-wrapper`, { delay: 900, origin: 'left' });
sr.reveal(`.discount_image-wrapper`, { delay: 900, origin: 'right' });
sr.reveal(`.specs_img-wrapper`, { delay: 900, origin: 'right' });
sr.reveal(`.products_item`, { delay: 900, origin: 'bottom', interval: 100 });
sr.reveal(`.sponsors_img`, { delay: 900, origin: 'bottom', interval: 100 });
sr.reveal(`.footer_social-link`, {
	delay: 900,
	origin: 'bottom',
	interval: 100,
});
