<br/>
<p align="center">
  <a href="https://github.com/salem404/coral-companion">
    <img src="frontend/src/assets/img/logo-color.svg" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Coral Companion</h1>

  <p align="center">
    Coral Island companion web app
    <br/>
    <br/>
    <a href="https://coral-companion.netlify.app/"><strong>Live site »</strong></a>
    <br/>
    <br/>
    <img alt="GitHub" src="https://img.shields.io/github/license/salem404/coral-companion?label=License">
    <img src="https://api.netlify.com/api/v1/badges/66e9e79f-2055-4632-ade3-ccbd40d120be/deploy-status" alt="License">
  </p>
</p>

## Table of Contents

-   [Table of Contents](#table-of-contents)
-   [Features](#features)
-   [Documentation](#documentation)
-   [Run Locally](#run-locally)
-   [Resources](#resources)
-   [Tech Stack](#tech-stack)
-   [License](#license)

## Features

-   Task list
-   Seasonal dashboard
-   Resources information

## Documentation

[Documentation](https://linktodocumentation)

## Run Locally

Make sure Docker is installed and running

Clone the project

```bash
  git clone https://github.com/salem404/coral-companion
```

Install dependencies in the project directory

```bash
  npm install && composer install
```

Create environment file

```bash
  cp .env.example .env
```

Start the server in the project directory

```bash
  vendor/bin/sail up
```

Create laravel application key

```bash
  vendor/bin/sail artisan key:generate
```

Create the database and seed it with data

```bash
  vendor/bin/sail artisan migrate --seed
```

## Resources

| Resource         | Name     | Author                                             | Source                                         | License                                     |
| :--------------- | :------- | :------------------------------------------------- | :--------------------------------------------- | :------------------------------------------ |
| Application logo | logo.svg | [Paula Rumeu](https://github.com/salem404)         | Own creation                                   | [![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa] |
| Icon -           |          | [Stairway Games](https://www.stairwaygames.com)    | [Coral Island Wiki](https://coralisland.wiki/) | [![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa] |
| Icon -           |          | [Abhimanyu Rana](https://github.com/planetabhi)    | [SargamIcons](https://sargamicons.com)         | [![CC BY 4.0][cc-by-image]][cc-by]          |
| Trash icon       |          | [Mikhail Kolomietc](https://www.figma.com/@demiko) | [Figma](https://www.figma.com)                 | [![CC BY 4.0][cc-by-image]][cc-by]          |

## Tech Stack

**Version Control:**

![Git](https://img.shields.io/badge/Git-F05032?logo=Git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=GitHub&logoColor=white)

**Design:**

![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=white)

**Deployment:**

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=Docker&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=Netlify&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-FF0000?logo=Railway&logoColor=white)

**Client:**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?logo=Sass&logoColor=white)
![Vue](https://img.shields.io/badge/Vue.js-4FC08D?logo=Vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?logo=NPM&logoColor=white)

**Server:**

![PHP](https://img.shields.io/badge/PHP-777BB4?logo=PHP&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=Laravel&logoColor=white)
![Sail](https://img.shields.io/badge/Sail-FF2D20?logo=Laravel&logoColor=white)
![PhpMyAdmin](https://img.shields.io/badge/PhpMyAdmin-0175B2?logo=PhpMyAdmin&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=white)
![Composer](https://img.shields.io/badge/Composer-885630?logo=Composer&logoColor=white)

**Testing:**

![PHPUnit](https://img.shields.io/badge/PHPUnit-993399?logo=PHPUnit&logoColor=white)

**Linting:**

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=ESLint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=Prettier&logoColor=white)

**Documentation:**

![Insomnia](https://img.shields.io/badge/Insomnia-5849BE?logo=Insomnia&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=white)
![JSDoc](https://img.shields.io/badge/JSDoc-FA7343?logo=JSDoc&logoColor=white)

## License

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by]: https://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://licensebuttons.net/l/by/4.0/88x31.png
