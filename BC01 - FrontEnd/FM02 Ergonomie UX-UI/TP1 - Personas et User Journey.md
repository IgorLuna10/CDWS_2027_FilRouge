# TP 1 — Deux Personas et un Parcours d'Inscription (SkillHub / TrekHub)

**Formation :** CDWFS (RNCP 39608) — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Formateur :** A. Mekouar · IMIE Paris  
**Critère d'évaluation :** C02 — Compréhension approfondie de l'expérience utilisateur (justification des choix d'interface)  

---

## 1. Persona 1 · L'Apprenante (Cadette)

### Profil général
**Maya**, 29 ans, ancienne assistante administrative en reconversion professionnelle vers le développement web front-end.

* **01 · Contexte d'usage**  
  Se connecte le soir depuis son smartphone (iPhone SE / écran 4,7 pouces), souvent dans le métro ou le bus avec une connexion 4G instable/faible, après une journée de travail dense.
* **02 · Objectif**  
  Trouver un atelier pratique, court (1 à 2 h) et compatible avec ses disponibilités de soirée, et savoir en moins de 30 secondes si le niveau est adapté à son profil débutant.
* **03 · Niveau d'aisance avec l'outil**  
  Usage quotidien des applications mobiles grand public, mais néophyte dans le développement. Vite rebutée par le jargon technique intimidant (*« stack »*, *« CI/CD »*, *« DOM asynchrone »*, *« SSR »*).
* **04 · Freins (ce qui la fait abandonner)**  
  - Devoir créer un compte ou remplir un formulaire long avant de voir les tarifs et dates.  
  - Un tarif dissimulé qui n'apparaît qu'au moment de payer.  
  - L'incertitude sur les prérequis techniques (peur de ne pas avoir le niveau).
* **05 · Contraintes d'accès (obligatoire à l'EC01)**  
  Consulte l'interface en mobilité d'une seule main, sous une luminosité ambiante changeante : les textes en contraste insuffisant (< 4,5:1), les polices trop fines et les zones tactiles inférieures à 44 × 44 px la bloquent immédiatement.
* **Sur quoi il repose (sourcé)**  
  **Hypothèse assumée** complétée par les données de la Grande École du Numérique (baromètre des profils en reconversion web 2024) et observation de 3 apprenants débutants consultant des plateformes de formation sur smartphone dans les transports.

### Arbitrages d'interface
* **Décision 1 tranchée :** Afficher systématiquement le badge de niveau (*« Débutant / Aucun prérequis »*), le prix en euros TTC et la durée directement sur la carte de l'atelier, avant tout clic ou navigation.
* **Décision 2 tranchée :** Remplacer la page d'inscription lourde par une modale `<dialog>` légère en 3 champs maximum (Nom, Courriel, Session choisie) avec validation en direct au fil de la frappe.
* **Idée abandonnée (qui dérange) :** Abandon de la vidéo de présentation en autoplay dans le Hero banner : elle consomme la bande passante mobile de Maya, ralentit l'affichage de la page (critère de performance) et disperse l'attention de l'objectif principal.

---

## 2. Persona 2 · Le Formateur (Instructeur Indépendant)

### Profil général
**Thomas**, 37 ans, Développeur Web Senior & Consultant formateur indépendant spécialisé en interfaces modernes et accessibilité.

* **01 · Contexte d'usage**  
  Se connecte depuis son poste de travail (PC double écran 27 pouces ou laptop 14 pouces), souvent entre deux missions clients ou le samedi matin. Dispose de peu de temps libre et exige une efficacité maximale.
* **02 · Objectif**  
  Proposer un atelier technique de spécialisation (ex. CSS Grid, Accessibilité WCAG), calibrer le nombre de places (jauge) et s'assurer que les candidats inscrits ont bien le niveau requis.
* **03 · Niveau d'aisance avec l'outil**  
  Expert informatique, utilise le terminal, les raccourcis clavier et consulte quotidiennement des documentations techniques complexes.
* **04 · Freins (ce qui le fait abandonner)**  
  - Un parcours de soumission d'atelier lourd avec un processus de validation opaque.  
  - L'absence de mise en valeur de son expertise pédagogique (profil invisible ou réduit à un simple nom sans lien).  
  - Une interface lente avec des formulaires qui perdent la saisie en cas d'erreur.
* **05 · Contraintes d'accès (obligatoire à l'EC01)**  
  Navigue quasi exclusivement au clavier (touche `Tab`, raccourcis). Ne tolère aucun élément sans indicateur de focus visible, aucun piège au clavier (*keyboard trap*), et travaille en mode sombre avec des contrastes nets (3:1 pour les composants, 4,5:1 pour le texte).
* **Sur quoi il repose (sourcé)**  
  **Entretiens semi-directifs** réalisés auprès de 2 formateurs indépendants dans le secteur du développement web (recueil des attentes sur la visibilité de leur expertise et la gestion de leur calendrier).

### Arbitrages d'interface
* **Décision 1 tranchée :** Garantir une navigation 100 % au clavier sur toute la plateforme : ordre de tabulation séquentiel strict, indicateur `:focus-visible` épais (3 px, offset 2 px, ratio > 3:1) et fermeture de tout élément interactif (menu, modale) avec la touche `Échap`.
* **Décision 2 tranchée :** Intégrer une section « Équipe pédagogique » détaillée sur la page d'accueil reliant chaque formateur à ses ateliers animés, avec photo accessible (`alt` informatif) et spécialité claire.
* **Idée abandonnée (qui dérange) :** Abandon du menu de navigation accordéon replié sur desktop : Thomas veut voir l'arborescence immédiatement accessible sans multiplier les clics à la souris.

