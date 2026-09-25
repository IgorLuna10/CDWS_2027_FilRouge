/**
 * ==========================================================================
 * TREKHUB - SCRIPT PRINCIPAL JAVASCRIPT (VANILLA JS PUR)
 * src/js/main.js
 *
 * Fonctionnalités intégrées :
 *  1. Navigation mobile accessible (Hamburger, ARIA, Escape, focus trap)
 *  2. ScrollSpy pour navigation fluide et mise en avant des sections actives
 *  3. Bouton flottant de retour en haut de page avec défilement fluide
 *  4. Catalogue des ateliers : recherche temps réel et filtrage par catégorie
 *  5. Formulaire d'inscription : pré-remplissage URL & carte récapitulative dynamique
 *  6. Validation accessible du formulaire côté client (inline validation & ARIA)
 *  7. Générateur de Pass d'Embarquement / Badge Cadet officiel & modale
 *  8. Utilitaires de sécurisation du DOM
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  initBackToTop();
  initWorkshopCatalog();
  initRegistrationForm();
});

/* ==========================================================================
   MODULE 1 : NAVIGATION ACCESSIBLE & MENU MOBILE
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (!navToggle || !mainNav) return;

  mainNav.classList.add('js-enabled');

  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fermer le menu de navigation');
    mainNav.classList.add('is-open');
  };

  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    mainNav.classList.remove('is-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fermeture lors d'un clic sur un lien du menu
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      navToggle.focus();
    }
  });

  // Fermeture si clic en dehors du menu sur mobile
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth < 768 &&
      navToggle.getAttribute('aria-expanded') === 'true' &&
      !mainNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   MODULE 2 : SCROLLSPY (MISE EN AVANT DE LA SECTION ACTIVE)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('#main-nav a[href*="#"]');
  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && (href.endsWith(`#${id}`) || href === `#${id}`)) {
            link.setAttribute('aria-current', 'location');
          } else if (href && href.includes('#')) {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/* ==========================================================================
   MODULE 3 : BOUTON FLOTTANT RETOUR EN HAUT
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 350) {
            backToTopBtn.classList.add('is-visible');
          } else {
            backToTopBtn.classList.remove('is-visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/* ==========================================================================
   MODULE 4 : CATALOGUE DES ATELIERS (FILTRAGE PAR MOT-CLÉ ET CATÉGORIE)
   ========================================================================== */
function initWorkshopCatalog() {
  const catalogGrid = document.getElementById('catalog-grid');
  if (!catalogGrid) return;

  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('workshop-search');
  const resultsCount = document.getElementById('results-count');
  const resetBtn = document.getElementById('reset-filters-btn');
  const noWorkshopsMsg = document.getElementById('no-workshops-message');
  const cards = catalogGrid.querySelectorAll('.catalog-card');
  const totalCards = cards.length;

  let activeCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;
    const query = searchQuery.toLowerCase().trim();

    cards.forEach((card) => {
      const cardCategory = card.dataset.category || '';
      const cardText = card.textContent.toLowerCase();

      const matchesCategory =
        activeCategory === 'all' || cardCategory.includes(activeCategory);
      const matchesSearch = query === '' || cardText.includes(query);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    // Mise à jour de l'indicateur de résultats
    if (resultsCount) {
      if (visibleCount === 0) {
        resultsCount.textContent = 'Aucun atelier trouvé';
      } else {
        resultsCount.textContent = `Affichage de ${visibleCount} atelier${visibleCount > 1 ? 's' : ''} sur ${totalCards}`;
      }
    }

    // Gestion du message d'état vide
    if (noWorkshopsMsg) {
      noWorkshopsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Gestion de l'affichage du bouton de réinitialisation
    if (resetBtn) {
      if (activeCategory !== 'all' || query.length > 0) {
        resetBtn.style.display = 'inline-block';
      } else {
        resetBtn.style.display = 'none';
      }
    }
  };

  // Événements sur les boutons de filtrage
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeCategory = btn.dataset.category || 'all';
      applyFilters();
    });
  });

  // Événement sur la barre de recherche avec frappe instantanée
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Réinitialisation des filtres
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';

      filterBtns.forEach((b) => {
        const isAll = b.dataset.category === 'all';
        b.classList.toggle('active', isAll);
        b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
      });

      applyFilters();
      if (searchInput) searchInput.focus();
    });
  }

  // Application initiale
  applyFilters();
}

