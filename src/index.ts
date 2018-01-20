import { Component } from "preact";

export interface Props<R = any> {
  fn: () => R | Promise<R>;
  loading: () => any;
  success: (result: R) => any;
  error: (err: Error) => any;
  /** Time in ms */
  waitUntil: number;
  /** Time in ms */
  minLoaderVisible: number;
}

export interface State<R> {
  result: R;
  showLoader: boolean;
}

export default class Loadable<R = any> extends Component<Props<R>, State<R>> {
  state = {
    result: undefined,
    showLoader: false,
  } as any;
  timer: number = 0;
  durationTimer: number = 0;

  componentDidMount() {
    const { fn, error, success, waitUntil } = this.props;
    let result: R | Promise<R>;
    try {
      result = fn();
    } catch (err) {
      return this.update(error(err));
    }

    if ((result as Promise<R>).then !== undefined) {
      this.timer = setTimeout(this.showLoader, waitUntil);

      return (result as Promise<R>)
        .then(c => this.update(success(c)))
        .catch(err => this.update(error(err)));
    } else {
      this.update(success(result as R));
    }
  }

  update(result: R) {
    this.componentWillUnmount();
    this.setState({ result, showLoader: false });
  }

  showLoader = () => {
    this.setState({ showLoader: true });
    this.durationTimer = setTimeout(
      this.loaderDuration,
      this.props.minLoaderVisible,
    );
  };

  loaderDuration = () => this.setState({ showLoader: false });

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.durationTimer);
  }

  render() {
    const { result, showLoader } = this.state;

    if (result === undefined && !showLoader) {
      return null;
    }

    return result === undefined ? this.props.loading() : result;
  }
}
