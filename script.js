const elements = document.querySelectorAll('.fade-in');

function showElements() {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', showElements);
showElements();

const heroSlides = [
    { eyebrow: 'Featured escape · Bali', title: 'A slower way to see the world.', description: 'Tailored journeys for curious people, shaped around the places and moments you will remember.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=85' },
    { eyebrow: 'Featured escape · Japan', title: 'Follow the details that matter.', description: 'From Kyoto alleys to Tokyo nights, experience Japan with an itinerary that leaves space for wonder.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85' },
    { eyebrow: 'Featured escape · Paris', title: 'Make room for the unexpected.', description: 'A city break with just enough structure, and plenty of time for the table you find by accident.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=85' }
];
let activeSlide = 0;
function rotateHero() {
    const slide = heroSlides[activeSlide];
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.style.backgroundImage = `linear-gradient(90deg, rgba(13,34,38,.82), rgba(13,34,38,.15)), url('${slide.image}')`;
    document.getElementById('hero-eyebrow').textContent = slide.eyebrow;
    document.getElementById('hero-title').textContent = slide.title;
    document.getElementById('hero-description').textContent = slide.description;
    activeSlide = (activeSlide + 1) % heroSlides.length;
}
if (document.querySelector('.hero')) setInterval(rotateHero, 5000);

function calculateCost() {
    const destination = document.getElementById('destination').value;
    const travellers = Number(document.getElementById('travellers').value);
    const days = Number(document.getElementById('days').value);
    const style = document.querySelector('input[name="style"]:checked').value;
    const rates = { Bali: 245, Japan: 280, Paris: 265, 'New Zealand': 255 };
    const multipliers = { Budget: 0.78, Standard: 1, Luxury: 1.65 };
    const total = Math.round(travellers * days * rates[destination] * multipliers[style] / 10) * 10;
    document.getElementById('result').innerHTML = `<strong>$${total.toLocaleString()}</strong><p>Estimated cost for ${travellers} travellers to ${destination} for ${days} days: $${total.toLocaleString()} - ${style} Travel Package.</p>`;
}

const calculatorForm = document.getElementById('calculator-form');
if (calculatorForm) calculatorForm.addEventListener('submit', (event) => { event.preventDefault(); if (!calculatorForm.checkValidity()) { document.getElementById('calculator-error').textContent = 'Please enter a valid number of travellers and days.'; return; } document.getElementById('calculator-error').textContent = ''; calculateCost(); });
document.querySelectorAll('#travellers, #days, #destination, input[name="style"]').forEach((field) => field.addEventListener('change', () => { if (calculatorForm && calculatorForm.checkValidity()) calculateCost(); }));

function wireForm(formId, messageId, successText) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (event) => { event.preventDefault(); const message = document.getElementById(messageId); if (!form.checkValidity()) { message.textContent = 'Please complete the highlighted fields before sending.'; form.reportValidity(); return; } message.textContent = successText; form.reset(); });
}
wireForm('appointment-form', 'appointment-message', 'Thanks. Your appointment request is on its way.');
wireForm('contact-form', 'contact-message-status', 'Thanks. We will get back to you shortly.');
