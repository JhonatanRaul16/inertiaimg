import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Edit({auth,topic,image}) {
    const {data,setData,put,errors} = useForm({
        name: topic.name,
        image: null,
    });
    console.log(data);
    function submit(e){
        e.preventDefault();
        Inertia.post(`/topics/${topic.id}`, {
            _method: 'put',
            name: data.name,
            image: data.image,
          })
    }
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Topics</h2>}
        >
            <Head title="Topics" />

            <div className="py-12 flex justify-center items-center">
                <div className='w-2/5'>
                    <Link href='/topics' className='px-4 py-2 bg-indigo-500 text-white rounded'>
                    Back
                    </Link>    
                    <div className='grid place-content-center mt-10'>
                        <form  enctype="multipart/form-data"  onSubmit={submit}  className='bg-white shadow-md m-2 p-2 rounded'>
                            <div className='sm:col-span-6'>
                                <label htmlFor="title"className='block text-sm font-medium text-gray-700'>Name</label>
                                <div className='mt-1'>
                                    <input 
                                    type="text" 
                                    id='title' 
                                    name='name'
                                    value={data.name}
                                    onChange={(e) => setData('name',e.target.value)} 
                                    className='block w-full' />
                                </div>
                            </div>
                            <div className='sm:col-span-6'>
                            <label htmlFor="title"className='block text-sm font-medium text-gray-700'>Image</label>
                                <div className='m-2 p-2'>
                                    <img src={`${image}`} alt="" />
                                </div>
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
                                <button type='submit' className='px-4 py-2 bg-green-400 rounded'>Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
