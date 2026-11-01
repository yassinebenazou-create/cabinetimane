# Rapport des correctifs SEO techniques

## Résumé

Les corrections demandées ont été appliquées au code du projet, sans déploiement. La configuration versionnée prépare la redirection de `www` vers le domaine canonique et active les slashs finaux. Les liens de navigation React suivent désormais la même convention. Les données structurées sont intégrées aux shells HTML générés et réutilisées lors du rendu React.

Le déploiement de la phase 2 a depuis été effectué. Un contrôle public confirme que le domaine `www` répond encore en 200, tandis que la normalisation des slashs fonctionne sur l’apex. Les deux hôtes passent par Cloudflare et servent le même bundle. Le dépôt ne contient toutefois pas de liaison locale confirmant le projet d’origine ni l’association des domaines dans les tableaux de bord.

## Fichiers modifiés

- `vercel.json` — `trailingSlash: true` et redirection permanente configurée de l’hôte `www.nutritionniste-agadir.com` vers `https://nutritionniste-agadir.com/:path*`. Les redirections d’alias existantes sont conservées.
- `src/components/RouteLink.jsx` — nouveau composant qui ajoute le slash final aux destinations internes React en préservant les éventuels paramètres et fragments.
- `src/App.jsx`, `src/components/Navbar.jsx`, `src/components/SiteFooter.jsx`, `src/pages/ServiceDetailPage.jsx` — liens internes et destinations d’alias alignés sur cette convention.
- `scripts/generate-seo-files.mjs` — génération des JSON-LD dans le HTML initial de chaque route, sans canonical pour la page 404.
- `src/components/StructuredData.jsx` — réutilisation et mise à jour des scripts JSON-LD initiaux lors du rendu React, au lieu d’en ajouter un second.
- `src/data/faqs.js` — source partagée des FAQ entre l’application et le générateur de shells.
- `src/App.jsx`, `src/components/PageSeo.jsx`, `src/pages/ServiceDetailPage.jsx`, `src/data/schema.js` — consommation des schémas partagés et génération cohérente des données Service et BreadcrumbList.

Une modification préexistante de `src/App.css` concernant le logo mobile était déjà présente dans le worktree ; elle n’a pas été modifiée dans cette phase.

## Corrections appliquées

### Domaine et slashs

- La règle `www` est limitée à l’hôte `www.nutritionniste-agadir.com`, cible le domaine sans `www` et conserve le chemin via `/:path*`. La destination ne remplace pas les paramètres de requête.
- `trailingSlash: true` correspond aux canonicals et aux URL du sitemap.
- Les liens React créent maintenant des URL avec slash final, y compris les liens de services et les alias client.
- Le contrôle de production du 1er novembre 2026 a montré que `https://www.nutritionniste-agadir.com/` répond encore en 200. La règle `www` présente dans `vercel.json` ne provoque donc pas la redirection observée à l’entrée publique.

### JSON-LD

- Les shells des 18 routes générées incluent leurs schémas initiaux : accueil, fil d’Ariane, FAQ et services selon la page.
- La FAQ utilise une source de données unique côté génération et côté application.
- L’hydratation React reprend les scripts nommés du HTML initial ; elle ne crée pas de doublon pour les schémas testés.
- Aucun schéma `WebPage` superflu ni information professionnelle nouvelle n’a été ajouté.

### Aperçu des services

Drainage lymphatique et pressothérapie existent comme services et disposent de routes propres. Ils ne font pas partie de la liste `serviceCardSlugs`, qui sélectionne les dix cartes communes à l’aperçu Services et au carrousel d’accueil. Ils n’ont donc pas été ajoutés à cette sélection afin de ne pas changer la présentation ; leurs pages restent accessibles et générées.

## Tests effectués

- `npm run build` — réussi ; génération des shells de 18 routes et de `404.html`.
- `npm run lint` — réussi.
- `git diff --check` — réussi.
- Vérification locale des 18 URL du sitemap sur le serveur de preview : 18 réponses HTTP 200.
- Vérification des shells générés : 18 shells, aucun nom de script JSON-LD dupliqué. Le shell 404 contient `noindex, follow` et aucun canonical.
- Navigation React testée de l’accueil vers `/services/`, puis `/services/perte-de-poids/` : les URL et canonicals ont le slash final et le schéma Service reste unique.
- FAQ vers une page service, puis changement de langue vers l’arabe : canonical et schéma Service mis à jour, sans doublon observé.
- Le JSON de `vercel.json` a été lu par le parseur JSON de PowerShell.

