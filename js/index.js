 // Inicializar el mapa centrado en Santa Ana, El Salvador
        var map = L.map("map").setView([13.9945, -89.5567], 14);

        // Cargar tiles (OpenStreetMap estándar)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // SUPERMERCADOS en Santa Ana (coordenadas reales)
        var supermercados = [
          {
            name: "Super Selectos - Centro",
            lat: 13.9951,
            lon: -89.5572,
            address: "2a Calle Poniente, Santa Ana",
          },
          {
            name: "Super Selectos - Colonia Santa Lucía",
            lat: 13.9866,
            lon: -89.5633,
            address: "Boulevard Los Libertadores",
          },
          {
            name: "Walmart Santa Ana",
            lat: 13.9832,
            lon: -89.5489,
            address: "Carretera a Metapán, Santa Ana",
          },
          {
            name: "Despensa Familiar - Metrocentro",
            lat: 13.9918,
            lon: -89.5635,
            address: "Metrocentro Santa Ana",
          },
        ];

        // FARMACIAS en Santa Ana (coordenadas reales)
        var farmacias = [
          {
            name: "Farmacias Simán",
            lat: 13.9941,
            lon: -89.5558,
            address: "1a Calle Poniente, Santa Ana",
          },
          {
            name: "Farmacia San Nicolás",
            lat: 13.9962,
            lon: -89.5593,
            address: "3a Calle Oriente, Santa Ana",
          },
          {
            name: "Farmacia Santa Lucía",
            lat: 13.9882,
            lon: -89.5611,
            address: "Boulevard Los Libertadores",
          },
          {
            name: "Farmacia La Bomba",
            lat: 13.9806,
            lon: -89.5558,
            address: "Final 10a Avenida Sur",
          },
          {
            name: "Farmacias San Francisco",
            lat: 13.9926,
            lon: -89.5503,
            address: "Colonia San Francisco",
          },
        ];

        // Icono rojo para supermercados (usando icono estándar de Leaflet)
        var redIcon = L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        // Icono verde personalizado usando canvas (más compatible)
        var greenIcon = L.divIcon({
          className: "custom-green-marker",
          html: '<div style="background-color: #2e7d32; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
          iconSize: [28, 28],
          popupAnchor: [0, -14],
        });

        // Icono azul para Glass Pro
        var blueIcon = L.divIcon({
          className: "custom-blue-marker",
          html: '<div style="background-color: #2c7da0; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
          iconSize: [28, 28],
          popupAnchor: [0, -14],
        });

        // Agregar marcadores de supermercados (rojo)
        supermercados.forEach(function (store) {
          var marker = L.marker([store.lat, store.lon], {
            icon: redIcon,
          }).addTo(map);
          marker.bindPopup(`
            <b>🏪 ${store.name}</b><br>
            📍 ${store.address}<br>
            <small>🎯 Supermercado - Encuentra Glass Pro</small>
        `);
        });

        // Agregar marcadores de farmacias (verde)
        farmacias.forEach(function (pharmacy) {
          var marker = L.marker([pharmacy.lat, pharmacy.lon], {
            icon: greenIcon,
          }).addTo(map);
          marker.bindPopup(`
            <b>💊 ${pharmacy.name}</b><br>
            📍 ${pharmacy.address}<br>
            <small>🎯 Farmacia - Producto antiempañante disponible</small>
        `);
        });

        // Agregar marcador central de Glass Pro
        var centerMarker = L.marker([13.9945, -89.5567], {
          icon: blueIcon,
        }).addTo(map);
        centerMarker.bindPopup(`
        <b>👓 Glass Pro Santa Ana</b><br>
        📍 Centro de distribución oficial<br>
        📍 Parque Libertad, Santa Ana<br>
        <small>🚚 Envíos a toda la ciudad</small>
    `);

        // Ajustar el mapa para mostrar todos los marcadores
        var bounds = L.latLngBounds([]);
        supermercados.forEach(function (store) {
          bounds.extend([store.lat, store.lon]);
        });
        farmacias.forEach(function (pharmacy) {
          bounds.extend([pharmacy.lat, pharmacy.lon]);
        });
        bounds.extend([13.9945, -89.5567]);
        map.fitBounds(bounds);
    

             // SLIDER MANUAL CON BOTONES DE FLECHA, ÍCONOS VISIBLES, Y DOTS
      const items = document.querySelectorAll(".slider-hero .item");
      const prevBtn = document.querySelector(".prev-btn");
      const nextBtn = document.querySelector(".next-btn");
      const dotsContainer = document.getElementById("dotsContainer");
      let currentIndex = 0;
      const totalItems = items.length;

      function updateSlider(index) {
        items.forEach((item, i) => {
          item.classList.toggle("active", i === index);
        });
        // actualizar dots
        document.querySelectorAll(".dot").forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider(currentIndex);
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateSlider(currentIndex);
      }

      // Crear dots
      items.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (idx === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => {
          currentIndex = idx;
          updateSlider(currentIndex);
        });
        dotsContainer.appendChild(dot);
      });

      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      // Auto slide opcional cada 6 segundos (pero no interfiere)
      let autoInterval = setInterval(nextSlide, 6000);
      const sliderContainer = document.querySelector(".slider-hero");
      sliderContainer.addEventListener("mouseenter", () =>
        clearInterval(autoInterval),
      );
      sliderContainer.addEventListener("mouseleave", () => {
        autoInterval = setInterval(nextSlide, 6000);
      });

      // Cerrar el intervalo cuando se destruye (navegación segura)
      window.addEventListener("beforeunload", () =>
        clearInterval(autoInterval),
      );