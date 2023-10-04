import {Fragment, useState} from "react";
import {AiOutlinePlus} from "react-icons/ai";
import {Dialog} from "@headlessui/react";
import {useForm} from "react-hook-form";
import api from "../../services/api.jsx";
import {toast} from "react-toastify";

export default function Table({rows, rowsKeys, heads, setCreateModal}) {


    return (<Fragment>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
            <table className="w-full text-sm text-left text-zinc-400">
                <thead className="text-xs uppercase bg-zinc-700 text-zinc-400">
                <tr>
                    {heads?.map((head, headIDX) => (
                        <th scope="col" className="px-6 py-3" key={headIDX}>
                            {head}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                        <button onClick={() => setCreateModal(true)}><AiOutlinePlus size={10}/></button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {rows?.map((row, rowIDX) => (
                    <tr className="border-b bg-zinc-800 border-zinc-700 text-center" key={rowIDX}>
                        {rowsKeys?.map((RowKey, RowKeyIDX) => (
                            <td className='px-2 py-5' key={RowKeyIDX}>
                                {RowKey(row)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </Fragment>)
}