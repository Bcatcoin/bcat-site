document.addEventListener('DOMContentLoaded', function() {
  // 🐾 Pati container'ı oluştur
  const pawContainer = document.createElement('div');
  pawContainer.className = 'paw-container';
  document.body.appendChild(pawContainer);

  // 🎨 Arka plan deseni
  const backgroundPattern = document.createElement('div');
  backgroundPattern.className = 'background-pattern';
  document.body.appendChild(backgroundPattern);

  // 🐾 SVG şekli (mor pati)
  const pawSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" 
      stroke="#c084fc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="4" r="2"/>
      <circle cx="18" cy="8" r="2"/>
      <circle cx="20" cy="16" r="2"/>
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
    </svg>
  `;

  // 🐾 Kaç adet pati olacak
  const pawCount = 70;

  for (let i = 0; i < pawCount; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 200;
    const size = Math.random() * 1.5 + 0.5;
    const rotation = Math.random() * 360;
    const parallaxFactor = Math.random() * 0.5 + 0.2;

    const paw = document.createElement('div');
    paw.className = 'paw';
    paw.innerHTML = pawSvg;
    paw.style.left = `${x}%`;
    paw.style.top = `${y}%`;
    paw.style.transform = `rotate(${rotation}deg) scale(${size})`;

    paw.dataset.rotation = rotation;
    paw.dataset.parallaxFactor = parallaxFactor;
    paw.dataset.size = size;

    pawContainer.appendChild(paw);
  }

  // 🔄 Scroll olayına tepki ver
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updatePaws(lastScrollY);
        ticking = false;
      });
      ticking = true;
    }
  });

  function updatePaws(scrollY) {
    const paws = document.querySelectorAll('.paw');

    paws.forEach(paw => {
      const factor = parseFloat(paw.dataset.parallaxFactor);
      const baseRotation = parseFloat(paw.dataset.rotation);
      const size = parseFloat(paw.dataset.size);
      const newRotation = baseRotation + scrollY * 0.05;

      paw.style.transform = `
        translate(${scrollY * factor}px, ${-scrollY * factor * 0.5}px) 
        rotate(${newRotation}deg) 
        scale(${size})
      `;
    });

    backgroundPattern.style.transform = `translateY(${scrollY * 0.1}px)`;
  }

  updatePaws(window.scrollY);

  window.addEventListener('resize', function() {
    updatePaws(window.scrollY);
  });
});
