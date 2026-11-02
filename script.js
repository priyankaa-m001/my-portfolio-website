// Typewriter
        (function () {
            var el = document.getElementById('typewriter');
            var text = 'Hi, I am Priyanka, a Frontend Developer';
            var i = 0;
            function type() { if (i < text.length) { el.textContent += text[i++]; setTimeout(type, 55); } }
            setTimeout(type, 400);
        })();

        // Hamburger
        var hamburger = document.getElementById('hamburger');
        var navLinks = document.getElementById('nav-links');
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });

        // Active nav
        var sections = document.querySelectorAll('section[id]');
        var navItems = document.querySelectorAll('nav a[data-section]');
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id;
                    navItems.forEach(function (a) { a.classList.toggle('active', a.dataset.section === id); });
                }
            });
        }, { threshold: 0.35 });
        sections.forEach(function (s) { navObserver.observe(s); });

        // Scroll reveal (fallback: show everything if IntersectionObserver is unavailable)
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal, .project-item').forEach(function (el) { el.classList.add('visible'); });
        }
        var revealEls = document.querySelectorAll('.reveal');
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { revealObserver.observe(el); });

        // Project stagger
        var projectItems = document.querySelectorAll('.project-item');
        var projectObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var idx = Array.from(projectItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = (idx * 0.1) + 's';
                    entry.target.classList.add('visible');
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        projectItems.forEach(function (el) { projectObserver.observe(el); });

        // Footer year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Back to top
        var btt = document.getElementById('back-to-top');
        window.addEventListener('scroll', function () { btt.classList.toggle('show', window.scrollY > 300); }, { passive: true });
        btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
