import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({auth,topics}) {
    console.log(topics);
    const [query,setQuery] = useState("");
    useEffect(()=> {
        Inertia.get(route(route().current()),
        {search : query},
        {
            preserveState: true,
            replace: true,
        })
    },[query])
    
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Topics</h2>}
        >
            <Head title="Topics" />

            <div className="py-12 flex justify-center items-center">
                <div className='w-2/5'>
                    <Link href='/topics/create' className='px-4 py-2 bg-indigo-500 text-white rounded'>
                    Crear
                    </Link>    
                    <div className='p-4'>
                        <label htmlFor="search">Search</label>
                        <input 
                        type="search"
                        id='search'
                        onChange={(e) => setQuery(e.target.value)}
                        className='ml-2 py-1 text-sm rounded border'
                        />
                    </div>
                    <div className="overflow-x-auto relative mt-4">
                        <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        ID
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Img
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Accion
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {topics.data.map(topic => {
                                    return(
                                        <tr key={topic.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {topic.id}
                                            </th>
                                            <td className="py-4 px-6">
                                                {topic.name}
                                            </td>
                                            <td className="py-4 px-6">
                                                <img src={`storage/${topic.image}`} alt="" className='w-12 h-12'/>
                                            </td>
                                            <td className="py-4 px-6">
                                                <Link
                                                href={route("topics.edit",`${topic.id}`)}
                                                className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                >
                                                Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Pagination className="mt-2" links={topics.links}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
