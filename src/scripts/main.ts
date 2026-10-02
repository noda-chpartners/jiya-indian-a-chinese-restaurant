import "lenis/dist/lenis.css";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CleanupWindow = Window & { __jiyaCleanup?: () => void };

export function initMotion() {
  const win = window as CleanupWindow;
  win.__jiyaCleanup?.();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mm = gsap.matchMedia();
  const ac = new AbortController();
  let lenis: Lenis | null = null;
  let raf: ((time: number) => void) | null = null;
  let heroTl: gsap.core.Timeline | null = null;

  if (!reduce) {
    lenis = new Lenis({
      autoRaf: false,
      anchors: false,
      lerp: 0.085,
      duration: 1.05,
    });
    lenis.on("scroll", ScrollTrigger.update);
    raf = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  const header = document.querySelector<HTMLElement>(".header");
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const panel = document.querySelector<HTMLElement>(".nav-panel");
  const intro = document.querySelector<HTMLElement>(".intro");

  const closeNav = () => {
    if (!header || !toggle || !panel) return;
    const wasOpen = header.classList.contains("is-open");
    header.classList.remove("is-open");
    document.documentElement.classList.remove("is-nav-open", "is-locked");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
    lenis?.start();
    gsap.to(panel, { autoAlpha: 0, duration: reduce ? 0 : 0.25, overwrite: true });
    if (wasOpen) toggle.focus();
  };

  const openNav = () => {
    if (!header || !toggle || !panel) return;
    header.classList.add("is-open");
    document.documentElement.classList.add("is-nav-open");
    if (!lenis) document.documentElement.classList.add("is-locked");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
    panel.setAttribute("aria-hidden", "false");
    panel.removeAttribute("inert");
    lenis?.stop();
    const links = panel.querySelectorAll("a");
    gsap.set(panel, { autoAlpha: 0 });
    gsap.to(panel, { autoAlpha: 1, duration: reduce ? 0 : 0.35, ease: "power2.out", overwrite: true });
    if (!reduce) {
      gsap.fromTo(
        links,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.045, delay: 0.05, ease: "power3.out", overwrite: true },
      );
    }
    links[0]?.focus();
  };

  toggle?.addEventListener("click", () => {
    if (header?.classList.contains("is-open")) closeNav();
    else openNav();
  }, { signal: ac.signal });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  }, { signal: ac.signal });

  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement | null)?.closest?.("a[href^='#']");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    closeNav();
    if (lenis) {
      lenis.scrollTo(target, { offset: -84, force: true });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
  }, { capture: true, signal: ac.signal });

  window.matchMedia("(min-width: 860px)").addEventListener("change", (event) => {
    if (event.matches) closeNav();
  }, { signal: ac.signal });

  ScrollTrigger.create({
    start: 24,
    end: "max",
    onToggle: (self) => header?.classList.toggle("is-scrolled", self.isActive),
  });

  const dock = document.querySelector(".dock");
  ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom 88%",
    onEnter: () => dock?.classList.add("is-visible"),
    onLeaveBack: () => dock?.classList.remove("is-visible"),
  });

  if (!reduce && intro) {
    heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    const hero = heroTl;
    hero
      .to(intro, { yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.45 })
      .from(".hero__title-line span", { yPercent: 110, duration: 1.05 }, "-=0.55")
      .from(".hero__lead, .hero__actions, .eyebrow", { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.06, ease: "power3.out" }, "-=0.75")
      .from(".hero__facts li", { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.06, ease: "power3.out" }, "-=0.55")
      .from(".hero__photo img", { scale: 1.12, duration: 1.5, ease: "power2.out" }, "-=1.15")
      .from(".hero__float", { autoAlpha: 0, y: 24, duration: 0.9, ease: "power3.out" }, "-=1");
    hero.eventCallback("onComplete", () => {
      intro.style.display = "none";
    });
  } else if (intro) {
    intro.style.display = "none";
  }

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    let alive = true;
    let marqueeTween: gsap.core.Tween | null = null;

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 32,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });
    });

    const aboutImg = document.querySelector<HTMLElement>(".about__visual img");
    if (aboutImg) {
      gsap.fromTo(aboutImg, { yPercent: -6 }, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: aboutImg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    gsap.to(".progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.35,
      },
    });

    document.querySelectorAll<HTMLElement>(".menu-cat").forEach((cat) => {
      ScrollTrigger.create({
        trigger: cat,
        start: "top 30%",
        end: "bottom 40%",
        onToggle: (self) => {
          document.querySelectorAll<HTMLAnchorElement>(".menu__nav a").forEach((link) => {
            link.classList.toggle("is-active", self.isActive && link.getAttribute("href") === `#${cat.id}`);
          });
        },
      });
    });

    const startMarquee = () => {
      if (!alive) return;
      const track = document.querySelector<HTMLElement>(".marquee__track");
      if (!track) return;
      marqueeTween?.kill();
      marqueeTween = gsap.to(track, {
        x: () => -track.scrollWidth / 2,
        duration: 36,
        ease: "none",
        repeat: -1,
      });
    };

    document.fonts.ready.then(() => {
      startMarquee();
      ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      marqueeTween?.kill();
    };
  });

  mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
    const section = document.querySelector<HTMLElement>(".signature");
    const track = document.querySelector<HTMLElement>(".signature__track");
    if (!section || !track) return;
    section.classList.add("is-pin");
    track.removeAttribute("data-lenis-prevent");

    const distance = () => Math.max(track.scrollWidth - document.documentElement.clientWidth, 0);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".signature__pin",
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      section.classList.remove("is-pin");
      track.setAttribute("data-lenis-prevent", "");
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });

  const map = document.querySelector<HTMLElement>("[data-map]");
  document.querySelector("[data-map-unlock]")?.addEventListener("click", () => {
    map?.classList.add("is-active");
  }, { signal: ac.signal });
  document.querySelector("[data-map-lock]")?.addEventListener("click", () => {
    map?.classList.remove("is-active");
  }, { signal: ac.signal });

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { signal: ac.signal });

  if (location.hash) {
    const target = document.querySelector<HTMLElement>(location.hash);
    if (target) {
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target, { offset: -84, immediate: true });
      });
    }
  }

  const cleanup = () => {
    ac.abort();
    mm.revert();
    heroTl?.kill();
    lenis?.destroy();
    if (raf) gsap.ticker.remove(raf);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    document.documentElement.classList.remove("is-nav-open", "is-locked");
  };

  win.__jiyaCleanup = cleanup;
  return cleanup;
}
