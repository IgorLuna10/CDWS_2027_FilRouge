# TP 1 — Étape 01 : Les Deux Personas de SkillHub / TrekHub

**Formation :** CDWFS — Bloc BC01 · Module FM02 : Ergonomie UX/UI et Accessibilité  
**Référentiel :** RNCP 39608 — Épreuve EC01 · Critère C02 (Compréhension approfondie de l'expérience utilisateur)  
**Consigne :** Deux personas (un côté apprenant, un côté formateur) avec les 5 champs du cours et la source (« sur quoi il repose »).

---

## 👩‍💻 Persona 1 · L'Apprenante : Maya

* **Profil :** Maya, 29 ans, ancienne assistante administrative en reconversion professionnelle vers le développement web front-end.
* **Sur quoi il repose (source) :** **Hypothèse assumée**, étayée par les données du baromètre de la Grande École du Numérique (profils en reconversion web, 2024) et par l'observation directe de 3 usagers naviguant sur mobile dans les transports en commun.

### Les 5 champs du cours

1. **Contexte d'usage *(Où, quand, sur quel appareil, avec quelle connexion)* :**  
   Consulte le site en fin de journée (18h–21h) sur son smartphone (écran 4,7 pouces) dans le métro ou le bus, avec une connexion 4G instable/fluctuante et de fréquents passages sous des tunnels, après une journée de travail dense.  
   *(Impact interface : impose un site responsive léger, des images optimisées WebP et un chargement rapide).*

2. **L'objectif *(Ce qu'elle vient faire, en une phrase)* :**  
   Trouver un atelier court (1h à 2h) et pratique en soirée, et vérifier en moins de 30 secondes si le niveau et les prérequis correspondent à son niveau débutant.  
   *(Impact interface : impose que le niveau, la durée et le prix soient visibles dès le premier écran du catalogue).*

3. **Le niveau d'aisance avec l'outil :**  
   Très à l'aise avec les applications mobiles grand public courantes, mais totalement novice dans l'écosystème du code. Rapidement découragée par le jargon technique hermétique (*« stack »*, *« bundle »*, *« CI/CD »*, *« asynchrone »*).  
   *(Impact interface : impose un vocabulaire clair, orienté bénéfice apprenant et rassurant).*

4. **Les freins *(Ce qui la fait abandonner)* :**  
   - Devoir obligatoirement créer un compte et laisser ses coordonnées avant de connaître le prix et les dates.  
   - Les formulaires longs avec des erreurs bloquantes qui effacent les champs déjà saisis.  
   - L'ambiguïté sur les prérequis nécessaires, lui faisant craindre d'être perdue dès la première séance.  
   *(Impact interface : impose la transparence tarifaire et un formulaire ultra-court).*

5. **Les contraintes d'accès *(Vue, motricité, matériel, situationnel - Obligatoire EC01)* :**  
   Navigation à une main en marchant ou debout dans les transports, avec des reflets et une luminosité ambiante forte :  
   - Les textes avec un contraste insuffisant (< 4,5:1) deviennent illisibles.  
   - Les cibles tactiles trop petites (< 44 × 44 px) provoquent des erreurs de clic répétées.  
   - Les polices trop fines ou trop petites (< 16 px) fatiguent la vue.  
   *(Impact interface : respect strict des ratios WCAG 2.2 AA et zones de clic adaptées au pouce).*

---

## 👨‍🏫 Persona 2 · Le Formateur : Thomas

* **Profil :** Thomas, 37 ans, Développeur Web Senior & Consultant formateur indépendant (intervenant sur HTML/CSS moderne, architecture et accessibilité).
* **Sur quoi il repose (source) :** **Entretiens semi-directifs** conduits auprès de 2 formateurs indépendants intervenant dans des écoles du numérique (recueil de leurs besoins de visibilité et de gestion de temps).

### Les 5 champs du cours

1. **Contexte d'usage *(Où, quand, sur quel appareil, avec quelle connexion)* :**  
   Se connecte sur son poste de travail (laptop 14 pouces ou PC de bureau double écran) entre deux réunions techniques ou le samedi matin, avec une connexion fibre rapide mais très peu de temps disponible.  
   *(Impact interface : impose une interface sobre, rapide, directe et sans lourdeur administrative).*

2. **L'objectif *(Ce qu'il vient faire, en une phrase)* :**  
   Proposer un atelier technique ciblé, paramétrer sa jauge d'apprenants et s'assurer que les inscrits ont bien validé les prérequis nécessaires pour suivre la séance.  
   *(Impact interface : impose un affichage clair des jauges de places et un récapitulatif précis des prérequis).*

3. **Le niveau d'aisance avec l'outil :**  
   Expert informatique, maîtrise les environnements de développement, les raccourcis clavier et les documentations techniques. Très exigeant sur l'ergonomie, la rigueur de conception et la cohérence des interfaces web.  
   *(Impact interface : tolérance zéro envers les bugs d'état, les textes imprécis ou les conventions web non respectées).*

4. **Les freins *(Ce qui le fait abandonner)* :**  
   - Devoir remplir un formulaire administratif opaque et complexe pour soumettre un atelier.  
   - L'absence de mise en valeur de son expertise (profil formateur inexistant ou relégué au second plan sans biographie ni photo).  
   - Une interface qui oblige à utiliser constamment la souris pour des tâches répétitives.  
   *(Impact interface : valorisation du profil formateur et processus de publication fluide).*

5. **Les contraintes d'accès *(Vue, motricité, matériel, situationnel - Obligatoire EC01)* :**  
   Navigue quasi exclusivement au clavier (touche `Tab`, raccourcis) par habitude de développeur et pour aller plus vite, sur écran configuré en mode sombre :  
   - Un élément cliquable sans indicateur de focus visible (`:focus-visible` manquant ou masqué par `outline: none`) le bloque immédiatement.  
   - Les pièges au clavier (*keyboard traps*) ou l'impossibilité de fermer une modale avec la touche `Échap` le font fuir.  
   *(Impact interface : navigation 100 % clavier garantie avec contraste de focus ≥ 3:1).*
