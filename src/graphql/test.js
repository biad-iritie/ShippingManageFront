import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

export function AddTodo() {
    let input;
    const [addTodo, { data }] = useMutation(ADD_TODO);

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addTodo({ variables: { type: input.value } });
                    input.value = '';
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}