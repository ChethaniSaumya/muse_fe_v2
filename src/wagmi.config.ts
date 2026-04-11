import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import * as chains from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { http } from 'wagmi';

const appName = import.meta.env.VITE_APP_NAME;
const projectId = import.meta.env.VITE_PROJECT_ID;
const network = import.meta.env.VITE_NETWORK as keyof typeof chains;
const rpcUrl = import.meta.env.VITE_RPC_URL;

const selectedChain: Chain | undefined = chains[network];

if (!selectedChain) {
  throw new Error(`Invalid VITE_NETWORK: "${network}"`);
}

export const config = getDefaultConfig({
  appName,
  projectId,
  chains: [selectedChain],
  transports: {
    [selectedChain.id]: http(rpcUrl),
  },
  ssr: true,
});
