import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain, useDisconnect, useWaitForTransactionReceipt } from 'wagmi';
import { createPublicClient, formatEther, http } from 'viem';
import { polygon } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import contract from '../contractData/contract.json';
import './UserPanel.css';

// Type definitions
interface UserData {
  name?: string;
  email?: string;
  walletAddress?: string;
  tokenIds?: string[];
  totalMinted?: number;
  termsAccepted?: boolean;
}

interface Certificate {
  id: string;
  name: string;
  url: string;
  tokenId: string;
  type: string;
  ipfsUrl?: string;
  localUrl?: string;
}

interface Payout {
  id?: string;
  amount?: number;
  status?: string;
  requestedAt?: string;
  failureReason?: string;
  paypalStatus?: string;
}

interface PayPalData {
  paypalEmail?: string;
  payouts?: Payout[];
  success?: boolean;
}

interface IdentityDocument {
  hasDocument?: boolean;
  verified?: boolean;
  documentType?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  rejectedAt?: string;
  uploadedAt?: string;
  hasBothSides?: boolean;
}

interface TaxIdDocument {
  hasDocument?: boolean;
  verified?: boolean;
  taxIdType?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  rejectedAt?: string;
  uploadedAt?: string;
}

interface PayoutInfo {
  availablePayout?: number;
  totalEligible?: number;
  totalPaidOut?: number;
  sharePercentage?: number;
  minimumPayout?: number;
}

interface PayoutLimits {
  totalLimit?: number;
}

// Contract ABI type
type ContractABI = readonly unknown[];

const website = () => {
  window.open("https://musecoinx.vercel.app/");
}

