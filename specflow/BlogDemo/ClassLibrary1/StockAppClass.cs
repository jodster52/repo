namespace StockApp
{
    public class StockAppClass
    {
        public string? User { get; set; }

        public int PortfolioValue { get; set; }

        public void SetPortfolioValue(int value)
        {
            PortfolioValue = value;
        }

        public void PurchaseStock(string amount, string stockCode)
        {
            int latestPrice = GetLatestPrice(stockCode);
            int netSumToAdd = Int32.Parse(amount) * latestPrice;
            PortfolioValue += netSumToAdd;
        }

        private int GetLatestPrice(string stockCode)
        {
            switch (stockCode)
            {
                case "MSFT":
                    return 287;
                case "SBUX":
                    return 93;
                case "AMZN":
                    return 3052;
                case "BA":
                    return 209;
                default:
                    return 0;
            }
        }
    }
}
