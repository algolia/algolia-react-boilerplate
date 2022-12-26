# Dependencies

### 🚌 Tour

[Reactour](https://reactour.js.org/)

### 💻 State Manager

[Recoil](https://recoiljs.org/)

### 🚧 Router

[React Router](https://v5.reactrouter.com/web/guides/quick-start)

### 🎚 Slider

[Slider](https://slider-react-component.vercel.app/)

### 🎨 Style

[SCSS](https://sass-lang.com/)
with
[BEM Naming](https://css-tricks.com/bem-101/)

### ⏰ Debounce

[Debounce Lodash](https://www.npmjs.com/package/lodash.debounce)

The Utility of this package is to wait before action, for example on the SearchBox, onChange wait some time before send query.

### ⏰ Lazy Loading

We use the React library Suspense and lazy to load components when needed, and a wrapper called lazily because the default react library doesn't support named exports.

- https://reactjs.org/docs/code-splitting.html#reactlazy
- https://www.npmjs.com/package/react-lazily

### ⭐️ Translation

We use the React library [React i18n](https://react.i18next.com/), to translate all the content code part like Button, Title,....
And you have the Select option to switch between the languages.
To start it's by default in english if you don't have any other language,you can just put false in the Translation Config option.

- You have to use this feature configure your others language index, and make sure you have the correct facet translation for example

1. First Step: Go into the translation file and configure languages expected by default you are in english. If no other language is expected let just english be the default, or modify the content.
2. Second Step: Define the content translated in each language.
3. Third Step: In the selector file don't forget to define the i18 language for example actually, we have only ger fr and en, but add for example jap for japanese :  
    case 'Japanese':
   ...
   i18n.changeLanguage('jap');