const EditNameModal = ({ currentName, onSave, onClose }: { currentName: string; onSave: (name: string) => Promise<void>; onClose: () => void }) => {
  const [newName, setNewName] = useState(currentName);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await onSave(newName.trim());
      onClose();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Edit User Name</h3>
          <div
            className="close-modal-btn"
            onClick={onClose}
            style={{ cursor: isUpdating ? 'not-allowed' : 'pointer' }}
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="edit-modal-body">
          <div className="form-group">
            <label>New Name</label>
            <input
              type="text"
              maxLength={20}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              disabled={isUpdating}
            />
          </div>
        </div>
        <div className="edit-modal-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isUpdating || !newName.trim()}
          >
            {isUpdating ? <i className="fas fa-spinner fa-spin"></i> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const NetworkSwitchModal = ({ onSwitchNetwork, onClose, isLoading }: { onSwitchNetwork: () => void; onClose: () => void; isLoading: boolean }) => {
  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Wrong Network</h3>
          <div
            className="close-modal-btn"
            onClick={onClose}
            style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="edit-modal-body">
          <div className="network-warning">
            <i className="fas fa-exclamation-triangle" style={{ color: '#ff6b6b', fontSize: '2rem', marginBottom: '1rem' }}></i>
            <p>You are not connected to the Polygon network.</p>
            <p>Please switch to Polygon to continue using this application.</p>
          </div>
        </div>
        <div className="edit-modal-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={onSwitchNetwork}
            disabled={isLoading}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Switch to Polygon'}
          </button>
        </div>
      </div>
    </div>
  );
};

const NewDash = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('certificates');
  const [totalSupply, setTotalSupply] = useState(0);
  const [_connected, setConnected] = useState(false);
  const { disconnect } = useDisconnect();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isDownloadingArchive, setIsDownloadingArchive] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerMessage, setRegisterMessage] = useState<{ text: string; type: string } | null>(null);
  const [registerAcceptedTerms, setRegisterAcceptedTerms] = useState(false);
  const [registerAcceptedPrivacyPolicy, setRegisterAcceptedPrivacyPolicy] = useState(false);
  const [registerAcceptedAge, setRegisterAcceptedAge] = useState(false);
  const [registerTermsError, setRegisterTermsError] = useState(false);
  const [registerTermsErrorPrivacyPolicy, setRegisterTermsErrorPrivacyPolicy] = useState(false);
  const [registerAgeError, setRegisterAgeError] = useState(false);
  const [registerSubscribe, setRegisterSubscribe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<{ text: string; type: string } | null>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState('');
  const [paypalData, setPaypalData] = useState<PayPalData | null>(null);
  const [cumulativeData, setCumulativeData] = useState<any>(null);

  const [identityDocument, setIdentityDocument] = useState<IdentityDocument | null>(null);
  const [isUploadingIdentity, setIsUploadingIdentity] = useState(false);
  const [identityUploadMessage, setIdentityUploadMessage] = useState<{ text: string; type: string } | null>(null);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [selectedFrontFile, setSelectedFrontFile] = useState<File | null>(null);
  const [selectedBackFile, setSelectedBackFile] = useState<File | null>(null);
  const [frontPreviewUrl, setFrontPreviewUrl] = useState<string | null>(null);
  const [backPreviewUrl, setBackPreviewUrl] = useState<string | null>(null);

  const [taxIdDocument, setTaxIdDocument] = useState<TaxIdDocument | null>(null);
  const [isUploadingTaxId, setIsUploadingTaxId] = useState(false);
  const [taxIdUploadMessage, setTaxIdUploadMessage] = useState<{ text: string; type: string } | null>(null);
  const [showTaxIdModal, setShowTaxIdModal] = useState(false);
  const [selectedTaxIdType, setSelectedTaxIdType] = useState('');
  const [selectedTaxIdFile, setSelectedTaxIdFile] = useState<File | null>(null);
  const [taxIdPreviewUrl, setTaxIdPreviewUrl] = useState<string | null>(null);

  const [paypalEmail, setPaypalEmail] = useState('');
  const [isEditingPayPal, setIsEditingPayPal] = useState(false);
  const [tempPaypalEmail, setTempPaypalEmail] = useState('');
  const [isUpdatingPayPal, setIsUpdatingPayPal] = useState(false);
  const [paypalUpdateMessage, setPaypalUpdateMessage] = useState<{ text: string; type: string } | null>(null);

  const [payoutInfo, setPayoutInfo] = useState<PayoutInfo | null>(null);
  const [payoutHistory, setPayoutHistory] = useState<Payout[]>([]);
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState<{ text: string; type: string } | null>(null);
  const [hasWithdrawnToday, setHasWithdrawnToday] = useState(false);
  const [hasPendingPayout, setHasPendingPayout] = useState(false);

  const [disposalAmount, setDisposalAmount] = useState(0);
  const [payoutLimits, setPayoutLimits] = useState<PayoutLimits | null>(null);

  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const [showWithdrawalPopup, setShowWithdrawalPopup] = useState(false);
  const [activeKycSection, setActiveKycSection] = useState<string | null>(null);
  const [isIdentityExpanded, setIsIdentityExpanded] = useState(false);
  const [isTaxIdExpanded, setIsTaxIdExpanded] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [amountError, setAmountError] = useState<string | null>(null);

  const API_BASE_URL = 'https://muse-be.onrender.com';
  // API_BASE_URL = 'https://muse-be.onrender.com-';

  const { address: walletAddress, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Handle connection and disconnection effects
  useEffect(() => {
    if (isConnected && walletAddress) {
      handleConnect();
    } else {
      setConnected(false);
    }
  }, [isConnected, walletAddress]);

  const fetchCurrentDisposalAmount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payout-limits/current`);
      if (response.ok) {
        const data = await response.json();
        setPayoutLimits(data);
        setDisposalAmount(data.totalLimit || 0);
      }
    } catch (error) {
      console.error('Error fetching disposal amount:', error);
      setDisposalAmount(0);
    }
  };

  async function handleConnect() {
    try {
      if (chainId !== polygon.id) {
        await switchChain?.({ chainId: polygon.id });
      }
      setConnected(true);
    } catch (error: unknown) {
      console.error('Error switching to Polygon:', error);
      setError('Please switch to Polygon network');
    }
  }

  async function disconnectWallet() {
    setConnected(false);
    disconnect();
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

  const publicClient = createPublicClient({
    chain: polygon,
    transport: http()
  });

  const handleRefreshPayoutStatus = async () => {
    try {
      setPaypalUpdateMessage({ text: 'Checking payout status...', type: 'info' });

      const response = await fetch(`${API_BASE_URL}/api/admin/refresh-payout-status/${walletAddress}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (response.ok) {
        setPaypalUpdateMessage({
          text: data.message,
          type: 'success'
        });

        await fetchPayPalData();
      } else {
        setPaypalUpdateMessage({
          text: data.error || 'Failed to refresh status',
          type: 'error'
        });
      }
    } catch (error) {
      setPaypalUpdateMessage({
        text: 'Failed to refresh payout status',
        type: 'error'
      });
    }
  };

  const fetchIdentityStatus = async () => {
    try {
      if (!walletAddress) return;

      const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}/identity-status`);

      if (response.ok) {
        const data = await response.json();
        setIdentityDocument(data);
      }
    } catch (error) {
      console.error('Error fetching identity status:', error);
    }
  };

  const calculateDynamicPayout = (userTokens: number, totalSupply: number, disbursementAmount: number, totalWithdrawn: number = 0) => {
    const validUserTokens = Number(userTokens) || 0;
    const validTotalSupply = Number(totalSupply) || 1;
    const validDisbursementAmount = Number(disbursementAmount) || 0;
    const validTotalWithdrawn = Number(totalWithdrawn) || 0;

    if (validDisbursementAmount === 0) {
      return {
        availableAmount: 0,
        sharePercentage: 0,
        totalEligible: 0
      };
    }

    const sharePercentage = validUserTokens / validTotalSupply;
    const currentDisbursementEligible = validDisbursementAmount * sharePercentage;
    const availableAmount = Math.max(0, currentDisbursementEligible - validTotalWithdrawn);

    const result = {
      availableAmount: Number(availableAmount.toFixed(2)) || 0,
      sharePercentage: Number((sharePercentage * 100).toFixed(3)) || 0,
      totalEligible: Number(currentDisbursementEligible.toFixed(2)) || 0,
      currentDisbursementEligible: Number(currentDisbursementEligible.toFixed(2)) || 0
    };

    return result;
  };

  const handleFrontFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setIdentityUploadMessage({
        text: 'Please select an image file',
        type: 'error'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setIdentityUploadMessage({
        text: 'File size must be less than 5MB',
        type: 'error'
      });
      return;
    }

    setSelectedFrontFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setFrontPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIdentityUploadMessage(null);
  };

  const handleBackFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setIdentityUploadMessage({
        text: 'Please select an image file',
        type: 'error'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setIdentityUploadMessage({
        text: 'File size must be less than 5MB',
        type: 'error'
      });
      return;
    }

    setSelectedBackFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setBackPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIdentityUploadMessage(null);
  };

  const handleTaxIdFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setTaxIdUploadMessage({
        text: 'Please select an image file',
        type: 'error'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setTaxIdUploadMessage({
        text: 'File size must be less than 5MB',
        type: 'error'
      });
      return;
    }

    setSelectedTaxIdFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setTaxIdPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setTaxIdUploadMessage(null);
  };

  const handleDocumentUpload = async () => {
    if (!selectedDocumentType || !selectedFrontFile || !selectedBackFile) {
      setIdentityUploadMessage({
        text: 'Please select document type, front image, and back image',
        type: 'error'
      });
      return;
    }

    try {
      setIsUploadingIdentity(true);
      setIdentityUploadMessage({
        text: 'Uploading document...',
        type: 'info'
      });

      const frontReader = new FileReader();
      frontReader.onload = async (e) => {
        try {
          const requestBody = {
            documentType: selectedDocumentType,
            frontImage: e.target?.result
          };

          if (selectedBackFile) {
            const backReader = new FileReader();
            backReader.onload = async (backEvent) => {
              try {
                (requestBody as any).backImage = backEvent.target?.result;
                await submitIdentityDocument(requestBody);
              } catch (backError) {
                console.error('Back image processing error:', backError);
                setIdentityUploadMessage({
                  text: 'Failed to process back image',
                  type: 'error'
                });
                setIsUploadingIdentity(false);
              }
            };
            backReader.readAsDataURL(selectedBackFile);
          } else {
            await submitIdentityDocument(requestBody);
          }
        } catch (frontError) {
          console.error('Front image processing error:', frontError);
          setIdentityUploadMessage({
            text: 'Failed to process front image',
            type: 'error'
          });
          setIsUploadingIdentity(false);
        }
      };

      frontReader.readAsDataURL(selectedFrontFile);

    } catch (error) {
      console.error('Error uploading document:', error);
      setIdentityUploadMessage({
        text: 'Failed to upload document',
        type: 'error'
      });
      setIsUploadingIdentity(false);
    }
  };

  const submitIdentityDocument = async (requestBody: unknown) => {
    const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}/upload-identity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setIdentityUploadMessage({
        text: 'Document uploaded successfully! Verification pending.',
        type: 'success'
      });

      await fetchIdentityStatus();

      setTimeout(() => {
        setShowIdentityModal(false);
        setSelectedFrontFile(null);
        setSelectedBackFile(null);
        setFrontPreviewUrl(null);
        setBackPreviewUrl(null);
        setSelectedDocumentType('');
      }, 2000);

    } else {
      setIdentityUploadMessage({
        text: data.error || 'Failed to upload document',
        type: 'error'
      });
    }
    setIsUploadingIdentity(false);
  };

  const handleTaxIdUpload = async () => {
    if (!selectedTaxIdType || !selectedTaxIdFile) {
      setTaxIdUploadMessage({
        text: 'Please select tax ID type and document image',
        type: 'error'
      });
      return;
    }

    try {
      setIsUploadingTaxId(true);
      setTaxIdUploadMessage({
        text: 'Uploading tax ID document...',
        type: 'info'
      });

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}/upload-tax-id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              taxIdType: selectedTaxIdType,
              documentImage: e.target?.result
            })
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setTaxIdUploadMessage({
              text: 'Tax ID document uploaded successfully! Verification pending.',
              type: 'success'
            });

            await fetchTaxIdStatus();

            setTimeout(() => {
              setShowTaxIdModal(false);
              setSelectedTaxIdFile(null);
              setTaxIdPreviewUrl(null);
              setSelectedTaxIdType('');
            }, 2000);

          } else {
            setTaxIdUploadMessage({
              text: data.error || 'Failed to upload tax ID document',
              type: 'error'
            });
          }
        } catch (uploadError) {
          console.error('Tax ID upload error:', uploadError);
          setTaxIdUploadMessage({
            text: 'Failed to upload tax ID document',
            type: 'error'
          });
        } finally {
          setIsUploadingTaxId(false);
        }
      };

      reader.readAsDataURL(selectedTaxIdFile);

    } catch (error) {
      console.error('Error uploading tax ID document:', error);
      setTaxIdUploadMessage({
        text: 'Failed to upload tax ID document',
        type: 'error'
      });
      setIsUploadingTaxId(false);
    }
  };

  const fetchTaxIdStatus = async () => {
    try {
      if (!walletAddress) return;

      const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}/tax-id-status`);

      if (response.ok) {
        const data = await response.json();
        setTaxIdDocument(data);
      }
    } catch (error) {
      console.error('Error fetching tax ID status:', error);
    }
  };

  // FIXED: handleWithdrawPayout function - Replace your existing one with this
  const handleWithdrawPayout = async () => {
    try {
      setAmountError(null);

      if (!withdrawalAmount || withdrawalAmount === '') {
        setPaypalUpdateMessage({
          text: 'Please enter a withdrawal amount',
          type: 'error'
        });
        return;
      }

      const requestedAmount = parseFloat(withdrawalAmount);

      if (isNaN(requestedAmount) || requestedAmount <= 0) {
        setPaypalUpdateMessage({
          text: 'Please enter a valid amount',
          type: 'error'
        });
        return;
      }

      const currentTotalSupply = Number(totalSupplyFromContract) || Number(totalSupply) || 1;
      const calculation = calculateDynamicPayout(
        userData?.totalMinted || 0,
        currentTotalSupply,
        disposalAmount || 0,
        totalWithdrawn || 0
      );

      const availableAmount = calculation?.availableAmount || 0;

      // Use cumulative data if available (more accurate)
      const availableForWithdrawal = cumulativeData?.cumulativeAvailable || availableAmount;

      // ✅ FIXED: Removed minimum withdrawal check - allow any amount >= $0.01
      if (requestedAmount < 0.01) {
        setPaypalUpdateMessage({
          text: 'Minimum withdrawal amount is $0.01',
          type: 'error'
        });
        return;
      }

      if (requestedAmount > availableForWithdrawal) {
        setPaypalUpdateMessage({
          text: `Amount exceeds available balance of $${availableForWithdrawal.toFixed(2)}`,
          type: 'error'
        });
        return;
      }

      if (!paypalEmail) {
        setPaypalUpdateMessage({
          text: 'Please set your PayPal email first',
          type: 'error'
        });
        return;
      }

      if (!identityDocument?.verified) {
        setPaypalUpdateMessage({
          text: 'Identity verification required before withdrawals',
          type: 'error'
        });
        return;
      }

      if (!taxIdDocument?.verified) {
        setPaypalUpdateMessage({
          text: 'Tax ID verification required before withdrawals',
          type: 'error'
        });
        return;
      }

      if (hasWithdrawnToday) {
        setPaypalUpdateMessage({
          text: 'You have already withdrawn today. Please try again tomorrow.',
          type: 'error'
        });
        return;
      }

      if (hasPendingPayout) {
        setPaypalUpdateMessage({
          text: 'You have a pending payout. Please wait for it to complete.',
          type: 'error'
        });
        return;
      }

      setIsRequestingPayout(true);
      setPaypalUpdateMessage({
        text: `Processing withdrawal of $${requestedAmount.toFixed(2)}...`,
        type: 'info'
      });

      const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}/request-payout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: requestedAmount
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success === true && data.status === 'completed') {
          setPaypalUpdateMessage({
            text: `🎉 Success! $${data.amount.toFixed(2)} has been sent to your PayPal. ${data.remainingBalance > 0 ? `Remaining balance: $${data.remainingBalance.toFixed(2)}` : ''}`,
            type: 'success'
          });
        } else {
          setPaypalUpdateMessage({
            text: `⏳ Withdrawal request of $${data.amount.toFixed(2)} has been submitted and is being processed. You will be notified once completed.`,
            type: 'info'
          });
        }

        setWithdrawalAmount('');

        await fetchCumulativeBalance();
        await fetchPayPalData();
        await fetchUserData();
        await fetchCurrentDisposalAmount();

        if (paypalData?.payouts) {
          const pending = paypalData.payouts.find((p: Payout) =>
            p.status === 'pending' ||
            p.status === 'processing' ||
            p.paypalStatus === 'PENDING'
          );
          setHasPendingPayout(!!pending);
        }

      } else {
        let errorMessage = data.error || 'Failed to process withdrawal. Please try again.';

        if (data.failureReason) {
          errorMessage = `Withdrawal failed: ${data.failureReason}`;
        } else if (data.paypalStatus === 'DENIED') {
          errorMessage = 'Withdrawal was denied by PayPal. Please check your PayPal account status.';
        }

        setPaypalUpdateMessage({
          text: errorMessage,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setPaypalUpdateMessage({
        text: 'Network error. Please check your connection and try again.',
        type: 'error'
      });
    } finally {
      setIsRequestingPayout(false);
    }
  };

  // ✅ FIXED: validateAmount function - Replace your existing one with this
  const validateAmount = (value: string) => {
    const amount = parseFloat(value);

    if (isNaN(amount)) {
      setAmountError(null);
      return;
    }

    // Use cumulative data if available
    let availableAmount = 0;

    if (cumulativeData && cumulativeData.success) {
      availableAmount = cumulativeData.cumulativeAvailable || 0;
    } else {
      const currentTotalSupply = Number(totalSupplyFromContract) || Number(totalSupply) || 1;
      const calculation = calculateDynamicPayout(
        userData?.totalMinted || 0,
        currentTotalSupply,
        disposalAmount || 0,
        totalWithdrawn || 0
      );
      availableAmount = calculation?.availableAmount || 0;
    }

    console.log('🔍 VALIDATE AMOUNT:', {
      inputAmount: amount,
      availableAmount,
      usingCumulativeData: !!(cumulativeData && cumulativeData.success)
    });

    // ✅ FIXED: Minimum is now $0.01 instead of $1
    if (amount < 0.01) {
      setAmountError('Minimum withdrawal amount is $0.01');
    } else if (amount > availableAmount) {
      setAmountError(`Amount exceeds available balance of $${availableAmount.toFixed(2)}`);
    } else {
      setAmountError(null);
    }
  };

  const { data: totalSupplyFromContract } = useReadContract({
    address: contract.address as `0x${string}`,
    abi: contract.abi as unknown as ContractABI,
    functionName: 'totalSupply',
  });

  const getTokenIdsForWallet = async (wallet: string) => {
    try {
      const balance = await publicClient.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi as unknown as ContractABI,
        functionName: 'balanceOf',
        args: [wallet as `0x${string}`]
      } as never);

      const actualTokenCount = Number(balance);
      if (actualTokenCount === 0) return [];

      const tokenIds = await publicClient.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi as unknown as ContractABI,
        functionName: 'getWalletTokenIds',
        args: [wallet as `0x${string}`]
      } as never);

      const stringTokenIds = (tokenIds as unknown[]).map(id => id.toString());
      const uniqueTokenIds = [...new Set(stringTokenIds)];

      const verifiedTokenIds = [];
      for (const tokenId of uniqueTokenIds) {
        try {
          const owner = await publicClient.readContract({
            address: contract.address as `0x${string}`,
            abi: contract.abi as unknown as ContractABI,
            functionName: 'ownerOf',
            args: [tokenId]
          } as never);

          if ((owner as string).toLowerCase() === wallet.toLowerCase()) {
            verifiedTokenIds.push(tokenId);
          }
        } catch (error) {
          console.error(`Error checking ownership of token ${tokenId}:`, error);
        }
      }

      if (verifiedTokenIds.length !== actualTokenCount) {
        console.warn(`Mismatch: balanceOf=${actualTokenCount}, verified=${verifiedTokenIds.length}`);
      }

      return verifiedTokenIds;
    } catch (err) {
      console.error('Error fetching token IDs:', err);
      return [];
    }
  };

  const getTotalSupply = async () => {
    try {
      const supply = await publicClient.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi as unknown as ContractABI,
        functionName: 'totalSupply'
      } as never);
      return Number(supply);
    } catch (err) {
      console.error('Error fetching total supply:', err);
      return 0;
    }
  };

  const fetchPayoutInfo = async () => {
    try {
      if (!userData?.email) return;

      const response = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(userData.email)}/payout-info`);
      if (response.ok) {
        const data = await response.json();
        setPayoutInfo(data.payoutInfo);
        setPayoutHistory(data.payoutHistory);
      } else {
        setPayoutInfo({
          availablePayout: 0,
          totalEligible: 0,
          totalPaidOut: 0,
          sharePercentage: 0,
          minimumPayout: 1.00
        });
        setPayoutHistory([]);
      }
    } catch (error) {
      console.error('Error fetching payout info:', error);
      setPayoutInfo({
        availablePayout: 0,
        totalEligible: 0,
        totalPaidOut: 0,
        sharePercentage: 0,
        minimumPayout: 1.00
      });
      setPayoutHistory([]);
    }
  };

  const handleRequestPayout = async () => {
    try {
      setIsRequestingPayout(true);
      setPayoutMessage(null);

      const response = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(userData?.email || '')}/request-payout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        setPayoutMessage({
          text: `Payout request submitted successfully! $${data.amount.toFixed(2)} will be sent to your PayPal account.`,
          type: 'success'
        });
        await fetchPayoutInfo();
      } else {
        setPayoutMessage({
          text: data.error || 'Failed to process payout request',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error requesting payout:', error);
      setPayoutMessage({
        text: 'Failed to process payout request',
        type: 'error'
      });
    } finally {
      setIsRequestingPayout(false);
    }
  };

  const handleDownloadArchive = async () => {
    try {
      if (!userData?.email) {
        setError('Email is required to download archive');
        return;
      }

      setIsDownloadingArchive(true);
      setError(null);

      setDownloadNotification({
        text: 'Preparing your download...',
        type: 'info'
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000);

      const response = await fetch(
        `${API_BASE_URL}/api/users/${encodeURIComponent(userData.email)}/download-archive`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const contentLength = response.headers.get('content-length');
      const totalBytes = parseInt(contentLength || '0', 10);
      let receivedBytes = 0;

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedBytes += value.length;

        if (totalBytes) {
          const percentComplete = Math.round((receivedBytes / totalBytes) * 100);
          setDownloadNotification({
            text: `Downloading... ${percentComplete}% complete`,
            type: 'info'
          });
        }
      }

      const blob = new Blob(chunks);
      const blobUrl = window.URL.createObjectURL(blob);

      const fileName = `hope_archive_${userData.name?.replace(/[^a-z0-9]/gi, '_') || 'user'}.zip`;
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);

      setDownloadedFileName(fileName);
      setShowDownloadSuccess(true);
      setDownloadNotification(null);

    } catch (err: unknown) {
      console.error('Archive download failed:', err);
      let errorMessage = 'Download failed: ';

      if (err instanceof Error && err.name === 'AbortError') {
        errorMessage = 'Download timed out. Please try again.';
      } else if (err instanceof Error && err.message.includes('404')) {
        errorMessage = 'User data not found. Please ensure you have minted NFTs.';
      } else if (err instanceof Error && err.message.includes('500')) {
        errorMessage = 'Server error occurred. Please try again later.';
      } else {
        errorMessage += err instanceof Error ? err.message : 'Unknown error';
      }

      setError(errorMessage);
      setDownloadNotification({
        text: errorMessage,
        type: 'error'
      });
    } finally {
      setIsDownloadingArchive(false);
    }
  };

  const processCertificates = (tokenIds: string[], certificatesFromAPI: unknown[]) => {
    const certMap = new Map();
    certificatesFromAPI.forEach((cert: any) => {
      certMap.set(cert.tokenId, cert);
    });

    return tokenIds.map(tokenId => {
      const certData = certMap.get(tokenId);
      return {
        id: tokenId,
        name: `MUSE Certificate #${tokenId}`,
        url: certData?.ipfsUrl || certData?.localUrl || '',
        tokenId: tokenId,
        type: 'ownership-certificate'
      };
    });
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching user data for wallet:', walletAddress);

      let userDetails = null;
      try {
        const userResponse = await fetch(`${API_BASE_URL}/api/users/wallet/${walletAddress}`);
        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
        userDetails = await userResponse.json();
        console.log('User details from Firebase:', userDetails);
      } catch (userError) {
        console.warn('Error fetching user details:', userError);
      }

      const [tokenIds, totalSupplyCount] = await Promise.all([
        getTokenIdsForWallet(walletAddress || ''),
        getTotalSupply()
      ]);
      console.log('Token IDs from blockchain:', tokenIds);
      console.log('Total supply:', totalSupplyCount);
      setTotalSupply(totalSupplyCount);

      if (userDetails) {
        setUserData({
          ...userDetails,
          walletAddress,
          tokenIds,
          totalMinted: tokenIds.length
        });
      } else {
        setUserData({
          walletAddress,
          name: 'Anonymous',
          email: '',
          tokenIds,
          totalMinted: tokenIds.length
        });
      }

      let certificates: Certificate[] = [];
      if (tokenIds.length > 0 && userDetails) {
        try {
          const certsResponse = await fetch(`${API_BASE_URL}/api/certificates/batch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tokenIds })
          });
          if (certsResponse.ok) {
            const certsData = await certsResponse.json();
            certificates = certsData.certificates.map((cert: any) => ({
              ...cert,
              id: cert.tokenId,
              name: `KK's Hope Certificate #${cert.tokenId}`,
              url: cert.ipfsUrl || cert.localUrl || cert.url || ''
            }));
          }
        } catch (certError) {
          console.warn('Error fetching certificates:', certError);
        }
      }
      setCertificates(certificates);
    } catch (err: unknown) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string, name: string) => {
    try {
      if (!url) {
        throw new Error('Certificate URL is not available');
      }

      console.log('Downloading certificate from:', url);

      const downloadUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${name.replace(/[^a-z0-9]/gi, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err: unknown) {
      console.error('Download failed:', err);
      setError(`Failed to download certificate: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleView = (url: string) => {
    try {
      if (!url) {
        throw new Error('Certificate URL is not available');
      }

      console.log('Viewing certificate:', url);

      const viewUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
      window.open(viewUrl, '_blank');
    } catch (err: unknown) {
      console.error('View failed:', err);
      setError(`Failed to view certificate: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleNameUpdate = async (newName: string) => {
    try {
      if (!userData?.email) throw new Error('User email not found');

      const updatePromises = (userData.tokenIds || []).map(async (tokenId) => {
        const response = await fetch(`${API_BASE_URL}/api/users/${userData.email}/update-name`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newName: newName,
            tokenId: tokenId
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to update certificate for token ${tokenId}`);
        }
        return response.json();
      });

      await Promise.all(updatePromises);

      await fetchUserData();
    } catch (error: unknown) {
      console.error('Error updating name:', error);
      setError(`Failed to update name: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  const calculateSharePercentage = (userMinted: number, totalSupply: number) => {
    if (totalSupply === 0) return 0;
    return ((userMinted / 25000) * 100).toFixed(3);
  };

  const calculateRoyaltiesEarned = (userMinted: number, totalSupply: number) => {
    if (totalSupply === 0) return 0;
    return ((25000 * userMinted) / totalSupply).toFixed(2);
  };

  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  const fetchCumulativeBalance = async () => {
    try {
      if (!walletAddress) return;

      console.log('📊 Fetching cumulative balance for:', walletAddress);

      const response = await fetch(
        `${API_BASE_URL}/api/paypal/${walletAddress}/cumulative-breakdown`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Cumulative data received:', data);
        setCumulativeData(data);
      } else {
        console.error('Failed to fetch cumulative data');
        setCumulativeData(null);
      }
    } catch (error) {
      console.error('Error fetching cumulative balance:', error);
      setCumulativeData(null);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchUserData();
      fetchPayPalData();
      fetchIdentityStatus();
      fetchTaxIdStatus();
      fetchCurrentDisposalAmount();
      fetchCumulativeBalance();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (userData?.email) {
      fetchPayoutInfo();
    }

    if (userData && walletAddress) {
      fetchPayPalData();
    }
  }, [userData, walletAddress]);

  const handleStartEditingPayPal = () => {
    setTempPaypalEmail(paypalEmail || '');
    setIsEditingPayPal(true);
    setPaypalUpdateMessage(null);
  };

  const handleCancelEditingPayPal = () => {
    setIsEditingPayPal(false);
    setTempPaypalEmail('');
    setPaypalUpdateMessage(null);
  };

  const handleSavePayPalEmail = async () => {
    try {
      setIsUpdatingPayPal(true);
      setPaypalUpdateMessage(null);

      const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paypalEmail: tempPaypalEmail.trim() })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPaypalEmail(tempPaypalEmail.trim());
        setIsEditingPayPal(false);

        await fetchPayPalData();

        setPaypalUpdateMessage({
          text: 'PayPal email updated successfully!',
          type: 'success'
        });

        setTimeout(() => {
          setPaypalUpdateMessage(null);
        }, 3000);

      } else {
        setPaypalUpdateMessage({
          text: data.error || 'Failed to update PayPal email',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating PayPal email:', error);
      setPaypalUpdateMessage({
        text: 'Failed to update PayPal email',
        type: 'error'
      });
    } finally {
      setIsUpdatingPayPal(false);
    }
  };

  const fetchPayPalData = async () => {
    try {
      if (!walletAddress) {
        console.log('❌ No wallet address, skipping PayPal data fetch');
        return;
      }

      console.log('🔗 Fetching PayPal data for wallet:', walletAddress);

      const response = await fetch(`${API_BASE_URL}/api/paypal/${walletAddress}`);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ PayPal data received from API:', data);

        setPaypalData(data);

        if (data.paypalEmail) {
          setPaypalEmail(data.paypalEmail);
          console.log('✅ Updated paypalEmail state to:', data.paypalEmail);
        } else {
          setPaypalEmail('');
          console.log('✅ No PayPal email found, set to empty');
        }

        const successfulPayouts = data.payouts || [];
        const totalWithdrawnAmount = successfulPayouts
          .filter((payout: Payout) => payout.status === 'success')  // Only 'success' now
          .reduce((total: number, payout: Payout) => total + (payout.amount || 0), 0);

        console.log('🔍 DEBUG totalWithdrawn calculation:', {
          allPayouts: successfulPayouts.length,
          successfulPayouts: successfulPayouts.filter((p: Payout) => p.status === 'completed' || p.status === 'success'),
          totalWithdrawnAmount
        });

        const latestFailedPayout = successfulPayouts
          .filter((payout: Payout) => payout.status === 'failed')
          .sort((a: Payout, b: Payout) => new Date(b.requestedAt || '').getTime() - new Date(a.requestedAt || '').getTime())[0];

        if (latestFailedPayout && latestFailedPayout.failureReason) {
          setPaypalUpdateMessage({
            text: `Last withdrawal failed: ${latestFailedPayout.failureReason}. You can try again.`,
            type: 'error'
          });

          setTimeout(() => {
            setPaypalUpdateMessage(null);
          }, 10000);
        }

        setTotalWithdrawn(totalWithdrawnAmount);
        console.log('✅ Total withdrawn amount:', totalWithdrawnAmount);

        const pendingPayouts = successfulPayouts.filter((payout: Payout) =>
          payout.status === 'pending' ||
          payout.status === 'PENDING' ||
          payout.paypalStatus === 'PENDING'
        );

        const hasPending = pendingPayouts.length > 0;
        setHasPendingPayout(hasPending);
        console.log('✅ Has pending payout:', hasPending);

        if (hasPending) {
          console.log('⏳ Pending payouts found:', pendingPayouts);
        }

      } else if (response.status === 404) {
        console.log('📭 No PayPal data found for this wallet');
        setPaypalData(null);
        setPaypalEmail('');
        setTotalWithdrawn(0);
        setHasPendingPayout(false);
      } else {
        console.error('❌ Error fetching PayPal data:', response.status);
        setPaypalData(null);
        setPaypalEmail('');
        setTotalWithdrawn(0);
        setHasPendingPayout(false);
      }
    } catch (error) {
      console.error('❌ Error fetching PayPal data:', error);
      setPaypalData(null);
      setPaypalEmail('');
      setTotalWithdrawn(0);
      setHasPendingPayout(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSavePayPalEmail();
    } else if (e.key === 'Escape') {
      handleCancelEditingPayPal();
    }
  };

  const PayoutHistory = () => {
    const payouts = paypalData?.payouts || [];

    if (payouts.length === 0) {
      return (
        <div className="no-payouts">
          <p>No payouts yet</p>
        </div>
      );
    }

    return (
      <div className="payout-history">
        <h4>Recent Payouts</h4>
        {payouts.slice(-3).map((payout: Payout, index: number) => (
          <div key={payout.id || index} className="payout-item">
            <span className="amount">${payout.amount?.toFixed(2)}</span>
            <span className={`status ${payout.status}`}>{payout.status}</span>
            <span className="date">
              {new Date(payout.requestedAt || '').toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const InlinePayPalEmail = () => (
    <div className="paypal-email-section">
      <div className="paypal-email-info">
        <span className="paypal-label">PayPal Email:</span>

        {isEditingPayPal ? (
          <div className="paypal-edit-container">
            <input
              type="email"
              value={tempPaypalEmail}
              onChange={(e) => setTempPaypalEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your PayPal email"
              disabled={isUpdatingPayPal}
              autoFocus
              className="paypal-edit-input"
            />
            <div className="paypal-edit-actions">
              <button
                className="paypal-save-btn"
                onClick={handleSavePayPalEmail}
                disabled={isUpdatingPayPal || !tempPaypalEmail.trim()}
              >
                {isUpdatingPayPal ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-check"></i>}
              </button>
              <button
                className="paypal-cancel-btn"
                onClick={handleCancelEditingPayPal}
                disabled={isUpdatingPayPal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="paypal-email-display">
              {paypalEmail || 'Not set'}
            </span>
            <button
              className="edit-paypal-btn"
              onClick={handleStartEditingPayPal}
              type="button"
            >
              <i className="fas fa-edit"></i>
            </button>
          </>
        )}
      </div>

      {isEditingPayPal && (
        <div className="paypal-help-text">
          Press Enter to save, Escape to cancel
        </div>
      )}
    </div>
  );

  const Notification = ({ message, onClose }: { message: { text: string; type: string } | null; onClose: () => void }) => {
    if (!message) return null;

    return (
      <div className={`download-notification ${message.type}`}>
        <div className="notification-content">
          {message.text}
        </div>
      </div>
    );
  };

  const DownloadSuccessModal = ({ fileName, onClose, onOpenDownloads }: { fileName: string; onClose: () => void; onOpenDownloads: () => void }) => {
    const getDownloadPath = () => {
      const platform = navigator.platform.toLowerCase();
      if (platform.includes('win')) {
        return `Downloads\\${fileName}`;
      } else if (platform.includes('mac')) {
        return `Downloads/${fileName}`;
      } else {
        return `Downloads/${fileName}`;
      }
    };

    const getBrowserInstructions = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('chrome')) {
        return "Press Ctrl+J (Windows/Linux) or Cmd+Shift+J (Mac) to open Chrome downloads";
      } else if (userAgent.includes('firefox')) {
        return "Press Ctrl+Shift+Y (Windows/Linux) or Cmd+Shift+Y (Mac) to open Firefox downloads";
      } else if (userAgent.includes('safari')) {
        return "Press Cmd+Option+L to open Safari downloads";
      } else if (userAgent.includes('edge')) {
        return "Press Ctrl+J to open Edge downloads";
      } else {
        return "Check your browser's download history to locate the file";
      }
    };

    return (
      <div className="download-success-modal-overlay">
        <div className="download-success-modal">
          <div className="download-success-header">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Download Completed Successfully!</h3>
            <div
              className="close-modal-btn"
              onClick={onClose}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>

          <div className="download-success-body">
            <div className="file-info">
              <div className="file-icon">
                <i className="fas fa-file-archive"></i>
              </div>
              <div className="file-details">
                <div className="file-name">{fileName}</div>
                <div className="file-path">
                  <span className="path-label">Saved to:</span>
                  <span className="path-value">{getDownloadPath()}</span>
                </div>
              </div>
            </div>

            <div className="download-instructions">
              <p>{getBrowserInstructions()}</p>
            </div>
          </div>

          <div className="download-success-footer">
            <button
              className="done-btn"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleRegisterSubmit = async () => {
    if (!registerAcceptedTerms) {
      setRegisterTermsError(true);
      setRegisterMessage({
        text: 'Please accept the Terms and Conditions',
        type: 'error'
      });
      return;
    }

    if (!registerAcceptedPrivacyPolicy) {
      setRegisterTermsErrorPrivacyPolicy(true);
      setRegisterMessage({
        text: 'Please accept the Privacy Policy',
        type: 'error'
      });
      return;
    }

    if (!registerAcceptedAge) {
      setRegisterAgeError(true);
      setRegisterMessage({
        text: 'You must confirm you are 18+ to register',
        type: 'error'
      });
      return;
    }

    if (!registerName.trim()) {
      setRegisterMessage({
        text: 'Please enter your name',
        type: 'error'
      });
      return;
    }

    if (!registerEmail.trim()) {
      setRegisterMessage({
        text: 'Please enter your email address',
        type: 'error'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setRegisterMessage({
        text: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    try {
      setIsRegistering(true);
      setRegisterMessage({
        text: 'Registering your account...',
        type: 'info'
      });

      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerName.trim(),
          email: registerEmail.toLowerCase(),
          walletAddress: walletAddress,
          ageConfirmed: registerAcceptedAge,
          termsAccepted: registerAcceptedTerms,
          privacyPolicyAccepted: registerAcceptedPrivacyPolicy,
          subscribe: registerSubscribe
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRegisterMessage({
          text: 'Registration successful!',
          type: 'success'
        });
        setTimeout(() => {
          setShowRegisterModal(false);
          fetchUserData();
        }, 1500);
      } else {
        setRegisterMessage({
          text: data.error || 'Registration failed',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterMessage({
        text: 'Registration failed. Please try again.',
        type: 'error'
      });
    } finally {
      setIsRegistering(false);
    }
  };

  if (!walletAddress) {
    return (
      <div className="user-panel-container">
        <header className="user-panel-header">
          <div className="user-panel-title">
            <h1 onClick={website}>My Dashboard</h1>
          </div>

          <ConnectButton.Custom>
            {({ openConnectModal, account }) => {
              const connected = !!account;

              return connected ? (
                <button
                  className="connect-wallet-btn"
                  onClick={disconnectWallet}
                >
                  <i className="fas fa-wallet"></i> {shortenAddress(account.address)}
                </button>
              ) : (
                <button
                  className="connect-wallet-btn"
                  onClick={openConnectModal}
                >
                  <i className="fas fa-wallet"></i> Connect Wallet
                </button>
              );
            }}
          </ConnectButton.Custom>
        </header>
        <div className="user-panel-content">
          <div className="empty-state">
            <i className="fas fa-wallet"></i>
            <h3>Wallet Not Connected</h3>
            <p>Please connect your wallet to view your account details and certificates.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-panel-container">
        <header className="user-panel-header">
          <div className="user-panel-title">
            <h1 onClick={website}>My Dashboard</h1>
          </div>

          <ConnectButton.Custom>
            {({ openConnectModal, account }) => {
              const connected = !!account;

              return connected ? (
                <button
                  className="connect-wallet-btn"
                  onClick={disconnectWallet}
                >
                  <i className="fas fa-wallet"></i> {shortenAddress(account.address)}
                </button>
              ) : (
                <button
                  className="connect-wallet-btn"
                  onClick={openConnectModal}
                >
                  <i className="fas fa-wallet"></i> Connect Wallet
                </button>
              );
            }}
          </ConnectButton.Custom>
        </header>
        <div className="user-panel-content">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#6165B5' }}></i>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-panel-container">
        <header className="user-panel-header">
          <div className="user-panel-title">
            <h1 onClick={website}>My Dashboard</h1>
          </div>

          <ConnectButton.Custom>
            {({ openConnectModal, account }) => {
              const connected = !!account;

              return connected ? (
                <button
                  className="connect-wallet-btn"
                  onClick={disconnectWallet}
                >
                  <i className="fas fa-wallet"></i> {shortenAddress(account.address)}
                </button>
              ) : (
                <button
                  className="connect-wallet-btn"
                  onClick={openConnectModal}
                >
                  <i className="fas fa-wallet"></i> Connect Wallet
                </button>
              );
            }}
          </ConnectButton.Custom>
        </header>
        <div className="user-panel-content">
          <div className="empty-state">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button className="refresh-btn" onClick={fetchUserData}>
              <i className="fas fa-sync-alt"></i> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-panel-container">
      <header className="user-panel-header">
        <div className="user-panel-title">
          <h1 onClick={website}>My Dashboard</h1>
        </div>

        <ConnectButton.Custom>
          {({ openConnectModal, account }) => {
            const connected = !!account;

            return connected ? (
              <button
                className="connect-wallet-btn"
                onClick={disconnectWallet}
              >
                <i className="fas fa-wallet"></i> {shortenAddress(account.address)}
              </button>
            ) : (
              <button
                className="connect-wallet-btn"
                onClick={openConnectModal}
              >
                <i className="fas fa-wallet"></i> Connect Wallet
              </button>
            );
          }}
        </ConnectButton.Custom>
      </header>

      <div className="user-panel-content">
        <div className="user-dashboard">
          {/* Sidebar with user profile */}
          <div className="user-sidebar">
            <div className="user-profile">
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="userNameEdit">
                <h3 className="user-name">{userData?.name || 'Anonymous'}</h3>
              </div>
              <div className="user-wallet">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            </div>

            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-label">NFTs Owned:</span>
                <span className="stat-value">{userData?.totalMinted || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Equivalent in $MUSE:</span>
                <span className="stat-value">-</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Equivalent in USD:</span>
                <span className="stat-value">
                  ${(() => {
                    try {
                      // Use cumulative data from backend
                      if (cumulativeData && cumulativeData.success) {
                        return cumulativeData.cumulativeAvailable.toFixed(2);
                      }
                      // Fallback
                      if (!disposalAmount || disposalAmount <= 0) {
                        return '0.00';
                      }
                      const currentTotalSupply = Number(totalSupplyFromContract) || Number(totalSupply) || 1;
                      const calculation = calculateDynamicPayout(
                        userData?.totalMinted || 0,
                        currentTotalSupply,
                        disposalAmount || 0,
                        totalWithdrawn || 0
                      );
                      return (calculation?.availableAmount || 0).toFixed(2);
                    } catch (error) {
                      console.error('Error displaying USD equivalent:', error);
                      return '0.00';
                    }
                  })()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Muse coin balance:</span>
                <span className="stat-value">-</span>
              </div>
            </div>

            <button
              className="marketplace-btn"
            >
              <i className="fas fa-store"></i> Visit the Marketplace
            </button>
          </div>

          {/* Main content area */}
          <div className="user-main">
            <div className="section-header">
              <div className="tabs-container">
                <button
                  className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('certificates')}
                >
                  <i className="fas fa-certificate"></i> My Certificates
                </button>

                <button
                  className={`tab-btn ${activeTab === 'kyc' ? 'active' : ''}`}
                  onClick={() => setActiveTab('kyc')}
                >
                  <i className="fas fa-id-card"></i> KYC Verification
                </button>

                <button
                  className={`tab-btn ${activeTab === 'royalties' ? 'active' : ''}`}
                  onClick={() => setActiveTab('royalties')}
                  disabled={!identityDocument?.verified || !taxIdDocument?.verified}
                  title={!identityDocument?.verified || !taxIdDocument?.verified ? "KYC should be verified" : ""}
                >
                  <i className="fas fa-coins"></i> Royalties
                </button>
              </div>

              <button
                className="refresh-btn"
                onClick={fetchUserData}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>

            {activeTab === 'certificates' ? (
              <>
                <h2 className="section-title">
                  <i className="fas fa-certificate"></i> KK's Hope Certificates
                </h2>

                {certificates.length > 0 ? (
                  <div className="certificates-grid">
                    {certificates.map((cert, index) => (
                      <div className="certificate-card" key={cert.id || index}>
                        <img
                          src={cert.url || cert.ipfsUrl || cert.localUrl || ''}
                          alt={cert.name}
                          className="certificate-image"
                          onError={(e) => {
                            console.error('Failed to load certificate image:', cert.url || cert.ipfsUrl || cert.localUrl);
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />

                        <div className="certificate-details">
                          <h4 className="certificate-name">{cert.name}</h4>
                          <div className="certificate-meta">
                            <span>Token #{cert.tokenId}</span>
                          </div>
                          <div className="certificate-actions">
                            <button
                              className="action-btn view-btn"
                              onClick={() => {
                                const url = cert.url || cert.ipfsUrl || cert.localUrl;
                                if (url) {
                                  handleView(url);
                                } else {
                                  console.error('No URL available for certificate:', cert);
                                  setError('Certificate URL not available');
                                }
                              }}
                              disabled={!cert.url && !cert.ipfsUrl && !cert.localUrl}
                            >
                              <i className="fas fa-eye"></i> View
                            </button>

                            <button
                              className="action-btn download-btn2"
                              onClick={handleDownloadArchive}
                              disabled={!userData?.email || isDownloadingArchive}
                            >
                              {isDownloadingArchive ? (
                                <>
                                  <i className="fas fa-spinner fa-spin"></i> Downloading...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-download"></i> Download
                                </>
                              )}
                            </button>
                            {error && error.includes('archive') && (
                              <div className="archive-error">
                                {error}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-certificate"></i>
                    <h3>No Certificates Found</h3>
                    <p>
                      {userData?.totalMinted > 0
                        ? ""
                        : !userData?.email
                          ? "You haven't registered your account yet."
                          : "You haven't minted any NFTs yet."
                      }
                    </p>
                  </div>
                )}
              </>
            ) : activeTab === 'kyc' ? (
              <>
                <h2 className="section-title">
                  <i className="fas fa-id-card"></i> KYC Verification
                </h2>

                <div className="kyc-verification-section">
                  <div className="kyc-item">
                    <div
                      className="kyc-header"
                      onClick={() => setActiveKycSection(activeKycSection === 'kyc' ? null : 'kyc')}
                    >
                      <h4>
                        <i className="fas fa-id-card"></i>
                        KYC Verification
                      </h4>
                      <i className={`fas fa-chevron-down ${activeKycSection === 'kyc' ? 'active' : ''}`}></i>
                    </div>

                    <div className={`kyc-content ${activeKycSection === 'kyc' ? 'active' : ''}`}>
                      <div className="identity-status">
                        {identityDocument?.hasDocument ? (
                          <div className="identity-document-status">
                            {identityDocument.verified && (
                              <div className="identity-verified">
                                <div className="verification-status">
                                  <i className="fas fa-check-circle"></i>
                                  <span>
                                    {identityDocument.documentType?.replace('_', ' ').toUpperCase()} verified
                                  </span>
                                  <span className="verification-badge verified">
                                    Verified
                                  </span>
                                </div>
                                <div className="verification-date">
                                  Verified on {new Date(identityDocument.verifiedAt || '').toLocaleDateString()}
                                </div>
                                {identityDocument.hasBothSides && (
                                  <div className="verification-note">
                                    <small> Front and back images verified</small>
                                  </div>
                                )}
                              </div>
                            )}

                            {identityDocument.rejectionReason && (
                              <div className="identity-rejected">
                                <div className="verification-status">
                                  <i className="fas fa-times-circle"></i>
                                  <span>
                                    {identityDocument.documentType?.replace('_', ' ').toUpperCase()} rejected
                                  </span>
                                  <span className="verification-badge rejected">
                                    Rejected
                                  </span>
                                </div>
                                <div className="rejection-details">
                                  <p><strong>Reason:</strong> {identityDocument.rejectionReason}</p>
                                  <p><small>Rejected on {new Date(identityDocument.rejectedAt || '').toLocaleDateString()}</small></p>
                                </div>
                                <button
                                  className="reupload-btn"
                                  onClick={() => setShowIdentityModal(true)}
                                >
                                  <i className="fas fa-upload"></i> Upload New Document
                                </button>
                              </div>
                            )}

                            {!identityDocument.verified && !identityDocument.rejectionReason && (
                              <div className="identity-pending">
                                <div className="verification-status">
                                  <i className="fas fa-clock"></i>
                                  <span>
                                    {identityDocument.documentType?.replace('_', ' ').toUpperCase()} under review
                                  </span>
                                  <span className="verification-badge pending">
                                    Pending Review
                                  </span>
                                </div>
                                <div className="pending-details">
                                  <p>Your document is being reviewed by our team.</p>
                                  <p><small>Uploaded on {new Date(identityDocument.uploadedAt || '').toLocaleDateString()}</small></p>
                                  {identityDocument.hasBothSides && (
                                    <p><small> Front and back images submitted</small></p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="identity-not-uploaded">
                            <div className="identity-requirement">
                              <i className="fas fa-id-card"></i>
                              <div>
                                <p><strong>Identity verification required</strong></p>
                                <p>Please upload a government-issued ID to enable withdrawals</p>
                              </div>
                            </div>
                            <button
                              className="upload-identity-btn"
                              onClick={() => setShowIdentityModal(true)}
                            >
                              <i className="fas fa-upload"></i> Upload Identity Document
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="identity-status" style={{ marginTop: '20px' }}>
                        {taxIdDocument?.hasDocument ? (
                          <div className="identity-document-status">
                            {taxIdDocument.verified && (
                              <div className="identity-verified">
                                <div className="verification-status">
                                  <i className="fas fa-check-circle"></i>
                                  <span>
                                    Tax ID document verified
                                  </span>
                                  <span className="verification-badge verified">
                                    Verified
                                  </span>
                                </div>
                                <div className="verification-date">
                                  Verified on {new Date(taxIdDocument.verifiedAt || '').toLocaleDateString()}
                                </div>
                              </div>
                            )}

                            {taxIdDocument.rejectionReason && (
                              <div className="identity-rejected">
                                <div className="verification-status">
                                  <i className="fas fa-times-circle"></i>
                                  <span>
                                    Tax ID document rejected
                                  </span>
                                  <span className="verification-badge rejected">
                                    Rejected
                                  </span>
                                </div>
                                <div className="rejection-details">
                                  <p><strong>Reason:</strong> {taxIdDocument.rejectionReason}</p>
                                  <p><small>Rejected on {new Date(taxIdDocument.rejectedAt || '').toLocaleDateString()}</small></p>
                                </div>
                                <button
                                  className="reupload-btn"
                                  onClick={() => setShowTaxIdModal(true)}
                                >
                                  <i className="fas fa-upload"></i> Upload New Document
                                </button>
                              </div>
                            )}

                            {!taxIdDocument.verified && !taxIdDocument.rejectionReason && (
                              <div className="identity-pending">
                                <div className="verification-status">
                                  <i className="fas fa-clock"></i>
                                  <span>
                                    Tax ID document under review
                                  </span>
                                  <span className="verification-badge pending">
                                    Pending Review
                                  </span>
                                </div>
                                <div className="pending-details">
                                  <p>Your tax ID document is being reviewed by our team.</p>
                                  <p><small>Uploaded on {new Date(taxIdDocument.uploadedAt || '').toLocaleDateString()}</small></p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="tax-id-not-uploaded">
                            <div className="tax-id-requirement">
                              <i className="fas fa-file-invoice-dollar"></i>
                              <div>
                                <p id="nametx"><strong>Tax ID verification required</strong></p>
                                <p>Please upload your tax identification document for tax compliance</p>
                              </div>
                            </div>
                            <button
                              className="upload-tax-id-btn"
                              onClick={() => setShowTaxIdModal(true)}
                            >
                              <i className="fas fa-upload"></i> Upload Tax ID Document
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="section-title">
                  <i className="fas fa-coins"></i> Royalties & Payouts
                </h2>

                <div className="payout-actions">
                </div>

                <InlinePayPalEmail />

                {userData?.totalMinted > 0 ? (
                  <div className="royalties-section">
                    <div className="project-info-card">
                      <div className="project-stats-table">
                        <div className="stats-table-header">
                          <div className="header-cell">NFT Project</div>
                          <div className="header-cell">NFTs Owned</div>
                          <div className="header-cell">Available Balance</div>
                          <div className="header-cell">PayPal Status</div>
                          <div className="header-cell">Action</div>
                        </div>
                        <div className="stats-table-row">
                          <div className="table-cell"  >
                            <div className="asset-info">
                              <span>Hope Coin KK NFTs</span>
                            </div>
                          </div>
                          <div className="table-cell" >{userData?.totalMinted || 0}</div>
                          <div className="table-cell balance-amount">
                            ${(() => {
                              try {
                                // Use cumulative data from backend
                                if (cumulativeData && cumulativeData.success) {
                                  return cumulativeData.cumulativeAvailable.toFixed(2);
                                }
                                // Fallback to old calculation if cumulative data not loaded yet
                                const currentTotalSupply = Number(totalSupplyFromContract) || Number(totalSupply) || 1;
                                const calculation = calculateDynamicPayout(
                                  userData?.totalMinted || 0,
                                  currentTotalSupply,
                                  disposalAmount || 0,
                                  totalWithdrawn || 0
                                );
                                return (calculation?.availableAmount || 0).toFixed(2);
                              } catch (error) {
                                console.error('Error displaying balance:', error);
                                return '0.00';
                              }
                            })()}
                          </div>
                          <div className="table-cell" >
                            <span className={`status-badge ${paypalEmail ? 'verified' : 'pending'}`}>
                              {paypalEmail ? 'Connected' : 'Not Set'}
                            </span>
                          </div>
                          <div className="table-cell action-cell" >
                            <button
                              className="table-withdraw-btn"
                              onClick={() => setShowWithdrawalPopup(true)}
                              disabled={!paypalEmail || !identityDocument?.verified || !taxIdDocument?.verified}
                            >
                              <i className="fas fa-money-bill-wave"></i> Withdraw
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-coins"></i>
                    <h3>No Royalties Available</h3>
                    <p>You don't own any NFTs yet, so no royalties are available.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showWithdrawalPopup && (
        <div className="withdrawal-popup-overlay">
          <div className="withdrawal-popup">
            <div className="popup-header">
              <h3>Request Withdrawal</h3>
              <div
                className="close-popup-btn"
                onClick={() => setShowWithdrawalPopup(false)}
              >
                <i className="fas fa-times"></i>
              </div>
            </div>
            <div className="popup-content">
              <div className="withdrawal-card">
                <div className="withdrawal-header">
                  <h4>
                    <i className="fas fa-money-bill-wave"></i>
                    Request Withdrawal
                  </h4>
                  <div className="withdrawal-status-indicator">
                    {!paypalEmail ? (
                      <span className="status-indicator error">PayPal Required</span>
                    ) : !identityDocument?.verified ? (
                      <span className="status-indicator warning">ID Verification Required</span>
                    ) : !taxIdDocument?.verified ? (
                      <span className="status-indicator warning">Tax ID Required</span>
                    ) : hasWithdrawnToday ? (
                      <span className="status-indicator info">Already Withdrawn Today</span>
                    ) : hasPendingPayout ? (
                      <span className="status-indicator info">Processing Previous Request</span>
                    ) : (
                      <span className="status-indicator success">Ready to Withdraw</span>
                    )}
                  </div>
                </div>

                <div className="withdrawal-form-container">
                  <div className="amount-input-section">
                    <label htmlFor="withdrawalAmount">Withdrawal Amount (USD)</label>
                    <div className="amount-input-wrapper">
                      <span className="currency-symbol">$</span>
                      <input
                        id="withdrawalAmount"
                        type="number"
                        step="0.01"
                        min="0.10"
                        placeholder="0.00"
                        value={withdrawalAmount}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setWithdrawalAmount(newValue);
                          if (newValue) {
                            validateAmount(newValue);
                          } else {
                            setAmountError(null);
                          }
                          if (paypalUpdateMessage && (paypalUpdateMessage.type === 'error' || paypalUpdateMessage.type === 'warning')) {
                            setPaypalUpdateMessage(null);
                          }
                        }}
                        onFocus={() => {
                          if (paypalUpdateMessage && (paypalUpdateMessage.type === 'error' || paypalUpdateMessage.type === 'warning')) {
                            setPaypalUpdateMessage(null);
                          }
                        }}
                        className="amount-input"
                        disabled={
                          !paypalEmail ||
                          !identityDocument?.verified ||
                          !taxIdDocument?.verified ||
                          isRequestingPayout
                        }
                      />
                    </div>
                    {amountError && (
                      <div className="amount-error-message">
                        {amountError}
                      </div>
                    )}
                    <div className="amount-limits">
                      <span>Available: ${(() => {
                        if (cumulativeData && cumulativeData.success) {
                          return cumulativeData.cumulativeAvailable.toFixed(2);
                        }
                        const calc = calculateDynamicPayout(
                          userData?.totalMinted || 0,
                          Number(totalSupplyFromContract) || Number(totalSupply) || 1,
                          disposalAmount || 0,
                          totalWithdrawn || 0
                        );
                        return (calc?.availableAmount || 0).toFixed(2);
                      })()}</span>
                    </div>
                  </div>

                  <div className="quick-amounts-section">
                    <span className="quick-amounts-label">Quick Select:</span>
                    <div className="quick-amounts-buttons">
                      <button
                        className="quick-amount-btn"
                        onClick={() => {
                          // Use cumulative data
                          let maxAmount = 0;

                          if (cumulativeData && cumulativeData.success) {
                            maxAmount = cumulativeData.cumulativeAvailable || 0;
                          } else {
                            // Fallback to old calculation
                            const calc = calculateDynamicPayout(
                              userData?.totalMinted || 0,
                              Number(totalSupplyFromContract) || Number(totalSupply) || 1,
                              disposalAmount || 0,
                              totalWithdrawn || 0
                            );
                            maxAmount = calc?.availableAmount || 0;
                          }

                          console.log('🔍 DEBUG Max button:', {
                            maxAmount,
                            setting: maxAmount.toFixed(2),
                            usingCumulativeData: !!(cumulativeData && cumulativeData.success)
                          });

                          const finalAmount = maxAmount.toFixed(2);
                          setWithdrawalAmount(finalAmount);
                          setAmountError(null);
                        }}
                        disabled={
                          isRequestingPayout ||
                          (cumulativeData ? cumulativeData.cumulativeAvailable <= 0 :
                            (!disposalAmount || disposalAmount <= 0))
                        }
                      >
                        Max
                      </button>

                    </div>
                  </div>

                  <button
                    className="withdrawal-submit-button"
                    onClick={handleWithdrawPayout}
                    disabled={
                      !paypalEmail ||
                      !userData?.totalMinted ||
                      userData?.totalMinted === 0 ||
                      isRequestingPayout ||
                      hasWithdrawnToday ||
                      !identityDocument?.verified ||
                      !taxIdDocument?.verified ||
                      hasPendingPayout ||
                      !withdrawalAmount ||
                      parseFloat(withdrawalAmount) <= 0 ||  // Only check > 0
                      !!amountError ||
                      (() => {
                        // Check if user has any available balance
                        if (cumulativeData && cumulativeData.success) {
                          return cumulativeData.cumulativeAvailable <= 0;
                        }
                        const calculation = calculateDynamicPayout(
                          userData?.totalMinted || 0,
                          Number(totalSupplyFromContract) || Number(totalSupply) || 1,
                          disposalAmount || 0,
                          totalWithdrawn || 0
                        );
                        return (calculation?.availableAmount || 0) <= 0;
                      })()
                    }
                  >
                    {isRequestingPayout ? 'Processing...' : 'Send to PayPal'}
                  </button>
                </div>
              </div>

              <div className="action-buttons-row">
                <button
                  className="refresh-status-btn"
                  onClick={async () => {
                    await handleRefreshPayoutStatus();
                    await fetchPayPalData();
                  }}
                  disabled={!paypalData?.payouts?.some((p: Payout) => p.status === 'pending')}
                >
                  <i className="fas fa-sync-alt"></i>
                  Check Status
                </button>
              </div>

              {paypalUpdateMessage && (
                <div className={`payout-message ${paypalUpdateMessage.type}`}>
                  <div className="message-content">
                    {paypalUpdateMessage.type === 'success' && <i className="fas fa-check-circle"></i>}
                    {paypalUpdateMessage.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                    {paypalUpdateMessage.type === 'info' && <i className="fas fa-info-circle"></i>}
                    <span>{paypalUpdateMessage.text}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isEditingName && (
        <EditNameModal
          currentName={userData?.name || ''}
          onSave={handleNameUpdate}
          onClose={() => setIsEditingName(false)}
        />
      )}

      {showRegisterModal && (
        <div className="register-modal-overlay">
          <div className="register-modal">
            <div className="register-modal-header">
              <h3>Register Your Account</h3>
              <div
                className="register-close-modal-btn"
                onClick={() => setShowRegisterModal(false)}
                style={{ cursor: isRegistering ? 'not-allowed' : 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </div>
            </div>
            <div className="register-modal-body">
              <div className="register-form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  maxLength={20}
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={isRegistering}
                  className="register-input"
                />
              </div>
              <div className="register-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isRegistering}
                  className="register-input"
                />
              </div>
              <div className="register-terms-section">
                <div className="register-terms-checkbox">
                  <input
                    type="checkbox"
                    id="registerAcceptTerms"
                    checked={registerAcceptedTerms}
                    onChange={(e) => {
                      setRegisterAcceptedTerms(e.target.checked);
                      setRegisterTermsError(false);
                    }}
                    disabled={isRegistering}
                  />
                  <label htmlFor="registerAcceptTerms">
                    I agree to the Terms and Conditions
                  </label>
                </div>
                {registerTermsError && (
                  <div className="register-terms-error">
                    You must accept the Terms and Conditions
                  </div>
                )}

                <div className="register-terms-checkbox">
                  <input
                    type="checkbox"
                    id="registerAcceptPrivacyPolicy"
                    checked={registerAcceptedPrivacyPolicy}
                    onChange={(e) => {
                      setRegisterAcceptedPrivacyPolicy(e.target.checked);
                      setRegisterTermsErrorPrivacyPolicy(false);
                    }}
                    disabled={isRegistering}
                  />
                  <label htmlFor="registerAcceptPrivacyPolicy">
                    I have read and agree to the Privacy Policy
                  </label>
                </div>
                {registerTermsErrorPrivacyPolicy && (
                  <div className="register-terms-error">
                    You must accept the Privacy Policy
                  </div>
                )}

                <div className="register-terms-checkbox">
                  <input
                    type="checkbox"
                    id="registerConfirmAge"
                    checked={registerAcceptedAge}
                    onChange={(e) => {
                      setRegisterAcceptedAge(e.target.checked);
                      setRegisterAgeError(false);
                    }}
                    disabled={isRegistering}
                  />
                  <label htmlFor="registerConfirmAge">
                    I confirm I am 18 years of age or older
                  </label>
                </div>
                {registerAgeError && (
                  <div className="register-terms-error">
                    You must be 18+ to register
                  </div>
                )}
                <div className="register-terms-checkbox">
                  <input
                    type="checkbox"
                    id="registerSubscribe"
                    checked={registerSubscribe}
                    onChange={(e) => setRegisterSubscribe(e.target.checked)}
                    disabled={isRegistering}
                  />
                  <label htmlFor="registerSubscribe">
                    Subscribe me to the newsletter/promotional emails (optional)
                  </label>
                </div>
              </div>
              {registerMessage && (
                <div className={`register-message ${registerMessage.type}`}>
                  {registerMessage.text}
                </div>
              )}
            </div>
            <div className="register-modal-footer">
              <button
                className="register-cancel-btn"
                onClick={() => setShowRegisterModal(false)}
                disabled={isRegistering}
              >
                Cancel
              </button>
              <button
                className="register-submit-btn"
                onClick={handleRegisterSubmit}
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : null}
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Identity Upload Modal */}
      {showIdentityModal && (
        <div className="identity-modal-overlay">
          <div className="identity-modal">
            <div className="identity-modal-header">
              <h3>Upload Identity Document</h3>
              <button
                className="close-modal-btn"
                onClick={() => {
                  setShowIdentityModal(false);
                  setSelectedFrontFile(null);
                  setSelectedBackFile(null);
                  setFrontPreviewUrl(null);
                  setBackPreviewUrl(null);
                  setSelectedDocumentType('');
                  setIdentityUploadMessage(null);
                }}
                disabled={isUploadingIdentity}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="identity-modal-body">
              <div className="document-type-selection">
                <label>Select Document Type</label>
                <div className="document-type-options">
                  <label className="document-option">
                    <input
                      type="radio"
                      name="documentType"
                      value="passport"
                      checked={selectedDocumentType === 'passport'}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                      disabled={isUploadingIdentity}
                    />
                    <div className="option-content">
                      <i className="fas fa-passport"></i>
                      <span>Passport</span>
                    </div>
                  </label>

                  <label className="document-option">
                    <input
                      type="radio"
                      name="documentType"
                      value="drivers_license"
                      checked={selectedDocumentType === 'drivers_license'}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                      disabled={isUploadingIdentity}
                    />
                    <div className="option-content">
                      <i className="fas fa-id-card"></i>
                      <span>Driver's License</span>
                    </div>
                  </label>

                  <label className="document-option">
                    <input
                      type="radio"
                      name="documentType"
                      value="national_id"
                      checked={selectedDocumentType === 'national_id'}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                      disabled={isUploadingIdentity}
                    />
                    <div className="option-content">
                      <i className="fas fa-address-card"></i>
                      <span>National ID</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="file-upload-section">
                <label>Upload Document Images</label>
                <div className="dual-upload-container">
                  <div className="upload-side">
                    <div className="upload-side-label">
                      Front Side <span className="upload-side-required">*</span>
                    </div>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        id="frontImageFile"
                        accept="image/*"
                        onChange={handleFrontFileSelect}
                        disabled={isUploadingIdentity}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="frontImageFile" className="file-upload-label">
                        {frontPreviewUrl ? (
                          <div className="file-preview">
                            <img src={frontPreviewUrl} alt="Front side preview" />
                            <div className="preview-overlay">
                              <i className="fas fa-camera"></i>
                              <span>Click to change</span>
                            </div>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <span>Front Side</span>
                            <small id="smlTxt">Required • Max 5MB</small>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="upload-side">
                    <div className="upload-side-label">
                      Back Side <span className="upload-side-required">*</span>
                    </div>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        id="backImageFile"
                        accept="image/*"
                        onChange={handleBackFileSelect}
                        disabled={isUploadingIdentity}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="backImageFile" className="file-upload-label">
                        {backPreviewUrl ? (
                          <div className="file-preview">
                            <img src={backPreviewUrl} alt="Back side preview" />
                            <div className="preview-overlay">
                              <i className="fas fa-camera"></i>
                              <span>Click to change</span>
                            </div>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <span>Back Side</span>
                            <small id="smlTxt">Required • Max 5MB</small>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="upload-requirements">
                <h5>Requirements:</h5>
                <ul>
                  <li>Front side image is required</li>
                  <li>Back side image is required</li>
                  <li>Document must be clear and readable</li>
                  <li>All corners must be visible</li>
                  <li>No glare or shadows</li>
                  <li>File size must be under 5MB each</li>
                </ul>
              </div>

              {identityUploadMessage && (
                <div className={`upload-message ${identityUploadMessage.type}`}>
                  {identityUploadMessage.text}
                </div>
              )}
            </div>

            <div className="identity-modal-footer">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowIdentityModal(false);
                  setSelectedFrontFile(null);
                  setSelectedBackFile(null);
                  setFrontPreviewUrl(null);
                  setBackPreviewUrl(null);
                  setSelectedDocumentType('');
                  setIdentityUploadMessage(null);
                }}
                disabled={isUploadingIdentity}
              >
                Cancel
              </button>
              <button
                className="upload-btn"
                onClick={handleDocumentUpload}
                disabled={!selectedDocumentType || !selectedFrontFile || !selectedBackFile || isUploadingIdentity}
              >
                {isUploadingIdentity ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Uploading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i>
                    Upload Document
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tax ID Upload Modal */}
      {showTaxIdModal && (
        <div className="identity-modal-overlay">
          <div className="identity-modal">
            <div className="identity-modal-header">
              <h3>Upload Tax ID Document</h3>
              <button
                className="close-modal-btn"
                onClick={() => {
                  setShowTaxIdModal(false);
                  setSelectedTaxIdFile(null);
                  setTaxIdPreviewUrl(null);
                  setSelectedTaxIdType('');
                  setTaxIdUploadMessage(null);
                }}
                disabled={isUploadingTaxId}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="identity-modal-body">
              <div className="document-type-selection">
                <label>Select Tax ID Document Type</label>
                <div className="tax-id-type-options">
                  <label className="tax-id-option">
                    <input
                      type="radio"
                      name="taxIdType"
                      value="ssn_card"
                      checked={selectedTaxIdType === 'ssn_card'}
                      onChange={(e) => setSelectedTaxIdType(e.target.value)}
                      disabled={isUploadingTaxId}
                    />
                    <div className="tax-id-option-content">
                      <i className="fas fa-id-card"></i>
                      <span>Social Security Card</span>
                    </div>
                  </label>

                  <label className="tax-id-option">
                    <input
                      type="radio"
                      name="taxIdType"
                      value="tax_return"
                      checked={selectedTaxIdType === 'tax_return'}
                      onChange={(e) => setSelectedTaxIdType(e.target.value)}
                      disabled={isUploadingTaxId}
                    />
                    <div className="tax-id-option-content">
                      <i className="fas fa-file-invoice"></i>
                      <span>Tax Return (1040)</span>
                    </div>
                  </label>

                  <label className="tax-id-option">
                    <input
                      type="radio"
                      name="taxIdType"
                      value="ein_letter"
                      checked={selectedTaxIdType === 'ein_letter'}
                      onChange={(e) => setSelectedTaxIdType(e.target.value)}
                      disabled={isUploadingTaxId}
                    />
                    <div className="tax-id-option-content">
                      <i className="fas fa-building"></i>
                      <span>EIN Assignment Letter</span>
                    </div>
                  </label>

                  <label className="tax-id-option">
                    <input
                      type="radio"
                      name="taxIdType"
                      value="itin_letter"
                      checked={selectedTaxIdType === 'itin_letter'}
                      onChange={(e) => setSelectedTaxIdType(e.target.value)}
                      disabled={isUploadingTaxId}
                    />
                    <div className="tax-id-option-content">
                      <i className="fas fa-file-alt"></i>
                      <span>ITIN Assignment Letter</span>
                    </div>
                  </label>

                  <label className="tax-id-option">
                    <input
                      type="radio"
                      name="taxIdType"
                      value="other"
                      checked={selectedTaxIdType === 'other'}
                      onChange={(e) => setSelectedTaxIdType(e.target.value)}
                      disabled={isUploadingTaxId}
                    />
                    <div className="tax-id-option-content">
                      <i className="fas fa-file"></i>
                      <span>Other Tax Document</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="file-upload-section">
                <label>Upload Tax ID Document</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="taxIdFile"
                    accept="image/*"
                    onChange={handleTaxIdFileSelect}
                    disabled={isUploadingTaxId}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="taxIdFile" className="file-upload-label">
                    {taxIdPreviewUrl ? (
                      <div className="file-preview">
                        <img src={taxIdPreviewUrl} alt="Tax ID document preview" />
                        <div className="preview-overlay">
                          <i className="fas fa-camera"></i>
                          <span>Click to change</span>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span>Upload Tax ID Document</span>
                        <small id="smlTxt">Required • Max 5MB</small>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="upload-requirements">
                <h5>Requirements:</h5>
                <ul>
                  <li>Document must be clear and readable</li>
                  <li>All text and numbers must be visible</li>
                  <li>No glare or shadows</li>
                  <li>File size must be under 5MB</li>
                  <li>Personal information may be partially redacted for security</li>
                </ul>
              </div>

              {taxIdUploadMessage && (
                <div className={`upload-message ${taxIdUploadMessage.type}`}>
                  {taxIdUploadMessage.text}
                </div>
              )}
            </div>

            <div className="identity-modal-footer">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowTaxIdModal(false);
                  setSelectedTaxIdFile(null);
                  setTaxIdPreviewUrl(null);
                  setSelectedTaxIdType('');
                  setTaxIdUploadMessage(null);
                }}
                disabled={isUploadingTaxId}
              >
                Cancel
              </button>
              <button
                className="upload-btn"
                onClick={handleTaxIdUpload}
                disabled={!selectedTaxIdType || !selectedTaxIdFile || isUploadingTaxId}
              >
                {isUploadingTaxId ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Uploading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i>
                    Upload Document
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {downloadNotification && (
        <Notification
          message={downloadNotification}
          onClose={() => setDownloadNotification(null)}
        />
      )}

      {showDownloadSuccess && (
        <DownloadSuccessModal
          fileName={downloadedFileName}
          onClose={() => setShowDownloadSuccess(false)}
          onOpenDownloads={() => {
            const userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.includes('chrome')) {
              window.open('chrome://downloads/', '_blank');
            } else if (userAgent.includes('firefox')) {
              window.open('about:downloads', '_blank');
            } else if (userAgent.includes('edge')) {
              window.open('edge://downloads/', '_blank');
            } else {
              alert('Please check your Downloads folder or use your browser\'s download history (usually Ctrl+J or Cmd+J)');
            }
          }}
        />
      )}
    </div>
  );
};

export default NewDash;
