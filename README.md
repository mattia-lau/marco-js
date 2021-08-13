<p align="center">
  <b>Marco Js</b>
</p>
<p align="center">
  A lightweight Command Line Interface builder for TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/~mattia.lau" target="_blank"><img src="https://img.shields.io/npm/v/marco-js" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~mattia.lau" target="_blank"><img src="https://img.shields.io/npm/l/marco-js" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~mattia.lau" target="_blank"><img src="https://img.shields.io/npm/dm/marco-js" alt="NPM Downloads" /></a>
</p>

<hr />

# Installation

```bash
yarn add marco-js
#or
npm install marco-js
```

# Example

```bash
# Execute by the following command
yarn ts-node main.ts screen --market stock -l JP
# Help Menu
yarn ts-node main.ts -h # For show all the commands with description
yarn ts-node main.ts screen -h # Show all the options.
```

```ts
// screen.action.ts
import { Action, ActionRunner, Param } from 'marco-js';

@Action({ command: 'screen' })
export class ScreenTickerAction extends ActionRunner {
  @Param({
    name: 'market',
    alias: 'm'
    choices: ['stock', 'indice', 'mf'],
    required: true,
  })
  market: string;

  @Param({
    name: 'location',
    required: true,
    alias: 'l',
    validation: (value) => {
      return ['US', 'JP', 'EU'].includes(value);
    },
  })
  location: string;

  async execute() {
    const data = await new Promise((resolve) =>
      setTimeout(() => {
        resolve([{ location: this.location, market: this.market }]);
      }, 1000),
    );

    console.log(data);
  }
}
```

## We provide two different way to inject the actions

### First Example

```ts
// main.ts
import { Explorer } from 'marco-js';
import { ScreenTickerAction } from './screen.action';

const bootstrap = async () => {
  await new Explorer({ actions: [ScreenTickerAction] }).execute();
};

bootstrap();
```

### Second Example (Only work without bundler)

```ts
// main.ts
import { Explorer } from 'marco-js';
import { Migration } from './migration.action';

const bootstrap = async () => {
  await new Explorer({
    fromDir: [__dirname + '/**/*.action{.ts,.js}'],
  }).execute();
};

bootstrap();
```

<hr />

Feel free to create an issue for raise out the features that you want to included in this package.  
Please give a `Star` in Git Repository for supporting the contributor
