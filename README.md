# Epicare

![Language](https://img.shields.io/github/languages/top/epicare2021/API.svg?style=flat)
[![Build Status](https://travis-ci.com/epicare2021/API.svg?branch=master)](https://travis-ci.com/epicare2021/API)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/epicare2021/API/blob/master/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/epicare2021/API.svg?style=flat)](https://github.com/epicare2021/API/issues)
[![GitHub Issues closed](https://img.shields.io/github/issues-closed-raw/epicare2021/API.svg?style=flat)](https://github.com/epicare2021/API/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed)
![Last commit](https://img.shields.io/github/last-commit/epicare2021/API.svg?style=flat)

## Assignations

### Front UX & UA

    Hugo Chollet
    Alexandre Gueguen
    Kentin Pratelli
    Marc Perez
    Maxence Fourrier

### Collecte de retours

    Tout le monde
    Marc Perez

### Back Serveur / SQL

    -> SQL / Serveur / Appli
    Killian Gardahaut
    Philippe De Sousa Violante
    Tanguy d'Auria


# Présentation du github
Présentation du fonctionnement du github et de la procédure de push

## Présentation

### Master
La master est la branch qui correspondra à la production. Personne ne peut push dessus, seules sont autorisés les merges requests depuis la préprod.

### Preprod
Comme son nom l'indique, la preprod est la branche avant la prod (master).
Cette branch sera là pour fusionner toutes les branchs avant de push sur la production.
Seule les chef de pôle pourra faire une merge request dessus, cependant, votre MR (merge request) sera accepté seulement si le code est propre (pas forcément parfait, mais pas inbuvable).

### Back / Front

Une branch back / front, à l'image de la préprod et la master, ces branchs sont là pour faire le lien entre toutes les branch back / front. Chaque chef de pôle devra assurer le suivi de sa branch. Les chefs de pôle pourront faire des MR entre leur branch respective (back / front) et la preprod.

### Everything else

Chaque utilisateur pourra créer autant de branch qu'il veut, l'utilisateur qui créer une branch est seule responsable de sa branch, code dégeu, push de fichier trash etc.. Faites comme vous voulez, mais la branch ne sera pas merge tant qu'elle ne sera pas propre (donc nettoyer avant de MR)

## Procédures de push

<a href="https://ibb.co/C9Hxtbx"><img src="https://i.ibb.co/kDSYy4Y/index.png" alt="index" border="0"></a>


