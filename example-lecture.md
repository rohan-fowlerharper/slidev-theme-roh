---
theme: ./
highlighter: shiki
lineNumbers: true
layout: intro
title: React State
---

# React State

Week 4, Day 2


---

# Agenda for Today

- The problem. Why do we need state?
- Props vs. State
- Hooks
- Event Handlers

<br>
<br>

Read more about [React](https://react.dev)

---

# State vs. Props

- **Props** are passed from a parent component to a child component
  - Values can be rendered
  - Values are _not_ intended to be changed
- **State** is managed by a component
  - Values can be rendered
  - Values _can_ be changed*
  - Changes in values will _re-render_ a component

*: Values are changed using a function that comes from React (e.g. `useState`) and not directly

---

# Intro to hooks

- A “hook” is a special logical function (from React) that is used to add functionality to React components
- Hooks:
  - Always begin with the word `use...`
  - Must be called from the top level of a component
  - Must be called in the same order every time a component renders
- For component state, we will use `useState`

<br />

Here's an example of using the useState hook:
```tsx
import { useState } from 'react'

function MyCounter() {
  const [count, setCount] = useState(0)

  return (/* ... */)
}
```

---

# Rules of Hooks

Hooks can:
- only be called _inside_ React functions (hooks or components)
- only be called at the _top level_ of a React function

---

# ... only be called inside React functions

```tsx
// BAD - not a React Component or Hook
function myOwnCounter () {
  const [count, setCount] = useState(0)

  // ...
}

// GOOD - inisde a React Component
function MyCounter() {
  const [count, setCount] = useState(0)

  return <div>{count}</div>
}

// GOOD - inside a React Hook
function useCounter() {
  const [count, setCount] = useState(0)

  return { count, setCount }
}
```

---

# ... only be called at the Top Level

```tsx
// BAD - inside a conditional
function MyCounter(props) {
  if (props.countExists) {
    const [count, setCount] = useState(0)
  }
}

// BAD - inside a loop
function MyCounter(props) {
  for (let item of props.items) {
    const [count, setCount] = useState(0)
  }
}

// GOOD - at the top-level
function MyCounter() {
  const [count, setCount] = useState(0)
}
```

---
layout: center
class: 'text-center'
---

# Why the rules?

To preserve state between renders, hooks should be called in the same order every time a component renders.

That is, hooks should be called in the exact same order **every time**

<!-- 
If we do not follow these rules, then React can not guarantee that the state will be preserved.
-->

---

# Defining State


Use the `useState` function from React

<v-clicks>

- Returns an array with two values

- The first time the component is rendered, the state is set to the value passed to `useState`

- Must be defined _inside_ the component, and at the top level

</v-clicks>
  
<v-click>

```tsx {0|1|4|all}
import { useState } from 'react'

function MyCounter() {
  const [value, setValue] = useState('initial value')

  return (/* ... */)
}
```
</v-click>


---

# Updating State

<v-clicks>

- Always use `set...` functions to update state
  - (never use the assignment operator `=`)

- Usually called by an event handler

- Causes the component to re-render

- In event handlers, you may need to use `event.preventDefault()` to prevent the default behavior of the event (not related to state)

</v-clicks>

<v-click>

```tsx
const [count, setCount] = useState(0)

// BAD
count += 1
count = count + 1

// GOOD
setCount(count + 1)
```
</v-click>

---

# Event Handlers

Event handlers are functions that are called when an event occurs

<v-clicks>

- Added to an element using the `on...` attribute (e.g. `onClick`, `onSubmit`, `onMouseEnter`, etc.)

- Always assigned a function as their value

- Called with an event object as the first argument

- Event handlers are typically named `handle...` (e.g. `handleClick`, `handleSubmit`, etc.)
</v-clicks>

<v-click>

```tsx {4-6,9|all}
function MyCounter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <button onClick={handleClick}>Count: {count}</button>
  )
}
```
</v-click>

---
clicks: 6
---

# Re-rendering Lifecycle

```tsx {all|2|9|4-6|1,11|2|9}
function MyCounter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <button onClick={handleClick}>Count: {count}</button>
  )
}
```

<v-clicks at="1">

First render: `count` is `0`

</v-clicks>


<v-clicks at="5">

  Second render: `count` is `1`

</v-clicks>

<!--
Presenter Walkthrough:
  - Show the component

  <CLICK>

  [Line 2 highlighted]
  - Show how useState initialises count to 0

  <CLICK>

  [Line 9 highlighted]
  - Show how the component will render the 0

  - Pretend as though we click the button

  <CLICK>

  [Lines 4-6 highlighted]
  - Show how the component will call the handleClick function
  - Show how setCount will be called with a new value of count + 1

  <CLICK>

  [Lines 1 & 11 highlighted]
  - Show how the component will re-render because the state has changed

  <CLICK>

  [Line 2 highlighted]
  - Show how useState will return the new value of count

  <CLICK>

  [Line 9 highlighted]
  - Show how the component will render the new value of count
 -->

---
layout: sandbox
---

# Executable Example

<Sandbox
  pathToFolder="/codeblocks/example"
  :files="['App.tsx', 'main.css']"
/>

---


# Review Questions

- What happens to components when state changes?
- True or false, components can mutate props?
- What the data type that is returned from `useState`?
- If `useState` is initialised to an array? What is the data type of state?

---
layout: iframe-right
url: https://react.dev
---

# Further Reading

- [react.dev](https://react.dev)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)



