// ========================
// Auto Slider
// ========================
let index = 0;
const slider = document.getElementById('slider');
if (slider) {
  const totalSlides = slider.children.length;

  function slide() {
    index = (index + 1) % totalSlides;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(slide, 4000); // Change every 4 seconds
}

// ========================
// Recommended Swiper
// ========================
if (typeof Swiper !== 'undefined') {
  var recommendedSwiper = new Swiper('.recommendedSwiper', {
    spaceBetween: 10,
    slidesPerView: 5,
    centeredSlides: false,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    loop: true
  });
}

// ========================
// Flash Sale Countdown
// ========================
let flashDeadline = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now

let flashInterval = setInterval(function () {
  let now = new Date().getTime();
  let distance = flashDeadline - now;

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const hoursEl = document.getElementById("flash-hours");
  const minutesEl = document.getElementById("flash-minutes");
  const secondsEl = document.getElementById("flash-seconds");

  if (hoursEl && minutesEl && secondsEl) {
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  if (distance < 0) {
    clearInterval(flashInterval);
    const timerEl = document.getElementById("flashsale-timer");
    if (timerEl) {
      timerEl.textContent = "EXPIRED";
    }
  }
}, 1000);

// ========================
// Blog Post Viewer
// ========================
const blogPosts = {
  1: {
    title: "5 Tips to Choose the Perfect Book",
    image: "images/blog1.jpg",
    content: `Choosing the perfect book involves understanding your interests, reading reviews, and exploring different genres. 
      Start by asking yourself what mood you're in and what you want to learn or feel. 
      Don't hesitate to ask friends or librarians for recommendations.
      Also, preview the first chapter if possible to see if the writing style suits you. 
      Finally, keep an open mind and try new authors!`
  },
  2: {
    title: "How to Create a Cozy Reading Nook",
    image: "images/blog2.jpg",
    content: `A cozy reading nook can transform your reading experience. Find a quiet corner, add comfortable seating, and good lighting. 
      Include pillows, blankets, and maybe a small bookshelf nearby. Personalize it with items that inspire you.`
  },
  3: {
    title: "Benefits of Reading Every Day",
    image: "images/blog3.jpg",
    content: `Reading daily improves your vocabulary, reduces stress, and enhances your knowledge. 
      It also stimulates your brain and improves focus. Make reading a part of your daily routine, even if it's just for 10 minutes.`
  }
};

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const titleElem = document.getElementById('blog-title');
const imageElem = document.getElementById('blog-image');
const contentElem = document.getElementById('blog-content');

if (postId && blogPosts[postId]) {
  const post = blogPosts[postId];
  if (titleElem) titleElem.textContent = post.title;
  if (imageElem) {
    imageElem.src = post.image;
    imageElem.alt = post.title;
    imageElem.style.display = '';
  }
  if (contentElem) contentElem.textContent = post.content;
} else if (titleElem && imageElem && contentElem) {
  titleElem.textContent = "Blog post not found";
  imageElem.style.display = "none";
  contentElem.textContent = "Sorry, the blog post you are looking for does not exist.";
}

// ========================
// Modal Loader for Login/Signup/Forgot
// ========================
function loadModal(file, modalId) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      const modalContainer = document.getElementById('modalContainer');
      if (!modalContainer) return;

      modalContainer.innerHTML = html;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';

        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
      }
    })
    .catch(err => {
      console.error(`Error loading modal from ${file}:`, err);
    });
}

const loginBtn = document.querySelector('.login_btn');
if (loginBtn) {
  loginBtn.addEventListener('click', function () {
    loadModal('login.html', 'loginModal');
  });
}

const signupBtn = document.querySelector('.signup_btn');
if (signupBtn) {
  signupBtn.addEventListener('click', function () {
    loadModal('signup.html', 'signupModal');
  });
}

function openForgotModal() {
  loadModal('forgot.html', 'forgotModal');
}

function closeForm(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// ========================
// Close modal on Escape key
// ========================
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.form-modal');
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

// ========================
// Close modal on outside click
// ========================
window.onclick = function (event) {
  const modals = document.querySelectorAll('.form-modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// ========================
// Toggle password show/hide
// ========================
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Expose global functions for inline HTML calls
window.togglePassword = togglePassword;
window.closeForm = closeForm;
window.openForgotModal = openForgotModal;

// ========================
// Header background color change on scroll (no shadow)
// ========================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========================
// Mobile menu toggle
// ========================
const menuIcon = document.getElementById('menu-icon');
const menuContainer = document.querySelector('.menu_container'); // your menu container class

if (menuIcon && menuContainer) {
  menuIcon.addEventListener('click', () => {
    menuContainer.classList.toggle('active');
  });
} else {
  console.log('Menu icon or menu container not found');
}
