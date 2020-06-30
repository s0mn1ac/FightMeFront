<p align="center">
<h1 align="center">
<img src="https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Elf-512.png" width="50" />
<img src="https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png" width="50" />
<img src="https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Sorceress-512.png" width="50" />
FightMe!
<img src="https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Sorceress-512.png" width="50" />
<img src="https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png" width="50" />
<img src="https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Elf-512.png" width="50" />
</h1>
</p>

Este proyecto ha sido desarrollado por Juan Miguel González Machado como práctica personal.


## Contenido

* [Descripción](#descripcion)
* [Autores](#autores)
* [Instalación](#instalacion)
* [Apartados](#apartados)
* [Agradecimientos](#agradecimientos)
  
  
## <a name="descripcion"> </a>Descripción

¡Ahora con un modo de lucha manual!

![Demo batalla manual](https://i.imgur.com/zQ4GBLB.gif "Demo batalla manual")

El proyecto **FightMe!** consta de un [Frontend](https://github.com/s0mn1ac/FightMeFront) desarrollado en **Angular** y un [Backend](https://github.com/s0mn1ac/FightMeBack) desarrollado en **Spring**. La base de este proyecto es la de ofrecer a los *administradores* de la app un **CRUD** completo mediante el cual puedan gestionar el sitio, a la vez que se le brinda a los *usuarios* la posibilidad de visualizar tanto sus personajes como los de sus rivales, para enfrentarlos en batallas automáticas (generadas aleatoriamente) o manuales.



## <a name="autores"> </a>Autores

* Juan Miguel Gonzalez Machado
  
  
## <a name="instalacion"> </a>Instalación

A continuación encontrarás todo lo necesario para poner en marcha el proyecto.

### Requisitos previos

- Angular CLI
- Node JS
- Typescript
- [Backend](https://github.com/s0mn1ac/FightMeBack) operativo

![alt text](https://i.imgur.com/zpuYBqi.png "Instalación Angular CLI")

### Clonado

Utiliza el siguiente comando para clonar el **repositorio**:

``` bash
$ git clone https://github.com/s0mn1ac/FightMeFront.git
```

También puedes descargar el proyecto en formato **zip** desde [aquí](https://github.com/s0mn1ac/FightMeFront/archive/master.zip) 

### Puesta en marcha

Una vez clonado el repositorio, simplemente ejecuta los siguientes comandos para arrancar el proyecto:

``` bash
$ npm install
$ ng serve -o
```


## <a name="apartados"> </a>Apartados

La aplicación está dividida en **5 apartados principales**:

### Login

El nuevo login mejorado permite iniciar sesión con un *usuario* y *contraseña* o utilizando la api **Face** de **Microsoft Azure**, la cual utiliza reconocimiento facial para ello. Esta actualización añade además una capa extra de seguridad, ya que únicamente permite el reconocimiento facial mediante webcam y únicamente si detecta una cara humana.

> **Nota:** El reconocimiento facial debe ser previamente habilitado por un administrador.

![FaceId con cara](https://i.imgur.com/XIWXsyQ.png "FaceId con cara")

![FaceId sin cara](https://i.imgur.com/0C3Insx.png "FaceId sin cara")

### Panel del jugadores

Aquí encontrarás todos los personajes asignados a tu usuario, así como tus rivales. Podrás consultar las estadísticas de todos y cada uno de ellos y además podrás usar alguno de los tuyos para comenzar una batalla.

![Panel de jugadores](https://i.imgur.com/pqe9rGT.png "Panel de jugadores")

![Información de jugador](https://i.imgur.com/2487Ekh.png "Información de jugador")

### CRUD

Separado en tres secciones, permite a los *administradores* añadir, editar, eliminar y visualizar **usuarios**, **personajes** y **habilidades**.

> **Nota:** Este apartado es de uso exclusivo para administradores. El resto de usuarios tiene restringido el acceso.

![Usuarios](https://i.imgur.com/VvBsZZJ.png "Usuarios")

![Personajes](https://i.imgur.com/bvbd2ut.png "Personajes")

![Habilidades](https://i.imgur.com/5LY4qU8.png "Habilidades")

### Información

Si tienes dudas, puedes consultar este apartado para saber más sobre cada tipo de personaje.

![Información](https://i.imgur.com/4cSq3g3.png "Información")

### Batalla

Pon a prueba tus personajes enfrentándolos a los del resto de jugadores.

![Demo batalla automática](https://i.imgur.com/ukhwLh7.gif "Demo batalla automática")


## <a name="agradecimientos"> </a>Agradecimientos

Las imágenes de los personajes han sido diseñadas por [**Chanut is Industries**](https://www.iconfinder.com/Chanut-is).
Todas las banderas empleadas son un diseño original de [**Freepik**](https://www.flaticon.es/autores/freepik).