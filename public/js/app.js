// Typewriter Effect
const text = "Web Designer | Learning Full-Stack | Hackathon Winner";
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

// Active link logic with high-performance scrolling (throttled via requestAnimationFrame)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

function updateActiveLink() {
    let mostVisibleSection = null;
    let maxVisibleHeight = 0;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Calculate the height of the section visible in the viewport
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        
        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            mostVisibleSection = section;
        }
    });

    // Boundary cases: extreme top (about/hero) and extreme bottom (contact)
    if (window.scrollY < 100) {
        mostVisibleSection = sections[0];
    } else if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
        mostVisibleSection = sections[sections.length - 1];
    }

    if (mostVisibleSection) {
        const currentId = mostVisibleSection.getAttribute('id');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentId) {
                link.classList.remove('text-on-surface-variant');
                link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
            } else {
                link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
                link.classList.add('text-on-surface-variant');
            }
        });
    }
}

// Initialize active link on load
updateActiveLink();