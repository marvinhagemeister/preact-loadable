# Preact Loadable

A simple component to display the promise state of a promise returning function
or any other async task.

## Installation

```bash
# npm
npm install --save preact preact-loadable

# yarn
yarn add preact preact-loadable
```

## Usage

```jsx
import { h } from "preact";
import Loadable from "preact-loadable";

function MyComponent() {
  return <div>
    <Loadable
      // Can be sync or async
      fn={() => import("../MyOtherComponent").then(m => m.default())}
      error={err => "Oops, an error occurred: " + err.message}
      loading={() => "Loading..."}
      success={result => doSomething(result)}
    />
  </div>;
}
```

## License

`MIT`, see [License file](LICENSE.md).
