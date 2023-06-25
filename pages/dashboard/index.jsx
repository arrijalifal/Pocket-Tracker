import style from '@/styles/Home.module.css';
import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [nominal, setNominal] = useState(undefined);
  const [isTarik, setIsTarik] = useState(false);
  const [tarik, setTarik] = useState(undefined);
  return (
    <main className="h-screen">
      <section className="h-1/2 bg-[#11009E] rounded-b-2xl relative">
        <div className='w-full px-1 flex justify-between absolute top-1'>
            <h3 className='text-transparent hover:text-inherit cursor-pointer select-none'>Menu</h3>
            <h3 className='text-transparent hover:text-inherit cursor-pointer select-none'>Logout</h3>
        </div>
        <div className="w-full h-[90%] flex flex-col justify-center items-center">
          <h3>Saldo Dompet</h3>
          <h1 className={style.semiboldtext}>Rp 100.000</h1>
          <div className='w-3/5 sm:w-1/5 text-center relative m-1'>
            <button className={`border-2 px-3 py-1 rounded-2xl active:bg-[#5A96E3] ${(isTarik) ? 'invisible' : 'visible'}`} value={isTarik} onClick={() => setIsTarik(!isTarik)}>Tarik tunai</button>
            <div className={`w-full border-2 rounded-2xl ${(isTarik) ? 'visible' : 'invisible'} absolute top-0`}>
              <input type='number' className='bg-transparent w-3/4 p-2 rounded-l-xl text-black focus:outline-none focus:bg-slate-50' value={tarik} onChange={e => { setTarik(e.target.value) }} />
              <button className='w-1/4 rounded-2xl align-[0.125rem]' value={isTarik} onClick={() => setIsTarik(!isTarik)}>→</button>
            </div>
          </div>
        </div>
        <div className="bg-[#4942E4] w-full flex justify-between p-3 rounded-2xl absolute bottom-0">
          <p>Tabungan</p>
          <p>Rp 500.000 &gt;&gt;</p>
        </div>
      </section>
      <section className="h-1/2 relative">
        <h2 className={`${style.mediumtext} w-full text-center pt-3`}>History</h2>
        <div className='pt-4 h-3/6'>
          {
            Array.from({ length: 3 }, (_, index) => {
              return (
                <React.Fragment key={index}>
                  <div className='px-6 flex justify-between'>
                    <p className={style.regulartext}>Lorem Ipsum</p>
                    <p>Rp 10.000</p>
                  </div>
                </React.Fragment>
              )
            })
          }
        </div>
        <div className='absolute bottom-6 w-full px-6 h-2/6'>
          <input className='block rounded-2xl p-2 w-full outline-none focus:outline-[#0A6EBD] focus:outline focus:outline-2 focus: outline-offset-0' type="number" placeholder='Enter Nominal' value={nominal} onChange={e => { setNominal(e.target.value) }}/>
          <div className='pt-4 flex justify-between'>
            <button className='w-[45%] px-8 py-2 rounded-xl bg-[#22F500] active:bg-green-700'>Income</button>
            <button className='w-[45%] px-8 py-2 rounded-xl bg-[#FF3636] active:bg-red-700'>Expense</button>
          </div>
        </div>
      </section>
    </main>
  )
}
