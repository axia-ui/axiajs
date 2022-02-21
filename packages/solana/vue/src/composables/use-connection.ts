import { createContext } from '../utils/context';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { computed, ComputedRef } from 'vue';

export enum SolanaNetworks {
  mainnet = 'mainnet-beta',
  devnet = 'devnet',
  testnet = 'testnet',
}

export type ConnectionContext = ComputedRef<Connection>;

const [ConnectionContextProvider, useConnection, ConnectionInjectionKey] =
  createContext<ComputedRef<Connection>>({
    name: 'ConnectionContext',
    strict: true,
    errorMessage: 'useConnection requires you to provide the connection hook',
  });

export function initializeConnection(network: SolanaNetworks) {
  try {
    const _connection = new Connection(clusterApiUrl(network), 'recent');

    const connection = computed(() => _connection);
    ConnectionContextProvider(connection);
    return connection;
  } catch (error) {
    console.error('There was a problem initializing connection', error);
  }
}

export { ConnectionContextProvider, useConnection, ConnectionInjectionKey };