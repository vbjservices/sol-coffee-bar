window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const introBrand = document.getElementById("introBrand");
  const introLogo = document.getElementById("introLogo");
  const introSun = document.getElementById("introSun");
  const introSublogo = document.getElementById("introSublogo");
  const headerBrand = document.getElementById("headerBrand");
  const main = document.getElementById("main");

  if (!intro || !introBrand || !introLogo || !introSun || !introSublogo || !headerBrand || !main) return;

  const showMain = () => {
    main.classList.add("is-visible");
  };

  // Zorg dat header-logo onzichtbaar is tot animatie klaar is
  headerBrand.style.visibility = "hidden";

  const startMs = 120;
  const sunDropDelayMs = 160;
  const logoInMs = 450;
  const holdMs = 350;
  const durationMs = 650;

  const parseMs = (value) => {
    const raw = value.trim();
    if (!raw) return NaN;
    if (raw.endsWith("ms")) return Number.parseFloat(raw);
    if (raw.endsWith("s")) return Number.parseFloat(raw) * 1000;
    return Number.parseFloat(raw);
  };

  const sublogoTypeRaw = getComputedStyle(introSublogo)
    .getPropertyValue("--sublogo-type-ms");
  const sublogoTypeMs = Number.isFinite(parseMs(sublogoTypeRaw))
    ? parseMs(sublogoTypeRaw)
    : 900;

  setTimeout(() => {
    introLogo.classList.add("is-in");
  }, startMs);

  setTimeout(() => {
    introSun.classList.add("is-drop");
  }, startMs + sunDropDelayMs);

  setTimeout(() => {
    introSublogo.classList.add("is-reveal");
  }, startMs + logoInMs);

  const dropStartMs = startMs + sunDropDelayMs;
  const sublogoStartMs = startMs + logoInMs;
  const spinStopMs = sublogoStartMs + (sublogoTypeMs / 3);
  const spinMs = Math.max(200, spinStopMs - dropStartMs);
  introSun.style.setProperty("--sun-spin", `${spinMs}ms`);

  const moveStartMs = sublogoStartMs + sublogoTypeMs + holdMs;

  setTimeout(() => {
    // 1) Pak posities
    const from = introBrand.getBoundingClientRect();
    const to = headerBrand.getBoundingClientRect();

    // 2) Zet introBrand in "absolute overlay" mode zodat hij exact kan bewegen
    introBrand.style.position = "fixed";
    introBrand.style.left = `${from.left}px`;
    introBrand.style.top = `${from.top}px`;
    introBrand.style.width = `${from.width}px`;
    introBrand.style.height = "auto";

    // Force reflow
    introBrand.getBoundingClientRect();

    // 3) Bereken deltas & schaal
    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const scale = to.width / from.width;

    // 4) Animate naar header plek
    introBrand.style.transition = `transform ${durationMs}ms cubic-bezier(.2,.9,.2,1)`;
    introBrand.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

    // 6) Na animatie: intro weg, header-logo tonen
    setTimeout(() => {
      headerBrand.style.visibility = "visible";
      intro.style.opacity = "0";

      setTimeout(() => {
        intro.remove();
        showMain();
      }, 350);
    }, durationMs);
  }, moveStartMs);
});
