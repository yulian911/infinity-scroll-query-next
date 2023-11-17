import { FC } from 'react';

export interface todo {
  id: string;
  title: string;
}

interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  todo: todo;
  innerRef?: React.Ref<HTMLParagraphElement>;
}
const TodoCard: FC<TodoCardProps> = ({ todo, innerRef, ...props }) => {
  return (
    <p className="todo-card" key={todo.id} ref={innerRef} {...props}>
      {todo.title}
    </p>
  );
};

export default TodoCard;
