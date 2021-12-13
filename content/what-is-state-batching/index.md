# State batching - what is that ?

---

Title: What is state batching
Date: 11/08/2021
Description: If you use React Hooks before, you are probably familiar with using `setState` with single value. But do you know it has a functional form?

---

**NOTE**: At the time of writing, React 18 hasn't been released and [in the React 18 brief](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html) the behavior of state batching will change for the better. For more information about React 18 change, read [this GitHub discussion](https://github.com/reactwg/react-18/discussions/4) This article will cover the state batching of React version 17 and below.

## Terms

In the syntax

```tsx
const [state, setState] = useState(0);
```

I will call variable in `state` position as **state variable <name_of_variable>** (for example, the state variable `count`)

I will call function in `setState` position as **state-update function <name_of_function>** (for example, the state-update function `setCount`)

I will call value in `0` position as **initial value of state <name_of_state>** (for example, the initial value of state `count`)

## What is state batching

State batching is a React behavior where multiple state-update functions are batched together and run all at once instead of run one by one. Let's take a look at the code below

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

Try to run the code above and click on the button. Can you guess how many time you will see the log message `State change`?

The answer is **1 log message per button click**. When I first learn React I did the wrong guess, which is 2 log messages per button click. Our guess of 2 logs is wrong as we can easily test with the code above. But why is it? Let analyze why we came up with such and what actually happened.

---

This is what will happen according to our _expectation_:

- When the button is click, event handler `handleClick` is called
- This then run the state-update function `setA`
- `setA` run change the value of state variable `a`
- The component re-render since there is a change in its state
- Since value of state variable `a` change, the callback in `useEffect` is called
- After all of this, the state-update function `setB` run
- `setB` run change the value of state variable `b`
- The component re-render since there is a change in its state
- Since value of state variable `b` change, the callback in `useEffect` is called

---> In short, we will have **two re-render** and **two run of `useEffect` callback**

---

However this is what _actually happened_:

- When the button is click, event handler `handleClick` is called
- ~~This then run the state-update function `setA`~~
- React say: wait there are 2 state-update functions you need to run - which is `setA` and `setB`. Let combine them and run them at once instead of one by one
- React see no more state-update functions it needs to run
- `setA` and `setB` run at the same time
- The value of state variable `a` and state variable `b` change at the same time
- The component re-render since there is a change in its state
- The callback in `useEffect` is called

---> We only have **ONE re-render** and **ONE run of `useEffect` callback**

This is what state batching does: it combines multiple state-update functions into one "batch" and run all these functions at once

**But why do we need state batching?**

As you can see in the example above, without state batching we need to run an additional re-render of component and an additional run of `useEffect` callback. This is worse if we have more state variables compared to our example. Batching save us time and resource.

## Reference

- [Does React keep the order for state updates?](https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates/48610973#48610973)
