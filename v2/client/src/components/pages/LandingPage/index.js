import React from 'react';

import Toggle from "../../common/Toggle";

export default function LandingPage() {
  return (
    <div>
      <h1>LandingPage</h1>
      <Toggle leftText="Left" rightText="right" selected="left"/>
    </div>
  );
}
