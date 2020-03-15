import React, { useState } from 'react';
import './App.css';

type Place = 'home' | 'work' | { custom: string };

type Todo = Readonly<{
  id: number,
  text: string,
  done: boolean,
  place?: Place
}>;

type CompleteTodo = Todo & {
  readonly done: true
};

const toggleTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    done: !todo.done
  };
};

const completeAll = (todos: readonly Todo[]): CompleteTodo[] => {
  return todos.map(todo => ({
    ...todo,
    done: true
  }));
};

const placeToString = (place: Place): string => {
  if (place === 'home') {
    return 'Home';
  } else if (place === 'work') {
    return 'Work';
  } else {
    return place.custom;
  }
};

const initialTodos: Todo[] = [
  {
    id: 1,
    text: 'Do laundry',
    done: false,
    place: 'home'
  },
  {
    id: 2,
    text: 'Email boss',
    done: false,
    place: 'work'
  },
  {
    id: 3,
    text: 'Go to gym',
    done: false,
    place: { custom: 'Gym' }
  },
  {
    id: 4,
    text: 'Buy milk',
    done: false,
    place: { custom: 'Supermarket' }
  },
  { id: 5, text: 'Read a book', done: false }
];

const App: React.FC = () => {
  const [todos, setTodos] = useState<readonly Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<Readonly<string>>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(event.target.value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (newTodo && event.key === 'Enter') {
      // add new todo item
      setTodos([
        ...todos,
        { id: todos.length + 1, text: newTodo, done: false }
      ]);

      // reset input field
      setNewTodo('');
    }
  };

  const onCheckboxToggle = (index: number): void => {
    // clone existing list
    const newTodos = [...todos];
    // toggle item
    newTodos[index] = toggleTodo(newTodos[index]);
    // update state
    setTodos(newTodos);
  };

  const onCompleteAllClicked = (): void => {
    setTodos(completeAll(todos));
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Todos</h1>
        <input className="Textfield" value={newTodo} onChange={onChange} onKeyPress={onKeyPress} />
        <div className="Todo-container">
          {todos && todos.map((todo, index) => {
            const checkboxId: string = `${todo.id}_id`;
            return (
              <div key={todo.id} className="Todo">
                <input id={checkboxId} type={'checkbox'} checked={todo.done} onChange={() => onCheckboxToggle(index)} />
                <label htmlFor={checkboxId} className="Todo-text">{todo.text}</label>
                {todo.place && <div>{placeToString(todo.place)}</div>}
              </div>
            );
          })}
          <button onClick={onCompleteAllClicked}>Complete All</button>
        </div>
      </div>
    </div>
  );
};

export default App;
