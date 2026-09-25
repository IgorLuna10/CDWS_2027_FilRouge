# TP 1 — Étape 03 : User Journey d'Inscription en Six Colonnes

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Compréhension approfondie de l'expérience utilisateur)  
**Consigne :** Construire le *User Journey* d'inscription du persona apprenant (Maya), en six colonnes, de la découverte à la confirmation, avec au moins quatre points de douleur et leurs décisions d'interface associées.

> *Règles méthodologiques du cours (Slides 13 à 17) :*  
> - **Le temps & les points de contact :** Le parcours suit la chronologie réelle de l'utilisateur sur toutes les surfaces (page web, formulaire, courriel).  
> - **Le point de douleur :** C'est le moment précis où la personne hésite, se trompe ou risque d'abandonner. C'est le livrable réel d'un parcours.  
> - **La décision d'interface :** La 6ᵉ colonne est **obligatoire**. Sans elle, le parcours est un simple constat ; avec elle, c'est une spécification technique prête pour l'intégration.

---

## 🗺️ Tableau du User Journey de Maya (6 colonnes réglementaires)

| N° | 1. Étape | 2. Point de contact | 3. Action concrète | 4. Attente de Maya | 5. Point de Douleur (Friction) | 6. Décision d'interface (Spécification) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Découverte** *(Où en est-elle ?)* | Réseau social &rarr; Landing page TrekHub (Hero) sur smartphone. | Clique sur un lien partagé le soir et arrive sur la page d'accueil en 4G. | Comprendre en moins de 10 secondes la promesse du site et si c'est adapté à son niveau débutant. | **Douleur 1 :** L'accroche est vague, orientée produit avec un jargon abstrait. Maya craint que le site ne s'adresse qu'à des experts et hésite à quitter. | **Décision 1 :** Rédiger une accroche limpide (*« Formations Web pour Débutants & Reconversion »*) et placer immédiatement un bouton d'action visible : *« Explorer les ateliers débutants »*. |
| **02** | **Exploration** *(Où en est-elle ?)* | Section Catalogue des Ateliers (`#ateliers`) sur mobile. | Fait défiler la liste des ateliers disponibles d'un seul pouce dans le métro. | Trouver un atelier d'initiation pratique (HTML/CSS) compatible avec ses soirées. | **Douleur 2 :** Aucun filtre par créneau horaire (soirée), et les cartes n'indiquent ni tarif, ni durée, ni badge de niveau. | **Décision 2 :** Ajouter sur chaque carte d'atelier un badge de niveau bien visible (*« Débutant / Aucun prérequis »*), le format horaire (*« Soirée : 18h30–20h30 »*) et le prix en euros TTC. |
| **03** | **Décision** *(Où en est-elle ?)* | Carte d'atelier & CTA *« S'inscrire »*. | Clique sur le bouton pour réserver sa place à l'atelier *« HTML Sémantique & Accessibilité »*. | Accéder rapidement au récapitulatif sans quitter la page ni perdre sa position dans le catalogue. | **Douleur 3 :** Le bouton déclenche un rechargement vers une page formulaire externe (`inscription.html`), rompant la navigation mobile. | **Décision 3 :** Ouvrir une modale native accessible `<dialog>` par-dessus la page actuelle, qui affiche automatiquement le nom, la date et le tarif de l'atelier choisi. |
| **04** | **Inscription** *(Où en est-elle ?)* | Modale d'inscription (`<dialog id="modale-inscription">`). | Saisit son nom et son adresse électronique à une main sur son clavier virtuel. | Finaliser l'inscription en moins d'une minute, sans création immédiate d'un mot de passe complexe. | **Douleur 4 :** En cas d'erreur de frappe, la page s'actualise et vide les champs saisis. Le message d'erreur rouge est illisible en plein soleil. | **Décision 4 :** Validation instantanée au fil de la frappe (`input`), message d'aide relié par `aria-describedby`, conservation stricte des données et cibles tactiles $\ge 48\text{ px}$. |
| **05** | **Confirmation** *(Où en est-elle ?)* | Écran de confirmation & Courriel de bienvenue. | Lit la confirmation à l'écran puis consulte sa boîte de réception mail. | Avoir la certitude absolue que sa place est réservée et savoir comment rejoindre l'atelier. | **Douleur 5 :** Simple mention laconique *« Merci pour votre inscription »*, sans rappel de la date, sans lien de visioconférence ni bouton d'agenda. | **Décision 5 :** Afficher un récapitulatif complet avec bouton *« Ajouter à mon calendrier (Google / ICS) »* et envoyer un courriel immédiat contenant le lien de connexion et la liste des prérequis. |

---

## 📉 Analyse de la Courbe Émotionnelle

Le parcours d'Inès/Maya met en lumière la dynamique émotionnelle (*Slides 14 & 15*) :

1. **Étape 1 (Découverte) :** *Curieuse mais vigilante* — Risque de rebond immédiat si la proposition de valeur n'est pas comprise en 10 secondes.
2. **Étape 2 (Exploration) :** *Intéressée* — Cherche activement l'information rassurante (prix et niveau).
3. **Étape 3 (Décision) :** *Engagée* — Prête à passer à l'action.
4. **Étape 4 (Inscription) :** **LE CREUX DU PARCOURS (Point critique)**  
   *C'est ici qu'on perd le plus d'utilisateurs.* Une contrainte technique excessive, un mot de passe refusé sans explication ou un formulaire réinitialisé font abandonner définitivement Maya.
5. **Étape 5 (Confirmation) :** *Rassurée et satisfaite* — La clarté des instructions après inscription valide la confiance envers la plateforme.

---

## 🔗 Ce que ce tableau alimente pour la suite du module

Selon la méthode enseignée dans le module FM02 :
* **Pour le TP 3 (Figma) :** Les cinq décisions de la colonne 6 définissent les composants exacts à prototyper en auto-layout (la carte avec badges, la modale `<dialog>`, les états de validation d'erreur, et les écrans de confirmation).
* **Pour le TP 4 (Accessibilité & Code) :** Elles fixent les exigences techniques à implémenter : balisage sémantique, attributs ARIA (`aria-describedby`, `aria-invalid`), gestion du focus clavier et contrastes conformes aux WCAG 2.2 AA.
