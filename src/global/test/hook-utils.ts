import { ExampleWorld } from "./world/example.world";
import { INestApplication, NestModule } from "@nestjs/common";
import { isUndefined } from "lodash";
import { Test } from "@nestjs/testing";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

export class HooksUtils {
  private async getApp(
    world: ExampleWorld,
    mainModule: unknown,
  ): Promise<INestApplication> {
    if (isUndefined(world.app)) {
      world.app = await this.initializeApp(
        world,
        mainModule as new () => NestModule,
      );
    }
    return world.app;
  }

  private async initializeApp(
    world: ExampleWorld,
    mainModule: new () => NestModule,
  ): Promise<INestApplication> {
    const testingModuleBuilder = Test.createTestingModule({
      imports: [mainModule],
    });

    // You can override a service that way
    // testingModuleBuilder.overrideProvider(ExampleKafkaConsumer).useValue({});

    // you can also override a list of services providing a class
    // /!\ only if they have no parameter
    [
      // [ExampleHttpClient, ExampleHttpClientMock]
    ].forEach(([provider, mockProvider]) => {
      testingModuleBuilder
        .overrideProvider(provider)
        .useValue(new mockProvider());
    });

    // you can also override a list of services by new instances of a mock
    [
      // [ExampleHttpClient, new ExampleHttpClientMock(world)],
    ].forEach(([provider, value]) => {
      testingModuleBuilder.overrideProvider(provider).useValue(value);
    });

    // you can also override a module providing its configuration
    // testingModuleBuilder.overrideProvider(DbConfig).useValue({
    //   url: "my db url",
    //   database: "my db name",
    // });

    const testingModule = await testingModuleBuilder.compile();

    // @ts-ignore
    const app = testingModule.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    ) as INestApplication;
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    return app;
  }
}
