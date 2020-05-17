import { Drash } from "https://deno.land/x/drash/mod.ts";

let todos = [
  { id: "4ae76499-2ef1-408c-b990-df54c8917a72", text: "foo", done: false },
  { id: "af04551d-5a2d-4438-8d0d-ee3320189e17", text: "bar", done: false },
];

export class TodosList extends Drash.Http.Resource {
  static paths = ["/todos"];

  public GET() {
    this.response.body = todos;
    return this.response;
  }
}

export class TodosItem extends Drash.Http.Resource {
  static paths = ["/todos/:id"];

  public GET() {
    const id = this.request.getPathParam("id");
    const todo = this.getTodoItem(id);

    this.response.body = todo;
    return this.response;
  }

  public PUT() {
    const id = this.request.getPathParam("id");
    const todo = this.getTodoItem(id);

    todo.text = this.request.getBodyParam("text");
    todo.done = this.request.getBodyParam("done");

    this.response.body = todo;
    return this.response;
  }

  protected getTodoItem(id: string) {
    const todo = todos.find((t) => t.id == id);

    if (!todo) {
      throw new Drash.Exceptions.HttpException(
        404,
        `This todo id: ${id} is not found`,
      );
    }

    return todo;
  }
}
