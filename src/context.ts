import { ParamPairs } from 'src/decorators/param.decorator';
import { ActionRunner } from './action.runner';
import { ActionOptions } from './decorators/action.decorator';
import { Constructor } from './utils/import-class-by-dir';

type Type<T = ActionRunner> = {
  params: ParamPairs[];
  options: ActionOptions;
  Instance: Constructor<T>;
};

type Context = { actions: Record<string, Type> };

export const context: Context = {
  actions: {},
};
