import { isNil } from 'lodash';
import parse from 'minimist';
import { context } from './context';
import {
  ActionOptions,
  optionsMetadataKey,
} from './decorators/action.decorator';
import { paramMetadataKey, ParamPairs } from './decorators/param.decorator';
import {
  Constructor,
  importClassesFromDirectories,
} from './utils/import-class-by-dir';

type ExplorerOptions = {
  actions?: Constructor[];
  fromDir?: string[];
};

export class Explorer {
  constructor(options: ExplorerOptions) {
    this.bind(options.actions);

    const { fromDir } = options;
    if (!isNil(fromDir)) {
      this.bind(importClassesFromDirectories(fromDir));
    }
  }

  public async execute() {
    const argv = this.parseArgv();
    const command = argv._[0];

    const action = context.actions[command];
    if (isNil(action)) {
      throw new Error(`${action} is not yet registered`);
    }

    const { Instance, params } = action;

    params.forEach(({ key, options }) => {
      const { required, name, alias, defaultValue } = options;
      if (!isNil(argv[key])) {
        action.Instance.prototype[key] = argv[key];
      } else if (alias && !isNil(argv[alias])) {
        action.Instance.prototype[key] = argv[alias];
      } else {
        if (!isNil(defaultValue)) {
          action.Instance.prototype[key] = defaultValue;
        } else {
          if (required) {
            throw new Error(`${name} is required`);
          }
        }
      }
    });

    await new Instance().execute();
    process.exit(0);
  }

  private bind(actions: Constructor[] = []) {
    actions.forEach((instance: Constructor) => {
      const clazz = new instance();
      const params: ParamPairs[] =
        Reflect.getMetadata(paramMetadataKey, clazz) ?? [];

      const options: ActionOptions =
        Reflect.getMetadata(optionsMetadataKey, instance) ?? {};

      context.actions[options.command] = {
        params,
        options,
        Instance: instance,
      };
    });
  }

  private parseArgv() {
    return parse<Record<string, unknown>>(process.argv.slice(2));
  }
}
