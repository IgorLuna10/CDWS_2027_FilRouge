# TP 1 — Étape 04 : Confrontation avec la Landing Page de FM01

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Compréhension approfondie de l'expérience utilisateur)  
**Consigne :** Confronter le *User Journey* de Maya et les exigences de Thomas avec la landing page actuelle de FM01 ([`BC01 - FrontEnd/FM01 Dev interfaces/src/index.html`](../FM01%20Dev%20interfaces/src/index.html)) et lister formellement tout ce que le parcours condamne.

> *Règle du cours (Slide 15 & 19) :*  
> « Confrontez : reprenez votre landing page de FM01 et entourez ce que le parcours condamne. C'est la matière du TP 3. »  
> Sans confrontation, un parcours utilisateur reste théorique. En pointant précisément ce qui dysfonctionne dans l'interface actuelle, on crée le cahier des charges de la refonte sous Figma (TP 3) et de l'intégration accessible (TP 4).

---

## 🔍 Synthèse des 5 éléments condamnés dans la page actuelle

| N° | Élément actuel de la page FM01 | Sélecteur / Emplacement HTML | Pourquoi le parcours le condamne | Qui est bloqué ? | Correction imposée pour le TP 3 & TP 4 |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **01** | **Cartes d'ateliers muettes sur le prix (Besoin clé de l'apprenti)** | `<article class="workshop-item">` *(l. 154-185)* | Les cartes n'affichent qu'un titre et un paragraphe. Aucun prix n'est mis en évidence. Un apprenti ou étudiant au budget restreint a besoin de savoir immédiatement si l'atelier est accessible financièrement avant d'investir son temps. | **Apprenti / Maya** (Budget & Reconversion) | Mettre le **prix en évidence directe** (typographie agrandie et en gras, *ex. 120 € TTC* ou mention *Prise en charge OPCO/Alternance*) ainsi que le badge de niveau (*« Débutant »*) dès la carte. |
| **02** | **Redirection vers une page externe (`inscription.html`)** | `<a href="inscription.html?atelier=...">` *(l. 159, 167...)* | Le clic recharge une page formulaire complète au lieu de rester sur la landing page. Provoque des abandons massifs sur mobile en 4G instable. | **Maya** (Apprenante) | Remplacer le lien vers `inscription.html` par l'ouverture d'une modale native `<dialog id="modale-inscription">` pré-remplissant l'atelier choisi. |
| **03** | **Indicateur de focus clavier insuffisant** | `a:focus-visible` dans `base.css` *(l. 98-100)* | Le style se limite à un changement de couleur de texte sans anneau de contour contrasté. Échec direct du critère WCAG 2.4.7 (Focus Visible). | **Thomas** (Formateur au clavier) | Imposer un contour d'anneau visible sur tous les éléments actifs : `:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }` avec ratio $\ge 3:1$. |
| **04** | **Accroche Hero abstraite et jargon technique** | `#accroche h1` et `#accroche p` *(l. 63-67)* | Le message *« repoussez les frontières du code »* est centré sur le concept plutôt que sur l'utilisateur. Ne rassure pas un profil en reconversion en 10 secondes. | **Maya** (Apprenante) | Reformuler l'accroche avec une proposition de valeur claire (*« Formations web pratiques pour débutants et profils en reconversion »*) et un CTA direct. |
| **05** | **Cartes formateurs déconnectées de leurs ateliers** | `<article class="instructor-card">` *(l. 195-230)* | Les formateurs sont présentés avec photo et fonction, mais sans lien ni mention des ateliers techniques qu'ils animent. | **Thomas** (Formateur indépendant) | Lier chaque instructeur aux fiches d'ateliers correspondantes pour valoriser son expertise et rassurer les apprenants. |

---

## 🛠️ Analyse détaillée par composant

### 1. Les vignettes d'ateliers (`.workshop-item`)
* **Code actuel dans `index.html` :**
  ```html
  <article class="workshop-item">
      <h3>HTML Sémantique &amp; Accessibilité</h3>
      <p>Structurez des pages robustes, inclusives et adaptées à tous les outils de navigation et d'assistance.</p>
      <a href="inscription.html?atelier=html" class="btn btn-workshop">S'inscrire à cet atelier</a>
  </article>
  ```
