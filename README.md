# PZH Style Library

Deze laag van de is verantwoordelijk voor het loskoppelen van style/ambiance. De doelstelling is opstellen en onderhouden van style definities.

## Input

- [Design system](https://www.figma.com/file/11ZuN25dSOqx3w1ie9Avbz/Design-System---Provincie-Zuid-Holland)

## Output

- Website [Website](https://n2dabaed4e91d4ca59f2a437.azurewebsites.net/) welke inzicht geeft in verschillende bouwblokken
- SCSS variabelen, mixins en fucties gedeployed als Prive NPM Library te vinden op [documentatie](https://www.npmjs.com/package/@pzh-temporary/style-library)
- ?? Typografie CSS bestand op CDN
- ?? Fonts deployen op CDN
- ?? Utility classes typografie, margins, paddings, grid, radius, levitation, colors, background-colors, animaties

## Techniek

### Technologieen

- Storybook
- Vue 3 als template engine
- Custom node workflow tools

### Benodigdheden

- Node 18.12.1
- NPM 8.19.2
- NPM account op basis van je PZH emailadres. Dit account dient gerechtigd te zijn om private packages (@pzh-temporary) te gebruiken van PZH.

### Installeren dependencies

```bash
npm install
```

### Ontwikkelen

```bash
npm run storybook
```

### Publiceren NPM

1. Verhoog attribuut 'version' in bestand package.json
1. Zorg dat je ingelogd bent bij NPM. Zo niet voer in command line commando 'npm login' uit
1. Voer in command line commando 'npm run publish-to-npm' uit
