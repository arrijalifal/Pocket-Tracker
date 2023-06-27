import style from '@/styles/Home.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { getSession, signOut } from "next-auth/react";
import { useSession } from "next-auth/react"
import axios from 'axios';
import withdrawCash from '@/utils/axiosrequest';

export default function Home({ userData }) {
  const { pocketbalance, accountbalance, pockethistory } = userData;
  const { data: session, status } = useSession();
  const [nominal, setNominal] = useState(0);
  const [isTarik, setIsTarik] = useState(false);
  const [tarik, setTarik] = useState(0);
  const [pocketOutput, setPocketOutput] = useState(pocketbalance);
  const [accountOutput, setAccountOutput] = useState(accountbalance);

  useEffect(() => {
  })

  async function handleLogout() {
    await signOut();
    const logouttext = document.getElementById('logoutbutton');
    logouttext.innerText = 'Logging out...';
  }

  async function handleWDCash() {
    const date = new Date();
    console.log(`variable tarik punya tipe data : ${typeof tarik}`);
    await axios({
      method: "POST",
      url: `${process.env.APP_URL}/api/pocket/withdrawCash`,
      data: {
        date: date.toISOString(),
        amount: parseInt(tarik),
        key: session.user.email
      }
    });
    setIsTarik(!isTarik);
  }

  return (
    <main className="h-screen">
      <section className="h-1/2 bg-[#11009E] rounded-b-2xl relative">
        <div className='w-full px-1 flex justify-between absolute top-1'>
          <h3 className='text-transparent hover:text-inherit cursor-pointer select-none'>Menu</h3>
          <h3 id="logoutbutton" className='text-transparent hover:text-inherit cursor-pointer select-none' onClick={handleLogout}>Logout</h3>
        </div>
        <div className="w-full h-[90%] flex flex-col justify-center items-center">
          <h3>Saldo Dompet</h3>
          <h1 className={style.semiboldtext}>Rp {pocketbalance}</h1>
          <div className='w-5/6 sm:w-2/6 text-center relative m-1'>
            <button className={`border-2 px-3 py-1 rounded-2xl active:bg-[#5A96E3] ${(isTarik) ? 'invisible' : 'visible'}`} value={isTarik} onClick={() => setIsTarik(!isTarik)}>Tarik tunai</button>
            <div className={`w-full border-2 rounded-2xl ${(isTarik) ? 'visible' : 'invisible'} absolute top-0`}>
              <input type='number' min='0' className='bg-transparent w-3/4 p-2 rounded-l-xl text-black focus:outline-none focus:bg-slate-50' value={tarik} onChange={e => { setTarik(e.target.value) }} placeholder='Keep empty to cancel' />
              <button className='w-1/4 rounded-2xl align-[0.125rem]' value={isTarik} onClick={handleWDCash}>→</button>
            </div>
          </div>
        </div>
        <div className="bg-[#4942E4] w-full flex justify-between p-3 rounded-2xl absolute bottom-0">
          <p>Tabungan</p>
          <p>Rp {accountbalance.toLocaleString('id-ID')} &gt;&gt;</p>
        </div>
      </section>
      <section className="h-1/2 relative">
        <h2 className={`${style.mediumtext} w-full text-center pt-3`}>History</h2>
        <div className='pt-4 h-[48%]'>
          {
            (pockethistory.length > 0) ?
              pockethistory.map(h => {
                return (
                  <React.Fragment key={h.date}>
                    <div className='px-6 flex justify-between'>
                      <p className={style.regulartext}>{(h.name)? h.name : 'Tanpa Nama'}</p>
                      <p>{h.amount}</p>
                    </div>
                  </React.Fragment>
                )
              }) : <div className='px-6'>
                <p>No Data</p>
              </div>
          }
        </div>
        <div className='absolute bottom-6 w-full px-6 h-[30%]'>
          <input className='block rounded-2xl p-2 w-full outline-none focus:outline-[#0A6EBD] focus:outline focus:outline-2 focus: outline-offset-0' type="number" placeholder='Enter Nominal' value={nominal} onChange={e => { setNominal(e.target.value) }} />
          <div className='pt-4 flex justify-between'>
            <button className='w-[45%] px-8 py-2 rounded-xl bg-[#22F500] active:bg-green-700'>Income</button>
            <button className='w-[45%] px-8 py-2 rounded-xl bg-[#FF3636] active:bg-red-700'>Expense</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  else {
    const email = session.user.email;
    const fetchData = await axios(
      {
        method: 'POST',
        url: `${process.env.APP_URL}/api/pocket/getUser`,
        data: {
          email: email
        }
      }
    );
    const userData = fetchData.data;
    return {
      props: {
        session,
        userData
      }
    }
  }
}
