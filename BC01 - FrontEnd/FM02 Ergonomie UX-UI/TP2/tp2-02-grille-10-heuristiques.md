# TP 2 — Étape 02 : Grille d'Audit des 10 Heuristiques de Nielsen sur Skillhub.ai

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Meilleures pratiques en matière de design d'interaction)  
**Formateur :** A. Mekouar · IMIE Paris  
**Plateforme auditée :** [`https://skillhub.ai/`](https://skillhub.ai/) (Audit réalisé le 25/09/2026)  
**Consigne (Slide 30 & 33) :** Produire 10 lignes (une par heuristique) avec l'observation, la preuve (citation ou code extrait) et la sévérité cotée de 0 à 4 selon le barème officiel de Jakob Nielsen.

---

## 📊 Barème de Sévérité de Nielsen (*Slide 30 & 31*)

* **0 — Pas un problème :** L'interface respecte la règle ou l'élément est conforme. *(Règle du cours : un audit qui ne cote rien à 0 n'a pas été fait honnêtement)*.
* **1 — Cosmétique :** Défaut visuel ou d'alignement mineur, contournable et rare.
* **2 — Mineur :** Hésitation courte, contournable mais fréquent.
* **3 — Majeur :** Bloquant pour une partie des usagers, tâche terminée au prix d'un gros effort.
* **4 — Catastrophique :** Bloquant, fréquent, empêche l'accomplissement de la tâche, fait fuir l'utilisateur.

---

## 📋 Grille d'Audit des 10 Heuristiques

| N° | Heuristique de Nielsen | Ce qui a été observé sur Skillhub.ai | Preuve concrète (Code / Citation / Élément) | Sévérité (0 à 4) |
| :---: | :--- | :--- | :--- | :---: |
| **01** | **Visibilité de l'état du système** | Plusieurs boutons d'action majeurs n'ont aucun retour visuel d'état ni déclencheur réel. Le bouton *« View Demo »* dans le Hero ne réagit pas au clic et ne charge aucune démo, laissant l'utilisateur dans le doute sur l'état de son action. | `<button class="bg-surface-container-high ...">View Demo</button>` : aucun attribut `onclick`, aucune ancre, aucun spinner ni état `:active`. | **3 — Majeur** |
| **02** | **Correspondance avec le monde réel** | La métaphore pédagogique employée pour expliquer une boucle informatique (*for loop*) à un novice est concrète et empruntée au monde réel (distribuer 10 cupcakes à 10 amis). Le vocabulaire évite le jargon rébarbatif. | Citation de l'agent IA : *« Imagine you're handing out 10 cupcakes to 10 friends. A for loop is like saying: for cupcake in tray: give_to_friend(cupcake) »*. | **0 — Pas un problème** |
| **03** | **Contrôle et liberté de l'utilisateur** | Les deux rangées de témoignages clients défilent en continu et en boucle automatique (*marquee infinite*) sans aucun bouton de pause, d'arrêt ou de défilement manuel. L'utilisateur est privé du contrôle de sa lecture. | `<div class="flex animate-scroll-right whitespace-nowrap gap-6 py-4">` sans aucun composant `<button aria-label="Pause">`. Viole aussi le critère WCAG 2.2.2. | **3 — Majeur** |
| **04** | **Cohérence et standards** | **Rupture critique des conventions web :** Tous les liens du menu haut (*Features, How it Works, Pricing*) et du footer (*Privacy, Terms*) sont des ancres mortes pointant vers `#`. De plus, le même intitulé *« Download Now »* est un lien App Store dans le menu, mais un `<button>` inactif dans le Hero. | Menu : `<a href="#">Pricing</a>`<br>Nav : `<a href="https://apps.apple.com/...">Download Now</a>`<br>Hero : `<button>Download Now</button>` (2 balises et 2 comportements différents pour le même libellé). | **4 — Catastrophique** |
| **05** | **Prévention des erreurs** | Le bouton de téléchargement de la barre de navigation redirige brutalement vers l'App Store Apple iOS, sans vérifier ni avertir au préalable que le service nécessite un appareil Apple (frustration pour un utilisateur sous Windows ou Android). | URL directe sans modale préventive ni détection d'OS : `href="https://apps.apple.com/app/apple-store/id1517651288"`. | **2 — Mineur** |
| **06** | **Reconnaître plutôt que se souvenir** | **Absence totale de l'information tarifaire.** Lors de la Tâche 2, l'utilisateur cherche le coût de l'abonnement. Le lien *« Pricing »* mène à `#` et aucun tarif n'est mentionné sur toute la page. L'utilisateur doit deviner ou installer l'application pour connaître les prix. | Recherche dans le DOM : 0 occurrence de prix, de symbole `$` ou `€`. Seul le bouton non informatif *« Free Trial »* apparaît sans conditions. | **4 — Catastrophique** |
| **07** | **Souplesse et efficacité** | Absence totale de raccourcis, de filtres ou de recherche par langage. Les icônes de technologies (Python, JS, Swift) sont des conteneurs statiques non cliquables : impossible d'accéder directement au parcours de son choix. | `<div class="p-3 bg-surface-container-lowest rounded-full shadow-sm"><img alt="Python"...></div>` : simple image statique sans lien de navigation rapide. | **2 — Mineur** |
| **08** | **Design esthétique et minimaliste** | L'interface est moderne et soignée visuellement, mais le ratio signal/bruit est alourdi par une double rangée de 10 avis géants défilants qui occupent plus de 600 px de hauteur et noient l'accès aux informations fonctionnelles. | 2 blocs `animate-scroll` avec duplication d'éléments dans le DOM pour la boucle d'animation, générant une surcharge visuelle sans valeur ajoutée. | **1 — Cosmétique** |
| **09** | **Aider à réparer les erreurs** | Le faux chat interactif propose un bouton *« Sure, give me a challenge! »*. En cliquant dessus, aucune interaction ne se produit et aucun message explicatif n'informe l'utilisateur que cette démo est fictive ou nécessite l'application. | `<button class="px-6 py-2 ...">Sure, give me a challenge!</button>` : élément interactif inerte sans message d'orientation ni aide au diagnostic. | **2 — Mineur** |
| **10** | **Aide et documentation** | Aucune section FAQ, aucun centre d'aide ni moyen de contact opérationnel. Les liens du footer *« Curriculum »*, *« AI Tutors »* et *« Contact Us »* sont tous factices (`href="#"`), privant l'utilisateur de toute documentation préalable. | Liens morts dans le footer : `<a href="#">Contact Us</a>`, `<a href="#">Curriculum</a>`. Impossible d'obtenir une assistance avant téléchargement. | **3 — Majeur** |

---

## 📈 Bilan de la Distribution des Sévérités

* **Sévérité 0 (Conforme) :** 1 heuristique (H2 — Correspondance avec le monde réel).
* **Sévérité 1 (Cosmétique) :** 1 heuristique (H8 — Design esthétique et minimaliste).
* **Sévérité 2 (Mineur) :** 3 heuristiques (H5 — Prévention erreurs, H7 — Souplesse, H9 — Gestion erreurs).
* **Sévérité 3 (Majeur) :** 3 heuristiques (H1 — Visibilité état, H3 — Contrôle utilisateur, H10 — Aide & documentation).
* **Sévérité 4 (Catastrophique) :** 2 heuristiques (H4 — Cohérence et standards, H6 — Reconnaissance du prix).

Ce relevé met en évidence deux blocages critiques de sévérité 4 (les liens morts `href="#"` et l'absence totale de tarification) qui feront l'objet de nos recommandations prioritaires dans le fichier suivant.