Ces tests sont locaux. Ils ne constituent ni un test PageSpeed/PSI, ni une vérification des en-têtes HTTP effectifs de production.

## Diagnostic de production — 1er novembre 2026

Vérifications effectuées depuis l’extérieur :

- Les serveurs DNS faisant autorité sont ceux de Cloudflare. Les deux noms résolvent vers les mêmes adresses IPv4 Cloudflare (`104.21.17.81` et `172.67.175.79`), ce qui est compatible avec des enregistrements proxifiés.
- Les réponses HTTP portent `Server: cloudflare` et `CF-RAY`.
- `https://www.nutritionniste-agadir.com/` répond `200 OK`, sans en-tête `Location`.
- `http://www.nutritionniste-agadir.com/` est redirigé vers HTTPS en conservant `www`.
- `https://www.nutritionniste-agadir.com/services` et `https://nutritionniste-agadir.com/services` répondent tous deux `308` vers leur propre URL `/services/`.
- L’accueil des deux hôtes expose le même titre et la même référence de bundle JavaScript (`/assets/index-MYHorBhq.js`). Cela indique qu’ils servent le même build public, mais ne prouve pas l’identifiant du projet lié dans Vercel ou Cloudflare.
- Le fichier `vercel.json` de la version GitHub consultée (commit `f90cd3e`) contient bien la règle `www` actuelle. Cela confirme sa présence dans le dépôt, pas que la requête publique est traitée par ce projet Vercel ni que ce commit correspond à la configuration de l’origine active.
- Aucun en-tête `x-vercel-id` n’a été observé. À lui seul, son absence ne permet pas de déterminer l’origine derrière Cloudflare.
- Aucun fichier `.vercel/project.json`, configuration Wrangler/Cloudflare ou script de déploiement n’est présent dans le dépôt. Les commandes locales Cloudflare et Vercel ne sont pas disponibles ; aucun accès aux tableaux de bord n’a été utilisé.

Les éléments publics établissent le passage par l’edge Cloudflare et montrent que `www` sert le même build, mais ne permettent pas de vérifier dans le tableau de bord si le hostname est attaché au projet Cloudflare Pages/Vercel attendu, ni quelle règle d’origine est active. Le résultat est compatible avec l’absence de règle de canonicalisation `www` à l’edge ; il ne permet pas d’attribuer avec certitude le 200 à une association de domaine incorrecte ou à une configuration Vercel non appliquée.

## Correction de production recommandée

Le correctif le plus sûr est une règle **Cloudflare Single Redirect** dans la zone `nutritionniste-agadir.com`, car les requêtes publiques passent par Cloudflare et les deux enregistrements DNS sont proxifiés. La règle ne touche pas aux redirections de slash ni aux autres chemins :

1. Cloudflare Dashboard → **Rules** → **Redirect Rules** → créer une règle **Single Redirect**.
2. Condition : `http.host eq "www.nutritionniste-agadir.com"` (ne pas ajouter de condition sur le schéma, afin de couvrir HTTP et HTTPS).
3. Action : redirection dynamique vers `concat("https://nutritionniste-agadir.com", http.request.uri.path)`.
4. Choisir le statut **301** (ou **308** si la conservation de méthode est requise) et activer **Preserve query string**.
5. Placer cette règle avant toute règle de redirection plus générale/conflictuelle. La cible utilise toujours l’hôte apex, ce qui évite une boucle.

Cette modification de règle Cloudflare est une action de production. Elle n’a pas été exécutée : aucun accès au compte Cloudflare n’est disponible et aucune modification/déploiement de production n’a été effectué. Le fichier `vercel.json` n’a pas été modifié, car changer une règle de projet Vercel sans avoir confirmé l’origine active ne garantit pas une correction à l’edge et pourrait dupliquer la règle.

Après activation par une personne autorisée, vérifier avec `curl.exe -I --max-redirs 0` :

- les deux URL `http://www.../` et `https://www.../` renvoient un statut permanent et `Location: https://nutritionniste-agadir.com/` ;
- un chemin tel que `/services/perte-de-poids/?source=test` conserve le chemin et la query string vers l’apex ;
- l’URL apex ne redirige pas vers `www` et il n’y a pas de boucle ;
- `/services` continue ensuite de se normaliser en `/services/` sans modifier les règles existantes.

Ces tests de vérification de la nouvelle règle restent à exécuter après son activation. Aucun résultat positif post-correctif n’est revendiqué.
