import { Action, ActionRunner, Param } from '../src';

@Action({ command: 'migration' })
export class TestAction extends ActionRunner {
  @Param({
    name: 'from',
    defaultValue: Date.now(),
  })
  from: string;

  async execute() {
    const data = await new Promise((resolve) =>
      setTimeout(() => {
        resolve([{ id: this.from, name: 'Burger' }]);
      }, 1000),
    );

    console.log(data);
  }
}
