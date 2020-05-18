import { Drash } from "https://deno.land/x/drash/mod.ts";

export class Root extends Drash.Http.Resource {
  static paths: Array<string> = ["/"];

  public GET() {
    this.response.body = { appName: "Todos", version: "v0.1.0" };
    return this.response;
  }
}
