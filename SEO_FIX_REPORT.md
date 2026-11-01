# Rapport des correctifs SEO techniques

## Résumé

Les corrections demandées ont été appliquées au code du projet, sans déploiement. La configuration versionnée prépare la redirection de `www` vers le domaine canonique et active les slashs finaux. Les liens de navigation React suivent désormais la même convention. Les données structurées sont intégrées aux shells HTML générés et réutilisées lors du rendu React.

Le site publié n’a pas été modifié. La production est servie derrière Cloudflare et le dépôt ne contient pas de liaison locale confirmant quel projet Vercel est actif : le comportement effectif des règles doit donc être vérifié après un déploiement autorisé.

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
- La redirection réelle, la conservation des paramètres et l’absence de boucle ne peuvent pas être prouvées par un build local.

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

## Vérifications restantes avant/après déploiement

Après autorisation explicite de déployer, vérifier depuis l’extérieur :

1. `http://www.nutritionniste-agadir.com/` et `https://www.nutritionniste-agadir.com/` redirigent en un seul saut permanent vers le domaine sans `www`.
2. Les chemins de services, les alias, les paramètres de requête et les fragments ont le comportement attendu, sans boucle.
3. Les URL sans slash final sont redirigées une seule fois vers leur variante avec slash ; les pages avec slash restent directement accessibles.
4. Cloudflare applique ou transmet bien la configuration prévue et aucune règle active du projet/hébergeur ne la contredit.
5. Les canonicals et les scripts JSON-LD de plusieurs pages publiées correspondent aux shells du build.

Le projet n’a pas été déployé. Aucun résultat de redirection en production ni score PageSpeed après correction n’est revendiqué.
