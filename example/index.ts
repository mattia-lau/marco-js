import { Explorer } from '../src';
import { TestAction } from './test.action';

const bootstrap = async () => {
  await new Explorer({ actions: [TestAction] }).execute();
};

bootstrap();
