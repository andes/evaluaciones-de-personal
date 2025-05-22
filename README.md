# evaluaciones-de-personal

![ANDES](https://github.com/andes/andes.github.io/raw/master/images/logo.png)

## 

## EVALUACION DE PERSONAL. 


El Sistema de Evaluación de Desempeño del Personal de Salud es una aplicación web desarrollada en Angular que permite evaluar anualmente el desempeño del personal sanitario con el objetivo de gestionar su recategorización de manera justa y transparente.

### Objetivo del Sistema
El sistema facilita la recolección, análisis y gestión de datos sobre el desempeño del personal de salud, considerando distintos criterios de evaluación. A partir de estos datos, se puede determinar si un agente es apto para subir de categoría, además de identificar necesidades de capacitación y funcionamiento del servicio que pertenece.

### Características Principales
✔ Evaluación basada en criterios específicos: Se califican aspectos como conocimientos técnicos, desempeño individual y grupal, atención al usuario y desempeño en cargos de conducción.
✔ Registro estructurado de datos: Se almacena información de los agentes, efectores y servicios donde desempeñan sus funciones.
✔ Gestión de Categorías e Ítems: Se configuran categorías de evaluación con sus respectivos ítems, cada uno con un puntaje que influye en la calificación final del agente.
✔ Interfaz dinámica y accesible: Gracias a Angular, el sistema ofrece una navegación fluida e intuitiva.
✔ Integración con una API REST: Permite almacenar y gestionar la información en una base de datos MongoDB, asegurando la persistencia y seguridad de los datos.
✔ Automatización del proceso de evaluación: Facilita la generación de informes y la toma de decisiones en la recategorización del personal.

### Tecnologías Utilizadas
Frontend: Angular (versión 8.3.23), TypeScript, HTML, CSS, ngx-toastr para notificaciones.
Backend: Node.js con Express, base de datos MongoDB con Mongoose.
Interfaz y experiencia de usuario: Uso de Bootstrap para mejorar la presentación.
Beneficios del Sistema:

✅ Optimiza el proceso de evaluación anual del personal de salud.
✅ Mejora la toma de decisiones en la recategorización y planificación de capacitaciones.
✅ Reduce la carga administrativa mediante la digitalización del proceso.
✅ Brinda transparencia y equidad en la evaluación del personal.

Este sistema busca mejorar la gestión de recursos humanos en el ámbito de la salud pública, garantizando una evaluación objetiva basada en criterios preestablecidos.

## Pre-requisitos 
Antes de instalar y ejecutar el sistema de evaluación de personal, asegúrate de contar con los siguientes requisitos:



### 1. Node.js y npm
Este proyecto utiliza Node.js para gestionar dependencias y ejecutar scripts. Se recomienda instalar la versión 14+.

🔹 Descarga e instala Node.js desde su sitio oficial:
   Node.js Oficial

Para verificar la instalación, ejecuta en la terminal:


```bash
node -v
npm -v
```


### 2. Angular CLI
El proyecto está desarrollado con Angular 8.3.23, por lo que es recomendable instalar esa versión específica de Angular CLI:


```bash
npm install -g @angular/cli@8
```

### Para verificar la instalación, ejecuta:

```bash
ng version
```

### 3. Git
Para clonar el repositorio, necesitas tener Git instalado en tu sistema.

🔹 Descarga e instala Git desde su sitio oficial:
🔗 Git Oficial

Para verificar la instalación, usa:

```bash
git --version
```

### 4. Base de datos (MongoDB)
El backend del proyecto usa MongoDB como base de datos. Debes instalar y ejecutar un servidor de MongoDB local o tener acceso a uno remoto.

## Descarga MongoDB desde:
🔗 MongoDB Oficial

Para iniciar MongoDB localmente, usa:

```bash
mongod
```


### COMO DESCARGAR EL PROYECTO


Requisitos previos
Antes de comenzar,  tener instalado en tu sistema:

```bash
Node.js (versión recomendada: 14+)
Angular CLI (versión recomendada: 8.3.23, instalar con npm install -g @angular/cli@8)
```

### GIT

## 1. Clonar el repositorio

Para obtener una copia del proyecto en tu equipo, abre una terminal y ejecutar:

```bash
git clone https://github.com/andes/evaluaciones-de-personal.git
```




## 2. Acceder al directorio del proyecto
Una vez clonado, accede al directorio del proyecto:
wiindows en la accion ejecutar:
```bash
cd evaluaciones-de-personal

```
linux
```bash
 abrir carpeta / boton derecho mouse / abrir terminal /
```

## 3. Instalar dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
npm install

## 5. Ejecutar el servidor de desarrollo
Para iniciar la aplicación en modo desarrollo, usa el siguiente comando:

```bash
ng serve
```

6. Compilar para producción 
Si deseas generar una versión lista para producción, ejecuta:

```bash
npm start
```


### COMO HACER PRUEBAS
en la consola del vscode ejecutar:

```bash
npm start 
```

 y en el navegador chrone: 
```bash
http://localhost:4200/
```
