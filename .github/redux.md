Prop Drilling
Prop Drilling refers to the process of passing data (props) through multiple levels of a component
tree, even if only a deeply nested component needs it. In React, when you want to pass data from
a parent component to a deeply nested child, intermediate components (that don't need the data)
also receive the props. This can make the code harder to read, maintain, and debug.
Example of Prop Drilling:
const App = () => {
 const user = { name: "John Doe", age: 30 };
 return <Parent user={user} />;
};
const Parent = ({ user }) => {
 return <Child user={user} />;
};
const Child = ({ user }) => {
 return <GrandChild user={user} />;
};
const GrandChild = ({ user }) => {
 return <View>User: {user.name}</View>;
};
Why Avoid Prop Drilling?
1. Code Maintenance Issues:
o Intermediate components become bloated with props they don't use.
o Changes to the structure of data require updates in multiple components.
2. Readability:
o Hard to understand what data is used by which component, especially in large
component trees.
3. Scalability:
o As the app grows, prop drilling becomes increasingly difficult to manage.
4. Error-Prone:
o Passing props through multiple levels increases the chances of errors, such as forgetting
to pass a required prop.
React Redux
React Redux is a library that helps manage and centralize application state in React applications
using the Redux pattern. It serves as a bridge between React and Redux, enabling them to work
seamlessly together. React Redux provides tools to connect React components to a central Redux
store, allowing for predictable and efficient state management.
Key Concepts:
1. Redux:
Redux is a predictable state container for JavaScript applications. It organizes application state in
a single store and ensures state changes are predictable through specific principles.
2. React Redux:
React Redux connects the Redux store to React components, enabling components to access the
state and dispatch actions without manually subscribing or managing listeners.
Why Use React Redux?
• Centralized State Management: Keeps all application state in one place, making
debugging and scaling easier.
• Predictable State Updates: Follows strict rules, ensuring consistent and predictable state
changes.
• Improved Code Organization: Separates state logic from UI components.
• Easier Debugging: Tools like Redux DevTools allow tracking of state changes.
How React Redux Works:
1. Store:
o The central location for all application state.
o Created using Redux’s createStore function.
2. Actions:
o Plain JavaScript objects that describe what happened.
o Used to request changes to the store.
3. Reducers:
o Functions that specify how the state should change in response to an action.
4. React Components:
o React Redux connects components to the Redux store so they can access state or
dispatch actions
React Redux Workflow:
1. Create a Redux Store: The store holds the entire state tree.
import { createStore } from 'redux';
import rootReducer from './reducers';
const store = createStore(rootReducer);
2. Provide the Store to React Components: Wrap your application in a Provider
component to pass the store down to components.
import { Provider } from 'react-redux';
import App from './App';
<Provider store={store}>
 <App />
</Provider>;
3. Connect Components to the Store: Use the useSelector hook to read state and the
useDispatch hook to dispatch actions.
import { useSelector, useDispatch } from 'react-redux';
const MyComponent = () => {
 const count = useSelector((state) => state.counter);
 const dispatch = useDispatch();
 return (
 <View>
 <Text>Count: {count}</Text>
 <Button onPress = {() => dispatch({ type: 'INCREMENT' })}/>
 </View>
 );
};