/* ==========================================================================
   MODULE 5 : FORMULAIRE D'INSCRIPTION & RÉCAPITULATIF EN DIRECT
   ========================================================================== */
function initRegistrationForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  // Données des ateliers pour enrichir le récapitulatif et le pass
  const WORKSHOP_METADATA = {
    html: {
      title: 'HTML Sémantique & Accessibilité',
      duration: '12 heures (3 sessions)',
      division: 'Division Ergonomie & Frontend',
      color: '#48e5c2',
      insignia: '💻',
      clearance: 'Niveau 1 — Rang Enseigne',
    },
    css: {
      title: 'CSS Moderne & Architecture Évolutive',
      duration: '16 heures (4 sessions)',
      division: 'Division Interfaces & Design Système',
      color: '#48e5c2',
      insignia: '🎨',
      clearance: 'Niveau 1 — Rang Enseigne',
    },
    js: {
      title: 'JavaScript Asynchrone & APIs Web',
      duration: '20 heures (5 sessions)',
      division: 'Division Systèmes & Scripting Spatial',
      color: '#ffb703',
      insignia: '⚡',
      clearance: 'Niveau 2 — Officier Spécialiste',
    },
    backend: {
      title: 'Architecture Backend & APIs Résilientes',
      duration: '24 heures (6 sessions)',
      division: 'Division Propulsion Serveur & Réseaux',
      color: '#f59e0b',
      insignia: '⚙️',
      clearance: 'Niveau 2 — Officier Spécialiste',
    },
    devops: {
      title: 'DevOps, Docker & Déploiement Continu',
      duration: '18 heures (4 sessions)',
      division: 'Division Infrastructure & Cloud Fédéral',
      color: '#f59e0b',
      insignia: '🛡️',
      clearance: 'Niveau 2 — Officier Spécialiste',
    },
    perf: {
      title: 'Performance Web & Vitesse Supraluminique',
      duration: '10 heures (2 sessions)',
      division: 'Division Métrologie & Optimisation Warp',
      color: '#34d399',
      insignia: '🚀',
      clearance: 'Niveau 3 — Ingénieur de Bord',
    },
  };

  // Champs de saisie
  const nomInput = document.getElementById('reg-nom');
  const prenomInput = document.getElementById('reg-prenom');
  const emailInput = document.getElementById('reg-email');
  const atelierSelect = document.getElementById('atelier-select');
  const sessionSelect = document.getElementById('reg-session');
  const formatSelect = document.getElementById('reg-format');
  const rgpdCheckbox = document.getElementById('reg-rgpd');

  // Éléments du récapitulatif
  const summaryCadet = document.getElementById('summary-cadet-name');
  const summaryAtelier = document.getElementById('summary-atelier-name');
  const summaryDuration = document.getElementById('summary-duration');
  const summarySession = document.getElementById('summary-session');
  const summaryFormat = document.getElementById('summary-format');

  // Modal et son conteneur de badge
  const modal = document.getElementById('confirmation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalPrintBtn = document.getElementById('modal-print-btn');
  const cadetBadgeContainer = document.getElementById('cadet-badge-container');

  // Pré-remplissage via URL (?atelier=...)
  const params = new URLSearchParams(window.location.search);
  const atelierUrlParam = params.get('atelier');
  if (atelierUrlParam && atelierSelect) {
    if (WORKSHOP_METADATA[atelierUrlParam]) {
      atelierSelect.value = atelierUrlParam;
    }
  }

  // Mise à jour de la carte récapitulative
  const updateSummaryCard = () => {
    const nom = nomInput ? nomInput.value.trim() : '';
    const prenom = prenomInput ? prenomInput.value.trim() : '';
    if (summaryCadet) {
      summaryCadet.textContent =
        prenom || nom ? `${prenom} ${nom}`.trim() : 'Non assigné';
    }

    const selectedAtelierKey = atelierSelect ? atelierSelect.value : '';
    const workshopInfo = WORKSHOP_METADATA[selectedAtelierKey];

    if (summaryAtelier) {
      summaryAtelier.textContent = workshopInfo
        ? workshopInfo.title
        : 'Non sélectionné';
    }

    if (summaryDuration) {
      summaryDuration.textContent = workshopInfo ? workshopInfo.duration : '--';
    }

    if (summarySession && sessionSelect && sessionSelect.selectedIndex >= 0) {
      summarySession.textContent =
        sessionSelect.options[sessionSelect.selectedIndex].text;
    }

    if (summaryFormat && formatSelect && formatSelect.selectedIndex >= 0) {
      summaryFormat.textContent =
        formatSelect.options[formatSelect.selectedIndex].text;
    }
  };

  // Écouteurs pour actualisation en direct
  [nomInput, prenomInput].forEach((input) => {
    if (input) input.addEventListener('input', updateSummaryCard);
  });

  [atelierSelect, sessionSelect, formatSelect].forEach((select) => {
    if (select) select.addEventListener('change', updateSummaryCard);
  });

  // Initialisation immédiate du récapitulatif
  updateSummaryCard();

  // Gestion des erreurs inline accessibles
  const setFieldError = (inputEl, errorId, isError) => {
    const errorEl = document.getElementById(errorId);
    if (!inputEl) return;

    if (isError) {
      inputEl.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.classList.add('is-visible');
    } else {
      inputEl.removeAttribute('aria-invalid');
      if (errorEl) errorEl.classList.remove('is-visible');
    }
  };

  // Nettoyage de l'erreur dès que l'utilisateur corrige
  if (nomInput) {
    nomInput.addEventListener('input', () => {
      if (nomInput.value.trim().length > 0) setFieldError(nomInput, 'err-nom', false);
    });
  }

  if (prenomInput) {
    prenomInput.addEventListener('input', () => {
      if (prenomInput.value.trim().length > 0) setFieldError(prenomInput, 'err-prenom', false);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'err-email', false);
      }
    });
  }

  if (atelierSelect) {
    atelierSelect.addEventListener('change', () => {
      if (atelierSelect.value !== '') setFieldError(atelierSelect, 'err-atelier', false);
    });
  }

  if (rgpdCheckbox) {
    rgpdCheckbox.addEventListener('change', () => {
      if (rgpdCheckbox.checked) setFieldError(rgpdCheckbox, 'err-rgpd', false);
    });
  }

  /* ==========================================================================
     MODULE 6 : VALIDATION ACCESSIBLE DU FORMULAIRE
     ========================================================================== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    // 1. Validation Nom
    if (!nomInput || nomInput.value.trim().length === 0) {
      setFieldError(nomInput, 'err-nom', true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = nomInput;
    } else {
      setFieldError(nomInput, 'err-nom', false);
    }

    // 2. Validation Prénom
    if (!prenomInput || prenomInput.value.trim().length === 0) {
      setFieldError(prenomInput, 'err-prenom', true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = prenomInput;
    } else {
      setFieldError(prenomInput, 'err-prenom', false);
    }

    // 3. Validation Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      setFieldError(emailInput, 'err-email', true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = emailInput;
    } else {
      setFieldError(emailInput, 'err-email', false);
    }

    // 4. Validation Atelier
    if (!atelierSelect || atelierSelect.value === '') {
      setFieldError(atelierSelect, 'err-atelier', true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = atelierSelect;
    } else {
      setFieldError(atelierSelect, 'err-atelier', false);
    }

    // 5. Validation RGPD
    if (!rgpdCheckbox || !rgpdCheckbox.checked) {
      setFieldError(rgpdCheckbox, 'err-rgpd', true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = rgpdCheckbox;
    } else {
      setFieldError(rgpdCheckbox, 'err-rgpd', false);
    }

    // Si erreurs : focus sur le premier champ en anomalie
    if (!isValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    /* ==========================================================================
       MODULE 7 : GÉNÉRATEUR DE CARTE D'EMBARQUEMENT CADET & MODALE
       ========================================================================== */
    const cadetName = `${prenomInput.value.trim()} ${nomInput.value.trim()}`;
    const workshopKey = atelierSelect.value;
    const workshopInfo = WORKSHOP_METADATA[workshopKey] || {
      title: 'Atelier Spatial Standard',
      division: 'Division Générale Starfleet',
      color: '#48e5c2',
      insignia: '💻',
      clearance: 'Niveau 1 — Rang Enseigne',
    };

    const sessionText = sessionSelect ? sessionSelect.options[sessionSelect.selectedIndex].text : '';
    const formatText = formatSelect ? formatSelect.options[formatSelect.selectedIndex].text : '';
    const inscriptionDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const registryNumber = `NCC-1701-TH-${Math.floor(1000 + Math.random() * 9000)}`;

    // Rendu HTML du Pass d'embarquement officiel
    if (cadetBadgeContainer) {
      cadetBadgeContainer.innerHTML = `
        <div class="cadet-badge-card" style="border-left-color: ${workshopInfo.color};">
          <div class="cadet-badge-header">
            <div class="cadet-badge-title">
              <img src="assets/images/trekhub-logo.svg" alt="" width="22" height="22" style="flex-shrink: 0;" />
              <span>Académie Spatiale TrekHub • Starfleet ID</span>
            </div>
            <span class="cadet-registry-id">${registryNumber}</span>
          </div>
          <div class="cadet-badge-body">
            <div class="cadet-info-item">
              <span class="cadet-info-label">Cadet / Apprenant</span>
              <span class="cadet-info-value">${escapeHtml(cadetName)}</span>
            </div>
            <div class="cadet-info-item">
              <span class="cadet-info-label">Division Assignée</span>
              <span class="cadet-info-value" style="color: ${workshopInfo.color};">${workshopInfo.division}</span>
            </div>
            <div class="cadet-info-item">
              <span class="cadet-info-label">Atelier / Mission</span>
              <span class="cadet-info-value">${workshopInfo.title}</span>
            </div>
            <div class="cadet-info-item">
              <span class="cadet-info-label">Session &amp; Format</span>
              <span class="cadet-info-value">${escapeHtml(sessionText)} (${escapeHtml(formatText)})</span>
            </div>
            <div class="cadet-info-item">
              <span class="cadet-info-label">Date d'incorporation</span>
              <span class="cadet-info-value">${inscriptionDate}</span>
            </div>
            <div class="cadet-info-item">
              <span class="cadet-info-label">Accréditation Officielle</span>
              <span class="cadet-info-value">${workshopInfo.clearance}</span>
            </div>
          </div>
          <div class="cadet-badge-footer">
            <span>AUTHENTIFIED PROTOCOL 47 // SECTOR 001</span>
            <div class="cadet-barcode" aria-hidden="true"></div>
          </div>
        </div>
      `;
    }

    // Affichage de la modal accessible
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (modalPrintBtn) modalPrintBtn.focus();
    }
  });

  // Fermeture de la modal
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.focus();
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalPrintBtn) {
    modalPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Fermeture si clic sur le fond translucide
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Fermeture avec Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   MODULE 8 : UTILITAIRES & SÉCURISATION DU DOM
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
