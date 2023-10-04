import {Fragment} from "react";
import {CgSpinner, CgSpinnerAlt} from "react-icons/cg";

export default function Loading({loading}) {
    return (<Fragment>
        {loading && <div className='block'>
            <div className='fixed inset-0 bg-zinc-900 z-30 bg-opacity-50'/>
            <div
                className='rounded-md absolute z-50 m-auto flex flex-col items-center justify-center text-white h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <CgSpinnerAlt className='animate-spin' size='100' color='rgb(49 46 129)'/>
            </div>
        </div>}
    </Fragment>)
}