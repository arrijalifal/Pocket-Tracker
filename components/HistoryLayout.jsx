import React from "react";

export default function HistoryLayout({ balance, history, contentType }) {
    console.log(balance);
    return (
        <div id="maindiv" className="w-full h-3/4 flex flex-col">
            <section id="first-section" className='w-full p-3 rounded-t-2xl bg-[#4942E4] flex justify-between'>
                <p className="inline">{contentType}</p>
                <p className="inline">{balance} <span className="inline-block tracking-tight rotate-90">{'>>'}</span></p>
            </section>
            <section id="second-section" className={`w-full ${(contentType === 'Tabungan') ? 'bg-[#11009E]' : 'bg-[#8696FE]'} rounded-b-2xl flex flex-col overflow-y-auto`}>
                <div id="accounthistory" className="overflow-y-auto p-3">
                    {
                        (history.length > 0) ?
                            history.map(ac => {
                                const date = new Date(ac.date);
                                const datestring = date.toString().split(" ");
                                const timestring = datestring[4].split(':').slice(0, 2).join(':');
                                const datetext = datestring[2] + ' ' + datestring[1];
                                return (
                                    <React.Fragment key={ac.date}>
                                        <div className="flex items-center border-b last-of-type:border-none">
                                            <p className="flex-none mr-4"><span className="block">{datetext}</span><span className="text-center">{timestring}</span></p>
                                            <div className="flex justify-between items-center flex-1 text-lg">
                                                <p className="inline">{(ac.name) ? ac.name : 'Tanpa nama'}</p>
                                                <span className="">{(ac.type === 'expense') ? '-' : '+'}Rp {ac.amount.toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            : <div className="text-center">
                                No Data
                            </div>
                    }
                </div>
                <div id="buttondiv" className="p-3 flex justify-center flex-col">
                    <input type="text" className="block text-center focus:outline focus:outline-blue-700 p-2 rounded-xl mb-2" placeholder="Add Custom Value" />
                    <div className="w-full flex justify-between">
                        <button className=" w-[49%] py-2 rounded-xl bg-[#22F500]">Income</button>
                        <button className=" w-[49%] py-2 rounded-xl bg-[#FF3636]">Expense</button>
                    </div>
                </div>
            </section>
        </div>
    )
}