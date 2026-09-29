const canvas = document.getElementById('stars');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = [];
    const count = Math.floor((w * h) / 6000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() < 0.85 ? 1 : 2,
        speed: 0.05 + Math.random() * 0.25,
        color: Math.random() < 0.75
          ? 'rgba(255,255,255,0.8)'
          : Math.random() < 0.5
          ? 'rgba(255,60,172,0.9)'
          : 'rgba(255,140,66,0.9)',
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    ctx.fillStyle = '#060A1A';
    ctx.fillRect(0, 0, w, h);
    for (const s of stars) {
      s.twinkle += 0.02;
      const alpha = 0.4 + Math.sin(s.twinkle) * 0.6;
      ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      s.y += s.speed;
      if (s.y > h) {
        s.y = 0;
        s.x = Math.random() * w;
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}
