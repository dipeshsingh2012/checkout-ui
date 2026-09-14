import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CheckoutFragment } from './components/CheckoutFragment';

export function render(props: any = {}): string {
  return ReactDOMServer.renderToString(React.createElement(CheckoutFragment, props));
}

export { CheckoutFragment };
export default CheckoutFragment;
