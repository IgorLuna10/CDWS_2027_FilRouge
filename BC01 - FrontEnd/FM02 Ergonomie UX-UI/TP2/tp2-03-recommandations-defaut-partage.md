# TP 2 — Étape 03 : Recommandations Vérifiables & Défaut Partagé avec TrekHub

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Meilleures pratiques en matière de design d'interaction)  
**Formateur :** A. Mekouar · IMIE Paris  
**Plateforme auditée :** [`https://skillhub.ai/`](https://skillhub.ai/)  
**Consigne (Slide 30 & 33) :**  
1. Pour les trois problèmes les plus sévères de l'audit, rédiger une recommandation **VÉRIFIABLE** (pas de formule floue du type *« améliorer la clarté »*, mais ce que l'on doit concrètement voir à l'écran après correction).  
2. Identifier formellement **le défaut que vous partagez avec eux**, qui servira de matière première pour les corrections du TP 3 et du TP 4.

---

## 🛠️ 1. Les Trois Recommandations Vérifiables (Sélectionnées par sévérité décroissante)

### 🔴 Recommandation 1 (Issue du défaut n°1 — Sévérité 4 : Heuristique 6 « Reconnaître plutôt que se souvenir »)
* **Problème observé :** Absence totale de tarification. Le lien *« Pricing »* de la barre de navigation pointe vers `#` et aucun tarif n'apparaît sur toute la landing page. L'utilisateur est dans l'impossibilité d'estimer le coût de l'outil avant téléchargement.
* **Ce qu'on doit voir après (Recommandation vérifiable) :**
  1. Le lien `<a href="#pricing">Pricing</a>` fait défiler la page de manière fluide (`scroll-behavior: smooth`) vers une nouvelle section dédiée `<section id="pricing">`.
  2. Cette section affiche une grille comparative de **deux cartes d'abonnement claires** :
     - **Offre Free / Découverte :** `0 $ / mois` — 5 défis quotidiens, 1 tuteur IA limité, accès à Python uniquement. Bouton : *« Démarrer gratuitement »*.
     - **Offre Pro Unlimited :** `19,99 $ / mois` (ou `14,99 $ / mois facturé annuellement`) — Accès illimité aux 3 langages (Python, JS, Swift), débogueur IA temps réel, projets guidés. Bouton : *« Commencer l'essai de 7 jours »*.
  3. Une mention légale explicite sous le bouton Pro : *« Essai gratuit de 7 jours sans engagement. Annulation en 1 clic depuis votre profil avant le 7ᵉ jour. »*

---

### 🔴 Recommandation 2 (Issue du défaut n°2 — Sévérité 4 : Heuristique 4 « Cohérence et standards »)
* **Problème observé :** Rupture des standards du Web avec des ancres mortes (`href="#"`) sur tous les éléments de navigation, et incohérence sur le libellé *« Download Now »* (qui est un lien externe App Store dans le header, mais un `<button>` sans code ni action dans le Hero).
* **Ce qu'on doit voir après (Recommandation vérifiable) :**
  1. Tous les liens du menu haut pointent vers des ancres internes existantes et fonctionnelles :  
     `<a href="#features">Features</a>`, `<a href="#how-it-works">How it Works</a>`, `<a href="#pricing">Pricing</a>`.
  2. Tous les boutons portant la mention *« Download Now »* déclenchent le même composant interactif : une modale accessible `<dialog id="modale-telechargement">` qui propose deux options de téléchargement directes :
     - Bouton avec badge officiel : *« Télécharger sur l'App Store (iOS) »*.
     - Bouton avec badge officiel : *« Disponible sur Google Play (Android) »*.
     - Lien alternatif : *« Continuer sur la version Web (navigateur) »*.
  3. Dans le pied de page, les liens *« Privacy Policy »*, *« Terms of Service »* et *« Contact Us »* ouvrent de véritables pages HTML dédiées ou déclenchent un formulaire de contact fonctionnel avec champ courriel et message.

---

### 🟠 Recommandation 3 (Issue du défaut n°3 — Sévérité 3 : Heuristique 3 « Contrôle et liberté de l'utilisateur » & WCAG 2.2.2)
* **Problème observé :** Deux rangées de témoignages défilent en continu sans possibilité pour l'utilisateur de suspendre ou contrôler le mouvement, créant une fatigue visuelle et empêchant la lecture posée des avis.
* **Ce qu'on doit voir après (Recommandation vérifiable) :**
  1. Un bouton de contrôle visible et accessible est placé en tête du carrousel de témoignages :
     ```html
     <button type="button" id="btn-pause-slider" class="btn-control" aria-label="Mettre en pause les témoignages" aria-pressed="false">
       <span class="icon-pause" aria-hidden="true">⏸</span>
       <span>Pause</span>
     </button>
     ```
  2. Au clic sur ce bouton ou lors du survol/focus clavier sur une carte de témoignage, la propriété CSS `animation-play-state: paused` s'applique immédiatement à toutes les cartes en mouvement.
  3. Prise en compte automatique de la préférence utilisateur pour la réduction des mouvements :
     ```css
     @media (prefers-reduced-motion: reduce) {
       .animate-scroll-right,
       .animate-scroll-left {
         animation: none;
         overflow-x: auto;
       }
     }
     ```

---

## 🪞 2. Le Défaut Partagé entre Skillhub.ai et notre projet TrekHub (FM01)

> *Consigne du cours (Slide 33) :*  
> « Notez enfin le problème que vous avez trouvé chez eux et qui existe aussi chez vous. C'est celui-là qu'on corrige demain. »

### 🚨 Le constat du défaut commun : L'absence de prix en évidence sur l'offre de formation (Heuristique n°6)

* **Chez Skillhub.ai :**  
  Le service vend des parcours de code mais dissimule totalement ses tarifs. Le lien de navigation est factice (`href="#"`) et aucun montant en dollars ou euros n'est mentionné. L'utilisateur est contraint de télécharger l'application à l'aveugle.
* **Chez TrekHub (notre landing page FM01 actuelle) :**  
  Dans notre fichier [`FM01 Dev interfaces/src/index.html`](../../FM01%20Dev%20interfaces/src/index.html), les cartes de notre catalogue d'ateliers (`.workshop-item`) souffrent exactement de la même lacune :  
  Elles affichent un titre (*« HTML Sémantique »*, *« CSS Moderne »*) et une description sommaire, mais **aucun prix n'est affiché sur la carte**, aucune durée n'est précisée et aucun badge de niveau n'est présent.
* **Pourquoi ce défaut est critique pour un apprenti / adulte en reconversion :**  
  Comme identifié dans notre persona Maya (TP 1), un apprenant ou un apprenti dispose d'un budget restreint. L'absence de tarif visible crée une méfiance immédiate, donne l'impression d'un devis caché et fait fuir l'utilisateur avant même qu'il ne découvre la qualité du contenu pédagogique.
* **Engagement de correction pour le TP 3 & TP 4 :**  
  C'est précisément ce composant carte qui sera redessiné dans **Figma (TP 3)** avec un jeton de prix mis en avant (`font-weight: 700`, `120 € TTC`) et intégré de manière accessible dans le code HTML/CSS de **FM02 (TP 4)**.
