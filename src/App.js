import './App.css';
import logo from './images/logo.png';
import { useEffect, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'



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
          <div className="flex flex-col rounded-xl py-5 px-1 bg-black border-darkGrey border no-controls">
            <div className='flex flex-row items-center justify-center mb-2'>
              <span className='text-md md:text-xl'>Full cost per ticket</span>
              <a data-tooltip-id="full-cost" data-tooltip-content="Full price paid for 1 ticket including any extra fees">
                <svg class="w-4 h-4 ml-1 mt-[3px]" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#666666" d="M512 64a448 448 0 110 896.064A448 448 0 01512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 01-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 017.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"/></svg>
              </a>
              <Tooltip id="full-cost" />
            </div>
            <input type="number" inputMode="decimal" onChange={handleTicketPrice} value={ticketPrice} className="flex relative text-4xl md:text-5xl md:leading-[3.5rem] text-center bg-transparent w-auto outline-none font-bold"/> 
          </div>
          <div className="flex flex-col rounded-xl p-5 bg-black border-darkGrey border no-controls">
            <div className='flex flex-row items-center justify-center mb-2'>
              <span className='text-md md:text-xl'>Your listing price</span>
              <a data-tooltip-id="listing" data-tooltip-content="Price per ticket input box on the my listings page">
                <svg class="w-4 h-4 ml-1 mt-[3px]" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#666666" d="M512 64a448 448 0 110 896.064A448 448 0 01512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 01-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 017.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"/></svg>
              </a>
              <Tooltip id="listing" />
            </div>
            <input type="number" inputMode="decimal" onChange={handleSellerPrice} value={seller} className="flex relative text-4xl md:text-5xl md:leading-[3.5rem] text-center bg-transparent w-auto outline-none font-bold"/> 
          </div>
          <div className="flex flex-col rounded-xl p-5 bg-black border-darkGrey border">
            <div className='flex flex-row items-center justify-center mb-2'>
              <span className='text-md md:text-xl'>Amount of tickets</span>
              <a data-tooltip-id="amount" data-tooltip-content="The number of tickets you want to sell that cost THE SAME original purchase price">
                <svg class="w-4 h-4 ml-1 mt-[3px]" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#666666" d="M512 64a448 448 0 110 896.064A448 448 0 01512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 01-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 017.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"/></svg>
              </a>
              <Tooltip id="amount" />
            </div>
            <input type="number" inputMode="numeric" onChange={handleTicketAmount} value={ticketAmount}  min="1" className="flex relative text-4xl md:text-5xl md:leading-[3.5rem] text-center bg-transparent outline-none w-auto font-bold"/> 
          </div>
        </div>
        <div className="flex flex-col gap-y-5 justify-center mt-5">
          <div className="flex flex-col md:flex-row items-center justify-center border w-full p-3 rounded-xl border-lightGrey gap-x-1">
            <span className='mb-0 text-xl md:text-lg'>Viagogo Listing price:</span>
            <span className='mb-0 text-xl md:text-lg'><b>£{page} per ticket</b></span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center border w-full p-3 rounded-xl border-lightGrey ">
            <p className='mb-0 text-xl md:text-lg'>Payout per ticket: <span className='font-bold text-green'>£{ogPayout}</span></p>
            <span className='hidden md:flex mx-2'> / </span> 
            <p className='mb-1 md:mb-0 text-xl md:text-lg'>Profit per ticket: <span className={`font-bold text-green ${profitPerTicket < 0 ? 'text-red-500' : 'text-green'}`}>£{profitPerTicket}</span></p>
          </div>
          <div className="flex flex-col md:flex-row items-center border justify-center w-full p-3 rounded-xl border-lightGrey">
            <p className='mb-0 text-xl md:text-lg'>Total payout: <span className='font-bold text-green'>£{payout}</span></p>
            <span className='hidden md:flex mx-2'> / </span> 
            <p className='mb-1 md:mb-0 text-xl md:text-lg'> Total profit: <span className={`font-bold text-green ${profitPerTicket < 0 ? 'text-red-500' : 'text-green'}`}>£{profitTotal}</span></p>
          </div>
        </div>
        <div className='pt-7 md:pt-8 pb-3 flex flex-col items-center text-xs md:text-md'>
          <p><b>Payout:</b> Seller listing -VGG fee (10%) & VAT (20% of fee)</p>
          <p><b>VGG price:</b> Seller listing +18% of list price</p>
          <span className='mt-3 flex text-center text-lightGrey'>greatergood</span>
        </div>
      </div>
    </div>
  );
}

export default App;
