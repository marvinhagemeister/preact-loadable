import Loadable, { Props } from "../index";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const props: Props = {
  fn: () => Promise.resolve("foo"),
  loading: () => "loading",
  error: () => "error",
};

describe("Loadable", () => {
  it("should display loading", () => {
    const loader = new Loadable(props);
    loader.componentWillMount();
    expect(loader.render()).toEqual("loading");
  });

  it("should handle sync", () => {
    const fn = () => "done";
    const loader = new Loadable({ ...props, fn });
    loader.componentWillMount();
    expect(loader.render()).toEqual("done");
  });

  it("should handle async", async () => {
    const fn = () => Promise.resolve().then(() => "done");
    const loader = new Loadable({ ...props, fn });
    loader.componentWillMount();
    await delay(0);
    expect(loader.render()).toEqual("done");
  });

  it("should handle async imports", async () => {
    const fn = () => Promise.resolve().then(() => ({ default: () => "done" }));
    const loader = new Loadable({ ...props, fn });
    loader.componentWillMount();
    await delay(0);
    expect(loader.render()).toEqual("done");
  });

  it("should handle error sync", () => {
    const fn = () => {
      throw new Error("foo");
    };
    const loader = new Loadable({ ...props, fn });
    loader.componentWillMount();
    expect(loader.render()).toEqual("error");
  });

  it("should handle error async", async () => {
    const fn = () =>
      Promise.resolve().then(() => {
        throw new Error("foo");
      });
    const loader = new Loadable({ ...props, fn });
    loader.componentWillMount();
    await delay(0);
    expect(loader.render()).toEqual("error");
  });
});
