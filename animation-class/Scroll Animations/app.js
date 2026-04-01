document.addEventListener("DOMContentLoaded", () => {
  const rollingWord = document.getElementById("rolling-word");
  const steps = document.querySelectorAll(".scroll-step");
  const cards = document.querySelectorAll(".image-card");

  if (!rollingWord || steps.length === 0 || cards.length === 0) {
    console.log("Missing HTML elements");
    return;
  }

  /* show first image right away */
  cards[0].classList.add("show");

  /* image animation */
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target.querySelector(".image-card");

      if (entry.isIntersecting) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });
  }, {
    threshold: 0.35
  });

  steps.forEach((step) => cardObserver.observe(step));

  /* changing word */
  let currentWord = "graphics";
  let wordTimeout;

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const newWord = entry.target.dataset.word;

        if (newWord !== currentWord) {
          clearTimeout(wordTimeout);

          rollingWord.classList.remove("roll-in");
          rollingWord.classList.add("roll-out");

          wordTimeout = setTimeout(() => {
            rollingWord.textContent = newWord;
            rollingWord.classList.remove("roll-out");
            rollingWord.classList.add("roll-in");
            currentWord = newWord;
          }, 250);
        }
      }
    });
  }, {
    threshold: 0.55
  });

  steps.forEach((step) => textObserver.observe(step));
});