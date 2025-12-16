Pour lancer le projet, il faut installer Docker :

https://docs.docker.com/get-started/get-docker/

Choisissez la plateforme sur laquelle vous êtes, et suivez les instructions pour installer Docker Desktop.

/!\ ATTENTION /!\
L'installation sur Windows (et possiblement sur Linux et MacOS) nécessite un redémarrage de l'appareil.
Ce redémarrage sera automatique après avoir validé la fenêtre d'installation de Docker Desktop,
donc faites attention si vous avez des fichiers non-enregistré ou des processus importants en cours sur l'ordinateur.

Après le redémarrage, sur Windows, une console apparaitra pour mettre à jour WSL (le sous-système pour Linux sur Windows).
Suivez les instructions pour finaliser l'installation de Docker.

Une fois Docker d'installer, vous pouvez ignorez la partie de connexion.
Avec l'explorateur de fichiers, allez à la racine du projet, faites un clic droit et cliquez sur "Ouvrir dans le terminal".
Une fois dans le terminal, voici les commandes qu'il faudra entrer utiliser le projet :
    - Pour lancer le projet : "docker-compose up"
    - Pour arrêter le projet : "docker-compose down"
    - Pour supprimer les containeurs : "docker-compose down -v"

/!\ IMPORTANT /!\
Pour arrêter l'execution de Docker, il faut faire deux fois le raccourci CTRL+C.

Une fois le projet lancé, vous pourrez y accéder à l'adresse suivante pour le frontend :
    http://localhost:3000/
