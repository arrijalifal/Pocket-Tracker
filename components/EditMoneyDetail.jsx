import style from '@/styles/Home.module.css';

export default function EditMoneyDetail({ history, exactdata, edittype }) {
    const editdatedata = history.filter(e => e.date === exactdata)[0];
    console.log(editdatedata);
    const maincolor = (edittype === 'dompet') ? 'bg-[#11009E]' : '';
    const containercolor = (edittype === 'dompet') ? 'bg-[#8696FE]' : 'bg-[#11009E]'
    return (
        <main className={`h-screen ${maincolor} flex flex-col justify-center`}>
            <section className={`${containercolor} rounded-xl px-4 pt-6`}>
                <h1 className={`${style.semiboldtext} w-full text-center`}>Edit Data</h1>
                <input type="text" className='w-full mt-3 rounded-xl disabled:bg-gray-200' value={editdatedata.date} disabled/>
                <input type="number" className='w-full mt-4 rounded-xl' />
                <input type="number" className='w-full mt-4 rounded-xl' />
                <div className="w-full mt-9 mb-9">
                    <button className=" w-full py-2 rounded-xl border-2" value={'income'}>Cancel</button>
                    <button className=" w-full py-2 rounded-xl border-2 border-[#4942E4] bg-[#4942E4] mt-4" value={'expense'}>Save</button>
                </div>
            </section>
        </main>
    )
}