import React from "react";
import Logo from "../Logo/Logo";

const Rank = ({ name, entries }) => {
  return (
    <article className="rank br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center fr">
  <div className="pa2 ph3-ns pb3-ns">
    <div className="dt w-100 mt1">
      <div className="dtc">
        <h1 className="f4 f4-ns mv0"> {`${name}`}</h1>
      </div>
      <div className="dtc tr">
        <h2 className="f5 mv0 ba bw1">{`${entries}`}</h2>
      </div>
    </div>
    <p className="f4 lh-copy measure mt2 mid-gray">
    {`You have analysed ${entries} images!`}
    </p>
      <Logo />
  </div>
</article>
  );
};

export default Rank;
