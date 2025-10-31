/* User Panel Styles - MuseCoinx Theme */
.user-panel-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  font-family: "Lato", sans-serif;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, #f5f5f5, #e0e0e0, #f5f5f5);
}

.user-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(113, 110, 203, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.user-panel-title h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #6165B5;
  background: linear-gradient(to right, #9F7AEA, #5A67D8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

.user-panel-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.user-dashboard {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.user-sidebar {
  background: linear-gradient(to right, #f5f5f5, #e0e0e0, #f5f5f5);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
  backdrop-filter: blur(10px);
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(113, 110, 203, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 2px solid #9F7AEA;
}

.user-avatar i {
  font-size: 2.5rem;
  color: #6165B5;
}

.user-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #6165B5;
}

.user-wallet {
  font-size: 0.9rem;
  color: #555;
  background: rgba(113, 110, 203, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  word-break: break-all;
  text-align: center;
  margin-bottom: 1rem;
}

.user-stats {
  width: 100%;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(113, 110, 203, 0.1);
}

.stat-label {
  color: #555;
  font-size: 0.9rem;
}

.stat-value {
  font-weight: 500;
  color: #6165B5;
}

.marketplace-btn {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  color: #ffffff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0.4;
  cursor: no-drop;
}

.marketplace-btn:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(159, 122, 234, 0.3);
  cursor: no-drop;
}

.user-main {
  background: linear-gradient(to right, #f5f5f5, #e0e0e0, #f5f5f5);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.tabs-container {
  display: flex;
  gap: 0.5rem;
  margin-right: auto;
}

.tab-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(113, 110, 203, 0.3);
  color: #555;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-btn i {
  font-size: 0.9rem;
}

.tab-btn.active {
  background: rgba(113, 110, 203, 0.1);
  border-color: #6165B5;
  color: #6165B5;
}

.tab-btn:hover {
  background: rgba(113, 110, 203, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #6165B5;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.section-title i {
  font-size: 1.2rem;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.certificate-card {
  background: linear-gradient(to right, #f5f5f5, #e0e0e0, #f5f5f5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #999;
  transition: all 0.3s ease;
}

.certificate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(159, 122, 234, 0.2);
  border-color: rgba(113, 110, 203, 0.4);
}

.certificate-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(113, 110, 203, 0.2);
}

.certificate-details {
  padding: 1.2rem;
}

.certificate-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #6165B5;
  font-size: 18px;
}

.certificate-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 1rem;
}

.certificate-actions {
  display: flex;
  gap: 0.8rem;
}

.action-btn {
  flex: 1;
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: none;
}

.view-btn {
  background: rgba(113, 110, 203, 0.1);
  color: #6165B5;
  border: 1px solid #9F7AEA;
}

.view-btn:hover {
  background: rgba(113, 110, 203, 0.2);
}

.download-btn2 {
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  color: #ffffff;
  font-weight: 600;
}

.download-btn2:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #555;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: rgba(113, 110, 203, 0.3);
}

.empty-state p {
  margin-bottom: 1.5rem;
}

.refresh-btn {
  background: transparent;
  border: 1px solid #9F7AEA;
  color: #6165B5;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.refresh-btn:hover {
  background: rgba(113, 110, 203, 0.1);
}

#nametx{
  color: #6165B5;
  font-weight: bold;
}

.connect-wallet-btn {
  color: #ffffff;
  border: 1px solid #9F7AEA;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  white-space: nowrap;
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
}

.connect-wallet-btn:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(159, 122, 234, 0.3);
}


/* ADD THIS CSS TO REPLACE THE OLD ROYALTIES STYLES */

/* Project Info Card */
.project-info-card {
  background-color: #ccc;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.project-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #6165B5;
}

.project-details h3 {
  color: #fff;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.project-details p {
  color: #555;
  margin: 4px 0 0 0;
  font-size: 0.9rem;
}

