# When does React batch state

---

Title: When does React batch state
Date: 12/23/2021
Description: We learned before that React states sometimes get batched together into one single state update instead of individual update. But some other times this is not the case.

---

**NOTE**: At the time of writing, React 18 hasn't been released and [in the React 18 brief](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html) the behavior of state batching will change for the better. For more information about React 18 change, read [this GitHub discussion](https://github.com/reactwg/react-18/discussions/4) This article will cover the state batching of React version 17 and older.

## Terms

In the syntax

```tsx
const [state, setState] = useState(0);
```

I will call variable in `state` position as **state variable <name_of_variable>** (for example, the state variable `count`)

I will call function in `setState` position as **state-update function <name_of_function>** (for example, the state-update function `setCount`)

I will call value in `0` position as **initial value of state <name_of_state>** (for example, the initial value of state `count`)

## When does React batch state?

Let take a look at the code below

```tsx
const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState("hello");

  useEffect(() => {
    console.log("State change");
  });

  const handleClick = () => {
    setA(a + 1);
    setB(b + "new hello");
  };

  return (
    <div>
      {a} --- {b}
      <button onClick={handleClick}>Change state</button>
    </div>
  );
};
```

When we click on the button, the state variable `a` and `b` will be updated, but the component only re-render **ONE**. This is because React batches both state-update functions in `handleClick` into one "batch" and after React know for sure that there is no more state-update function it needs to run, it will execute those batched state-update functions.

---> This help us update the states all at once, which in turn re-render component only one time. This is a good thing for performance.

However, React doesn't always batch state. Several situations that can prevent this from happening. For example, if we do something asynchronous and then want to update state, chance is that React won't batch those states and instead, run each of them individually. Let take a look at one example

```tsx
const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState("hello");

  useEffect(() => {
    console.log("State change");
  });

  const handleClick = async () => {
    const data = await fetch("some url");
    setA(a + 1);
    setB(b + "new hello");
  };

  return (
    <div>
      {a} --- {b}
      <button onClick={handleClick}>Change state</button>
    </div>
  );
};
```

If we click on the button now, we see that the log message is printed twice, which indicates that the component has been re-rendered **TWICE**. This can be interpreted as that each of the state-update function has been executed individually.

Here is what happen in order:

1. Button is clicked and the event handler `handleClick` is called
2. Data is fetched
3. `setA` is called and **executed** which update state variable `a`
4. The component re-render
5. The callback of `useEffect` is put on queue and scheduled to run
6. `setB` is called and **executed** which update state variable `b`
7. The component re-render
8. The callback of `useEffect` is put on queue and scheduled to run
9. The callbacks function we put on queue from before is executed and print out 2 log messages

This is unexpected and may potentially cause bugs.

This behavior also happens in other form of asynchronous action. Some examples:

```tsx
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will re-render twice
}, 1000);
```

Or

```tsx
fetch(/*...*/).then(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will re-render twice
});
```

Or

```tsx
elm.addEventListener("click", () => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will re-render twice
});
```

## How to fix this problem?

Currently on React 17 and older there is no fix for this. However, in React 18 this problem will be addressed.

## Reference

- [React 18 discussion on batching](https://github.com/reactwg/react-18/discussions/21)
- [Does React batch state update functions when using hooks?](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks)
