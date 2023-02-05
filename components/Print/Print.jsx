import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Print = ({Page, pageProps, isPrint, setIsPrint}) => {
  const receipt = useRef();

  useEffect(() => {
    if(isPrint) {
      reactToPrint()
      setIsPrint(false);
    }
  }, [isPrint]);

  const reactToPrint = useReactToPrint({
    content: () => receipt.current,
  });

  return (
    <Page ref={receipt} {...pageProps} />
  );
}

export default Print
