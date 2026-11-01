# Audit SEO technique — nutritionniste-agadir.com

**Date de l’audit :** 1 novembre 2026  
**Périmètre :** code du dépôt, fichiers de génération SEO et réponses HTTP du site publié.  
**Nature :** audit en lecture seule ; ce rapport est le seul nouveau fichier créé.

## Résumé exécutif

| Mesure | Résultat |
|---|---:|
| Contrôles transversaux vérifiés | 31 |
| DONE | 19 |
| MISSING | 2 |
| NEEDS FIX | 10 |
| NOT APPLICABLE | 0 |
| Éléments nécessitant une action ou une validation | 12 |
| Routes du sitemap testées en production | 18/18 — HTTP 200 |
| Titres uniques / descriptions uniques | 18/18 / 18/18 |

Les fondations SEO sont solides : robots et sitemap sont accessibles, les 18 routes listées répondent, chacune possède un canonical et des métadonnées uniques, et la 404 renvoie un véritable statut 404 avec `noindex`.

Les principaux points à traiter sont la normalisation du domaine `www`, l’écart entre la configuration Vercel présente dans le dépôt et le comportement de slash observé en production, la disponibilité des JSON-LD sans exécuter React, et les vérifications externes Google Search Console / Google Business Profile.

## Méthode et limites

- Requêtes de lecture sur `robots.txt`, `sitemap.xml`, les 18 URL du sitemap, plusieurs variantes de domaine, une URL inexistante et des ressources statiques représentatives.
- Inspection de `index.html`, `public/`, `src/`, `scripts/generate-seo-files.mjs`, `vercel.json` et des fichiers de redirection.
- Les données Search Console, Google Business Profile et les citations externes ne sont pas accessibles depuis le dépôt. Leur état d’indexation, le canonical choisi par Google, les impressions, les erreurs de crawl et la cohérence du profil local ne sont donc pas confirmés.
- La requête PageSpeed Insights mobile a échoué avec une réponse API **429 — quota quotidien dépassé**. Le score 97 Performance / 100 SEO indiqué dans le brief reste une mesure fournie par l’utilisateur, non reproduite pendant cet audit. Aucun nouveau score ni LCP/INP/CLS n’est revendiqué.
- Les empreintes de bundles publiées (`index-BcTUxH5V.js`, `index-ieneMAxg.css`) diffèrent de celles du `dist` local examiné (`index-CKigMBQX.js`, `index-D7jX_btS.css`). Une différence de hash ne permet pas à elle seule d’identifier le code divergent. Le `src/App.css` déjà modifié avant cet audit a été laissé intact.
- L’audit n’a pas exécuté Lighthouse, une couverture JavaScript navigateur, ni un validateur Google Rich Results sur une page rendue.

## Matrice des contrôles

