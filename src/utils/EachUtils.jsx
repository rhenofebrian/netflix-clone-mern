import { Children } from "react";

export const EachUtils = ({ of, render }) => {
  return <>{Children.toArray(of.map((item, idx) => render(item, idx)))}</>;
};
