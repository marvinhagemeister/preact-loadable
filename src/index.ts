import { Component } from "preact";

export interface Props {
  fn: () => any | Promise<any>;
  loading: () => any;
  error: (err: Error) => any;
}

export interface State {
  component: any;
}

export default class Loadable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { component: undefined };
  }

  componentWillMount() {
    const { fn, error } = this.props;

    let p: any;
    try {
      p = fn();
    } catch (err) {
      return this.setState({ component: () => error(err) });
    }

    if (p.then !== undefined) {
      return p
        .then((c: any) => {
          this.setState({
            component: c.default !== undefined ? c.default : () => c,
          });
        })
        .catch((err: Error) => this.setState({ component: () => error(err) }));
    } else {
      return this.setState({
        component: () => (p.default !== undefined ? p.default : p),
      });
    }
  }

  componentWillReceiveProps(props: Props) {
    this.props = props;
    // Force render
    this.componentWillMount();
  }

  render() {
    return this.state.component === undefined
      ? this.props.loading()
      : this.state.component();
  }
}
