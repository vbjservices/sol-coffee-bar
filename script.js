window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const introLogo = document.getElementById("introLogo");
  const headerLogo = document.getElementById("headerLogo");
  const main = document.getElementById("main");

  // Zorg dat header-logo onzichtbaar is tot animatie klaar is
  headerLogo.style.visibility = "hidden";

  const delayMs = 1500;  // 1-2 seconden: pas aan
  const durationMs = 550;

  setTimeout(() => {
    // 1) Pak posities
    const from = introLogo.getBoundingClientRect();
    const to = headerLogo.getBoundingClientRect();

    // 2) Zet introLogo in "absolute overlay" mode zodat hij exact kan bewegen
    introLogo.style.position = "fixed";
    introLogo.style.left = `${from.left}px`;
    introLogo.style.top = `${from.top}px`;
    introLogo.style.width = `${from.width}px`;
    introLogo.style.height = "auto";

    // Force reflow
    introLogo.getBoundingClientRect();

    // 3) Bereken deltas & schaal
    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const scale = to.width / from.width;

    // 4) Animate naar header plek
    introLogo.style.transition = `transform ${durationMs}ms cubic-bezier(.2,.9,.2,1)`;
    introLogo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

    // 5) Content erin laten komen
    main.classList.add("is-visible");

    // 6) Na animatie: intro weg, header-logo tonen
    setTimeout(() => {
      headerLogo.style.visibility = "visible";
      intro.style.opacity = "0";

      setTimeout(() => {
        intro.remove();
      }, 350);
    }, durationMs);

  }, delayMs);
});
