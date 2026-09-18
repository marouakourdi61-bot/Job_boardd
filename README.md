# Job_boardd
 # Job Board — Stages & Alternances

## Présentation

Ce projet est une application web de recherche d'offres de **stages et d'alternances**.

Il a été réalisé dans le cadre du **Brief 2** après la création de l'interface statique du Brief 1.

L'objectif de cette version est de rendre l'application interactive avec **JavaScript natif**, sans backend ni base de données.

## Fonctionnalités

L'application permet de :

* consulter les offres de stages et d'alternances ;
* charger les offres depuis un fichier JSON ;
* rechercher une offre par mot-clé ;
* filtrer les offres par technologie, ville et type de contrat ;
* combiner plusieurs filtres ;
* trier les offres par date de publication ;
* suivre et ne plus suivre une offre ;
* conserver les offres suivies après un rechargement de la page ;
* consulter les offres suivies dans une page dédiée.

## Technologies utilisées

* HTML5
* CSS3
* JavaScript natif
* JSON
* LocalStorage

## Structure du projet

```text
job-board/
│
├── index.html
├── pages/
│   ├── offre-detail.html
│   ├── deposer-offre.html
│   └── offres-suivies.html
│
├── data/
│   └── offres.json
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── filtersdate.js
│   ├── render.js
│   └── storage.js
│
├── css/
│   └── style.css
│
└── README.md
```

## Chargement des données

Les offres sont stockées dans le fichier :

```text
data/offres.json
```

JavaScript utilise `fetch()` et `async/await` pour récupérer les données.

Exemple :

```js
const response = await fetch("./data/offres.json");
const offres = await response.json();
```

Les offres récupérées sont ensuite utilisées pour générer les cartes dynamiquement dans la page.

## Rendu dynamique

Les cartes des offres ne sont pas écrites directement dans le HTML.

Elles sont créées avec JavaScript en utilisant le DOM, par exemple :

```js
document.createElement()
```

Puis les éléments sont ajoutés à la page avec :

```js
appendChild()
```

Le nombre d'offres visibles est également affiché dynamiquement.

## Recherche et filtres

L'application permet de filtrer les offres selon plusieurs critères :

* technologie ;
* ville ;
* type de contrat ;
* recherche par mot-clé.

Les filtres peuvent être utilisés ensemble pour obtenir uniquement les offres correspondant aux critères sélectionnés.

Les méthodes JavaScript comme `filter()` et `map()` sont utilisées pour manipuler les données.

## Tri par date

Un bouton permet de trier les offres selon leur date de publication.

Le tri peut être effectué :

* du plus ancien au plus récent ;
* du plus récent au plus ancien.

Après chaque tri, les offres sont réaffichées dans le nouvel ordre.

## Offres suivies

Lorsqu'un utilisateur suit une offre, son identifiant est enregistré dans le navigateur avec `localStorage`.

Les identifiants sont transformés en texte avec :

```js
JSON.stringify()
```

Lors du rechargement de la page, les données sont récupérées avec :

```js
JSON.parse()
```

Cela permet de conserver les offres suivies sans utiliser de compte utilisateur ou de base de données.

## Lancer le projet

Le projet doit être lancé avec un serveur local car `fetch()` est utilisé pour charger le fichier JSON.

Avec VS Code, il est possible d'utiliser **Live Server**.

Une fois le serveur lancé, ouvrir :

```text
http://localhost:5500
```

L'adresse peut être différente selon le serveur local utilisé.

## Limites du projet

Cette version ne contient pas :

* de backend ;
* de base de données ;
* d'authentification ;
* de compte utilisateur ;
* d'API REST ;
* d'envoi réel d'email.

Ces fonctionnalités pourront être ajoutées dans une version suivante.

## Répartition du travail

Le projet a été réalisé en binôme.

Nous avons travaillé sur :

* la préparation des données JSON ;
* le rendu dynamique des offres ;
* la recherche et les filtres ;
* le tri par date ;
* le système d'offres suivies ;
* la sauvegarde avec `localStorage` ;
* la mise à jour de la documentation.

## Conclusion

Ce Brief nous a permis de transformer une interface HTML/CSS statique en une application interactive avec JavaScript.

Nous avons notamment travaillé sur la manipulation du DOM, les événements, les données JSON, `fetch`, `async/await`, les tableaux JavaScript et `localStorage`.