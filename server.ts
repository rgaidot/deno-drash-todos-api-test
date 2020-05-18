import { Drash } from "https://deno.land/x/drash/mod.ts";

import { Root } from "./resources/root.ts";
import { TodosItem, TodosList } from "./resources/todos.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [TodosItem, TodosList, Root],
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: true,
    level: "all",
    tag_string: "{datetime} | {level} |",
    tag_string_fns: {
      datetime() {
        return new Date().toISOString().replace("T", " ");
      },
    },
  }),
});

server.run({
  hostname: "localhost",
  port: 8080,
});

console.log("Server listening: http://localhost:8080");
