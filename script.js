document.addEventListener('DOMContentLoaded', function() {

    function startAnniversaryCountdown() {
        const countdownElement = document.getElementById('anniversary-countdown');
        if (!countdownElement) return;

        const anniversaryDate = new Date('June 16, 2025 00:00:00 GMT+0530').getTime();

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = anniversaryDate - now;

            if (distance < 0) {
                clearInterval(interval);
                daysEl.innerText = 0;
                hoursEl.innerText = 0;
                minutesEl.innerText = 0;
                secondsEl.innerText = 0;
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days;
            hoursEl.innerText = hours;
            minutesEl.innerText = minutes;
            secondsEl.innerText = seconds;
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    function startQuoteRotator() {
        const quoteRotatorElement = document.getElementById('quote-rotator');
        if (!quoteRotatorElement) return;
        const textElement = quoteRotatorElement.querySelector('.quote-text');
        const authorElement = quoteRotatorElement.querySelector('.quote-author');
        if (!textElement || !authorElement) return;

        const quotes = [
            { text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.", author: "Angelita Lim" },
            { text: "Tu hai, toh ham hain. Ham hain, toh main hu. Aur main hu, bas tere liye", author: "Sau" },
            { text: "If I know what love is, it is because of you.", author: "Hermann Hesse" },
            { text: "I would rather spend one lifetime with you than face all the ages of this world alone.", author: " J.R.R. Tolkien" },
            { text: "Love is the whole thing. We are only pieces.", author: "Rumi" },
            { text: "I never want to stop making memories with you.", author: "Pierre Jeanty" },
            { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known—and even that is an understatement.", author: "F. Scott Fitzgerald" }
        ];

        let currentQuoteIndex = 0;

        const displayQuote = () => {
            const quote = quotes[currentQuoteIndex];

            quoteRotatorElement.classList.remove('fade-in');
            quoteRotatorElement.classList.add('fade-out');

            setTimeout(() => {
                textElement.innerText = `“${quote.text}”`;
                authorElement.innerText = `— ${quote.author}`;

                quoteRotatorElement.classList.remove('fade-out');
                quoteRotatorElement.classList.add('fade-in');

            }, 400);

            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        };

        quoteRotatorElement.classList.add('fade-in');
        displayQuote();
        setInterval(displayQuote, 8000);
    }

    function setupTimeline() {
        const timelineContainer = document.getElementById('love-timeline');
        if (!timelineContainer) return;
        console.log("Timeline initialized. Content is currently static in HTML.");
    }

     function setFooterYear() {
        const yearElement = document.getElementById('footer-year');
        if (yearElement) {
            yearElement.innerText = new Date().getFullYear();
        }
     }

    function setupMobileMenu() {
        const menuButton = document.querySelector('[data-js-target="SiteHeader.menuButton"]');
        const mobileMenuControllerEl = document.querySelector('[data-js-controller="MobileMenu"]');
        const siteHeader = document.querySelector('.SiteHeader');

        if (!menuButton || !mobileMenuControllerEl || !siteHeader) return;

        const closeButton = mobileMenuControllerEl.querySelector('[data-js-target="MobileMenu.closeButton"]');

        const toggleMenu = (event) => {
            if (event) event.preventDefault();
            const isVisible = siteHeader.classList.toggle('SiteHeader--mobileMenuVisible');
            mobileMenuControllerEl.setAttribute('aria-hidden', !isVisible);
            document.body.classList.toggle('MktBody--noScroll', isVisible);
        };

        menuButton.addEventListener('click', toggleMenu);
        if (closeButton) {
            closeButton.addEventListener('click', toggleMenu);
        }

        mobileMenuControllerEl.querySelectorAll('.MobileMenu__navList a').forEach(link => {
            link.addEventListener('click', (e) => {
                 if (siteHeader.classList.contains('SiteHeader--mobileMenuVisible')) {
                    toggleMenu(null);
                 }
            });
        });
    }

    startAnniversaryCountdown();
    startQuoteRotator();
    setupTimeline();
    setFooterYear();
    setupMobileMenu();

    const timelineContainer = document.getElementById('love-timeline');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCloseButton = lightbox.querySelector('.lightbox-close');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

    function openLightbox(imageSrc) {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.setAttribute('src', imageSrc);
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-no-scroll');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-no-scroll');
        setTimeout(() => {
             if (!lightbox.classList.contains('active')) {
                 lightboxImage.setAttribute('src', '');
             }
        }, 500);
    }

    if (timelineContainer) {
        timelineContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('timeline-photo')) {
                event.preventDefault();
                const imageSrc = event.target.getAttribute('src');
                if (imageSrc) {
                    openLightbox(imageSrc);
                }
            }
        });
    }

    if (lightboxCloseButton) {
        lightboxCloseButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeLightbox();
        });
    }

    if (lightboxOverlay) {
         lightboxOverlay.addEventListener('click', function() {
            closeLightbox();
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});