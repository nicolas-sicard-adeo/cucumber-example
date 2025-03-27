import { ExampleWorld } from "../world/example.world";
import { Simple } from "../../../example/domain/simple/simple";

export class SimpleFeatureWorldHelper {
  // here you can have what's necessary to your tests
  // it can be variables to store data
  // it can be identifier generator

  private _simples: Array<Simple>;

  get simples(): Array<Simple> {
    return this._simples;
  }

  set simples(value: Array<{ column1: string; column2: string }>) {
    this._simples = value as Array<Simple>;
  }
}

export function getSimpleFeatureWorldHelper(
  world: ExampleWorld,
): SimpleFeatureWorldHelper {
  if (!world.simpleFeatureWorldHelper) {
    world.simpleFeatureWorldHelper = new SimpleFeatureWorldHelper();
  }
  return world.simpleFeatureWorldHelper;
}
