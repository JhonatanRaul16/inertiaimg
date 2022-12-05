import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Create(props) {
    const {data,setData,post,errors} = useForm({
        name: '',
        image: null,
    });

    function submit(e){
        e.preventDefault();
        post('/topics')
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Topics</h2>}
        >
            <Head title="Topics" />

            <div className="py-12 flex justify-center items-center">
                <div className='w-2/5'>
                    <Link href='/topics' className='px-4 py-2 bg-indigo-500 text-white rounded'>
                    Back
                    </Link>    
                    <div className='grid place-content-center mt-10'>
                        <form encType='multipart/form-data' onSubmit={submit}  className='bg-white shadow-md m-2 p-2 rounded'>
                            <div className='sm:col-span-6'>
                                <label htmlFor="title"className='block text-sm font-medium text-gray-700'>Name</label>
                                <div className='mt-1'>
                                    <input 
                                    type="text" 
                                    id='title' 
                                    name='title'
                                    onChange={(e) => setData('name',e.target.value)} 
                                    className='block w-full' />
                                </div>
                            </div>
                            <div className='sm:col-span-6'>
                            <label htmlFor="title"className='block text-sm font-medium text-gray-700'>Image</label>
                                <div className='mt-1'>
                                    <input 
                                    type="file"  
                                    id='image' 
                                    name='image'
                                    onChange={(e) => setData('image', e.target.files[0])} 
                                    className='block w-full'/>
                                </div>
                            </div>
                            <div  className='mt-2 '>
                                <button type='submit' className='px-4 py-2 bg-green-400 rounded'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
