document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hero Slider
    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Initialize Testimonials Slider
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Initialize Mobile Sliders
    let destinationsSlider, hotelsSlider, gallerySlider, reviewsSlider;

    function initMobileSliders() {
        if (window.innerWidth <= 767) {
            if (!destinationsSlider) {
                destinationsSlider = new Swiper('.destinations-slider', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
            if (!hotelsSlider) {
                hotelsSlider = new Swiper('.hotels-slider', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
            if (!gallerySlider) {
                gallerySlider = new Swiper('.gallery-slider', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
            if (!reviewsSlider) {
                reviewsSlider = new Swiper('.reviews-slider', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
        } else {
            // Destroy sliders on larger screens to prevent conflicts
            if (destinationsSlider) destinationsSlider.destroy(true, true);
            if (hotelsSlider) hotelsSlider.destroy(true, true);
            if (gallerySlider) gallerySlider.destroy(true, true);
            if (reviewsSlider) reviewsSlider.destroy(true, true);
            destinationsSlider = null;
            hotelsSlider = null;
            gallerySlider = null;
            reviewsSlider = null;
        }
    }

    initMobileSliders();

    // Update sliders on window resize
    window.addEventListener('resize', () => {
        initMobileSliders();
    });

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Campaign Modal
    const campaignModal = document.querySelector('.campaign-modal');
    const bodyArea = document.querySelector('body');
    const modalClose = campaignModal.querySelector('.modal-close');
    setTimeout(() => {
        campaignModal.classList.add('active');
    }, 2000);
    modalClose.addEventListener('click', () => {
        campaignModal.classList.remove('active');
    });
    bodyArea.addEventListener('click', () => {
        campaignModal.classList.remove('active');
    });

    // Cookies Modal
    const cookiesModal = document.querySelector('.cookies-modal');
    const cookiesAccept = cookiesModal.querySelector('.cookies-accept');
    setTimeout(() => {
        cookiesModal.classList.add('active');
    }, 1000);
    cookiesAccept.addEventListener('click', () => {
        cookiesModal.classList.remove('active');
    });

    // Feedback Modal
    const feedbackBtn = document.querySelector('.feedback-btn');
    const feedbackModal = document.querySelector('.feedback-modal');
    const feedbackClose = feedbackModal.querySelector('.modal-close');
    feedbackBtn.addEventListener('click', () => {
        feedbackModal.classList.add('active');
    });
    feedbackClose.addEventListener('click', () => {
        feedbackModal.classList.remove('active');
    });

    // Scroll to Top
    const scrollTopBtn = document.querySelector('.scroll-top');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Search Overlay
    const searchIcon = document.querySelector('.search-icon-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchOverlayClose = document.querySelector('.search-overlay-close');
    const searchInput = document.querySelector('#search-overlay-input');
    const searchSuggestions = document.querySelector('#search-suggestions');

    const suggestions = [
        { name: 'Times Square', country: 'United States', price: 150, rating: 4 },
        { name: 'Hagia Sophia', country: 'Türkiye', price: 200, rating: 5 },
        { name: 'Bali', country: 'Indonesia', price: 120, rating: 4 },
        { name: 'Paris', country: 'France', price: 200, rating: 4 },
        { name: 'New York', country: 'United States', price: 150, rating: 4 },
    ];

    searchIcon.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    searchOverlayClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchSuggestions.innerHTML = '';
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchSuggestions.innerHTML = '';
        if (query) {
            const filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.name.toLowerCase().includes(query) ||
                suggestion.country.toLowerCase().includes(query)
            );
            filteredSuggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = `${suggestion.name}, ${suggestion.country}`;
                li.addEventListener('click', () => {
                    searchOverlay.classList.remove('active');
                    searchInput.value = '';
                    searchSuggestions.innerHTML = '';
                    // Auto-fill hotel filter form
                    document.querySelector('#destination-name').value = suggestion.name;
                    document.querySelector('#country').value = suggestion.country;
                    document.querySelector('#price').value = suggestion.price;
                    document.querySelector('#rating').value = suggestion.rating;
                    // Scroll to hotels section
                    document.querySelector('#hotels').scrollIntoView({ behavior: 'smooth' });
                    // Trigger hotel filter
                    filterHotels();
                });
                searchSuggestions.appendChild(li);
            });
        }
    });

    // Form Validation
    function validateForm(form, fields) {
        let isValid = true;
        fields.forEach(field => {
            const input = form.querySelector(`#${field.id}`);
            const wrapper = input.closest('.input-wrapper');
            if (!input.value.trim()) {
                wrapper.classList.add('error');
                isValid = false;
            } else {
                wrapper.classList.remove('error');
            }
        });
        return isValid;
    }

    // Feedback Form
    const feedbackForm = document.querySelector('#feedback-form');
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = [
            { id: 'feedback-name' },
            { id: 'feedback-message' },
        ];
        if (validateForm(feedbackForm, fields)) {
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
            feedbackModal.classList.remove('active');
        }
    });

    // Contact Form
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = [
            { id: 'name' },
            { id: 'email' },
            { id: 'message' },
        ];
        if (validateForm(contactForm, fields)) {
            alert('Message sent successfully!');
            contactForm.reset();
        }
    });

    // Booking Form
    const bookingForm = document.querySelector('#booking-form');
    const checkoutModal = document.querySelector('.checkout-modal');
    const checkoutClose = checkoutModal.querySelector('.modal-close');
    const checkoutForm = document.querySelector('#checkout-form');
    const bookingSuccessModal = document.querySelector('.booking-success-modal');

    // Populate country and destination dropdowns
    const countries = ['United States', 'Türkiye', 'Indonesia', 'France'];
    const destinations = {
        'United States': ['Times Square', 'New York'],
        'Türkiye': ['Hagia Sophia'],
        'Indonesia': ['Bali'],
        'France': ['Paris'],
    };

    const countrySelect = document.querySelector('#booking-country');
    const destinationSelect = document.querySelector('#destination');
    const hotelCountrySelect = document.querySelector('#country');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
        hotelCountrySelect.appendChild(option.cloneNode(true));
    });

    countrySelect.addEventListener('change', () => {
        destinationSelect.innerHTML = '<option value="">Select Destination</option>';
        const selectedCountry = countrySelect.value;
        if (selectedCountry && destinations[selectedCountry]) {
            destinations[selectedCountry].forEach(dest => {
                const option = document.createElement('option');
                option.value = dest;
                option.textContent = dest;
                destinationSelect.appendChild(option);
            });
        }
    });

    // Book Now Buttons
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const country = button.dataset.country;
            const destination = button.dataset.destination;
            countrySelect.value = country;
            // Trigger change event to populate destinations
            const event = new Event('change');
            countrySelect.dispatchEvent(event);
            destinationSelect.value = destination;
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = [
            { id: 'booking-country' },
            { id: 'destination' },
            { id: 'date' },
            { id: 'guests' },
        ];
        if (validateForm(bookingForm, fields)) {
            checkoutModal.classList.add('active');
            // Populate checkout summary
            document.querySelector('#summary-country').textContent = countrySelect.value;
            document.querySelector('#summary-destination').textContent = destinationSelect.value;
            document.querySelector('#summary-date').textContent = document.querySelector('#date').value;
            document.querySelector('#summary-guests').textContent = document.querySelector('#guests').value;
            // Calculate estimated cost
            const guests = parseInt(document.querySelector('#guests').value) || 1;
            const price = suggestions.find(s => s.name === destinationSelect.value)?.price || 100;
            const estimatedCost = price * guests;
            document.querySelector('#summary-cost').textContent = `$${estimatedCost}`;
        }
    });

    checkoutClose.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = [
            { id: 'full-name' },
            { id: 'email' },
            { id: 'phone' },
            { id: 'card-number' },
            { id: 'expiry-date' },
            { id: 'cvv' },
        ];
        if (validateForm(checkoutForm, fields)) {
            checkoutModal.classList.remove('active');
            bookingSuccessModal.classList.add('active');
            setTimeout(() => {
                bookingSuccessModal.classList.remove('active');
                bookingForm.reset();
            }, 2000);
        }
    });

    // Hotel Filter
    const hotelFilter = document.querySelector('#hotel-filter');
    const hotelList = document.querySelector('#hotel-list');
    const hotelListMobile = document.querySelector('#hotel-list-mobile');

    function filterHotels() {
        const destination = document.querySelector('#destination-name').value.toLowerCase();
        const country = document.querySelector('#country').value.toLowerCase();
        const price = parseFloat(document.querySelector('#price').value) || Infinity;
        const rating = parseInt(document.querySelector('#rating').value) || 0;

        const filteredHotels = suggestions.filter(hotel => {
            return (
                (destination === '' || hotel.name.toLowerCase().includes(destination)) &&
                (country === '' || hotel.country.toLowerCase() === country) &&
                hotel.price <= price &&
                hotel.rating >= rating
            );
        });

        // Update desktop grid
        hotelList.innerHTML = '';
        filteredHotels.forEach(hotel => {
            const card = document.createElement('div');
            card.className = 'hotel-card';
            card.innerHTML = `
                <img src="assets/image/hero${Math.floor(Math.random() * 3) + 1}.webp" alt="${hotel.name}">
                <div class="hotel-card-content">
                    <h3>${hotel.name}</h3>
                    <div class="rating">${'<i class="fa fa-star"></i>'.repeat(hotel.rating)}</div>
                    <p class="price">$${hotel.price}/night</p>
                    <a href="#booking" class="btn btn-secondary book-now-btn" 
                       data-country="${hotel.country}" 
                       data-destination="${hotel.name}" 
                       data-price="${hotel.price}">Book Now</a>
                </div>
                <button class="like-btn" aria-label="Like Destination">
                    <i class="fa fa-heart-o"></i>
                    <i class="fa fa-heart"></i>
                </button>
            `;
            hotelList.appendChild(card);
        });

        // Update mobile slider
        hotelListMobile.innerHTML = '';
        filteredHotels.forEach(hotel => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide hotel-card';
            slide.innerHTML = `
                <img src="assets/image/hero${Math.floor(Math.random() * 3) + 1}.webp" alt="${hotel.name}">
                <div class="hotel-card-content">
                    <h3>${hotel.name}</h3>
                    <div class="rating">${'<i class="fa fa-star"></i>'.repeat(hotel.rating)}</div>
                    <p class="price">$${hotel.price}/night</p>
                    <a href="#booking" class="btn btn-secondary book-now-btn" 
                       data-country="${hotel.country}" 
                       data-destination="${hotel.name}" 
                       data-price="${hotel.price}">Book Now</a>
                </div>
                <button class="like-btn" aria-label="Like Destination">
                    <i class="fa fa-heart-o"></i>
                    <i class="fa fa-heart"></i>
                </button>
            `;
            hotelListMobile.appendChild(slide);
        });

        // Reinitialize mobile slider if active
        if (window.innerWidth <= 767 && hotelsSlider) {
            hotelsSlider.destroy(true, true);
            hotelsSlider = new Swiper('.hotels-slider', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }

        // Reattach event listeners to new Book Now buttons
        const newBookNowButtons = document.querySelectorAll('.book-now-btn');
        newBookNowButtons.forEach(button => {
            button.addEventListener('click', () => {
                const country = button.dataset.country;
                const destination = button.dataset.destination;
                countrySelect.value = country;
                const event = new Event('change');
                countrySelect.dispatchEvent(event);
                destinationSelect.value = destination;
                document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    hotelFilter.addEventListener('submit', (e) => {
        e.preventDefault();
        filterHotels();
    });

    // Like Buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('liked');
        });
    });

    // Load More Gallery
    const loadMoreBtn = document.querySelector('#load-more');
    const galleryGrid = document.querySelector('#gallery-grid');
    const galleryGridMobile = document.querySelector('#gallery-grid-mobile');
    const galleryImages = [
        'gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg', 'gallery4.jpg',
        'gallery5.jpg', 'gallery6.jpg', 'gallery7.jpg', 'gallery8.jpg'
    ];
    let loadedImages = 4;

    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.querySelector('.spinner').style.display = 'inline-block';
        setTimeout(() => {
            const nextImages = galleryImages.slice(loadedImages, loadedImages + 4);
            nextImages.forEach(img => {
                // Add to desktop grid
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img src="assets/image/${img}" alt="Gallery Image">
                    <button class="like-btn" aria-label="Like Image">
                        <i class="fa fa-heart-o"></i>
                        <i class="fa fa-heart"></i>
                    </button>
                `;
                galleryGrid.appendChild(item);

                // Add to mobile slider
                const slide = document.createElement('div');
                slide.className = 'swiper-slide gallery-item';
                slide.innerHTML = `
                    <img src="assets/image/${img}" alt="Gallery Image">
                    <button class="like-btn" aria-label="Like Image">
                        <i class="fa fa-heart-o"></i>
                        <i class="fa fa-heart"></i>
                    </button>
                `;
                galleryGridMobile.appendChild(slide);
            });

            // Reinitialize mobile slider
            if (window.innerWidth <= 767 && gallerySlider) {
                gallerySlider.destroy(true, true);
                gallerySlider = new Swiper('.gallery-slider', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }

            loadedImages += 4;
            if (loadedImages >= galleryImages.length) {
                loadMoreBtn.style.display = 'none';
            }

            // Reattach like button listeners
            document.querySelectorAll('.like-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.classList.toggle('liked');
                });
            });

            loadMoreBtn.querySelector('.spinner').style.display = 'none';
        }, 1000);
    });



    // Active Navlink on Scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});