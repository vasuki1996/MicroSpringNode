import { start } from "framework/index";
import { TestController, ShareController } from './controllers';

new TestController();
new ShareController();

start();