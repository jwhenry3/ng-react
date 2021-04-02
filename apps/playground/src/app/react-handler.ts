import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class ReactHandler<PropsType> {
  private container: HTMLElement;
  private props: any;

  constructor(private component: typeof React.Component) {}

  public get isMounted(): boolean {
    return !!this.container;
  }

  public mount(container: HTMLElement, props?: PropsType) {
    this.ensureUnmounted();
    this.container = container;
    this.props = props;
    this.render();
  }

  public unmount() {
    this.ensureMounted();
    ReactDOM.unmountComponentAtNode(this.container);
    this.container = null;
  }

  public updateProps(props: PropsType) {
    this.ensureMounted();
    Object.assign(this.props, props);
    this.render();
  }

  private render() {
    const componentInstance = React.createElement(this.component, this.props);
    ReactDOM.render(componentInstance, this.container);
  }

  private ensureMounted() {
    if (!this.isMounted) {
      throw new Error(`The component "${this.component.name}" is not mounted`);
    }
  }

  private ensureUnmounted() {
    if (this.isMounted) {
      throw new Error(
        `The component "${this.component.name}" is already mounted`
      );
    }
  }
}