| # | Contrôle | Statut | Fichier / preuve | Problème, impact SEO et recommandation |
|---:|---|---|---|---|
| 1 | `robots.txt` | DONE | `public/robots.txt`, production | Autorise le crawl et déclare le sitemap. Aucun blocage général constaté. |
| 2 | Sitemap XML | DONE | `scripts/generate-seo-files.mjs`, production `/sitemap.xml` | Sitemap valide et accessible, avec 18 URL HTTPS canoniques. Les 18 routes testées répondent en 200. `lastmod` est absent, mais reste facultatif si aucune date fiable n’est disponible. |
| 3 | Crawlabilité des pages importantes | DONE | `src/App.jsx`, sitemap, réponses HTTP | Les pages d’accueil, services, consultation, résultats, FAQ, contact et les 12 pages de service sont servies en 200. Leur présence dans Search Console doit être confirmée séparément. |
| 4 | Directives robots des pages | DONE | `scripts/generate-seo-files.mjs`, `src/components/PageSeo.jsx` | Les pages du sitemap portent `index, follow`; la 404 porte `noindex, follow`. Aucune directive bloquante détectée sur les pages importantes. |
| 5 | Canonicals | DONE | `src/data/seo.js`, `src/components/PageSeo.jsx`, shells HTML publiés | Les 18 shells publiés ont un canonical absolu vers le domaine sans `www`, avec slash final, correspondant à chaque URL du sitemap. |
| 6 | Structure des URL en production | DONE | Sitemap et réponses HTTP | Slugs lisibles, minuscules et séparés par des tirets. Une URL sans slash, par exemple `/services`, répond par une redirection 308 vers `/services/`. |
| 7 | Redirection HTTP vers HTTPS | DONE | Réponses HTTP de production | `http://nutritionniste-agadir.com/` et `http://www.nutritionniste-agadir.com/` redirigent en 301 vers leur variante HTTPS. |
| 8 | Normalisation `www` / sans `www` | NEEDS FIX | Réponses HTTP, `src/data/siteConfig.js` | `https://www.nutritionniste-agadir.com/` répond encore en 200, bien que son canonical pointe vers le domaine sans `www`. Cela laisse deux hôtes accessibles et dépend de la canonicalisation pour consolider les signaux. Ajouter une redirection permanente de tout `www` vers le domaine canonique, en conservant chemin et paramètres, puis vérifier les quatre variantes HTTP/HTTPS. |
| 9 | Convention de slash et configuration de déploiement | NEEDS FIX | `vercel.json`, sitemap, réponses HTTP | Le sitemap et la production utilisent les URL avec slash final ; la production redirige `/services` vers `/services/`. Le `vercel.json` du dépôt indique pourtant `trailingSlash: false`. Confirmer quelle configuration est effectivement appliquée et aligner la règle de l’hébergeur sur les canonicals et le sitemap pour éviter des redirections contradictoires lors d’un prochain déploiement. |
| 10 | Gestion des erreurs 404 | DONE | `scripts/generate-seo-files.mjs`, production | Une URL aléatoire inexistante renvoie HTTP 404. La réponse contient `noindex, follow` et n’annonce pas de canonical. La 404 n’est pas incluse au sitemap. |
| 11 | Destinations internes des routes | DONE | `src/App.jsx`, `src/data/services.js`, test des 18 URL du sitemap | Aucun chemin du sitemap n’est cassé en production. Les services liés entre eux et les liens de navigation renvoient à des routes déclarées. Ce contrôle n’équivaut pas à un crawl exhaustif de chaque lien externe. |
| 12 | Couverture de la page Services | NEEDS FIX | `src/data/services.js` (`serviceCardSlugs`) | La page Services présente 10 des 12 services ; le drainage lymphatique et la pressothérapie ne figurent pas dans cette liste, même s’ils sont reliés depuis des pages de service et présents au sitemap. Les rendre visibles dans l’aperçu principal améliorerait leur découverte et le maillage, si ces prestations doivent être promues à égalité. |
| 13 | Hreflang / indexabilité arabe | MISSING | `src/i18n/LanguageContext.jsx`, `src/components/PageSeo.jsx` | Le français et l’arabe changent côté client sur la même URL, selon `localStorage`. Il n’existe pas d’URL arabe dédiée ni de `link rel="alternate" hreflang`; `og:locale:alternate` n’est pas un hreflang. Si le référencement en arabe est recherché, créer des URL indexables par langue et des hreflang réciproques. Sinon, traiter l’arabe comme une option d’interface, pas comme une page arabe indexable. |
| 14 | Titles | DONE | `src/data/seoPages.js`, `src/data/services.js`, shells publiés | 18 titres distincts, présents dans le HTML initial, de 38 à 54 caractères. Ils couvrent l’activité, Agadir ou la marque selon la page. |
| 15 | Meta descriptions | DONE | `src/data/seoPages.js`, `src/data/services.js`, shells publiés | 18 descriptions présentes et uniques, de 107 à 164 caractères. Le script de build vérifie les doublons et signale les longueurs susceptibles d’être tronquées. |
| 16 | H1 principal | DONE | `scripts/generate-seo-files.mjs`, `src/App.jsx`, `src/pages/ServiceDetailPage.jsx` | Une seule zone H1 est définie par gabarit et chaque shell comporte un H1 de secours propre à sa route. Le H1 de l’accueil est volontairement plus éditorial que son title, qui porte explicitement la requête locale. |
| 17 | Hiérarchie des titres et contenu | DONE | `src/App.jsx`, `src/pages/ServiceDetailPage.jsx`, `src/data/services.js` | Les pages suivent une hiérarchie H1 puis H2/H3 et proposent des contenus distincts par service. Les pages cliniques comportent des précisions indiquant que l’accompagnement nutritionnel ne remplace pas le suivi médical. |
| 18 | Images et attributs ALT | DONE | `src/App.jsx`, `src/components/`, `src/pages/ServiceDetailPage.jsx` | Les images de contenu ont un ALT descriptif ; les images décoratives ont un ALT vide et sont masquées aux technologies d’assistance. Les images de services utilisent des variantes WebP. |
| 19 | Open Graph et Twitter Cards | DONE | `scripts/generate-seo-files.mjs`, `src/components/PageSeo.jsx` | Les shells publiés contiennent title, description, URL canonique, image, texte ALT et Twitter Card `summary_large_image`. Les métadonnées sont propres à chaque route. |
| 20 | Types Schema.org utilisés | DONE | `src/data/schema.js`, `src/App.jsx`, `src/pages/ServiceDetailPage.jsx` | Le code emploie `MedicalBusiness`, `Person`, `WebSite`, `Service`, `BreadcrumbList` et `FAQPage`, avec JSON produit par `JSON.stringify`. `MedicalBusiness` existe dans Schema.org ; le type `Dietitian` n’existe pas comme type Schema.org. Les types paraissent cohérents avec les contenus, sous réserve de vérification des faits déclarés. |
| 21 | Donnée structurée `WebPage` | MISSING | `src/data/schema.js`, `src/components/PageSeo.jsx` | Aucun `WebPage` spécifique à chaque page n’a été trouvé. Ce balisage est une amélioration facultative pour relier chaque URL à son contenu ; son absence n’est pas en elle-même une pénalité ni une garantie de perte de classement. |
| 22 | Disponibilité du JSON-LD dans le HTML initial | NEEDS FIX | `scripts/generate-seo-files.mjs`, `src/App.jsx`, `src/components/PageSeo.jsx` | Les 18 réponses HTML initiales ne contiennent aucun script `application/ld+json`. Les graphes et breadcrumbs sont insérés après l’hydratation React. Google peut traiter du JSON-LD généré par JavaScript, mais cela dépend du rendu. Générer les schémas essentiels dans les shells statiques, ou vérifier le HTML rendu avec l’inspection d’URL et les outils de résultats enrichis avant de conclure qu’ils sont lus. |
| 23 | Exactitude des faits structurés | NEEDS FIX | `src/data/schema.js`, `src/data/site.js`, `src/App.jsx` | Le code publie notamment le diplôme UM6SS, le code postal `80020`, les horaires, le téléphone et l’adresse. Le diplôme est aussi affiché sur la page d’accueil ; aucune de ces données n’a été confirmée auprès d’une source externe pendant l’audit. Les comparer aux informations validées par la professionnelle et au profil officiel ; corriger ou retirer toute affirmation non vérifiable. Aucun prix, avis agrégé ou coordonnées GPS inventés n’a été ajouté par cet audit. |
| 24 | Cohérence NAP interne | DONE | `src/data/site.js`, `src/data/schema.js`, `src/components/SiteFooter.jsx`, page Contact | Le téléphone principal affiché et celui du schéma correspondent ; l’adresse et les horaires sont centralisés côté site puis représentés dans le schéma. Le schéma utilise `Cabinet Imane Oulhint` comme nom et une forme plus longue comme `alternateName` : confirmer le nom principal avec le profil Google (contrôle suivant). |
| 25 | Google Business Profile et citations locales | NEEDS FIX | `src/data/site.js` | Un lien Google Maps est présent, mais l’accès au profil, sa propriété, son nom public, son adresse, son téléphone, ses horaires et les citations locales n’étaient pas disponibles. Vérifier ces champs dans Google Business Profile et les harmoniser avec le site ; ne pas créer de coordonnées ni d’avis non confirmés. |
| 26 | Contenu HTML initial / rendu React | NEEDS FIX | `index.html`, `scripts/generate-seo-files.mjs`, `src/main.jsx` | Le conteneur `#root` est vide dans la réponse HTML normale ; titres, sections et liens applicatifs sont montés par React. Un bloc `<noscript>` fournit une version de secours par route, mais la page visible et plusieurs schémas dépendent du JavaScript. Tester les pages avec l’inspection d’URL Google. Si le contenu n’est pas rendu correctement ou rapidement, pré-rendre les routes sans migrer toute l’architecture vers SSR sans preuve. |
| 27 | Ressources critiques du Hero | DONE | `index.html`, `src/App.jsx` | Le poster WebP de l’accueil est préchargé avec `fetchpriority="high"`. Le code courant utilise `preload="none"` et n’assigne initialement le `src` qu’à la première vidéo ; la suivante reçoit sa source lors du changement de vidéo. Le poster est un candidat LCP, **pas un élément LCP mesuré**. Le hash JS publié diffère du build local, donc valider ce comportement dans le déploiement avant de l’affirmer pour la production. |
| 28 | Polices et ressources bloquant le rendu | DONE | `index.html`, `src/index.css`, `src/App.css` | Aucune police externe ni déclaration `@font-face` n’a été trouvée ; le site s’appuie sur une pile de polices système. Le HTML charge une feuille CSS compilée et un script module ; aucun autre fichier de police bloquant n’est déclaré. L’impact exact du CSS nécessiterait une trace navigateur. |
| 29 | Scripts tiers et JavaScript inutilisé | NEEDS FIX | `src/App.jsx`, HTML publié | Elfsight est demandé de façon asynchrone et différée à l’intersection, uniquement sur l’accueil et la page résultats. Le HTML publié inclut également Cloudflare Web Analytics. Leur coût réseau et leur impact INP/long tasks, ainsi que le JavaScript inutilisé, n’ont pas pu être mesurés sans une trace Lighthouse/Coverage. Ne retirer aucun script sans mesure et sans vérifier le widget. |
| 30 | Cache des ressources | NEEDS FIX | En-têtes HTTP de production | Les bundles, images et vidéo testés renvoient `Cache-Control: public, max-age=14400, must-revalidate` (4 heures). Les HTML renvoient `max-age=0, must-revalidate`. Pour les fichiers réellement fingerprintés, envisager `max-age=31536000, immutable` ; vérifier d’abord la configuration effective Vercel/Cloudflare et conserver une stratégie courte pour le HTML. |
| 31 | LCP, INP, CLS et poids du premier chargement | NEEDS FIX | Mesure PSI indisponible ; `src/App.jsx`, `index.html` | L’API PSI a répondu 429. Le LCP mobile précis, l’INP, le CLS, le poids réellement transféré et le waterfall production ne sont donc pas mesurés dans cet audit. Le code donne la priorité au poster et retarde les vidéos, mais cela ne remplace pas une mesure. Refaire PSI/Lighthouse et consulter les données terrain CrUX/Search Console lorsque disponibles. |

