import {Fragment, useState} from "react";
import {Dialog} from "@headlessui/react";
import api from "../../services/api.jsx";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {AiOutlineCopy, AiOutlineEye} from "react-icons/ai";

export default function EditModal({isOpen, setOpen, row, getCredentials, setLoading}) {
    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const [inputType, setInputType] = useState('password')

    const onSubmitEdit = (data) => {
        setLoading(true)
        api.put(`/credentials/${row?.id}`, data).then(({data}) => {
            toast.success(data)
            reset()
            setOpen(false)
            getCredentials()
        }).catch(e => {
            toast.error(e?.response?.data ?? e?.message)
        }).finally(() => setLoading(false))
    }

    return (<Fragment>
        <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-50"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel
                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-400"
                        >
                            Edit credential
                        </Dialog.Title>
                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                            <div className="mt-2">

                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Name</p>
                                    <input
                                        defaultValue={row?.name}
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('name')}/>
                                </div>
                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Description</p>
                                    <input
                                        defaultValue={row?.description}
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('description')}/>
                                </div>
                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Login</p>
                                    <input
                                        defaultValue={row?.login}
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('login')}/>
                                </div>
                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Password</p>
                                    <input
                                        type={inputType}
                                        defaultValue={row?.password}
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('password')}/>
                                    <button onClick={() => {
                                        if(inputType === 'password') {
                                            setInputType('text')
                                        } else {
                                            setInputType('password')
                                        }
                                    }} type='button' className='absolute right-7 mt-1.5'><AiOutlineEye
                                        color='white' size={20}/></button>
                                </div>

                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    </Fragment>)
}