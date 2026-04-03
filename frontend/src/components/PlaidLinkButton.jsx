import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import api from "../api/axios";

export default function PlaidLinkButton({ onLinked }) {
  const [linkToken, setLinkToken] = useState(null);

  // Back-end call for link token
  useEffect(() => {
    api.post("/api/plaid/link-token").then(({ data }) => {
      setLinkToken(data.link_token);
    });
  }, []);

  // Plaid calls a successful backend exchange and exchanges permanent access token
  const onSuccess = useCallback(
    async (public_token) => {
      await api.post("/api/plaid/exchange-token", { public_token });
      if (onLinked) onLinked();
    },
    [onLinked],
  );

  // Uses link token to initialize Plaid link and pop-up
  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold disabled:opacity-50"
    >
      Link Bank
    </button>
  );
}
