// Load messages from JSON file
fetch("messages.json")
  .then(response => response.json())
  .then(messages => {
    const messageBox = document.getElementById("messageBox");
    const btn = document.getElementById("showLoveBtn");
    const heartLayer = document.getElementById("heartLayer");

    function playChime() {
      let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      let osc = audioCtx.createOscillator();
      let gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.value = 520;

      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.6);
    }

    function floatingHeart() {
      const h = document.createElement("span");
      h.textContent = "❤️";
      h.classList.add("floating-heart");

      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = Math.random() * 16 + 18 + "px";
      h.style.animationDuration = Math.random() * 4 + 4 + "s";

      heartLayer.appendChild(h);

      h.addEventListener("animationend", () => h.remove());
    }

    function burstHearts() {
      for (let i = 0; i < 25; i++) {
        setTimeout(floatingHeart, i * 80);
      }
    }

    btn.addEventListener("click", () => {
      messageBox.innerHTML = `
        <p class="message-line"><strong>${messages.apology}</strong></p>
        <p class="message-line">${messages.love_message}</p>
        <p class="message-line">${messages.extra}</p>
        <p class="signature">— Yours, <span>${messages.from}</span> ❤️</p>
      `;

      messageBox.classList.add("show");
      playChime();
      burstHearts();
    });
  });
