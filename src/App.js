import './App.css';
import logo from './images/logo.png';
import { useEffect, useState } from 'react';

function App() {
  const [seller, setSeller] = useState('0');
  const [ticketPrice, setTicketPrice] = useState('0');
  const [ticketAmount, setTicketAmount] = useState('1');
  const [payout, setPayout] = useState('0.00');
  const [ogPayout, setOgPayout] = useState('0.00');
  const [page, setPage] = useState('0');
  const [profitPerTicket, setProfitPerTicket] = useState('0');
  const [profitTotal, setProfitTotal] = useState('0');

  const handleTicketPrice = (event) => {
    const value = event.target.value;
    setTicketPrice(value);
  };

  const handleSellerPrice = (event) => {
    const value = event.target.value;
    setSeller(value);
    let pageFee = (value / 100) * 10;
    let pageVat = (value / 100) * 2;
    let payout = value - pageFee - pageVat
    let vggFee = Number(value) / 100 * 18
    setOgPayout(payout.toFixed(2));
    let fullPayout = payout * ticketAmount
    setPayout(fullPayout.toFixed(2));
    let fullVggFee = vggFee + Number(value)
    setPage(fullVggFee.toFixed(2));
  };

  const handleTicketAmount = (event) => {
    const value = event.target.value;
    setTicketAmount(Number(value));
    let updatedPayout = Number(value) * ogPayout
    setPayout(updatedPayout.toFixed(2));
  };

  useEffect(() => {
    let fullPay
    let fullTotal
    fullPay = ogPayout - ticketPrice
    setProfitPerTicket(fullPay.toFixed(2));
    fullTotal = payout - (ticketPrice * ticketAmount)
    setProfitTotal(fullTotal.toFixed(2));
  }, [ogPayout,ticketPrice, ticketAmount, payout])

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center text-white px-3 py-4">
      <div className='bg-[#111111] max-w-3xl w-full p-4 md:p-5 rounded-xl relative shadow-[0_0_25px_-4px_rgba(0,0,0,0.8);] md:shadow-[0_0_60px_-30px_rgba(140,198,63,0.8);] border-[#212121] border'>
        <div className="pt-4 md:pt-7 pb-6 md:pb-8 flex flex-row justify-center items-center">
          <img src={logo} alt="logo" className='mb-2 w-36 md:w-48'/>
          <h2 className='text-md mb-2.5 ml-3'>Seller fee calculator</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col rounded-xl p-5 bg-black border-darkGrey border no-controls">
            <span className='mb-2 text-md md:text-xl'>Full ticket cost</span>
            <input type="number" inputMode="decimal" onChange={handleTicketPrice} value={ticketPrice} className="flex relative text-4xl md:text-5xl md:leading-[3.5rem] text-center bg-transparent w-auto outline-none font-bold"/> 
          </div>
          <div className="flex flex-col rounded-xl p-5 bg-black border-darkGrey border no-controls">
            <span className='mb-2 text-md md:text-xl'>Seller listing price</span>
            <input type="number" inputMode="decimal" onChange={handleSellerPrice} value={seller} className="flex relative text-4xl md:text-5xl md:leading-[3.5rem] text-center bg-transparent w-auto outline-none font-bold"/> 
          </div>
          <div className="flex flex-col rounded-xl p-5 bg-black border-darkGrey border">
            <span className='mb-2 text-md md:text-xl'>Amount of tickets</span>
            <input type="number" inputMode="numeric" onChange={handleTicketAmount} value={ticketAmount}  min="1" className="flex relative text-4xl md:text-5xl md:leading-[3.5rem] text-center bg-transparent outline-none w-auto font-bold"/> 
          </div>
        </div>
        <div className="flex flex-col gap-y-5 justify-center mt-5">
          <div className="flex flex-col md:flex-row items-center justify-center border w-full p-3 rounded-xl border-lightGrey gap-x-1">
            <span className='mb-0 text-xl text-sm md:text-lg'>Viagogo Listing price:</span>
            <span className='mb-0 text-xl text-sm md:text-lg'><b>£{page} per ticket</b></span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center border w-full p-3 rounded-xl border-lightGrey ">
            <p className='mb-0 text-xl text-sm md:text-lg'>Payout per ticket: <span className='font-bold text-green'>£{ogPayout}</span></p>
            <span className='hidden md:flex mx-2'> / </span> 
            <p className='mb-1 md:mb-0 text-xl text-sm md:text-lg'>Profit per ticket: <span className={`font-bold text-green ${profitPerTicket < 0 ? 'text-red-500' : 'text-green'}`}>£{profitPerTicket}</span></p>
          </div>
          <div className="flex flex-col md:flex-row items-center border justify-center w-full p-3 rounded-xl border-lightGrey">
            <p className='mb-0 text-xl text-sm md:text-lg'>Total payout: <span className='font-bold text-green'>£{payout}</span></p>
            <span className='hidden md:flex mx-2'> / </span> 
            <p className='mb-1 md:mb-0 text-xl text-sm md:text-lg'> Total profit: <span className={`font-bold text-green ${profitPerTicket < 0 ? 'text-red-500' : 'text-green'}`}>£{profitTotal}</span></p>
          </div>
        </div>
        <div className='pt-7 md:pt-8 pb-3 flex flex-col items-center text-xs md:text-md'>
          <p><b>Payout:</b> Seller listing -VGG fee (10%) & VAT (20% of fee)</p>
          <p><b>VGG price:</b> Seller listing +18% of list price</p>
          <span className='mt-3 flex text-center text-lightGrey'>lastgoodsleep#1106</span>
        </div>
      </div>
    </div>
  );
}

export default App;
