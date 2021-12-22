# What is functional form of setState

---

Title: What is functional form of setState
Date: 12/05/2021
Description: If you use React Hooks before, you are probably familiar with using `setState` by passing the new value you want the state to update to to it. But do you know that it has a functional form?

---

## Terms

In the code below

```tsx
const [state, setState] = useState(0);
```

I will call variable in `state` position as **state variable <name_of_variable>** (for example, the state variable `count`)

I will call function in `setState` position as **state-update function <name_of_function>** (for example, the state-update function `setCount`)

I will call value in `0` position as **initial value of state <name_of_state>** (for example, the initial value of state `count`)

## What is functional form of state-update function

Let take a look at the code below

```tsx
// Example 1
function Counter() {
  const [count, setCount] = useState(0);

  const incrementHandler() => {
    setCount(count + 1)
  }

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={incrementHandler}>Increment</button>
    </>
  );
}
```

This is a very basic React app: we have a state variable and we want to update this state variable whenever the button is clicked.

Let's take a look at a different way we can write our `incrementHandler`

```tsx
// Example 2
function Counter() {
  const [count, setCount] = useState(0);

  function increment = number => number + 1

  const incrementHandler = () => {
    setCount(increment)
  }

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={incrementHandler}>Increment</button>
    </>
  );
}
```

In this example 2, we use the functional form of state-update function to update state variable. We pass a function to `setCount` and the returned value of this function is the new value for `count`. This function will take in the current state as its argument.

So in our example, we have:

- `increment` is the function we pass to `setCount` to update state variable `count`
- `increment`'s argument is the current state variable `count`
- `increment`'s returned value will be the new value for state variable `count`

Let take a look at another example:

```tsx
// Example 3
function Counter() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(10)

  function increment = number => number + 1

  const incrementCountHandler = () => {
    setCount(increment)
  }

  const incrementPriceHandler = () => {
    setPrice(increment)
  }

  const reset = ( ) => {
    setCount(0)
    setPrice(10)
  }

  return (
    <>
      Count: {count}
      Price: {price}
      <button onClick={}>Reset</button>
      <button onClick={incrementCountHandler}>Increment count</button>
      <button onClick={incrementPriceHandler}>Increment price</button>
    </>
  );
}
```

In this example 3, we pass the same function `increment` to `setCount` and `setPrice`. Let's analyze what use what for each case.

For function `increment` that is passed to `setCount`:

- `increment`'s argument is the current state variable `count`
- `increment`'s returned value will be the new value for state variable `count`

For function `increment` that is passed to `setPrice`:

- `increment`'s argument is the current state variable `price`
- `increment`'s returned value will be the new value for state variable `price`

So we can see that the function `increment` receives _only state variable that is managed by that state-update function_ as argument, not all state variables existing within the app.

**But why do we need this functional form in the first place?**

The answer is: when you need to update state based off the previous state where the normal method fails to do.

## Different between normal and functional form of state-update function?

- The normal one `setState(value)` uses the value of `value` at the time the function `setState` is called. It doesn't know whether the value of `value` is staled or not due to closure (in other words, sometimes the state variable already updated but the `setState` still use the old value)
- The functional one `setState(oldState => value)` gives instruction to React: hey React, use the **LATEST, MOST UP-TO-DATE** value of state variable to create a new value. Multiple instructions of these kind can be stacked together and the new state of one is the `oldState` of another.

Let analyze this by using a simple example:

```tsx
// Example 4
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 5); // (1) setCount
    setCount(count + 7); // (2) setCount
  };

  return (
    <div>
      Count is: {count}
      <button onClick={handleClick}>Change count</button>
    </div>
  );
}
```

This is what happened when we click the button:

1. We click on the button and function `handleClick` is called
2. `(1) setCount` is called (but not run) with the function `handleClick` receiving the the state-variable `count` with value 0 at the called time
3. `(2) setCount` is called (but not run) with\*the function `handleClick` receiving the the state-variable `count` with value 0 at the called time
4. As there is no more state-update function, both the state-update functions above are batched and being executed
5. `(1) setCount` set the count value to 5. `(2) setCount` set the count value to 7. Since `(2) setCount` is after `(1) setCount`, the _final value_ of `count` is 7

