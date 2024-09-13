import { useState } from 'react';
import { Input, Select, Typography, Space, Card, Alert } from 'antd';
import { useCurrencyData } from '../hooks/useCurrencyData';

const { Title } = Typography;
const { Option } = Select;

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('IRR');
  const { currencies, exchangeRate, error } = useCurrencyData(fromCurrency, toCurrency);

  const handleAmountChange = (value: string) => {
    const parsedValue = parseFloat(value);
    setAmount(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const handleFromCurrencyChange = (value: string) => setFromCurrency(value);
  const handleToCurrencyChange = (value: string) => setToCurrency(value);

  const convertedAmount = exchangeRate ? (amount * exchangeRate).toFixed(2) : '...';

  return (
    <Card style={{ maxWidth: 500, margin: '50px auto', padding: '20px' , backgroundColor:'#55679C'}}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {error && <Alert message={error} type="error" showIcon />}
        <Input
          type="number"
          value={amount}
          onChange={(e: { target: { value: string; }; }) => handleAmountChange(e.target.value)}
          addonBefore="Amount"
        />
        <Space>
          <Select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            style={{ width: 120 }}
          >
            {currencies.map((currency) => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
          <span>to</span>
          <Select
            value={toCurrency}
            onChange={handleToCurrencyChange}
            style={{ width: 120 }}
          >
            {currencies.map((currency) => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
        </Space>
        <Title level={4} style={{color:'white'}}>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </Title>
      </Space>
    </Card>
  );
};

export default CurrencyConverter;
