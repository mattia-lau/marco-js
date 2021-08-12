import Table from 'cli-table';
import { ActionRunner } from './action.runner';
import { ActionContext, context } from './context';
import { isNil } from './utils/is-nil';

const options = {
  chars: {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: '',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' ',
  },
  style: { 'padding-left': 4, 'padding-right': 4 },
};

export const help = (key?: string) => {
  if (!isNil(key)) {
    generateMenu(context.actions[key]);
  } else {
    console.log('These are the commands supported:');
    const table = new Table(options);
    Object.values(context.actions).forEach((action) => {
      table.push([action.options.command, action.options.description ?? '']);
    });
    console.log(table.toString());
  }
};

const generateMenu = (action: ActionContext<ActionRunner>) => {
  console.log(action.options.command, action.options.description ?? '');
  const table = new Table({
    ...options,
    head: ['options', 'isRequired', 'description'],
  });
  action.params.forEach((param) => {
    const { options } = param;
    const { required, description, name } = options;
    table.push([name, required ?? false, description ?? '']);
  });
  console.log(table.toString());
};
