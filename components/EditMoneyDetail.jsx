import style from '@/styles/Home.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/react';

export default function EditMoneyDetail({ history, exactdata, edittype }) {
    const {data: session} = useSession();
    const email = session.user.email;
    const editdatedata = history.filter(e => e.date === exactdata)[0];
    const [transactionName, setTransactionName] = useState(editdatedata.name);
    const [transactionType, setTransactionType] = useState(editdatedata.type);
    const [transactionAmount, setTransactionAmount] = useState(editdatedata.amount);
    const maincolor = (edittype === 'dompet') ? 'bg-[#11009E]' : '';
    const containercolor = (edittype === 'dompet') ? 'bg-[#8696FE]' : 'bg-[#11009E]';

    async function handleEditMoneyDetail(e) {
        e.preventDefault();
        if (
            transactionName === editdatedata.name &&
            transactionType === editdatedata.type &&
            parseInt(transactionAmount) === editdatedata.amount
        ) {
            Router.push(`/dashboard/${edittype}`);
            return;
        };
        const data = {
            date: editdatedata.date,
            name: transactionName,
            type: transactionType,
            amount: transactionAmount
        }
        const dataNow = history.reverse();
        const index = dataNow.findIndex(o => o.date === exactdata);
        dataNow.splice(index, 1, data)
        console.log(dataNow);
        await axios.post(
            '/api/pocket/handleMoneyDetail',
            {
                data: dataNow,
                type: edittype,
                key: email
            }
        )
        Router.push(`/dashboard/${edittype}`);
    }

    return (
        <main className={`h-screen ${maincolor} flex flex-col justify-center`}>
            <form className={`${containercolor} rounded-xl px-4 pt-6`} onSubmit={handleEditMoneyDetail}>
                <h1 className={`${style.semiboldtext} w-full text-center`}>Edit Data</h1>
                <input type="text" className='w-full mt-3 rounded-xl disabled:bg-gray-200' value={editdatedata.date} name='date' disabled/>
                <input type="text" className='w-full mt-4 rounded-xl' placeholder={editdatedata.name} value={transactionName} onChange={e => setTransactionName(e.target.value)} name='transaction_name'/>
                <input type="number" className="w-full mt-4 rounded-xl after:content-['']" placeholder={`Rp ${editdatedata.amount}`} value={transactionAmount} onChange={e => setTransactionAmount(e.target.value)} name='transaction_amount'/>
                <select className={`${(transactionType === 'income')? 'bg-[#22F500]' : 'bg-[#FF3636]'} text-black w-full mt-4 rounded-xl p-2`} name='transaction_type' id="" value={transactionType} onChange={e => setTransactionType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <div className="w-full mt-9 mb-9">
                    <button className=" w-full py-2 rounded-xl border-2" value={'income'}>Cancel</button>
                    <button className=" w-full py-2 rounded-xl border-2 border-[#4942E4] bg-[#4942E4] mt-4" value={'expense'} type='submit'>Save</button>
                </div>
            </form>
        </main>
    )
}