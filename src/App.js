import { useState } from 'react'
import './App.css';
import logo from './images/logo.png';
import { useEffect } from 'react';

function App() {
  const [seller, setSeller] = useState('0');
  const [ticketPrice, setTicketPrice] = useState('0');
  const [ticketAmount, setTicketAmount] = useState('1');
  const [payout, setPayout] = useState('0');
  const [ogPayout, setOgPayout] = useState('0');
  const [page, setPage] = useState('0');
  const [profitPerTicket, setProfitPerTicket] = useState('0');
  const [profitTotal, setProfitTotal] = useState('0');

  const handleTicketPrice = (event) => {
    const value = event.target.value;
    setTicketPrice(value);
  };

  let fullPay
  let fullTotal

  const handleSeller = (event) => {
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
    fullPay = ogPayout - ticketPrice
    setProfitPerTicket(fullPay.toFixed(2));
    
    fullTotal = payout - (ticketPrice * ticketAmount)
    setProfitTotal(fullTotal.toFixed(2));

  }, [ogPayout,ticketPrice, ticketAmount, payout])

  // payout - (ticketPrice * ticketAmount)

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center text-white">
      <div className='bg-[#111111] max-w-3xl w-full p-5 rounded-xl relative shadow-[0_0_60px_-30px_rgba(140,198,63,1);] border-[#212121] border'>
        <div className="pt-6 pb-9 mx-auto">
          <img src={logo} alt="logo" className='mx-auto mb-2 w-72'/>
          <h2>Seller fees calculator</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col rounded-xl p-5 bg-[#050505] border-[#212121] border no-controls">
            <span className='mb-2 text-xl'>Full ticket price</span>
            <input type="number" inputMode="numeric" onChange={handleTicketPrice} value={ticketPrice} className="flex relative text-5xl text-center bg-transparent w-auto outline-none font-bold"/> 
          </div>
          <div className="flex flex-col rounded-xl p-5 bg-[#050505] border-[#212121] border no-controls">
            <span className='mb-2 text-xl'>Seller listing price</span>
            <input type="number" inputMode="numeric" onChange={handleSeller} value={seller} className="flex relative text-5xl text-center bg-transparent w-auto outline-none font-bold"/> 
          </div>
          <div className="flex flex-col rounded-xl p-5 bg-[#050505] border-[#212121] border">
            <span className='mb-2 text-xl'>Ticket(s)</span>
            <input type="number" inputMode="numeric" onChange={handleTicketAmount} value={ticketAmount} className="flex relative text-5xl text-center bg-transparent outline-none w-auto font-bold"/> 
          </div>
        </div>
        <div className="flex flex-col gap-y-5 justify-center mt-5">
          <div className="flex flex-row items-center border w-full p-3 rounded-xl border-[#444]">
            <span className='mb-0 text-xl mx-auto'>VGG Price listing: <b>£{page} per ticket</b></span>
          </div>
          <div className="flex flex-row items-center border w-full p-3 rounded-xl border-[#444]">
            <p className='mb-0 text-xl mx-auto'>Payout per ticket: <span className='font-bold text-[#8cc63f]'>£{ogPayout}</span> / Profit per ticket: <span className='font-bold text-[#8cc63f]'>£{profitPerTicket}</span></p>
          </div>
          <div className="flex flex-row items-center border w-full p-3 rounded-xl border-[#444]">
            <p className='mb-0 text-xl mx-auto'>Total payout: <span className='font-bold text-[#8cc63f]'>£{payout}</span> / Total profit: <span className='font-bold text-[#8cc63f]'>£{profitTotal}</span></p>
          </div>
        </div>
        <div className='pt-6 pb-3 flex flex-col items-center'>
          <p><b>Payout:</b> Seller listing minus VGG fee (10%) & VAT (20% of fee)</p>
          <p><b>VGG price:</b> Seller listing add 18% of seller listing</p>
          <span className='mt-3 flex text-center text-[#555]'>lastgoodsleep#1106</span>
        </div>
      </div>
    </div>
  );
}

export default App;
