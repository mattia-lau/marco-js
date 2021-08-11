<p align="center">
  <b>Action.JS</b>
</p>
<p align="center">
  A lightweight Command Line Interface builder for TypeScript
</p>

<hr />

# Example

```bash
# Execute by the following command
yarn ts-node main.ts migration -f 1628700454716
yarn ts-node main.ts migration --from 1628700454716
```

```ts
// migration.action.ts
import { Action, ActionRunner, Param } from 'actionjs';

@Action({ command: 'migration' })
export class Migration extends ActionRunner {
  @Param({ name: 'from', alias: 'f', required: true })
  from: number;

  @Param({ name: 'to', alias: 't', defaultValue: Date.now() })
  to: number;

  async execute() {
    const { from, to } = this;

    const data = await new Promise((resolve) =>
      setTimeout(() => {
        resolve([{ id: 1, name: 'Burger' }]);
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
import { Explorer } from 'actionjs';
import { Migration } from './migration.action';

const bootstrap = async () => {
  await new Explorer({ actions: [TestAction] }).execute();
};

bootstrap();
```

### Second Example (Only work without bundler)

```ts
// main.ts
import { Explorer } from 'actionjs';
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
