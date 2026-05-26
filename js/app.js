// Typewriter Effect
const text = "Frontend Developer | AI Developer | Hackathon Winner";
const target = document.getElementById('typewriter');
let index = 0;
let isDeleting = false;
let speed = 100;

function type() {
    const current = text.substring(0, index);
    target.textContent = current;

    if (!isDeleting && index < text.length) {
        index++;
        setTimeout(type, speed);
    } else if (isDeleting && index > 0) {
        index--;
        setTimeout(type, speed / 2);
    } else {
        isDeleting = !isDeleting;
        setTimeout(type, 1500);
    }
}
type();

// Active link logic
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
        link.classList.add('text-on-surface-variant');
        if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
            link.classList.remove('text-on-surface-variant');
            link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
        }
    });
});