## Revue individuelle des 18 pages

Les 18 routes ont répondu en HTTP 200 en production. Chaque ligne ci-dessous possède un title, une description unique et un canonical correspondant au chemin du sitemap. Les descriptions sont évaluées en français ; l’interface arabe n’a pas d’URL distincte.

| URL | Title publié | Meta description publiée | H1 |
|---|---|---|---|
| `/` | Diététicienne Nutritionniste à Agadir \| Imane Oulhint | Découvrez le cabinet d’Imane Oulhint, diététicienne nutritionniste à Agadir. Gestion du poids, nutrition clinique et bilans personnalisés. Contactez le cabinet. | Nutrition personnalisée pour retrouver l’équilibre |
| `/services/` | Services de Nutrition à Agadir \| Cabinet Imane Oulhint | Rééquilibrage alimentaire, nutrition clinique, bilans TANITA et Oligoscan, amincissement : découvrez les services du cabinet Imane Oulhint à Agadir. | Services de nutrition et bilans à Agadir |
| `/consultation/` | Consultation Nutritionnelle à Agadir \| Imane Oulhint | Découvrez le déroulement d’une consultation nutritionnelle personnalisée au cabinet Imane Oulhint à Agadir, du bilan initial au suivi régulier. | Votre consultation nutritionnelle à Agadir |
| `/resultats-patients/` | Résultats Patients \| Cabinet Imane Oulhint à Agadir | Découvrez les retours, avis Google et contenus partagés par les patients du cabinet Imane Oulhint à Agadir. | Expériences des patients au cabinet à Agadir |
| `/faq/` | FAQ Nutrition \| Cabinet Imane Oulhint à Agadir | Réponses aux questions fréquentes sur la consultation nutritionnelle, le suivi, la prise de rendez-vous et les soins proposés par le cabinet Imane Oulhint à Agadir. | Questions fréquentes sur votre accompagnement à Agadir |
| `/contact/` | Contact et Rendez-vous \| Diététicienne à Agadir | Prenez rendez-vous avec Imane Oulhint, diététicienne nutritionniste à Agadir : téléphone, WhatsApp, e-mail et adresse du cabinet à Agadir Bay, Technopole II. | Contact et rendez-vous à Agadir |
| `/services/perte-de-poids/` | Gestion du Poids à Agadir \| Imane Oulhint | Gestion du poids à Agadir avec un accompagnement nutritionnel personnalisé pour l’obésité, l’amincissement ou le manque d’appétit. | Gestion du poids |
| `/services/reequilibrage-alimentaire/` | Rééquilibrage alimentaire à Agadir \| Imane Oulhint | Rééquilibrage alimentaire à Agadir au Cabinet Imane Oulhint, avec bilan, conseils pratiques et suivi personnalisé. | Rééquilibrage alimentaire |
| `/services/nutrition-maladies-chroniques/` | Nutrition Clinique à Agadir \| Imane Oulhint | Accompagnement nutritionnel à Agadir pour le diabète, le cholestérol et la goutte, en complément du suivi médical. | Nutrition et maladies chroniques |
| `/services/nutrition-feminine/` | Nutrition féminine à Agadir \| Imane Oulhint | Nutrition féminine à Agadir pour les femmes enceintes ou allaitantes, les troubles hormonaux et le syndrome des ovaires polykystiques. | Nutrition féminine |
| `/services/nutrition-digestive/` | Nutrition digestive à Agadir \| Imane Oulhint | Nutrition digestive à Agadir pour les maladies digestives, le syndrome du côlon irritable et Helicobacter pylori. | Nutrition digestive |
| `/services/troubles-nutritionnels/` | Troubles nutritionnels à Agadir \| Imane Oulhint | Accompagnement nutritionnel à Agadir pour la dénutrition, l’anémie et l’anorexie mentale, en complément du suivi médical. | Troubles nutritionnels |
| `/services/suivi-nutritionnel-a-distance/` | Suivi Nutritionnel à Distance \| Imane Oulhint | Suivi nutritionnel à distance avec le Cabinet Imane Oulhint par WhatsApp, téléphone ou visioconférence, selon vos besoins. | Suivi nutritionnel à distance |
| `/services/bilan-corporel-tanita/` | Bilan Corporel TANITA à Agadir \| Imane Oulhint | Bilan corporel TANITA à Agadir : analyse de la masse grasse, du taux d’hydratation, de la masse osseuse et de la masse musculaire. | Bilan corporel – TANITA |
| `/services/bilan-oligoscan/` | Bilan Oligoscan à Agadir \| Imane Oulhint | Bilan Oligoscan à Agadir pour évaluer la biodisponibilité des vitamines, minéraux et métaux lourds par spectrophotométrie de la main. | Bilan Oligoscan |
| `/services/amincissement/` | Amincissement à Agadir \| Imane Oulhint | Amincissement à Agadir avec un accompagnement personnalisé pour cibler différentes zones de la silhouette au Cabinet Imane Oulhint. | Amincissement |
| `/services/drainage-lymphatique/` | Drainage lymphatique à Agadir \| Imane Oulhint | Drainage lymphatique à Agadir au Cabinet Imane Oulhint, avec un échange préalable dans un cadre professionnel. | Drainage lymphatique |
| `/services/pressotherapie/` | Pressothérapie à Agadir \| Imane Oulhint | Séances de pressothérapie à Agadir au Cabinet Imane Oulhint, avec un échange préalable et un accompagnement professionnel. | Pressothérapie |