* **Ce qui est condamné :**  
  **Le prix n'est pas mis en évidence.** Pour un **apprenti**, un étudiant ou une personne en reconversion (dont le budget est serré et calculé au centime près), le coût financier est le premier critère éliminatoire. Ne pas afficher le prix de manière claire et saillante dès la carte produit :
  - **Crée une méfiance immédiate :** L'apprenti redoute un prix exorbitant, des frais cachés ou un abonnement forcé.
  - **Génère une friction cognitive :** Il doit obligatoirement cliquer, charger une nouvelle page et chercher l'information au lieu de la lire instantanément.
  - **Viole l'heuristique n°6 de Nielsen (*Reconnaître plutôt que se souvenir*)** et l'heuristique n°8 (*Sobriété et efficacité*).
* **Matière pour le TP 3 (Figma) :**  
  Concevoir un composant de carte avec auto-layout qui met le **prix en valeur comme élément hiérarchique fort** :
  - **Prix saillant et lisible :** Typographie agrandie (`font-weight: 700`, `1.25rem`), bien contrastée (ratio $\ge 7:1$).
  - **Précision du tarif :** `120 € TTC` (ou mention *« Prise en charge OPCO / Alternance possible »*).
  - **Badges contextuels :** Tag de niveau `Débutant · Aucun prérequis` et créneau horaire `Soirée (18h30-20h30)`.

---

### 2. Le parcours d'inscription et la rupture de page
* **Code actuel dans `index.html` :**
  ```html
  <a href="inscription.html?atelier=html" class="btn btn-workshop">S'inscrire à cet atelier</a>
  ```
* **Ce qui est condamné :**  
  L'abandon du contexte de la page d'accueil. Sur smartphone dans les transports (connexion 4G fluctuante), charger une seconde page HTML avec tout son CSS et ses assets expose l'utilisateur à des échecs réseau. De plus, l'utilisateur perd sa position de défilement.
* **Matière pour le TP 3 (Figma) et TP 4 (Code) :**  
  Remplacement par un bouton ouvrant une modale `<dialog>` native :
  ```html
  <button type="button" class="btn btn-workshop" data-atelier="HTML Sémantique" aria-haspopup="dialog">
      S'inscrire à cet atelier
  </button>
  ```
  Le script intercepte le clic, ouvre `modale.showModal()`, piège le focus à l'intérieur, et permet la fermeture immédiate avec la touche `Échap`.

---

### 3. La navigation au clavier et le focus visible
* **Code actuel dans `src/css/base.css` :**
  ```css
  a:hover,
  a:focus-visible {
    color: var(--color-primary-hover);
  }
  ```
* **Ce qui est condamné :**  
  Sur un fond sombre ou sur un bouton coloré, une simple modification de nuance de texte est imperceptible pour un utilisateur naviguant au clavier (Thomas) ou une personne malvoyante. Le navigateur applique un anneau par défaut souvent tronqué par les `overflow: hidden`.
* **Matière pour le TP 4 (Accessibilité) :**  
  Définir un jeton d'outline global respectant le critère WCAG 2.4.7 et WCAG 1.4.11 (3:1 minimum contre le fond) :
  ```css
  :focus-visible {
    outline: 3px solid #0B2540;
    outline-offset: 2px;
  }
  ```

---

## 🎯 Conclusion : La feuille de route pour le TP 3

Grâce à cette confrontation, le travail du **TP 3 (Design system minimal et maquette interactive Figma)** n'est plus un dessin au hasard :  
1. **Les 4 composants à prototyper** sont identifiés :
   - Le bouton interactif avec ses 6 états (*repos, survol, focus, actif, désactivé, chargement*).
   - La carte d'atelier enrichie de ses badges et métadonnées.
   - Le champ de formulaire avec message d'erreur d'accessibilité.
   - La modale d'inscription `<dialog>` responsive.
2. **Les 3 paliers responsive** (360 px mobile, 768 px tablette, 1280 px desktop) répondront directement au contexte de Maya (mobile) et de Thomas (grand écran).