---

In comparison with using functional form

```tsx
// Example 5
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 5); // (1) setCount
    setCount((count) => count + 7); // (2) setCount
  };

  return (
    <div>
      Count is: {count}
      <button onClick={handleClick}>Change count</button>
    </div>
  );
}
```

This is what happened when we click the button:

1. We click on the button and function `handleClick` is called
2. `(1) setCount` is called, which trigger the callback inside
3. This callback gives React instruction: increase `count` by `5` with whatever the latest `count` value is
4. `(2) setCount` is called, which trigger the callback inside
5. This callback gives React instruction: increase `count` by `7` with whatever the latest `count` value is
6. As there is no more state-update function, both the state-update functions above are batched and being executed
7. At the very beginning, `count` is `0`. The latest value of `count` at the first instruction is `0`. Thus `count` is updated to `5`. The second instruction use the latest value of `count`, which is `5` right now. And thus `count` is updated to `12`
8. The final value of `count` is 12

---

Let take a look at a more realistic example of a problem we may face when trying to update a state variable:

```tsx
// Example 6
function App() {
  const [count, setCount] = useState(0);

  const slowClick = () => {
    // This can be any asynchronous action like API call, DOM update, etc.
    setTimeout(() => {
      setCount(count + 10);
    }, 2000);
  };

  const fastClick = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <h1>Slow-fast button</h1>
      <h2>Count is: {count}</h2>

      <button onClick={slowClick}>Slow click</button>
      <button onClick={fastClick}>Fast click</button>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
```

If you try out the code above, you wil notice that the state-update function doesn't run as you expected: you click on the `Slow click` button really fast for multiple times (let say you click 3 times really fast) but the state variable `count` only update one and the value of `count` is only `10` instead of `30`.

Worse of that, if you try to click on `Slow click` button and `Fast click` button really fast (let say 2 times on slow click and 3 time on fast click) the state variable `count` is still only `10` instead of `23`.

## So what had happened here? Why example 4 and 6 failed

The answer is [closure](https://overreacted.io/a-complete-guide-to-useeffect/). I will not go into detail about what closure is (since that is a long topic on its own) and instead, I will provide you with a way to solve this issue using functional form of state-update function

```tsx
// Example 7
function App() {
  const [count, setCount] = useState(0);

  const slowClick = () => {
    setTimeout(() => {
      setCount((count) => count + 10);
    }, 2000);
  };

  const fastClick = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <h1>Slow-fast button</h1>
      <h2>Count is: {count}</h2>

      <button onClick={slowClick}>Slow click</button>
      <button onClick={fastClick}>Fast click</button>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
```

By changing from normal update to using a callback to update state, we have everything work as expected.

## Batching or Closure

**Batching** is the behavior where multiple state-update functions are batched and run at them same time, results in only one state update and thus, only one re-render.

**Closure**, in the React context and in our example, means that a function is "closed". This means the arguments' value it received when it was called will remain as they are, despite the fact that outside of the function, those arguments' value may be updated or changed already.

In example 6, batching only affects how many time the component re-render and not the final value of state variable. Closure is the factor that affect the final value of state variable. We can test this our by eliminate batching in our example (for more info about batching, see [when does React batch state](https://www.juniorgocode.com/when-does-react-batch-state))

```tsx
// Example 8
function App() {
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    await setCount(count + 5); // The await does nothing on setCount. It only disable batching
    setCount(count + 7); //
  };

  return (
    <div>
      Count is: {count}
      <button onClick={handleClick}>Change count</button>
    </div>
  );
}
```

You can read more about closure in React state in [this article written by Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/) . Although the article doesn't specifically talk about closure but it still provides a very good explanation on the topic.

## Reference

- [React Official API on setState](https://reactjs.org/docs/hooks-reference.html#usestate)
- [Dan Abramov article on closure](https://overreacted.io/a-complete-guide-to-useeffect/)
