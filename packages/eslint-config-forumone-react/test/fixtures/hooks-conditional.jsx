import React, { useState } from "react";

export function Broken({ show }) {
  if (show) {
    useState(0);
  }

  return <p>broken</p>;
}
