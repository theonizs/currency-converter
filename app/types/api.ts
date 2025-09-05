import { type currencyRates } from "./currency";
export interface ApiResponse {
  provider?: string;
  WARNING_UPGRADE_TO_V6?: string;
  terms?: string;
  base?: string;
  date?: string;
  time_last_updated?: number;
  rates?: currencyRates;
  result?: string;
  error_type?: string;
}
