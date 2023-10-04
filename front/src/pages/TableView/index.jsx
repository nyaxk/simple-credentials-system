import {Fragment, useEffect, useState} from "react";
import Header from "../../components/Header/index.jsx";
import Table from "../../components/Table/index.jsx";
import {Dialog, Transition} from "@headlessui/react";
import {AiFillEdit, AiFillEye, AiOutlineCopy, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {TbTrashXFilled} from "react-icons/tb";
import api from "../../services/api.jsx";
import Loading from "../../components/Loading/index.jsx";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import EditModal from "../../components/EditModal/index.jsx";

export default function TableView() {
    const [loading, setLoading] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentRow, setCurrentRow] = useState()
    const [rows, setRows] = useState([]);
    const heads = ['Name', 'Description', 'Login', 'Password', 'Action']
    const [createModal, setCreateModal] = useState(false)
    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const onSubmitCreate = (data) => {
        api.post('/credentials', data).then(({data}) => {
            toast.success(data)
            reset()
            setCreateModal(false)
            getCredentials()
        }).catch(e => {
            toast.error(e?.response?.data ?? e?.message)
        }).finally(() => setLoading(false))
    }

    const rowKeys = [
        (row) => {
            return <p>{row?.name}</p>
        },
        (row) => {
            return <p>{row?.description}</p>
        },
        (row) => {
            return <div className='flex items-center justify-center space-x-1'>
                <input type='text' value={row?.login}
                       className='bg-transparent border-none outline-none w-full text-center' readOnly={true}/>
                <CopyToClipboard text={row?.login}>
                    <button type='button'><AiOutlineCopy size={20}/></button>
                </CopyToClipboard>
            </div>
        }, (row) => {
            return <div className='flex items-center justify-center space-x-1'>
                <input id={row?.id} type='password' value={row?.password}
                       className='bg-transparent border-none outline-none w-16 text-center' readOnly={true}/>
                <button type='button' onClick={() => {
                    const type = document.getElementById(row?.id).type
                    if (type === 'password') {
                        document.getElementById(row?.id).type = 'text'
                    } else {
                        document.getElementById(row?.id).type = 'password'
                    }
                }}><AiOutlineEye size={20}/></button>
                <CopyToClipboard text={row?.password}>
                    <button type='button'><AiOutlineCopy size={20}/></button>
                </CopyToClipboard>
            </div>
        },
        (row) => {
            return <div className='flex items-center justify-center space-x-1'>
                <button type='button' onClick={() => {
                    setCurrentRow(row)
                    setEditModalOpen(true)
                }}><AiFillEdit size={20}/></button>
                <button type='button' onClick={() => deleteCredential(row?.id)}><TbTrashXFilled size={20}/></button>
            </div>
        },
    ]

    const getCredentials = () => {
        setLoading(true)
        api.get(`/credentials`).then(({data}) => {
            setRows(data)
        }).catch(e => {
            toast.error(e?.response?.data ?? e?.message)
        }).finally(() => setLoading(false))
    }

    const deleteCredential = (id) => {
        setLoading(true)
        api.delete(`/credentials/${id}`).then(({data}) => {
            toast.success(data)
            getCredentials()
        }).catch(e => {
            toast.error(e?.response?.data ?? e?.message)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getCredentials()
    }, [])

    return (<Fragment>
        <Loading loading={loading}/>
        <Header/>
        <div className='flex items-center justify-center w-full px-5'>
            <Table rowsKeys={rowKeys} heads={heads} rows={rows} setCreateModal={setCreateModal}/>
        </div>
        <EditModal row={currentRow} getCredentials={getCredentials} setLoading={setLoading} isOpen={editModalOpen}
                   setOpen={setEditModalOpen}/>
        <Dialog open={createModal} as="div" className="relative z-10" onClose={() => setCreateModal(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-50"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel
                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-400"
                        >
                            Create credential
                        </Dialog.Title>
                        <form onSubmit={handleSubmit(onSubmitCreate)}>
                            <div className="mt-2">

                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Name</p>
                                    <input
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('name')}/>
                                </div>
                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Description</p>
                                    <input
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('description')}/>
                                </div>
                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Login</p>
                                    <input
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('login')}/>
                                </div>
                                <div className='py-1'>
                                    <p className='text-gray-200 mb-1'>Password</p>
                                    <input
                                        className='border-none bg-zinc-900 rounded-md p-1 outline-none bg-transparent text-gray-200 w-full' {...register('password')}/>
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