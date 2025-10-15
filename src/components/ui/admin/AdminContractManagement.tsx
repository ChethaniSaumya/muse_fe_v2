import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminContractManagement.css';

interface Project {
  id: string | number;
  projectName: string;
  projectSymbol: string;
  totalSupply?: number;
  contractAddress?: string;
  networkId?: string;
  mintingEnabled?: boolean;
  status?: string;
}

interface Message {
  text: string;
  type: 'success' | 'error' | 'info';
}

interface AdminContractManagementProps {
  project: Project;
  onUpdate?: () => void;
}

const AdminContractManagement: React.FC<AdminContractManagementProps> = ({ project, onUpdate }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contractAddress, setContractAddress] = useState<string>(project.contractAddress || '');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);

  const API_BASE_URL = 'https://muse-be.onrender.com';

  const validateContractAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async (): Promise<void> => {
    // Validation
    if (!contractAddress.trim()) {
      setMessage({ text: 'Contract address is required', type: 'error' });
      return;
    }

    if (!validateContractAddress(contractAddress)) {
      setMessage({ text: 'Invalid contract address format', type: 'error' });
      return;
    }

    setSubmitting(true);
    setMessage({ text: 'Approving project and updating contract...', type: 'info' });

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/artist-projects/${project.id}/contract`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress: contractAddress.trim(),
            networkId: '137', // Fixed to Polygon Mainnet
            mintingEnabled: true // Auto-enable minting on approval
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          text: 'Project approved successfully!', 
          type: 'success' 
        });
        
        setTimeout(() => {
          setShowModal(false);
          if (onUpdate) onUpdate();
        }, 1500);
      } else {
        setMessage({ 
          text: data.error || 'Failed to approve project', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Error approving project:', error);
      setMessage({ 
        text: 'Network error. Please try again.', 
        type: 'error' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="contract-trigger-btn"
        title="Manage Contract"
      >
        <i className="fas fa-cog"></i> Contract
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="contract-modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="contract-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="contract-modal-header">
                <h3 className="contract-modal-title">Approve Project & Set Contract</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="contract-modal-close"
                  disabled={submitting}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Project Info */}
              <div className="contract-project-info">
                <h4 className="contract-project-name">{project.projectName}</h4>
                <p className="contract-project-details">
                  Symbol: <strong>{project.projectSymbol}</strong> | Supply: <strong>{project.totalSupply?.toLocaleString()}</strong>
                </p>
              </div>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`contract-message contract-message-${message.type}`}
                  >
                    <i className={`fas ${
                      message.type === 'success' ? 'fa-check-circle' :
                      message.type === 'error' ? 'fa-exclamation-circle' :
                      'fa-info-circle'
                    }`}></i>
                    <span>{message.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Body */}
              <div className="contract-modal-body">
                {/* Contract Address Input */}
                <div className="contract-form-group">
                  <label className="contract-form-label">
                    Contract Address <span className="contract-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    disabled={submitting}
                    placeholder="0x..."
                    className="contract-form-input"
                  />
                  <small className="contract-form-hint">
                    Enter the deployed smart contract address on Polygon Mainnet
                  </small>
                </div>

                {/* Network Info */}
                <div className="contract-info-box contract-info-network">
                  <div className="contract-info-row">
                    <i className="fas fa-network-wired"></i>
                    <span>Network: <strong>Polygon Mainnet</strong></span>
                  </div>
                  <div className="contract-info-row">
                    <i className="fas fa-check-circle"></i>
                    <span>Minting will be automatically enabled after approval</span>
                  </div>
                </div>

                {/* Current Status */}
                {project.contractAddress && (
                  <div className="contract-info-box contract-info-current">
                    <div className="contract-info-label">
                      <i className="fas fa-file-contract"></i> Current Contract
                    </div>
                    <div className="contract-info-address">
                      {project.contractAddress}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="contract-modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="contract-btn contract-btn-cancel"
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !contractAddress.trim()}
                  className="contract-btn contract-btn-approve"
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Approving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Approve Project
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminContractManagement;