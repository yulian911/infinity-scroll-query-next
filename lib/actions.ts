export const getTodos = async ({ pageParams }: any) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParams}`);
  const todos = await res.json();
  return todos;
};
