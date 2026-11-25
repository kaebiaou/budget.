# Budget Perso · Guide d'installation

Application web installable (PWA) : une seule application pour Windows 11 (Edge ou Chrome) et le Samsung Galaxy (Chrome ou Samsung Internet). Elle fonctionne hors ligne et synchronise vos données dans **votre OneDrive personnel**.

Fichiers du dossier `budget-app` : `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `xlsx.full.min.js`. Aucun de ces fichiers ne contient vos montants : vos données restent sur vos appareils et dans votre OneDrive.

---

## 1. Mettre l'application en ligne (une seule fois, environ 10 minutes)

Une PWA doit être servie en **https** pour s'installer sur le téléphone et se connecter à OneDrive. Le plus simple et gratuit :

**GitHub Pages (recommandé, adresse permanente)**
1. Créez un compte sur github.com si vous n'en avez pas.
2. Créez un dépôt, par exemple `budget` (il peut être public : il ne contient que le code, pas vos données).
3. « Add file › Upload files » : glissez les 6 fichiers du dossier `budget-app`, puis « Commit ».
4. Settings › Pages › Source : « Deploy from a branch », branche `main`, dossier `/ (root)` › Save.
5. Après 1 à 2 minutes, l'adresse est du type `https://VOTRE-NOM.github.io/budget/`.

*Alternative :* app.netlify.com/drop (glisser le dossier, puis créer un compte gratuit pour garder l'adresse).

## 2. Installer sur les appareils

- **Windows 11 (Edge)** : ouvrez l'adresse, menu « … › Applications › Installer Budget Perso ». L'application apparaît dans le menu Démarrer.
- **Samsung Galaxy (Chrome)** : ouvrez l'adresse, menu « ⋮ › Ajouter à l'écran d'accueil › Installer ». Avec Samsung Internet : menu « ≡ › Ajouter la page à › Écran d'accueil ».

## 3. Importer votre classeur Excel

Sur l'ordinateur : Réglages › **Importer un classeur Excel**, choisissez `GEST FIN KAEBIAOU (EXPERIMENTAL).xlsx`. Chaque onglet (« NOV 2026 », « DEC 2026 ») devient un mois, avec ses 37 rubriques P01 à P37, les plafonds, le salaire et la période lue dans le titre. Les groupes (Banque, Dons, Enfants, Épargne, Véhicule…) sont devinés et modifiables en touchant le libellé d'une rubrique.

## 4. Synchronisation OneDrive

### Méthode 1 · Compte Microsoft (ordinateur ET téléphone) — recommandée
Il faut déclarer l'application une fois auprès de Microsoft pour obtenir un « ID d'application » :
1. Allez sur **portal.azure.com** (ou entra.microsoft.com) avec votre compte Microsoft personnel (celui de OneDrive).
   Si le portail indique qu'aucun annuaire n'existe, créez le compte Azure gratuit proposé : l'inscription d'application est gratuite.
2. « Inscriptions d'applications » › **Nouvelle inscription** :
   - Nom : `Budget Perso` (ce sera le nom du dossier dans OneDrive)
   - Types de comptes : **Comptes Microsoft personnels uniquement**
   - URI de redirection : plateforme **Application monopage (SPA)**, adresse exacte affichée dans l'application (Réglages), par exemple `https://VOTRE-NOM.github.io/budget/`
3. Copiez l'**ID d'application (client)**.
4. « Autorisations d'API » : vérifiez que Microsoft Graph › `Files.ReadWrite.AppFolder` est présent (sinon : Ajouter une autorisation › Microsoft Graph › Autorisations déléguées › Files.ReadWrite.AppFolder).
5. Dans l'application, Réglages › collez l'ID › **Se connecter à OneDrive**. Faites de même sur le téléphone.

Vos données sont dans OneDrive › Applications › Budget Perso › `budget.json`. L'application synchronise automatiquement à chaque modification et à chaque ouverture ; le point en haut à gauche passe au vert quand c'est fait.

### Méthode 2 · Fichier dans le dossier OneDrive de Windows (sans inscription)
Réglages › « Créer budget.json » et enregistrez-le dans votre dossier OneDrive local. OneDrive le synchronise dans le cloud. Ne fonctionne que sur l'ordinateur (Edge ou Chrome) : sur le téléphone il faut la méthode 1.

## 5. Utilisation au quotidien

- **Budget** : en début de période, « Créer le mois suivant » reconduit rubriques, plafonds et salaire. Sous chaque rubrique s'affichent le montant alloué et le montant réellement dépensé le mois précédent pour ajuster le plafond. Le bas d'écran reprend vos lignes TOTAL, SALAIRE et SOLDE.
- **Dépense** : choisissez la rubrique, le reste disponible s'affiche avant et après la dépense ; un avertissement apparaît en cas de dépassement.
- **Soldes** : reste par rubrique (barre verte, orange au-delà de 85 %, rouge en dépassement), reste à dépenser, solde réel (salaire − dépensé).
- **Rapports** : évolution sur 3 à 24 mois, répartition par groupe, rythme de dépense dans la période, top 10, taux d'épargne et d'exécution, statistiques par rubrique (moyenne, min, max, nombre de dépassements).
- **Exporter en Excel** : produit un classeur au même format que le vôtre (CODE, RUBRIQUES, ALLOUÉ, DÉPENSÉ, RESTE, TOTAL, SALAIRE, SOLDE) plus un onglet de toutes les dépenses.
- **Sauvegarde JSON** : copie de secours ponctuelle, restaurable sur n'importe quel appareil.
