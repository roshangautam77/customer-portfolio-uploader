export interface CustomerPortfolio {
    id: string;
    customerName: string;
    accountNumber: string;
    accountType: string;
    balance: number;
    riskScore: number;
    lastReviewDate: string;
    isModified?: boolean;
  }
  
  export interface AuditLog {
    uploadTime: number;
    parseTime: number;
    submissionTime?: number;
  }