---

## 3. User Journey d'Inscription (Persona Apprenant : Maya)

Parcours de bout en bout en 6 colonnes, de la découverte à la confirmation d'inscription :

| Étape | Point de contact | Action | Attente | Point de Douleur (≥ 4) | Décision d'interface (Spécification) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01. Découverte** | Réseau social / Moteur de recherche &rarr; Landing page TrekHub | Clique sur un lien recommandé et arrive sur la page d'accueil sur mobile. | Comprendre en moins de 10 secondes à qui s'adresse TrekHub et si c'est accessible aux débutants. | **Douleur 1 :** L'accroche est vague et utilise du jargon abstrait ; Maya hésite et craint que le site ne s'adresse qu'à des experts. | **Décision 1 :** Rédiger un titre explicite (*« Formations Web pour Débutants & Reconversion »*) et placer immédiatement sous le Hero un bouton d'action visible : *« Découvrir les ateliers débutants »*. |
| **02. Exploration** | Section Catalogue des Ateliers (`#ateliers`) | Fait défiler les cartes d'ateliers sur son smartphone. | Repérer en un coup d'œil l'atelier d'initiation (HTML/CSS) et vérifier les horaires. | **Douleur 2 :** Impossible de filtrer par créneau (soir/week-end) et les badges de niveau sont absents des cartes. | **Décision 2 :** Ajouter sur chaque carte d'atelier un badge de niveau visible (*« Débutant »*), la mention *« Format : Soirée (18h-20h) »* et le tarif clair (*ex. 120 €*). |
| **03. Décision** | Carte d'atelier détaillée & bouton d'action | Lit le descriptif de l'atelier *« HTML Sémantique & Accessibilité »*. | Confirmer le programme détaillé et les prérequis avant de s'engager. | **Douleur 3 :** Le bouton d'inscription renvoie vers une page formulaire externe sans rappeler l'atelier choisi ni le récapitulatif du prix. | **Décision 3 :** Déclencher l'inscription dans une modale accessible `<dialog>` qui pré-remplit l'intitulé de l'atelier choisi, sa date et son coût. |
| **04. Inscription** | Modale d'inscription (`<dialog id="modale-inscription">`) | Saisit son nom, son courriel et valide le formulaire d'une seule main. | Finaliser l'inscription en moins d'une minute sans créer un mot de passe complexe immédiatement. | **Douleur 4 :** Le formulaire rejette la saisie en vidant les champs ou affiche un message d'erreur rouge illisible au soleil. | **Décision 4 :** Validation au fil de la frappe (`input`), message d'aide relié par `aria-describedby`, conservation intégrale des données saisies, et cibles tactiles de 48 px. |
| **05. Confirmation** | Message de confirmation & Courriel récapitulatif | Lit le message de validation à l'écran et consulte sa boîte mail. | Avoir la certitude que sa place est réservée et connaître la suite. | **Douleur 5 :** Le message indique juste *« Inscription enregistrée »* sans date, sans lien de visioconférence ni bouton d'ajout au calendrier. | **Décision 5 :** Afficher un écran de succès avec bouton *« Ajouter à mon calendrier (Google / ICS) »* et envoyer un courriel contenant le lien de connexion et la check-list des prérequis. |

---

## 4. Confrontation avec la Landing Page FM01 actuelle

En confrontant notre parcours utilisateur (Maya) et les exigences d'accessibilité (Thomas) avec le code réel de notre landing page actuelle ([`BC01 - FrontEnd/FM01 Dev interfaces/src/index.html`](./FM01%20Dev%20interfaces/src/index.html)), voici les éléments que le parcours **condamne formellement** et qui feront l'objet des refontes du **TP 3** (Figma) et **TP 4** (Accessibilité) :

### Ce que le parcours condamne dans la version actuelle :
1. **Les cartes ateliers incomplètes (`.workshop-item`) :**  
   - *Constat actuel :* Les cartes n'affichent qu'un titre et un paragraphe descriptif.  
   - *Condamnation :* Aucun prix, aucune mention de durée ni badge de niveau ne sont visibles. Maya doit cliquer à l'aveugle pour espérer trouver ces informations.
2. **La rupture de navigation vers une page formulaire dédiée (`href="inscription.html"`) :**  
   - *Constat actuel :* Le bouton *« S'inscrire à cet atelier »* déclenche une navigation vers une page distincte (`inscription.html?atelier=...`).  
   - *Condamnation :* Cette redirection casse le flux d'exploration mobile. Le parcours impose une modale native `<dialog>` intégrée à la landing page, ouverte via `showModal()`.
3. **L'absence d'indicateur de focus clavier visible (`:focus-visible`) :**  
   - *Constat actuel :* Les boutons et liens dépendent du focus par défaut du navigateur, parfois invisible sur certains fonds sombres.  
   - *Condamnation :* Inacceptable pour Thomas qui navigue au clavier ; un contour d'au moins 3 px avec ratio de contraste 3:1 est requis.
4. **L'absence de filtrage rapide en haut de catalogue :**  
   - *Constat actuel :* Les ateliers sont présentés en liste fixe sans filtre de niveau ni de créneau horaire.  
   - *Condamnation :* Oblige l'utilisateur mobile pressé à lire l'intégralité des cartes.
