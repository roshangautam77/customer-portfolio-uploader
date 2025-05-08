import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { CustomerPortfolio } from '../models/customer-portfolio.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ExcelParserService {
  parseExcel(file: File): Promise<CustomerPortfolio[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        const portfolios = json.map((row: any) => ({
          id: uuidv4(),
          customerName: row['Customer Name'],
          accountNumber: row['Account Number'],
          accountType: row['Account Type'],
          balance: row['Balance'],
          riskScore: row['Risk Score'],
          lastReviewDate: row['Last Review Date'],
        }));
        resolve(portfolios);
      };
      reader.onerror = () => reject('Error reading file');
      reader.readAsArrayBuffer(file);
    });
  }

  exportToExcel(data: CustomerPortfolio[]): void {
    const worksheet = XLSX.utils.json_to_sheet(data.map(d => ({
      'Customer Name': d.customerName,
      'Account Number': d.accountNumber,
      'Account Type': d.accountType,
      'Balance': d.balance,
      'Risk Score': d.riskScore,
      'Last Review Date': d.lastReviewDate
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Portfolio');
    XLSX.writeFile(workbook, 'portfolio_export.xlsx');
  }
}