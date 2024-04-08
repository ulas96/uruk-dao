import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'styled-components';

const customTheme = {
    colors: {
      primary: '#38cfa2', // Replace with your desired color
    },
  };
  

export const Connect = () => {
  return (
    <ThemeProvider theme={customTheme}>
        <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
        }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
                authenticationStatus === 'authenticated');
            return (
            <div
                {...(!ready && {
                'aria-hidden': true,
                'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                },
                })}
            >
                {(() => {
                if (!connected) {
                    return (
                    <button onClick={openConnectModal} type="button">
                        Connect Wallet
                    </button>
                    );
                }
                if (chain.unsupported) {
                    return (
                    <button onClick={openChainModal} type="button">
                        Wrong network
                    </button>
                    );
                }
                return (
                    <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        className="network"
                        onClick={openChainModal}
                        style={{ display: 'flex', alignItems: 'center' }}
                        type="button"
                    >
                        {chain.hasIcon && (
                        <div
                            style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                            }}
                        >
                            {chain.iconUrl && (
                            <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                            />
                            )}
                        </div>
                        )}
                        {chain.name}
                    </button>
                    <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                    </div>
                );
                })()}
            </div>
            );
        }}
        </ConnectButton.Custom>
    </ThemeProvider>
  );
};