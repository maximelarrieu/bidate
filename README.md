# BIDATE

## Sommaire
[1. Ce qui est fait](#1._Ce_qui_est_fait)

[2. Ce qu'il reste à faire](#2._Ce_qu'il_reste_à_faire)

[3. Lancer le projet](#3._Lancer_le_projet)

### 1. Ce qui est fait
+ Login/Register avec choix de type de profile (dater/hunter) => [login/register.component](client/src/components/login.component.js)
+ List des daters (/todate, liste des users ayant comme type 'dater' donc qui veulent un date) => [daters.component](client/src/components/daters.component.js)
+ Page d'un dater (/todate:id) => [dater.component](client/src/components/dater.component.js)

----

#### Page d'un dater
Découpée en 3 components

#### Gauche = [sideProfil.component](client/src/components/sideProfile.component.js)
Affichage du profil du dater en question

#### Droite = [historic.component](client/src/components/historicDates.component.js)
Je voyais rien dans les maquettes du coup jsavais pas quoi mettre, pour l'instant j'ai imaginé un historique des dates organisé par un dater mais s'il faut autre chose np

#### Milieu = [date.component](client/src/components/date.component.js)
Si le user connecté est celui à qui correspond cette page, il a la possibilité de faire démarré un date. (button 'Start my date').
À ce moment là, un date est démarré et prendra fin 5 jours plus tard (il y a le décompte).

C'est à partir de ce moment que les autres dater peuvent eux faire un "bet" (button "make a bet") pour avoir un date.

Un tableau des "BETS EN COURS" liste chaque bets de chaque dater par jour. => [bets.component](client/src/components/bets.component.js)

Un dater ne peut bet qu'une seul fois dans la journée (le button est disabled lorsque le bet journalier est fait)

#### Bets
Ici on affiche le tableau des daters et leurs bets

Si l'utilisateur connecté est un "hunter", il peut alors misé sur un des dater du tableau grâce au button "Bet on"

Tout comme au dessus, uniquement un bet par jour (c'est géré jarrive juste pas à faire l'affichage je vais trouver)

Quand un hunter bet sur un dater, il ajoute ce dater à sa liste qui est dans le component [hunterBets](client/src/components/hunterBets.component.js)

Pour les dater et les hunter, effectivement les users ne choisissent pas la mise, j'ai pour l'instant laissé une valeur aléatoire à chaque fois pour pas perdre du temps pour implémenter le 'vrai paiement' ([cf.à faire](#2_Ce_qu'il_reste_à_faire))

----
L'arc de la page d'un dater étant fini

+ Il y a aussi evidemment un component pour la [navbar](client/src/components/navbar.component.js) pour l'avoir dans toutes les pages

Coté fonctionnel je pense que c'est bon, vous remarquerez que c'est bien laid mdr justement besoin d'aide la dessus

### 2. Ce qu'il reste à faire

+ Le css, j'ai essayé de faire les disposition de ce que je voyais sur les maquettes, il y a la base de tout, bien laissé tout ce qui est variable etc mais faites vous kiffer sur le css et meme sur la disposition des éléments

+ Trouver (grâce à truffle?) comment faire pour créer une transaction entre deux users (avec metamask, ganache, ou jsp quoi j'ai pas eu le temps de me pencher dessus perso mais c'est hyper important)

+ Faire une petite page [home](client/src/components/home.component.js) histoire de présenté rapidement le site pour les non inscrits/non connectés (pour l'instant garder l'existante de coté en la renommant et refaire une nouvelle)

+ Gérer la fin d'un date et les détails back (je pourrais m'en occuper)

### 3. Lancer le projet

+ pull dans la branche `dev` => `$ git checkout dev (puis) $ git pull`
+ se rendre dans `client` => `$ cd client`
+ installer les packages => `$ npm install`
+ lancer le serveur => `$ npm run start`
+ se rendre dans `backend` (avec un autre terminal) => `$ cd backend`
+ installer les packages => `$ npm install`
+ modifier la [config de db](/backend/config/config.json) (development uniquement) avec vos id
+ créer la base de données => `$ npx sequelize-cli db:create` (peut etre installé des packages qu'on vous propose)
+ migrer les tables => `$ npx sequelize-cli db:migrate`
+ inserer des données (y en aura + plus tard evidemment) => `$ npx sequelize db:seed:all`
+ lancer le serveur => `$ npm run start`

Si tout va bien... GG!

Si ça va pas... RTFM mdr ou envoi moi msg pv je rep si t bg

Vous pouvez vous rendre sur l'url `/register` pour créer votre compte (et aussi pourquoi pas créer le bouton pour redirigé ;) )

> CREEZ VOTRE BRANCHE POUR FAIRE VOS MODIFS, ainsi vous pourrez faire tout le caca que vous souhaitez mais sans tout casser dans `dev` ! et merceee

Si y a un problème hésitez po à me dire! bisou les pd