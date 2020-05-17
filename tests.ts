import { Drash } from "https://deno.land/x/drash/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { Root } from "./resources/root.ts";
import { TodosList, TodosItem } from "./resources/todos.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [
    Root,
    TodosList,
    TodosItem,
  ],
});

server.run({
  hostname: "0.0.0.0",
  port: 8080,
});

Deno.test({
  name: "GET /",
  async fn(): Promise<any> {
    const response = await fetch("http://0.0.0.0:8080", {
      method: "GET",
    });

    assertEquals(
      await response.json(),
      { appName: "Todos", version: "v0.1.0" },
    );
  },
});

Deno.test({
  name: "GET /todos",
  async fn(): Promise<any> {
    const response = await fetch("http://0.0.0.0:8080/todos", {
      method: "GET",
    });

    assertEquals(
      await response.json(),
      [
        {
          id: "4ae76499-2ef1-408c-b990-df54c8917a72",
          text: "foo",
          done: false,
        },
        {
          id: "af04551d-5a2d-4438-8d0d-ee3320189e17",
          text: "bar",
          done: false,
        },
      ],
    );
  },
});

Deno.test({
  name: "GET /todos/af04551d-5a2d-4438-8d0d-ee3320189e17",
  async fn(): Promise<any> {
    const response = await fetch(
      "http://0.0.0.0:8080/todos/af04551d-5a2d-4438-8d0d-ee3320189e17",
      {
        method: "GET",
      },
    );

    assertEquals(
      await response.json(),
      { id: "af04551d-5a2d-4438-8d0d-ee3320189e17", text: "bar", done: false },
    );
  },
});

Deno.test({
  name: "GET /todos/af01d-5a2d-4438-8d0d-ee3320189e17 - not found",
  async fn(): Promise<any> {
    const response = await fetch(
      "http://0.0.0.0:8080/todos/af01d-5a2d-4438-8d0d-ee3320189e17",
      {
        method: "GET",
      },
    );

    assertEquals(
      await response.json(),
      "This todo id: af01d-5a2d-4438-8d0d-ee3320189e17 is not found",
    );
  },
});

Deno.test({
  name: "PUT /todos/af01d-5a2d-4438-8d0d-ee3320189e17",
  async fn(): Promise<any> {
    const response = await fetch(
      "http://0.0.0.0:8080/todos/af04551d-5a2d-4438-8d0d-ee3320189e17",
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          "text": "Bar",
          "done": true,
        }),
      },
    );

    assertEquals(
      await response.json(),
      { id: "af04551d-5a2d-4438-8d0d-ee3320189e17", text: "Bar", done: true },
    );
  },
});

Deno.test({
  name: "Close server",
  fn() {
    server.close();
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
