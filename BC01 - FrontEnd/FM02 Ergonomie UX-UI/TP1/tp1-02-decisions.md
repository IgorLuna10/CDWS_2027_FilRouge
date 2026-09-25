# TP 1 — Étape 02 : Décisions d'Interface et Idées Abandonnées

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Compréhension approfondie de l'expérience utilisateur)  
**Consigne :** Pour chaque persona, écrire DEUX décisions d'interface qu'il tranche — et UNE idée qu'il fait abandonner.  

> *Règle du cours (Slide 9) :*  
> - **Il tranche :** Devant un choix de conception, le persona donne une réponse directe. S'il n'en donne aucune, il est purement décoratif.  
> - **Il dérange :** Un bon persona dit NON à une idée que l'équipe appréciait. Un persona qui valide tout n'a pas été construit, il a été souhaité.

---

## 👩‍💻 1. Arbitrages pour Maya (Apprenante en reconversion)

### ✅ Décision d'interface 1 tranchée
* **Choix tranché :** Afficher directement le badge de niveau (*« Débutant / Aucun prérequis »*), le prix en euros TTC (*ex. 120 €*) et la durée (*ex. 2h en soirée*) sur la vignette même de l'atelier dans le catalogue.
* **Justification liée à Maya :** Maya consulte son téléphone le soir dans les transports avec une connexion 4G instable. Elle a besoin de savoir en moins de 30 secondes si l'atelier est fait pour elle sans charger une nouvelle page ou ouvrir une modale.

### ✅ Décision d'interface 2 tranchée
* **Choix tranché :** Remplacer le formulaire d'inscription pleine page (`inscription.html`) par une modale native accessible `<dialog>` contenant seulement 3 champs indispensables (*Nom*, *Courriel*, *Session*), avec validation instantanée au fil de la frappe (`input`).
* **Justification liée à Maya :** Pour éviter le frein majeur de l'abandon en mobilité, Maya ne doit pas être redirigée vers une page lourde ni devoir créer un compte avec mot de passe complexe avant d'avoir réservé son atelier.

### ❌ Idée abandonnée (qui dérange)
* **L'idée que l'équipe aimait :** Intégrer une vidéo d'accroche en haute définition en lecture automatique (*autoplay*) avec un carrousel animé dans le Hero banner pour rendre la page d'accueil visuellement spectaculaire.
* **Pourquoi Maya dit NON :** 
  - La vidéo consomme inutilement son forfait data 4G dans les transports.
  - Le chargement de la vidéo ralentit considérablement l'affichage initial sur son smartphone d'entrée de gamme.
  - Les animations automatiques perturbent sa lecture et nuisent à l'accessibilité cognitive.  
  👉 **Verdict :** L'équipe renonce à la vidéo et opte pour une image statique optimisée au format WebP avec texte HTML sémantique et bouton d'action direct.

---

## 👨‍🏫 2. Arbitrages pour Thomas (Formateur indépendant)

### ✅ Décision d'interface 1 tranchée
* **Choix tranché :** Garantir une navigation 100 % au clavier sur l'ensemble du site : ordre de tabulation séquentiel strict, indicateur de focus `:focus-visible` très contrasté (contour de 3 px, offset de 2 px, ratio de contraste supérieur à 3:1), et fermeture systématique des modales/menus avec la touche `Échap` en restituant le focus au bouton déclencheur.
* **Justification liée à Thomas :** Thomas travaille sur son poste de travail exclusivement au clavier pour aller vite. Une interface qui impose l'usage de la souris ou dont l'indicateur de focus est supprimé par un `outline: none` est pour lui inutilisable.

### ✅ Décision d'interface 2 tranchée
* **Choix tranché :** Intégrer une section complète « Équipe pédagogique » dès la page d'accueil, reliant chaque formateur à ses ateliers animés, avec photo soignée dotée d'un texte alternatif informatif (`alt`), sa spécialité technique et ses certifications.
* **Justification liée à Thomas :** Thomas est formateur indépendant : il refuse les plateformes où le formateur est anonymisé. Il a besoin que son expertise soit immédiatement mise en valeur auprès des apprenants pour valoriser son statut.

### ❌ Idée abandonnée (qui dérange)
* **L'idée que l'équipe aimait :** Utiliser un menu latéral rétractable de type « burger » ou un système d'accordéons fermés par défaut sur grand écran pour offrir une interface épurée et minimaliste.
* **Pourquoi Thomas dit NON :** 
  - Masquer la navigation oblige à faire des clics superflus pour accéder aux rubriques.
  - Les menus repliés ralentissent la navigation au clavier et masquent l'arborescence des formations disponibles.  
  👉 **Verdict :** L'équipe renonce au menu burger sur desktop et maintient une barre de navigation horizontale toujours visible, avec un accès direct à toutes les sections.
