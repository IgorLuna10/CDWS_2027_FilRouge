# TP 2 — Étape 01 : Choix de la Plateforme & Définition des Tâches d'Audit

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Meilleures pratiques en matière de design d'interaction)  
**Formateur :** A. Mekouar · IMIE Paris  
**Consigne (Slide 30 & 33) :** Choisir une plateforme réelle en ligne et définir deux tâches réalistes tirées d'un parcours utilisateur. On n'audite pas un site dans le vide, on audite un parcours.

---

## 🌐 1. Présentation de la Plateforme Auditée

* **Nom :** Skillhub (AI-Powered Education)
* **URL :** [`https://skillhub.ai/`](https://skillhub.ai/)
* **Type de service :** Plateforme d'apprentissage du développement informatique (Python, JavaScript, Swift) assistée par tuteurs IA personnalisés et défis gamifiés.
* **Cible visée :** Débutants en programmation, étudiants en informatique (*CS Students*), et adultes en reconversion (*Career Changers*).
* **Date et environnement de l'audit :**  
  - Date : 25 septembre 2026.  
  - Environnement de test : Navigateur Google Chrome (Desktop 1440 × 900 px) et émulation mobile (iPhone SE 375 × 667 px). DevTools inspecteur et outils d'accessibilité.

---

## 🎯 2. Définition des Deux Tâches du Parcours Utilisateur

Conformément à la méthodologie du cours (*Slide 30*), l'audit heuristique ne consiste pas à donner un avis subjectif global sur le design, mais à exécuter des **tâches réelles précises** pour mesurer où le parcours se bloque.

### 📌 Tâche 1 : Identifier et tester une formation d'initiation au code (ex. Python)
* **Objectif de l'utilisateur :**  
  L'utilisateur (profil débutant) arrive sur la page d'accueil de Skillhub. Il cherche à savoir si la plateforme permet d'apprendre Python à partir de zéro, consulte les exemples pédagogiques proposés et tente d'essayer le terrain d'entraînement interactif (*Interactive AI Playground*).
* **Parcours attendu :**  
  Page d'accueil &rarr; Lecture de l'accroche Hero &rarr; Navigation vers la section *« How It Works »* ou *« Features »* &rarr; Test du composant interactif ou bouton *« View Demo »*.
* **Critère de réussite :**  
  Accéder à un premier contenu de cours ou défi d'initiation en moins de 90 secondes sans friction majeure.

---

### 📌 Tâche 2 : Trouver le prix de la formation, les prérequis et les conditions d'accès
* **Objectif de l'utilisateur (Besoin clé de l'apprenant / apprenti) :**  
  L'utilisateur souhaite connaître le modèle économique de Skillhub : l'accès est-il gratuit ? S'agit-il d'un abonnement mensuel ? Quel est son tarif ? Existe-t-il un essai gratuit ? Quels sont les appareils compatibles (navigateur web ou application mobile obligatoire) ?
* **Parcours attendu :**  
  Clic sur le lien *« Pricing »* dans la barre de navigation principale &rarr; Consultation de la grille tarifaire &rarr; Lecture des prérequis techniques &rarr; Clic sur *« Free Trial »* ou *« Download Now »*.
* **Critère de réussite :**  
  Obtenir un tarif chiffré clair (en € ou $), connaître la durée de l'essai gratuit et identifier les prérequis matériels avant de s'engager.

---

## 🔬 3. Méthodologie d'Audit Appliquée (*Slide 30*)

1. **Parcours 1 (Découverte) :** Exécution libre des deux tâches sans prise de note, pour observer les premières impressions, les points de blocage spontanés et les ruptures de flux.
2. **Parcours 2 (Relevé critique) :** Second passage systématique, chronomètre en main, avec inspection du code HTML, test des liens réels, analyse des contrastes et capture des défauts interactifs.
3. **Cotation de sévérité :** Évaluation de 0 à 4 selon la grille officielle de Jakob Nielsen.
