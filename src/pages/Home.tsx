/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './App.css';
import nftImage from '../assets/Hope-Coin.png';
import kk1 from '../assets/1.jpg';
import kk2 from '../assets/3.jpg';
import kk3 from '../assets/2.jpg';
import kk4 from '../assets/4.webp';
import wc from '../assets/wc.png';
import cb from '../assets/coinbase.jpg';
import binance from '../assets/bin.png';
import hopeCard from '../assets/Hope-Card.png';

// RainbowKit imports
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain, useDisconnect, useWaitForTransactionReceipt } from 'wagmi';
import { createPublicClient, formatEther, http } from 'viem';
import { polygon } from 'wagmi/chains';

import contract from '../contractData/contract.json';

// Type definitions
interface UserData {
  name?: string;
  email?: string;
  termsAccepted?: boolean;
  certificateIpfsUrl?: string;
  ownershipCardUrl?: string;
}

// Contract ABI type
type ContractABI = readonly unknown[];

const dashBoard = () => {
  window.open("https://www.musecoinx.com/my-dashboard");
}


const Home = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [_connected, setConnected] = useState(false);
  const { disconnect } = useDisconnect();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [registerAcceptedPrivacyPolicy, setRegisterAcceptedPrivacyPolicy] = useState(false);
  const [registerTermsErrorPrivacyPolicy, setRegisterTermsErrorPrivacyPolicy] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Mint-specific states
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCertificatePreparing, setIsCertificatePreparing] = useState(false);
  const [existingEmail, setExistingEmail] = useState('');
  const [hasExistingEmail, setHasExistingEmail] = useState(false);
  const [existingName, setExistingName] = useState('');
  const [hasExistingName, setHasExistingName] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const [showNameArrow, setShowNameArrow] = useState(false);
  const [showEmailArrow, setShowEmailArrow] = useState(false);
  const [glowMintButton, setGlowMintButton] = useState(false);

  const [showConnectArrow, setShowConnectArrow] = useState(true);
  const [hasConnectedBefore, setHasConnectedBefore] = useState(false);
  const [cachedInputs, setCachedInputs] = useState({ name: '', email: '' });
  const [acceptedAge, setAcceptedAge] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [showWalletPrompt, setShowWalletPrompt] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const [showWalletHelp, setShowWalletHelp] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [hasScrolledPrivacyBottom, setHasScrolledPrivacyBottom] = useState(false);

  const [testEmail, setTestEmail] = useState('');
  const [testName, setTestName] = useState('');
  const [emailTestMessage, setEmailTestMessage] = useState('');
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const sendTestEmail = async (isAirdrop = false) => {
    if (!testEmail) {
      setEmailTestMessage('Please enter an email address');
      return;
    }

    setIsTestingEmail(true);
    setEmailTestMessage('Sending test email...');

    try {
      const endpoint = isAirdrop ? '/api/test-airdrop-email' : '/api/test-email';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          name: testName || 'Test User'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const emailType = isAirdrop ? 'airdrop' : 'regular mint';
        setEmailTestMessage(`✅ Test ${emailType} email sent successfully to ${testEmail}!`);
      } else {
        setEmailTestMessage(`❌ Failed to send email: ${data.error || 'Unknown error'}`);
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setEmailTestMessage(`❌ Network error: ${errorMessage}`);
    } finally {
      setIsTestingEmail(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setEmailTestMessage('');
      }, 5000);
    }
  };

  const { address: walletAddress, isConnected } = useAccount();

  // Handle connection and disconnection effects
  useEffect(() => {
    if (isConnected && walletAddress) {
      setHasConnectedBefore(true);
      handleConnect();
      // Restore cached inputs if available
      if (cachedInputs.name) setName(cachedInputs.name);
      if (cachedInputs.email) setEmail(cachedInputs.email);
    } else {
      // Cache current inputs before disconnecting
      setCachedInputs({ name, email });
      setName('');
      setEmail('');
      setConnected(false);
    }
  }, [isConnected, walletAddress]);

  useEffect(() => {
    // Only show arrow on first visit before any connection
    setShowConnectArrow(!hasConnectedBefore && !_connected);
  }, [_connected, hasConnectedBefore]);

  const publicClient = createPublicClient({
    chain: polygon,
    transport: http()
  });

  const {
    writeContract,
    error: writeContractError,
    isPending: isWriteContractPending
  } = useWriteContract();

  // Handle write contract errors
  useEffect(() => {
    if (writeContractError) {
      console.error('Contract write error:', writeContractError);
      const errorMessage = writeContractError.message || 'Unknown error';

      // Reset minting state
      setIsMinting(false);

      if (errorMessage.includes('User rejected') || errorMessage.includes('User denied')) {
        setMessage('Transaction cancelled by user');
      } else if (errorMessage.includes('balance') || errorMessage.includes('insufficient funds')) {
        setMintError(true);
        setInsufficientFunds(true);
        setMessage('Insufficient funds for gas fees');
      } else {
        setMintError(true);
        setMessage('Transaction failed. Please try again.');
      }
    }
  }, [writeContractError]);

  // Handle transaction success
  useEffect(() => {
    if (txHash) {
      setMessage('Transaction submitted. Waiting for confirmation...');
    }
  }, [txHash]);

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Read contract data for pricing
  const { data: basePrice } = useReadContract({
    address: contract.address as `0x${string}`,
    abi: contract.abi as ContractABI,
    functionName: 'basePrice',
  });

  const { data: additionalPrice } = useReadContract({
    address: contract.address as `0x${string}`,
    abi: contract.abi as ContractABI,
    functionName: 'additionalPrice',
  });

  const { data: userMintedCount, isLoading: isLoadingMintCount } = useReadContract({
    address: contract.address as `0x${string}`,
    abi: contract.abi as ContractABI,
    functionName: 'userMinted',
    args: walletAddress ? [walletAddress] : undefined,
    query: { enabled: !!walletAddress }
  });

  // API endpoint - update this to match your backend URL
  const API_BASE_URL = 'https://muse-be.onrender.com'; //'https://muse-be.onrender.com'; //'localhost:3001';

  async function handleConnect() {
    try {
      if (chainId !== polygon.id) {
        await switchChain?.({ chainId: polygon.id });
      }

      // Store whatever inputs we have, but don't require them for connection
      if (email) sessionStorage.setItem('email', email);
      if (name) sessionStorage.setItem('name', name);
      setConnected(true);
    } catch (error: unknown) {
      console.error('Error switching to Polygon:', error);
      setMessage('Please switch to Polygon network');
    }
  }

  async function disconnectWallet() {
    setConnected(false);
    disconnect();
    window.location.reload();
  }

  function shortenAddress(address: string | undefined) {
    if (!address) return "Connect";

    try {
      return _connected
        ? address.slice(0, 3) + "..." + address.slice(-4)
        : "Connect";
    } catch (error) {
      console.log(error);
      return "Connect";
    }
  }

  // Calculate mint cost based on user's minting history
  const calculateMintCost = () => {
    if (!basePrice || !additionalPrice || userMintedCount === undefined) {
      return BigInt(0);
    }

    console.log("userMintedCount:", userMintedCount);
    console.log("basePrice:", basePrice);
    console.log("additionalPrice:", additionalPrice);

    // First NFT uses basePrice (0 ether), subsequent NFTs use additionalPrice (0.1 ether)
    const mintCount = Number(userMintedCount);
    const costBigInt = mintCount === 0 ? basePrice : additionalPrice;

    console.log("Calculated cost as BigInt:", costBigInt);
    return costBigInt;
  };

  const fetchUserDataByWallet = async (walletAddress: string) => {
    if (!walletAddress) return;

    setIsLoadingUserData(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/wallet/${walletAddress}`);

      console.log("fetchUser Name 1 :" + name);

      if (response.ok) {
        const userData: UserData = await response.json();
        if (userData.email) {
          setExistingEmail(userData.email);
          setHasExistingEmail(true);
          setEmail(userData.email);
        }
        if (userData.name) {
          setExistingName(userData.name);
          setHasExistingName(true);
          setName(userData.name);
        }
        // Set terms accepted if user has minted before
        if (userData.termsAccepted) {
          setAcceptedTerms(true);
        }
        console.log("fetchUser Name 2 :" + name);

      } else {
        console.log("fetchUser Name 3 :" + name);

        // Reset states for new users
        setExistingEmail('');
        setHasExistingEmail(false);
        setExistingName('');
        setHasExistingName(false);
        setEmail(sessionStorage.getItem('email') || '');
        setName(sessionStorage.getItem('name') || '');
        setAcceptedTerms(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setExistingEmail('');
      setHasExistingEmail(false);
      setExistingName('');
      setHasExistingName(false);
      setAcceptedTerms(false);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  useEffect(() => {
    if (walletAddress && _connected) {
      fetchUserDataByWallet(walletAddress);
    } else {
      // Reset when wallet disconnects
      setExistingEmail('');
      setHasExistingEmail(false);
      setExistingName('');
      setHasExistingName(false);
      setEmail('');
      setName('');
    }
  }, [walletAddress, _connected]);

  // Update connection state when wallet connects
  useEffect(() => {
    if (isConnected && walletAddress) {
      setConnected(true);
    }
  }, [isConnected, walletAddress]);

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash) {
      setIsMinting(false);
      setMintSuccess(true);
      setMessage('NFT minted successfully! Preparing your certificate...');
      setIsCertificatePreparing(true);

      saveUserDataToBackend(txHash);

      // Only clear name if it wasn't an existing name
      if (!hasExistingName) {
        setName('');
      }
      // Only clear email if it wasn't an existing email
      if (!hasExistingEmail) {
        setEmail('');
      }
    }
  }, [isConfirmed, txHash]);

  // Check if this is the user's first mint
  const isFirstMint = () => {
    return userMintedCount !== undefined &&
      Number(userMintedCount) === 0 &&
      !hasExistingEmail; // Add this check
  };

  // Function to handle NFT minting
  const mintNFT = async () => {

    if (isFirstMint() && !acceptedTerms) {
      setTermsError(true);
      setMessage('Please accept the Terms and Conditions');
      return;
    }

    if (isFirstMint() && !registerAcceptedPrivacyPolicy) {
      setRegisterTermsErrorPrivacyPolicy(true);
      setMessage('Please accept the Privacy Policy');
      return;
    }

    if (isFirstMint() && !acceptedAge) {
      setAgeError(true);
      setMessage('You must confirm you are 18+ to participate');
      return;
    }

    if (!walletAddress) {
      setMessage('Please connect your wallet first');
      return;
    }

    const nameToUse = hasExistingName ? existingName : name.trim();
    const emailToUse = hasExistingEmail ? existingEmail : email.trim();

    if (!nameToUse) {
      setMessage('Please fill in your name');
      return;
    }

    if (!emailToUse) {
      setMessage('Please enter your email address');
      return;
    }

    if (!hasExistingEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailToUse)) {
        setMessage('Please enter a valid email address');
        return;
      }
    }

    try {
      setIsMinting(true);
      setMintError(false);
      setMintSuccess(false);
      setInsufficientFunds(false);
      setMessage('Initiating mint transaction...');

      // Get the current mint cost
      const mintCostBigInt = calculateMintCost();
      console.log("Mint cost being sent:", mintCostBigInt);
      console.log("User minted count at mint time:", userMintedCount);

      // Double-check the user's current mint count from the contract
      const currentMintCount = await publicClient.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi as ContractABI,
        functionName: 'userMinted',
        args: [walletAddress]
      } as any);

      console.log("Current mint count from contract:", currentMintCount);

      // Recalculate cost based on fresh data
      const actualCost = Number(currentMintCount) === 0 ? (basePrice as bigint) : (additionalPrice as bigint);
      console.log("Actual cost to send:", actualCost);

      writeContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi as ContractABI,
        functionName: 'mint',
        args: [1, nameToUse, emailToUse.toLowerCase()],
        value: actualCost, // Use the recalculated cost
        gas: 685000n
      } as any);

      setMessage('Transaction submitted. Waiting for confirmation...');

    } catch (error: unknown) {
      console.error("Mint transaction failed:", error);
      handleMintError(error);
    }
  };

  const handleMintError = async (error: unknown) => {
    setIsMinting(false);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    if (errorMessage.includes("Transaction with hash")) {
      setMintSuccess(true);
      setMessage('Transaction successful! Preparing your certificate...');
      setIsCertificatePreparing(true);
      await saveUserDataToBackend(null);
    } else if (errorMessage.includes("err: insufficient funds for gas")) {
      setInsufficientFunds(true);
      setMessage('Insufficient funds for gas fees');
    } else if (errorMessage.includes("User rejected the request")) {
      setMessage('Transaction cancelled by user');
    } else if (errorMessage.includes("Max per wallet exceeded")) {
      setMintError(true);
      setMessage('Maximum NFTs per wallet exceeded');
    } else if (errorMessage.includes("Max supply exceeded")) {
      setMintError(true);
      setMessage('Maximum supply reached');
    } else if (errorMessage.includes("Public mint not available")) {
      setMintError(true);
      setMessage('Public minting is not currently available');
    } else {
      setMintError(true);
      setMessage('Sorry, something went wrong. Please try again.');
    }
  };

  // Function to save user data to backend after successful mint
  const saveUserDataToBackend = async (txHash: string | null = null) => {
    try {
      // Use existing name/email if available, otherwise use the input values
      const nameToUse = hasExistingName ? existingName : name.trim();
      const emailToUse = hasExistingEmail ? existingEmail : email.trim();

      // Get the latest token ID for this wallet
      let tokenId = null;
      if (walletAddress) {
        try {
          // First get the count of tokens for this wallet
          const tokenCount = await publicClient.readContract({
            address: contract.address as `0x${string}`,
            abi: contract.abi as ContractABI,
            functionName: 'userMinted',
            args: [walletAddress]
          } as any);

          if (tokenCount && Number(tokenCount) > 0) {
            // Get the last token ID (at index: count - 1)
            const lastTokenId = await publicClient.readContract({
              address: contract.address as `0x${string}`,
              abi: contract.abi as ContractABI,
              functionName: 'walletToTokenIds',
              args: [walletAddress, Number(tokenCount) - 1]
            } as any);
            tokenId = lastTokenId ? Number(lastTokenId) : null;
          }
        } catch (error) {
          console.error('Error fetching token ID:', error);
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameToUse,
          email: emailToUse.toLowerCase(),
          walletAddress: walletAddress,
          transactionHash: txHash,
          tokenId: tokenId,
          nftMinted: true,
          mintedAt: new Date().toISOString(),
          ageConfirmed: acceptedAge,
          termsAccepted: acceptedTerms,
          privacyPolicyAccepted: registerAcceptedPrivacyPolicy,
          subscribe: subscribeNewsletter // This is the key fix - make sure subscribe is passed
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User data saved successfully to backend');

        // Update local state to reflect the saved data
        setExistingName(nameToUse);
        setHasExistingName(true);
        setName(nameToUse);
        setExistingEmail(emailToUse.toLowerCase());
        setHasExistingEmail(true);
        setEmail(emailToUse.toLowerCase());

        // Set download URL from response
        if (data.certificateIpfsUrl || data.ownershipCardUrl) {
          setDownloadUrl(data.certificateIpfsUrl || data.ownershipCardUrl);
          setIsCertificatePreparing(false);
          setMessage('Certificate ready for download!');
        }
      } else {
        console.error('Failed to save user data:', data.error);
      }
    } catch (error) {
      console.error('Error saving user data to backend:', error);
    }
  };

  // Function to handle download
  const handleDownload = async () => {
    if (!downloadUrl) return;

    setIsDownloading(true);
    setMessage('Downloading certificate...');

    try {
      // Fetch the file as a blob
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch certificate');
      }

      const blob = await response.blob();

      // Create object URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Hope-Coin-Certificate-${name.replace(/[^a-z0-9]/gi, '_')}.png`;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      window.URL.revokeObjectURL(blobUrl);

      // Show success notification
      setShowDownloadSuccess(true);
      setMessage('Certificate downloaded successfully!');
      setTimeout(() => setShowDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setMessage('Failed to download certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message && !isMinting && !isDownloading && !isCertificatePreparing) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, isMinting, isDownloading, isCertificatePreparing]);

  // Fetch download URL after successful mint
  useEffect(() => {
    if (mintSuccess && email && !downloadUrl) {
      const fetchUserData = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          const response = await fetch(`${API_BASE_URL}/api/users/${email}`);
          const data: UserData = await response.json();
          if (data.certificateIpfsUrl || data.ownershipCardUrl) {
            setDownloadUrl(data.certificateIpfsUrl || data.ownershipCardUrl);
            setIsCertificatePreparing(false);
            setMessage('Certificate ready for download!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }

  }, [mintSuccess, email, downloadUrl, userMintedCount]);

  // Disable mint button when certificate is being prepared
  const isMintDisabled = !_connected || isMinting || isDownloading || isCertificatePreparing;
  const isDownloadDisabled = !downloadUrl || isDownloading || isCertificatePreparing;

  useEffect(() => {
    console.log("Name USE EFFECT : " + name);
    if (_connected && userMintedCount !== undefined) {
      // Check if user has no NFTs
      if (Number(userMintedCount) === 0) {
        setShowNameArrow(!hasExistingName && !name);
        setShowEmailArrow(hasExistingName || name ? (!hasExistingEmail && !email) : false);
        // Fix the TypeScript error by ensuring boolean result
        const shouldGlow = Boolean((hasExistingName || name) && (hasExistingEmail || email));
        setGlowMintButton(shouldGlow);
      }
    }
  }, [_connected, userMintedCount, name, email, hasExistingName, hasExistingEmail]);

  const AutoRotatingCarousel = ({ logo, hopeCard }: { logo: string, hopeCard: string }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
      { src: logo, alt: "Hope Coin NFT" },
      { src: hopeCard, alt: "Hope Card" }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="carousel-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`carousel-image ${index === activeIndex ? 'active' : ''}`}
          />
        ))}

        {/* Indicator dots */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Fix for the Link component issue
  const Link = ({ activeClass, id, onClick, children }: { activeClass: string, id: string, onClick: () => void, children: React.ReactNode }) => (
    <a href="#!" onClick={onClick} className={activeClass} id={id}>
      {children}
    </a>
  );

  return (
    <div className="app-container">
      {/* Header with Gold Accent */}
      <header className="app-header">
        <div className="logo-container">
          <img src={nftImage} alt="Hope Coin NFT" className="nft-logo" />
          <div className="title-container">
            <h1>Hope Coin</h1>
            <p className="subtitle">Tribute to KK</p>
          </div>
        </div>

        <div className="nav-actions">
          {_connected && (
            <button className="user-panel-btn" id="fontSize" onClick={dashBoard}>
              <i className="fas fa-user"></i> My Dashboard
            </button>
          )}
          {_connected ? (
            <button
              className="connect-wallet-btn"
              onClick={() => setShowDisconnectConfirm(true)}
            >
              <i className="fas fa-wallet"></i> {shortenAddress(walletAddress)}
            </button>
          ) : (
            <></>
          )}
        </div>
      </header>

      {showDisconnectConfirm && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Disconnect Wallet?</h3>
            <p>Are you sure you want to disconnect your wallet?</p>

            <div className="confirmation-buttons">
              <button
                className="confirm-btn"
                onClick={() => {
                  disconnectWallet();
                  setShowDisconnectConfirm(false);
                }}
              >
                Yes, Disconnect
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowDisconnectConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="main-content">

        {/* Description Section */}
        <section className="description-section">
          <div className="description-container">
            <div className="nft-showcase">
              {/* Replace the static image with the AutoRotatingCarousel */}
              <AutoRotatingCarousel logo={nftImage} hopeCard={hopeCard} />
            </div>

            <div className="description-content">
              <div className="description-header">
                <h2>About KK's Hope NFTs</h2>
                <div className="accent-line"></div>
              </div>

              <div className="description-text">
                <p>
                  Hope Coin are a limited edition NFT collection created as a heartfelt tribute to KK,
                  celebrating his extraordinary musical legacy. Each token in this exclusive collection
                  represents a unique digital artwork honoring his contributions to the world of music.
                </p>

                <p className="highlight-paragraph">
                  In a heartfelt tribute to resilience and hope, Shruti Music School is proud to release
                  a special edition NFT of the soul-stirring song "Humein Asha Hai" - originally sung by
                  the legendary KK. This unique digital collectible celebrates the spirit of every child
                  fighting silent battles, carrying forward KK's message of compassion and courage into
                  the digital age. Through this NFT, we - honour not just the voice, but the vision - a
                  future where music heals, uplifts, and inspires.
                </p>

                <p>
                  By minting a Hope NFT, you're preserving a piece of musical history while supporting
                  this initiative.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="kk-tribute-section">
          <div className="kk-hero">
            <img src="https://media.assettype.com/film-companion/import/wp-content/uploads/2022/06/FC-KK-Lead-Image-2-min.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true" alt="KK - The Legendary Singer" className="kk-hero-image" />
            <div className="kk-hero-overlay">
              <h2>Remembering KK</h2>
              <p>The voice that touched millions</p>
            </div>
          </div>

          <div className="kk-memories">
            <div className="memory-card">
              <img src={kk3} alt="KK performing live" />
              <div className="memory-text">
                <h3>The Performer</h3>
                <p>KK's electrifying stage presence captivated audiences worldwide</p>
              </div>
            </div>

            <div className="memory-card">
              <img src={kk4} alt="KK's warm smile" />
              <div className="memory-text">
                <h3>The Person</h3>
                <p>His kindness and humility touched everyone he met</p>
              </div>
            </div>
          </div>
        </section>

        {/* Minting Section */}
        <section className="mint-section">
          <h2>Mint Your Hope KK Commemorative NFT</h2>
          <p className="mint-description">Own a piece of this special tribute collection</p>

          {/* Display message */}
          {message && (
            <div className={`notification-overlay ${message ? 'active' : ''}`}>
              <div className={`notification-box ${mintSuccess ? 'success' : mintError ? 'error' : 'info'}`}>
                <button className="notification-close" onClick={() => setMessage('')}>
                  <i className="fas fa-times"></i>
                </button>
                <div className="notification-content">
                  <div className="notification-icon">
                    {mintSuccess ? (
                      <i className="fas fa-check-circle"></i>
                    ) : mintError ? (
                      <i className="fas fa-exclamation-circle"></i>
                    ) : (
                      <i className="fas fa-info-circle"></i>
                    )}
                  </div>
                  <div className="notification-message">{message}</div>
                </div>
              </div>
            </div>
          )}

          {_connected ?
            <>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                {showNameArrow && (
                  <div className="arrow-container">
                    <i className="fas fa-arrow-down arrow"></i>
                  </div>
                )}
                {hasExistingName ? (
                  <div className="existing-email-display">
                    <input
                      type="text"
                      id="name"
                      value={existingName}
                      disabled={true}
                      className="email-readonly"
                    />
                    <small className="email-note">The name appears as per your wallet name. You will not be able to change it here.</small>
                  </div>
                ) : (
                  <input
                    type="text"
                    id="name"
                    maxLength={30}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={isMinting || isDownloading || isCertificatePreparing || isLoadingUserData}
                  />
                )}
                {isLoadingUserData && <small className="loading-note">Checking existing data...</small>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                {showEmailArrow && (
                  <div className="arrow-container">
                    <i className="fas fa-arrow-down arrow"></i>
                  </div>
                )}
                {hasExistingEmail ? (
                  <div className="existing-email-display">
                    <input
                      type="email"
                      id="email"
                      value={existingEmail}
                      disabled={true}
                      className="email-readonly"
                    />
                    <small className="email-note">The email appears as registered with your wallet account. You will not be able to change it here.</small>
                  </div>
                ) : (
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isMinting || isDownloading || isCertificatePreparing || isLoadingUserData}
                  />
                )}
                {isLoadingUserData && <small className="loading-note">Checking existing data...</small>}
              </div>
            </>
            : null}

          {_connected ?
            <>
              {(isFirstMint() || !hasExistingEmail) && (
                <div className="terms-section">
                  {/* Terms and Conditions Checkbox with Modal */}
                  <div className="terms-checkbox">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={acceptedTerms}
                      onChange={(e) => {
                        if (!acceptedTerms) {
                          setShowTermsModal(true);
                          e.preventDefault();
                        } else {
                          setAcceptedTerms(false);
                        }
                      }}
                      disabled={isMinting || isDownloading || isCertificatePreparing}
                    />
                    <label htmlFor="acceptTerms">
                      I agree to the Terms and Conditions
                    </label>

                    {/* Terms Modal */}
                    {showTermsModal && (
                      <div className="terms-modal">
                        <div className="terms-modal-content">
                          <div className="terms-modal-header">
                            <h1 className="terms-modal-title">Terms of Reference</h1>
                          </div>

                          <div
                            className="terms-scrollable"
                            onScroll={(e) => {
                              const { scrollTop, scrollHeight, clientHeight } = e.target;
                              const isAtBottom = scrollHeight - scrollTop === clientHeight;
                              setHasScrolledToBottom(isAtBottom);
                            }}
                          >
                            {/* 1. Introduction */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">1. Introduction</h2>
                              <p className="terms-text">
                                These Terms of Reference ("ToR") constitute a legally binding agreement between you, the user ("you," "your," or "User"), and PHYDIGI LIMITED, a company incorporated and registered under the laws of the United Kingdom, with company number 14340557, and having its registered office at 128 City Road, London, EC1V 2NX, United Kingdom (hereinafter referred to as "MuseCoinX," "we," "us," or "our"). These ToR govern your access to, use of, and engagement with the MuseCoinX Platform, which includes, but is not limited to, the official website at www.musecoinx.com, mobile applications, decentralized applications (dApps), application programming interfaces (APIs), and all other technologies, tools, services, and content provided by or through MuseCoinX, both now and in the future (collectively referred to as the "Platform").
                              </p>
                              <p className="terms-text">
                                By accessing or using the Platform, including browsing, registering, participating in transactions, or engaging in any other activity that constitutes use of the Platform, you acknowledge and affirm that you have read, understood, and irrevocably agreed to be bound by these ToR. Your acceptance of these ToR is required as a condition for your use of the Platform. If you do not agree to these ToR, or if you do not have the legal authority to agree to these terms, you are prohibited from using the Platform and must immediately cease any access or interaction with the Platform.
                              </p>
                              <p className="terms-text">
                                The ToR governs your relationship with MuseCoinX and applies to all users of the Platform, including, but not limited to, artists, music labels, fans, and administrators, unless explicitly stated otherwise. If you are accessing or using the Platform on behalf of any entity, you represent and warrant that you are authorized to bind such entity to these ToR.
                              </p>
                              <p className="terms-text">
                                You understand and agree that MuseCoinX may, from time to time, amend, modify, or update these ToR in its sole discretion, without prior notice to you. Any such amendments or updates shall be effective immediately upon being posted on the Platform. Continued use of the Platform after any such amendments or updates will constitute your acceptance of the revised ToR. If any provision of these ToR is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect. You acknowledge that it is your responsibility to periodically review these ToR for any changes or updates.
                              </p>
                              <p className="terms-text">
                                In addition to the ToR, you may be required to agree to additional terms or policies (such as privacy policies or service agreements) that apply to specific services or functions offered through the Platform. In the event of a conflict between those additional terms and these ToR, the additional terms shall prevail, but only to the extent of such conflict.
                              </p>
                            </div>

                            {/* 2. Definitions */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">2. Definitions</h2>
                              <p className="terms-text">
                                For the purposes of these Terms of Reference ("ToR"), the following terms shall have the respective meanings ascribed to them, unless the context otherwise requires:
                              </p>

                              <h3 className="terms-subtitle">"NFTs" or "Song Tokens"</h3>
                              <p className="terms-text">
                                Non-Fungible Tokens (NFTs), also referred to as "Song Tokens," are unique digital assets created and issued on the MuseCoinX Platform, representing fractional and transferable ownership shares in the royalty income derived from the use, distribution, or performance of a particular song. Each NFT is created using blockchain technology, specifically the Polygon blockchain, ensuring the transparency, security, and immutability of all transactions. The ownership of such Song Tokens entitles the holder to a proportionate share of the Royalty Income generated from the use, distribution, or streaming of the song on digital music platforms such as Spotify, Apple Music, YouTube, and other similar platforms. Song Tokens are transferable, meaning that ownership can be bought, sold, or otherwise transferred between parties, subject to the conditions set forth herein.
                              </p>

                              <h3 className="terms-subtitle">"Platform"</h3>
                              <p className="terms-text">
                                The MuseCoinX Platform refers to the blockchain-based decentralized service ecosystem created and operated by PHYDIGI LIMITED, a company incorporated under the laws of the United Kingdom. The Platform facilitates the tokenization of Royalty Income and the issuance of Song Tokens as outlined in these Terms. The Platform includes, but is not limited to, the website, mobile applications, decentralized applications (dApps), application programming interfaces (APIs), and smart contracts, which together enable Artists to tokenize their royalty rights and distribute fractional ownership of these rights to Fans via Song Tokens. The Platform may be accessed through the official website at www.musecoinx.com and is available on any supported device with internet access. The Platform operates in a decentralized and non-custodial manner, ensuring that the control over tokens and funds remains with the users.
                              </p>

                              <h3 className="terms-subtitle">"Artist"</h3>
                              <p className="terms-text">
                                An "Artist" is an individual, band, or Music Label who owns or controls the rights to musical works and who uploads and tokenizes their music on the MuseCoinX Platform. By uploading their musical works, the Artist grants the Platform a non-exclusive, worldwide, royalty-free, and sublicensable license to tokenize the royalty rights of the uploaded music into Song Tokens, which can then be distributed or purchased by Fans. Artists are responsible for ensuring they have all necessary rights, including copyright and licensing, to upload the music and tokenize the royalty rights. Artists retain full ownership and control over their underlying musical works but grant MuseCoinX the license to use the song for the purpose of creating and issuing Song Tokens, which are linked to the income generated by the song.
                              </p>

                              <h3 className="terms-subtitle">"Fan" or "NFT Holder"</h3>
                              <p className="terms-text">
                                A "Fan" or "NFT Holder" refers to an individual or entity who acquires, holds, or purchases Song Tokens via the MuseCoinX Platform. The purchase or holding of Song Tokens entitles the Fan to a share of the Royalty Income generated by the corresponding song, proportional to the amount of Song Tokens they hold. The holder of the Song Token does not acquire ownership of the song itself, but rather a share in the royalties earned from its distribution and use across digital platforms. The rights and obligations associated with owning Song Tokens are governed by the terms set forth in these ToR. Fans also have the right to resell, transfer, or trade Song Tokens on compatible platforms, subject to applicable laws and the terms outlined in these ToR.
                              </p>

                              <h3 className="terms-subtitle">"Muse Coins"</h3>
                              <p className="terms-text">
                                Muse Coins are the native digital currency of the MuseCoinX Platform, which serve as the primary medium of exchange within the Platform. Muse Coins are used for transactions such as purchasing Song Tokens, distributing royalties to NFT Holders, and facilitating other economic activities within the MuseCoinX ecosystem. Muse Coins may also be used to pay for any associated fees or services on the Platform. The exchange rate and value of Muse Coins are determined by market conditions, demand, and the use of the Platform. Muse Coins are recorded and managed on the Polygon blockchain, ensuring transparency and security.
                              </p>

                              <h3 className="terms-subtitle">"External Wallet Providers"</h3>
                              <p className="terms-text">
                                External Wallet Providers refer to independent, third-party services that are utilized by Fans to store, manage, and transfer their Song Tokens. These wallet services are not operated or controlled by MuseCoinX. As such, MuseCoinX does not have access to or responsibility for the security or management of any user wallets. Users are solely responsible for securing their wallets and any Song Tokens stored within them. The MuseCoinX Platform operates on a non-custodial basis, meaning that MuseCoinX does not take possession of any Song Tokens or associated funds, which remain under the control of the user's chosen wallet provider.
                              </p>

                              <h3 className="terms-subtitle">"Royalty Income"</h3>
                              <p className="terms-text">
                                Royalty Income refers to the payments made to Artists or Music Labels by digital streaming platforms, such as Spotify, Apple Music, YouTube, and other similar services, for the public performance, distribution, or use of their songs. The Royalty Income generated from these platforms is then shared with Fans who hold Song Tokens corresponding to the specific song. The Royalty Income is distributed proportionally to the NFT holders, based on their ownership percentage of Song Tokens. This income is subject to fluctuations based on the performance of the song on these platforms and other market conditions. MuseCoinX facilitates the distribution of this Royalty Income but does not guarantee the amount of income or the success of any particular song. Regarding performance royalties, MuseCoinX relies on the Artist's declaration and the terms outlined in the contract with the Artist. We expect the Artist to accurately report and declare performance royalties from public performances.
                              </p>
                            </div>

                            {/* 3. General Terms and Conditions */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">3. General Terms and Conditions</h2>

                              <h3 className="terms-subtitle">3.1 Platform Overview</h3>
                              <p className="terms-text">
                                The MuseCoinX Platform operates as a decentralized, blockchain-based service designed to facilitate the tokenization of Royalty Income through the issuance of Song Tokens (NFTs). The primary objective of the Platform is to enable Artists and Music Labels to tokenize a portion of their Royalty Income and distribute these fractions to Fans who acquire Song Tokens. The following features and characteristics apply to the Platform:
                              </p>
                              <p className="terms-text">
                                <strong>Tokenization of Royalty Rights:</strong> Artists and Music Labels shall upload their songs to the MuseCoinX Platform and tokenize a portion of their Royalty Income by creating Song Tokens. These tokens are available for purchase by Fans or, alternatively, can be transferred to Fans via airdrop. Each Song Token represents a proportional share of the Royalty Income generated by the song through public performance, distribution, and usage on digital streaming platforms.
                              </p>
                              <p className="terms-text">
                                <strong>Non-Custodial Nature:</strong> The MuseCoinX Platform does not take custody of user funds or Song Tokens. All transactions are facilitated through smart contracts deployed on the blockchain, ensuring transparency and autonomy for each user. The ownership and control of digital wallets used to manage Song Tokens rest solely with the respective users (i.e., Fans and Artists). MuseCoinX does not store, manage, or control any assets or digital currencies; instead, it provides the technological infrastructure for transactions and interactions on the Platform.
                              </p>
                              <p className="terms-text">
                                <strong>Royalty Distribution Mechanism:</strong> The Royalty Income generated from the public use and distribution of a song on digital platforms (e.g., Spotify, Apple Music, YouTube) is distributed to NFT Holders based on their percentage ownership of Song Tokens. The payments will be made in Muse Coins, the native token of the MuseCoinX Platform, which can also be used within the Platform for other transactions. The royalty payments are executed via smart contracts, ensuring that payouts are transparent, timely, and proportionate to the ownership of the Song Tokens.
                              </p>

                              <h3 className="terms-subtitle">3.2 Responsibilities and Obligations of the Artist</h3>
                              <p className="terms-text">
                                The Artist or Music Label acknowledges and agrees to undertake the following responsibilities and obligations when utilizing the MuseCoinX Platform:
                              </p>
                              <ul className="terms-list">
                                <li>
                                  <strong>Ownership and Licensing:</strong> The Artist affirms and warrants that they hold full, unrestricted ownership or possess all necessary rights (including copyright and licensing rights) to the music they upload to the MuseCoinX Platform. The Artist further represents and warrants that all Royalty Rights uploaded to the Platform are accurate, legitimate, and free from any third-party encumbrances, claims, or disputes that could interfere with the tokenization process.
                                </li>
                                <li>
                                  <strong>Accurate Information:</strong> The Artist shall ensure that all metadata related to the uploaded song including, but not limited to, song title, artist name, and royalty percentage is accurate, complete, and current. The Artist bears sole responsibility for the veracity of the information provided to the MuseCoinX Platform. MuseCoinX disclaims any liability for inaccuracies or misrepresentations of the song data provided by the Artist.
                                </li>
                                <li>
                                  <strong>Intellectual Property Rights:</strong> By uploading a song to the Platform, the Artist grants MuseCoinX a non-exclusive, worldwide, royalty-free, and sublicensable license to use the song solely for the purpose of tokenizing the Royalty Income associated with that song into Song Tokens. This license is limited to tokenization, distribution, and royalty management on the MuseCoinX Platform.
                                </li>
                                <li>
                                  <strong>Indemnification:</strong> The Artist agrees to indemnify, defend, and hold harmless MuseCoinX, its officers, directors, agents, employees, and affiliates, from and against any and all claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising out of or in connection with any third-party intellectual property disputes, including but not limited to copyright infringement, trademark violations, or other legal claims related to the music uploaded by the Artist to the Platform.
                                </li>
                              </ul>

                              <h3 className="terms-subtitle">3.3 Rights and Responsibilities of Fans/NFT Holders</h3>
                              <p className="terms-text">
                                As a Fan or NFT Holder, you acknowledge and agree to the following rights and responsibilities:
                              </p>
                              <p className="terms-text">
                                <strong>Acquisition of Song Tokens:</strong> You may acquire Song Tokens through purchases or by receiving them via an airdrop, which is a delivery mechanism for distributing tokens to users' wallets. Each Song Token represents a proportional share of the Royalty Income generated by the corresponding song, entitling you to receive a portion of royalties in accordance with your token holdings.
                              </p>
                              <ul className="terms-list">
                                <li>
                                  <strong>Non-Refundable Transactions:</strong> Once a Song Token is purchased, the transaction is final and non-refundable. You understand and agree that MuseCoinX is not obligated to reverse, refund, or amend any transactions once they have been completed on the Platform. Any disputes regarding transactions must be handled directly with the respective wallet provider or third-party service.
                                </li>
                                <li>
                                  <strong>Market Risks:</strong> You acknowledge that the value of Song Tokens and the corresponding Royalty Income may fluctuate due to various market factors, including the popularity of the song, the success of the song in digital streaming platforms, and broader market conditions within the music and cryptocurrency industries. You assume all risks related to the purchase, holding, or sale of Song Tokens.
                                </li>
                                <li>
                                  <strong>Token Resale:</strong> Song Tokens may be resold or transferred to other parties on third-party platforms, but MuseCoinX does not directly control or facilitate these transactions. You acknowledge that MuseCoinX disclaims any liability or responsibility for any issues arising from the resale, transfer, or exchange of Song Tokens on external platforms.
                                </li>
                              </ul>

                              <h3 className="terms-subtitle">3.4 MuseCoinX's Responsibilities and Limitations</h3>
                              <p className="terms-text">
                                The responsibilities of MuseCoinX are expressly limited as follows:
                              </p>
                              <ul className="terms-list">
                                <li>
                                  <strong>Facilitation of Royalty Tokenization:</strong> MuseCoinX provides the necessary platform and infrastructure for the tokenization of Royalty Rights and issuance of Song Tokens. We facilitate the distribution of NFTs to Fans and the payment of royalties based on the ownership of Song Tokens. Our role is to act as an intermediary service provider for the Artists and Fans.
                                </li>
                                <li>
                                  <strong>No Guarantee of Royalties:</strong> MuseCoinX makes no representations or warranties regarding the profitability or revenue generation of any Song Tokens. We do not control or guarantee the success of any specific song or the Royalty Income resulting from its streaming. The Platform is merely a facilitator and does not guarantee the amount or frequency of royalty payments.
                                </li>
                                <li>
                                  <strong>Non-Custodial Nature:</strong> MuseCoinX is not responsible for managing or securing any digital wallets, nor are we liable for any loss or theft of Song Tokens due to hacking, phishing, or other cyberattacks. The security of wallets used to manage Song Tokens is solely the responsibility of the Fan or Artist, and all transactions conducted on the Platform occur at the user's own risk.
                                </li>
                                <li>
                                  <strong>Smart Contract Risks:</strong> While we strive to ensure the accuracy and functionality of the smart contracts deployed on the Polygon blockchain, MuseCoinX does not provide any guarantee that the smart contracts will function without errors, bugs, or vulnerabilities. You acknowledge that smart contracts are inherently subject to risks, including potential programming flaws, system failures, or security vulnerabilities, and agree to use the Platform at your own risk.
                                </li>
                              </ul>
                            </div>

                            {/* 4. Risk Factors */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">4. Risk Factors</h2>

                              <h3 className="terms-subtitle">4.1 Royalty Income Not Guaranteed</h3>
                              <p className="terms-text">
                                You, as a Fan or NFT Holder, acknowledge and agree that the Royalty Income derived from the ownership of Song Tokens is not guaranteed. The Royalty Income you may receive is contingent upon multiple factors, including but not limited to:
                              </p>
                              <ul className="terms-list">
                                <li>The performance of the song across digital streaming platforms, including its popularity and frequency of plays;</li>
                                <li>Market conditions, which may affect the overall demand and success of the song and, by extension, the royalties generated from it;</li>
                                <li>The availability of royalty income, which is subject to the terms and conditions set by third-party digital streaming platforms (e.g., Spotify, Apple Music, YouTube, etc.), as well as the accuracy of the reporting and payment by these platforms. While some platforms may provide data through APIs, we also rely on the Artist to declare performance royalties. This ensures that in cases where data cannot be obtained from the platform's API, the Artist's declaration will provide the necessary information for accurate royalty distribution.</li>
                              </ul>
                              <p className="terms-text">
                                You acknowledge that MuseCoinX does not control or guarantee the Royalty Income generated by any song, nor can we ensure that the royalty payments will be forthcoming or consistent in amounts. Furthermore, MuseCoinX is not liable for any discrepancies or delays in the payment of Royalty Income by streaming platforms or any other third parties.
                              </p>

                              <h3 className="terms-subtitle">4.2 Value of Song Tokens and Market Fluctuations</h3>
                              <p className="terms-text">
                                You acknowledge and understand that the value of Song Tokens is subject to significant fluctuations and may be influenced by a wide range of factors, including but not limited to:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Popularity and market demand:</strong> The value of Song Tokens is directly tied to the popularity of the associated song, which is driven by public interest, media attention, and listener engagement.</li>
                                <li><strong>Streaming statistics:</strong> The performance of the song across digital platforms, including the number of streams, plays, and downloads, can heavily influence the royalty income and, in turn, the value of the Song Tokens.</li>
                                <li><strong>Digital music industry trends:</strong> Fluctuations in the overall digital music industry, including changes in market trends, the success or failure of new platforms, and regulatory shifts, can all significantly impact the performance and value of Song Tokens.</li>
                              </ul>
                              <p className="terms-text">
                                You further acknowledge that the market for NFTs and Song Tokens is speculative and can experience extreme volatility. The value of Song Tokens may increase or decrease, and there is no assurance that the value of a Song Token will remain stable or continue to appreciate. MuseCoinX disclaims any liability or responsibility for any losses, damages, or missed opportunities resulting from such market fluctuations.
                              </p>

                              <h3 className="terms-subtitle">4.3 Loss of NFTs</h3>
                              <p className="terms-text">
                                You acknowledge and agree that once a Song Token has been purchased, acquired, or transferred to you, the transaction is final, and the Song Token cannot be returned, refunded, or exchanged under any circumstances. You assume full responsibility and risk for any and all purchases or transfers of Song Tokens on the Platform. This includes, but is not limited to:
                              </p>
                              <ul className="terms-list">
                                <li>The risk of loss due to market failure or the song's underperformance on digital platforms;</li>
                                <li>The potential for loss of NFTs due to hacking, cybersecurity breaches, or other technical failures that may occur, either within the MuseCoinX Platform or with third-party services such as External Wallet Providers;</li>
                                <li>Loss of access to Song Tokens due to user error, including the failure to back up or secure private keys, wallet credentials, or other forms of digital access to the NFTs.</li>
                              </ul>
                              <p className="terms-text">
                                You further acknowledge that MuseCoinX has no obligation to replace lost Song Tokens or provide compensation for any loss of NFTs, whether due to external factors, technological issues, user negligence, or any other unforeseen circumstances. MuseCoinX is not liable for any financial loss, damages, or losses arising from the failure to protect or secure NFTs, nor is it liable for the devaluation of Song Tokens, market fluctuations, or any related risks. Users accept full responsibility for safeguarding their Song Tokens and any related transactions on the Platform. Additionally, MuseCoinX makes no representations or warranties regarding the profitability or success of the tokens, and users acknowledge the inherent risks involved in the purchase, trade, and holding of Song Tokens. To mitigate potential risks, MuseCoinX may, at its discretion, use third-party insurance and escrow services to protect user funds, but users must be aware that such services are not guaranteed. Regular communication regarding potential financial risks will be provided, and users are encouraged to consult with legal or financial advisors on matters related to risks, including insolvency protections.
                              </p>

                              <h3 className="terms-subtitle">4.4 Smart Contract and Blockchain Risks</h3>
                              <p className="terms-text">
                                You acknowledge that MuseCoinX utilizes smart contracts and the Polygon blockchain to facilitate the issuance and transfer of Song Tokens. While MuseCoinX has taken reasonable measures to ensure the correct functioning of these smart contracts, the use of blockchain technology involves inherent risks, including:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Technical vulnerabilities:</strong> Bugs, flaws, or errors in the code underlying smart contracts may result in the misallocation of Royalty Income, loss of NFTs, or other unintended consequences.</li>
                              </ul>
                              <p className="terms-text">
                                <strong>Blockchain risks:</strong> The use of blockchain systems exposes users to risks, including, but not limited to, the possibility of hacking, network congestion, or system failure that could impact the execution of smart contracts or the ability to transfer, redeem, or sell Song Tokens.
                              </p>
                              <p className="terms-text">
                                You assume all risks associated with interacting with the blockchain and smart contracts, including any risks arising from network failures, data integrity issues, or unforeseen technical issues that may arise, and you acknowledge that MuseCoinX is not liable for any such failures.
                              </p>

                              <h3 className="terms-subtitle">4.5 Regulatory Risks</h3>
                              <p className="terms-text">
                                You acknowledge and understand that the legal landscape surrounding cryptocurrency, NFTs, and blockchain-based platforms is rapidly evolving, and that regulations governing the use of such technologies may vary across jurisdictions. The following regulatory risks may affect the use and value of Song Tokens:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Jurisdictional regulations:</strong> Changes in laws or regulations relating to digital assets, NFTs, cryptocurrency, or intellectual property may have an impact on your ability to purchase, hold, or sell Song Tokens, as well as the legality of tokenized royalties in specific jurisdictions.</li>
                                <li><strong>Taxation risks:</strong> The potential imposition of tax liabilities or withholding taxes on transactions involving Song Tokens may affect your ability to realize gains or profits from your tokens. You are responsible for complying with all applicable tax obligations arising from your interactions with the Platform.</li>
                              </ul>
                              <p className="terms-text">
                                MuseCoinX disclaims any liability for losses, damages, or penalties that may arise due to changes in applicable laws, regulations, or taxation affecting the use of Song Tokens or the royalty income generated by the Platform.
                              </p>
                            </div>

                            {/* 5. Dispute Resolution and Governing Law */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">5. Dispute Resolution and Governing Law</h2>

                              <h3 className="terms-subtitle">5.1 Arbitration Agreement</h3>
                              <p className="terms-text">
                                In the event of any dispute, controversy, or claim arising out of, relating to, or in connection with these Terms of Reference or the MuseCoinX Platform, including, but not limited to, claims arising from the formation, execution, interpretation, enforcement, breach, or termination of these Terms, such dispute shall be resolved exclusively through binding arbitration. The parties agree that:
                              </p>
                              <ul className="terms-list">
                                <li>
                                  <strong>Binding Arbitration:</strong> All disputes will be subject to final and binding arbitration, and no party shall have the right to resort to court, except as otherwise provided in this section. The arbitration shall be governed by the Arbitration Act 1996 (as amended from time to time), or any successor legislation, and shall take place in accordance with the rules set out by the [Arbitration Body].
                                </li>
                                <li>
                                  <strong>Arbitration Procedure:</strong> The arbitration will be conducted by a sole arbitrator who will be impartial and independent, appointed in accordance with the rules of the [Arbitration Body]. The arbitrator shall have the power to grant relief in equity and law, including the award of damages, specific performance, or injunctive relief, as appropriate.
                                </li>
                                <li>
                                  <strong>Arbitration Location:</strong> The arbitration will be held in [City, United Kingdom], unless otherwise agreed by the parties. The language of the arbitration proceedings shall be English.
                                </li>
                                <li>
                                  <strong>Cost of Arbitration:</strong> The parties shall each bear their own costs of the arbitration, except that the arbitrator may, in the final award, allocate costs, including the arbitrator's fees and expenses, to the party deemed to have acted unreasonably or in bad faith.
                                </li>
                                <li>
                                  <strong>Confidentiality of Arbitration:</strong> The arbitration proceedings, including any hearings, submissions, or documents produced in the course of the arbitration, shall remain confidential unless disclosure is required by law or agreed by the parties in writing.
                                </li>
                                <li>
                                  <strong>Exclusivity:</strong> The decision or award rendered by the arbitrator shall be final, binding, and enforceable in any court of competent jurisdiction. Arbitration is the exclusive means of dispute resolution, and both parties hereby waive their right to initiate or pursue any disputes in any other forum, including any court of law, except for actions to enforce the arbitration award.
                                </li>
                              </ul>

                              <h3 className="terms-subtitle">5.2 Jurisdiction and Venue</h3>
                              <ul className="terms-list">
                                <li>
                                  <strong>Governing Law:</strong> These Terms of Reference, and any dispute arising therefrom, shall be governed by, and construed in accordance with, the laws of the United Kingdom without regard to its conflicts of law provisions. The parties expressly agree that the principles of English contract law and relevant statutory frameworks shall govern the interpretation and enforcement of these Terms.
                                </li>
                                <li>
                                  <strong>Venue for Non-Arbitration Disputes:</strong> For any dispute, claim, or controversy not subject to arbitration under Section 4.1, the exclusive jurisdiction and venue for such dispute shall lie in the courts of England and Wales, and the parties irrevocably submit to the personal jurisdiction of such courts. The venue for such disputes shall be [City], England, and any action arising hereunder may only be brought before such courts.
                                </li>
                                <li>
                                  <strong>Waiver of Jury Trial:</strong> To the fullest extent permissible by law, each party expressly waives any right to a jury trial in any court action arising under these Terms, and consents to the exclusive jurisdiction of the courts in England and Wales for non-arbitration matters.
                                </li>
                              </ul>

                              <h3 className="terms-subtitle">5.3 Injunctive Relief</h3>
                              <p className="terms-text">
                                Notwithstanding the provisions of this section, either party may seek injunctive relief in any court of competent jurisdiction, without the necessity of resorting to arbitration, to prevent or remedy an infringement of its rights or to protect its proprietary information, intellectual property, or other legal interests, subject to the jurisdiction and venue provisions outlined in Section 4.2.
                              </p>

                              <h3 className="terms-subtitle">5.4 Class Action Waiver</h3>
                              <p className="terms-text">
                                The parties agree that any claim shall be resolved on an individual basis, and no party shall bring a class action, collective action, or representational action under these Terms of Reference. The parties waive the right to participate in any class or representative action, whether in arbitration or in court, and further agree that any arbitration shall be limited to the individual claims of the parties involved.
                              </p>

                              <h3 className="terms-subtitle">5.5 Limitation Period</h3>
                              <p className="terms-text">
                                Any claim or action arising under these Terms of Reference must be brought within one (1) year from the date the claim or cause of action arises. Any claim or action not brought within such period shall be deemed waived, and any legal action based thereon shall be barred.
                              </p>
                            </div>

                            {/* 6. Data Protection and Privacy */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">6. Data Protection and Privacy</h2>

                              <h3 className="terms-subtitle">6.1 Data Collection and Use</h3>
                              <p className="terms-text">
                                In compliance with applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) (EU 2016/679), the Data Protection Act 2018 (United Kingdom), and any subsequent amendments or regulations that may be enacted (collectively referred to as the "Applicable Data Protection Laws"), MuseCoinX (hereinafter "we", "us", "our") is committed to safeguarding and respecting your privacy.
                              </p>

                              <h4 className="terms-sub-subtitle">Types of Personal Data Collected:</h4>
                              <p className="terms-text">
                                We collect personal data from users of the MuseCoinX Platform to provide and improve our services. This may include, but is not limited to, information such as:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Identification data:</strong> Name, email address, contact details, date of birth, etc.</li>
                                <li><strong>Financial data:</strong> Payment details, including billing information and transaction history.</li>
                                <li><strong>Usage data:</strong> Information about how you access, interact with, and use the Platform, such as IP address, device type, operating system, browsing activity, and interaction with our services.</li>
                                <li><strong>Identity verification data:</strong> Government-issued identification documents, in accordance with Know Your Customer (KYC) requirements.</li>
                              </ul>

                              <h4 className="terms-sub-subtitle">Purpose of Data Collection:</h4>
                              <p className="terms-text">
                                We collect and process personal data for the following purposes:
                              </p>
                              <ul className="terms-list">
                                <li>To provide, operate, and maintain the MuseCoinX Platform, including tokenization and royalty distribution services.</li>
                                <li>To facilitate and complete financial transactions, including royalty payouts and NFT purchases.</li>
                                <li>To comply with legal obligations, including anti-money laundering (AML) and KYC requirements.</li>
                                <li>To communicate with users regarding their account, transactions, and relevant updates about the Platform.</li>
                                <li>To personalize and improve user experience, ensuring that content and services are relevant to individual preferences and interests.</li>
                              </ul>

                              <h4 className="terms-sub-subtitle">Legal Basis for Processing:</h4>
                              <p className="terms-text">
                                We process personal data based on one or more of the following legal grounds:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Consent:</strong> Where you have explicitly consented to the processing of your data for a specific purpose.</li>
                                <li><strong>Performance of a Contract:</strong> Where the processing is necessary to fulfill the terms of our agreement with you, such as providing access to the Platform and processing transactions.</li>
                                <li><strong>Legal Obligation:</strong> Where processing is necessary to comply with legal requirements, such as for KYC and AML checks.</li>
                                <li><strong>Legitimate Interests:</strong> Where we process your data to pursue our legitimate interests, such as enhancing our services and ensuring the security of our Platform, provided such interests don't override your rights and freedoms.</li>
                              </ul>

                              <h3 className="terms-subtitle">6.2 Data Storage and Transfer</h3>
                              <h4 className="terms-sub-subtitle">Data Storage:</h4>
                              <p className="terms-text">
                                We store your personal data in secure, access-controlled facilities located within the United Kingdom or in other jurisdictions where MuseCoinX or its affiliates operate. We implement appropriate technical and organizational measures to ensure the security and confidentiality of your personal data, in compliance with Applicable Data Protection Laws.
                              </p>

                              <h4 className="terms-sub-subtitle">International Data Transfers:</h4>
                              <p className="terms-text">
                                Due to the global nature of our business, we may transfer your personal data to jurisdictions outside of the United Kingdom and the European Economic Area (EEA), including countries that may not offer the same level of data protection as the laws in your home country. However, we take necessary steps to ensure that any such transfers are compliant with applicable data protection laws, including:
                              </p>
                              <ul className="terms-list">
                                <li>Implementing standard contractual clauses (SCCs) or other legally acceptable transfer mechanisms approved by the European Commission or relevant regulatory authorities.</li>
                                <li>In certain cases, we may rely on adequacy decisions by the European Commission, which recognize that specific countries provide an adequate level of data protection.</li>
                              </ul>

                              <h4 className="terms-sub-subtitle">Your Consent to Data Transfers:</h4>
                              <p className="terms-text">
                                By using the MuseCoinX Platform, you expressly consent to the transfer of your personal data as described herein, including to countries outside of the EEA that may not have the same level of data protection laws as your country of residence.
                              </p>

                              <h4 className="terms-sub-subtitle">Data Retention:</h4>
                              <p className="terms-text">
                                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, as required by law, or to resolve disputes, enforce our agreements, or as otherwise permitted by applicable laws. The retention period may vary depending on the nature of the data and our legal obligations.
                              </p>

                              <h3 className="terms-subtitle">6.3 Data Security</h3>
                              <p className="terms-text">
                                We employ a range of technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. These measures include, but are not limited to:
                              </p>
                              <ul className="terms-list">
                                <li>Encryption of sensitive data during transmission and storage.</li>
                                <li>Access controls to limit who can view and modify personal data.</li>
                                <li>Regular audits and assessments of our data protection practices.</li>
                              </ul>
                              <p className="terms-text">
                                However, despite our efforts to maintain the highest level of security, no data transmission or storage system can be guaranteed to be 100% secure. We cannot guarantee the security of your personal data during transmission over the internet or the MuseCoinX Platform, and you use the Platform at your own risk.
                              </p>

                              <h3 className="terms-subtitle">6.4 Your Rights</h3>
                              <p className="terms-text">
                                In accordance with Applicable Data Protection Laws, you have the following rights in relation to your personal data:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Right to Access:</strong> You have the right to request a copy of the personal data we hold about you.</li>
                                <li><strong>Right to Rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal data.</li>
                                <li><strong>Right to Erasure:</strong> In certain circumstances, you may request the deletion of your personal data, subject to any legal obligations we have to retain the data.</li>
                                <li><strong>Right to Restrict Processing:</strong> You may request that we restrict the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data.</li>
                                <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal data, particularly when we rely on legitimate interests as the legal basis for processing.</li>
                                <li><strong>Right to Data Portability:</strong> You may request a copy of your personal data in a structured, commonly used, and machine-readable format, and to transfer such data to another service provider.</li>
                                <li><strong>Right to Withdraw Consent:</strong> If we process your personal data based on consent, you have the right to withdraw that consent at any time, although such withdrawal won't affect the lawfulness of processing carried out before the withdrawal.</li>
                              </ul>
                              <p className="terms-text">
                                To exercise any of these rights, please contact us using the details provided in our Privacy Policy. We will respond to your request in accordance with Applicable Data Protection Laws.
                              </p>

                              <h3 className="terms-subtitle">6.5 Cookies and Tracking Technologies</h3>
                              <p className="terms-text">
                                We use cookies and similar tracking technologies to enhance your experience with the MuseCoinX Platform. Cookies are small text files that are stored on your device when you access our Platform. These technologies allow us to track user activity, improve the functionality of the Platform, and analyze usage trends. By using the MuseCoinX Platform, you consent to our use of cookies in accordance with our Cookie Policy.
                              </p>

                              <h3 className="terms-subtitle">6.6 Third-Party Data Sharing</h3>
                              <p className="terms-text">
                                We may share your personal data with third parties in the following circumstances:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Service Providers:</strong> We may engage third-party vendors and service providers to assist with operating the Platform, processing payments, or performing other functions. These third parties will only have access to your personal data as necessary to perform their services and are obligated to keep your data confidential.</li>
                                <li><strong>Legal Compliance:</strong> We may disclose your personal data if required by law or in response to a valid request by a governmental authority, including to comply with national security or law enforcement requirements.</li>
                                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal data may be transferred as part of the transaction. We will provide notice of such changes in accordance with the terms of this Policy.</li>
                              </ul>

                              <h3 className="terms-subtitle">6.7 Updates to the Privacy Policy</h3>
                              <p className="terms-text">
                                We reserve the right to update or modify this Privacy Policy at any time. Any changes to this Policy will be posted on this page, and the date of the latest revision will be indicated at the top. It is your responsibility to review this Privacy Policy periodically for any updates or changes. By continuing to use the MuseCoinX Platform after any updates or modifications to this Policy, you consent to the terms of the revised Privacy Policy.
                              </p>
                            </div>

                            {/* 7. Miscellaneous Provisions */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">7. Miscellaneous Provisions</h2>

                              <h3 className="terms-subtitle">7.1 Force Majeure</h3>
                              <p className="terms-text">
                                Neither MuseCoinX nor any other party involved in the performance of these Terms shall be liable for failure or delay in the performance of any of their respective obligations hereunder, if such failure or delay is caused by events beyond their reasonable control, including but not limited to:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Acts of God:</strong> Natural events such as floods, earthquakes, fires, or other catastrophes that are outside the control of the parties involved.</li>
                                <li><strong>War and Hostilities:</strong> Acts of war, invasion, terrorist activities, armed conflict, or similar events, whether declared or not, including but not limited to civil disturbances, riots, or insurrection.</li>
                                <li><strong>Government Actions:</strong> Any act, decree, regulation, law, or restriction imposed by governmental bodies or authorities that interferes with the ability to perform obligations under these Terms.</li>
                                <li><strong>Technical Failures:</strong> Events such as system failures, software malfunctions, cyberattacks, or any technical difficulties or breaches that prevent the operation or availability of the MuseCoinX Platform, which could result in delays or non-performance of services.</li>
                              </ul>
                              <p className="terms-text">
                                In the event of such a force majeure event, the party affected by the delay shall notify the other party promptly in writing, and the time for performance of the affected obligation(s) shall be extended for the duration of the force majeure event.
                              </p>

                              <h3 className="terms-subtitle">7.2 Severability</h3>
                              <p className="terms-text">
                                If any provision of these Terms of Reference is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable in any respect, the validity, legality, and enforceability of the remaining provisions shall not be affected in any way. In such an event, the parties agree that the court shall endeavor to interpret and apply the intention of the original provision to the fullest extent permitted by law, while modifying such provision as necessary to render it enforceable. The remainder of these Terms shall continue in full force and effect.
                              </p>

                              <h3 className="terms-subtitle">7.3 Modification of Terms</h3>
                              <p className="terms-text">
                                MuseCoinX reserves the right to amend, modify, or update these Terms of Reference at any time, in its sole discretion, without prior notice. Any such amendments or modifications will be posted on the MuseCoinX Platform, and the date of the latest revision will be indicated at the top of the document. The revised Terms will be effective immediately upon such posting. Your continued use of the MuseCoinX Platform following the posting of updated Terms will be deemed as your acceptance of the modified Terms.
                              </p>
                              <ul className="terms-list">
                                <li><strong>Notice of Changes:</strong> Users will be informed of any material changes to these Terms through notifications on the Platform, via email, or other appropriate means, ensuring that you are aware of any significant modifications to your rights and obligations.</li>
                                <li><strong>Binding Agreement:</strong> By continuing to use the MuseCoinX Platform, you acknowledge and agree that your use of the Platform shall be governed by the most current version of these Terms, and that your continued use constitutes acceptance of the revised Terms.</li>
                              </ul>

                              <div className="terms-footer">
                                <p className="terms-footer-text">
                                  For further details on the services and functionality provided, please refer to the official website: <a href="https://www.musecoinx.com" className="terms-link">www.musecoinx.com</a>.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="terms-modal-actions">
                            <button
                              className="terms-cancel-btn"
                              onClick={() => setShowTermsModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className={`terms-agree-btn ${!hasScrolledToBottom ? 'disabled' : ''}`}
                              onClick={() => {
                                if (hasScrolledToBottom) {
                                  setAcceptedTerms(true);
                                  setShowTermsModal(false);
                                  setTermsError(false);
                                }
                              }}
                              disabled={!hasScrolledToBottom}
                            >
                              I Agree
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {termsError && (
                    <div className="terms-error">
                      You must accept the Terms and Conditions to mint
                    </div>
                  )}

                  {/* Privacy Policy Checkbox */}
                  <div className="terms-checkbox">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      checked={registerAcceptedPrivacyPolicy}
                      onChange={(e) => {
                        if (!registerAcceptedPrivacyPolicy) {
                          setShowPrivacyModal(true);
                          setHasScrolledPrivacyBottom(false);
                          e.preventDefault();
                        } else {
                          setRegisterAcceptedPrivacyPolicy(false);
                        }
                      }}
                      disabled={isMinting || isDownloading || isCertificatePreparing}
                    />
                    <label htmlFor="privacyPolicy">
                      I have read and agree to the Privacy Policy
                    </label>

                    {/* Privacy Modal */}
                    {showPrivacyModal && (
                      <div className="terms-modal">
                        <div className="terms-modal-content">
                          <div className="terms-modal-header">
                            <h1 className="terms-modal-title">Privacy Policy</h1>
                          </div>

                          <div
                            className="terms-scrollable"
                            onScroll={(e) => {
                              const { scrollTop, scrollHeight, clientHeight } = e.target;
                              const isAtBottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) < 10;
                              setHasScrolledPrivacyBottom(isAtBottom);
                            }}
                          >
                            {/* 1. Introduction */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">1. Introduction</h2>
                              <p className="terms-text">
                                This Privacy Policy ("Policy") is issued by PHYDIGI LIMITED, a company duly incorporated under the laws of the United Kingdom with company number 14340557, operating under the brand name MuseCoinX ("we," "our," "us"). It governs the collection, processing, use, disclosure, and safeguarding of personal data provided by users ("you," "your," or "User") of the MuseCoinX platform ("Platform"), which is accessible through the website located at www.musecoinx.com, mobile applications, decentralized applications (dApps), application programming interfaces (APIs), and other services (collectively, the "Services").
                              </p>
                              <p className="terms-text">
                                By accessing, using, or otherwise interacting with the Platform, you acknowledge and expressly consent to the collection, use, storage, and sharing of your personal data in accordance with the terms and conditions set forth in this Policy. Should you disagree with any provision of this Policy, you are required to refrain from using the Platform immediately.
                              </p>
                            </div>

                            {/* 2. Definitions */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">2. Definitions</h2>
                              <ul className="terms-list">
                                <li>
                                  <strong>Personal Data:</strong> Any information that relates to an identified or identifiable natural person, whether directly or indirectly, including but not limited to, identification data, contact details, transactional history, or any other data that can be used to identify a specific individual in accordance with applicable data protection laws.
                                </li>
                                <li>
                                  <strong>Account Information:</strong> The personal details provided by users when creating an account on the Platform, including but not limited to: Name, Email address, Date of birth, User ID, and Wallet address.
                                </li>
                                <li>
                                  <strong>Transaction Information:</strong> Data relating to the transactions made by users on the Platform, including but not limited to: Details of Song Tokens (NFTs) purchased, sold, or otherwise transacted, Royalty distribution amounts and history, and Other financial interactions related to services offered by Musecoinx.
                                </li>
                                <li>
                                  <strong>Wallet Information:</strong> Public wallet addresses provided by users to facilitate the purchase, transfer, or storage of Song Tokens (NFTs), and any associated blockchain transactions.
                                </li>
                                <li>
                                  <strong>KYC Information:</strong> Know Your Customer (KYC) data, which includes identity verification details collected from users to comply with legal, regulatory, and financial obligations.
                                </li>
                                <li>
                                  <strong>Usage Data:</strong> Information automatically collected regarding your interaction with the Platform, including: IP address, Device information, Operating system, Browser type and version, Activity logs.
                                </li>
                              </ul>
                            </div>

                            {/* 3. Information We Collect */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">3. Information We Collect</h2>
                              <p className="terms-text">
                                MuseCoinX collects and processes personal data from users through a variety of means:
                              </p>

                              <h3 className="terms-subtitle">3.1 Account Information</h3>
                              <p className="terms-text">
                                When users create an account on the Platform, we collect personal details that may include, but are not limited to: Name, Email address, Date of birth, User ID, and Wallet address. This information is necessary for creating and maintaining a user profile, providing access to Platform services, ensuring compliance with regulatory requirements, and enabling transactions within the Platform.
                              </p>

                              <h3 className="terms-subtitle">3.2 Transaction Information</h3>
                              <p className="terms-text">
                                We collect data related to the transactions users make within the Platform, including: Details of Song Tokens (NFTs), including purchases, sales, transfers, and exchanges; Royalty distribution amounts and history; Payment transaction history. This data is essential for processing user transactions, managing royalty distributions, maintaining financial transparency, and ensuring the integrity of financial records.
                              </p>

                              <h3 className="terms-subtitle">3.3 Wallet Information</h3>
                              <p className="terms-text">
                                In order to facilitate NFT transactions and royalty payouts, we collect the public wallet address (public key) of users. This address allows us to securely process payments, ensure proper distribution of royalties, and interact with the blockchain.
                              </p>

                              <h3 className="terms-subtitle">3.4 KYC and Identity Verification Information</h3>
                              <p className="terms-text">
                                In compliance with legal and regulatory obligations, we may collect identity verification details (KYC data), which include, but are not limited to: Government-issued identification; Proof of address; Additional personal information, as required by applicable financial laws.
                              </p>

                              <h3 className="terms-subtitle">3.5 Usage Data</h3>
                              <p className="terms-text">
                                We automatically collect data related to your interaction with the Platform. This includes, but is not limited to: IP address; Device information; Operating system and browser type; Activity logs. This information is used for the purposes of maintaining the security of the Platform, improving the functionality, and tailoring the user experience based on user activity and preferences.
                              </p>
                            </div>

                            {/* 4. Use of Personal Data */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">4. Use of Personal Data</h2>
                              <p className="terms-text">
                                MuseCoinX processes and utilizes personal data for various legitimate purposes, in accordance with applicable data protection laws:
                              </p>

                              <h3 className="terms-subtitle">4.1 Service Provision</h3>
                              <p className="terms-text">
                                We process personal data to: Create and maintain user accounts; Process transactions; Manage royalty distribution; Provide the features and functionality of the Platform.
                              </p>

                              <h3 className="terms-subtitle">4.2 Compliance</h3>
                              <p className="terms-text">
                                In compliance with applicable legal obligations, we process personal data for the purpose of adhering to regulatory requirements, including but not limited to: Anti-money laundering (AML) regulations; Know Your Customer (KYC) requirements; Tax and financial reporting.
                              </p>

                              <h3 className="terms-subtitle">4.3 Communication</h3>
                              <p className="terms-text">
                                We process personal data for the purpose of communicating with you regarding your account, transactions, and any updates related to the Platform. Such communication includes: Transactional communications; User support communications; Promotional communications (if opted in).
                              </p>

                              <h3 className="terms-subtitle">4.4 Platform Improvement</h3>
                              <p className="terms-text">
                                We utilize personal data for analyzing user activity and improving the Platform by: Enhancing user experience; Monitoring performance; Personalization of services.
                              </p>
                            </div>

                            {/* 5. Data Sharing and Third-Party Service Providers */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">5. Data Sharing and Third-Party Service Providers</h2>
                              <p className="terms-text">
                                MuseCoinX may share personal data with third-party service providers or partners under the following conditions:
                              </p>

                              <h3 className="terms-subtitle">5.1 Third-Party Service Providers</h3>
                              <p className="terms-text">
                                We may disclose personal data to third-party vendors and service providers who perform services on our behalf, including but not limited to: Wallet providers; Payment processors; Blockchain platforms. These third-party service providers are contractually obligated to adhere to strict confidentiality agreements.
                              </p>

                              <h3 className="terms-subtitle">5.2 Legal Compliance</h3>
                              <p className="terms-text">
                                We may disclose personal data to third parties as required by law or legal process, including but not limited to: Compliance with legal requests; Court orders or legal proceedings; Investigations into illegal activities.
                              </p>
                            </div>

                            {/* 6. Data Security */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">6. Data Security</h2>
                              <p className="terms-text">
                                MuseCoinX is committed to safeguarding your personal data and employs industry-standard technical, physical, and organizational security measures to protect it from unauthorized access, alteration, disclosure, or destruction. These measures include:
                              </p>
                              <ul className="terms-list">
                                <li>Encryption of all personal data during transmission and storage</li>
                                <li>Strict access controls within the Platform</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>Firewalls, intrusion detection systems, and other technical safeguards</li>
                              </ul>
                              <p className="terms-text">
                                Despite these security measures, MuseCoinX acknowledges that no data transmission or storage system is completely infallible. While we take reasonable steps to protect your personal data, we cannot guarantee absolute security.
                              </p>
                            </div>

                            {/* 7. Data Retention */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">7. Data Retention</h2>
                              <p className="terms-text">
                                MuseCoinX will retain personal data for no longer than is necessary to fulfill the purposes outlined in this Privacy Policy, to comply with our legal obligations, or to resolve disputes. The retention period for personal data will be determined by:
                              </p>
                              <ul className="terms-list">
                                <li>Purpose of Data Collection</li>
                                <li>Legal and Regulatory Obligations</li>
                                <li>Resolution of Disputes</li>
                              </ul>
                              <p className="terms-text">
                                Data retention periods may vary depending on the nature of the data and our legal obligations. For example:
                              </p>
                              <ul className="terms-list">
                                <li>Transaction Data: Typically retained for 5 years for tax and regulatory purposes</li>
                                <li>KYC and AML Data: Retained for at least 5 years after the end of the customer relationship</li>
                              </ul>
                            </div>

                            {/* 8. User Rights */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">8. User Rights</h2>
                              <p className="terms-text">
                                In accordance with Applicable Data Protection Laws, users are granted the following rights:
                              </p>

                              <h3 className="terms-subtitle">8.1 Right to Access</h3>
                              <p className="terms-text">
                                You have the right to obtain confirmation from MuseCoinX as to whether or not personal data concerning you is being processed and to access that data.
                              </p>

                              <h3 className="terms-subtitle">8.2 Right to Rectification</h3>
                              <p className="terms-text">
                                You have the right to request the correction of inaccurate or incomplete personal data.
                              </p>

                              <h3 className="terms-subtitle">8.3 Right to Deletion</h3>
                              <p className="terms-text">
                                Under certain circumstances, you may request the deletion of your personal data.
                              </p>

                              <h3 className="terms-subtitle">8.4 Right to Restrict Processing</h3>
                              <p className="terms-text">
                                You have the right to request that MuseCoinX restrict the processing of your personal data in certain circumstances.
                              </p>

                              <h3 className="terms-subtitle">8.5 Right to Object</h3>
                              <p className="terms-text">
                                You have the right to object to the processing of your personal data based on legitimate interests.
                              </p>

                              <h3 className="terms-subtitle">8.6 Right to Data Portability</h3>
                              <p className="terms-text">
                                You have the right to receive your personal data in a structured, commonly used format.
                              </p>

                              <h3 className="terms-subtitle">8.7 Right to Withdraw Consent</h3>
                              <p className="terms-text">
                                If processing is based on consent, you have the right to withdraw that consent at any time.
                              </p>
                            </div>

                            {/* 9. Cookies and Tracking Technologies */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">9. Cookies and Tracking Technologies</h2>
                              <p className="terms-text">
                                To enhance the user experience, MuseCoinX utilizes cookies and similar tracking technologies. These technologies are used to collect non-personally identifiable information about how users interact with the Platform.
                              </p>
                              <p className="terms-text">
                                The cookies we use may collect data such as: IP address; Device information; Browser type and version; Pages visited and actions taken on the Platform.
                              </p>
                              <p className="terms-text">
                                You can manage your cookie preferences by adjusting the settings in your browser. However, please note that disabling cookies may affect the functionality of certain features on the Platform.
                              </p>
                            </div>

                            {/* 10. Children's Privacy */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">10. Children's Privacy</h2>
                              <p className="terms-text">
                                MuseCoinX is committed to protecting the privacy and safety of children using the Platform. We do not knowingly collect, store, or process personal data from children under the age of 13.
                              </p>
                              <p className="terms-text">
                                If we learn that we have inadvertently collected personal data from a child under the age of 13, we will take immediate action to delete such data from our systems. Our services are intended for use by individuals who are at least 13 years of age.
                              </p>
                            </div>

                            {/* 11. International Data Transfers */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">11. International Data Transfers</h2>
                              <p className="terms-text">
                                MuseCoinX operates on a global scale, and as such, personal data collected from users may be transferred to, and processed in, jurisdictions outside of your country of residence.
                              </p>
                              <p className="terms-text">
                                We ensure that any transfers of personal data are conducted in compliance with the General Data Protection Regulation (GDPR), the UK Data Protection Act 2018, and other relevant data protection laws, including through: Standard Contractual Clauses (SCCs); Adequacy Decisions; Binding Corporate Rules (BCRs).
                              </p>
                            </div>

                            {/* 12. Dispute Resolution */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">12. Dispute Resolution</h2>

                              <h3 className="terms-subtitle">12.1 Arbitration</h3>
                              <p className="terms-text">
                                In the event of any dispute arising out of or relating to this Privacy Policy, the parties agree that such Disputes will be resolved exclusively through binding arbitration conducted in accordance with the Arbitration Act 1996 (UK).
                              </p>

                              <h3 className="terms-subtitle">12.2 Governing Law</h3>
                              <p className="terms-text">
                                This Privacy Policy shall be governed by and construed in accordance with the laws of the United Kingdom without regard to its conflicts of law principles.
                              </p>
                            </div>

                            {/* 13. Updates to the Privacy Policy */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">13. Updates to the Privacy Policy</h2>

                              <h3 className="terms-subtitle">13.1 Right to Modify</h3>
                              <p className="terms-text">
                                MuseCoinX reserves the right to amend, update, or modify this Privacy Policy at any time, with or without notice. Any changes will be posted on the Platform and will be effective immediately upon posting.
                              </p>

                              <h3 className="terms-subtitle">13.2 Continued Use</h3>
                              <p className="terms-text">
                                By continuing to access or use the Platform after modifications to this Privacy Policy, you acknowledge and accept the revised terms.
                              </p>
                            </div>

                            {/* 14. Contact Us */}
                            <div className="terms-section">
                              <h2 className="terms-section-title">14. Contact Us</h2>
                              <p className="terms-text">
                                If you have questions about this Privacy Policy:
                              </p>
                              <ul className="terms-list">
                                <li><strong>Company:</strong> PHYDIGI LIMITED</li>
                                <li><strong>Registered Office:</strong> 128 City Road, London, EC1V 2NX, United Kingdom</li>
                                <li><strong>Email:</strong> contact@musecoinx.com</li>
                                <li><strong>Website:</strong> www.musecoinx.com</li>
                              </ul>
                            </div>

                          </div>

                          <div className="terms-modal-actions">
                            <button
                              className="terms-cancel-btn"
                              onClick={() => setShowPrivacyModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className={`terms-agree-btn ${!hasScrolledPrivacyBottom ? 'disabled' : ''}`}
                              onClick={() => {
                                if (hasScrolledPrivacyBottom) {
                                  setRegisterAcceptedPrivacyPolicy(true);
                                  setShowPrivacyModal(false);
                                  setRegisterTermsErrorPrivacyPolicy(false);
                                }
                              }}
                              disabled={!hasScrolledPrivacyBottom}
                            >
                              I Agree
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                  {registerTermsErrorPrivacyPolicy && (
                    <div className="terms-error">
                      You must accept the Privacy Policy
                    </div>
                  )}

                  {/* Age confirmation checkbox */}
                  <div className="terms-checkbox" style={{ marginTop: '15px' }}>
                    <input
                      type="checkbox"
                      id="confirmAge"
                      checked={acceptedAge}
                      onChange={(e) => {
                        setAcceptedAge(e.target.checked);
                        setAgeError(false);
                      }}
                      disabled={isMinting || isDownloading || isCertificatePreparing}
                    />
                    <label htmlFor="confirmAge">
                      I confirm that I am 18 years of age or older
                    </label>
                  </div>
                  {ageError && (
                    <div className="terms-error">
                      Participation is open only to individuals who are 18 years of age or older at the time of entry.
                    </div>
                  )}

                  <div className="terms-checkbox" style={{ marginTop: '15px' }}>
                    <input
                      type="checkbox"
                      id="subscribeNewsletter"
                      checked={subscribeNewsletter}
                      onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                      disabled={isMinting || isDownloading || isCertificatePreparing}
                    />
                    <label htmlFor="subscribeNewsletter">
                      Subscribe me to the newsletter/promotional emails (optional)
                    </label>
                  </div>
                </div>
              )}
            </>
            : null}

          {/* RainbowKit Connect Button or Mint Button */}
          {!_connected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="mint-btn"
                >
                  Connect Wallet to Mint
                </button>
              )}
            </ConnectButton.Custom>
          ) : (
            <button
              className="mint-btn"
              onClick={mintNFT}
              /*disabled={isMintDisabled} before disable the button*/
               disabled={true}
            >
 
              {isMinting || isConfirming ? 'Minting...' : 'Mint Your KK Hope NFT'}
            </button>
          )}

          {!_connected && (
            <>
              <p id="wallet-warning">Please connect your wallet to mint NFTs</p>
              <div className="wallet-providers">
                <div className="wallet-icon" title="MetaMask">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" />
                </div>
                <div className="wallet-icon" title="Coinbase Wallet">
                  <img src={cb} alt="Coinbase" />
                </div>
                <div className="wallet-icon" title="WalletConnect">
                  <img src={wc} alt="WalletConnect" />
                </div>
              </div>
            </>
          )}

          {/* Download Button - Shows after successful mint */}
          {mintSuccess && (
            <button
              className="download-btn"
              onClick={handleDownload}
              disabled={isDownloadDisabled}
            >
              {isCertificatePreparing ? (
                <span className="preparing-certificate">
                  <span className="spinner"></span> Preparing Certificate...
                </span>
              ) : isDownloading ? (
                <span className="downloading">
                  <span className="spinner"></span> Downloading...
                </span>
              ) : (
                'Download Certificate'
              )}
            </button>
          )}

          {_connected && (
            <div className="combined-price-info">
              {/* Price Display Card */}
              <div className={`price-display ${isFirstMint() ? 'first-mint' : 'standard-price'}`}>
                <div className="price-card">
                  <div className="price-icon">
                    {isFirstMint() ? (
                      <i className="fas fa-gem"></i>
                    ) : (
                      <i className="fas fa-coins"></i>
                    )}
                  </div>
                  <div className="price-content">
                    <h4>{isFirstMint() ? 'Special Offer' : 'Standard Price'}</h4>
                    <div className="price-amount">
                      {formatEther(isFirstMint() ? ((basePrice as bigint) || BigInt(0)) : ((additionalPrice as bigint) || BigInt(0)))} POL
                    </div>
                    {isFirstMint() && (
                      <div className="price-note">
                        <i className="fas fa-info-circle"></i> First mint only
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mint Info Section */}
              <div className="mint-stats-container">
                <div className="mint-stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-label2">Balance</div>
                    <div className="stat-value2">
                      {userMintedCount !== undefined ? userMintedCount.toString() : '0'} NFT{(userMintedCount || BigInt(0)) !== BigInt(1) ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {showWalletPrompt && (
          <div className="wallet-prompt-modal">
            <div className="wallet-prompt-content">
              <h3>Connect Your Wallet</h3>
              <p>To mint your KK Hope NFT, please connect a supported wallet:</p>

              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <div className="wallet-options">
                    <button
                      className="wallet-option"
                      onClick={() => {
                        openConnectModal();
                        setShowWalletPrompt(false);
                      }}
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" />
                      <span>MetaMask</span>
                    </button>

                    <button
                      className="wallet-option"
                      onClick={() => {
                        openConnectModal();
                        setShowWalletPrompt(false);
                      }}
                    >
                      <img src={cb} alt="Coinbase" />
                      <span>Coinbase Wallet</span>
                    </button>

                    <button
                      className="wallet-option"
                      onClick={() => {
                        openConnectModal();
                        setShowWalletPrompt(false);
                      }}
                    >
                      <img src={wc} alt="WalletConnect" />
                      <span>Other Wallets</span>
                    </button>
                  </div>
                )}
              </ConnectButton.Custom>

              <div className="no-wallet-section">
                <button
                  className="no-wallet-btn"
                  onClick={() => setShowWalletHelp(true)}
                >
                  <i className="fas fa-question-circle"></i> I don't have a Crypto Wallet
                </button>
              </div>

              <button
                className="cancel-btn--2"
                onClick={() => setShowWalletPrompt(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Wallet Help Popup */}
        {showWalletHelp && (
          <div className="wallet-help-modal">
            <div className="wallet-help-content">
              <button
                className="close-help-btn"
                onClick={() => setShowWalletHelp(false)}
              >
                <i className="fas fa-times"></i>
              </button>

              <h3>How to Get Started with Crypto Wallets</h3>

              <div className="help-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Install MetaMask</h4>
                  <p>Download the MetaMask extension from the official website:</p>
                  <a
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="help-link"
                  >
                    <i className="fas fa-external-link-alt"></i> metamask.io
                  </a>
                </div>
              </div>

              <div className="help-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Create Your Wallet</h4>
                  <p>Follow the setup instructions and <strong>securely store your recovery phrase</strong> - this is the only way to restore your wallet if you lose access.</p>
                </div>
              </div>

              <div className="help-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Switch to the Polygon Network</h4>
                  <ul className="help-list">
                    <li>Open MetaMask and click the network dropdown</li>
                    <li>Then, select "Polygon" from the list to switch networks</li>
                  </ul>
                </div>
              </div>

              <div className="help-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Get POL Tokens</h4>
                  <p>You'll need Pol tokens for transaction fees. You can purchase them from exchanges like:</p>
                  <div className="exchange-links">
                    <a href="https://www.binance.com/" target="_blank" rel="noopener noreferrer">
                      <img src={binance} alt="Binance" />
                    </a>
                    <a href="https://www.coinbase.com/" target="_blank" rel="noopener noreferrer">
                      <img src={cb} alt="Coinbase" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="help-actions">
                <button
                  className="got-it-btn"
                  onClick={() => {
                    setShowWalletHelp(false);
                    setShowWalletPrompt(false);
                  }}
                >
                  Got it, I'll set up my wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="disclaimer-container">
        <div className="disclaimer-content">
          <p className="disclaimer-text">
            <strong>Disclaimer:</strong> This NFT is a digital collectible and does not represent ownership, equity, or a financial security. Any royalty benefit is conditional and non-guaranteed.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Musecoinx, A PhyDigi company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
