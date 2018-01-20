import Loadable, { Props } from "../index";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const defaults: Props = {
  fn: () => delay(1).then(() => "foo"),
  loading: () => "loading",
  error: () => "error",
  waitUntil: 10,
  minLoaderVisible: 10,
  success: v => v,
};

describe("Loadable", () => {
  it("should handle sync", () => {
    const fn = () => "done";
    const loader = new Loadable({ ...defaults, fn });

    loader.componentDidMount();

    expect(loader.render()).toEqual("done");
  });

  it("should handle async", async () => {
    const fn = () => delay(20).then(() => "done");
    const loader = new Loadable({ ...defaults, fn });

    loader.componentDidMount();
    expect(loader.render()).toEqual(null);
    await delay(11);

    expect(loader.render()).toEqual("loading");
    await delay(10);
    expect(loader.render()).toEqual("done");
  });

  it("should handle error sync", () => {
    const fn = () => {
      throw new Error("foo");
    };
    const loader = new Loadable({ ...defaults, fn });
    loader.componentDidMount();
    expect(loader.render()).toEqual("error");
  });

  it("should handle error async", async () => {
    const fn = () => Promise.reject(new Error("foo"));
    const loader = new Loadable({ ...defaults, fn });
    loader.componentDidMount();
    await delay(1);
    expect(loader.render()).toEqual("error");
  });
});