.project-stats .stat-label {
  display: block;
  color: #555;
  font-size: 0.85rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.project-stats .stat-value {
  display: block;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
}

.project-stats .stat-value.balance-amount {
  color: #28a745;
  font-size: 1.4rem;
}

.project-stats .status-badge {
  padding: 4px 12px !important;
  border-radius: 20px !important;
  font-size: 0.8rem !important;
  font-weight: 600 !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;
}

.project-stats .status-badge.verified {
  background: #d1fae5 !important;
  color: #20a37e !important;
}

.project-stats .status-badge.pending {
  background: #fef3c7 !important;
  color: #f39053 !important;
}

/* Withdrawal Card */
.withdrawal-card {
  background-color: #ccc;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
}

.withdrawal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.withdrawal-header h4 {
  color: #6165B5;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.withdrawal-status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-indicator.success {
  background: #d1fae5;
  color: #0ac590;
}

.status-indicator.warning {
  background: #fef3c7;
  color: #92400e;
}

.status-indicator.error {
  background: #fee2e2;
  color: #991b1b;
}

.status-indicator.info {
  background: #dbeafe;
  color: #1e40af;
}

/* Withdrawal Form */
.withdrawal-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.amount-input-section label {
  display: block;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.amount-input-wrapper {
  position: relative;
  margin-bottom: 8px;
}

.currency-symbol {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
  font-size: 1.1rem;
  font-weight: 600;
}

.amount-input {
  width: 100%;
  padding: 16px 16px 16px 40px;
  border: 2px solid rgba(113, 110, 203, 0.3);
  border-radius: 12px;
  background: rgba(16, 16, 36, 0.123);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.amount-input:focus {
  outline: none;
  border-color: #6165B5;
  box-shadow: 0 0 0 4px rgba(159, 122, 234, 0.1);
}

.amount-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgba(16, 16, 36, 0.4);
}

.amount-limits {
  display: flex;
  justify-content: space-between;
  color: #555;
  font-size: 0.8rem;
}

/* Quick Amounts */
.quick-amounts-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-amounts-label {
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
}

.quick-amounts-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.quick-amount-btn {
  padding: 10px 20px;
  background: transparent;
  border: 2px solid rgba(113, 110, 203, 0.3);
  border-radius: 8px;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
}

.quick-amount-btn:hover:not(:disabled) {
  border-color: #6165B5;
  color: #6165B5;
  background: rgba(159, 122, 234, 0.1);
}

.quick-amount-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Submit Button */
.withdrawal-submit-button {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #28a745, #20c997);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}

.withdrawal-submit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #218838, #1e9e6d);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
}

.withdrawal-submit-button:disabled {
  background: #6b7280;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Action Buttons Row */
.action-buttons-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

/* Status Messages */
.payout-message {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.payout-message.success {
  background: rgba(72, 187, 120, 0.1);
  border: 1px solid rgba(72, 187, 120, 0.3);
  color: #48BB78;
}

.payout-message.error {
  background: rgba(245, 101, 101, 0.1);
  border: 1px solid rgba(245, 101, 101, 0.3);
  color: #F56565;
}

.payout-message.info {
  background: rgba(66, 153, 225, 0.1);
  border: 1px solid rgba(66, 153, 225, 0.3);
  color: #4299E1;
}

.message-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .project-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .project-stats .stat-item {
    padding: 12px;
  }

  .withdrawal-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .quick-amounts-buttons {
    justify-content: center;
  }

  .withdrawal-card,
  .project-info-card {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .project-stats {
    grid-template-columns: 1fr;
  }

  .quick-amounts-buttons {
    flex-direction: column;
  }

  .quick-amount-btn {
    width: 100%;
  }
}

.withdraw-btn {
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  color: #6165B5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  width: 100%;
  opacity: 0.5;
  cursor: not-allowed;
}

.withdraw-btn:hover {
  cursor: not-allowed;
}

/* Register Modal Styles */
.register-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(3, 4, 8, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.register-modal {
  background: #ccc;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  border: 1px solid rgba(159, 122, 234, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.register-modal::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(159, 122, 234, 0.1) 0%, transparent 70%);
  z-index: -1;
}

.register-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(159, 122, 234, 0.3);
}

.register-modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6165B5;
  background: linear-gradient(to right, #9F7AEA, #5A67D8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.register-close-modal-btn {
  background: transparent;
  border: none;
  color: #555;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-close-modal-btn:hover {
  background: rgba(159, 122, 234, 0.1);
  color: #6165B5;
}

.register-form-group {
  margin-bottom: 1.5rem;
}

.register-form-group label {
  display: block;
  margin-bottom: 0.8rem;
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
}

.register-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(159, 122, 234, 0.3);
  background: rgba(16, 16, 36, 0.123);
  color: #6165B5;
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.register-input:focus {
  outline: none;
  border-color: #6165B5;
  box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.2);
}

.register-terms-section {
  margin: 2rem 0 1.5rem;
}

.register-terms-checkbox {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.register-terms-checkbox input {
  margin-right: 0.8rem;
  width: 18px;
  height: 18px;
  accent-color: #6165B5;
  cursor: pointer;
}

.register-terms-checkbox label {
  color: #CBD5E0;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.register-terms-checkbox:hover label {
  color: #6165B5;
}

.register-terms-error {
  color: #FEB2B2;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  margin-left: 1.8rem;
}

.register-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.register-cancel-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background: transparent;
  border: 1px solid #A0A3BD;
  color: #555;
}

.register-cancel-btn:hover {
  border-color: #6165B5;
  color: #6165B5;
  background: rgba(159, 122, 234, 0.05);
}

.register-submit-btn {
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  border: none;
  color: #6165B5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.register-submit-btn:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(159, 122, 234, 0.3);
}

.register-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.register-message {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
}

.register-message.success {
  background: rgba(72, 187, 120, 0.15);
  color: #48BB78;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.register-message.error {
  background: rgba(245, 101, 101, 0.15);
  color: #F56565;
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.register-message.info {
  background: rgba(66, 153, 225, 0.15);
  color: #4299E1;
  border: 1px solid rgba(66, 153, 225, 0.3);
}

/* Animation for modal appearance */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.register-modal {
  animation: modalFadeIn 0.3s ease-out forwards;
}

/* Responsive adjustments */
/* Mobile-specific adjustments */
@media (max-width: 480px) {
  .royalties-cell[data-label="Action:"] {
    justify-content: space-between;
    /* Space between label and button */
    align-items: center;
    /* Center align vertically */
  }

  .royalties-cell[data-label="Action:"]:before {
    flex-shrink: 0;
    /* Prevent label from shrinking */
  }

  .withdraw-btn {
    width: fit-content;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    margin-left: auto;
    /* Push button to the right */
  }

  .user-panel-header {
    padding: 1rem;
  }

  .user-panel-title h1 {
    font-size: 1.3rem;
  }

  .connect-wallet-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .user-panel-content {
    padding: 1rem;
  }

  .user-dashboard {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .user-sidebar,
  .user-main {
    padding: 1.2rem;
  }

  .user-avatar {
    width: 80px;
    height: 80px;
  }

  .user-name {
    font-size: 1.1rem;
  }

  .user-wallet {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .stat-item {
    padding: 0.6rem 0;
  }

  .stat-label,
  .stat-value {
    font-size: 0.85rem;
  }

  .marketplace-btn {
    padding: 0.7rem;
    font-size: 0.9rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .tabs-container {
    width: 100%;
    justify-content: space-between;
  }

  .tab-btn {
    flex: 1;
    padding: 0.5rem;
    font-size: 0.8rem;
    justify-content: center;
  }

  .refresh-btn {
    width: 100%;
    margin-left: 0;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .certificates-grid {
    grid-template-columns: 1fr;
  }

  .certificate-card {
    width: 100%;
  }

  .certificate-image {
    height: 160px;
  }

  .certificate-name {
    font-size: 1rem;
  }

  .certificate-meta {
    font-size: 0.8rem;
  }

  .certificate-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-btn {
    width: 100%;
    padding: 0.7rem;
  }

  .royalties-cell {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  .withdraw-btn {
    padding: 0.6rem;
  }

  .empty-state i {
    font-size: 2rem;
  }

  .empty-state h3 {
    font-size: 1.2rem;
  }

  .empty-state p {
    font-size: 0.9rem;
  }

  .register-modal {
    width: 95%;
    padding: 1.5rem;
  }

  .register-modal-header h3 {
    font-size: 1.2rem;
  }

  .register-input {
    padding: 0.8rem;
  }

  /* Add this to your mobile media query */
  .user-dashboard {
    grid-template-columns: 1fr;
  }

  .user-sidebar {
    order: -1;
    /* Move sidebar to top */
    margin-bottom: 1rem;
  }

  .royalties-cell {
    padding: 8px 0;
  }

  .royalties-cell:before {
    font-weight: 600;
    color: #6165B5;
    margin-right: 8px;
  }

  .refresh-btn {
    width: auto;
    /* Remove full width */
    padding: 0.5rem 1rem;
    /* Smaller padding */
    font-size: 0.8rem;
    /* Smaller font */
    margin-left: 0;
    /* Remove margin */
    margin-top: 0.5rem;
    /* Add some top margin */
    align-self: flex-end;
    /* Align to the right */
  }

  /* Adjust the section header layout */
  .section-header {
    flex-direction: row;
    /* Keep items in a row */
    flex-wrap: wrap;
    /* Allow wrapping */
    justify-content: space-between;
    /* Space between tabs and refresh */
    align-items: center;
  }

  /* Make tabs container take available space */
  .tabs-container {
    width: auto;
    flex-grow: 1;
  }


  .royalties-cell {
    padding: 6px 0;
    font-size: 0.8rem;
  }

}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .user-dashboard {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {

  .user-panel-header {
    padding: 1rem;
  }

  .user-panel-title h1 {
    font-size: 1.3rem;
  }

  .connect-wallet-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .user-panel-content {
    padding: 1rem;
  }

  .user-dashboard {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .user-sidebar,
  .user-main {
    padding: 1.2rem;
  }

  .user-avatar {
    width: 80px;
    height: 80px;
  }

  .user-name {
    font-size: 1.1rem;
  }

  .user-wallet {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .stat-item {
    padding: 0.6rem 0;
  }

  .stat-label,
  .stat-value {
    font-size: 0.85rem;
  }

  .marketplace-btn {
    padding: 0.7rem;
    font-size: 0.9rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .tabs-container {
    width: 100%;
    justify-content: space-between;
  }

  .tab-btn {
    flex: 1;
    padding: 0.5rem;
    font-size: 0.8rem;
    justify-content: center;
  }

  .refresh-btn {
    width: 100%;
    margin-left: 0;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .certificates-grid {
    grid-template-columns: 1fr;
  }

  .certificate-card {
    width: 100%;
  }

  .certificate-image {
    height: 160px;
  }

  .certificate-name {
    font-size: 1rem;
  }

  .certificate-meta {
    font-size: 0.8rem;
  }

  .certificate-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-btn {
    width: 100%;
    padding: 0.7rem;
  }

  .royalties-cell {
    font-size: 0.85rem;
    padding: 0.5rem;
  }


  .royalties-cell {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(113, 110, 203, 0.1);
  }

  .royalties-cell:before {
    content: attr(data-label);
    font-weight: 600;
    color: #6165B5;
  }

  /* Fix for Action cell - left align the label, right align button */
  .royalties-cell[data-label="Action:"] {
    justify-content: space-between;
    /* Space between label and button */
    align-items: center;
    /* Center align vertically */
  }

  .royalties-cell[data-label="Action:"]:before {
    flex-shrink: 0;
    /* Prevent label from shrinking */
  }

  /* Fix withdraw button width */
  .withdraw-btn {
    width: fit-content;
    /* Change from 100% to fit-content */
    padding: 0.5rem 1rem;
    /* Adjust padding for better appearance */
    font-size: 0.85rem;
    margin-left: auto;
    /* Push button to the right */
  }

  .empty-state i {
    font-size: 2rem;
  }

  .empty-state h3 {
    font-size: 1.2rem;
  }

  .empty-state p {
    font-size: 0.9rem;
  }

  .register-modal {
    width: 95%;
    padding: 1.5rem;
  }

  .register-modal-header h3 {
    font-size: 1.2rem;
  }

  .register-input {
    padding: 0.8rem;
  }

  /* Add this to your mobile media query */
  .user-dashboard {
    grid-template-columns: 1fr;
  }

  .user-sidebar {
    order: -1;
    /* Move sidebar to top */
    margin-bottom: 1rem;
  }


  .royalties-cell {
    padding: 8px 0;
  }

  .royalties-cell:before {
    font-weight: 600;
    color: #6165B5;
    margin-right: 8px;
  }

  .refresh-btn {
    width: auto;
    /* Remove full width */
    padding: 0.5rem 1rem;
    /* Smaller padding */
    font-size: 0.8rem;
    /* Smaller font */
    margin-left: 0;
    /* Remove margin */
    margin-top: 0.5rem;
    /* Add some top margin */
    align-self: flex-end;
    /* Align to the right */
  }

  /* Adjust the section header layout */
  .section-header {
    flex-direction: row;
    /* Keep items in a row */
    flex-wrap: wrap;
    /* Allow wrapping */
    justify-content: space-between;
    /* Space between tabs and refresh */
    align-items: center;
  }

}

.user-panel-container::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 10%;
  width: 300px;
  height: 300px;
  background: #9F7AEA;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.1;
  z-index: -1;
}

.user-panel-container::after {
  content: '';
  position: absolute;
  bottom: 10%;
  right: 20%;
  width: 300px;
  height: 300px;
  background: #5A67D8;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.1;
  z-index: -1;
}


/* Register account button */
.register-account-btn {
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  color: #6165B5;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.register-account-btn:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
}

/* Error messages */
.archive-error {
  color: #F87171;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}


.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 200px;
  /* Adjust as needed */
}

/* Download Notifications */
.download-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  color: #6165B5;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 350px;
  display: flex;
  align-items: center;
  animation: slideIn 0.3s ease-out;
}

.download-notification.info {
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  border-left: 4px solid #7530ff;
}

.download-notification.success {
  background: rgba(72, 187, 120, 0.9);
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.9), rgba(2, 151, 64, 0.9));
  border-left: 4px solid #237947;
}

.download-notification.error {
  background: rgba(245, 101, 101, 0.9);
  border-left: 4px solid #F56565;
}

.notification-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-close {
  background: transparent;
  border: none;
  color: #6165B5;
  margin-left: 15px;
  cursor: pointer;
  opacity: 0.8;
}

.notification-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.network-warning {
  color: #ff6b6b;
  font-size: 0.8em;
  margin-left: 5px;
}

/* Add this to your CSS */
.network-alert {
  background: rgba(245, 101, 101, 0.15);
  color: #F56565;
  border: 1px solid rgba(245, 101, 101, 0.3);
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.switch-network-btn {
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  color: #6165B5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  white-space: nowrap;
}

.switch-network-btn:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
}

.download-success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.download-success-modal {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.download-success-header {
  padding: 24px 24px 16px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
}

.success-icon {
  margin-bottom: 12px;
}

.success-icon i {
  font-size: 3rem;
  color: #22c55e;
}

.download-success-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
}

.download-success-header .close-modal-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
}

.download-success-header .close-modal-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.download-success-body {
  padding: 24px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.file-icon {
  width: 48px;
  height: 48px;
  background: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6165B5;
  font-size: 1.5rem;
}

.file-details {
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  word-break: break-all;
}

.file-path {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.path-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.path-value {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #374151;
  background: white;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  word-break: break-all;
}

.download-instructions {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}

.download-instructions p {
  margin: 0;
  color: #1e40af;
  font-size: 0.875rem;
  text-align: center;
}

.download-success-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.open-downloads-btn {
  background: #3b82f6;
  color: #6165B5;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.open-downloads-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.done-btn {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.done-btn:hover {
  background: #e5e7eb;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .download-success-modal {
    width: 95%;
    margin: 20px;
  }

  .file-info {
    flex-direction: column;
    text-align: center;
  }

  .download-success-footer {
    flex-direction: column;
  }

  .open-downloads-btn,
  .done-btn {
    width: 100%;
    justify-content: center;
  }
}

/* ============================================
   INLINE PAYPAL EMAIL EDITING CSS
   ============================================ */

/* PayPal Email Section */
.paypal-email-section {
  margin-bottom: 25px;
}

.paypal-email-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(143, 143, 143, 0.596);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 60px;
}

.paypal-label {
  font-weight: 600;
  font-size: 1rem;
  color: #6165B5;
  min-width: 100px;
  flex-shrink: 0;
}

/* Display Mode */
.paypal-email-display {
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.95rem;
  flex: 1;
  color: #6165B5;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 38px;
  display: flex;
  align-items: center;
}

.edit-paypal-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #6165B5;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  flex-shrink: 0;
}

.edit-paypal-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* Editing Mode */
.paypal-edit-container {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.paypal-edit-input {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  border: 2px solid rgba(159, 122, 234, 0.5);
  background: rgba(16, 16, 36, 0.8);
  color: #6165B5;
  font-family: "Lato", sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-height: 38px;
}

.paypal-edit-input:focus {
  outline: none;
  border-color: #6165B5;
  box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.2);
  background: rgba(16, 16, 36, 0.9);
}

.paypal-edit-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.paypal-edit-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.paypal-save-btn,
.paypal-cancel-btn {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  border: none;
  min-width: 40px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paypal-save-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: #6165B5;
}

.paypal-save-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #218838, #1e9e6d);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.paypal-save-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.paypal-cancel-btn {
  background: rgba(220, 53, 69, 0.8);
  color: #6165B5;
}

.paypal-cancel-btn:hover:not(:disabled) {
  background: rgba(220, 53, 69, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.paypal-cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Status Messages */
.paypal-update-message {
  margin-top: 15px;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  animation: slideDown 0.3s ease;
}

.paypal-update-message.success {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.paypal-update-message.error {
  background: rgba(220, 53, 69, 0.2);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

/* Help Text */
.paypal-help-text {
  margin-top: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  text-align: center;
}

/* Animation for messages */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .paypal-email-info {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 20px;
  }

  .paypal-label {
    min-width: auto;
    text-align: center;
    font-size: 0.95rem;
  }

  .paypal-email-display {
    text-align: center;
    min-height: 44px;
  }

  .paypal-edit-container {
    flex-direction: column;
    gap: 12px;
  }

  .paypal-edit-input {
    min-height: 44px;
    font-size: 1rem;
  }

  .paypal-edit-actions {
    justify-content: center;
    gap: 15px;
  }

  .paypal-save-btn,
  .paypal-cancel-btn {
    min-width: 100px;
    height: 44px;
    font-size: 0.95rem;
  }

  .edit-paypal-btn {
    width: 100%;
    justify-content: center;
    min-height: 44px;
  }
}

@media (max-width: 480px) {
  .paypal-email-info {
    padding: 15px;
  }

  .paypal-edit-actions {
    flex-direction: column;
    gap: 10px;
  }

  .paypal-save-btn,
  .paypal-cancel-btn {
    width: 100%;
  }
}

/* Focus and hover states for accessibility */
.paypal-edit-input:focus,
.paypal-save-btn:focus,
.paypal-cancel-btn:focus,
.edit-paypal-btn:focus {
  outline: 2px solid #9F7AEA;
  outline-offset: 2px;
}

/* Loading state for input */
.paypal-edit-input:disabled {
  background: rgba(16, 16, 36, 0.123);
  border-color: rgba(159, 122, 234, 0.3);
}

/* Enhanced visual feedback */
.paypal-email-info:hover .edit-paypal-btn {
  background: rgba(255, 255, 255, 0.25);
}

.paypal-edit-container .paypal-edit-input {
  border-color: rgba(159, 122, 234, 0.6);
  box-shadow: 0 2px 8px rgba(159, 122, 234, 0.1);
}

/* Enhanced Withdraw Button */
.withdraw-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: #6165B5;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.85rem;
  min-width: 100px;
  opacity: 1;
  /* Remove the disabled opacity */
}

.withdraw-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #218838, #1e9e6d);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
}

.withdraw-btn:disabled {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}

/* Payout Amount Styling */
.payout-amount {
  font-weight: 700;
  color: #28a745;
  font-size: 1.1rem;
}

/* PayPal in sidebar */
.paypal-stat {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.paypal-container {
  width: 100%;
}

.paypal-container .paypal-email-section {
  margin-bottom: 0;
}

.paypal-container .paypal-email-info {
  padding: 8px 12px;
  font-size: 0.8rem;
}

/* Message positioning */
.payout-message {
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  animation: slideIn 0.3s ease;
}

/* ============================================
   IDENTITY VERIFICATION SECTION CSS
   ============================================ */

/* Identity Verification Section */
.identity-verification-section {
  margin-bottom: 30px;
  background-color: #ccc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #999;
}

.identity-verification-section h4 {
  margin: 0 0 20px 0;
  color: #6165B5;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.identity-status {
  width: 100%;
}

/* Verified State */
.identity-verified {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: rgba(72, 187, 120, 0.377);
  border: 1px solid rgba(49, 126, 81, 0.3);
  border-radius: 10px;
}

.verification-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.verification-status i {
  color: #48BB78;
  font-size: 1.2rem;
}

.verification-status span:first-of-type {
  color: #6165B5;
  font-weight: 500;
  text-transform: capitalize;
}

.verification-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.verification-badge.verified {
  background: rgba(72, 187, 120, 0.2);
  color: #328354;
  border: 1px solid rgba(48, 128, 81, 0.3);
}

.verification-badge.pending {
  background: rgba(251, 191, 36, 0.2);
  color: #b67403;
  border: 1px solid rgba(187, 138, 16, 0.3);
}

.reupload-btn {
  background: rgba(159, 122, 234, 0.1);
  border: 1px solid #9F7AEA;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.reupload-btn:hover {
  background: rgba(159, 122, 234, 0.2);
  transform: translateY(-1px);
}

/* Not Uploaded State */
.identity-not-uploaded {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(245, 101, 101, 0.377);
  border: 1px solid rgba(245, 101, 101, 0.3);
  border-radius: 10px;
}

.identity-requirement {
  display: flex;
  align-items: center;
  gap: 15px;
}

.identity-requirement i {
  color: #F56565;
  font-size: 2rem;
  flex-shrink: 0;
}

.identity-requirement div p {
  margin: 0;
  color: #6165B5;
}

.identity-requirement div p:first-child {
  font-weight: 600;
  margin-bottom: 4px;
}

.identity-requirement div p:last-child {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.upload-identity-btn {
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.upload-identity-btn:hover {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(159, 122, 234, 0.3);
}

/* Identity Upload Modal */
.identity-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(3, 4, 8, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.identity-modal {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(159, 122, 234, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  animation: modalSlideIn 0.3s ease-out forwards;
}

.identity-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px 15px;
  border-bottom: 1px solid rgba(159, 122, 234, 0.3);
}

.identity-modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.close-modal-btn {
  background: transparent;
  border: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal-btn:hover {
  background: rgba(159, 122, 234, 0.1);
  color: #6165B5;
}

.identity-modal-body {
  padding: 30px;
}

/* Document Type Selection */
.document-type-selection {
  margin-bottom: 30px;
}

.document-type-selection label {
  display: block;
  margin-bottom: 15px;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.document-type-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
}

.document-option {
  position: relative;
  cursor: pointer;
}

.document-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 15px;
  border: 2px solid rgba(159, 122, 234, 0.3);
  border-radius: 12px;
  background: rgba(16, 16, 36, 0.123);
  transition: all 0.3s ease;
  text-align: center;
}

.option-content i {
  font-size: 2rem;
  color: #6165B5;
}

.option-content span {
  color: #6165B5;
  font-weight: 500;
  font-size: 0.9rem;
}

.document-option input:checked+.option-content {
  border-color: #6165B5;
  background: rgba(159, 122, 234, 0.1);
  box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.2);
}

.document-option:hover .option-content {
  border-color: rgba(159, 122, 234, 0.5);
  background: rgba(159, 122, 234, 0.05);
}

/* File Upload Section */
.file-upload-section {
  margin-bottom: 25px;
}

.file-upload-section>label {
  display: block;
  margin-bottom: 15px;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.file-upload-area {
  width: 100%;
}

.file-upload-label {
  display: block;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed rgba(159, 122, 234, 0.5);
  border-radius: 12px;
  background: rgba(16, 16, 36, 0);
  transition: all 0.3s ease;
  text-align: center;
}

.upload-placeholder i {
  font-size: 3rem;
  color: #6165B5;
  margin-bottom: 15px;
}

.upload-placeholder span {
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.upload-placeholder small {
  color: #666;
  font-size: 0.85rem;
}

.file-upload-label:hover .upload-placeholder {
  border-color: #6165B5;
  background: rgba(159, 122, 234, 0.219);
}

/* File Preview */
.file-preview {
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.file-preview:hover .preview-overlay {
  opacity: 1;
}

.preview-overlay i {
  font-size: 2rem;
  color: #6165B5;
  margin-bottom: 8px;
}

.preview-overlay span {
  color: #6165B5;
  font-weight: 500;
}

/* Upload Requirements */
.upload-requirements {
  background: rgba(66, 153, 225, 0.1);
  border: 1px solid rgba(66, 153, 225, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
}

.upload-requirements h5 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.upload-requirements ul {
  margin: 0;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.upload-requirements li {
  margin-bottom: 8px;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #555;

}

.tax-id-modal {
  background: #ccc;
}

.tax-id-modal-header h3 {
  color: #333;
}

.tax-id-option-content span {
  color: #333;
}

/* Upload Message */
.upload-message {
  padding: 12px 18px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
}

.upload-message.success {
  background: rgba(72, 187, 120, 0.2);
  color: #48BB78;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.upload-message.error {
  background: rgba(245, 101, 101, 0.2);
  color: #F56565;
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.upload-message.info {
  background: rgba(66, 153, 225, 0.2);
  color: #4299E1;
  border: 1px solid rgba(66, 153, 225, 0.3);
}

/* Modal Footer */
.identity-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 30px 30px;
  border-top: 1px solid rgba(159, 122, 234, 0.2);
}

.cancel-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background: transparent;
  border: 1px solid #A0A3BD;
  color: #555;
}

.cancel-btn:hover {
  border-color: #6165B5;
  color: #6165B5;
  background: rgba(159, 122, 234, 0.05);
}

.upload-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #9F7AEA, #5A67D8);
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.upload-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #8B5CF6, #4C51BF);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(159, 122, 234, 0.3);
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .identity-verification-section {
    padding: 20px;
  }

  .identity-verified,
  .identity-not-uploaded {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    text-align: center;
  }

  .verification-status {
    justify-content: center;
    flex-wrap: wrap;
  }

  .identity-requirement {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .identity-requirement i {
    font-size: 1.5rem;
  }

  .upload-identity-btn,
  .reupload-btn {
    width: 100%;
    justify-content: center;
  }

  .identity-modal {
    width: 95%;
    margin: 20px;
    max-height: 95vh;
  }

  .identity-modal-header,
  .identity-modal-body,
  .identity-modal-footer {
    padding: 20px;
  }

  .document-type-options {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .option-content {
    flex-direction: row;
    justify-content: center;
    padding: 15px;
  }

  .option-content i {
    font-size: 1.5rem;
  }

  .upload-placeholder {
    padding: 30px 15px;
  }

  .upload-placeholder i {
    font-size: 2.5rem;
  }

  .file-preview {
    height: 200px;
  }

  .identity-modal-footer {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-btn,
  .upload-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .identity-modal-header h3 {
    font-size: 1.2rem;
  }

  .document-type-selection label,
  .file-upload-section>label {
    font-size: 0.95rem;
  }

  .upload-placeholder {
    padding: 25px 10px;
  }

  .upload-placeholder span {
    font-size: 1rem;
  }

  .upload-requirements {
    padding: 15px;
  }

  .upload-requirements h5 {
    font-size: 0.95rem;
  }

  .upload-requirements li {
    font-size: 0.85rem;
  }
}

/* Enhanced withdraw button styling when identity is required */
.withdraw-btn:disabled {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
  position: relative;
}

.withdraw-btn:disabled::after {
  content: "ID Required";
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(245, 101, 101, 0.9);
  color: #6165B5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.withdraw-btn:disabled:hover::after {
  opacity: 1;
}

/* Animation keyframes */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}


/* Additional Identity Verification States */
.identity-document-status {
  width: 100%;
}

.identity-rejected {
  padding: 20px;
  background: rgba(245, 101, 101, 0.1);
  border: 1px solid rgba(245, 101, 101, 0.3);
  border-radius: 12px;
  margin-bottom: 15px;
}

.identity-rejected .verification-status i {
  color: #F56565;
}

.identity-pending {
  padding: 20px;
  background: rgba(251, 190, 36, 0.247);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 12px;
  margin-bottom: 15px;
}

.identity-pending .verification-status i {
  color: #F59E0B;
}

.verification-badge.rejected {
  background: rgba(245, 101, 101, 0.2);
  color: #F56565;
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.rejection-details,
.pending-details {
  margin: 15px 0;
  padding: 15px;
  background: rgba(143, 143, 143, 0.295);
  border-radius: 8px;
}

.rejection-details p,
.pending-details p {
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.9);
}

.rejection-details small,
.pending-details small {
  color: rgba(255, 255, 255, 0.7);
}

.verification-date {
  margin-top: 10px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.reupload-btn.secondary {
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid #F59E0B;
  color: #F59E0B;
}

.reupload-btn.secondary:hover {
  background: rgba(251, 191, 36, 0.2);
}

/* Enhanced withdraw button styling when identity is required */
.withdraw-btn:disabled {
  background: linear-gradient(135deg, #6c757d, #5a6268) !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
  opacity: 0.6 !important;
  position: relative;
}

.withdraw-btn:disabled::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #6165B5;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1000;
}

.withdraw-btn:disabled:hover::after {
  opacity: 1;
}

/* Arrow for tooltip */
.withdraw-btn:disabled::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgba(0, 0, 0, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.withdraw-btn:disabled:hover::before {
  opacity: 1;
}

/* Front/Back Upload Styles */
.dual-upload-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.upload-side {
  display: flex;
  flex-direction: column;
}

.upload-side-label {
  font-weight: 600;
  color: #948989;
  margin-bottom: 10px;
  text-align: center;
}

.upload-side-required {
  color: #F56565;
}

.upload-side-optional {
  color: #555;
  font-size: 0.9rem;
}

.file-upload-label {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-preview {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed rgba(159, 122, 234, 0.5);
  border-radius: 8px;
  background: rgba(16, 16, 36, 0.123);
  transition: all 0.3s ease;
  text-align: center;
}

#smlTxt{
  color: gray;
}

.upload-placeholder i {
  font-size: 2rem;
  color: #6165B5;
  margin-bottom: 10px;
}

.upload-placeholder span {
  color: #6165B5;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.upload-placeholder small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

/* Tax ID Section Styles */
.tax-id-verification-section {
  margin-bottom: 30px;
  background-color: #ccc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #999;
}

.tax-id-verification-section h4 {
  margin: 0 0 20px 0;
  color: #6165B5;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tax-id-not-uploaded {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(251, 190, 36, 0.397);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 10px;
}

.tax-id-requirement {
  display: flex;
  align-items: center;
  gap: 15px;
}

.tax-id-requirement i {
  color: #F59E0B;
  font-size: 2rem;
  flex-shrink: 0;
}

.upload-tax-id-btn {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.upload-tax-id-btn:hover {
  background: linear-gradient(135deg, #D97706, #B45309);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

/* Tax ID Document Type Options */
.tax-id-type-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tax-id-option {
  position: relative;
  cursor: pointer;
}

.tax-id-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.tax-id-option-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border: 2px solid rgba(159, 122, 234, 0.3);
  border-radius: 8px;
  background: rgba(16, 16, 36, 0.123);
  transition: all 0.3s ease;
}

.tax-id-option input:checked+.tax-id-option-content {
  border-color: #6165B5;
  background: rgba(159, 122, 234, 0.1);
  box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.2);
}

.tax-id-option:hover .tax-id-option-content {
  border-color: rgba(159, 122, 234, 0.5);
  background: rgba(159, 122, 234, 0.05);
}

.tax-id-option-content i {
  font-size: 1.2rem;
  color: #6165B5;
  min-width: 20px;
}

.tax-id-option-content span {
  color: #6165B5;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dual-upload-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .tax-id-not-uploaded,
  .identity-not-uploaded {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    text-align: center;
  }

  .tax-id-requirement,
  .identity-requirement {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .tax-id-requirement i,
  .identity-requirement i {
    font-size: 1.5rem;
  }

  .upload-tax-id-btn,
  .upload-identity-btn {
    width: 100%;
    justify-content: center;
  }

  .tax-id-option-content {
    padding: 12px;
  }

  .file-preview {
    height: 120px;
  }

  .upload-placeholder {
    min-height: 120px;
    padding: 15px;
  }
}

#newT {
  margin-left: 10px;
}

/* Specifically target the withdraw button */
.withdraw-btn:hover::after {
  content: none !important;
}

.disbursement-table .table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
  gap: 10px;
  padding: 15px 10px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-weight: bold;
}

.disbursement-table .table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
  gap: 10px;
  padding: 15px 10px;
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s ease;
}

.disbursement-table .table-row:hover {
  background-color: #f8f9fa;
}

.period-cell {
  font-weight: 500;
  color: #495057;
}

.amount-cell {
  font-weight: bold;
  color: #28a745;
}

.used-amount-cell {
  font-weight: 500;
  color: #6c757d;
}

.comments-cell {
  color: #6c757d;
  font-size: 0.9em;
}

.status-badge.active {
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
}

.status-badge.inactive {
  background-color: #f8d7da;
  color: #721c24;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
}

/* Full Width Classes */
.tab-content.full-width {
  width: 100%;
  max-width: 100%;
}

.admin-form-group.full-width {
  width: 100%;
  max-width: 100%;
}

/* Make sure the admin container uses full width */
.admin-container {
  max-width: 100%;
  width: 100%;
  padding: 0 20px;
}

.admin-content {
  width: 100%;
  max-width: 100%;
}

/* Document tables full width */
.documents-table-container {
  width: 100%;
  overflow-x: auto;
}

.documents-table {
  width: 100%;
  min-width: 800px;
}

/* Stats dashboard full width */
.document-stats-dashboard {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* Responsive design */
@media (max-width: 768px) {
  .tab-btn {
    flex-direction: column;
    gap: 4px;
    padding: 10px 15px;
  }

  .tab-label {
    font-size: 12px;
  }

  .contract-settings-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .royalty-management-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .document-stats-dashboard {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .disbursement-table .table-header,
  .disbursement-table .table-row {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .disbursement-controls {
    flex-direction: column;
    gap: 15px;
  }
}

/* 3. ADD THIS CSS TO YOUR UserPanel.css FILE */

.verification-sections {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  background: #ffffff;
}

.verification-section {
  border-bottom: 1px solid #e0e0e0;
}

.verification-section:last-child {
  border-bottom: none;
}

.verification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.verification-header:hover {
  background: #e9ecef;
}

.verification-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.verification-header-left i {
  font-size: 1.2rem;
  color: #6c757d;
  width: 20px;
  text-align: center;
}

.verification-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
}

.verification-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.verification-status-badge.verified {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.verification-status-badge.rejected {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.verification-status-badge.pending {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.verification-status-badge.required {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.verification-status-badge i {
  font-size: 0.8rem;
}

.verification-header-right {
  margin-left: 12px;
}

.verification-header-right i {
  font-size: 0.9rem;
  color: #6c757d;
  transition: transform 0.3s ease;
}

.verification-content {
  overflow: hidden;
  transition: all 0.3s ease;
  background: #ffffff;
}

.verification-content.collapsed {
  max-height: 0;
  padding: 0 20px;
}

.verification-content.expanded {
  max-height: 500px;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

/* Responsive Design */
@media (max-width: 768px) {
  .verification-header {
    padding: 12px 16px;
  }

  .verification-header-left {
    gap: 8px;
  }

  .verification-header h4 {
    font-size: 1rem;
  }

  .verification-status-badge {
    font-size: 0.7rem;
    padding: 2px 6px;
  }

  .verification-content.expanded {
    padding: 16px;
  }
}

/* Animation for smooth transitions */
.verification-header i.fa-chevron-up,
.verification-header i.fa-chevron-down {
  transition: transform 0.2s ease;
}

/* Enhanced visual feedback */
.verification-header:active {
  transform: translateY(1px);
}

/* Focus states for accessibility */
.verification-header:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

/* Additional styling for content inside */
.verification-content .identity-requirement,
.verification-content .tax-id-requirement {
  margin-bottom: 16px;
}

.verification-content .upload-identity-btn,
.verification-content .upload-tax-id-btn,
.verification-content .reupload-btn {
  margin-top: 12px;
}

/* KYC Collapsible Section */
.kyc-verification-section {
  margin-bottom: 30px;
  background-color: #ccc;
  border-radius: 12px;
  border: 1px solid #999;
  overflow: hidden;
}

.kyc-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.kyc-header:hover {
  background: rgba(113, 110, 203, 0.05);
}

.kyc-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6165B5;
}

.kyc-header i {
  transition: transform 0.3s ease;
}

.kyc-header.active i {
  transform: rotate(180deg);
}

.kyc-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  border-top: 1px solid transparent;
}

.kyc-content.active {
  max-height: 2000px;
  /* Adjust based on your content */
  border-top: 1px solid rgba(113, 110, 203, 0.2);
}

.kyc-item {
  padding: 20px;
}

.kyc-item:not(:last-child) {
  border-bottom: 1px solid rgba(113, 110, 203, 0.1);
}

.refresh-status-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
  min-width: 80px;
  justify-content: center;
}

.refresh-status-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #4338ca, #6d28d9);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
}

.refresh-status-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}

.refresh-status-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.refresh-status-btn i {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.refresh-status-btn:hover:not(:disabled) i {
  transform: rotate(180deg);
}

/* Loading state */
.refresh-status-btn.loading i {
  animation: spin 1s linear infinite;
}

/* ADD THIS TO THE END OF UserPanel.css */

/* Withdrawal Section Styles */
.withdrawal-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.withdrawal-input-group {
  width: 100%;
  max-width: 120px;
}

.withdrawal-amount-input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid rgba(113, 110, 203, 0.3);
  border-radius: 4px;
  background: rgba(16, 16, 36, 0.123);
  color: #6165B5;
  font-size: 0.8rem;
  text-align: center;
}

.withdrawal-amount-input:focus {
  outline: none;
  border-color: #6165B5;
  box-shadow: 0 0 0 2px rgba(159, 122, 234, 0.2);
}

.withdrawal-amount-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.withdrawal-amount-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .withdrawal-section {
    align-items: stretch;
  }

  .withdrawal-input-group {
    max-width: none;
  }

  .withdrawal-amount-input {
    font-size: 0.85rem;
    padding: 8px;
  }
}

.payout-message.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  /* Dark red text */
}

.amount-error-message {
  color: #dc3545;
  /* Bootstrap red */
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.payout-message.warning {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  /* Dark yellow/orange text */
}

.project-stats-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #999;
}

.stats-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 1.5fr;
  background: rgba(31, 41, 55, 0.8);
  border-bottom: 1px solid rgba(113, 110, 203, 0.3);
}

.header-cell {
  padding: 16px 12px;
  font-weight: 600;
  color: #e5e4fd;
  font-size: 0.9rem;
  text-align: center;
}

.stats-table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 1.5fr;
  background: rgba(23, 25, 51, 0.082);
  border-bottom: 1px solid rgba(113, 110, 203, 0.1);
  transition: background 0.3s ease;
}

.table-cell {
  padding: 16px 12px;
  color: #2D398F;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.table-cell.balance-amount {
  color: #28a745;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Withdrawal Popup Styles */
.withdrawal-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(3, 4, 8, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

.withdrawal-popup {
  background: #ccc;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(113, 110, 203, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid rgba(113, 110, 203, 0.2);
}

.popup-header h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #6165B5;
}

.close-popup-btn {
  background: transparent;
  border: none;
  color: #555;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-popup-btn:hover {
  background: rgba(159, 122, 234, 0.1);
  color: #6165B5;
}

.popup-content {
  padding: 25px;
}

.table-withdraw-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.table-withdraw-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #218838, #1e9e6d);
  transform: translateY(-1px);
}

.table-withdraw-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .withdrawal-popup {
    width: 95%;
    margin: 20px;
  }

  .popup-header {
    padding: 15px 20px;
  }

  .popup-content {
    padding: 20px;
  }

  .table-withdraw-btn {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
}

/* Mobile responsive fixes for royalties table */
@media (max-width: 768px) {

  .stats-table-header,
  .stats-table-row {
    grid-template-columns: 1fr !important;
    gap: 10px;
    padding: 15px;
  }

  .header-cell,
  .table-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(113, 110, 203, 0.1);
    text-align: left !important;
  }

  .header-cell:last-child,
  .table-cell:last-child {
    border-bottom: none;
  }

  .header-cell:before,
  .table-cell:before {
    content: attr(data-label);
    font-weight: 600;
    color: #6165B5;
    margin-right: 10px;
    flex: 1;
  }

  .header-cell>*,
  .table-cell>* {
    flex: 2;
    text-align: right;
  }

  .action-cell {
    justify-content: flex-end !important;
    margin-top: 15px;
  }

  .table-withdraw-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Additional mobile optimization */
@media (max-width: 480px) {

  .stats-table-header,
  .stats-table-row {
    padding: 10px;
  }

  .header-cell:before,
  .table-cell:before {
    font-size: 0.85rem;
  }

  .table-cell.balance-amount {
    font-size: 1rem;
  }
}

/* KYC Tab Styles */
.kyc-verified-badge {
  margin-left: 8px;
  color: #28a745;
  font-size: 0.8em;
}

.kyc-lock-icon {
  margin-left: 8px;
  color: #dc3545;
  font-size: 0.8em;
}

.tab-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tab-btn.disabled:hover {
  background-color: transparent;
}

.tab-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f5f5f5;
  position: relative;
}

.tab-btn:disabled:hover {
  opacity: 0.6;
}


/* Artist Projects Table Styles */
.artist-projects-table {
  font-size: 14px;
}

.project-image-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
}

.project-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e1e5e9;
  transition: transform 0.2s ease;
}

.project-thumbnail:hover {
  transform: scale(1.8);
  z-index: 10;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.no-image-placeholder {
  width: 50px;
  height: 50px;
  background: #f8f9fa;
  border: 1px dashed #dee2e6;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-size: 10px;
}

.no-image-placeholder.hidden {
  display: none;
}

.no-image-placeholder i {
  font-size: 16px;
  margin-bottom: 2px;
}

/* Project Name Styling */
.project-name-cell strong {
  color: #2c3e50;
  font-weight: 600;
  font-size: 13px;
}

/* Project Symbol Styling */
.project-symbol {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
  font-family: 'Courier New', monospace;
}

/* Supply and Price Styling */
.supply-cell {
  font-weight: 600;
  color: #2c3e50;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.price-cell {
  background: #e8f5e8;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

/* Artist Info Styling */
.artist-info-cell {
  line-height: 1.3;
}

.artist-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 13px;
}

.artist-email {
  color: #6c757d;
  font-size: 11px;
  margin-top: 2px;
}

/* Status Badges */
.status-badge.pending {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.status-badge.approved {
  background: #d1edff;
  color: #0b5ed7;
  border: 1px solid #9ec5fe;
}

.status-badge.rejected {
  background: #f8d7da;
  color: #842029;
  border: 1px solid #f1aeb5;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.view-btn, .approve-btn-sm, .reject-btn-sm, .delete-btn-sm {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.view-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.view-btn:hover {
  background: #bbdefb;
  transform: translateY(-1px);
}

.approve-btn-sm {
  background: #e8f5e8;
  color: #2e7d32;
}

.approve-btn-sm:hover {
  background: #c8e6c9;
  transform: translateY(-1px);
}

.reject-btn-sm {
  background: #ffebee;
  color: #c62828;
}

.reject-btn-sm:hover {
  background: #ffcdd2;
  transform: translateY(-1px);
}

.delete-btn-sm {
  background: #f5f5f5;
  color: #6c757d;
}

.delete-btn-sm:hover {
  background: #e0e0e0;
  color: #dc3545;
  transform: translateY(-1px);
}

/* Table Layout Improvements */
.artist-projects-table .table-header {
  grid-template-columns: 80px 1fr 100px 120px 120px 1fr 100px 120px;
}

.artist-projects-table .table-row {
  grid-template-columns: 80px 1fr 100px 120px 120px 1fr 100px 120px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .artist-projects-table .table-header,
  .artist-projects-table .table-row {
    grid-template-columns: 60px 1fr 80px 100px 100px 1fr 90px 100px;
  }
  
  .project-image-cell {
    width: 50px;
    height: 50px;
  }
  
  .project-thumbnail {
    width: 40px;
    height: 40px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 2px;
  }
  
  .view-btn, .approve-btn-sm, .reject-btn-sm, .delete-btn-sm {
    width: 24px;
    height: 24px;
    font-size: 10px;
  }
}

/* Loading State */
.documents-loading {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* No Documents State */
.no-documents {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.no-documents-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-documents h3 {
  color: #495057;
  margin-bottom: 8px;
  font-weight: 600;
}

.no-documents p {
  margin-bottom: 20px;
  font-size: 14px;
}

.reload-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.reload-btn:hover {
  background: #2980b9;
}

/* Enhanced Statistics Dashboard */
.document-stats-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  border-left: 4px solid #3498db;
}

.stat-card.pending { border-left-color: #f39c12; }
.stat-card.approved { border-left-color: #27ae60; }
.stat-card.rejected { border-left-color: #e74c3c; }

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Search and Filter Controls */
.document-controls {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  margin-bottom: 24px;
  align-items: end;
}

.search-input-container {
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.search-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-btn:hover {
  background: #2980b9;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.filter-btn:hover:not(.active) {
  background: #f8f9fa;
}
