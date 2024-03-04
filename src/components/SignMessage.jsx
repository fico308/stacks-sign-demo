import React from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { 
  openSignatureRequestPopup,
  openStructuredDataSignatureRequestPopup,

} from '@stacks/connect';

import {
  tupleCV,
  stringAsciiCV,
  uintCV,
  serializeCV,
} from '@stacks/transactions'

import { userSession } from "../user-session";

const SignMessage = () => {
  const [sig, setSig] = React.useState('');
  const [pubKey, setPubKey] = React.useState('');
  function sign() {
    const message = "Fico wants you to sign in with your Stacks account: " +
		"0x132\n\n" +
		"Public key: 123556\n" +
		"Version: 1\n" +
		"Nonce: 12354545\n" +
		"Issued At: 2022-10-20T09:59:02.577Z\n" +
		"Expiration Time: 2022-10-20T09:59:02.577Z";
    openSignatureRequestPopup({
      message,
      network: new StacksTestnet(), // for mainnet, `new StacksMainnet()`
      appDetails: {
        name: 'Demo Project',
        icon: window.location.origin + '/react.svg',
      },
      onFinish(data) {
        setSig(data.signature);
        setPubKey(data.publicKey);
        console.log('Signature of the message', data.signature);
        console.log('Use public key:', data.publicKey);
      },
    });
  }

  function signStructured() {
    const message = stringAsciiCV("Fico wants you to sign in with your Stacks account: " +
		"0x132\n\n" +
		"Public key: 123556\n" +
		"Version: 1\n" +
		"Nonce: 12354545\n" +
		"Issued At: 2022-10-20T09:59:02.577Z\n" +
		"Expiration Time: 2022-10-20T09:59:02.577Z");
    const domain = tupleCV({
      name: stringAsciiCV('Fico Space'),
      version: stringAsciiCV('1.0.0'),
      'chain-id': uintCV(1),
    });
    openStructuredDataSignatureRequestPopup({
      message,
      network: new StacksTestnet(), // for mainnet, `new StacksMainnet()`
      appDetails: {
        name: 'Demo Project',
        icon: window.location.origin + '/react.svg',
      },
      domain,
      onFinish(data) {
        console.log('Signature of the message', data.signature);
        console.log('Use public key:', data.publicKey);
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <p>Sign message</p>
      <button className="Vote" onClick={() => sign()}>
        Sign
      </button>
      <p>Signature: {sig}</p>
      <p>Public Key: {pubKey}</p>
      <button className="Vote" onClick={() => signStructured()}>
        Sign Structured Data
      </button>
    </div>
  );
};

export default SignMessage;
