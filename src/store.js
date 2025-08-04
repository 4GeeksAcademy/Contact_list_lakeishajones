// STORE allows to use all components , rather than having to grab info from other components
export const initialStore = () => {
  return {
    contactsArray: [],
    singleContact: {}
  };
};

export default function storeReducer(store, action = {}) {
  if (action.type == "set-contact-list") {
    


    return {
      ...store,
      contactsArray: action.payload
    };
  }


  if (action.type == "set-single-contact") {
    console.log("im here again", action.payload)



    return {
      ...store,
      singleContact: action.payload
    };
  }

  switch (action.type) {
    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    default:
      throw Error("Unknown action.");
  }
}