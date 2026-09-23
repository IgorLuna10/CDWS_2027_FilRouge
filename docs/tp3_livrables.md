# Livrables TP 3 : La landing page SkillHub, responsive sans framework

Ce document constitue le rapport de justification et la documentation d'accompagnement pour le **TP 3** du projet **SkillHub / TrekHub**.

---

## 1. Tableau des points de rupture et de leur justification

Le design a été élaboré selon une approche **Mobile-First** absolue : les règles globales sans `@media` s'appliquent sur smartphone, puis les enrichissements s'activent progressivement au moyen de media queries déclarées en unités **`em`** (`1em = 16px`).

| Palier | Point de rupture (Breakpoint) | Largeur d'écran (px) | Dispositions & Grilles appliquées | Justification visuelle & Comportement à l'écran |
| :--- | :--- | :--- | :--- | :--- |
| **Palier 1** | *Base (Mobile-First)* | `< 768px` (`< 48em`) | **Grid Stacking 1 Colonne**<br>- `body` en `grid-template-areas` mono-colonne (`header`, `main`, `footer`).<br>- Header vertical centré.<br>- Boutons à 100% de largeur (`min-height: 2.75rem`). | Sur écran étroit (téléphone), l'empilement vertical évite la compression des textes et garantit des zones de clic (touch targets) généreuses d'au moins 44px sans décalage. |
| **Palier 2** | `min-width: 48em` | `≥ 768px` | **Disposition 2 Colonnes**<br>- Header horizontal (Logo à gauche, Nav à droite).<br>- Accroche en Grille 2 colonnes (Texte à gauche, Image à droite).<br>- Grille auto-fit pour ateliers et formateurs. | À 768px, l'espace horizontal permet d'afficher la navigation en ligne sans chevauchement et de placer l'image d'accroche à côté du titre. |
| **Palier 3** | `min-width: 64em` | `≥ 1024px` | **Grand Écran / Desktop**<br>- Conteneur principal borné à `max-width: 75rem` (`1200px`) et centré.<br>- Marges intérieures et espacements élargis (`4.5rem`).<br>- Grille 3-4 colonnes pour formateurs et valeurs. | Évite que les lignes de texte ne s'étirent à l'infini sur les grands écrans et préserve la lisibilité avec un nombre de caractères par ligne contrôlé (`max-width: 65ch`). |

---

## 2. Procédure de vérification « zéro débordement horizontal »

Afin de garantir l'absence totale de barre de défilement horizontale (`overflow-x`), les contrôles suivants ont été appliqués :

1. **Box Model & Reset Universel** :
   ```css
   *, *::before, *::after {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
   }
   ```
2. **Gestion Réactive des Médias** :
   ```css
   img, svg {
     max-width: 100%;
     height: auto;
     display: block;
   }
   ```
3. **Vérouillage de la Largeur du Body** :
   ```css
   html, body {
     width: 100%;
     overflow-x: hidden;
   }
   ```
4. **Test Automatisé / Console JavaScript** :
   Un contrôle dans le navigateur confirme l'égalité parfaite :
   `document.documentElement.clientWidth === window.innerWidth` (aucune barre de défilement horizontale).

---

## 3. Typographie fluide et Cartes d'ateliers

* **Titre principal (`h1`)** : Utilisation de la fonction fluide `clamp()` :
  `font-size: clamp(2rem, 5vw + 1rem, 3.5rem);`
* **Cartes d'ateliers en Flexbox avec bouton aligné en pied** :
  ```css
  .workshop-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .workshop-item p {
    flex-grow: 1;
  }
  .workshop-item .btn-workshop {
    margin-top: auto; /* Aligne le bouton strictly en bas de carte */
  }
  ```