## Priorités recommandées pour une deuxième phase

1. **Unifier le domaine** : faire rediriger `www` vers le domaine canonique sans `www` en 301, y compris les routes et paramètres.
2. **Réconcilier la politique de slash** : confirmer l’hébergeur/configuration active et aligner `vercel.json`, les redirections, les canonicals et le sitemap sur une seule convention.
3. **Rendre les données structurées robustes** : pré-générer les JSON-LD essentiels dans chaque shell statique, puis valider les pages publiées avec l’inspection d’URL et les outils Google. Ajouter `WebPage` seulement si cela apporte une relation utile.
4. **Renforcer la découverte des services** : décider si le drainage lymphatique et la pressothérapie doivent apparaître dans l’aperçu `/services/` ; confirmer aussi le nom, l’adresse, le téléphone, les horaires, le code postal et le diplôme avec les sources officielles/Google Business Profile.
5. **Obtenir une mesure exploitable** : consulter GSC et les données de terrain, puis relancer PSI/Lighthouse mobile et desktop avec waterfall, élément LCP, CLS, INP/TBT et poids transféré. Réévaluer Elfsight, le beacon et les headers de cache à partir de ces mesures.

Si le référencement en arabe est un objectif explicite, ajouter ensuite des URL arabes distinctes avec `hreflang` réciproques (`fr-MA`, `ar-MA` et éventuellement `x-default`). Sans cela, conserver le sélecteur comme fonctionnalité d’interface seulement.

## Références

- [Google — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google — Generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript)
- [Google — Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google — Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Schema.org — MedicalBusiness](https://schema.org/MedicalBusiness)
