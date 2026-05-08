

      // Initialize AOS
      AOS.init({ duration: 800, once: true });

      // Hide loader
      window.addEventListener("load", function () {
        setTimeout(function () {
          document.getElementById("pageLoader").classList.add("hidden");
        }, 1000);
      });

      // Progress bar
      window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
      });

      // Custom cursor
      const cursor = document.getElementById("customCursor");
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX - 10 + "px";
        cursor.style.top = e.clientY - 10 + "px";
      });
      document.addEventListener("mouseover", (e) => {
        if (e.target.closest("button, a, .team-card, .neumorph-card"))
          cursor.classList.add("active");
        else cursor.classList.remove("active");
      });

      // Countdown timer
      function updateCountdown() {
        const target = new Date();
        target.setDate(target.getDate() + 3);
        target.setHours(23, 59, 59);
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) return;
        document.getElementById("days").innerHTML = Math.floor(
          diff / (1000 * 60 * 60 * 24),
        );
        document.getElementById("hours").innerHTML = Math.floor(
          (diff % 86400000) / 3600000,
        );
        document.getElementById("minutes").innerHTML = Math.floor(
          (diff % 3600000) / 60000,
        );
        document.getElementById("seconds").innerHTML = Math.floor(
          (diff % 60000) / 1000,
        );
      }
      setInterval(updateCountdown, 1000);
      updateCountdown();

      // Comparison slider
      const slider = document.getElementById("sliderHandle");
      const overlay = document.querySelector(".comparison-overlay");
      if (slider && overlay) {
        let isDragging = false;
        slider.addEventListener("mousedown", () => (isDragging = true));
        window.addEventListener("mouseup", () => (isDragging = false));
        window.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
          const rect = document
            .querySelector(".comparison-slider")
            .getBoundingClientRect();
          let x = (e.clientX - rect.left) / rect.width;
          x = Math.max(0, Math.min(1, x));
          overlay.style.width = x * 100 + "%";
          slider.style.left = x * 100 + "%";
        });
      }

      // Swiper testimonials
      new Swiper(".testimonial-swiper", {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        slidesPerView: 1,
        breakpoints: { 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } },
      });

      // Particle background
      const canvas = document.getElementById("particles-bg");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            alpha: Math.random(),
          });
        }
        function drawParticles() {
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(91, 192, 255, ${p.alpha * 0.3})`;
            ctx.fill();
          });
          requestAnimationFrame(drawParticles);
        }
        drawParticles();
        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      }

      // Animated counter
      function animateNumbers() {
        const statNumbers = document.querySelectorAll(
          ".stat-number[data-target]",
        );
        statNumbers.forEach((el) => {
          const target = parseFloat(el.getAttribute("data-target"));
          if (!el.hasAttribute("data-animated")) {
            el.setAttribute("data-animated", "true");
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                el.innerText = target + "%";
                clearInterval(timer);
              } else {
                el.innerText = Math.floor(current) + "%";
              }
            }, 20);
          }
        });
      }

      const observerOptions = { threshold: 0.3 };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll(".stat-number[data-target]").forEach((el) => {
        observer.observe(el.closest(".bg-white, .stat-badge") || el);
      });

      // EmailJS
      emailjs.init("paf7FPTk7vuhToyxX");
      const form = document.getElementById("contact-form");
      const btn = document.getElementById("btnEnviar");
      const status = document.getElementById("statusMsg");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          btn.disabled = true;
          btn.innerHTML = '<span class="btn-spinner"></span> Enviando...';
          emailjs
            .sendForm("service_xru296e", "template_k43eadc", form)
            .then(() => {
              status.style.color = "green";
              status.innerHTML = "Mensaje enviado correctamente ✅";
              form.reset();
            })
            .catch(() => {
              status.style.color = "red";
              status.innerHTML = "Error al enviar el mensaje ❌";
            })
            .finally(() => {
              btn.disabled = false;
              btn.innerHTML = "Enviar mensaje";
            });
        });
      }

      // Map
      const mapElement = document.getElementById("map");
      if (mapElement) {
        const map = L.map("map").setView([13.9943, -89.5572], 13);
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
            subdomains: "abcd",
            maxZoom: 19,
          },
        ).addTo(map);

        L.marker([13.987, -89.556])
          .addTo(map)
          .bindPopup("<b>Super Selectos</b><br>Centro Santa Ana");
        L.marker([13.995, -89.558])
          .addTo(map)
          .bindPopup("<b>Walmart</b><br>Santa Ana");
        L.marker([13.99, -89.56])
          .addTo(map)
          .bindPopup("<b>Farmacia Simán</b><br>Santa Ana");
        L.marker([13.9943, -89.5572])
          .addTo(map)
          .bindPopup("<b>Glass Pro</b><br>Oficina Central")
          .openPopup();
      }

      // Navbar scroll effect
      window.addEventListener("scroll", () => {
        const navbar = document.getElementById("mainNavbar");
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
      });
