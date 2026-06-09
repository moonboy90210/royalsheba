/* ── NAV SCROLL ─── */
		const nav = document.getElementById('nav');
		const scrollTopBtn = document.getElementById('scroll-top');
		window.addEventListener('scroll', () => {
			nav.classList.toggle('scrolled', window.scrollY > 60);
			scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
		});

		/* ── MOBILE MENU ─── */
		const hamburger = document.getElementById('hamburger');
		const mobileMenu = document.getElementById('mobile-menu');
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('open');
			mobileMenu.classList.toggle('open');
			document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
		});
		function closeMobileMenu() {
			hamburger.classList.remove('open');
			mobileMenu.classList.remove('open');
			document.body.style.overflow = '';
		}

		/* ── SCROLL REVEAL ─── */
		const revealEls = document.querySelectorAll('.reveal');
		const revealObserver = new IntersectionObserver(entries => {
			entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
		}, { threshold: 0.12 });
		revealEls.forEach(el => revealObserver.observe(el));

		/* ── CAROUSEL ─── */
		const track = document.getElementById('carouselTrack');
		const cards = track.querySelectorAll('.testi-card');
		const dotsContainer = document.getElementById('carouselDots');
		let current = 0;
		let perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

		function buildDots() {
			dotsContainer.innerHTML = '';
			const total = Math.ceil(cards.length - perView + 1);
			for (let i = 0; i < total; i++) {
				const d = document.createElement('button');
				d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
				d.setAttribute('aria-label', `Slide ${i + 1}`);
				d.addEventListener('click', () => goTo(i));
				dotsContainer.appendChild(d);
			}
		}

		function goTo(idx) {
			const maxIdx = cards.length - perView;
			current = Math.max(0, Math.min(idx, maxIdx));
			const cardW = cards[0].offsetWidth + 24; // gap 1.5rem = 24px
			track.style.transform = `translateX(-${current * cardW}px)`;
			document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
		}

		document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
		document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

		window.addEventListener('resize', () => {
			perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
			current = 0; buildDots(); goTo(0);
		});
		buildDots();

		// Auto-advance
		setInterval(() => goTo(current + 1 > cards.length - perView ? 0 : current + 1), 5000);

		/* ── FAQ ─── */
		function toggleFaq(btn) {
			const item = btn.closest('.faq-item');
			const isOpen = item.classList.contains('open');
			document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
			if (!isOpen) item.classList.add('open');
		}

		/* ── FORM ─── */
		function submitForm(e) {
			e.preventDefault();
			document.getElementById('orderForm').style.display = 'none';
			document.getElementById('form-success').style.display = 'block';
		}

		/* ── SCROLL TO ORDER ─── */
		function scrollToOrder() {
			document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
		}