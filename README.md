## Follow along the changes

1. Start at the store directory and inspect the RootStore.ts
```
Before we used createStore and combineReducers, now is all in one simple call.
```

2. Once the root store is setup then inspect the index.tsx where we add the provider and pass in the store, this is the same as before

3. Inside of /store/reduces you will see 3 files. The legacy
file is how you would normaly implement a reducer.
The hybrid file uses some components of the toolkit to reduce
the boiler plate.  The slice file is all of it combine into the slice function call.

4. Inside ./components/todo-component In the TodoWrapper.tsx and Home.tsx we can see the implementation differences.

`The hybrid reducer might look larger because there are two reducers to show the different ways you can combine the toolkit helper methods`