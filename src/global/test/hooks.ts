import { After } from "@cucumber/cucumber";
import { ExampleWorld } from "./world/example.world";

After(async function (this: ExampleWorld) {
  if (this.app) {
    await this.app.close();
  }
});
