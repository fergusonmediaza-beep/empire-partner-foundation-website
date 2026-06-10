/* global $, emailjs, dataLayer, Swal, document, window, requestAnimationFrame, IntersectionObserver, console, fetch, setTimeout */

function closeNewsletterToast() {
    var toast = document.getElementById('newsletter-toast');
    if (toast) {
        toast.classList.remove('newsletter-toast-visible');
    }
}

function showNewsletterToast() {
    var toast = document.getElementById('newsletter-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'newsletter-toast';
        toast.className = 'newsletter-toast';
        toast.innerHTML = [
            '<i class="fa-solid fa-circle-check newsletter-toast-icon"></i>',
            '<div class="newsletter-toast-body">',
            '<p class="newsletter-toast-title">You\'re subscribed!</p>',
            '<p class="newsletter-toast-msg">Thanks for joining. We\'ll keep you in the loop.</p>',
            '</div>',
            '<button class="newsletter-toast-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>'
        ].join('');
        document.body.appendChild(toast);
        toast.querySelector('.newsletter-toast-close').addEventListener('click', closeNewsletterToast);
    }
    toast.classList.add('newsletter-toast-visible');
    setTimeout(closeNewsletterToast, 4000);
}

var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Portfolio metric counter — fires once when the number scrolls into view
(function () {
    function animateCounter(el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';
        var duration = 1600;
        var startTime = null;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(easeOutCubic(progress) * target).toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    var counters = document.querySelectorAll('.portfolio-metric[data-target]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
})();
     $(window).on("scroll", function () {
  if ($(this).scrollTop() > 50) {
    $(".navbar-bg-transparent").addClass("scrolled");
  } else {
    $(".navbar-bg-transparent").removeClass("scrolled");
  }
});

window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WLNHXT06RR');

  $(function () {
    emailjs.init("m-pxaM_ZlXFuxAhM-"); // Your public key

    const $btn = $("#submit_btn");
    const $spinner = $("#submit_spinner");
    const $text = $("#submit_text");

    $("#contact_form").on("submit", function (event) {
        event.preventDefault();

        const originalText = $text.text();

        // UI feedback
        $btn.prop("disabled", true);
        $text.text("Sending...");
        $spinner.removeClass("d-none");

        emailjs.sendForm("service_1ktudwa", "template_xqvjiwr", this)
            .then(function () {
                // Reset form and show success modal using SweetAlert2
                $("#contact_form")[0].reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent',
                    text: 'Your message was sent successfully. We will get back to you shortly.',
                    confirmButtonText: 'OK',
                    timer: 5000,
                });
            })
            .catch(function (error) {
                console.error('EmailJS Error:', error);
                // Show error modal using SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Send Failed',
                    text: 'There was an error sending your message. Please try again later.',
                    confirmButtonText: 'Close',
                });
            })
            .finally(function () {
                $btn.prop("disabled", false);
                $text.text(originalText);
                $spinner.addClass("d-none");
            });
    });
  });

(function () {
    var form = document.getElementById('newsletter-form');
    if (!form) return;

    function getErrorEl() {
        var el = form.querySelector('.newsletter-error');
        if (!el) {
            el = document.createElement('p');
            el.className = 'newsletter-error';
            form.insertBefore(el, form.querySelector('.newsletter-btn'));
        }
        return el;
    }

    function showInlineError(msg) {
        var input = form.querySelector('.newsletter-input');
        input.classList.add('newsletter-input-error');
        var el = getErrorEl();
        el.textContent = msg;
        el.style.display = 'block';
    }

    function clearInlineError() {
        var input = form.querySelector('.newsletter-input');
        input.classList.remove('newsletter-input-error');
        var el = form.querySelector('.newsletter-error');
        if (el) {
            el.style.display = 'none';
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearInlineError();

        var input = form.querySelector('input[type="email"]');
        var email = input.value.trim();
        var atPos = email.indexOf('@');

        if (!email || atPos < 1 || atPos === email.length - 1 || email.indexOf('.', atPos) < atPos + 2) {
            showInlineError('Please enter a valid email address (e.g. name@example.com).');
            return;
        }

        var btn = form.querySelector('.newsletter-btn');
        var originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Subscribing...';

        fetch('https://formspree.io/f/xrevbwqa', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        .then(function (res) {
            if (res.ok) {
                form.reset();
                showNewsletterToast();
            } else {
                showInlineError('Subscription failed. Please try again.');
            }
        })
        .catch(function () {
            showInlineError('Connection error. Please try again.');
        })
        .finally(function () {
            btn.disabled = false;
            btn.textContent = originalText;
        });
    });

    form.querySelector('input[type="email"]').addEventListener('input', clearInlineError);
})();