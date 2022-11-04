# Semi1-Grupo5-Proyecto2

Amazon Web Services (AWS) es una plataforma de servicios de nube que ofrece potencia de cómputo, almacenamiento de bases de datos, entrega de contenido y otra funcionalidad para ayudar a las empresas a escalar y crecer.

## :computer: Integrantes
| Carnet | Integrante |
| -------- | -------- |
| 201504236| Adriana Marié Gómez Dávila|
| 201900853| Gerardo Steve Muñoz Contreras|
| 201903848| Emiliano José Alexander Velásquez Najera|
| 201904012| Alexandro Provenzale Pérez|

Link de la página:


---

# Documentación :computer: 

## Objetivos del Manual

* Explicar la arquitectura interna utilizada e implementada en cada uno de los servicios de aws en la aplicación.
* Identificar usuarios IAM creados para la administración de identidades y acceso a los servicios y recursos implementados, con los roles asignados a cada uno.

## Explicación de Arquitectura del proyecto

## Servicios Dockerizados

![](https://i.imgur.com/t7uOkkB.png)


## Arquitectura

![](https://i.imgur.com/AjNODG1.png)


Toda la plataforma hace uso de servicios proporcionados por AWS en la cobertura de su capa gratuita. Consta de los servicios:


### EC2

El back-end, almacenado en 2 máquinas virtuales EC2, la primera con un servidor realizado en NodeJS y con implementación de react y la otra conteniendo la base de datos. Ambas hacen uso de docker para la utilización de las aplicaciones.

### Bucket de Imágenes

El almacenamiento de archivos en la nube se hace por medio de S3 con buckets, estos están configurados para que se puedan enviar los archivos desde el backend y que se puedan visualizar desde cualquier parte.

### Base de Datos

La base de datos MongoDB está montada en una EC2 dentro de un contenedor de docker al cual se accede desde el servidor almacenado en la otra EC2.

### Cognito

Se hace uso de este servicio para la creación de un pool de usuarios. Cada usuario registrado y actualizado en la aplicación se almacena en este pool. Tiene comunicación directa con el backend, el cual manda el usuario almacenado a la otra máquina EC2 con MongoDB.

### Rekognition

Inteligencia artificial que obtiene una lista de etiquetas de las publicaciones hechas por los usuario. Se utiliza para crear los filtros de las publicaciones y para el login de la aplicación por medio de reconocimiento facial.

### Translate

Traduce el texto de las publicaciones.


### API Gateway y Función Lambda

API Gateway se conecta directamente con las EC2 y con las funciones lambda, estas funciones nos son de utilidad para mandar imágenes al pool de S3.


## Descripción de cada usuario de IAM creado con las políticas asociadas.

![](https://i.imgur.com/mVqwash.png)


Cada usuario cuenta con el mismo rol que los demás, lo que los diferencia son los grupos a los que pertenecen. La excepción es el kommunicate-bot, este solo cuenta con permisos de AWS lex, para la implementación del bot con Kommunicate.

### Grupos de usuarios
![](https://i.imgur.com/xVjMoH9.png)


* DBA: Acceso completo al servicio DynamoDB
* Frontend-Backend-Dev: Acceso completo al servicio EC2
* StorageAdministrator: Acceso completo al servicio de S3
* ChatBotDeveloper: Acceso completo a AWS lex
* CognitoDeveloper: Acceso completo a Cognito
* GatewayAdmin:Full acces a API Gateway y su catálogo de productos
* RekognitionDeveloper: Acceso completo a las funcionalidades de rekognition
* TranslatorDeveloper: Full access a Translate


## Conclusiones
* Aplicar las tecnologías de la nube a un entorno real.
* Una de las ventajas de AWS es que nos proporciona distintos servicios de capa gratuita, lo cual nos permite practicar para poder familiarizarnos con los servicios en la nube.
* AWS es una herramienta que nos ofrece recursos bajo demanda lo cual permite alta escalabilidad y soluciones computacionales.